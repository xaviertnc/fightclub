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
    this.speed = 0;
    this.horzSpeed = 0;        // pixels per second
    this.vertSpeed = 0;        // pixels per second
    this.lastMoveTime = 0;     // unix time
    this.lastUpdateTime = 0;   // unix time
    this.classUpdated = false;
    this.styleUpdated = false;
    this.firstRender = true;
    this.styleParams = {};
    this.className = '';
    this.tagName = 'div';

    FC.lib.extend(this, props);

    // Sprite Element Rules:
    // =====================
    // If the element already exists in the DOM, select it FIRST, then
    // call the sprite constructor while passing the element as "props.elm".

    // -- else --

    // A sprite element will be created and inserted into the view element 
    // with the tagName spesified by "this.tagName' or as a DIV by default.

    this.elm = FC.view.addElement(this.elm, this.tagName);

    this.elm.id = this.id;

  }


  _styleNeedsUpdate() {

    let sp = this.styleParams;

    return (
      sp.x      !== this.x     ||
      sp.y      !== this.y     ||
      sp.width  !== this.width ||
      sp.bgTop  !== this.bgTop ||
      sp.bgLeft !== this.bgLeft

    );

  }


  _updateStyle() {

    if (this._styleNeedsUpdate()) {

      this.styleParams = {
        x      : this.x,
        y      : this.y,
        width  : this.width,
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

  }


  _renderStyle() {

      let styleStr = 'left:' + this.x + 'px;top:' + this.y + 'px;'
        + 'height:' + this.height + 'px;width:'  + this.width  + 'px;';

      if (this.animator) {

        styleStr += 'background-position:-' + this.bgLeft + 'px ' + this.bgTop + 'px;';

      }

      this.elm.style = styleStr;

  }


  beforeUpdate(now) {}


  update(now) {

    if (this.animator) {

      let animation = this.animator.update(now);

      if (animation) {

        let frame = animation.currentFrame;

        this.bgTop  = frame.top;
        this.bgLeft = frame.left;
        this.width  = frame.width;
        this.height = frame.height;
        
        this.hw = (this.width / 2)|0;
        this.hh = (this.height / 2)|0;

        if (this.animator.animationChanged || animation.frameChanged || this.firstRender) {

          this.className = animation.className;

          if (frame.flipH) { this.className += ' flipH'; }
          if (frame.flipV) { this.className += ' flipV'; }

          this.classUpdated = true;

          //console.log('frame.flipH =', frame.flipH, ', sprite.id:', this.id, ', sprite.className:', this.className);

        }

      }

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

    this.classUpdated = false;
    this.styleUpdated = false;

  }

} // end: Sprite class
