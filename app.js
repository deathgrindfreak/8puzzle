(function() {
    'use strict'

    var errorColor = "#a94442";

    function createTable(tableId, size) {
        var tab = document.getElementById(tableId);
        // Clear the table
        tab.innerHTML = "";
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

                inp.oninput = function() {
                    checkInput(id);
                };

                cell.appendChild(inp);
            }
        }

        function checkInput(checkId) {
            var checkInp = document.getElementById("grid-input-" + checkId);
            checkInp.style.background = "none";

            for (var id = 0; id < size * size; id++) {
                var inp = document.getElementById("grid-input-" + id);
                console.log("checkId:", checkId);
                console.log("check:", checkInp.value, "inp-" + id, ":", inp.value);
                if (id !== checkId && inp.value && inp.value === checkInp.value) {
                    checkInp.style.background = errorColor;
                    break;
                }
            }
        }
    }

    // On change for size select
    var sizeSelection = document.getElementById("grid-size");
    sizeSelection.onchange = function() {
        createTable("user-table", sizeSelection.value);
    };

    // Initialize 
    createTable("user-table", 3);
})();
