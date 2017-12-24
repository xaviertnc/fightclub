/**
 *
 * FIGHT CLUB - ENTITY
 *
 * @author: C. Moller
 * @date: 20 December 2017
 *
 */

class Entity {

  constructor(id, props) {

    console.log('Entity.props =', props);

    this.id = id;
    this.state = null;

    FC.lib.extend(this, props);

    console.log('Entity.instance =', this);

  }
  
}
