/**
 *
 * FIGHT CLUB - GAME ENGINE
 *
 * @author: C. Moller
 * @date: 20 December 2017
 *
 * @update: C. Moller - 05 Feb 2020
 *   - Add lots of debug logs + Organize code.
 *   - Internalize log, lib, input, view and debugView.
 *   - Solve initial game.start/stop requirement issue.
 *   - Implement initialization stages: Create, Init, Build, Mount
 *   - Add init() + updateDebugView()
 *
 * @update: C. Moller - 08 Feb 2020
 *   - Refactor constructor() + init() again.
 *   - Add / move / improve debug logs.
 *
 */

class GameEngine {


  constructor(config) {

    FC.log('');
    FC.log('Construct Game Engine - Start, config =', config);
    FC.log('------------------------------');

    this.log = FC.log;

    this.config = config;

    this.lib = new Lib();

    this.now = this.lib.getTime; // Shortcut

    this.step = this.step.bind(this); // reqAnimFrame Callback

    FC.log('');
    this.view = new View('main-view', this);
    this.view.mount();

    FC.log('');
    this.debugView = new View('debug-pane', this);
    this.debugView.mount();

    FC.log('');
    this.score = new Score('main-score', this);
    this.score.init(this.config.score);
    this.score.mount(this.view.elm);

    FC.log('');
    this.input = new InputService(this);
    this.input.init(this);
    this.input.mount();

    FC.log('');
    this.stopBtn = document.getElementById('stop');
    this.startBtn = document.getElementById('start');
    this.restartBtn = document.getElementById('restart');

    FC.log('------------------------------');
    FC.log('Construct Game Engine - Done');

  }


  /**
    * The idea behind init() is to enable us
    * to "restart" the game.
    *
    */
  init() {

    this.log('');
    this.log('');
    this.log('Add Dynamic Objects - Start');
    this.log('------------------------------');

    this.nextId = 0;
    this.lastTime = 0;
    this.startTime = 0;
    this.stepTimer = null;
    this.state = 'Idle';

    this.log('');
    this.log('gameEngine.init() - CREATE OBJECTS');
    this.enemy = new Boss('boss1', this);
    this.player = new Player('player1', this);
    this.pointer = null;

    this.log('');
    this.log('gameEngine.init() - INIT OBJECTS');
    this.enemy.init(this.config.boss1);
    this.player.init(this.config.player1);

    this.log('');
    this.log('gameEngine.init() - BUILD VIEWS');
    this.enemy.build();
    this.player.build();

    this.log('');
    this.log('gameEngine.init() - MOUNT VIEWS');
    this.enemy.mount(this.view.elm);
    this.player.mount(this.view.elm);

    this.log('');
    this.log('----------------------');
    this.log('Add Dynamic Objects - Done,', this);

    return this;

  }


  dismount() {

    this.enemy.dismount();
    this.player.dismount();
    this.player.bullets.forEach(function(bullet) { bullet.dismount(); });
    if (this.pointer) { this.pointer.dismount(); }

    return this;

  }


  restart(startState) {

    this.dismount().init().start(startState);

  }


  start(startState) {

    this.log('');
    this.log('game.start()');

    this.state = startState || 'Running';

    window.cancelAnimationFrame(this.stepTimer);

    if (this.state === 'Running') {
      this.pointer = new PointerLine('player-pointer', this);
      this.pointer.init().build().mount(this.view.elm);
      this.startBtn.disabled = true;
      this.stopBtn.disabled = false;
    }

    this.startTime = this.now();

    this.step(this.startTime);

  }


  stop() {

    this.log('');
    this.log('game.stop()');

    window.clearTimeout(this.stepTimer);

    if (this.pointer) {

      this.pointer.dismount();
      this.pointer = null;

    }

    this.startBtn.disabled = false;
    this.stopBtn.disabled = true;

    this.state = 'Idle';

  }


  step(now) {

    let dt = now - this.lastTime;

    this.beforeUpdate(now, dt);

    this.update(now, dt);

    this.afterUpdate(now, dt);

    this.render();

    this.lastTime = now;

    if (this.state === 'Running') {

      this.stepTimer = window.requestAnimationFrame(this.step);

    }

  }


  beforeUpdate(now, dt) {

    this.score.beforeUpdate(now, dt);
    this.player.beforeUpdate(now, dt);
    this.enemy.beforeUpdate(now, dt);

  }


  update(now, dt) {

    this.input.update(now, dt);

    this.score.update(now, dt);
    this.player.update(now, dt);
    this.enemy.update(now, dt);

    if (this.pointer) {

      this.pointer.update(now, this.view, this.input, this.player);

    }

  }


  afterUpdate(now, dt) {

    this.score.afterUpdate(now, dt);
    this.player.afterUpdate(now, dt);
    this.enemy.afterUpdate(now, dt);

    this.input.afterUpdate(now, dt);

  }


  render() {

    this.score.render();
    this.player.render();
    this.enemy.render();

    if (this.pointer) {

      this.pointer.render(this.input.mode);

    }

  }


  updateDebugView(itemID, value) {

    let elView = this.debugView.getChildElement(itemID);
    if (elView) { elView.innerText = value; }

  }


}; // end: GameEngine class
