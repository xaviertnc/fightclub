/**
 *
 * FIGHT CLUB - POINTER LINE
 *
 * @author: C. Moller
 * @date: 29 December 2017
 *
 */

class PointerLine {

  constructor(id, props) {

    this.className = 'pointer-line';

    this.elm = document.createElement('div');
    this.elm.className = this.className;

    FC.lib.extend(this, props);

    this.x1 = 0;
    this.y1 = 0;
    this.x2 = 0;
    this.y2 = 0;

    let innerHTML = '<svg viewBox="0 0 800 600" xmlns="http://www.w3.org/2000/svg"> <line ' +
      'x1="' + this.x1 + '" y1="' + this.y1 + '" x2="' + this.x2 + '" y2="' + this.y1 +
      '" stroke-width="1" stroke="crimson" /></svg>';

    this.elm.innerHTML = innerHTML;

    this.innerElm = this.elm.firstElementChild.firstElementChild;

    //document.body.appendChild(this.elm);

    FC.view.elm.appendChild(this.elm);


    console.log('PointerLine.instance =', this);

  }


  update(now, playerElm, mouseX, mouseY) {

    //console.log('PointerLine.update mouseXY =', mouseX, mouseY);
    //console.log('PointerLine.update.this =', this, ', playerElm:', playerElm);

    this.x1 = playerElm.offsetLeft + 15;
    this.y1 = playerElm.offsetTop + 30;
    this.x2 = mouseX - FC.view.elm.offsetLeft;
    this.y2 = mouseY - FC.view.elm.offsetTop;

  }


  render() {

    this.innerElm.setAttribute('x1', this.x1);
    this.innerElm.setAttribute('y1', this.y1);
    this.innerElm.setAttribute('x2', this.x2);
    this.innerElm.setAttribute('y2', this.y2);

  }


} // end: PointerLine class
