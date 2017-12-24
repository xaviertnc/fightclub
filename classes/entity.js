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

    this.id = id;

    this.state = null;

    FC.lib.extend(this, props);

    if (props) { console.log('Entity.instance =', this); }

  }
  
}
