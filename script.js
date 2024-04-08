const boxes = document.querySelectorAll(".box");
const gameInfo = document.querySelector(".player");
const newGameBtn = document.querySelector(".btn");

let currentPlayer;
let gameGrid;

const winningPositions = [
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,3,6],
    [1,4,7],
    [2,5,8],
    [0,4,8],
    [2,4,6]
];

//let's create a function to initialise the game
function initGame() {
    currentPlayer = "X";
    gameGrid = ["", "", "", "", "", "", "", "", ""];
    //UI pr empty bhi karna padega boxes ko
    boxes.forEach((box, index) => {
        box.innerText = "";
        boxes[index].style.pointerEvents = "all";
        //one more thing is missing, initialise box with css properties again
        box.classList = `box box${index+1}`;
        box.style.backgroundColor = "";
        box.classList.remove("win");
    });
    newGameBtn.classList.remove("active");
    gameInfo.innerText = `Current Player - ${currentPlayer}`;
    newGameBtn.style.display = "none";
}

initGame();

function swapTurn() {
    currentPlayer = currentPlayer === "X" ? "O" : "X";
    //UI Update
    gameInfo.innerText = `Current Player - ${currentPlayer}`;
}

function checkGameOver() {
    let winner = "";

    winningPositions.forEach(position => {
        const [a, b, c] = position;
        if (
            gameGrid[a] &&
            gameGrid[a] === gameGrid[b] &&
            gameGrid[a] === gameGrid[c]
        ) {
            winner = gameGrid[a];
            boxes[a].classList.add("win");
            boxes[b].classList.add("win");
            boxes[c].classList.add("win");
        }
    });

    if (winner) {
        gameInfo.innerText = `Winner Player - ${winner}`;
        newGameBtn.classList.add("active");
        newGameBtn.style.display = "block"; // Show the New Game button
        boxes.forEach(box => {
            box.style.pointerEvents = "none";
            if (box.classList.contains("win")) {
                box.style.backgroundColor = "green";
            }
        });
        return;
    }

    let tie = true;
    gameGrid.forEach(value => {
        if (value === "") tie = false;
    });

    if (tie) {
        gameInfo.innerText = "Game Tied!";
        newGameBtn.classList.add("active");
        newGameBtn.style.display = "block"; // Show the New Game button
    } else {
        newGameBtn.style.display = "none"; // Hide the New Game button during the game
    }
}


function handleClick(index) {
    if(gameGrid[index] === "" ) {
        boxes[index].innerText = currentPlayer;
        gameGrid[index] = currentPlayer;
        boxes[index].style.pointerEvents = "none";
        //swap karo turn ko
        swapTurn();
        //check koi jeet toh nahi gya
        checkGameOver();
    }
}

boxes.forEach((box, index) => {
    box.addEventListener("click", () => {
        handleClick(index);
    })
});

newGameBtn.addEventListener("click", initGame);
