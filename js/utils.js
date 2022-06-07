function printMat(mat, selector) {
    
  var strHTML = '<table border="0"><tbody>';
  for (var i = 0; i < mat.length; i++) {
    strHTML += '<tr>';
    for (var j = 0; j < mat[0].length; j++) {
      var cell = mat[i][j];
      var className = 'cell cell-' + i + '-' + j;
      strHTML += '<td class="' + className + '"> ' + cell + ' </td>'
    }
    strHTML += '</tr>'
  }
  strHTML += '</tbody></table>';
  var elContainer = document.querySelector(selector);
  elContainer.innerHTML = strHTML;
}

// location such as: {i: 2, j: 7}
function renderCell(location, value) {
  // Select the elCell and set the value
  var elCell = document.querySelector(`.cell-${location.i}-${location.j}`);
  elCell.innerHTML = value;
}

function getRandomIntInclusive(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

// function getRandomCell(){
//   var
// }


function getRandomColor() {
  var letters = '0123456789ABCDEF';
  var color = '#';
  for (var i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
}

function getEmptyCell(){
  var emptyCells = []
  
  for(var i = 1 ; i < gBoard.length - 1; i++){
    for(var j = 1 ; j < gBoard[0].length - 1; j++){
      if(gBoard[i][j] === EMPTY)
      emptyCells.push({i, j})
    }
  }
  
  if(emptyCells.length === 0) return null
  if(emptyCells.length === 1) return emptyCells[0]

  var randomIdx = getRandomIntInclusive(0,emptyCells.length - 1)
  return emptyCells[randomIdx]
}