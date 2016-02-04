/**
 * Utility object
 */

var Utils = {

    convertCellsToPathCells: function (cells, v, end, heuristic) {
        var pathCellsArray = [];
        cells.forEach(function (item, i, arr) {
            var pathCell = new PathCell(item, v,heuristic(item, end), v.distanceFromStart + Constants.neighbourDistance);
            pathCellsArray.push(pathCell);
        });
        return pathCellsArray;
    },

    getBlockMatrix: function (gametable, width, height) {
        var grid = new Array(width);
        for (var i = 0; i < width; i++) {
            grid[i] = new Array(height);
        }

        for (var i = 0; i < height; i++) {
            var row = gametable.rows[i];
            for (var j = 0; j < width; j++) {
                grid[j][i] = row.cells[j].classList.contains("block");
            }
        }

        return grid;
    },

    cellInArray: function (current, array) {
        var existence = array.find(function (element, index, arr) {
            return (element.currentCell.coord_x == current.coord_x && element.currentCell.coord_y == current.coord_y);
        });
        return existence;
    },
    
    getPathCellFromArray: function(item, array){
        for(var i=0; i< array.length; i++){
            if (array[i].currentCell.coord_x == item.currentCell.coord_x && array[i].currentCell.coord_y == item.currentCell.coord_y)
                return array[i]; 
        }
        return null;
    }
};