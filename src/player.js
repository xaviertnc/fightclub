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

    this.hw = (this.width / 2)|0;
    this.hh = (this.height / 2)|0;

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

        let bulletW = 16;
        let bulletH = 16;
        let bulletHW = bulletW/2;

        let bulletX, bulletY;

        let bulletDir = this.animator ? this.animator.currentAnimation.dir : 0;
        let bulletFacing = this.animator ? this.animator.currentAnimation.facing : 'Right';

        switch (bulletFacing)
        {
          case 'Up':
            bulletX = this.x + this.hw - bulletHW;
            bulletY = this.y - bulletH;
            break;
          case 'Down':
            bulletX = this.x + this.hw - bulletHW;
            bulletY = this.y + this.hh;
            break;
          case 'Left':
            bulletX = this.x - bulletW;
            bulletY = this.y + 16;
            break;
          case 'Right':
            bulletX = this.x + this.width;
            bulletY = this.y + 16;
            break;
          case 'UpLeft':
            bulletX = this.x - bulletW;
            bulletY = this.y - bulletH;
            break;
          case 'UpRight':
            bulletX = this.x + this.width;
            bulletY = this.y - bulletH;
            break;
          case 'DownLeft':
            bulletX = this.x;
            bulletY = this.y + 16;
            break;
          case 'DownRight':
            bulletX = this.x;
            bulletY = this.y + 16;
            break;
        }

        let bullet = new PlayerBullet('pb'+(FC.nextId++), {
            state: 'Live',
            x: bulletX,
            y: bulletY,
            width:16,
            height:16,
            speed:56,
            dir: bulletDir 
        });

        this.bullets.push(bullet);

      }

  }


  _updateBullets(now) {

    let game = FC.game;

    // Update LIVE bullets
    this.bullets.forEach(function(bullet) {

      bullet.update(now); // Update mainly position x,y

      bullet.afterUpdate(now);

      if (bullet.state === 'Live' && bullet.detectCollision(game.enemy)) {

        game.score.value += bullet.hitScore;
        game.enemy.takeHit(bullet);
        bullet.state = 'Impacting';
        bullet.speed = 0;

        window.setTimeout(function () { bullet.state = 'Used'; }, 300);

      }

    });

  }


  _afterUpdateBullets(now) {

    // Remove USED bullets  - AND -
    // run "AfterUpdate" on remaining LIVE bullets
    this.bullets = this.bullets.filter(function(bullet) {
      if (bullet.state === 'Used') {

        // Remove bullet
        bullet.elm.remove();
        return 0;

      } 

      // Keep bullet
      bullet.afterUpdate(now);
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
      if (FC.input.directions.includes("Down"))  { this.y = FC.lib.approach(this.y, FC.view.getHeight() - this.height, this._dy(dt)); }
      if (FC.input.directions.includes("Left"))  { this.x = FC.lib.approach(this.x, 0, this._dx(dt)); }
      if (FC.input.directions.includes("Right")) { this.x = FC.lib.approach(this.x, FC.view.getWidth() - this.width, this._dx(dt)); }


      let action = FC.input.action;


      if (action === "Attack") {

        this._fireBullet(now);

      }

      this._updateBullets(now);

    }

    super.update(now); // Render Class + Style

  } // end: player.update


  afterUpdate(now) {

    this._afterUpdateBullets(now);
    super.afterUpdate(now);

  }


  render() {

    super.render();
    this._renderBullets();

  } // end: player.render


} // end: Player class
