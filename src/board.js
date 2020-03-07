const Tile = require('./tile');

// The board class implements logic for the rendering and handling of any functionality involving the 
//board. Here, we can check for empty tiles, whether or not cells are within the board, content within
//the board, randomizing start tile positions, randomizing start tile locations, finding randomized
//locations, and placing and removing tiles.
// We import the tile class so that we can abstract all functionality for the board including handling
//tiles within the board class. We do not need to know every detail regarding the tiles themselves; we
//just need to be able to place/remove them from the baord class.
class Board {
  // Constructor for setting up the board
  constructor(size){
    this.size = size;
    this.grids = [];
    this.setupBoard();
  }

  // Empties the board into null values
  emptyGrids() {
    for(let x = 0; x < this.size; x+=1){
      let row = [];
      for(let y = 0; y < this.size; y+=1){
        row.push(null);
      }
      this.grids.push(row);
    }
  }

  // Border check to make sure that the cells being accessed are on the board.
  withinBorder(cell) {
    if(cell.x >= 0 && cell.x < this.size && cell.y >= 0 && 
      cell.y < this.size) {
        return true;
    } 
    return false;
  }

  // Function to return whether there is a tile on the specific cell grid. Returns true or false.
  cellAvailable(cell) {
    if(this.withinBorder(cell)) {
      let tile = this.grids[cell.x][cell.y];
      if (tile === null) {
        return true;
      }
      else {
        return false;
      }
    }
  }

  // Returns the information on the cell grid. Returns the tile if the tile is not empty, else null.
  cellContent(cell) {
    if(this.withinBorder(cell)) {
      return this.grids[cell.x][cell.y];
    }
    else{
      return null;
    }
  }

  // Sets the cell grid space as a tile.
  placeTile(tile) {
    this.grids[tile.x][tile.y] = tile;
  }

  // Assigns the cell grid space as null.
  removeTile(tile) {
    this.grids[tile.x][tile.y] = null;
  }

  // Initializes the board with the empty grid and the initial start tiles.
  setupBoard() {
    this.emptyGrids();
    this.addStartTiles();
  }

  // Initializes the board with two tiles in random locations.
  addStartTiles() {
    let initialNumberOfTiles = 2;
    for (let i = 0; i < initialNumberOfTiles; i++) {
      this.placeRandomTile();
    }
  }

  // Places tiles on the board with a value of 3 at a random available cell location.
  placeRandomTile() {
    let randomCell = this.randomAvailableCell();
    if(randomCell) {
      let randomTileValue = 3;
      let startingTile = new Tile(randomCell, randomTileValue);
      this.placeTile(startingTile);
    }
  }

  // Looks for an available cell location on the board.
  randomAvailableCell() {
    let availableCells = [];
    for(let x = 0; x < this.size; x++){
      for(let y = 0; y < this.size; y++) {
        let cell = this.grids[x][y];
        if(!cell) {
          availableCells.push({x: x, y: y});
        }
      }
    }
    let cellsLength = availableCells.length;
    let randomCell = availableCells[Math.floor(Math.random() * cellsLength)];
    return randomCell;
  }

  // If position on the board is within the border then return the tile, else return null.
  // cellContent(movePosition) {
  //   if(this.withinBorder(movePosition)) {
  //     return this.grids[movePosition.x][movePosition.y];
  //   }
  //   else{
  //     return null;
  //   }
  // }

}

module.exports = Board;