/**
 * Heuristics collection object
 */

var Heuristic = {

    manhattanHeuristic: function (start, end) {
        return Math.abs(start.coord_x - end.coord_x) + Math.abs(start.coord_y - end.coord_y);
    }
}