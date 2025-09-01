let buttonsEventListeners = false;

const winAlert = document.createElement("div");
winAlert.id = "winAlert";
winAlert.innerHTML = `<h2 style='font-size: 50px;'>🎉Congrats! You Win!🎉</h2>
    <h3 style='font-size: 40px;' id='movesDisplayWin'></h3>
    <button id='closeWinAlert'><img src='assets/close.png' width='40px' height='40px' alt='Close'></button>`;

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

let timeStart
let movesCount
let moveFromTo
const countHeader = document.getElementById("movesTime");
let timer;
let history = [];
const undoButton = document.getElementById("undoButton");

function game(event) {
    document.querySelector("#undoButton svg").style.fill = "#b1b1b1";
    if (timer) {
        clearInterval(timer);
    }
    disks.forEach(function (disk) {
        disk.remove();
    })
    document.getElementById("but1").style.color = "#000000";
    document.getElementById("but2").style.color = "#000000";
    document.getElementById("but3").style.color = "#000000";
    towerDisks.tower1 = [];
    towerDisks.tower2 = [];
    towerDisks.tower3 = [];
    moveFromTo = {from: null, to: null};
    const diskNumValue = document.getElementById("numOfDisks").value;
    movesCount = 0;
    timeStart = Date.now();
    countHeader.style.visibility = "visible";
    countHeader.innerHTML = `Moves: ${movesCount}<br>Time: ${Math.floor((Date.now() - timeStart) / 60000)}m ${(((Date.now() - timeStart) % 60000) /1000).toFixed(3)}s`;
    event.preventDefault();
    for (let i = 0; i < diskNumValue; i++) {
        tower1.prepend(disks[i]);
        towerDisks.tower1.push(disks[i]);
        towerDisks.tower1.at(-1).style.bottom = diskDistance[i] + "px";
    }
    if (!buttonsEventListeners) {
        document.getElementById("but1").addEventListener("click", butPressed);
        document.getElementById("but2").addEventListener("click", butPressed);
        document.getElementById("but3").addEventListener("click", butPressed);
        buttonsEventListeners = true;
    }
    timer = setInterval(() => {
        countHeader.innerHTML = `Moves: ${movesCount}<br>Time: ${Math.floor((Date.now() - timeStart) / 60000)}m ${(((Date.now() - timeStart) % 60000) /1000).toFixed(3)}s`;
    }, 100);

}

function move(from, to) {
    if (towerDisks[from.id].at(-1) === undefined) {
        alert("Invalid Move: Tower is empty");
        return;
    } else if (towerDisks[to.id].length === 0 || (parseInt(window.getComputedStyle(towerDisks[from.id].at(-1)).width) < parseInt(window.getComputedStyle(towerDisks[to.id].at(-1)).width))) {
        const diskToMove = towerDisks[from.id].pop()
        towerDisks[to.id].push(diskToMove)
        to.prepend(diskToMove)
        movesCount++;
        diskToMove.style.bottom = `${diskDistance[towerDisks[to.id].indexOf(diskToMove)]}px`
        if (towerDisks.tower3.length === parseInt(document.getElementById("numOfDisks").value)) {
            Win()
        }
        return;
    } else {
        alert("Invalid Move: Can't place bigger disk on smaller disk")
        return;
    }

}

function Win() {
    clearInterval(timer);
    document.getElementById("screen").style.zIndex = "2";
    document.getElementById("screen").style.visibility = "visible";
    document.body.append(winAlert);
    document.getElementById("movesDisplayWin").innerHTML = `You completed the game in ${movesCount} moves and ${Math.floor((Date.now() - timeStart) / 60000)}m/${(((Date.now() - timeStart) % 60000) /1000).toFixed(3)}s!`;
    document.getElementById("closeWinAlert").addEventListener("click", gameEnd);
}

function gameEnd() {
    document.querySelector("#undoButton svg").style.fill = "#b1b1b1";
    moveFromTo = {from: null, to: null};
    document.getElementById("screen").style.zIndex = "-1";
    document.getElementById("screen").style.visibility = "hidden";
    document.getElementById("winAlert").remove();
    countHeader.style.visibility = "hidden";
    towerDisks.tower1 = [];
    towerDisks.tower2 = [];
    towerDisks.tower3 = [];
    document.getElementById("but1").removeEventListener("click", butPressed);
    document.getElementById("but2").removeEventListener("click", butPressed);
    document.getElementById("but3").removeEventListener("click", butPressed);
    buttonsEventListeners = false;
    disks.forEach((disk) => {
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
        }
    }
}

document.getElementById("startMenu").addEventListener("submit", game);