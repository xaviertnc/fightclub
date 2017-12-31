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

    this.lastX = 0;
    this.lastY = 0;

    this.actions = [];
    this.directions = [];

    this.action = undefined;
    this.direction = undefined;
    this.lastAction = undefined;
    this.lastDirection = undefined;

    this.actionChanged = false;
    this.directionChanged = false;

    this.actionsMap = {
      'Attack'  : [17], // Left Ctrl
      'Exit'    : [27], // Escape
      'Pause'   : [32]  // Space
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

    this.leftMouseDown = false;
    this.rightMouseDown = false;

    this.mouseX = 0;
    this.mouseY = 0;
    this.mouseMoveRate = 60; // ms

    this.needsUpdate = false;

    document.addEventListener('keydown'   , this.onKeyDown.bind(this));
    document.addEventListener('keyup'     , this.onKeyUp.bind(this));
    document.addEventListener('mouseup'   , this.onMouseUp);
    document.addEventListener('mousedown' , this.onMouseDown);
    document.addEventListener('mousemove' , FC.lib.rateLimit(this.onMouseMove.bind(this), this.mouseMoveRate));

    this.mouseXYView = FC.debug.addElement();
    this.keysDownView = FC.debug.addElement();

    this.keysDirectionsView = FC.debug.addElement();
    this.keyDirectionView = FC.debug.addElement();

  }


  onKeyDown(event) {

    //console.log('FC.input.onKeyDown()');

    var keyCode = (event.keyCode ? event.keyCode : event.which);

    this.keysDown[keyCode] = true;

    this.needsUpdate = true;

    this.keysDownView.innerText = 'Keys Down: ' + JSON.stringify(this.keysDown);

  }


  onKeyUp(event) {

    //console.log('FC.input.onKeyUp()');

    var keyCode = (event.keyCode ? event.keyCode : event.which);

    delete this.keysDown[keyCode];

    this.needsUpdate = true;

    this.keysDownView.innerText = 'Keys Down: ' + JSON.stringify(this.keysDown);  

  }


  onMouseDown(event) {

    console.log('FC.input.onMouseDown()');
    event.preventDefault();

  }


  onMouseUp(event) {

    console.log('FC.input.onMouseUp()');
    event.preventDefault();

  }


  onMouseMove(event) {

    this.mouseX = event.pageX;
    this.mouseY = event.pageY;

    this.mouseXYView.innerText = 'MouseX: ' + this.mouseX + ', MouseY: ' + this.mouseY;

    //console.log('FC.input.onMouseMove(), mouseXY:', this.mouseX, this.mouseY, event);

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


  update() {

    this.actionChanged = false;
    this.directionChanged = false;

    if (this.needsUpdate) {

      this.needsUpdate = false;

      this.actions = this._mapKeysPressed(this.actionsMap);
      this.action = this.actions.length ? this.actions[0] : undefined;

      if (this.action !== this.lastAction) {

        this.actionChanged = true;

      }

      this.directions = this._mapKeysPressed(this.directionsMap);
      this.direction = this.directions.length === 1 ? this.directions[0] : undefined;

      if ( ! this.direction) {

        this.direction = this._getComboRequest(this.directionCombosMap, this.directions);

      }

      if (this.direction !== this.lastDirection) {

        this.directionChanged = true;

      }

      this.keysDirectionsView.innerText = 'Directions: ' + JSON.stringify(this.directions);
      this.keyDirectionView.innerText = 'Direction: ' + this.direction;

    }

    //if (this.action) { console.log('Input::update(), action =', this.action); }
    //if (this.direction) { console.log('Input::update(), direction =', this.direction); }

    this.keyDown = {};

  } // end: Input::update()


} // end: Input class
