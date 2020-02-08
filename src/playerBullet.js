/**
 *
 * FIGHT CLUB - PLAYER BULLET
 *
 * @author: C. Moller
 * @date: 20 December 2017
 *
 * @update: C. Moller - 05 Feb 2020
 *   - Add game + type to constructor params
 *   - Add shortcuts: outOfBounds, intersectRect
 *   - Add init() + Refactor
 *
 * @update: C. Moller - 08 Feb 2020
 *   - New constructor structure
 *
 */

class PlayerBullet extends Sprite {


  constructor(id, parent, props) {

    super(id, parent);

    this.kx = 0;
    this.ky = 0;
    this.angle = 0;
    this.facing = '';
    this.hitScore = 100;
    this.healthDamage = 5;
    this.className = 'player-bullet';

    if (props) { this.init(props); }

    this.outOfBounds = this.engine.lib.outOfBounds;
    this.intersectRect = this.engine.lib.intersectRect;

    let angleRad = (this.angle / 180) * Math.PI;

    this.kx = Math.cos(angleRad);
    this.ky = -Math.sin(angleRad); // ky: Negate "dy" because the y-axis is flipped on screens!

    let vw = this.engine.view.getWidth();
    let vh = this.engine.view.getHeight();

    this.boundsRect = {
      x      : 0,
      y      : 0,
      width  : vw - this.width,
      height : vh - this.height
    };

  }


  detectCollision(enemy) {

    return this.intersectRect(this, enemy);

  }


  update(now, dt) {

    if (dt > 14) {

      let dts = dt / 100;  // Divide by 100 for seconds

      this.x += this.kx * this.speed * dts; // x + dx, kx -> See constructor
      this.y += this.ky * this.speed * dts; // y - dy

      if (this.outOfBounds(this.boundsRect, this)) { this.state = 'Used'; }

    }

    super.update(now); // Update Animator + Detect Style Changes

  }


} // End: PlayerBullet Class
