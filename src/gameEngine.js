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

    FC.log('');
    FC.log('gameEngine.construct(), config =', config);

    this.config = config;
    this.log = FC.log;

    FC.log('');
    FC.log('gameEngine.construct() - Create Static Objects..');
    this.lib = new Lib(this);
    this.input = new InputService(this);
    this.view = new View('main-view', this);
    this.debugView = new View('debug-pane', this);

    this.step.bind(this);

    FC.log('gameEngine.construct() - Done');

  }


  init() {

    this.log('');
    this.log('gameEngine.init() - Start');

    this.nextId = 0;
    this.state = 'Idle';
    this.stepTimer = null;
    this.startTime = this.lib.getTime();
    this.lastTime = this.startTime;

    this.log('');
    this.log('gameEngine.init() - Create Dynamic Objects..');
    this.score = new Score('score', this);
    this.enemy = new Boss('boss1', this);
    this.player = new Player('player', this);
    this.pointer = null;

    this.log('');
    this.log('gameEngine.init() - Initialize Game Objects..');
    this.input.init();
    this.view.init();
    this.debugView.init();
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
    this.input.mount();
    this.view.mount();
    this.debugView.mount();
    this.score.mount(this.view.elm);
    this.enemy.mount(this.view.elm);
    this.player.mount(this.view.elm);

    this.startBtn = document.getElementById('start');
    this.stopBtn = document.getElementById('stop');

    this.step(this.startTime);

    this.log('');
    this.log('gameEngine.init() - Done,', this);

  }


  start() {

    this.log('');
    this.log('gameEngine.start()');

    this.state = 'Running';

    this.startTime = this.lib.getTime();

    this.stopBtn.disabled = false;
    this.startBtn.disabled = true;

    window.cancelAnimationFrame(this.stepTimer);

    this.pointer = new PointerLine('player-pointer', this);
    this.pointer.init().build().mount(this.view.elm);

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

    //let now = this.getTime();

    let dt = now - this.lastTime;

    this.beforeUpdate(now, dt);

    this.update(now, dt);

    this.afterUpdate(now, dt);

    this.render();

    this.lastTime = now;

    if (this.state === 'Running') {

      this.stepTimer = window.requestAnimationFrame(this.step.bind(this));

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
