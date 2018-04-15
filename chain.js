
const Block = require('./block').block;

class Blockchain {
  constructor() {
    this.chain = [this.createGenesisBlock()]
  }

  createGenesisBlock() {
    return new Block(0, Date.now(), "Genesis block", "0")
  }

  getLatestBlock() {
    return this.chain[this.chain.length - 1];
  }

  addBlock(newBlock) {
    newBlock.previousHash = this.getLatestBlock().hash;
    newBlock.hash = newBlock.caclulateHash();
    this.chain.push(newBlock)
  }

  isChainValid() {
    for (let i = 1; i < this.chain.length; i++){
      let currentBlock = this.chain[i];
      let prevBlock = this.chain[i-1];

      if (currentBlock.hash !== currentBlock.caclulateHash()){
        return false;
      }

      if (currentBlock.previousHash !== prevBlock.hash){
        return false;
      }
      return true;
    }
  }
}

let expCoin = new Blockchain();

expCoin.addBlock(new Block(1, '1', {amount: 4}))
expCoin.addBlock(new Block(2, '2', {amount: 8}))

//console.log(expCoin)
console.log("Blockchain valid? ", expCoin.isChainValid()) // true
expCoin.chain[1].data = {amount: 10000} // manipulate it
console.log("Blockchain valid? ", expCoin.isChainValid()) // false