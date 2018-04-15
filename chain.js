
const Block = require('./block').block;
const Transaction = require('./transaction').transaction

class Blockchain {
  constructor(difficulty) {
    this.chain = [this.createGenesisBlock()]
    this.difficulty = difficulty;

    this.pendingTransactions = [];

    this.miningReward = 100;
  }

  createGenesisBlock() {
    return new Block(0, Date.now(), "Genesis block", "0")
  }

  getLatestBlock() {
    return this.chain[this.chain.length - 1];
  }

  createTransaction(transaction){
    //validations
    this.pendingTransactions.push(transaction)
  }

  minePendingTransactions(rewardAddress) {
    let block = new Block(Date.now(), this.pendingTransactions);
    block.mineBlock(this.difficulty);

    this.chain.push(block)

    // Reset pending transactions and add a new transaction that is the reward for the miner
    this.pendingTransactions = [
      new Transaction(null, miningRewardAddress, this.miningReward)
  ];
  }

  isChainValid() {
    for (let i = 1; i < this.chain.length; i++){
      let currentBlock = this.chain[i];
      let prevBlock = this.chain[i-1];

      if (currentBlock.hash !== currentBlock.calculateHash()){
        return false;
      }

      if (currentBlock.previousHash !== prevBlock.hash){
        return false;
      }
      return true;
    }
  }
}

let expCoin = new Blockchain(2);

expCoin.addBlock(new Block('1', {amount: 4}))
expCoin.addBlock(new Block('2', {amount: 8}))

//console.log(expCoin)
console.log("Blockchain valid? ", expCoin.isChainValid()) // true
expCoin.chain[1].data = {amount: 10000} // manipulate it
console.log("Blockchain valid? ", expCoin.isChainValid()) // false