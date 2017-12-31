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

    this.dir = 0;
    this.facing = '';
    this.hitScore = 100;
    this.healthDamage = 5;
    this.className = 'player-bullet';

    FC.lib.extend(this, props);


    //console.log('PlayerBullet.instance =', this);

  }


  detectCollision(enemy) {

    return FC.lib.intersectRect(this, enemy);

  }


  update(now) {

    if ( ! this.lastUpdateTime) { this.lastUpdateTime = now; }

    let dts = (now - this.lastUpdateTime) / 100;  // Divide by 100 for seconds

    this.lastUpdateTime = now;

    if (dts > 0.14) {

      this.lastMoveTime = now;

      let radAngle = (this.dir / 180) * Math.PI; // Convert degrees to radians

      let dx = Math.round(Math.cos(radAngle) * this.speed * dts);
      let dy = -Math.round(Math.sin(radAngle) * this.speed * dts); // Negate dy because the y-axis is flipped on screens!

      let viewRect = {
        x      : 0,
        y      : 0, 
        width  : FC.view.getWidth()  - this.width,
        height : FC.view.getHeight() - this.height
      };

      let bulletRect = {
        x: this.x + dx,
        y: this.y + dy,
        width: this.width,
        height: this.height
      };

      if ( ! FC.lib.outOfBounds(viewRect, bulletRect)) {

        this.x = bulletRect.x;
        this.y = bulletRect.y;

      } else {

        this.state = 'Used';

      }

    }

    super.update(now); // Update Animator + Detect Style Changes

  }


} // end: PlayerBullet class
