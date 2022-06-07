'use strict'
const GHOST = '&#9781;'
var gGhosts = []
var gIntervalGhosts
var gEatenGhosts = []

function createGhost(board) {
    // TODO
    var ghost = {
        location: { i: 3, j: 3 },
        currCellContents: FOOD,
        color: getRandomColor()
    }
    gGhosts.push(ghost)
    gBoard[ghost.location.i][ghost.location.j] = GHOST
}

function createGhosts(board) {
    // TODO: 3 ghosts and an interval
    for (var i = 0; i < 3; i++) {
        createGhost(board)
    }
    gIntervalGhosts = setInterval(moveGhosts, 1000)
}

function moveGhosts() {
    // TODO: loop through ghosts
    for (var i = 0; i < gGhosts.length; i++) {
        moveGhost(gGhosts[i])
    }
}
function moveGhost(ghost) {
    // TODO: figure out moveDiff, nextLocation, nextCell

    var moveDiff = getMoveDiff()
    var nextLocation = {
        i: ghost.location.i + moveDiff.i,
        j: ghost.location.j + moveDiff.j,
    }

    var nextCell = gBoard[nextLocation.i][nextLocation.j]

    // TODO: return if cannot move
    if (nextCell === WALL) return
    if (nextCell === GHOST) return

    // TODO: hitting a pacman?  call gameOver

    if (nextCell === PACMAN) {
        if(gPacman.isSuper === false){
            gameOver()
            return
        }
    }
    // TODO: moving from current position:
    // TODO: update the model

    // Restore the prev cell contents
    gBoard[ghost.location.i][ghost.location.j] = ghost.currCellContents

    // TODO: update the DOM
    renderCell(ghost.location, ghost.currCellContents)

    // TODO: Move the ghost to new location
    // TODO: update the model

    // Save the new cell contents so we can restore later
    ghost.currCellContents = gBoard[nextLocation.i][nextLocation.j]

    ghost.location = nextLocation
    gBoard[nextLocation.i][nextLocation.j] = GHOST

    // TODO: update the DOM
    renderCell(ghost.location, getGhostHTML(ghost))
}


function getMoveDiff() {
    var randNum = getRandomIntInclusive(1, 100)

    if (randNum <= 25) {
        return { i: 0, j: 1 }
    } else if (randNum <= 50) {
        return { i: -1, j: 0 }
    } else if (randNum <= 75) {
        return { i: 0, j: -1 }
    } else {
        return { i: 1, j: 0 }
    }
}

function eatGhost(location) {
    for (var i = 0; i < gGhosts.length; i++) {
        var currGhost = gGhosts[i]
        if (currGhost.location.i === location.i && currGhost.location.j === location.j) {
            console.log('hi')
            var eatenGhost = gGhosts.splice(i, 1)[0]
            gEatenGhosts.push(eatenGhost)
            break
        }
    }
}

function getGhostHTML(ghost) {
    var color = (gPacman.isSuper) ? 'blue' : ghost.color
    return `<span style = color:${color} >${GHOST}</span>`
}