/**
 * WELCOME TO FIGHT CLUB!
 *
 * @author: C. Moller
 * @date: 20 December 2017
 *
 */

console.log('Welcome to Fight Club!');

FC.lib   = new Lib();

FC.view  = new View();

FC.debug = new DebugView();

FC.input = new Input();

FC.game  = new GameEngine();

FC.game.start();

FC.game.stop();
