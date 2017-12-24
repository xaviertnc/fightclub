/**
 *
 * FIGHT CLUB - SPRITE
 *
 * @author: C. Moller
 * @date: 20 December 2017
 *
 */

class Sprite extends Entity {

  constructor(id, props) {

    super(id);

    this.classStr = '';
    this.width = 16;
    this.height = 16;
    this.horzSpeed = 0;        // pixels per second
    this.vertSpeed = 0;        // pixels per second
    this.lastUpdateTime = 0;   // unix time
    this.lastMoveTime = 0;     // unix time

    this.elm = document.getElementById(id);

    if ( ! this.elm) {
      this.elm = FC.game.createSpriteElement(id);
      FC.game.addSprite(this.elm);
      //this.update();
    }

    FC.lib.extend(this, props);

    if (props) { console.log('SPR.instance =', this); }

  }


  getClass() {
    let classStr = this.classStr;
    if (this.state) { classStr += ' ' + this.state; }
    FC.lib.setClass(this.elm, classStr); // Context: this == SpriteObject
  }


  getStyle() {
    this.elm.style = 'left:' + (this.x||0) + 'px;'
      + 'top:'    + (this.y||0)       + 'px;'
      + 'height:' + (this.height||16) + 'px;'
      + 'width:'  + (this.width||16)  + 'px';
  }


  render(time, dStartTime, ticks) {
    this.getClass();
    this.getStyle();
  }


  update(time, dStartTime, ticks) {
    this.render(time, dStartTime, ticks);
  }


} // end: Sprite class
