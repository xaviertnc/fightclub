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

    this.value = 100;
    this.className = 'health-bar';

    FC.lib.extend(this, props);

    console.log('HBar.instance =', this);

  }


  render(now) {

    super.render(now); // Render Class + Style
    this.elm.innerHTML = '<small class="health-bar-inner" style="width:' + this.value + '%">' + this.value + '</small>';

  }

} // end: HealthBar class
