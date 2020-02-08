/**
 *
 * FIGHT CLUB - POINTER LINE
 *
 * @author: C. Moller
 * @date: 29 December 2017
 *
 * @update: C. Moller - 05 Feb 2020
 *   - Now extends Sprite
 *   - Add init(), build() + Refactor
 *   - Fix SVG Line rendering issue!
 *   - Add elSvg + elSvgLine
 *   - Rename x1, y1 to x, y
 *   - Rename x2, y2 to ex, ey
 *
 * @update: C. Moller - 08 Feb 2020
 *   - New constructor structure
 *
 */

class PointerLine extends Sprite {


  constructor(id, parent, props) {

    super(id, parent);

    this.ex = 0;
    this.ey = 0;
    this.length = 80; // pixels
    this.elSvgLine = null;
    this.elSvg = null;

    if (props) { this.init(props); }

  }


  build() {

    super.build();

    const vw = this.engine.view.getWidth();
    const vh = this.engine.view.getHeight();

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

    return this;

  }


  render() {

    if (this.engine.input.mode === 'mouse') {

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

    const lib = this.engine.lib;
    const view = this.engine.view;
    const input = this.engine.input;
    const player = this.engine.player;

    if (input.mode === 'mouse') {

      this.x = player.x + 15;
      this.y = player.y + 30;

      const angleRad = lib.getAngleRad(
        this.x,
        this.y,
        input.mouseX - view.getX(),
        input.mouseY - view.getY()
      );

      this.ex = this.x + Math.cos(angleRad) * this.length;
      this.ey = this.y - Math.sin(angleRad) * this.length;

    }

  }


} // end: PointerLine class
