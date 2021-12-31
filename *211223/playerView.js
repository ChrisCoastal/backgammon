const clearClass = (el, cl) => el.classList.remove(cl);

// DICE ROLL

export const renderDicePips = function (roll, dice1, dice2) {
  const dice = document.getElementsByClassName("dice");
  // Compelte catch?
  // if (!rolls) dice.forEach((die) => (die.innerHTML = ``));
  // if (player === 0) {
  console.log(dice[3]);
  console.log(roll);
  [...dice].forEach(
    (el, i) => (el.innerHTML = `<div class="dice-dot"></div>`.repeat(roll[i]))
  );
};

export const renderActivePlayer = function (actPl) {
  document
    .querySelectorAll(`.player`)
    .forEach((player) => player.classList.remove(`active-player`));
  document.querySelector(`.player-${actPl}`).classList.add(`active-player`);
};

// BUTTONS
// event listeners on buttons

//TODO:
export const addPlayerButtonHandlers = function (handler) {
  const playerUI = document.querySelector(".active-player");

  playerUI.addEventListener("click", function (e) {
    console.log("UI trace", e.target.classList);
    handler(e, e.target.classList, e.target.closest(".blot-container"));
  });
};

const playerButtons = function (player) {
  // activate player buttons
  const btnEndTurn = document
    .querySelector(`.btn-end-turn--${player}`)
    .addEventListener("click", function (e) {
      endTurn(player);
    });

  const btnUndoMove = document
    .querySelector(`.btn-undo-move--${player}`)
    .addEventListener("click", function (e) {
      // undoMove();
    });
};

const rollDiceBtns = [...document.getElementsByClassName("btn-roll-dice")];
rollDiceBtns.forEach((btn) =>
  btn.addEventListener("click", function (e) {
    // if (currentRoll) return;
    rollDice(activePlayer);
    // FIX the catch with proper active player class etc.
    // if (!roll.classList.includes(active)) return;
    console.log("ROLL!!");
    renderDicePips(currentRoll);
  })
);

// PLAYER render RENDER

//TODO:
export const renderPipCount = function (counts) {
  document.getElementsByClassName("pip-count-display");
};
