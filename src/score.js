/**
 *
 * FIGHT CLUB - SCORE
 *
 * @author: C. Moller
 * @date: 20 December 2017
 *
 * @update: C. Moller - 05 Feb 2020
 *   - Add init(), build() + Refactor
 *
 * @update: C. Moller - 08 Feb 2020
 *   - Simplify
 *   - Use updateElementContent() override
 */

class Score extends Sprite {


  updateElementContent(content) {

    super.updateElementContent('Score: ' + this.value);

  }


} // End: Score Class

