
var color =  '#80ffff';
document.getElementById('color-btn').value = color;
var bsize = document.getElementById("table-size").value;
var game = new Game(createBoard(bsize),bsize);
changeSize();
var setBtn = document.getElementById("set-btn");
setBtn.addEventListener("click",changeSize,false);
var stopBtn = document.getElementById("stop-btn");
stopBtn.addEventListener("click",stop,false);
var startBtn = document.getElementById("start-btn");
startBtn.addEventListener("click",start,false);
var resetBtn = document.getElementById("reset-btn");
resetBtn.addEventListener("click",reset,false);
var randomBtn = document.getElementById("random-btn");
randomBtn.addEventListener("click",random,false);

var colorBtn = document.getElementById("color-btn");
colorBtn.addEventListener("change",colorCh,false);

var supBtn = document.getElementById("sup-btn");
supBtn.addEventListener("click",sup,false);
var sdownBtn = document.getElementById("sdown-btn");
sdownBtn.addEventListener("click",sdown,false);
var dfltBtn = document.getElementById("dflt-btn");
dfltBtn.addEventListener("click",dflt,false);

function dflt(){
	game.speed = 500;
	game.stop();
	game.start();
	console.log('setting default speed');
}

function sup(){
	game.speedUp();
	console.log('speeding up');
}

function sdown(){
	game.speedDown();
	console.log('slowing down');
}

function colorCh(){
	color = document.getElementById('color-btn').value;
	updateBoard(game.board);
	console.log('color change on color button change');
}

function changeSize(){
	console.log("changing board size");
	var boardSize =  document.getElementById("table-size").value;
	bsize = boardSize;
	game.stop();
	var dispboard =  document.getElementById("board");
	while(dispboard.firstChild){
		dispboard.removeChild(dispboard.firstChild);
	}
	for(var row = 0; row < boardSize;row++){
		var tRow = document.createElement("tr");
		dispboard.appendChild(tRow);
		for(var col = 0; col < boardSize;col++){
			var bcell = document.createElement("td");
			bcell.setAttribute("id","c"+row+"-"+col);
			bcell.style.height = "20px";
			bcell.style.width = "20px";
			bcell.style.backgroundColor = "gray";
			bcell.style.textAlign = 'center';
			bcell.style.border = "solid black 1px";
			bcell.addEventListener("click",chngColor,false);
			tRow.appendChild(bcell);
		}
	}
}

function chngColor(){
	if(this.style.backgroundColor === "gray"){
		this.style.backgroundColor = color;
		if(!this.firstChild){
			var ant = document.createElement('img');
			ant.src = 'ant.gif';
			this.appendChild(ant);
		}
	}
	else{
		this.style.backgroundColor = "gray";
		if(this.firstChild){
			this.removeChild(this.firstChild);
		}
	}
	game.board = retBoard();
	
	console.log('change color on td click');
}

function stop(){
	//call to stop the game
	game.stop();
	console.log("stopping game");
}

function start(){
	//start the game
	console.log("starting game");
	
	game.board = retBoard();
	game.start();
}

function retBoard(){
	var dsboard = new Array(bsize);
	for(var row = 0; row < bsize;row++){
		dsboard[row] =  new Array(bsize);
		for(var col = 0; col < bsize;col++){
			dscell = document.getElementById("c"+row+"-"+col);
			if(dscell.style.backgroundColor === "gray"){
				dsboard[row][col] = false;
			}else{
				dsboard[row][col] = true;
			}
		}
	}
	return dsboard;
}

function reset(){
	//reset the game
	game.stop();
	console.log("resetting board");
	updateBoard(createBoard(bsize));
	game.speed = 500;
}

function updateBoard(board){
	for(var row = 0; row < bsize;row++ ){
		for(var col = 0; col < bsize;col++){
			var cell = document.getElementById("c"+row+"-"+col);
			if(board[row][col]){
				cell.style.backgroundColor = color;
				if(!cell.firstChild){
					var ant = document.createElement('img');
					ant.src = 'ant.gif';
					cell.appendChild(ant);
				}
			}else{
				cell.style.backgroundColor = "gray";
				if(cell.firstChild){
					cell.removeChild(cell.firstChild);
				}
			}
		}
	}
}

function random(){
	var spd = game.speed;
	reset();
	game.speed = spd;
	dsboard = createGame(bsize);
	updateBoard(dsboard);
	game.board =  dsboard;
	game.start();
}
