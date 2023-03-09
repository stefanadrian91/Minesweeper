let random = 0;
let minesPositions = [];
let minesCounter = [
	[ , , , , , , , , , , , , , , , ],
	[ ,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0, ],
	[ ,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0, ],
	[ ,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0, ],
	[ ,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0, ],
	[ ,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0, ],
	[ ,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0, ],
	[ ,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0, ],
	[ ,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0, ],
	[ ,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0, ],
	[ ,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0, ],
	[ ,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0, ],
	[ ,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0, ],
	[ ,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0, ],
	[ ,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0, ],
	[ ,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0, ],
	[ , , , , , , , , , , , , , , , ],
	];
let cells = 15;
let column = 1;
let row = 1;
let total = 1;
let upLeft, up, upRight, left, center, right, downLeft, down, downRight;

function randomMines() { 
	for (let i = 1; i <= 225; ++i) {                   //enable all the cells
		document.getElementById(i).disabled = false;
	}
	for (let i = 1; i <= cells; ++i) {                 //generate random mines
		random = Math.floor(Math.random() * (225 - 1 + 1) + 1);
		while (minesPositions.includes(random)) {
			random = Math.floor(Math.random() * (225 - 1 + 1) + 1);
		}
		minesPositions[i] = random;
		row = Math.ceil(minesPositions[i]/15);
		column = minesPositions[i] - (15 * (row - 1));
		minesCounter[row][column] = " ";
		generateCounters(row, column);
	}
	document.getElementById("btnRestart").hidden = false; 
}

function generateCounters(row, column) {    //generator for the counters
	++minesCounter[row - 1][column - 1];
	++minesCounter[row - 1][column];
	++minesCounter[row - 1][column + 1];
	++minesCounter[row][column - 1];
	++minesCounter[row][column + 1];
	++minesCounter[row + 1][column - 1];
	++minesCounter[row + 1][column];
	++minesCounter[row + 1][column + 1];
}

function changeStyle(event, number) {
	let rightClick = document.getElementById(number);
	if (event.button === 2) {                                                                 //event listener for pressed click(right click here)  
		rightClick.addEventListener('contextmenu', (ev) => {
			ev.preventDefault();
		});
		if (document.getElementsByClassName(number)[0].getAttribute("src") === "flag.png") {
			document.getElementsByClassName(number)[0].setAttribute("src", " ");               //remove the flag
		} else {
			document.getElementsByClassName(number)[0].src = "flag.png";                       //place flag on the cell
		}
	} else if (event.button === 0 && document.getElementsByClassName(number)[0].getAttribute("src") !== "flag.png") {    //discover the cell
		checkMines(number);
	}
}

function discoverCells(cellNumber) {
	row = Math.ceil(cellNumber/15);
	column = cellNumber - (15 * (row - 1));
	document.getElementById(cellNumber).setAttribute("class", "cover");			
	document.getElementsByClassName(cellNumber)[0].setAttribute("hidden", true);
	document.getElementById(cellNumber).disabled = true;
	checkMines(cellNumber);
}

function checkMines(position) {
	row = Math.ceil(position/15);
	column = position - (15 * (row - 1));
	let neighbours = [
		upLeft = 15 * (row - 2) + (column - 1),
		up = 15 * (row - 2) + column,
		upRight = 15 * (row - 2) + (column + 1),
		left = 15 * (row - 1) + (column - 1),
		right = 15 * (row - 1) + (column + 1),
		downLeft = 15 * row + (column - 1),
		down = 15 * row + column,
		downRight = 15 * row + (column + 1)
	];
	if (minesPositions.includes(position)) {											//checking if we have a mine in the clicked cell
		document.getElementsByClassName(position)[0].hidden = false;
		document.getElementsByClassName(position)[0].src = "mine.png";
	} else if (minesCounter[row][column] !== 0 && minesCounter[row][column] !== " ") {       //value of the counter in the clicked cell
		document.getElementById(position).innerText = minesCounter[row][column];
		document.getElementById(position).setAttribute("class", "cover");			
		document.getElementById(position).disabled = true;
	} else {
		neighbours.forEach(discoverCells);
	}
}