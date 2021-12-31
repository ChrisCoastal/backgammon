import { FIRSTROLL } from "./config.js";
import { placeNum } from "./helpers.js";

//TODO:
export const state = {
  activePlayer: "",
  players: [],
  playerAction: [],
  currentRoll: [],
  rollDouble: false,
  validMoves: [],
  blot: {
    blotPositionsArchive: [],
    blotPositions: Array.from(new Array(26), () => []),
    activeBlotPosition: -1,
  },
  pipcount: {
    pipCountPlayer0: 0,
    pipCountPlayer1: 0,
  },
};

//TODO:
// export const updateState = function (key, data) {
//   key = data;
//   // activeBlot in view
//   // blots in view
// };
const clearArr = (arr) => arr.splice(0, arr.length);

const createPlayersObject = function (data) {};

// DICE ROLL
const diceRollNum = () => Math.floor(Math.random() * 6) + 1;

export const rollDice = function () {
  //clear
  clearArr(state.currentRoll);
  state.rollDouble = false;
  // roll
  const [roll1, roll2] = [diceRollNum(), diceRollNum()];
  if (roll1 === roll2) state.rollDouble = true;
  if (!state.rollDouble) state.currentRoll.push(roll1, roll2);
  if (state.rollDouble) state.currentRoll.push(roll1, roll2, roll1, roll2);

  console.log(state.currentRoll);
};

// ACTIVE PLAYER / TURN
export const initActivePlayer = function (roll) {
  if (state.rollDouble) {
    // COMPLETE doubling cube
    console.log("DOUBLE!");
    rollDice(FIRSTROLL);
    initActivePlayer(state.currentRoll);
  }
  roll[0] > roll[3] ? (state.activePlayer = 0) : (state.activePlayer = 1);
  console.log(state.activePlayer);
};

const switchActivePlayer = function (arr) {
  arr.forEach((player) => player.classList.toggle(`active-player`));
};

// PLAYER TURN

export const createActiveBlot = function (boardEvent) {
  if (!boardEvent) return;
  const targetEl = boardEvent.path[0];

  state.blot.activeBlotPosition = placeNum(targetEl.closest(".blot-container"));
  calcValidMoves(state.currentRoll, state.blot.activeBlotPosition);
};

export const directBoardEvent = function (boardEvent) {
  clearArr(state.playerAction);
  const targetEl = boardEvent.path[0];
  const targetParentEl = boardEvent.path[1];
  // use path[1] maybe (path[0] || path[1]) if there is blot selected

  // 1) click on board (no action)
  if (targetEl.classList.contains("board-surface")) {
    console.log("BOARD");
    return;
  }
  // return;
  // 2) no activeblot & click on point (no action)
  if (
    state.blot.activeBlotPosition < 0 &&
    targetEl.classList.contains(`point`)
  ) {
    console.log("2");
    return;
  }
  // 3) no activeblot & click on opponent blot (no action)
  if (
    state.blot.activeBlotPosition < 0 &&
    !targetEl.classList.contains(`blot-${state.activePlayer}`) &&
    !targetEl.classList.contains(`point`)
  ) {
    console.log("3");
    return;
  }
  // 4) no activeBlot & click on activePlayer blot
  if (
    state.blot.activeBlotPosition < 0 &&
    targetEl.classList.contains(`blot-${state.activePlayer}`)
  ) {
    console.log("4");
    // update state
    state.playerAction.push(4);
    state.activeBlotPosition = placeNum(targetParentEl);
    console.log("ActiveBlot", state.activeBlotPosition);
    createActiveBlot(boardEvent);
    return;
  }
  // 5) activeBlot & click on point (handle possible move in called function)
  if (
    state.blot.activeBlotPosition > 0 &&
    targetEl.classList.contains(`point`)
  ) {
    console.log("5", targetEl);
    checkMoveBlot(state.activeBlotPosition, targetEl);
    return;
  }
  // 6) activeBlot & click on activePlayer blot
  if (
    state.blot.activeBlotPosition > 0 &&
    targetEl.classList.contains(`blot-${state.activePlayer}`)
  )
    console.log("6");
  // moveBlot(_, _, boardEvent);
  // 7) activeBlot & click on opponent blot
  if (
    state.blot.activeBlotPosition > 0 &&
    !targetEl.classList.contains(`blot-${state.activePlayer}`)
  )
    console.log("7");
  // moveBlot(_, _, boardEvent);
  // 8) ???
  else console.error();
  ("NEED TO ACCOUNT FOR THIS");

  // if (state.blot.activeBlotPosition > -1 && targetEl.classList.contains("blot"))
  //   checkMoveBlot(_, _, _);
  // if (
  //   state.blot.activeBlotPosition > -1 &&
  //   !targetEl.classList.contains("blot")
  // )
  //   moveBlot(_, _, _);

  // const displayBlot = boardEvent;
  //   if (!displayBlot.classList.contains(`blot-${state.activePlayer}`)) return;

  //   [...blots].forEach((blot) => blot.classList.remove("active-blot"));
  //   activeBlotPosition = [...boardEvent.closest(".blot-container").classList]
  //     .at(1)
  //     .slice(-2)
  //     .replace("-", "");
  //   boardEvent.classList.toggle("active-blot");
  //   calcValidMoves(currentRoll, activeBlotPosition);
  // }
  // if (boardEvent.classList.contains("point") && activeBlot()) {
  //   const point = boardEvent;
  //   // if (!point.classList.contains(moves.forEach((move) => move))) return;
  //   const moveToPosition = [...point.classList]
  //     .at(1)
  //     .slice(-2)
  //     .replace("-", "");
  //   moveBlot(activeBlot(), activeBlotPosition, moveToPosition);
};

