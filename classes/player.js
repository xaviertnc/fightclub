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

    super(id, props);

    console.log('Player.props =', props);

    this.bullets = [];
    this.lastAttack = 0;
    this.classStr = 'player';

    FC.lib.extend(this, props);

    console.log('Player.this.instance =', this);

  }


  render(time, dStartTime, ticks) {
    super.render(time, dStartTime, ticks);
    //this.elm.innerHTML = ticks.toString();
  }


  update(time, dStartTime, ticks) {

    var dt, dx, dy;

    // Get Class + Style
    super.update(time, dStartTime, ticks);

    if ( ! this.lastUpdateTime) { this.lastUpdateTime = time; }

    dt = time - this.lastUpdateTime; // milliseconds

    this.lastUpdateTime = time;

    if (dt > 0) {

      this.lastMoveTime = time;

      // GO UP: Up Arrow
      if (38 in FC.game.keysDown) {

        dy = (this.vertSpeed * dt) / 100;

        if ((this.y - dy) > 0) {
          this.y -= dy;
        }

      }

      // GO DOWN: Down Arrow
      if (40 in FC.game.keysDown) {
        // dy = pixels to move based on the time span from
        // previous move and given this.hs in "pixels/sec"
        dy = (this.vertSpeed * dt) / 100;
        if ((this.y + dy) <= (FC.game.view.height - this.height)) {
          this.y += dy;
        }
      }

      // GO RIGHT: Right Arrow
      if (39 in FC.game.keysDown) {

        dx = (this.horzSpeed * dt) / 100;

        if ((this.x + dx) <= (FC.game.view.width - this.width)) {
          this.x += dx;
        }

      }

      // GO LEFT: Left Arrow
      if (37 in FC.game.keysDown) {

        dx = (this.horzSpeed * dt) / 100;

        if ((this.x - dx) > 0) {
          this.x -= dx;
        }

      }

      // FIRE: Left-Ctrl
      if (17 in FC.game.keysDown) {

        if (this.bullets.length < 10 && (time - this.lastAttack > 100)) {

          this.lastAttack = time;

          let bullet = new PlayerBullet('pb'+(FC.nextId++), {
              state: 'active',
              x: this.x + this.width,
              y: this.y + (this.height / 2) - 16,
              width:16,
              height:16,
              vertSpeed:0,
              horzSpeed:30
          });

          this.bullets.push(bullet);

        }

      }

    }

    var index = null;

    // Update active bullets
    for (index in this.bullets) {

      let bullet = this.bullets[index];

      bullet.update(time, dStartTime, ticks);

      if (bullet.state === 'active' && bullet.detectCollision(FC.game.enemy)) {

        FC.game.score.value += bullet.hitScore;
        FC.game.enemy.takeHit(bullet);
        bullet.state = 'explode';
        bullet.horzSpeed = 0;

        window.setTimeout(function () { bullet.state = 'destroy'; }, 200);

      }
    }

    // Remove destoryed bullets;
    this.bullets = this.bullets.filter(function(bullet) {
        let destroy =  bullet.state === 'destroy';
        if (destroy) { bullet.elm.remove(); }
        return !destroy;
    });

  } // end: player.update
  

} // end: Player class
