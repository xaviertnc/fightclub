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

    this.x1 = 0;
    this.y1 = 0;
    this.x2 = 0;
    this.y2 = 0;

    this.length = 80; // pixels
    this.className = 'pointer-line';

    FC.lib.extend(this, props);

    this.elm = document.createElement('div');
    
    this.elm.innerHTML = '<svg viewBox="0 0 800 600" xmlns="http://www.w3.org/2000/svg"> <line ' +
      'x1="' + this.x1 + '" y1="' + this.y1 + '" x2="' + this.x2 + '" y2="' + this.y1 +
      '" stroke-width="1" stroke="crimson" /></svg>';

    this.elm.className = this.className;

    this.innerElm = this.elm.firstElementChild.firstElementChild;

    FC.view.elm.appendChild(this.elm);

    console.log('PointerLine.instance =', this);

  }


  update(now, playerElm, mouseX, mouseY) {

    //console.log('PointerLine.update mouseXY =', mouseX, mouseY);
    //console.log('PointerLine.update.this =', this, ', playerElm:', playerElm);

    if (FC.input.mode === 'mouse') {

      this.x1 = playerElm.offsetLeft + 15;
      this.y1 = playerElm.offsetTop + 30;

      let angleRad = FC.lib.getAngleRad(
        this.x1,
        this.y1, 
        mouseX - FC.view.elm.offsetLeft,
        mouseY - FC.view.elm.offsetTop
      );

      this.x2 = this.x1 + Math.cos(angleRad) * this.length;
      this.y2 = this.y1 - Math.sin(angleRad) * this.length;

    }

  }


  render() {

    if (FC.input.mode === 'mouse') {

      this.elm.style.opacity = 0.3;

      this.innerElm.setAttribute('x1', this.x1);
      this.innerElm.setAttribute('y1', this.y1);
      this.innerElm.setAttribute('x2', this.x2);
      this.innerElm.setAttribute('y2', this.y2);

    } else {

      this.elm.style.opacity = 0;

    }

  }


} // end: PointerLine class
