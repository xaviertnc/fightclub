/**
 * WELCOME TO FIGHT CLUB!
 *
 * @author: C. Moller
 * @date: 20 December 2017
 *
 */

console.log('Welcome to Fight Club!');

FC.lib         = new Lib    ();
FC.game.view   = new View   ('main-view' , { height: 600, width: 800 });
FC.game.score  = new Score  ('score'     , { x: 10 , y: 10 , height: 30, width: 270 });
FC.game.enemy  = new Boss   ('boss1'     , { x: 575, y: 250, height: 64, width: 64, vertSpeed: 30, horzSpeed: 30 });
FC.game.player = new Player ('player'    , { x: 150, y: 250, height: 64, width: 64, vertSpeed: 30, horzSpeed: 30 });

document.addEventListener('keydown' , FC.game.keydown.bind(FC.game));
document.addEventListener('keyup'   , FC.game.keyup.bind(FC.game));

FC.game.start();
