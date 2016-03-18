function Ant(SIZE){
	this.r = Math.floor(Math.random() * SIZE);
	this.c = Math.floor(Math.random() * SIZE);
}

function createBoard(SIZE){
	var board = new Array(SIZE);
	for(var r = 0; r < SIZE; r++){
		board[r] = new Array(SIZE);
		for(var c = 0; c < SIZE; c++){
			board[r][c] = false;
		}
	}
	
	return board;
	//console.log(board);
}

function createGame(SIZE){
	var start = (Math.random()  * (SIZE*SIZE/3)) + 10;
	//console.log("Number of Ants to be created: " + start);
	var board = createBoard(SIZE);
	
	for(var i = 1; i < start; i++){
		var ant = new Ant(SIZE);
		//console.log("An ant is: " + ant);
		//console.log(ant);
		board[ant.r][ant.c] = true;
	}
	
	return board;
	//board.length = SIZE;
	//console.log("The board is: " + board);
	//console.log(board);
}

function gameTest(){
	var board = [
				 [true, false, true, true],
				 [false, true, false, false],
				 [true, false, false, false],
				 [true, true, true, true]
				];
				
	board.length = 4;
	
	//board = updateAnts(board, 4);
	
	console.log('beep: ' + board);
	console.log(board);
}


function Game(board, SIZE){
	this.board = board;
	this.SIZE = SIZE;
	
	this.intervalList;
	
}

function aliveCheck(board, r, c, SIZE){
	var liveN = 0;
	
	liveN += aliveCount(board, r-1, c-1, SIZE);
	liveN += aliveCount(board, r-1, c, SIZE);
	liveN += aliveCount(board, r-1, c+1, SIZE);
	liveN += aliveCount(board, r, c-1, SIZE);
	liveN += aliveCount(board, r, c+1, SIZE);
	liveN += aliveCount(board, r+1, c-1, SIZE);
	liveN += aliveCount(board, r+1, c, SIZE);
	liveN += aliveCount(board, r+1, c+1, SIZE);
	//console.log(liveN);
	
	switch(liveN){
		case 3:
			return true;
		case 2:
			return board[r][c];
		default:
			return false;
	}
}

function aliveCount(board, r, c, SIZE){
	//console.log(r + ' ' + c + ' ' + SIZE);
	if(r >= 0 && r < SIZE && c >= 0 && c < SIZE)
		var value = board[r][c];
	else
		return 0;
	//console.log('boop');
	if(value)
		return 1;
	else
		return 0;
}

Game.prototype.updateAnts = function(){
	var newBoard = createBoard(this.SIZE);
	console.log('start');
	//console.log(this.board + ' ' + this.SIZE  );
	for(var r = 0; r < this.SIZE; r++){
		for(var c = 0; c < this.SIZE; c++){
			newBoard[r][c] = aliveCheck(this.board, r, c, this.SIZE);
			//console.log(newBoard[r][c]);
			//console.log(' ');
		}
		//console.log('-----------------------');
	}
	//console.log('done');
	return newBoard;
}


Game.prototype.start = function(speed=500){
	this.intervalList = (setInterval(this.updateAnts.bind(this), speed));
};

Game.prototype.stop = function(){
	clearInterval(this.intervalList);
}


/*
- Any live cell with fewer than two live neighbours dies, as if caused by under-population.
- Any live cell with two or three live neighbours lives on to the next generation.
- Any live cell with more than three live neighbours dies, as if by over-population.
- Any dead cell with exactly three live neighbours becomes a live cell, as if by reproduction.
*/