/**
 *
 * FIGHT CLUB - GAME ENGINE
 *
 * @author: C. Moller
 * @date: 20 December 2017
 *
 */

class GameEngine {

  constructor(view, input, config) {

    this.view = view;
    this.input = input;
    this.config = config;

    this.debug = true;

    this.startTime = 0;
    this.lastTime = 0;
    this.stepTimer = null;
    this.state = null;

    this.score = new Score('score', { x: 10,  y: 10,  height: 30, width: 270 });
    this.enemy = new Boss('boss1', { x: 575, y: 250, width: 64, height: 64, vertSpeed: 30, horzSpeed: 30, animation: config.boss1.animation });
    this.player = new Player('player', { x: 150, y: 250, vertSpeed: 30, horzSpeed: 30, animation: config.player.animation });

    this.startBtn = document.getElementById('start');
    this.stopBtn = document.getElementById('stop');

    this.getTime = FC.lib.getTime;

    this.pointer = null;

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


  start() {

    window.console.log('FC.game.start()');

    this.state = 'Running';

    this.startTime = this.getTime();

    this.stopBtn.disabled = false;
    this.startBtn.disabled = true;

    window.cancelAnimationFrame(this.stepTimer);

    this.pointer = new PointerLine('pointer');

    this.step(this.startTime);

  }


  stop() {

    window.console.log('FC.game.stop()');

    window.clearTimeout(this.stepTimer);

    if (this.pointer) {

      this.pointer.elm.remove();
      this.pointer = undefined;

    }

    this.startBtn.disabled = false;
    this.stopBtn.disabled = true;

    this.state = 'Idle';

  }


}; // end: GameEngine class
