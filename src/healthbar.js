/**
 *
 * FIGHT CLUB - HEALTH BAR
 *
 * @author: C. Moller
 * @date: 20 December 2017
 *
 */

class HealthBar extends Sprite {

  constructor(id, props) {

    super(id);

    this.state = 100;
    this.className = 'health-bar';
    this.innerElm = document.createElement('small');
    this.innerElm.className = 'health-bar-inner';
    this.innerElm.style = 'width:0';
    this.elm.appendChild(this.innerElm);

    FC.lib.extend(this, props);

    console.log('HBar.instance =', this);

  }


//beforeUpdate(now) {
//  console.log('HBAR::beforeUpdate(), stateChanged:', this.stateChanged, ', state:', this.state, ', lastState:', this.lastState);    
//  super.beforeUpdate(now);
//}


  render(now) {

    if (this.stateChanged || this.firstRender) {

      super.render(now); // Render Class + Style
      this.innerElm.style = 'width:' + this.state + '%';
      this.innerElm.innerText = this.state;

    }

  }
  

} // end: HealthBar class
