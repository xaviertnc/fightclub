/*globals window */

if (!Array.prototype.indexOf) //IE8 does not support "indexOf" 
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


window.FC = window.FC || {};


FC.lib = {
    
    extend: function(obj, extendWith)
    {
        var prop;
        for (prop in extendWith) {
            if (typeof extendWith[prop] !== 'undefined') {
                obj[prop] = extendWith[prop];
            };
        }
    },
    
    merge: function(obj, mergeWith)
    {
        var prop, result;
        for (prop in mergeWith) {
            if (typeof mergeWith[prop] !== 'undefined') {
                result[prop] = mergeWith[prop] || obj[prop];
            };
        }
        return result;
    },
    
	lpad: function(str,len,pad)
	{
		if (!pad) { pad = "0"; }
		if (typeof str === "number") { str = str.toString(); }
		if (len > str.length)
		{
			return new Array(len + 1 - str.length).join(pad) + str;
		}
		else
		{
			return str;
		}
	},
	
	intersectRect: function(r1, r2)
	{
		return !(r2.x > (r1.x+r1.width)||
				(r2.x+r2.width) < r1.x ||
				r2.y > (r1.y+r1.height) ||
				(r2.y+r2.height) < r1.y);
	},
	
	getTime: function() //Get the best timestamp depending on browser capabilities!
	{
		if(window.performance.now)
		{
		    return window.performance.now();
		} 
		else
		{
		    if(window.performance.webkitNow)
		    {
		        return window.performance.webkitNow();
		    }
		    else
		    {
		        return new window.Date().getTime();
		    }
		}
	},
	
	count: function(obj)
	{
		var items = 0;
		for(var key in obj)
		{
			if (obj.hasOwnProperty(key)) { items++; }
		}
		return items;
	},
	
	clone: function(obj)
	{
		return JSON.parse(JSON.stringify(obj));
	},
	
	sortObj: function(object, sortFunc)
	{
		window.console.log("lib.sortObj(), Start");
		var rv = [];
		var result = {};

		for(var k in object)
		{
			window.console.log("obj.k="+k);
			if (object.hasOwnProperty(k)) { rv.push({key: k, value:  object[k]}); }
		}

		rv.sort(function(o1, o2) { return sortFunc(o1.key, o2.key); });

		for(var i=0; i < rv.length; i++) { result[rv[i].key] = rv[i].value; }
	  
	  return result;
	},
    
    removeItem: function (list, val) {
        var i, n = list.length, rlist = []; for (i = 0; i < n; i++) { if (list[i] !== val) { rlist.push(list[i]); } }
        return rlist;
    },
//    
//    getClass: function (elm) { return (elm.getAttribute && elm.getAttribute('class')) || ''; },
//    
      setClass: function (elm, cln) { return cln ? elm.setAttribute('class', cln) : elm.removeAttribute('class'); }
//    
//    addClass: function (elm, cln) {
//        if (elm.classList) { elm.classList.add(cln); return; }
//        var cls = this.getClass(elm), cll = cls.split(' '), rcls = this.removeItem(cll, cln).join(' ');
//        if (rcls === cls) { this.setClass(elm, rcls ? (rcls + ' ' + cln) : cln); return true; }
//    },
//    
//    removeClass: function (elm, cln) { if (elm.classList) { return elm.classList.remove(cln); }
//        var cls = this.getClass(elm), cll = cls.split(' '), rcls = this.removeItem(cll, cln).join(' ');
//        if (rcls !== cls) { this.setClass(elm, rcls); return true;  }
//    },
//    
//    toggleClass: function (elm, cln, state) { return state ? this.addClass(elm, cln) : this.removeClass(elm, cln); } 

};