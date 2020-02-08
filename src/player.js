/**
 *
 * FIGHT CLUB - PLAYER
 *
 * @author: C. Moller
 * @date: 20 December 2017
 *
 * @update: C. Moller - 05 Feb 2020
 *   - Add game + type to constructor params
 *   - Add init() + Refactor
 *   - Refactor bullet init code.
 *   - Use updateDebugView()
 *
 * @update: C. Moller - 08 Feb 2020
 *   - New constructor structure
 *   - Add mount()
 *   - Revert using updateDebugView()
 *
 */

class Player extends Sprite {


  constructor(id, parent, props) {

    super(id, parent);

    this.hw = 0;
    this.hh = 0;
    this.lastAttack = 0;
    this.facingAngle = 0;
    this.maxFireRate = 100; // ms per shot
    this.className = 'wizzard';
    this.bullets = [];

    if (props) { this.init(props); }

  }


  init(props) {

    super.init(props);

    this.hw = (this.width / 2)|0;
    this.hh = (this.height / 2)|0;

    // Used in Sprite::render() if available
    this.animator = new Animator(this, {
      initialDirection: this.facing,
      initialState: this.state
    });

    // debug
    this.elDispFacingAngle = null;

    return this;

  }


  mount(parentElm, props) {

    super.mount(parentElm, props);

    this.elDispFacingAngle = this.engine.debugView.mountChild('facing_angle');

    return this;

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

        let bullet = new PlayerBullet('pb'+(this.engine.nextId++), this, {
            state: 'Live',
            x: bulletX,
            y: bulletY,
            width:16,
            height:16,
            speed:56,
            facing: bulletFacing,
            angle: bulletAngle
        });

        bullet.mount(this.engine.view.elm);

        this.bullets.push(bullet);

      }

  }


  _updateBullets(now, dt) {

    let game = this.engine;

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
        bullet.dismount();
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

    let lib = this.engine.lib;
    let view = this.engine.view;
    let input = this.engine.input;

    if (dt > 14) { // Rate limit updates to 14ms per update or max. 71 fps

      if (input.directions.includes("Up"))    { this.y = lib.approach(this.y, 0, this._dy(dt)); }
      if (input.directions.includes("Down"))  { this.y = lib.approach(this.y, view.getHeight() - this.height, this._dy(dt)); }
      if (input.directions.includes("Left"))  { this.x = lib.approach(this.x, 0, this._dx(dt)); }
      if (input.directions.includes("Right")) { this.x = lib.approach(this.x, view.getWidth() - this.width, this._dx(dt)); }


      let mouseAngle = undefined;

      if (input.mode === 'mouse' || (input.mouseMoved && !input.directions.length)) {

        mouseAngle = lib.getAngle(
          this.x + this.hw,
          this.y + this.hh,
          input.mouseX - view.getX(),
          input.mouseY - view.getY()
        );

        if (input.mouseMoved) {

          input.mode = 'mouse';

          //this.log('Mouse Moved: mouseAngle =', mouseAngle);

          if (mouseAngle >  345 || mouseAngle < 15  ) { input.direction = 'Right';     } else
          if (mouseAngle >= 15  && mouseAngle <= 75 ) { input.direction = 'UpRight';   } else
          if (mouseAngle >  75  && mouseAngle <  105) { input.direction = 'Up';        } else
          if (mouseAngle >= 105 && mouseAngle <= 165) { input.direction = 'UpLeft';    } else
          if (mouseAngle >  165 && mouseAngle <  195) { input.direction = 'Left';      } else
          if (mouseAngle >= 195 && mouseAngle <= 255) { input.direction = 'DownLeft';  } else
          if (mouseAngle >  255 && mouseAngle <  285) { input.direction = 'Down';      } else
          if (mouseAngle => 285 && mouseAngle <= 345) { input.direction = 'DownRight'; }

          if (input.direction !== input.lastDirection) { input.directionChanged = true; }

        }

      }

      if (this.animator && (input.directionChanged || this.stateChanged)) {

        this.animator.currentAnimation = this.animator.getAnimationFacing(input.direction, this.state);
        this.facingAngle = this.animator.currentAnimation.dir;

      }

      if (input.directionChanged || input.mouseMoved) {

        this.elDispFacingAngle.innerText = 'Facing: ' + input.direction +
          ', ' + this.facingAngle + ', ' + (mouseAngle|0);

      }

      let action = input.action;

      if (action === 'Attack') {

        let player = this;
        player.state = 'Attack';
        setTimeout(function() { player.state = 'Normal'; }, 150);
        this._fireBullet(now, dt, mouseAngle ? mouseAngle : this.facingAngle);

      }

      this._updateBullets(now, dt);

    }

    super.update(now); // Render Class + Style

  } // End: Player.update()


  afterUpdate(now, dt) {

    this._afterUpdateBullets(now, dt);
    super.afterUpdate(now, dt);

  } // End: player.afterUpdate()


  render() {

    super.render();
    this._renderBullets();

  } // End: player.render()


} // End: Player Class
