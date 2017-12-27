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
    this.className = 'player-bullet';

    FC.lib.extend(this, props);

    console.log('PlayerBullet.instance =', this);

  }


  detectCollision(enemy) {

    return FC.lib.intersectRect(this, enemy);

  }


  update(now) {

    var dt, dx;

    if ( ! this.lastUpdateTime) { this.lastUpdateTime = now; }

    dt = now - this.lastUpdateTime; // milliseconds

    this.lastUpdateTime = now;

    if (dt > 14) {

      this.lastMoveTime = now;

      dx = ((this.horzSpeed * dt) / 100)|0;

      if ((this.x + dx) <= (FC.view.width - this.width)) {

        this.x = this.x + dx;

      } else {

        this.state = 'Used';

      }

    }

    super.update(now); // Render Class + Style

  }


} // end: PlayerBullet class
