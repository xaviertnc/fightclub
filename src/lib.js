/**
 *
 * FIGHT CLUB - LIB
 *
 * @author: C. Moller
 * @date: 20 December 2017
 *
 * @updated: 05 Feb 2020 (C. Moller)
 *   - Add constructor + game param
 *   - Log on construct
 */

class Lib {

  constructor(game) {

    this.game = game;
    game.log('new Lib()');

  }


  extend(obj, extendWith) {

    if ( ! extendWith) { return; }

    for (let prop in extendWith) {

      if (extendWith.hasOwnProperty(prop)) {

        obj[prop] = extendWith[prop];

      };

    }

  }


  lpad(str,len,pad) {

    if (!pad) { pad = "0"; }

    if (typeof str === "number") { str = str.toString(); }

    if (len > str.length) {

      return new Array(len + 1 - str.length).join(pad) + str;

    } else {

      return str;

    }

  }


  approach(val, limit, increment, touchLimit) {

    let dV = val - limit;

    //this.game.log('Approach val:', val, ', limit:', limit, ', inc:', increment, ', dV:', dV);

    if (dV > 0) {

      if (dV > increment) { return val - increment; }

    } else {

      if (-dV > increment) { return val + increment; }

    }

    return touchLimit ? limit : val;

  }


  intersectRect(r1, r2) {

    return !(r2.x > (r1.x + r1.width) || (r2.x + r2.width) < r1.x ||
      r2.y > (r1.y + r1.height) || (r2.y + r2.height) < r1.y);

  }


  outOfBounds(r1, r2) {

    // r1 == Bounds Rect, r2 = Object Rect
    return r2.x > (r1.x + r1.width - r2.width) || r2.x < r1.x ||
      r2.y > (r1.y + r1.height - r2.height) || r2.y < r1.y;

  }


  getAngleRad(x1, y1, x2, y2) {

    let dx = x2 - x1;
    let dy = y1 - y2;
    let rads = Math.atan2(dy, dx);
    // 'rad' range = 0 to Math.PI (clockwise), 0 to -Math.PI (anti-clockwise)
    return (rads < 0) ? 2*Math.PI + rads : rads; // Fix +- result of Math.atan2()

  }


  getAngle(x1, y1, x2, y2) {

    return (this.getAngleRad(x1, y1, x2, y2) / Math.PI) * 180;

  }


  rateLimit(func, wait, immediate) {

      var delayTimer;

      return function() {

        // If busy with delay, exit.
        if (delayTimer) { return; }

        // If it's the first call and "immediate" is set,
        // don't wait, just run the function and exit.
        if (immediate) {

          // Note: "immediate" is persistent between calls (just like "delayTimer")
          // and will remember its value in future calls. I.e. future calls will be delayed!
          immediate = false;

          return func.apply(context, args);

        }

        let context = this;
        let args = arguments;

        delayTimer = setTimeout(function() {

           delayTimer = false;

           func.apply(context, args);

        }, wait);

      };

  }


  // Get the best timestamp depending on browser capabilities!

  getTime() {

    if(window.performance.now) {

      return window.performance.now();

    } else {

      if(window.performance.webkitNow) {

        return window.performance.webkitNow();

      } else {

        return new window.Date().getTime();

      }

    }

  }


  itemCount(obj) {

    var items = 0;

    for(var key in obj) {

      if (obj.hasOwnProperty(key)) { items++; }

    }

    return items;

  }


  clone(obj) {

    return JSON.parse(JSON.stringify(obj));

  }


  sortObj(object, sortFunc) {

    window.console.log("lib.sortObj(), Start");

    var i, k, rv = [], result = {};

    for (k in object) {

      window.console.log("obj.k="+k);

      if (object.hasOwnProperty(k)) { rv.push({key: k, value:  object[k]}); }

    }

    rv.sort(function(o1, o2) { return sortFunc(o1.key, o2.key); });

    for (i = 0; i < rv.length; i++) { result[rv[i].key] = rv[i].value; }

    return result;

  }


  removeItem(list, val) {

    var i, n = list.length, rlist = [];

    for (i = 0; i < n; i++) {

      if (list[i] !== val) { rlist.push(list[i]); }

    }

    return rlist;

  }


  // jQuery-like DOM Element class manipulation functions...

  getClass(elm) {

    return (elm.getAttribute && elm.getAttribute('class')) || '';

  }


  setClass(elm, cln) {

    return cln ? elm.setAttribute('class', cln) : elm.removeAttribute('class');

  }


  addClass(elm, cln) {

    if (elm.classList) {
      elm.classList.add(cln);
      return;
    }

    let cls = this.getClass(elm);
    let cll = cls.split(' ');
    let rcls = this.removeItem(cll, cln).join(' ');

    if (rcls === cls) {
      this.setClass(elm, rcls ? (rcls + ' ' + cln) : cln);
      return true;
    }

  }


  removeClass(elm, cln) {

    if (elm.classList) {
      return elm.classList.remove(cln);
    }

    let cls = this.getClass(elm);
    let cll = cls.split(' ');
    let rcls = this.removeItem(cll, cln).join(' ');

    if (rcls !== cls) {
      this.setClass(elm, rcls);
      return true;
    }

  }


  toggleClass(elm, cln, state) {

    return state ? this.addClass(elm, cln) : this.removeClass(elm, cln);

  }

} // end: Lib class



// ----------------
// Custom Polyfills
// ----------------

if ( ! Array.prototype.indexOf) { //IE8 does not support "indexOf"

  Array.prototype.indexOf = function(obj, start)
  {
     for (var i = (start || 0), j = this.length; i < j; i++)
     {
       if (this[i] === obj) { return i; }
     }
     return -1;
  };

}


if ( ! Array.prototype.includes) {

  Array.prototype.includes = function(value) {

    for (var i = 0, n = this.length; i < n; i++) {

      if (value === this[i]) { return true; }

    }

  }

}


window.requestAnimationFrame = window.requestAnimationFrame
    || window.mozRequestAnimationFrame
    || window.webkitRequestAnimationFrame
    || window.msRequestAnimationFrame
    || function(f){return setTimeout(f, 1000/60)} // simulate calling code 60


window.cancelAnimationFrame = window.cancelAnimationFrame
    || window.mozCancelAnimationFrame
    || function(requestID){clearTimeout(requestID)} //fall back
