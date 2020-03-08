const Board = require('./board');
const GameView = require('./game_view');
const Input = require('./input');
const Tile = require('./tile');

// The Game class handles all of the instructions for how the gaming logic is
//implemented. We handle all of the movement logic within the game including
//whether or not there are moves available. 
class Game {
  constructor() {
    this.size = 4;
    this.score = 0;
    this.won = false;
    this.board = new Board(this.size);
    this.view = new GameView(this.size);
    // We call the view class's render function on the Board class.
    this.view.render(this.board);
    // Bind the move function as a callback to the Input class. A call back is
    //when you have a function within the parameters of another function.
    this.input = new Input(this.move.bind(this));
  }

  // Handles all of the move logic. Including calculating the proper cell 
  //location to move, handling merge conflicts win and lose conditions, and
  //placing the new randomized tile.
  move(direction) {
    let map = {
      'ArrowUp': {x:-1, y:0}, // Up
      'ArrowRight': {x:0, y:1}, // Right
      'ArrowDown': {x:1, y:0}, // Down
      'ArrowLeft': {x:0, y:-1} // Left
    };
    let vector = map[direction];
    let grid = this.buildGrid(vector);

    grid.y.map( y => {
      grid.x.map( x => {
        let cell = {x:x, y:y};
        let tile = this.board.grids[x][y];
        if(tile){
          let movePositions = this.getFarthestPosition(cell, vector);
          let nextMovePosition = movePositions.next;
          let next = this.board.cellContent(nextMovePosition);

          if(next && tile.value === next.value){
            let merged = new Tile(cell, tile.value * 2);
            this.board.grids[next.x][next.y] = null;
            this.moveTile(merged, nextMovePosition);
            this.score += merged.value;
            if(merged.value === 3072) this.won = true;
          }
          else{
            this.moveTile(tile, movePositions.farthest);
          }
        }
      });
    });

    this.view.updateScore(this.score);

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

  // Handle win logic.
  winScreen() {
    this.view.winGame();
  }

  // Handle lose logic.
  loseScreen() {
    this.view.gameOver();
  }

  // Determines if there are any available moves on the board. Returns a boolean value.
  movesAvailable() {
    let map = {
      0: { x: -1, y: 0 }, // Up
      1: { x: 0, y: 1 }, // Right
      2: { x: 1, y: 0 }, // Down
      3: { x: 0, y: -1 } // Left
    };
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

  // Looks for the farthest position in the direction of the vector, until the edge of the board is found or the
  // next tile is located. 
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

  // Takes a vector and reverses the grid to access 
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

  // Moving tile requires assigning previous tile location as null and then reassigning the grid's next cell location
  // as the tile. The tile then updates its own position as the location of that cell.
  moveTile(tile, cell) {
    this.board.grids[tile.x][tile.y] = null;
    this.board.grids[cell.x][cell.y] = tile;
    // this.view.shiftTile(tile, cell);
    tile.updatePosition(cell);
  }
}

module.exports = Game;