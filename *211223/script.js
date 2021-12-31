import { FIRSTROLL } from "./config.js";
import * as Model from "./model.js";
import * as NavView from "./navView.js";
import * as BoardView from "./boardView.js";
import * as PlayerView from "./playerView.js";

// Game Setup / Start
const startNewGame = function () {
  // 1) call roll dice M
  Model.rollDice();
  // 2) determine active player from roll (higher roll plays first)
  Model.initActivePlayer(Model.state.currentRoll);
  PlayerView.renderActivePlayer(Model.state.activePlayer);
  // 3) load start position M
  Model.startPosition(Model.state.blot.blotPositions);
  console.log(Model.state.blot.blotPositions);
  // 4) render dice roll / active player V
  PlayerView.renderDicePips(Model.state.currentRoll);
  // 5) render start position V
  BoardView.renderBlotPositions(Model.state.blot.blotPositions);
  activatePlayerTurn();
  // 7) get / render pip count
  //TODO:
  // Model.calcPipCount(Model.state.blot.blotPositions);
  // PlayerView.renderPipCount(Model.state.pipcount);
};

const controlBoardEvent = function (boardEvent) {
  if (Model.state.currentRoll.length === 0) return;
  console.log("boardEvent", boardEvent);
  // if (!Model.state.blot.activeBlotPosition)
  // 1) register board event
  Model.directBoardEvent(boardEvent);
  // 2) update UI from Model
  BoardView.renderBlotPositions(Model.state.blot.blotPositions);
  BoardView.renderActiveBlot(boardEvent, Model.state.blot.activeBlotPosition);
  BoardView.renderValidMoves(Model.state.validMoves);
  PlayerView.renderDicePips(Model.state.currentRoll);

  // old stuff
  // if (Model.state.playerAction.at(-1) === 4)
  // if (Model.state.blot.activeBlotPosition)
  //   BoardView.renderActiveBlot(boardEvent, Model.state.blot.activeBlotPosition);
  // if (Model.state.activeBlotPosition)
  //   BoardView.renderValidMoves(Model.state.validMoves);
};

//TODO: decide how to
const activatePlayerTurn = function () {
  // 1) add board event listener
  BoardView.addBoardSurfaceHandler(controlBoardEvent);
  // 2) add eventlistener to active-player buttons V
  PlayerView.addPlayerButtonHandlers();
  // Model.state.blot.activeBlotPosition < 0
  //   ? Model.createActiveBlot(boardEvent)
  //   : Model.directBoardEvent(boardEvent);
  // 2) if blot; update UI
  // 2.1) render active blot
  // if (Model.state.blot.activeBlotPosition)
  // 2.2) render possible moves

  // 3) if point; nothing
};

//TODO:
const endPlayerTurn = function (player) {
  roundArchiver(blotPositions);
  roundCount(blotPositionsArchive);
  // clear current roll array
  // update UI with blank array w/ renderDicePips
  renderDicePips(currentRoll);
  // switch active player
};

//

const init = function () {
  // call function here or not?
  NavView.addNewGameHandler(startNewGame);
};

init();
