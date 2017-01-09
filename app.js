(function() {
    'use strict'

    var errorColor = "red";
    var cellColor = "#efefef";
    var emptyColor = "#ababab";

    function createTable(tableId, size, defaults) {
        var tab = document.getElementById(tableId);
        // Clear the table
        tab.innerHTML = "";

        // Create the cells and inputs
        for (var i = 0; i < size; i++) {
            var row = tab.insertRow(i);
            for (var j = 0; j < size; j++) {
                var cell = row.insertCell(j);
                var id = size * i + j;

                // Cell input
                var inp = document.createElement("input");
                inp.setAttribute("class", "grid-cell");
                inp.setAttribute("id", "grid-input-" + id);
                inp.setAttribute("type", "text");
                inp.setAttribute("maxlength", "1");
                inp.setAttribute("required", true);
                inp.style.background = cellColor;
                inp.oninput = checkInput(id);

                cell.appendChild(inp);
            }
        }

        // Set the defaults and fire the oninput listener
        if (defaults) {
            for (var id = 0; id < size * size; id++) {
                var inp = document.getElementById("grid-input-" + id);
                inp.value = defaults[id];
                inp.oninput();
            }
        }

        // Returns handler for input changes
        function checkInput(checkId) {
            return function() {
                var checkInp = document.getElementById("grid-input-" + checkId);

                // Determine if duplicates are present
                for (var id = 0; id < size * size; id++) {
                    var inp = document.getElementById("grid-input-" + id);
                    if (id !== checkId && inp.value && inp.value === checkInp.value) {
                        checkInp.style.background = errorColor;
                        return;
                    }
                }

                // Set the color/value if no duplicate was detected
                if (checkInp.value == "0") {
                    checkInp.style.background = emptyColor;
                    checkInp.value = "";
                    checkInp.required = false;
                } else {
                    checkInp.style.background = cellColor;
                    checkInp.required = true;
                }
            }
        }
    }

    // On change for size select
    var sizeSelection = document.getElementById("grid-size");
    sizeSelection.onchange = function() {
        createTable("user-table", sizeSelection.value);
    };

    // Click for reset button
    var resetButton = document.getElementById("reset-button");
    resetButton.onclick = function(e) {
        e.preventDefault();

        var size = document.getElementById("grid-size").value;
        for (var i = 0; i < size * size; i++) {
            var inp = document.getElementById("grid-input-" + i);
            inp.value = "";
            inp.style.background = cellColor;
        }
    }
    
    // Click for solve button
    var solveButton = document.getElementById("solve-button");
    solveButton.onclick = function(e) {
        var size = document.getElementById("grid-size").value;
        console.log(getGridValues(size));

        // Retrieve values from grid
        function getGridValues(size) {
            var vals = [];
            for (var id = 0; id < size * size; id++)
                vals.push(document.getElementById("grid-input-" + id).value);
            return vals.map(function(m) { return m === "" ? 0 : parseInt(m); });
        }
    };

    // Initialize 
    createTable("user-table", 3, [0, 1, 3, 4, 2, 5, 7, 8, 6]);
})();
