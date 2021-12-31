/////////////////////////////////////////////
// VIEW

// BOARD SURFACE
// event listener on board surface (points and blots)

const clearElHTML = function () {
  this._parentElement.innerHTML = "";
};

const clearMoves = () =>
  [...document.querySelectorAll(`.point`)].forEach((el) =>
    el.classList.remove(`open-point-down`, `open-point-up`)
  );

const clearActiveClass = (el, cl) => {};

export const addBoardSurfaceHandler = function (handler) {
  const boardSurface = document.querySelector(".board-surface");
  boardSurface.addEventListener("click", handler);
};

const clearActiveBlot = function () {
  const blots = document.getElementsByClassName("blot");
  [...blots].forEach((blot) => blot.classList.remove("active-blot"));
};

export const renderActiveBlot = function (boardEvent, activeBlot = -1) {
  clearActiveBlot();
  const targetEl = boardEvent.path[0];
  console.log("Here", targetEl);
  if (!targetEl.classList.contains("blot")) return;
  if (activeBlot < 0) return;
  targetEl.classList.toggle("active-blot");
};

export const renderValidMoves = function (moves) {
  clearMoves();
  if (!moves) return;

  moves.map(function (move) {
    move < 13
      ? document.querySelector(`.point-${move}`).classList.add(`open-point-up`)
      : document
          .querySelector(`.point-${move}`)
          .classList.add(`open-point-down`);
  });
};

// Display blots
export const renderBlotPositions = function (blotPositions) {
  const blotDisplayContainers = Array.from(
    document.getElementsByClassName("blot-container")
  );
  blotPositions.forEach((val, i) => {
    if (!val) return;
    if (val > 24 || val < 1) return;
    blotDisplayContainers[i].innerHTML =
      `<div class="blot ${val[0]}"></div>`.repeat(val.length);
  });
};

//FIXME:
// escape key removes active blot
document.addEventListener("keydown", function (e) {
  console.log(e);
  e.key === "Escape" &&
    [...blots].forEach((blot) => blot.classList.remove("active-blot"));
});

//FIXME:
// tab / arrow key moves active blot
document.addEventListener("keydown", function (e) {
  console.log(e);
  e.key === "Escape" &&
    [...blots].forEach((blot) => blot.classList.remove("active-blot"));
});
