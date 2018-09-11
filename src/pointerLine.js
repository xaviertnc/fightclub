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

    this.elm.innerHTML = '<svg viewBox="0 0 ' + FC.view.getWidth() + ' ' + FC.view.getHeight() + '" xmlns="http://www.w3.org/2000/svg"> <line ' +
      'x1="' + this.x1 + '" y1="' + this.y1 + '" x2="' + this.x2 + '" y2="' + this.y1 +
      '" stroke-width="1" stroke="crimson" /></svg>';

    this.elm.className = this.className;

    this.innerElm = this.elm.firstElementChild.firstElementChild;

    FC.view.elm.appendChild(this.elm);

    this.getAngleRad = FC.lib.getAngleRad;

    console.log('PointerLine.instance =', this);

  }


  update(now, view, input, player) {

    if (input.mode === 'mouse') {

      this.x1 = player.x + 15;
      this.y1 = player.y + 30;

      let angleRad = this.getAngleRad(
        this.x1,
        this.y1,
        input.mouseX - view.getX(),
        input.mouseY - view.getY()
      );

      this.x2 = this.x1 + Math.cos(angleRad) * this.length;
      this.y2 = this.y1 - Math.sin(angleRad) * this.length;

    }

  }


  render(inputMode) {

    if (inputMode === 'mouse') {

      this.elm.style.opacity = 0.5;

      this.innerElm.setAttribute('x1', this.x1);
      this.innerElm.setAttribute('y1', this.y1);
      this.innerElm.setAttribute('x2', this.x2);
      this.innerElm.setAttribute('y2', this.y2);

    } else {

      this.elm.style.opacity = 0;

    }

  }


} // end: PointerLine class
