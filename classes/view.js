/**
 *
 * FIGHT CLUB - VIEW
 *
 * @author: C. Moller
 * @date: 20 December 2017
 *
 */

class View {

  constructor(id, props) {

    this.id = id;
    this.elm = document.getElementById(id);
    this.width = props.width ? props.width : 800;
    this.height = props.height ? props.height : 600;

    this.elm.style = 'height:' + this.height + 'px; width:' + this.width + 'px';

    FC.lib.extend(this, props);
    
  }

}
