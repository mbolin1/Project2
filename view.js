
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
            bcell.style.height = "10px";
            bcell.style.width = "10px";
            bcell.style.backgroundColor = "gray";
            bcell.style.border = "solid black 1px";
            bcell.addEventListener("click",chngColor,false);
            tRow.appendChild(bcell);
        }
    }
}

function chngColor(){
    stop();
    if(this.style.backgroundColor === "gray")
        this.style.backgroundColor = "lightBlue";
    else
        this.style.backgroundColor = "gray";
    start();
}

function stop(){
    //call to stop the game
    game.stop();
    console.log("stopping game");
}

function start(){
    //start the game
    console.log("starting game");
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
    game.board = dsboard;
    game.start();
}

function reset(){
    //reset the game
    game.stop();
    createBoard(bsize);
    console.log("resetting board");
}

function updateBoard(board){
    for(var row = 0; row < bsize;row++ ){
        for(var col = 0; col < bsize;col++){
            var cell = document.getElementById("c"+row+"-"+col);
            if(board[row][col]){
                cell.style.backgroundColor = "lightblue";
            }else{
                cell.style.backgroundColor = "gray";
            }
        }
    }
}