var View = {
    gameArea: null,
    gameTable: null,
    putBlocksModeRadio: null,
    markSourcesRadio: null,
    generateButton: null,
    clearButton: null,
    infoArea: null,

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
        this.infoArea = document.getElementById("infoArea");
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
        // Observerable.addListener(this, "drawVertexes", "setFootprints");
    },

    setFootprints: function (footprints) {
        if (footprints.constructor !== Array || footprints.length == 0)
            return;
        var that = View.gameTable;
        footprints.forEach(function (item, i, arr) {
            if (!that.rows[item.coord_y].cells[item.coord_x].classList.contains("source") && !that.rows[item.coord_y].cells[item.coord_x].classList.contains("path")) {
                that.rows[item.coord_y].cells[item.coord_x].classList.add("footprint");
            }
        });
    },
    
    drawCellsArray:  function(cells, className){
        var that = View.gameTable;
        if (className == "footprint"){
            cells.forEach(function (item, i, arr) {
            if (!that.rows[item.coord_y].cells[item.coord_x].classList.contains("source") && !that.rows[item.coord_y].cells[item.coord_x].classList.contains("path")) {
                that.rows[item.coord_y].cells[item.coord_x].classList.add("footprint");
            }
        });
        }
        
        if (className == "path")
        {
            cells.forEach(function (item, i, arr) {
            var cell = that.rows[item.coord_y].cells[item.coord_x];
            if (cell.classList.contains("footprint"))
            { cell.classList.remove("footprint"); }
            that.rows[item.coord_y].cells[item.coord_x].classList.add("path");
        });
        }
        
    },
   

    /*drawFootprints: function (footprints) {
        if (footprints.constructor !== Array || footprints.length == 0)
            return;
        var that = View.gameTable;
        footprints.forEach(function (item, i, arr) {
            if (that.rows[item.coord_y].cells[item.coord_x].classList.contains("source") || that.rows[item.coord_y].cells[item.coord_x].classList.contains("path")) { return; }
            that.rows[item.coord_y].cells[item.coord_x].classList.add("footprint");
        })
        setTimeout(this.drawFootprints, 2000);
    },*/

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

        if (this.infoArea.classList.contains("failure"))
            this.infoArea.classList.remove("failure");
        if (this.infoArea.classList.contains("success"))
            this.infoArea.classList.remove("success");
        if (this.infoArea.classList.contains("info"))
            this.infoArea.classList.remove("info");

        this.infoArea.innerText = "";
    },

    setInfoText: function (messageType, text) {

        if (messageType == "failure") {
            this.infoArea.classList.add("failure");
        }
        else if (messageType == "success") {
            this.infoArea.classList.add("success");
        }
        else if (messageType == "info") {
            this.infoArea.classList.add("info");
        }

        var paragraph = document.createElement("p");
        paragraph.innerText = text;
        this.infoArea.appendChild(paragraph);
    }


};