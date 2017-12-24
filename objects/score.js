/**
 *
 * FIGHT CLUB - SCORE
 *
 * @author: C. Moller
 * @date: 20 December 2017
 *
 */

FC.Score = function (id, props) {

  console.log('Score.props =', props);

  FC.lib.extend(this, new FC.Sprite(id));

  //console.log('Score.this.inherit =', this);

  this.value = 0;
  this.classStr = 'score';

  //console.log('Score.this.default =', this);

  FC.lib.extend(this, props);

  console.log('Score.this.instance =', this);

  this.render = function (time, dStartTime, ticks) {
      FC.Sprite.prototype.render.call(this, time, dStartTime, ticks);
      this.elm.innerHTML = 'Score: ' + this.value;
  };

  this.update = function (time, dStartTime, ticks) {
      FC.Sprite.prototype.update.call(this, time, dStartTime, ticks); // Get Class + Style
  };

};
