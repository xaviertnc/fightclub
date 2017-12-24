/**
 *
 * FIGHT CLUB - NPC
 *
 * @author: C. Moller
 * @date: 20 December 2017
 *
 */

class Npc extends Sprite {

  constructor (id, props) {

    super(id);
    
    FC.lib.extend(this, props);

    console.log('NPC.this.instance =', this);

  }

}
