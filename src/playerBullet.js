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

    this.angle = 0;
    this.facing = '';
    this.hitScore = 100;
    this.healthDamage = 5;
    this.className = 'player-bullet';

    this.boundsRect = {
      x      : 0,
      y      : 0, 
      width  : FC.view.getWidth()  - this.width,
      height : FC.view.getHeight() - this.height
    };

    FC.lib.extend(this, props);

    let angleRad = (this.angle / 180) * Math.PI;

    this.kx = Math.cos(angleRad);
    this.ky = -Math.sin(angleRad); // ky: Negate "dy" because the y-axis is flipped on screens!

    //console.log('PlayerBullet.instance =', this);

  }


  detectCollision(enemy) {

    return FC.lib.intersectRect(this, enemy);

  }


  update(now, dt) {

    if (dt > 14) {

      let dts = dt / 100;  // Divide by 100 for seconds

      this.x += this.kx * this.speed * dts; // x + dx, kx -> See constructor
      this.y += this.ky * this.speed * dts; // y - dy

      if (FC.lib.outOfBounds(this.boundsRect, this)) { this.state = 'Used'; }

    }

    super.update(now); // Update Animator + Detect Style Changes

  }


} // end: PlayerBullet class
