"use strict";

function TZXObject(major, minor) {
  this.major = major;
  this.minor = minor;
  this.blocks = [];
}

function StandardSpeedDataBlock(len, data) {
  this.id = 0x10;
  this.blockName = "Standard Speed Data Block";
  this.length = len;
  this.pause = getWord(data[0], data[1]);
  // const dataLen = getWord(data[2], data[3]);
  this.blockType = data[0x04] === 0 ? "Header" : "Data";
  this.data = data.slice(0x05, data.length);
  this.text = `Type: ${this.blockType}, Pause: ${this.pause}, Block len: ${len}`;
}

function PureTone(len, data) {
  this.id = 0x12;
  this.blockName = "Pure Tone";
  this.length = len;
  this.pulseLen = getWord(data[0], data[1]);
  this.pulseCount = getWord(data[2], data[3]);
  this.text = `Count: ${this.pulseCount}, Length: ${this.pulseLen} T-states`;
}

function PulseSequence(len, data) {
  this.id = 0x13;
  this.blockName = "Pulse sequence";
  this.length = len;
  this.pulseCount = data[0];
  this.pulseLen = getWord(data[1], data[2]);
  this.text = `Count: ${this.pulseCount}, Length: ${this.pulseLen}`;
}

function PureDataBlock(len, data) {
  this.id = 0x14;
  this.blockName = "Pure Data Block";
  this.length = len;
  this.zeroLen = getWord(data[0], data[1]);
  this.oneLen = getWord(data[2], data[3]);
  this.lastByte = data[4];
  this.pause = getWord(data[5], data[6]);
  const datalen = getNWord(data[7], data[8], data[9]);
  this.data = data.slice(0x0a, 0x0a + datalen);
  this.text = `0-bit length: ${this.zeroLen}, 1-bit length: ${this.oneLen}, last byte: ${this.lastByte}, Pause: ${this.pause}`;
}

function PauseStopTape(len, pause) {
  this.id = 0x20;
  this.blockName = "Pause (silence) or 'Stop the Tape' command";
  this.length = len;
  this.data = pause;
}

function GroupStart(len, data) {
  this.id = 0x21;
  this.blockName = "Group start";
  this.text = String.fromCharCode.apply(null, data);
  this.length = len;
  this.data = String.fromCharCode.apply(null, data);
}

function GroupEnd() {
  this.id = 0x22;
  this.blockName = "Group end";
}

function LoopStart(len, data) {
  this.id = 0x24;
  this.blockName = "Loop start";
  this.text = `Loops: ${getWord(data[0], data[1])}`;
  this.length = len;
  this.data = getWord(data[0], data[1]);
}

function LoopEnd() {
  this.id = 0x25;
  this.blockName = "Loop end";
}

function TextDescription(len, data) {
  this.id = 0x30;
  this.blockName = "Text Description";
  this.text = String.fromCharCode.apply(null, data);
  this.length = len;
  this.data = String.fromCharCode.apply(null, data);
}

function ArchiveInfo(len, data) {
  this.id = 0x32;
  this.blockName = "Archive info";
  this.text = String.fromCharCode.apply(null, data);
  this.length = len;
  this.data = String.fromCharCode.apply(null, data);
}

function getWord(low, high) {
  return high * 256 + low;
}
function getNWord(low, med, high) {
  return (high << 16) + (med << 8) + low;
}

/**
 *
 * @param {*} buffer - ArrayBuffer
 */
function readTape(buffer) {
  const data = new Uint8Array(buffer);

  // check TZX header
  const signature = String.fromCharCode.apply(null, data.slice(0, 7));
  if (signature !== "ZXTape!") {
    console.log(`readTape(): ERROR - NOT a TZX file`);
    return null;
  }

  const TZXMajorVersion = data[8];
  const TZXMinorVersion = data[9];

  var tzx = new TZXObject(TZXMajorVersion, TZXMinorVersion);

  var i = 0x0a; // first entry, after header
  while (i < data.length) {
    const id = data[i++];
    var length;
    var block;
    switch (id) {
      case 0x10: // ID 10 - Standard Speed Data Block
        length = getWord(data[i + 2], data[i + 3]) + 4;
        block = new StandardSpeedDataBlock(length, data.slice(i, i + length));
        tzx.blocks.push(block);
        i += length;
        break;
      case 0x12: // ID 12 - Pure Tone
        length = 4;
        block = new PureTone(length, data.slice(i, i + length));
        tzx.blocks.push(block);
        i += length;
        break;
      case 0x13: // ID 13 - Pulse sequence
        length = data[i] * 2 + 1;
        block = new PulseSequence(length, data.slice(i, i + length));
        tzx.blocks.push(block);
        i += length;
        break;
      case 0x14: // ID 14 - Pure Data Block
        length = getNWord(data[i + 7], data[i + 8], data[i + 9]) + 10;
        block = new PureDataBlock(length, data.slice(i, i + length));
        tzx.blocks.push(block);
        i += length;
        break;
      case 0x20: // ID 20 - Pause (silence) or 'Stop the Tape' command
        length = 2;
        block = new PauseStopTape(length, getWord(data[i], data[i + 1]));
        tzx.blocks.push(block);
        i += length;
        break;
      case 0x21: // ID 21 - Group start
        length = data[i] + 1;
        block = new GroupStart(length, data.slice(i + 1, i + length));
        tzx.blocks.push(block);
        i += length;
        break;
      case 0x22: // ID 22 - Group end
        length = 0;
        block = new GroupEnd();
        tzx.blocks.push(block);
        i += length;
        break;
      case 0x24: // ID 24 - Loop start
        length = 2;
        block = new LoopStart(length, data.slice(i, i + length));
        tzx.blocks.push(block);
        i += length;
        break;
      case 0x25: // ID 25 - Loop end
        length = 0;
        block = new LoopEnd();
        tzx.blocks.push(block);
        i += length;
        break;
      case 0x30: // ID 30 - Text description
        length = data[i] + 1;
        block = new TextDescription(length, data.slice(i + 1, i + length));
        tzx.blocks.push(block);
        i += length;
        break;
      case 0x32: // ID 32 - Archive info
        length = getWord(data[i], data[i + 1]) + 2;
        block = new ArchiveInfo(length, data.slice(i + 2, i + length));
        tzx.blocks.push(block);
        i += length;
        break;

      default:
        console.error(`UNKNOWN BLOCK ID: 0x${id.toString(16)}`);
        i = 100000000000;
        break;
    }
  }

  return tzx;
}

module.exports = {
  readTape: readTape,
  TZXObject: TZXObject,
};
