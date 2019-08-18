console.log("sanity", $);

// DEFINE GLOBAL VARIABLES
var myTurn = "blue";
var cols = $(".col");
var board = $("#board");
var slots = board.find(".slot");
var popup = $("#popup");
var h3 = $("#popup h3");

$("[name=reset]").on("click", function() {
    slots.removeClass("blue red");
    popup.removeClass("win");
});
// Check if top slot is already filled
cols.on("click touch", function play() {
    if (
        $(this)
            .children()
            .first()
            .hasClass("red") ||
        $(this)
            .children()
            .first()
            .hasClass("blue")
    ) {
        alert("Gosh... try again");
        return;
    }
    // Add color to last empty field
    var field = $(this)
        .children()
        .not(".red, .blue")
        .last()
        .addClass(myTurn);
    var slot = field[0];
    var position = slots.index(slot);
    //WIN CONDITIONS
    // Win Condition backslash direction diagonal
    // 1. Step: Find bottom right field of backslash diagonal
    for (var k = position; k <= 41; k += 7) {
        if (position % 6 != 0) {
            if (k % 6 == 0) {
                k = k - 7;
                break;
            }
        }
    }
    if (k > 41) {
        k = k - 7;
    }
    // 2. Step: Check backslash diagonal for winning condition
    var crossCount = 0;
    for (k; k >= 0; k -= 7) {
        if ($(slots[k]).hasClass(myTurn)) {
            crossCount++;
            if (crossCount >= 4) {
                console.log("backslash win");
                h3.text(myTurn + " wins");
                popup.addClass("win");
            }
        } else {
            crossCount = 0;
        }
        if (k % 6 == 0) {
            break;
        }
    }
    // Win Condition slash direction diagonal
    // 1. Step: Find bottom left field of the diagonal
    for (var m = position; m >= 0; m -= 5) {
        if (m % 6 == 5) {
            break;
        }
    }
    if (m < 0) {
        m += 5;
    }
    // 2. Step: Check slash diagonal for winning condition
    var crossCount2 = 0;
    for (m; m <= 41; m += 5) {
        if ($(slots[m]).hasClass(myTurn)) {
            crossCount2++;
            if (crossCount2 >= 4) {
                console.log("slash win");
                h3.text(myTurn + " wins");
                popup.addClass("win");
            }
        } else {
            crossCount2 = 0;
        }
        if (m % 6 == 0) {
            break;
        }
    }

    // Win Condition Row
    var rowCount = 0;
    for (var i = position % 6; i <= 42; i += 6) {
        if ($(slots[i]).hasClass(myTurn)) {
            rowCount++;
            if (rowCount >= 4) {
                console.log("row win");
                h3.text(myTurn + " wins");
                popup.addClass("win");
            }
        } else {
            rowCount = 0;
        }
    }

    // Win Condition Column
    var colCount = 0;
    for (var j = 6; j >= 0; j--) {
        if (
            $(this)
                .children()
                .eq(j)
                .hasClass(myTurn)
        ) {
            colCount++;
            if (colCount >= 4) {
                console.log("col win");
                h3.text(myTurn + " wins");
                popup.addClass("win");
            }
        } else {
            colCount = 0;
        }
    }

    //At the end of the move, switch player
    if (myTurn == "blue") {
        myTurn = "red";
    } else {
        myTurn = "blue";
    }
});
// Slot Numbers Helper:
// for (var q = 0; q < 42; q++) {
//     $(slots[q]).text(q);
// }
