const TicTacToeBoard = (() => {
    let board = new Array(9);

    let fillSpot = (cell, marker) => {
        if (!board[cell]) {
            board[cell] = marker
        }
    }

    let getBoard = () => {
        return board;
    }

    let getMark = (cell) => {
        return board[cell];
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
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6]
    ]; //any of these 3 all have to have the same symbol to win

    //function that checks win after every move
    let checkWin = () => {
        winConditions.forEach((condition) => {
            let currMark = '';
            let prevMark = '';
            let row, col, counter;
            counter = 0;
            for (let i = 0; i < 3; i++) {
                currMark = board.getMark(condition[i]);
                if (!prevMark) {
                    prevMark = currMark;
                    counter++;
                }
                else if (currMark === prevMark) {
                    counter++;
                }
                else {
                    break;
                }
            }
            if (counter === 3) {
                return `Player ${currentPlayer.name} won!`
            }
        });
    }

    let playRound = (cell) => {
        board.fillSpot(cell, currentPlayer.mark);
        let msg = checkWin();
        console.log(msg);
        if (msg) {
            console.log(msg);
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
        let msg = GameController.playRound(row, col);
        let text = GameController.board.getMark(row, col);
        e.target.textContent = text
    }
})();