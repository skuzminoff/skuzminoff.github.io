var View = {
    gameArea: null,
    gameTable: null,
    putBlocksModeRadio: null,
    markSourcesRadio: null,
    generateButton: null,
    clearButton: null,

    drawTable: function (cols, rows) {
        var that = this;
        that.gameTable = document.createElement("table");
        that.gameTable.className = "gametable";
        for (var i = 0; i < cols; i++) {
            var tr = that.gameTable.insertRow();
            tr.id = "row" + i.toString();
            tr.className = "gametable_row";
            for (var j = 0; j < rows; j++) {
                var td = tr.insertCell();
                td.id = "col" + j.toString();
                td.className = "gametable_col";
            }
        }
        this.gameArea.appendChild(this.gameTable);
    },

    drawPath: function (path) {
        if (path == null) { alert("No path found."); return; }

        var that = this;
        path.forEach(function (item, i, arr) {
            var cell = that.gameTable.rows[item.coord_y].cells[item.coord_x];
            if (cell.classList.contains("footprint"))
            { cell.classList.remove("footprint"); }
            that.gameTable.rows[item.coord_y].cells[item.coord_x].classList.add("path");
        });
    },

    init: function () {
        this.gameArea = document.getElementById("gameArea");
        this.putBlocksModeRadio = document.getElementById("put_blocks");
        this.markSourcesRadio = document.getElementById("mark_sources");
        this.generateButton = document.getElementById("findPath");
        this.drawTable(Constants.colsNumber, Constants.rowsNumber);
        var tds = document.getElementsByClassName("gametable_col");
        this.clearButton = document.getElementById("clearAll");
        var that = this;
        for (var i = 0; i < tds.length; i++) {
            tds[i].onclick = function () {
                if (that.putBlocksModeRadio.checked) {
                    this.classList.toggle("block");
                }
                if (that.markSourcesRadio.checked) {
                    var sources = document.getElementsByClassName("source");
                    var sourcesArray = Array.prototype.slice.call(sources);
                    var sources_count = sources.length;
                    if ((sources_count > 1 || this.classList.contains("block")) && sourcesArray.lastIndexOf(this) == -1) return;
                    this.classList.toggle("source");
                }
            };
        }
        Observerable.addListener(this, "drawVertexes", "setFootprints");
    },

    setFootprints: function (e) {
        if (e.detail)
            var that = View.gameTable;
        var footprints = e.detail;
        footprints.forEach(function (item, i, arr) {
            that.rows[item.coord_y].cells[item.coord_x].classList.add("footprint");
        });
    },

    clearTable: function () {
        for (var i = 0; i < Constants.rowsNumber; i++) {
            var row = this.gameTable.rows[i];
            for (var j = 0; j < Constants.colsNumber; j++) {
                var cell = row.cells[j];
                if (cell.classList.contains("path"))
                    cell.classList.remove("path");
                if (cell.classList.contains("block"))
                    cell.classList.remove("block");
                if (cell.classList.contains("footprint"))
                    cell.classList.remove("footprint");
                if (cell.classList.contains("source"))
                    cell.classList.remove("source");
            }
        }
        this.putBlocksModeRadio.checked = false;
        this.markSourcesRadio.checked = false;
    }


};