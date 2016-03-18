//getting the initial board size and setting the table
changeSize();
//adding listener for set button
var setBtn = document.getElementById("set-btn");
setBtn.addEventListener("click",changeSize,false);
var stopBtn = document.getElementById("stop-btn");
stopBtn.addEventListener("click",stop,false);
        
function changeSize(){
    console.log("changing board size");
    stop();
    var boardSize =  document.getElementById("table-size").value;
    var dispboard =  document.getElementById("board");
    while(dispboard.firstChild){
        dispboard.removeChild(board.firstChild);
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
    if(this.style.backgroundColor === "gray")
        this.style.backgroundColor = "lightBlue";
    else
        this.style.backgroundColor = "gray";
}

function stop(){
    //call to stop the game
    console.log("stopping game");
}

function start(){
    //start the game
    console.log("starting game");
}