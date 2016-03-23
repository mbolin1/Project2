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
}

function createGame(SIZE){
	var start = (Math.random()  * (SIZE*SIZE/3)) + 10;
	var board = createBoard(SIZE);
	
	for(var i = 1; i < start; i++){
		var ant = new Ant(SIZE);
		board[ant.r][ant.c] = true;
	}
	
	return board;

}

function gameTest(){
	var board = [
				 [true, false, true, true],
				 [false, true, false, false],
				 [true, false, false, false],
				 [true, true, true, true]
				];
				
	board.length = 4;
	
	console.log('beep: ' + board);
	console.log(board);
}


function Game(board){
	this.board = board;
	this.speed = 500;
	
	this.intervalList = [];
}


Game.prototype.updateAnts = function(){
	var newBoard = createBoard(this.board.length);
	
	var continueInterval = false;	//if no ants left stops
	
	for(var r = 0; r < this.board.length; r++){
		for(var c = 0; c < this.board.length; c++){
			newBoard[r][c] = aliveCheck(this.board, r, c, this.board.length);
			if(newBoard[r][c]){
				continueInterval = true;
			}
		}
	}

	if(!continueInterval){
            this.stop();
	}
	
	this.board = newBoard;
	updateBoard(newBoard);
};

Game.prototype.start = function(){
	if(this.intervalList.length < 1){
		this.intervalList.push(setInterval(this.updateAnts.bind(this), this.speed));
	}
};

Game.prototype.speedUp = function(){
	console.log(this.speed);
	if(this.speed > 50){
		this.speed -= 50;
	}
	
	clearInterval(this.intervalList.pop());
	//console.log(this.speed);
	this.intervalList.push(setInterval(this.updateAnts.bind(this), this.speed));
};

Game.prototype.speedDown = function(){
	clearInterval(this.intervalList.pop());
	console.log(this.speed);
	if(this.speed < 1000){
		this.speed += 50;
	}
	
	//console.log(this.speed);
	this.intervalList.push(setInterval(this.updateAnts.bind(this), this.speed));
};


Game.prototype.stop = function(){
	while(this.intervalList.length !== 0){
		clearInterval(this.intervalList.pop());
	}
	
};

function aliveCheck(board, r, c){
	var liveN = 0;
	
	liveN += aliveCount(board, r-1, c-1);
	liveN += aliveCount(board, r-1, c);
	liveN += aliveCount(board, r-1, c+1);
	liveN += aliveCount(board, r, c-1);
	liveN += aliveCount(board, r, c+1);
	liveN += aliveCount(board, r+1, c-1);
	liveN += aliveCount(board, r+1, c);
	liveN += aliveCount(board, r+1, c+1);
	
	switch(liveN){
		case 3:
			return true;
		case 2:
			return board[r][c];
		default:
			return false;
	}
}

function aliveCount(board, r, c){
	if(r >= 0 && r < board.length && c >= 0 && c < board.length)
		var value = board[r][c];
	else
		return 0;
	if(value)
		return 1;
	else
		return 0;
}
