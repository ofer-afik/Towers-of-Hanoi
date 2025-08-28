const winAlert = document.createElement("div");
winwindow.alert.id = "winwindow.alert";
winwindow.alert.innerHTML = "<h2>🎉Congrats! You Win!🎉</h2><h3 id='movesDisplayWin'></h3><button id='closeWinwindow.alert'><img src='close.png' alt='Close'></button>";

const tower1 = document.getElementById("tower1");
const tower2 = document.getElementById("tower2");
const tower3 = document.getElementById("tower3");
const towerDisks = {tower1: [], tower2: [], tower3: []};

const disk0 = document.createElement("div");
const disk1 = document.createElement("div");
const disk2 = document.createElement("div");
const disk3 = document.createElement("div");
const disk4 = document.createElement("div");
const disk5 = document.createElement("div");
const disk6 = document.createElement("div");
const disk7 = document.createElement("div");

const disks = [disk0, disk1, disk2, disk3, disk4, disk5, disk6, disk7];
const diskDistance = [80, 105,  130, 155, 180, 205, 230, 255];

disks.forEach((disk, index) => {
    disk.id = `disk${index}`;
    disk.className = "disk";
})

let movesCount
let moveFromTo
const moveHeader = document.getElementById("moves");

function game(event) {
    disks.forEach((disk, _) => {
        disk.remove();
    })
    moveFromTo = {from: null, to: null};
    const diskNumValue = document.getElementById("numOfDisks").value;
    movesCount = 0;
    moveHeader.style.visibility = "visible";
    moveHeader.innerHTML = `Moves: ${movesCount}`;
    event.preventDefault();
    for (let i = 0; i < diskNumValue; i++) {
        tower1.prepend(disks[i]);
        towerDisks.tower1.push(disks[i]);
        towerDisks.tower1.at(-1).style.bottom = diskDistance[i] + "px";
    }
    document.getElementById("but1").addEventListener("click", butPressed);
    document.getElementById("but2").addEventListener("click", butPressed);
    document.getElementById("but3").addEventListener("click", butPressed);
}

function move(from, to) {
    if (from.length === 0) {
        window.alert("Invalid Move: Tower is empty");
        return;
    } 
    if ((towerDisks[from.id].at(-1).style.width) > (towerDisks[to] && towerDisks[to.id].at(-1).style.width)) {
        window.alert("Invalid Move: Cannot place larger disk on smaller disk");
        return;
    }
    const diskToMove = towerDisks[from.id].pop();
    diskToMove.style.bottom = `${diskDistance[towerDisks[to.id].length]}px`;
    to.prepend(diskToMove);
    if (towerDisks.tower3.length === parseInt((document.getElementById("numOfDisks").value))) {
        Win();
    }
}

function Win() {
    document.getElementById("screen").style.display = "block";
    document.body.appendChild(winwindow.alert);
    document.getElementById("movesDisplayWin").innerHTML = `You completed the game in ${movesCount} moves!`;
    document.getElementById("closeWinwindow.alert").addEventListener("click", gameEnd);
}

function gameEnd() {
    document.getElementById("screen").style.display = "none";
    document.getElementById("winwindow.alert").remove();
    moveHeader.style.visibility = "hidden";
    towerDisks.tower1 = [];
    towerDisks.tower2 = [];
    towerDisks.tower3 = [];
    document.getElementById("but1").removeEventListener("click", butPressed);
    document.getElementById("but2").removeEventListener("click", butPressed);
    document.getElementById("but3").removeEventListener("click", butPressed);
    disks.forEach((disk, _) => {
        disk.remove();
    })
}

function butPressed(event) {
    if (moveFromTo.from === null) {
        moveFromTo.from = event.target.parentElement;
        event.target.style.color = "#8862ac";
        return;
    } else if (moveFromTo.to === null) {
        if (moveFromTo.from === event.target.parentElement) {
            event.target.style.color = "#000000";
            moveFromTo.from = null;
            return;
        } else {
            moveFromTo.to = event.target.parentElement;
            moveFromTo.from.querySelector("button").style.color = "#000000"; 
            move(moveFromTo.from, moveFromTo.to);
            moveFromTo.from = null;
            moveFromTo.to = null;
            movesCount++;
            moveHeader.innerHTML = `Moves: ${movesCount}`;
        }
    }
}

document.getElementById("startMenu").addEventListener("submit", game);