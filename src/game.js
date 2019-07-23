const Board = require('./board');
const GameView = require('./game_view');
const Input = require('./input');
const Tile = require('./tile');

class Game {
  constructor() {
    this.size = 4;
    this.score = 0;
    this.won = false;
    this.board = new Board(this.size);
    this.view = new GameView(this.size);
    this.view.render(this.board);
    this.input = new Input(this.move.bind(this));
  }

  move(direction) {
    // Iterate through the board and move tiles in direction
    let map = {
      'ArrowUp': {x:-1, y:0}, // Up
      'ArrowRight': {x:0, y:1}, // Right
      'ArrowDown': {x:1, y:0}, // Down
      'ArrowLeft': {x:0, y:-1} // Left
    }
    let vector = map[direction];
    let grid = this.buildGrid(vector);

    grid.y.map( y => {
      grid.x.map( x => {
        let cell = {x:x, y:y};
        let tile = this.board.grids[x][y];
        if(tile){
          // Find farthest position and second farthest for merge possibility.
          let movePositions = this.getFarthestPosition(cell, vector);
          // Handle next position that is out of bounds.
          let nextMovePosition = movePositions.next;
          let next = this.board.cellContent(nextMovePosition);

          // Merge vs no merge.
          if(next && tile.value === next.value){
            let merged = new Tile(cell, tile.value * 2);
            this.board.grids[next.x][next.y] = null;
            this.moveTile(merged, nextMovePosition);
            // Record score.
            this.score += merged.value;
            if(merged.value === 2048) this.won = true;
          }
          else{
            this.moveTile(tile, movePositions.farthest);
          }
        }
      })
    })

    // Update score.
    this.view.updateScore(this.score);

    // Set win / lose conditions
    if(this.won) {
      this.winScreen();
    }
    else if(!this.movesAvailable()){
      this.loseScreen();
    }
    else{
      this.board.placeRandomTile();
    }
    this.view.render(this.board);
  }

  winScreen() {
    this.view.winGame();
  }

  loseScreen() {
    this.view.gameOver();
    // document.removeEventListener('keydown', this.move.bind(this));
  }

  movesAvailable() {
    let map = {
      0: { x: -1, y: 0 }, // Up
      1: { x: 0, y: 1 }, // Right
      2: { x: 1, y: 0 }, // Down
      3: { x: 0, y: -1 } // Left
    }
    let matchesAvailable = false;
    let moves = 0;
    for(let x = 0; x < this.size; x+=1) {
      for(let y = 0; y < this.size; y+=1) {
        let tile = this.board.grids[x][y];
        if(!tile){
          moves += 1;
        }
        else{
          for(let direction = 0; direction < 4; direction+=1) {
            let vector = map[direction];
            let next = {x: tile.x + vector.x, y: tile.y + vector.y};
            let nextTile = this.board.cellContent(next);
            if(nextTile && tile.value === nextTile.value) {
              matchesAvailable = true;
            }
          }
        }
      }
    }
    if(moves > 0 || matchesAvailable) {
      return true;
    }
    else{
      return false;
    }
  }

  getFarthestPosition(cell, vector) {
    let previous;
    do {
      previous = cell;
      cell = { x: previous.x + vector.x, y: previous.y + vector.y };
    }
    while(this.board.cellAvailable(cell) && this.board.withinBorder(cell));
    return {
      farthest: previous,
      next: cell
    };
  }

  buildGrid(vector) {
    let tmp = {x: [], y: []};
    for(let i = 0; i < this.size; i++){
      tmp.x.push(i);
      tmp.y.push(i);
    }
    if(vector.x === 1) {
      tmp.x.reverse();
    }
    if (vector.y === 1) {
      tmp.y.reverse();
    }
    return tmp;
  }

  moveTile(tile, cell) {
    this.board.grids[tile.x][tile.y] = null;
    this.board.grids[cell.x][cell.y] = tile;
    tile.updatePosition(cell);
  }
}

module.exports = Game;