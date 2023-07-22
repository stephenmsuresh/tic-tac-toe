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
        let winCheck = 'tie';

        for (let i = 0; i < winConditions.length; i++) {
            let currMark = '';
            let prevMark = '';
            let counter = 0;
            for (let j = 0; j < winConditions[i].length; j++) {
                currMark = board.getMark(winConditions[i][j]);
                if (currMark && prevMark === '') {
                    prevMark = currMark;
                    counter++;
                }
                else if (currMark && currMark === prevMark) {
                    counter++;
                }
                else {
                    break;
                }
            }
            if (counter === 3) {
                return `win`;
            }
        }
        if (roundsPlayed === 9) {
            return 'tie'
        }
    }

    let playRound = (cell) => {
        board.fillSpot(cell, currentPlayer.mark);
        roundsPlayed++;
        let msg = checkWin();
        if (msg) {
            return msg;
        }
        else {
            switchPlayers();
        }
    }

    return {
        playRound,
        roundsPlayed,
        board,
        getCurrentPlayer,
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
        let cell = (e.target.id).slice(1);
        let msg = GameController.playRound(cell);
        if (msg) {
            displayMessage(msg);
        }
        let text = GameController.board.getMark(cell);
        e.target.textContent = text
    }
})();