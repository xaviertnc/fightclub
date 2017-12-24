/**
 *
 * FIGHT CLUB - GAME ENGINE
 *
 * @author: C. Moller
 * @date: 20 December 2017
 *
 */

FC.game = {

  fps         : 60,
  timer       : null,
  state       : null,
  score       : null,
  enemy       : null,
  player      : null,
  view        : null,
  keysDown    : {},
  keysPressed : {},
  startTime   : 0,
  ticks       : 0,


  createSpriteElement: function (id) {

    var elm;

    elm = document.createElement('div');

    elm.id = id;

    return elm;

  },


  addSprite: function (elm) {

    this.view.elm.appendChild(elm);

  },


  keydown: function(event) {

    //console.log('FC.game.keydown()');
    var keycode = (event.keyCode ? event.keyCode : event.which);

    // Clear state when we release the key.
    this.keysDown[keycode] = true;

    // Only clear state once we get time to check on its state.
    this.keysPressed[keycode] = true;

    event.preventDefault();

  },


  keyup: function(event) {

    //console.log('FC.game.keyup()');
    var keycode = (event.keyCode ? event.keyCode : event.which);

    delete this.keysDown[keycode];

    event.preventDefault();

  },


  start: function () {

    window.console.log('FC.game.start()');

    let startBtn = document.getElementById('start');
    let stopBtn  = document.getElementById('stop');

    startBtn.disabled = true;
    stopBtn.disabled = false;

    this.state = 'running';

    window.clearTimeout(this.timer);

    this.timer = window.setTimeout(this.animate.bind(this), (1000 / this.fps));

  },


  update: function (time, dStartTime) {

    this.player.update(time, dStartTime, this.ticks);
    this.enemy.update(time, dStartTime, this.ticks);
    this.score.update(time, dStartTime, this.ticks);

    this.keysPressed = {};

  },


  animate: function() {

    this.ticks++;

    var time, dStartTime;

    time = FC.lib.getTime();

    if( ! this.startTime) { this.startTime = time; }

    dStartTime = time - this.startTime;

    //console.log('FC.game.animate(), this =', this);

    this.update(time, dStartTime);

    if (this.state === 'running') {

      this.timer = window.setTimeout(this.animate.bind(this), (1000 / this.fps));

    }

  },


  stop: function () {

    window.clearTimeout(FC.game.timer);

    let startBtn = document.getElementById('start');
    let stopBtn  = document.getElementById('stop');

    startBtn.disabled = false;
    stopBtn.disabled = true;

    this.state = 'idle';

  }


}; // end: FC.game
