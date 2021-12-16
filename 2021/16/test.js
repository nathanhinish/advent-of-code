const assert = require("assert");
const findNextPacket = require("./findNextPacket");

const test1 = findNextPacket(`110100101111111000101000`);
assert.equal(test1.version, 6);
assert.equal(test1.type, 4);
assert.equal(test1.raw, "110100101111111000101");
assert.equal(test1.value, 2021);

const test2 = findNextPacket(
  "00111000000000000110111101000101001010010001001000000000"
);
assert.equal(test2.version, 1);
assert.equal(test2.type, 6);
assert.equal(test2.raw, "0011100000000000011011110100010100101001000100100");
assert.equal(test2.lengthType, "0");
assert.equal(test2.subpackets.length, 2);
assert.equal(test2.subpackets[0].raw, "11010001010");
assert.equal(test2.subpackets[0].value, 10);
assert.equal(test2.subpackets[1].raw, "0101001000100100");
assert.equal(test2.subpackets[1].value, 20);

const test3 = findNextPacket(
  "11101110000000001101010000001100100000100011000001100000"
);
assert.equal(test3.version, 7);
assert.equal(test3.type, 3);
assert.equal(test3.raw, "111011100000000011010100000011001000001000110000011");
assert.equal(test3.lengthType, "1");
assert.equal(test3.subpackets.length, 3);
assert.equal(test3.subpackets[0].raw, "01010000001");
assert.equal(test3.subpackets[0].value, 1);
assert.equal(test3.subpackets[1].raw, "10010000010");
assert.equal(test3.subpackets[1].value, 2);
assert.equal(test3.subpackets[2].raw, "00110000011");
assert.equal(test3.subpackets[2].value, 3);
