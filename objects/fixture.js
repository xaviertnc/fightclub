/**
 *
 * FIGHT CLUB - FIXTURE
 *
 * @author: C. Moller
 * @date: 20 December 2017
 *
 */

FC.Fixture = function (id, props) {

  console.log('Fixture.props =', props);

  FC.lib.extend(this, new FC.Sprite(id));

  //console.log('Fixture.this.inherit =', this);

  FC.lib.extend(this, props);

  console.log('Fixture.this.instance =', this);

};
