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
 * @update: C. Moller - 08 Feb 2020
 *   - Revert unnecessary complexity
 */

class View extends Sprite {


  mount(parentElm, props) {

    super.mount(parentElm, props);

    props = props || {};

    this.x = props.x || this.getX();
    this.y = props.y || this.getY();
    this.width = props.width || this.getWidth();
    this.height = props.height || this.getHeight();

    return this;

  }


  getWidth() {

    return this.elm.clientWidth;

  }


  getHeight() {

    return this.elm.clientHeight;

  }


  getX() {

    return this.elm.offsetLeft;

  }


  getY() {

    return this.elm.offsetTop;

  }


}  // End: View Class