const roundCount = function (blotPositionsArchive) {
  Math.floor(blotPositionsArchive.length / 2);
};

// MOVEMENT
export const startPosition = function (arr) {
  // arr[0] = ["blot-1"];
  // arr[25] = ["blot-0"];
  // arr[0] = player2 bear off; arr[26] = player1 bear off
  arr[24] = ["blot-1", "blot-1"];
  arr[13] = ["blot-1", "blot-1", "blot-1", "blot-1", "blot-1"];
  arr[8] = ["blot-1", "blot-1", "blot-1"];
  arr[6] = ["blot-1", "blot-1", "blot-1", "blot-1", "blot-1"];
  arr[1] = ["blot-0", "blot-0"];
  arr[12] = ["blot-0", "blot-0", "blot-0", "blot-0", "blot-0"];
  arr[17] = ["blot-0", "blot-0", "blot-0"];
  arr[19] = ["blot-0", "blot-0", "blot-0", "blot-0", "blot-0"];
};

//TODO:
export const calcPipCount = function (blotPos) {
  console.log(blotPos[1][1].slice(-1));
  state.pipcount = blotPos.reduce(
    (acc, val, i) => {
      val.slice(-1);
    },
    { pipCountPlayer0: 0, pipCountPlayer1: 0 }
  );
};

const calcValidMoves = function (roll, curPos) {
  // console.log("ACTIVE", state.activeBlotPosition);
  // if (!state.activeBlotPosition) clearArr(state.validMoves);
  // const valid = roll.filter((num) => num > 0);
  // console.log("valid", valid);

  // const validateMoves = roll.map((rollNum, i) => {
  //   console.log(curPos, rollNum);
  //   state.blot.blotPositions[+curPos + +rollNum].l
  // });
  // FIXME:
  // const moves =
  //   state.activePlayer === 0
  //     ? [+curPos + roll[0], +curPos + roll[1], +curPos + roll[0] + roll[1]]
  //     : [+curPos - roll[0], +curPos - roll[1], +curPos - roll[0] - roll[1]];
  // console.log(moves);
  // console.log(
  //   moves.filter(
  //     (moveTo) => moveTo > 0 && moveTo < 25 && state.blot.blotPositions[moveTo]
  //   )
  // );
  //  ||
  //     state.blot.blotPositions[moveTo].includes(
  //       `blot-${state.activePlayer}`
  //     ) ||
  //     (!state.blot.blotPositions[moveTo].includes(
  //       `blot-${state.activePlayer}`
  //     ) &&
  //       state.blot.blotPositions[moveTo].length === 1)
  //     ? true
  //     : false;

  // console.log(moves);
  // state.validMoves = moves;
  // console.log(state.validMoves);
  if (state.activePlayer === 0) {
    const moves = [
      roll.map((num, i) => +curPos + num) + curPos + roll[0],
      +curPos + roll[1],
      +curPos + roll[0] + roll[1],
    ].filter((move) => move >= 1 && move < 25);
    // .filter((move) => );
    state.validMoves = moves;
    console.log("Player 0", state.validMoves);
  }
  if (state.activePlayer === 1) {
    const moves = [
      +curPos - roll[0],
      +curPos - roll[1],
      +curPos - roll[0] - roll[1],
    ].filter((move) => move >= 1 && move < 25);
    state.validMoves = moves;
    console.log("Player 1", state.validMoves);
  }

  // if (state.activePlayer === 0) {
  //   moves = [
  //     roll.map((num, i) => +curPos + num) + curPos + roll[0],
  //     +curPos + roll[1],
  //     +curPos + roll[0] + roll[1],
  //   ].filter((move) => move >= 1 && move < 25);
  //   // .filter((move) => );
  //   state.validMoves = moves;
  //   console.log("Player 0", state.validMoves);
  // }
  // if (state.activePlayer === 1) {
  //   moves = [
  //     +curPos - roll[0],
  //     +curPos - roll[1],
  //     +curPos - roll[0] - roll[1],
  //   ].filter((move) => move >= 1 && move < 25);
  //   state.validMoves = moves;
  //   console.log("Player 1", state.validMoves);
  // }
};

