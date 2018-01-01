/**
 *
 * FIGHT CLUB - GAME ENGINE
 *
 * @author: C. Moller
 * @date: 20 December 2017
 *
 */

class GameEngine {

  constructor() {

    this.debug = true;

    this.fps = 62;
    this.ticks = 0;
    this.startTime = 0;
    this.lastTime = 0;
    this.stepTimer = null;
    this.state = null;

    this.score = new Score('score', { x: 10,  y: 10,  height: 30, width: 270 });
    this.enemy = new Boss('boss1', { x: 575, y: 250, height: 64, width: 64, vertSpeed: 30, horzSpeed: 30 });
    this.player = new Player('player', { x: 150, y: 250, vertSpeed: 30, horzSpeed: 30, animation: FC.config.player.animation });

    this.startBtn = document.getElementById('start');
    this.stopBtn = document.getElementById('stop');

    this.pointer = null;

  }


  getTime() {

    return FC.lib.getTime();

  }


  beforeUpdate(now, dt) {

    this.score.beforeUpdate(now, dt);
    this.player.beforeUpdate(now, dt);
    this.enemy.beforeUpdate(now, dt);

  }


  update(now, dt) {

    FC.input.update(now, dt);

    this.score.update(now, dt);
    this.player.update(now, dt);
    this.enemy.update(now, dt);

    if (this.pointer) {

      this.pointer.update(now, this.player.elm, FC.input.mouseX, FC.input.mouseY);

    }

  }


  afterUpdate(now, dt) {

    this.score.afterUpdate(now, dt);
    this.player.afterUpdate(now, dt);
    this.enemy.afterUpdate(now, dt);

    FC.input.afterUpdate(now, dt);

  }


  render() {

    this.score.render();
    this.player.render();
    this.enemy.render();

    if (this.pointer) {

      this.pointer.render();

    }

  }


  step() {

    let now = this.getTime();
    
    let dt = now - this.lastTime;

    this.beforeUpdate(now, dt);

    this.update(now, dt);

    this.afterUpdate(now, dt);

    this.render();

    this.ticks++;

    this.lastTime = now;

    if (this.state === 'Running') {

      this.stepTimer = window.setTimeout(this.step.bind(this), (1000 / this.fps));

    }

  }


  start() {

    window.console.log('FC.game.start()');

    this.state = 'Running';

    this.startTime = this.getTime();

    this.stopBtn.disabled = false;
    this.startBtn.disabled = true;

    window.clearTimeout(this.stepTimer);

    this.pointer = new PointerLine('pointer');

    this.step();

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
