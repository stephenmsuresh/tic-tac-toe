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
            board[i][j] = ".";
            // change this to ""
        }
    }

    let fillSpot = (row, column, marker) => {
        if (!(row >= 0) ||
            !(row < 3) ||
            !(column >= 0) ||
            !(column < 3)) {
            return
        }
        board[row][column] = marker;
    }

    let getBoard = () => {
        return board;
    }


    return {
        board,
        fillSpot,
        getBoard
    };
});

let GameController = (() => {
    let players = [
        { player: 1, mark: 'x' },
        { player: 2, mark: 'o' }
    ];

    let board = TicTacToeBoard();
})