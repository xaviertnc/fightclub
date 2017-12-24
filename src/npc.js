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

    if (props) { console.log('NPC.instance =', this); }

  }

}
