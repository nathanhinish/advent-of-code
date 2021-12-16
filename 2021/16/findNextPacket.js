function buildLiteralPacket(chars) {
  let packetContent = "";
  let zeroBitFound = false;
  let currentPos = 0;
  while (!zeroBitFound) {
    const nextToken = chars.substring(currentPos, currentPos + 5);
    packetContent += nextToken.substring(1);
    currentPos += 5;
    if (nextToken[0] === "0") {
      zeroBitFound = true;
    }
  }

  return {
    content: parseInt(packetContent, 2),
    raw: chars.substring(0, currentPos),
  };
}

function buildPacketWithSubLength(chars) {
  const totalContentLength = parseInt(chars.substr(0, 15), 2);
  let raw = chars.substr(0, 15);

  let subpacketsLength = 0;
  let subpacketChars = chars.substr(15, totalContentLength);

  const subpackets = [];
  while (
    subpacketChars.length &&
    subpacketsLength < totalContentLength &&
    subpacketChars
  ) {
    const subpacket = findNextPacket(subpacketChars);

    subpackets.push(subpacket);

    raw += subpacket.raw;
    subpacketChars = subpacketChars.replace(subpacket.raw, "");
    subpacketsLength += subpacket.raw.length;
  }

  return { raw, subpackets };
}

function buildPacketWithSubNumber(chars) {
  const numSubpackets = parseInt(chars.substring(0, 11), 2);
  let raw = chars.substring(0, 11);

  let subpacketChars = chars.substring(11);

  const subpackets = [];
  while (subpackets.length < numSubpackets && subpacketChars) {
    const subpacket = findNextPacket(subpacketChars);
    subpackets.push(subpacket);

    raw += subpacket.raw;
    subpacketChars = subpacketChars.replace(subpacket.raw, "");
  }

  return { raw, subpackets };
}

function findNextPacket(chars) {
  const packetVersion = parseInt(chars.substring(0, 3), 2);
  const packetType = parseInt(chars.substring(3, 6), 2);

  if (isNaN(packetVersion)) {
    throw new Error("Version can not be NaN " + chars);
  }

  if (isNaN(packetType)) {
    throw new Error("Type can not be NaN " + chars);
  }

  let packetInfo;

  if (packetType === 4) {
    packetInfo = buildLiteralPacket(chars.substr(6));
    packetInfo.raw = chars.substr(0, 6) + packetInfo.raw;
  } else {
    const lengthType = chars.substr(6, 1);

    if (lengthType === "0") {
      packetInfo = buildPacketWithSubLength(chars.substr(7));
    } else {
      packetInfo = buildPacketWithSubNumber(chars.substr(7));
    }

    packetInfo.raw = chars.substr(0, 7) + packetInfo.raw;
    packetInfo.lengthType = lengthType;
  }

  return {
    ...packetInfo,
    length: (packetInfo.raw || "").length,
    version: packetVersion,
    type: packetType,
    remainingChars: chars.length,
  };
}

module.exports = findNextPacket;
