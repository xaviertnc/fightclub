/**
 *
 * FIGHT CLUB - PLAYER BULLET
 *
 * @author: C. Moller
 * @date: 20 December 2017
 *
 * @updated: 05 Feb 2020 (C. Moller)
 *   - Add game + type to constructor params
 *   - Add shortcuts: outOfBounds, intersectRect
 *   - Add init() + Refactor
 */

class PlayerBullet extends Sprite {


  constructor(id, game, type) {

    super(id, game, type);

    this.kx = 0;
    this.ky = 0;
    this.angle = 0;
    this.facing = '';
    this.hitScore = 100;
    this.healthDamage = 5;
    this.className = 'player-bullet';
    this.boundsRect = {};

  }


  init(props) {

    super.init(props);

    let vw = this.game.view.getWidth();
    let vh = this.game.view.getHeight();

    this.boundsRect = {
      x      : 0,
      y      : 0,
      width  : vw - this.width,
      height : vh - this.height
    };

    let angleRad = (this.angle / 180) * Math.PI;

    this.kx = Math.cos(angleRad);
    this.ky = -Math.sin(angleRad); // ky: Negate "dy" because the y-axis is flipped on screens!

    this.outOfBounds = this.game.lib.outOfBounds;
    this.intersectRect = this.game.lib.intersectRect;

    return this;

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
