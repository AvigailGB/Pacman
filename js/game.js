'use strict'
const WALL = '#'
const FOOD = '.'
const EMPTY = ' '
const SUPER_FOOD = '@'
const CHERRY = '🍒'
// const CHERRY = img/images.jpg
// console.log('CHERRY',CHERRY)
var gIntervalCherry

var gBoard;
var gGame = {
    score: 0,
    isOn: false,
    foodCount: 60
}
function init() {
    console.log('hello pacman')

    gGame.isOn = true
    gGame.score = 0
    updateScore(0)
    var elModal = document.querySelector('.game-over')
    elModal.style.display = 'none'
    var elModal = document.querySelector('.victorious')
    elModal.style.display = 'none'

    gGhosts = []

    gBoard = buildBoard()
    console.table(gBoard)

    createPacman(gBoard);
    createGhosts(gBoard);

    printMat(gBoard, '.board-container')

}
function buildBoard() {
    const SIZE = 10;
    var board = [];

    for (var i = 0; i < SIZE; i++) {
        board.push([]);
        for (var j = 0; j < SIZE; j++) {
            board[i][j] = FOOD;
            if (i === 0 || i === SIZE - 1 ||
                j === 0 || j === SIZE - 1 ||
                (j === 3 && i > 4 && i < SIZE - 2)) {
                board[i][j] = WALL;
            }
            if (i === 1 && j === 1 ||
                i === 8 && j === 1 ||
                i === 1 && j === 8 ||
                i === 8 && j === 8) {
                board[i][j] = SUPER_FOOD
            }
        }
    }

    return board;
}
function updateScore(diff) {
    // TODO: update model and dom

    // Model
    gGame.score += diff

    // DOM
    var elScore = document.querySelector('h2 span')
    elScore.innerText = gGame.score
    if (gGame.foodCount === 0) gameOver(true)
}

function restorGhost() {
    gPacman.isSuper = false
    gGhosts.push(...gEatenGhosts)
    gEatenGhosts = []
    for (var i = 0; i < gGhosts.length; i++) {
        renderCell(gGhosts[i].location, getGhostHTML(gGhosts[i]))
    }

}

function addCherry() {
    var emptyCell = getEmptyCell()
    if (emptyCell === null) return
    gBoard[emptyCell.i][emptyCell.j] = CHERRY
    renderCell(emptyCell, CHERRY)
    setTimeout(function () {
        gBoard[emptyCell.i][emptyCell.j] = EMPTY
        renderCell(emptyCell, EMPTY)
    }, 5000)

}

function gameOver(victrious = false) {
    gGame.isOn = false
    // Some more stuff coming later
    clearInterval(gIntervalGhosts)
    clearInterval(gIntervalCherry)
    if (victrious) {
        var elModal = document.querySelector('.victorious')
        elModal.style.display = 'block'
    } else {
        var elModal = document.querySelector('.game-over')
        elModal.style.display = 'block'
    }

}

