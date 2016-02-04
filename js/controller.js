var Controller = {
    bindEvents: function () {
        var that = this;
        View.generateButton.onclick = function () {
            var height = View.gameTable.rows.length;
            if (height == 0)
            { alert("No rows"); return; }
            var width = View.gameTable.rows[0].cells.length;
            var blockMatrix = Utils.getBlockMatrix(View.gameTable, width, height);
            var grid = new Grid(width, height, blockMatrix);
            var sources = View.gameTable.getElementsByClassName("source");
            var source1 = grid.getCellAt(sources[0].cellIndex, sources[0].parentNode.rowIndex);
            var source2 = grid.getCellAt(sources[1].cellIndex, sources[1].parentNode.rowIndex);
            var alg = new Astar(grid, source1, source2, Heuristic.manhattanHeuristic);
            var path = alg.findPath();
            that.searchCompleted(path);
        };
        
        View.clearButton.onclick = function(){
            View.clearTable();
        };
    },
    
    
    searchCompleted: function(path){
        View.drawPath(path);
    },

    init: function () {
        this.bindEvents();
    }
};