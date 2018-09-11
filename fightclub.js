/**
 * WELCOME TO FIGHT CLUB!
 *
 * @author: C. Moller
 * @date: 20 December 2017
 *
 */

console.log('Welcome to Fight Club!');

window.onload = function() {

  FC.lib   = new Lib();

  FC.view  = new View();

  FC.debug = new DebugView();

  FC.input = new Input();

  console.log('View.width:', FC.view.getWidth(), ', height:', FC.view.getHeight());

  FC.game = new GameEngine(FC.view, FC.input, FC.config);

  FC.game.start();

  FC.game.stop();

};
