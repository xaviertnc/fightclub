/**
 *
 * FIGHT CLUB - SPRITE
 *
 * @author: C. Moller
 * @date: 20 December 2017
 *
 */

FC.Sprite = function (id, props) {

  console.log('SPR.props =', props);

  FC.lib.extend(this, new FC.Entity(id));

  //console.log('SPR.this.inherit =', this);

  this.classStr = '';
  this.width = 16;
  this.height = 16;
  this.horzSpeed = 0;        // pixels per second
  this.vertSpeed = 0;        // pixels per second
  this.lastUpdateTime = 0;   // unix time
  this.lastMoveTime = 0;     // unix time

  //console.log('SPR.this.default =', this);

  FC.lib.extend(this, props);

  console.log('SPR.this.instance =', this);

  this.elm = document.getElementById(id);

  if ( ! this.elm) {
    this.elm = FC.game.createSpriteElement(id);
    FC.game.addSprite(this.elm);
    //this.update();
  }

};


FC.Sprite.prototype.getClass = function () {
  let classStr = this.classStr;
  if (this.state) { classStr += ' ' + this.state; }
  FC.lib.setClass(this.elm, classStr); // Context: this == SpriteObject
};


FC.Sprite.prototype.getStyle = function () {
  this.elm.style = 'left:' + (this.x||0) + 'px;'
    + 'top:'    + (this.y||0)       + 'px;'
    + 'height:' + (this.height||16) + 'px;'
    + 'width:'  + (this.width||16)  + 'px';
};


FC.Sprite.prototype.render = function (time, dStartTime, ticks) {
  this.getClass();
  this.getStyle();
};


FC.Sprite.prototype.update = function (time, dStartTime, ticks) {
  this.render(time, dStartTime, ticks);
};
