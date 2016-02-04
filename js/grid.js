/**
 * Class representing table
 * @param {Number} width
 * @param {Number} height
 * @param {Array[][]}  blockMatrix
 */

function Grid(width, height, blockMatrix) {
    this.width = width;
    this.height = height;
    this.blockMatrix = blockMatrix;
    this.cells = this.buildCells(width, height, blockMatrix)
}


/**
 * Create two-dimensional array of Cell objects
 * @param {Number} width
 * @param {Number} height
 * @param {Array[][]} blockMatrix
 * @return {Array[][]} grid
 */
Grid.prototype.buildCells = function (width, height, blockMatrix) {
    var grid = new Array(width);
    for (var i = 0; i < width; i++) {
        grid[i] = new Array(height);
        for (var j = 0; j < height; j++) {
            if (blockMatrix[i][j] == true)
                grid[i][j] = new Cell(i, j, true);
            else
                grid[i][j] = new Cell(i, j, false);
        }
    }
    return grid;
}


Grid.prototype.getCellAt = function (coord_x, coord_y) {
    return this.cells[coord_x][coord_y];
}

/**
 * Check if cell with giving coordinates belongs to grid
 * @param {Number} coord_x
 * @param {Number} coord_y
 * @return {Boolean} 
 */
Grid.prototype.cellFitsIn = function (coord_x, coord_y) {
    return (coord_x >= 0 && coord_x < this.width) && (coord_y >= 0 && coord_y < this.height);
}

/**
 * Get allowed (not blocked, fitting in grid and non-diagonal located) neighbours of the given cell
 * @param {Cell} v
 * @return {Array} neighbours 
 */
Grid.prototype.getAllowedNeighbours = function (v) {
    var left = false,
        right = false,
        top = false,
        bottom = false,
        neighbours = [],
        x = v.coord_x,
        y = v.coord_y,
        cells = this.cells;

    if (this.cellFitsIn(x - 1, y) && !this.getCellAt(x - 1, y).is_blocked) {
        neighbours.push(cells[x - 1][y]);
        left = true;
    }

    if (this.cellFitsIn(x + 1, y) && !this.getCellAt(x + 1, y).is_blocked) {
        neighbours.push(cells[x + 1][y]);
        right = true;
    }

    if (this.cellFitsIn(x, y - 1) && !this.getCellAt(x, y - 1).is_blocked) {
        neighbours.push(cells[x][y - 1]);
        bottom = true;
    }

    if (this.cellFitsIn(x, y + 1) && !this.getCellAt(x, y + 1).is_blocked) {
        neighbours.push(cells[x][y + 1]);
        top = true;
    }

    return neighbours;
}