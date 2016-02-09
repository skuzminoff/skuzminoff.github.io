/**
 * Class of A* algorithm
 * @param {Grid} grid 
 * @param {Cell} start
 * @param {Cell} end
 * @param {Function} heuristic
 */
var Astar = function (grid, start, end, heuristic) {
    this.start = start;
    this.end = end;
    this.grid = grid;
    if (heuristic == null || heuristic === undefined) {
         heuristic = function (start, end) {
        return Math.abs(start.coord_x - end.coord_x) + Math.abs(start.coord_y - end.coord_y);}
    }
    else {
        this.heuristic = heuristic;
    }
}

/**
 * Finding path function
 * @return {Array} path
 */
Astar.prototype.findPath = function (drawFootprintsCallback) {
    var open = [],
        closed = [];

    var startPathNode = new PathCell(this.start, null, this.heuristic(this.start, this.end), 0);
    open.push(startPathNode);
    while (open.length > 0) {
        open.sort(function (a, b) { return a.FullPathLength() - b.FullPathLength(); })
        var current = open.shift();
        if (current.currentCell.coord_x == this.end.coord_x && current.currentCell.coord_y == this.end.coord_y) {
            return this.restorePath(current);
        }
        // var index = open.indexOf(current);
        // open.splice(index, 1); // remove current from open vertexes list
        closed.push(current); // annd current to closed vertexes list
        

        var neighboursCells = this.grid.getAllowedNeighbours(current.currentCell);
        var neighbours = Utils.convertCellsToPathCells(neighboursCells, current, this.end, this.heuristic);
        var that = this;
        for (var i = 0; i < neighbours.length; i++) {
            var item = neighbours[i];
            if (Utils.cellInArray(item.currentCell, closed)) {
                continue;
            }

            var g_score = current.distanceFromStart + Constants.neighbourDistance;
            
            if (!Utils.cellInArray(item, open) || g_score < item.distanceFromStart) {
                item.distanceFromStart = g_score;
                item.heurValue = that.heuristic(item.currentCell, that.end);
                
                if (!Utils.cellInArray(item, open)) {
                    open.push(item);
                }
                else {
                    var itemInOpenArray = Utils.getPathCellFromArray(item, open);
                    itemInOpenArray.predCell = current;
                    itemInOpenArray.distanceFromStart = item.distanceFromStart;
                }
            }
        }
        drawFootprintsCallback(Utils.convertToCellArray(closed));
    }
    return null;
}

/**
 * Restore path 
 * @param {PathCell}  pathCell
 * @return {Array} path (of Cells)
 */
Astar.prototype.restorePath = function (pathCell) {
    var path = [];
    var currentPathCell = pathCell;

    while (currentPathCell != null) {
        path.push(currentPathCell.currentCell);
        currentPathCell = currentPathCell.predCell;
    }
    path.reverse();
    return path;
}
