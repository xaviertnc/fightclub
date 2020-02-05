/**
 *
 * FIGHT CLUB - GAME ENGINE
 *
 * @author: C. Moller
 * @date: 20 December 2017
 *
 * @updated: 05 Feb 2020 (C. Moller)
 *   - Add lots of debug logs + Organize code.
 *   - Internalize log, lib, input, view and debugView.
 *   - Solve initial game.start/stop requirement issue.
 *   - Implement initialization stages: Create, Init, Build, Mount
 *   - Add init() + updateDebugView()
 */

class GameEngine {


  constructor(config) {

    this.config = config;

    FC.log('');
    FC.log('gameEngine.construct(), config =', config);

    this.log = FC.log;

    this.lib = new Lib(this);

    this.input = new InputService(this);
    this.view = new View('main-view', this);
    this.debugView = new View('debug-pane', this);

    this.input.init();
    this.view.init();
    this.debugView.init();

    this.input.mount();
    this.view.mount();
    this.debugView.mount();

    this.stopBtn = document.getElementById('stop');
    this.startBtn = document.getElementById('start');

    // Step gets called by window.requestAnimationFrame() as callback.
    // Hence, "this === window" but we need it to be === "FC.game"
    this.step.bind(this);

    // Shortcut
    this.now = this.lib.getTime;

    FC.log('gameEngine.construct() - Done');

  }


  /**
    * The idea behind init() is to enable us
    * to "reset" the game.
    *
    */
  init() {

    this.log('');
    this.log('gameEngine.init() - Start');

    this.nextId = 0;
    this.lastTime = 0;
    this.startTime = 0;
    this.stepTimer = null;
    this.state = 'Idle';

    this.log('');
    this.log('gameEngine.init() - Create Game Objects..');
    this.score = new Score('score', this);
    this.enemy = new Boss('boss1', this);
    this.player = new Player('player', this);
    this.pointer = null;

    this.log('');
    this.log('gameEngine.init() - Initialize Game Objects..');
    this.score.init(this.config.score);
    this.enemy.init(this.config.boss1);
    this.player.init(this.config.player);

    this.log('');
    this.log('gameEngine.init() - Build Game Object Views..');
    this.score.build();
    this.enemy.build();
    this.player.build();

    this.log('');
    this.log('gameEngine.init() - Mount Game Object Views..');
    this.score.mount(this.view.elm);
    this.enemy.mount(this.view.elm);
    this.player.mount(this.view.elm);

    this.log('');
    this.log('gameEngine.init() - Done,', this);

    return this;

  }


  start(startState) {

    this.log('');
    this.log('gameEngine.start()');

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
    this.log('gameEngine.stop()');

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

    this.debugView.getChildElement(itemID).innerText = value;

  }


}; // end: GameEngine class
