/**
 *
 * FIGHT CLUB - ENTITY
 *
 * @author: C. Moller
 * @date: 20 December 2017
 *
 */

FC.Entity = function (id, props) {

  console.log('Entity.props =', props);

  this.id = id;

  this.state = null;

  //console.log('Entity.this.default =', this);

  FC.lib.extend(this, props);

  console.log('Entity.this.instance =', this);

};
