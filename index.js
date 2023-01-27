"use strict";

const units = document.querySelectorAll(".unit");

let state = [
  [0, 0, 0],
  [0, 0, 0],
  [0, 0, 0],
];

const cross = `<svg xmlns="http://www.w3.org/2000/svg" height="48" width="48"><path d="m12.45 37.65-2.1-2.1L21.9 24 10.35 12.45l2.1-2.1L24 21.9l11.55-11.55 2.1 2.1L26.1 24l11.55 11.55-2.1 2.1L24 26.1Z"/></svg>`;
const circle = `<svg xmlns="http://www.w3.org/2000/svg" height="48" width="48"><path d="M24 44q-4.1 0-7.75-1.575-3.65-1.575-6.375-4.3-2.725-2.725-4.3-6.375Q4 28.1 4 24q0-4.15 1.575-7.8 1.575-3.65 4.3-6.35 2.725-2.7 6.375-4.275Q19.9 4 24 4q4.15 0 7.8 1.575 3.65 1.575 6.35 4.275 2.7 2.7 4.275 6.35Q44 19.85 44 24q0 4.1-1.575 7.75-1.575 3.65-4.275 6.375t-6.35 4.3Q28.15 44 24 44Zm0-3q7.1 0 12.05-4.975Q41 31.05 41 24q0-7.1-4.95-12.05Q31.1 7 24 7q-7.05 0-12.025 4.95Q7 16.9 7 24q0 7.05 4.975 12.025Q16.95 41 24 41Zm0-17Z"/></svg>`;

const field = Array.from(units); // [...units]
// console.log(field);
let counter = 0;

field.map((elem, index) => {
  elem.addEventListener("click", (e) => {
    if (counter % 2 === 0 && elem.innerHTML === "") {
      elem.innerHTML = cross;
      let row = Math.floor(index / 3);
      let col = index % 3;
      state[row][col] = 1;
      winer(elem.parentElement, checkWiner(state));
      counter++;
      //   console.log(state);
    } else if (elem.innerHTML === "") {
      elem.innerHTML = circle;
      let row = Math.floor(index / 3);
      let col = index % 3;
      state[row][col] = 2;
      counter++;
      winer(elem.parentElement, checkWiner(state));
      //   console.log(state);
    }
  });
});

function checkWiner(arr) {
  //   let flag = false;
  let arrCross = [0, 0, 0];
  let arrCrossReverse = [0, 0, 0];
  for (let i = 0; i < arr.length; i++) {
    let arrTemp = [];
    for (let j = 0; j < arr[i].length; j++) {
      arrTemp.push(arr[j][i]);
      if (i === j) {
        arrCross[i] = arr[i][j];
      }
      if (i === 0 && j === arr[i].length - 1) {
        arrCrossReverse[i] = arr[i][j];
        // console.log(arrCrossReverse);
      } else if (i === j && i === 1) {
        arrCrossReverse[i] = arr[i][j];
        // console.log(arrCrossReverse);
      } else if (i === arr[i].length - 1 && j === 0) {
        arrCrossReverse[i] = arr[i][j];
        // console.log(arrCrossReverse);
      }
    }
    // console.log(arrTemp);
    if (check(arr[i]) === 1) {
      return 1;
    } else if (check(arr[i]) === 2) {
      return 2;
    } else if (check(arrTemp) === 1) {
      return 1;
    } else if (check(arrTemp) === 2) {
      return 2;
    } else if (check(arrCross) === 1) {
      return 1;
    } else if (check(arrCross) === 2) {
      return 2;
    } else if (check(arrCrossReverse) === 1) {
      return 1;
    } else if (check(arrCrossReverse) === 2) {
      return 2;
    }
  }
}

function check(arr) {
  if (arr.every((val) => val === 1)) {
    return 1;
  } else if (arr.every((val) => val === 2)) {
    return 2;
  }
}

function winer(board, player) {
  if (player === 1 || player === 2) {
    board.innerHTML = "";
    const message = document.createElement("h2");
    message.innerHTML = `Congrates Player ${player}
     you Won`;
    board.appendChild(message);
    board.style.display = "flex";
    board.style.alignItems = "center";
    board.style.justifyContent = "center";
  }
}
// console.log(check([2, 2, 2]));
// console.log(units, field);

// console.log(state);
