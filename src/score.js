/**
 *
 * FIGHT CLUB - SCORE
 *
 * @author: C. Moller
 * @date: 20 December 2017
 *
 * @updated: 05 Feb 2020 (C. Moller)
 *   - Add init(), build() + Refactor
 */

class Score extends Sprite {

  init(props) {

    super.init(props);

    this.value = 0;
    this.lastValue = 0;
    this.className = 'score';

    return this;

  }


  build(elm) {

    this.elm = document.createElement('div');
    this.elm.className = this.className;
    this.game.log('Score.build() - Done,', this.elm);
    return this;

  }


  render(now) {

    if ((this.value !== this.lastValue) || this.firstRender) {

      this.elm.innerHTML = 'Score: ' + this.value;
      this.lastValue = this.value;

    }

    super.render(now); // Render Class + Style

  }


} // End: Score Class

