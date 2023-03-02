
const Board = () => {
    const boardArray = [];
    const overlay = document.getElementById("overlay");
    let winningIndexForHighlight = [];
  

    const difficulty = () => {
      const selectDifficulty = document.getElementById("difficulty");
      return selectDifficulty.value;
    };
  

    const populateArray = function () {
      for (let i = 0; i < 9; i++) {
        boardArray[i] = document.getElementById(i).textContent = "";
        document.getElementById(i).style.color = "white";
      }
      updateContainer();
      overlay.style.display = "none";
    };
  

    const updateContainer = function () {
      for (let i = 0; i < 9; i++) {
        document.getElementById(i).textContent = boardArray[i];
      }
    };
  

    const reset = document
      .getElementById("reset")
      .addEventListener("click", populateArray);
  

    const checkForColumnWin = function (sign) {
      if (
        boardArray[0] == sign &&
        boardArray[3] == sign &&
        boardArray[6] == sign
      ) {
        winningIndexForHighlight = [0, 3, 6]; 
        return true;
      } else if (
        boardArray[1] == sign &&
        boardArray[4] == sign &&
        boardArray[7] == sign
      ) {
        winningIndexForHighlight = [1, 4, 7];
        return true;
      } else if (
        boardArray[2] == sign &&
        boardArray[5] == sign &&
        boardArray[8] == sign
      ) {
        winningIndexForHighlight = [2, 5, 8];
        return true;
      }
    };
  
   
    const checkForRowWin = (sign) => {
      if (
        boardArray[0] == sign &&
        boardArray[1] == sign &&
        boardArray[2] == sign
      ) {
        winningIndexForHighlight = [0, 1, 2];
        return true;
      } else if (
        boardArray[3] == sign &&
        boardArray[4] == sign &&
        boardArray[5] == sign
      ) {
        winningIndexForHighlight = [3, 4, 5];
        return true;
      } else if (
        boardArray[6] == sign &&
        boardArray[7] == sign &&
        boardArray[8] == sign
      ) {
        winningIndexForHighlight = [6, 7, 8];
        return true;
      }
    };
  
    
    const checkForDiagonalWin = function (sign) {
      if (
        boardArray[0] == sign &&
        boardArray[4] == sign &&
        boardArray[8] == sign
      ) {
        winningIndexForHighlight = [0, 4, 8];
        return true;
      } else if (
        boardArray[2] == sign &&
        boardArray[4] == sign &&
        boardArray[6] == sign
      ) {
        winningIndexForHighlight = [2, 4, 6];
        return true;
      }
    };
  
    
    const checkForDraw = () => {
      let count = 0;
      boardArray.forEach((cell) => {
        if (cell == "") count++;
      });
      return count == 0; 
    };
  
   
    const checkWin = function (sign) {
      if (
        checkForColumnWin(sign) ||
        checkForRowWin(sign) ||
        checkForDiagonalWin(sign)
      ) {
        overlay.style.display = "flex";
        overlay.textContent = sign == "X" ? "Kazandın!" : "Kaybettin...";
        winningIndexForHighlight.forEach(
          (index) => (document.getElementById(index).style.color = "green")
        );
        return true;
      }
      if (checkForDraw()) {
        overlay.style.display = "flex";
        overlay.textContent = "Berabere";
        return true;
        
      }
    };
  
    return {
      populateArray,
      updateContainer,
      reset,
      checkWin,
      boardArray,
      difficulty,
      checkForColumnWin,
      checkForDiagonalWin,
      checkForRowWin,
      checkForDraw,
    };
  };
 
  

  const Player = (sign) => {
    const getSign = () => sign;
  
  
    const mouseSelection = (board) => {
      document.addEventListener("click", (e) => {
        if (
          e.target.textContent == "" &&
          e.target.className == "cell" &&
          !board.checkWin("O") &&
          !board.checkWin("X")
        ) {
          board.boardArray[e.target.id] = sign;
          board.updateContainer();
          if (!board.checkWin(sign)) {
            if (board.difficulty() === "Easy") {
              ai.easy("O", board);
            }
            if (board.difficulty() === "Medium") {
              ai.medium("O", board);
            }
            if (board.difficulty() === "Hard") {
              ai.hard("O", board);
            }
          }
        }
      });
    };
  
    return { mouseSelection, getSign };
  };

  

  const AI = () => {
    const rows = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
    ];

    const column = [
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
    ];

    const diagonal = [
      [0, 4, 8],
      [2, 4, 6],
    ];

    const random = () => Math.floor(Math.random() * 9);
  
 
    function sleep(ms) {
      return new Promise((resolve) => setTimeout(resolve, ms));
    }
  
    
    const easy = async (sign, board) => {
      for (let i = 0; i < 10; i++) {
        
        let randomLocation = random();
        if (board.boardArray[randomLocation] == "") {
          board.boardArray[randomLocation] = sign;
          await sleep(300);
          board.updateContainer();
          board.checkWin(sign);
          break;
        }
      }
    };
  
   
    const checkRowsMediumDifficulty = (sign, board) => {
      let temp = -1;
      for (let i = 0; i < 3; i++) {
        let counter = 0;
        for (let j = 0; j < 3; j++) {
          if (board.boardArray[rows[i][j]] == "X") {
            counter++;
          }
          if (board.boardArray[rows[i][j]] == "") {
            temp = rows[i][j];
          }
          if (counter == 2 && temp != -1) {
            return temp;
          }
        }
        temp = -1;
      }
      return temp;
    };
  
   
    const checkColumnsMediumDifficulty = (sign, board) => {
      let temp = -1;
      for (let i = 0; i < 3; i++) {
        let counter = 0;
        for (let j = 0; j < 3; j++) {
          if (board.boardArray[column[i][j]] == "X") {
            counter++;
          }
          if (board.boardArray[column[i][j]] == "") {
            temp = column[i][j];
          }
          if (counter == 2 && temp != -1) {
            return temp;
          }
        }
        temp = -1;
      }
      return temp;
    };
  
   
    const checkDiagonalsMediumDifficulty = () => {
      let temp = -1;
      for (let i = 0; i < 2; i++) {
        let counter = 0;
        for (let j = 0; j < 3; j++) {
          if (board.boardArray[diagonal[i][j]] == "X") {
            counter++;
          }
          if (board.boardArray[diagonal[i][j]] == "") {
            temp = diagonal[i][j];
          }
          if (counter == 2 && temp != -1) {
            return temp;
          }
        }
        temp = -1;
      }
      return temp;
    };
  
    
    const medium = async (sign, board) => {
      let columnsValue = checkColumnsMediumDifficulty(sign, board);
      let rowsValue = checkRowsMediumDifficulty(sign, board);
      let diagonalValue = checkDiagonalsMediumDifficulty(sign, board);
      let temp = -1;
      if (columnsValue != -1) temp = columnsValue;
      if (rowsValue != -1) temp = rowsValue;
      if (diagonalValue != -1) temp = diagonalValue;
  
      if (temp == -1) {
        easy(sign, board);
      } else {
        board.boardArray[temp] = "O";
        await sleep(300);
        board.updateContainer();
        board.checkWin(sign);
      }
    };
  
    const hard = async (sign, board) => {
      let counterSign = "X"; 
      let bestMove = -1; 
      let bestValue = -100; 
      for (let index = 0; index < 9; index++) {
       
        if (board.boardArray[index] == "") {
         
          board.boardArray[index] = sign; 
          let moveValue = miniMax(board, false, sign, counterSign); 
          board.boardArray[index] = ""; 
          if (moveValue > bestValue) {
           
            bestMove = index;
            bestValue = moveValue;
          }
        }
      }
      board.boardArray[bestMove] = sign; 
      await sleep(300);
      board.updateContainer(); 
      board.checkWin(sign); 
    };
  
    const miniMax = (board, isMaximizing, sign, counterSign) => {
      let boardVal = checkWinConditionsMiniMax(sign, counterSign, board); 
      if (boardVal == 10 || boardVal == -10) {

        return boardVal;
      }
      if (board.checkForDraw()) {
        return 0;
      }
      if (isMaximizing) {
        let highestVal = -100;
        for (let index = 0; index < 9; index++) {
          if (board.boardArray[index] == "") {
            board.boardArray[index] = sign;
            highestVal = Math.max(
              highestVal,
              miniMax(board, !isMaximizing, sign, counterSign)
            );

            board.boardArray[index] = ""; 
          }
        }
        return highestVal;
      } else {
        let lowestVal = +100;
        for (let index = 0; index < 9; index++) {
          if (board.boardArray[index] == "") {
            board.boardArray[index] = counterSign;
            lowestVal = Math.min(
              lowestVal,
              miniMax(board, !isMaximizing, sign, counterSign)
            );
            board.boardArray[index] = "";
          }
        }
        return lowestVal;
      }
    };
  
    const checkWinConditionsMiniMax = (sign, counterSign, board) => {
      if (
        board.checkForColumnWin(sign) ||
        board.checkForRowWin(sign) ||
        board.checkForDiagonalWin(sign)
      ) {
        return 10;
      }
      if (
        board.checkForColumnWin(counterSign) ||
        board.checkForRowWin(counterSign) ||
        board.checkForDiagonalWin(counterSign)
      ) {
        return -10;
      }
      return 0;
    };
  
    return { easy, medium, hard };
  };

  
  const board = Board();
  const p1 = Player("X");
  const ai = AI();
  
  board.populateArray();
  p1.mouseSelection(board, ai);
  