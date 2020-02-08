/**
 *
 * FIGHT CLUB - SPRITE
 *
 * @author: C. Moller
 * @date: 20 December 2017
 *
 * @update: C. Moller - 05 Feb 2020
 *   - Add game + type to constructor params
 *   - Add build(), mount(), dismount() + Refactor
 *
 * @update: C. Moller - 08 Feb 2020
 *   - Refactor again
 *   - Change var and method names. Remove underscores.
 *   - Improve mount() + Add mountChild()
 *   - Check for "value changed"
 *   - Add updateElementContent()
 */

class Sprite extends Entity {


  constructor(id, parent, props) {

    super(id, parent);

    this.x = 0;
    this.y = 0;
    this.bgTop = 0;
    this.bgLeft = 0;
    this.width = 0;
    this.height = 0;
    this.speed = 0;
    this.horzSpeed = 0;        // pixels per second
    this.vertSpeed = 0;        // pixels per second
    this.lastMoveTime = 0;     // unix time
    this.lastUpdateTime = 0;   // unix time
    this.classUpdated = false;
    this.styleDataUpdated = false;
    this.styleData = {};
    this.className = '';
    this.mounted = false;
    this.tagName = 'div';
    this.elm = null;

    if (props) { this.init(props); }

  }


  build() {

    this.elm = document.createElement(this.tagName || 'div');

    this.elm.id = this.id;

    this.log(this.type + '.build():', this.id, '- Done,', this.elm);

    return this;

  }


  mountChild(id, elm) {

    if ( ! elm) {
      elm = document.createElement('div');
      elm.id = id;
    }

    this.addChild(elm);

    this.elm.appendChild(elm); // i.e. mount!

    return elm;

  }


  mount(parentElm, props) {

    if ( ! parentElm) {

      this.elm = document.getElementById(this.id);

      if (this.elm) {

        if (props) { this.init(props); }

        this.mounted = true;

        this.log(this.type + '.mount():', this.id, '- Element already mounted!', this.elm);

        return this;

      }

      parentElm = this.engine.view.elm;

    }

    if ( ! this.elm) { this.build(); }

    parentElm.appendChild(this.elm);

    if (props) { this.init(props); }

    this.mounted = true;

    this.log(this.type + '.mount():', this.id, '- Done, parentElm =', parentElm);

    return this;

  }


  dismount() {

    this.elm.remove();

    this.mounted = false;

    return this.elm;

  }


  render() {

    if (this.valueChanged) { this.updateElementContent(); }
    if (this.stateChanged || this.classUpdated) { this.updateElementClass(); }
    if (this.styleDataUpdated) { this.updateElementStyle(); }

    this.classUpdated = false;
    this.styleDataUpdated = false;

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

          //this.log('frame.flipH =', frame.flipH, ', sprite.id:', this.id,
          //  ', sprite.className:', this.className);

        }

      }

    }

    this.updateElementStyleData();

  }


  updateElementStyleData() {

    if (this.styleDataNeedsUpdate()) {

      this.styleData = {
        x      : this.x,
        y      : this.y,
        width  : this.width,
        bgTop  : this.bgTop,
        bgLeft : this.bgLeft,
        width  : this.width,
        height : this.height
      };

      this.styleDataUpdated = true;

    }

  }


  styleDataNeedsUpdate() {

    let styleData = this.styleData;

    return (
      styleData.x      !== this.x     ||
      styleData.y      !== this.y     ||
      styleData.width  !== this.width ||
      styleData.bgTop  !== this.bgTop ||
      styleData.bgLeft !== this.bgLeft

    );

  }


  updateElementContent(content) {

    this.elm.innerHTML = content || this.value;

  }


  updateElementStyle() {

    let styleStr = 'left:' + this.x + 'px;top:' + this.y + 'px;'
      + 'height:' + this.height + 'px;width:'  + this.width  + 'px;';

    if (this.animator) {

      styleStr += 'background-position:-' + this.bgLeft + 'px ' + this.bgTop + 'px;';

    }

    this.elm.style = styleStr;

  }


  updateElementClass() {

    this.elm.className = this.className + ' ' + this.state;

  }


} // End: Sprite Class
