var Controller = {
    bindEvents: function () {
        var that = this;
        View.generateButton.onclick = function () {
            var height = View.gameTable.rows.length;
            if (height == 0) {
                View.setInfoText("info", "No rows.")
                return;
            }
            var width = View.gameTable.rows[0].cells.length;
            var blockMatrix = Utils.getBlockMatrix(View.gameTable, width, height);
            var grid = new Grid(width, height, blockMatrix);
            var sources = View.gameTable.getElementsByClassName("source");
            var source1 = grid.getCellAt(sources[0].cellIndex, sources[0].parentNode.rowIndex);
            var source2 = grid.getCellAt(sources[1].cellIndex, sources[1].parentNode.rowIndex);

            var alg = new Astar(grid, source2, source1, Heuristic.manhattanHeuristic);
            var drawQueue = [];
            var path = alg.findPath(function (footsteps) {
                drawQueue.push({ "cells": footsteps, "className": "footprint" });
            });

            if (path != null) {
                drawQueue.push({ "cells": path, "className": "path" });
            }

            that.delayedDraw(drawQueue, 0);

            if (path != null) {
                View.setInfoText("success", "Path has been found.");
            }
            else {
                View.setInfoText("failure", "Path hasn't been found.");
            }

        };

        View.clearButton.onclick = function () {
            View.clearTable();
        };
    },


    delayedDraw: function (drawQueue, step) {
        step = step || 0;

        if (step < drawQueue.length) {
            View.draw(drawQueue[step].cells, drawQueue[step].className);
            setTimeout(function () {
                this.Controller.delayedDraw(drawQueue, step + 1);
            }, Constants.drawSpeed);
        }

        return;
    },

    init: function () {
        this.bindEvents();
    }
};