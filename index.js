//selecting alll required elements
const selectBox = document.querySelector(".select-box");
selectXBtn = selectBox.querySelector(".playerX");
selectOBtn = selectBox.querySelector(".playerO");
playBoard = document.querySelector(".play-board");
allBox = document.querySelectorAll("section span");
xTurn = document.querySelector(".X-turn");
oTurn = document.querySelector(".O-turn");
players = document.querySelector(".players");
resultBox = document.querySelector('.result-box')
wonText = document.querySelector('.won-text')
replayBtn = document.querySelector('.btn button')

window.onload = () => {
  allBox.forEach((btn) => {
    btn.addEventListener("click", () => clickedBox(btn));
  });

  selectXBtn.onclick = () => {
    selectBox.style.display = "none";
    playBoard.style.display = "block";
    xTurn.classList.add("active");
  };
  selectOBtn.onclick = () => {
    selectBox.style.display = "none";
    playBoard.style.display = "block";
    oTurn.classList.add("active");
  };
};

let playerXIcon = "fas fa-times";
let playerOIcon = "far fa-circle";
let runBot = true;

//user click function
clickedBox = (btn) => {
  if (xTurn.classList.contains("active")) {
    btn.innerHTML = `<i class="${playerXIcon}"></i>`;
    oTurn.classList.add("active");
    xTurn.classList.remove("active");
    btn.setAttribute("id", "X");
  } else {
    btn.innerHTML = `<i class="${playerOIcon}"></i>`;
    xTurn.classList.add("active");
    oTurn.classList.remove("active");
    btn.setAttribute("id", "O");
  }
  selectWinner();
  btn.style.pointerEvents = "none";
  playBoard.style.pointerEvents = "none";
  setTimeout(() => {
    bot(runBot);
  }, 1500);
};

bot = (runBot) => {
  if (runBot) {
    let array = [];
    for (let i = 0; i < allBox.length; i++) {
      if (allBox[i].childElementCount == 0) {
        array.push(i);
      }
    }
    let randomBox = array[Math.floor(Math.random() * array.length)];
    if (array.length > 0) {
      if (xTurn.classList.contains("active")) {
        allBox[randomBox].innerHTML = `<i class="${playerXIcon}"></i>`;
        oTurn.classList.add("active");
        xTurn.classList.remove("active");
        allBox[randomBox].setAttribute("id", "X");
      } else {
        allBox[randomBox].innerHTML = `<i class="${playerOIcon}"></i>`;
        xTurn.classList.add("active");
        oTurn.classList.remove("active");
        allBox[randomBox].setAttribute("id", "O");
      }
      selectWinner();
    }
    allBox[randomBox].style.pointerEvents = "none";
  }
  playBoard.style.pointerEvents = "auto";
};

//let work on select the winner
getId = (idname) => {
  return document.querySelector(".box" + idname).id;
};
checkId = (num1, num2, num3, sign) => {
  if (getId(num1) == sign && getId(num2) == sign && getId(num3) == sign) {
    return true;
  }
};

selectWinner = () => {
  if (
    checkId(1, 2, 3, "X") ||
    checkId(4, 5, 6, "X") ||
    checkId(7, 8, 9, "X") ||
    checkId(1, 4, 7, "X") ||
    checkId(2, 5, 8, "X") ||
    checkId(3, 6, 9, "X") ||
    checkId(1, 5, 9, "X") ||
    checkId(3, 5, 7, "X")
  ) {
    console.log("X is winner");
    runBot = false
    bot(runBot);
    setTimeout(() => {
      playBoard.style.display = 'none'
      resultBox.style.display = 'block'
    }, 700);
    wonText.innerHTML = `Player <p>X</p> won the game!`
  }
  if (
    checkId(1, 2, 3, "O") ||
    checkId(4, 5, 6, "O") ||
    checkId(7, 8, 9, "O") ||
    checkId(1, 4, 7, "O") ||
    checkId(2, 5, 8, "O") ||
    checkId(3, 6, 9, "O") ||
    checkId(1, 5, 9, "O") ||
    checkId(3, 5, 7, "O")
  ) {
    console.log("O is winner");
    runBot = false
    bot(runBot);
    setTimeout(() => {
      playBoard.style.display = 'none'
      resultBox.style.display = 'block'
    }, 1000);
    wonText.innerHTML = `Player <p>O</p> won the game!`
  }
  else{
    if(getId(1) != "" && getId(2) != "" && getId(3) != "" && getId(4) != "" && getId(5) != "" && getId(6) != "" && getId(7) != "" && getId(8) != "" && getId(9) != ""){
      runBot = false;
      bot(runBot);
      setTimeout(()=>{
        playBoard.style.display = 'none'
        resultBox.style.display = 'block'
      }, 700);
      wonText.textContent = "Match has been drawn!";
  }
  }
};

replayBtn.onclick =()=>{
  window.location.reload();
}