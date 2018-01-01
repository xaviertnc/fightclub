/**
 *
 * FIGHT CLUB - INPUT SERVICE
 *
 * @author: C. Moller
 * @date: 26 December 2017
 *
 */

class Input {

  constructor() {

    this.mode = 'kb';

    this.actions = [];
    this.directions = [];

    this.action = undefined;
    this.direction = undefined;
    this.lastAction = undefined;
    this.lastDirection = undefined;

    this.actionChanged = false;
    this.directionChanged = false;

    this.actionsMap = {
      'Attack'  : [17, 32], // Left Ctrl. Space
      'Exit'    : [27],     // Escape
      'Pause'   : [80]      // P
    };

    this.directionsMap = {
      'Up'      : [38, 87], // UpArrow    , W
      'Down'    : [40, 83], // DownArrow  , S
      'Left'    : [37, 65], // LeftArrow  , A
      'Right'   : [39, 68]  // RightArrow , D
    };

    this.directionCombosMap = {
      'UpLeft'    : ['Up'   , 'Left' ],
      'UpRight'   : ['Up'   , 'Right'],
      'DownLeft'  : ['Down' , 'Left' ],
      'DownRight' : ['Down' , 'Right']
    };

    this.keysDown = {};


    this.mdx = 0;
    this.mdy = 0;
    this.mouseX = 0;
    this.mouseY = 0;
    this.lastMouseX = 0;
    this.lastMouseY = 0;

    this.mouseMoved = false;
    this.mouseMoveRate = 60; // ms

    this.leftMouseDown = false; 
    this.rightMouseDown = false;

    document.addEventListener('keydown'   , this.onKeyDown.bind(this));
    document.addEventListener('keyup'     , this.onKeyUp.bind(this));
    document.addEventListener('mouseup'   , this.onMouseUp.bind(this));
    document.addEventListener('mousedown' , this.onMouseDown.bind(this));
    document.addEventListener('mousemove' , FC.lib.rateLimit(this.onMouseMove.bind(this), this.mouseMoveRate));

    this.inputModeView = FC.debug.addElement();
    this.mouseXYView = FC.debug.addElement();
    this.mouseDownView = FC.debug.addElement();
    this.keysDownView = FC.debug.addElement();
    this.keysDirectionsView = FC.debug.addElement();
    this.keyDirectionView = FC.debug.addElement();

  }


  onKeyDown(event) {

    //console.log('FC.input.onKeyDown()');

    var keyCode = (event.keyCode ? event.keyCode : event.which);

    this.keysDown[keyCode] = true;

    this.keysChanged = true;

    this.keysDownView.innerText = 'Keys Down: ' + JSON.stringify(this.keysDown);

  }


  onKeyUp(event) {

    //console.log('FC.input.onKeyUp()');

    var keyCode = (event.keyCode ? event.keyCode : event.which);

    delete this.keysDown[keyCode];

    this.keysChanged = true;

    this.keysDownView.innerText = 'Keys Down: ' + JSON.stringify(this.keysDown);

  }


  onMouseDown(event) {

    this.leftMouseDown = true;
    this.mouseDownView.innerText = 'Mouse Down: true';
  }


  onMouseUp(event) {

    this.leftMouseDown = false;
    this.mouseDownView.innerText = 'Mouse Down:';

  }


  onMouseMove(event) {

    this.lastMouseX = this.mouseX;
    this.lastMouseY = this.mouseY;
    this.mouseX = event.pageX;
    this.mouseY = event.pageY;

    this.mdx = FC.input.mouseX - FC.input.lastMouseX;
    this.mdy = FC.input.mouseY - FC.input.lastMouseY;

    this.mouseMoved = true;

    this.mouseXYView.innerText = 'MouseX: ' + this.mouseX + ', MouseY: ' + this.mouseY;

  }


  _mapKeysPressed(requestTypesMap) {

    let result = [];

    // Cycle through all the keys pressed down and fill
    // "results" with human-readable request type strings.
    for (let keyCode in this.keysDown) {

      // Multiple key codes can map to the same human-readable string value!
      for (let requestTypeName in requestTypesMap) {

        let requestTypeKeyCodes = requestTypesMap[requestTypeName] || [];

        if (requestTypeKeyCodes.includes(keyCode|0)) {
          result.push(requestTypeName);
          break;
        }

      } // end: Cycle request types map

    } // end: Cycle keys pressed

    return result;

  }


  _getComboRequest(combosMap, itemsToMatch) {

    if ( ! itemsToMatch || ! itemsToMatch.length) { return; }

    for ( let comboName in combosMap) {

      let comboMatched = true;
      let comboItems = combosMap[comboName];

      // Check that every combo item is inside the list of items to match.
      for (let i = 0, n = comboItems.length; i < n; i++) {

        let comboItem = comboItems[i];

        // If the combo item is NOT in the list of items to match, we can't
        // match this combo anymore so we can stop checking the rest of the items.
        if ( ! itemsToMatch.includes(comboItem)) {
          comboMatched = false;
          break;
        }

      }

      // If comboMatched == true, we managed to match-up EVERY combo item.
      // We can therefore assume that we positively matched "comboName"!
      // We can also stop testing the remaining combos.
      if (comboMatched) {

        return comboName;

      }

    } // end: Test combos loop

  }


  update(now) {

    this.actionChanged = false;
    this.directionChanged = false;

    if (this.keysChanged) {

      this.keysChanged = false;

      this.actions = this._mapKeysPressed(this.actionsMap);
      this.action = this.actions.length ? this.actions[0] : undefined;

      if (this.action !== this.lastAction) {

        this.actionChanged = true;

      }

      this.directions = this._mapKeysPressed(this.directionsMap);

      //this.direction = this.directions.length === 1 ? this.directions[0] : undefined;

      if (this.directions.length === 1) {

        this.direction = this.directions[0];

      } else if (this.directions.length > 1) {

        let comboDirection = this._getComboRequest(this.directionCombosMap, this.directions);
        if (comboDirection) { this.direction = comboDirection; }

      }

      if (this.direction !== this.lastDirection) {

        this.mode = 'kb';
        this.directionChanged = true;
        this.keyDirectionView.innerText = 'Direction: ' + this.direction;

        console.log('INPUT UPD: Dir Changed! dir =', this.direction, ', lastDir =', this.lastDirection);

      }

      this.keysDirectionsView.innerText = 'Directions: ' + JSON.stringify(this.directions);

    }

    if ( ! this.actionChanged) {

      if (this.action === 'Attack') {

           if ( ! this.leftMouseDown) { this.action = undefined; }

      } else if (this.leftMouseDown) {

        this.action = 'Attack';

      }

    }

    this.inputModeView.innerText = 'Input Mode: ' + this.mode;

  } // end: Input::update()



  afterUpdate(now) {

    this.keyDown = {};
    this.mouseMoved = false;
    this.leftMouseDown = false;
    this.lastDirection = this.direction;

  }


} // end: Input class
