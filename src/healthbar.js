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
    this.classStr = 'health-bar';

    FC.lib.extend(this, props);

    console.log('HBar.instance =', this);

  }


  render(time, dStartTime, ticks) {

    super.render(time, dStartTime, ticks);

    this.elm.innerHTML = '<small class="health-bar-inner" style="width:' + this.value + '%">' + this.value + '</small>';

  }


  update(time, dStartTime, ticks) {

    // Get Class + Style
    super.update(time, dStartTime, ticks);

  }


} // end: HealthBar class
