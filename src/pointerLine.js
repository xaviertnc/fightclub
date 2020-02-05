/**
 *
 * FIGHT CLUB - POINTER LINE
 *
 * @author: C. Moller
 * @date: 29 December 2017
 *
 * @updated: 05 Feb 2020 (C. Moller)
 *   - Now extends Sprite
 *   - Add init(), build() + Refactor
 *   - Fix SVG Line rendering issue!
 *   - Add elSvg + elSvgLine
 *   - Rename x1, y1 to x, y
 *   - Rename x2, y2 to ex, ey
 */

class PointerLine extends Sprite {


  init(props) {

    this.ex = 0;
    this.ey = 0;
    this.length = 80; // pixels
    this.elSvgLine = null;
    this.elSvg = null;

    return super.init(props);

  }


  build(elm) {

    let vw = this.game.view.getWidth();
    let vh = this.game.view.getHeight();

    this.elm = elm || document.createElement('div');

    this.elSvg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    this.elSvg.setAttribute('xmlns', 'http://www.w3.org/2000/svg');
    this.elSvg.setAttribute('viewBox', `0 0 ${vw} ${vh}`);
    this.elSvg.setAttribute('height', vh);
    this.elSvg.setAttribute('width', vw);

    this.elSvgLine = document.createElementNS('http://www.w3.org/2000/svg', 'line');
    this.elSvgLine.setAttribute('x1', this.x);
    this.elSvgLine.setAttribute('y1', this.y);
    this.elSvgLine.setAttribute('x2', this.ex);
    this.elSvgLine.setAttribute('y2', this.ey);
    this.elSvgLine.setAttribute('stroke-width', 1);
    this.elSvgLine.setAttribute('stroke', 'crimson');

    this.elSvg.appendChild(this.elSvgLine);
    this.elm.appendChild(this.elSvg);

    this.elm.className = 'pointer-line';

    this.game.log('PointerLine.build(),', this.elm);

    return this;

  }


  render() {

    if (this.game.input.mode === 'mouse') {

      this.elm.style.opacity = 0.5;

      this.elSvgLine.setAttribute('x1', this.x);
      this.elSvgLine.setAttribute('y1', this.y);
      this.elSvgLine.setAttribute('x2', this.ex);
      this.elSvgLine.setAttribute('y2', this.ey);

    } else {

      this.elm.style.opacity = 0;

    }

  }


  update(now) {

    if (this.game.input.mode === 'mouse') {

      this.x = this.game.player.x + 15;
      this.y = this.game.player.y + 30;

      let angleRad = this.game.lib.getAngleRad(
        this.x,
        this.y,
        this.game.input.mouseX - this.game.view.getX(),
        this.game.input.mouseY - this.game.view.getY()
      );

      this.ex = this.x + Math.cos(angleRad) * this.length;
      this.ey = this.y - Math.sin(angleRad) * this.length;

    }

  }


} // end: PointerLine class
