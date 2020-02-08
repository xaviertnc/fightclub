/**
 *
 * FIGHT CLUB - BOSS
 *
 * @author: C. Moller
 * @date: 20 December 2017
 *
 * @update: C. Moller - 05 Feb 2020
 *   - Add game + type to constructor params
 *   - Add init(), build(), mount() + Refactor
 *   - Put Heatlh Bar inside Boss element
 *
 * @update: C. Moller - 08 Feb 2020
 *   - Refactor constructor(), init(), build() and mount()
 *   - Add approach() shortcut
 *
 */

class Boss extends Npc {


  constructor(id, parent, props) {

    super(id, parent);

    this.health = 100;
    this.className = 'boss1';
    this.healthBar = null;

    if (props) { this.init(props); }

    this.approach = this.engine.lib.approach;

  }


  init(props) {

    super.init(props);

    // Used in Sprite::render() if available
    this.animator = new Animator(this, {
      initialDirection: this.facing,
      initialState: this.state
    });

    const hbId = this.id + '-health-bar';

    this.healthBar = new HealthBar(hbId, this, {
      y: -15,
      width: this.width,
      height: 10
    });

    return this;

  }


  build() {

    super.build();
    this.healthBar.build().mount(this.elm);

    return this;

  }


  takeHit(objOther) {

    this.health = this.approach(this.health, 0, objOther.healthDamage || 1);
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


} // End: Boss Class
