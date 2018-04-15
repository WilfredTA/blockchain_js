const crypto = require('crypto');

exports.block = class Block {
  constructor(index, timestamp, data, previousHash = '') {
    this.index = index;
    this.previousHash = previousHash;
    this.timestamp = timestamp;
    this.data = data;
    this.hash = this.caclulateHash();
  }

  caclulateHash() {
    return crypto.createHash('sha256')
      .update(this.index + this.previousHash + this.timestamp + JSON.stringify(this.data)).digest('hex');
  }
}