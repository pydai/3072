/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/index.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/board.js":
/*!**********************!*\
  !*** ./src/board.js ***!
  \**********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("const Tile = __webpack_require__(/*! ./tile */ \"./src/tile.js\");\n\nclass Board {\n  constructor(size){\n    this.size = size;\n    this.grids = [];\n    this.setupBoard();\n  }\n\n  emptyGrids() {\n    for(let x = 0; x < this.size; x+=1){\n      let row = [];\n      for(let y = 0; y < this.size; y+=1){\n        row.push(null);\n      }\n      this.grids.push(row);\n    }\n  }\n\n  withinBorder(cell) {\n    if(cell.x >= 0 && cell.x < this.size && cell.y >= 0 && \n      cell.y < this.size) {\n        return true;\n    } \n    return false;\n  }\n\n  cellAvailable(cell) {\n    if(this.withinBorder(cell)) {\n      let tile = this.grids[cell.x][cell.y];\n      if (tile === null) {\n        return true;\n      }\n      else {\n        return false;\n      }\n    }\n  }\n\n  cellContent(cell) {\n    if(this.withinBorder(cell)) {\n      return this.grids[cell.x][cell.y];\n    }\n    else{\n      return null;\n    }\n  }\n\n  placeTile(tile) {\n    this.grids[tile.x][tile.y] = tile;\n  }\n\n  removeTile(tile) {\n    this.grids[tile.x][tile.y] = null;\n  }\n\n  setupBoard() {\n    this.emptyGrids();\n    this.addStartTiles();\n  }\n\n  addStartTiles() {\n    let initialNumberOfTiles = 2;\n    for (let i = 0; i < initialNumberOfTiles; i++) {\n      this.placeRandomTile();\n    }\n  }\n\n  placeRandomTile() {\n    let randomCell = this.randomAvailableCell();\n    if(randomCell) {\n      let randomTileValue = 1536;\n      console.log(randomTileValue);\n      let randomTile = new Tile(randomCell, randomTileValue);\n      this.placeTile(randomTile);\n    }\n  }\n\n  randomAvailableCell() {\n    let availableCells = [];\n    for(let x = 0; x < this.size; x++){\n      for(let y = 0; y < this.size; y++) {\n        let cell = this.grids[x][y];\n        if(!cell) {\n          availableCells.push({x: x, y: y});\n        }\n      }\n    }\n    let cellsLength = availableCells.length;\n    let randomCell = availableCells[Math.floor(Math.random() * cellsLength)];\n    return randomCell;\n  }\n\n  cellContent(movePosition) {\n    if(this.withinBorder(movePosition)) {\n      return this.grids[movePosition.x][movePosition.y];\n    }\n    else{\n      return null;\n    }\n  }\n\n}\n\nmodule.exports = Board;\n\n//# sourceURL=webpack:///./src/board.js?");

/***/ }),

