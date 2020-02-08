/**
 *
 * FIGHT CLUB - HEALTH BAR
 *
 * @author: C. Moller
 * @date: 20 December 2017
 *
 * @update: C. Moller - 05 Feb 2020
 *   - Add init(), build() + Refactor
 *
 * @update: C. Moller - 08 Feb 2020
 *   - Refactor constructor()
 *   - Add updateElementContent()
 *
 */

class HealthBar extends Sprite {


  constructor(id, parent, props) {

    super(id, parent);

    this.state = 100;
    this.className = 'health-bar';
    this.elBarInner = null;

    if (props) { this.init(props); }

  }


  build(elm) {

    super.build();

    this.elBarInner = document.createElement('small');
    this.elBarInner.className = 'health-bar-inner';
    this.elBarInner.style = 'width:0';

    this.elm.appendChild(this.elBarInner);

    return this;

  }


  updateElementContent(content) {

    super.updateElementContent('Score: ' + this.value);

  }



  render(now) {

    if (this.stateChanged || this.firstRender) {

      super.render(now); // Render Class + Style

      this.elBarInner.style = 'width:' + this.state + '%';
      this.elBarInner.innerHTML = this.state;

    }

  }


} // End: HealthBar Class


