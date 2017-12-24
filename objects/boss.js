/**
 *
 * FIGHT CLUB - BOSS
 *
 * @author: C. Moller
 * @date: 20 December 2017
 *
 */

FC.Boss = function (id, props) {

  console.log('Boss.props =', props);

  FC.lib.extend(this, new FC.Npc(id));

  //console.log('Boss.this.inherit =', this);

  this.health = 100;
  this.classStr = 'boss1';
  this.healthBar = new FC.HealthBar(id + '-health-bar', { x:props.x, y:(props.y-15), width:props.width, height:10 });

  //console.log('Boss.this.default =', this);

  FC.lib.extend(this, props);

  console.log('Boss.this.instance =', this);

  this.takeHit = function (objOther) {
    this.healthBar.value -= objOther.healthDamage || 1;
    if (this.healthBar.value < 0) {
        this.healthBar.value = 0;
    }
  };

  this.update = function (time, dStartTime, ticks) {
    FC.Sprite.prototype.update.call(this, time, dStartTime, ticks); // Get Class + Style
    this.healthBar.update();
  };

};
