# backgammon
a backgammon app for 2 players (currently a hot mess)

Early stages of creating a backgammon application with basic/partial UI and logic.
Gameplay and logic are still being sorted out and there are several bugs/conditions that need to be worked out.
The new game button in the top left will initialize the board position and roll the dice (for red).
Red blots can be clicked and moved to valid squares (currently can move an infinite amount as movement is not tallied).

Next on the todo list:
- correct the activeblot issue (blot is not highlighted except when it is the 'ghost' blot left after all the blots hav ebeen moved from a point (see below))
- correct issue with moving all blots from a point 'ghost blot' (one blot remains rendered on point even when blot array is empty)
- complete code to remove a roll once it has been used (ie: a blot has been moved)
- complete end turn and new roll

Lots more game logic is still required for various movement conditions (point is occupied by opponent, hitting opponent, etc).
Bearing off blots and winning conditions also are yet to be started.
This is my first vanilla Javascript project from scratch. Lots of learning and lots yet to do.
