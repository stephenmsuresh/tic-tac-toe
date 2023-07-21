const TicTacToeBoard = (() => {
    let rows = 3;
    let columns = 3;

    //3x3 array
    // row 1
    // row 2
    // row 3
    let board = [];
    for (let i = 0; i < rows; i++) {
        board[i] = [];
        for (let j = 0; j < columns; j++) {
            board[i][j];
            // change this to ""
        }
    }

    let fillSpot = (row, column, marker) => {
        if (!(row >= 0) ||
            !(row < 3) ||
            !(column >= 0) ||
            !(column < 3) ||
            (board[row][column])) {
            return
        }
        board[row][column] = marker;
    }

    let getBoard = () => {
        return board;
    }

    let getMark = (row, column) => {
        if (!(row >= 0) ||
            !(row < 3) ||
            !(column >= 0) ||
            !(column < 3)) {
            return
        }
        return board[row][column];
    }


    return {
        board,
        fillSpot,
        getBoard,
        getMark,
    };
});

let GameController = (() => {
    let players = [
        { player: 1, mark: 'x' },
        { player: 2, mark: 'o' }
    ];

    let currentPlayer = players[0];
    let board = TicTacToeBoard();
    let roundsPlayed = 0;

    let switchPlayers = () => {
        currentPlayer = currentPlayer === players[0] ? players[1] : players[0];
    }

    let getCurrentPlayer = () => {
        return currentPlayer;
    }

    let winConditions = [
        ["01", "02", "03"],
        ["10", "11", "12"],
        ["20", "21", "22"],
        ["00", "10", "20"],
        ["01", "11", "12"],
        ["02", "12", "22"],
        ["00", "11", "22"],
        ["02", "11", "20"]
    ]; //any of these 3 all have to have the same symbol to win

    //function that checks win after every move
    let checkWin = () => {
        winConditions.forEach((winCondition) => {
            for (let i = 0; i < 3; i++) {
                let counter = 0;
                let row, col;
                for (let j = 0; j < 3; j++) {
                    let currentMark = ""
                    let previousMark = ""
                    [row, col] = winCondition[i][j].split();
                    currentMark = board.getMark(row, col);
                    if (counter === 0) { //first instance of mark
                        counter++;
                        previousMark = currentMark;
                    }
                    else {
                        if (currentMark === previousMark) {
                            counter++;
                            previousMark = currentMark;
                            if (counter === 3) {
                                console.log("win");
                                return `Player ${currentPlayer.player} has won!`; //there is a win,
                            }
                        }
                        else {
                            break; //break out of j foor loop to go to the next win condition combination
                        }
                    }
                }

            }
            if (roundsPlayed < 9) {
                console.log("no win yet")
                return false; //end of checking all win conditions
            }
            console.log("tie");
            return `Game Over! It's a Tie!`
        })
    }

    let playRound = (row, column) => {
        board.fillSpot(row, column, currentPlayer.mark);
        console.log(board.getMark(row, column));
        let msg = checkWin();
        if (msg) {
            return msg;
        }
        else {
            switchPlayers();
            roundsPlayed++;
            console.log(roundsPlayed)
            return msg;
        }
    }

    return {
        playRound,
        roundsPlayed,
        board,
    };
})();

let displayController = (() => {
    const boardCells = document.querySelectorAll('.cell');
    boardCells.forEach((cell) => {
        cell.addEventListener('click', (e) => {
            placeMarker(e);
        });
    })

    function placeMarker(e) {
        let row, col;
        [row, col] = (e.target.id).slice(1).split("");
        console.log(row);
        console.log(col);
        console.log(GameController.board.getMark(+row, +col));
        let text = GameController.board.getMark(row, col);
        console.log(text);
        e.target.textContent = text
        let msg = GameController.playRound(row, col);
        console.log(msg);
    }
})();