//FIXME:
// Update blot positions from player board click
const moveBlot = function (curPos, newPosEl) {
  console.log(
    "moveBlot",
    state.blot.blotPositions[+placeNum(newPosEl)],
    state.blot.blotPositions[curPos],
    state.blot.blotPositions[curPos].at(-1),
    +curPos,
    newPosEl
  );
  if (!state.blot.blotPositions[curPos].at(-1)) {
    console.log("There is no blot to move");
    return;
  }
  // clear activeBlot
  state.blot.activeBlotPosition = -1;
  //update position array
  const blotToMove = state.blot.blotPositions[+curPos].pop();
  state.blot.blotPositions[+placeNum(newPosEl)].splice(-1, 0, blotToMove);
  console.log(state.blot.blotPositions);
  //TODO:
  // update currentRoll
  const moved = +curPos - +placeNum(newPosEl);
  state.currentRoll.filter((roll) => roll === curPos - +placeNum(newPosEl));
  // const rollTakenIndex = state.currentRoll.reduce();
  // if (rollTakenIndex >= currentRoll.length) clearArr(state.validMoves);
  console.log(state.currentRoll);
  // displayBlotPositions(blotPositions);
};

const checkMoveBlot = function (curPos, newPosEl) {
  console.log("blotPOS", state.blot.blotPositions[+placeNum(newPosEl)]);
  console.log(+placeNum(newPosEl));
  console.log("checkmoveblot");
  if (!state.validMoves.includes(+placeNum(newPosEl))) {
    console.log("CANT MOVE HERE");
    return;
  }
  if (state.blot.blotPositions[+placeNum(newPosEl)].length === 0) {
    console.log("YOU CAN MOVE HERE");
    return moveBlot(curPos, newPosEl);
  }
  if (
    state.blot.blotPositions[+placeNum(newPosEl)].includes(
      `blot-${state.activePlayer}`
    )
  ) {
    return moveBlot(curPos, newPosEl);
  }
  if (state.blot.blotPositions[+placeNum(newPosEl)].length === 1) {
    return hitBlot(curPos, newPosEl);
  }
  // const blotToMove = state.blot.blotPositions[curPos].at(-1);
  //update position array
  // state.blot.blotPositions.splice([curPos].at(-1), [[1]]);
  // state.blot.blotPositions[newPosEl].push(blotToMove);
  //update display
  // displayBlotPositions(blotPositions);
  //update archive array
  // blotPositionsArchive
};

//TODO:
const checkWinner = function (arr) {
  arr.forEach((arrPl) => {
    arrPl.length === 15 ? gameWinner(`player${arr}`) : "";
  });
};

//TODO:
const hitBlot = function (blotCont) {
  console.log("You hit a blot!");
};

export const endPlayerTurn = function () {
  //update archive array
  state.blot.blotPositionsArchive.push(state.blot.blotPositions);

  switchActivePlayer();
};
