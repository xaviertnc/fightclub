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
    this.maxFireRate = 100; // ms per shot
    this.className = 'wizzard';

    this.facingAngle = 0;

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


  _fireBullet(now, dt, bulletAngle) {

      // Rate and quantity limit attacks...
      if (this.bullets.length < 10 && (now - this.lastAttack) > this.maxFireRate) {

        this.lastAttack = now;

        let bulletX, bulletY;
        let bulletW = 16, bulletH = 16;
        let bulletHW = bulletW/2;

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
            bulletY = this.y + 4;
            break;
          case 'DownLeft':
            bulletX = this.x;
            bulletY = this.y + 16;
            break;
          case 'DownRight':
            bulletX = this.x;
            bulletY = this.y + 8;
            break;
        }

        let bullet = new PlayerBullet('pb'+(FC.nextId++), {
            state: 'Live',
            x: bulletX,
            y: bulletY,
            width:16,
            height:16,
            speed:56,
            facing: bulletFacing,
            angle: bulletAngle
        });

        this.bullets.push(bullet);

      }

  }


  _updateBullets(now, dt) {

    let game = FC.game;

    // Update LIVE bullets
    this.bullets.forEach(function(bullet) {

      bullet.update(now, dt); // Update mainly position x,y

      if (bullet.state === 'Live' && bullet.detectCollision(game.enemy)) {

        game.score.value += bullet.hitScore;
        game.enemy.takeHit(bullet);
        bullet.state = 'Impacting';
        bullet.speed = 0;

        window.setTimeout(function () { bullet.state = 'Used'; }, 300);

      }

    });

  }


  _afterUpdateBullets(now, dt) {

    // Remove USED bullets  - AND -
    // run "AfterUpdate" on remaining LIVE bullets
    this.bullets = this.bullets.filter(function(bullet) {
      if (bullet.state === 'Used') {

        // Remove bullet
        bullet.elm.remove();
        return 0;

      } 

      // Keep bullet
      bullet.afterUpdate(now, dt);
      return 1;

    });

  }


  _renderBullets() {

    this.bullets.forEach(function(bullet) { bullet.render(); });

  }


  update(now, dt) {

    if (dt > 14) { // Rate limit updates to 14ms per update or max. 71 fps 

      if (FC.input.directions.includes("Up"))    { this.y = FC.lib.approach(this.y, 0, this._dy(dt)); }
      if (FC.input.directions.includes("Down"))  { this.y = FC.lib.approach(this.y, FC.view.getHeight() - this.height, this._dy(dt)); }
      if (FC.input.directions.includes("Left"))  { this.x = FC.lib.approach(this.x, 0, this._dx(dt)); }
      if (FC.input.directions.includes("Right")) { this.x = FC.lib.approach(this.x, FC.view.getWidth() - this.width, this._dx(dt)); }


      let mouseAngle = undefined;

      if (FC.input.mode === 'mouse' || (FC.input.mouseMoved && !FC.input.directions.length)) {

        mouseAngle = FC.lib.getAngle(
          this.x + this.hw,
          this.y + this.hh, 
          FC.input.mouseX - FC.view.getX(),
          FC.input.mouseY - FC.view.getY()
        );

        if (FC.input.mouseMoved) {

          FC.input.mode = 'mouse';

          //console.log('Mouse Moved: mouseAngle =', mouseAngle);

          if (mouseAngle >  345 || mouseAngle < 15  ) { FC.input.direction = 'Right';     } else
          if (mouseAngle >= 15  && mouseAngle <= 75 ) { FC.input.direction = 'UpRight';   } else
          if (mouseAngle >  75  && mouseAngle <  105) { FC.input.direction = 'Up';        } else
          if (mouseAngle >= 105 && mouseAngle <= 165) { FC.input.direction = 'UpLeft';    } else
          if (mouseAngle >  165 && mouseAngle <  195) { FC.input.direction = 'Left';      } else
          if (mouseAngle >= 195 && mouseAngle <= 255) { FC.input.direction = 'DownLeft';  } else
          if (mouseAngle >  255 && mouseAngle <  285) { FC.input.direction = 'Down';      } else
          if (mouseAngle => 285 && mouseAngle <= 345) { FC.input.direction = 'DownRight'; }

          if (FC.input.direction !== FC.input.lastDirection) { FC.input.directionChanged = true; }

        }

      }

      if (this.animator && (FC.input.directionChanged || this.stateChanged)) {

        this.animator.currentAnimation = this.animator.getAnimationFacing(FC.input.direction, this.state);
        this.facingAngle = this.animator.currentAnimation.dir;

      }

      if (FC.input.directionChanged || FC.input.mouseMoved) {

        FC.input.keyDirectionView.innerText = 'Facing: ' + FC.input.direction + 
          ', ' + this.facingAngle + ', ' + (mouseAngle|0);

      }

      let action = FC.input.action;

      if (action === 'Attack') {

        let player = this;
        player.state = 'Attack';
        setTimeout(function() { player.state = 'Normal'; }, 150);
        this._fireBullet(now, dt, mouseAngle ? mouseAngle : this.facingAngle);

      }

      this._updateBullets(now, dt);

    }

    super.update(now); // Render Class + Style

  } // end: player.update


  afterUpdate(now, dt) {

    this._afterUpdateBullets(now, dt);
    super.afterUpdate(now, dt);

  }


  render() {

    super.render();
    this._renderBullets();

  } // end: player.render


} // end: Player class
