let boxes = document.querySelectorAll(".box");
let newGameBtn = document.getElementById("newGame");
let msgContainer1 = document.getElementById("msgContainer1");
let msgContainer2 = document.getElementById("msgContainer2");
let winnerMsg = document.getElementById("winnerMsg");
let drawMsg = document.getElementById("drawMsg");

let movesCount = 0;
let turnO = true;

const winPatterns = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];

boxes.forEach((box) => {
    box.addEventListener("click", () => {
        if (turnO === true) {
            box.innerText = "O";
            box.style.color = "green"
            turnO = false;
        } else {
            box.innerText = "X";
            turnO = true;
            box.style.color = "red"
        }
        console.log("Box clicked");
        movesCount++;
        box.disabled = true;
        checkWinner();
    });
});

const enableBoxes = () => {
    for (let box of boxes) {
        box.disabled = false;
        box.innerText = "";
    }
};

let newGame = () => {
    turnO = true;
    movesCount = 0;
    enableBoxes();
    msgContainer1.classList.add("hideWinner");
    msgContainer2.classList.add("hideDraw");
};

const disableBoxes = () => {
    for (let box of boxes) {
        box.disabled = true;
    }
};

const showWinner = (winner) => {
    winnerMsg.innerText = `Congratulations, Winner is ${winner}`;
    msgContainer1.classList.remove("hideWinner");
    disableBoxes();
}

const showDraw = () => {
    drawMsg.innerText = "Match draw, start a new game!";
    msgContainer2.classList.remove("hideDraw");
    disableBoxes();
}

let checkWinner = () => {
    let winnerFound = false;
    for (let pattern of winPatterns) {
        let pos1Val = boxes[pattern[0]].innerText;
        let pos2Val = boxes[pattern[1]].innerText;
        let pos3Val = boxes[pattern[2]].innerText;
        
        if (pos1Val != "" && pos2Val != "" && pos3Val != "") {
            if (pos1Val === pos2Val && pos2Val === pos3Val) {
                console.log("winner", pos1Val);
                showWinner(pos1Val);
                winnerFound = true;
                break;
            }
        } 
    }
    if (movesCount === 9 && !winnerFound) {
        showDraw();
    }
};

newGameBtn.addEventListener("click", newGame);