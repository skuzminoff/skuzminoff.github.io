/**
 * Class representing item of path
 * @param {Cell} currentCell
 * @param {Cell} predCell
 * @param {Number} heurValue
 * @param {Number} distanceFromStart
 */
function PathCell(currentCell, predCell, heurValue, distanceFromStart){
    this.currentCell = currentCell;
    this.predCell = predCell;
    this.heurValue = heurValue;
    this.distanceFromStart = distanceFromStart;
}

PathCell.prototype.FullPathLength = function(){
    return this.heurValue + this.distanceFromStart;
}