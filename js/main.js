// each item can be null(empty), 0(player 1), 1(player 2)
const boardstate = [
    null, null, null,
    null, null, null,
    null, null, null
];
// the win condition array
const wincondition = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [6, 4, 2],
];

//The active player
let activeplayer = 0;


//cells
const cells = document.querySelectorAll("td");

// add hovering effect to cells
cells.forEach(function (cell, index) {
    cell.dataset.index = index;

    cell.onmouseover = function () {
        cell.style.backgroundcolour = "#ccc";
        cell.style.transition = "1s";
    }
    cell.onmouseout = function () {
        cell.style.backgroundcolour = "#fff";
    }
    cell.addEventListener("click", clicked);

});
// clicked function definition
function clicked(event) {
    console.log(event);
    const index = Number(event.target.dataset.index);
    const letter = activeplayer ? "o" : "x";

    const cell = event.target;
    event. target.textContent = letter;

    boardstate[index] = activeplayer;
    cell.removeEventListener("click", clicked);
    cell.onmouseover = null;
    if (hasWon()) {
        window.location = "./winner.html"
    }
    if (hasDrawn()) {
        window.location = "./draw.html"
    }
    activeplayer = activeplayer ? 0 : 1;
}
// thw win detector
function hasWon() {

    for (const condition of wincondition) {
        console.log(condition);
        const boardValues = condition.map(function (item) {
            return boardstate[item];
        })

        console.log(boardValues);
        const playerPieces = boardValues.filter(function (item) {
            return item === activeplayer;
        });
        //console.clear();
        console.log(playerPieces);
        if (playerPieces.length === 3) return true;
    }
    return false;
}

function hasDrawn() {
    const boardCapaciity = boardstate.filter(function (item) {
        return item !== null

    });
    return boardCapaciity.length == boardstate.length;
}

const again = document.querySelector("again");
if (again) {
    again.onclick = (event) => {
        event.preventDefault();
        window.location = "./";
    }
}