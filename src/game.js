/**
 *
 * FIGHT CLUB - GAME ENGINE
 *
 * @author: C. Moller
 * @date: 20 December 2017
 *
 */

FC.game = {

  fps         : 62,
  view        : null,
  state       : null,
  input       : null,
  score       : null,
  enemy       : null,
  player      : null,
  stepTimer   : null,
  startTime   : 0,
  ticks       : 0,


  createSpriteElement: function (id) {

    var elm;

    elm = document.createElement('div');

    elm.id = id;

    return elm;

  },


  addSprite: function (elm) {

    FC.view.elm.appendChild(elm);

  },


  start: function () {

    window.console.log('FC.game.start()');

    let startBtn = document.getElementById('start');
    let stopBtn  = document.getElementById('stop');

    startBtn.disabled = true;
    stopBtn.disabled = false;

    this.state = 'Running';

    window.clearTimeout(this.stepTimer);

    this.stepTimer = window.setTimeout(this.step.bind(this), (1000 / this.fps));

  },


  startUpdate: function(now) {

    this.score.startUpdate(now);
    this.player.startUpdate(now);
    this.enemy.startUpdate(now);

  },


  update: function (now) {

    FC.input.update();

    this.score.update(now);
    this.player.update(now);
    this.enemy.update(now);

  },


  endUpdate: function(now) {

    this.score.endUpdate(now);
    this.player.endUpdate(now);
    this.enemy.endUpdate(now);

  },


  render: function() {

    this.score.render();
    this.player.render();
    this.enemy.render();

  },


  step: function() {

    let now = FC.lib.getTime();

    if ( ! this.startTime) {

      this.startTime = now;

    }

    this.startUpdate(now);

    this.update(now);

    this.endUpdate(now);

    this.render();

    this.ticks++;

    if (this.state === 'Running') {

      this.stepTimer = window.setTimeout(this.step.bind(this), (1000 / this.fps));

    }

  },


  stop: function () {

    window.clearTimeout(this.stepTimer);

    let startBtn = document.getElementById('start');
    let stopBtn  = document.getElementById('stop');

    startBtn.disabled = false;
    stopBtn.disabled = true;

    this.state = 'Idle';

  }


}; // end: FC.game
