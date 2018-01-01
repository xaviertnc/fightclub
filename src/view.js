/**
 *
 * FIGHT CLUB - VIEW
 *
 * @author: C. Moller
 * @date: 20 December 2017
 *
 */

class View {

  constructor(id) {

    this.id = id || 'main-view';

    this.elm = document.getElementById(this.id);

    console.log('View("#' + this.id +'") =', this);

  }


  addElement(childElement, childTagName) {

    if ( ! childElement) {

      childElement = document.createElement(childTagName || 'div');

    }

    this.elm.appendChild(childElement);

    return childElement;

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

}
