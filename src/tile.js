class Tile{
  constructor(position, value) {
    this.value = value;
    this.x = position.x;
    this.y = position.y;
  }

  // Assign the tile's x and y as the cell's position.
  updatePosition(cell) {
    this.x = cell.x;
    this.y = cell.y;
  }
}

module.exports = Tile;