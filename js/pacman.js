'use strict'
const PACMAN = '😷'
var gPacman
function createPacman(board) {
    // TODO
    gPacman = {
        location: { i: 5, j: 7 },
        isSuper: false,
    }
    gBoard[gPacman.location.i][gPacman.location.j] = PACMAN
}
gIntervalCherry = setInterval(addCherry,5000)
function movePacman(ev) {
    
    if (!gGame.isOn) return
    // TODO: use getNextLocation(), nextCell
    var nextLocation = getNextLocation(ev)

    // TODO: return if cannot move
    var nextCell = gBoard[nextLocation.i][nextLocation.j]

    if (nextCell === WALL) return

    // TODO: hitting a ghost?  call gameOver

    if (nextCell === GHOST) {
        if (!gPacman.isSuper) {
            gameOver()
            return
        } else {
            eatGhost(nextLocation)
        }
    }

    // TODO: moving from corrent position:
    // TODO: update the model

    if (nextCell === SUPER_FOOD) {
        if (gPacman.isSuper) return
        gGame.foodCount--
        updateScore(1)
        gPacman.isSuper = true
        setTimeout(restorGhost, 5000)

        for(var i = 0 ; i < gGhosts.length ; i++){
            renderCell(gGhosts[i].location, getGhostHTML(gGhosts[i]))
        }
    }
    
    if (nextCell === FOOD){
        gGame.foodCount--
        updateScore(1)
    } 

    if (nextCell === CHERRY){
        gGame.foodCount--
        updateScore(10)
    }  
    
    gBoard[gPacman.location.i][gPacman.location.j] = EMPTY
    renderCell(gPacman.location, EMPTY)

    // TODO: Move the pacman to new location
    // TODO: update the model
    gPacman.location = nextLocation
    gBoard[gPacman.location.i][gPacman.location.j] = PACMAN

    // TODO: update the DOM
    renderCell(gPacman.location, PACMAN)
}

function getNextLocation(ev) {

    var nextLocation = {
        i: gPacman.location.i,
        j: gPacman.location.j,
    }

    // TODO: figure out nextLocation
    switch (ev.code) {
        case 'ArrowUp':
            nextLocation.i--
            break;

        case 'ArrowDown':
            nextLocation.i++
            break;

        case 'ArrowLeft':
            nextLocation.j--
            break;

        case 'ArrowRight':
            nextLocation.j++
            break;
    }
    return nextLocation;
}

