/**
 *
 * FIGHT CLUB - FIXTURE
 *
 * @author: C. Moller
 * @date: 20 December 2017
 *
 */

class Fixture extends Sprite {

  constructor(id, props) {

    super(id);

    FC.lib.extend(this, props);

    if (props) { console.log('Fixture.instance =', this); }

  }

} // end: Fixture class
