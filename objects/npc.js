/**
 *
 * FIGHT CLUB - NPC
 *
 * @author: C. Moller
 * @date: 20 December 2017
 *
 */

FC.Npc = function (id, props) {

  console.log('NPC.props =', props);

  FC.lib.extend(this, new FC.Sprite(id));

  //console.log('NPC.this.inherit =', this);

  FC.lib.extend(this, props);

  console.log('NPC.this.instance =', this);

};
