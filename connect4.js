const readline = require('readline');
const Board = require("./board");
const rl = readline.createInterface(process.stdin);
const question = function (q) {
  return new Promise((resolve, reject) => {
    rl.question(q, (answer) => {
      resolve(answer)
    });
  })
}

class Connect4Game {
  constructor(cols = 7, rows = 6) {
    this.player;
    this.gameOver = false;
    this.cols = cols;
    this.rows = rows;
    this.chips = { 
      1:"R" ,
      2:"Y",
      "R" :"RED",
      "Y" :"YELLOW"
    }

    this.board = new Board(cols, rows,this.chips)
  }

  async start() {
    this.player = Math.floor(Math.random() * (2 - 1 + 1)) + 1;
    console.log("**************************************************")
    console.log("GAME START !!! The randomly selected player is :", this.player)
    console.log("*************************************************")

    while (!this.board.isFull()) {
      await this.chooseSlot()
    }
    console.log("No winner !!! ")
  }



  async chooseSlot() {
    let slot;
    console.log("Player " + this.player + " Choose slot to insert " + this.chips[this.chips[this.player]] ,"chip :")
    try {
      slot = await question('Choose free slot ? ');
      slot = this.validateSlot(slot);
      if (!slot)
        return await this.chooseSlot();
    } catch (err) {
      console.error('Question rejected', err);
      return await this.chooseSlot();
    }
  
    if (this.checkForWinner(slot)) {
      console.log("Winner is player :", this.player, "after ", this.board.spotCounter, "moves")
     
      process.exit(0);
    };

    this.swap();
  }

  swap() {
    this.player = this.player == 1 ? 2 : 1;
  }

  validateSlot(slot) {
    let [num] = slot.match(/\d+/) || [];

    if (!(num && (num >= 1 && num <= this.cols))) {
      console.log("Please choose one of valid slot ", 1, "  - ", this.cols);
      return 0;
    }

    if (this.board.isSlotFull(num - 1)) {
      console.log("Slot", num, "is full , please choose another !");
      return 0;
    }

    return num * 1;
  }

  checkForWinner(slot) {
    let isWin = this.board.putInSlot(slot - 1, this.player);
    this.board.display();
    return isWin;
  }

}

module.exports = Connect4Game;