/***/ "./src/game.js":
/*!*********************!*\
  !*** ./src/game.js ***!
  \*********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("const Board = __webpack_require__(/*! ./board */ \"./src/board.js\");\nconst GameView = __webpack_require__(/*! ./game_view */ \"./src/game_view.js\");\nconst Input = __webpack_require__(/*! ./input */ \"./src/input.js\");\nconst Tile = __webpack_require__(/*! ./tile */ \"./src/tile.js\");\n\nclass Game {\n  constructor() {\n    this.size = 4;\n    this.score = 0;\n    this.won = false;\n    this.board = new Board(this.size);\n    this.view = new GameView(this.size);\n    this.view.render(this.board);\n    this.input = new Input(this.move.bind(this));\n  }\n\n  move(direction) {\n    let map = {\n      'ArrowUp': {x:-1, y:0}, // Up\n      'ArrowRight': {x:0, y:1}, // Right\n      'ArrowDown': {x:1, y:0}, // Down\n      'ArrowLeft': {x:0, y:-1} // Left\n    }\n    let vector = map[direction];\n    let grid = this.buildGrid(vector);\n\n    grid.y.map( y => {\n      grid.x.map( x => {\n        let cell = {x:x, y:y};\n        let tile = this.board.grids[x][y];\n        if(tile){\n          let movePositions = this.getFarthestPosition(cell, vector);\n          let nextMovePosition = movePositions.next;\n          let next = this.board.cellContent(nextMovePosition);\n\n          if(next && tile.value === next.value){\n            let merged = new Tile(cell, tile.value * 2);\n            this.board.grids[next.x][next.y] = null;\n            this.moveTile(merged, nextMovePosition);\n            this.score += merged.value;\n            if(merged.value === 3052) this.won = true;\n          }\n          else{\n            this.moveTile(tile, movePositions.farthest);\n          }\n        }\n      })\n    })\n\n    this.view.updateScore(this.score);\n\n    if(this.won) {\n      this.winScreen();\n    }\n    else if(!this.movesAvailable()){\n      this.loseScreen();\n    }\n    else{\n      this.board.placeRandomTile();\n    }\n    this.view.render(this.board);\n  }\n\n  winScreen() {\n    this.view.winGame();\n  }\n\n  loseScreen() {\n    this.view.gameOver();\n  }\n\n  movesAvailable() {\n    let map = {\n      0: { x: -1, y: 0 }, // Up\n      1: { x: 0, y: 1 }, // Right\n      2: { x: 1, y: 0 }, // Down\n      3: { x: 0, y: -1 } // Left\n    }\n    let matchesAvailable = false;\n    let moves = 0;\n    for(let x = 0; x < this.size; x+=1) {\n      for(let y = 0; y < this.size; y+=1) {\n        let tile = this.board.grids[x][y];\n        if(!tile){\n          moves += 1;\n        }\n        else{\n          for(let direction = 0; direction < 4; direction+=1) {\n            let vector = map[direction];\n            let next = {x: tile.x + vector.x, y: tile.y + vector.y};\n            let nextTile = this.board.cellContent(next);\n            if(nextTile && tile.value === nextTile.value) {\n              matchesAvailable = true;\n            }\n          }\n        }\n      }\n    }\n    if(moves > 0 || matchesAvailable) {\n      return true;\n    }\n    else{\n      return false;\n    }\n  }\n\n  getFarthestPosition(cell, vector) {\n    let previous;\n    do {\n      previous = cell;\n      cell = { x: previous.x + vector.x, y: previous.y + vector.y };\n    }\n    while(this.board.cellAvailable(cell) && this.board.withinBorder(cell));\n    return {\n      farthest: previous,\n      next: cell\n    };\n  }\n\n  buildGrid(vector) {\n    let tmp = {x: [], y: []};\n    for(let i = 0; i < this.size; i++){\n      tmp.x.push(i);\n      tmp.y.push(i);\n    }\n    if(vector.x === 1) {\n      tmp.x.reverse();\n    }\n    if (vector.y === 1) {\n      tmp.y.reverse();\n    }\n    return tmp;\n  }\n\n  moveTile(tile, cell) {\n    this.board.grids[tile.x][tile.y] = null;\n    this.board.grids[cell.x][cell.y] = tile;\n    // this.view.shiftTile(tile, cell);\n    tile.updatePosition(cell);\n  }\n}\n\nmodule.exports = Game;\n\n//# sourceURL=webpack:///./src/game.js?");

/***/ }),

