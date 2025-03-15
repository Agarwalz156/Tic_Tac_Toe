let boxes = document.querySelectorAll(".box");
let resetBtn = document.querySelector("#Reset-btn");
let newGameBtn = document.querySelector("#new-btn");
let msgContainer = document.querySelector("#msg-container");
let msg = document.querySelector("#msg");

let turnO = true; // Player O starts

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

// Function to reset the game
const resetGame = () => {
    turnO = true;
    enableBoxes();
    msgContainer.classList.add("hide");
};

// Function to disable all boxes after a win
const disableBoxes = () => {
    boxes.forEach((box) => {
        box.disabled = true;
    });
};

// Function to enable boxes for a new game
const enableBoxes = () => {
    boxes.forEach((box) => {
        box.disabled = false;
        box.innerText = "";
    });
};

// Function to display the winner message
const showWinner = (winner) => {
    msg.innerText = `🎉 Congratulations! Winner is ${winner}`;
    msgContainer.classList.remove("hide");
    disableBoxes();
};

// Function to check if there is a winner
const checkWinner = () => {
    for (let pattern of winPatterns) {
        let pos1 = boxes[pattern[0]].innerText;
        let pos2 = boxes[pattern[1]].innerText;
        let pos3 = boxes[pattern[2]].innerText;

        if (pos1 !== "" && pos1 === pos2 && pos2 === pos3) {
            showWinner(pos1);
            return;
        }
    }

    // Check for a draw (all boxes filled, no winner)
    let allFilled = [...boxes].every(box => box.innerText !== "");
    if (allFilled) {
        msg.innerText = "It's a Draw! 😶";
        msgContainer.classList.remove("hide");
        disableBoxes();
    }
};

// Event listener for each box
boxes.forEach((box) => {
    box.addEventListener("click", () => {
        if (turnO) {
            box.innerText = "O";
            turnO = false;
        } else {
            box.innerText = "X";
            turnO = true;
        }
        box.disabled = true;

        checkWinner();
    });
});

// Event listeners for reset and new game buttons
newGameBtn.addEventListener("click", resetGame);
resetBtn.addEventListener("click", resetGame);
