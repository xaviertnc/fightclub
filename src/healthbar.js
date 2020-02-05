/**
 *
 * FIGHT CLUB - HEALTH BAR
 *
 * @author: C. Moller
 * @date: 20 December 2017
 *
 * @updated: 05 Feb 2020 (C. Moller)
 *   - Add init(), build() + Refactor
 */

class HealthBar extends Sprite {


  init(props) {

    super.init(props);

    this.state = 100;
    this.className = 'health-bar';
    this.elBarInner = null;

    return this;

  }


  build(elm) {

    this.elm = document.createElement('div');

    this.elBarInner = document.createElement('small');
    this.elBarInner.className = 'health-bar-inner';
    this.elBarInner.style = 'width:0';

    this.elm.appendChild(this.elBarInner);

    this.game.log('HealthBar.build(),', this.id, '- Done,', this.elm);

    return this;

  }


  render(now) {

    if (this.stateChanged || this.firstRender) {

      super.render(now); // Render Class + Style

      this.elBarInner.style = 'width:' + this.state + '%';
      this.elBarInner.innerHTML = this.state;

    }

  }


} // End: HealthBar Class

