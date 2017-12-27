/**
 *
 * FIGHT CLUB - BOSS
 *
 * @author: C. Moller
 * @date: 20 December 2017
 *
 */

class Boss extends Npc {

  constructor(id, props) {

    super(id);

    this.health = 100;
    this.className = 'boss1';

    FC.lib.extend(this, props);

    this.healthBar = new HealthBar(id + '-health-bar',
    {
      x      : props.x,
      y      : props.y - 15,
      width  : props.width,
      height : 10
    });

    console.log('Boss.instance =', this);

  }


  takeHit(objOther) {

    this.healthBar.value -= objOther.healthDamage || 1;
    if (this.healthBar.value < 0) { this.healthBar.value = 0; }

  }


  update(now) {

    super.update(now); // Render Class + Style
    this.healthBar.update(now);

  }


  render() {

    super.render();
    this.healthBar.render();

  }


} // end: Boss class
