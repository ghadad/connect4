class Board {
    constructor(cols = 7 , rows = 6 ) {
        this.rows = rows;
        this.cols = cols;
        this.board = this.initBoard(cols, rows);
        this.totalSpts =cols * rows ;
        this.currentSpot = {
            x: null,
            y: null
        };
        this.spotCounter = 0;
    }

    initBoard(cols, rows) {
        var x = new Array(cols);
        for (var i = 0; i < x.length; i++) {
            x[i] = []
        }
        return x;
    }

    isSlotFull(slot) {
        return this.board[slot].length >= this.rows ? true : false;
    }

    isFull(slot) {
       return this.spotCounter >= this.totalSpts ;  
    }

    display() {
        for(let i = this.cols -1; i>=0;i--) {
            let line = "" ;
            for(let j = 0 ; j<this.rows;j++) {
                line += "["+this.getSpot(j,i) +"]";
            }
            console.log(line)
        }
    }

    getSpot(x, y) {
        if (this.board[x] && this.board[x][y])
            return this.board[x][y];
        return 0;
    }

    testOption(p1, p2, p3, p4) {
        
        return (p1 == p2 && p2 == p3 && p3 == p4)
    }

    putInSlot(slot, coin) {

        this.board[slot].push(coin)
        this.spotCounter++;
        this.currentSpot = {
            x: slot,
            y: this.board[slot].length - 1
        };
        let X = this.currentSpot.x;
        let Y = this.currentSpot.y;
        let C = this.board[this.currentSpot.x][this.currentSpot.y];
        return this.checkConnect4(C,X,Y)
    }


    

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
            [[X-1,Y+1],[X-2,Y+2],[X-3,Y+3]],
            [[X-1,Y+1],[X-2,Y+2],[X-3,Y+3]],
            [[X-1,Y+1],[X-2,Y+2],[X-3,Y+3]],

            // right Diagonal
            [[X+1,Y+1],[X+2,Y+2],[X+3,Y+3]],
            [[X-1,Y-1],[X+1,Y+1],[X+2,Y+2]],
            [[X-2,Y-2],[X+1,Y+1],[X+2,Y+2]],
            [[X-3,Y-2],[X-2,Y-2],[X-1,Y-3]]
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