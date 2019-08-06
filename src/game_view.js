function GameView(size) {
  this.size = size;
  this.render = this.render.bind(this);
  this.boardContainer = document.querySelector('.board-container');
  this.gridCell = document.querySelector('.grid-cell');
  this.messageScreen = document.querySelector('.message-screen');
  this.scoreBoard = document.querySelector('.score-board');
}

GameView.prototype.render = function render(board) {
  this.clearContainer();
  
  debugger

  board.grids.forEach(row => {
    row.forEach(cell => {
      if(cell) {
        let visualTile = this.addVisualTile(cell);
        let gridCell = document.querySelector(`.grid-cell-${cell.x}-${cell.y}`);
        gridCell.appendChild(visualTile);
      }
    })
  })
}

GameView.prototype.clearContainer = function () {
  for(let row = 0; row < this.size; row+=1) {
    for(let col = 0; col < this.size; col+=1) {
      let gridCell = document.querySelector(`.grid-cell-${row}-${col}`);
      if(gridCell.children.length === 1) {
        gridCell.removeChild(gridCell.children[0]);
      }
    }
  }
};

GameView.prototype.shiftTile = (tile, cell) => {
  let tilePos = document.querySelector(`.grid-cell-${cell.x}-${cell.y}`);
  let translateX = cell.x- tile.x;
  let translateY = cell.y - tile.y;
  var translate = 'translate(' + (translateX * 65) + 'px, ' + (translateY * 65) + 'px)';
  tilePos.style.webkitTransform = translate;
  tilePos.style.transform = translate;
}

GameView.prototype.addVisualTile = (cell) => {
  let tile = document.createElement('div');
  tile.classList.add('tile-inner');

  debugger

  if(cell.value === 3) {
    debugger
    tile.style.backgroundColor = '#eee4da';
  }
  else if(cell.value === 6) {
    tile.style.backgroundColor = '#ede0c8';
  }
  else if (cell.value === 12) {
    tile.style.backgroundColor = '#f2b179';
  }
  else if (cell.value === 24) {
    tile.style.backgroundColor = '#f59563';
  }
  else if (cell.value === 48) {
    tile.style.backgroundColor = '#f67c5f';
  }
  else if (cell.value === 96) {
    tile.style.backgroundColor = '#f65e3b';
  }
  else if (cell.value === 192) {
    tile.style.backgroundColor = '#edcf72';
  }
  else if(cell.value === 384) {
    tile.style.backgroundColor = '#edcc61';
  }
  else if (cell.value === 768) {
    tile.style.backgroundColor = '#edc850';
  }
  else if (cell.value === 1526) {
    tile.style.backgroundColor = '#edc53f';
  }
  else if (cell.value === 3052) {
    tile.style.backgroundColor = '#edc22e';
  }
  tile.innerHTML = cell.value;
  tile.style.fontWeight = 'bold';
  tile.style.color = '#776E65';

  return tile;
}

GameView.prototype.updateScore = (score) => {
  let scoreBoard = document.querySelector('.score-board');
  scoreBoard.innerHTML = score;
}

GameView.prototype.winGame = () => {
  let messageScreen = document.querySelector('.message-screen');
  messageScreen.innerHTML = 'You win!';
}

GameView.prototype.gameOver = () => {
  let messageScreen = document.querySelector('.message-screen');
  messageScreen.innerHTML = 'GAME OVER';
}

module.exports = GameView;