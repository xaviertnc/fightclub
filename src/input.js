/**
 *
 * FIGHT CLUB - INPUT SERVICE
 *
 * @author: C. Moller
 * @date: 26 December 2017
 *
 * @update: C. Moller - 05 Feb 2020
 *   - Rename from Input to InputService
 *   - Add "game" to constructor params
 *   - Add init(), mount() + Refactor
 *   - Totally refactor debug views. Use "updateDebugView"
 *   - Add "debugView" and "rateLimit" shorthand props
 *
 * @update: C. Moller - 08 Feb 2020
 *   - Refactor constructor(), init(), build() and mount() again.
 *   - Replace "updateDebugView" with "debugView.mountChild()"
 *
 */

class InputService {


  constructor() {

    FC.log('New InputService()');

  }


  init(gameEngine) {

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

    this.elm = null;

    // Debug views
    this.elDispInputMode  = null;
    this.elDispMouseXY    = null;
    this.elDispMouseDown  = null;
    this.elDispKeysDown   = null;
    this.elDispDirections = null;
    this.elDispDirection  = null;

    // Shortcuts
    this.log = gameEngine.log;
    this.rateLimit = gameEngine.lib.rateLimit;
    this.debugView = gameEngine.debugView;

    gameEngine.log('InputService.init() - Done');

  }


  mount(targetElm) {

    this.elm = targetElm || document;

    this.elm.addEventListener('keydown'   , this.onKeyDown.bind(this));
    this.elm.addEventListener('keyup'     , this.onKeyUp.bind(this));
    this.elm.addEventListener('mouseup'   , this.onMouseUp.bind(this));
    this.elm.addEventListener('mousedown' , this.onMouseDown.bind(this));
    this.elm.addEventListener('mousemove' , this.rateLimit(this.onMouseMove.bind(this), this.mouseMoveRate));

    this.elDispInputMode  = this.debugView.mountChild('input_mode');
    this.elDispMouseXY    = this.debugView.mountChild('mouse_xy'  );
    this.elDispMouseDown  = this.debugView.mountChild('mouse_down');
    this.elDispKeysDown   = this.debugView.mountChild('keys_down' );
    this.elDispDirections = this.debugView.mountChild('directions');
    this.elDispDirection  = this.debugView.mountChild('direction' );

    this.log('InputService.mount() Debug View:', this.debugView);

    this.log('InputService.mount() - Done', this);

    return this;

  }


  onKeyDown(event) {

    //this.log('Input.onKeyDown()');

    var keyCode = (event.keyCode ? event.keyCode : event.which);

    this.keysDown[keyCode] = true;

    this.keysChanged = true;

    this.elDispKeysDown.innerText = 'Keys Down: ' + JSON.stringify(this.keysDown);

  }


  onKeyUp(event) {

    //this.log('Input.onKeyUp()');

    var keyCode = (event.keyCode ? event.keyCode : event.which);

    delete this.keysDown[keyCode];

    this.keysChanged = true;

    this.elDispKeysDown.innerText = 'Keys Down: ' + JSON.stringify(this.keysDown);

  }


  onMouseDown(event) {

    this.mode = 'mouse';
    this.leftMouseDown = true;
    this.elDispMouseDown.innerText = 'Mouse Down: true';
  }


  onMouseUp(event) {

    this.leftMouseDown = false;
    this.elDispMouseDown.innerText = 'Mouse Down:';

  }


  onMouseMove(event) {

    this.lastMouseX = this.mouseX;
    this.lastMouseY = this.mouseY;
    this.mouseX = event.pageX;
    this.mouseY = event.pageY;

    this.mdx = this.mouseX - this.lastMouseX;
    this.mdy = this.mouseY - this.lastMouseY;

    this.mouseMoved = true;

    this.elDispMouseXY.innerText = 'MouseX: ' + this.mouseX + ', MouseY: ' + this.mouseY;

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

      } // End: Cycle request types map

    } // End: Cycle keys pressed

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

    } // End: Test combos loop

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
        this.elDispDirection.innerText = 'Direction: ' + this.direction;

        //this.log('INPUT UPD: Dir Changed! dir =', this.direction, ', lastDir =', this.lastDirection);

      }

      this.elDispDirections.innerText = 'Directions: ' + JSON.stringify(this.directions);

    }

    if ( ! this.actionChanged) {

      if (this.action === 'Attack') {

           if ( ! this.leftMouseDown) { this.action = undefined; }

      } else if (this.leftMouseDown) {

        this.action = 'Attack';

      }

    }

    this.elDispInputMode.innerText = 'Input Mode: ' + this.mode;

  } // End: Input::update()



  afterUpdate(now) {

    this.mouseMoved = false;
    this.leftMouseDown = false;
    this.lastDirection = this.direction;

  }


} // End: Input Class
