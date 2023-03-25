const gameTiles = Array.from(document.querySelectorAll('.cell'));
const playerDisplay = document.querySelector('.choice');
const restartBtn = document.querySelector('#reset');
const winner = document.querySelector('.winner');

const WIN_X = 'WIN_X';
const WIN_O = 'WIN_O';
const TIE = 'TIE';

const winningConditions = [ [0, 1, 2],[3, 4, 5],
                            [6, 7, 8],[0, 3, 6],
                            [1, 4, 7],[2, 5, 8],
                            [0, 4, 8],[2, 4, 6]
                        ];

let board = [   '', '', '', 
                '', '', '', 
                '', '', ''
            ];
        
let playingGame = true;
let currentPlayer = 'X';

function validateResult() {
    let roundWon = false;
    for (let i = 0; i <= 7; i++) {
        const winCondition = winningConditions[i];
        const a = board[winCondition[0]];
        const b = board[winCondition[1]];
        const c = board[winCondition[2]];
        if (a === '' || b === '' || c === '') {
            continue;
        }
        if (a === b && b === c) {
            roundWon = true;
            break;
        }
    }

    if (roundWon) {
        displayWinner(currentPlayer === 'X' ? WIN_X : WIN_O);
        playingGame = false;
        return;
    }

    else if (!board.includes('')) { displayWinner(TIE); }
}

const displayWinner = function (type) {
    if (type === WIN_O){
        winner.innerHTML = 'Player <span class="playerO">O</span> Won!';
    }
    else if (type === WIN_X){
        winner.innerHTML = 'Player <span class="playerX">X</span> Won!';
    }
    else if (type === TIE) {
        winner.innerHTML = 'Tie!';
    }
    winner.classList.remove('hide');
};

const validAction = function (tile) {
    return !(tile.innerText === 'X' || tile.innerText === 'O');
};

const updateBoard = function (index) {
    board[index] = currentPlayer;
}

const changePlayer = function () {
    //changing the player
    playerDisplay.classList.remove(`player${currentPlayer}`);
    currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
    playerDisplay.innerText = currentPlayer;
    playerDisplay.classList.add(`player${currentPlayer}`);
}

const userAction = function (tile, index) {
    //checking for user action and will call valid action
    //to check if its valid or not
    if(validAction(tile) && playingGame) {
        tile.innerText = currentPlayer;
        tile.classList.add(`player${currentPlayer}`);
        updateBoard(index);
        validateResult();
        changePlayer();
    }
}

const resetBoard = function () {
    //resetting the board
    board = [   '', '', '', 
                '', '', '', 
                '', '', ''
            ];

    playingGame = true;
    winner.classList.add('hide');

    if (currentPlayer === 'O') {
        changePlayer();
    }

    for(let i = 0; i < gameTiles.length; i++) {
        gameTiles[i].innerText = '';
        gameTiles[i].classList.remove('playerX');
        gameTiles[i].classList.remove('playerO');
    }
}

// adding eventListeners to each cell / gameTile
for(let i = 0; i < gameTiles.length; i++) {
    gameTiles[i].addEventListener('click', function () {
        userAction(gameTiles[i], i)
    });
}

restartBtn.addEventListener('click', resetBoard);