/**
 * Class representing table cell
 * @param {Number} coord_x
 * @param {Number} coord_y
 * @param {Boolean} is_blocked (optional)
 */

function Cell(coord_x, coord_y, is_blocked){
    this.coord_x = coord_x;
    this.coord_y = coord_y;
    if (is_blocked !== undefined){
        this.is_blocked = is_blocked;
    }
    else {
        this.is_blocked = false;
    }
};

Cell.prototype.toString = function()
{
    return "(" + this.coord_x + "," + this.coord_y + ")";
}
