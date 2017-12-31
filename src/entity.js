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
    this.state = 'Normal';
    this.lastState = 'Normal';
    this.stateChanged = false;

    FC.lib.extend(this, props);

    if (props) { console.log('Entity.instance =', this); }

  }


  startUpdate(now) {

    this.stateChanged = (this.state !== this.lastState);

  }


  endUpdate(now) {

    this.lastState = this.state;

  }

}