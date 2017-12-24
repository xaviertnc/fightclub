/**
 *
 * FIGHT CLUB - PLAYER BULLET
 *
 * @author: C. Moller
 * @date: 20 December 2017
 *
 */


class PlayerBullet extends Sprite {

  constructor(id, props) {

    super(id);

    this.hitScore = 100;
    this.healthDamage = 5;
    this.classStr = 'player-bullet';

    FC.lib.extend(this, props);

    console.log('PlayerBullet.instance =', this);

  }


  detectCollision(enemy) {

    return FC.lib.intersectRect(this, enemy);

  }


  update(time, dStartTime, ticks) {

    var dt, dx;

    // Get Class + Style
    super.update(time, dStartTime, ticks);

    if ( ! this.lastUpdateTime) { this.lastUpdateTime = time; }

    dt = time - this.lastUpdateTime; // milliseconds

    this.lastUpdateTime = time;

    if (dt > 0) {

      this.lastMoveTime = time;

      dx = (this.horzSpeed * dt) / 100;

      if ((this.x + dx) <= (FC.game.view.width - this.width)) {

        this.x += dx;

      } else {

        this.state = 'destroy';

      }

    }

  } // end: playerBullet.update


} // end: PlayerBullet class
