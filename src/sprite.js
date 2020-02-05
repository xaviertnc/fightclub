/**
 *
 * FIGHT CLUB - SPRITE
 *
 * @author: C. Moller
 * @date: 20 December 2017
 *
 * @updated: 05 Feb 2020 (C. Moller)
 *   - Add game + type to constructor params
 *   - Add build(), mount(), dismount() + Refactor
 */

class Sprite extends Entity {


  constructor(id, game, type) {

    super(id, game, type);

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
    this.mounted = false;
    this.tagName = 'div';
    this.elm = null;

  }


  build(elm) {

    if (elm) { this.elm = elm; }
    else { this.elm = document.createElement(this.tagName || 'div'); }
    this.game.log('Sprite.build()', this.type + ': ' + this.id, '- Done,', this.elm);
    return this;

  }


  mount(parentElm) {

    if ( ! parentElm) {
      this.elm = document.getElementById(this.id);
      if (this.elm) {
        this.mounted = true;
        this.game.log('Sprite.mount()', this.type + ': ' + this.id, '- Element already mounted!', this.elm);
        return this;
      }
      parentElm = document.body;
    }

    if ( ! this.elm) {
      this.elm = document.createElement(this.tagName || 'div');
    }

    parentElm.appendChild(this.elm);

    this.mounted = true;

    this.game.log('Sprite.mount()', this.type + ': ' + this.id, '- Done, parentElm =', parentElm);

    return this;

  }


  dismount() {

    this.elm.remove();

    this.mounted = false;

    return this.elm;

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


  update(now, dt) {

    if (this.animator) {

      let animation = this.animator.update(now, dt);

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

          //this.game.log('frame.flipH =', frame.flipH, ', sprite.id:', this.id,
          //  ', sprite.className:', this.className);

        }

      }

    }

    this._updateStyle();

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

    this.elm.className = this.className + ' ' + this.state;

  }


  _renderStyle() {

    let styleStr = 'left:' + this.x + 'px;top:' + this.y + 'px;'
      + 'height:' + this.height + 'px;width:'  + this.width  + 'px;';

    if (this.animator) {

      styleStr += 'background-position:-' + this.bgLeft + 'px ' + this.bgTop + 'px;';

    }

    this.elm.style = styleStr;

  }


} // End: Sprite Class
