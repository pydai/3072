const Tile = require('./tile');

class Board {
  constructor(size){
    this.size = size;
    this.grids = [];
    this.setupBoard();
  }

  emptyGrids() {
    for(let x = 0; x < this.size; x+=1){
      let row = [];
      for(let y = 0; y < this.size; y+=1){
        row.push(null);
      }
      this.grids.push(row);
    }
  }

  withinBorder(cell) {
    if(cell.x >= 0 && cell.x < this.size && cell.y >= 0 && 
      cell.y < this.size) {
        return true;
    } 
    return false;
  }

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

  cellContent(cell) {
    if(this.withinBorder(cell)) {
      return this.grids[cell.x][cell.y];
    }
    else{
      return null;
    }
  }

  placeTile(tile) {
    this.grids[tile.x][tile.y] = tile;
  }

  removeTile(tile) {
    this.grids[tile.x][tile.y] = null;
  }

  setupBoard() {
    this.emptyGrids();
    this.addStartTiles();
  }

  addStartTiles() {
    let initialNumberOfTiles = 2;
    for (let i = 0; i < initialNumberOfTiles; i++) {
      this.placeRandomTile();
    }
  }

  placeRandomTile() {
    let randomCell = this.randomAvailableCell();
    if(randomCell) {
      let randomTileValue = 3;
      let randomTile = new Tile(randomCell, randomTileValue);
      this.placeTile(randomTile);
    }
  }

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

  cellContent(movePosition) {
    if(this.withinBorder(movePosition)) {
      return this.grids[movePosition.x][movePosition.y];
    }
    else{
      return null;
    }
  }

}

module.exports = Board;