/**
 *
 * FIGHT CLUB - HEALTH BAR
 *
 * @author: C. Moller
 * @date: 20 December 2017
 *
 */

FC.HealthBar = function (id, props) {

  console.log('HBar.props =', props);

  FC.lib.extend(this, new FC.Sprite(id));

  //console.log('HBar.this.inherit =', this);

  this.value = 100;
  this.classStr = 'health-bar';

  //console.log('HBar.this.default =', this);

  FC.lib.extend(this, props);

  console.log('HBar.this.instance =', this);

};


FC.HealthBar.prototype.render = function (time, dStartTime, ticks) {

  FC.Sprite.prototype.render.call(this, time, dStartTime, ticks);

  this.elm.innerHTML = '<small class="health-bar-inner" style="width:' + this.value + '%">' + this.value + '</small>';

};


FC.HealthBar.prototype.update = function (time, dStartTime, ticks) {

  FC.Sprite.prototype.update.call(this, time, dStartTime, ticks); // Get Class + Style

}
