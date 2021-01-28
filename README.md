# 3072
[Live Site](https://js-3072.herokuapp.com/)

3072 is a web application built with vanilla JS where the user shifts tiles on the board to create the 3072 tile.


### Screenshots
<img width="1433" alt="Screen Shot 2019-08-21 at 4 12 06 PM" src="https://user-images.githubusercontent.com/7242067/63474608-9c388400-c42e-11e9-9553-1d8e25136181.png">

### Controls: Directional arrows to shift tiles around.
```
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

  // Handles all of the move logic. Including calculating the proper cell location to move, handling merge conflicts
  // win and lose conditions, and placing the new randomized tile.
  move(direction) {
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
      })
    })
```
* The game begins with two tiles randomly generated on the board.
* When tiles are shifted they either merge or collide with tiles on the board in the proper position if their values match.
* A score is generated to keep track of the number of merged tiles on the board.

### Future Implementations
* Valid move logic. Tiles should not move if there is no possible merge or available movement in direction of user input.
