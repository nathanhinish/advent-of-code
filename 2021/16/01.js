console.time("Run time");

const findNextPacket = require("./findNextPacket");

let answer;

const inputFile = process.argv[2];

const lines = require("../common/getLinesOfFile")(inputFile);

const CHAR_MAP = {
  0: "0000",
  1: "0001",
  2: "0010",
  3: "0011",
  4: "0100",
  5: "0101",
  6: "0110",
  7: "0111",
  8: "1000",
  9: "1001",
  A: "1010",
  B: "1011",
  C: "1100",
  D: "1101",
  E: "1110",
  F: "1111",
};

function hex2bin(hexChar) {
  const binChars = CHAR_MAP[hexChar.toUpperCase()];
  if (!binChars) {
    throw new Error("Invalid hex char");
  }
  return binChars;
}

const hexChars = lines[0].split("");
const binaryChars = hexChars.map(hex2bin).join("");

let remainingChars = binaryChars;
const packet = findNextPacket(remainingChars);

function getAccumVersions(packet) {
  let ver = packet.version;
  if (packet.subpackets) {
    packet.subpackets.forEach((p) => {
      ver += getAccumVersions(p);
    });
  }
  return ver;
}

const versionSum = getAccumVersions(packet);

answer = versionSum;

console.info("Answer:", answer);
console.timeEnd("Run time");
