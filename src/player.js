/**
 *
 * FIGHT CLUB - PLAYER
 *
 * @author: C. Moller
 * @date: 20 December 2017
 *
 */

class Player extends Sprite {

  constructor(id, props) {

    super(id);

    this.bullets = [];
    this.lastAttack = 0;
    this.className = 'wizzard';

    FC.lib.extend(this, props);

    // Sprite::render() uses the animator if available
    this.animator = new Animator(this);

    console.log('Player.instance =', this);

  }


  _dx(dt) {

    return ((this.horzSpeed * dt) / 100)|0;

  }


  _dy(dt) {

    return ((this.vertSpeed * dt) / 100)|0;

  }


  _fireBullet(now) {

      // Rate and quantity limit attacks...
      if (this.bullets.length < 10 && (now - this.lastAttack > 100)) {

        this.lastAttack = now;

        let bullet = new PlayerBullet('pb'+(FC.nextId++), {
            state: 'Live',
            x: this.x + this.width,
            y: this.y + ((this.height / 2)|0) - 16,
            width:16,
            height:16,
            vertSpeed:0,
            horzSpeed:56
        });

        this.bullets.push(bullet);

      }

  }


  _updateBullets(now) {

    let game = FC.game;

    // Update LIVE bullets
    this.bullets.forEach(function(bullet) {

      bullet.startUpdate(now);

      bullet.update(now); // Update mainly position x,y

      bullet.endUpdate(now);

      if (bullet.state === 'Live' && bullet.detectCollision(game.enemy)) {

        game.score.value += bullet.hitScore;
        game.enemy.takeHit(bullet);
        bullet.state = 'Impacting';
        bullet.horzSpeed = 0;

        window.setTimeout(function () { bullet.state = 'Used'; }, 300);

      }

    });

    // Remove USED bullets;
    this.bullets = this.bullets.filter(function(bullet) {
      if (bullet.state === 'Used') {

        // Remove bullet
        bullet.elm.remove();
        return 0;

      }

      // Keep bullet
      return 1;

    });

  }


  _renderBullets() {

    this.bullets.forEach(function(bullet) { bullet.render(); });

  }


  update(now) {

    if ( ! this.lastUpdateTime) { this.lastUpdateTime = now; }
    let dt = now - this.lastUpdateTime; // milliseconds
    this.lastUpdateTime = now;

    if (dt >= 14) { // Rate limit updates to 14ms per update or max. 71 fps

      if (FC.input.directionChanged) {

        this.animator.currentAnimation = this.animator.getAnimationFacing(FC.input.direction);

      }

      if (FC.input.directions.includes("Up"))    { this.y = FC.lib.approach(this.y, 0, this._dy(dt)); }
      if (FC.input.directions.includes("Down"))  { this.y = FC.lib.approach(this.y, FC.view.height - this.height, this._dy(dt)); }
      if (FC.input.directions.includes("Left"))  { this.x = FC.lib.approach(this.x, 0, this._dx(dt)); }
      if (FC.input.directions.includes("Right")) { this.x = FC.lib.approach(this.x, FC.view.width - this.width, this._dy(dt)); }

      let action = FC.input.action;

      if (action === "Attack") {

        this._fireBullet(now);

      }

      this._updateBullets(now);

    }

    super.update(now); // Render Class + Style

  } // end: player.update


  render() {

    super.render();
    this._renderBullets();

  } // end: player.render


} // end: Player class
