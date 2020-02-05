/**
 *
 * FIGHT CLUB - VIEW
 *
 * @author: C. Moller
 * @date: 20 December 2017
 *
 * @updated: 05 Feb 2020 (C. Moller)
 *   - Now extends Sprite
 *   - Added this.children = {}
 *   - Added mount(), _appendChildren(), getChildElement(),
 *     addItem(), getItem()
 *   - Set width / height on getWidth(), getHeight()
 *
 */

class View extends Sprite {


  // children = { id1: { elm1: ..., tagName: ... }, id2: { elm2: ..., tagName: ... }, ... }
  constructor(id, game, type) {

    super(id, game, type);
    this.children = {};

  }


  _appendChildren() {
    this.game.log('View._appendChildren()', this.id + ':', this.children);
    for (let childID in this.children) {
      let child = this.children[childID];
      if ( ! child.elm) {
        child.elm = document.createElement(child.tagName || 'div');
        child.elm.id = childID;
      }
      // this.game.log('View._appendChildren(), child:', child);
      this.elm.appendChild(child.elm);
    }

  }


  mount(parentElm) {

    if ( ! parentElm) {

      this.elm = document.getElementById(this.id);

      if (this.elm) {
        this.mounted = true;
        this._appendChildren();
        this.game.log('View.mount()', this.type + ': ' + this.id, '- View already mounted!', this.elm);
        return this;
      }

      parentElm = document.body;

    }

    if ( ! this.elm) {
      this.elm = document.createElement(this.tagName || 'div');
    }

    this._appendChildren();

    parentElm.appendChild(this.elm);

    this.mounted = true;

    this.game.log('View.mount()', this.id, '- Done, parentElm =', parentElm);

    return this;

  }


  addItem(itemDef) {

    let child = { elm: null, tagName: 'div' };

    if (typeof itemDef === 'string') {
      this.children[itemDef] = child;
    }
    else {
      if (itemDef.tagName) { child.tagName = childData.tagName; }
      if (itemDef.elm) { child.elm = childData.elm; }
      this.children[itemDef.id] = child;
    }

    return child;

  }


  getItem(itemID) {

    return this.children[itemID];

  }


  getChildElement(childID) {

    return this.children[childID].elm;

  }


  getWidth() {

    return this.width = this.elm.clientWidth;

  }


  getHeight() {

    return this.height = this.elm.clientHeight;

  }


  getX() {

    return this.x = this.elm.offsetLeft;

  }


  getY() {

    return this.y = this.elm.offsetTop;

  }


}  // End: View Class
