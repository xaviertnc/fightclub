/**
 *
 * FIGHT CLUB - SCORE
 *
 * @author: C. Moller
 * @date: 20 December 2017
 *
 */

class Score extends Sprite {

  constructor(id, props) {

    super(id);

    this.value = 0;
    this.lastValue = 0;
    this.className = 'score';

    FC.lib.extend(this, props);

    console.log('Score.instance =', this);

  }


  render(now) {

    if ((this.value !== this.lastValue) || this.firstRender) {

      this.elm.innerHTML = 'Score: ' + this.value;
      this.lastValue = this.value;

    }

    super.render(now); // Render Class + Style

  }


} // end: Score class
