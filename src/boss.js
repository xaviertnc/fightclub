/**
 *
 * FIGHT CLUB - BOSS
 *
 * @author: C. Moller
 * @date: 20 December 2017
 *
 * @updated: 05 Feb 2020 (C. Moller)
 *   - Add game + type to constructor params
 *   - Add init(), build(), mount() + Refactor
 *   - Put Heatlh Bar inside Boss element
 */

class Boss extends Npc {


  constructor(id, game, type) {

    super(id, game, type);

    this.health = 100;
    this.className = 'boss1';

    // Sprite::render() uses the animator if available
    this.animator = new Animator(this);

    this.healthBar = new HealthBar(this.id + '-health-bar', this.game);    

  }


  init(props) {

    super.init(props);

    this.animator.init({
      startFacing: this.startFacing,
      initialState: this.initialState
    });

    this.healthBar.init({ y: -15, width: this.width, height: 10 });

    return this;

  }


  build(elm) {

    super.build(elm);
    this.healthBar.build();
    this.game.log('Boss.build(),', this.id, '- Done');
    return this;

  }


  mount(parentElm) {

    super.mount(parentElm);
    this.healthBar.mount(this.elm);
    return this.elm;

  }


  takeHit(objOther) {

    this.health = this.game.lib.approach(this.health, 0, objOther.healthDamage || 1);
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