/* test geritt commit 2*/
/* test geritt commit 3*/

/** Class representing a game  board */
class Board {
    /**
     * Create a board.
     * @param {number} cols - number of slots.
     * @param {number} rows - number of rows
     * @param {object} chips - chips dictionary object 
     */
    constructor(cols = 7, rows = 6 ,chips) {
        this.rows = rows;
        this.cols = cols;
        this.board = this.initBoard(cols, rows);
        this.totalSpots = cols * rows;
        this.currentSpot = {
            x: null,
            y: null
        };
        this.spotCounter = 0;

        this.chips = {'1':'R','2':'Y','empty':' '} ;
        Object.assign(this.chips,chips);

    }

  /**
     * Initilize new colsXrows board .
     * @param {number} cols - number of slots.
     * @param {number} rows - number of rows.
     * @return {object} board 
     */   
    initBoard(cols, rows) {
        var x = new Array(cols);
        for (var i = 0; i < x.length; i++) {
            x[i] = []
        }
        return x;
    }

  /**
     * Check if choosen slot is full
     * @param {number} slot 
     * @return {boolean} true/false
    */     
    isSlotFull(slot) {
        return this.board[slot].length >= this.rows ? true : false;
    }

    /**
     * Check if board is full , in this case no winner is annonced
     * @return  {boolean} true/false
    */     
    isFull() {
        return this.spotCounter >= this.totalSpots;
    }

  /**
     * Display the board state 
    */     
    display() {
        for (let i = this.rows - 1; i >= 0; i--) {
            let line = "";
            for (let j = 0; j < this.cols; j++) {
                line += "[" + this.getDisplaySpot(j, i) + "]";
            }
            console.log(line)
        }
    }

    /**
     * get stored chip in X,Y spot 
     * @return {Number} 1 - for player 1 , 2- for player 2 , 0 - for empty spot
    */     
    getSpot(x, y) {
        if (this.board[x] && this.board[x][y])
            return this.board[x][y];
        return 0;
    }

    /**
     * get stored chip for the board drawing 
     * @return {Number} R(ed) - for player 1 , Y(ellow) - for player 2 , ' ' - for empty spot
    */     
    getDisplaySpot(x, y) {
        if (this.board[x] && this.board[x][y])
            return this.chips[''+this.board[x][y]];
        return this.chips.empty;
    }

    /**
     * test if there is a 4 connected where p1 is the chip color 
     * @return {Boolean}  
    */     
    testOption(p1, p2, p3, p4) {
        return (p1 == p2 && p2 == p3 && p3 == p4)
    }

    /**
     * choose slot to insert the chip   and check if the currenct player is a winner 
     * @return {Boolean} 
    */     
    
    putInSlot(slot, chip) {
        this.board[slot].push(chip)
        this.spotCounter++;
        this.currentSpot = {
            x: slot,
            y: this.board[slot].length - 1
        };
        let X = this.currentSpot.x;
        let Y = this.currentSpot.y;
        let C = this.board[this.currentSpot.x][this.currentSpot.y];
        return this.checkConnect4(C, X, Y)
    }



    /**
     * Check all potential hits : Vartical,Horizontal,and diagonals  
     * 
     * @param {number} C - last inserted chip 
     * @param {X} - last X position of inserted chip 
     * @param {Y} - last Y position of inserted chip 
     * @return {boolean} true/false
    */     
      checkConnect4(C,X,Y) { 
        const checkPoints = [
            // Vertical
            [[X,Y-1],[X,Y-2],[X,Y-3]],

            // horizontal
            [[X - 1,Y], [X - 2,Y], [X - 3,Y]],
            [[X - 1,Y], [ X - 2,Y], [X + 1,Y]],
            [[X - 1,Y], [X + 1,Y], [X + 2,Y]],
            [[X + 1,Y], [X + 2,Y], [X + 3,Y]] ,

            // left Diagonal
            [[X-1,Y+1],[X-2,Y+2],[X-3,Y+3]],
            [[X-1,Y+1],[X-2,Y+2],[X+1,Y-1]],
            [[X-1,Y+1],[X+2,Y-2],[X+1,Y-1]],
            [[X+1,Y-1],[X+2,Y-2],[X+3,Y-3]],

            // right Diagonal
            [[X+1,Y+1],[X+2,Y+2],[X+3,Y+3]],
            [[X-1,Y-1],[X+1,Y+1],[X+2,Y+2]],
            [[X-2,Y-2],[X-1,Y-1],[X+1,Y+1]],
            [[X-3,Y-3],[X-2,Y-2],[X-1,Y-1]],
        ]

        for (let triple of checkPoints) {
            if (this.testOption(C, 
                                this.getSpot(triple[0][0],triple[0][1] ), 
                                this.getSpot(triple[1][0],triple[1][1]), 
                                this.getSpot(triple[2][0],triple[2][1]))) {
                return true;
            }
        }
        return false;
    }
}

module.exports = Board;
