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
    this.stepTimer = null;
    this.state = null;

    this.score = new Score('score', { x: 10,  y: 10,  height: 30, width: 270 });
    this.enemy = new Boss('boss1', { x: 575, y: 250, height: 64, width: 64, vertSpeed: 30, horzSpeed: 30 });
    this.player = new Player('player', { x: 150, y: 250, vertSpeed: 30, horzSpeed: 30, animation: FC.config.player.animation });

    this.startBtn = document.getElementById('start');
    this.stopBtn = document.getElementById('stop');

    this.pointer = null;

  }


  beforeUpdate(now) {

    this.score.beforeUpdate(now);
    this.player.beforeUpdate(now);
    this.enemy.beforeUpdate(now);


  }


  update(now) {

    FC.input.update();

    this.score.update(now);
    this.player.update(now);
    this.enemy.update(now);

    if (this.pointer) {

      this.pointer.update(now, this.player.elm, FC.input.mouseX, FC.input.mouseY);

    }

  }


  afterUpdate(now) {

    this.score.afterUpdate(now);
    this.player.afterUpdate(now);
    this.enemy.afterUpdate(now);

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

    let now = FC.lib.getTime();

    if ( ! this.startTime) {

      this.startTime = now;

    }

    this.beforeUpdate(now);

    this.update(now);

    this.afterUpdate(now);

    this.render();

    this.ticks++;

    if (this.state === 'Running') {

      this.stepTimer = window.setTimeout(this.step.bind(this), (1000 / this.fps));

    }

  }


  start() {

    window.console.log('FC.game.start()');

    this.state = 'Running';

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
