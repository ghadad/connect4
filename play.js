const Connect4Game = require("./connect4")

const startGame  =  async () => {
    const g = new Connect4Game();
    await g.start() ;
}

startGame()