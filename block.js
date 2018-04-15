const crypto = require('crypto');

exports.block = class Block {
  constructor(index, timestamp, data, previousHash = '') {
    this.index = index;
    this.previousHash = previousHash;
    this.timestamp = timestamp;
    this.data = data;
    this.hash = this.calculateHash();
    this.nonce = 0;
  }

  calculateHash() {
    return crypto.createHash('sha256')
      .update(this.index + 
        this.previousHash + 
        this.timestamp + 
        JSON.stringify(this.data) +
        this.nonce)
        .digest('hex');
  }

  mineBlock(difficulty) {
    while(this.hash.substring(0, difficulty) !== Array(difficulty + 1).join('0')){
      this.nonce++;
      this.hash = this.calculateHash();
    }
    console.log("BLOCK MINED: " + this.hash);
    console.log("Ending Nonce: ", this.nonce)
  }
}