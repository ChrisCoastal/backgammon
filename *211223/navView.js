// export const btnGameStart = [
//   ...document.getElementsByClassName("btn-new-game"),
// ].forEach((el) => {
//   el.addEventListener("click", function (e) {
//     e.preventDefault();
//     console.log("START GAME!");
//     initGame();
//   });
// });

export const addNewGameHandler = function (handler) {
  const btnGameStart = document.querySelector(".btn-start-game");
  console.log(btnGameStart);
  btnGameStart.addEventListener("click", function (e) {
    e.preventDefault();
    console.log("START");
    handler();
  });
};
