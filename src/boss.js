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

    // Sprite::render() uses the animator if available
    this.animator = new Animator(this);

    this.animator.currentAnimation = this.animator.getAnimationFacing('Left', 'Normal');

    console.log('Boss.instance =', this);

  }


  takeHit(objOther) {

    this.health = FC.lib.approach(this.health, 0, objOther.healthDamage || 1);
    this.healthBar.state = this.health;

  }


  beforeUpdate(now) {

    super.beforeUpdate(now);
    this.healthBar.beforeUpdate(now);

  }


  update(now) {

    super.update(now); // Render Class + Style
    this.healthBar.update(now);

  }


  afterUpdate(now) {

    super.afterUpdate(now);
    this.healthBar.afterUpdate(now);

  }


  render() {

    super.render();
    this.healthBar.render();

  }


} // end: Boss class
