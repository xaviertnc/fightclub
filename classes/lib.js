/*globals window */

class Lib {

  extend(obj, extendWith) {
    
    if ( ! extendWith) { return; }

    for (var prop in extendWith) {

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


  intersectRect(r1, r2) {

    return !(r2.x > (r1.x+r1.width) || (r2.x+r2.width) < r1.x ||
      r2.y > (r1.y+r1.height) || (r2.y+r2.height) < r1.y);

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



if ( ! Array.prototype.indexOf) //IE8 does not support "indexOf"
{

  Array.prototype.indexOf = function(obj, start)
  {
     for (var i = (start || 0), j = this.length; i < j; i++)
     {
       if (this[i] === obj) { return i; }
     }
     return -1;
  };

}
