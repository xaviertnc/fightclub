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

    console.log('Boss.props =', props);

    this.health = 100;
    this.classStr = 'boss1';
    
    this.healthBar = new HealthBar(id + '-health-bar',
    {
      x      : props.x,
      y      : props.y - 15,
      width  : props.width,
      height : 10
    });

    FC.lib.extend(this, props);

    console.log('Boss.this.instance =', this);

  }


  takeHit(objOther) {

    this.healthBar.value -= objOther.healthDamage || 1;
    if (this.healthBar.value < 0) { this.healthBar.value = 0; }

  }


  update(time, dStartTime, ticks) {

    // Get Class + Style
    super.update(time, dStartTime, ticks);
    this.healthBar.update();

  }


} // end: Boss class