/***/ "./src/game_view.js":
/*!**************************!*\
  !*** ./src/game_view.js ***!
  \**************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("function GameView(size) {\n  this.size = size;\n  this.render = this.render.bind(this);\n  this.boardContainer = document.querySelector('.board-container');\n  this.gridCell = document.querySelector('.grid-cell');\n  this.messageScreen = document.querySelector('.message-screen');\n  this.scoreBoard = document.querySelector('.score-board');\n}\n\nGameView.prototype.render = function render(board) {\n  this.clearContainer();\n  board.grids.forEach(row => {\n    row.forEach(cell => {\n      if(cell) {\n        let visualTile = this.addVisualTile(cell);\n        let gridCell = document.querySelector(`.grid-cell-${cell.x}-${cell.y}`);\n        gridCell.appendChild(visualTile);\n      }\n    })\n  })\n}\n\nGameView.prototype.clearContainer = function () {\n  for(let row = 0; row < this.size; row+=1) {\n    for(let col = 0; col < this.size; col+=1) {\n      let gridCell = document.querySelector(`.grid-cell-${row}-${col}`);\n      if(gridCell.children.length === 1) {\n        gridCell.removeChild(gridCell.children[0]);\n      }\n    }\n  }\n};\n\n// GameView.prototype.shiftTile = (tile, cell) => {\n//   let tilePos = document.querySelector(`.grid-cell-${cell.x}-${cell.y}`);\n//   let translateX = cell.x- tile.x;\n//   let translateY = cell.y - tile.y;\n//   var translate = 'translate(' + (translateX * 65) + 'px, ' + (translateY * 65) + 'px)';\n//   tilePos.style.webkitTransform = translate;\n//   tilePos.style.transform = translate;\n// }\n\nGameView.prototype.addVisualTile = (cell) => {\n  let tile = document.createElement('div');\n  tile.classList.add('tile-inner');\n  if(cell.value === 3) {\n    tile.style.backgroundColor = '#eee4da';\n  }\n  else if(cell.value === 6) {\n    tile.style.backgroundColor = '#ede0c8';\n  }\n  else if (cell.value === 12) {\n    tile.style.backgroundColor = '#f2b179';\n  }\n  else if (cell.value === 24) {\n    tile.style.backgroundColor = '#f59563';\n  }\n  else if (cell.value === 48) {\n    tile.style.backgroundColor = '#f67c5f';\n  }\n  else if (cell.value === 96) {\n    tile.style.backgroundColor = '#f65e3b';\n  }\n  else if (cell.value === 192) {\n    tile.style.backgroundColor = '#edcf72';\n  }\n  else if(cell.value === 384) {\n    tile.style.backgroundColor = '#edcc61';\n  }\n  else if (cell.value === 768) {\n    tile.style.backgroundColor = '#edc850';\n  }\n  else if (cell.value === 1536) {\n    tile.style.backgroundColor = '#edc53f';\n    tile.style.fontSize = '45px';\n  }\n  else if (cell.value === 3072) {\n    tile.style.backgroundColor = '#edc22e';\n    tile.style.fontSize = '45px';\n  }\n  tile.innerHTML = cell.value;\n  tile.style.fontWeight = 'bold';\n  tile.style.fontSize = '45px';\n  return tile;\n}\n\nGameView.prototype.updateScore = (score) => {\n  let scoreBoard = document.querySelector('.score-board');\n  scoreBoard.innerHTML = score;\n}\n\nGameView.prototype.winGame = () => {\n  let messageScreen = document.querySelector('.message-screen');\n  messageScreen.innerHTML = 'You win!';\n}\n\nGameView.prototype.gameOver = () => {\n  let messageScreen = document.querySelector('.message-screen');\n  messageScreen.innerHTML = 'GAME OVER';\n}\n\nmodule.exports = GameView;\n\n//# sourceURL=webpack:///./src/game_view.js?");

/***/ }),

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("// Entry File\nconst Game = __webpack_require__(/*! ./game */ \"./src/game.js\");\n\ndocument.addEventListener('DOMContentLoaded', () => {\n  new Game();\n});\n\n//# sourceURL=webpack:///./src/index.js?");

/***/ }),

/***/ "./src/input.js":
/*!**********************!*\
  !*** ./src/input.js ***!
  \**********************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("function Input(callback) {\n  this.listen(callback);\n}\n\nInput.prototype.listen = (callback) => {\n  document.addEventListener('keydown', function (evt) {\n    evt.preventDefault();\n    callback(evt.key);\n  });\n}\n\nmodule.exports = Input;\n\n//# sourceURL=webpack:///./src/input.js?");

/***/ }),

/***/ "./src/tile.js":
/*!*********************!*\
  !*** ./src/tile.js ***!
  \*********************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("class Tile{\n  constructor(position, value) {\n    this.value = value;\n    this.x = position.x;\n    this.y = position.y;\n  }\n\n  updatePosition(cell) {\n    this.x = cell.x;\n    this.y = cell.y;\n  }\n}\n\nmodule.exports = Tile;\n\n//# sourceURL=webpack:///./src/tile.js?");

/***/ })

/******/ });