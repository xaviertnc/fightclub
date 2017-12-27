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
      'Attack'  : [17],
      'Exit'    : [27],
      'Pause'   : [32]
    };

    this.directionsMap = {
      'Up'      : [38],
      'Down'    : [40],
      'Left'    : [37],
      'Right'   : [39]
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

    this.needsUpdate = false;

    document.addEventListener('keydown'   , this.onKeyDown.bind(this));
    document.addEventListener('keyup'     , this.onKeyUp.bind(this));
    document.addEventListener('mouseup'   , this.onMouseUp.bind(this));
    document.addEventListener('mousedown' , this.onMouseDown.bind(this));

  }


  onKeyDown(event) {

    //console.log('FC.input.onKeyDown()');

    var keyCode = (event.keyCode ? event.keyCode : event.which);

    // Clear state when we release the key.
    this.keysDown[keyCode] = true;

    this.needsUpdate = true;

  }


  onKeyUp(event) {

    //console.log('FC.input.onKeyUp()');

    var keyCode = (event.keyCode ? event.keyCode : event.which);

    delete this.keysDown[keyCode];

    this.needsUpdate = true;

  }


  onMouseDown(event) {

    console.log('FC.input.onMouseDown()');
    event.preventDefault();

  }


  onMouseUp(event) {

    console.log('FC.input.onMouseUp()');
    event.preventDefault();

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

    }

    //if (this.action) { console.log('Input::update(), action =', this.action); }
    if (this.direction) { console.log('Input::update(), direction =', this.direction); }

  } // end: Input::update()


} // end: Input class
