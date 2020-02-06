/**
 *
 * FIGHT CLUB - ENTITY
 *
 * @author: C. Moller
 * @date: 20 December 2017
 *
 * @updated: 05 Feb 2020 (C. Moller)
 *   - Add game + type to constructor params
 *   - Add init() + Refactor
 */

class Entity {


  constructor(id, game, type) {

    this.id = id;
    this.game = game;
    this.type = type || this.constructor.name;

    this.state = 'Normal';
    this.lastState = 'Normal';
    this.stateChanged = false;

    game.log('New Entity()', this.type + ': ' + this.id);

  }


  init(props) {

    for (let prop in props) { this[prop] = props[prop]; }
    this.game.log('Entity.init()', this.type + ': ' + this.id, '- Done,', this);
    return this;

  }


  beforeUpdate(now, dt) {}


  update(now, dt) {}


  afterUpdate(now, dt) {

    this.stateChanged = (this.state !== this.lastState);
    this.lastState = this.state;

  }


} // End: Entity Class
