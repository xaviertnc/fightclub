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

    this.x = 0;
    this.y = 0;
    this.bgTop = 0;
    this.bgLeft = 0;
    this.width = 16;
    this.height = 16;
    this.horzSpeed = 0;        // pixels per second
    this.vertSpeed = 0;        // pixels per second
    this.lastMoveTime = 0;     // unix time
    this.lastUpdateTime = 0;   // unix time
    this.classUpdated = false;
    this.styleUpdated = false;
    this.firstRender = true;
    this.styleParams = {};
    this.className = '';

    this.elm = document.getElementById(id);

    if ( ! this.elm) {

      this.elm = FC.game.createSpriteElement(id);
      FC.game.addSprite(this.elm);

    }

    FC.lib.extend(this, props);

    if (props) { console.log('SPR.instance =', this); }

  }


  _styleNeedsUpdate() {

    let sp = this.styleParams;
    return (sp.x !== this.x || sp.y !== this.y || sp.bgTop !== this.bgTop || sp.bgLeft !== this.bgLeft);

  }


  _updateStyle() {

    if (this._styleNeedsUpdate()) {

      this.styleParams = {
        x      : this.x,
        y      : this.y,
        bgTop  : this.bgTop,
        bgLeft : this.bgLeft,
        width  : this.width,
        height : this.height
      };

      this.styleUpdated = true;

    }

  }


  _renderClass() {

    FC.lib.setClass(this.elm, this.className + ' ' + this.state);

    this.classUpdated = false;

  }


  _renderStyle() {

      let styleStr = 'left:' + this.x + 'px;top:' + this.y + 'px;'
        + 'height:' + this.height + 'px;width:'  + this.width  + 'px;';

      if (this.animator) {

        styleStr += 'background-position-y:' + this.bgTop + 'px;'
          + 'background-position-x:-' + this.bgLeft + 'px;';

      }

      this.elm.style = styleStr;

      this.styleUpdated = false;

  }


  update(now) {

    if (this.animator) {

      this.animator.update(this, now); // Affects the sprite's style params

    }

    this._updateStyle();

  }


  render() {

    if (this.firstRender) {

      this._renderClass();
      this._renderStyle();

      this.firstRender = false;

    } else {

      if (this.stateChanged || this.classUpdated) { this._renderClass(); }
      if (this.styleUpdated) { this._renderStyle(); }

    }

    //this._renderStyle();

  }

} // end: Sprite class
