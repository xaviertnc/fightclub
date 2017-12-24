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

    console.log('Score.props =', props);

    super(id);

    this.value = 0;
    this.classStr = 'score';

    FC.lib.extend(this, props);

    console.log('Score.this.instance =', this);

  }


  render(time, dStartTime, ticks) {

    super.render(time, dStartTime, ticks);
    this.elm.innerHTML = 'Score: ' + this.value;
    
  }


  update(time, dStartTime, ticks) {

      // Get Class + Style
      super.update(time, dStartTime, ticks);

  }


} // end: Score class
