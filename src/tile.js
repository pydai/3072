class Tile{
  constructor(position, value) {
    this.value = value;
    this.x = position.x;
    this.y = position.y;
  }

  updatePosition(cell) {
    this.x = cell.x;
    this.y = cell.y;
  }
}

module.exports = Tile;