const TicTacToeBoard = (() => {
    let board = new Array(9);

    let fillSpot = (cell, marker) => {
        if (!board[cell]) {
            board[cell] = marker
        };
    };

    let getBoard = () => {
        return board;
    };

    let getMark = (cell) => {
        return board[cell];
    };

    let boardReset = () => {
        for (let i = 0; i < board.length; i++) {
            board[i] = '';
        };
    };


    return {
        board,
        fillSpot,
        getBoard,
        getMark,
        boardReset,
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

    let resetGame = () => {
        board.boardReset();
        roundsPlayed = 0;
        currentPlayer = players[0];
    }

    let getMark = (cell) => {
        return board[cell];
    }

    return {
        playRound,
        roundsPlayed,
        getCurrentPlayer,
        resetGame,
        board,
    };
});

let displayController = (() => {
    let gameController = GameController();
    let circleUrl = `./assets/images/empty-circle-svgrepo-com.svg`;
    let crossUrl = `./assets/images/iconmonstr-x-mark-1.svg`;
    let messageContainer = document.querySelector('.message');
    let messageText = document.querySelector('.message-text span');
    const boardCells = document.querySelectorAll('.cell');

    let createGame = () => {
        boardCells.forEach((cell) => {
            cell.style.backgroundImage = '';
            cell.removeEventListener('click', placeMarker);
            cell.addEventListener('click', placeMarker, { once: true }); //event acts only once, then deletes itself
        });
    };

    function placeMarker(evt) {
        let cell = (evt.target.id).slice(1);
        let msg = gameController.playRound(cell);
        evt.target.style.backgroundImage = `url(${gameController.board.getMark(cell) === 'x' ? crossUrl : circleUrl})`;
        if (msg) {
            displayMessage(msg);
        };
    };

    let displayMessage = (msg) => {
        if (msg === 'win') {
            messageText.textContent = `${(gameController.getCurrentPlayer().mark).toUpperCase()} Has Won!`
        }
        else {
            messageText.textContent = `It's A Tie!`
        };
        messageContainer.classList.remove('hidden');
    };

    function resetGame(e) {
        createGame();
        messageContainer.classList.add('hidden');
        messageText.textContent = ``;
        gameController.resetGame();
    }

    createGame();
    messageContainer.addEventListener('click', (e) => {
        resetGame(e);
    })
})();