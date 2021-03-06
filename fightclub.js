/**
 * WELCOME TO FIGHT CLUB!
 *
 * @author: C. Moller
 * @date: 20 December 2017
 *
 * @update: C. Moller - 05 Feb 2020
 *   Significant Refactor:
 *   - Moved most top-level objects from FC to FC.game
 *   - Added FC.log(). Disable via FC.config.debug = false.
 *   - Added init(), build(), mount(), dismount() to obj classes.
 *   - Refactor View Class
 *   - Refactor InputService Class
 *   - Refactor Animator, Animation, ... Classes
 *   - Added game.updateDebugView() + Update affected.
 *   - Fixed Pointer SVG Line rendering issue.
 *
 * @update: C. Moller - 08 Feb 2020
 *   - Revert some unnecessary complexity
 *   - Refine entity class constructor params and structure
 *   - Re-arrange console log messages and game engine
 *     initialization code again!
 */

FC.log = FC.config.debug ? console.log : function(){};

FC.log('Welcome to Fight Club!');


window.onload = function() {

  FC.gameEngine = new GameEngine(FC.config);
  FC.gameEngine.init().start('Idle');

};
