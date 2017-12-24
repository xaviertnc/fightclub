/**
 *
 * FIGHT CLUB - PLAYER BULLET
 *
 * @author: C. Moller
 * @date: 20 December 2017
 *
 */


FC.PlayerBullet = function (id, props)
{
  console.log('PlayerBullet.props =', props);

  FC.lib.extend(this, new FC.Npc(id));

  //console.log('PlayerBullet.this.inherit =', this);

  this.hitScore = 100;
  this.healthDamage = 5;
  this.classStr = 'player-bullet';

  //console.log('PlayerBullet.this.default =', this);

  FC.lib.extend(this, props);

  console.log('PlayerBullet.this.instance =', this);

};


FC.PlayerBullet.prototype.detectCollision = function (enemy) {

  return FC.lib.intersectRect(this, enemy);

};


FC.PlayerBullet.prototype.update = function (time, dStartTime, ticks) {

  var dt, dx;

  console.log('FC.PlayerBullet.update(), this.classStr =', this.classStr);

  FC.Sprite.prototype.update.call(this, time, dStartTime, ticks); // Get Class + Style

  if ( ! this.lastUpdateTime) { this.lastUpdateTime = time; }

  dt = time - this.lastUpdateTime; // milliseconds

  this.lastUpdateTime = time;

  if (dt > 0) {

    this.lastMoveTime = time;

    dx = (this.horzSpeed * dt) / 100;

    if ((this.x + dx) <= (FC.game.view.width - this.width)) {

      this.x += dx;

    }
    else {

      this.state = 'destroy';

    }

  }

};
