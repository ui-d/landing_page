// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles

// eslint-disable-next-line no-global-assign
parcelRequire = (function (modules, cache, entry, globalName) {
  // Save the require from previous bundle to this closure if any
  var previousRequire = typeof parcelRequire === 'function' && parcelRequire;
  var nodeRequire = typeof require === 'function' && require;

  function newRequire(name, jumped) {
    if (!cache[name]) {
      if (!modules[name]) {
        // if we cannot find the module within our internal map or
        // cache jump to the current global require ie. the last bundle
        // that was added to the page.
        var currentRequire = typeof parcelRequire === 'function' && parcelRequire;
        if (!jumped && currentRequire) {
          return currentRequire(name, true);
        }

        // If there are other bundles on this page the require from the
        // previous one is saved to 'previousRequire'. Repeat this as
        // many times as there are bundles until the module is found or
        // we exhaust the require chain.
        if (previousRequire) {
          return previousRequire(name, true);
        }

        // Try the node require function if it exists.
        if (nodeRequire && typeof name === 'string') {
          return nodeRequire(name);
        }

        var err = new Error('Cannot find module \'' + name + '\'');
        err.code = 'MODULE_NOT_FOUND';
        throw err;
      }

      localRequire.resolve = resolve;
      localRequire.cache = {};

      var module = cache[name] = new newRequire.Module(name);

      modules[name][0].call(module.exports, localRequire, module, module.exports, this);
    }

    return cache[name].exports;

    function localRequire(x){
      return newRequire(localRequire.resolve(x));
    }

    function resolve(x){
      return modules[name][1][x] || x;
    }
  }

  function Module(moduleName) {
    this.id = moduleName;
    this.bundle = newRequire;
    this.exports = {};
  }

  newRequire.isParcelRequire = true;
  newRequire.Module = Module;
  newRequire.modules = modules;
  newRequire.cache = cache;
  newRequire.parent = previousRequire;
  newRequire.register = function (id, exports) {
    modules[id] = [function (require, module) {
      module.exports = exports;
    }, {}];
  };

  for (var i = 0; i < entry.length; i++) {
    newRequire(entry[i]);
  }

  if (entry.length) {
    // Expose entry point to Node, AMD or browser globals
    // Based on https://github.com/ForbesLindesay/umd/blob/master/template.js
    var mainExports = newRequire(entry[entry.length - 1]);

    // CommonJS
    if (typeof exports === "object" && typeof module !== "undefined") {
      module.exports = mainExports;

    // RequireJS
    } else if (typeof define === "function" && define.amd) {
     define(function () {
       return mainExports;
     });

    // <script>
    } else if (globalName) {
      this[globalName] = mainExports;
    }
  }

  // Override the current require with this new one
  return newRequire;
})({"node_modules/core-js/modules/_global.js":[function(require,module,exports) {

// https://github.com/zloirock/core-js/issues/86#issuecomment-115759028
var global = module.exports = typeof window != 'undefined' && window.Math == Math
  ? window : typeof self != 'undefined' && self.Math == Math ? self
  // eslint-disable-next-line no-new-func
  : Function('return this')();
if (typeof __g == 'number') __g = global; // eslint-disable-line no-undef

},{}],"node_modules/core-js/modules/_has.js":[function(require,module,exports) {
var hasOwnProperty = {}.hasOwnProperty;
module.exports = function (it, key) {
  return hasOwnProperty.call(it, key);
};

},{}],"node_modules/core-js/modules/_fails.js":[function(require,module,exports) {
module.exports = function (exec) {
  try {
    return !!exec();
  } catch (e) {
    return true;
  }
};

},{}],"node_modules/core-js/modules/_descriptors.js":[function(require,module,exports) {
// Thank's IE8 for his funny defineProperty
module.exports = !require('./_fails')(function () {
  return Object.defineProperty({}, 'a', { get: function () { return 7; } }).a != 7;
});

},{"./_fails":"node_modules/core-js/modules/_fails.js"}],"node_modules/core-js/modules/_core.js":[function(require,module,exports) {
var core = module.exports = { version: '2.6.0' };
if (typeof __e == 'number') __e = core; // eslint-disable-line no-undef

},{}],"node_modules/core-js/modules/_is-object.js":[function(require,module,exports) {
module.exports = function (it) {
  return typeof it === 'object' ? it !== null : typeof it === 'function';
};

},{}],"node_modules/core-js/modules/_an-object.js":[function(require,module,exports) {
var isObject = require('./_is-object');
module.exports = function (it) {
  if (!isObject(it)) throw TypeError(it + ' is not an object!');
  return it;
};

},{"./_is-object":"node_modules/core-js/modules/_is-object.js"}],"node_modules/core-js/modules/_dom-create.js":[function(require,module,exports) {
var isObject = require('./_is-object');
var document = require('./_global').document;
// typeof document.createElement is 'object' in old IE
var is = isObject(document) && isObject(document.createElement);
module.exports = function (it) {
  return is ? document.createElement(it) : {};
};

},{"./_is-object":"node_modules/core-js/modules/_is-object.js","./_global":"node_modules/core-js/modules/_global.js"}],"node_modules/core-js/modules/_ie8-dom-define.js":[function(require,module,exports) {
module.exports = !require('./_descriptors') && !require('./_fails')(function () {
  return Object.defineProperty(require('./_dom-create')('div'), 'a', { get: function () { return 7; } }).a != 7;
});

},{"./_descriptors":"node_modules/core-js/modules/_descriptors.js","./_fails":"node_modules/core-js/modules/_fails.js","./_dom-create":"node_modules/core-js/modules/_dom-create.js"}],"node_modules/core-js/modules/_to-primitive.js":[function(require,module,exports) {
// 7.1.1 ToPrimitive(input [, PreferredType])
var isObject = require('./_is-object');
// instead of the ES6 spec version, we didn't implement @@toPrimitive case
// and the second argument - flag - preferred type is a string
module.exports = function (it, S) {
  if (!isObject(it)) return it;
  var fn, val;
  if (S && typeof (fn = it.toString) == 'function' && !isObject(val = fn.call(it))) return val;
  if (typeof (fn = it.valueOf) == 'function' && !isObject(val = fn.call(it))) return val;
  if (!S && typeof (fn = it.toString) == 'function' && !isObject(val = fn.call(it))) return val;
  throw TypeError("Can't convert object to primitive value");
};

},{"./_is-object":"node_modules/core-js/modules/_is-object.js"}],"node_modules/core-js/modules/_object-dp.js":[function(require,module,exports) {
var anObject = require('./_an-object');
var IE8_DOM_DEFINE = require('./_ie8-dom-define');
var toPrimitive = require('./_to-primitive');
var dP = Object.defineProperty;

exports.f = require('./_descriptors') ? Object.defineProperty : function defineProperty(O, P, Attributes) {
  anObject(O);
  P = toPrimitive(P, true);
  anObject(Attributes);
  if (IE8_DOM_DEFINE) try {
    return dP(O, P, Attributes);
  } catch (e) { /* empty */ }
  if ('get' in Attributes || 'set' in Attributes) throw TypeError('Accessors not supported!');
  if ('value' in Attributes) O[P] = Attributes.value;
  return O;
};

},{"./_an-object":"node_modules/core-js/modules/_an-object.js","./_ie8-dom-define":"node_modules/core-js/modules/_ie8-dom-define.js","./_to-primitive":"node_modules/core-js/modules/_to-primitive.js","./_descriptors":"node_modules/core-js/modules/_descriptors.js"}],"node_modules/core-js/modules/_property-desc.js":[function(require,module,exports) {
module.exports = function (bitmap, value) {
  return {
    enumerable: !(bitmap & 1),
    configurable: !(bitmap & 2),
    writable: !(bitmap & 4),
    value: value
  };
};

},{}],"node_modules/core-js/modules/_hide.js":[function(require,module,exports) {
var dP = require('./_object-dp');
var createDesc = require('./_property-desc');
module.exports = require('./_descriptors') ? function (object, key, value) {
  return dP.f(object, key, createDesc(1, value));
} : function (object, key, value) {
  object[key] = value;
  return object;
};

},{"./_object-dp":"node_modules/core-js/modules/_object-dp.js","./_property-desc":"node_modules/core-js/modules/_property-desc.js","./_descriptors":"node_modules/core-js/modules/_descriptors.js"}],"node_modules/core-js/modules/_uid.js":[function(require,module,exports) {
var id = 0;
var px = Math.random();
module.exports = function (key) {
  return 'Symbol('.concat(key === undefined ? '' : key, ')_', (++id + px).toString(36));
};

},{}],"node_modules/core-js/modules/_redefine.js":[function(require,module,exports) {

var global = require('./_global');
var hide = require('./_hide');
var has = require('./_has');
var SRC = require('./_uid')('src');
var TO_STRING = 'toString';
var $toString = Function[TO_STRING];
var TPL = ('' + $toString).split(TO_STRING);

require('./_core').inspectSource = function (it) {
  return $toString.call(it);
};

(module.exports = function (O, key, val, safe) {
  var isFunction = typeof val == 'function';
  if (isFunction) has(val, 'name') || hide(val, 'name', key);
  if (O[key] === val) return;
  if (isFunction) has(val, SRC) || hide(val, SRC, O[key] ? '' + O[key] : TPL.join(String(key)));
  if (O === global) {
    O[key] = val;
  } else if (!safe) {
    delete O[key];
    hide(O, key, val);
  } else if (O[key]) {
    O[key] = val;
  } else {
    hide(O, key, val);
  }
// add fake Function#toString for correct work wrapped methods / constructors with methods like LoDash isNative
})(Function.prototype, TO_STRING, function toString() {
  return typeof this == 'function' && this[SRC] || $toString.call(this);
});

},{"./_global":"node_modules/core-js/modules/_global.js","./_hide":"node_modules/core-js/modules/_hide.js","./_has":"node_modules/core-js/modules/_has.js","./_uid":"node_modules/core-js/modules/_uid.js","./_core":"node_modules/core-js/modules/_core.js"}],"node_modules/core-js/modules/_a-function.js":[function(require,module,exports) {
module.exports = function (it) {
  if (typeof it != 'function') throw TypeError(it + ' is not a function!');
  return it;
};

},{}],"node_modules/core-js/modules/_ctx.js":[function(require,module,exports) {
// optional / simple context binding
var aFunction = require('./_a-function');
module.exports = function (fn, that, length) {
  aFunction(fn);
  if (that === undefined) return fn;
  switch (length) {
    case 1: return function (a) {
      return fn.call(that, a);
    };
    case 2: return function (a, b) {
      return fn.call(that, a, b);
    };
    case 3: return function (a, b, c) {
      return fn.call(that, a, b, c);
    };
  }
  return function (/* ...args */) {
    return fn.apply(that, arguments);
  };
};

},{"./_a-function":"node_modules/core-js/modules/_a-function.js"}],"node_modules/core-js/modules/_export.js":[function(require,module,exports) {

var global = require('./_global');
var core = require('./_core');
var hide = require('./_hide');
var redefine = require('./_redefine');
var ctx = require('./_ctx');
var PROTOTYPE = 'prototype';

var $export = function (type, name, source) {
  var IS_FORCED = type & $export.F;
  var IS_GLOBAL = type & $export.G;
  var IS_STATIC = type & $export.S;
  var IS_PROTO = type & $export.P;
  var IS_BIND = type & $export.B;
  var target = IS_GLOBAL ? global : IS_STATIC ? global[name] || (global[name] = {}) : (global[name] || {})[PROTOTYPE];
  var exports = IS_GLOBAL ? core : core[name] || (core[name] = {});
  var expProto = exports[PROTOTYPE] || (exports[PROTOTYPE] = {});
  var key, own, out, exp;
  if (IS_GLOBAL) source = name;
  for (key in source) {
    // contains in native
    own = !IS_FORCED && target && target[key] !== undefined;
    // export native or passed
    out = (own ? target : source)[key];
    // bind timers to global for call from export context
    exp = IS_BIND && own ? ctx(out, global) : IS_PROTO && typeof out == 'function' ? ctx(Function.call, out) : out;
    // extend global
    if (target) redefine(target, key, out, type & $export.U);
    // export
    if (exports[key] != out) hide(exports, key, exp);
    if (IS_PROTO && expProto[key] != out) expProto[key] = out;
  }
};
global.core = core;
// type bitmap
$export.F = 1;   // forced
$export.G = 2;   // global
$export.S = 4;   // static
$export.P = 8;   // proto
$export.B = 16;  // bind
$export.W = 32;  // wrap
$export.U = 64;  // safe
$export.R = 128; // real proto method for `library`
module.exports = $export;

},{"./_global":"node_modules/core-js/modules/_global.js","./_core":"node_modules/core-js/modules/_core.js","./_hide":"node_modules/core-js/modules/_hide.js","./_redefine":"node_modules/core-js/modules/_redefine.js","./_ctx":"node_modules/core-js/modules/_ctx.js"}],"node_modules/core-js/modules/_meta.js":[function(require,module,exports) {
var META = require('./_uid')('meta');
var isObject = require('./_is-object');
var has = require('./_has');
var setDesc = require('./_object-dp').f;
var id = 0;
var isExtensible = Object.isExtensible || function () {
  return true;
};
var FREEZE = !require('./_fails')(function () {
  return isExtensible(Object.preventExtensions({}));
});
var setMeta = function (it) {
  setDesc(it, META, { value: {
    i: 'O' + ++id, // object ID
    w: {}          // weak collections IDs
  } });
};
var fastKey = function (it, create) {
  // return primitive with prefix
  if (!isObject(it)) return typeof it == 'symbol' ? it : (typeof it == 'string' ? 'S' : 'P') + it;
  if (!has(it, META)) {
    // can't set metadata to uncaught frozen object
    if (!isExtensible(it)) return 'F';
    // not necessary to add metadata
    if (!create) return 'E';
    // add missing metadata
    setMeta(it);
  // return object ID
  } return it[META].i;
};
var getWeak = function (it, create) {
  if (!has(it, META)) {
    // can't set metadata to uncaught frozen object
    if (!isExtensible(it)) return true;
    // not necessary to add metadata
    if (!create) return false;
    // add missing metadata
    setMeta(it);
  // return hash weak collections IDs
  } return it[META].w;
};
// add metadata on freeze-family methods calling
var onFreeze = function (it) {
  if (FREEZE && meta.NEED && isExtensible(it) && !has(it, META)) setMeta(it);
  return it;
};
var meta = module.exports = {
  KEY: META,
  NEED: false,
  fastKey: fastKey,
  getWeak: getWeak,
  onFreeze: onFreeze
};

},{"./_uid":"node_modules/core-js/modules/_uid.js","./_is-object":"node_modules/core-js/modules/_is-object.js","./_has":"node_modules/core-js/modules/_has.js","./_object-dp":"node_modules/core-js/modules/_object-dp.js","./_fails":"node_modules/core-js/modules/_fails.js"}],"node_modules/core-js/modules/_library.js":[function(require,module,exports) {
module.exports = false;

},{}],"node_modules/core-js/modules/_shared.js":[function(require,module,exports) {

var core = require('./_core');
var global = require('./_global');
var SHARED = '__core-js_shared__';
var store = global[SHARED] || (global[SHARED] = {});

(module.exports = function (key, value) {
  return store[key] || (store[key] = value !== undefined ? value : {});
})('versions', []).push({
  version: core.version,
  mode: require('./_library') ? 'pure' : 'global',
  copyright: '© 2018 Denis Pushkarev (zloirock.ru)'
});

},{"./_core":"node_modules/core-js/modules/_core.js","./_global":"node_modules/core-js/modules/_global.js","./_library":"node_modules/core-js/modules/_library.js"}],"node_modules/core-js/modules/_wks.js":[function(require,module,exports) {
var store = require('./_shared')('wks');
var uid = require('./_uid');
var Symbol = require('./_global').Symbol;
var USE_SYMBOL = typeof Symbol == 'function';

var $exports = module.exports = function (name) {
  return store[name] || (store[name] =
    USE_SYMBOL && Symbol[name] || (USE_SYMBOL ? Symbol : uid)('Symbol.' + name));
};

$exports.store = store;

},{"./_shared":"node_modules/core-js/modules/_shared.js","./_uid":"node_modules/core-js/modules/_uid.js","./_global":"node_modules/core-js/modules/_global.js"}],"node_modules/core-js/modules/_set-to-string-tag.js":[function(require,module,exports) {
var def = require('./_object-dp').f;
var has = require('./_has');
var TAG = require('./_wks')('toStringTag');

module.exports = function (it, tag, stat) {
  if (it && !has(it = stat ? it : it.prototype, TAG)) def(it, TAG, { configurable: true, value: tag });
};

},{"./_object-dp":"node_modules/core-js/modules/_object-dp.js","./_has":"node_modules/core-js/modules/_has.js","./_wks":"node_modules/core-js/modules/_wks.js"}],"node_modules/core-js/modules/_wks-ext.js":[function(require,module,exports) {
exports.f = require('./_wks');

},{"./_wks":"node_modules/core-js/modules/_wks.js"}],"node_modules/core-js/modules/_wks-define.js":[function(require,module,exports) {

var global = require('./_global');
var core = require('./_core');
var LIBRARY = require('./_library');
var wksExt = require('./_wks-ext');
var defineProperty = require('./_object-dp').f;
module.exports = function (name) {
  var $Symbol = core.Symbol || (core.Symbol = LIBRARY ? {} : global.Symbol || {});
  if (name.charAt(0) != '_' && !(name in $Symbol)) defineProperty($Symbol, name, { value: wksExt.f(name) });
};

},{"./_global":"node_modules/core-js/modules/_global.js","./_core":"node_modules/core-js/modules/_core.js","./_library":"node_modules/core-js/modules/_library.js","./_wks-ext":"node_modules/core-js/modules/_wks-ext.js","./_object-dp":"node_modules/core-js/modules/_object-dp.js"}],"node_modules/core-js/modules/_cof.js":[function(require,module,exports) {
var toString = {}.toString;

module.exports = function (it) {
  return toString.call(it).slice(8, -1);
};

},{}],"node_modules/core-js/modules/_iobject.js":[function(require,module,exports) {
// fallback for non-array-like ES3 and non-enumerable old V8 strings
var cof = require('./_cof');
// eslint-disable-next-line no-prototype-builtins
module.exports = Object('z').propertyIsEnumerable(0) ? Object : function (it) {
  return cof(it) == 'String' ? it.split('') : Object(it);
};

},{"./_cof":"node_modules/core-js/modules/_cof.js"}],"node_modules/core-js/modules/_defined.js":[function(require,module,exports) {
// 7.2.1 RequireObjectCoercible(argument)
module.exports = function (it) {
  if (it == undefined) throw TypeError("Can't call method on  " + it);
  return it;
};

},{}],"node_modules/core-js/modules/_to-iobject.js":[function(require,module,exports) {
// to indexed object, toObject with fallback for non-array-like ES3 strings
var IObject = require('./_iobject');
var defined = require('./_defined');
module.exports = function (it) {
  return IObject(defined(it));
};

},{"./_iobject":"node_modules/core-js/modules/_iobject.js","./_defined":"node_modules/core-js/modules/_defined.js"}],"node_modules/core-js/modules/_to-integer.js":[function(require,module,exports) {
// 7.1.4 ToInteger
var ceil = Math.ceil;
var floor = Math.floor;
module.exports = function (it) {
  return isNaN(it = +it) ? 0 : (it > 0 ? floor : ceil)(it);
};

},{}],"node_modules/core-js/modules/_to-length.js":[function(require,module,exports) {
// 7.1.15 ToLength
var toInteger = require('./_to-integer');
var min = Math.min;
module.exports = function (it) {
  return it > 0 ? min(toInteger(it), 0x1fffffffffffff) : 0; // pow(2, 53) - 1 == 9007199254740991
};

},{"./_to-integer":"node_modules/core-js/modules/_to-integer.js"}],"node_modules/core-js/modules/_to-absolute-index.js":[function(require,module,exports) {
var toInteger = require('./_to-integer');
var max = Math.max;
var min = Math.min;
module.exports = function (index, length) {
  index = toInteger(index);
  return index < 0 ? max(index + length, 0) : min(index, length);
};

},{"./_to-integer":"node_modules/core-js/modules/_to-integer.js"}],"node_modules/core-js/modules/_array-includes.js":[function(require,module,exports) {
// false -> Array#indexOf
// true  -> Array#includes
var toIObject = require('./_to-iobject');
var toLength = require('./_to-length');
var toAbsoluteIndex = require('./_to-absolute-index');
module.exports = function (IS_INCLUDES) {
  return function ($this, el, fromIndex) {
    var O = toIObject($this);
    var length = toLength(O.length);
    var index = toAbsoluteIndex(fromIndex, length);
    var value;
    // Array#includes uses SameValueZero equality algorithm
    // eslint-disable-next-line no-self-compare
    if (IS_INCLUDES && el != el) while (length > index) {
      value = O[index++];
      // eslint-disable-next-line no-self-compare
      if (value != value) return true;
    // Array#indexOf ignores holes, Array#includes - not
    } else for (;length > index; index++) if (IS_INCLUDES || index in O) {
      if (O[index] === el) return IS_INCLUDES || index || 0;
    } return !IS_INCLUDES && -1;
  };
};

},{"./_to-iobject":"node_modules/core-js/modules/_to-iobject.js","./_to-length":"node_modules/core-js/modules/_to-length.js","./_to-absolute-index":"node_modules/core-js/modules/_to-absolute-index.js"}],"node_modules/core-js/modules/_shared-key.js":[function(require,module,exports) {
var shared = require('./_shared')('keys');
var uid = require('./_uid');
module.exports = function (key) {
  return shared[key] || (shared[key] = uid(key));
};

},{"./_shared":"node_modules/core-js/modules/_shared.js","./_uid":"node_modules/core-js/modules/_uid.js"}],"node_modules/core-js/modules/_object-keys-internal.js":[function(require,module,exports) {
var has = require('./_has');
var toIObject = require('./_to-iobject');
var arrayIndexOf = require('./_array-includes')(false);
var IE_PROTO = require('./_shared-key')('IE_PROTO');

module.exports = function (object, names) {
  var O = toIObject(object);
  var i = 0;
  var result = [];
  var key;
  for (key in O) if (key != IE_PROTO) has(O, key) && result.push(key);
  // Don't enum bug & hidden keys
  while (names.length > i) if (has(O, key = names[i++])) {
    ~arrayIndexOf(result, key) || result.push(key);
  }
  return result;
};

},{"./_has":"node_modules/core-js/modules/_has.js","./_to-iobject":"node_modules/core-js/modules/_to-iobject.js","./_array-includes":"node_modules/core-js/modules/_array-includes.js","./_shared-key":"node_modules/core-js/modules/_shared-key.js"}],"node_modules/core-js/modules/_enum-bug-keys.js":[function(require,module,exports) {
// IE 8- don't enum bug keys
module.exports = (
  'constructor,hasOwnProperty,isPrototypeOf,propertyIsEnumerable,toLocaleString,toString,valueOf'
).split(',');

},{}],"node_modules/core-js/modules/_object-keys.js":[function(require,module,exports) {
// 19.1.2.14 / 15.2.3.14 Object.keys(O)
var $keys = require('./_object-keys-internal');
var enumBugKeys = require('./_enum-bug-keys');

module.exports = Object.keys || function keys(O) {
  return $keys(O, enumBugKeys);
};

},{"./_object-keys-internal":"node_modules/core-js/modules/_object-keys-internal.js","./_enum-bug-keys":"node_modules/core-js/modules/_enum-bug-keys.js"}],"node_modules/core-js/modules/_object-gops.js":[function(require,module,exports) {
exports.f = Object.getOwnPropertySymbols;

},{}],"node_modules/core-js/modules/_object-pie.js":[function(require,module,exports) {
exports.f = {}.propertyIsEnumerable;

},{}],"node_modules/core-js/modules/_enum-keys.js":[function(require,module,exports) {
// all enumerable object keys, includes symbols
var getKeys = require('./_object-keys');
var gOPS = require('./_object-gops');
var pIE = require('./_object-pie');
module.exports = function (it) {
  var result = getKeys(it);
  var getSymbols = gOPS.f;
  if (getSymbols) {
    var symbols = getSymbols(it);
    var isEnum = pIE.f;
    var i = 0;
    var key;
    while (symbols.length > i) if (isEnum.call(it, key = symbols[i++])) result.push(key);
  } return result;
};

},{"./_object-keys":"node_modules/core-js/modules/_object-keys.js","./_object-gops":"node_modules/core-js/modules/_object-gops.js","./_object-pie":"node_modules/core-js/modules/_object-pie.js"}],"node_modules/core-js/modules/_is-array.js":[function(require,module,exports) {
// 7.2.2 IsArray(argument)
var cof = require('./_cof');
module.exports = Array.isArray || function isArray(arg) {
  return cof(arg) == 'Array';
};

},{"./_cof":"node_modules/core-js/modules/_cof.js"}],"node_modules/core-js/modules/_object-dps.js":[function(require,module,exports) {
var dP = require('./_object-dp');
var anObject = require('./_an-object');
var getKeys = require('./_object-keys');

module.exports = require('./_descriptors') ? Object.defineProperties : function defineProperties(O, Properties) {
  anObject(O);
  var keys = getKeys(Properties);
  var length = keys.length;
  var i = 0;
  var P;
  while (length > i) dP.f(O, P = keys[i++], Properties[P]);
  return O;
};

},{"./_object-dp":"node_modules/core-js/modules/_object-dp.js","./_an-object":"node_modules/core-js/modules/_an-object.js","./_object-keys":"node_modules/core-js/modules/_object-keys.js","./_descriptors":"node_modules/core-js/modules/_descriptors.js"}],"node_modules/core-js/modules/_html.js":[function(require,module,exports) {
var document = require('./_global').document;
module.exports = document && document.documentElement;

},{"./_global":"node_modules/core-js/modules/_global.js"}],"node_modules/core-js/modules/_object-create.js":[function(require,module,exports) {
// 19.1.2.2 / 15.2.3.5 Object.create(O [, Properties])
var anObject = require('./_an-object');
var dPs = require('./_object-dps');
var enumBugKeys = require('./_enum-bug-keys');
var IE_PROTO = require('./_shared-key')('IE_PROTO');
var Empty = function () { /* empty */ };
var PROTOTYPE = 'prototype';

// Create object with fake `null` prototype: use iframe Object with cleared prototype
var createDict = function () {
  // Thrash, waste and sodomy: IE GC bug
  var iframe = require('./_dom-create')('iframe');
  var i = enumBugKeys.length;
  var lt = '<';
  var gt = '>';
  var iframeDocument;
  iframe.style.display = 'none';
  require('./_html').appendChild(iframe);
  iframe.src = 'javascript:'; // eslint-disable-line no-script-url
  // createDict = iframe.contentWindow.Object;
  // html.removeChild(iframe);
  iframeDocument = iframe.contentWindow.document;
  iframeDocument.open();
  iframeDocument.write(lt + 'script' + gt + 'document.F=Object' + lt + '/script' + gt);
  iframeDocument.close();
  createDict = iframeDocument.F;
  while (i--) delete createDict[PROTOTYPE][enumBugKeys[i]];
  return createDict();
};

module.exports = Object.create || function create(O, Properties) {
  var result;
  if (O !== null) {
    Empty[PROTOTYPE] = anObject(O);
    result = new Empty();
    Empty[PROTOTYPE] = null;
    // add "__proto__" for Object.getPrototypeOf polyfill
    result[IE_PROTO] = O;
  } else result = createDict();
  return Properties === undefined ? result : dPs(result, Properties);
};

},{"./_an-object":"node_modules/core-js/modules/_an-object.js","./_object-dps":"node_modules/core-js/modules/_object-dps.js","./_enum-bug-keys":"node_modules/core-js/modules/_enum-bug-keys.js","./_shared-key":"node_modules/core-js/modules/_shared-key.js","./_dom-create":"node_modules/core-js/modules/_dom-create.js","./_html":"node_modules/core-js/modules/_html.js"}],"node_modules/core-js/modules/_object-gopn.js":[function(require,module,exports) {
// 19.1.2.7 / 15.2.3.4 Object.getOwnPropertyNames(O)
var $keys = require('./_object-keys-internal');
var hiddenKeys = require('./_enum-bug-keys').concat('length', 'prototype');

exports.f = Object.getOwnPropertyNames || function getOwnPropertyNames(O) {
  return $keys(O, hiddenKeys);
};

},{"./_object-keys-internal":"node_modules/core-js/modules/_object-keys-internal.js","./_enum-bug-keys":"node_modules/core-js/modules/_enum-bug-keys.js"}],"node_modules/core-js/modules/_object-gopn-ext.js":[function(require,module,exports) {
// fallback for IE11 buggy Object.getOwnPropertyNames with iframe and window
var toIObject = require('./_to-iobject');
var gOPN = require('./_object-gopn').f;
var toString = {}.toString;

var windowNames = typeof window == 'object' && window && Object.getOwnPropertyNames
  ? Object.getOwnPropertyNames(window) : [];

var getWindowNames = function (it) {
  try {
    return gOPN(it);
  } catch (e) {
    return windowNames.slice();
  }
};

module.exports.f = function getOwnPropertyNames(it) {
  return windowNames && toString.call(it) == '[object Window]' ? getWindowNames(it) : gOPN(toIObject(it));
};

},{"./_to-iobject":"node_modules/core-js/modules/_to-iobject.js","./_object-gopn":"node_modules/core-js/modules/_object-gopn.js"}],"node_modules/core-js/modules/_object-gopd.js":[function(require,module,exports) {
var pIE = require('./_object-pie');
var createDesc = require('./_property-desc');
var toIObject = require('./_to-iobject');
var toPrimitive = require('./_to-primitive');
var has = require('./_has');
var IE8_DOM_DEFINE = require('./_ie8-dom-define');
var gOPD = Object.getOwnPropertyDescriptor;

exports.f = require('./_descriptors') ? gOPD : function getOwnPropertyDescriptor(O, P) {
  O = toIObject(O);
  P = toPrimitive(P, true);
  if (IE8_DOM_DEFINE) try {
    return gOPD(O, P);
  } catch (e) { /* empty */ }
  if (has(O, P)) return createDesc(!pIE.f.call(O, P), O[P]);
};

},{"./_object-pie":"node_modules/core-js/modules/_object-pie.js","./_property-desc":"node_modules/core-js/modules/_property-desc.js","./_to-iobject":"node_modules/core-js/modules/_to-iobject.js","./_to-primitive":"node_modules/core-js/modules/_to-primitive.js","./_has":"node_modules/core-js/modules/_has.js","./_ie8-dom-define":"node_modules/core-js/modules/_ie8-dom-define.js","./_descriptors":"node_modules/core-js/modules/_descriptors.js"}],"node_modules/core-js/modules/es6.symbol.js":[function(require,module,exports) {

'use strict';
// ECMAScript 6 symbols shim
var global = require('./_global');
var has = require('./_has');
var DESCRIPTORS = require('./_descriptors');
var $export = require('./_export');
var redefine = require('./_redefine');
var META = require('./_meta').KEY;
var $fails = require('./_fails');
var shared = require('./_shared');
var setToStringTag = require('./_set-to-string-tag');
var uid = require('./_uid');
var wks = require('./_wks');
var wksExt = require('./_wks-ext');
var wksDefine = require('./_wks-define');
var enumKeys = require('./_enum-keys');
var isArray = require('./_is-array');
var anObject = require('./_an-object');
var isObject = require('./_is-object');
var toIObject = require('./_to-iobject');
var toPrimitive = require('./_to-primitive');
var createDesc = require('./_property-desc');
var _create = require('./_object-create');
var gOPNExt = require('./_object-gopn-ext');
var $GOPD = require('./_object-gopd');
var $DP = require('./_object-dp');
var $keys = require('./_object-keys');
var gOPD = $GOPD.f;
var dP = $DP.f;
var gOPN = gOPNExt.f;
var $Symbol = global.Symbol;
var $JSON = global.JSON;
var _stringify = $JSON && $JSON.stringify;
var PROTOTYPE = 'prototype';
var HIDDEN = wks('_hidden');
var TO_PRIMITIVE = wks('toPrimitive');
var isEnum = {}.propertyIsEnumerable;
var SymbolRegistry = shared('symbol-registry');
var AllSymbols = shared('symbols');
var OPSymbols = shared('op-symbols');
var ObjectProto = Object[PROTOTYPE];
var USE_NATIVE = typeof $Symbol == 'function';
var QObject = global.QObject;
// Don't use setters in Qt Script, https://github.com/zloirock/core-js/issues/173
var setter = !QObject || !QObject[PROTOTYPE] || !QObject[PROTOTYPE].findChild;

// fallback for old Android, https://code.google.com/p/v8/issues/detail?id=687
var setSymbolDesc = DESCRIPTORS && $fails(function () {
  return _create(dP({}, 'a', {
    get: function () { return dP(this, 'a', { value: 7 }).a; }
  })).a != 7;
}) ? function (it, key, D) {
  var protoDesc = gOPD(ObjectProto, key);
  if (protoDesc) delete ObjectProto[key];
  dP(it, key, D);
  if (protoDesc && it !== ObjectProto) dP(ObjectProto, key, protoDesc);
} : dP;

var wrap = function (tag) {
  var sym = AllSymbols[tag] = _create($Symbol[PROTOTYPE]);
  sym._k = tag;
  return sym;
};

var isSymbol = USE_NATIVE && typeof $Symbol.iterator == 'symbol' ? function (it) {
  return typeof it == 'symbol';
} : function (it) {
  return it instanceof $Symbol;
};

var $defineProperty = function defineProperty(it, key, D) {
  if (it === ObjectProto) $defineProperty(OPSymbols, key, D);
  anObject(it);
  key = toPrimitive(key, true);
  anObject(D);
  if (has(AllSymbols, key)) {
    if (!D.enumerable) {
      if (!has(it, HIDDEN)) dP(it, HIDDEN, createDesc(1, {}));
      it[HIDDEN][key] = true;
    } else {
      if (has(it, HIDDEN) && it[HIDDEN][key]) it[HIDDEN][key] = false;
      D = _create(D, { enumerable: createDesc(0, false) });
    } return setSymbolDesc(it, key, D);
  } return dP(it, key, D);
};
var $defineProperties = function defineProperties(it, P) {
  anObject(it);
  var keys = enumKeys(P = toIObject(P));
  var i = 0;
  var l = keys.length;
  var key;
  while (l > i) $defineProperty(it, key = keys[i++], P[key]);
  return it;
};
var $create = function create(it, P) {
  return P === undefined ? _create(it) : $defineProperties(_create(it), P);
};
var $propertyIsEnumerable = function propertyIsEnumerable(key) {
  var E = isEnum.call(this, key = toPrimitive(key, true));
  if (this === ObjectProto && has(AllSymbols, key) && !has(OPSymbols, key)) return false;
  return E || !has(this, key) || !has(AllSymbols, key) || has(this, HIDDEN) && this[HIDDEN][key] ? E : true;
};
var $getOwnPropertyDescriptor = function getOwnPropertyDescriptor(it, key) {
  it = toIObject(it);
  key = toPrimitive(key, true);
  if (it === ObjectProto && has(AllSymbols, key) && !has(OPSymbols, key)) return;
  var D = gOPD(it, key);
  if (D && has(AllSymbols, key) && !(has(it, HIDDEN) && it[HIDDEN][key])) D.enumerable = true;
  return D;
};
var $getOwnPropertyNames = function getOwnPropertyNames(it) {
  var names = gOPN(toIObject(it));
  var result = [];
  var i = 0;
  var key;
  while (names.length > i) {
    if (!has(AllSymbols, key = names[i++]) && key != HIDDEN && key != META) result.push(key);
  } return result;
};
var $getOwnPropertySymbols = function getOwnPropertySymbols(it) {
  var IS_OP = it === ObjectProto;
  var names = gOPN(IS_OP ? OPSymbols : toIObject(it));
  var result = [];
  var i = 0;
  var key;
  while (names.length > i) {
    if (has(AllSymbols, key = names[i++]) && (IS_OP ? has(ObjectProto, key) : true)) result.push(AllSymbols[key]);
  } return result;
};

// 19.4.1.1 Symbol([description])
if (!USE_NATIVE) {
  $Symbol = function Symbol() {
    if (this instanceof $Symbol) throw TypeError('Symbol is not a constructor!');
    var tag = uid(arguments.length > 0 ? arguments[0] : undefined);
    var $set = function (value) {
      if (this === ObjectProto) $set.call(OPSymbols, value);
      if (has(this, HIDDEN) && has(this[HIDDEN], tag)) this[HIDDEN][tag] = false;
      setSymbolDesc(this, tag, createDesc(1, value));
    };
    if (DESCRIPTORS && setter) setSymbolDesc(ObjectProto, tag, { configurable: true, set: $set });
    return wrap(tag);
  };
  redefine($Symbol[PROTOTYPE], 'toString', function toString() {
    return this._k;
  });

  $GOPD.f = $getOwnPropertyDescriptor;
  $DP.f = $defineProperty;
  require('./_object-gopn').f = gOPNExt.f = $getOwnPropertyNames;
  require('./_object-pie').f = $propertyIsEnumerable;
  require('./_object-gops').f = $getOwnPropertySymbols;

  if (DESCRIPTORS && !require('./_library')) {
    redefine(ObjectProto, 'propertyIsEnumerable', $propertyIsEnumerable, true);
  }

  wksExt.f = function (name) {
    return wrap(wks(name));
  };
}

$export($export.G + $export.W + $export.F * !USE_NATIVE, { Symbol: $Symbol });

for (var es6Symbols = (
  // 19.4.2.2, 19.4.2.3, 19.4.2.4, 19.4.2.6, 19.4.2.8, 19.4.2.9, 19.4.2.10, 19.4.2.11, 19.4.2.12, 19.4.2.13, 19.4.2.14
  'hasInstance,isConcatSpreadable,iterator,match,replace,search,species,split,toPrimitive,toStringTag,unscopables'
).split(','), j = 0; es6Symbols.length > j;)wks(es6Symbols[j++]);

for (var wellKnownSymbols = $keys(wks.store), k = 0; wellKnownSymbols.length > k;) wksDefine(wellKnownSymbols[k++]);

$export($export.S + $export.F * !USE_NATIVE, 'Symbol', {
  // 19.4.2.1 Symbol.for(key)
  'for': function (key) {
    return has(SymbolRegistry, key += '')
      ? SymbolRegistry[key]
      : SymbolRegistry[key] = $Symbol(key);
  },
  // 19.4.2.5 Symbol.keyFor(sym)
  keyFor: function keyFor(sym) {
    if (!isSymbol(sym)) throw TypeError(sym + ' is not a symbol!');
    for (var key in SymbolRegistry) if (SymbolRegistry[key] === sym) return key;
  },
  useSetter: function () { setter = true; },
  useSimple: function () { setter = false; }
});

$export($export.S + $export.F * !USE_NATIVE, 'Object', {
  // 19.1.2.2 Object.create(O [, Properties])
  create: $create,
  // 19.1.2.4 Object.defineProperty(O, P, Attributes)
  defineProperty: $defineProperty,
  // 19.1.2.3 Object.defineProperties(O, Properties)
  defineProperties: $defineProperties,
  // 19.1.2.6 Object.getOwnPropertyDescriptor(O, P)
  getOwnPropertyDescriptor: $getOwnPropertyDescriptor,
  // 19.1.2.7 Object.getOwnPropertyNames(O)
  getOwnPropertyNames: $getOwnPropertyNames,
  // 19.1.2.8 Object.getOwnPropertySymbols(O)
  getOwnPropertySymbols: $getOwnPropertySymbols
});

// 24.3.2 JSON.stringify(value [, replacer [, space]])
$JSON && $export($export.S + $export.F * (!USE_NATIVE || $fails(function () {
  var S = $Symbol();
  // MS Edge converts symbol values to JSON as {}
  // WebKit converts symbol values to JSON as null
  // V8 throws on boxed symbols
  return _stringify([S]) != '[null]' || _stringify({ a: S }) != '{}' || _stringify(Object(S)) != '{}';
})), 'JSON', {
  stringify: function stringify(it) {
    var args = [it];
    var i = 1;
    var replacer, $replacer;
    while (arguments.length > i) args.push(arguments[i++]);
    $replacer = replacer = args[1];
    if (!isObject(replacer) && it === undefined || isSymbol(it)) return; // IE8 returns string on undefined
    if (!isArray(replacer)) replacer = function (key, value) {
      if (typeof $replacer == 'function') value = $replacer.call(this, key, value);
      if (!isSymbol(value)) return value;
    };
    args[1] = replacer;
    return _stringify.apply($JSON, args);
  }
});

// 19.4.3.4 Symbol.prototype[@@toPrimitive](hint)
$Symbol[PROTOTYPE][TO_PRIMITIVE] || require('./_hide')($Symbol[PROTOTYPE], TO_PRIMITIVE, $Symbol[PROTOTYPE].valueOf);
// 19.4.3.5 Symbol.prototype[@@toStringTag]
setToStringTag($Symbol, 'Symbol');
// 20.2.1.9 Math[@@toStringTag]
setToStringTag(Math, 'Math', true);
// 24.3.3 JSON[@@toStringTag]
setToStringTag(global.JSON, 'JSON', true);

},{"./_global":"node_modules/core-js/modules/_global.js","./_has":"node_modules/core-js/modules/_has.js","./_descriptors":"node_modules/core-js/modules/_descriptors.js","./_export":"node_modules/core-js/modules/_export.js","./_redefine":"node_modules/core-js/modules/_redefine.js","./_meta":"node_modules/core-js/modules/_meta.js","./_fails":"node_modules/core-js/modules/_fails.js","./_shared":"node_modules/core-js/modules/_shared.js","./_set-to-string-tag":"node_modules/core-js/modules/_set-to-string-tag.js","./_uid":"node_modules/core-js/modules/_uid.js","./_wks":"node_modules/core-js/modules/_wks.js","./_wks-ext":"node_modules/core-js/modules/_wks-ext.js","./_wks-define":"node_modules/core-js/modules/_wks-define.js","./_enum-keys":"node_modules/core-js/modules/_enum-keys.js","./_is-array":"node_modules/core-js/modules/_is-array.js","./_an-object":"node_modules/core-js/modules/_an-object.js","./_is-object":"node_modules/core-js/modules/_is-object.js","./_to-iobject":"node_modules/core-js/modules/_to-iobject.js","./_to-primitive":"node_modules/core-js/modules/_to-primitive.js","./_property-desc":"node_modules/core-js/modules/_property-desc.js","./_object-create":"node_modules/core-js/modules/_object-create.js","./_object-gopn-ext":"node_modules/core-js/modules/_object-gopn-ext.js","./_object-gopd":"node_modules/core-js/modules/_object-gopd.js","./_object-dp":"node_modules/core-js/modules/_object-dp.js","./_object-keys":"node_modules/core-js/modules/_object-keys.js","./_object-gopn":"node_modules/core-js/modules/_object-gopn.js","./_object-pie":"node_modules/core-js/modules/_object-pie.js","./_object-gops":"node_modules/core-js/modules/_object-gops.js","./_library":"node_modules/core-js/modules/_library.js","./_hide":"node_modules/core-js/modules/_hide.js"}],"node_modules/core-js/modules/es6.object.create.js":[function(require,module,exports) {
var $export = require('./_export');
// 19.1.2.2 / 15.2.3.5 Object.create(O [, Properties])
$export($export.S, 'Object', { create: require('./_object-create') });

},{"./_export":"node_modules/core-js/modules/_export.js","./_object-create":"node_modules/core-js/modules/_object-create.js"}],"node_modules/core-js/modules/es6.object.define-property.js":[function(require,module,exports) {
var $export = require('./_export');
// 19.1.2.4 / 15.2.3.6 Object.defineProperty(O, P, Attributes)
$export($export.S + $export.F * !require('./_descriptors'), 'Object', { defineProperty: require('./_object-dp').f });

},{"./_export":"node_modules/core-js/modules/_export.js","./_descriptors":"node_modules/core-js/modules/_descriptors.js","./_object-dp":"node_modules/core-js/modules/_object-dp.js"}],"node_modules/core-js/modules/es6.object.define-properties.js":[function(require,module,exports) {
var $export = require('./_export');
// 19.1.2.3 / 15.2.3.7 Object.defineProperties(O, Properties)
$export($export.S + $export.F * !require('./_descriptors'), 'Object', { defineProperties: require('./_object-dps') });

},{"./_export":"node_modules/core-js/modules/_export.js","./_descriptors":"node_modules/core-js/modules/_descriptors.js","./_object-dps":"node_modules/core-js/modules/_object-dps.js"}],"node_modules/core-js/modules/_object-sap.js":[function(require,module,exports) {
// most Object methods by ES6 should accept primitives
var $export = require('./_export');
var core = require('./_core');
var fails = require('./_fails');
module.exports = function (KEY, exec) {
  var fn = (core.Object || {})[KEY] || Object[KEY];
  var exp = {};
  exp[KEY] = exec(fn);
  $export($export.S + $export.F * fails(function () { fn(1); }), 'Object', exp);
};

},{"./_export":"node_modules/core-js/modules/_export.js","./_core":"node_modules/core-js/modules/_core.js","./_fails":"node_modules/core-js/modules/_fails.js"}],"node_modules/core-js/modules/es6.object.get-own-property-descriptor.js":[function(require,module,exports) {
// 19.1.2.6 Object.getOwnPropertyDescriptor(O, P)
var toIObject = require('./_to-iobject');
var $getOwnPropertyDescriptor = require('./_object-gopd').f;

require('./_object-sap')('getOwnPropertyDescriptor', function () {
  return function getOwnPropertyDescriptor(it, key) {
    return $getOwnPropertyDescriptor(toIObject(it), key);
  };
});

},{"./_to-iobject":"node_modules/core-js/modules/_to-iobject.js","./_object-gopd":"node_modules/core-js/modules/_object-gopd.js","./_object-sap":"node_modules/core-js/modules/_object-sap.js"}],"node_modules/core-js/modules/_to-object.js":[function(require,module,exports) {
// 7.1.13 ToObject(argument)
var defined = require('./_defined');
module.exports = function (it) {
  return Object(defined(it));
};

},{"./_defined":"node_modules/core-js/modules/_defined.js"}],"node_modules/core-js/modules/_object-gpo.js":[function(require,module,exports) {
// 19.1.2.9 / 15.2.3.2 Object.getPrototypeOf(O)
var has = require('./_has');
var toObject = require('./_to-object');
var IE_PROTO = require('./_shared-key')('IE_PROTO');
var ObjectProto = Object.prototype;

module.exports = Object.getPrototypeOf || function (O) {
  O = toObject(O);
  if (has(O, IE_PROTO)) return O[IE_PROTO];
  if (typeof O.constructor == 'function' && O instanceof O.constructor) {
    return O.constructor.prototype;
  } return O instanceof Object ? ObjectProto : null;
};

},{"./_has":"node_modules/core-js/modules/_has.js","./_to-object":"node_modules/core-js/modules/_to-object.js","./_shared-key":"node_modules/core-js/modules/_shared-key.js"}],"node_modules/core-js/modules/es6.object.get-prototype-of.js":[function(require,module,exports) {
// 19.1.2.9 Object.getPrototypeOf(O)
var toObject = require('./_to-object');
var $getPrototypeOf = require('./_object-gpo');

require('./_object-sap')('getPrototypeOf', function () {
  return function getPrototypeOf(it) {
    return $getPrototypeOf(toObject(it));
  };
});

},{"./_to-object":"node_modules/core-js/modules/_to-object.js","./_object-gpo":"node_modules/core-js/modules/_object-gpo.js","./_object-sap":"node_modules/core-js/modules/_object-sap.js"}],"node_modules/core-js/modules/es6.object.keys.js":[function(require,module,exports) {
// 19.1.2.14 Object.keys(O)
var toObject = require('./_to-object');
var $keys = require('./_object-keys');

require('./_object-sap')('keys', function () {
  return function keys(it) {
    return $keys(toObject(it));
  };
});

},{"./_to-object":"node_modules/core-js/modules/_to-object.js","./_object-keys":"node_modules/core-js/modules/_object-keys.js","./_object-sap":"node_modules/core-js/modules/_object-sap.js"}],"node_modules/core-js/modules/es6.object.get-own-property-names.js":[function(require,module,exports) {
// 19.1.2.7 Object.getOwnPropertyNames(O)
require('./_object-sap')('getOwnPropertyNames', function () {
  return require('./_object-gopn-ext').f;
});

},{"./_object-sap":"node_modules/core-js/modules/_object-sap.js","./_object-gopn-ext":"node_modules/core-js/modules/_object-gopn-ext.js"}],"node_modules/core-js/modules/es6.object.freeze.js":[function(require,module,exports) {
// 19.1.2.5 Object.freeze(O)
var isObject = require('./_is-object');
var meta = require('./_meta').onFreeze;

require('./_object-sap')('freeze', function ($freeze) {
  return function freeze(it) {
    return $freeze && isObject(it) ? $freeze(meta(it)) : it;
  };
});

},{"./_is-object":"node_modules/core-js/modules/_is-object.js","./_meta":"node_modules/core-js/modules/_meta.js","./_object-sap":"node_modules/core-js/modules/_object-sap.js"}],"node_modules/core-js/modules/es6.object.seal.js":[function(require,module,exports) {
// 19.1.2.17 Object.seal(O)
var isObject = require('./_is-object');
var meta = require('./_meta').onFreeze;

require('./_object-sap')('seal', function ($seal) {
  return function seal(it) {
    return $seal && isObject(it) ? $seal(meta(it)) : it;
  };
});

},{"./_is-object":"node_modules/core-js/modules/_is-object.js","./_meta":"node_modules/core-js/modules/_meta.js","./_object-sap":"node_modules/core-js/modules/_object-sap.js"}],"node_modules/core-js/modules/es6.object.prevent-extensions.js":[function(require,module,exports) {
// 19.1.2.15 Object.preventExtensions(O)
var isObject = require('./_is-object');
var meta = require('./_meta').onFreeze;

require('./_object-sap')('preventExtensions', function ($preventExtensions) {
  return function preventExtensions(it) {
    return $preventExtensions && isObject(it) ? $preventExtensions(meta(it)) : it;
  };
});

},{"./_is-object":"node_modules/core-js/modules/_is-object.js","./_meta":"node_modules/core-js/modules/_meta.js","./_object-sap":"node_modules/core-js/modules/_object-sap.js"}],"node_modules/core-js/modules/es6.object.is-frozen.js":[function(require,module,exports) {
// 19.1.2.12 Object.isFrozen(O)
var isObject = require('./_is-object');

require('./_object-sap')('isFrozen', function ($isFrozen) {
  return function isFrozen(it) {
    return isObject(it) ? $isFrozen ? $isFrozen(it) : false : true;
  };
});

},{"./_is-object":"node_modules/core-js/modules/_is-object.js","./_object-sap":"node_modules/core-js/modules/_object-sap.js"}],"node_modules/core-js/modules/es6.object.is-sealed.js":[function(require,module,exports) {
// 19.1.2.13 Object.isSealed(O)
var isObject = require('./_is-object');

require('./_object-sap')('isSealed', function ($isSealed) {
  return function isSealed(it) {
    return isObject(it) ? $isSealed ? $isSealed(it) : false : true;
  };
});

},{"./_is-object":"node_modules/core-js/modules/_is-object.js","./_object-sap":"node_modules/core-js/modules/_object-sap.js"}],"node_modules/core-js/modules/es6.object.is-extensible.js":[function(require,module,exports) {
// 19.1.2.11 Object.isExtensible(O)
var isObject = require('./_is-object');

require('./_object-sap')('isExtensible', function ($isExtensible) {
  return function isExtensible(it) {
    return isObject(it) ? $isExtensible ? $isExtensible(it) : true : false;
  };
});

},{"./_is-object":"node_modules/core-js/modules/_is-object.js","./_object-sap":"node_modules/core-js/modules/_object-sap.js"}],"node_modules/core-js/modules/_object-assign.js":[function(require,module,exports) {
'use strict';
// 19.1.2.1 Object.assign(target, source, ...)
var getKeys = require('./_object-keys');
var gOPS = require('./_object-gops');
var pIE = require('./_object-pie');
var toObject = require('./_to-object');
var IObject = require('./_iobject');
var $assign = Object.assign;

// should work with symbols and should have deterministic property order (V8 bug)
module.exports = !$assign || require('./_fails')(function () {
  var A = {};
  var B = {};
  // eslint-disable-next-line no-undef
  var S = Symbol();
  var K = 'abcdefghijklmnopqrst';
  A[S] = 7;
  K.split('').forEach(function (k) { B[k] = k; });
  return $assign({}, A)[S] != 7 || Object.keys($assign({}, B)).join('') != K;
}) ? function assign(target, source) { // eslint-disable-line no-unused-vars
  var T = toObject(target);
  var aLen = arguments.length;
  var index = 1;
  var getSymbols = gOPS.f;
  var isEnum = pIE.f;
  while (aLen > index) {
    var S = IObject(arguments[index++]);
    var keys = getSymbols ? getKeys(S).concat(getSymbols(S)) : getKeys(S);
    var length = keys.length;
    var j = 0;
    var key;
    while (length > j) if (isEnum.call(S, key = keys[j++])) T[key] = S[key];
  } return T;
} : $assign;

},{"./_object-keys":"node_modules/core-js/modules/_object-keys.js","./_object-gops":"node_modules/core-js/modules/_object-gops.js","./_object-pie":"node_modules/core-js/modules/_object-pie.js","./_to-object":"node_modules/core-js/modules/_to-object.js","./_iobject":"node_modules/core-js/modules/_iobject.js","./_fails":"node_modules/core-js/modules/_fails.js"}],"node_modules/core-js/modules/es6.object.assign.js":[function(require,module,exports) {
// 19.1.3.1 Object.assign(target, source)
var $export = require('./_export');

$export($export.S + $export.F, 'Object', { assign: require('./_object-assign') });

},{"./_export":"node_modules/core-js/modules/_export.js","./_object-assign":"node_modules/core-js/modules/_object-assign.js"}],"node_modules/core-js/modules/_same-value.js":[function(require,module,exports) {
// 7.2.9 SameValue(x, y)
module.exports = Object.is || function is(x, y) {
  // eslint-disable-next-line no-self-compare
  return x === y ? x !== 0 || 1 / x === 1 / y : x != x && y != y;
};

},{}],"node_modules/core-js/modules/es6.object.is.js":[function(require,module,exports) {
// 19.1.3.10 Object.is(value1, value2)
var $export = require('./_export');
$export($export.S, 'Object', { is: require('./_same-value') });

},{"./_export":"node_modules/core-js/modules/_export.js","./_same-value":"node_modules/core-js/modules/_same-value.js"}],"node_modules/core-js/modules/_set-proto.js":[function(require,module,exports) {
// Works with __proto__ only. Old v8 can't work with null proto objects.
/* eslint-disable no-proto */
var isObject = require('./_is-object');
var anObject = require('./_an-object');
var check = function (O, proto) {
  anObject(O);
  if (!isObject(proto) && proto !== null) throw TypeError(proto + ": can't set as prototype!");
};
module.exports = {
  set: Object.setPrototypeOf || ('__proto__' in {} ? // eslint-disable-line
    function (test, buggy, set) {
      try {
        set = require('./_ctx')(Function.call, require('./_object-gopd').f(Object.prototype, '__proto__').set, 2);
        set(test, []);
        buggy = !(test instanceof Array);
      } catch (e) { buggy = true; }
      return function setPrototypeOf(O, proto) {
        check(O, proto);
        if (buggy) O.__proto__ = proto;
        else set(O, proto);
        return O;
      };
    }({}, false) : undefined),
  check: check
};

},{"./_is-object":"node_modules/core-js/modules/_is-object.js","./_an-object":"node_modules/core-js/modules/_an-object.js","./_ctx":"node_modules/core-js/modules/_ctx.js","./_object-gopd":"node_modules/core-js/modules/_object-gopd.js"}],"node_modules/core-js/modules/es6.object.set-prototype-of.js":[function(require,module,exports) {
// 19.1.3.19 Object.setPrototypeOf(O, proto)
var $export = require('./_export');
$export($export.S, 'Object', { setPrototypeOf: require('./_set-proto').set });

},{"./_export":"node_modules/core-js/modules/_export.js","./_set-proto":"node_modules/core-js/modules/_set-proto.js"}],"node_modules/core-js/modules/_classof.js":[function(require,module,exports) {
// getting tag from 19.1.3.6 Object.prototype.toString()
var cof = require('./_cof');
var TAG = require('./_wks')('toStringTag');
// ES3 wrong here
var ARG = cof(function () { return arguments; }()) == 'Arguments';

// fallback for IE11 Script Access Denied error
var tryGet = function (it, key) {
  try {
    return it[key];
  } catch (e) { /* empty */ }
};

module.exports = function (it) {
  var O, T, B;
  return it === undefined ? 'Undefined' : it === null ? 'Null'
    // @@toStringTag case
    : typeof (T = tryGet(O = Object(it), TAG)) == 'string' ? T
    // builtinTag case
    : ARG ? cof(O)
    // ES3 arguments fallback
    : (B = cof(O)) == 'Object' && typeof O.callee == 'function' ? 'Arguments' : B;
};

},{"./_cof":"node_modules/core-js/modules/_cof.js","./_wks":"node_modules/core-js/modules/_wks.js"}],"node_modules/core-js/modules/es6.object.to-string.js":[function(require,module,exports) {
'use strict';
// 19.1.3.6 Object.prototype.toString()
var classof = require('./_classof');
var test = {};
test[require('./_wks')('toStringTag')] = 'z';
if (test + '' != '[object z]') {
  require('./_redefine')(Object.prototype, 'toString', function toString() {
    return '[object ' + classof(this) + ']';
  }, true);
}

},{"./_classof":"node_modules/core-js/modules/_classof.js","./_wks":"node_modules/core-js/modules/_wks.js","./_redefine":"node_modules/core-js/modules/_redefine.js"}],"node_modules/core-js/modules/_invoke.js":[function(require,module,exports) {
// fast apply, http://jsperf.lnkit.com/fast-apply/5
module.exports = function (fn, args, that) {
  var un = that === undefined;
  switch (args.length) {
    case 0: return un ? fn()
                      : fn.call(that);
    case 1: return un ? fn(args[0])
                      : fn.call(that, args[0]);
    case 2: return un ? fn(args[0], args[1])
                      : fn.call(that, args[0], args[1]);
    case 3: return un ? fn(args[0], args[1], args[2])
                      : fn.call(that, args[0], args[1], args[2]);
    case 4: return un ? fn(args[0], args[1], args[2], args[3])
                      : fn.call(that, args[0], args[1], args[2], args[3]);
  } return fn.apply(that, args);
};

},{}],"node_modules/core-js/modules/_bind.js":[function(require,module,exports) {
'use strict';
var aFunction = require('./_a-function');
var isObject = require('./_is-object');
var invoke = require('./_invoke');
var arraySlice = [].slice;
var factories = {};

var construct = function (F, len, args) {
  if (!(len in factories)) {
    for (var n = [], i = 0; i < len; i++) n[i] = 'a[' + i + ']';
    // eslint-disable-next-line no-new-func
    factories[len] = Function('F,a', 'return new F(' + n.join(',') + ')');
  } return factories[len](F, args);
};

module.exports = Function.bind || function bind(that /* , ...args */) {
  var fn = aFunction(this);
  var partArgs = arraySlice.call(arguments, 1);
  var bound = function (/* args... */) {
    var args = partArgs.concat(arraySlice.call(arguments));
    return this instanceof bound ? construct(fn, args.length, args) : invoke(fn, args, that);
  };
  if (isObject(fn.prototype)) bound.prototype = fn.prototype;
  return bound;
};

},{"./_a-function":"node_modules/core-js/modules/_a-function.js","./_is-object":"node_modules/core-js/modules/_is-object.js","./_invoke":"node_modules/core-js/modules/_invoke.js"}],"node_modules/core-js/modules/es6.function.bind.js":[function(require,module,exports) {
// 19.2.3.2 / 15.3.4.5 Function.prototype.bind(thisArg, args...)
var $export = require('./_export');

$export($export.P, 'Function', { bind: require('./_bind') });

},{"./_export":"node_modules/core-js/modules/_export.js","./_bind":"node_modules/core-js/modules/_bind.js"}],"node_modules/core-js/modules/es6.function.name.js":[function(require,module,exports) {
var dP = require('./_object-dp').f;
var FProto = Function.prototype;
var nameRE = /^\s*function ([^ (]*)/;
var NAME = 'name';

// 19.2.4.2 name
NAME in FProto || require('./_descriptors') && dP(FProto, NAME, {
  configurable: true,
  get: function () {
    try {
      return ('' + this).match(nameRE)[1];
    } catch (e) {
      return '';
    }
  }
});

},{"./_object-dp":"node_modules/core-js/modules/_object-dp.js","./_descriptors":"node_modules/core-js/modules/_descriptors.js"}],"node_modules/core-js/modules/es6.function.has-instance.js":[function(require,module,exports) {
'use strict';
var isObject = require('./_is-object');
var getPrototypeOf = require('./_object-gpo');
var HAS_INSTANCE = require('./_wks')('hasInstance');
var FunctionProto = Function.prototype;
// 19.2.3.6 Function.prototype[@@hasInstance](V)
if (!(HAS_INSTANCE in FunctionProto)) require('./_object-dp').f(FunctionProto, HAS_INSTANCE, { value: function (O) {
  if (typeof this != 'function' || !isObject(O)) return false;
  if (!isObject(this.prototype)) return O instanceof this;
  // for environment w/o native `@@hasInstance` logic enough `instanceof`, but add this:
  while (O = getPrototypeOf(O)) if (this.prototype === O) return true;
  return false;
} });

},{"./_is-object":"node_modules/core-js/modules/_is-object.js","./_object-gpo":"node_modules/core-js/modules/_object-gpo.js","./_wks":"node_modules/core-js/modules/_wks.js","./_object-dp":"node_modules/core-js/modules/_object-dp.js"}],"node_modules/core-js/modules/_string-ws.js":[function(require,module,exports) {
module.exports = '\x09\x0A\x0B\x0C\x0D\x20\xA0\u1680\u180E\u2000\u2001\u2002\u2003' +
  '\u2004\u2005\u2006\u2007\u2008\u2009\u200A\u202F\u205F\u3000\u2028\u2029\uFEFF';

},{}],"node_modules/core-js/modules/_string-trim.js":[function(require,module,exports) {
var $export = require('./_export');
var defined = require('./_defined');
var fails = require('./_fails');
var spaces = require('./_string-ws');
var space = '[' + spaces + ']';
var non = '\u200b\u0085';
var ltrim = RegExp('^' + space + space + '*');
var rtrim = RegExp(space + space + '*$');

var exporter = function (KEY, exec, ALIAS) {
  var exp = {};
  var FORCE = fails(function () {
    return !!spaces[KEY]() || non[KEY]() != non;
  });
  var fn = exp[KEY] = FORCE ? exec(trim) : spaces[KEY];
  if (ALIAS) exp[ALIAS] = fn;
  $export($export.P + $export.F * FORCE, 'String', exp);
};

// 1 -> String#trimLeft
// 2 -> String#trimRight
// 3 -> String#trim
var trim = exporter.trim = function (string, TYPE) {
  string = String(defined(string));
  if (TYPE & 1) string = string.replace(ltrim, '');
  if (TYPE & 2) string = string.replace(rtrim, '');
  return string;
};

module.exports = exporter;

},{"./_export":"node_modules/core-js/modules/_export.js","./_defined":"node_modules/core-js/modules/_defined.js","./_fails":"node_modules/core-js/modules/_fails.js","./_string-ws":"node_modules/core-js/modules/_string-ws.js"}],"node_modules/core-js/modules/_parse-int.js":[function(require,module,exports) {
var $parseInt = require('./_global').parseInt;
var $trim = require('./_string-trim').trim;
var ws = require('./_string-ws');
var hex = /^[-+]?0[xX]/;

module.exports = $parseInt(ws + '08') !== 8 || $parseInt(ws + '0x16') !== 22 ? function parseInt(str, radix) {
  var string = $trim(String(str), 3);
  return $parseInt(string, (radix >>> 0) || (hex.test(string) ? 16 : 10));
} : $parseInt;

},{"./_global":"node_modules/core-js/modules/_global.js","./_string-trim":"node_modules/core-js/modules/_string-trim.js","./_string-ws":"node_modules/core-js/modules/_string-ws.js"}],"node_modules/core-js/modules/es6.parse-int.js":[function(require,module,exports) {
var $export = require('./_export');
var $parseInt = require('./_parse-int');
// 18.2.5 parseInt(string, radix)
$export($export.G + $export.F * (parseInt != $parseInt), { parseInt: $parseInt });

},{"./_export":"node_modules/core-js/modules/_export.js","./_parse-int":"node_modules/core-js/modules/_parse-int.js"}],"node_modules/core-js/modules/_parse-float.js":[function(require,module,exports) {
var $parseFloat = require('./_global').parseFloat;
var $trim = require('./_string-trim').trim;

module.exports = 1 / $parseFloat(require('./_string-ws') + '-0') !== -Infinity ? function parseFloat(str) {
  var string = $trim(String(str), 3);
  var result = $parseFloat(string);
  return result === 0 && string.charAt(0) == '-' ? -0 : result;
} : $parseFloat;

},{"./_global":"node_modules/core-js/modules/_global.js","./_string-trim":"node_modules/core-js/modules/_string-trim.js","./_string-ws":"node_modules/core-js/modules/_string-ws.js"}],"node_modules/core-js/modules/es6.parse-float.js":[function(require,module,exports) {
var $export = require('./_export');
var $parseFloat = require('./_parse-float');
// 18.2.4 parseFloat(string)
$export($export.G + $export.F * (parseFloat != $parseFloat), { parseFloat: $parseFloat });

},{"./_export":"node_modules/core-js/modules/_export.js","./_parse-float":"node_modules/core-js/modules/_parse-float.js"}],"node_modules/core-js/modules/_inherit-if-required.js":[function(require,module,exports) {
var isObject = require('./_is-object');
var setPrototypeOf = require('./_set-proto').set;
module.exports = function (that, target, C) {
  var S = target.constructor;
  var P;
  if (S !== C && typeof S == 'function' && (P = S.prototype) !== C.prototype && isObject(P) && setPrototypeOf) {
    setPrototypeOf(that, P);
  } return that;
};

},{"./_is-object":"node_modules/core-js/modules/_is-object.js","./_set-proto":"node_modules/core-js/modules/_set-proto.js"}],"node_modules/core-js/modules/es6.number.constructor.js":[function(require,module,exports) {

'use strict';
var global = require('./_global');
var has = require('./_has');
var cof = require('./_cof');
var inheritIfRequired = require('./_inherit-if-required');
var toPrimitive = require('./_to-primitive');
var fails = require('./_fails');
var gOPN = require('./_object-gopn').f;
var gOPD = require('./_object-gopd').f;
var dP = require('./_object-dp').f;
var $trim = require('./_string-trim').trim;
var NUMBER = 'Number';
var $Number = global[NUMBER];
var Base = $Number;
var proto = $Number.prototype;
// Opera ~12 has broken Object#toString
var BROKEN_COF = cof(require('./_object-create')(proto)) == NUMBER;
var TRIM = 'trim' in String.prototype;

// 7.1.3 ToNumber(argument)
var toNumber = function (argument) {
  var it = toPrimitive(argument, false);
  if (typeof it == 'string' && it.length > 2) {
    it = TRIM ? it.trim() : $trim(it, 3);
    var first = it.charCodeAt(0);
    var third, radix, maxCode;
    if (first === 43 || first === 45) {
      third = it.charCodeAt(2);
      if (third === 88 || third === 120) return NaN; // Number('+0x1') should be NaN, old V8 fix
    } else if (first === 48) {
      switch (it.charCodeAt(1)) {
        case 66: case 98: radix = 2; maxCode = 49; break; // fast equal /^0b[01]+$/i
        case 79: case 111: radix = 8; maxCode = 55; break; // fast equal /^0o[0-7]+$/i
        default: return +it;
      }
      for (var digits = it.slice(2), i = 0, l = digits.length, code; i < l; i++) {
        code = digits.charCodeAt(i);
        // parseInt parses a string to a first unavailable symbol
        // but ToNumber should return NaN if a string contains unavailable symbols
        if (code < 48 || code > maxCode) return NaN;
      } return parseInt(digits, radix);
    }
  } return +it;
};

if (!$Number(' 0o1') || !$Number('0b1') || $Number('+0x1')) {
  $Number = function Number(value) {
    var it = arguments.length < 1 ? 0 : value;
    var that = this;
    return that instanceof $Number
      // check on 1..constructor(foo) case
      && (BROKEN_COF ? fails(function () { proto.valueOf.call(that); }) : cof(that) != NUMBER)
        ? inheritIfRequired(new Base(toNumber(it)), that, $Number) : toNumber(it);
  };
  for (var keys = require('./_descriptors') ? gOPN(Base) : (
    // ES3:
    'MAX_VALUE,MIN_VALUE,NaN,NEGATIVE_INFINITY,POSITIVE_INFINITY,' +
    // ES6 (in case, if modules with ES6 Number statics required before):
    'EPSILON,isFinite,isInteger,isNaN,isSafeInteger,MAX_SAFE_INTEGER,' +
    'MIN_SAFE_INTEGER,parseFloat,parseInt,isInteger'
  ).split(','), j = 0, key; keys.length > j; j++) {
    if (has(Base, key = keys[j]) && !has($Number, key)) {
      dP($Number, key, gOPD(Base, key));
    }
  }
  $Number.prototype = proto;
  proto.constructor = $Number;
  require('./_redefine')(global, NUMBER, $Number);
}

},{"./_global":"node_modules/core-js/modules/_global.js","./_has":"node_modules/core-js/modules/_has.js","./_cof":"node_modules/core-js/modules/_cof.js","./_inherit-if-required":"node_modules/core-js/modules/_inherit-if-required.js","./_to-primitive":"node_modules/core-js/modules/_to-primitive.js","./_fails":"node_modules/core-js/modules/_fails.js","./_object-gopn":"node_modules/core-js/modules/_object-gopn.js","./_object-gopd":"node_modules/core-js/modules/_object-gopd.js","./_object-dp":"node_modules/core-js/modules/_object-dp.js","./_string-trim":"node_modules/core-js/modules/_string-trim.js","./_object-create":"node_modules/core-js/modules/_object-create.js","./_descriptors":"node_modules/core-js/modules/_descriptors.js","./_redefine":"node_modules/core-js/modules/_redefine.js"}],"node_modules/core-js/modules/_a-number-value.js":[function(require,module,exports) {
var cof = require('./_cof');
module.exports = function (it, msg) {
  if (typeof it != 'number' && cof(it) != 'Number') throw TypeError(msg);
  return +it;
};

},{"./_cof":"node_modules/core-js/modules/_cof.js"}],"node_modules/core-js/modules/_string-repeat.js":[function(require,module,exports) {
'use strict';
var toInteger = require('./_to-integer');
var defined = require('./_defined');

module.exports = function repeat(count) {
  var str = String(defined(this));
  var res = '';
  var n = toInteger(count);
  if (n < 0 || n == Infinity) throw RangeError("Count can't be negative");
  for (;n > 0; (n >>>= 1) && (str += str)) if (n & 1) res += str;
  return res;
};

},{"./_to-integer":"node_modules/core-js/modules/_to-integer.js","./_defined":"node_modules/core-js/modules/_defined.js"}],"node_modules/core-js/modules/es6.number.to-fixed.js":[function(require,module,exports) {
'use strict';
var $export = require('./_export');
var toInteger = require('./_to-integer');
var aNumberValue = require('./_a-number-value');
var repeat = require('./_string-repeat');
var $toFixed = 1.0.toFixed;
var floor = Math.floor;
var data = [0, 0, 0, 0, 0, 0];
var ERROR = 'Number.toFixed: incorrect invocation!';
var ZERO = '0';

var multiply = function (n, c) {
  var i = -1;
  var c2 = c;
  while (++i < 6) {
    c2 += n * data[i];
    data[i] = c2 % 1e7;
    c2 = floor(c2 / 1e7);
  }
};
var divide = function (n) {
  var i = 6;
  var c = 0;
  while (--i >= 0) {
    c += data[i];
    data[i] = floor(c / n);
    c = (c % n) * 1e7;
  }
};
var numToString = function () {
  var i = 6;
  var s = '';
  while (--i >= 0) {
    if (s !== '' || i === 0 || data[i] !== 0) {
      var t = String(data[i]);
      s = s === '' ? t : s + repeat.call(ZERO, 7 - t.length) + t;
    }
  } return s;
};
var pow = function (x, n, acc) {
  return n === 0 ? acc : n % 2 === 1 ? pow(x, n - 1, acc * x) : pow(x * x, n / 2, acc);
};
var log = function (x) {
  var n = 0;
  var x2 = x;
  while (x2 >= 4096) {
    n += 12;
    x2 /= 4096;
  }
  while (x2 >= 2) {
    n += 1;
    x2 /= 2;
  } return n;
};

$export($export.P + $export.F * (!!$toFixed && (
  0.00008.toFixed(3) !== '0.000' ||
  0.9.toFixed(0) !== '1' ||
  1.255.toFixed(2) !== '1.25' ||
  1000000000000000128.0.toFixed(0) !== '1000000000000000128'
) || !require('./_fails')(function () {
  // V8 ~ Android 4.3-
  $toFixed.call({});
})), 'Number', {
  toFixed: function toFixed(fractionDigits) {
    var x = aNumberValue(this, ERROR);
    var f = toInteger(fractionDigits);
    var s = '';
    var m = ZERO;
    var e, z, j, k;
    if (f < 0 || f > 20) throw RangeError(ERROR);
    // eslint-disable-next-line no-self-compare
    if (x != x) return 'NaN';
    if (x <= -1e21 || x >= 1e21) return String(x);
    if (x < 0) {
      s = '-';
      x = -x;
    }
    if (x > 1e-21) {
      e = log(x * pow(2, 69, 1)) - 69;
      z = e < 0 ? x * pow(2, -e, 1) : x / pow(2, e, 1);
      z *= 0x10000000000000;
      e = 52 - e;
      if (e > 0) {
        multiply(0, z);
        j = f;
        while (j >= 7) {
          multiply(1e7, 0);
          j -= 7;
        }
        multiply(pow(10, j, 1), 0);
        j = e - 1;
        while (j >= 23) {
          divide(1 << 23);
          j -= 23;
        }
        divide(1 << j);
        multiply(1, 1);
        divide(2);
        m = numToString();
      } else {
        multiply(0, z);
        multiply(1 << -e, 0);
        m = numToString() + repeat.call(ZERO, f);
      }
    }
    if (f > 0) {
      k = m.length;
      m = s + (k <= f ? '0.' + repeat.call(ZERO, f - k) + m : m.slice(0, k - f) + '.' + m.slice(k - f));
    } else {
      m = s + m;
    } return m;
  }
});

},{"./_export":"node_modules/core-js/modules/_export.js","./_to-integer":"node_modules/core-js/modules/_to-integer.js","./_a-number-value":"node_modules/core-js/modules/_a-number-value.js","./_string-repeat":"node_modules/core-js/modules/_string-repeat.js","./_fails":"node_modules/core-js/modules/_fails.js"}],"node_modules/core-js/modules/es6.number.to-precision.js":[function(require,module,exports) {
'use strict';
var $export = require('./_export');
var $fails = require('./_fails');
var aNumberValue = require('./_a-number-value');
var $toPrecision = 1.0.toPrecision;

$export($export.P + $export.F * ($fails(function () {
  // IE7-
  return $toPrecision.call(1, undefined) !== '1';
}) || !$fails(function () {
  // V8 ~ Android 4.3-
  $toPrecision.call({});
})), 'Number', {
  toPrecision: function toPrecision(precision) {
    var that = aNumberValue(this, 'Number#toPrecision: incorrect invocation!');
    return precision === undefined ? $toPrecision.call(that) : $toPrecision.call(that, precision);
  }
});

},{"./_export":"node_modules/core-js/modules/_export.js","./_fails":"node_modules/core-js/modules/_fails.js","./_a-number-value":"node_modules/core-js/modules/_a-number-value.js"}],"node_modules/core-js/modules/es6.number.epsilon.js":[function(require,module,exports) {
// 20.1.2.1 Number.EPSILON
var $export = require('./_export');

$export($export.S, 'Number', { EPSILON: Math.pow(2, -52) });

},{"./_export":"node_modules/core-js/modules/_export.js"}],"node_modules/core-js/modules/es6.number.is-finite.js":[function(require,module,exports) {
// 20.1.2.2 Number.isFinite(number)
var $export = require('./_export');
var _isFinite = require('./_global').isFinite;

$export($export.S, 'Number', {
  isFinite: function isFinite(it) {
    return typeof it == 'number' && _isFinite(it);
  }
});

},{"./_export":"node_modules/core-js/modules/_export.js","./_global":"node_modules/core-js/modules/_global.js"}],"node_modules/core-js/modules/_is-integer.js":[function(require,module,exports) {
// 20.1.2.3 Number.isInteger(number)
var isObject = require('./_is-object');
var floor = Math.floor;
module.exports = function isInteger(it) {
  return !isObject(it) && isFinite(it) && floor(it) === it;
};

},{"./_is-object":"node_modules/core-js/modules/_is-object.js"}],"node_modules/core-js/modules/es6.number.is-integer.js":[function(require,module,exports) {
// 20.1.2.3 Number.isInteger(number)
var $export = require('./_export');

$export($export.S, 'Number', { isInteger: require('./_is-integer') });

},{"./_export":"node_modules/core-js/modules/_export.js","./_is-integer":"node_modules/core-js/modules/_is-integer.js"}],"node_modules/core-js/modules/es6.number.is-nan.js":[function(require,module,exports) {
// 20.1.2.4 Number.isNaN(number)
var $export = require('./_export');

$export($export.S, 'Number', {
  isNaN: function isNaN(number) {
    // eslint-disable-next-line no-self-compare
    return number != number;
  }
});

},{"./_export":"node_modules/core-js/modules/_export.js"}],"node_modules/core-js/modules/es6.number.is-safe-integer.js":[function(require,module,exports) {
// 20.1.2.5 Number.isSafeInteger(number)
var $export = require('./_export');
var isInteger = require('./_is-integer');
var abs = Math.abs;

$export($export.S, 'Number', {
  isSafeInteger: function isSafeInteger(number) {
    return isInteger(number) && abs(number) <= 0x1fffffffffffff;
  }
});

},{"./_export":"node_modules/core-js/modules/_export.js","./_is-integer":"node_modules/core-js/modules/_is-integer.js"}],"node_modules/core-js/modules/es6.number.max-safe-integer.js":[function(require,module,exports) {
// 20.1.2.6 Number.MAX_SAFE_INTEGER
var $export = require('./_export');

$export($export.S, 'Number', { MAX_SAFE_INTEGER: 0x1fffffffffffff });

},{"./_export":"node_modules/core-js/modules/_export.js"}],"node_modules/core-js/modules/es6.number.min-safe-integer.js":[function(require,module,exports) {
// 20.1.2.10 Number.MIN_SAFE_INTEGER
var $export = require('./_export');

$export($export.S, 'Number', { MIN_SAFE_INTEGER: -0x1fffffffffffff });

},{"./_export":"node_modules/core-js/modules/_export.js"}],"node_modules/core-js/modules/es6.number.parse-float.js":[function(require,module,exports) {
var $export = require('./_export');
var $parseFloat = require('./_parse-float');
// 20.1.2.12 Number.parseFloat(string)
$export($export.S + $export.F * (Number.parseFloat != $parseFloat), 'Number', { parseFloat: $parseFloat });

},{"./_export":"node_modules/core-js/modules/_export.js","./_parse-float":"node_modules/core-js/modules/_parse-float.js"}],"node_modules/core-js/modules/es6.number.parse-int.js":[function(require,module,exports) {
var $export = require('./_export');
var $parseInt = require('./_parse-int');
// 20.1.2.13 Number.parseInt(string, radix)
$export($export.S + $export.F * (Number.parseInt != $parseInt), 'Number', { parseInt: $parseInt });

},{"./_export":"node_modules/core-js/modules/_export.js","./_parse-int":"node_modules/core-js/modules/_parse-int.js"}],"node_modules/core-js/modules/_math-log1p.js":[function(require,module,exports) {
// 20.2.2.20 Math.log1p(x)
module.exports = Math.log1p || function log1p(x) {
  return (x = +x) > -1e-8 && x < 1e-8 ? x - x * x / 2 : Math.log(1 + x);
};

},{}],"node_modules/core-js/modules/es6.math.acosh.js":[function(require,module,exports) {
// 20.2.2.3 Math.acosh(x)
var $export = require('./_export');
var log1p = require('./_math-log1p');
var sqrt = Math.sqrt;
var $acosh = Math.acosh;

$export($export.S + $export.F * !($acosh
  // V8 bug: https://code.google.com/p/v8/issues/detail?id=3509
  && Math.floor($acosh(Number.MAX_VALUE)) == 710
  // Tor Browser bug: Math.acosh(Infinity) -> NaN
  && $acosh(Infinity) == Infinity
), 'Math', {
  acosh: function acosh(x) {
    return (x = +x) < 1 ? NaN : x > 94906265.62425156
      ? Math.log(x) + Math.LN2
      : log1p(x - 1 + sqrt(x - 1) * sqrt(x + 1));
  }
});

},{"./_export":"node_modules/core-js/modules/_export.js","./_math-log1p":"node_modules/core-js/modules/_math-log1p.js"}],"node_modules/core-js/modules/es6.math.asinh.js":[function(require,module,exports) {
// 20.2.2.5 Math.asinh(x)
var $export = require('./_export');
var $asinh = Math.asinh;

function asinh(x) {
  return !isFinite(x = +x) || x == 0 ? x : x < 0 ? -asinh(-x) : Math.log(x + Math.sqrt(x * x + 1));
}

// Tor Browser bug: Math.asinh(0) -> -0
$export($export.S + $export.F * !($asinh && 1 / $asinh(0) > 0), 'Math', { asinh: asinh });

},{"./_export":"node_modules/core-js/modules/_export.js"}],"node_modules/core-js/modules/es6.math.atanh.js":[function(require,module,exports) {
// 20.2.2.7 Math.atanh(x)
var $export = require('./_export');
var $atanh = Math.atanh;

// Tor Browser bug: Math.atanh(-0) -> 0
$export($export.S + $export.F * !($atanh && 1 / $atanh(-0) < 0), 'Math', {
  atanh: function atanh(x) {
    return (x = +x) == 0 ? x : Math.log((1 + x) / (1 - x)) / 2;
  }
});

},{"./_export":"node_modules/core-js/modules/_export.js"}],"node_modules/core-js/modules/_math-sign.js":[function(require,module,exports) {
// 20.2.2.28 Math.sign(x)
module.exports = Math.sign || function sign(x) {
  // eslint-disable-next-line no-self-compare
  return (x = +x) == 0 || x != x ? x : x < 0 ? -1 : 1;
};

},{}],"node_modules/core-js/modules/es6.math.cbrt.js":[function(require,module,exports) {
// 20.2.2.9 Math.cbrt(x)
var $export = require('./_export');
var sign = require('./_math-sign');

$export($export.S, 'Math', {
  cbrt: function cbrt(x) {
    return sign(x = +x) * Math.pow(Math.abs(x), 1 / 3);
  }
});

},{"./_export":"node_modules/core-js/modules/_export.js","./_math-sign":"node_modules/core-js/modules/_math-sign.js"}],"node_modules/core-js/modules/es6.math.clz32.js":[function(require,module,exports) {
// 20.2.2.11 Math.clz32(x)
var $export = require('./_export');

$export($export.S, 'Math', {
  clz32: function clz32(x) {
    return (x >>>= 0) ? 31 - Math.floor(Math.log(x + 0.5) * Math.LOG2E) : 32;
  }
});

},{"./_export":"node_modules/core-js/modules/_export.js"}],"node_modules/core-js/modules/es6.math.cosh.js":[function(require,module,exports) {
// 20.2.2.12 Math.cosh(x)
var $export = require('./_export');
var exp = Math.exp;

$export($export.S, 'Math', {
  cosh: function cosh(x) {
    return (exp(x = +x) + exp(-x)) / 2;
  }
});

},{"./_export":"node_modules/core-js/modules/_export.js"}],"node_modules/core-js/modules/_math-expm1.js":[function(require,module,exports) {
// 20.2.2.14 Math.expm1(x)
var $expm1 = Math.expm1;
module.exports = (!$expm1
  // Old FF bug
  || $expm1(10) > 22025.465794806719 || $expm1(10) < 22025.4657948067165168
  // Tor Browser bug
  || $expm1(-2e-17) != -2e-17
) ? function expm1(x) {
  return (x = +x) == 0 ? x : x > -1e-6 && x < 1e-6 ? x + x * x / 2 : Math.exp(x) - 1;
} : $expm1;

},{}],"node_modules/core-js/modules/es6.math.expm1.js":[function(require,module,exports) {
// 20.2.2.14 Math.expm1(x)
var $export = require('./_export');
var $expm1 = require('./_math-expm1');

$export($export.S + $export.F * ($expm1 != Math.expm1), 'Math', { expm1: $expm1 });

},{"./_export":"node_modules/core-js/modules/_export.js","./_math-expm1":"node_modules/core-js/modules/_math-expm1.js"}],"node_modules/core-js/modules/_math-fround.js":[function(require,module,exports) {
// 20.2.2.16 Math.fround(x)
var sign = require('./_math-sign');
var pow = Math.pow;
var EPSILON = pow(2, -52);
var EPSILON32 = pow(2, -23);
var MAX32 = pow(2, 127) * (2 - EPSILON32);
var MIN32 = pow(2, -126);

var roundTiesToEven = function (n) {
  return n + 1 / EPSILON - 1 / EPSILON;
};

module.exports = Math.fround || function fround(x) {
  var $abs = Math.abs(x);
  var $sign = sign(x);
  var a, result;
  if ($abs < MIN32) return $sign * roundTiesToEven($abs / MIN32 / EPSILON32) * MIN32 * EPSILON32;
  a = (1 + EPSILON32 / EPSILON) * $abs;
  result = a - (a - $abs);
  // eslint-disable-next-line no-self-compare
  if (result > MAX32 || result != result) return $sign * Infinity;
  return $sign * result;
};

},{"./_math-sign":"node_modules/core-js/modules/_math-sign.js"}],"node_modules/core-js/modules/es6.math.fround.js":[function(require,module,exports) {
// 20.2.2.16 Math.fround(x)
var $export = require('./_export');

$export($export.S, 'Math', { fround: require('./_math-fround') });

},{"./_export":"node_modules/core-js/modules/_export.js","./_math-fround":"node_modules/core-js/modules/_math-fround.js"}],"node_modules/core-js/modules/es6.math.hypot.js":[function(require,module,exports) {
// 20.2.2.17 Math.hypot([value1[, value2[, … ]]])
var $export = require('./_export');
var abs = Math.abs;

$export($export.S, 'Math', {
  hypot: function hypot(value1, value2) { // eslint-disable-line no-unused-vars
    var sum = 0;
    var i = 0;
    var aLen = arguments.length;
    var larg = 0;
    var arg, div;
    while (i < aLen) {
      arg = abs(arguments[i++]);
      if (larg < arg) {
        div = larg / arg;
        sum = sum * div * div + 1;
        larg = arg;
      } else if (arg > 0) {
        div = arg / larg;
        sum += div * div;
      } else sum += arg;
    }
    return larg === Infinity ? Infinity : larg * Math.sqrt(sum);
  }
});

},{"./_export":"node_modules/core-js/modules/_export.js"}],"node_modules/core-js/modules/es6.math.imul.js":[function(require,module,exports) {
// 20.2.2.18 Math.imul(x, y)
var $export = require('./_export');
var $imul = Math.imul;

// some WebKit versions fails with big numbers, some has wrong arity
$export($export.S + $export.F * require('./_fails')(function () {
  return $imul(0xffffffff, 5) != -5 || $imul.length != 2;
}), 'Math', {
  imul: function imul(x, y) {
    var UINT16 = 0xffff;
    var xn = +x;
    var yn = +y;
    var xl = UINT16 & xn;
    var yl = UINT16 & yn;
    return 0 | xl * yl + ((UINT16 & xn >>> 16) * yl + xl * (UINT16 & yn >>> 16) << 16 >>> 0);
  }
});

},{"./_export":"node_modules/core-js/modules/_export.js","./_fails":"node_modules/core-js/modules/_fails.js"}],"node_modules/core-js/modules/es6.math.log10.js":[function(require,module,exports) {
// 20.2.2.21 Math.log10(x)
var $export = require('./_export');

$export($export.S, 'Math', {
  log10: function log10(x) {
    return Math.log(x) * Math.LOG10E;
  }
});

},{"./_export":"node_modules/core-js/modules/_export.js"}],"node_modules/core-js/modules/es6.math.log1p.js":[function(require,module,exports) {
// 20.2.2.20 Math.log1p(x)
var $export = require('./_export');

$export($export.S, 'Math', { log1p: require('./_math-log1p') });

},{"./_export":"node_modules/core-js/modules/_export.js","./_math-log1p":"node_modules/core-js/modules/_math-log1p.js"}],"node_modules/core-js/modules/es6.math.log2.js":[function(require,module,exports) {
// 20.2.2.22 Math.log2(x)
var $export = require('./_export');

$export($export.S, 'Math', {
  log2: function log2(x) {
    return Math.log(x) / Math.LN2;
  }
});

},{"./_export":"node_modules/core-js/modules/_export.js"}],"node_modules/core-js/modules/es6.math.sign.js":[function(require,module,exports) {
// 20.2.2.28 Math.sign(x)
var $export = require('./_export');

$export($export.S, 'Math', { sign: require('./_math-sign') });

},{"./_export":"node_modules/core-js/modules/_export.js","./_math-sign":"node_modules/core-js/modules/_math-sign.js"}],"node_modules/core-js/modules/es6.math.sinh.js":[function(require,module,exports) {
// 20.2.2.30 Math.sinh(x)
var $export = require('./_export');
var expm1 = require('./_math-expm1');
var exp = Math.exp;

// V8 near Chromium 38 has a problem with very small numbers
$export($export.S + $export.F * require('./_fails')(function () {
  return !Math.sinh(-2e-17) != -2e-17;
}), 'Math', {
  sinh: function sinh(x) {
    return Math.abs(x = +x) < 1
      ? (expm1(x) - expm1(-x)) / 2
      : (exp(x - 1) - exp(-x - 1)) * (Math.E / 2);
  }
});

},{"./_export":"node_modules/core-js/modules/_export.js","./_math-expm1":"node_modules/core-js/modules/_math-expm1.js","./_fails":"node_modules/core-js/modules/_fails.js"}],"node_modules/core-js/modules/es6.math.tanh.js":[function(require,module,exports) {
// 20.2.2.33 Math.tanh(x)
var $export = require('./_export');
var expm1 = require('./_math-expm1');
var exp = Math.exp;

$export($export.S, 'Math', {
  tanh: function tanh(x) {
    var a = expm1(x = +x);
    var b = expm1(-x);
    return a == Infinity ? 1 : b == Infinity ? -1 : (a - b) / (exp(x) + exp(-x));
  }
});

},{"./_export":"node_modules/core-js/modules/_export.js","./_math-expm1":"node_modules/core-js/modules/_math-expm1.js"}],"node_modules/core-js/modules/es6.math.trunc.js":[function(require,module,exports) {
// 20.2.2.34 Math.trunc(x)
var $export = require('./_export');

$export($export.S, 'Math', {
  trunc: function trunc(it) {
    return (it > 0 ? Math.floor : Math.ceil)(it);
  }
});

},{"./_export":"node_modules/core-js/modules/_export.js"}],"node_modules/core-js/modules/es6.string.from-code-point.js":[function(require,module,exports) {
var $export = require('./_export');
var toAbsoluteIndex = require('./_to-absolute-index');
var fromCharCode = String.fromCharCode;
var $fromCodePoint = String.fromCodePoint;

// length should be 1, old FF problem
$export($export.S + $export.F * (!!$fromCodePoint && $fromCodePoint.length != 1), 'String', {
  // 21.1.2.2 String.fromCodePoint(...codePoints)
  fromCodePoint: function fromCodePoint(x) { // eslint-disable-line no-unused-vars
    var res = [];
    var aLen = arguments.length;
    var i = 0;
    var code;
    while (aLen > i) {
      code = +arguments[i++];
      if (toAbsoluteIndex(code, 0x10ffff) !== code) throw RangeError(code + ' is not a valid code point');
      res.push(code < 0x10000
        ? fromCharCode(code)
        : fromCharCode(((code -= 0x10000) >> 10) + 0xd800, code % 0x400 + 0xdc00)
      );
    } return res.join('');
  }
});

},{"./_export":"node_modules/core-js/modules/_export.js","./_to-absolute-index":"node_modules/core-js/modules/_to-absolute-index.js"}],"node_modules/core-js/modules/es6.string.raw.js":[function(require,module,exports) {
var $export = require('./_export');
var toIObject = require('./_to-iobject');
var toLength = require('./_to-length');

$export($export.S, 'String', {
  // 21.1.2.4 String.raw(callSite, ...substitutions)
  raw: function raw(callSite) {
    var tpl = toIObject(callSite.raw);
    var len = toLength(tpl.length);
    var aLen = arguments.length;
    var res = [];
    var i = 0;
    while (len > i) {
      res.push(String(tpl[i++]));
      if (i < aLen) res.push(String(arguments[i]));
    } return res.join('');
  }
});

},{"./_export":"node_modules/core-js/modules/_export.js","./_to-iobject":"node_modules/core-js/modules/_to-iobject.js","./_to-length":"node_modules/core-js/modules/_to-length.js"}],"node_modules/core-js/modules/es6.string.trim.js":[function(require,module,exports) {
'use strict';
// 21.1.3.25 String.prototype.trim()
require('./_string-trim')('trim', function ($trim) {
  return function trim() {
    return $trim(this, 3);
  };
});

},{"./_string-trim":"node_modules/core-js/modules/_string-trim.js"}],"node_modules/core-js/modules/_string-at.js":[function(require,module,exports) {
var toInteger = require('./_to-integer');
var defined = require('./_defined');
// true  -> String#at
// false -> String#codePointAt
module.exports = function (TO_STRING) {
  return function (that, pos) {
    var s = String(defined(that));
    var i = toInteger(pos);
    var l = s.length;
    var a, b;
    if (i < 0 || i >= l) return TO_STRING ? '' : undefined;
    a = s.charCodeAt(i);
    return a < 0xd800 || a > 0xdbff || i + 1 === l || (b = s.charCodeAt(i + 1)) < 0xdc00 || b > 0xdfff
      ? TO_STRING ? s.charAt(i) : a
      : TO_STRING ? s.slice(i, i + 2) : (a - 0xd800 << 10) + (b - 0xdc00) + 0x10000;
  };
};

},{"./_to-integer":"node_modules/core-js/modules/_to-integer.js","./_defined":"node_modules/core-js/modules/_defined.js"}],"node_modules/core-js/modules/_iterators.js":[function(require,module,exports) {
module.exports = {};

},{}],"node_modules/core-js/modules/_iter-create.js":[function(require,module,exports) {
'use strict';
var create = require('./_object-create');
var descriptor = require('./_property-desc');
var setToStringTag = require('./_set-to-string-tag');
var IteratorPrototype = {};

// 25.1.2.1.1 %IteratorPrototype%[@@iterator]()
require('./_hide')(IteratorPrototype, require('./_wks')('iterator'), function () { return this; });

module.exports = function (Constructor, NAME, next) {
  Constructor.prototype = create(IteratorPrototype, { next: descriptor(1, next) });
  setToStringTag(Constructor, NAME + ' Iterator');
};

},{"./_object-create":"node_modules/core-js/modules/_object-create.js","./_property-desc":"node_modules/core-js/modules/_property-desc.js","./_set-to-string-tag":"node_modules/core-js/modules/_set-to-string-tag.js","./_hide":"node_modules/core-js/modules/_hide.js","./_wks":"node_modules/core-js/modules/_wks.js"}],"node_modules/core-js/modules/_iter-define.js":[function(require,module,exports) {
'use strict';
var LIBRARY = require('./_library');
var $export = require('./_export');
var redefine = require('./_redefine');
var hide = require('./_hide');
var Iterators = require('./_iterators');
var $iterCreate = require('./_iter-create');
var setToStringTag = require('./_set-to-string-tag');
var getPrototypeOf = require('./_object-gpo');
var ITERATOR = require('./_wks')('iterator');
var BUGGY = !([].keys && 'next' in [].keys()); // Safari has buggy iterators w/o `next`
var FF_ITERATOR = '@@iterator';
var KEYS = 'keys';
var VALUES = 'values';

var returnThis = function () { return this; };

module.exports = function (Base, NAME, Constructor, next, DEFAULT, IS_SET, FORCED) {
  $iterCreate(Constructor, NAME, next);
  var getMethod = function (kind) {
    if (!BUGGY && kind in proto) return proto[kind];
    switch (kind) {
      case KEYS: return function keys() { return new Constructor(this, kind); };
      case VALUES: return function values() { return new Constructor(this, kind); };
    } return function entries() { return new Constructor(this, kind); };
  };
  var TAG = NAME + ' Iterator';
  var DEF_VALUES = DEFAULT == VALUES;
  var VALUES_BUG = false;
  var proto = Base.prototype;
  var $native = proto[ITERATOR] || proto[FF_ITERATOR] || DEFAULT && proto[DEFAULT];
  var $default = $native || getMethod(DEFAULT);
  var $entries = DEFAULT ? !DEF_VALUES ? $default : getMethod('entries') : undefined;
  var $anyNative = NAME == 'Array' ? proto.entries || $native : $native;
  var methods, key, IteratorPrototype;
  // Fix native
  if ($anyNative) {
    IteratorPrototype = getPrototypeOf($anyNative.call(new Base()));
    if (IteratorPrototype !== Object.prototype && IteratorPrototype.next) {
      // Set @@toStringTag to native iterators
      setToStringTag(IteratorPrototype, TAG, true);
      // fix for some old engines
      if (!LIBRARY && typeof IteratorPrototype[ITERATOR] != 'function') hide(IteratorPrototype, ITERATOR, returnThis);
    }
  }
  // fix Array#{values, @@iterator}.name in V8 / FF
  if (DEF_VALUES && $native && $native.name !== VALUES) {
    VALUES_BUG = true;
    $default = function values() { return $native.call(this); };
  }
  // Define iterator
  if ((!LIBRARY || FORCED) && (BUGGY || VALUES_BUG || !proto[ITERATOR])) {
    hide(proto, ITERATOR, $default);
  }
  // Plug for library
  Iterators[NAME] = $default;
  Iterators[TAG] = returnThis;
  if (DEFAULT) {
    methods = {
      values: DEF_VALUES ? $default : getMethod(VALUES),
      keys: IS_SET ? $default : getMethod(KEYS),
      entries: $entries
    };
    if (FORCED) for (key in methods) {
      if (!(key in proto)) redefine(proto, key, methods[key]);
    } else $export($export.P + $export.F * (BUGGY || VALUES_BUG), NAME, methods);
  }
  return methods;
};

},{"./_library":"node_modules/core-js/modules/_library.js","./_export":"node_modules/core-js/modules/_export.js","./_redefine":"node_modules/core-js/modules/_redefine.js","./_hide":"node_modules/core-js/modules/_hide.js","./_iterators":"node_modules/core-js/modules/_iterators.js","./_iter-create":"node_modules/core-js/modules/_iter-create.js","./_set-to-string-tag":"node_modules/core-js/modules/_set-to-string-tag.js","./_object-gpo":"node_modules/core-js/modules/_object-gpo.js","./_wks":"node_modules/core-js/modules/_wks.js"}],"node_modules/core-js/modules/es6.string.iterator.js":[function(require,module,exports) {
'use strict';
var $at = require('./_string-at')(true);

// 21.1.3.27 String.prototype[@@iterator]()
require('./_iter-define')(String, 'String', function (iterated) {
  this._t = String(iterated); // target
  this._i = 0;                // next index
// 21.1.5.2.1 %StringIteratorPrototype%.next()
}, function () {
  var O = this._t;
  var index = this._i;
  var point;
  if (index >= O.length) return { value: undefined, done: true };
  point = $at(O, index);
  this._i += point.length;
  return { value: point, done: false };
});

},{"./_string-at":"node_modules/core-js/modules/_string-at.js","./_iter-define":"node_modules/core-js/modules/_iter-define.js"}],"node_modules/core-js/modules/es6.string.code-point-at.js":[function(require,module,exports) {
'use strict';
var $export = require('./_export');
var $at = require('./_string-at')(false);
$export($export.P, 'String', {
  // 21.1.3.3 String.prototype.codePointAt(pos)
  codePointAt: function codePointAt(pos) {
    return $at(this, pos);
  }
});

},{"./_export":"node_modules/core-js/modules/_export.js","./_string-at":"node_modules/core-js/modules/_string-at.js"}],"node_modules/core-js/modules/_is-regexp.js":[function(require,module,exports) {
// 7.2.8 IsRegExp(argument)
var isObject = require('./_is-object');
var cof = require('./_cof');
var MATCH = require('./_wks')('match');
module.exports = function (it) {
  var isRegExp;
  return isObject(it) && ((isRegExp = it[MATCH]) !== undefined ? !!isRegExp : cof(it) == 'RegExp');
};

},{"./_is-object":"node_modules/core-js/modules/_is-object.js","./_cof":"node_modules/core-js/modules/_cof.js","./_wks":"node_modules/core-js/modules/_wks.js"}],"node_modules/core-js/modules/_string-context.js":[function(require,module,exports) {
// helper for String#{startsWith, endsWith, includes}
var isRegExp = require('./_is-regexp');
var defined = require('./_defined');

module.exports = function (that, searchString, NAME) {
  if (isRegExp(searchString)) throw TypeError('String#' + NAME + " doesn't accept regex!");
  return String(defined(that));
};

},{"./_is-regexp":"node_modules/core-js/modules/_is-regexp.js","./_defined":"node_modules/core-js/modules/_defined.js"}],"node_modules/core-js/modules/_fails-is-regexp.js":[function(require,module,exports) {
var MATCH = require('./_wks')('match');
module.exports = function (KEY) {
  var re = /./;
  try {
    '/./'[KEY](re);
  } catch (e) {
    try {
      re[MATCH] = false;
      return !'/./'[KEY](re);
    } catch (f) { /* empty */ }
  } return true;
};

},{"./_wks":"node_modules/core-js/modules/_wks.js"}],"node_modules/core-js/modules/es6.string.ends-with.js":[function(require,module,exports) {
// 21.1.3.6 String.prototype.endsWith(searchString [, endPosition])
'use strict';
var $export = require('./_export');
var toLength = require('./_to-length');
var context = require('./_string-context');
var ENDS_WITH = 'endsWith';
var $endsWith = ''[ENDS_WITH];

$export($export.P + $export.F * require('./_fails-is-regexp')(ENDS_WITH), 'String', {
  endsWith: function endsWith(searchString /* , endPosition = @length */) {
    var that = context(this, searchString, ENDS_WITH);
    var endPosition = arguments.length > 1 ? arguments[1] : undefined;
    var len = toLength(that.length);
    var end = endPosition === undefined ? len : Math.min(toLength(endPosition), len);
    var search = String(searchString);
    return $endsWith
      ? $endsWith.call(that, search, end)
      : that.slice(end - search.length, end) === search;
  }
});

},{"./_export":"node_modules/core-js/modules/_export.js","./_to-length":"node_modules/core-js/modules/_to-length.js","./_string-context":"node_modules/core-js/modules/_string-context.js","./_fails-is-regexp":"node_modules/core-js/modules/_fails-is-regexp.js"}],"node_modules/core-js/modules/es6.string.includes.js":[function(require,module,exports) {
// 21.1.3.7 String.prototype.includes(searchString, position = 0)
'use strict';
var $export = require('./_export');
var context = require('./_string-context');
var INCLUDES = 'includes';

$export($export.P + $export.F * require('./_fails-is-regexp')(INCLUDES), 'String', {
  includes: function includes(searchString /* , position = 0 */) {
    return !!~context(this, searchString, INCLUDES)
      .indexOf(searchString, arguments.length > 1 ? arguments[1] : undefined);
  }
});

},{"./_export":"node_modules/core-js/modules/_export.js","./_string-context":"node_modules/core-js/modules/_string-context.js","./_fails-is-regexp":"node_modules/core-js/modules/_fails-is-regexp.js"}],"node_modules/core-js/modules/es6.string.repeat.js":[function(require,module,exports) {
var $export = require('./_export');

$export($export.P, 'String', {
  // 21.1.3.13 String.prototype.repeat(count)
  repeat: require('./_string-repeat')
});

},{"./_export":"node_modules/core-js/modules/_export.js","./_string-repeat":"node_modules/core-js/modules/_string-repeat.js"}],"node_modules/core-js/modules/es6.string.starts-with.js":[function(require,module,exports) {
// 21.1.3.18 String.prototype.startsWith(searchString [, position ])
'use strict';
var $export = require('./_export');
var toLength = require('./_to-length');
var context = require('./_string-context');
var STARTS_WITH = 'startsWith';
var $startsWith = ''[STARTS_WITH];

$export($export.P + $export.F * require('./_fails-is-regexp')(STARTS_WITH), 'String', {
  startsWith: function startsWith(searchString /* , position = 0 */) {
    var that = context(this, searchString, STARTS_WITH);
    var index = toLength(Math.min(arguments.length > 1 ? arguments[1] : undefined, that.length));
    var search = String(searchString);
    return $startsWith
      ? $startsWith.call(that, search, index)
      : that.slice(index, index + search.length) === search;
  }
});

},{"./_export":"node_modules/core-js/modules/_export.js","./_to-length":"node_modules/core-js/modules/_to-length.js","./_string-context":"node_modules/core-js/modules/_string-context.js","./_fails-is-regexp":"node_modules/core-js/modules/_fails-is-regexp.js"}],"node_modules/core-js/modules/_string-html.js":[function(require,module,exports) {
var $export = require('./_export');
var fails = require('./_fails');
var defined = require('./_defined');
var quot = /"/g;
// B.2.3.2.1 CreateHTML(string, tag, attribute, value)
var createHTML = function (string, tag, attribute, value) {
  var S = String(defined(string));
  var p1 = '<' + tag;
  if (attribute !== '') p1 += ' ' + attribute + '="' + String(value).replace(quot, '&quot;') + '"';
  return p1 + '>' + S + '</' + tag + '>';
};
module.exports = function (NAME, exec) {
  var O = {};
  O[NAME] = exec(createHTML);
  $export($export.P + $export.F * fails(function () {
    var test = ''[NAME]('"');
    return test !== test.toLowerCase() || test.split('"').length > 3;
  }), 'String', O);
};

},{"./_export":"node_modules/core-js/modules/_export.js","./_fails":"node_modules/core-js/modules/_fails.js","./_defined":"node_modules/core-js/modules/_defined.js"}],"node_modules/core-js/modules/es6.string.anchor.js":[function(require,module,exports) {
'use strict';
// B.2.3.2 String.prototype.anchor(name)
require('./_string-html')('anchor', function (createHTML) {
  return function anchor(name) {
    return createHTML(this, 'a', 'name', name);
  };
});

},{"./_string-html":"node_modules/core-js/modules/_string-html.js"}],"node_modules/core-js/modules/es6.string.big.js":[function(require,module,exports) {
'use strict';
// B.2.3.3 String.prototype.big()
require('./_string-html')('big', function (createHTML) {
  return function big() {
    return createHTML(this, 'big', '', '');
  };
});

},{"./_string-html":"node_modules/core-js/modules/_string-html.js"}],"node_modules/core-js/modules/es6.string.blink.js":[function(require,module,exports) {
'use strict';
// B.2.3.4 String.prototype.blink()
require('./_string-html')('blink', function (createHTML) {
  return function blink() {
    return createHTML(this, 'blink', '', '');
  };
});

},{"./_string-html":"node_modules/core-js/modules/_string-html.js"}],"node_modules/core-js/modules/es6.string.bold.js":[function(require,module,exports) {
'use strict';
// B.2.3.5 String.prototype.bold()
require('./_string-html')('bold', function (createHTML) {
  return function bold() {
    return createHTML(this, 'b', '', '');
  };
});

},{"./_string-html":"node_modules/core-js/modules/_string-html.js"}],"node_modules/core-js/modules/es6.string.fixed.js":[function(require,module,exports) {
'use strict';
// B.2.3.6 String.prototype.fixed()
require('./_string-html')('fixed', function (createHTML) {
  return function fixed() {
    return createHTML(this, 'tt', '', '');
  };
});

},{"./_string-html":"node_modules/core-js/modules/_string-html.js"}],"node_modules/core-js/modules/es6.string.fontcolor.js":[function(require,module,exports) {
'use strict';
// B.2.3.7 String.prototype.fontcolor(color)
require('./_string-html')('fontcolor', function (createHTML) {
  return function fontcolor(color) {
    return createHTML(this, 'font', 'color', color);
  };
});

},{"./_string-html":"node_modules/core-js/modules/_string-html.js"}],"node_modules/core-js/modules/es6.string.fontsize.js":[function(require,module,exports) {
'use strict';
// B.2.3.8 String.prototype.fontsize(size)
require('./_string-html')('fontsize', function (createHTML) {
  return function fontsize(size) {
    return createHTML(this, 'font', 'size', size);
  };
});

},{"./_string-html":"node_modules/core-js/modules/_string-html.js"}],"node_modules/core-js/modules/es6.string.italics.js":[function(require,module,exports) {
'use strict';
// B.2.3.9 String.prototype.italics()
require('./_string-html')('italics', function (createHTML) {
  return function italics() {
    return createHTML(this, 'i', '', '');
  };
});

},{"./_string-html":"node_modules/core-js/modules/_string-html.js"}],"node_modules/core-js/modules/es6.string.link.js":[function(require,module,exports) {
'use strict';
// B.2.3.10 String.prototype.link(url)
require('./_string-html')('link', function (createHTML) {
  return function link(url) {
    return createHTML(this, 'a', 'href', url);
  };
});

},{"./_string-html":"node_modules/core-js/modules/_string-html.js"}],"node_modules/core-js/modules/es6.string.small.js":[function(require,module,exports) {
'use strict';
// B.2.3.11 String.prototype.small()
require('./_string-html')('small', function (createHTML) {
  return function small() {
    return createHTML(this, 'small', '', '');
  };
});

},{"./_string-html":"node_modules/core-js/modules/_string-html.js"}],"node_modules/core-js/modules/es6.string.strike.js":[function(require,module,exports) {
'use strict';
// B.2.3.12 String.prototype.strike()
require('./_string-html')('strike', function (createHTML) {
  return function strike() {
    return createHTML(this, 'strike', '', '');
  };
});

},{"./_string-html":"node_modules/core-js/modules/_string-html.js"}],"node_modules/core-js/modules/es6.string.sub.js":[function(require,module,exports) {
'use strict';
// B.2.3.13 String.prototype.sub()
require('./_string-html')('sub', function (createHTML) {
  return function sub() {
    return createHTML(this, 'sub', '', '');
  };
});

},{"./_string-html":"node_modules/core-js/modules/_string-html.js"}],"node_modules/core-js/modules/es6.string.sup.js":[function(require,module,exports) {
'use strict';
// B.2.3.14 String.prototype.sup()
require('./_string-html')('sup', function (createHTML) {
  return function sup() {
    return createHTML(this, 'sup', '', '');
  };
});

},{"./_string-html":"node_modules/core-js/modules/_string-html.js"}],"node_modules/core-js/modules/es6.date.now.js":[function(require,module,exports) {
// 20.3.3.1 / 15.9.4.4 Date.now()
var $export = require('./_export');

$export($export.S, 'Date', { now: function () { return new Date().getTime(); } });

},{"./_export":"node_modules/core-js/modules/_export.js"}],"node_modules/core-js/modules/es6.date.to-json.js":[function(require,module,exports) {
'use strict';
var $export = require('./_export');
var toObject = require('./_to-object');
var toPrimitive = require('./_to-primitive');

$export($export.P + $export.F * require('./_fails')(function () {
  return new Date(NaN).toJSON() !== null
    || Date.prototype.toJSON.call({ toISOString: function () { return 1; } }) !== 1;
}), 'Date', {
  // eslint-disable-next-line no-unused-vars
  toJSON: function toJSON(key) {
    var O = toObject(this);
    var pv = toPrimitive(O);
    return typeof pv == 'number' && !isFinite(pv) ? null : O.toISOString();
  }
});

},{"./_export":"node_modules/core-js/modules/_export.js","./_to-object":"node_modules/core-js/modules/_to-object.js","./_to-primitive":"node_modules/core-js/modules/_to-primitive.js","./_fails":"node_modules/core-js/modules/_fails.js"}],"node_modules/core-js/modules/_date-to-iso-string.js":[function(require,module,exports) {
'use strict';
// 20.3.4.36 / 15.9.5.43 Date.prototype.toISOString()
var fails = require('./_fails');
var getTime = Date.prototype.getTime;
var $toISOString = Date.prototype.toISOString;

var lz = function (num) {
  return num > 9 ? num : '0' + num;
};

// PhantomJS / old WebKit has a broken implementations
module.exports = (fails(function () {
  return $toISOString.call(new Date(-5e13 - 1)) != '0385-07-25T07:06:39.999Z';
}) || !fails(function () {
  $toISOString.call(new Date(NaN));
})) ? function toISOString() {
  if (!isFinite(getTime.call(this))) throw RangeError('Invalid time value');
  var d = this;
  var y = d.getUTCFullYear();
  var m = d.getUTCMilliseconds();
  var s = y < 0 ? '-' : y > 9999 ? '+' : '';
  return s + ('00000' + Math.abs(y)).slice(s ? -6 : -4) +
    '-' + lz(d.getUTCMonth() + 1) + '-' + lz(d.getUTCDate()) +
    'T' + lz(d.getUTCHours()) + ':' + lz(d.getUTCMinutes()) +
    ':' + lz(d.getUTCSeconds()) + '.' + (m > 99 ? m : '0' + lz(m)) + 'Z';
} : $toISOString;

},{"./_fails":"node_modules/core-js/modules/_fails.js"}],"node_modules/core-js/modules/es6.date.to-iso-string.js":[function(require,module,exports) {
// 20.3.4.36 / 15.9.5.43 Date.prototype.toISOString()
var $export = require('./_export');
var toISOString = require('./_date-to-iso-string');

// PhantomJS / old WebKit has a broken implementations
$export($export.P + $export.F * (Date.prototype.toISOString !== toISOString), 'Date', {
  toISOString: toISOString
});

},{"./_export":"node_modules/core-js/modules/_export.js","./_date-to-iso-string":"node_modules/core-js/modules/_date-to-iso-string.js"}],"node_modules/core-js/modules/es6.date.to-string.js":[function(require,module,exports) {
var DateProto = Date.prototype;
var INVALID_DATE = 'Invalid Date';
var TO_STRING = 'toString';
var $toString = DateProto[TO_STRING];
var getTime = DateProto.getTime;
if (new Date(NaN) + '' != INVALID_DATE) {
  require('./_redefine')(DateProto, TO_STRING, function toString() {
    var value = getTime.call(this);
    // eslint-disable-next-line no-self-compare
    return value === value ? $toString.call(this) : INVALID_DATE;
  });
}

},{"./_redefine":"node_modules/core-js/modules/_redefine.js"}],"node_modules/core-js/modules/_date-to-primitive.js":[function(require,module,exports) {
'use strict';
var anObject = require('./_an-object');
var toPrimitive = require('./_to-primitive');
var NUMBER = 'number';

module.exports = function (hint) {
  if (hint !== 'string' && hint !== NUMBER && hint !== 'default') throw TypeError('Incorrect hint');
  return toPrimitive(anObject(this), hint != NUMBER);
};

},{"./_an-object":"node_modules/core-js/modules/_an-object.js","./_to-primitive":"node_modules/core-js/modules/_to-primitive.js"}],"node_modules/core-js/modules/es6.date.to-primitive.js":[function(require,module,exports) {
var TO_PRIMITIVE = require('./_wks')('toPrimitive');
var proto = Date.prototype;

if (!(TO_PRIMITIVE in proto)) require('./_hide')(proto, TO_PRIMITIVE, require('./_date-to-primitive'));

},{"./_wks":"node_modules/core-js/modules/_wks.js","./_hide":"node_modules/core-js/modules/_hide.js","./_date-to-primitive":"node_modules/core-js/modules/_date-to-primitive.js"}],"node_modules/core-js/modules/es6.array.is-array.js":[function(require,module,exports) {
// 22.1.2.2 / 15.4.3.2 Array.isArray(arg)
var $export = require('./_export');

$export($export.S, 'Array', { isArray: require('./_is-array') });

},{"./_export":"node_modules/core-js/modules/_export.js","./_is-array":"node_modules/core-js/modules/_is-array.js"}],"node_modules/core-js/modules/_iter-call.js":[function(require,module,exports) {
// call something on iterator step with safe closing on error
var anObject = require('./_an-object');
module.exports = function (iterator, fn, value, entries) {
  try {
    return entries ? fn(anObject(value)[0], value[1]) : fn(value);
  // 7.4.6 IteratorClose(iterator, completion)
  } catch (e) {
    var ret = iterator['return'];
    if (ret !== undefined) anObject(ret.call(iterator));
    throw e;
  }
};

},{"./_an-object":"node_modules/core-js/modules/_an-object.js"}],"node_modules/core-js/modules/_is-array-iter.js":[function(require,module,exports) {
// check on default Array iterator
var Iterators = require('./_iterators');
var ITERATOR = require('./_wks')('iterator');
var ArrayProto = Array.prototype;

module.exports = function (it) {
  return it !== undefined && (Iterators.Array === it || ArrayProto[ITERATOR] === it);
};

},{"./_iterators":"node_modules/core-js/modules/_iterators.js","./_wks":"node_modules/core-js/modules/_wks.js"}],"node_modules/core-js/modules/_create-property.js":[function(require,module,exports) {
'use strict';
var $defineProperty = require('./_object-dp');
var createDesc = require('./_property-desc');

module.exports = function (object, index, value) {
  if (index in object) $defineProperty.f(object, index, createDesc(0, value));
  else object[index] = value;
};

},{"./_object-dp":"node_modules/core-js/modules/_object-dp.js","./_property-desc":"node_modules/core-js/modules/_property-desc.js"}],"node_modules/core-js/modules/core.get-iterator-method.js":[function(require,module,exports) {
var classof = require('./_classof');
var ITERATOR = require('./_wks')('iterator');
var Iterators = require('./_iterators');
module.exports = require('./_core').getIteratorMethod = function (it) {
  if (it != undefined) return it[ITERATOR]
    || it['@@iterator']
    || Iterators[classof(it)];
};

},{"./_classof":"node_modules/core-js/modules/_classof.js","./_wks":"node_modules/core-js/modules/_wks.js","./_iterators":"node_modules/core-js/modules/_iterators.js","./_core":"node_modules/core-js/modules/_core.js"}],"node_modules/core-js/modules/_iter-detect.js":[function(require,module,exports) {
var ITERATOR = require('./_wks')('iterator');
var SAFE_CLOSING = false;

try {
  var riter = [7][ITERATOR]();
  riter['return'] = function () { SAFE_CLOSING = true; };
  // eslint-disable-next-line no-throw-literal
  Array.from(riter, function () { throw 2; });
} catch (e) { /* empty */ }

module.exports = function (exec, skipClosing) {
  if (!skipClosing && !SAFE_CLOSING) return false;
  var safe = false;
  try {
    var arr = [7];
    var iter = arr[ITERATOR]();
    iter.next = function () { return { done: safe = true }; };
    arr[ITERATOR] = function () { return iter; };
    exec(arr);
  } catch (e) { /* empty */ }
  return safe;
};

},{"./_wks":"node_modules/core-js/modules/_wks.js"}],"node_modules/core-js/modules/es6.array.from.js":[function(require,module,exports) {
'use strict';
var ctx = require('./_ctx');
var $export = require('./_export');
var toObject = require('./_to-object');
var call = require('./_iter-call');
var isArrayIter = require('./_is-array-iter');
var toLength = require('./_to-length');
var createProperty = require('./_create-property');
var getIterFn = require('./core.get-iterator-method');

$export($export.S + $export.F * !require('./_iter-detect')(function (iter) { Array.from(iter); }), 'Array', {
  // 22.1.2.1 Array.from(arrayLike, mapfn = undefined, thisArg = undefined)
  from: function from(arrayLike /* , mapfn = undefined, thisArg = undefined */) {
    var O = toObject(arrayLike);
    var C = typeof this == 'function' ? this : Array;
    var aLen = arguments.length;
    var mapfn = aLen > 1 ? arguments[1] : undefined;
    var mapping = mapfn !== undefined;
    var index = 0;
    var iterFn = getIterFn(O);
    var length, result, step, iterator;
    if (mapping) mapfn = ctx(mapfn, aLen > 2 ? arguments[2] : undefined, 2);
    // if object isn't iterable or it's array with default iterator - use simple case
    if (iterFn != undefined && !(C == Array && isArrayIter(iterFn))) {
      for (iterator = iterFn.call(O), result = new C(); !(step = iterator.next()).done; index++) {
        createProperty(result, index, mapping ? call(iterator, mapfn, [step.value, index], true) : step.value);
      }
    } else {
      length = toLength(O.length);
      for (result = new C(length); length > index; index++) {
        createProperty(result, index, mapping ? mapfn(O[index], index) : O[index]);
      }
    }
    result.length = index;
    return result;
  }
});

},{"./_ctx":"node_modules/core-js/modules/_ctx.js","./_export":"node_modules/core-js/modules/_export.js","./_to-object":"node_modules/core-js/modules/_to-object.js","./_iter-call":"node_modules/core-js/modules/_iter-call.js","./_is-array-iter":"node_modules/core-js/modules/_is-array-iter.js","./_to-length":"node_modules/core-js/modules/_to-length.js","./_create-property":"node_modules/core-js/modules/_create-property.js","./core.get-iterator-method":"node_modules/core-js/modules/core.get-iterator-method.js","./_iter-detect":"node_modules/core-js/modules/_iter-detect.js"}],"node_modules/core-js/modules/es6.array.of.js":[function(require,module,exports) {
'use strict';
var $export = require('./_export');
var createProperty = require('./_create-property');

// WebKit Array.of isn't generic
$export($export.S + $export.F * require('./_fails')(function () {
  function F() { /* empty */ }
  return !(Array.of.call(F) instanceof F);
}), 'Array', {
  // 22.1.2.3 Array.of( ...items)
  of: function of(/* ...args */) {
    var index = 0;
    var aLen = arguments.length;
    var result = new (typeof this == 'function' ? this : Array)(aLen);
    while (aLen > index) createProperty(result, index, arguments[index++]);
    result.length = aLen;
    return result;
  }
});

},{"./_export":"node_modules/core-js/modules/_export.js","./_create-property":"node_modules/core-js/modules/_create-property.js","./_fails":"node_modules/core-js/modules/_fails.js"}],"node_modules/core-js/modules/_strict-method.js":[function(require,module,exports) {
'use strict';
var fails = require('./_fails');

module.exports = function (method, arg) {
  return !!method && fails(function () {
    // eslint-disable-next-line no-useless-call
    arg ? method.call(null, function () { /* empty */ }, 1) : method.call(null);
  });
};

},{"./_fails":"node_modules/core-js/modules/_fails.js"}],"node_modules/core-js/modules/es6.array.join.js":[function(require,module,exports) {
'use strict';
// 22.1.3.13 Array.prototype.join(separator)
var $export = require('./_export');
var toIObject = require('./_to-iobject');
var arrayJoin = [].join;

// fallback for not array-like strings
$export($export.P + $export.F * (require('./_iobject') != Object || !require('./_strict-method')(arrayJoin)), 'Array', {
  join: function join(separator) {
    return arrayJoin.call(toIObject(this), separator === undefined ? ',' : separator);
  }
});

},{"./_export":"node_modules/core-js/modules/_export.js","./_to-iobject":"node_modules/core-js/modules/_to-iobject.js","./_iobject":"node_modules/core-js/modules/_iobject.js","./_strict-method":"node_modules/core-js/modules/_strict-method.js"}],"node_modules/core-js/modules/es6.array.slice.js":[function(require,module,exports) {
'use strict';
var $export = require('./_export');
var html = require('./_html');
var cof = require('./_cof');
var toAbsoluteIndex = require('./_to-absolute-index');
var toLength = require('./_to-length');
var arraySlice = [].slice;

// fallback for not array-like ES3 strings and DOM objects
$export($export.P + $export.F * require('./_fails')(function () {
  if (html) arraySlice.call(html);
}), 'Array', {
  slice: function slice(begin, end) {
    var len = toLength(this.length);
    var klass = cof(this);
    end = end === undefined ? len : end;
    if (klass == 'Array') return arraySlice.call(this, begin, end);
    var start = toAbsoluteIndex(begin, len);
    var upTo = toAbsoluteIndex(end, len);
    var size = toLength(upTo - start);
    var cloned = new Array(size);
    var i = 0;
    for (; i < size; i++) cloned[i] = klass == 'String'
      ? this.charAt(start + i)
      : this[start + i];
    return cloned;
  }
});

},{"./_export":"node_modules/core-js/modules/_export.js","./_html":"node_modules/core-js/modules/_html.js","./_cof":"node_modules/core-js/modules/_cof.js","./_to-absolute-index":"node_modules/core-js/modules/_to-absolute-index.js","./_to-length":"node_modules/core-js/modules/_to-length.js","./_fails":"node_modules/core-js/modules/_fails.js"}],"node_modules/core-js/modules/es6.array.sort.js":[function(require,module,exports) {
'use strict';
var $export = require('./_export');
var aFunction = require('./_a-function');
var toObject = require('./_to-object');
var fails = require('./_fails');
var $sort = [].sort;
var test = [1, 2, 3];

$export($export.P + $export.F * (fails(function () {
  // IE8-
  test.sort(undefined);
}) || !fails(function () {
  // V8 bug
  test.sort(null);
  // Old WebKit
}) || !require('./_strict-method')($sort)), 'Array', {
  // 22.1.3.25 Array.prototype.sort(comparefn)
  sort: function sort(comparefn) {
    return comparefn === undefined
      ? $sort.call(toObject(this))
      : $sort.call(toObject(this), aFunction(comparefn));
  }
});

},{"./_export":"node_modules/core-js/modules/_export.js","./_a-function":"node_modules/core-js/modules/_a-function.js","./_to-object":"node_modules/core-js/modules/_to-object.js","./_fails":"node_modules/core-js/modules/_fails.js","./_strict-method":"node_modules/core-js/modules/_strict-method.js"}],"node_modules/core-js/modules/_array-species-constructor.js":[function(require,module,exports) {
var isObject = require('./_is-object');
var isArray = require('./_is-array');
var SPECIES = require('./_wks')('species');

module.exports = function (original) {
  var C;
  if (isArray(original)) {
    C = original.constructor;
    // cross-realm fallback
    if (typeof C == 'function' && (C === Array || isArray(C.prototype))) C = undefined;
    if (isObject(C)) {
      C = C[SPECIES];
      if (C === null) C = undefined;
    }
  } return C === undefined ? Array : C;
};

},{"./_is-object":"node_modules/core-js/modules/_is-object.js","./_is-array":"node_modules/core-js/modules/_is-array.js","./_wks":"node_modules/core-js/modules/_wks.js"}],"node_modules/core-js/modules/_array-species-create.js":[function(require,module,exports) {
// 9.4.2.3 ArraySpeciesCreate(originalArray, length)
var speciesConstructor = require('./_array-species-constructor');

module.exports = function (original, length) {
  return new (speciesConstructor(original))(length);
};

},{"./_array-species-constructor":"node_modules/core-js/modules/_array-species-constructor.js"}],"node_modules/core-js/modules/_array-methods.js":[function(require,module,exports) {
// 0 -> Array#forEach
// 1 -> Array#map
// 2 -> Array#filter
// 3 -> Array#some
// 4 -> Array#every
// 5 -> Array#find
// 6 -> Array#findIndex
var ctx = require('./_ctx');
var IObject = require('./_iobject');
var toObject = require('./_to-object');
var toLength = require('./_to-length');
var asc = require('./_array-species-create');
module.exports = function (TYPE, $create) {
  var IS_MAP = TYPE == 1;
  var IS_FILTER = TYPE == 2;
  var IS_SOME = TYPE == 3;
  var IS_EVERY = TYPE == 4;
  var IS_FIND_INDEX = TYPE == 6;
  var NO_HOLES = TYPE == 5 || IS_FIND_INDEX;
  var create = $create || asc;
  return function ($this, callbackfn, that) {
    var O = toObject($this);
    var self = IObject(O);
    var f = ctx(callbackfn, that, 3);
    var length = toLength(self.length);
    var index = 0;
    var result = IS_MAP ? create($this, length) : IS_FILTER ? create($this, 0) : undefined;
    var val, res;
    for (;length > index; index++) if (NO_HOLES || index in self) {
      val = self[index];
      res = f(val, index, O);
      if (TYPE) {
        if (IS_MAP) result[index] = res;   // map
        else if (res) switch (TYPE) {
          case 3: return true;             // some
          case 5: return val;              // find
          case 6: return index;            // findIndex
          case 2: result.push(val);        // filter
        } else if (IS_EVERY) return false; // every
      }
    }
    return IS_FIND_INDEX ? -1 : IS_SOME || IS_EVERY ? IS_EVERY : result;
  };
};

},{"./_ctx":"node_modules/core-js/modules/_ctx.js","./_iobject":"node_modules/core-js/modules/_iobject.js","./_to-object":"node_modules/core-js/modules/_to-object.js","./_to-length":"node_modules/core-js/modules/_to-length.js","./_array-species-create":"node_modules/core-js/modules/_array-species-create.js"}],"node_modules/core-js/modules/es6.array.for-each.js":[function(require,module,exports) {
'use strict';
var $export = require('./_export');
var $forEach = require('./_array-methods')(0);
var STRICT = require('./_strict-method')([].forEach, true);

$export($export.P + $export.F * !STRICT, 'Array', {
  // 22.1.3.10 / 15.4.4.18 Array.prototype.forEach(callbackfn [, thisArg])
  forEach: function forEach(callbackfn /* , thisArg */) {
    return $forEach(this, callbackfn, arguments[1]);
  }
});

},{"./_export":"node_modules/core-js/modules/_export.js","./_array-methods":"node_modules/core-js/modules/_array-methods.js","./_strict-method":"node_modules/core-js/modules/_strict-method.js"}],"node_modules/core-js/modules/es6.array.map.js":[function(require,module,exports) {
'use strict';
var $export = require('./_export');
var $map = require('./_array-methods')(1);

$export($export.P + $export.F * !require('./_strict-method')([].map, true), 'Array', {
  // 22.1.3.15 / 15.4.4.19 Array.prototype.map(callbackfn [, thisArg])
  map: function map(callbackfn /* , thisArg */) {
    return $map(this, callbackfn, arguments[1]);
  }
});

},{"./_export":"node_modules/core-js/modules/_export.js","./_array-methods":"node_modules/core-js/modules/_array-methods.js","./_strict-method":"node_modules/core-js/modules/_strict-method.js"}],"node_modules/core-js/modules/es6.array.filter.js":[function(require,module,exports) {
'use strict';
var $export = require('./_export');
var $filter = require('./_array-methods')(2);

$export($export.P + $export.F * !require('./_strict-method')([].filter, true), 'Array', {
  // 22.1.3.7 / 15.4.4.20 Array.prototype.filter(callbackfn [, thisArg])
  filter: function filter(callbackfn /* , thisArg */) {
    return $filter(this, callbackfn, arguments[1]);
  }
});

},{"./_export":"node_modules/core-js/modules/_export.js","./_array-methods":"node_modules/core-js/modules/_array-methods.js","./_strict-method":"node_modules/core-js/modules/_strict-method.js"}],"node_modules/core-js/modules/es6.array.some.js":[function(require,module,exports) {
'use strict';
var $export = require('./_export');
var $some = require('./_array-methods')(3);

$export($export.P + $export.F * !require('./_strict-method')([].some, true), 'Array', {
  // 22.1.3.23 / 15.4.4.17 Array.prototype.some(callbackfn [, thisArg])
  some: function some(callbackfn /* , thisArg */) {
    return $some(this, callbackfn, arguments[1]);
  }
});

},{"./_export":"node_modules/core-js/modules/_export.js","./_array-methods":"node_modules/core-js/modules/_array-methods.js","./_strict-method":"node_modules/core-js/modules/_strict-method.js"}],"node_modules/core-js/modules/es6.array.every.js":[function(require,module,exports) {
'use strict';
var $export = require('./_export');
var $every = require('./_array-methods')(4);

$export($export.P + $export.F * !require('./_strict-method')([].every, true), 'Array', {
  // 22.1.3.5 / 15.4.4.16 Array.prototype.every(callbackfn [, thisArg])
  every: function every(callbackfn /* , thisArg */) {
    return $every(this, callbackfn, arguments[1]);
  }
});

},{"./_export":"node_modules/core-js/modules/_export.js","./_array-methods":"node_modules/core-js/modules/_array-methods.js","./_strict-method":"node_modules/core-js/modules/_strict-method.js"}],"node_modules/core-js/modules/_array-reduce.js":[function(require,module,exports) {
var aFunction = require('./_a-function');
var toObject = require('./_to-object');
var IObject = require('./_iobject');
var toLength = require('./_to-length');

module.exports = function (that, callbackfn, aLen, memo, isRight) {
  aFunction(callbackfn);
  var O = toObject(that);
  var self = IObject(O);
  var length = toLength(O.length);
  var index = isRight ? length - 1 : 0;
  var i = isRight ? -1 : 1;
  if (aLen < 2) for (;;) {
    if (index in self) {
      memo = self[index];
      index += i;
      break;
    }
    index += i;
    if (isRight ? index < 0 : length <= index) {
      throw TypeError('Reduce of empty array with no initial value');
    }
  }
  for (;isRight ? index >= 0 : length > index; index += i) if (index in self) {
    memo = callbackfn(memo, self[index], index, O);
  }
  return memo;
};

},{"./_a-function":"node_modules/core-js/modules/_a-function.js","./_to-object":"node_modules/core-js/modules/_to-object.js","./_iobject":"node_modules/core-js/modules/_iobject.js","./_to-length":"node_modules/core-js/modules/_to-length.js"}],"node_modules/core-js/modules/es6.array.reduce.js":[function(require,module,exports) {
'use strict';
var $export = require('./_export');
var $reduce = require('./_array-reduce');

$export($export.P + $export.F * !require('./_strict-method')([].reduce, true), 'Array', {
  // 22.1.3.18 / 15.4.4.21 Array.prototype.reduce(callbackfn [, initialValue])
  reduce: function reduce(callbackfn /* , initialValue */) {
    return $reduce(this, callbackfn, arguments.length, arguments[1], false);
  }
});

},{"./_export":"node_modules/core-js/modules/_export.js","./_array-reduce":"node_modules/core-js/modules/_array-reduce.js","./_strict-method":"node_modules/core-js/modules/_strict-method.js"}],"node_modules/core-js/modules/es6.array.reduce-right.js":[function(require,module,exports) {
'use strict';
var $export = require('./_export');
var $reduce = require('./_array-reduce');

$export($export.P + $export.F * !require('./_strict-method')([].reduceRight, true), 'Array', {
  // 22.1.3.19 / 15.4.4.22 Array.prototype.reduceRight(callbackfn [, initialValue])
  reduceRight: function reduceRight(callbackfn /* , initialValue */) {
    return $reduce(this, callbackfn, arguments.length, arguments[1], true);
  }
});

},{"./_export":"node_modules/core-js/modules/_export.js","./_array-reduce":"node_modules/core-js/modules/_array-reduce.js","./_strict-method":"node_modules/core-js/modules/_strict-method.js"}],"node_modules/core-js/modules/es6.array.index-of.js":[function(require,module,exports) {
'use strict';
var $export = require('./_export');
var $indexOf = require('./_array-includes')(false);
var $native = [].indexOf;
var NEGATIVE_ZERO = !!$native && 1 / [1].indexOf(1, -0) < 0;

$export($export.P + $export.F * (NEGATIVE_ZERO || !require('./_strict-method')($native)), 'Array', {
  // 22.1.3.11 / 15.4.4.14 Array.prototype.indexOf(searchElement [, fromIndex])
  indexOf: function indexOf(searchElement /* , fromIndex = 0 */) {
    return NEGATIVE_ZERO
      // convert -0 to +0
      ? $native.apply(this, arguments) || 0
      : $indexOf(this, searchElement, arguments[1]);
  }
});

},{"./_export":"node_modules/core-js/modules/_export.js","./_array-includes":"node_modules/core-js/modules/_array-includes.js","./_strict-method":"node_modules/core-js/modules/_strict-method.js"}],"node_modules/core-js/modules/es6.array.last-index-of.js":[function(require,module,exports) {
'use strict';
var $export = require('./_export');
var toIObject = require('./_to-iobject');
var toInteger = require('./_to-integer');
var toLength = require('./_to-length');
var $native = [].lastIndexOf;
var NEGATIVE_ZERO = !!$native && 1 / [1].lastIndexOf(1, -0) < 0;

$export($export.P + $export.F * (NEGATIVE_ZERO || !require('./_strict-method')($native)), 'Array', {
  // 22.1.3.14 / 15.4.4.15 Array.prototype.lastIndexOf(searchElement [, fromIndex])
  lastIndexOf: function lastIndexOf(searchElement /* , fromIndex = @[*-1] */) {
    // convert -0 to +0
    if (NEGATIVE_ZERO) return $native.apply(this, arguments) || 0;
    var O = toIObject(this);
    var length = toLength(O.length);
    var index = length - 1;
    if (arguments.length > 1) index = Math.min(index, toInteger(arguments[1]));
    if (index < 0) index = length + index;
    for (;index >= 0; index--) if (index in O) if (O[index] === searchElement) return index || 0;
    return -1;
  }
});

},{"./_export":"node_modules/core-js/modules/_export.js","./_to-iobject":"node_modules/core-js/modules/_to-iobject.js","./_to-integer":"node_modules/core-js/modules/_to-integer.js","./_to-length":"node_modules/core-js/modules/_to-length.js","./_strict-method":"node_modules/core-js/modules/_strict-method.js"}],"node_modules/core-js/modules/_array-copy-within.js":[function(require,module,exports) {
// 22.1.3.3 Array.prototype.copyWithin(target, start, end = this.length)
'use strict';
var toObject = require('./_to-object');
var toAbsoluteIndex = require('./_to-absolute-index');
var toLength = require('./_to-length');

module.exports = [].copyWithin || function copyWithin(target /* = 0 */, start /* = 0, end = @length */) {
  var O = toObject(this);
  var len = toLength(O.length);
  var to = toAbsoluteIndex(target, len);
  var from = toAbsoluteIndex(start, len);
  var end = arguments.length > 2 ? arguments[2] : undefined;
  var count = Math.min((end === undefined ? len : toAbsoluteIndex(end, len)) - from, len - to);
  var inc = 1;
  if (from < to && to < from + count) {
    inc = -1;
    from += count - 1;
    to += count - 1;
  }
  while (count-- > 0) {
    if (from in O) O[to] = O[from];
    else delete O[to];
    to += inc;
    from += inc;
  } return O;
};

},{"./_to-object":"node_modules/core-js/modules/_to-object.js","./_to-absolute-index":"node_modules/core-js/modules/_to-absolute-index.js","./_to-length":"node_modules/core-js/modules/_to-length.js"}],"node_modules/core-js/modules/_add-to-unscopables.js":[function(require,module,exports) {
// 22.1.3.31 Array.prototype[@@unscopables]
var UNSCOPABLES = require('./_wks')('unscopables');
var ArrayProto = Array.prototype;
if (ArrayProto[UNSCOPABLES] == undefined) require('./_hide')(ArrayProto, UNSCOPABLES, {});
module.exports = function (key) {
  ArrayProto[UNSCOPABLES][key] = true;
};

},{"./_wks":"node_modules/core-js/modules/_wks.js","./_hide":"node_modules/core-js/modules/_hide.js"}],"node_modules/core-js/modules/es6.array.copy-within.js":[function(require,module,exports) {
// 22.1.3.3 Array.prototype.copyWithin(target, start, end = this.length)
var $export = require('./_export');

$export($export.P, 'Array', { copyWithin: require('./_array-copy-within') });

require('./_add-to-unscopables')('copyWithin');

},{"./_export":"node_modules/core-js/modules/_export.js","./_array-copy-within":"node_modules/core-js/modules/_array-copy-within.js","./_add-to-unscopables":"node_modules/core-js/modules/_add-to-unscopables.js"}],"node_modules/core-js/modules/_array-fill.js":[function(require,module,exports) {
// 22.1.3.6 Array.prototype.fill(value, start = 0, end = this.length)
'use strict';
var toObject = require('./_to-object');
var toAbsoluteIndex = require('./_to-absolute-index');
var toLength = require('./_to-length');
module.exports = function fill(value /* , start = 0, end = @length */) {
  var O = toObject(this);
  var length = toLength(O.length);
  var aLen = arguments.length;
  var index = toAbsoluteIndex(aLen > 1 ? arguments[1] : undefined, length);
  var end = aLen > 2 ? arguments[2] : undefined;
  var endPos = end === undefined ? length : toAbsoluteIndex(end, length);
  while (endPos > index) O[index++] = value;
  return O;
};

},{"./_to-object":"node_modules/core-js/modules/_to-object.js","./_to-absolute-index":"node_modules/core-js/modules/_to-absolute-index.js","./_to-length":"node_modules/core-js/modules/_to-length.js"}],"node_modules/core-js/modules/es6.array.fill.js":[function(require,module,exports) {
// 22.1.3.6 Array.prototype.fill(value, start = 0, end = this.length)
var $export = require('./_export');

$export($export.P, 'Array', { fill: require('./_array-fill') });

require('./_add-to-unscopables')('fill');

},{"./_export":"node_modules/core-js/modules/_export.js","./_array-fill":"node_modules/core-js/modules/_array-fill.js","./_add-to-unscopables":"node_modules/core-js/modules/_add-to-unscopables.js"}],"node_modules/core-js/modules/es6.array.find.js":[function(require,module,exports) {
'use strict';
// 22.1.3.8 Array.prototype.find(predicate, thisArg = undefined)
var $export = require('./_export');
var $find = require('./_array-methods')(5);
var KEY = 'find';
var forced = true;
// Shouldn't skip holes
if (KEY in []) Array(1)[KEY](function () { forced = false; });
$export($export.P + $export.F * forced, 'Array', {
  find: function find(callbackfn /* , that = undefined */) {
    return $find(this, callbackfn, arguments.length > 1 ? arguments[1] : undefined);
  }
});
require('./_add-to-unscopables')(KEY);

},{"./_export":"node_modules/core-js/modules/_export.js","./_array-methods":"node_modules/core-js/modules/_array-methods.js","./_add-to-unscopables":"node_modules/core-js/modules/_add-to-unscopables.js"}],"node_modules/core-js/modules/es6.array.find-index.js":[function(require,module,exports) {
'use strict';
// 22.1.3.9 Array.prototype.findIndex(predicate, thisArg = undefined)
var $export = require('./_export');
var $find = require('./_array-methods')(6);
var KEY = 'findIndex';
var forced = true;
// Shouldn't skip holes
if (KEY in []) Array(1)[KEY](function () { forced = false; });
$export($export.P + $export.F * forced, 'Array', {
  findIndex: function findIndex(callbackfn /* , that = undefined */) {
    return $find(this, callbackfn, arguments.length > 1 ? arguments[1] : undefined);
  }
});
require('./_add-to-unscopables')(KEY);

},{"./_export":"node_modules/core-js/modules/_export.js","./_array-methods":"node_modules/core-js/modules/_array-methods.js","./_add-to-unscopables":"node_modules/core-js/modules/_add-to-unscopables.js"}],"node_modules/core-js/modules/_set-species.js":[function(require,module,exports) {

'use strict';
var global = require('./_global');
var dP = require('./_object-dp');
var DESCRIPTORS = require('./_descriptors');
var SPECIES = require('./_wks')('species');

module.exports = function (KEY) {
  var C = global[KEY];
  if (DESCRIPTORS && C && !C[SPECIES]) dP.f(C, SPECIES, {
    configurable: true,
    get: function () { return this; }
  });
};

},{"./_global":"node_modules/core-js/modules/_global.js","./_object-dp":"node_modules/core-js/modules/_object-dp.js","./_descriptors":"node_modules/core-js/modules/_descriptors.js","./_wks":"node_modules/core-js/modules/_wks.js"}],"node_modules/core-js/modules/es6.array.species.js":[function(require,module,exports) {
require('./_set-species')('Array');

},{"./_set-species":"node_modules/core-js/modules/_set-species.js"}],"node_modules/core-js/modules/_iter-step.js":[function(require,module,exports) {
module.exports = function (done, value) {
  return { value: value, done: !!done };
};

},{}],"node_modules/core-js/modules/es6.array.iterator.js":[function(require,module,exports) {
'use strict';
var addToUnscopables = require('./_add-to-unscopables');
var step = require('./_iter-step');
var Iterators = require('./_iterators');
var toIObject = require('./_to-iobject');

// 22.1.3.4 Array.prototype.entries()
// 22.1.3.13 Array.prototype.keys()
// 22.1.3.29 Array.prototype.values()
// 22.1.3.30 Array.prototype[@@iterator]()
module.exports = require('./_iter-define')(Array, 'Array', function (iterated, kind) {
  this._t = toIObject(iterated); // target
  this._i = 0;                   // next index
  this._k = kind;                // kind
// 22.1.5.2.1 %ArrayIteratorPrototype%.next()
}, function () {
  var O = this._t;
  var kind = this._k;
  var index = this._i++;
  if (!O || index >= O.length) {
    this._t = undefined;
    return step(1);
  }
  if (kind == 'keys') return step(0, index);
  if (kind == 'values') return step(0, O[index]);
  return step(0, [index, O[index]]);
}, 'values');

// argumentsList[@@iterator] is %ArrayProto_values% (9.4.4.6, 9.4.4.7)
Iterators.Arguments = Iterators.Array;

addToUnscopables('keys');
addToUnscopables('values');
addToUnscopables('entries');

},{"./_add-to-unscopables":"node_modules/core-js/modules/_add-to-unscopables.js","./_iter-step":"node_modules/core-js/modules/_iter-step.js","./_iterators":"node_modules/core-js/modules/_iterators.js","./_to-iobject":"node_modules/core-js/modules/_to-iobject.js","./_iter-define":"node_modules/core-js/modules/_iter-define.js"}],"node_modules/core-js/modules/_flags.js":[function(require,module,exports) {
'use strict';
// 21.2.5.3 get RegExp.prototype.flags
var anObject = require('./_an-object');
module.exports = function () {
  var that = anObject(this);
  var result = '';
  if (that.global) result += 'g';
  if (that.ignoreCase) result += 'i';
  if (that.multiline) result += 'm';
  if (that.unicode) result += 'u';
  if (that.sticky) result += 'y';
  return result;
};

},{"./_an-object":"node_modules/core-js/modules/_an-object.js"}],"node_modules/core-js/modules/es6.regexp.constructor.js":[function(require,module,exports) {

var global = require('./_global');
var inheritIfRequired = require('./_inherit-if-required');
var dP = require('./_object-dp').f;
var gOPN = require('./_object-gopn').f;
var isRegExp = require('./_is-regexp');
var $flags = require('./_flags');
var $RegExp = global.RegExp;
var Base = $RegExp;
var proto = $RegExp.prototype;
var re1 = /a/g;
var re2 = /a/g;
// "new" creates a new object, old webkit buggy here
var CORRECT_NEW = new $RegExp(re1) !== re1;

if (require('./_descriptors') && (!CORRECT_NEW || require('./_fails')(function () {
  re2[require('./_wks')('match')] = false;
  // RegExp constructor can alter flags and IsRegExp works correct with @@match
  return $RegExp(re1) != re1 || $RegExp(re2) == re2 || $RegExp(re1, 'i') != '/a/i';
}))) {
  $RegExp = function RegExp(p, f) {
    var tiRE = this instanceof $RegExp;
    var piRE = isRegExp(p);
    var fiU = f === undefined;
    return !tiRE && piRE && p.constructor === $RegExp && fiU ? p
      : inheritIfRequired(CORRECT_NEW
        ? new Base(piRE && !fiU ? p.source : p, f)
        : Base((piRE = p instanceof $RegExp) ? p.source : p, piRE && fiU ? $flags.call(p) : f)
      , tiRE ? this : proto, $RegExp);
  };
  var proxy = function (key) {
    key in $RegExp || dP($RegExp, key, {
      configurable: true,
      get: function () { return Base[key]; },
      set: function (it) { Base[key] = it; }
    });
  };
  for (var keys = gOPN(Base), i = 0; keys.length > i;) proxy(keys[i++]);
  proto.constructor = $RegExp;
  $RegExp.prototype = proto;
  require('./_redefine')(global, 'RegExp', $RegExp);
}

require('./_set-species')('RegExp');

},{"./_global":"node_modules/core-js/modules/_global.js","./_inherit-if-required":"node_modules/core-js/modules/_inherit-if-required.js","./_object-dp":"node_modules/core-js/modules/_object-dp.js","./_object-gopn":"node_modules/core-js/modules/_object-gopn.js","./_is-regexp":"node_modules/core-js/modules/_is-regexp.js","./_flags":"node_modules/core-js/modules/_flags.js","./_descriptors":"node_modules/core-js/modules/_descriptors.js","./_fails":"node_modules/core-js/modules/_fails.js","./_wks":"node_modules/core-js/modules/_wks.js","./_redefine":"node_modules/core-js/modules/_redefine.js","./_set-species":"node_modules/core-js/modules/_set-species.js"}],"node_modules/core-js/modules/_regexp-exec.js":[function(require,module,exports) {
'use strict';

var regexpFlags = require('./_flags');

var nativeExec = RegExp.prototype.exec;
// This always refers to the native implementation, because the
// String#replace polyfill uses ./fix-regexp-well-known-symbol-logic.js,
// which loads this file before patching the method.
var nativeReplace = String.prototype.replace;

var patchedExec = nativeExec;

var LAST_INDEX = 'lastIndex';

var UPDATES_LAST_INDEX_WRONG = (function () {
  var re1 = /a/,
      re2 = /b*/g;
  nativeExec.call(re1, 'a');
  nativeExec.call(re2, 'a');
  return re1[LAST_INDEX] !== 0 || re2[LAST_INDEX] !== 0;
})();

// nonparticipating capturing group, copied from es5-shim's String#split patch.
var NPCG_INCLUDED = /()??/.exec('')[1] !== undefined;

var PATCH = UPDATES_LAST_INDEX_WRONG || NPCG_INCLUDED;

if (PATCH) {
  patchedExec = function exec(str) {
    var re = this;
    var lastIndex, reCopy, match, i;

    if (NPCG_INCLUDED) {
      reCopy = new RegExp('^' + re.source + '$(?!\\s)', regexpFlags.call(re));
    }
    if (UPDATES_LAST_INDEX_WRONG) lastIndex = re[LAST_INDEX];

    match = nativeExec.call(re, str);

    if (UPDATES_LAST_INDEX_WRONG && match) {
      re[LAST_INDEX] = re.global ? match.index + match[0].length : lastIndex;
    }
    if (NPCG_INCLUDED && match && match.length > 1) {
      // Fix browsers whose `exec` methods don't consistently return `undefined`
      // for NPCG, like IE8. NOTE: This doesn' work for /(.?)?/
      // eslint-disable-next-line no-loop-func
      nativeReplace.call(match[0], reCopy, function () {
        for (i = 1; i < arguments.length - 2; i++) {
          if (arguments[i] === undefined) match[i] = undefined;
        }
      });
    }

    return match;
  };
}

module.exports = patchedExec;

},{"./_flags":"node_modules/core-js/modules/_flags.js"}],"node_modules/core-js/modules/es6.regexp.exec.js":[function(require,module,exports) {
'use strict';
var regexpExec = require('./_regexp-exec');
require('./_export')({
  target: 'RegExp',
  proto: true,
  forced: regexpExec !== /./.exec
}, {
  exec: regexpExec
});

},{"./_regexp-exec":"node_modules/core-js/modules/_regexp-exec.js","./_export":"node_modules/core-js/modules/_export.js"}],"node_modules/core-js/modules/es6.regexp.flags.js":[function(require,module,exports) {
// 21.2.5.3 get RegExp.prototype.flags()
if (require('./_descriptors') && /./g.flags != 'g') require('./_object-dp').f(RegExp.prototype, 'flags', {
  configurable: true,
  get: require('./_flags')
});

},{"./_descriptors":"node_modules/core-js/modules/_descriptors.js","./_object-dp":"node_modules/core-js/modules/_object-dp.js","./_flags":"node_modules/core-js/modules/_flags.js"}],"node_modules/core-js/modules/es6.regexp.to-string.js":[function(require,module,exports) {

'use strict';
require('./es6.regexp.flags');
var anObject = require('./_an-object');
var $flags = require('./_flags');
var DESCRIPTORS = require('./_descriptors');
var TO_STRING = 'toString';
var $toString = /./[TO_STRING];

var define = function (fn) {
  require('./_redefine')(RegExp.prototype, TO_STRING, fn, true);
};

// 21.2.5.14 RegExp.prototype.toString()
if (require('./_fails')(function () { return $toString.call({ source: 'a', flags: 'b' }) != '/a/b'; })) {
  define(function toString() {
    var R = anObject(this);
    return '/'.concat(R.source, '/',
      'flags' in R ? R.flags : !DESCRIPTORS && R instanceof RegExp ? $flags.call(R) : undefined);
  });
// FF44- RegExp#toString has a wrong name
} else if ($toString.name != TO_STRING) {
  define(function toString() {
    return $toString.call(this);
  });
}

},{"./es6.regexp.flags":"node_modules/core-js/modules/es6.regexp.flags.js","./_an-object":"node_modules/core-js/modules/_an-object.js","./_flags":"node_modules/core-js/modules/_flags.js","./_descriptors":"node_modules/core-js/modules/_descriptors.js","./_redefine":"node_modules/core-js/modules/_redefine.js","./_fails":"node_modules/core-js/modules/_fails.js"}],"node_modules/core-js/modules/_advance-string-index.js":[function(require,module,exports) {
'use strict';
var at = require('./_string-at')(true);

 // `AdvanceStringIndex` abstract operation
// https://tc39.github.io/ecma262/#sec-advancestringindex
module.exports = function (S, index, unicode) {
  return index + (unicode ? at(S, index).length : 1);
};

},{"./_string-at":"node_modules/core-js/modules/_string-at.js"}],"node_modules/core-js/modules/_regexp-exec-abstract.js":[function(require,module,exports) {
'use strict';

var classof = require('./_classof');
var builtinExec = RegExp.prototype.exec;

 // `RegExpExec` abstract operation
// https://tc39.github.io/ecma262/#sec-regexpexec
module.exports = function (R, S) {
  var exec = R.exec;
  if (typeof exec === 'function') {
    var result = exec.call(R, S);
    if (typeof result !== 'object') {
      throw new TypeError('RegExp exec method returned something other than an Object or null');
    }
    return result;
  }
  if (classof(R) !== 'RegExp') {
    throw new TypeError('RegExp#exec called on incompatible receiver');
  }
  return builtinExec.call(R, S);
};

},{"./_classof":"node_modules/core-js/modules/_classof.js"}],"node_modules/core-js/modules/_fix-re-wks.js":[function(require,module,exports) {
'use strict';
require('./es6.regexp.exec');
var redefine = require('./_redefine');
var hide = require('./_hide');
var fails = require('./_fails');
var defined = require('./_defined');
var wks = require('./_wks');
var regexpExec = require('./_regexp-exec');

var SPECIES = wks('species');

var REPLACE_SUPPORTS_NAMED_GROUPS = !fails(function () {
  // #replace needs built-in support for named groups.
  // #match works fine because it just return the exec results, even if it has
  // a "grops" property.
  var re = /./;
  re.exec = function () {
    var result = [];
    result.groups = { a: '7' };
    return result;
  };
  return ''.replace(re, '$<a>') !== '7';
});

var SPLIT_WORKS_WITH_OVERWRITTEN_EXEC = (function () {
  // Chrome 51 has a buggy "split" implementation when RegExp#exec !== nativeExec
  var re = /(?:)/;
  var originalExec = re.exec;
  re.exec = function () { return originalExec.apply(this, arguments); };
  var result = 'ab'.split(re);
  return result.length === 2 && result[0] === 'a' && result[1] === 'b';
})();

module.exports = function (KEY, length, exec) {
  var SYMBOL = wks(KEY);

  var DELEGATES_TO_SYMBOL = !fails(function () {
    // String methods call symbol-named RegEp methods
    var O = {};
    O[SYMBOL] = function () { return 7; };
    return ''[KEY](O) != 7;
  });

  var DELEGATES_TO_EXEC = DELEGATES_TO_SYMBOL ? !fails(function () {
    // Symbol-named RegExp methods call .exec
    var execCalled = false;
    var re = /a/;
    re.exec = function () { execCalled = true; return null; };
    if (KEY === 'split') {
      // RegExp[@@split] doesn't call the regex's exec method, but first creates
      // a new one. We need to return the patched regex when creating the new one.
      re.constructor = {};
      re.constructor[SPECIES] = function () { return re; };
    }
    re[SYMBOL]('');
    return !execCalled;
  }) : undefined;

  if (
    !DELEGATES_TO_SYMBOL ||
    !DELEGATES_TO_EXEC ||
    (KEY === 'replace' && !REPLACE_SUPPORTS_NAMED_GROUPS) ||
    (KEY === 'split' && !SPLIT_WORKS_WITH_OVERWRITTEN_EXEC)
  ) {
    var nativeRegExpMethod = /./[SYMBOL];
    var fns = exec(
      defined,
      SYMBOL,
      ''[KEY],
      function maybeCallNative(nativeMethod, regexp, str, arg2, forceStringMethod) {
        if (regexp.exec === regexpExec) {
          if (DELEGATES_TO_SYMBOL && !forceStringMethod) {
            // The native String method already delegates to @@method (this
            // polyfilled function), leasing to infinite recursion.
            // We avoid it by directly calling the native @@method method.
            return { done: true, value: nativeRegExpMethod.call(regexp, str, arg2) };
          }
          return { done: true, value: nativeMethod.call(str, regexp, arg2) };
        }
        return { done: false };
      }
    );
    var strfn = fns[0];
    var rxfn = fns[1];

    redefine(String.prototype, KEY, strfn);
    hide(RegExp.prototype, SYMBOL, length == 2
      // 21.2.5.8 RegExp.prototype[@@replace](string, replaceValue)
      // 21.2.5.11 RegExp.prototype[@@split](string, limit)
      ? function (string, arg) { return rxfn.call(string, this, arg); }
      // 21.2.5.6 RegExp.prototype[@@match](string)
      // 21.2.5.9 RegExp.prototype[@@search](string)
      : function (string) { return rxfn.call(string, this); }
    );
  }
};

},{"./es6.regexp.exec":"node_modules/core-js/modules/es6.regexp.exec.js","./_redefine":"node_modules/core-js/modules/_redefine.js","./_hide":"node_modules/core-js/modules/_hide.js","./_fails":"node_modules/core-js/modules/_fails.js","./_defined":"node_modules/core-js/modules/_defined.js","./_wks":"node_modules/core-js/modules/_wks.js","./_regexp-exec":"node_modules/core-js/modules/_regexp-exec.js"}],"node_modules/core-js/modules/es6.regexp.match.js":[function(require,module,exports) {
'use strict';

var anObject = require('./_an-object');
var toLength = require('./_to-length');
var advanceStringIndex = require('./_advance-string-index');
var regExpExec = require('./_regexp-exec-abstract');

// @@match logic
require('./_fix-re-wks')('match', 1, function (defined, MATCH, $match, maybeCallNative) {
  return [
    // `String.prototype.match` method
    // https://tc39.github.io/ecma262/#sec-string.prototype.match
    function match(regexp) {
      var O = defined(this);
      var fn = regexp == undefined ? undefined : regexp[MATCH];
      return fn !== undefined ? fn.call(regexp, O) : new RegExp(regexp)[MATCH](String(O));
    },
    // `RegExp.prototype[@@match]` method
    // https://tc39.github.io/ecma262/#sec-regexp.prototype-@@match
    function (regexp) {
      var res = maybeCallNative($match, regexp, this);
      if (res.done) return res.value;
      var rx = anObject(regexp);
      var S = String(this);
      if (!rx.global) return regExpExec(rx, S);
      var fullUnicode = rx.unicode;
      rx.lastIndex = 0;
      var A = [];
      var n = 0;
      var result;
      while ((result = regExpExec(rx, S)) !== null) {
        var matchStr = String(result[0]);
        A[n] = matchStr;
        if (matchStr === '') rx.lastIndex = advanceStringIndex(S, toLength(rx.lastIndex), fullUnicode);
        n++;
      }
      return n === 0 ? null : A;
    }
  ];
});

},{"./_an-object":"node_modules/core-js/modules/_an-object.js","./_to-length":"node_modules/core-js/modules/_to-length.js","./_advance-string-index":"node_modules/core-js/modules/_advance-string-index.js","./_regexp-exec-abstract":"node_modules/core-js/modules/_regexp-exec-abstract.js","./_fix-re-wks":"node_modules/core-js/modules/_fix-re-wks.js"}],"node_modules/core-js/modules/es6.regexp.replace.js":[function(require,module,exports) {
var global = arguments[3];
'use strict';

var anObject = require('./_an-object');
var toObject = require('./_to-object');
var toLength = require('./_to-length');
var toInteger = require('./_to-integer');
var advanceStringIndex = require('./_advance-string-index');
var regExpExec = require('./_regexp-exec-abstract');
var max = Math.max;
var min = Math.min;
var floor = Math.floor;
var SUBSTITUTION_SYMBOLS = /\$([$&`']|\d\d?|<[^>]*>)/g;
var SUBSTITUTION_SYMBOLS_NO_NAMED = /\$([$&`']|\d\d?)/g;

var maybeToString = function (it) {
  return it === undefined ? it : String(it);
};

// @@replace logic
require('./_fix-re-wks')('replace', 2, function (defined, REPLACE, $replace, maybeCallNative) {
  return [
    // `String.prototype.replace` method
    // https://tc39.github.io/ecma262/#sec-string.prototype.replace
    function replace(searchValue, replaceValue) {
      var O = defined(this);
      var fn = searchValue == undefined ? undefined : searchValue[REPLACE];
      return fn !== undefined
        ? fn.call(searchValue, O, replaceValue)
        : $replace.call(String(O), searchValue, replaceValue);
    },
    // `RegExp.prototype[@@replace]` method
    // https://tc39.github.io/ecma262/#sec-regexp.prototype-@@replace
    function (regexp, replaceValue) {
      var res = maybeCallNative($replace, regexp, this, replaceValue);
      if (res.done) return res.value;

      var rx = anObject(regexp);
      var S = String(this);
      var functionalReplace = typeof replaceValue === 'function';
      if (!functionalReplace) replaceValue = String(replaceValue);
      var global = rx.global;
      if (global) {
        var fullUnicode = rx.unicode;
        rx.lastIndex = 0;
      }
      var results = [];
      while (true) {
        var result = regExpExec(rx, S);
        if (result === null) break;
        results.push(result);
        if (!global) break;
        var matchStr = String(result[0]);
        if (matchStr === '') rx.lastIndex = advanceStringIndex(S, toLength(rx.lastIndex), fullUnicode);
      }
      var accumulatedResult = '';
      var nextSourcePosition = 0;
      for (var i = 0; i < results.length; i++) {
        result = results[i];
        var matched = String(result[0]);
        var position = max(min(toInteger(result.index), S.length), 0);
        var captures = [];
        // NOTE: This is equivalent to
        //   captures = result.slice(1).map(maybeToString)
        // but for some reason `nativeSlice.call(result, 1, result.length)` (called in
        // the slice polyfill when slicing native arrays) "doesn't work" in safari 9 and
        // causes a crash (https://pastebin.com/N21QzeQA) when trying to debug it.
        for (var j = 1; j < result.length; j++) captures.push(maybeToString(result[j]));
        var namedCaptures = result.groups;
        if (functionalReplace) {
          var replacerArgs = [matched].concat(captures, position, S);
          if (namedCaptures !== undefined) replacerArgs.push(namedCaptures);
          var replacement = String(replaceValue.apply(undefined, replacerArgs));
        } else {
          replacement = getSubstitution(matched, S, position, captures, namedCaptures, replaceValue);
        }
        if (position >= nextSourcePosition) {
          accumulatedResult += S.slice(nextSourcePosition, position) + replacement;
          nextSourcePosition = position + matched.length;
        }
      }
      return accumulatedResult + S.slice(nextSourcePosition);
    }
  ];

    // https://tc39.github.io/ecma262/#sec-getsubstitution
  function getSubstitution(matched, str, position, captures, namedCaptures, replacement) {
    var tailPos = position + matched.length;
    var m = captures.length;
    var symbols = SUBSTITUTION_SYMBOLS_NO_NAMED;
    if (namedCaptures !== undefined) {
      namedCaptures = toObject(namedCaptures);
      symbols = SUBSTITUTION_SYMBOLS;
    }
    return $replace.call(replacement, symbols, function (match, ch) {
      var capture;
      switch (ch.charAt(0)) {
        case '$': return '$';
        case '&': return matched;
        case '`': return str.slice(0, position);
        case "'": return str.slice(tailPos);
        case '<':
          capture = namedCaptures[ch.slice(1, -1)];
          break;
        default: // \d\d?
          var n = +ch;
          if (n === 0) return ch;
          if (n > m) {
            var f = floor(n / 10);
            if (f === 0) return ch;
            if (f <= m) return captures[f - 1] === undefined ? ch.charAt(1) : captures[f - 1] + ch.charAt(1);
            return ch;
          }
          capture = captures[n - 1];
      }
      return capture === undefined ? '' : capture;
    });
  }
});

},{"./_an-object":"node_modules/core-js/modules/_an-object.js","./_to-object":"node_modules/core-js/modules/_to-object.js","./_to-length":"node_modules/core-js/modules/_to-length.js","./_to-integer":"node_modules/core-js/modules/_to-integer.js","./_advance-string-index":"node_modules/core-js/modules/_advance-string-index.js","./_regexp-exec-abstract":"node_modules/core-js/modules/_regexp-exec-abstract.js","./_fix-re-wks":"node_modules/core-js/modules/_fix-re-wks.js"}],"node_modules/core-js/modules/es6.regexp.search.js":[function(require,module,exports) {
'use strict';

var anObject = require('./_an-object');
var sameValue = require('./_same-value');
var regExpExec = require('./_regexp-exec-abstract');

// @@search logic
require('./_fix-re-wks')('search', 1, function (defined, SEARCH, $search, maybeCallNative) {
  return [
    // `String.prototype.search` method
    // https://tc39.github.io/ecma262/#sec-string.prototype.search
    function search(regexp) {
      var O = defined(this);
      var fn = regexp == undefined ? undefined : regexp[SEARCH];
      return fn !== undefined ? fn.call(regexp, O) : new RegExp(regexp)[SEARCH](String(O));
    },
    // `RegExp.prototype[@@search]` method
    // https://tc39.github.io/ecma262/#sec-regexp.prototype-@@search
    function (regexp) {
      var res = maybeCallNative($search, regexp, this);
      if (res.done) return res.value;
      var rx = anObject(regexp);
      var S = String(this);
      var previousLastIndex = rx.lastIndex;
      if (!sameValue(previousLastIndex, 0)) rx.lastIndex = 0;
      var result = regExpExec(rx, S);
      if (!sameValue(rx.lastIndex, previousLastIndex)) rx.lastIndex = previousLastIndex;
      return result === null ? -1 : result.index;
    }
  ];
});

},{"./_an-object":"node_modules/core-js/modules/_an-object.js","./_same-value":"node_modules/core-js/modules/_same-value.js","./_regexp-exec-abstract":"node_modules/core-js/modules/_regexp-exec-abstract.js","./_fix-re-wks":"node_modules/core-js/modules/_fix-re-wks.js"}],"node_modules/core-js/modules/_species-constructor.js":[function(require,module,exports) {
// 7.3.20 SpeciesConstructor(O, defaultConstructor)
var anObject = require('./_an-object');
var aFunction = require('./_a-function');
var SPECIES = require('./_wks')('species');
module.exports = function (O, D) {
  var C = anObject(O).constructor;
  var S;
  return C === undefined || (S = anObject(C)[SPECIES]) == undefined ? D : aFunction(S);
};

},{"./_an-object":"node_modules/core-js/modules/_an-object.js","./_a-function":"node_modules/core-js/modules/_a-function.js","./_wks":"node_modules/core-js/modules/_wks.js"}],"node_modules/core-js/modules/es6.regexp.split.js":[function(require,module,exports) {
'use strict';

var isRegExp = require('./_is-regexp');
var anObject = require('./_an-object');
var speciesConstructor = require('./_species-constructor');
var advanceStringIndex = require('./_advance-string-index');
var toLength = require('./_to-length');
var callRegExpExec = require('./_regexp-exec-abstract');
var regexpExec = require('./_regexp-exec');
var $min = Math.min;
var $push = [].push;
var $SPLIT = 'split';
var LENGTH = 'length';
var LAST_INDEX = 'lastIndex';

// eslint-disable-next-line no-empty
var SUPPORTS_Y = !!(function () { try { return new RegExp('x', 'y'); } catch (e) {} })();

// @@split logic
require('./_fix-re-wks')('split', 2, function (defined, SPLIT, $split, maybeCallNative) {
  var internalSplit = $split;
  if (
    'abbc'[$SPLIT](/(b)*/)[1] == 'c' ||
    'test'[$SPLIT](/(?:)/, -1)[LENGTH] != 4 ||
    'ab'[$SPLIT](/(?:ab)*/)[LENGTH] != 2 ||
    '.'[$SPLIT](/(.?)(.?)/)[LENGTH] != 4 ||
    '.'[$SPLIT](/()()/)[LENGTH] > 1 ||
    ''[$SPLIT](/.?/)[LENGTH]
  ) {
    // based on es5-shim implementation, need to rework it
    internalSplit = function (separator, limit) {
      var string = String(this);
      if (separator === undefined && limit === 0) return [];
      // If `separator` is not a regex, use native split
      if (!isRegExp(separator)) return $split.call(string, separator, limit);
      var output = [];
      var flags = (separator.ignoreCase ? 'i' : '') +
                  (separator.multiline ? 'm' : '') +
                  (separator.unicode ? 'u' : '') +
                  (separator.sticky ? 'y' : '');
      var lastLastIndex = 0;
      var splitLimit = limit === undefined ? 4294967295 : limit >>> 0;
      // Make `global` and avoid `lastIndex` issues by working with a copy
      var separatorCopy = new RegExp(separator.source, flags + 'g');
      var match, lastIndex, lastLength;
      while (match = regexpExec.call(separatorCopy, string)) {
        lastIndex = separatorCopy[LAST_INDEX];
        if (lastIndex > lastLastIndex) {
          output.push(string.slice(lastLastIndex, match.index));
          if (match[LENGTH] > 1 && match.index < string[LENGTH]) $push.apply(output, match.slice(1));
          lastLength = match[0][LENGTH];
          lastLastIndex = lastIndex;
          if (output[LENGTH] >= splitLimit) break;
        }
        if (separatorCopy[LAST_INDEX] === match.index) separatorCopy[LAST_INDEX]++; // Avoid an infinite loop
      }
      if (lastLastIndex === string[LENGTH]) {
        if (lastLength || !separatorCopy.test('')) output.push('');
      } else output.push(string.slice(lastLastIndex));
      return output[LENGTH] > splitLimit ? output.slice(0, splitLimit) : output;
    };
  // Chakra, V8
  } else if ('0'[$SPLIT](undefined, 0)[LENGTH]) {
    internalSplit = function (separator, limit) {
      return separator === undefined && limit === 0 ? [] : $split.call(this, separator, limit);
    };
  }

  return [
    // `String.prototype.split` method
    // https://tc39.github.io/ecma262/#sec-string.prototype.split
    function split(separator, limit) {
      var O = defined(this);
      var splitter = separator == undefined ? undefined : separator[SPLIT];
      return splitter !== undefined
        ? splitter.call(separator, O, limit)
        : internalSplit.call(String(O), separator, limit);
    },
    // `RegExp.prototype[@@split]` method
    // https://tc39.github.io/ecma262/#sec-regexp.prototype-@@split
    //
    // NOTE: This cannot be properly polyfilled in engines that don't support
    // the 'y' flag.
    function (regexp, limit) {
      var res = maybeCallNative(internalSplit, regexp, this, limit, internalSplit !== $split);
      if (res.done) return res.value;

      var rx = anObject(regexp);
      var S = String(this);
      var C = speciesConstructor(rx, RegExp);

      var unicodeMatching = rx.unicode;
      var flags = (rx.ignoreCase ? 'i' : '') +
                    (rx.multiline ? 'm' : '') +
                    (rx.unicode ? 'u' : '') +
                    (SUPPORTS_Y ? 'y' : 'g');

      // ^(? + rx + ) is needed, in combination with some S slicing, to
      // simulate the 'y' flag.
      var splitter = new C(SUPPORTS_Y ? rx : '^(?:' + rx.source + ')', flags);
      var lim = limit === undefined ? 0xffffffff : limit >>> 0;
      if (lim === 0) return [];
      if (S.length === 0) return callRegExpExec(splitter, S) === null ? [S] : [];
      var p = 0;
      var q = 0;
      var A = [];
      while (q < S.length) {
        splitter.lastIndex = SUPPORTS_Y ? q : 0;
        var z = callRegExpExec(splitter, SUPPORTS_Y ? S : S.slice(q));
        var e;
        if (
          z === null ||
          (e = $min(toLength(splitter.lastIndex + (SUPPORTS_Y ? 0 : q)), S.length)) === p
        ) {
          q = advanceStringIndex(S, q, unicodeMatching);
        } else {
          A.push(S.slice(p, q));
          if (A.length === lim) return A;
          for (var i = 1; i <= z.length - 1; i++) {
            A.push(z[i]);
            if (A.length === lim) return A;
          }
          q = p = e;
        }
      }
      A.push(S.slice(p));
      return A;
    }
  ];
});

},{"./_is-regexp":"node_modules/core-js/modules/_is-regexp.js","./_an-object":"node_modules/core-js/modules/_an-object.js","./_species-constructor":"node_modules/core-js/modules/_species-constructor.js","./_advance-string-index":"node_modules/core-js/modules/_advance-string-index.js","./_to-length":"node_modules/core-js/modules/_to-length.js","./_regexp-exec-abstract":"node_modules/core-js/modules/_regexp-exec-abstract.js","./_regexp-exec":"node_modules/core-js/modules/_regexp-exec.js","./_fix-re-wks":"node_modules/core-js/modules/_fix-re-wks.js"}],"node_modules/core-js/modules/_an-instance.js":[function(require,module,exports) {
module.exports = function (it, Constructor, name, forbiddenField) {
  if (!(it instanceof Constructor) || (forbiddenField !== undefined && forbiddenField in it)) {
    throw TypeError(name + ': incorrect invocation!');
  } return it;
};

},{}],"node_modules/core-js/modules/_for-of.js":[function(require,module,exports) {
var ctx = require('./_ctx');
var call = require('./_iter-call');
var isArrayIter = require('./_is-array-iter');
var anObject = require('./_an-object');
var toLength = require('./_to-length');
var getIterFn = require('./core.get-iterator-method');
var BREAK = {};
var RETURN = {};
var exports = module.exports = function (iterable, entries, fn, that, ITERATOR) {
  var iterFn = ITERATOR ? function () { return iterable; } : getIterFn(iterable);
  var f = ctx(fn, that, entries ? 2 : 1);
  var index = 0;
  var length, step, iterator, result;
  if (typeof iterFn != 'function') throw TypeError(iterable + ' is not iterable!');
  // fast case for arrays with default iterator
  if (isArrayIter(iterFn)) for (length = toLength(iterable.length); length > index; index++) {
    result = entries ? f(anObject(step = iterable[index])[0], step[1]) : f(iterable[index]);
    if (result === BREAK || result === RETURN) return result;
  } else for (iterator = iterFn.call(iterable); !(step = iterator.next()).done;) {
    result = call(iterator, f, step.value, entries);
    if (result === BREAK || result === RETURN) return result;
  }
};
exports.BREAK = BREAK;
exports.RETURN = RETURN;

},{"./_ctx":"node_modules/core-js/modules/_ctx.js","./_iter-call":"node_modules/core-js/modules/_iter-call.js","./_is-array-iter":"node_modules/core-js/modules/_is-array-iter.js","./_an-object":"node_modules/core-js/modules/_an-object.js","./_to-length":"node_modules/core-js/modules/_to-length.js","./core.get-iterator-method":"node_modules/core-js/modules/core.get-iterator-method.js"}],"node_modules/core-js/modules/_task.js":[function(require,module,exports) {


var ctx = require('./_ctx');
var invoke = require('./_invoke');
var html = require('./_html');
var cel = require('./_dom-create');
var global = require('./_global');
var process = global.process;
var setTask = global.setImmediate;
var clearTask = global.clearImmediate;
var MessageChannel = global.MessageChannel;
var Dispatch = global.Dispatch;
var counter = 0;
var queue = {};
var ONREADYSTATECHANGE = 'onreadystatechange';
var defer, channel, port;
var run = function () {
  var id = +this;
  // eslint-disable-next-line no-prototype-builtins
  if (queue.hasOwnProperty(id)) {
    var fn = queue[id];
    delete queue[id];
    fn();
  }
};
var listener = function (event) {
  run.call(event.data);
};
// Node.js 0.9+ & IE10+ has setImmediate, otherwise:
if (!setTask || !clearTask) {
  setTask = function setImmediate(fn) {
    var args = [];
    var i = 1;
    while (arguments.length > i) args.push(arguments[i++]);
    queue[++counter] = function () {
      // eslint-disable-next-line no-new-func
      invoke(typeof fn == 'function' ? fn : Function(fn), args);
    };
    defer(counter);
    return counter;
  };
  clearTask = function clearImmediate(id) {
    delete queue[id];
  };
  // Node.js 0.8-
  if (require('./_cof')(process) == 'process') {
    defer = function (id) {
      process.nextTick(ctx(run, id, 1));
    };
  // Sphere (JS game engine) Dispatch API
  } else if (Dispatch && Dispatch.now) {
    defer = function (id) {
      Dispatch.now(ctx(run, id, 1));
    };
  // Browsers with MessageChannel, includes WebWorkers
  } else if (MessageChannel) {
    channel = new MessageChannel();
    port = channel.port2;
    channel.port1.onmessage = listener;
    defer = ctx(port.postMessage, port, 1);
  // Browsers with postMessage, skip WebWorkers
  // IE8 has postMessage, but it's sync & typeof its postMessage is 'object'
  } else if (global.addEventListener && typeof postMessage == 'function' && !global.importScripts) {
    defer = function (id) {
      global.postMessage(id + '', '*');
    };
    global.addEventListener('message', listener, false);
  // IE8-
  } else if (ONREADYSTATECHANGE in cel('script')) {
    defer = function (id) {
      html.appendChild(cel('script'))[ONREADYSTATECHANGE] = function () {
        html.removeChild(this);
        run.call(id);
      };
    };
  // Rest old browsers
  } else {
    defer = function (id) {
      setTimeout(ctx(run, id, 1), 0);
    };
  }
}
module.exports = {
  set: setTask,
  clear: clearTask
};

},{"./_ctx":"node_modules/core-js/modules/_ctx.js","./_invoke":"node_modules/core-js/modules/_invoke.js","./_html":"node_modules/core-js/modules/_html.js","./_dom-create":"node_modules/core-js/modules/_dom-create.js","./_global":"node_modules/core-js/modules/_global.js","./_cof":"node_modules/core-js/modules/_cof.js"}],"node_modules/core-js/modules/_microtask.js":[function(require,module,exports) {


var global = require('./_global');
var macrotask = require('./_task').set;
var Observer = global.MutationObserver || global.WebKitMutationObserver;
var process = global.process;
var Promise = global.Promise;
var isNode = require('./_cof')(process) == 'process';

module.exports = function () {
  var head, last, notify;

  var flush = function () {
    var parent, fn;
    if (isNode && (parent = process.domain)) parent.exit();
    while (head) {
      fn = head.fn;
      head = head.next;
      try {
        fn();
      } catch (e) {
        if (head) notify();
        else last = undefined;
        throw e;
      }
    } last = undefined;
    if (parent) parent.enter();
  };

  // Node.js
  if (isNode) {
    notify = function () {
      process.nextTick(flush);
    };
  // browsers with MutationObserver, except iOS Safari - https://github.com/zloirock/core-js/issues/339
  } else if (Observer && !(global.navigator && global.navigator.standalone)) {
    var toggle = true;
    var node = document.createTextNode('');
    new Observer(flush).observe(node, { characterData: true }); // eslint-disable-line no-new
    notify = function () {
      node.data = toggle = !toggle;
    };
  // environments with maybe non-completely correct, but existent Promise
  } else if (Promise && Promise.resolve) {
    // Promise.resolve without an argument throws an error in LG WebOS 2
    var promise = Promise.resolve(undefined);
    notify = function () {
      promise.then(flush);
    };
  // for other environments - macrotask based on:
  // - setImmediate
  // - MessageChannel
  // - window.postMessag
  // - onreadystatechange
  // - setTimeout
  } else {
    notify = function () {
      // strange IE + webpack dev server bug - use .call(global)
      macrotask.call(global, flush);
    };
  }

  return function (fn) {
    var task = { fn: fn, next: undefined };
    if (last) last.next = task;
    if (!head) {
      head = task;
      notify();
    } last = task;
  };
};

},{"./_global":"node_modules/core-js/modules/_global.js","./_task":"node_modules/core-js/modules/_task.js","./_cof":"node_modules/core-js/modules/_cof.js"}],"node_modules/core-js/modules/_new-promise-capability.js":[function(require,module,exports) {
'use strict';
// 25.4.1.5 NewPromiseCapability(C)
var aFunction = require('./_a-function');

function PromiseCapability(C) {
  var resolve, reject;
  this.promise = new C(function ($$resolve, $$reject) {
    if (resolve !== undefined || reject !== undefined) throw TypeError('Bad Promise constructor');
    resolve = $$resolve;
    reject = $$reject;
  });
  this.resolve = aFunction(resolve);
  this.reject = aFunction(reject);
}

module.exports.f = function (C) {
  return new PromiseCapability(C);
};

},{"./_a-function":"node_modules/core-js/modules/_a-function.js"}],"node_modules/core-js/modules/_perform.js":[function(require,module,exports) {
module.exports = function (exec) {
  try {
    return { e: false, v: exec() };
  } catch (e) {
    return { e: true, v: e };
  }
};

},{}],"node_modules/core-js/modules/_user-agent.js":[function(require,module,exports) {

var global = require('./_global');
var navigator = global.navigator;

module.exports = navigator && navigator.userAgent || '';

},{"./_global":"node_modules/core-js/modules/_global.js"}],"node_modules/core-js/modules/_promise-resolve.js":[function(require,module,exports) {
var anObject = require('./_an-object');
var isObject = require('./_is-object');
var newPromiseCapability = require('./_new-promise-capability');

module.exports = function (C, x) {
  anObject(C);
  if (isObject(x) && x.constructor === C) return x;
  var promiseCapability = newPromiseCapability.f(C);
  var resolve = promiseCapability.resolve;
  resolve(x);
  return promiseCapability.promise;
};

},{"./_an-object":"node_modules/core-js/modules/_an-object.js","./_is-object":"node_modules/core-js/modules/_is-object.js","./_new-promise-capability":"node_modules/core-js/modules/_new-promise-capability.js"}],"node_modules/core-js/modules/_redefine-all.js":[function(require,module,exports) {
var redefine = require('./_redefine');
module.exports = function (target, src, safe) {
  for (var key in src) redefine(target, key, src[key], safe);
  return target;
};

},{"./_redefine":"node_modules/core-js/modules/_redefine.js"}],"node_modules/core-js/modules/es6.promise.js":[function(require,module,exports) {


'use strict';
var LIBRARY = require('./_library');
var global = require('./_global');
var ctx = require('./_ctx');
var classof = require('./_classof');
var $export = require('./_export');
var isObject = require('./_is-object');
var aFunction = require('./_a-function');
var anInstance = require('./_an-instance');
var forOf = require('./_for-of');
var speciesConstructor = require('./_species-constructor');
var task = require('./_task').set;
var microtask = require('./_microtask')();
var newPromiseCapabilityModule = require('./_new-promise-capability');
var perform = require('./_perform');
var userAgent = require('./_user-agent');
var promiseResolve = require('./_promise-resolve');
var PROMISE = 'Promise';
var TypeError = global.TypeError;
var process = global.process;
var versions = process && process.versions;
var v8 = versions && versions.v8 || '';
var $Promise = global[PROMISE];
var isNode = classof(process) == 'process';
var empty = function () { /* empty */ };
var Internal, newGenericPromiseCapability, OwnPromiseCapability, Wrapper;
var newPromiseCapability = newGenericPromiseCapability = newPromiseCapabilityModule.f;

var USE_NATIVE = !!function () {
  try {
    // correct subclassing with @@species support
    var promise = $Promise.resolve(1);
    var FakePromise = (promise.constructor = {})[require('./_wks')('species')] = function (exec) {
      exec(empty, empty);
    };
    // unhandled rejections tracking support, NodeJS Promise without it fails @@species test
    return (isNode || typeof PromiseRejectionEvent == 'function')
      && promise.then(empty) instanceof FakePromise
      // v8 6.6 (Node 10 and Chrome 66) have a bug with resolving custom thenables
      // https://bugs.chromium.org/p/chromium/issues/detail?id=830565
      // we can't detect it synchronously, so just check versions
      && v8.indexOf('6.6') !== 0
      && userAgent.indexOf('Chrome/66') === -1;
  } catch (e) { /* empty */ }
}();

// helpers
var isThenable = function (it) {
  var then;
  return isObject(it) && typeof (then = it.then) == 'function' ? then : false;
};
var notify = function (promise, isReject) {
  if (promise._n) return;
  promise._n = true;
  var chain = promise._c;
  microtask(function () {
    var value = promise._v;
    var ok = promise._s == 1;
    var i = 0;
    var run = function (reaction) {
      var handler = ok ? reaction.ok : reaction.fail;
      var resolve = reaction.resolve;
      var reject = reaction.reject;
      var domain = reaction.domain;
      var result, then, exited;
      try {
        if (handler) {
          if (!ok) {
            if (promise._h == 2) onHandleUnhandled(promise);
            promise._h = 1;
          }
          if (handler === true) result = value;
          else {
            if (domain) domain.enter();
            result = handler(value); // may throw
            if (domain) {
              domain.exit();
              exited = true;
            }
          }
          if (result === reaction.promise) {
            reject(TypeError('Promise-chain cycle'));
          } else if (then = isThenable(result)) {
            then.call(result, resolve, reject);
          } else resolve(result);
        } else reject(value);
      } catch (e) {
        if (domain && !exited) domain.exit();
        reject(e);
      }
    };
    while (chain.length > i) run(chain[i++]); // variable length - can't use forEach
    promise._c = [];
    promise._n = false;
    if (isReject && !promise._h) onUnhandled(promise);
  });
};
var onUnhandled = function (promise) {
  task.call(global, function () {
    var value = promise._v;
    var unhandled = isUnhandled(promise);
    var result, handler, console;
    if (unhandled) {
      result = perform(function () {
        if (isNode) {
          process.emit('unhandledRejection', value, promise);
        } else if (handler = global.onunhandledrejection) {
          handler({ promise: promise, reason: value });
        } else if ((console = global.console) && console.error) {
          console.error('Unhandled promise rejection', value);
        }
      });
      // Browsers should not trigger `rejectionHandled` event if it was handled here, NodeJS - should
      promise._h = isNode || isUnhandled(promise) ? 2 : 1;
    } promise._a = undefined;
    if (unhandled && result.e) throw result.v;
  });
};
var isUnhandled = function (promise) {
  return promise._h !== 1 && (promise._a || promise._c).length === 0;
};
var onHandleUnhandled = function (promise) {
  task.call(global, function () {
    var handler;
    if (isNode) {
      process.emit('rejectionHandled', promise);
    } else if (handler = global.onrejectionhandled) {
      handler({ promise: promise, reason: promise._v });
    }
  });
};
var $reject = function (value) {
  var promise = this;
  if (promise._d) return;
  promise._d = true;
  promise = promise._w || promise; // unwrap
  promise._v = value;
  promise._s = 2;
  if (!promise._a) promise._a = promise._c.slice();
  notify(promise, true);
};
var $resolve = function (value) {
  var promise = this;
  var then;
  if (promise._d) return;
  promise._d = true;
  promise = promise._w || promise; // unwrap
  try {
    if (promise === value) throw TypeError("Promise can't be resolved itself");
    if (then = isThenable(value)) {
      microtask(function () {
        var wrapper = { _w: promise, _d: false }; // wrap
        try {
          then.call(value, ctx($resolve, wrapper, 1), ctx($reject, wrapper, 1));
        } catch (e) {
          $reject.call(wrapper, e);
        }
      });
    } else {
      promise._v = value;
      promise._s = 1;
      notify(promise, false);
    }
  } catch (e) {
    $reject.call({ _w: promise, _d: false }, e); // wrap
  }
};

// constructor polyfill
if (!USE_NATIVE) {
  // 25.4.3.1 Promise(executor)
  $Promise = function Promise(executor) {
    anInstance(this, $Promise, PROMISE, '_h');
    aFunction(executor);
    Internal.call(this);
    try {
      executor(ctx($resolve, this, 1), ctx($reject, this, 1));
    } catch (err) {
      $reject.call(this, err);
    }
  };
  // eslint-disable-next-line no-unused-vars
  Internal = function Promise(executor) {
    this._c = [];             // <- awaiting reactions
    this._a = undefined;      // <- checked in isUnhandled reactions
    this._s = 0;              // <- state
    this._d = false;          // <- done
    this._v = undefined;      // <- value
    this._h = 0;              // <- rejection state, 0 - default, 1 - handled, 2 - unhandled
    this._n = false;          // <- notify
  };
  Internal.prototype = require('./_redefine-all')($Promise.prototype, {
    // 25.4.5.3 Promise.prototype.then(onFulfilled, onRejected)
    then: function then(onFulfilled, onRejected) {
      var reaction = newPromiseCapability(speciesConstructor(this, $Promise));
      reaction.ok = typeof onFulfilled == 'function' ? onFulfilled : true;
      reaction.fail = typeof onRejected == 'function' && onRejected;
      reaction.domain = isNode ? process.domain : undefined;
      this._c.push(reaction);
      if (this._a) this._a.push(reaction);
      if (this._s) notify(this, false);
      return reaction.promise;
    },
    // 25.4.5.1 Promise.prototype.catch(onRejected)
    'catch': function (onRejected) {
      return this.then(undefined, onRejected);
    }
  });
  OwnPromiseCapability = function () {
    var promise = new Internal();
    this.promise = promise;
    this.resolve = ctx($resolve, promise, 1);
    this.reject = ctx($reject, promise, 1);
  };
  newPromiseCapabilityModule.f = newPromiseCapability = function (C) {
    return C === $Promise || C === Wrapper
      ? new OwnPromiseCapability(C)
      : newGenericPromiseCapability(C);
  };
}

$export($export.G + $export.W + $export.F * !USE_NATIVE, { Promise: $Promise });
require('./_set-to-string-tag')($Promise, PROMISE);
require('./_set-species')(PROMISE);
Wrapper = require('./_core')[PROMISE];

// statics
$export($export.S + $export.F * !USE_NATIVE, PROMISE, {
  // 25.4.4.5 Promise.reject(r)
  reject: function reject(r) {
    var capability = newPromiseCapability(this);
    var $$reject = capability.reject;
    $$reject(r);
    return capability.promise;
  }
});
$export($export.S + $export.F * (LIBRARY || !USE_NATIVE), PROMISE, {
  // 25.4.4.6 Promise.resolve(x)
  resolve: function resolve(x) {
    return promiseResolve(LIBRARY && this === Wrapper ? $Promise : this, x);
  }
});
$export($export.S + $export.F * !(USE_NATIVE && require('./_iter-detect')(function (iter) {
  $Promise.all(iter)['catch'](empty);
})), PROMISE, {
  // 25.4.4.1 Promise.all(iterable)
  all: function all(iterable) {
    var C = this;
    var capability = newPromiseCapability(C);
    var resolve = capability.resolve;
    var reject = capability.reject;
    var result = perform(function () {
      var values = [];
      var index = 0;
      var remaining = 1;
      forOf(iterable, false, function (promise) {
        var $index = index++;
        var alreadyCalled = false;
        values.push(undefined);
        remaining++;
        C.resolve(promise).then(function (value) {
          if (alreadyCalled) return;
          alreadyCalled = true;
          values[$index] = value;
          --remaining || resolve(values);
        }, reject);
      });
      --remaining || resolve(values);
    });
    if (result.e) reject(result.v);
    return capability.promise;
  },
  // 25.4.4.4 Promise.race(iterable)
  race: function race(iterable) {
    var C = this;
    var capability = newPromiseCapability(C);
    var reject = capability.reject;
    var result = perform(function () {
      forOf(iterable, false, function (promise) {
        C.resolve(promise).then(capability.resolve, reject);
      });
    });
    if (result.e) reject(result.v);
    return capability.promise;
  }
});

},{"./_library":"node_modules/core-js/modules/_library.js","./_global":"node_modules/core-js/modules/_global.js","./_ctx":"node_modules/core-js/modules/_ctx.js","./_classof":"node_modules/core-js/modules/_classof.js","./_export":"node_modules/core-js/modules/_export.js","./_is-object":"node_modules/core-js/modules/_is-object.js","./_a-function":"node_modules/core-js/modules/_a-function.js","./_an-instance":"node_modules/core-js/modules/_an-instance.js","./_for-of":"node_modules/core-js/modules/_for-of.js","./_species-constructor":"node_modules/core-js/modules/_species-constructor.js","./_task":"node_modules/core-js/modules/_task.js","./_microtask":"node_modules/core-js/modules/_microtask.js","./_new-promise-capability":"node_modules/core-js/modules/_new-promise-capability.js","./_perform":"node_modules/core-js/modules/_perform.js","./_user-agent":"node_modules/core-js/modules/_user-agent.js","./_promise-resolve":"node_modules/core-js/modules/_promise-resolve.js","./_wks":"node_modules/core-js/modules/_wks.js","./_redefine-all":"node_modules/core-js/modules/_redefine-all.js","./_set-to-string-tag":"node_modules/core-js/modules/_set-to-string-tag.js","./_set-species":"node_modules/core-js/modules/_set-species.js","./_core":"node_modules/core-js/modules/_core.js","./_iter-detect":"node_modules/core-js/modules/_iter-detect.js"}],"node_modules/core-js/modules/_validate-collection.js":[function(require,module,exports) {
var isObject = require('./_is-object');
module.exports = function (it, TYPE) {
  if (!isObject(it) || it._t !== TYPE) throw TypeError('Incompatible receiver, ' + TYPE + ' required!');
  return it;
};

},{"./_is-object":"node_modules/core-js/modules/_is-object.js"}],"node_modules/core-js/modules/_collection-strong.js":[function(require,module,exports) {
'use strict';
var dP = require('./_object-dp').f;
var create = require('./_object-create');
var redefineAll = require('./_redefine-all');
var ctx = require('./_ctx');
var anInstance = require('./_an-instance');
var forOf = require('./_for-of');
var $iterDefine = require('./_iter-define');
var step = require('./_iter-step');
var setSpecies = require('./_set-species');
var DESCRIPTORS = require('./_descriptors');
var fastKey = require('./_meta').fastKey;
var validate = require('./_validate-collection');
var SIZE = DESCRIPTORS ? '_s' : 'size';

var getEntry = function (that, key) {
  // fast case
  var index = fastKey(key);
  var entry;
  if (index !== 'F') return that._i[index];
  // frozen object case
  for (entry = that._f; entry; entry = entry.n) {
    if (entry.k == key) return entry;
  }
};

module.exports = {
  getConstructor: function (wrapper, NAME, IS_MAP, ADDER) {
    var C = wrapper(function (that, iterable) {
      anInstance(that, C, NAME, '_i');
      that._t = NAME;         // collection type
      that._i = create(null); // index
      that._f = undefined;    // first entry
      that._l = undefined;    // last entry
      that[SIZE] = 0;         // size
      if (iterable != undefined) forOf(iterable, IS_MAP, that[ADDER], that);
    });
    redefineAll(C.prototype, {
      // 23.1.3.1 Map.prototype.clear()
      // 23.2.3.2 Set.prototype.clear()
      clear: function clear() {
        for (var that = validate(this, NAME), data = that._i, entry = that._f; entry; entry = entry.n) {
          entry.r = true;
          if (entry.p) entry.p = entry.p.n = undefined;
          delete data[entry.i];
        }
        that._f = that._l = undefined;
        that[SIZE] = 0;
      },
      // 23.1.3.3 Map.prototype.delete(key)
      // 23.2.3.4 Set.prototype.delete(value)
      'delete': function (key) {
        var that = validate(this, NAME);
        var entry = getEntry(that, key);
        if (entry) {
          var next = entry.n;
          var prev = entry.p;
          delete that._i[entry.i];
          entry.r = true;
          if (prev) prev.n = next;
          if (next) next.p = prev;
          if (that._f == entry) that._f = next;
          if (that._l == entry) that._l = prev;
          that[SIZE]--;
        } return !!entry;
      },
      // 23.2.3.6 Set.prototype.forEach(callbackfn, thisArg = undefined)
      // 23.1.3.5 Map.prototype.forEach(callbackfn, thisArg = undefined)
      forEach: function forEach(callbackfn /* , that = undefined */) {
        validate(this, NAME);
        var f = ctx(callbackfn, arguments.length > 1 ? arguments[1] : undefined, 3);
        var entry;
        while (entry = entry ? entry.n : this._f) {
          f(entry.v, entry.k, this);
          // revert to the last existing entry
          while (entry && entry.r) entry = entry.p;
        }
      },
      // 23.1.3.7 Map.prototype.has(key)
      // 23.2.3.7 Set.prototype.has(value)
      has: function has(key) {
        return !!getEntry(validate(this, NAME), key);
      }
    });
    if (DESCRIPTORS) dP(C.prototype, 'size', {
      get: function () {
        return validate(this, NAME)[SIZE];
      }
    });
    return C;
  },
  def: function (that, key, value) {
    var entry = getEntry(that, key);
    var prev, index;
    // change existing entry
    if (entry) {
      entry.v = value;
    // create new entry
    } else {
      that._l = entry = {
        i: index = fastKey(key, true), // <- index
        k: key,                        // <- key
        v: value,                      // <- value
        p: prev = that._l,             // <- previous entry
        n: undefined,                  // <- next entry
        r: false                       // <- removed
      };
      if (!that._f) that._f = entry;
      if (prev) prev.n = entry;
      that[SIZE]++;
      // add to index
      if (index !== 'F') that._i[index] = entry;
    } return that;
  },
  getEntry: getEntry,
  setStrong: function (C, NAME, IS_MAP) {
    // add .keys, .values, .entries, [@@iterator]
    // 23.1.3.4, 23.1.3.8, 23.1.3.11, 23.1.3.12, 23.2.3.5, 23.2.3.8, 23.2.3.10, 23.2.3.11
    $iterDefine(C, NAME, function (iterated, kind) {
      this._t = validate(iterated, NAME); // target
      this._k = kind;                     // kind
      this._l = undefined;                // previous
    }, function () {
      var that = this;
      var kind = that._k;
      var entry = that._l;
      // revert to the last existing entry
      while (entry && entry.r) entry = entry.p;
      // get next entry
      if (!that._t || !(that._l = entry = entry ? entry.n : that._t._f)) {
        // or finish the iteration
        that._t = undefined;
        return step(1);
      }
      // return step by kind
      if (kind == 'keys') return step(0, entry.k);
      if (kind == 'values') return step(0, entry.v);
      return step(0, [entry.k, entry.v]);
    }, IS_MAP ? 'entries' : 'values', !IS_MAP, true);

    // add [@@species], 23.1.2.2, 23.2.2.2
    setSpecies(NAME);
  }
};

},{"./_object-dp":"node_modules/core-js/modules/_object-dp.js","./_object-create":"node_modules/core-js/modules/_object-create.js","./_redefine-all":"node_modules/core-js/modules/_redefine-all.js","./_ctx":"node_modules/core-js/modules/_ctx.js","./_an-instance":"node_modules/core-js/modules/_an-instance.js","./_for-of":"node_modules/core-js/modules/_for-of.js","./_iter-define":"node_modules/core-js/modules/_iter-define.js","./_iter-step":"node_modules/core-js/modules/_iter-step.js","./_set-species":"node_modules/core-js/modules/_set-species.js","./_descriptors":"node_modules/core-js/modules/_descriptors.js","./_meta":"node_modules/core-js/modules/_meta.js","./_validate-collection":"node_modules/core-js/modules/_validate-collection.js"}],"node_modules/core-js/modules/_collection.js":[function(require,module,exports) {

'use strict';
var global = require('./_global');
var $export = require('./_export');
var redefine = require('./_redefine');
var redefineAll = require('./_redefine-all');
var meta = require('./_meta');
var forOf = require('./_for-of');
var anInstance = require('./_an-instance');
var isObject = require('./_is-object');
var fails = require('./_fails');
var $iterDetect = require('./_iter-detect');
var setToStringTag = require('./_set-to-string-tag');
var inheritIfRequired = require('./_inherit-if-required');

module.exports = function (NAME, wrapper, methods, common, IS_MAP, IS_WEAK) {
  var Base = global[NAME];
  var C = Base;
  var ADDER = IS_MAP ? 'set' : 'add';
  var proto = C && C.prototype;
  var O = {};
  var fixMethod = function (KEY) {
    var fn = proto[KEY];
    redefine(proto, KEY,
      KEY == 'delete' ? function (a) {
        return IS_WEAK && !isObject(a) ? false : fn.call(this, a === 0 ? 0 : a);
      } : KEY == 'has' ? function has(a) {
        return IS_WEAK && !isObject(a) ? false : fn.call(this, a === 0 ? 0 : a);
      } : KEY == 'get' ? function get(a) {
        return IS_WEAK && !isObject(a) ? undefined : fn.call(this, a === 0 ? 0 : a);
      } : KEY == 'add' ? function add(a) { fn.call(this, a === 0 ? 0 : a); return this; }
        : function set(a, b) { fn.call(this, a === 0 ? 0 : a, b); return this; }
    );
  };
  if (typeof C != 'function' || !(IS_WEAK || proto.forEach && !fails(function () {
    new C().entries().next();
  }))) {
    // create collection constructor
    C = common.getConstructor(wrapper, NAME, IS_MAP, ADDER);
    redefineAll(C.prototype, methods);
    meta.NEED = true;
  } else {
    var instance = new C();
    // early implementations not supports chaining
    var HASNT_CHAINING = instance[ADDER](IS_WEAK ? {} : -0, 1) != instance;
    // V8 ~  Chromium 40- weak-collections throws on primitives, but should return false
    var THROWS_ON_PRIMITIVES = fails(function () { instance.has(1); });
    // most early implementations doesn't supports iterables, most modern - not close it correctly
    var ACCEPT_ITERABLES = $iterDetect(function (iter) { new C(iter); }); // eslint-disable-line no-new
    // for early implementations -0 and +0 not the same
    var BUGGY_ZERO = !IS_WEAK && fails(function () {
      // V8 ~ Chromium 42- fails only with 5+ elements
      var $instance = new C();
      var index = 5;
      while (index--) $instance[ADDER](index, index);
      return !$instance.has(-0);
    });
    if (!ACCEPT_ITERABLES) {
      C = wrapper(function (target, iterable) {
        anInstance(target, C, NAME);
        var that = inheritIfRequired(new Base(), target, C);
        if (iterable != undefined) forOf(iterable, IS_MAP, that[ADDER], that);
        return that;
      });
      C.prototype = proto;
      proto.constructor = C;
    }
    if (THROWS_ON_PRIMITIVES || BUGGY_ZERO) {
      fixMethod('delete');
      fixMethod('has');
      IS_MAP && fixMethod('get');
    }
    if (BUGGY_ZERO || HASNT_CHAINING) fixMethod(ADDER);
    // weak collections should not contains .clear method
    if (IS_WEAK && proto.clear) delete proto.clear;
  }

  setToStringTag(C, NAME);

  O[NAME] = C;
  $export($export.G + $export.W + $export.F * (C != Base), O);

  if (!IS_WEAK) common.setStrong(C, NAME, IS_MAP);

  return C;
};

},{"./_global":"node_modules/core-js/modules/_global.js","./_export":"node_modules/core-js/modules/_export.js","./_redefine":"node_modules/core-js/modules/_redefine.js","./_redefine-all":"node_modules/core-js/modules/_redefine-all.js","./_meta":"node_modules/core-js/modules/_meta.js","./_for-of":"node_modules/core-js/modules/_for-of.js","./_an-instance":"node_modules/core-js/modules/_an-instance.js","./_is-object":"node_modules/core-js/modules/_is-object.js","./_fails":"node_modules/core-js/modules/_fails.js","./_iter-detect":"node_modules/core-js/modules/_iter-detect.js","./_set-to-string-tag":"node_modules/core-js/modules/_set-to-string-tag.js","./_inherit-if-required":"node_modules/core-js/modules/_inherit-if-required.js"}],"node_modules/core-js/modules/es6.map.js":[function(require,module,exports) {
'use strict';
var strong = require('./_collection-strong');
var validate = require('./_validate-collection');
var MAP = 'Map';

// 23.1 Map Objects
module.exports = require('./_collection')(MAP, function (get) {
  return function Map() { return get(this, arguments.length > 0 ? arguments[0] : undefined); };
}, {
  // 23.1.3.6 Map.prototype.get(key)
  get: function get(key) {
    var entry = strong.getEntry(validate(this, MAP), key);
    return entry && entry.v;
  },
  // 23.1.3.9 Map.prototype.set(key, value)
  set: function set(key, value) {
    return strong.def(validate(this, MAP), key === 0 ? 0 : key, value);
  }
}, strong, true);

},{"./_collection-strong":"node_modules/core-js/modules/_collection-strong.js","./_validate-collection":"node_modules/core-js/modules/_validate-collection.js","./_collection":"node_modules/core-js/modules/_collection.js"}],"node_modules/core-js/modules/es6.set.js":[function(require,module,exports) {
'use strict';
var strong = require('./_collection-strong');
var validate = require('./_validate-collection');
var SET = 'Set';

// 23.2 Set Objects
module.exports = require('./_collection')(SET, function (get) {
  return function Set() { return get(this, arguments.length > 0 ? arguments[0] : undefined); };
}, {
  // 23.2.3.1 Set.prototype.add(value)
  add: function add(value) {
    return strong.def(validate(this, SET), value = value === 0 ? 0 : value, value);
  }
}, strong);

},{"./_collection-strong":"node_modules/core-js/modules/_collection-strong.js","./_validate-collection":"node_modules/core-js/modules/_validate-collection.js","./_collection":"node_modules/core-js/modules/_collection.js"}],"node_modules/core-js/modules/_collection-weak.js":[function(require,module,exports) {
'use strict';
var redefineAll = require('./_redefine-all');
var getWeak = require('./_meta').getWeak;
var anObject = require('./_an-object');
var isObject = require('./_is-object');
var anInstance = require('./_an-instance');
var forOf = require('./_for-of');
var createArrayMethod = require('./_array-methods');
var $has = require('./_has');
var validate = require('./_validate-collection');
var arrayFind = createArrayMethod(5);
var arrayFindIndex = createArrayMethod(6);
var id = 0;

// fallback for uncaught frozen keys
var uncaughtFrozenStore = function (that) {
  return that._l || (that._l = new UncaughtFrozenStore());
};
var UncaughtFrozenStore = function () {
  this.a = [];
};
var findUncaughtFrozen = function (store, key) {
  return arrayFind(store.a, function (it) {
    return it[0] === key;
  });
};
UncaughtFrozenStore.prototype = {
  get: function (key) {
    var entry = findUncaughtFrozen(this, key);
    if (entry) return entry[1];
  },
  has: function (key) {
    return !!findUncaughtFrozen(this, key);
  },
  set: function (key, value) {
    var entry = findUncaughtFrozen(this, key);
    if (entry) entry[1] = value;
    else this.a.push([key, value]);
  },
  'delete': function (key) {
    var index = arrayFindIndex(this.a, function (it) {
      return it[0] === key;
    });
    if (~index) this.a.splice(index, 1);
    return !!~index;
  }
};

module.exports = {
  getConstructor: function (wrapper, NAME, IS_MAP, ADDER) {
    var C = wrapper(function (that, iterable) {
      anInstance(that, C, NAME, '_i');
      that._t = NAME;      // collection type
      that._i = id++;      // collection id
      that._l = undefined; // leak store for uncaught frozen objects
      if (iterable != undefined) forOf(iterable, IS_MAP, that[ADDER], that);
    });
    redefineAll(C.prototype, {
      // 23.3.3.2 WeakMap.prototype.delete(key)
      // 23.4.3.3 WeakSet.prototype.delete(value)
      'delete': function (key) {
        if (!isObject(key)) return false;
        var data = getWeak(key);
        if (data === true) return uncaughtFrozenStore(validate(this, NAME))['delete'](key);
        return data && $has(data, this._i) && delete data[this._i];
      },
      // 23.3.3.4 WeakMap.prototype.has(key)
      // 23.4.3.4 WeakSet.prototype.has(value)
      has: function has(key) {
        if (!isObject(key)) return false;
        var data = getWeak(key);
        if (data === true) return uncaughtFrozenStore(validate(this, NAME)).has(key);
        return data && $has(data, this._i);
      }
    });
    return C;
  },
  def: function (that, key, value) {
    var data = getWeak(anObject(key), true);
    if (data === true) uncaughtFrozenStore(that).set(key, value);
    else data[that._i] = value;
    return that;
  },
  ufstore: uncaughtFrozenStore
};

},{"./_redefine-all":"node_modules/core-js/modules/_redefine-all.js","./_meta":"node_modules/core-js/modules/_meta.js","./_an-object":"node_modules/core-js/modules/_an-object.js","./_is-object":"node_modules/core-js/modules/_is-object.js","./_an-instance":"node_modules/core-js/modules/_an-instance.js","./_for-of":"node_modules/core-js/modules/_for-of.js","./_array-methods":"node_modules/core-js/modules/_array-methods.js","./_has":"node_modules/core-js/modules/_has.js","./_validate-collection":"node_modules/core-js/modules/_validate-collection.js"}],"node_modules/core-js/modules/es6.weak-map.js":[function(require,module,exports) {
'use strict';
var each = require('./_array-methods')(0);
var redefine = require('./_redefine');
var meta = require('./_meta');
var assign = require('./_object-assign');
var weak = require('./_collection-weak');
var isObject = require('./_is-object');
var fails = require('./_fails');
var validate = require('./_validate-collection');
var WEAK_MAP = 'WeakMap';
var getWeak = meta.getWeak;
var isExtensible = Object.isExtensible;
var uncaughtFrozenStore = weak.ufstore;
var tmp = {};
var InternalMap;

var wrapper = function (get) {
  return function WeakMap() {
    return get(this, arguments.length > 0 ? arguments[0] : undefined);
  };
};

var methods = {
  // 23.3.3.3 WeakMap.prototype.get(key)
  get: function get(key) {
    if (isObject(key)) {
      var data = getWeak(key);
      if (data === true) return uncaughtFrozenStore(validate(this, WEAK_MAP)).get(key);
      return data ? data[this._i] : undefined;
    }
  },
  // 23.3.3.5 WeakMap.prototype.set(key, value)
  set: function set(key, value) {
    return weak.def(validate(this, WEAK_MAP), key, value);
  }
};

// 23.3 WeakMap Objects
var $WeakMap = module.exports = require('./_collection')(WEAK_MAP, wrapper, methods, weak, true, true);

// IE11 WeakMap frozen keys fix
if (fails(function () { return new $WeakMap().set((Object.freeze || Object)(tmp), 7).get(tmp) != 7; })) {
  InternalMap = weak.getConstructor(wrapper, WEAK_MAP);
  assign(InternalMap.prototype, methods);
  meta.NEED = true;
  each(['delete', 'has', 'get', 'set'], function (key) {
    var proto = $WeakMap.prototype;
    var method = proto[key];
    redefine(proto, key, function (a, b) {
      // store frozen objects on internal weakmap shim
      if (isObject(a) && !isExtensible(a)) {
        if (!this._f) this._f = new InternalMap();
        var result = this._f[key](a, b);
        return key == 'set' ? this : result;
      // store all the rest on native weakmap
      } return method.call(this, a, b);
    });
  });
}

},{"./_array-methods":"node_modules/core-js/modules/_array-methods.js","./_redefine":"node_modules/core-js/modules/_redefine.js","./_meta":"node_modules/core-js/modules/_meta.js","./_object-assign":"node_modules/core-js/modules/_object-assign.js","./_collection-weak":"node_modules/core-js/modules/_collection-weak.js","./_is-object":"node_modules/core-js/modules/_is-object.js","./_fails":"node_modules/core-js/modules/_fails.js","./_validate-collection":"node_modules/core-js/modules/_validate-collection.js","./_collection":"node_modules/core-js/modules/_collection.js"}],"node_modules/core-js/modules/es6.weak-set.js":[function(require,module,exports) {
'use strict';
var weak = require('./_collection-weak');
var validate = require('./_validate-collection');
var WEAK_SET = 'WeakSet';

// 23.4 WeakSet Objects
require('./_collection')(WEAK_SET, function (get) {
  return function WeakSet() { return get(this, arguments.length > 0 ? arguments[0] : undefined); };
}, {
  // 23.4.3.1 WeakSet.prototype.add(value)
  add: function add(value) {
    return weak.def(validate(this, WEAK_SET), value, true);
  }
}, weak, false, true);

},{"./_collection-weak":"node_modules/core-js/modules/_collection-weak.js","./_validate-collection":"node_modules/core-js/modules/_validate-collection.js","./_collection":"node_modules/core-js/modules/_collection.js"}],"node_modules/core-js/modules/_typed.js":[function(require,module,exports) {

var global = require('./_global');
var hide = require('./_hide');
var uid = require('./_uid');
var TYPED = uid('typed_array');
var VIEW = uid('view');
var ABV = !!(global.ArrayBuffer && global.DataView);
var CONSTR = ABV;
var i = 0;
var l = 9;
var Typed;

var TypedArrayConstructors = (
  'Int8Array,Uint8Array,Uint8ClampedArray,Int16Array,Uint16Array,Int32Array,Uint32Array,Float32Array,Float64Array'
).split(',');

while (i < l) {
  if (Typed = global[TypedArrayConstructors[i++]]) {
    hide(Typed.prototype, TYPED, true);
    hide(Typed.prototype, VIEW, true);
  } else CONSTR = false;
}

module.exports = {
  ABV: ABV,
  CONSTR: CONSTR,
  TYPED: TYPED,
  VIEW: VIEW
};

},{"./_global":"node_modules/core-js/modules/_global.js","./_hide":"node_modules/core-js/modules/_hide.js","./_uid":"node_modules/core-js/modules/_uid.js"}],"node_modules/core-js/modules/_to-index.js":[function(require,module,exports) {
// https://tc39.github.io/ecma262/#sec-toindex
var toInteger = require('./_to-integer');
var toLength = require('./_to-length');
module.exports = function (it) {
  if (it === undefined) return 0;
  var number = toInteger(it);
  var length = toLength(number);
  if (number !== length) throw RangeError('Wrong length!');
  return length;
};

},{"./_to-integer":"node_modules/core-js/modules/_to-integer.js","./_to-length":"node_modules/core-js/modules/_to-length.js"}],"node_modules/core-js/modules/_typed-buffer.js":[function(require,module,exports) {

'use strict';
var global = require('./_global');
var DESCRIPTORS = require('./_descriptors');
var LIBRARY = require('./_library');
var $typed = require('./_typed');
var hide = require('./_hide');
var redefineAll = require('./_redefine-all');
var fails = require('./_fails');
var anInstance = require('./_an-instance');
var toInteger = require('./_to-integer');
var toLength = require('./_to-length');
var toIndex = require('./_to-index');
var gOPN = require('./_object-gopn').f;
var dP = require('./_object-dp').f;
var arrayFill = require('./_array-fill');
var setToStringTag = require('./_set-to-string-tag');
var ARRAY_BUFFER = 'ArrayBuffer';
var DATA_VIEW = 'DataView';
var PROTOTYPE = 'prototype';
var WRONG_LENGTH = 'Wrong length!';
var WRONG_INDEX = 'Wrong index!';
var $ArrayBuffer = global[ARRAY_BUFFER];
var $DataView = global[DATA_VIEW];
var Math = global.Math;
var RangeError = global.RangeError;
// eslint-disable-next-line no-shadow-restricted-names
var Infinity = global.Infinity;
var BaseBuffer = $ArrayBuffer;
var abs = Math.abs;
var pow = Math.pow;
var floor = Math.floor;
var log = Math.log;
var LN2 = Math.LN2;
var BUFFER = 'buffer';
var BYTE_LENGTH = 'byteLength';
var BYTE_OFFSET = 'byteOffset';
var $BUFFER = DESCRIPTORS ? '_b' : BUFFER;
var $LENGTH = DESCRIPTORS ? '_l' : BYTE_LENGTH;
var $OFFSET = DESCRIPTORS ? '_o' : BYTE_OFFSET;

// IEEE754 conversions based on https://github.com/feross/ieee754
function packIEEE754(value, mLen, nBytes) {
  var buffer = new Array(nBytes);
  var eLen = nBytes * 8 - mLen - 1;
  var eMax = (1 << eLen) - 1;
  var eBias = eMax >> 1;
  var rt = mLen === 23 ? pow(2, -24) - pow(2, -77) : 0;
  var i = 0;
  var s = value < 0 || value === 0 && 1 / value < 0 ? 1 : 0;
  var e, m, c;
  value = abs(value);
  // eslint-disable-next-line no-self-compare
  if (value != value || value === Infinity) {
    // eslint-disable-next-line no-self-compare
    m = value != value ? 1 : 0;
    e = eMax;
  } else {
    e = floor(log(value) / LN2);
    if (value * (c = pow(2, -e)) < 1) {
      e--;
      c *= 2;
    }
    if (e + eBias >= 1) {
      value += rt / c;
    } else {
      value += rt * pow(2, 1 - eBias);
    }
    if (value * c >= 2) {
      e++;
      c /= 2;
    }
    if (e + eBias >= eMax) {
      m = 0;
      e = eMax;
    } else if (e + eBias >= 1) {
      m = (value * c - 1) * pow(2, mLen);
      e = e + eBias;
    } else {
      m = value * pow(2, eBias - 1) * pow(2, mLen);
      e = 0;
    }
  }
  for (; mLen >= 8; buffer[i++] = m & 255, m /= 256, mLen -= 8);
  e = e << mLen | m;
  eLen += mLen;
  for (; eLen > 0; buffer[i++] = e & 255, e /= 256, eLen -= 8);
  buffer[--i] |= s * 128;
  return buffer;
}
function unpackIEEE754(buffer, mLen, nBytes) {
  var eLen = nBytes * 8 - mLen - 1;
  var eMax = (1 << eLen) - 1;
  var eBias = eMax >> 1;
  var nBits = eLen - 7;
  var i = nBytes - 1;
  var s = buffer[i--];
  var e = s & 127;
  var m;
  s >>= 7;
  for (; nBits > 0; e = e * 256 + buffer[i], i--, nBits -= 8);
  m = e & (1 << -nBits) - 1;
  e >>= -nBits;
  nBits += mLen;
  for (; nBits > 0; m = m * 256 + buffer[i], i--, nBits -= 8);
  if (e === 0) {
    e = 1 - eBias;
  } else if (e === eMax) {
    return m ? NaN : s ? -Infinity : Infinity;
  } else {
    m = m + pow(2, mLen);
    e = e - eBias;
  } return (s ? -1 : 1) * m * pow(2, e - mLen);
}

function unpackI32(bytes) {
  return bytes[3] << 24 | bytes[2] << 16 | bytes[1] << 8 | bytes[0];
}
function packI8(it) {
  return [it & 0xff];
}
function packI16(it) {
  return [it & 0xff, it >> 8 & 0xff];
}
function packI32(it) {
  return [it & 0xff, it >> 8 & 0xff, it >> 16 & 0xff, it >> 24 & 0xff];
}
function packF64(it) {
  return packIEEE754(it, 52, 8);
}
function packF32(it) {
  return packIEEE754(it, 23, 4);
}

function addGetter(C, key, internal) {
  dP(C[PROTOTYPE], key, { get: function () { return this[internal]; } });
}

function get(view, bytes, index, isLittleEndian) {
  var numIndex = +index;
  var intIndex = toIndex(numIndex);
  if (intIndex + bytes > view[$LENGTH]) throw RangeError(WRONG_INDEX);
  var store = view[$BUFFER]._b;
  var start = intIndex + view[$OFFSET];
  var pack = store.slice(start, start + bytes);
  return isLittleEndian ? pack : pack.reverse();
}
function set(view, bytes, index, conversion, value, isLittleEndian) {
  var numIndex = +index;
  var intIndex = toIndex(numIndex);
  if (intIndex + bytes > view[$LENGTH]) throw RangeError(WRONG_INDEX);
  var store = view[$BUFFER]._b;
  var start = intIndex + view[$OFFSET];
  var pack = conversion(+value);
  for (var i = 0; i < bytes; i++) store[start + i] = pack[isLittleEndian ? i : bytes - i - 1];
}

if (!$typed.ABV) {
  $ArrayBuffer = function ArrayBuffer(length) {
    anInstance(this, $ArrayBuffer, ARRAY_BUFFER);
    var byteLength = toIndex(length);
    this._b = arrayFill.call(new Array(byteLength), 0);
    this[$LENGTH] = byteLength;
  };

  $DataView = function DataView(buffer, byteOffset, byteLength) {
    anInstance(this, $DataView, DATA_VIEW);
    anInstance(buffer, $ArrayBuffer, DATA_VIEW);
    var bufferLength = buffer[$LENGTH];
    var offset = toInteger(byteOffset);
    if (offset < 0 || offset > bufferLength) throw RangeError('Wrong offset!');
    byteLength = byteLength === undefined ? bufferLength - offset : toLength(byteLength);
    if (offset + byteLength > bufferLength) throw RangeError(WRONG_LENGTH);
    this[$BUFFER] = buffer;
    this[$OFFSET] = offset;
    this[$LENGTH] = byteLength;
  };

  if (DESCRIPTORS) {
    addGetter($ArrayBuffer, BYTE_LENGTH, '_l');
    addGetter($DataView, BUFFER, '_b');
    addGetter($DataView, BYTE_LENGTH, '_l');
    addGetter($DataView, BYTE_OFFSET, '_o');
  }

  redefineAll($DataView[PROTOTYPE], {
    getInt8: function getInt8(byteOffset) {
      return get(this, 1, byteOffset)[0] << 24 >> 24;
    },
    getUint8: function getUint8(byteOffset) {
      return get(this, 1, byteOffset)[0];
    },
    getInt16: function getInt16(byteOffset /* , littleEndian */) {
      var bytes = get(this, 2, byteOffset, arguments[1]);
      return (bytes[1] << 8 | bytes[0]) << 16 >> 16;
    },
    getUint16: function getUint16(byteOffset /* , littleEndian */) {
      var bytes = get(this, 2, byteOffset, arguments[1]);
      return bytes[1] << 8 | bytes[0];
    },
    getInt32: function getInt32(byteOffset /* , littleEndian */) {
      return unpackI32(get(this, 4, byteOffset, arguments[1]));
    },
    getUint32: function getUint32(byteOffset /* , littleEndian */) {
      return unpackI32(get(this, 4, byteOffset, arguments[1])) >>> 0;
    },
    getFloat32: function getFloat32(byteOffset /* , littleEndian */) {
      return unpackIEEE754(get(this, 4, byteOffset, arguments[1]), 23, 4);
    },
    getFloat64: function getFloat64(byteOffset /* , littleEndian */) {
      return unpackIEEE754(get(this, 8, byteOffset, arguments[1]), 52, 8);
    },
    setInt8: function setInt8(byteOffset, value) {
      set(this, 1, byteOffset, packI8, value);
    },
    setUint8: function setUint8(byteOffset, value) {
      set(this, 1, byteOffset, packI8, value);
    },
    setInt16: function setInt16(byteOffset, value /* , littleEndian */) {
      set(this, 2, byteOffset, packI16, value, arguments[2]);
    },
    setUint16: function setUint16(byteOffset, value /* , littleEndian */) {
      set(this, 2, byteOffset, packI16, value, arguments[2]);
    },
    setInt32: function setInt32(byteOffset, value /* , littleEndian */) {
      set(this, 4, byteOffset, packI32, value, arguments[2]);
    },
    setUint32: function setUint32(byteOffset, value /* , littleEndian */) {
      set(this, 4, byteOffset, packI32, value, arguments[2]);
    },
    setFloat32: function setFloat32(byteOffset, value /* , littleEndian */) {
      set(this, 4, byteOffset, packF32, value, arguments[2]);
    },
    setFloat64: function setFloat64(byteOffset, value /* , littleEndian */) {
      set(this, 8, byteOffset, packF64, value, arguments[2]);
    }
  });
} else {
  if (!fails(function () {
    $ArrayBuffer(1);
  }) || !fails(function () {
    new $ArrayBuffer(-1); // eslint-disable-line no-new
  }) || fails(function () {
    new $ArrayBuffer(); // eslint-disable-line no-new
    new $ArrayBuffer(1.5); // eslint-disable-line no-new
    new $ArrayBuffer(NaN); // eslint-disable-line no-new
    return $ArrayBuffer.name != ARRAY_BUFFER;
  })) {
    $ArrayBuffer = function ArrayBuffer(length) {
      anInstance(this, $ArrayBuffer);
      return new BaseBuffer(toIndex(length));
    };
    var ArrayBufferProto = $ArrayBuffer[PROTOTYPE] = BaseBuffer[PROTOTYPE];
    for (var keys = gOPN(BaseBuffer), j = 0, key; keys.length > j;) {
      if (!((key = keys[j++]) in $ArrayBuffer)) hide($ArrayBuffer, key, BaseBuffer[key]);
    }
    if (!LIBRARY) ArrayBufferProto.constructor = $ArrayBuffer;
  }
  // iOS Safari 7.x bug
  var view = new $DataView(new $ArrayBuffer(2));
  var $setInt8 = $DataView[PROTOTYPE].setInt8;
  view.setInt8(0, 2147483648);
  view.setInt8(1, 2147483649);
  if (view.getInt8(0) || !view.getInt8(1)) redefineAll($DataView[PROTOTYPE], {
    setInt8: function setInt8(byteOffset, value) {
      $setInt8.call(this, byteOffset, value << 24 >> 24);
    },
    setUint8: function setUint8(byteOffset, value) {
      $setInt8.call(this, byteOffset, value << 24 >> 24);
    }
  }, true);
}
setToStringTag($ArrayBuffer, ARRAY_BUFFER);
setToStringTag($DataView, DATA_VIEW);
hide($DataView[PROTOTYPE], $typed.VIEW, true);
exports[ARRAY_BUFFER] = $ArrayBuffer;
exports[DATA_VIEW] = $DataView;

},{"./_global":"node_modules/core-js/modules/_global.js","./_descriptors":"node_modules/core-js/modules/_descriptors.js","./_library":"node_modules/core-js/modules/_library.js","./_typed":"node_modules/core-js/modules/_typed.js","./_hide":"node_modules/core-js/modules/_hide.js","./_redefine-all":"node_modules/core-js/modules/_redefine-all.js","./_fails":"node_modules/core-js/modules/_fails.js","./_an-instance":"node_modules/core-js/modules/_an-instance.js","./_to-integer":"node_modules/core-js/modules/_to-integer.js","./_to-length":"node_modules/core-js/modules/_to-length.js","./_to-index":"node_modules/core-js/modules/_to-index.js","./_object-gopn":"node_modules/core-js/modules/_object-gopn.js","./_object-dp":"node_modules/core-js/modules/_object-dp.js","./_array-fill":"node_modules/core-js/modules/_array-fill.js","./_set-to-string-tag":"node_modules/core-js/modules/_set-to-string-tag.js"}],"node_modules/core-js/modules/es6.typed.array-buffer.js":[function(require,module,exports) {
'use strict';
var $export = require('./_export');
var $typed = require('./_typed');
var buffer = require('./_typed-buffer');
var anObject = require('./_an-object');
var toAbsoluteIndex = require('./_to-absolute-index');
var toLength = require('./_to-length');
var isObject = require('./_is-object');
var ArrayBuffer = require('./_global').ArrayBuffer;
var speciesConstructor = require('./_species-constructor');
var $ArrayBuffer = buffer.ArrayBuffer;
var $DataView = buffer.DataView;
var $isView = $typed.ABV && ArrayBuffer.isView;
var $slice = $ArrayBuffer.prototype.slice;
var VIEW = $typed.VIEW;
var ARRAY_BUFFER = 'ArrayBuffer';

$export($export.G + $export.W + $export.F * (ArrayBuffer !== $ArrayBuffer), { ArrayBuffer: $ArrayBuffer });

$export($export.S + $export.F * !$typed.CONSTR, ARRAY_BUFFER, {
  // 24.1.3.1 ArrayBuffer.isView(arg)
  isView: function isView(it) {
    return $isView && $isView(it) || isObject(it) && VIEW in it;
  }
});

$export($export.P + $export.U + $export.F * require('./_fails')(function () {
  return !new $ArrayBuffer(2).slice(1, undefined).byteLength;
}), ARRAY_BUFFER, {
  // 24.1.4.3 ArrayBuffer.prototype.slice(start, end)
  slice: function slice(start, end) {
    if ($slice !== undefined && end === undefined) return $slice.call(anObject(this), start); // FF fix
    var len = anObject(this).byteLength;
    var first = toAbsoluteIndex(start, len);
    var fin = toAbsoluteIndex(end === undefined ? len : end, len);
    var result = new (speciesConstructor(this, $ArrayBuffer))(toLength(fin - first));
    var viewS = new $DataView(this);
    var viewT = new $DataView(result);
    var index = 0;
    while (first < fin) {
      viewT.setUint8(index++, viewS.getUint8(first++));
    } return result;
  }
});

require('./_set-species')(ARRAY_BUFFER);

},{"./_export":"node_modules/core-js/modules/_export.js","./_typed":"node_modules/core-js/modules/_typed.js","./_typed-buffer":"node_modules/core-js/modules/_typed-buffer.js","./_an-object":"node_modules/core-js/modules/_an-object.js","./_to-absolute-index":"node_modules/core-js/modules/_to-absolute-index.js","./_to-length":"node_modules/core-js/modules/_to-length.js","./_is-object":"node_modules/core-js/modules/_is-object.js","./_global":"node_modules/core-js/modules/_global.js","./_species-constructor":"node_modules/core-js/modules/_species-constructor.js","./_fails":"node_modules/core-js/modules/_fails.js","./_set-species":"node_modules/core-js/modules/_set-species.js"}],"node_modules/core-js/modules/es6.typed.data-view.js":[function(require,module,exports) {
var $export = require('./_export');
$export($export.G + $export.W + $export.F * !require('./_typed').ABV, {
  DataView: require('./_typed-buffer').DataView
});

},{"./_export":"node_modules/core-js/modules/_export.js","./_typed":"node_modules/core-js/modules/_typed.js","./_typed-buffer":"node_modules/core-js/modules/_typed-buffer.js"}],"node_modules/core-js/modules/_typed-array.js":[function(require,module,exports) {
var global = arguments[3];
'use strict';
if (require('./_descriptors')) {
  var LIBRARY = require('./_library');
  var global = require('./_global');
  var fails = require('./_fails');
  var $export = require('./_export');
  var $typed = require('./_typed');
  var $buffer = require('./_typed-buffer');
  var ctx = require('./_ctx');
  var anInstance = require('./_an-instance');
  var propertyDesc = require('./_property-desc');
  var hide = require('./_hide');
  var redefineAll = require('./_redefine-all');
  var toInteger = require('./_to-integer');
  var toLength = require('./_to-length');
  var toIndex = require('./_to-index');
  var toAbsoluteIndex = require('./_to-absolute-index');
  var toPrimitive = require('./_to-primitive');
  var has = require('./_has');
  var classof = require('./_classof');
  var isObject = require('./_is-object');
  var toObject = require('./_to-object');
  var isArrayIter = require('./_is-array-iter');
  var create = require('./_object-create');
  var getPrototypeOf = require('./_object-gpo');
  var gOPN = require('./_object-gopn').f;
  var getIterFn = require('./core.get-iterator-method');
  var uid = require('./_uid');
  var wks = require('./_wks');
  var createArrayMethod = require('./_array-methods');
  var createArrayIncludes = require('./_array-includes');
  var speciesConstructor = require('./_species-constructor');
  var ArrayIterators = require('./es6.array.iterator');
  var Iterators = require('./_iterators');
  var $iterDetect = require('./_iter-detect');
  var setSpecies = require('./_set-species');
  var arrayFill = require('./_array-fill');
  var arrayCopyWithin = require('./_array-copy-within');
  var $DP = require('./_object-dp');
  var $GOPD = require('./_object-gopd');
  var dP = $DP.f;
  var gOPD = $GOPD.f;
  var RangeError = global.RangeError;
  var TypeError = global.TypeError;
  var Uint8Array = global.Uint8Array;
  var ARRAY_BUFFER = 'ArrayBuffer';
  var SHARED_BUFFER = 'Shared' + ARRAY_BUFFER;
  var BYTES_PER_ELEMENT = 'BYTES_PER_ELEMENT';
  var PROTOTYPE = 'prototype';
  var ArrayProto = Array[PROTOTYPE];
  var $ArrayBuffer = $buffer.ArrayBuffer;
  var $DataView = $buffer.DataView;
  var arrayForEach = createArrayMethod(0);
  var arrayFilter = createArrayMethod(2);
  var arraySome = createArrayMethod(3);
  var arrayEvery = createArrayMethod(4);
  var arrayFind = createArrayMethod(5);
  var arrayFindIndex = createArrayMethod(6);
  var arrayIncludes = createArrayIncludes(true);
  var arrayIndexOf = createArrayIncludes(false);
  var arrayValues = ArrayIterators.values;
  var arrayKeys = ArrayIterators.keys;
  var arrayEntries = ArrayIterators.entries;
  var arrayLastIndexOf = ArrayProto.lastIndexOf;
  var arrayReduce = ArrayProto.reduce;
  var arrayReduceRight = ArrayProto.reduceRight;
  var arrayJoin = ArrayProto.join;
  var arraySort = ArrayProto.sort;
  var arraySlice = ArrayProto.slice;
  var arrayToString = ArrayProto.toString;
  var arrayToLocaleString = ArrayProto.toLocaleString;
  var ITERATOR = wks('iterator');
  var TAG = wks('toStringTag');
  var TYPED_CONSTRUCTOR = uid('typed_constructor');
  var DEF_CONSTRUCTOR = uid('def_constructor');
  var ALL_CONSTRUCTORS = $typed.CONSTR;
  var TYPED_ARRAY = $typed.TYPED;
  var VIEW = $typed.VIEW;
  var WRONG_LENGTH = 'Wrong length!';

  var $map = createArrayMethod(1, function (O, length) {
    return allocate(speciesConstructor(O, O[DEF_CONSTRUCTOR]), length);
  });

  var LITTLE_ENDIAN = fails(function () {
    // eslint-disable-next-line no-undef
    return new Uint8Array(new Uint16Array([1]).buffer)[0] === 1;
  });

  var FORCED_SET = !!Uint8Array && !!Uint8Array[PROTOTYPE].set && fails(function () {
    new Uint8Array(1).set({});
  });

  var toOffset = function (it, BYTES) {
    var offset = toInteger(it);
    if (offset < 0 || offset % BYTES) throw RangeError('Wrong offset!');
    return offset;
  };

  var validate = function (it) {
    if (isObject(it) && TYPED_ARRAY in it) return it;
    throw TypeError(it + ' is not a typed array!');
  };

  var allocate = function (C, length) {
    if (!(isObject(C) && TYPED_CONSTRUCTOR in C)) {
      throw TypeError('It is not a typed array constructor!');
    } return new C(length);
  };

  var speciesFromList = function (O, list) {
    return fromList(speciesConstructor(O, O[DEF_CONSTRUCTOR]), list);
  };

  var fromList = function (C, list) {
    var index = 0;
    var length = list.length;
    var result = allocate(C, length);
    while (length > index) result[index] = list[index++];
    return result;
  };

  var addGetter = function (it, key, internal) {
    dP(it, key, { get: function () { return this._d[internal]; } });
  };

  var $from = function from(source /* , mapfn, thisArg */) {
    var O = toObject(source);
    var aLen = arguments.length;
    var mapfn = aLen > 1 ? arguments[1] : undefined;
    var mapping = mapfn !== undefined;
    var iterFn = getIterFn(O);
    var i, length, values, result, step, iterator;
    if (iterFn != undefined && !isArrayIter(iterFn)) {
      for (iterator = iterFn.call(O), values = [], i = 0; !(step = iterator.next()).done; i++) {
        values.push(step.value);
      } O = values;
    }
    if (mapping && aLen > 2) mapfn = ctx(mapfn, arguments[2], 2);
    for (i = 0, length = toLength(O.length), result = allocate(this, length); length > i; i++) {
      result[i] = mapping ? mapfn(O[i], i) : O[i];
    }
    return result;
  };

  var $of = function of(/* ...items */) {
    var index = 0;
    var length = arguments.length;
    var result = allocate(this, length);
    while (length > index) result[index] = arguments[index++];
    return result;
  };

  // iOS Safari 6.x fails here
  var TO_LOCALE_BUG = !!Uint8Array && fails(function () { arrayToLocaleString.call(new Uint8Array(1)); });

  var $toLocaleString = function toLocaleString() {
    return arrayToLocaleString.apply(TO_LOCALE_BUG ? arraySlice.call(validate(this)) : validate(this), arguments);
  };

  var proto = {
    copyWithin: function copyWithin(target, start /* , end */) {
      return arrayCopyWithin.call(validate(this), target, start, arguments.length > 2 ? arguments[2] : undefined);
    },
    every: function every(callbackfn /* , thisArg */) {
      return arrayEvery(validate(this), callbackfn, arguments.length > 1 ? arguments[1] : undefined);
    },
    fill: function fill(value /* , start, end */) { // eslint-disable-line no-unused-vars
      return arrayFill.apply(validate(this), arguments);
    },
    filter: function filter(callbackfn /* , thisArg */) {
      return speciesFromList(this, arrayFilter(validate(this), callbackfn,
        arguments.length > 1 ? arguments[1] : undefined));
    },
    find: function find(predicate /* , thisArg */) {
      return arrayFind(validate(this), predicate, arguments.length > 1 ? arguments[1] : undefined);
    },
    findIndex: function findIndex(predicate /* , thisArg */) {
      return arrayFindIndex(validate(this), predicate, arguments.length > 1 ? arguments[1] : undefined);
    },
    forEach: function forEach(callbackfn /* , thisArg */) {
      arrayForEach(validate(this), callbackfn, arguments.length > 1 ? arguments[1] : undefined);
    },
    indexOf: function indexOf(searchElement /* , fromIndex */) {
      return arrayIndexOf(validate(this), searchElement, arguments.length > 1 ? arguments[1] : undefined);
    },
    includes: function includes(searchElement /* , fromIndex */) {
      return arrayIncludes(validate(this), searchElement, arguments.length > 1 ? arguments[1] : undefined);
    },
    join: function join(separator) { // eslint-disable-line no-unused-vars
      return arrayJoin.apply(validate(this), arguments);
    },
    lastIndexOf: function lastIndexOf(searchElement /* , fromIndex */) { // eslint-disable-line no-unused-vars
      return arrayLastIndexOf.apply(validate(this), arguments);
    },
    map: function map(mapfn /* , thisArg */) {
      return $map(validate(this), mapfn, arguments.length > 1 ? arguments[1] : undefined);
    },
    reduce: function reduce(callbackfn /* , initialValue */) { // eslint-disable-line no-unused-vars
      return arrayReduce.apply(validate(this), arguments);
    },
    reduceRight: function reduceRight(callbackfn /* , initialValue */) { // eslint-disable-line no-unused-vars
      return arrayReduceRight.apply(validate(this), arguments);
    },
    reverse: function reverse() {
      var that = this;
      var length = validate(that).length;
      var middle = Math.floor(length / 2);
      var index = 0;
      var value;
      while (index < middle) {
        value = that[index];
        that[index++] = that[--length];
        that[length] = value;
      } return that;
    },
    some: function some(callbackfn /* , thisArg */) {
      return arraySome(validate(this), callbackfn, arguments.length > 1 ? arguments[1] : undefined);
    },
    sort: function sort(comparefn) {
      return arraySort.call(validate(this), comparefn);
    },
    subarray: function subarray(begin, end) {
      var O = validate(this);
      var length = O.length;
      var $begin = toAbsoluteIndex(begin, length);
      return new (speciesConstructor(O, O[DEF_CONSTRUCTOR]))(
        O.buffer,
        O.byteOffset + $begin * O.BYTES_PER_ELEMENT,
        toLength((end === undefined ? length : toAbsoluteIndex(end, length)) - $begin)
      );
    }
  };

  var $slice = function slice(start, end) {
    return speciesFromList(this, arraySlice.call(validate(this), start, end));
  };

  var $set = function set(arrayLike /* , offset */) {
    validate(this);
    var offset = toOffset(arguments[1], 1);
    var length = this.length;
    var src = toObject(arrayLike);
    var len = toLength(src.length);
    var index = 0;
    if (len + offset > length) throw RangeError(WRONG_LENGTH);
    while (index < len) this[offset + index] = src[index++];
  };

  var $iterators = {
    entries: function entries() {
      return arrayEntries.call(validate(this));
    },
    keys: function keys() {
      return arrayKeys.call(validate(this));
    },
    values: function values() {
      return arrayValues.call(validate(this));
    }
  };

  var isTAIndex = function (target, key) {
    return isObject(target)
      && target[TYPED_ARRAY]
      && typeof key != 'symbol'
      && key in target
      && String(+key) == String(key);
  };
  var $getDesc = function getOwnPropertyDescriptor(target, key) {
    return isTAIndex(target, key = toPrimitive(key, true))
      ? propertyDesc(2, target[key])
      : gOPD(target, key);
  };
  var $setDesc = function defineProperty(target, key, desc) {
    if (isTAIndex(target, key = toPrimitive(key, true))
      && isObject(desc)
      && has(desc, 'value')
      && !has(desc, 'get')
      && !has(desc, 'set')
      // TODO: add validation descriptor w/o calling accessors
      && !desc.configurable
      && (!has(desc, 'writable') || desc.writable)
      && (!has(desc, 'enumerable') || desc.enumerable)
    ) {
      target[key] = desc.value;
      return target;
    } return dP(target, key, desc);
  };

  if (!ALL_CONSTRUCTORS) {
    $GOPD.f = $getDesc;
    $DP.f = $setDesc;
  }

  $export($export.S + $export.F * !ALL_CONSTRUCTORS, 'Object', {
    getOwnPropertyDescriptor: $getDesc,
    defineProperty: $setDesc
  });

  if (fails(function () { arrayToString.call({}); })) {
    arrayToString = arrayToLocaleString = function toString() {
      return arrayJoin.call(this);
    };
  }

  var $TypedArrayPrototype$ = redefineAll({}, proto);
  redefineAll($TypedArrayPrototype$, $iterators);
  hide($TypedArrayPrototype$, ITERATOR, $iterators.values);
  redefineAll($TypedArrayPrototype$, {
    slice: $slice,
    set: $set,
    constructor: function () { /* noop */ },
    toString: arrayToString,
    toLocaleString: $toLocaleString
  });
  addGetter($TypedArrayPrototype$, 'buffer', 'b');
  addGetter($TypedArrayPrototype$, 'byteOffset', 'o');
  addGetter($TypedArrayPrototype$, 'byteLength', 'l');
  addGetter($TypedArrayPrototype$, 'length', 'e');
  dP($TypedArrayPrototype$, TAG, {
    get: function () { return this[TYPED_ARRAY]; }
  });

  // eslint-disable-next-line max-statements
  module.exports = function (KEY, BYTES, wrapper, CLAMPED) {
    CLAMPED = !!CLAMPED;
    var NAME = KEY + (CLAMPED ? 'Clamped' : '') + 'Array';
    var GETTER = 'get' + KEY;
    var SETTER = 'set' + KEY;
    var TypedArray = global[NAME];
    var Base = TypedArray || {};
    var TAC = TypedArray && getPrototypeOf(TypedArray);
    var FORCED = !TypedArray || !$typed.ABV;
    var O = {};
    var TypedArrayPrototype = TypedArray && TypedArray[PROTOTYPE];
    var getter = function (that, index) {
      var data = that._d;
      return data.v[GETTER](index * BYTES + data.o, LITTLE_ENDIAN);
    };
    var setter = function (that, index, value) {
      var data = that._d;
      if (CLAMPED) value = (value = Math.round(value)) < 0 ? 0 : value > 0xff ? 0xff : value & 0xff;
      data.v[SETTER](index * BYTES + data.o, value, LITTLE_ENDIAN);
    };
    var addElement = function (that, index) {
      dP(that, index, {
        get: function () {
          return getter(this, index);
        },
        set: function (value) {
          return setter(this, index, value);
        },
        enumerable: true
      });
    };
    if (FORCED) {
      TypedArray = wrapper(function (that, data, $offset, $length) {
        anInstance(that, TypedArray, NAME, '_d');
        var index = 0;
        var offset = 0;
        var buffer, byteLength, length, klass;
        if (!isObject(data)) {
          length = toIndex(data);
          byteLength = length * BYTES;
          buffer = new $ArrayBuffer(byteLength);
        } else if (data instanceof $ArrayBuffer || (klass = classof(data)) == ARRAY_BUFFER || klass == SHARED_BUFFER) {
          buffer = data;
          offset = toOffset($offset, BYTES);
          var $len = data.byteLength;
          if ($length === undefined) {
            if ($len % BYTES) throw RangeError(WRONG_LENGTH);
            byteLength = $len - offset;
            if (byteLength < 0) throw RangeError(WRONG_LENGTH);
          } else {
            byteLength = toLength($length) * BYTES;
            if (byteLength + offset > $len) throw RangeError(WRONG_LENGTH);
          }
          length = byteLength / BYTES;
        } else if (TYPED_ARRAY in data) {
          return fromList(TypedArray, data);
        } else {
          return $from.call(TypedArray, data);
        }
        hide(that, '_d', {
          b: buffer,
          o: offset,
          l: byteLength,
          e: length,
          v: new $DataView(buffer)
        });
        while (index < length) addElement(that, index++);
      });
      TypedArrayPrototype = TypedArray[PROTOTYPE] = create($TypedArrayPrototype$);
      hide(TypedArrayPrototype, 'constructor', TypedArray);
    } else if (!fails(function () {
      TypedArray(1);
    }) || !fails(function () {
      new TypedArray(-1); // eslint-disable-line no-new
    }) || !$iterDetect(function (iter) {
      new TypedArray(); // eslint-disable-line no-new
      new TypedArray(null); // eslint-disable-line no-new
      new TypedArray(1.5); // eslint-disable-line no-new
      new TypedArray(iter); // eslint-disable-line no-new
    }, true)) {
      TypedArray = wrapper(function (that, data, $offset, $length) {
        anInstance(that, TypedArray, NAME);
        var klass;
        // `ws` module bug, temporarily remove validation length for Uint8Array
        // https://github.com/websockets/ws/pull/645
        if (!isObject(data)) return new Base(toIndex(data));
        if (data instanceof $ArrayBuffer || (klass = classof(data)) == ARRAY_BUFFER || klass == SHARED_BUFFER) {
          return $length !== undefined
            ? new Base(data, toOffset($offset, BYTES), $length)
            : $offset !== undefined
              ? new Base(data, toOffset($offset, BYTES))
              : new Base(data);
        }
        if (TYPED_ARRAY in data) return fromList(TypedArray, data);
        return $from.call(TypedArray, data);
      });
      arrayForEach(TAC !== Function.prototype ? gOPN(Base).concat(gOPN(TAC)) : gOPN(Base), function (key) {
        if (!(key in TypedArray)) hide(TypedArray, key, Base[key]);
      });
      TypedArray[PROTOTYPE] = TypedArrayPrototype;
      if (!LIBRARY) TypedArrayPrototype.constructor = TypedArray;
    }
    var $nativeIterator = TypedArrayPrototype[ITERATOR];
    var CORRECT_ITER_NAME = !!$nativeIterator
      && ($nativeIterator.name == 'values' || $nativeIterator.name == undefined);
    var $iterator = $iterators.values;
    hide(TypedArray, TYPED_CONSTRUCTOR, true);
    hide(TypedArrayPrototype, TYPED_ARRAY, NAME);
    hide(TypedArrayPrototype, VIEW, true);
    hide(TypedArrayPrototype, DEF_CONSTRUCTOR, TypedArray);

    if (CLAMPED ? new TypedArray(1)[TAG] != NAME : !(TAG in TypedArrayPrototype)) {
      dP(TypedArrayPrototype, TAG, {
        get: function () { return NAME; }
      });
    }

    O[NAME] = TypedArray;

    $export($export.G + $export.W + $export.F * (TypedArray != Base), O);

    $export($export.S, NAME, {
      BYTES_PER_ELEMENT: BYTES
    });

    $export($export.S + $export.F * fails(function () { Base.of.call(TypedArray, 1); }), NAME, {
      from: $from,
      of: $of
    });

    if (!(BYTES_PER_ELEMENT in TypedArrayPrototype)) hide(TypedArrayPrototype, BYTES_PER_ELEMENT, BYTES);

    $export($export.P, NAME, proto);

    setSpecies(NAME);

    $export($export.P + $export.F * FORCED_SET, NAME, { set: $set });

    $export($export.P + $export.F * !CORRECT_ITER_NAME, NAME, $iterators);

    if (!LIBRARY && TypedArrayPrototype.toString != arrayToString) TypedArrayPrototype.toString = arrayToString;

    $export($export.P + $export.F * fails(function () {
      new TypedArray(1).slice();
    }), NAME, { slice: $slice });

    $export($export.P + $export.F * (fails(function () {
      return [1, 2].toLocaleString() != new TypedArray([1, 2]).toLocaleString();
    }) || !fails(function () {
      TypedArrayPrototype.toLocaleString.call([1, 2]);
    })), NAME, { toLocaleString: $toLocaleString });

    Iterators[NAME] = CORRECT_ITER_NAME ? $nativeIterator : $iterator;
    if (!LIBRARY && !CORRECT_ITER_NAME) hide(TypedArrayPrototype, ITERATOR, $iterator);
  };
} else module.exports = function () { /* empty */ };

},{"./_descriptors":"node_modules/core-js/modules/_descriptors.js","./_library":"node_modules/core-js/modules/_library.js","./_global":"node_modules/core-js/modules/_global.js","./_fails":"node_modules/core-js/modules/_fails.js","./_export":"node_modules/core-js/modules/_export.js","./_typed":"node_modules/core-js/modules/_typed.js","./_typed-buffer":"node_modules/core-js/modules/_typed-buffer.js","./_ctx":"node_modules/core-js/modules/_ctx.js","./_an-instance":"node_modules/core-js/modules/_an-instance.js","./_property-desc":"node_modules/core-js/modules/_property-desc.js","./_hide":"node_modules/core-js/modules/_hide.js","./_redefine-all":"node_modules/core-js/modules/_redefine-all.js","./_to-integer":"node_modules/core-js/modules/_to-integer.js","./_to-length":"node_modules/core-js/modules/_to-length.js","./_to-index":"node_modules/core-js/modules/_to-index.js","./_to-absolute-index":"node_modules/core-js/modules/_to-absolute-index.js","./_to-primitive":"node_modules/core-js/modules/_to-primitive.js","./_has":"node_modules/core-js/modules/_has.js","./_classof":"node_modules/core-js/modules/_classof.js","./_is-object":"node_modules/core-js/modules/_is-object.js","./_to-object":"node_modules/core-js/modules/_to-object.js","./_is-array-iter":"node_modules/core-js/modules/_is-array-iter.js","./_object-create":"node_modules/core-js/modules/_object-create.js","./_object-gpo":"node_modules/core-js/modules/_object-gpo.js","./_object-gopn":"node_modules/core-js/modules/_object-gopn.js","./core.get-iterator-method":"node_modules/core-js/modules/core.get-iterator-method.js","./_uid":"node_modules/core-js/modules/_uid.js","./_wks":"node_modules/core-js/modules/_wks.js","./_array-methods":"node_modules/core-js/modules/_array-methods.js","./_array-includes":"node_modules/core-js/modules/_array-includes.js","./_species-constructor":"node_modules/core-js/modules/_species-constructor.js","./es6.array.iterator":"node_modules/core-js/modules/es6.array.iterator.js","./_iterators":"node_modules/core-js/modules/_iterators.js","./_iter-detect":"node_modules/core-js/modules/_iter-detect.js","./_set-species":"node_modules/core-js/modules/_set-species.js","./_array-fill":"node_modules/core-js/modules/_array-fill.js","./_array-copy-within":"node_modules/core-js/modules/_array-copy-within.js","./_object-dp":"node_modules/core-js/modules/_object-dp.js","./_object-gopd":"node_modules/core-js/modules/_object-gopd.js"}],"node_modules/core-js/modules/es6.typed.int8-array.js":[function(require,module,exports) {
require('./_typed-array')('Int8', 1, function (init) {
  return function Int8Array(data, byteOffset, length) {
    return init(this, data, byteOffset, length);
  };
});

},{"./_typed-array":"node_modules/core-js/modules/_typed-array.js"}],"node_modules/core-js/modules/es6.typed.uint8-array.js":[function(require,module,exports) {
require('./_typed-array')('Uint8', 1, function (init) {
  return function Uint8Array(data, byteOffset, length) {
    return init(this, data, byteOffset, length);
  };
});

},{"./_typed-array":"node_modules/core-js/modules/_typed-array.js"}],"node_modules/core-js/modules/es6.typed.uint8-clamped-array.js":[function(require,module,exports) {
require('./_typed-array')('Uint8', 1, function (init) {
  return function Uint8ClampedArray(data, byteOffset, length) {
    return init(this, data, byteOffset, length);
  };
}, true);

},{"./_typed-array":"node_modules/core-js/modules/_typed-array.js"}],"node_modules/core-js/modules/es6.typed.int16-array.js":[function(require,module,exports) {
require('./_typed-array')('Int16', 2, function (init) {
  return function Int16Array(data, byteOffset, length) {
    return init(this, data, byteOffset, length);
  };
});

},{"./_typed-array":"node_modules/core-js/modules/_typed-array.js"}],"node_modules/core-js/modules/es6.typed.uint16-array.js":[function(require,module,exports) {
require('./_typed-array')('Uint16', 2, function (init) {
  return function Uint16Array(data, byteOffset, length) {
    return init(this, data, byteOffset, length);
  };
});

},{"./_typed-array":"node_modules/core-js/modules/_typed-array.js"}],"node_modules/core-js/modules/es6.typed.int32-array.js":[function(require,module,exports) {
require('./_typed-array')('Int32', 4, function (init) {
  return function Int32Array(data, byteOffset, length) {
    return init(this, data, byteOffset, length);
  };
});

},{"./_typed-array":"node_modules/core-js/modules/_typed-array.js"}],"node_modules/core-js/modules/es6.typed.uint32-array.js":[function(require,module,exports) {
require('./_typed-array')('Uint32', 4, function (init) {
  return function Uint32Array(data, byteOffset, length) {
    return init(this, data, byteOffset, length);
  };
});

},{"./_typed-array":"node_modules/core-js/modules/_typed-array.js"}],"node_modules/core-js/modules/es6.typed.float32-array.js":[function(require,module,exports) {
require('./_typed-array')('Float32', 4, function (init) {
  return function Float32Array(data, byteOffset, length) {
    return init(this, data, byteOffset, length);
  };
});

},{"./_typed-array":"node_modules/core-js/modules/_typed-array.js"}],"node_modules/core-js/modules/es6.typed.float64-array.js":[function(require,module,exports) {
require('./_typed-array')('Float64', 8, function (init) {
  return function Float64Array(data, byteOffset, length) {
    return init(this, data, byteOffset, length);
  };
});

},{"./_typed-array":"node_modules/core-js/modules/_typed-array.js"}],"node_modules/core-js/modules/es6.reflect.apply.js":[function(require,module,exports) {
// 26.1.1 Reflect.apply(target, thisArgument, argumentsList)
var $export = require('./_export');
var aFunction = require('./_a-function');
var anObject = require('./_an-object');
var rApply = (require('./_global').Reflect || {}).apply;
var fApply = Function.apply;
// MS Edge argumentsList argument is optional
$export($export.S + $export.F * !require('./_fails')(function () {
  rApply(function () { /* empty */ });
}), 'Reflect', {
  apply: function apply(target, thisArgument, argumentsList) {
    var T = aFunction(target);
    var L = anObject(argumentsList);
    return rApply ? rApply(T, thisArgument, L) : fApply.call(T, thisArgument, L);
  }
});

},{"./_export":"node_modules/core-js/modules/_export.js","./_a-function":"node_modules/core-js/modules/_a-function.js","./_an-object":"node_modules/core-js/modules/_an-object.js","./_global":"node_modules/core-js/modules/_global.js","./_fails":"node_modules/core-js/modules/_fails.js"}],"node_modules/core-js/modules/es6.reflect.construct.js":[function(require,module,exports) {
// 26.1.2 Reflect.construct(target, argumentsList [, newTarget])
var $export = require('./_export');
var create = require('./_object-create');
var aFunction = require('./_a-function');
var anObject = require('./_an-object');
var isObject = require('./_is-object');
var fails = require('./_fails');
var bind = require('./_bind');
var rConstruct = (require('./_global').Reflect || {}).construct;

// MS Edge supports only 2 arguments and argumentsList argument is optional
// FF Nightly sets third argument as `new.target`, but does not create `this` from it
var NEW_TARGET_BUG = fails(function () {
  function F() { /* empty */ }
  return !(rConstruct(function () { /* empty */ }, [], F) instanceof F);
});
var ARGS_BUG = !fails(function () {
  rConstruct(function () { /* empty */ });
});

$export($export.S + $export.F * (NEW_TARGET_BUG || ARGS_BUG), 'Reflect', {
  construct: function construct(Target, args /* , newTarget */) {
    aFunction(Target);
    anObject(args);
    var newTarget = arguments.length < 3 ? Target : aFunction(arguments[2]);
    if (ARGS_BUG && !NEW_TARGET_BUG) return rConstruct(Target, args, newTarget);
    if (Target == newTarget) {
      // w/o altered newTarget, optimization for 0-4 arguments
      switch (args.length) {
        case 0: return new Target();
        case 1: return new Target(args[0]);
        case 2: return new Target(args[0], args[1]);
        case 3: return new Target(args[0], args[1], args[2]);
        case 4: return new Target(args[0], args[1], args[2], args[3]);
      }
      // w/o altered newTarget, lot of arguments case
      var $args = [null];
      $args.push.apply($args, args);
      return new (bind.apply(Target, $args))();
    }
    // with altered newTarget, not support built-in constructors
    var proto = newTarget.prototype;
    var instance = create(isObject(proto) ? proto : Object.prototype);
    var result = Function.apply.call(Target, instance, args);
    return isObject(result) ? result : instance;
  }
});

},{"./_export":"node_modules/core-js/modules/_export.js","./_object-create":"node_modules/core-js/modules/_object-create.js","./_a-function":"node_modules/core-js/modules/_a-function.js","./_an-object":"node_modules/core-js/modules/_an-object.js","./_is-object":"node_modules/core-js/modules/_is-object.js","./_fails":"node_modules/core-js/modules/_fails.js","./_bind":"node_modules/core-js/modules/_bind.js","./_global":"node_modules/core-js/modules/_global.js"}],"node_modules/core-js/modules/es6.reflect.define-property.js":[function(require,module,exports) {
// 26.1.3 Reflect.defineProperty(target, propertyKey, attributes)
var dP = require('./_object-dp');
var $export = require('./_export');
var anObject = require('./_an-object');
var toPrimitive = require('./_to-primitive');

// MS Edge has broken Reflect.defineProperty - throwing instead of returning false
$export($export.S + $export.F * require('./_fails')(function () {
  // eslint-disable-next-line no-undef
  Reflect.defineProperty(dP.f({}, 1, { value: 1 }), 1, { value: 2 });
}), 'Reflect', {
  defineProperty: function defineProperty(target, propertyKey, attributes) {
    anObject(target);
    propertyKey = toPrimitive(propertyKey, true);
    anObject(attributes);
    try {
      dP.f(target, propertyKey, attributes);
      return true;
    } catch (e) {
      return false;
    }
  }
});

},{"./_object-dp":"node_modules/core-js/modules/_object-dp.js","./_export":"node_modules/core-js/modules/_export.js","./_an-object":"node_modules/core-js/modules/_an-object.js","./_to-primitive":"node_modules/core-js/modules/_to-primitive.js","./_fails":"node_modules/core-js/modules/_fails.js"}],"node_modules/core-js/modules/es6.reflect.delete-property.js":[function(require,module,exports) {
// 26.1.4 Reflect.deleteProperty(target, propertyKey)
var $export = require('./_export');
var gOPD = require('./_object-gopd').f;
var anObject = require('./_an-object');

$export($export.S, 'Reflect', {
  deleteProperty: function deleteProperty(target, propertyKey) {
    var desc = gOPD(anObject(target), propertyKey);
    return desc && !desc.configurable ? false : delete target[propertyKey];
  }
});

},{"./_export":"node_modules/core-js/modules/_export.js","./_object-gopd":"node_modules/core-js/modules/_object-gopd.js","./_an-object":"node_modules/core-js/modules/_an-object.js"}],"node_modules/core-js/modules/es6.reflect.enumerate.js":[function(require,module,exports) {
'use strict';
// 26.1.5 Reflect.enumerate(target)
var $export = require('./_export');
var anObject = require('./_an-object');
var Enumerate = function (iterated) {
  this._t = anObject(iterated); // target
  this._i = 0;                  // next index
  var keys = this._k = [];      // keys
  var key;
  for (key in iterated) keys.push(key);
};
require('./_iter-create')(Enumerate, 'Object', function () {
  var that = this;
  var keys = that._k;
  var key;
  do {
    if (that._i >= keys.length) return { value: undefined, done: true };
  } while (!((key = keys[that._i++]) in that._t));
  return { value: key, done: false };
});

$export($export.S, 'Reflect', {
  enumerate: function enumerate(target) {
    return new Enumerate(target);
  }
});

},{"./_export":"node_modules/core-js/modules/_export.js","./_an-object":"node_modules/core-js/modules/_an-object.js","./_iter-create":"node_modules/core-js/modules/_iter-create.js"}],"node_modules/core-js/modules/es6.reflect.get.js":[function(require,module,exports) {
// 26.1.6 Reflect.get(target, propertyKey [, receiver])
var gOPD = require('./_object-gopd');
var getPrototypeOf = require('./_object-gpo');
var has = require('./_has');
var $export = require('./_export');
var isObject = require('./_is-object');
var anObject = require('./_an-object');

function get(target, propertyKey /* , receiver */) {
  var receiver = arguments.length < 3 ? target : arguments[2];
  var desc, proto;
  if (anObject(target) === receiver) return target[propertyKey];
  if (desc = gOPD.f(target, propertyKey)) return has(desc, 'value')
    ? desc.value
    : desc.get !== undefined
      ? desc.get.call(receiver)
      : undefined;
  if (isObject(proto = getPrototypeOf(target))) return get(proto, propertyKey, receiver);
}

$export($export.S, 'Reflect', { get: get });

},{"./_object-gopd":"node_modules/core-js/modules/_object-gopd.js","./_object-gpo":"node_modules/core-js/modules/_object-gpo.js","./_has":"node_modules/core-js/modules/_has.js","./_export":"node_modules/core-js/modules/_export.js","./_is-object":"node_modules/core-js/modules/_is-object.js","./_an-object":"node_modules/core-js/modules/_an-object.js"}],"node_modules/core-js/modules/es6.reflect.get-own-property-descriptor.js":[function(require,module,exports) {
// 26.1.7 Reflect.getOwnPropertyDescriptor(target, propertyKey)
var gOPD = require('./_object-gopd');
var $export = require('./_export');
var anObject = require('./_an-object');

$export($export.S, 'Reflect', {
  getOwnPropertyDescriptor: function getOwnPropertyDescriptor(target, propertyKey) {
    return gOPD.f(anObject(target), propertyKey);
  }
});

},{"./_object-gopd":"node_modules/core-js/modules/_object-gopd.js","./_export":"node_modules/core-js/modules/_export.js","./_an-object":"node_modules/core-js/modules/_an-object.js"}],"node_modules/core-js/modules/es6.reflect.get-prototype-of.js":[function(require,module,exports) {
// 26.1.8 Reflect.getPrototypeOf(target)
var $export = require('./_export');
var getProto = require('./_object-gpo');
var anObject = require('./_an-object');

$export($export.S, 'Reflect', {
  getPrototypeOf: function getPrototypeOf(target) {
    return getProto(anObject(target));
  }
});

},{"./_export":"node_modules/core-js/modules/_export.js","./_object-gpo":"node_modules/core-js/modules/_object-gpo.js","./_an-object":"node_modules/core-js/modules/_an-object.js"}],"node_modules/core-js/modules/es6.reflect.has.js":[function(require,module,exports) {
// 26.1.9 Reflect.has(target, propertyKey)
var $export = require('./_export');

$export($export.S, 'Reflect', {
  has: function has(target, propertyKey) {
    return propertyKey in target;
  }
});

},{"./_export":"node_modules/core-js/modules/_export.js"}],"node_modules/core-js/modules/es6.reflect.is-extensible.js":[function(require,module,exports) {
// 26.1.10 Reflect.isExtensible(target)
var $export = require('./_export');
var anObject = require('./_an-object');
var $isExtensible = Object.isExtensible;

$export($export.S, 'Reflect', {
  isExtensible: function isExtensible(target) {
    anObject(target);
    return $isExtensible ? $isExtensible(target) : true;
  }
});

},{"./_export":"node_modules/core-js/modules/_export.js","./_an-object":"node_modules/core-js/modules/_an-object.js"}],"node_modules/core-js/modules/_own-keys.js":[function(require,module,exports) {
// all object keys, includes non-enumerable and symbols
var gOPN = require('./_object-gopn');
var gOPS = require('./_object-gops');
var anObject = require('./_an-object');
var Reflect = require('./_global').Reflect;
module.exports = Reflect && Reflect.ownKeys || function ownKeys(it) {
  var keys = gOPN.f(anObject(it));
  var getSymbols = gOPS.f;
  return getSymbols ? keys.concat(getSymbols(it)) : keys;
};

},{"./_object-gopn":"node_modules/core-js/modules/_object-gopn.js","./_object-gops":"node_modules/core-js/modules/_object-gops.js","./_an-object":"node_modules/core-js/modules/_an-object.js","./_global":"node_modules/core-js/modules/_global.js"}],"node_modules/core-js/modules/es6.reflect.own-keys.js":[function(require,module,exports) {
// 26.1.11 Reflect.ownKeys(target)
var $export = require('./_export');

$export($export.S, 'Reflect', { ownKeys: require('./_own-keys') });

},{"./_export":"node_modules/core-js/modules/_export.js","./_own-keys":"node_modules/core-js/modules/_own-keys.js"}],"node_modules/core-js/modules/es6.reflect.prevent-extensions.js":[function(require,module,exports) {
// 26.1.12 Reflect.preventExtensions(target)
var $export = require('./_export');
var anObject = require('./_an-object');
var $preventExtensions = Object.preventExtensions;

$export($export.S, 'Reflect', {
  preventExtensions: function preventExtensions(target) {
    anObject(target);
    try {
      if ($preventExtensions) $preventExtensions(target);
      return true;
    } catch (e) {
      return false;
    }
  }
});

},{"./_export":"node_modules/core-js/modules/_export.js","./_an-object":"node_modules/core-js/modules/_an-object.js"}],"node_modules/core-js/modules/es6.reflect.set.js":[function(require,module,exports) {
// 26.1.13 Reflect.set(target, propertyKey, V [, receiver])
var dP = require('./_object-dp');
var gOPD = require('./_object-gopd');
var getPrototypeOf = require('./_object-gpo');
var has = require('./_has');
var $export = require('./_export');
var createDesc = require('./_property-desc');
var anObject = require('./_an-object');
var isObject = require('./_is-object');

function set(target, propertyKey, V /* , receiver */) {
  var receiver = arguments.length < 4 ? target : arguments[3];
  var ownDesc = gOPD.f(anObject(target), propertyKey);
  var existingDescriptor, proto;
  if (!ownDesc) {
    if (isObject(proto = getPrototypeOf(target))) {
      return set(proto, propertyKey, V, receiver);
    }
    ownDesc = createDesc(0);
  }
  if (has(ownDesc, 'value')) {
    if (ownDesc.writable === false || !isObject(receiver)) return false;
    if (existingDescriptor = gOPD.f(receiver, propertyKey)) {
      if (existingDescriptor.get || existingDescriptor.set || existingDescriptor.writable === false) return false;
      existingDescriptor.value = V;
      dP.f(receiver, propertyKey, existingDescriptor);
    } else dP.f(receiver, propertyKey, createDesc(0, V));
    return true;
  }
  return ownDesc.set === undefined ? false : (ownDesc.set.call(receiver, V), true);
}

$export($export.S, 'Reflect', { set: set });

},{"./_object-dp":"node_modules/core-js/modules/_object-dp.js","./_object-gopd":"node_modules/core-js/modules/_object-gopd.js","./_object-gpo":"node_modules/core-js/modules/_object-gpo.js","./_has":"node_modules/core-js/modules/_has.js","./_export":"node_modules/core-js/modules/_export.js","./_property-desc":"node_modules/core-js/modules/_property-desc.js","./_an-object":"node_modules/core-js/modules/_an-object.js","./_is-object":"node_modules/core-js/modules/_is-object.js"}],"node_modules/core-js/modules/es6.reflect.set-prototype-of.js":[function(require,module,exports) {
// 26.1.14 Reflect.setPrototypeOf(target, proto)
var $export = require('./_export');
var setProto = require('./_set-proto');

if (setProto) $export($export.S, 'Reflect', {
  setPrototypeOf: function setPrototypeOf(target, proto) {
    setProto.check(target, proto);
    try {
      setProto.set(target, proto);
      return true;
    } catch (e) {
      return false;
    }
  }
});

},{"./_export":"node_modules/core-js/modules/_export.js","./_set-proto":"node_modules/core-js/modules/_set-proto.js"}],"node_modules/core-js/modules/es7.array.includes.js":[function(require,module,exports) {
'use strict';
// https://github.com/tc39/Array.prototype.includes
var $export = require('./_export');
var $includes = require('./_array-includes')(true);

$export($export.P, 'Array', {
  includes: function includes(el /* , fromIndex = 0 */) {
    return $includes(this, el, arguments.length > 1 ? arguments[1] : undefined);
  }
});

require('./_add-to-unscopables')('includes');

},{"./_export":"node_modules/core-js/modules/_export.js","./_array-includes":"node_modules/core-js/modules/_array-includes.js","./_add-to-unscopables":"node_modules/core-js/modules/_add-to-unscopables.js"}],"node_modules/core-js/modules/_flatten-into-array.js":[function(require,module,exports) {
'use strict';
// https://tc39.github.io/proposal-flatMap/#sec-FlattenIntoArray
var isArray = require('./_is-array');
var isObject = require('./_is-object');
var toLength = require('./_to-length');
var ctx = require('./_ctx');
var IS_CONCAT_SPREADABLE = require('./_wks')('isConcatSpreadable');

function flattenIntoArray(target, original, source, sourceLen, start, depth, mapper, thisArg) {
  var targetIndex = start;
  var sourceIndex = 0;
  var mapFn = mapper ? ctx(mapper, thisArg, 3) : false;
  var element, spreadable;

  while (sourceIndex < sourceLen) {
    if (sourceIndex in source) {
      element = mapFn ? mapFn(source[sourceIndex], sourceIndex, original) : source[sourceIndex];

      spreadable = false;
      if (isObject(element)) {
        spreadable = element[IS_CONCAT_SPREADABLE];
        spreadable = spreadable !== undefined ? !!spreadable : isArray(element);
      }

      if (spreadable && depth > 0) {
        targetIndex = flattenIntoArray(target, original, element, toLength(element.length), targetIndex, depth - 1) - 1;
      } else {
        if (targetIndex >= 0x1fffffffffffff) throw TypeError();
        target[targetIndex] = element;
      }

      targetIndex++;
    }
    sourceIndex++;
  }
  return targetIndex;
}

module.exports = flattenIntoArray;

},{"./_is-array":"node_modules/core-js/modules/_is-array.js","./_is-object":"node_modules/core-js/modules/_is-object.js","./_to-length":"node_modules/core-js/modules/_to-length.js","./_ctx":"node_modules/core-js/modules/_ctx.js","./_wks":"node_modules/core-js/modules/_wks.js"}],"node_modules/core-js/modules/es7.array.flat-map.js":[function(require,module,exports) {
'use strict';
// https://tc39.github.io/proposal-flatMap/#sec-Array.prototype.flatMap
var $export = require('./_export');
var flattenIntoArray = require('./_flatten-into-array');
var toObject = require('./_to-object');
var toLength = require('./_to-length');
var aFunction = require('./_a-function');
var arraySpeciesCreate = require('./_array-species-create');

$export($export.P, 'Array', {
  flatMap: function flatMap(callbackfn /* , thisArg */) {
    var O = toObject(this);
    var sourceLen, A;
    aFunction(callbackfn);
    sourceLen = toLength(O.length);
    A = arraySpeciesCreate(O, 0);
    flattenIntoArray(A, O, O, sourceLen, 0, 1, callbackfn, arguments[1]);
    return A;
  }
});

require('./_add-to-unscopables')('flatMap');

},{"./_export":"node_modules/core-js/modules/_export.js","./_flatten-into-array":"node_modules/core-js/modules/_flatten-into-array.js","./_to-object":"node_modules/core-js/modules/_to-object.js","./_to-length":"node_modules/core-js/modules/_to-length.js","./_a-function":"node_modules/core-js/modules/_a-function.js","./_array-species-create":"node_modules/core-js/modules/_array-species-create.js","./_add-to-unscopables":"node_modules/core-js/modules/_add-to-unscopables.js"}],"node_modules/core-js/modules/es7.array.flatten.js":[function(require,module,exports) {
'use strict';
// https://tc39.github.io/proposal-flatMap/#sec-Array.prototype.flatten
var $export = require('./_export');
var flattenIntoArray = require('./_flatten-into-array');
var toObject = require('./_to-object');
var toLength = require('./_to-length');
var toInteger = require('./_to-integer');
var arraySpeciesCreate = require('./_array-species-create');

$export($export.P, 'Array', {
  flatten: function flatten(/* depthArg = 1 */) {
    var depthArg = arguments[0];
    var O = toObject(this);
    var sourceLen = toLength(O.length);
    var A = arraySpeciesCreate(O, 0);
    flattenIntoArray(A, O, O, sourceLen, 0, depthArg === undefined ? 1 : toInteger(depthArg));
    return A;
  }
});

require('./_add-to-unscopables')('flatten');

},{"./_export":"node_modules/core-js/modules/_export.js","./_flatten-into-array":"node_modules/core-js/modules/_flatten-into-array.js","./_to-object":"node_modules/core-js/modules/_to-object.js","./_to-length":"node_modules/core-js/modules/_to-length.js","./_to-integer":"node_modules/core-js/modules/_to-integer.js","./_array-species-create":"node_modules/core-js/modules/_array-species-create.js","./_add-to-unscopables":"node_modules/core-js/modules/_add-to-unscopables.js"}],"node_modules/core-js/modules/es7.string.at.js":[function(require,module,exports) {
'use strict';
// https://github.com/mathiasbynens/String.prototype.at
var $export = require('./_export');
var $at = require('./_string-at')(true);

$export($export.P, 'String', {
  at: function at(pos) {
    return $at(this, pos);
  }
});

},{"./_export":"node_modules/core-js/modules/_export.js","./_string-at":"node_modules/core-js/modules/_string-at.js"}],"node_modules/core-js/modules/_string-pad.js":[function(require,module,exports) {
// https://github.com/tc39/proposal-string-pad-start-end
var toLength = require('./_to-length');
var repeat = require('./_string-repeat');
var defined = require('./_defined');

module.exports = function (that, maxLength, fillString, left) {
  var S = String(defined(that));
  var stringLength = S.length;
  var fillStr = fillString === undefined ? ' ' : String(fillString);
  var intMaxLength = toLength(maxLength);
  if (intMaxLength <= stringLength || fillStr == '') return S;
  var fillLen = intMaxLength - stringLength;
  var stringFiller = repeat.call(fillStr, Math.ceil(fillLen / fillStr.length));
  if (stringFiller.length > fillLen) stringFiller = stringFiller.slice(0, fillLen);
  return left ? stringFiller + S : S + stringFiller;
};

},{"./_to-length":"node_modules/core-js/modules/_to-length.js","./_string-repeat":"node_modules/core-js/modules/_string-repeat.js","./_defined":"node_modules/core-js/modules/_defined.js"}],"node_modules/core-js/modules/es7.string.pad-start.js":[function(require,module,exports) {
'use strict';
// https://github.com/tc39/proposal-string-pad-start-end
var $export = require('./_export');
var $pad = require('./_string-pad');
var userAgent = require('./_user-agent');

// https://github.com/zloirock/core-js/issues/280
$export($export.P + $export.F * /Version\/10\.\d+(\.\d+)? Safari\//.test(userAgent), 'String', {
  padStart: function padStart(maxLength /* , fillString = ' ' */) {
    return $pad(this, maxLength, arguments.length > 1 ? arguments[1] : undefined, true);
  }
});

},{"./_export":"node_modules/core-js/modules/_export.js","./_string-pad":"node_modules/core-js/modules/_string-pad.js","./_user-agent":"node_modules/core-js/modules/_user-agent.js"}],"node_modules/core-js/modules/es7.string.pad-end.js":[function(require,module,exports) {
'use strict';
// https://github.com/tc39/proposal-string-pad-start-end
var $export = require('./_export');
var $pad = require('./_string-pad');
var userAgent = require('./_user-agent');

// https://github.com/zloirock/core-js/issues/280
$export($export.P + $export.F * /Version\/10\.\d+(\.\d+)? Safari\//.test(userAgent), 'String', {
  padEnd: function padEnd(maxLength /* , fillString = ' ' */) {
    return $pad(this, maxLength, arguments.length > 1 ? arguments[1] : undefined, false);
  }
});

},{"./_export":"node_modules/core-js/modules/_export.js","./_string-pad":"node_modules/core-js/modules/_string-pad.js","./_user-agent":"node_modules/core-js/modules/_user-agent.js"}],"node_modules/core-js/modules/es7.string.trim-left.js":[function(require,module,exports) {
'use strict';
// https://github.com/sebmarkbage/ecmascript-string-left-right-trim
require('./_string-trim')('trimLeft', function ($trim) {
  return function trimLeft() {
    return $trim(this, 1);
  };
}, 'trimStart');

},{"./_string-trim":"node_modules/core-js/modules/_string-trim.js"}],"node_modules/core-js/modules/es7.string.trim-right.js":[function(require,module,exports) {
'use strict';
// https://github.com/sebmarkbage/ecmascript-string-left-right-trim
require('./_string-trim')('trimRight', function ($trim) {
  return function trimRight() {
    return $trim(this, 2);
  };
}, 'trimEnd');

},{"./_string-trim":"node_modules/core-js/modules/_string-trim.js"}],"node_modules/core-js/modules/es7.string.match-all.js":[function(require,module,exports) {
'use strict';
// https://tc39.github.io/String.prototype.matchAll/
var $export = require('./_export');
var defined = require('./_defined');
var toLength = require('./_to-length');
var isRegExp = require('./_is-regexp');
var getFlags = require('./_flags');
var RegExpProto = RegExp.prototype;

var $RegExpStringIterator = function (regexp, string) {
  this._r = regexp;
  this._s = string;
};

require('./_iter-create')($RegExpStringIterator, 'RegExp String', function next() {
  var match = this._r.exec(this._s);
  return { value: match, done: match === null };
});

$export($export.P, 'String', {
  matchAll: function matchAll(regexp) {
    defined(this);
    if (!isRegExp(regexp)) throw TypeError(regexp + ' is not a regexp!');
    var S = String(this);
    var flags = 'flags' in RegExpProto ? String(regexp.flags) : getFlags.call(regexp);
    var rx = new RegExp(regexp.source, ~flags.indexOf('g') ? flags : 'g' + flags);
    rx.lastIndex = toLength(regexp.lastIndex);
    return new $RegExpStringIterator(rx, S);
  }
});

},{"./_export":"node_modules/core-js/modules/_export.js","./_defined":"node_modules/core-js/modules/_defined.js","./_to-length":"node_modules/core-js/modules/_to-length.js","./_is-regexp":"node_modules/core-js/modules/_is-regexp.js","./_flags":"node_modules/core-js/modules/_flags.js","./_iter-create":"node_modules/core-js/modules/_iter-create.js"}],"node_modules/core-js/modules/es7.symbol.async-iterator.js":[function(require,module,exports) {
require('./_wks-define')('asyncIterator');

},{"./_wks-define":"node_modules/core-js/modules/_wks-define.js"}],"node_modules/core-js/modules/es7.symbol.observable.js":[function(require,module,exports) {
require('./_wks-define')('observable');

},{"./_wks-define":"node_modules/core-js/modules/_wks-define.js"}],"node_modules/core-js/modules/es7.object.get-own-property-descriptors.js":[function(require,module,exports) {
// https://github.com/tc39/proposal-object-getownpropertydescriptors
var $export = require('./_export');
var ownKeys = require('./_own-keys');
var toIObject = require('./_to-iobject');
var gOPD = require('./_object-gopd');
var createProperty = require('./_create-property');

$export($export.S, 'Object', {
  getOwnPropertyDescriptors: function getOwnPropertyDescriptors(object) {
    var O = toIObject(object);
    var getDesc = gOPD.f;
    var keys = ownKeys(O);
    var result = {};
    var i = 0;
    var key, desc;
    while (keys.length > i) {
      desc = getDesc(O, key = keys[i++]);
      if (desc !== undefined) createProperty(result, key, desc);
    }
    return result;
  }
});

},{"./_export":"node_modules/core-js/modules/_export.js","./_own-keys":"node_modules/core-js/modules/_own-keys.js","./_to-iobject":"node_modules/core-js/modules/_to-iobject.js","./_object-gopd":"node_modules/core-js/modules/_object-gopd.js","./_create-property":"node_modules/core-js/modules/_create-property.js"}],"node_modules/core-js/modules/_object-to-array.js":[function(require,module,exports) {
var getKeys = require('./_object-keys');
var toIObject = require('./_to-iobject');
var isEnum = require('./_object-pie').f;
module.exports = function (isEntries) {
  return function (it) {
    var O = toIObject(it);
    var keys = getKeys(O);
    var length = keys.length;
    var i = 0;
    var result = [];
    var key;
    while (length > i) if (isEnum.call(O, key = keys[i++])) {
      result.push(isEntries ? [key, O[key]] : O[key]);
    } return result;
  };
};

},{"./_object-keys":"node_modules/core-js/modules/_object-keys.js","./_to-iobject":"node_modules/core-js/modules/_to-iobject.js","./_object-pie":"node_modules/core-js/modules/_object-pie.js"}],"node_modules/core-js/modules/es7.object.values.js":[function(require,module,exports) {
// https://github.com/tc39/proposal-object-values-entries
var $export = require('./_export');
var $values = require('./_object-to-array')(false);

$export($export.S, 'Object', {
  values: function values(it) {
    return $values(it);
  }
});

},{"./_export":"node_modules/core-js/modules/_export.js","./_object-to-array":"node_modules/core-js/modules/_object-to-array.js"}],"node_modules/core-js/modules/es7.object.entries.js":[function(require,module,exports) {
// https://github.com/tc39/proposal-object-values-entries
var $export = require('./_export');
var $entries = require('./_object-to-array')(true);

$export($export.S, 'Object', {
  entries: function entries(it) {
    return $entries(it);
  }
});

},{"./_export":"node_modules/core-js/modules/_export.js","./_object-to-array":"node_modules/core-js/modules/_object-to-array.js"}],"node_modules/core-js/modules/_object-forced-pam.js":[function(require,module,exports) {
'use strict';
// Forced replacement prototype accessors methods
module.exports = require('./_library') || !require('./_fails')(function () {
  var K = Math.random();
  // In FF throws only define methods
  // eslint-disable-next-line no-undef, no-useless-call
  __defineSetter__.call(null, K, function () { /* empty */ });
  delete require('./_global')[K];
});

},{"./_library":"node_modules/core-js/modules/_library.js","./_fails":"node_modules/core-js/modules/_fails.js","./_global":"node_modules/core-js/modules/_global.js"}],"node_modules/core-js/modules/es7.object.define-getter.js":[function(require,module,exports) {
'use strict';
var $export = require('./_export');
var toObject = require('./_to-object');
var aFunction = require('./_a-function');
var $defineProperty = require('./_object-dp');

// B.2.2.2 Object.prototype.__defineGetter__(P, getter)
require('./_descriptors') && $export($export.P + require('./_object-forced-pam'), 'Object', {
  __defineGetter__: function __defineGetter__(P, getter) {
    $defineProperty.f(toObject(this), P, { get: aFunction(getter), enumerable: true, configurable: true });
  }
});

},{"./_export":"node_modules/core-js/modules/_export.js","./_to-object":"node_modules/core-js/modules/_to-object.js","./_a-function":"node_modules/core-js/modules/_a-function.js","./_object-dp":"node_modules/core-js/modules/_object-dp.js","./_descriptors":"node_modules/core-js/modules/_descriptors.js","./_object-forced-pam":"node_modules/core-js/modules/_object-forced-pam.js"}],"node_modules/core-js/modules/es7.object.define-setter.js":[function(require,module,exports) {
'use strict';
var $export = require('./_export');
var toObject = require('./_to-object');
var aFunction = require('./_a-function');
var $defineProperty = require('./_object-dp');

// B.2.2.3 Object.prototype.__defineSetter__(P, setter)
require('./_descriptors') && $export($export.P + require('./_object-forced-pam'), 'Object', {
  __defineSetter__: function __defineSetter__(P, setter) {
    $defineProperty.f(toObject(this), P, { set: aFunction(setter), enumerable: true, configurable: true });
  }
});

},{"./_export":"node_modules/core-js/modules/_export.js","./_to-object":"node_modules/core-js/modules/_to-object.js","./_a-function":"node_modules/core-js/modules/_a-function.js","./_object-dp":"node_modules/core-js/modules/_object-dp.js","./_descriptors":"node_modules/core-js/modules/_descriptors.js","./_object-forced-pam":"node_modules/core-js/modules/_object-forced-pam.js"}],"node_modules/core-js/modules/es7.object.lookup-getter.js":[function(require,module,exports) {
'use strict';
var $export = require('./_export');
var toObject = require('./_to-object');
var toPrimitive = require('./_to-primitive');
var getPrototypeOf = require('./_object-gpo');
var getOwnPropertyDescriptor = require('./_object-gopd').f;

// B.2.2.4 Object.prototype.__lookupGetter__(P)
require('./_descriptors') && $export($export.P + require('./_object-forced-pam'), 'Object', {
  __lookupGetter__: function __lookupGetter__(P) {
    var O = toObject(this);
    var K = toPrimitive(P, true);
    var D;
    do {
      if (D = getOwnPropertyDescriptor(O, K)) return D.get;
    } while (O = getPrototypeOf(O));
  }
});

},{"./_export":"node_modules/core-js/modules/_export.js","./_to-object":"node_modules/core-js/modules/_to-object.js","./_to-primitive":"node_modules/core-js/modules/_to-primitive.js","./_object-gpo":"node_modules/core-js/modules/_object-gpo.js","./_object-gopd":"node_modules/core-js/modules/_object-gopd.js","./_descriptors":"node_modules/core-js/modules/_descriptors.js","./_object-forced-pam":"node_modules/core-js/modules/_object-forced-pam.js"}],"node_modules/core-js/modules/es7.object.lookup-setter.js":[function(require,module,exports) {
'use strict';
var $export = require('./_export');
var toObject = require('./_to-object');
var toPrimitive = require('./_to-primitive');
var getPrototypeOf = require('./_object-gpo');
var getOwnPropertyDescriptor = require('./_object-gopd').f;

// B.2.2.5 Object.prototype.__lookupSetter__(P)
require('./_descriptors') && $export($export.P + require('./_object-forced-pam'), 'Object', {
  __lookupSetter__: function __lookupSetter__(P) {
    var O = toObject(this);
    var K = toPrimitive(P, true);
    var D;
    do {
      if (D = getOwnPropertyDescriptor(O, K)) return D.set;
    } while (O = getPrototypeOf(O));
  }
});

},{"./_export":"node_modules/core-js/modules/_export.js","./_to-object":"node_modules/core-js/modules/_to-object.js","./_to-primitive":"node_modules/core-js/modules/_to-primitive.js","./_object-gpo":"node_modules/core-js/modules/_object-gpo.js","./_object-gopd":"node_modules/core-js/modules/_object-gopd.js","./_descriptors":"node_modules/core-js/modules/_descriptors.js","./_object-forced-pam":"node_modules/core-js/modules/_object-forced-pam.js"}],"node_modules/core-js/modules/_array-from-iterable.js":[function(require,module,exports) {
var forOf = require('./_for-of');

module.exports = function (iter, ITERATOR) {
  var result = [];
  forOf(iter, false, result.push, result, ITERATOR);
  return result;
};

},{"./_for-of":"node_modules/core-js/modules/_for-of.js"}],"node_modules/core-js/modules/_collection-to-json.js":[function(require,module,exports) {
// https://github.com/DavidBruant/Map-Set.prototype.toJSON
var classof = require('./_classof');
var from = require('./_array-from-iterable');
module.exports = function (NAME) {
  return function toJSON() {
    if (classof(this) != NAME) throw TypeError(NAME + "#toJSON isn't generic");
    return from(this);
  };
};

},{"./_classof":"node_modules/core-js/modules/_classof.js","./_array-from-iterable":"node_modules/core-js/modules/_array-from-iterable.js"}],"node_modules/core-js/modules/es7.map.to-json.js":[function(require,module,exports) {
// https://github.com/DavidBruant/Map-Set.prototype.toJSON
var $export = require('./_export');

$export($export.P + $export.R, 'Map', { toJSON: require('./_collection-to-json')('Map') });

},{"./_export":"node_modules/core-js/modules/_export.js","./_collection-to-json":"node_modules/core-js/modules/_collection-to-json.js"}],"node_modules/core-js/modules/es7.set.to-json.js":[function(require,module,exports) {
// https://github.com/DavidBruant/Map-Set.prototype.toJSON
var $export = require('./_export');

$export($export.P + $export.R, 'Set', { toJSON: require('./_collection-to-json')('Set') });

},{"./_export":"node_modules/core-js/modules/_export.js","./_collection-to-json":"node_modules/core-js/modules/_collection-to-json.js"}],"node_modules/core-js/modules/_set-collection-of.js":[function(require,module,exports) {
'use strict';
// https://tc39.github.io/proposal-setmap-offrom/
var $export = require('./_export');

module.exports = function (COLLECTION) {
  $export($export.S, COLLECTION, { of: function of() {
    var length = arguments.length;
    var A = new Array(length);
    while (length--) A[length] = arguments[length];
    return new this(A);
  } });
};

},{"./_export":"node_modules/core-js/modules/_export.js"}],"node_modules/core-js/modules/es7.map.of.js":[function(require,module,exports) {
// https://tc39.github.io/proposal-setmap-offrom/#sec-map.of
require('./_set-collection-of')('Map');

},{"./_set-collection-of":"node_modules/core-js/modules/_set-collection-of.js"}],"node_modules/core-js/modules/es7.set.of.js":[function(require,module,exports) {
// https://tc39.github.io/proposal-setmap-offrom/#sec-set.of
require('./_set-collection-of')('Set');

},{"./_set-collection-of":"node_modules/core-js/modules/_set-collection-of.js"}],"node_modules/core-js/modules/es7.weak-map.of.js":[function(require,module,exports) {
// https://tc39.github.io/proposal-setmap-offrom/#sec-weakmap.of
require('./_set-collection-of')('WeakMap');

},{"./_set-collection-of":"node_modules/core-js/modules/_set-collection-of.js"}],"node_modules/core-js/modules/es7.weak-set.of.js":[function(require,module,exports) {
// https://tc39.github.io/proposal-setmap-offrom/#sec-weakset.of
require('./_set-collection-of')('WeakSet');

},{"./_set-collection-of":"node_modules/core-js/modules/_set-collection-of.js"}],"node_modules/core-js/modules/_set-collection-from.js":[function(require,module,exports) {
'use strict';
// https://tc39.github.io/proposal-setmap-offrom/
var $export = require('./_export');
var aFunction = require('./_a-function');
var ctx = require('./_ctx');
var forOf = require('./_for-of');

module.exports = function (COLLECTION) {
  $export($export.S, COLLECTION, { from: function from(source /* , mapFn, thisArg */) {
    var mapFn = arguments[1];
    var mapping, A, n, cb;
    aFunction(this);
    mapping = mapFn !== undefined;
    if (mapping) aFunction(mapFn);
    if (source == undefined) return new this();
    A = [];
    if (mapping) {
      n = 0;
      cb = ctx(mapFn, arguments[2], 2);
      forOf(source, false, function (nextItem) {
        A.push(cb(nextItem, n++));
      });
    } else {
      forOf(source, false, A.push, A);
    }
    return new this(A);
  } });
};

},{"./_export":"node_modules/core-js/modules/_export.js","./_a-function":"node_modules/core-js/modules/_a-function.js","./_ctx":"node_modules/core-js/modules/_ctx.js","./_for-of":"node_modules/core-js/modules/_for-of.js"}],"node_modules/core-js/modules/es7.map.from.js":[function(require,module,exports) {
// https://tc39.github.io/proposal-setmap-offrom/#sec-map.from
require('./_set-collection-from')('Map');

},{"./_set-collection-from":"node_modules/core-js/modules/_set-collection-from.js"}],"node_modules/core-js/modules/es7.set.from.js":[function(require,module,exports) {
// https://tc39.github.io/proposal-setmap-offrom/#sec-set.from
require('./_set-collection-from')('Set');

},{"./_set-collection-from":"node_modules/core-js/modules/_set-collection-from.js"}],"node_modules/core-js/modules/es7.weak-map.from.js":[function(require,module,exports) {
// https://tc39.github.io/proposal-setmap-offrom/#sec-weakmap.from
require('./_set-collection-from')('WeakMap');

},{"./_set-collection-from":"node_modules/core-js/modules/_set-collection-from.js"}],"node_modules/core-js/modules/es7.weak-set.from.js":[function(require,module,exports) {
// https://tc39.github.io/proposal-setmap-offrom/#sec-weakset.from
require('./_set-collection-from')('WeakSet');

},{"./_set-collection-from":"node_modules/core-js/modules/_set-collection-from.js"}],"node_modules/core-js/modules/es7.global.js":[function(require,module,exports) {
// https://github.com/tc39/proposal-global
var $export = require('./_export');

$export($export.G, { global: require('./_global') });

},{"./_export":"node_modules/core-js/modules/_export.js","./_global":"node_modules/core-js/modules/_global.js"}],"node_modules/core-js/modules/es7.system.global.js":[function(require,module,exports) {
// https://github.com/tc39/proposal-global
var $export = require('./_export');

$export($export.S, 'System', { global: require('./_global') });

},{"./_export":"node_modules/core-js/modules/_export.js","./_global":"node_modules/core-js/modules/_global.js"}],"node_modules/core-js/modules/es7.error.is-error.js":[function(require,module,exports) {
// https://github.com/ljharb/proposal-is-error
var $export = require('./_export');
var cof = require('./_cof');

$export($export.S, 'Error', {
  isError: function isError(it) {
    return cof(it) === 'Error';
  }
});

},{"./_export":"node_modules/core-js/modules/_export.js","./_cof":"node_modules/core-js/modules/_cof.js"}],"node_modules/core-js/modules/es7.math.clamp.js":[function(require,module,exports) {
// https://rwaldron.github.io/proposal-math-extensions/
var $export = require('./_export');

$export($export.S, 'Math', {
  clamp: function clamp(x, lower, upper) {
    return Math.min(upper, Math.max(lower, x));
  }
});

},{"./_export":"node_modules/core-js/modules/_export.js"}],"node_modules/core-js/modules/es7.math.deg-per-rad.js":[function(require,module,exports) {
// https://rwaldron.github.io/proposal-math-extensions/
var $export = require('./_export');

$export($export.S, 'Math', { DEG_PER_RAD: Math.PI / 180 });

},{"./_export":"node_modules/core-js/modules/_export.js"}],"node_modules/core-js/modules/es7.math.degrees.js":[function(require,module,exports) {
// https://rwaldron.github.io/proposal-math-extensions/
var $export = require('./_export');
var RAD_PER_DEG = 180 / Math.PI;

$export($export.S, 'Math', {
  degrees: function degrees(radians) {
    return radians * RAD_PER_DEG;
  }
});

},{"./_export":"node_modules/core-js/modules/_export.js"}],"node_modules/core-js/modules/_math-scale.js":[function(require,module,exports) {
// https://rwaldron.github.io/proposal-math-extensions/
module.exports = Math.scale || function scale(x, inLow, inHigh, outLow, outHigh) {
  if (
    arguments.length === 0
      // eslint-disable-next-line no-self-compare
      || x != x
      // eslint-disable-next-line no-self-compare
      || inLow != inLow
      // eslint-disable-next-line no-self-compare
      || inHigh != inHigh
      // eslint-disable-next-line no-self-compare
      || outLow != outLow
      // eslint-disable-next-line no-self-compare
      || outHigh != outHigh
  ) return NaN;
  if (x === Infinity || x === -Infinity) return x;
  return (x - inLow) * (outHigh - outLow) / (inHigh - inLow) + outLow;
};

},{}],"node_modules/core-js/modules/es7.math.fscale.js":[function(require,module,exports) {
// https://rwaldron.github.io/proposal-math-extensions/
var $export = require('./_export');
var scale = require('./_math-scale');
var fround = require('./_math-fround');

$export($export.S, 'Math', {
  fscale: function fscale(x, inLow, inHigh, outLow, outHigh) {
    return fround(scale(x, inLow, inHigh, outLow, outHigh));
  }
});

},{"./_export":"node_modules/core-js/modules/_export.js","./_math-scale":"node_modules/core-js/modules/_math-scale.js","./_math-fround":"node_modules/core-js/modules/_math-fround.js"}],"node_modules/core-js/modules/es7.math.iaddh.js":[function(require,module,exports) {
// https://gist.github.com/BrendanEich/4294d5c212a6d2254703
var $export = require('./_export');

$export($export.S, 'Math', {
  iaddh: function iaddh(x0, x1, y0, y1) {
    var $x0 = x0 >>> 0;
    var $x1 = x1 >>> 0;
    var $y0 = y0 >>> 0;
    return $x1 + (y1 >>> 0) + (($x0 & $y0 | ($x0 | $y0) & ~($x0 + $y0 >>> 0)) >>> 31) | 0;
  }
});

},{"./_export":"node_modules/core-js/modules/_export.js"}],"node_modules/core-js/modules/es7.math.isubh.js":[function(require,module,exports) {
// https://gist.github.com/BrendanEich/4294d5c212a6d2254703
var $export = require('./_export');

$export($export.S, 'Math', {
  isubh: function isubh(x0, x1, y0, y1) {
    var $x0 = x0 >>> 0;
    var $x1 = x1 >>> 0;
    var $y0 = y0 >>> 0;
    return $x1 - (y1 >>> 0) - ((~$x0 & $y0 | ~($x0 ^ $y0) & $x0 - $y0 >>> 0) >>> 31) | 0;
  }
});

},{"./_export":"node_modules/core-js/modules/_export.js"}],"node_modules/core-js/modules/es7.math.imulh.js":[function(require,module,exports) {
// https://gist.github.com/BrendanEich/4294d5c212a6d2254703
var $export = require('./_export');

$export($export.S, 'Math', {
  imulh: function imulh(u, v) {
    var UINT16 = 0xffff;
    var $u = +u;
    var $v = +v;
    var u0 = $u & UINT16;
    var v0 = $v & UINT16;
    var u1 = $u >> 16;
    var v1 = $v >> 16;
    var t = (u1 * v0 >>> 0) + (u0 * v0 >>> 16);
    return u1 * v1 + (t >> 16) + ((u0 * v1 >>> 0) + (t & UINT16) >> 16);
  }
});

},{"./_export":"node_modules/core-js/modules/_export.js"}],"node_modules/core-js/modules/es7.math.rad-per-deg.js":[function(require,module,exports) {
// https://rwaldron.github.io/proposal-math-extensions/
var $export = require('./_export');

$export($export.S, 'Math', { RAD_PER_DEG: 180 / Math.PI });

},{"./_export":"node_modules/core-js/modules/_export.js"}],"node_modules/core-js/modules/es7.math.radians.js":[function(require,module,exports) {
// https://rwaldron.github.io/proposal-math-extensions/
var $export = require('./_export');
var DEG_PER_RAD = Math.PI / 180;

$export($export.S, 'Math', {
  radians: function radians(degrees) {
    return degrees * DEG_PER_RAD;
  }
});

},{"./_export":"node_modules/core-js/modules/_export.js"}],"node_modules/core-js/modules/es7.math.scale.js":[function(require,module,exports) {
// https://rwaldron.github.io/proposal-math-extensions/
var $export = require('./_export');

$export($export.S, 'Math', { scale: require('./_math-scale') });

},{"./_export":"node_modules/core-js/modules/_export.js","./_math-scale":"node_modules/core-js/modules/_math-scale.js"}],"node_modules/core-js/modules/es7.math.umulh.js":[function(require,module,exports) {
// https://gist.github.com/BrendanEich/4294d5c212a6d2254703
var $export = require('./_export');

$export($export.S, 'Math', {
  umulh: function umulh(u, v) {
    var UINT16 = 0xffff;
    var $u = +u;
    var $v = +v;
    var u0 = $u & UINT16;
    var v0 = $v & UINT16;
    var u1 = $u >>> 16;
    var v1 = $v >>> 16;
    var t = (u1 * v0 >>> 0) + (u0 * v0 >>> 16);
    return u1 * v1 + (t >>> 16) + ((u0 * v1 >>> 0) + (t & UINT16) >>> 16);
  }
});

},{"./_export":"node_modules/core-js/modules/_export.js"}],"node_modules/core-js/modules/es7.math.signbit.js":[function(require,module,exports) {
// http://jfbastien.github.io/papers/Math.signbit.html
var $export = require('./_export');

$export($export.S, 'Math', { signbit: function signbit(x) {
  // eslint-disable-next-line no-self-compare
  return (x = +x) != x ? x : x == 0 ? 1 / x == Infinity : x > 0;
} });

},{"./_export":"node_modules/core-js/modules/_export.js"}],"node_modules/core-js/modules/es7.promise.finally.js":[function(require,module,exports) {

// https://github.com/tc39/proposal-promise-finally
'use strict';
var $export = require('./_export');
var core = require('./_core');
var global = require('./_global');
var speciesConstructor = require('./_species-constructor');
var promiseResolve = require('./_promise-resolve');

$export($export.P + $export.R, 'Promise', { 'finally': function (onFinally) {
  var C = speciesConstructor(this, core.Promise || global.Promise);
  var isFunction = typeof onFinally == 'function';
  return this.then(
    isFunction ? function (x) {
      return promiseResolve(C, onFinally()).then(function () { return x; });
    } : onFinally,
    isFunction ? function (e) {
      return promiseResolve(C, onFinally()).then(function () { throw e; });
    } : onFinally
  );
} });

},{"./_export":"node_modules/core-js/modules/_export.js","./_core":"node_modules/core-js/modules/_core.js","./_global":"node_modules/core-js/modules/_global.js","./_species-constructor":"node_modules/core-js/modules/_species-constructor.js","./_promise-resolve":"node_modules/core-js/modules/_promise-resolve.js"}],"node_modules/core-js/modules/es7.promise.try.js":[function(require,module,exports) {
'use strict';
// https://github.com/tc39/proposal-promise-try
var $export = require('./_export');
var newPromiseCapability = require('./_new-promise-capability');
var perform = require('./_perform');

$export($export.S, 'Promise', { 'try': function (callbackfn) {
  var promiseCapability = newPromiseCapability.f(this);
  var result = perform(callbackfn);
  (result.e ? promiseCapability.reject : promiseCapability.resolve)(result.v);
  return promiseCapability.promise;
} });

},{"./_export":"node_modules/core-js/modules/_export.js","./_new-promise-capability":"node_modules/core-js/modules/_new-promise-capability.js","./_perform":"node_modules/core-js/modules/_perform.js"}],"node_modules/core-js/modules/_metadata.js":[function(require,module,exports) {
var Map = require('./es6.map');
var $export = require('./_export');
var shared = require('./_shared')('metadata');
var store = shared.store || (shared.store = new (require('./es6.weak-map'))());

var getOrCreateMetadataMap = function (target, targetKey, create) {
  var targetMetadata = store.get(target);
  if (!targetMetadata) {
    if (!create) return undefined;
    store.set(target, targetMetadata = new Map());
  }
  var keyMetadata = targetMetadata.get(targetKey);
  if (!keyMetadata) {
    if (!create) return undefined;
    targetMetadata.set(targetKey, keyMetadata = new Map());
  } return keyMetadata;
};
var ordinaryHasOwnMetadata = function (MetadataKey, O, P) {
  var metadataMap = getOrCreateMetadataMap(O, P, false);
  return metadataMap === undefined ? false : metadataMap.has(MetadataKey);
};
var ordinaryGetOwnMetadata = function (MetadataKey, O, P) {
  var metadataMap = getOrCreateMetadataMap(O, P, false);
  return metadataMap === undefined ? undefined : metadataMap.get(MetadataKey);
};
var ordinaryDefineOwnMetadata = function (MetadataKey, MetadataValue, O, P) {
  getOrCreateMetadataMap(O, P, true).set(MetadataKey, MetadataValue);
};
var ordinaryOwnMetadataKeys = function (target, targetKey) {
  var metadataMap = getOrCreateMetadataMap(target, targetKey, false);
  var keys = [];
  if (metadataMap) metadataMap.forEach(function (_, key) { keys.push(key); });
  return keys;
};
var toMetaKey = function (it) {
  return it === undefined || typeof it == 'symbol' ? it : String(it);
};
var exp = function (O) {
  $export($export.S, 'Reflect', O);
};

module.exports = {
  store: store,
  map: getOrCreateMetadataMap,
  has: ordinaryHasOwnMetadata,
  get: ordinaryGetOwnMetadata,
  set: ordinaryDefineOwnMetadata,
  keys: ordinaryOwnMetadataKeys,
  key: toMetaKey,
  exp: exp
};

},{"./es6.map":"node_modules/core-js/modules/es6.map.js","./_export":"node_modules/core-js/modules/_export.js","./_shared":"node_modules/core-js/modules/_shared.js","./es6.weak-map":"node_modules/core-js/modules/es6.weak-map.js"}],"node_modules/core-js/modules/es7.reflect.define-metadata.js":[function(require,module,exports) {
var metadata = require('./_metadata');
var anObject = require('./_an-object');
var toMetaKey = metadata.key;
var ordinaryDefineOwnMetadata = metadata.set;

metadata.exp({ defineMetadata: function defineMetadata(metadataKey, metadataValue, target, targetKey) {
  ordinaryDefineOwnMetadata(metadataKey, metadataValue, anObject(target), toMetaKey(targetKey));
} });

},{"./_metadata":"node_modules/core-js/modules/_metadata.js","./_an-object":"node_modules/core-js/modules/_an-object.js"}],"node_modules/core-js/modules/es7.reflect.delete-metadata.js":[function(require,module,exports) {
var metadata = require('./_metadata');
var anObject = require('./_an-object');
var toMetaKey = metadata.key;
var getOrCreateMetadataMap = metadata.map;
var store = metadata.store;

metadata.exp({ deleteMetadata: function deleteMetadata(metadataKey, target /* , targetKey */) {
  var targetKey = arguments.length < 3 ? undefined : toMetaKey(arguments[2]);
  var metadataMap = getOrCreateMetadataMap(anObject(target), targetKey, false);
  if (metadataMap === undefined || !metadataMap['delete'](metadataKey)) return false;
  if (metadataMap.size) return true;
  var targetMetadata = store.get(target);
  targetMetadata['delete'](targetKey);
  return !!targetMetadata.size || store['delete'](target);
} });

},{"./_metadata":"node_modules/core-js/modules/_metadata.js","./_an-object":"node_modules/core-js/modules/_an-object.js"}],"node_modules/core-js/modules/es7.reflect.get-metadata.js":[function(require,module,exports) {
var metadata = require('./_metadata');
var anObject = require('./_an-object');
var getPrototypeOf = require('./_object-gpo');
var ordinaryHasOwnMetadata = metadata.has;
var ordinaryGetOwnMetadata = metadata.get;
var toMetaKey = metadata.key;

var ordinaryGetMetadata = function (MetadataKey, O, P) {
  var hasOwn = ordinaryHasOwnMetadata(MetadataKey, O, P);
  if (hasOwn) return ordinaryGetOwnMetadata(MetadataKey, O, P);
  var parent = getPrototypeOf(O);
  return parent !== null ? ordinaryGetMetadata(MetadataKey, parent, P) : undefined;
};

metadata.exp({ getMetadata: function getMetadata(metadataKey, target /* , targetKey */) {
  return ordinaryGetMetadata(metadataKey, anObject(target), arguments.length < 3 ? undefined : toMetaKey(arguments[2]));
} });

},{"./_metadata":"node_modules/core-js/modules/_metadata.js","./_an-object":"node_modules/core-js/modules/_an-object.js","./_object-gpo":"node_modules/core-js/modules/_object-gpo.js"}],"node_modules/core-js/modules/es7.reflect.get-metadata-keys.js":[function(require,module,exports) {
var Set = require('./es6.set');
var from = require('./_array-from-iterable');
var metadata = require('./_metadata');
var anObject = require('./_an-object');
var getPrototypeOf = require('./_object-gpo');
var ordinaryOwnMetadataKeys = metadata.keys;
var toMetaKey = metadata.key;

var ordinaryMetadataKeys = function (O, P) {
  var oKeys = ordinaryOwnMetadataKeys(O, P);
  var parent = getPrototypeOf(O);
  if (parent === null) return oKeys;
  var pKeys = ordinaryMetadataKeys(parent, P);
  return pKeys.length ? oKeys.length ? from(new Set(oKeys.concat(pKeys))) : pKeys : oKeys;
};

metadata.exp({ getMetadataKeys: function getMetadataKeys(target /* , targetKey */) {
  return ordinaryMetadataKeys(anObject(target), arguments.length < 2 ? undefined : toMetaKey(arguments[1]));
} });

},{"./es6.set":"node_modules/core-js/modules/es6.set.js","./_array-from-iterable":"node_modules/core-js/modules/_array-from-iterable.js","./_metadata":"node_modules/core-js/modules/_metadata.js","./_an-object":"node_modules/core-js/modules/_an-object.js","./_object-gpo":"node_modules/core-js/modules/_object-gpo.js"}],"node_modules/core-js/modules/es7.reflect.get-own-metadata.js":[function(require,module,exports) {
var metadata = require('./_metadata');
var anObject = require('./_an-object');
var ordinaryGetOwnMetadata = metadata.get;
var toMetaKey = metadata.key;

metadata.exp({ getOwnMetadata: function getOwnMetadata(metadataKey, target /* , targetKey */) {
  return ordinaryGetOwnMetadata(metadataKey, anObject(target)
    , arguments.length < 3 ? undefined : toMetaKey(arguments[2]));
} });

},{"./_metadata":"node_modules/core-js/modules/_metadata.js","./_an-object":"node_modules/core-js/modules/_an-object.js"}],"node_modules/core-js/modules/es7.reflect.get-own-metadata-keys.js":[function(require,module,exports) {
var metadata = require('./_metadata');
var anObject = require('./_an-object');
var ordinaryOwnMetadataKeys = metadata.keys;
var toMetaKey = metadata.key;

metadata.exp({ getOwnMetadataKeys: function getOwnMetadataKeys(target /* , targetKey */) {
  return ordinaryOwnMetadataKeys(anObject(target), arguments.length < 2 ? undefined : toMetaKey(arguments[1]));
} });

},{"./_metadata":"node_modules/core-js/modules/_metadata.js","./_an-object":"node_modules/core-js/modules/_an-object.js"}],"node_modules/core-js/modules/es7.reflect.has-metadata.js":[function(require,module,exports) {
var metadata = require('./_metadata');
var anObject = require('./_an-object');
var getPrototypeOf = require('./_object-gpo');
var ordinaryHasOwnMetadata = metadata.has;
var toMetaKey = metadata.key;

var ordinaryHasMetadata = function (MetadataKey, O, P) {
  var hasOwn = ordinaryHasOwnMetadata(MetadataKey, O, P);
  if (hasOwn) return true;
  var parent = getPrototypeOf(O);
  return parent !== null ? ordinaryHasMetadata(MetadataKey, parent, P) : false;
};

metadata.exp({ hasMetadata: function hasMetadata(metadataKey, target /* , targetKey */) {
  return ordinaryHasMetadata(metadataKey, anObject(target), arguments.length < 3 ? undefined : toMetaKey(arguments[2]));
} });

},{"./_metadata":"node_modules/core-js/modules/_metadata.js","./_an-object":"node_modules/core-js/modules/_an-object.js","./_object-gpo":"node_modules/core-js/modules/_object-gpo.js"}],"node_modules/core-js/modules/es7.reflect.has-own-metadata.js":[function(require,module,exports) {
var metadata = require('./_metadata');
var anObject = require('./_an-object');
var ordinaryHasOwnMetadata = metadata.has;
var toMetaKey = metadata.key;

metadata.exp({ hasOwnMetadata: function hasOwnMetadata(metadataKey, target /* , targetKey */) {
  return ordinaryHasOwnMetadata(metadataKey, anObject(target)
    , arguments.length < 3 ? undefined : toMetaKey(arguments[2]));
} });

},{"./_metadata":"node_modules/core-js/modules/_metadata.js","./_an-object":"node_modules/core-js/modules/_an-object.js"}],"node_modules/core-js/modules/es7.reflect.metadata.js":[function(require,module,exports) {
var $metadata = require('./_metadata');
var anObject = require('./_an-object');
var aFunction = require('./_a-function');
var toMetaKey = $metadata.key;
var ordinaryDefineOwnMetadata = $metadata.set;

$metadata.exp({ metadata: function metadata(metadataKey, metadataValue) {
  return function decorator(target, targetKey) {
    ordinaryDefineOwnMetadata(
      metadataKey, metadataValue,
      (targetKey !== undefined ? anObject : aFunction)(target),
      toMetaKey(targetKey)
    );
  };
} });

},{"./_metadata":"node_modules/core-js/modules/_metadata.js","./_an-object":"node_modules/core-js/modules/_an-object.js","./_a-function":"node_modules/core-js/modules/_a-function.js"}],"node_modules/core-js/modules/es7.asap.js":[function(require,module,exports) {

// https://github.com/rwaldron/tc39-notes/blob/master/es6/2014-09/sept-25.md#510-globalasap-for-enqueuing-a-microtask
var $export = require('./_export');
var microtask = require('./_microtask')();
var process = require('./_global').process;
var isNode = require('./_cof')(process) == 'process';

$export($export.G, {
  asap: function asap(fn) {
    var domain = isNode && process.domain;
    microtask(domain ? domain.bind(fn) : fn);
  }
});

},{"./_export":"node_modules/core-js/modules/_export.js","./_microtask":"node_modules/core-js/modules/_microtask.js","./_global":"node_modules/core-js/modules/_global.js","./_cof":"node_modules/core-js/modules/_cof.js"}],"node_modules/core-js/modules/es7.observable.js":[function(require,module,exports) {

'use strict';
// https://github.com/zenparsing/es-observable
var $export = require('./_export');
var global = require('./_global');
var core = require('./_core');
var microtask = require('./_microtask')();
var OBSERVABLE = require('./_wks')('observable');
var aFunction = require('./_a-function');
var anObject = require('./_an-object');
var anInstance = require('./_an-instance');
var redefineAll = require('./_redefine-all');
var hide = require('./_hide');
var forOf = require('./_for-of');
var RETURN = forOf.RETURN;

var getMethod = function (fn) {
  return fn == null ? undefined : aFunction(fn);
};

var cleanupSubscription = function (subscription) {
  var cleanup = subscription._c;
  if (cleanup) {
    subscription._c = undefined;
    cleanup();
  }
};

var subscriptionClosed = function (subscription) {
  return subscription._o === undefined;
};

var closeSubscription = function (subscription) {
  if (!subscriptionClosed(subscription)) {
    subscription._o = undefined;
    cleanupSubscription(subscription);
  }
};

var Subscription = function (observer, subscriber) {
  anObject(observer);
  this._c = undefined;
  this._o = observer;
  observer = new SubscriptionObserver(this);
  try {
    var cleanup = subscriber(observer);
    var subscription = cleanup;
    if (cleanup != null) {
      if (typeof cleanup.unsubscribe === 'function') cleanup = function () { subscription.unsubscribe(); };
      else aFunction(cleanup);
      this._c = cleanup;
    }
  } catch (e) {
    observer.error(e);
    return;
  } if (subscriptionClosed(this)) cleanupSubscription(this);
};

Subscription.prototype = redefineAll({}, {
  unsubscribe: function unsubscribe() { closeSubscription(this); }
});

var SubscriptionObserver = function (subscription) {
  this._s = subscription;
};

SubscriptionObserver.prototype = redefineAll({}, {
  next: function next(value) {
    var subscription = this._s;
    if (!subscriptionClosed(subscription)) {
      var observer = subscription._o;
      try {
        var m = getMethod(observer.next);
        if (m) return m.call(observer, value);
      } catch (e) {
        try {
          closeSubscription(subscription);
        } finally {
          throw e;
        }
      }
    }
  },
  error: function error(value) {
    var subscription = this._s;
    if (subscriptionClosed(subscription)) throw value;
    var observer = subscription._o;
    subscription._o = undefined;
    try {
      var m = getMethod(observer.error);
      if (!m) throw value;
      value = m.call(observer, value);
    } catch (e) {
      try {
        cleanupSubscription(subscription);
      } finally {
        throw e;
      }
    } cleanupSubscription(subscription);
    return value;
  },
  complete: function complete(value) {
    var subscription = this._s;
    if (!subscriptionClosed(subscription)) {
      var observer = subscription._o;
      subscription._o = undefined;
      try {
        var m = getMethod(observer.complete);
        value = m ? m.call(observer, value) : undefined;
      } catch (e) {
        try {
          cleanupSubscription(subscription);
        } finally {
          throw e;
        }
      } cleanupSubscription(subscription);
      return value;
    }
  }
});

var $Observable = function Observable(subscriber) {
  anInstance(this, $Observable, 'Observable', '_f')._f = aFunction(subscriber);
};

redefineAll($Observable.prototype, {
  subscribe: function subscribe(observer) {
    return new Subscription(observer, this._f);
  },
  forEach: function forEach(fn) {
    var that = this;
    return new (core.Promise || global.Promise)(function (resolve, reject) {
      aFunction(fn);
      var subscription = that.subscribe({
        next: function (value) {
          try {
            return fn(value);
          } catch (e) {
            reject(e);
            subscription.unsubscribe();
          }
        },
        error: reject,
        complete: resolve
      });
    });
  }
});

redefineAll($Observable, {
  from: function from(x) {
    var C = typeof this === 'function' ? this : $Observable;
    var method = getMethod(anObject(x)[OBSERVABLE]);
    if (method) {
      var observable = anObject(method.call(x));
      return observable.constructor === C ? observable : new C(function (observer) {
        return observable.subscribe(observer);
      });
    }
    return new C(function (observer) {
      var done = false;
      microtask(function () {
        if (!done) {
          try {
            if (forOf(x, false, function (it) {
              observer.next(it);
              if (done) return RETURN;
            }) === RETURN) return;
          } catch (e) {
            if (done) throw e;
            observer.error(e);
            return;
          } observer.complete();
        }
      });
      return function () { done = true; };
    });
  },
  of: function of() {
    for (var i = 0, l = arguments.length, items = new Array(l); i < l;) items[i] = arguments[i++];
    return new (typeof this === 'function' ? this : $Observable)(function (observer) {
      var done = false;
      microtask(function () {
        if (!done) {
          for (var j = 0; j < items.length; ++j) {
            observer.next(items[j]);
            if (done) return;
          } observer.complete();
        }
      });
      return function () { done = true; };
    });
  }
});

hide($Observable.prototype, OBSERVABLE, function () { return this; });

$export($export.G, { Observable: $Observable });

require('./_set-species')('Observable');

},{"./_export":"node_modules/core-js/modules/_export.js","./_global":"node_modules/core-js/modules/_global.js","./_core":"node_modules/core-js/modules/_core.js","./_microtask":"node_modules/core-js/modules/_microtask.js","./_wks":"node_modules/core-js/modules/_wks.js","./_a-function":"node_modules/core-js/modules/_a-function.js","./_an-object":"node_modules/core-js/modules/_an-object.js","./_an-instance":"node_modules/core-js/modules/_an-instance.js","./_redefine-all":"node_modules/core-js/modules/_redefine-all.js","./_hide":"node_modules/core-js/modules/_hide.js","./_for-of":"node_modules/core-js/modules/_for-of.js","./_set-species":"node_modules/core-js/modules/_set-species.js"}],"node_modules/core-js/modules/web.timers.js":[function(require,module,exports) {

// ie9- setTimeout & setInterval additional parameters fix
var global = require('./_global');
var $export = require('./_export');
var userAgent = require('./_user-agent');
var slice = [].slice;
var MSIE = /MSIE .\./.test(userAgent); // <- dirty ie9- check
var wrap = function (set) {
  return function (fn, time /* , ...args */) {
    var boundArgs = arguments.length > 2;
    var args = boundArgs ? slice.call(arguments, 2) : false;
    return set(boundArgs ? function () {
      // eslint-disable-next-line no-new-func
      (typeof fn == 'function' ? fn : Function(fn)).apply(this, args);
    } : fn, time);
  };
};
$export($export.G + $export.B + $export.F * MSIE, {
  setTimeout: wrap(global.setTimeout),
  setInterval: wrap(global.setInterval)
});

},{"./_global":"node_modules/core-js/modules/_global.js","./_export":"node_modules/core-js/modules/_export.js","./_user-agent":"node_modules/core-js/modules/_user-agent.js"}],"node_modules/core-js/modules/web.immediate.js":[function(require,module,exports) {
var $export = require('./_export');
var $task = require('./_task');
$export($export.G + $export.B, {
  setImmediate: $task.set,
  clearImmediate: $task.clear
});

},{"./_export":"node_modules/core-js/modules/_export.js","./_task":"node_modules/core-js/modules/_task.js"}],"node_modules/core-js/modules/web.dom.iterable.js":[function(require,module,exports) {

var $iterators = require('./es6.array.iterator');
var getKeys = require('./_object-keys');
var redefine = require('./_redefine');
var global = require('./_global');
var hide = require('./_hide');
var Iterators = require('./_iterators');
var wks = require('./_wks');
var ITERATOR = wks('iterator');
var TO_STRING_TAG = wks('toStringTag');
var ArrayValues = Iterators.Array;

var DOMIterables = {
  CSSRuleList: true, // TODO: Not spec compliant, should be false.
  CSSStyleDeclaration: false,
  CSSValueList: false,
  ClientRectList: false,
  DOMRectList: false,
  DOMStringList: false,
  DOMTokenList: true,
  DataTransferItemList: false,
  FileList: false,
  HTMLAllCollection: false,
  HTMLCollection: false,
  HTMLFormElement: false,
  HTMLSelectElement: false,
  MediaList: true, // TODO: Not spec compliant, should be false.
  MimeTypeArray: false,
  NamedNodeMap: false,
  NodeList: true,
  PaintRequestList: false,
  Plugin: false,
  PluginArray: false,
  SVGLengthList: false,
  SVGNumberList: false,
  SVGPathSegList: false,
  SVGPointList: false,
  SVGStringList: false,
  SVGTransformList: false,
  SourceBufferList: false,
  StyleSheetList: true, // TODO: Not spec compliant, should be false.
  TextTrackCueList: false,
  TextTrackList: false,
  TouchList: false
};

for (var collections = getKeys(DOMIterables), i = 0; i < collections.length; i++) {
  var NAME = collections[i];
  var explicit = DOMIterables[NAME];
  var Collection = global[NAME];
  var proto = Collection && Collection.prototype;
  var key;
  if (proto) {
    if (!proto[ITERATOR]) hide(proto, ITERATOR, ArrayValues);
    if (!proto[TO_STRING_TAG]) hide(proto, TO_STRING_TAG, NAME);
    Iterators[NAME] = ArrayValues;
    if (explicit) for (key in $iterators) if (!proto[key]) redefine(proto, key, $iterators[key], true);
  }
}

},{"./es6.array.iterator":"node_modules/core-js/modules/es6.array.iterator.js","./_object-keys":"node_modules/core-js/modules/_object-keys.js","./_redefine":"node_modules/core-js/modules/_redefine.js","./_global":"node_modules/core-js/modules/_global.js","./_hide":"node_modules/core-js/modules/_hide.js","./_iterators":"node_modules/core-js/modules/_iterators.js","./_wks":"node_modules/core-js/modules/_wks.js"}],"node_modules/core-js/shim.js":[function(require,module,exports) {
require('./modules/es6.symbol');
require('./modules/es6.object.create');
require('./modules/es6.object.define-property');
require('./modules/es6.object.define-properties');
require('./modules/es6.object.get-own-property-descriptor');
require('./modules/es6.object.get-prototype-of');
require('./modules/es6.object.keys');
require('./modules/es6.object.get-own-property-names');
require('./modules/es6.object.freeze');
require('./modules/es6.object.seal');
require('./modules/es6.object.prevent-extensions');
require('./modules/es6.object.is-frozen');
require('./modules/es6.object.is-sealed');
require('./modules/es6.object.is-extensible');
require('./modules/es6.object.assign');
require('./modules/es6.object.is');
require('./modules/es6.object.set-prototype-of');
require('./modules/es6.object.to-string');
require('./modules/es6.function.bind');
require('./modules/es6.function.name');
require('./modules/es6.function.has-instance');
require('./modules/es6.parse-int');
require('./modules/es6.parse-float');
require('./modules/es6.number.constructor');
require('./modules/es6.number.to-fixed');
require('./modules/es6.number.to-precision');
require('./modules/es6.number.epsilon');
require('./modules/es6.number.is-finite');
require('./modules/es6.number.is-integer');
require('./modules/es6.number.is-nan');
require('./modules/es6.number.is-safe-integer');
require('./modules/es6.number.max-safe-integer');
require('./modules/es6.number.min-safe-integer');
require('./modules/es6.number.parse-float');
require('./modules/es6.number.parse-int');
require('./modules/es6.math.acosh');
require('./modules/es6.math.asinh');
require('./modules/es6.math.atanh');
require('./modules/es6.math.cbrt');
require('./modules/es6.math.clz32');
require('./modules/es6.math.cosh');
require('./modules/es6.math.expm1');
require('./modules/es6.math.fround');
require('./modules/es6.math.hypot');
require('./modules/es6.math.imul');
require('./modules/es6.math.log10');
require('./modules/es6.math.log1p');
require('./modules/es6.math.log2');
require('./modules/es6.math.sign');
require('./modules/es6.math.sinh');
require('./modules/es6.math.tanh');
require('./modules/es6.math.trunc');
require('./modules/es6.string.from-code-point');
require('./modules/es6.string.raw');
require('./modules/es6.string.trim');
require('./modules/es6.string.iterator');
require('./modules/es6.string.code-point-at');
require('./modules/es6.string.ends-with');
require('./modules/es6.string.includes');
require('./modules/es6.string.repeat');
require('./modules/es6.string.starts-with');
require('./modules/es6.string.anchor');
require('./modules/es6.string.big');
require('./modules/es6.string.blink');
require('./modules/es6.string.bold');
require('./modules/es6.string.fixed');
require('./modules/es6.string.fontcolor');
require('./modules/es6.string.fontsize');
require('./modules/es6.string.italics');
require('./modules/es6.string.link');
require('./modules/es6.string.small');
require('./modules/es6.string.strike');
require('./modules/es6.string.sub');
require('./modules/es6.string.sup');
require('./modules/es6.date.now');
require('./modules/es6.date.to-json');
require('./modules/es6.date.to-iso-string');
require('./modules/es6.date.to-string');
require('./modules/es6.date.to-primitive');
require('./modules/es6.array.is-array');
require('./modules/es6.array.from');
require('./modules/es6.array.of');
require('./modules/es6.array.join');
require('./modules/es6.array.slice');
require('./modules/es6.array.sort');
require('./modules/es6.array.for-each');
require('./modules/es6.array.map');
require('./modules/es6.array.filter');
require('./modules/es6.array.some');
require('./modules/es6.array.every');
require('./modules/es6.array.reduce');
require('./modules/es6.array.reduce-right');
require('./modules/es6.array.index-of');
require('./modules/es6.array.last-index-of');
require('./modules/es6.array.copy-within');
require('./modules/es6.array.fill');
require('./modules/es6.array.find');
require('./modules/es6.array.find-index');
require('./modules/es6.array.species');
require('./modules/es6.array.iterator');
require('./modules/es6.regexp.constructor');
require('./modules/es6.regexp.exec');
require('./modules/es6.regexp.to-string');
require('./modules/es6.regexp.flags');
require('./modules/es6.regexp.match');
require('./modules/es6.regexp.replace');
require('./modules/es6.regexp.search');
require('./modules/es6.regexp.split');
require('./modules/es6.promise');
require('./modules/es6.map');
require('./modules/es6.set');
require('./modules/es6.weak-map');
require('./modules/es6.weak-set');
require('./modules/es6.typed.array-buffer');
require('./modules/es6.typed.data-view');
require('./modules/es6.typed.int8-array');
require('./modules/es6.typed.uint8-array');
require('./modules/es6.typed.uint8-clamped-array');
require('./modules/es6.typed.int16-array');
require('./modules/es6.typed.uint16-array');
require('./modules/es6.typed.int32-array');
require('./modules/es6.typed.uint32-array');
require('./modules/es6.typed.float32-array');
require('./modules/es6.typed.float64-array');
require('./modules/es6.reflect.apply');
require('./modules/es6.reflect.construct');
require('./modules/es6.reflect.define-property');
require('./modules/es6.reflect.delete-property');
require('./modules/es6.reflect.enumerate');
require('./modules/es6.reflect.get');
require('./modules/es6.reflect.get-own-property-descriptor');
require('./modules/es6.reflect.get-prototype-of');
require('./modules/es6.reflect.has');
require('./modules/es6.reflect.is-extensible');
require('./modules/es6.reflect.own-keys');
require('./modules/es6.reflect.prevent-extensions');
require('./modules/es6.reflect.set');
require('./modules/es6.reflect.set-prototype-of');
require('./modules/es7.array.includes');
require('./modules/es7.array.flat-map');
require('./modules/es7.array.flatten');
require('./modules/es7.string.at');
require('./modules/es7.string.pad-start');
require('./modules/es7.string.pad-end');
require('./modules/es7.string.trim-left');
require('./modules/es7.string.trim-right');
require('./modules/es7.string.match-all');
require('./modules/es7.symbol.async-iterator');
require('./modules/es7.symbol.observable');
require('./modules/es7.object.get-own-property-descriptors');
require('./modules/es7.object.values');
require('./modules/es7.object.entries');
require('./modules/es7.object.define-getter');
require('./modules/es7.object.define-setter');
require('./modules/es7.object.lookup-getter');
require('./modules/es7.object.lookup-setter');
require('./modules/es7.map.to-json');
require('./modules/es7.set.to-json');
require('./modules/es7.map.of');
require('./modules/es7.set.of');
require('./modules/es7.weak-map.of');
require('./modules/es7.weak-set.of');
require('./modules/es7.map.from');
require('./modules/es7.set.from');
require('./modules/es7.weak-map.from');
require('./modules/es7.weak-set.from');
require('./modules/es7.global');
require('./modules/es7.system.global');
require('./modules/es7.error.is-error');
require('./modules/es7.math.clamp');
require('./modules/es7.math.deg-per-rad');
require('./modules/es7.math.degrees');
require('./modules/es7.math.fscale');
require('./modules/es7.math.iaddh');
require('./modules/es7.math.isubh');
require('./modules/es7.math.imulh');
require('./modules/es7.math.rad-per-deg');
require('./modules/es7.math.radians');
require('./modules/es7.math.scale');
require('./modules/es7.math.umulh');
require('./modules/es7.math.signbit');
require('./modules/es7.promise.finally');
require('./modules/es7.promise.try');
require('./modules/es7.reflect.define-metadata');
require('./modules/es7.reflect.delete-metadata');
require('./modules/es7.reflect.get-metadata');
require('./modules/es7.reflect.get-metadata-keys');
require('./modules/es7.reflect.get-own-metadata');
require('./modules/es7.reflect.get-own-metadata-keys');
require('./modules/es7.reflect.has-metadata');
require('./modules/es7.reflect.has-own-metadata');
require('./modules/es7.reflect.metadata');
require('./modules/es7.asap');
require('./modules/es7.observable');
require('./modules/web.timers');
require('./modules/web.immediate');
require('./modules/web.dom.iterable');
module.exports = require('./modules/_core');

},{"./modules/es6.symbol":"node_modules/core-js/modules/es6.symbol.js","./modules/es6.object.create":"node_modules/core-js/modules/es6.object.create.js","./modules/es6.object.define-property":"node_modules/core-js/modules/es6.object.define-property.js","./modules/es6.object.define-properties":"node_modules/core-js/modules/es6.object.define-properties.js","./modules/es6.object.get-own-property-descriptor":"node_modules/core-js/modules/es6.object.get-own-property-descriptor.js","./modules/es6.object.get-prototype-of":"node_modules/core-js/modules/es6.object.get-prototype-of.js","./modules/es6.object.keys":"node_modules/core-js/modules/es6.object.keys.js","./modules/es6.object.get-own-property-names":"node_modules/core-js/modules/es6.object.get-own-property-names.js","./modules/es6.object.freeze":"node_modules/core-js/modules/es6.object.freeze.js","./modules/es6.object.seal":"node_modules/core-js/modules/es6.object.seal.js","./modules/es6.object.prevent-extensions":"node_modules/core-js/modules/es6.object.prevent-extensions.js","./modules/es6.object.is-frozen":"node_modules/core-js/modules/es6.object.is-frozen.js","./modules/es6.object.is-sealed":"node_modules/core-js/modules/es6.object.is-sealed.js","./modules/es6.object.is-extensible":"node_modules/core-js/modules/es6.object.is-extensible.js","./modules/es6.object.assign":"node_modules/core-js/modules/es6.object.assign.js","./modules/es6.object.is":"node_modules/core-js/modules/es6.object.is.js","./modules/es6.object.set-prototype-of":"node_modules/core-js/modules/es6.object.set-prototype-of.js","./modules/es6.object.to-string":"node_modules/core-js/modules/es6.object.to-string.js","./modules/es6.function.bind":"node_modules/core-js/modules/es6.function.bind.js","./modules/es6.function.name":"node_modules/core-js/modules/es6.function.name.js","./modules/es6.function.has-instance":"node_modules/core-js/modules/es6.function.has-instance.js","./modules/es6.parse-int":"node_modules/core-js/modules/es6.parse-int.js","./modules/es6.parse-float":"node_modules/core-js/modules/es6.parse-float.js","./modules/es6.number.constructor":"node_modules/core-js/modules/es6.number.constructor.js","./modules/es6.number.to-fixed":"node_modules/core-js/modules/es6.number.to-fixed.js","./modules/es6.number.to-precision":"node_modules/core-js/modules/es6.number.to-precision.js","./modules/es6.number.epsilon":"node_modules/core-js/modules/es6.number.epsilon.js","./modules/es6.number.is-finite":"node_modules/core-js/modules/es6.number.is-finite.js","./modules/es6.number.is-integer":"node_modules/core-js/modules/es6.number.is-integer.js","./modules/es6.number.is-nan":"node_modules/core-js/modules/es6.number.is-nan.js","./modules/es6.number.is-safe-integer":"node_modules/core-js/modules/es6.number.is-safe-integer.js","./modules/es6.number.max-safe-integer":"node_modules/core-js/modules/es6.number.max-safe-integer.js","./modules/es6.number.min-safe-integer":"node_modules/core-js/modules/es6.number.min-safe-integer.js","./modules/es6.number.parse-float":"node_modules/core-js/modules/es6.number.parse-float.js","./modules/es6.number.parse-int":"node_modules/core-js/modules/es6.number.parse-int.js","./modules/es6.math.acosh":"node_modules/core-js/modules/es6.math.acosh.js","./modules/es6.math.asinh":"node_modules/core-js/modules/es6.math.asinh.js","./modules/es6.math.atanh":"node_modules/core-js/modules/es6.math.atanh.js","./modules/es6.math.cbrt":"node_modules/core-js/modules/es6.math.cbrt.js","./modules/es6.math.clz32":"node_modules/core-js/modules/es6.math.clz32.js","./modules/es6.math.cosh":"node_modules/core-js/modules/es6.math.cosh.js","./modules/es6.math.expm1":"node_modules/core-js/modules/es6.math.expm1.js","./modules/es6.math.fround":"node_modules/core-js/modules/es6.math.fround.js","./modules/es6.math.hypot":"node_modules/core-js/modules/es6.math.hypot.js","./modules/es6.math.imul":"node_modules/core-js/modules/es6.math.imul.js","./modules/es6.math.log10":"node_modules/core-js/modules/es6.math.log10.js","./modules/es6.math.log1p":"node_modules/core-js/modules/es6.math.log1p.js","./modules/es6.math.log2":"node_modules/core-js/modules/es6.math.log2.js","./modules/es6.math.sign":"node_modules/core-js/modules/es6.math.sign.js","./modules/es6.math.sinh":"node_modules/core-js/modules/es6.math.sinh.js","./modules/es6.math.tanh":"node_modules/core-js/modules/es6.math.tanh.js","./modules/es6.math.trunc":"node_modules/core-js/modules/es6.math.trunc.js","./modules/es6.string.from-code-point":"node_modules/core-js/modules/es6.string.from-code-point.js","./modules/es6.string.raw":"node_modules/core-js/modules/es6.string.raw.js","./modules/es6.string.trim":"node_modules/core-js/modules/es6.string.trim.js","./modules/es6.string.iterator":"node_modules/core-js/modules/es6.string.iterator.js","./modules/es6.string.code-point-at":"node_modules/core-js/modules/es6.string.code-point-at.js","./modules/es6.string.ends-with":"node_modules/core-js/modules/es6.string.ends-with.js","./modules/es6.string.includes":"node_modules/core-js/modules/es6.string.includes.js","./modules/es6.string.repeat":"node_modules/core-js/modules/es6.string.repeat.js","./modules/es6.string.starts-with":"node_modules/core-js/modules/es6.string.starts-with.js","./modules/es6.string.anchor":"node_modules/core-js/modules/es6.string.anchor.js","./modules/es6.string.big":"node_modules/core-js/modules/es6.string.big.js","./modules/es6.string.blink":"node_modules/core-js/modules/es6.string.blink.js","./modules/es6.string.bold":"node_modules/core-js/modules/es6.string.bold.js","./modules/es6.string.fixed":"node_modules/core-js/modules/es6.string.fixed.js","./modules/es6.string.fontcolor":"node_modules/core-js/modules/es6.string.fontcolor.js","./modules/es6.string.fontsize":"node_modules/core-js/modules/es6.string.fontsize.js","./modules/es6.string.italics":"node_modules/core-js/modules/es6.string.italics.js","./modules/es6.string.link":"node_modules/core-js/modules/es6.string.link.js","./modules/es6.string.small":"node_modules/core-js/modules/es6.string.small.js","./modules/es6.string.strike":"node_modules/core-js/modules/es6.string.strike.js","./modules/es6.string.sub":"node_modules/core-js/modules/es6.string.sub.js","./modules/es6.string.sup":"node_modules/core-js/modules/es6.string.sup.js","./modules/es6.date.now":"node_modules/core-js/modules/es6.date.now.js","./modules/es6.date.to-json":"node_modules/core-js/modules/es6.date.to-json.js","./modules/es6.date.to-iso-string":"node_modules/core-js/modules/es6.date.to-iso-string.js","./modules/es6.date.to-string":"node_modules/core-js/modules/es6.date.to-string.js","./modules/es6.date.to-primitive":"node_modules/core-js/modules/es6.date.to-primitive.js","./modules/es6.array.is-array":"node_modules/core-js/modules/es6.array.is-array.js","./modules/es6.array.from":"node_modules/core-js/modules/es6.array.from.js","./modules/es6.array.of":"node_modules/core-js/modules/es6.array.of.js","./modules/es6.array.join":"node_modules/core-js/modules/es6.array.join.js","./modules/es6.array.slice":"node_modules/core-js/modules/es6.array.slice.js","./modules/es6.array.sort":"node_modules/core-js/modules/es6.array.sort.js","./modules/es6.array.for-each":"node_modules/core-js/modules/es6.array.for-each.js","./modules/es6.array.map":"node_modules/core-js/modules/es6.array.map.js","./modules/es6.array.filter":"node_modules/core-js/modules/es6.array.filter.js","./modules/es6.array.some":"node_modules/core-js/modules/es6.array.some.js","./modules/es6.array.every":"node_modules/core-js/modules/es6.array.every.js","./modules/es6.array.reduce":"node_modules/core-js/modules/es6.array.reduce.js","./modules/es6.array.reduce-right":"node_modules/core-js/modules/es6.array.reduce-right.js","./modules/es6.array.index-of":"node_modules/core-js/modules/es6.array.index-of.js","./modules/es6.array.last-index-of":"node_modules/core-js/modules/es6.array.last-index-of.js","./modules/es6.array.copy-within":"node_modules/core-js/modules/es6.array.copy-within.js","./modules/es6.array.fill":"node_modules/core-js/modules/es6.array.fill.js","./modules/es6.array.find":"node_modules/core-js/modules/es6.array.find.js","./modules/es6.array.find-index":"node_modules/core-js/modules/es6.array.find-index.js","./modules/es6.array.species":"node_modules/core-js/modules/es6.array.species.js","./modules/es6.array.iterator":"node_modules/core-js/modules/es6.array.iterator.js","./modules/es6.regexp.constructor":"node_modules/core-js/modules/es6.regexp.constructor.js","./modules/es6.regexp.exec":"node_modules/core-js/modules/es6.regexp.exec.js","./modules/es6.regexp.to-string":"node_modules/core-js/modules/es6.regexp.to-string.js","./modules/es6.regexp.flags":"node_modules/core-js/modules/es6.regexp.flags.js","./modules/es6.regexp.match":"node_modules/core-js/modules/es6.regexp.match.js","./modules/es6.regexp.replace":"node_modules/core-js/modules/es6.regexp.replace.js","./modules/es6.regexp.search":"node_modules/core-js/modules/es6.regexp.search.js","./modules/es6.regexp.split":"node_modules/core-js/modules/es6.regexp.split.js","./modules/es6.promise":"node_modules/core-js/modules/es6.promise.js","./modules/es6.map":"node_modules/core-js/modules/es6.map.js","./modules/es6.set":"node_modules/core-js/modules/es6.set.js","./modules/es6.weak-map":"node_modules/core-js/modules/es6.weak-map.js","./modules/es6.weak-set":"node_modules/core-js/modules/es6.weak-set.js","./modules/es6.typed.array-buffer":"node_modules/core-js/modules/es6.typed.array-buffer.js","./modules/es6.typed.data-view":"node_modules/core-js/modules/es6.typed.data-view.js","./modules/es6.typed.int8-array":"node_modules/core-js/modules/es6.typed.int8-array.js","./modules/es6.typed.uint8-array":"node_modules/core-js/modules/es6.typed.uint8-array.js","./modules/es6.typed.uint8-clamped-array":"node_modules/core-js/modules/es6.typed.uint8-clamped-array.js","./modules/es6.typed.int16-array":"node_modules/core-js/modules/es6.typed.int16-array.js","./modules/es6.typed.uint16-array":"node_modules/core-js/modules/es6.typed.uint16-array.js","./modules/es6.typed.int32-array":"node_modules/core-js/modules/es6.typed.int32-array.js","./modules/es6.typed.uint32-array":"node_modules/core-js/modules/es6.typed.uint32-array.js","./modules/es6.typed.float32-array":"node_modules/core-js/modules/es6.typed.float32-array.js","./modules/es6.typed.float64-array":"node_modules/core-js/modules/es6.typed.float64-array.js","./modules/es6.reflect.apply":"node_modules/core-js/modules/es6.reflect.apply.js","./modules/es6.reflect.construct":"node_modules/core-js/modules/es6.reflect.construct.js","./modules/es6.reflect.define-property":"node_modules/core-js/modules/es6.reflect.define-property.js","./modules/es6.reflect.delete-property":"node_modules/core-js/modules/es6.reflect.delete-property.js","./modules/es6.reflect.enumerate":"node_modules/core-js/modules/es6.reflect.enumerate.js","./modules/es6.reflect.get":"node_modules/core-js/modules/es6.reflect.get.js","./modules/es6.reflect.get-own-property-descriptor":"node_modules/core-js/modules/es6.reflect.get-own-property-descriptor.js","./modules/es6.reflect.get-prototype-of":"node_modules/core-js/modules/es6.reflect.get-prototype-of.js","./modules/es6.reflect.has":"node_modules/core-js/modules/es6.reflect.has.js","./modules/es6.reflect.is-extensible":"node_modules/core-js/modules/es6.reflect.is-extensible.js","./modules/es6.reflect.own-keys":"node_modules/core-js/modules/es6.reflect.own-keys.js","./modules/es6.reflect.prevent-extensions":"node_modules/core-js/modules/es6.reflect.prevent-extensions.js","./modules/es6.reflect.set":"node_modules/core-js/modules/es6.reflect.set.js","./modules/es6.reflect.set-prototype-of":"node_modules/core-js/modules/es6.reflect.set-prototype-of.js","./modules/es7.array.includes":"node_modules/core-js/modules/es7.array.includes.js","./modules/es7.array.flat-map":"node_modules/core-js/modules/es7.array.flat-map.js","./modules/es7.array.flatten":"node_modules/core-js/modules/es7.array.flatten.js","./modules/es7.string.at":"node_modules/core-js/modules/es7.string.at.js","./modules/es7.string.pad-start":"node_modules/core-js/modules/es7.string.pad-start.js","./modules/es7.string.pad-end":"node_modules/core-js/modules/es7.string.pad-end.js","./modules/es7.string.trim-left":"node_modules/core-js/modules/es7.string.trim-left.js","./modules/es7.string.trim-right":"node_modules/core-js/modules/es7.string.trim-right.js","./modules/es7.string.match-all":"node_modules/core-js/modules/es7.string.match-all.js","./modules/es7.symbol.async-iterator":"node_modules/core-js/modules/es7.symbol.async-iterator.js","./modules/es7.symbol.observable":"node_modules/core-js/modules/es7.symbol.observable.js","./modules/es7.object.get-own-property-descriptors":"node_modules/core-js/modules/es7.object.get-own-property-descriptors.js","./modules/es7.object.values":"node_modules/core-js/modules/es7.object.values.js","./modules/es7.object.entries":"node_modules/core-js/modules/es7.object.entries.js","./modules/es7.object.define-getter":"node_modules/core-js/modules/es7.object.define-getter.js","./modules/es7.object.define-setter":"node_modules/core-js/modules/es7.object.define-setter.js","./modules/es7.object.lookup-getter":"node_modules/core-js/modules/es7.object.lookup-getter.js","./modules/es7.object.lookup-setter":"node_modules/core-js/modules/es7.object.lookup-setter.js","./modules/es7.map.to-json":"node_modules/core-js/modules/es7.map.to-json.js","./modules/es7.set.to-json":"node_modules/core-js/modules/es7.set.to-json.js","./modules/es7.map.of":"node_modules/core-js/modules/es7.map.of.js","./modules/es7.set.of":"node_modules/core-js/modules/es7.set.of.js","./modules/es7.weak-map.of":"node_modules/core-js/modules/es7.weak-map.of.js","./modules/es7.weak-set.of":"node_modules/core-js/modules/es7.weak-set.of.js","./modules/es7.map.from":"node_modules/core-js/modules/es7.map.from.js","./modules/es7.set.from":"node_modules/core-js/modules/es7.set.from.js","./modules/es7.weak-map.from":"node_modules/core-js/modules/es7.weak-map.from.js","./modules/es7.weak-set.from":"node_modules/core-js/modules/es7.weak-set.from.js","./modules/es7.global":"node_modules/core-js/modules/es7.global.js","./modules/es7.system.global":"node_modules/core-js/modules/es7.system.global.js","./modules/es7.error.is-error":"node_modules/core-js/modules/es7.error.is-error.js","./modules/es7.math.clamp":"node_modules/core-js/modules/es7.math.clamp.js","./modules/es7.math.deg-per-rad":"node_modules/core-js/modules/es7.math.deg-per-rad.js","./modules/es7.math.degrees":"node_modules/core-js/modules/es7.math.degrees.js","./modules/es7.math.fscale":"node_modules/core-js/modules/es7.math.fscale.js","./modules/es7.math.iaddh":"node_modules/core-js/modules/es7.math.iaddh.js","./modules/es7.math.isubh":"node_modules/core-js/modules/es7.math.isubh.js","./modules/es7.math.imulh":"node_modules/core-js/modules/es7.math.imulh.js","./modules/es7.math.rad-per-deg":"node_modules/core-js/modules/es7.math.rad-per-deg.js","./modules/es7.math.radians":"node_modules/core-js/modules/es7.math.radians.js","./modules/es7.math.scale":"node_modules/core-js/modules/es7.math.scale.js","./modules/es7.math.umulh":"node_modules/core-js/modules/es7.math.umulh.js","./modules/es7.math.signbit":"node_modules/core-js/modules/es7.math.signbit.js","./modules/es7.promise.finally":"node_modules/core-js/modules/es7.promise.finally.js","./modules/es7.promise.try":"node_modules/core-js/modules/es7.promise.try.js","./modules/es7.reflect.define-metadata":"node_modules/core-js/modules/es7.reflect.define-metadata.js","./modules/es7.reflect.delete-metadata":"node_modules/core-js/modules/es7.reflect.delete-metadata.js","./modules/es7.reflect.get-metadata":"node_modules/core-js/modules/es7.reflect.get-metadata.js","./modules/es7.reflect.get-metadata-keys":"node_modules/core-js/modules/es7.reflect.get-metadata-keys.js","./modules/es7.reflect.get-own-metadata":"node_modules/core-js/modules/es7.reflect.get-own-metadata.js","./modules/es7.reflect.get-own-metadata-keys":"node_modules/core-js/modules/es7.reflect.get-own-metadata-keys.js","./modules/es7.reflect.has-metadata":"node_modules/core-js/modules/es7.reflect.has-metadata.js","./modules/es7.reflect.has-own-metadata":"node_modules/core-js/modules/es7.reflect.has-own-metadata.js","./modules/es7.reflect.metadata":"node_modules/core-js/modules/es7.reflect.metadata.js","./modules/es7.asap":"node_modules/core-js/modules/es7.asap.js","./modules/es7.observable":"node_modules/core-js/modules/es7.observable.js","./modules/web.timers":"node_modules/core-js/modules/web.timers.js","./modules/web.immediate":"node_modules/core-js/modules/web.immediate.js","./modules/web.dom.iterable":"node_modules/core-js/modules/web.dom.iterable.js","./modules/_core":"node_modules/core-js/modules/_core.js"}],"node_modules/babel-polyfill/node_modules/regenerator-runtime/runtime.js":[function(require,module,exports) {
var global = arguments[3];
/**
 * Copyright (c) 2014, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * https://raw.github.com/facebook/regenerator/master/LICENSE file. An
 * additional grant of patent rights can be found in the PATENTS file in
 * the same directory.
 */

!(function(global) {
  "use strict";

  var Op = Object.prototype;
  var hasOwn = Op.hasOwnProperty;
  var undefined; // More compressible than void 0.
  var $Symbol = typeof Symbol === "function" ? Symbol : {};
  var iteratorSymbol = $Symbol.iterator || "@@iterator";
  var asyncIteratorSymbol = $Symbol.asyncIterator || "@@asyncIterator";
  var toStringTagSymbol = $Symbol.toStringTag || "@@toStringTag";

  var inModule = typeof module === "object";
  var runtime = global.regeneratorRuntime;
  if (runtime) {
    if (inModule) {
      // If regeneratorRuntime is defined globally and we're in a module,
      // make the exports object identical to regeneratorRuntime.
      module.exports = runtime;
    }
    // Don't bother evaluating the rest of this file if the runtime was
    // already defined globally.
    return;
  }

  // Define the runtime globally (as expected by generated code) as either
  // module.exports (if we're in a module) or a new, empty object.
  runtime = global.regeneratorRuntime = inModule ? module.exports : {};

  function wrap(innerFn, outerFn, self, tryLocsList) {
    // If outerFn provided and outerFn.prototype is a Generator, then outerFn.prototype instanceof Generator.
    var protoGenerator = outerFn && outerFn.prototype instanceof Generator ? outerFn : Generator;
    var generator = Object.create(protoGenerator.prototype);
    var context = new Context(tryLocsList || []);

    // The ._invoke method unifies the implementations of the .next,
    // .throw, and .return methods.
    generator._invoke = makeInvokeMethod(innerFn, self, context);

    return generator;
  }
  runtime.wrap = wrap;

  // Try/catch helper to minimize deoptimizations. Returns a completion
  // record like context.tryEntries[i].completion. This interface could
  // have been (and was previously) designed to take a closure to be
  // invoked without arguments, but in all the cases we care about we
  // already have an existing method we want to call, so there's no need
  // to create a new function object. We can even get away with assuming
  // the method takes exactly one argument, since that happens to be true
  // in every case, so we don't have to touch the arguments object. The
  // only additional allocation required is the completion record, which
  // has a stable shape and so hopefully should be cheap to allocate.
  function tryCatch(fn, obj, arg) {
    try {
      return { type: "normal", arg: fn.call(obj, arg) };
    } catch (err) {
      return { type: "throw", arg: err };
    }
  }

  var GenStateSuspendedStart = "suspendedStart";
  var GenStateSuspendedYield = "suspendedYield";
  var GenStateExecuting = "executing";
  var GenStateCompleted = "completed";

  // Returning this object from the innerFn has the same effect as
  // breaking out of the dispatch switch statement.
  var ContinueSentinel = {};

  // Dummy constructor functions that we use as the .constructor and
  // .constructor.prototype properties for functions that return Generator
  // objects. For full spec compliance, you may wish to configure your
  // minifier not to mangle the names of these two functions.
  function Generator() {}
  function GeneratorFunction() {}
  function GeneratorFunctionPrototype() {}

  // This is a polyfill for %IteratorPrototype% for environments that
  // don't natively support it.
  var IteratorPrototype = {};
  IteratorPrototype[iteratorSymbol] = function () {
    return this;
  };

  var getProto = Object.getPrototypeOf;
  var NativeIteratorPrototype = getProto && getProto(getProto(values([])));
  if (NativeIteratorPrototype &&
      NativeIteratorPrototype !== Op &&
      hasOwn.call(NativeIteratorPrototype, iteratorSymbol)) {
    // This environment has a native %IteratorPrototype%; use it instead
    // of the polyfill.
    IteratorPrototype = NativeIteratorPrototype;
  }

  var Gp = GeneratorFunctionPrototype.prototype =
    Generator.prototype = Object.create(IteratorPrototype);
  GeneratorFunction.prototype = Gp.constructor = GeneratorFunctionPrototype;
  GeneratorFunctionPrototype.constructor = GeneratorFunction;
  GeneratorFunctionPrototype[toStringTagSymbol] =
    GeneratorFunction.displayName = "GeneratorFunction";

  // Helper for defining the .next, .throw, and .return methods of the
  // Iterator interface in terms of a single ._invoke method.
  function defineIteratorMethods(prototype) {
    ["next", "throw", "return"].forEach(function(method) {
      prototype[method] = function(arg) {
        return this._invoke(method, arg);
      };
    });
  }

  runtime.isGeneratorFunction = function(genFun) {
    var ctor = typeof genFun === "function" && genFun.constructor;
    return ctor
      ? ctor === GeneratorFunction ||
        // For the native GeneratorFunction constructor, the best we can
        // do is to check its .name property.
        (ctor.displayName || ctor.name) === "GeneratorFunction"
      : false;
  };

  runtime.mark = function(genFun) {
    if (Object.setPrototypeOf) {
      Object.setPrototypeOf(genFun, GeneratorFunctionPrototype);
    } else {
      genFun.__proto__ = GeneratorFunctionPrototype;
      if (!(toStringTagSymbol in genFun)) {
        genFun[toStringTagSymbol] = "GeneratorFunction";
      }
    }
    genFun.prototype = Object.create(Gp);
    return genFun;
  };

  // Within the body of any async function, `await x` is transformed to
  // `yield regeneratorRuntime.awrap(x)`, so that the runtime can test
  // `hasOwn.call(value, "__await")` to determine if the yielded value is
  // meant to be awaited.
  runtime.awrap = function(arg) {
    return { __await: arg };
  };

  function AsyncIterator(generator) {
    function invoke(method, arg, resolve, reject) {
      var record = tryCatch(generator[method], generator, arg);
      if (record.type === "throw") {
        reject(record.arg);
      } else {
        var result = record.arg;
        var value = result.value;
        if (value &&
            typeof value === "object" &&
            hasOwn.call(value, "__await")) {
          return Promise.resolve(value.__await).then(function(value) {
            invoke("next", value, resolve, reject);
          }, function(err) {
            invoke("throw", err, resolve, reject);
          });
        }

        return Promise.resolve(value).then(function(unwrapped) {
          // When a yielded Promise is resolved, its final value becomes
          // the .value of the Promise<{value,done}> result for the
          // current iteration. If the Promise is rejected, however, the
          // result for this iteration will be rejected with the same
          // reason. Note that rejections of yielded Promises are not
          // thrown back into the generator function, as is the case
          // when an awaited Promise is rejected. This difference in
          // behavior between yield and await is important, because it
          // allows the consumer to decide what to do with the yielded
          // rejection (swallow it and continue, manually .throw it back
          // into the generator, abandon iteration, whatever). With
          // await, by contrast, there is no opportunity to examine the
          // rejection reason outside the generator function, so the
          // only option is to throw it from the await expression, and
          // let the generator function handle the exception.
          result.value = unwrapped;
          resolve(result);
        }, reject);
      }
    }

    if (typeof global.process === "object" && global.process.domain) {
      invoke = global.process.domain.bind(invoke);
    }

    var previousPromise;

    function enqueue(method, arg) {
      function callInvokeWithMethodAndArg() {
        return new Promise(function(resolve, reject) {
          invoke(method, arg, resolve, reject);
        });
      }

      return previousPromise =
        // If enqueue has been called before, then we want to wait until
        // all previous Promises have been resolved before calling invoke,
        // so that results are always delivered in the correct order. If
        // enqueue has not been called before, then it is important to
        // call invoke immediately, without waiting on a callback to fire,
        // so that the async generator function has the opportunity to do
        // any necessary setup in a predictable way. This predictability
        // is why the Promise constructor synchronously invokes its
        // executor callback, and why async functions synchronously
        // execute code before the first await. Since we implement simple
        // async functions in terms of async generators, it is especially
        // important to get this right, even though it requires care.
        previousPromise ? previousPromise.then(
          callInvokeWithMethodAndArg,
          // Avoid propagating failures to Promises returned by later
          // invocations of the iterator.
          callInvokeWithMethodAndArg
        ) : callInvokeWithMethodAndArg();
    }

    // Define the unified helper method that is used to implement .next,
    // .throw, and .return (see defineIteratorMethods).
    this._invoke = enqueue;
  }

  defineIteratorMethods(AsyncIterator.prototype);
  AsyncIterator.prototype[asyncIteratorSymbol] = function () {
    return this;
  };
  runtime.AsyncIterator = AsyncIterator;

  // Note that simple async functions are implemented on top of
  // AsyncIterator objects; they just return a Promise for the value of
  // the final result produced by the iterator.
  runtime.async = function(innerFn, outerFn, self, tryLocsList) {
    var iter = new AsyncIterator(
      wrap(innerFn, outerFn, self, tryLocsList)
    );

    return runtime.isGeneratorFunction(outerFn)
      ? iter // If outerFn is a generator, return the full iterator.
      : iter.next().then(function(result) {
          return result.done ? result.value : iter.next();
        });
  };

  function makeInvokeMethod(innerFn, self, context) {
    var state = GenStateSuspendedStart;

    return function invoke(method, arg) {
      if (state === GenStateExecuting) {
        throw new Error("Generator is already running");
      }

      if (state === GenStateCompleted) {
        if (method === "throw") {
          throw arg;
        }

        // Be forgiving, per 25.3.3.3.3 of the spec:
        // https://people.mozilla.org/~jorendorff/es6-draft.html#sec-generatorresume
        return doneResult();
      }

      context.method = method;
      context.arg = arg;

      while (true) {
        var delegate = context.delegate;
        if (delegate) {
          var delegateResult = maybeInvokeDelegate(delegate, context);
          if (delegateResult) {
            if (delegateResult === ContinueSentinel) continue;
            return delegateResult;
          }
        }

        if (context.method === "next") {
          // Setting context._sent for legacy support of Babel's
          // function.sent implementation.
          context.sent = context._sent = context.arg;

        } else if (context.method === "throw") {
          if (state === GenStateSuspendedStart) {
            state = GenStateCompleted;
            throw context.arg;
          }

          context.dispatchException(context.arg);

        } else if (context.method === "return") {
          context.abrupt("return", context.arg);
        }

        state = GenStateExecuting;

        var record = tryCatch(innerFn, self, context);
        if (record.type === "normal") {
          // If an exception is thrown from innerFn, we leave state ===
          // GenStateExecuting and loop back for another invocation.
          state = context.done
            ? GenStateCompleted
            : GenStateSuspendedYield;

          if (record.arg === ContinueSentinel) {
            continue;
          }

          return {
            value: record.arg,
            done: context.done
          };

        } else if (record.type === "throw") {
          state = GenStateCompleted;
          // Dispatch the exception by looping back around to the
          // context.dispatchException(context.arg) call above.
          context.method = "throw";
          context.arg = record.arg;
        }
      }
    };
  }

  // Call delegate.iterator[context.method](context.arg) and handle the
  // result, either by returning a { value, done } result from the
  // delegate iterator, or by modifying context.method and context.arg,
  // setting context.delegate to null, and returning the ContinueSentinel.
  function maybeInvokeDelegate(delegate, context) {
    var method = delegate.iterator[context.method];
    if (method === undefined) {
      // A .throw or .return when the delegate iterator has no .throw
      // method always terminates the yield* loop.
      context.delegate = null;

      if (context.method === "throw") {
        if (delegate.iterator.return) {
          // If the delegate iterator has a return method, give it a
          // chance to clean up.
          context.method = "return";
          context.arg = undefined;
          maybeInvokeDelegate(delegate, context);

          if (context.method === "throw") {
            // If maybeInvokeDelegate(context) changed context.method from
            // "return" to "throw", let that override the TypeError below.
            return ContinueSentinel;
          }
        }

        context.method = "throw";
        context.arg = new TypeError(
          "The iterator does not provide a 'throw' method");
      }

      return ContinueSentinel;
    }

    var record = tryCatch(method, delegate.iterator, context.arg);

    if (record.type === "throw") {
      context.method = "throw";
      context.arg = record.arg;
      context.delegate = null;
      return ContinueSentinel;
    }

    var info = record.arg;

    if (! info) {
      context.method = "throw";
      context.arg = new TypeError("iterator result is not an object");
      context.delegate = null;
      return ContinueSentinel;
    }

    if (info.done) {
      // Assign the result of the finished delegate to the temporary
      // variable specified by delegate.resultName (see delegateYield).
      context[delegate.resultName] = info.value;

      // Resume execution at the desired location (see delegateYield).
      context.next = delegate.nextLoc;

      // If context.method was "throw" but the delegate handled the
      // exception, let the outer generator proceed normally. If
      // context.method was "next", forget context.arg since it has been
      // "consumed" by the delegate iterator. If context.method was
      // "return", allow the original .return call to continue in the
      // outer generator.
      if (context.method !== "return") {
        context.method = "next";
        context.arg = undefined;
      }

    } else {
      // Re-yield the result returned by the delegate method.
      return info;
    }

    // The delegate iterator is finished, so forget it and continue with
    // the outer generator.
    context.delegate = null;
    return ContinueSentinel;
  }

  // Define Generator.prototype.{next,throw,return} in terms of the
  // unified ._invoke helper method.
  defineIteratorMethods(Gp);

  Gp[toStringTagSymbol] = "Generator";

  // A Generator should always return itself as the iterator object when the
  // @@iterator function is called on it. Some browsers' implementations of the
  // iterator prototype chain incorrectly implement this, causing the Generator
  // object to not be returned from this call. This ensures that doesn't happen.
  // See https://github.com/facebook/regenerator/issues/274 for more details.
  Gp[iteratorSymbol] = function() {
    return this;
  };

  Gp.toString = function() {
    return "[object Generator]";
  };

  function pushTryEntry(locs) {
    var entry = { tryLoc: locs[0] };

    if (1 in locs) {
      entry.catchLoc = locs[1];
    }

    if (2 in locs) {
      entry.finallyLoc = locs[2];
      entry.afterLoc = locs[3];
    }

    this.tryEntries.push(entry);
  }

  function resetTryEntry(entry) {
    var record = entry.completion || {};
    record.type = "normal";
    delete record.arg;
    entry.completion = record;
  }

  function Context(tryLocsList) {
    // The root entry object (effectively a try statement without a catch
    // or a finally block) gives us a place to store values thrown from
    // locations where there is no enclosing try statement.
    this.tryEntries = [{ tryLoc: "root" }];
    tryLocsList.forEach(pushTryEntry, this);
    this.reset(true);
  }

  runtime.keys = function(object) {
    var keys = [];
    for (var key in object) {
      keys.push(key);
    }
    keys.reverse();

    // Rather than returning an object with a next method, we keep
    // things simple and return the next function itself.
    return function next() {
      while (keys.length) {
        var key = keys.pop();
        if (key in object) {
          next.value = key;
          next.done = false;
          return next;
        }
      }

      // To avoid creating an additional object, we just hang the .value
      // and .done properties off the next function object itself. This
      // also ensures that the minifier will not anonymize the function.
      next.done = true;
      return next;
    };
  };

  function values(iterable) {
    if (iterable) {
      var iteratorMethod = iterable[iteratorSymbol];
      if (iteratorMethod) {
        return iteratorMethod.call(iterable);
      }

      if (typeof iterable.next === "function") {
        return iterable;
      }

      if (!isNaN(iterable.length)) {
        var i = -1, next = function next() {
          while (++i < iterable.length) {
            if (hasOwn.call(iterable, i)) {
              next.value = iterable[i];
              next.done = false;
              return next;
            }
          }

          next.value = undefined;
          next.done = true;

          return next;
        };

        return next.next = next;
      }
    }

    // Return an iterator with no values.
    return { next: doneResult };
  }
  runtime.values = values;

  function doneResult() {
    return { value: undefined, done: true };
  }

  Context.prototype = {
    constructor: Context,

    reset: function(skipTempReset) {
      this.prev = 0;
      this.next = 0;
      // Resetting context._sent for legacy support of Babel's
      // function.sent implementation.
      this.sent = this._sent = undefined;
      this.done = false;
      this.delegate = null;

      this.method = "next";
      this.arg = undefined;

      this.tryEntries.forEach(resetTryEntry);

      if (!skipTempReset) {
        for (var name in this) {
          // Not sure about the optimal order of these conditions:
          if (name.charAt(0) === "t" &&
              hasOwn.call(this, name) &&
              !isNaN(+name.slice(1))) {
            this[name] = undefined;
          }
        }
      }
    },

    stop: function() {
      this.done = true;

      var rootEntry = this.tryEntries[0];
      var rootRecord = rootEntry.completion;
      if (rootRecord.type === "throw") {
        throw rootRecord.arg;
      }

      return this.rval;
    },

    dispatchException: function(exception) {
      if (this.done) {
        throw exception;
      }

      var context = this;
      function handle(loc, caught) {
        record.type = "throw";
        record.arg = exception;
        context.next = loc;

        if (caught) {
          // If the dispatched exception was caught by a catch block,
          // then let that catch block handle the exception normally.
          context.method = "next";
          context.arg = undefined;
        }

        return !! caught;
      }

      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];
        var record = entry.completion;

        if (entry.tryLoc === "root") {
          // Exception thrown outside of any try block that could handle
          // it, so set the completion value of the entire function to
          // throw the exception.
          return handle("end");
        }

        if (entry.tryLoc <= this.prev) {
          var hasCatch = hasOwn.call(entry, "catchLoc");
          var hasFinally = hasOwn.call(entry, "finallyLoc");

          if (hasCatch && hasFinally) {
            if (this.prev < entry.catchLoc) {
              return handle(entry.catchLoc, true);
            } else if (this.prev < entry.finallyLoc) {
              return handle(entry.finallyLoc);
            }

          } else if (hasCatch) {
            if (this.prev < entry.catchLoc) {
              return handle(entry.catchLoc, true);
            }

          } else if (hasFinally) {
            if (this.prev < entry.finallyLoc) {
              return handle(entry.finallyLoc);
            }

          } else {
            throw new Error("try statement without catch or finally");
          }
        }
      }
    },

    abrupt: function(type, arg) {
      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];
        if (entry.tryLoc <= this.prev &&
            hasOwn.call(entry, "finallyLoc") &&
            this.prev < entry.finallyLoc) {
          var finallyEntry = entry;
          break;
        }
      }

      if (finallyEntry &&
          (type === "break" ||
           type === "continue") &&
          finallyEntry.tryLoc <= arg &&
          arg <= finallyEntry.finallyLoc) {
        // Ignore the finally entry if control is not jumping to a
        // location outside the try/catch block.
        finallyEntry = null;
      }

      var record = finallyEntry ? finallyEntry.completion : {};
      record.type = type;
      record.arg = arg;

      if (finallyEntry) {
        this.method = "next";
        this.next = finallyEntry.finallyLoc;
        return ContinueSentinel;
      }

      return this.complete(record);
    },

    complete: function(record, afterLoc) {
      if (record.type === "throw") {
        throw record.arg;
      }

      if (record.type === "break" ||
          record.type === "continue") {
        this.next = record.arg;
      } else if (record.type === "return") {
        this.rval = this.arg = record.arg;
        this.method = "return";
        this.next = "end";
      } else if (record.type === "normal" && afterLoc) {
        this.next = afterLoc;
      }

      return ContinueSentinel;
    },

    finish: function(finallyLoc) {
      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];
        if (entry.finallyLoc === finallyLoc) {
          this.complete(entry.completion, entry.afterLoc);
          resetTryEntry(entry);
          return ContinueSentinel;
        }
      }
    },

    "catch": function(tryLoc) {
      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];
        if (entry.tryLoc === tryLoc) {
          var record = entry.completion;
          if (record.type === "throw") {
            var thrown = record.arg;
            resetTryEntry(entry);
          }
          return thrown;
        }
      }

      // The context.catch method must only be called with a location
      // argument that corresponds to a known catch block.
      throw new Error("illegal catch attempt");
    },

    delegateYield: function(iterable, resultName, nextLoc) {
      this.delegate = {
        iterator: values(iterable),
        resultName: resultName,
        nextLoc: nextLoc
      };

      if (this.method === "next") {
        // Deliberately forget the last sent value so that we don't
        // accidentally pass it on to the delegate.
        this.arg = undefined;
      }

      return ContinueSentinel;
    }
  };
})(
  // Among the various tricks for obtaining a reference to the global
  // object, this seems to be the most reliable technique that does not
  // use indirect eval (which violates Content Security Policy).
  typeof global === "object" ? global :
  typeof window === "object" ? window :
  typeof self === "object" ? self : this
);

},{}],"node_modules/core-js/modules/_replacer.js":[function(require,module,exports) {
module.exports = function (regExp, replace) {
  var replacer = replace === Object(replace) ? function (part) {
    return replace[part];
  } : replace;
  return function (it) {
    return String(it).replace(regExp, replacer);
  };
};

},{}],"node_modules/core-js/modules/core.regexp.escape.js":[function(require,module,exports) {
// https://github.com/benjamingr/RexExp.escape
var $export = require('./_export');
var $re = require('./_replacer')(/[\\^$*+?.()|[\]{}]/g, '\\$&');

$export($export.S, 'RegExp', { escape: function escape(it) { return $re(it); } });

},{"./_export":"node_modules/core-js/modules/_export.js","./_replacer":"node_modules/core-js/modules/_replacer.js"}],"node_modules/core-js/fn/regexp/escape.js":[function(require,module,exports) {
require('../../modules/core.regexp.escape');
module.exports = require('../../modules/_core').RegExp.escape;

},{"../../modules/core.regexp.escape":"node_modules/core-js/modules/core.regexp.escape.js","../../modules/_core":"node_modules/core-js/modules/_core.js"}],"node_modules/babel-polyfill/lib/index.js":[function(require,module,exports) {
var global = arguments[3];

"use strict";

require("core-js/shim");

require("regenerator-runtime/runtime");

require("core-js/fn/regexp/escape");

if (global._babelPolyfill) {
  throw new Error("only one instance of babel-polyfill is allowed");
}
global._babelPolyfill = true;

var DEFINE_PROPERTY = "defineProperty";
function define(O, key, value) {
  O[key] || Object[DEFINE_PROPERTY](O, key, {
    writable: true,
    configurable: true,
    value: value
  });
}

define(String.prototype, "padLeft", "".padStart);
define(String.prototype, "padRight", "".padEnd);

"pop,reverse,shift,keys,values,entries,indexOf,every,some,forEach,map,filter,find,findIndex,includes,join,slice,concat,push,splice,unshift,sort,lastIndexOf,reduce,reduceRight,copyWithin,fill".split(",").forEach(function (key) {
  [][key] && define(Array, key, Function.call.bind([][key]));
});
},{"core-js/shim":"node_modules/core-js/shim.js","regenerator-runtime/runtime":"node_modules/babel-polyfill/node_modules/regenerator-runtime/runtime.js","core-js/fn/regexp/escape":"node_modules/core-js/fn/regexp/escape.js"}],"node_modules/gsap/TweenLite.js":[function(require,module,exports) {
var global = arguments[3];
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.EventDispatcher = exports.TweenPlugin = exports.Power4 = exports.Power3 = exports.Power2 = exports.Power1 = exports.Power0 = exports.Linear = exports.Ease = exports.Animation = exports.SimpleTimeline = exports.globals = exports.default = exports.TweenLite = exports._gsScope = void 0;

/*!
 * VERSION: 2.0.2
 * DATE: 2018-08-27
 * UPDATES AND DOCS AT: http://greensock.com
 *
 * @license Copyright (c) 2008-2018, GreenSock. All rights reserved.
 * This work is subject to the terms at http://greensock.com/standard-license or for
 * Club GreenSock members, the software agreement that was issued with your membership.
 *
 * @author: Jack Doyle, jack@greensock.com
 */

/* ES6 changes:
	- declare and export _gsScope at top.
	- set var TweenLite = the result of the main function
	- export default TweenLite at the bottom
	- return TweenLite at the bottom of the main function
	- pass in _gsScope as the first parameter of the main function (which is actually at the bottom)
	- remove the "export to multiple environments" in Definition().
 */
var _gsScope = typeof window !== "undefined" ? window : typeof module !== "undefined" && module.exports && typeof global !== "undefined" ? global : void 0 || {};

exports._gsScope = _gsScope;

var TweenLite = function (window, moduleName) {
  "use strict";

  var _exports = {},
      _doc = window.document,
      _globals = window.GreenSockGlobals = window.GreenSockGlobals || window;

  if (_globals.TweenLite) {
    return _globals.TweenLite; //in case the core set of classes is already loaded, don't instantiate twice.
  }

  var _namespace = function (ns) {
    var a = ns.split("."),
        p = _globals,
        i;

    for (i = 0; i < a.length; i++) {
      p[a[i]] = p = p[a[i]] || {};
    }

    return p;
  },
      gs = _namespace("com.greensock"),
      _tinyNum = 0.0000000001,
      _slice = function (a) {
    //don't use Array.prototype.slice.call(target, 0) because that doesn't work in IE8 with a NodeList that's returned by querySelectorAll()
    var b = [],
        l = a.length,
        i;

    for (i = 0; i !== l; b.push(a[i++])) {}

    return b;
  },
      _emptyFunc = function () {},
      _isArray = function () {
    //works around issues in iframe environments where the Array global isn't shared, thus if the object originates in a different window/iframe, "(obj instanceof Array)" will evaluate false. We added some speed optimizations to avoid Object.prototype.toString.call() unless it's absolutely necessary because it's VERY slow (like 20x slower)
    var toString = Object.prototype.toString,
        array = toString.call([]);
    return function (obj) {
      return obj != null && (obj instanceof Array || typeof obj === "object" && !!obj.push && toString.call(obj) === array);
    };
  }(),
      a,
      i,
      p,
      _ticker,
      _tickerActive,
      _defLookup = {},

  /**
   * @constructor
   * Defines a GreenSock class, optionally with an array of dependencies that must be instantiated first and passed into the definition.
   * This allows users to load GreenSock JS files in any order even if they have interdependencies (like CSSPlugin extends TweenPlugin which is
   * inside TweenLite.js, but if CSSPlugin is loaded first, it should wait to run its code until TweenLite.js loads and instantiates TweenPlugin
   * and then pass TweenPlugin to CSSPlugin's definition). This is all done automatically and internally.
   *
   * Every definition will be added to a "com.greensock" global object (typically window, but if a window.GreenSockGlobals object is found,
   * it will go there as of v1.7). For example, TweenLite will be found at window.com.greensock.TweenLite and since it's a global class that should be available anywhere,
   * it is ALSO referenced at window.TweenLite. However some classes aren't considered global, like the base com.greensock.core.Animation class, so
   * those will only be at the package like window.com.greensock.core.Animation. Again, if you define a GreenSockGlobals object on the window, everything
   * gets tucked neatly inside there instead of on the window directly. This allows you to do advanced things like load multiple versions of GreenSock
   * files and put them into distinct objects (imagine a banner ad uses a newer version but the main site uses an older one). In that case, you could
   * sandbox the banner one like:
   *
   * <script>
   *     var gs = window.GreenSockGlobals = {}; //the newer version we're about to load could now be referenced in a "gs" object, like gs.TweenLite.to(...). Use whatever alias you want as long as it's unique, "gs" or "banner" or whatever.
   * </script>
   * <script src="js/greensock/v1.7/TweenMax.js"></script>
   * <script>
   *     window.GreenSockGlobals = window._gsQueue = window._gsDefine = null; //reset it back to null (along with the special _gsQueue variable) so that the next load of TweenMax affects the window and we can reference things directly like TweenLite.to(...)
   * </script>
   * <script src="js/greensock/v1.6/TweenMax.js"></script>
   * <script>
   *     gs.TweenLite.to(...); //would use v1.7
   *     TweenLite.to(...); //would use v1.6
   * </script>
   *
   * @param {!string} ns The namespace of the class definition, leaving off "com.greensock." as that's assumed. For example, "TweenLite" or "plugins.CSSPlugin" or "easing.Back".
   * @param {!Array.<string>} dependencies An array of dependencies (described as their namespaces minus "com.greensock." prefix). For example ["TweenLite","plugins.TweenPlugin","core.Animation"]
   * @param {!function():Object} func The function that should be called and passed the resolved dependencies which will return the actual class for this definition.
   * @param {boolean=} global If true, the class will be added to the global scope (typically window unless you define a window.GreenSockGlobals object)
   */
  Definition = function (ns, dependencies, func, global) {
    this.sc = _defLookup[ns] ? _defLookup[ns].sc : []; //subclasses

    _defLookup[ns] = this;
    this.gsClass = null;
    this.func = func;
    var _classes = [];

    this.check = function (init) {
      var i = dependencies.length,
          missing = i,
          cur,
          a,
          n,
          cl;

      while (--i > -1) {
        if ((cur = _defLookup[dependencies[i]] || new Definition(dependencies[i], [])).gsClass) {
          _classes[i] = cur.gsClass;
          missing--;
        } else if (init) {
          cur.sc.push(this);
        }
      }

      if (missing === 0 && func) {
        a = ("com.greensock." + ns).split(".");
        n = a.pop();
        cl = _namespace(a.join("."))[n] = this.gsClass = func.apply(func, _classes); //exports to multiple environments

        if (global) {
          _globals[n] = _exports[n] = cl; //provides a way to avoid global namespace pollution. By default, the main classes like TweenLite, Power1, Strong, etc. are added to window unless a GreenSockGlobals is defined. So if you want to have things added to a custom object instead, just do something like window.GreenSockGlobals = {} before loading any GreenSock files. You can even set up an alias like window.GreenSockGlobals = windows.gs = {} so that you can access everything like gs.TweenLite. Also remember that ALL classes are added to the window.com.greensock object (in their respective packages, like com.greensock.easing.Power1, com.greensock.TweenLite, etc.)

          /*
          if (typeof(module) !== "undefined" && module.exports) { //node
          	if (ns === moduleName) {
          		module.exports = _exports[moduleName] = cl;
          		for (i in _exports) {
          			cl[i] = _exports[i];
          		}
          	} else if (_exports[moduleName]) {
          		_exports[moduleName][n] = cl;
          	}
          } else if (typeof(define) === "function" && define.amd){ //AMD
          	define((window.GreenSockAMDPath ? window.GreenSockAMDPath + "/" : "") + ns.split(".").pop(), [], function() { return cl; });
          }
          */
        }

        for (i = 0; i < this.sc.length; i++) {
          this.sc[i].check();
        }
      }
    };

    this.check(true);
  },
      //used to create Definition instances (which basically registers a class that has dependencies).
  _gsDefine = window._gsDefine = function (ns, dependencies, func, global) {
    return new Definition(ns, dependencies, func, global);
  },
      //a quick way to create a class that doesn't have any dependencies. Returns the class, but first registers it in the GreenSock namespace so that other classes can grab it (other classes might be dependent on the class).
  _class = gs._class = function (ns, func, global) {
    func = func || function () {};

    _gsDefine(ns, [], function () {
      return func;
    }, global);

    return func;
  };

  _gsDefine.globals = _globals;
  /*
   * ----------------------------------------------------------------
   * Ease
   * ----------------------------------------------------------------
   */

  var _baseParams = [0, 0, 1, 1],
      Ease = _class("easing.Ease", function (func, extraParams, type, power) {
    this._func = func;
    this._type = type || 0;
    this._power = power || 0;
    this._params = extraParams ? _baseParams.concat(extraParams) : _baseParams;
  }, true),
      _easeMap = Ease.map = {},
      _easeReg = Ease.register = function (ease, names, types, create) {
    var na = names.split(","),
        i = na.length,
        ta = (types || "easeIn,easeOut,easeInOut").split(","),
        e,
        name,
        j,
        type;

    while (--i > -1) {
      name = na[i];
      e = create ? _class("easing." + name, null, true) : gs.easing[name] || {};
      j = ta.length;

      while (--j > -1) {
        type = ta[j];
        _easeMap[name + "." + type] = _easeMap[type + name] = e[type] = ease.getRatio ? ease : ease[type] || new ease();
      }
    }
  };

  p = Ease.prototype;
  p._calcEnd = false;

  p.getRatio = function (p) {
    if (this._func) {
      this._params[0] = p;
      return this._func.apply(null, this._params);
    }

    var t = this._type,
        pw = this._power,
        r = t === 1 ? 1 - p : t === 2 ? p : p < 0.5 ? p * 2 : (1 - p) * 2;

    if (pw === 1) {
      r *= r;
    } else if (pw === 2) {
      r *= r * r;
    } else if (pw === 3) {
      r *= r * r * r;
    } else if (pw === 4) {
      r *= r * r * r * r;
    }

    return t === 1 ? 1 - r : t === 2 ? r : p < 0.5 ? r / 2 : 1 - r / 2;
  }; //create all the standard eases like Linear, Quad, Cubic, Quart, Quint, Strong, Power0, Power1, Power2, Power3, and Power4 (each with easeIn, easeOut, and easeInOut)


  a = ["Linear", "Quad", "Cubic", "Quart", "Quint,Strong"];
  i = a.length;

  while (--i > -1) {
    p = a[i] + ",Power" + i;

    _easeReg(new Ease(null, null, 1, i), p, "easeOut", true);

    _easeReg(new Ease(null, null, 2, i), p, "easeIn" + (i === 0 ? ",easeNone" : ""));

    _easeReg(new Ease(null, null, 3, i), p, "easeInOut");
  }

  _easeMap.linear = gs.easing.Linear.easeIn;
  _easeMap.swing = gs.easing.Quad.easeInOut; //for jQuery folks

  /*
   * ----------------------------------------------------------------
   * EventDispatcher
   * ----------------------------------------------------------------
   */

  var EventDispatcher = _class("events.EventDispatcher", function (target) {
    this._listeners = {};
    this._eventTarget = target || this;
  });

  p = EventDispatcher.prototype;

  p.addEventListener = function (type, callback, scope, useParam, priority) {
    priority = priority || 0;
    var list = this._listeners[type],
        index = 0,
        listener,
        i;

    if (this === _ticker && !_tickerActive) {
      _ticker.wake();
    }

    if (list == null) {
      this._listeners[type] = list = [];
    }

    i = list.length;

    while (--i > -1) {
      listener = list[i];

      if (listener.c === callback && listener.s === scope) {
        list.splice(i, 1);
      } else if (index === 0 && listener.pr < priority) {
        index = i + 1;
      }
    }

    list.splice(index, 0, {
      c: callback,
      s: scope,
      up: useParam,
      pr: priority
    });
  };

  p.removeEventListener = function (type, callback) {
    var list = this._listeners[type],
        i;

    if (list) {
      i = list.length;

      while (--i > -1) {
        if (list[i].c === callback) {
          list.splice(i, 1);
          return;
        }
      }
    }
  };

  p.dispatchEvent = function (type) {
    var list = this._listeners[type],
        i,
        t,
        listener;

    if (list) {
      i = list.length;

      if (i > 1) {
        list = list.slice(0); //in case addEventListener() is called from within a listener/callback (otherwise the index could change, resulting in a skip)
      }

      t = this._eventTarget;

      while (--i > -1) {
        listener = list[i];

        if (listener) {
          if (listener.up) {
            listener.c.call(listener.s || t, {
              type: type,
              target: t
            });
          } else {
            listener.c.call(listener.s || t);
          }
        }
      }
    }
  };
  /*
   * ----------------------------------------------------------------
   * Ticker
   * ----------------------------------------------------------------
   */


  var _reqAnimFrame = window.requestAnimationFrame,
      _cancelAnimFrame = window.cancelAnimationFrame,
      _getTime = Date.now || function () {
    return new Date().getTime();
  },
      _lastUpdate = _getTime(); //now try to determine the requestAnimationFrame and cancelAnimationFrame functions and if none are found, we'll use a setTimeout()/clearTimeout() polyfill.


  a = ["ms", "moz", "webkit", "o"];
  i = a.length;

  while (--i > -1 && !_reqAnimFrame) {
    _reqAnimFrame = window[a[i] + "RequestAnimationFrame"];
    _cancelAnimFrame = window[a[i] + "CancelAnimationFrame"] || window[a[i] + "CancelRequestAnimationFrame"];
  }

  _class("Ticker", function (fps, useRAF) {
    var _self = this,
        _startTime = _getTime(),
        _useRAF = useRAF !== false && _reqAnimFrame ? "auto" : false,
        _lagThreshold = 500,
        _adjustedLag = 33,
        _tickWord = "tick",
        //helps reduce gc burden
    _fps,
        _req,
        _id,
        _gap,
        _nextTime,
        _tick = function (manual) {
      var elapsed = _getTime() - _lastUpdate,
          overlap,
          dispatch;

      if (elapsed > _lagThreshold) {
        _startTime += elapsed - _adjustedLag;
      }

      _lastUpdate += elapsed;
      _self.time = (_lastUpdate - _startTime) / 1000;
      overlap = _self.time - _nextTime;

      if (!_fps || overlap > 0 || manual === true) {
        _self.frame++;
        _nextTime += overlap + (overlap >= _gap ? 0.004 : _gap - overlap);
        dispatch = true;
      }

      if (manual !== true) {
        //make sure the request is made before we dispatch the "tick" event so that timing is maintained. Otherwise, if processing the "tick" requires a bunch of time (like 15ms) and we're using a setTimeout() that's based on 16.7ms, it'd technically take 31.7ms between frames otherwise.
        _id = _req(_tick);
      }

      if (dispatch) {
        _self.dispatchEvent(_tickWord);
      }
    };

    EventDispatcher.call(_self);
    _self.time = _self.frame = 0;

    _self.tick = function () {
      _tick(true);
    };

    _self.lagSmoothing = function (threshold, adjustedLag) {
      if (!arguments.length) {
        //if lagSmoothing() is called with no arguments, treat it like a getter that returns a boolean indicating if it's enabled or not. This is purposely undocumented and is for internal use.
        return _lagThreshold < 1 / _tinyNum;
      }

      _lagThreshold = threshold || 1 / _tinyNum; //zero should be interpreted as basically unlimited

      _adjustedLag = Math.min(adjustedLag, _lagThreshold, 0);
    };

    _self.sleep = function () {
      if (_id == null) {
        return;
      }

      if (!_useRAF || !_cancelAnimFrame) {
        clearTimeout(_id);
      } else {
        _cancelAnimFrame(_id);
      }

      _req = _emptyFunc;
      _id = null;

      if (_self === _ticker) {
        _tickerActive = false;
      }
    };

    _self.wake = function (seamless) {
      if (_id !== null) {
        _self.sleep();
      } else if (seamless) {
        _startTime += -_lastUpdate + (_lastUpdate = _getTime());
      } else if (_self.frame > 10) {
        //don't trigger lagSmoothing if we're just waking up, and make sure that at least 10 frames have elapsed because of the iOS bug that we work around below with the 1.5-second setTimout().
        _lastUpdate = _getTime() - _lagThreshold + 5;
      }

      _req = _fps === 0 ? _emptyFunc : !_useRAF || !_reqAnimFrame ? function (f) {
        return setTimeout(f, (_nextTime - _self.time) * 1000 + 1 | 0);
      } : _reqAnimFrame;

      if (_self === _ticker) {
        _tickerActive = true;
      }

      _tick(2);
    };

    _self.fps = function (value) {
      if (!arguments.length) {
        return _fps;
      }

      _fps = value;
      _gap = 1 / (_fps || 60);
      _nextTime = this.time + _gap;

      _self.wake();
    };

    _self.useRAF = function (value) {
      if (!arguments.length) {
        return _useRAF;
      }

      _self.sleep();

      _useRAF = value;

      _self.fps(_fps);
    };

    _self.fps(fps); //a bug in iOS 6 Safari occasionally prevents the requestAnimationFrame from working initially, so we use a 1.5-second timeout that automatically falls back to setTimeout() if it senses this condition.


    setTimeout(function () {
      if (_useRAF === "auto" && _self.frame < 5 && (_doc || {}).visibilityState !== "hidden") {
        _self.useRAF(false);
      }
    }, 1500);
  });

  p = gs.Ticker.prototype = new gs.events.EventDispatcher();
  p.constructor = gs.Ticker;
  /*
   * ----------------------------------------------------------------
   * Animation
   * ----------------------------------------------------------------
   */

  var Animation = _class("core.Animation", function (duration, vars) {
    this.vars = vars = vars || {};
    this._duration = this._totalDuration = duration || 0;
    this._delay = Number(vars.delay) || 0;
    this._timeScale = 1;
    this._active = vars.immediateRender === true;
    this.data = vars.data;
    this._reversed = vars.reversed === true;

    if (!_rootTimeline) {
      return;
    }

    if (!_tickerActive) {
      //some browsers (like iOS 6 Safari) shut down JavaScript execution when the tab is disabled and they [occasionally] neglect to start up requestAnimationFrame again when returning - this code ensures that the engine starts up again properly.
      _ticker.wake();
    }

    var tl = this.vars.useFrames ? _rootFramesTimeline : _rootTimeline;
    tl.add(this, tl._time);

    if (this.vars.paused) {
      this.paused(true);
    }
  });

  _ticker = Animation.ticker = new gs.Ticker();
  p = Animation.prototype;
  p._dirty = p._gc = p._initted = p._paused = false;
  p._totalTime = p._time = 0;
  p._rawPrevTime = -1;
  p._next = p._last = p._onUpdate = p._timeline = p.timeline = null;
  p._paused = false; //some browsers (like iOS) occasionally drop the requestAnimationFrame event when the user switches to a different tab and then comes back again, so we use a 2-second setTimeout() to sense if/when that condition occurs and then wake() the ticker.

  var _checkTimeout = function () {
    if (_tickerActive && _getTime() - _lastUpdate > 2000 && ((_doc || {}).visibilityState !== "hidden" || !_ticker.lagSmoothing())) {
      //note: if the tab is hidden, we should still wake if lagSmoothing has been disabled.
      _ticker.wake();
    }

    var t = setTimeout(_checkTimeout, 2000);

    if (t.unref) {
      // allows a node process to exit even if the timeout’s callback hasn't been invoked. Without it, the node process could hang as this function is called every two seconds.
      t.unref();
    }
  };

  _checkTimeout();

  p.play = function (from, suppressEvents) {
    if (from != null) {
      this.seek(from, suppressEvents);
    }

    return this.reversed(false).paused(false);
  };

  p.pause = function (atTime, suppressEvents) {
    if (atTime != null) {
      this.seek(atTime, suppressEvents);
    }

    return this.paused(true);
  };

  p.resume = function (from, suppressEvents) {
    if (from != null) {
      this.seek(from, suppressEvents);
    }

    return this.paused(false);
  };

  p.seek = function (time, suppressEvents) {
    return this.totalTime(Number(time), suppressEvents !== false);
  };

  p.restart = function (includeDelay, suppressEvents) {
    return this.reversed(false).paused(false).totalTime(includeDelay ? -this._delay : 0, suppressEvents !== false, true);
  };

  p.reverse = function (from, suppressEvents) {
    if (from != null) {
      this.seek(from || this.totalDuration(), suppressEvents);
    }

    return this.reversed(true).paused(false);
  };

  p.render = function (time, suppressEvents, force) {//stub - we override this method in subclasses.
  };

  p.invalidate = function () {
    this._time = this._totalTime = 0;
    this._initted = this._gc = false;
    this._rawPrevTime = -1;

    if (this._gc || !this.timeline) {
      this._enabled(true);
    }

    return this;
  };

  p.isActive = function () {
    var tl = this._timeline,
        //the 2 root timelines won't have a _timeline; they're always active.
    startTime = this._startTime,
        rawTime;
    return !tl || !this._gc && !this._paused && tl.isActive() && (rawTime = tl.rawTime(true)) >= startTime && rawTime < startTime + this.totalDuration() / this._timeScale - 0.0000001;
  };

  p._enabled = function (enabled, ignoreTimeline) {
    if (!_tickerActive) {
      _ticker.wake();
    }

    this._gc = !enabled;
    this._active = this.isActive();

    if (ignoreTimeline !== true) {
      if (enabled && !this.timeline) {
        this._timeline.add(this, this._startTime - this._delay);
      } else if (!enabled && this.timeline) {
        this._timeline._remove(this, true);
      }
    }

    return false;
  };

  p._kill = function (vars, target) {
    return this._enabled(false, false);
  };

  p.kill = function (vars, target) {
    this._kill(vars, target);

    return this;
  };

  p._uncache = function (includeSelf) {
    var tween = includeSelf ? this : this.timeline;

    while (tween) {
      tween._dirty = true;
      tween = tween.timeline;
    }

    return this;
  };

  p._swapSelfInParams = function (params) {
    var i = params.length,
        copy = params.concat();

    while (--i > -1) {
      if (params[i] === "{self}") {
        copy[i] = this;
      }
    }

    return copy;
  };

  p._callback = function (type) {
    var v = this.vars,
        callback = v[type],
        params = v[type + "Params"],
        scope = v[type + "Scope"] || v.callbackScope || this,
        l = params ? params.length : 0;

    switch (l) {
      //speed optimization; call() is faster than apply() so use it when there are only a few parameters (which is by far most common). Previously we simply did var v = this.vars; v[type].apply(v[type + "Scope"] || v.callbackScope || this, v[type + "Params"] || _blankArray);
      case 0:
        callback.call(scope);
        break;

      case 1:
        callback.call(scope, params[0]);
        break;

      case 2:
        callback.call(scope, params[0], params[1]);
        break;

      default:
        callback.apply(scope, params);
    }
  }; //----Animation getters/setters --------------------------------------------------------


  p.eventCallback = function (type, callback, params, scope) {
    if ((type || "").substr(0, 2) === "on") {
      var v = this.vars;

      if (arguments.length === 1) {
        return v[type];
      }

      if (callback == null) {
        delete v[type];
      } else {
        v[type] = callback;
        v[type + "Params"] = _isArray(params) && params.join("").indexOf("{self}") !== -1 ? this._swapSelfInParams(params) : params;
        v[type + "Scope"] = scope;
      }

      if (type === "onUpdate") {
        this._onUpdate = callback;
      }
    }

    return this;
  };

  p.delay = function (value) {
    if (!arguments.length) {
      return this._delay;
    }

    if (this._timeline.smoothChildTiming) {
      this.startTime(this._startTime + value - this._delay);
    }

    this._delay = value;
    return this;
  };

  p.duration = function (value) {
    if (!arguments.length) {
      this._dirty = false;
      return this._duration;
    }

    this._duration = this._totalDuration = value;

    this._uncache(true); //true in case it's a TweenMax or TimelineMax that has a repeat - we'll need to refresh the totalDuration.


    if (this._timeline.smoothChildTiming) if (this._time > 0) if (this._time < this._duration) if (value !== 0) {
      this.totalTime(this._totalTime * (value / this._duration), true);
    }
    return this;
  };

  p.totalDuration = function (value) {
    this._dirty = false;
    return !arguments.length ? this._totalDuration : this.duration(value);
  };

  p.time = function (value, suppressEvents) {
    if (!arguments.length) {
      return this._time;
    }

    if (this._dirty) {
      this.totalDuration();
    }

    return this.totalTime(value > this._duration ? this._duration : value, suppressEvents);
  };

  p.totalTime = function (time, suppressEvents, uncapped) {
    if (!_tickerActive) {
      _ticker.wake();
    }

    if (!arguments.length) {
      return this._totalTime;
    }

    if (this._timeline) {
      if (time < 0 && !uncapped) {
        time += this.totalDuration();
      }

      if (this._timeline.smoothChildTiming) {
        if (this._dirty) {
          this.totalDuration();
        }

        var totalDuration = this._totalDuration,
            tl = this._timeline;

        if (time > totalDuration && !uncapped) {
          time = totalDuration;
        }

        this._startTime = (this._paused ? this._pauseTime : tl._time) - (!this._reversed ? time : totalDuration - time) / this._timeScale;

        if (!tl._dirty) {
          //for performance improvement. If the parent's cache is already dirty, it already took care of marking the ancestors as dirty too, so skip the function call here.
          this._uncache(false);
        } //in case any of the ancestor timelines had completed but should now be enabled, we should reset their totalTime() which will also ensure that they're lined up properly and enabled. Skip for animations that are on the root (wasteful). Example: a TimelineLite.exportRoot() is performed when there's a paused tween on the root, the export will not complete until that tween is unpaused, but imagine a child gets restarted later, after all [unpaused] tweens have completed. The startTime of that child would get pushed out, but one of the ancestors may have completed.


        if (tl._timeline) {
          while (tl._timeline) {
            if (tl._timeline._time !== (tl._startTime + tl._totalTime) / tl._timeScale) {
              tl.totalTime(tl._totalTime, true);
            }

            tl = tl._timeline;
          }
        }
      }

      if (this._gc) {
        this._enabled(true, false);
      }

      if (this._totalTime !== time || this._duration === 0) {
        if (_lazyTweens.length) {
          _lazyRender();
        }

        this.render(time, suppressEvents, false);

        if (_lazyTweens.length) {
          //in case rendering caused any tweens to lazy-init, we should render them because typically when someone calls seek() or time() or progress(), they expect an immediate render.
          _lazyRender();
        }
      }
    }

    return this;
  };

  p.progress = p.totalProgress = function (value, suppressEvents) {
    var duration = this.duration();
    return !arguments.length ? duration ? this._time / duration : this.ratio : this.totalTime(duration * value, suppressEvents);
  };

  p.startTime = function (value) {
    if (!arguments.length) {
      return this._startTime;
    }

    if (value !== this._startTime) {
      this._startTime = value;
      if (this.timeline) if (this.timeline._sortChildren) {
        this.timeline.add(this, value - this._delay); //ensures that any necessary re-sequencing of Animations in the timeline occurs to make sure the rendering order is correct.
      }
    }

    return this;
  };

  p.endTime = function (includeRepeats) {
    return this._startTime + (includeRepeats != false ? this.totalDuration() : this.duration()) / this._timeScale;
  };

  p.timeScale = function (value) {
    if (!arguments.length) {
      return this._timeScale;
    }

    var pauseTime, t;
    value = value || _tinyNum; //can't allow zero because it'll throw the math off

    if (this._timeline && this._timeline.smoothChildTiming) {
      pauseTime = this._pauseTime;
      t = pauseTime || pauseTime === 0 ? pauseTime : this._timeline.totalTime();
      this._startTime = t - (t - this._startTime) * this._timeScale / value;
    }

    this._timeScale = value;
    t = this.timeline;

    while (t && t.timeline) {
      //must update the duration/totalDuration of all ancestor timelines immediately in case in the middle of a render loop, one tween alters another tween's timeScale which shoves its startTime before 0, forcing the parent timeline to shift around and shiftChildren() which could affect that next tween's render (startTime). Doesn't matter for the root timeline though.
      t._dirty = true;
      t.totalDuration();
      t = t.timeline;
    }

    return this;
  };

  p.reversed = function (value) {
    if (!arguments.length) {
      return this._reversed;
    }

    if (value != this._reversed) {
      this._reversed = value;
      this.totalTime(this._timeline && !this._timeline.smoothChildTiming ? this.totalDuration() - this._totalTime : this._totalTime, true);
    }

    return this;
  };

  p.paused = function (value) {
    if (!arguments.length) {
      return this._paused;
    }

    var tl = this._timeline,
        raw,
        elapsed;
    if (value != this._paused) if (tl) {
      if (!_tickerActive && !value) {
        _ticker.wake();
      }

      raw = tl.rawTime();
      elapsed = raw - this._pauseTime;

      if (!value && tl.smoothChildTiming) {
        this._startTime += elapsed;

        this._uncache(false);
      }

      this._pauseTime = value ? raw : null;
      this._paused = value;
      this._active = this.isActive();

      if (!value && elapsed !== 0 && this._initted && this.duration()) {
        raw = tl.smoothChildTiming ? this._totalTime : (raw - this._startTime) / this._timeScale;
        this.render(raw, raw === this._totalTime, true); //in case the target's properties changed via some other tween or manual update by the user, we should force a render.
      }
    }

    if (this._gc && !value) {
      this._enabled(true, false);
    }

    return this;
  };
  /*
   * ----------------------------------------------------------------
   * SimpleTimeline
   * ----------------------------------------------------------------
   */


  var SimpleTimeline = _class("core.SimpleTimeline", function (vars) {
    Animation.call(this, 0, vars);
    this.autoRemoveChildren = this.smoothChildTiming = true;
  });

  p = SimpleTimeline.prototype = new Animation();
  p.constructor = SimpleTimeline;
  p.kill()._gc = false;
  p._first = p._last = p._recent = null;
  p._sortChildren = false;

  p.add = p.insert = function (child, position, align, stagger) {
    var prevTween, st;
    child._startTime = Number(position || 0) + child._delay;
    if (child._paused) if (this !== child._timeline) {
      //we only adjust the _pauseTime if it wasn't in this timeline already. Remember, sometimes a tween will be inserted again into the same timeline when its startTime is changed so that the tweens in the TimelineLite/Max are re-ordered properly in the linked list (so everything renders in the proper order).
      child._pauseTime = this.rawTime() - (child._timeline.rawTime() - child._pauseTime);
    }

    if (child.timeline) {
      child.timeline._remove(child, true); //removes from existing timeline so that it can be properly added to this one.

    }

    child.timeline = child._timeline = this;

    if (child._gc) {
      child._enabled(true, true);
    }

    prevTween = this._last;

    if (this._sortChildren) {
      st = child._startTime;

      while (prevTween && prevTween._startTime > st) {
        prevTween = prevTween._prev;
      }
    }

    if (prevTween) {
      child._next = prevTween._next;
      prevTween._next = child;
    } else {
      child._next = this._first;
      this._first = child;
    }

    if (child._next) {
      child._next._prev = child;
    } else {
      this._last = child;
    }

    child._prev = prevTween;
    this._recent = child;

    if (this._timeline) {
      this._uncache(true);
    }

    return this;
  };

  p._remove = function (tween, skipDisable) {
    if (tween.timeline === this) {
      if (!skipDisable) {
        tween._enabled(false, true);
      }

      if (tween._prev) {
        tween._prev._next = tween._next;
      } else if (this._first === tween) {
        this._first = tween._next;
      }

      if (tween._next) {
        tween._next._prev = tween._prev;
      } else if (this._last === tween) {
        this._last = tween._prev;
      }

      tween._next = tween._prev = tween.timeline = null;

      if (tween === this._recent) {
        this._recent = this._last;
      }

      if (this._timeline) {
        this._uncache(true);
      }
    }

    return this;
  };

  p.render = function (time, suppressEvents, force) {
    var tween = this._first,
        next;
    this._totalTime = this._time = this._rawPrevTime = time;

    while (tween) {
      next = tween._next; //record it here because the value could change after rendering...

      if (tween._active || time >= tween._startTime && !tween._paused && !tween._gc) {
        if (!tween._reversed) {
          tween.render((time - tween._startTime) * tween._timeScale, suppressEvents, force);
        } else {
          tween.render((!tween._dirty ? tween._totalDuration : tween.totalDuration()) - (time - tween._startTime) * tween._timeScale, suppressEvents, force);
        }
      }

      tween = next;
    }
  };

  p.rawTime = function () {
    if (!_tickerActive) {
      _ticker.wake();
    }

    return this._totalTime;
  };
  /*
   * ----------------------------------------------------------------
   * TweenLite
   * ----------------------------------------------------------------
   */


  var TweenLite = _class("TweenLite", function (target, duration, vars) {
    Animation.call(this, duration, vars);
    this.render = TweenLite.prototype.render; //speed optimization (avoid prototype lookup on this "hot" method)

    if (target == null) {
      throw "Cannot tween a null target.";
    }

    this.target = target = typeof target !== "string" ? target : TweenLite.selector(target) || target;
    var isSelector = target.jquery || target.length && target !== window && target[0] && (target[0] === window || target[0].nodeType && target[0].style && !target.nodeType),
        overwrite = this.vars.overwrite,
        i,
        targ,
        targets;
    this._overwrite = overwrite = overwrite == null ? _overwriteLookup[TweenLite.defaultOverwrite] : typeof overwrite === "number" ? overwrite >> 0 : _overwriteLookup[overwrite];

    if ((isSelector || target instanceof Array || target.push && _isArray(target)) && typeof target[0] !== "number") {
      this._targets = targets = _slice(target); //don't use Array.prototype.slice.call(target, 0) because that doesn't work in IE8 with a NodeList that's returned by querySelectorAll()

      this._propLookup = [];
      this._siblings = [];

      for (i = 0; i < targets.length; i++) {
        targ = targets[i];

        if (!targ) {
          targets.splice(i--, 1);
          continue;
        } else if (typeof targ === "string") {
          targ = targets[i--] = TweenLite.selector(targ); //in case it's an array of strings

          if (typeof targ === "string") {
            targets.splice(i + 1, 1); //to avoid an endless loop (can't imagine why the selector would return a string, but just in case)
          }

          continue;
        } else if (targ.length && targ !== window && targ[0] && (targ[0] === window || targ[0].nodeType && targ[0].style && !targ.nodeType)) {
          //in case the user is passing in an array of selector objects (like jQuery objects), we need to check one more level and pull things out if necessary. Also note that <select> elements pass all the criteria regarding length and the first child having style, so we must also check to ensure the target isn't an HTML node itself.
          targets.splice(i--, 1);
          this._targets = targets = targets.concat(_slice(targ));
          continue;
        }

        this._siblings[i] = _register(targ, this, false);
        if (overwrite === 1) if (this._siblings[i].length > 1) {
          _applyOverwrite(targ, this, null, 1, this._siblings[i]);
        }
      }
    } else {
      this._propLookup = {};
      this._siblings = _register(target, this, false);
      if (overwrite === 1) if (this._siblings.length > 1) {
        _applyOverwrite(target, this, null, 1, this._siblings);
      }
    }

    if (this.vars.immediateRender || duration === 0 && this._delay === 0 && this.vars.immediateRender !== false) {
      this._time = -_tinyNum; //forces a render without having to set the render() "force" parameter to true because we want to allow lazying by default (using the "force" parameter always forces an immediate full render)

      this.render(Math.min(0, -this._delay)); //in case delay is negative
    }
  }, true),
      _isSelector = function (v) {
    return v && v.length && v !== window && v[0] && (v[0] === window || v[0].nodeType && v[0].style && !v.nodeType); //we cannot check "nodeType" if the target is window from within an iframe, otherwise it will trigger a security error in some browsers like Firefox.
  },
      _autoCSS = function (vars, target) {
    var css = {},
        p;

    for (p in vars) {
      if (!_reservedProps[p] && (!(p in target) || p === "transform" || p === "x" || p === "y" || p === "width" || p === "height" || p === "className" || p === "border") && (!_plugins[p] || _plugins[p] && _plugins[p]._autoCSS)) {
        //note: <img> elements contain read-only "x" and "y" properties. We should also prioritize editing css width/height rather than the element's properties.
        css[p] = vars[p];
        delete vars[p];
      }
    }

    vars.css = css;
  };

  p = TweenLite.prototype = new Animation();
  p.constructor = TweenLite;
  p.kill()._gc = false; //----TweenLite defaults, overwrite management, and root updates ----------------------------------------------------

  p.ratio = 0;
  p._firstPT = p._targets = p._overwrittenProps = p._startAt = null;
  p._notifyPluginsOfEnabled = p._lazy = false;
  TweenLite.version = "2.0.2";
  TweenLite.defaultEase = p._ease = new Ease(null, null, 1, 1);
  TweenLite.defaultOverwrite = "auto";
  TweenLite.ticker = _ticker;
  TweenLite.autoSleep = 120;

  TweenLite.lagSmoothing = function (threshold, adjustedLag) {
    _ticker.lagSmoothing(threshold, adjustedLag);
  };

  TweenLite.selector = window.$ || window.jQuery || function (e) {
    var selector = window.$ || window.jQuery;

    if (selector) {
      TweenLite.selector = selector;
      return selector(e);
    }

    if (!_doc) {
      //in some dev environments (like Angular 6), GSAP gets loaded before the document is defined! So re-query it here if/when necessary.
      _doc = window.document;
    }

    return !_doc ? e : _doc.querySelectorAll ? _doc.querySelectorAll(e) : _doc.getElementById(e.charAt(0) === "#" ? e.substr(1) : e);
  };

  var _lazyTweens = [],
      _lazyLookup = {},
      _numbersExp = /(?:(-|-=|\+=)?\d*\.?\d*(?:e[\-+]?\d+)?)[0-9]/ig,
      _relExp = /[\+-]=-?[\.\d]/,
      //_nonNumbersExp = /(?:([\-+](?!(\d|=)))|[^\d\-+=e]|(e(?![\-+][\d])))+/ig,
  _setRatio = function (v) {
    var pt = this._firstPT,
        min = 0.000001,
        val;

    while (pt) {
      val = !pt.blob ? pt.c * v + pt.s : v === 1 && this.end != null ? this.end : v ? this.join("") : this.start;

      if (pt.m) {
        val = pt.m.call(this._tween, val, this._target || pt.t, this._tween);
      } else if (val < min) if (val > -min && !pt.blob) {
        //prevents issues with converting very small numbers to strings in the browser
        val = 0;
      }

      if (!pt.f) {
        pt.t[pt.p] = val;
      } else if (pt.fp) {
        pt.t[pt.p](pt.fp, val);
      } else {
        pt.t[pt.p](val);
      }

      pt = pt._next;
    }
  },
      //compares two strings (start/end), finds the numbers that are different and spits back an array representing the whole value but with the changing values isolated as elements. For example, "rgb(0,0,0)" and "rgb(100,50,0)" would become ["rgb(", 0, ",", 50, ",0)"]. Notice it merges the parts that are identical (performance optimization). The array also has a linked list of PropTweens attached starting with _firstPT that contain the tweening data (t, p, s, c, f, etc.). It also stores the starting value as a "start" property so that we can revert to it if/when necessary, like when a tween rewinds fully. If the quantity of numbers differs between the start and end, it will always prioritize the end value(s). The pt parameter is optional - it's for a PropTween that will be appended to the end of the linked list and is typically for actually setting the value after all of the elements have been updated (with array.join("")).
  _blobDif = function (start, end, filter, pt) {
    var a = [],
        charIndex = 0,
        s = "",
        color = 0,
        startNums,
        endNums,
        num,
        i,
        l,
        nonNumbers,
        currentNum;
    a.start = start;
    a.end = end;
    start = a[0] = start + ""; //ensure values are strings

    end = a[1] = end + "";

    if (filter) {
      filter(a); //pass an array with the starting and ending values and let the filter do whatever it needs to the values.

      start = a[0];
      end = a[1];
    }

    a.length = 0;
    startNums = start.match(_numbersExp) || [];
    endNums = end.match(_numbersExp) || [];

    if (pt) {
      pt._next = null;
      pt.blob = 1;
      a._firstPT = a._applyPT = pt; //apply last in the linked list (which means inserting it first)
    }

    l = endNums.length;

    for (i = 0; i < l; i++) {
      currentNum = endNums[i];
      nonNumbers = end.substr(charIndex, end.indexOf(currentNum, charIndex) - charIndex);
      s += nonNumbers || !i ? nonNumbers : ","; //note: SVG spec allows omission of comma/space when a negative sign is wedged between two numbers, like 2.5-5.3 instead of 2.5,-5.3 but when tweening, the negative value may switch to positive, so we insert the comma just in case.

      charIndex += nonNumbers.length;

      if (color) {
        //sense rgba() values and round them.
        color = (color + 1) % 5;
      } else if (nonNumbers.substr(-5) === "rgba(") {
        color = 1;
      }

      if (currentNum === startNums[i] || startNums.length <= i) {
        s += currentNum;
      } else {
        if (s) {
          a.push(s);
          s = "";
        }

        num = parseFloat(startNums[i]);
        a.push(num);
        a._firstPT = {
          _next: a._firstPT,
          t: a,
          p: a.length - 1,
          s: num,
          c: (currentNum.charAt(1) === "=" ? parseInt(currentNum.charAt(0) + "1", 10) * parseFloat(currentNum.substr(2)) : parseFloat(currentNum) - num) || 0,
          f: 0,
          m: color && color < 4 ? Math.round : 0
        }; //note: we don't set _prev because we'll never need to remove individual PropTweens from this list.
      }

      charIndex += currentNum.length;
    }

    s += end.substr(charIndex);

    if (s) {
      a.push(s);
    }

    a.setRatio = _setRatio;

    if (_relExp.test(end)) {
      //if the end string contains relative values, delete it so that on the final render (in _setRatio()), we don't actually set it to the string with += or -= characters (forces it to use the calculated value).
      a.end = null;
    }

    return a;
  },
      //note: "funcParam" is only necessary for function-based getters/setters that require an extra parameter like getAttribute("width") and setAttribute("width", value). In this example, funcParam would be "width". Used by AttrPlugin for example.
  _addPropTween = function (target, prop, start, end, overwriteProp, mod, funcParam, stringFilter, index) {
    if (typeof end === "function") {
      end = end(index || 0, target);
    }

    var type = typeof target[prop],
        getterName = type !== "function" ? "" : prop.indexOf("set") || typeof target["get" + prop.substr(3)] !== "function" ? prop : "get" + prop.substr(3),
        s = start !== "get" ? start : !getterName ? target[prop] : funcParam ? target[getterName](funcParam) : target[getterName](),
        isRelative = typeof end === "string" && end.charAt(1) === "=",
        pt = {
      t: target,
      p: prop,
      s: s,
      f: type === "function",
      pg: 0,
      n: overwriteProp || prop,
      m: !mod ? 0 : typeof mod === "function" ? mod : Math.round,
      pr: 0,
      c: isRelative ? parseInt(end.charAt(0) + "1", 10) * parseFloat(end.substr(2)) : parseFloat(end) - s || 0
    },
        blob;

    if (typeof s !== "number" || typeof end !== "number" && !isRelative) {
      if (funcParam || isNaN(s) || !isRelative && isNaN(end) || typeof s === "boolean" || typeof end === "boolean") {
        //a blob (string that has multiple numbers in it)
        pt.fp = funcParam;
        blob = _blobDif(s, isRelative ? parseFloat(pt.s) + pt.c + (pt.s + "").replace(/[0-9\-\.]/g, "") : end, stringFilter || TweenLite.defaultStringFilter, pt);
        pt = {
          t: blob,
          p: "setRatio",
          s: 0,
          c: 1,
          f: 2,
          pg: 0,
          n: overwriteProp || prop,
          pr: 0,
          m: 0
        }; //"2" indicates it's a Blob property tween. Needed for RoundPropsPlugin for example.
      } else {
        pt.s = parseFloat(s);

        if (!isRelative) {
          pt.c = parseFloat(end) - pt.s || 0;
        }
      }
    }

    if (pt.c) {
      //only add it to the linked list if there's a change.
      if (pt._next = this._firstPT) {
        pt._next._prev = pt;
      }

      this._firstPT = pt;
      return pt;
    }
  },
      _internals = TweenLite._internals = {
    isArray: _isArray,
    isSelector: _isSelector,
    lazyTweens: _lazyTweens,
    blobDif: _blobDif
  },
      //gives us a way to expose certain private values to other GreenSock classes without contaminating tha main TweenLite object.
  _plugins = TweenLite._plugins = {},
      _tweenLookup = _internals.tweenLookup = {},
      _tweenLookupNum = 0,
      _reservedProps = _internals.reservedProps = {
    ease: 1,
    delay: 1,
    overwrite: 1,
    onComplete: 1,
    onCompleteParams: 1,
    onCompleteScope: 1,
    useFrames: 1,
    runBackwards: 1,
    startAt: 1,
    onUpdate: 1,
    onUpdateParams: 1,
    onUpdateScope: 1,
    onStart: 1,
    onStartParams: 1,
    onStartScope: 1,
    onReverseComplete: 1,
    onReverseCompleteParams: 1,
    onReverseCompleteScope: 1,
    onRepeat: 1,
    onRepeatParams: 1,
    onRepeatScope: 1,
    easeParams: 1,
    yoyo: 1,
    immediateRender: 1,
    repeat: 1,
    repeatDelay: 1,
    data: 1,
    paused: 1,
    reversed: 1,
    autoCSS: 1,
    lazy: 1,
    onOverwrite: 1,
    callbackScope: 1,
    stringFilter: 1,
    id: 1,
    yoyoEase: 1
  },
      _overwriteLookup = {
    none: 0,
    all: 1,
    auto: 2,
    concurrent: 3,
    allOnStart: 4,
    preexisting: 5,
    "true": 1,
    "false": 0
  },
      _rootFramesTimeline = Animation._rootFramesTimeline = new SimpleTimeline(),
      _rootTimeline = Animation._rootTimeline = new SimpleTimeline(),
      _nextGCFrame = 30,
      _lazyRender = _internals.lazyRender = function () {
    var i = _lazyTweens.length,
        tween;
    _lazyLookup = {};

    while (--i > -1) {
      tween = _lazyTweens[i];

      if (tween && tween._lazy !== false) {
        tween.render(tween._lazy[0], tween._lazy[1], true);
        tween._lazy = false;
      }
    }

    _lazyTweens.length = 0;
  };

  _rootTimeline._startTime = _ticker.time;
  _rootFramesTimeline._startTime = _ticker.frame;
  _rootTimeline._active = _rootFramesTimeline._active = true;
  setTimeout(_lazyRender, 1); //on some mobile devices, there isn't a "tick" before code runs which means any lazy renders wouldn't run before the next official "tick".

  Animation._updateRoot = TweenLite.render = function () {
    var i, a, p;

    if (_lazyTweens.length) {
      //if code is run outside of the requestAnimationFrame loop, there may be tweens queued AFTER the engine refreshed, so we need to ensure any pending renders occur before we refresh again.
      _lazyRender();
    }

    _rootTimeline.render((_ticker.time - _rootTimeline._startTime) * _rootTimeline._timeScale, false, false);

    _rootFramesTimeline.render((_ticker.frame - _rootFramesTimeline._startTime) * _rootFramesTimeline._timeScale, false, false);

    if (_lazyTweens.length) {
      _lazyRender();
    }

    if (_ticker.frame >= _nextGCFrame) {
      //dump garbage every 120 frames or whatever the user sets TweenLite.autoSleep to
      _nextGCFrame = _ticker.frame + (parseInt(TweenLite.autoSleep, 10) || 120);

      for (p in _tweenLookup) {
        a = _tweenLookup[p].tweens;
        i = a.length;

        while (--i > -1) {
          if (a[i]._gc) {
            a.splice(i, 1);
          }
        }

        if (a.length === 0) {
          delete _tweenLookup[p];
        }
      } //if there are no more tweens in the root timelines, or if they're all paused, make the _timer sleep to reduce load on the CPU slightly


      p = _rootTimeline._first;
      if (!p || p._paused) if (TweenLite.autoSleep && !_rootFramesTimeline._first && _ticker._listeners.tick.length === 1) {
        while (p && p._paused) {
          p = p._next;
        }

        if (!p) {
          _ticker.sleep();
        }
      }
    }
  };

  _ticker.addEventListener("tick", Animation._updateRoot);

  var _register = function (target, tween, scrub) {
    var id = target._gsTweenID,
        a,
        i;

    if (!_tweenLookup[id || (target._gsTweenID = id = "t" + _tweenLookupNum++)]) {
      _tweenLookup[id] = {
        target: target,
        tweens: []
      };
    }

    if (tween) {
      a = _tweenLookup[id].tweens;
      a[i = a.length] = tween;

      if (scrub) {
        while (--i > -1) {
          if (a[i] === tween) {
            a.splice(i, 1);
          }
        }
      }
    }

    return _tweenLookup[id].tweens;
  },
      _onOverwrite = function (overwrittenTween, overwritingTween, target, killedProps) {
    var func = overwrittenTween.vars.onOverwrite,
        r1,
        r2;

    if (func) {
      r1 = func(overwrittenTween, overwritingTween, target, killedProps);
    }

    func = TweenLite.onOverwrite;

    if (func) {
      r2 = func(overwrittenTween, overwritingTween, target, killedProps);
    }

    return r1 !== false && r2 !== false;
  },
      _applyOverwrite = function (target, tween, props, mode, siblings) {
    var i, changed, curTween, l;

    if (mode === 1 || mode >= 4) {
      l = siblings.length;

      for (i = 0; i < l; i++) {
        if ((curTween = siblings[i]) !== tween) {
          if (!curTween._gc) {
            if (curTween._kill(null, target, tween)) {
              changed = true;
            }
          }
        } else if (mode === 5) {
          break;
        }
      }

      return changed;
    } //NOTE: Add 0.0000000001 to overcome floating point errors that can cause the startTime to be VERY slightly off (when a tween's time() is set for example)


    var startTime = tween._startTime + _tinyNum,
        overlaps = [],
        oCount = 0,
        zeroDur = tween._duration === 0,
        globalStart;
    i = siblings.length;

    while (--i > -1) {
      if ((curTween = siblings[i]) === tween || curTween._gc || curTween._paused) {//ignore
      } else if (curTween._timeline !== tween._timeline) {
        globalStart = globalStart || _checkOverlap(tween, 0, zeroDur);

        if (_checkOverlap(curTween, globalStart, zeroDur) === 0) {
          overlaps[oCount++] = curTween;
        }
      } else if (curTween._startTime <= startTime) if (curTween._startTime + curTween.totalDuration() / curTween._timeScale > startTime) if (!((zeroDur || !curTween._initted) && startTime - curTween._startTime <= 0.0000000002)) {
        overlaps[oCount++] = curTween;
      }
    }

    i = oCount;

    while (--i > -1) {
      curTween = overlaps[i];
      l = curTween._firstPT; //we need to discern if there were property tweens originally; if they all get removed in the next line's _kill() call, the tween should be killed. See https://github.com/greensock/GreenSock-JS/issues/278

      if (mode === 2) if (curTween._kill(props, target, tween)) {
        changed = true;
      }

      if (mode !== 2 || !curTween._firstPT && curTween._initted && l) {
        if (mode !== 2 && !_onOverwrite(curTween, tween)) {
          continue;
        }

        if (curTween._enabled(false, false)) {
          //if all property tweens have been overwritten, kill the tween.
          changed = true;
        }
      }
    }

    return changed;
  },
      _checkOverlap = function (tween, reference, zeroDur) {
    var tl = tween._timeline,
        ts = tl._timeScale,
        t = tween._startTime;

    while (tl._timeline) {
      t += tl._startTime;
      ts *= tl._timeScale;

      if (tl._paused) {
        return -100;
      }

      tl = tl._timeline;
    }

    t /= ts;
    return t > reference ? t - reference : zeroDur && t === reference || !tween._initted && t - reference < 2 * _tinyNum ? _tinyNum : (t += tween.totalDuration() / tween._timeScale / ts) > reference + _tinyNum ? 0 : t - reference - _tinyNum;
  }; //---- TweenLite instance methods -----------------------------------------------------------------------------


  p._init = function () {
    var v = this.vars,
        op = this._overwrittenProps,
        dur = this._duration,
        immediate = !!v.immediateRender,
        ease = v.ease,
        i,
        initPlugins,
        pt,
        p,
        startVars,
        l;

    if (v.startAt) {
      if (this._startAt) {
        this._startAt.render(-1, true); //if we've run a startAt previously (when the tween instantiated), we should revert it so that the values re-instantiate correctly particularly for relative tweens. Without this, a TweenLite.fromTo(obj, 1, {x:"+=100"}, {x:"-=100"}), for example, would actually jump to +=200 because the startAt would run twice, doubling the relative change.


        this._startAt.kill();
      }

      startVars = {};

      for (p in v.startAt) {
        //copy the properties/values into a new object to avoid collisions, like var to = {x:0}, from = {x:500}; timeline.fromTo(e, 1, from, to).fromTo(e, 1, to, from);
        startVars[p] = v.startAt[p];
      }

      startVars.data = "isStart";
      startVars.overwrite = false;
      startVars.immediateRender = true;
      startVars.lazy = immediate && v.lazy !== false;
      startVars.startAt = startVars.delay = null; //no nesting of startAt objects allowed (otherwise it could cause an infinite loop).

      startVars.onUpdate = v.onUpdate;
      startVars.onUpdateParams = v.onUpdateParams;
      startVars.onUpdateScope = v.onUpdateScope || v.callbackScope || this;
      this._startAt = TweenLite.to(this.target || {}, 0, startVars);

      if (immediate) {
        if (this._time > 0) {
          this._startAt = null; //tweens that render immediately (like most from() and fromTo() tweens) shouldn't revert when their parent timeline's playhead goes backward past the startTime because the initial render could have happened anytime and it shouldn't be directly correlated to this tween's startTime. Imagine setting up a complex animation where the beginning states of various objects are rendered immediately but the tween doesn't happen for quite some time - if we revert to the starting values as soon as the playhead goes backward past the tween's startTime, it will throw things off visually. Reversion should only happen in TimelineLite/Max instances where immediateRender was false (which is the default in the convenience methods like from()).
        } else if (dur !== 0) {
          return; //we skip initialization here so that overwriting doesn't occur until the tween actually begins. Otherwise, if you create several immediateRender:true tweens of the same target/properties to drop into a TimelineLite or TimelineMax, the last one created would overwrite the first ones because they didn't get placed into the timeline yet before the first render occurs and kicks in overwriting.
        }
      }
    } else if (v.runBackwards && dur !== 0) {
      //from() tweens must be handled uniquely: their beginning values must be rendered but we don't want overwriting to occur yet (when time is still 0). Wait until the tween actually begins before doing all the routines like overwriting. At that time, we should render at the END of the tween to ensure that things initialize correctly (remember, from() tweens go backwards)
      if (this._startAt) {
        this._startAt.render(-1, true);

        this._startAt.kill();

        this._startAt = null;
      } else {
        if (this._time !== 0) {
          //in rare cases (like if a from() tween runs and then is invalidate()-ed), immediateRender could be true but the initial forced-render gets skipped, so there's no need to force the render in this context when the _time is greater than 0
          immediate = false;
        }

        pt = {};

        for (p in v) {
          //copy props into a new object and skip any reserved props, otherwise onComplete or onUpdate or onStart could fire. We should, however, permit autoCSS to go through.
          if (!_reservedProps[p] || p === "autoCSS") {
            pt[p] = v[p];
          }
        }

        pt.overwrite = 0;
        pt.data = "isFromStart"; //we tag the tween with as "isFromStart" so that if [inside a plugin] we need to only do something at the very END of a tween, we have a way of identifying this tween as merely the one that's setting the beginning values for a "from()" tween. For example, clearProps in CSSPlugin should only get applied at the very END of a tween and without this tag, from(...{height:100, clearProps:"height", delay:1}) would wipe the height at the beginning of the tween and after 1 second, it'd kick back in.

        pt.lazy = immediate && v.lazy !== false;
        pt.immediateRender = immediate; //zero-duration tweens render immediately by default, but if we're not specifically instructed to render this tween immediately, we should skip this and merely _init() to record the starting values (rendering them immediately would push them to completion which is wasteful in that case - we'd have to render(-1) immediately after)

        this._startAt = TweenLite.to(this.target, 0, pt);

        if (!immediate) {
          this._startAt._init(); //ensures that the initial values are recorded


          this._startAt._enabled(false); //no need to have the tween render on the next cycle. Disable it because we'll always manually control the renders of the _startAt tween.


          if (this.vars.immediateRender) {
            this._startAt = null;
          }
        } else if (this._time === 0) {
          return;
        }
      }
    }

    this._ease = ease = !ease ? TweenLite.defaultEase : ease instanceof Ease ? ease : typeof ease === "function" ? new Ease(ease, v.easeParams) : _easeMap[ease] || TweenLite.defaultEase;

    if (v.easeParams instanceof Array && ease.config) {
      this._ease = ease.config.apply(ease, v.easeParams);
    }

    this._easeType = this._ease._type;
    this._easePower = this._ease._power;
    this._firstPT = null;

    if (this._targets) {
      l = this._targets.length;

      for (i = 0; i < l; i++) {
        if (this._initProps(this._targets[i], this._propLookup[i] = {}, this._siblings[i], op ? op[i] : null, i)) {
          initPlugins = true;
        }
      }
    } else {
      initPlugins = this._initProps(this.target, this._propLookup, this._siblings, op, 0);
    }

    if (initPlugins) {
      TweenLite._onPluginEvent("_onInitAllProps", this); //reorders the array in order of priority. Uses a static TweenPlugin method in order to minimize file size in TweenLite

    }

    if (op) if (!this._firstPT) if (typeof this.target !== "function") {
      //if all tweening properties have been overwritten, kill the tween. If the target is a function, it's probably a delayedCall so let it live.
      this._enabled(false, false);
    }

    if (v.runBackwards) {
      pt = this._firstPT;

      while (pt) {
        pt.s += pt.c;
        pt.c = -pt.c;
        pt = pt._next;
      }
    }

    this._onUpdate = v.onUpdate;
    this._initted = true;
  };

  p._initProps = function (target, propLookup, siblings, overwrittenProps, index) {
    var p, i, initPlugins, plugin, pt, v;

    if (target == null) {
      return false;
    }

    if (_lazyLookup[target._gsTweenID]) {
      _lazyRender(); //if other tweens of the same target have recently initted but haven't rendered yet, we've got to force the render so that the starting values are correct (imagine populating a timeline with a bunch of sequential tweens and then jumping to the end)

    }

    if (!this.vars.css) if (target.style) if (target !== window && target.nodeType) if (_plugins.css) if (this.vars.autoCSS !== false) {
      //it's so common to use TweenLite/Max to animate the css of DOM elements, we assume that if the target is a DOM element, that's what is intended (a convenience so that users don't have to wrap things in css:{}, although we still recommend it for a slight performance boost and better specificity). Note: we cannot check "nodeType" on the window inside an iframe.
      _autoCSS(this.vars, target);
    }

    for (p in this.vars) {
      v = this.vars[p];

      if (_reservedProps[p]) {
        if (v) if (v instanceof Array || v.push && _isArray(v)) if (v.join("").indexOf("{self}") !== -1) {
          this.vars[p] = v = this._swapSelfInParams(v, this);
        }
      } else if (_plugins[p] && (plugin = new _plugins[p]())._onInitTween(target, this.vars[p], this, index)) {
        //t - target 		[object]
        //p - property 		[string]
        //s - start			[number]
        //c - change		[number]
        //f - isFunction	[boolean]
        //n - name			[string]
        //pg - isPlugin 	[boolean]
        //pr - priority		[number]
        //m - mod           [function | 0]
        this._firstPT = pt = {
          _next: this._firstPT,
          t: plugin,
          p: "setRatio",
          s: 0,
          c: 1,
          f: 1,
          n: p,
          pg: 1,
          pr: plugin._priority,
          m: 0
        };
        i = plugin._overwriteProps.length;

        while (--i > -1) {
          propLookup[plugin._overwriteProps[i]] = this._firstPT;
        }

        if (plugin._priority || plugin._onInitAllProps) {
          initPlugins = true;
        }

        if (plugin._onDisable || plugin._onEnable) {
          this._notifyPluginsOfEnabled = true;
        }

        if (pt._next) {
          pt._next._prev = pt;
        }
      } else {
        propLookup[p] = _addPropTween.call(this, target, p, "get", v, p, 0, null, this.vars.stringFilter, index);
      }
    }

    if (overwrittenProps) if (this._kill(overwrittenProps, target)) {
      //another tween may have tried to overwrite properties of this tween before init() was called (like if two tweens start at the same time, the one created second will run first)
      return this._initProps(target, propLookup, siblings, overwrittenProps, index);
    }
    if (this._overwrite > 1) if (this._firstPT) if (siblings.length > 1) if (_applyOverwrite(target, this, propLookup, this._overwrite, siblings)) {
      this._kill(propLookup, target);

      return this._initProps(target, propLookup, siblings, overwrittenProps, index);
    }
    if (this._firstPT) if (this.vars.lazy !== false && this._duration || this.vars.lazy && !this._duration) {
      //zero duration tweens don't lazy render by default; everything else does.
      _lazyLookup[target._gsTweenID] = true;
    }
    return initPlugins;
  };

  p.render = function (time, suppressEvents, force) {
    var prevTime = this._time,
        duration = this._duration,
        prevRawPrevTime = this._rawPrevTime,
        isComplete,
        callback,
        pt,
        rawPrevTime;

    if (time >= duration - 0.0000001 && time >= 0) {
      //to work around occasional floating point math artifacts.
      this._totalTime = this._time = duration;
      this.ratio = this._ease._calcEnd ? this._ease.getRatio(1) : 1;

      if (!this._reversed) {
        isComplete = true;
        callback = "onComplete";
        force = force || this._timeline.autoRemoveChildren; //otherwise, if the animation is unpaused/activated after it's already finished, it doesn't get removed from the parent timeline.
      }

      if (duration === 0) if (this._initted || !this.vars.lazy || force) {
        //zero-duration tweens are tricky because we must discern the momentum/direction of time in order to determine whether the starting values should be rendered or the ending values. If the "playhead" of its timeline goes past the zero-duration tween in the forward direction or lands directly on it, the end values should be rendered, but if the timeline's "playhead" moves past it in the backward direction (from a postitive time to a negative time), the starting values must be rendered.
        if (this._startTime === this._timeline._duration) {
          //if a zero-duration tween is at the VERY end of a timeline and that timeline renders at its end, it will typically add a tiny bit of cushion to the render time to prevent rounding errors from getting in the way of tweens rendering their VERY end. If we then reverse() that timeline, the zero-duration tween will trigger its onReverseComplete even though technically the playhead didn't pass over it again. It's a very specific edge case we must accommodate.
          time = 0;
        }

        if (prevRawPrevTime < 0 || time <= 0 && time >= -0.0000001 || prevRawPrevTime === _tinyNum && this.data !== "isPause") if (prevRawPrevTime !== time) {
          //note: when this.data is "isPause", it's a callback added by addPause() on a timeline that we should not be triggered when LEAVING its exact start time. In other words, tl.addPause(1).play(1) shouldn't pause.
          force = true;

          if (prevRawPrevTime > _tinyNum) {
            callback = "onReverseComplete";
          }
        }
        this._rawPrevTime = rawPrevTime = !suppressEvents || time || prevRawPrevTime === time ? time : _tinyNum; //when the playhead arrives at EXACTLY time 0 (right on top) of a zero-duration tween, we need to discern if events are suppressed so that when the playhead moves again (next time), it'll trigger the callback. If events are NOT suppressed, obviously the callback would be triggered in this render. Basically, the callback should fire either when the playhead ARRIVES or LEAVES this exact spot, not both. Imagine doing a timeline.seek(0) and there's a callback that sits at 0. Since events are suppressed on that seek() by default, nothing will fire, but when the playhead moves off of that position, the callback should fire. This behavior is what people intuitively expect. We set the _rawPrevTime to be a precise tiny number to indicate this scenario rather than using another property/variable which would increase memory usage. This technique is less readable, but more efficient.
      }
    } else if (time < 0.0000001) {
      //to work around occasional floating point math artifacts, round super small values to 0.
      this._totalTime = this._time = 0;
      this.ratio = this._ease._calcEnd ? this._ease.getRatio(0) : 0;

      if (prevTime !== 0 || duration === 0 && prevRawPrevTime > 0) {
        callback = "onReverseComplete";
        isComplete = this._reversed;
      }

      if (time < 0) {
        this._active = false;
        if (duration === 0) if (this._initted || !this.vars.lazy || force) {
          //zero-duration tweens are tricky because we must discern the momentum/direction of time in order to determine whether the starting values should be rendered or the ending values. If the "playhead" of its timeline goes past the zero-duration tween in the forward direction or lands directly on it, the end values should be rendered, but if the timeline's "playhead" moves past it in the backward direction (from a postitive time to a negative time), the starting values must be rendered.
          if (prevRawPrevTime >= 0 && !(prevRawPrevTime === _tinyNum && this.data === "isPause")) {
            force = true;
          }

          this._rawPrevTime = rawPrevTime = !suppressEvents || time || prevRawPrevTime === time ? time : _tinyNum; //when the playhead arrives at EXACTLY time 0 (right on top) of a zero-duration tween, we need to discern if events are suppressed so that when the playhead moves again (next time), it'll trigger the callback. If events are NOT suppressed, obviously the callback would be triggered in this render. Basically, the callback should fire either when the playhead ARRIVES or LEAVES this exact spot, not both. Imagine doing a timeline.seek(0) and there's a callback that sits at 0. Since events are suppressed on that seek() by default, nothing will fire, but when the playhead moves off of that position, the callback should fire. This behavior is what people intuitively expect. We set the _rawPrevTime to be a precise tiny number to indicate this scenario rather than using another property/variable which would increase memory usage. This technique is less readable, but more efficient.
        }
      }

      if (!this._initted || this._startAt && this._startAt.progress()) {
        //if we render the very beginning (time == 0) of a fromTo(), we must force the render (normal tweens wouldn't need to render at a time of 0 when the prevTime was also 0). This is also mandatory to make sure overwriting kicks in immediately. Also, we check progress() because if startAt has already rendered at its end, we should force a render at its beginning. Otherwise, if you put the playhead directly on top of where a fromTo({immediateRender:false}) starts, and then move it backwards, the from() won't revert its values.
        force = true;
      }
    } else {
      this._totalTime = this._time = time;

      if (this._easeType) {
        var r = time / duration,
            type = this._easeType,
            pow = this._easePower;

        if (type === 1 || type === 3 && r >= 0.5) {
          r = 1 - r;
        }

        if (type === 3) {
          r *= 2;
        }

        if (pow === 1) {
          r *= r;
        } else if (pow === 2) {
          r *= r * r;
        } else if (pow === 3) {
          r *= r * r * r;
        } else if (pow === 4) {
          r *= r * r * r * r;
        }

        if (type === 1) {
          this.ratio = 1 - r;
        } else if (type === 2) {
          this.ratio = r;
        } else if (time / duration < 0.5) {
          this.ratio = r / 2;
        } else {
          this.ratio = 1 - r / 2;
        }
      } else {
        this.ratio = this._ease.getRatio(time / duration);
      }
    }

    if (this._time === prevTime && !force) {
      return;
    } else if (!this._initted) {
      this._init();

      if (!this._initted || this._gc) {
        //immediateRender tweens typically won't initialize until the playhead advances (_time is greater than 0) in order to ensure that overwriting occurs properly. Also, if all of the tweening properties have been overwritten (which would cause _gc to be true, as set in _init()), we shouldn't continue otherwise an onStart callback could be called for example.
        return;
      } else if (!force && this._firstPT && (this.vars.lazy !== false && this._duration || this.vars.lazy && !this._duration)) {
        this._time = this._totalTime = prevTime;
        this._rawPrevTime = prevRawPrevTime;

        _lazyTweens.push(this);

        this._lazy = [time, suppressEvents];
        return;
      } //_ease is initially set to defaultEase, so now that init() has run, _ease is set properly and we need to recalculate the ratio. Overall this is faster than using conditional logic earlier in the method to avoid having to set ratio twice because we only init() once but renderTime() gets called VERY frequently.


      if (this._time && !isComplete) {
        this.ratio = this._ease.getRatio(this._time / duration);
      } else if (isComplete && this._ease._calcEnd) {
        this.ratio = this._ease.getRatio(this._time === 0 ? 0 : 1);
      }
    }

    if (this._lazy !== false) {
      //in case a lazy render is pending, we should flush it because the new render is occurring now (imagine a lazy tween instantiating and then immediately the user calls tween.seek(tween.duration()), skipping to the end - the end render would be forced, and then if we didn't flush the lazy render, it'd fire AFTER the seek(), rendering it at the wrong time.
      this._lazy = false;
    }

    if (!this._active) if (!this._paused && this._time !== prevTime && time >= 0) {
      this._active = true; //so that if the user renders a tween (as opposed to the timeline rendering it), the timeline is forced to re-render and align it with the proper time/frame on the next rendering cycle. Maybe the tween already finished but the user manually re-renders it as halfway done.
    }

    if (prevTime === 0) {
      if (this._startAt) {
        if (time >= 0) {
          this._startAt.render(time, true, force);
        } else if (!callback) {
          callback = "_dummyGS"; //if no callback is defined, use a dummy value just so that the condition at the end evaluates as true because _startAt should render AFTER the normal render loop when the time is negative. We could handle this in a more intuitive way, of course, but the render loop is the MOST important thing to optimize, so this technique allows us to avoid adding extra conditional logic in a high-frequency area.
        }
      }

      if (this.vars.onStart) if (this._time !== 0 || duration === 0) if (!suppressEvents) {
        this._callback("onStart");
      }
    }

    pt = this._firstPT;

    while (pt) {
      if (pt.f) {
        pt.t[pt.p](pt.c * this.ratio + pt.s);
      } else {
        pt.t[pt.p] = pt.c * this.ratio + pt.s;
      }

      pt = pt._next;
    }

    if (this._onUpdate) {
      if (time < 0) if (this._startAt && time !== -0.0001) {
        //if the tween is positioned at the VERY beginning (_startTime 0) of its parent timeline, it's illegal for the playhead to go back further, so we should not render the recorded startAt values.
        this._startAt.render(time, true, force); //note: for performance reasons, we tuck this conditional logic inside less traveled areas (most tweens don't have an onUpdate). We'd just have it at the end before the onComplete, but the values should be updated before any onUpdate is called, so we ALSO put it here and then if it's not called, we do so later near the onComplete.

      }
      if (!suppressEvents) if (this._time !== prevTime || isComplete || force) {
        this._callback("onUpdate");
      }
    }

    if (callback) if (!this._gc || force) {
      //check _gc because there's a chance that kill() could be called in an onUpdate
      if (time < 0 && this._startAt && !this._onUpdate && time !== -0.0001) {
        //-0.0001 is a special value that we use when looping back to the beginning of a repeated TimelineMax, in which case we shouldn't render the _startAt values.
        this._startAt.render(time, true, force);
      }

      if (isComplete) {
        if (this._timeline.autoRemoveChildren) {
          this._enabled(false, false);
        }

        this._active = false;
      }

      if (!suppressEvents && this.vars[callback]) {
        this._callback(callback);
      }

      if (duration === 0 && this._rawPrevTime === _tinyNum && rawPrevTime !== _tinyNum) {
        //the onComplete or onReverseComplete could trigger movement of the playhead and for zero-duration tweens (which must discern direction) that land directly back on their start time, we don't want to fire again on the next render. Think of several addPause()'s in a timeline that forces the playhead to a certain spot, but what if it's already paused and another tween is tweening the "time" of the timeline? Each time it moves [forward] past that spot, it would move back, and since suppressEvents is true, it'd reset _rawPrevTime to _tinyNum so that when it begins again, the callback would fire (so ultimately it could bounce back and forth during that tween). Again, this is a very uncommon scenario, but possible nonetheless.
        this._rawPrevTime = 0;
      }
    }
  };

  p._kill = function (vars, target, overwritingTween) {
    if (vars === "all") {
      vars = null;
    }

    if (vars == null) if (target == null || target === this.target) {
      this._lazy = false;
      return this._enabled(false, false);
    }
    target = typeof target !== "string" ? target || this._targets || this.target : TweenLite.selector(target) || target;
    var simultaneousOverwrite = overwritingTween && this._time && overwritingTween._startTime === this._startTime && this._timeline === overwritingTween._timeline,
        firstPT = this._firstPT,
        i,
        overwrittenProps,
        p,
        pt,
        propLookup,
        changed,
        killProps,
        record,
        killed;

    if ((_isArray(target) || _isSelector(target)) && typeof target[0] !== "number") {
      i = target.length;

      while (--i > -1) {
        if (this._kill(vars, target[i], overwritingTween)) {
          changed = true;
        }
      }
    } else {
      if (this._targets) {
        i = this._targets.length;

        while (--i > -1) {
          if (target === this._targets[i]) {
            propLookup = this._propLookup[i] || {};
            this._overwrittenProps = this._overwrittenProps || [];
            overwrittenProps = this._overwrittenProps[i] = vars ? this._overwrittenProps[i] || {} : "all";
            break;
          }
        }
      } else if (target !== this.target) {
        return false;
      } else {
        propLookup = this._propLookup;
        overwrittenProps = this._overwrittenProps = vars ? this._overwrittenProps || {} : "all";
      }

      if (propLookup) {
        killProps = vars || propLookup;
        record = vars !== overwrittenProps && overwrittenProps !== "all" && vars !== propLookup && (typeof vars !== "object" || !vars._tempKill); //_tempKill is a super-secret way to delete a particular tweening property but NOT have it remembered as an official overwritten property (like in BezierPlugin)

        if (overwritingTween && (TweenLite.onOverwrite || this.vars.onOverwrite)) {
          for (p in killProps) {
            if (propLookup[p]) {
              if (!killed) {
                killed = [];
              }

              killed.push(p);
            }
          }

          if ((killed || !vars) && !_onOverwrite(this, overwritingTween, target, killed)) {
            //if the onOverwrite returned false, that means the user wants to override the overwriting (cancel it).
            return false;
          }
        }

        for (p in killProps) {
          if (pt = propLookup[p]) {
            if (simultaneousOverwrite) {
              //if another tween overwrites this one and they both start at exactly the same time, yet this tween has already rendered once (for example, at 0.001) because it's first in the queue, we should revert the values to where they were at 0 so that the starting values aren't contaminated on the overwriting tween.
              if (pt.f) {
                pt.t[pt.p](pt.s);
              } else {
                pt.t[pt.p] = pt.s;
              }

              changed = true;
            }

            if (pt.pg && pt.t._kill(killProps)) {
              changed = true; //some plugins need to be notified so they can perform cleanup tasks first
            }

            if (!pt.pg || pt.t._overwriteProps.length === 0) {
              if (pt._prev) {
                pt._prev._next = pt._next;
              } else if (pt === this._firstPT) {
                this._firstPT = pt._next;
              }

              if (pt._next) {
                pt._next._prev = pt._prev;
              }

              pt._next = pt._prev = null;
            }

            delete propLookup[p];
          }

          if (record) {
            overwrittenProps[p] = 1;
          }
        }

        if (!this._firstPT && this._initted && firstPT) {
          //if all tweening properties are killed, kill the tween. Without this line, if there's a tween with multiple targets and then you killTweensOf() each target individually, the tween would technically still remain active and fire its onComplete even though there aren't any more properties tweening.
          this._enabled(false, false);
        }
      }
    }

    return changed;
  };

  p.invalidate = function () {
    if (this._notifyPluginsOfEnabled) {
      TweenLite._onPluginEvent("_onDisable", this);
    }

    this._firstPT = this._overwrittenProps = this._startAt = this._onUpdate = null;
    this._notifyPluginsOfEnabled = this._active = this._lazy = false;
    this._propLookup = this._targets ? {} : [];
    Animation.prototype.invalidate.call(this);

    if (this.vars.immediateRender) {
      this._time = -_tinyNum; //forces a render without having to set the render() "force" parameter to true because we want to allow lazying by default (using the "force" parameter always forces an immediate full render)

      this.render(Math.min(0, -this._delay)); //in case delay is negative.
    }

    return this;
  };

  p._enabled = function (enabled, ignoreTimeline) {
    if (!_tickerActive) {
      _ticker.wake();
    }

    if (enabled && this._gc) {
      var targets = this._targets,
          i;

      if (targets) {
        i = targets.length;

        while (--i > -1) {
          this._siblings[i] = _register(targets[i], this, true);
        }
      } else {
        this._siblings = _register(this.target, this, true);
      }
    }

    Animation.prototype._enabled.call(this, enabled, ignoreTimeline);

    if (this._notifyPluginsOfEnabled) if (this._firstPT) {
      return TweenLite._onPluginEvent(enabled ? "_onEnable" : "_onDisable", this);
    }
    return false;
  }; //----TweenLite static methods -----------------------------------------------------


  TweenLite.to = function (target, duration, vars) {
    return new TweenLite(target, duration, vars);
  };

  TweenLite.from = function (target, duration, vars) {
    vars.runBackwards = true;
    vars.immediateRender = vars.immediateRender != false;
    return new TweenLite(target, duration, vars);
  };

  TweenLite.fromTo = function (target, duration, fromVars, toVars) {
    toVars.startAt = fromVars;
    toVars.immediateRender = toVars.immediateRender != false && fromVars.immediateRender != false;
    return new TweenLite(target, duration, toVars);
  };

  TweenLite.delayedCall = function (delay, callback, params, scope, useFrames) {
    return new TweenLite(callback, 0, {
      delay: delay,
      onComplete: callback,
      onCompleteParams: params,
      callbackScope: scope,
      onReverseComplete: callback,
      onReverseCompleteParams: params,
      immediateRender: false,
      lazy: false,
      useFrames: useFrames,
      overwrite: 0
    });
  };

  TweenLite.set = function (target, vars) {
    return new TweenLite(target, 0, vars);
  };

  TweenLite.getTweensOf = function (target, onlyActive) {
    if (target == null) {
      return [];
    }

    target = typeof target !== "string" ? target : TweenLite.selector(target) || target;
    var i, a, j, t;

    if ((_isArray(target) || _isSelector(target)) && typeof target[0] !== "number") {
      i = target.length;
      a = [];

      while (--i > -1) {
        a = a.concat(TweenLite.getTweensOf(target[i], onlyActive));
      }

      i = a.length; //now get rid of any duplicates (tweens of arrays of objects could cause duplicates)

      while (--i > -1) {
        t = a[i];
        j = i;

        while (--j > -1) {
          if (t === a[j]) {
            a.splice(i, 1);
          }
        }
      }
    } else if (target._gsTweenID) {
      a = _register(target).concat();
      i = a.length;

      while (--i > -1) {
        if (a[i]._gc || onlyActive && !a[i].isActive()) {
          a.splice(i, 1);
        }
      }
    }

    return a || [];
  };

  TweenLite.killTweensOf = TweenLite.killDelayedCallsTo = function (target, onlyActive, vars) {
    if (typeof onlyActive === "object") {
      vars = onlyActive; //for backwards compatibility (before "onlyActive" parameter was inserted)

      onlyActive = false;
    }

    var a = TweenLite.getTweensOf(target, onlyActive),
        i = a.length;

    while (--i > -1) {
      a[i]._kill(vars, target);
    }
  };
  /*
   * ----------------------------------------------------------------
   * TweenPlugin   (could easily be split out as a separate file/class, but included for ease of use (so that people don't need to include another script call before loading plugins which is easy to forget)
   * ----------------------------------------------------------------
   */


  var TweenPlugin = _class("plugins.TweenPlugin", function (props, priority) {
    this._overwriteProps = (props || "").split(",");
    this._propName = this._overwriteProps[0];
    this._priority = priority || 0;
    this._super = TweenPlugin.prototype;
  }, true);

  p = TweenPlugin.prototype;
  TweenPlugin.version = "1.19.0";
  TweenPlugin.API = 2;
  p._firstPT = null;
  p._addTween = _addPropTween;
  p.setRatio = _setRatio;

  p._kill = function (lookup) {
    var a = this._overwriteProps,
        pt = this._firstPT,
        i;

    if (lookup[this._propName] != null) {
      this._overwriteProps = [];
    } else {
      i = a.length;

      while (--i > -1) {
        if (lookup[a[i]] != null) {
          a.splice(i, 1);
        }
      }
    }

    while (pt) {
      if (lookup[pt.n] != null) {
        if (pt._next) {
          pt._next._prev = pt._prev;
        }

        if (pt._prev) {
          pt._prev._next = pt._next;
          pt._prev = null;
        } else if (this._firstPT === pt) {
          this._firstPT = pt._next;
        }
      }

      pt = pt._next;
    }

    return false;
  };

  p._mod = p._roundProps = function (lookup) {
    var pt = this._firstPT,
        val;

    while (pt) {
      val = lookup[this._propName] || pt.n != null && lookup[pt.n.split(this._propName + "_").join("")];

      if (val && typeof val === "function") {
        //some properties that are very plugin-specific add a prefix named after the _propName plus an underscore, so we need to ignore that extra stuff here.
        if (pt.f === 2) {
          pt.t._applyPT.m = val;
        } else {
          pt.m = val;
        }
      }

      pt = pt._next;
    }
  };

  TweenLite._onPluginEvent = function (type, tween) {
    var pt = tween._firstPT,
        changed,
        pt2,
        first,
        last,
        next;

    if (type === "_onInitAllProps") {
      //sorts the PropTween linked list in order of priority because some plugins need to render earlier/later than others, like MotionBlurPlugin applies its effects after all x/y/alpha tweens have rendered on each frame.
      while (pt) {
        next = pt._next;
        pt2 = first;

        while (pt2 && pt2.pr > pt.pr) {
          pt2 = pt2._next;
        }

        if (pt._prev = pt2 ? pt2._prev : last) {
          pt._prev._next = pt;
        } else {
          first = pt;
        }

        if (pt._next = pt2) {
          pt2._prev = pt;
        } else {
          last = pt;
        }

        pt = next;
      }

      pt = tween._firstPT = first;
    }

    while (pt) {
      if (pt.pg) if (typeof pt.t[type] === "function") if (pt.t[type]()) {
        changed = true;
      }
      pt = pt._next;
    }

    return changed;
  };

  TweenPlugin.activate = function (plugins) {
    var i = plugins.length;

    while (--i > -1) {
      if (plugins[i].API === TweenPlugin.API) {
        _plugins[new plugins[i]()._propName] = plugins[i];
      }
    }

    return true;
  }; //provides a more concise way to define plugins that have no dependencies besides TweenPlugin and TweenLite, wrapping common boilerplate stuff into one function (added in 1.9.0). You don't NEED to use this to define a plugin - the old way still works and can be useful in certain (rare) situations.


  _gsDefine.plugin = function (config) {
    if (!config || !config.propName || !config.init || !config.API) {
      throw "illegal plugin definition.";
    }

    var propName = config.propName,
        priority = config.priority || 0,
        overwriteProps = config.overwriteProps,
        map = {
      init: "_onInitTween",
      set: "setRatio",
      kill: "_kill",
      round: "_mod",
      mod: "_mod",
      initAll: "_onInitAllProps"
    },
        Plugin = _class("plugins." + propName.charAt(0).toUpperCase() + propName.substr(1) + "Plugin", function () {
      TweenPlugin.call(this, propName, priority);
      this._overwriteProps = overwriteProps || [];
    }, config.global === true),
        p = Plugin.prototype = new TweenPlugin(propName),
        prop;

    p.constructor = Plugin;
    Plugin.API = config.API;

    for (prop in map) {
      if (typeof config[prop] === "function") {
        p[map[prop]] = config[prop];
      }
    }

    Plugin.version = config.version;
    TweenPlugin.activate([Plugin]);
    return Plugin;
  }; //now run through all the dependencies discovered and if any are missing, log that to the console as a warning. This is why it's best to have TweenLite load last - it can check all the dependencies for you.


  a = window._gsQueue;

  if (a) {
    for (i = 0; i < a.length; i++) {
      a[i]();
    }

    for (p in _defLookup) {
      if (!_defLookup[p].func) {
        window.console.log("GSAP encountered missing dependency: " + p);
      }
    }
  }

  _tickerActive = false; //ensures that the first official animation forces a ticker.tick() to update the time when it is instantiated

  return TweenLite;
}(_gsScope, "TweenLite");

exports.default = exports.TweenLite = TweenLite;
var globals = _gsScope.GreenSockGlobals;
exports.globals = globals;
var nonGlobals = globals.com.greensock;
var SimpleTimeline = nonGlobals.core.SimpleTimeline;
exports.SimpleTimeline = SimpleTimeline;
var Animation = nonGlobals.core.Animation;
exports.Animation = Animation;
var Ease = globals.Ease;
exports.Ease = Ease;
var Linear = globals.Linear;
exports.Linear = Linear;
var Power0 = Linear;
exports.Power0 = Power0;
var Power1 = globals.Power1;
exports.Power1 = Power1;
var Power2 = globals.Power2;
exports.Power2 = Power2;
var Power3 = globals.Power3;
exports.Power3 = Power3;
var Power4 = globals.Power4;
exports.Power4 = Power4;
var TweenPlugin = globals.TweenPlugin;
exports.TweenPlugin = TweenPlugin;
var EventDispatcher = nonGlobals.events.EventDispatcher;
exports.EventDispatcher = EventDispatcher;
},{}],"node_modules/gsap/TweenMaxBase.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
Object.defineProperty(exports, "TweenLite", {
  enumerable: true,
  get: function () {
    return _TweenLite.default;
  }
});
Object.defineProperty(exports, "Ease", {
  enumerable: true,
  get: function () {
    return _TweenLite.Ease;
  }
});
Object.defineProperty(exports, "Power0", {
  enumerable: true,
  get: function () {
    return _TweenLite.Power0;
  }
});
Object.defineProperty(exports, "Power1", {
  enumerable: true,
  get: function () {
    return _TweenLite.Power1;
  }
});
Object.defineProperty(exports, "Power2", {
  enumerable: true,
  get: function () {
    return _TweenLite.Power2;
  }
});
Object.defineProperty(exports, "Power3", {
  enumerable: true,
  get: function () {
    return _TweenLite.Power3;
  }
});
Object.defineProperty(exports, "Power4", {
  enumerable: true,
  get: function () {
    return _TweenLite.Power4;
  }
});
Object.defineProperty(exports, "Linear", {
  enumerable: true,
  get: function () {
    return _TweenLite.Linear;
  }
});
exports.TweenMaxBase = exports.default = exports.TweenMax = void 0;

var _TweenLite = _interopRequireWildcard(require("./TweenLite.js"));

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

/*!
 * VERSION: 2.0.2
 * DATE: 2018-08-27
 * UPDATES AND DOCS AT: http://greensock.com
 *
 * @license Copyright (c) 2008-2018, GreenSock. All rights reserved.
 * This work is subject to the terms at http://greensock.com/standard-license or for
 * Club GreenSock members, the software agreement that was issued with your membership.
 * 
 * @author: Jack Doyle, jack@greensock.com
 **/
_TweenLite._gsScope._gsDefine("TweenMax", ["core.Animation", "core.SimpleTimeline", "TweenLite"], function () {
  var _slice = function (a) {
    //don't use [].slice because that doesn't work in IE8 with a NodeList that's returned by querySelectorAll()
    var b = [],
        l = a.length,
        i;

    for (i = 0; i !== l; b.push(a[i++]));

    return b;
  },
      _applyCycle = function (vars, targets, i) {
    var alt = vars.cycle,
        p,
        val;

    for (p in alt) {
      val = alt[p];
      vars[p] = typeof val === "function" ? val(i, targets[i]) : val[i % val.length];
    }

    delete vars.cycle;
  },
      TweenMax = function (target, duration, vars) {
    _TweenLite.default.call(this, target, duration, vars);

    this._cycle = 0;
    this._yoyo = this.vars.yoyo === true || !!this.vars.yoyoEase;
    this._repeat = this.vars.repeat || 0;
    this._repeatDelay = this.vars.repeatDelay || 0;

    if (this._repeat) {
      this._uncache(true); //ensures that if there is any repeat, the totalDuration will get recalculated to accurately report it.

    }

    this.render = TweenMax.prototype.render; //speed optimization (avoid prototype lookup on this "hot" method)
  },
      _tinyNum = 0.0000000001,
      TweenLiteInternals = _TweenLite.default._internals,
      _isSelector = TweenLiteInternals.isSelector,
      _isArray = TweenLiteInternals.isArray,
      p = TweenMax.prototype = _TweenLite.default.to({}, 0.1, {}),
      _blankArray = [];

  TweenMax.version = "2.0.2";
  p.constructor = TweenMax;
  p.kill()._gc = false;
  TweenMax.killTweensOf = TweenMax.killDelayedCallsTo = _TweenLite.default.killTweensOf;
  TweenMax.getTweensOf = _TweenLite.default.getTweensOf;
  TweenMax.lagSmoothing = _TweenLite.default.lagSmoothing;
  TweenMax.ticker = _TweenLite.default.ticker;
  TweenMax.render = _TweenLite.default.render;

  p.invalidate = function () {
    this._yoyo = this.vars.yoyo === true || !!this.vars.yoyoEase;
    this._repeat = this.vars.repeat || 0;
    this._repeatDelay = this.vars.repeatDelay || 0;
    this._yoyoEase = null;

    this._uncache(true);

    return _TweenLite.default.prototype.invalidate.call(this);
  };

  p.updateTo = function (vars, resetDuration) {
    var curRatio = this.ratio,
        immediate = this.vars.immediateRender || vars.immediateRender,
        p;

    if (resetDuration && this._startTime < this._timeline._time) {
      this._startTime = this._timeline._time;

      this._uncache(false);

      if (this._gc) {
        this._enabled(true, false);
      } else {
        this._timeline.insert(this, this._startTime - this._delay); //ensures that any necessary re-sequencing of Animations in the timeline occurs to make sure the rendering order is correct.

      }
    }

    for (p in vars) {
      this.vars[p] = vars[p];
    }

    if (this._initted || immediate) {
      if (resetDuration) {
        this._initted = false;

        if (immediate) {
          this.render(0, true, true);
        }
      } else {
        if (this._gc) {
          this._enabled(true, false);
        }

        if (this._notifyPluginsOfEnabled && this._firstPT) {
          _TweenLite.default._onPluginEvent("_onDisable", this); //in case a plugin like MotionBlur must perform some cleanup tasks

        }

        if (this._time / this._duration > 0.998) {
          //if the tween has finished (or come extremely close to finishing), we just need to rewind it to 0 and then render it again at the end which forces it to re-initialize (parsing the new vars). We allow tweens that are close to finishing (but haven't quite finished) to work this way too because otherwise, the values are so small when determining where to project the starting values that binary math issues creep in and can make the tween appear to render incorrectly when run backwards.
          var prevTime = this._totalTime;
          this.render(0, true, false);
          this._initted = false;
          this.render(prevTime, true, false);
        } else {
          this._initted = false;

          this._init();

          if (this._time > 0 || immediate) {
            var inv = 1 / (1 - curRatio),
                pt = this._firstPT,
                endValue;

            while (pt) {
              endValue = pt.s + pt.c;
              pt.c *= inv;
              pt.s = endValue - pt.c;
              pt = pt._next;
            }
          }
        }
      }
    }

    return this;
  };

  p.render = function (time, suppressEvents, force) {
    if (!this._initted) if (this._duration === 0 && this.vars.repeat) {
      //zero duration tweens that render immediately have render() called from TweenLite's constructor, before TweenMax's constructor has finished setting _repeat, _repeatDelay, and _yoyo which are critical in determining totalDuration() so we need to call invalidate() which is a low-kb way to get those set properly.
      this.invalidate();
    }
    var totalDur = !this._dirty ? this._totalDuration : this.totalDuration(),
        prevTime = this._time,
        prevTotalTime = this._totalTime,
        prevCycle = this._cycle,
        duration = this._duration,
        prevRawPrevTime = this._rawPrevTime,
        isComplete,
        callback,
        pt,
        cycleDuration,
        r,
        type,
        pow,
        rawPrevTime,
        yoyoEase;

    if (time >= totalDur - 0.0000001 && time >= 0) {
      //to work around occasional floating point math artifacts.
      this._totalTime = totalDur;
      this._cycle = this._repeat;

      if (this._yoyo && (this._cycle & 1) !== 0) {
        this._time = 0;
        this.ratio = this._ease._calcEnd ? this._ease.getRatio(0) : 0;
      } else {
        this._time = duration;
        this.ratio = this._ease._calcEnd ? this._ease.getRatio(1) : 1;
      }

      if (!this._reversed) {
        isComplete = true;
        callback = "onComplete";
        force = force || this._timeline.autoRemoveChildren; //otherwise, if the animation is unpaused/activated after it's already finished, it doesn't get removed from the parent timeline.
      }

      if (duration === 0) if (this._initted || !this.vars.lazy || force) {
        //zero-duration tweens are tricky because we must discern the momentum/direction of time in order to determine whether the starting values should be rendered or the ending values. If the "playhead" of its timeline goes past the zero-duration tween in the forward direction or lands directly on it, the end values should be rendered, but if the timeline's "playhead" moves past it in the backward direction (from a postitive time to a negative time), the starting values must be rendered.
        if (this._startTime === this._timeline._duration) {
          //if a zero-duration tween is at the VERY end of a timeline and that timeline renders at its end, it will typically add a tiny bit of cushion to the render time to prevent rounding errors from getting in the way of tweens rendering their VERY end. If we then reverse() that timeline, the zero-duration tween will trigger its onReverseComplete even though technically the playhead didn't pass over it again. It's a very specific edge case we must accommodate.
          time = 0;
        }

        if (prevRawPrevTime < 0 || time <= 0 && time >= -0.0000001 || prevRawPrevTime === _tinyNum && this.data !== "isPause") if (prevRawPrevTime !== time) {
          //note: when this.data is "isPause", it's a callback added by addPause() on a timeline that we should not be triggered when LEAVING its exact start time. In other words, tl.addPause(1).play(1) shouldn't pause.
          force = true;

          if (prevRawPrevTime > _tinyNum) {
            callback = "onReverseComplete";
          }
        }
        this._rawPrevTime = rawPrevTime = !suppressEvents || time || prevRawPrevTime === time ? time : _tinyNum; //when the playhead arrives at EXACTLY time 0 (right on top) of a zero-duration tween, we need to discern if events are suppressed so that when the playhead moves again (next time), it'll trigger the callback. If events are NOT suppressed, obviously the callback would be triggered in this render. Basically, the callback should fire either when the playhead ARRIVES or LEAVES this exact spot, not both. Imagine doing a timeline.seek(0) and there's a callback that sits at 0. Since events are suppressed on that seek() by default, nothing will fire, but when the playhead moves off of that position, the callback should fire. This behavior is what people intuitively expect. We set the _rawPrevTime to be a precise tiny number to indicate this scenario rather than using another property/variable which would increase memory usage. This technique is less readable, but more efficient.
      }
    } else if (time < 0.0000001) {
      //to work around occasional floating point math artifacts, round super small values to 0.
      this._totalTime = this._time = this._cycle = 0;
      this.ratio = this._ease._calcEnd ? this._ease.getRatio(0) : 0;

      if (prevTotalTime !== 0 || duration === 0 && prevRawPrevTime > 0) {
        callback = "onReverseComplete";
        isComplete = this._reversed;
      }

      if (time < 0) {
        this._active = false;
        if (duration === 0) if (this._initted || !this.vars.lazy || force) {
          //zero-duration tweens are tricky because we must discern the momentum/direction of time in order to determine whether the starting values should be rendered or the ending values. If the "playhead" of its timeline goes past the zero-duration tween in the forward direction or lands directly on it, the end values should be rendered, but if the timeline's "playhead" moves past it in the backward direction (from a postitive time to a negative time), the starting values must be rendered.
          if (prevRawPrevTime >= 0) {
            force = true;
          }

          this._rawPrevTime = rawPrevTime = !suppressEvents || time || prevRawPrevTime === time ? time : _tinyNum; //when the playhead arrives at EXACTLY time 0 (right on top) of a zero-duration tween, we need to discern if events are suppressed so that when the playhead moves again (next time), it'll trigger the callback. If events are NOT suppressed, obviously the callback would be triggered in this render. Basically, the callback should fire either when the playhead ARRIVES or LEAVES this exact spot, not both. Imagine doing a timeline.seek(0) and there's a callback that sits at 0. Since events are suppressed on that seek() by default, nothing will fire, but when the playhead moves off of that position, the callback should fire. This behavior is what people intuitively expect. We set the _rawPrevTime to be a precise tiny number to indicate this scenario rather than using another property/variable which would increase memory usage. This technique is less readable, but more efficient.
        }
      }

      if (!this._initted) {
        //if we render the very beginning (time == 0) of a fromTo(), we must force the render (normal tweens wouldn't need to render at a time of 0 when the prevTime was also 0). This is also mandatory to make sure overwriting kicks in immediately.
        force = true;
      }
    } else {
      this._totalTime = this._time = time;

      if (this._repeat !== 0) {
        cycleDuration = duration + this._repeatDelay;
        this._cycle = this._totalTime / cycleDuration >> 0; //originally _totalTime % cycleDuration but floating point errors caused problems, so I normalized it. (4 % 0.8 should be 0 but some browsers report it as 0.79999999!)

        if (this._cycle !== 0) if (this._cycle === this._totalTime / cycleDuration && prevTotalTime <= time) {
          this._cycle--; //otherwise when rendered exactly at the end time, it will act as though it is repeating (at the beginning)
        }
        this._time = this._totalTime - this._cycle * cycleDuration;
        if (this._yoyo) if ((this._cycle & 1) !== 0) {
          this._time = duration - this._time;
          yoyoEase = this._yoyoEase || this.vars.yoyoEase; //note: we don't set this._yoyoEase in _init() like we do other properties because it's TweenMax-specific and doing it here allows us to optimize performance (most tweens don't have a yoyoEase). Note that we also must skip the this.ratio calculation further down right after we _init() in this function, because we're doing it here.

          if (yoyoEase) {
            if (!this._yoyoEase) {
              if (yoyoEase === true && !this._initted) {
                //if it's not initted and yoyoEase is true, this._ease won't have been populated yet so we must discern it here.
                yoyoEase = this.vars.ease;
                this._yoyoEase = yoyoEase = !yoyoEase ? _TweenLite.default.defaultEase : yoyoEase instanceof _TweenLite.Ease ? yoyoEase : typeof yoyoEase === "function" ? new _TweenLite.Ease(yoyoEase, this.vars.easeParams) : _TweenLite.Ease.map[yoyoEase] || _TweenLite.default.defaultEase;
              } else {
                this._yoyoEase = yoyoEase = yoyoEase === true ? this._ease : yoyoEase instanceof _TweenLite.Ease ? yoyoEase : _TweenLite.Ease.map[yoyoEase];
              }
            }

            this.ratio = yoyoEase ? 1 - yoyoEase.getRatio((duration - this._time) / duration) : 0;
          }
        }

        if (this._time > duration) {
          this._time = duration;
        } else if (this._time < 0) {
          this._time = 0;
        }
      }

      if (this._easeType && !yoyoEase) {
        r = this._time / duration;
        type = this._easeType;
        pow = this._easePower;

        if (type === 1 || type === 3 && r >= 0.5) {
          r = 1 - r;
        }

        if (type === 3) {
          r *= 2;
        }

        if (pow === 1) {
          r *= r;
        } else if (pow === 2) {
          r *= r * r;
        } else if (pow === 3) {
          r *= r * r * r;
        } else if (pow === 4) {
          r *= r * r * r * r;
        }

        if (type === 1) {
          this.ratio = 1 - r;
        } else if (type === 2) {
          this.ratio = r;
        } else if (this._time / duration < 0.5) {
          this.ratio = r / 2;
        } else {
          this.ratio = 1 - r / 2;
        }
      } else if (!yoyoEase) {
        this.ratio = this._ease.getRatio(this._time / duration);
      }
    }

    if (prevTime === this._time && !force && prevCycle === this._cycle) {
      if (prevTotalTime !== this._totalTime) if (this._onUpdate) if (!suppressEvents) {
        //so that onUpdate fires even during the repeatDelay - as long as the totalTime changed, we should trigger onUpdate.
        this._callback("onUpdate");
      }
      return;
    } else if (!this._initted) {
      this._init();

      if (!this._initted || this._gc) {
        //immediateRender tweens typically won't initialize until the playhead advances (_time is greater than 0) in order to ensure that overwriting occurs properly. Also, if all of the tweening properties have been overwritten (which would cause _gc to be true, as set in _init()), we shouldn't continue otherwise an onStart callback could be called for example.
        return;
      } else if (!force && this._firstPT && (this.vars.lazy !== false && this._duration || this.vars.lazy && !this._duration)) {
        //we stick it in the queue for rendering at the very end of the tick - this is a performance optimization because browsers invalidate styles and force a recalculation if you read, write, and then read style data (so it's better to read/read/read/write/write/write than read/write/read/write/read/write). The down side, of course, is that usually you WANT things to render immediately because you may have code running right after that which depends on the change. Like imagine running TweenLite.set(...) and then immediately after that, creating a nother tween that animates the same property to another value; the starting values of that 2nd tween wouldn't be accurate if lazy is true.
        this._time = prevTime;
        this._totalTime = prevTotalTime;
        this._rawPrevTime = prevRawPrevTime;
        this._cycle = prevCycle;
        TweenLiteInternals.lazyTweens.push(this);
        this._lazy = [time, suppressEvents];
        return;
      } //_ease is initially set to defaultEase, so now that init() has run, _ease is set properly and we need to recalculate the ratio. Overall this is faster than using conditional logic earlier in the method to avoid having to set ratio twice because we only init() once but renderTime() gets called VERY frequently.


      if (this._time && !isComplete && !yoyoEase) {
        this.ratio = this._ease.getRatio(this._time / duration);
      } else if (isComplete && this._ease._calcEnd && !yoyoEase) {
        this.ratio = this._ease.getRatio(this._time === 0 ? 0 : 1);
      }
    }

    if (this._lazy !== false) {
      this._lazy = false;
    }

    if (!this._active) if (!this._paused && this._time !== prevTime && time >= 0) {
      this._active = true; //so that if the user renders a tween (as opposed to the timeline rendering it), the timeline is forced to re-render and align it with the proper time/frame on the next rendering cycle. Maybe the tween already finished but the user manually re-renders it as halfway done.
    }

    if (prevTotalTime === 0) {
      if (this._initted === 2 && time > 0) {
        //this.invalidate();
        this._init(); //will just apply overwriting since _initted of (2) means it was a from() tween that had immediateRender:true

      }

      if (this._startAt) {
        if (time >= 0) {
          this._startAt.render(time, true, force);
        } else if (!callback) {
          callback = "_dummyGS"; //if no callback is defined, use a dummy value just so that the condition at the end evaluates as true because _startAt should render AFTER the normal render loop when the time is negative. We could handle this in a more intuitive way, of course, but the render loop is the MOST important thing to optimize, so this technique allows us to avoid adding extra conditional logic in a high-frequency area.
        }
      }

      if (this.vars.onStart) if (this._totalTime !== 0 || duration === 0) if (!suppressEvents) {
        this._callback("onStart");
      }
    }

    pt = this._firstPT;

    while (pt) {
      if (pt.f) {
        pt.t[pt.p](pt.c * this.ratio + pt.s);
      } else {
        pt.t[pt.p] = pt.c * this.ratio + pt.s;
      }

      pt = pt._next;
    }

    if (this._onUpdate) {
      if (time < 0) if (this._startAt && this._startTime) {
        //if the tween is positioned at the VERY beginning (_startTime 0) of its parent timeline, it's illegal for the playhead to go back further, so we should not render the recorded startAt values.
        this._startAt.render(time, true, force); //note: for performance reasons, we tuck this conditional logic inside less traveled areas (most tweens don't have an onUpdate). We'd just have it at the end before the onComplete, but the values should be updated before any onUpdate is called, so we ALSO put it here and then if it's not called, we do so later near the onComplete.

      }
      if (!suppressEvents) if (this._totalTime !== prevTotalTime || callback) {
        this._callback("onUpdate");
      }
    }

    if (this._cycle !== prevCycle) if (!suppressEvents) if (!this._gc) if (this.vars.onRepeat) {
      this._callback("onRepeat");
    }
    if (callback) if (!this._gc || force) {
      //check gc because there's a chance that kill() could be called in an onUpdate
      if (time < 0 && this._startAt && !this._onUpdate && this._startTime) {
        //if the tween is positioned at the VERY beginning (_startTime 0) of its parent timeline, it's illegal for the playhead to go back further, so we should not render the recorded startAt values.
        this._startAt.render(time, true, force);
      }

      if (isComplete) {
        if (this._timeline.autoRemoveChildren) {
          this._enabled(false, false);
        }

        this._active = false;
      }

      if (!suppressEvents && this.vars[callback]) {
        this._callback(callback);
      }

      if (duration === 0 && this._rawPrevTime === _tinyNum && rawPrevTime !== _tinyNum) {
        //the onComplete or onReverseComplete could trigger movement of the playhead and for zero-duration tweens (which must discern direction) that land directly back on their start time, we don't want to fire again on the next render. Think of several addPause()'s in a timeline that forces the playhead to a certain spot, but what if it's already paused and another tween is tweening the "time" of the timeline? Each time it moves [forward] past that spot, it would move back, and since suppressEvents is true, it'd reset _rawPrevTime to _tinyNum so that when it begins again, the callback would fire (so ultimately it could bounce back and forth during that tween). Again, this is a very uncommon scenario, but possible nonetheless.
        this._rawPrevTime = 0;
      }
    }
  }; //---- STATIC FUNCTIONS -----------------------------------------------------------------------------------------------------------


  TweenMax.to = function (target, duration, vars) {
    return new TweenMax(target, duration, vars);
  };

  TweenMax.from = function (target, duration, vars) {
    vars.runBackwards = true;
    vars.immediateRender = vars.immediateRender != false;
    return new TweenMax(target, duration, vars);
  };

  TweenMax.fromTo = function (target, duration, fromVars, toVars) {
    toVars.startAt = fromVars;
    toVars.immediateRender = toVars.immediateRender != false && fromVars.immediateRender != false;
    return new TweenMax(target, duration, toVars);
  };

  TweenMax.staggerTo = TweenMax.allTo = function (targets, duration, vars, stagger, onCompleteAll, onCompleteAllParams, onCompleteAllScope) {
    stagger = stagger || 0;

    var delay = 0,
        a = [],
        finalComplete = function () {
      if (vars.onComplete) {
        vars.onComplete.apply(vars.onCompleteScope || this, arguments);
      }

      onCompleteAll.apply(onCompleteAllScope || vars.callbackScope || this, onCompleteAllParams || _blankArray);
    },
        cycle = vars.cycle,
        fromCycle = vars.startAt && vars.startAt.cycle,
        l,
        copy,
        i,
        p;

    if (!_isArray(targets)) {
      if (typeof targets === "string") {
        targets = _TweenLite.default.selector(targets) || targets;
      }

      if (_isSelector(targets)) {
        targets = _slice(targets);
      }
    }

    targets = targets || [];

    if (stagger < 0) {
      targets = _slice(targets);
      targets.reverse();
      stagger *= -1;
    }

    l = targets.length - 1;

    for (i = 0; i <= l; i++) {
      copy = {};

      for (p in vars) {
        copy[p] = vars[p];
      }

      if (cycle) {
        _applyCycle(copy, targets, i);

        if (copy.duration != null) {
          duration = copy.duration;
          delete copy.duration;
        }
      }

      if (fromCycle) {
        fromCycle = copy.startAt = {};

        for (p in vars.startAt) {
          fromCycle[p] = vars.startAt[p];
        }

        _applyCycle(copy.startAt, targets, i);
      }

      copy.delay = delay + (copy.delay || 0);

      if (i === l && onCompleteAll) {
        copy.onComplete = finalComplete;
      }

      a[i] = new TweenMax(targets[i], duration, copy);
      delay += stagger;
    }

    return a;
  };

  TweenMax.staggerFrom = TweenMax.allFrom = function (targets, duration, vars, stagger, onCompleteAll, onCompleteAllParams, onCompleteAllScope) {
    vars.runBackwards = true;
    vars.immediateRender = vars.immediateRender != false;
    return TweenMax.staggerTo(targets, duration, vars, stagger, onCompleteAll, onCompleteAllParams, onCompleteAllScope);
  };

  TweenMax.staggerFromTo = TweenMax.allFromTo = function (targets, duration, fromVars, toVars, stagger, onCompleteAll, onCompleteAllParams, onCompleteAllScope) {
    toVars.startAt = fromVars;
    toVars.immediateRender = toVars.immediateRender != false && fromVars.immediateRender != false;
    return TweenMax.staggerTo(targets, duration, toVars, stagger, onCompleteAll, onCompleteAllParams, onCompleteAllScope);
  };

  TweenMax.delayedCall = function (delay, callback, params, scope, useFrames) {
    return new TweenMax(callback, 0, {
      delay: delay,
      onComplete: callback,
      onCompleteParams: params,
      callbackScope: scope,
      onReverseComplete: callback,
      onReverseCompleteParams: params,
      immediateRender: false,
      useFrames: useFrames,
      overwrite: 0
    });
  };

  TweenMax.set = function (target, vars) {
    return new TweenMax(target, 0, vars);
  };

  TweenMax.isTweening = function (target) {
    return _TweenLite.default.getTweensOf(target, true).length > 0;
  };

  var _getChildrenOf = function (timeline, includeTimelines) {
    var a = [],
        cnt = 0,
        tween = timeline._first;

    while (tween) {
      if (tween instanceof _TweenLite.default) {
        a[cnt++] = tween;
      } else {
        if (includeTimelines) {
          a[cnt++] = tween;
        }

        a = a.concat(_getChildrenOf(tween, includeTimelines));
        cnt = a.length;
      }

      tween = tween._next;
    }

    return a;
  },
      getAllTweens = TweenMax.getAllTweens = function (includeTimelines) {
    return _getChildrenOf(_TweenLite.Animation._rootTimeline, includeTimelines).concat(_getChildrenOf(_TweenLite.Animation._rootFramesTimeline, includeTimelines));
  };

  TweenMax.killAll = function (complete, tweens, delayedCalls, timelines) {
    if (tweens == null) {
      tweens = true;
    }

    if (delayedCalls == null) {
      delayedCalls = true;
    }

    var a = getAllTweens(timelines != false),
        l = a.length,
        allTrue = tweens && delayedCalls && timelines,
        isDC,
        tween,
        i;

    for (i = 0; i < l; i++) {
      tween = a[i];

      if (allTrue || tween instanceof _TweenLite.SimpleTimeline || (isDC = tween.target === tween.vars.onComplete) && delayedCalls || tweens && !isDC) {
        if (complete) {
          tween.totalTime(tween._reversed ? 0 : tween.totalDuration());
        } else {
          tween._enabled(false, false);
        }
      }
    }
  };

  TweenMax.killChildTweensOf = function (parent, complete) {
    if (parent == null) {
      return;
    }

    var tl = TweenLiteInternals.tweenLookup,
        a,
        curParent,
        p,
        i,
        l;

    if (typeof parent === "string") {
      parent = _TweenLite.default.selector(parent) || parent;
    }

    if (_isSelector(parent)) {
      parent = _slice(parent);
    }

    if (_isArray(parent)) {
      i = parent.length;

      while (--i > -1) {
        TweenMax.killChildTweensOf(parent[i], complete);
      }

      return;
    }

    a = [];

    for (p in tl) {
      curParent = tl[p].target.parentNode;

      while (curParent) {
        if (curParent === parent) {
          a = a.concat(tl[p].tweens);
        }

        curParent = curParent.parentNode;
      }
    }

    l = a.length;

    for (i = 0; i < l; i++) {
      if (complete) {
        a[i].totalTime(a[i].totalDuration());
      }

      a[i]._enabled(false, false);
    }
  };

  var _changePause = function (pause, tweens, delayedCalls, timelines) {
    tweens = tweens !== false;
    delayedCalls = delayedCalls !== false;
    timelines = timelines !== false;
    var a = getAllTweens(timelines),
        allTrue = tweens && delayedCalls && timelines,
        i = a.length,
        isDC,
        tween;

    while (--i > -1) {
      tween = a[i];

      if (allTrue || tween instanceof _TweenLite.SimpleTimeline || (isDC = tween.target === tween.vars.onComplete) && delayedCalls || tweens && !isDC) {
        tween.paused(pause);
      }
    }
  };

  TweenMax.pauseAll = function (tweens, delayedCalls, timelines) {
    _changePause(true, tweens, delayedCalls, timelines);
  };

  TweenMax.resumeAll = function (tweens, delayedCalls, timelines) {
    _changePause(false, tweens, delayedCalls, timelines);
  };

  TweenMax.globalTimeScale = function (value) {
    var tl = _TweenLite.Animation._rootTimeline,
        t = _TweenLite.default.ticker.time;

    if (!arguments.length) {
      return tl._timeScale;
    }

    value = value || _tinyNum; //can't allow zero because it'll throw the math off

    tl._startTime = t - (t - tl._startTime) * tl._timeScale / value;
    tl = _TweenLite.Animation._rootFramesTimeline;
    t = _TweenLite.default.ticker.frame;
    tl._startTime = t - (t - tl._startTime) * tl._timeScale / value;
    tl._timeScale = _TweenLite.Animation._rootTimeline._timeScale = value;
    return value;
  }; //---- GETTERS / SETTERS ----------------------------------------------------------------------------------------------------------


  p.progress = function (value, suppressEvents) {
    return !arguments.length ? this._time / this.duration() : this.totalTime(this.duration() * (this._yoyo && (this._cycle & 1) !== 0 ? 1 - value : value) + this._cycle * (this._duration + this._repeatDelay), suppressEvents);
  };

  p.totalProgress = function (value, suppressEvents) {
    return !arguments.length ? this._totalTime / this.totalDuration() : this.totalTime(this.totalDuration() * value, suppressEvents);
  };

  p.time = function (value, suppressEvents) {
    if (!arguments.length) {
      return this._time;
    }

    if (this._dirty) {
      this.totalDuration();
    }

    if (value > this._duration) {
      value = this._duration;
    }

    if (this._yoyo && (this._cycle & 1) !== 0) {
      value = this._duration - value + this._cycle * (this._duration + this._repeatDelay);
    } else if (this._repeat !== 0) {
      value += this._cycle * (this._duration + this._repeatDelay);
    }

    return this.totalTime(value, suppressEvents);
  };

  p.duration = function (value) {
    if (!arguments.length) {
      return this._duration; //don't set _dirty = false because there could be repeats that haven't been factored into the _totalDuration yet. Otherwise, if you create a repeated TweenMax and then immediately check its duration(), it would cache the value and the totalDuration would not be correct, thus repeats wouldn't take effect.
    }

    return _TweenLite.Animation.prototype.duration.call(this, value);
  };

  p.totalDuration = function (value) {
    if (!arguments.length) {
      if (this._dirty) {
        //instead of Infinity, we use 999999999999 so that we can accommodate reverses
        this._totalDuration = this._repeat === -1 ? 999999999999 : this._duration * (this._repeat + 1) + this._repeatDelay * this._repeat;
        this._dirty = false;
      }

      return this._totalDuration;
    }

    return this._repeat === -1 ? this : this.duration((value - this._repeat * this._repeatDelay) / (this._repeat + 1));
  };

  p.repeat = function (value) {
    if (!arguments.length) {
      return this._repeat;
    }

    this._repeat = value;
    return this._uncache(true);
  };

  p.repeatDelay = function (value) {
    if (!arguments.length) {
      return this._repeatDelay;
    }

    this._repeatDelay = value;
    return this._uncache(true);
  };

  p.yoyo = function (value) {
    if (!arguments.length) {
      return this._yoyo;
    }

    this._yoyo = value;
    return this;
  };

  return TweenMax;
}, true);

var TweenMax = _TweenLite.globals.TweenMax;
exports.default = exports.TweenMax = TweenMax;
var TweenMaxBase = TweenMax;
exports.TweenMaxBase = TweenMaxBase;
},{"./TweenLite.js":"node_modules/gsap/TweenLite.js"}],"node_modules/gsap/CSSPlugin.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.CSSPlugin = void 0;

var _TweenLite = _interopRequireWildcard(require("./TweenLite.js"));

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

/*!
 * VERSION: 2.0.2
 * DATE: 2018-08-27
 * UPDATES AND DOCS AT: http://greensock.com
 *
 * @license Copyright (c) 2008-2018, GreenSock. All rights reserved.
 * This work is subject to the terms at http://greensock.com/standard-license or for
 * Club GreenSock members, the software agreement that was issued with your membership.
 * 
 * @author: Jack Doyle, jack@greensock.com
 */
_TweenLite._gsScope._gsDefine("plugins.CSSPlugin", ["plugins.TweenPlugin", "TweenLite"], function () {
  /** @constructor **/
  var CSSPlugin = function () {
    _TweenLite.TweenPlugin.call(this, "css");

    this._overwriteProps.length = 0;
    this.setRatio = CSSPlugin.prototype.setRatio; //speed optimization (avoid prototype lookup on this "hot" method)
  },
      _globals = _TweenLite._gsScope._gsDefine.globals,
      _hasPriority,
      //turns true whenever a CSSPropTween instance is created that has a priority other than 0. This helps us discern whether or not we should spend the time organizing the linked list or not after a CSSPlugin's _onInitTween() method is called.
  _suffixMap,
      //we set this in _onInitTween() each time as a way to have a persistent variable we can use in other methods like _parse() without having to pass it around as a parameter and we keep _parse() decoupled from a particular CSSPlugin instance
  _cs,
      //computed style (we store this in a shared variable to conserve memory and make minification tighter
  _overwriteProps,
      //alias to the currently instantiating CSSPlugin's _overwriteProps array. We use this closure in order to avoid having to pass a reference around from method to method and aid in minification.
  _specialProps = {},
      p = CSSPlugin.prototype = new _TweenLite.TweenPlugin("css");

  p.constructor = CSSPlugin;
  CSSPlugin.version = "2.0.2";
  CSSPlugin.API = 2;
  CSSPlugin.defaultTransformPerspective = 0;
  CSSPlugin.defaultSkewType = "compensated";
  CSSPlugin.defaultSmoothOrigin = true;
  p = "px"; //we'll reuse the "p" variable to keep file size down

  CSSPlugin.suffixMap = {
    top: p,
    right: p,
    bottom: p,
    left: p,
    width: p,
    height: p,
    fontSize: p,
    padding: p,
    margin: p,
    perspective: p,
    lineHeight: ""
  };

  var _numExp = /(?:\-|\.|\b)(\d|\.|e\-)+/g,
      _relNumExp = /(?:\d|\-\d|\.\d|\-\.\d|\+=\d|\-=\d|\+=.\d|\-=\.\d)+/g,
      _valuesExp = /(?:\+=|\-=|\-|\b)[\d\-\.]+[a-zA-Z0-9]*(?:%|\b)/gi,
      //finds all the values that begin with numbers or += or -= and then a number. Includes suffixes. We use this to split complex values apart like "1px 5px 20px rgb(255,102,51)"
  _NaNExp = /(?![+-]?\d*\.?\d+|[+-]|e[+-]\d+)[^0-9]/g,
      //also allows scientific notation and doesn't kill the leading -/+ in -= and +=
  _suffixExp = /(?:\d|\-|\+|=|#|\.)*/g,
      _opacityExp = /opacity *= *([^)]*)/i,
      _opacityValExp = /opacity:([^;]*)/i,
      _alphaFilterExp = /alpha\(opacity *=.+?\)/i,
      _rgbhslExp = /^(rgb|hsl)/,
      _capsExp = /([A-Z])/g,
      _camelExp = /-([a-z])/gi,
      _urlExp = /(^(?:url\(\"|url\())|(?:(\"\))$|\)$)/gi,
      //for pulling out urls from url(...) or url("...") strings (some browsers wrap urls in quotes, some don't when reporting things like backgroundImage)
  _camelFunc = function (s, g) {
    return g.toUpperCase();
  },
      _horizExp = /(?:Left|Right|Width)/i,
      _ieGetMatrixExp = /(M11|M12|M21|M22)=[\d\-\.e]+/gi,
      _ieSetMatrixExp = /progid\:DXImageTransform\.Microsoft\.Matrix\(.+?\)/i,
      _commasOutsideParenExp = /,(?=[^\)]*(?:\(|$))/gi,
      //finds any commas that are not within parenthesis
  _complexExp = /[\s,\(]/i,
      //for testing a string to find if it has a space, comma, or open parenthesis (clues that it's a complex value)
  _DEG2RAD = Math.PI / 180,
      _RAD2DEG = 180 / Math.PI,
      _forcePT = {},
      _dummyElement = {
    style: {}
  },
      _doc = _TweenLite._gsScope.document || {
    createElement: function () {
      return _dummyElement;
    }
  },
      _createElement = function (type, ns) {
    return _doc.createElementNS ? _doc.createElementNS(ns || "http://www.w3.org/1999/xhtml", type) : _doc.createElement(type);
  },
      _tempDiv = _createElement("div"),
      _tempImg = _createElement("img"),
      _internals = CSSPlugin._internals = {
    _specialProps: _specialProps
  },
      //provides a hook to a few internal methods that we need to access from inside other plugins
  _agent = (_TweenLite._gsScope.navigator || {}).userAgent || "",
      _autoRound,
      _reqSafariFix,
      //we won't apply the Safari transform fix until we actually come across a tween that affects a transform property (to maintain best performance).
  _isSafari,
      _isFirefox,
      //Firefox has a bug that causes 3D transformed elements to randomly disappear unless a repaint is forced after each update on each element.
  _isSafariLT6,
      //Safari (and Android 4 which uses a flavor of Safari) has a bug that prevents changes to "top" and "left" properties from rendering properly if changed on the same frame as a transform UNLESS we set the element's WebkitBackfaceVisibility to hidden (weird, I know). Doing this for Android 3 and earlier seems to actually cause other problems, though (fun!)
  _ieVers,
      _supportsOpacity = function () {
    //we set _isSafari, _ieVers, _isFirefox, and _supportsOpacity all in one function here to reduce file size slightly, especially in the minified version.
    var i = _agent.indexOf("Android"),
        a = _createElement("a");

    _isSafari = _agent.indexOf("Safari") !== -1 && _agent.indexOf("Chrome") === -1 && (i === -1 || parseFloat(_agent.substr(i + 8, 2)) > 3);
    _isSafariLT6 = _isSafari && parseFloat(_agent.substr(_agent.indexOf("Version/") + 8, 2)) < 6;
    _isFirefox = _agent.indexOf("Firefox") !== -1;

    if (/MSIE ([0-9]{1,}[\.0-9]{0,})/.exec(_agent) || /Trident\/.*rv:([0-9]{1,}[\.0-9]{0,})/.exec(_agent)) {
      _ieVers = parseFloat(RegExp.$1);
    }

    if (!a) {
      return false;
    }

    a.style.cssText = "top:1px;opacity:.55;";
    return /^0.55/.test(a.style.opacity);
  }(),
      _getIEOpacity = function (v) {
    return _opacityExp.test(typeof v === "string" ? v : (v.currentStyle ? v.currentStyle.filter : v.style.filter) || "") ? parseFloat(RegExp.$1) / 100 : 1;
  },
      _log = function (s) {
    //for logging messages, but in a way that won't throw errors in old versions of IE.
    if (_TweenLite._gsScope.console) {
      console.log(s);
    }
  },
      _target,
      //when initting a CSSPlugin, we set this variable so that we can access it from within many other functions without having to pass it around as params
  _index,
      //when initting a CSSPlugin, we set this variable so that we can access it from within many other functions without having to pass it around as params
  _prefixCSS = "",
      //the non-camelCase vendor prefix like "-o-", "-moz-", "-ms-", or "-webkit-"
  _prefix = "",
      //camelCase vendor prefix like "O", "ms", "Webkit", or "Moz".
  // @private feed in a camelCase property name like "transform" and it will check to see if it is valid as-is or if it needs a vendor prefix. It returns the corrected camelCase property name (i.e. "WebkitTransform" or "MozTransform" or "transform" or null if no such property is found, like if the browser is IE8 or before, "transform" won't be found at all)
  _checkPropPrefix = function (p, e) {
    e = e || _tempDiv;
    var s = e.style,
        a,
        i;

    if (s[p] !== undefined) {
      return p;
    }

    p = p.charAt(0).toUpperCase() + p.substr(1);
    a = ["O", "Moz", "ms", "Ms", "Webkit"];
    i = 5;

    while (--i > -1 && s[a[i] + p] === undefined) {}

    if (i >= 0) {
      _prefix = i === 3 ? "ms" : a[i];
      _prefixCSS = "-" + _prefix.toLowerCase() + "-";
      return _prefix + p;
    }

    return null;
  },
      _getComputedStyle = (typeof window !== "undefined" ? window : _doc.defaultView || {
    getComputedStyle: function () {}
  }).getComputedStyle,

  /**
   * @private Returns the css style for a particular property of an element. For example, to get whatever the current "left" css value for an element with an ID of "myElement", you could do:
   * var currentLeft = CSSPlugin.getStyle( document.getElementById("myElement"), "left");
   *
   * @param {!Object} t Target element whose style property you want to query
   * @param {!string} p Property name (like "left" or "top" or "marginTop", etc.)
   * @param {Object=} cs Computed style object. This just provides a way to speed processing if you're going to get several properties on the same element in quick succession - you can reuse the result of the getComputedStyle() call.
   * @param {boolean=} calc If true, the value will not be read directly from the element's "style" property (if it exists there), but instead the getComputedStyle() result will be used. This can be useful when you want to ensure that the browser itself is interpreting the value.
   * @param {string=} dflt Default value that should be returned in the place of null, "none", "auto" or "auto auto".
   * @return {?string} The current property value
   */
  _getStyle = CSSPlugin.getStyle = function (t, p, cs, calc, dflt) {
    var rv;
    if (!_supportsOpacity) if (p === "opacity") {
      //several versions of IE don't use the standard "opacity" property - they use things like filter:alpha(opacity=50), so we parse that here.
      return _getIEOpacity(t);
    }

    if (!calc && t.style[p]) {
      rv = t.style[p];
    } else if (cs = cs || _getComputedStyle(t)) {
      rv = cs[p] || cs.getPropertyValue(p) || cs.getPropertyValue(p.replace(_capsExp, "-$1").toLowerCase());
    } else if (t.currentStyle) {
      rv = t.currentStyle[p];
    }

    return dflt != null && (!rv || rv === "none" || rv === "auto" || rv === "auto auto") ? dflt : rv;
  },

  /**
   * @private Pass the target element, the property name, the numeric value, and the suffix (like "%", "em", "px", etc.) and it will spit back the equivalent pixel number.
   * @param {!Object} t Target element
   * @param {!string} p Property name (like "left", "top", "marginLeft", etc.)
   * @param {!number} v Value
   * @param {string=} sfx Suffix (like "px" or "%" or "em")
   * @param {boolean=} recurse If true, the call is a recursive one. In some browsers (like IE7/8), occasionally the value isn't accurately reported initially, but if we run the function again it will take effect.
   * @return {number} value in pixels
   */
  _convertToPixels = _internals.convertToPixels = function (t, p, v, sfx, recurse) {
    if (sfx === "px" || !sfx && p !== "lineHeight") {
      return v;
    }

    if (sfx === "auto" || !v) {
      return 0;
    }

    var horiz = _horizExp.test(p),
        node = t,
        style = _tempDiv.style,
        neg = v < 0,
        precise = v === 1,
        pix,
        cache,
        time;

    if (neg) {
      v = -v;
    }

    if (precise) {
      v *= 100;
    }

    if (p === "lineHeight" && !sfx) {
      //special case of when a simple lineHeight (without a unit) is used. Set it to the value, read back the computed value, and then revert.
      cache = _getComputedStyle(t).lineHeight;
      t.style.lineHeight = v;
      pix = parseFloat(_getComputedStyle(t).lineHeight);
      t.style.lineHeight = cache;
    } else if (sfx === "%" && p.indexOf("border") !== -1) {
      pix = v / 100 * (horiz ? t.clientWidth : t.clientHeight);
    } else {
      style.cssText = "border:0 solid red;position:" + _getStyle(t, "position") + ";line-height:0;";

      if (sfx === "%" || !node.appendChild || sfx.charAt(0) === "v" || sfx === "rem") {
        node = t.parentNode || _doc.body;

        if (_getStyle(node, "display").indexOf("flex") !== -1) {
          //Edge and IE11 have a bug that causes offsetWidth to report as 0 if the container has display:flex and the child is position:relative. Switching to position: absolute solves it.
          style.position = "absolute";
        }

        cache = node._gsCache;
        time = _TweenLite.default.ticker.frame;

        if (cache && horiz && cache.time === time) {
          //performance optimization: we record the width of elements along with the ticker frame so that we can quickly get it again on the same tick (seems relatively safe to assume it wouldn't change on the same tick)
          return cache.width * v / 100;
        }

        style[horiz ? "width" : "height"] = v + sfx;
      } else {
        style[horiz ? "borderLeftWidth" : "borderTopWidth"] = v + sfx;
      }

      node.appendChild(_tempDiv);
      pix = parseFloat(_tempDiv[horiz ? "offsetWidth" : "offsetHeight"]);
      node.removeChild(_tempDiv);

      if (horiz && sfx === "%" && CSSPlugin.cacheWidths !== false) {
        cache = node._gsCache = node._gsCache || {};
        cache.time = time;
        cache.width = pix / v * 100;
      }

      if (pix === 0 && !recurse) {
        pix = _convertToPixels(t, p, v, sfx, true);
      }
    }

    if (precise) {
      pix /= 100;
    }

    return neg ? -pix : pix;
  },
      _calculateOffset = _internals.calculateOffset = function (t, p, cs) {
    //for figuring out "top" or "left" in px when it's "auto". We need to factor in margin with the offsetLeft/offsetTop
    if (_getStyle(t, "position", cs) !== "absolute") {
      return 0;
    }

    var dim = p === "left" ? "Left" : "Top",
        v = _getStyle(t, "margin" + dim, cs);

    return t["offset" + dim] - (_convertToPixels(t, p, parseFloat(v), v.replace(_suffixExp, "")) || 0);
  },
      // @private returns at object containing ALL of the style properties in camelCase and their associated values.
  _getAllStyles = function (t, cs) {
    var s = {},
        i,
        tr,
        p;

    if (cs = cs || _getComputedStyle(t, null)) {
      if (i = cs.length) {
        while (--i > -1) {
          p = cs[i];

          if (p.indexOf("-transform") === -1 || _transformPropCSS === p) {
            //Some webkit browsers duplicate transform values, one non-prefixed and one prefixed ("transform" and "WebkitTransform"), so we must weed out the extra one here.
            s[p.replace(_camelExp, _camelFunc)] = cs.getPropertyValue(p);
          }
        }
      } else {
        //some browsers behave differently - cs.length is always 0, so we must do a for...in loop.
        for (i in cs) {
          if (i.indexOf("Transform") === -1 || _transformProp === i) {
            //Some webkit browsers duplicate transform values, one non-prefixed and one prefixed ("transform" and "WebkitTransform"), so we must weed out the extra one here.
            s[i] = cs[i];
          }
        }
      }
    } else if (cs = t.currentStyle || t.style) {
      for (i in cs) {
        if (typeof i === "string" && s[i] === undefined) {
          s[i.replace(_camelExp, _camelFunc)] = cs[i];
        }
      }
    }

    if (!_supportsOpacity) {
      s.opacity = _getIEOpacity(t);
    }

    tr = _getTransform(t, cs, false);
    s.rotation = tr.rotation;
    s.skewX = tr.skewX;
    s.scaleX = tr.scaleX;
    s.scaleY = tr.scaleY;
    s.x = tr.x;
    s.y = tr.y;

    if (_supports3D) {
      s.z = tr.z;
      s.rotationX = tr.rotationX;
      s.rotationY = tr.rotationY;
      s.scaleZ = tr.scaleZ;
    }

    if (s.filters) {
      delete s.filters;
    }

    return s;
  },
      // @private analyzes two style objects (as returned by _getAllStyles()) and only looks for differences between them that contain tweenable values (like a number or color). It returns an object with a "difs" property which refers to an object containing only those isolated properties and values for tweening, and a "firstMPT" property which refers to the first MiniPropTween instance in a linked list that recorded all the starting values of the different properties so that we can revert to them at the end or beginning of the tween - we don't want the cascading to get messed up. The forceLookup parameter is an optional generic object with properties that should be forced into the results - this is necessary for className tweens that are overwriting others because imagine a scenario where a rollover/rollout adds/removes a class and the user swipes the mouse over the target SUPER fast, thus nothing actually changed yet and the subsequent comparison of the properties would indicate they match (especially when px rounding is taken into consideration), thus no tweening is necessary even though it SHOULD tween and remove those properties after the tween (otherwise the inline styles will contaminate things). See the className SpecialProp code for details.
  _cssDif = function (t, s1, s2, vars, forceLookup) {
    var difs = {},
        style = t.style,
        val,
        p,
        mpt;

    for (p in s2) {
      if (p !== "cssText") if (p !== "length") if (isNaN(p)) if (s1[p] !== (val = s2[p]) || forceLookup && forceLookup[p]) if (p.indexOf("Origin") === -1) if (typeof val === "number" || typeof val === "string") {
        difs[p] = val === "auto" && (p === "left" || p === "top") ? _calculateOffset(t, p) : (val === "" || val === "auto" || val === "none") && typeof s1[p] === "string" && s1[p].replace(_NaNExp, "") !== "" ? 0 : val; //if the ending value is defaulting ("" or "auto"), we check the starting value and if it can be parsed into a number (a string which could have a suffix too, like 700px), then we swap in 0 for "" or "auto" so that things actually tween.

        if (style[p] !== undefined) {
          //for className tweens, we must remember which properties already existed inline - the ones that didn't should be removed when the tween isn't in progress because they were only introduced to facilitate the transition between classes.
          mpt = new MiniPropTween(style, p, style[p], mpt);
        }
      }
    }

    if (vars) {
      for (p in vars) {
        //copy properties (except className)
        if (p !== "className") {
          difs[p] = vars[p];
        }
      }
    }

    return {
      difs: difs,
      firstMPT: mpt
    };
  },
      _dimensions = {
    width: ["Left", "Right"],
    height: ["Top", "Bottom"]
  },
      _margins = ["marginLeft", "marginRight", "marginTop", "marginBottom"],

  /**
   * @private Gets the width or height of an element
   * @param {!Object} t Target element
   * @param {!string} p Property name ("width" or "height")
   * @param {Object=} cs Computed style object (if one exists). Just a speed optimization.
   * @return {number} Dimension (in pixels)
   */
  _getDimension = function (t, p, cs) {
    if ((t.nodeName + "").toLowerCase() === "svg") {
      //Chrome no longer supports offsetWidth/offsetHeight on SVG elements.
      return (cs || _getComputedStyle(t))[p] || 0;
    } else if (t.getCTM && _isSVG(t)) {
      return t.getBBox()[p] || 0;
    }

    var v = parseFloat(p === "width" ? t.offsetWidth : t.offsetHeight),
        a = _dimensions[p],
        i = a.length;
    cs = cs || _getComputedStyle(t, null);

    while (--i > -1) {
      v -= parseFloat(_getStyle(t, "padding" + a[i], cs, true)) || 0;
      v -= parseFloat(_getStyle(t, "border" + a[i] + "Width", cs, true)) || 0;
    }

    return v;
  },
      // @private Parses position-related complex strings like "top left" or "50px 10px" or "70% 20%", etc. which are used for things like transformOrigin or backgroundPosition. Optionally decorates a supplied object (recObj) with the following properties: "ox" (offsetX), "oy" (offsetY), "oxp" (if true, "ox" is a percentage not a pixel value), and "oxy" (if true, "oy" is a percentage not a pixel value)
  _parsePosition = function (v, recObj) {
    if (v === "contain" || v === "auto" || v === "auto auto") {
      //note: Firefox uses "auto auto" as default whereas Chrome uses "auto".
      return v + " ";
    }

    if (v == null || v === "") {
      v = "0 0";
    }

    var a = v.split(" "),
        x = v.indexOf("left") !== -1 ? "0%" : v.indexOf("right") !== -1 ? "100%" : a[0],
        y = v.indexOf("top") !== -1 ? "0%" : v.indexOf("bottom") !== -1 ? "100%" : a[1],
        i;

    if (a.length > 3 && !recObj) {
      //multiple positions
      a = v.split(", ").join(",").split(",");
      v = [];

      for (i = 0; i < a.length; i++) {
        v.push(_parsePosition(a[i]));
      }

      return v.join(",");
    }

    if (y == null) {
      y = x === "center" ? "50%" : "0";
    } else if (y === "center") {
      y = "50%";
    }

    if (x === "center" || isNaN(parseFloat(x)) && (x + "").indexOf("=") === -1) {
      //remember, the user could flip-flop the values and say "bottom center" or "center bottom", etc. "center" is ambiguous because it could be used to describe horizontal or vertical, hence the isNaN(). If there's an "=" sign in the value, it's relative.
      x = "50%";
    }

    v = x + " " + y + (a.length > 2 ? " " + a[2] : "");

    if (recObj) {
      recObj.oxp = x.indexOf("%") !== -1;
      recObj.oyp = y.indexOf("%") !== -1;
      recObj.oxr = x.charAt(1) === "=";
      recObj.oyr = y.charAt(1) === "=";
      recObj.ox = parseFloat(x.replace(_NaNExp, ""));
      recObj.oy = parseFloat(y.replace(_NaNExp, ""));
      recObj.v = v;
    }

    return recObj || v;
  },

  /**
   * @private Takes an ending value (typically a string, but can be a number) and a starting value and returns the change between the two, looking for relative value indicators like += and -= and it also ignores suffixes (but make sure the ending value starts with a number or +=/-= and that the starting value is a NUMBER!)
   * @param {(number|string)} e End value which is typically a string, but could be a number
   * @param {(number|string)} b Beginning value which is typically a string but could be a number
   * @return {number} Amount of change between the beginning and ending values (relative values that have a "+=" or "-=" are recognized)
   */
  _parseChange = function (e, b) {
    if (typeof e === "function") {
      e = e(_index, _target);
    }

    return typeof e === "string" && e.charAt(1) === "=" ? parseInt(e.charAt(0) + "1", 10) * parseFloat(e.substr(2)) : parseFloat(e) - parseFloat(b) || 0;
  },

  /**
   * @private Takes a value and a default number, checks if the value is relative, null, or numeric and spits back a normalized number accordingly. Primarily used in the _parseTransform() function.
   * @param {Object} v Value to be parsed
   * @param {!number} d Default value (which is also used for relative calculations if "+=" or "-=" is found in the first parameter)
   * @return {number} Parsed value
   */
  _parseVal = function (v, d) {
    if (typeof v === "function") {
      v = v(_index, _target);
    }

    var isRelative = typeof v === "string" && v.charAt(1) === "=";

    if (typeof v === "string" && v.charAt(v.length - 2) === "v") {
      //convert vw and vh into px-equivalents.
      v = (isRelative ? v.substr(0, 2) : 0) + window["inner" + (v.substr(-2) === "vh" ? "Height" : "Width")] * (parseFloat(isRelative ? v.substr(2) : v) / 100);
    }

    return v == null ? d : isRelative ? parseInt(v.charAt(0) + "1", 10) * parseFloat(v.substr(2)) + d : parseFloat(v) || 0;
  },

  /**
   * @private Translates strings like "40deg" or "40" or 40rad" or "+=40deg" or "270_short" or "-90_cw" or "+=45_ccw" to a numeric radian angle. Of course a starting/default value must be fed in too so that relative values can be calculated properly.
   * @param {Object} v Value to be parsed
   * @param {!number} d Default value (which is also used for relative calculations if "+=" or "-=" is found in the first parameter)
   * @param {string=} p property name for directionalEnd (optional - only used when the parsed value is directional ("_short", "_cw", or "_ccw" suffix). We need a way to store the uncompensated value so that at the end of the tween, we set it to exactly what was requested with no directional compensation). Property name would be "rotation", "rotationX", or "rotationY"
   * @param {Object=} directionalEnd An object that will store the raw end values for directional angles ("_short", "_cw", or "_ccw" suffix). We need a way to store the uncompensated value so that at the end of the tween, we set it to exactly what was requested with no directional compensation.
   * @return {number} parsed angle in radians
   */
  _parseAngle = function (v, d, p, directionalEnd) {
    var min = 0.000001,
        cap,
        split,
        dif,
        result,
        isRelative;

    if (typeof v === "function") {
      v = v(_index, _target);
    }

    if (v == null) {
      result = d;
    } else if (typeof v === "number") {
      result = v;
    } else {
      cap = 360;
      split = v.split("_");
      isRelative = v.charAt(1) === "=";
      dif = (isRelative ? parseInt(v.charAt(0) + "1", 10) * parseFloat(split[0].substr(2)) : parseFloat(split[0])) * (v.indexOf("rad") === -1 ? 1 : _RAD2DEG) - (isRelative ? 0 : d);

      if (split.length) {
        if (directionalEnd) {
          directionalEnd[p] = d + dif;
        }

        if (v.indexOf("short") !== -1) {
          dif = dif % cap;

          if (dif !== dif % (cap / 2)) {
            dif = dif < 0 ? dif + cap : dif - cap;
          }
        }

        if (v.indexOf("_cw") !== -1 && dif < 0) {
          dif = (dif + cap * 9999999999) % cap - (dif / cap | 0) * cap;
        } else if (v.indexOf("ccw") !== -1 && dif > 0) {
          dif = (dif - cap * 9999999999) % cap - (dif / cap | 0) * cap;
        }
      }

      result = d + dif;
    }

    if (result < min && result > -min) {
      result = 0;
    }

    return result;
  },
      _colorLookup = {
    aqua: [0, 255, 255],
    lime: [0, 255, 0],
    silver: [192, 192, 192],
    black: [0, 0, 0],
    maroon: [128, 0, 0],
    teal: [0, 128, 128],
    blue: [0, 0, 255],
    navy: [0, 0, 128],
    white: [255, 255, 255],
    fuchsia: [255, 0, 255],
    olive: [128, 128, 0],
    yellow: [255, 255, 0],
    orange: [255, 165, 0],
    gray: [128, 128, 128],
    purple: [128, 0, 128],
    green: [0, 128, 0],
    red: [255, 0, 0],
    pink: [255, 192, 203],
    cyan: [0, 255, 255],
    transparent: [255, 255, 255, 0]
  },
      _hue = function (h, m1, m2) {
    h = h < 0 ? h + 1 : h > 1 ? h - 1 : h;
    return (h * 6 < 1 ? m1 + (m2 - m1) * h * 6 : h < 0.5 ? m2 : h * 3 < 2 ? m1 + (m2 - m1) * (2 / 3 - h) * 6 : m1) * 255 + 0.5 | 0;
  },

  /**
   * @private Parses a color (like #9F0, #FF9900, rgb(255,51,153) or hsl(108, 50%, 10%)) into an array with 3 elements for red, green, and blue or if toHSL parameter is true, it will populate the array with hue, saturation, and lightness values. If a relative value is found in an hsl() or hsla() string, it will preserve those relative prefixes and all the values in the array will be strings instead of numbers (in all other cases it will be populated with numbers).
   * @param {(string|number)} v The value the should be parsed which could be a string like #9F0 or rgb(255,102,51) or rgba(255,0,0,0.5) or it could be a number like 0xFF00CC or even a named color like red, blue, purple, etc.
   * @param {(boolean)} toHSL If true, an hsl() or hsla() value will be returned instead of rgb() or rgba()
   * @return {Array.<number>} An array containing red, green, and blue (and optionally alpha) in that order, or if the toHSL parameter was true, the array will contain hue, saturation and lightness (and optionally alpha) in that order. Always numbers unless there's a relative prefix found in an hsl() or hsla() string and toHSL is true.
   */
  _parseColor = CSSPlugin.parseColor = function (v, toHSL) {
    var a, r, g, b, h, s, l, max, min, d, wasHSL;

    if (!v) {
      a = _colorLookup.black;
    } else if (typeof v === "number") {
      a = [v >> 16, v >> 8 & 255, v & 255];
    } else {
      if (v.charAt(v.length - 1) === ",") {
        //sometimes a trailing comma is included and we should chop it off (typically from a comma-delimited list of values like a textShadow:"2px 2px 2px blue, 5px 5px 5px rgb(255,0,0)" - in this example "blue," has a trailing comma. We could strip it out inside parseComplex() but we'd need to do it to the beginning and ending values plus it wouldn't provide protection from other potential scenarios like if the user passes in a similar value.
        v = v.substr(0, v.length - 1);
      }

      if (_colorLookup[v]) {
        a = _colorLookup[v];
      } else if (v.charAt(0) === "#") {
        if (v.length === 4) {
          //for shorthand like #9F0
          r = v.charAt(1);
          g = v.charAt(2);
          b = v.charAt(3);
          v = "#" + r + r + g + g + b + b;
        }

        v = parseInt(v.substr(1), 16);
        a = [v >> 16, v >> 8 & 255, v & 255];
      } else if (v.substr(0, 3) === "hsl") {
        a = wasHSL = v.match(_numExp);

        if (!toHSL) {
          h = Number(a[0]) % 360 / 360;
          s = Number(a[1]) / 100;
          l = Number(a[2]) / 100;
          g = l <= 0.5 ? l * (s + 1) : l + s - l * s;
          r = l * 2 - g;

          if (a.length > 3) {
            a[3] = Number(a[3]);
          }

          a[0] = _hue(h + 1 / 3, r, g);
          a[1] = _hue(h, r, g);
          a[2] = _hue(h - 1 / 3, r, g);
        } else if (v.indexOf("=") !== -1) {
          //if relative values are found, just return the raw strings with the relative prefixes in place.
          return v.match(_relNumExp);
        }
      } else {
        a = v.match(_numExp) || _colorLookup.transparent;
      }

      a[0] = Number(a[0]);
      a[1] = Number(a[1]);
      a[2] = Number(a[2]);

      if (a.length > 3) {
        a[3] = Number(a[3]);
      }
    }

    if (toHSL && !wasHSL) {
      r = a[0] / 255;
      g = a[1] / 255;
      b = a[2] / 255;
      max = Math.max(r, g, b);
      min = Math.min(r, g, b);
      l = (max + min) / 2;

      if (max === min) {
        h = s = 0;
      } else {
        d = max - min;
        s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
        h = max === r ? (g - b) / d + (g < b ? 6 : 0) : max === g ? (b - r) / d + 2 : (r - g) / d + 4;
        h *= 60;
      }

      a[0] = h + 0.5 | 0;
      a[1] = s * 100 + 0.5 | 0;
      a[2] = l * 100 + 0.5 | 0;
    }

    return a;
  },
      _formatColors = function (s, toHSL) {
    var colors = s.match(_colorExp) || [],
        charIndex = 0,
        parsed = "",
        i,
        color,
        temp;

    if (!colors.length) {
      return s;
    }

    for (i = 0; i < colors.length; i++) {
      color = colors[i];
      temp = s.substr(charIndex, s.indexOf(color, charIndex) - charIndex);
      charIndex += temp.length + color.length;
      color = _parseColor(color, toHSL);

      if (color.length === 3) {
        color.push(1);
      }

      parsed += temp + (toHSL ? "hsla(" + color[0] + "," + color[1] + "%," + color[2] + "%," + color[3] : "rgba(" + color.join(",")) + ")";
    }

    return parsed + s.substr(charIndex);
  },
      _colorExp = "(?:\\b(?:(?:rgb|rgba|hsl|hsla)\\(.+?\\))|\\B#(?:[0-9a-f]{3}){1,2}\\b"; //we'll dynamically build this Regular Expression to conserve file size. After building it, it will be able to find rgb(), rgba(), # (hexadecimal), and named color values like red, blue, purple, etc.


  for (p in _colorLookup) {
    _colorExp += "|" + p + "\\b";
  }

  _colorExp = new RegExp(_colorExp + ")", "gi");

  CSSPlugin.colorStringFilter = function (a) {
    var combined = a[0] + " " + a[1],
        toHSL;

    if (_colorExp.test(combined)) {
      toHSL = combined.indexOf("hsl(") !== -1 || combined.indexOf("hsla(") !== -1;
      a[0] = _formatColors(a[0], toHSL);
      a[1] = _formatColors(a[1], toHSL);
    }

    _colorExp.lastIndex = 0;
  };

  if (!_TweenLite.default.defaultStringFilter) {
    _TweenLite.default.defaultStringFilter = CSSPlugin.colorStringFilter;
  }
  /**
   * @private Returns a formatter function that handles taking a string (or number in some cases) and returning a consistently formatted one in terms of delimiters, quantity of values, etc. For example, we may get boxShadow values defined as "0px red" or "0px 0px 10px rgb(255,0,0)" or "0px 0px 20px 20px #F00" and we need to ensure that what we get back is described with 4 numbers and a color. This allows us to feed it into the _parseComplex() method and split the values up appropriately. The neat thing about this _getFormatter() function is that the dflt defines a pattern as well as a default, so for example, _getFormatter("0px 0px 0px 0px #777", true) not only sets the default as 0px for all distances and #777 for the color, but also sets the pattern such that 4 numbers and a color will always get returned.
   * @param {!string} dflt The default value and pattern to follow. So "0px 0px 0px 0px #777" will ensure that 4 numbers and a color will always get returned.
   * @param {boolean=} clr If true, the values should be searched for color-related data. For example, boxShadow values typically contain a color whereas borderRadius don't.
   * @param {boolean=} collapsible If true, the value is a top/left/right/bottom style one that acts like margin or padding, where if only one value is received, it's used for all 4; if 2 are received, the first is duplicated for 3rd (bottom) and the 2nd is duplicated for the 4th spot (left), etc.
   * @return {Function} formatter function
   */


  var _getFormatter = function (dflt, clr, collapsible, multi) {
    if (dflt == null) {
      return function (v) {
        return v;
      };
    }

    var dColor = clr ? (dflt.match(_colorExp) || [""])[0] : "",
        dVals = dflt.split(dColor).join("").match(_valuesExp) || [],
        pfx = dflt.substr(0, dflt.indexOf(dVals[0])),
        sfx = dflt.charAt(dflt.length - 1) === ")" ? ")" : "",
        delim = dflt.indexOf(" ") !== -1 ? " " : ",",
        numVals = dVals.length,
        dSfx = numVals > 0 ? dVals[0].replace(_numExp, "") : "",
        formatter;

    if (!numVals) {
      return function (v) {
        return v;
      };
    }

    if (clr) {
      formatter = function (v) {
        var color, vals, i, a;

        if (typeof v === "number") {
          v += dSfx;
        } else if (multi && _commasOutsideParenExp.test(v)) {
          a = v.replace(_commasOutsideParenExp, "|").split("|");

          for (i = 0; i < a.length; i++) {
            a[i] = formatter(a[i]);
          }

          return a.join(",");
        }

        color = (v.match(_colorExp) || [dColor])[0];
        vals = v.split(color).join("").match(_valuesExp) || [];
        i = vals.length;

        if (numVals > i--) {
          while (++i < numVals) {
            vals[i] = collapsible ? vals[(i - 1) / 2 | 0] : dVals[i];
          }
        }

        return pfx + vals.join(delim) + delim + color + sfx + (v.indexOf("inset") !== -1 ? " inset" : "");
      };

      return formatter;
    }

    formatter = function (v) {
      var vals, a, i;

      if (typeof v === "number") {
        v += dSfx;
      } else if (multi && _commasOutsideParenExp.test(v)) {
        a = v.replace(_commasOutsideParenExp, "|").split("|");

        for (i = 0; i < a.length; i++) {
          a[i] = formatter(a[i]);
        }

        return a.join(",");
      }

      vals = v.match(_valuesExp) || [];
      i = vals.length;

      if (numVals > i--) {
        while (++i < numVals) {
          vals[i] = collapsible ? vals[(i - 1) / 2 | 0] : dVals[i];
        }
      }

      return pfx + vals.join(delim) + sfx;
    };

    return formatter;
  },

  /**
   * @private returns a formatter function that's used for edge-related values like marginTop, marginLeft, paddingBottom, paddingRight, etc. Just pass a comma-delimited list of property names related to the edges.
   * @param {!string} props a comma-delimited list of property names in order from top to left, like "marginTop,marginRight,marginBottom,marginLeft"
   * @return {Function} a formatter function
   */
  _getEdgeParser = function (props) {
    props = props.split(",");
    return function (t, e, p, cssp, pt, plugin, vars) {
      var a = (e + "").split(" "),
          i;
      vars = {};

      for (i = 0; i < 4; i++) {
        vars[props[i]] = a[i] = a[i] || a[(i - 1) / 2 >> 0];
      }

      return cssp.parse(t, vars, pt, plugin);
    };
  },
      // @private used when other plugins must tween values first, like BezierPlugin or ThrowPropsPlugin, etc. That plugin's setRatio() gets called first so that the values are updated, and then we loop through the MiniPropTweens which handle copying the values into their appropriate slots so that they can then be applied correctly in the main CSSPlugin setRatio() method. Remember, we typically create a proxy object that has a bunch of uniquely-named properties that we feed to the sub-plugin and it does its magic normally, and then we must interpret those values and apply them to the css because often numbers must get combined/concatenated, suffixes added, etc. to work with css, like boxShadow could have 4 values plus a color.
  _setPluginRatio = _internals._setPluginRatio = function (v) {
    this.plugin.setRatio(v);
    var d = this.data,
        proxy = d.proxy,
        mpt = d.firstMPT,
        min = 0.000001,
        val,
        pt,
        i,
        str,
        p;

    while (mpt) {
      val = proxy[mpt.v];

      if (mpt.r) {
        val = mpt.r(val);
      } else if (val < min && val > -min) {
        val = 0;
      }

      mpt.t[mpt.p] = val;
      mpt = mpt._next;
    }

    if (d.autoRotate) {
      d.autoRotate.rotation = d.mod ? d.mod.call(this._tween, proxy.rotation, this.t, this._tween) : proxy.rotation; //special case for ModifyPlugin to hook into an auto-rotating bezier
    } //at the end, we must set the CSSPropTween's "e" (end) value dynamically here because that's what is used in the final setRatio() method. Same for "b" at the beginning.


    if (v === 1 || v === 0) {
      mpt = d.firstMPT;
      p = v === 1 ? "e" : "b";

      while (mpt) {
        pt = mpt.t;

        if (!pt.type) {
          pt[p] = pt.s + pt.xs0;
        } else if (pt.type === 1) {
          str = pt.xs0 + pt.s + pt.xs1;

          for (i = 1; i < pt.l; i++) {
            str += pt["xn" + i] + pt["xs" + (i + 1)];
          }

          pt[p] = str;
        }

        mpt = mpt._next;
      }
    }
  },

  /**
   * @private @constructor Used by a few SpecialProps to hold important values for proxies. For example, _parseToProxy() creates a MiniPropTween instance for each property that must get tweened on the proxy, and we record the original property name as well as the unique one we create for the proxy, plus whether or not the value needs to be rounded plus the original value.
   * @param {!Object} t target object whose property we're tweening (often a CSSPropTween)
   * @param {!string} p property name
   * @param {(number|string|object)} v value
   * @param {MiniPropTween=} next next MiniPropTween in the linked list
   * @param {boolean=} r if true, the tweened value should be rounded to the nearest integer
   */
  MiniPropTween = function (t, p, v, next, r) {
    this.t = t;
    this.p = p;
    this.v = v;
    this.r = r;

    if (next) {
      next._prev = this;
      this._next = next;
    }
  },

  /**
   * @private Most other plugins (like BezierPlugin and ThrowPropsPlugin and others) can only tween numeric values, but CSSPlugin must accommodate special values that have a bunch of extra data (like a suffix or strings between numeric values, etc.). For example, boxShadow has values like "10px 10px 20px 30px rgb(255,0,0)" which would utterly confuse other plugins. This method allows us to split that data apart and grab only the numeric data and attach it to uniquely-named properties of a generic proxy object ({}) so that we can feed that to virtually any plugin to have the numbers tweened. However, we must also keep track of which properties from the proxy go with which CSSPropTween values and instances. So we create a linked list of MiniPropTweens. Each one records a target (the original CSSPropTween), property (like "s" or "xn1" or "xn2") that we're tweening and the unique property name that was used for the proxy (like "boxShadow_xn1" and "boxShadow_xn2") and whether or not they need to be rounded. That way, in the _setPluginRatio() method we can simply copy the values over from the proxy to the CSSPropTween instance(s). Then, when the main CSSPlugin setRatio() method runs and applies the CSSPropTween values accordingly, they're updated nicely. So the external plugin tweens the numbers, _setPluginRatio() copies them over, and setRatio() acts normally, applying css-specific values to the element.
   * This method returns an object that has the following properties:
   *  - proxy: a generic object containing the starting values for all the properties that will be tweened by the external plugin.  This is what we feed to the external _onInitTween() as the target
   *  - end: a generic object containing the ending values for all the properties that will be tweened by the external plugin. This is what we feed to the external plugin's _onInitTween() as the destination values
   *  - firstMPT: the first MiniPropTween in the linked list
   *  - pt: the first CSSPropTween in the linked list that was created when parsing. If shallow is true, this linked list will NOT attach to the one passed into the _parseToProxy() as the "pt" (4th) parameter.
   * @param {!Object} t target object to be tweened
   * @param {!(Object|string)} vars the object containing the information about the tweening values (typically the end/destination values) that should be parsed
   * @param {!CSSPlugin} cssp The CSSPlugin instance
   * @param {CSSPropTween=} pt the next CSSPropTween in the linked list
   * @param {TweenPlugin=} plugin the external TweenPlugin instance that will be handling tweening the numeric values
   * @param {boolean=} shallow if true, the resulting linked list from the parse will NOT be attached to the CSSPropTween that was passed in as the "pt" (4th) parameter.
   * @return An object containing the following properties: proxy, end, firstMPT, and pt (see above for descriptions)
   */
  _parseToProxy = _internals._parseToProxy = function (t, vars, cssp, pt, plugin, shallow) {
    var bpt = pt,
        start = {},
        end = {},
        transform = cssp._transform,
        oldForce = _forcePT,
        i,
        p,
        xp,
        mpt,
        firstPT;
    cssp._transform = null;
    _forcePT = vars;
    pt = firstPT = cssp.parse(t, vars, pt, plugin);
    _forcePT = oldForce; //break off from the linked list so the new ones are isolated.

    if (shallow) {
      cssp._transform = transform;

      if (bpt) {
        bpt._prev = null;

        if (bpt._prev) {
          bpt._prev._next = null;
        }
      }
    }

    while (pt && pt !== bpt) {
      if (pt.type <= 1) {
        p = pt.p;
        end[p] = pt.s + pt.c;
        start[p] = pt.s;

        if (!shallow) {
          mpt = new MiniPropTween(pt, "s", p, mpt, pt.r);
          pt.c = 0;
        }

        if (pt.type === 1) {
          i = pt.l;

          while (--i > 0) {
            xp = "xn" + i;
            p = pt.p + "_" + xp;
            end[p] = pt.data[xp];
            start[p] = pt[xp];

            if (!shallow) {
              mpt = new MiniPropTween(pt, xp, p, mpt, pt.rxp[xp]);
            }
          }
        }
      }

      pt = pt._next;
    }

    return {
      proxy: start,
      end: end,
      firstMPT: mpt,
      pt: firstPT
    };
  },

  /**
   * @constructor Each property that is tweened has at least one CSSPropTween associated with it. These instances store important information like the target, property, starting value, amount of change, etc. They can also optionally have a number of "extra" strings and numeric values named xs1, xn1, xs2, xn2, xs3, xn3, etc. where "s" indicates string and "n" indicates number. These can be pieced together in a complex-value tween (type:1) that has alternating types of data like a string, number, string, number, etc. For example, boxShadow could be "5px 5px 8px rgb(102, 102, 51)". In that value, there are 6 numbers that may need to tween and then pieced back together into a string again with spaces, suffixes, etc. xs0 is special in that it stores the suffix for standard (type:0) tweens, -OR- the first string (prefix) in a complex-value (type:1) CSSPropTween -OR- it can be the non-tweening value in a type:-1 CSSPropTween. We do this to conserve memory.
   * CSSPropTweens have the following optional properties as well (not defined through the constructor):
   *  - l: Length in terms of the number of extra properties that the CSSPropTween has (default: 0). For example, for a boxShadow we may need to tween 5 numbers in which case l would be 5; Keep in mind that the start/end values for the first number that's tweened are always stored in the s and c properties to conserve memory. All additional values thereafter are stored in xn1, xn2, etc.
   *  - xfirst: The first instance of any sub-CSSPropTweens that are tweening properties of this instance. For example, we may split up a boxShadow tween so that there's a main CSSPropTween of type:1 that has various xs* and xn* values associated with the h-shadow, v-shadow, blur, color, etc. Then we spawn a CSSPropTween for each of those that has a higher priority and runs BEFORE the main CSSPropTween so that the values are all set by the time it needs to re-assemble them. The xfirst gives us an easy way to identify the first one in that chain which typically ends at the main one (because they're all prepende to the linked list)
   *  - plugin: The TweenPlugin instance that will handle the tweening of any complex values. For example, sometimes we don't want to use normal subtweens (like xfirst refers to) to tween the values - we might want ThrowPropsPlugin or BezierPlugin some other plugin to do the actual tweening, so we create a plugin instance and store a reference here. We need this reference so that if we get a request to round values or disable a tween, we can pass along that request.
   *  - data: Arbitrary data that needs to be stored with the CSSPropTween. Typically if we're going to have a plugin handle the tweening of a complex-value tween, we create a generic object that stores the END values that we're tweening to and the CSSPropTween's xs1, xs2, etc. have the starting values. We store that object as data. That way, we can simply pass that object to the plugin and use the CSSPropTween as the target.
   *  - setRatio: Only used for type:2 tweens that require custom functionality. In this case, we call the CSSPropTween's setRatio() method and pass the ratio each time the tween updates. This isn't quite as efficient as doing things directly in the CSSPlugin's setRatio() method, but it's very convenient and flexible.
   * @param {!Object} t Target object whose property will be tweened. Often a DOM element, but not always. It could be anything.
   * @param {string} p Property to tween (name). For example, to tween element.width, p would be "width".
   * @param {number} s Starting numeric value
   * @param {number} c Change in numeric value over the course of the entire tween. For example, if element.width starts at 5 and should end at 100, c would be 95.
   * @param {CSSPropTween=} next The next CSSPropTween in the linked list. If one is defined, we will define its _prev as the new instance, and the new instance's _next will be pointed at it.
   * @param {number=} type The type of CSSPropTween where -1 = a non-tweening value, 0 = a standard simple tween, 1 = a complex value (like one that has multiple numbers in a comma- or space-delimited string like border:"1px solid red"), and 2 = one that uses a custom setRatio function that does all of the work of applying the values on each update.
   * @param {string=} n Name of the property that should be used for overwriting purposes which is typically the same as p but not always. For example, we may need to create a subtween for the 2nd part of a "clip:rect(...)" tween in which case "p" might be xs1 but "n" is still "clip"
   * @param {boolean=} r If true, the value(s) should be rounded
   * @param {number=} pr Priority in the linked list order. Higher priority CSSPropTweens will be updated before lower priority ones. The default priority is 0.
   * @param {string=} b Beginning value. We store this to ensure that it is EXACTLY what it was when the tween began without any risk of interpretation issues.
   * @param {string=} e Ending value. We store this to ensure that it is EXACTLY what the user defined at the end of the tween without any risk of interpretation issues.
   */
  CSSPropTween = _internals.CSSPropTween = function (t, p, s, c, next, type, n, r, pr, b, e) {
    this.t = t; //target

    this.p = p; //property

    this.s = s; //starting value

    this.c = c; //change value

    this.n = n || p; //name that this CSSPropTween should be associated to (usually the same as p, but not always - n is what overwriting looks at)

    if (!(t instanceof CSSPropTween)) {
      _overwriteProps.push(this.n);
    }

    this.r = !r ? r : typeof r === "function" ? r : Math.round; //round (boolean)

    this.type = type || 0; //0 = normal tween, -1 = non-tweening (in which case xs0 will be applied to the target's property, like tp.t[tp.p] = tp.xs0), 1 = complex-value SpecialProp, 2 = custom setRatio() that does all the work

    if (pr) {
      this.pr = pr;
      _hasPriority = true;
    }

    this.b = b === undefined ? s : b;
    this.e = e === undefined ? s + c : e;

    if (next) {
      this._next = next;
      next._prev = this;
    }
  },
      _addNonTweeningNumericPT = function (target, prop, start, end, next, overwriteProp) {
    //cleans up some code redundancies and helps minification. Just a fast way to add a NUMERIC non-tweening CSSPropTween
    var pt = new CSSPropTween(target, prop, start, end - start, next, -1, overwriteProp);
    pt.b = start;
    pt.e = pt.xs0 = end;
    return pt;
  },

  /**
   * Takes a target, the beginning value and ending value (as strings) and parses them into a CSSPropTween (possibly with child CSSPropTweens) that accommodates multiple numbers, colors, comma-delimited values, etc. For example:
   * sp.parseComplex(element, "boxShadow", "5px 10px 20px rgb(255,102,51)", "0px 0px 0px red", true, "0px 0px 0px rgb(0,0,0,0)", pt);
   * It will walk through the beginning and ending values (which should be in the same format with the same number and type of values) and figure out which parts are numbers, what strings separate the numeric/tweenable values, and then create the CSSPropTweens accordingly. If a plugin is defined, no child CSSPropTweens will be created. Instead, the ending values will be stored in the "data" property of the returned CSSPropTween like: {s:-5, xn1:-10, xn2:-20, xn3:255, xn4:0, xn5:0} so that it can be fed to any other plugin and it'll be plain numeric tweens but the recomposition of the complex value will be handled inside CSSPlugin's setRatio().
   * If a setRatio is defined, the type of the CSSPropTween will be set to 2 and recomposition of the values will be the responsibility of that method.
   *
   * @param {!Object} t Target whose property will be tweened
   * @param {!string} p Property that will be tweened (its name, like "left" or "backgroundColor" or "boxShadow")
   * @param {string} b Beginning value
   * @param {string} e Ending value
   * @param {boolean} clrs If true, the value could contain a color value like "rgb(255,0,0)" or "#F00" or "red". The default is false, so no colors will be recognized (a performance optimization)
   * @param {(string|number|Object)} dflt The default beginning value that should be used if no valid beginning value is defined or if the number of values inside the complex beginning and ending values don't match
   * @param {?CSSPropTween} pt CSSPropTween instance that is the current head of the linked list (we'll prepend to this).
   * @param {number=} pr Priority in the linked list order. Higher priority properties will be updated before lower priority ones. The default priority is 0.
   * @param {TweenPlugin=} plugin If a plugin should handle the tweening of extra properties, pass the plugin instance here. If one is defined, then NO subtweens will be created for any extra properties (the properties will be created - just not additional CSSPropTween instances to tween them) because the plugin is expected to do so. However, the end values WILL be populated in the "data" property, like {s:100, xn1:50, xn2:300}
   * @param {function(number)=} setRatio If values should be set in a custom function instead of being pieced together in a type:1 (complex-value) CSSPropTween, define that custom function here.
   * @return {CSSPropTween} The first CSSPropTween in the linked list which includes the new one(s) added by the parseComplex() call.
   */
  _parseComplex = CSSPlugin.parseComplex = function (t, p, b, e, clrs, dflt, pt, pr, plugin, setRatio) {
    //DEBUG: _log("parseComplex: "+p+", b: "+b+", e: "+e);
    b = b || dflt || "";

    if (typeof e === "function") {
      e = e(_index, _target);
    }

    pt = new CSSPropTween(t, p, 0, 0, pt, setRatio ? 2 : 1, null, false, pr, b, e);
    e += ""; //ensures it's a string

    if (clrs && _colorExp.test(e + b)) {
      //if colors are found, normalize the formatting to rgba() or hsla().
      e = [b, e];
      CSSPlugin.colorStringFilter(e);
      b = e[0];
      e = e[1];
    }

    var ba = b.split(", ").join(",").split(" "),
        //beginning array
    ea = e.split(", ").join(",").split(" "),
        //ending array
    l = ba.length,
        autoRound = _autoRound !== false,
        i,
        xi,
        ni,
        bv,
        ev,
        bnums,
        enums,
        bn,
        hasAlpha,
        temp,
        cv,
        str,
        useHSL;

    if (e.indexOf(",") !== -1 || b.indexOf(",") !== -1) {
      if ((e + b).indexOf("rgb") !== -1 || (e + b).indexOf("hsl") !== -1) {
        //keep rgb(), rgba(), hsl(), and hsla() values together! (remember, we're splitting on spaces)
        ba = ba.join(" ").replace(_commasOutsideParenExp, ", ").split(" ");
        ea = ea.join(" ").replace(_commasOutsideParenExp, ", ").split(" ");
      } else {
        ba = ba.join(" ").split(",").join(", ").split(" ");
        ea = ea.join(" ").split(",").join(", ").split(" ");
      }

      l = ba.length;
    }

    if (l !== ea.length) {
      //DEBUG: _log("mismatched formatting detected on " + p + " (" + b + " vs " + e + ")");
      ba = (dflt || "").split(" ");
      l = ba.length;
    }

    pt.plugin = plugin;
    pt.setRatio = setRatio;
    _colorExp.lastIndex = 0;

    for (i = 0; i < l; i++) {
      bv = ba[i];
      ev = ea[i] + "";
      bn = parseFloat(bv); //if the value begins with a number (most common). It's fine if it has a suffix like px

      if (bn || bn === 0) {
        pt.appendXtra("", bn, _parseChange(ev, bn), ev.replace(_relNumExp, ""), autoRound && ev.indexOf("px") !== -1 ? Math.round : false, true); //if the value is a color
      } else if (clrs && _colorExp.test(bv)) {
        str = ev.indexOf(")") + 1;
        str = ")" + (str ? ev.substr(str) : ""); //if there's a comma or ) at the end, retain it.

        useHSL = ev.indexOf("hsl") !== -1 && _supportsOpacity;
        temp = ev; //original string value so we can look for any prefix later.

        bv = _parseColor(bv, useHSL);
        ev = _parseColor(ev, useHSL);
        hasAlpha = bv.length + ev.length > 6;

        if (hasAlpha && !_supportsOpacity && ev[3] === 0) {
          //older versions of IE don't support rgba(), so if the destination alpha is 0, just use "transparent" for the end color
          pt["xs" + pt.l] += pt.l ? " transparent" : "transparent";
          pt.e = pt.e.split(ea[i]).join("transparent");
        } else {
          if (!_supportsOpacity) {
            //old versions of IE don't support rgba().
            hasAlpha = false;
          }

          if (useHSL) {
            pt.appendXtra(temp.substr(0, temp.indexOf("hsl")) + (hasAlpha ? "hsla(" : "hsl("), bv[0], _parseChange(ev[0], bv[0]), ",", false, true).appendXtra("", bv[1], _parseChange(ev[1], bv[1]), "%,", false).appendXtra("", bv[2], _parseChange(ev[2], bv[2]), hasAlpha ? "%," : "%" + str, false);
          } else {
            pt.appendXtra(temp.substr(0, temp.indexOf("rgb")) + (hasAlpha ? "rgba(" : "rgb("), bv[0], ev[0] - bv[0], ",", Math.round, true).appendXtra("", bv[1], ev[1] - bv[1], ",", Math.round).appendXtra("", bv[2], ev[2] - bv[2], hasAlpha ? "," : str, Math.round);
          }

          if (hasAlpha) {
            bv = bv.length < 4 ? 1 : bv[3];
            pt.appendXtra("", bv, (ev.length < 4 ? 1 : ev[3]) - bv, str, false);
          }
        }

        _colorExp.lastIndex = 0; //otherwise the test() on the RegExp could move the lastIndex and taint future results.
      } else {
        bnums = bv.match(_numExp); //gets each group of numbers in the beginning value string and drops them into an array
        //if no number is found, treat it as a non-tweening value and just append the string to the current xs.

        if (!bnums) {
          pt["xs" + pt.l] += pt.l || pt["xs" + pt.l] ? " " + ev : ev; //loop through all the numbers that are found and construct the extra values on the pt.
        } else {
          enums = ev.match(_relNumExp); //get each group of numbers in the end value string and drop them into an array. We allow relative values too, like +=50 or -=.5

          if (!enums || enums.length !== bnums.length) {
            //DEBUG: _log("mismatched formatting detected on " + p + " (" + b + " vs " + e + ")");
            return pt;
          }

          ni = 0;

          for (xi = 0; xi < bnums.length; xi++) {
            cv = bnums[xi];
            temp = bv.indexOf(cv, ni);
            pt.appendXtra(bv.substr(ni, temp - ni), Number(cv), _parseChange(enums[xi], cv), "", autoRound && bv.substr(temp + cv.length, 2) === "px" ? Math.round : false, xi === 0);
            ni = temp + cv.length;
          }

          pt["xs" + pt.l] += bv.substr(ni);
        }
      }
    } //if there are relative values ("+=" or "-=" prefix), we need to adjust the ending value to eliminate the prefixes and combine the values properly.


    if (e.indexOf("=") !== -1) if (pt.data) {
      str = pt.xs0 + pt.data.s;

      for (i = 1; i < pt.l; i++) {
        str += pt["xs" + i] + pt.data["xn" + i];
      }

      pt.e = str + pt["xs" + i];
    }

    if (!pt.l) {
      pt.type = -1;
      pt.xs0 = pt.e;
    }

    return pt.xfirst || pt;
  },
      i = 9;

  p = CSSPropTween.prototype;
  p.l = p.pr = 0; //length (number of extra properties like xn1, xn2, xn3, etc.

  while (--i > 0) {
    p["xn" + i] = 0;
    p["xs" + i] = "";
  }

  p.xs0 = "";
  p._next = p._prev = p.xfirst = p.data = p.plugin = p.setRatio = p.rxp = null;
  /**
   * Appends and extra tweening value to a CSSPropTween and automatically manages any prefix and suffix strings. The first extra value is stored in the s and c of the main CSSPropTween instance, but thereafter any extras are stored in the xn1, xn2, xn3, etc. The prefixes and suffixes are stored in the xs0, xs1, xs2, etc. properties. For example, if I walk through a clip value like "rect(10px, 5px, 0px, 20px)", the values would be stored like this:
   * xs0:"rect(", s:10, xs1:"px, ", xn1:5, xs2:"px, ", xn2:0, xs3:"px, ", xn3:20, xn4:"px)"
   * And they'd all get joined together when the CSSPlugin renders (in the setRatio() method).
   * @param {string=} pfx Prefix (if any)
   * @param {!number} s Starting value
   * @param {!number} c Change in numeric value over the course of the entire tween. For example, if the start is 5 and the end is 100, the change would be 95.
   * @param {string=} sfx Suffix (if any)
   * @param {boolean=} r Round (if true).
   * @param {boolean=} pad If true, this extra value should be separated by the previous one by a space. If there is no previous extra and pad is true, it will automatically drop the space.
   * @return {CSSPropTween} returns itself so that multiple methods can be chained together.
   */

  p.appendXtra = function (pfx, s, c, sfx, r, pad) {
    var pt = this,
        l = pt.l;
    pt["xs" + l] += pad && (l || pt["xs" + l]) ? " " + pfx : pfx || "";
    if (!c) if (l !== 0 && !pt.plugin) {
      //typically we'll combine non-changing values right into the xs to optimize performance, but we don't combine them when there's a plugin that will be tweening the values because it may depend on the values being split apart, like for a bezier, if a value doesn't change between the first and second iteration but then it does on the 3rd, we'll run into trouble because there's no xn slot for that value!
      pt["xs" + l] += s + (sfx || "");
      return pt;
    }
    pt.l++;
    pt.type = pt.setRatio ? 2 : 1;
    pt["xs" + pt.l] = sfx || "";

    if (l > 0) {
      pt.data["xn" + l] = s + c;
      pt.rxp["xn" + l] = r; //round extra property (we need to tap into this in the _parseToProxy() method)

      pt["xn" + l] = s;

      if (!pt.plugin) {
        pt.xfirst = new CSSPropTween(pt, "xn" + l, s, c, pt.xfirst || pt, 0, pt.n, r, pt.pr);
        pt.xfirst.xs0 = 0; //just to ensure that the property stays numeric which helps modern browsers speed up processing. Remember, in the setRatio() method, we do pt.t[pt.p] = val + pt.xs0 so if pt.xs0 is "" (the default), it'll cast the end value as a string. When a property is a number sometimes and a string sometimes, it prevents the compiler from locking in the data type, slowing things down slightly.
      }

      return pt;
    }

    pt.data = {
      s: s + c
    };
    pt.rxp = {};
    pt.s = s;
    pt.c = c;
    pt.r = r;
    return pt;
  };
  /**
   * @constructor A SpecialProp is basically a css property that needs to be treated in a non-standard way, like if it may contain a complex value like boxShadow:"5px 10px 15px rgb(255, 102, 51)" or if it is associated with another plugin like ThrowPropsPlugin or BezierPlugin. Every SpecialProp is associated with a particular property name like "boxShadow" or "throwProps" or "bezier" and it will intercept those values in the vars object that's passed to the CSSPlugin and handle them accordingly.
   * @param {!string} p Property name (like "boxShadow" or "throwProps")
   * @param {Object=} options An object containing any of the following configuration options:
   *                      - defaultValue: the default value
   *                      - parser: A function that should be called when the associated property name is found in the vars. This function should return a CSSPropTween instance and it should ensure that it is properly inserted into the linked list. It will receive 4 paramters: 1) The target, 2) The value defined in the vars, 3) The CSSPlugin instance (whose _firstPT should be used for the linked list), and 4) A computed style object if one was calculated (this is a speed optimization that allows retrieval of starting values quicker)
   *                      - formatter: a function that formats any value received for this special property (for example, boxShadow could take "5px 5px red" and format it to "5px 5px 0px 0px red" so that both the beginning and ending values have a common order and quantity of values.)
   *                      - prefix: if true, we'll determine whether or not this property requires a vendor prefix (like Webkit or Moz or ms or O)
   *                      - color: set this to true if the value for this SpecialProp may contain color-related values like rgb(), rgba(), etc.
   *                      - priority: priority in the linked list order. Higher priority SpecialProps will be updated before lower priority ones. The default priority is 0.
   *                      - multi: if true, the formatter should accommodate a comma-delimited list of values, like boxShadow could have multiple boxShadows listed out.
   *                      - collapsible: if true, the formatter should treat the value like it's a top/right/bottom/left value that could be collapsed, like "5px" would apply to all, "5px, 10px" would use 5px for top/bottom and 10px for right/left, etc.
   *                      - keyword: a special keyword that can [optionally] be found inside the value (like "inset" for boxShadow). This allows us to validate beginning/ending values to make sure they match (if the keyword is found in one, it'll be added to the other for consistency by default).
   */


  var SpecialProp = function (p, options) {
    options = options || {};
    this.p = options.prefix ? _checkPropPrefix(p) || p : p;
    _specialProps[p] = _specialProps[this.p] = this;
    this.format = options.formatter || _getFormatter(options.defaultValue, options.color, options.collapsible, options.multi);

    if (options.parser) {
      this.parse = options.parser;
    }

    this.clrs = options.color;
    this.multi = options.multi;
    this.keyword = options.keyword;
    this.dflt = options.defaultValue;
    this.pr = options.priority || 0;
  },
      //shortcut for creating a new SpecialProp that can accept multiple properties as a comma-delimited list (helps minification). dflt can be an array for multiple values (we don't do a comma-delimited list because the default value may contain commas, like rect(0px,0px,0px,0px)). We attach this method to the SpecialProp class/object instead of using a private _createSpecialProp() method so that we can tap into it externally if necessary, like from another plugin.
  _registerComplexSpecialProp = _internals._registerComplexSpecialProp = function (p, options, defaults) {
    if (typeof options !== "object") {
      options = {
        parser: defaults
      }; //to make backwards compatible with older versions of BezierPlugin and ThrowPropsPlugin
    }

    var a = p.split(","),
        d = options.defaultValue,
        i,
        temp;
    defaults = defaults || [d];

    for (i = 0; i < a.length; i++) {
      options.prefix = i === 0 && options.prefix;
      options.defaultValue = defaults[i] || d;
      temp = new SpecialProp(a[i], options);
    }
  },
      //creates a placeholder special prop for a plugin so that the property gets caught the first time a tween of it is attempted, and at that time it makes the plugin register itself, thus taking over for all future tweens of that property. This allows us to not mandate that things load in a particular order and it also allows us to log() an error that informs the user when they attempt to tween an external plugin-related property without loading its .js file.
  _registerPluginProp = _internals._registerPluginProp = function (p) {
    if (!_specialProps[p]) {
      var pluginName = p.charAt(0).toUpperCase() + p.substr(1) + "Plugin";

      _registerComplexSpecialProp(p, {
        parser: function (t, e, p, cssp, pt, plugin, vars) {
          var pluginClass = _globals.com.greensock.plugins[pluginName];

          if (!pluginClass) {
            _log("Error: " + pluginName + " js file not loaded.");

            return pt;
          }

          pluginClass._cssRegister();

          return _specialProps[p].parse(t, e, p, cssp, pt, plugin, vars);
        }
      });
    }
  };

  p = SpecialProp.prototype;
  /**
   * Alias for _parseComplex() that automatically plugs in certain values for this SpecialProp, like its property name, whether or not colors should be sensed, the default value, and priority. It also looks for any keyword that the SpecialProp defines (like "inset" for boxShadow) and ensures that the beginning and ending values have the same number of values for SpecialProps where multi is true (like boxShadow and textShadow can have a comma-delimited list)
   * @param {!Object} t target element
   * @param {(string|number|object)} b beginning value
   * @param {(string|number|object)} e ending (destination) value
   * @param {CSSPropTween=} pt next CSSPropTween in the linked list
   * @param {TweenPlugin=} plugin If another plugin will be tweening the complex value, that TweenPlugin instance goes here.
   * @param {function=} setRatio If a custom setRatio() method should be used to handle this complex value, that goes here.
   * @return {CSSPropTween=} First CSSPropTween in the linked list
   */

  p.parseComplex = function (t, b, e, pt, plugin, setRatio) {
    var kwd = this.keyword,
        i,
        ba,
        ea,
        l,
        bi,
        ei; //if this SpecialProp's value can contain a comma-delimited list of values (like boxShadow or textShadow), we must parse them in a special way, and look for a keyword (like "inset" for boxShadow) and ensure that the beginning and ending BOTH have it if the end defines it as such. We also must ensure that there are an equal number of values specified (we can't tween 1 boxShadow to 3 for example)

    if (this.multi) if (_commasOutsideParenExp.test(e) || _commasOutsideParenExp.test(b)) {
      ba = b.replace(_commasOutsideParenExp, "|").split("|");
      ea = e.replace(_commasOutsideParenExp, "|").split("|");
    } else if (kwd) {
      ba = [b];
      ea = [e];
    }

    if (ea) {
      l = ea.length > ba.length ? ea.length : ba.length;

      for (i = 0; i < l; i++) {
        b = ba[i] = ba[i] || this.dflt;
        e = ea[i] = ea[i] || this.dflt;

        if (kwd) {
          bi = b.indexOf(kwd);
          ei = e.indexOf(kwd);

          if (bi !== ei) {
            if (ei === -1) {
              //if the keyword isn't in the end value, remove it from the beginning one.
              ba[i] = ba[i].split(kwd).join("");
            } else if (bi === -1) {
              //if the keyword isn't in the beginning, add it.
              ba[i] += " " + kwd;
            }
          }
        }
      }

      b = ba.join(", ");
      e = ea.join(", ");
    }

    return _parseComplex(t, this.p, b, e, this.clrs, this.dflt, pt, this.pr, plugin, setRatio);
  };
  /**
   * Accepts a target and end value and spits back a CSSPropTween that has been inserted into the CSSPlugin's linked list and conforms with all the conventions we use internally, like type:-1, 0, 1, or 2, setting up any extra property tweens, priority, etc. For example, if we have a boxShadow SpecialProp and call:
   * this._firstPT = sp.parse(element, "5px 10px 20px rgb(2550,102,51)", "boxShadow", this);
   * It should figure out the starting value of the element's boxShadow, compare it to the provided end value and create all the necessary CSSPropTweens of the appropriate types to tween the boxShadow. The CSSPropTween that gets spit back should already be inserted into the linked list (the 4th parameter is the current head, so prepend to that).
   * @param {!Object} t Target object whose property is being tweened
   * @param {Object} e End value as provided in the vars object (typically a string, but not always - like a throwProps would be an object).
   * @param {!string} p Property name
   * @param {!CSSPlugin} cssp The CSSPlugin instance that should be associated with this tween.
   * @param {?CSSPropTween} pt The CSSPropTween that is the current head of the linked list (we'll prepend to it)
   * @param {TweenPlugin=} plugin If a plugin will be used to tween the parsed value, this is the plugin instance.
   * @param {Object=} vars Original vars object that contains the data for parsing.
   * @return {CSSPropTween} The first CSSPropTween in the linked list which includes the new one(s) added by the parse() call.
   */


  p.parse = function (t, e, p, cssp, pt, plugin, vars) {
    return this.parseComplex(t.style, this.format(_getStyle(t, this.p, _cs, false, this.dflt)), this.format(e), pt, plugin);
  };
  /**
   * Registers a special property that should be intercepted from any "css" objects defined in tweens. This allows you to handle them however you want without CSSPlugin doing it for you. The 2nd parameter should be a function that accepts 3 parameters:
   *  1) Target object whose property should be tweened (typically a DOM element)
   *  2) The end/destination value (could be a string, number, object, or whatever you want)
   *  3) The tween instance (you probably don't need to worry about this, but it can be useful for looking up information like the duration)
   *
   * Then, your function should return a function which will be called each time the tween gets rendered, passing a numeric "ratio" parameter to your function that indicates the change factor (usually between 0 and 1). For example:
   *
   * CSSPlugin.registerSpecialProp("myCustomProp", function(target, value, tween) {
   *      var start = target.style.width;
   *      return function(ratio) {
   *              target.style.width = (start + value * ratio) + "px";
   *              console.log("set width to " + target.style.width);
   *          }
   * }, 0);
   *
   * Then, when I do this tween, it will trigger my special property:
   *
   * TweenLite.to(element, 1, {css:{myCustomProp:100}});
   *
   * In the example, of course, we're just changing the width, but you can do anything you want.
   *
   * @param {!string} name Property name (or comma-delimited list of property names) that should be intercepted and handled by your function. For example, if I define "myCustomProp", then it would handle that portion of the following tween: TweenLite.to(element, 1, {css:{myCustomProp:100}})
   * @param {!function(Object, Object, Object, string):function(number)} onInitTween The function that will be called when a tween of this special property is performed. The function will receive 4 parameters: 1) Target object that should be tweened, 2) Value that was passed to the tween, 3) The tween instance itself (rarely used), and 4) The property name that's being tweened. Your function should return a function that should be called on every update of the tween. That function will receive a single parameter that is a "change factor" value (typically between 0 and 1) indicating the amount of change as a ratio. You can use this to determine how to set the values appropriately in your function.
   * @param {number=} priority Priority that helps the engine determine the order in which to set the properties (default: 0). Higher priority properties will be updated before lower priority ones.
   */


  CSSPlugin.registerSpecialProp = function (name, onInitTween, priority) {
    _registerComplexSpecialProp(name, {
      parser: function (t, e, p, cssp, pt, plugin, vars) {
        var rv = new CSSPropTween(t, p, 0, 0, pt, 2, p, false, priority);
        rv.plugin = plugin;
        rv.setRatio = onInitTween(t, e, cssp._tween, p);
        return rv;
      },
      priority: priority
    });
  }; //transform-related methods and properties


  CSSPlugin.useSVGTransformAttr = true; //Safari and Firefox both have some rendering bugs when applying CSS transforms to SVG elements, so default to using the "transform" attribute instead (users can override this).

  var _transformProps = "scaleX,scaleY,scaleZ,x,y,z,skewX,skewY,rotation,rotationX,rotationY,perspective,xPercent,yPercent".split(","),
      _transformProp = _checkPropPrefix("transform"),
      //the Javascript (camelCase) transform property, like msTransform, WebkitTransform, MozTransform, or OTransform.
  _transformPropCSS = _prefixCSS + "transform",
      _transformOriginProp = _checkPropPrefix("transformOrigin"),
      _supports3D = _checkPropPrefix("perspective") !== null,
      Transform = _internals.Transform = function () {
    this.perspective = parseFloat(CSSPlugin.defaultTransformPerspective) || 0;
    this.force3D = CSSPlugin.defaultForce3D === false || !_supports3D ? false : CSSPlugin.defaultForce3D || "auto";
  },
      _SVGElement = _TweenLite._gsScope.SVGElement,
      _useSVGTransformAttr,
      //Some browsers (like Firefox and IE) don't honor transform-origin properly in SVG elements, so we need to manually adjust the matrix accordingly. We feature detect here rather than always doing the conversion for certain browsers because they may fix the problem at some point in the future.
  _createSVG = function (type, container, attributes) {
    var element = _doc.createElementNS("http://www.w3.org/2000/svg", type),
        reg = /([a-z])([A-Z])/g,
        p;

    for (p in attributes) {
      element.setAttributeNS(null, p.replace(reg, "$1-$2").toLowerCase(), attributes[p]);
    }

    container.appendChild(element);
    return element;
  },
      _docElement = _doc.documentElement || {},
      _forceSVGTransformAttr = function () {
    //IE and Android stock don't support CSS transforms on SVG elements, so we must write them to the "transform" attribute. We populate this variable in the _parseTransform() method, and only if/when we come across an SVG element
    var force = _ieVers || /Android/i.test(_agent) && !_TweenLite._gsScope.chrome,
        svg,
        rect,
        width;

    if (_doc.createElementNS && !force) {
      //IE8 and earlier doesn't support SVG anyway
      svg = _createSVG("svg", _docElement);
      rect = _createSVG("rect", svg, {
        width: 100,
        height: 50,
        x: 100
      });
      width = rect.getBoundingClientRect().width;
      rect.style[_transformOriginProp] = "50% 50%";
      rect.style[_transformProp] = "scaleX(0.5)";
      force = width === rect.getBoundingClientRect().width && !(_isFirefox && _supports3D); //note: Firefox fails the test even though it does support CSS transforms in 3D. Since we can't push 3D stuff into the transform attribute, we force Firefox to pass the test here (as long as it does truly support 3D).

      _docElement.removeChild(svg);
    }

    return force;
  }(),
      _parseSVGOrigin = function (e, local, decoratee, absolute, smoothOrigin, skipRecord) {
    var tm = e._gsTransform,
        m = _getMatrix(e, true),
        v,
        x,
        y,
        xOrigin,
        yOrigin,
        a,
        b,
        c,
        d,
        tx,
        ty,
        determinant,
        xOriginOld,
        yOriginOld;

    if (tm) {
      xOriginOld = tm.xOrigin; //record the original values before we alter them.

      yOriginOld = tm.yOrigin;
    }

    if (!absolute || (v = absolute.split(" ")).length < 2) {
      b = e.getBBox();

      if (b.x === 0 && b.y === 0 && b.width + b.height === 0) {
        //some browsers (like Firefox) misreport the bounds if the element has zero width and height (it just assumes it's at x:0, y:0), thus we need to manually grab the position in that case.
        b = {
          x: parseFloat(e.hasAttribute("x") ? e.getAttribute("x") : e.hasAttribute("cx") ? e.getAttribute("cx") : 0) || 0,
          y: parseFloat(e.hasAttribute("y") ? e.getAttribute("y") : e.hasAttribute("cy") ? e.getAttribute("cy") : 0) || 0,
          width: 0,
          height: 0
        };
      }

      local = _parsePosition(local).split(" ");
      v = [(local[0].indexOf("%") !== -1 ? parseFloat(local[0]) / 100 * b.width : parseFloat(local[0])) + b.x, (local[1].indexOf("%") !== -1 ? parseFloat(local[1]) / 100 * b.height : parseFloat(local[1])) + b.y];
    }

    decoratee.xOrigin = xOrigin = parseFloat(v[0]);
    decoratee.yOrigin = yOrigin = parseFloat(v[1]);

    if (absolute && m !== _identity2DMatrix) {
      //if svgOrigin is being set, we must invert the matrix and determine where the absolute point is, factoring in the current transforms. Otherwise, the svgOrigin would be based on the element's non-transformed position on the canvas.
      a = m[0];
      b = m[1];
      c = m[2];
      d = m[3];
      tx = m[4];
      ty = m[5];
      determinant = a * d - b * c;

      if (determinant) {
        //if it's zero (like if scaleX and scaleY are zero), skip it to avoid errors with dividing by zero.
        x = xOrigin * (d / determinant) + yOrigin * (-c / determinant) + (c * ty - d * tx) / determinant;
        y = xOrigin * (-b / determinant) + yOrigin * (a / determinant) - (a * ty - b * tx) / determinant;
        xOrigin = decoratee.xOrigin = v[0] = x;
        yOrigin = decoratee.yOrigin = v[1] = y;
      }
    }

    if (tm) {
      //avoid jump when transformOrigin is changed - adjust the x/y values accordingly
      if (skipRecord) {
        decoratee.xOffset = tm.xOffset;
        decoratee.yOffset = tm.yOffset;
        tm = decoratee;
      }

      if (smoothOrigin || smoothOrigin !== false && CSSPlugin.defaultSmoothOrigin !== false) {
        x = xOrigin - xOriginOld;
        y = yOrigin - yOriginOld; //originally, we simply adjusted the x and y values, but that would cause problems if, for example, you created a rotational tween part-way through an x/y tween. Managing the offset in a separate variable gives us ultimate flexibility.
        //tm.x -= x - (x * m[0] + y * m[2]);
        //tm.y -= y - (x * m[1] + y * m[3]);

        tm.xOffset += x * m[0] + y * m[2] - x;
        tm.yOffset += x * m[1] + y * m[3] - y;
      } else {
        tm.xOffset = tm.yOffset = 0;
      }
    }

    if (!skipRecord) {
      e.setAttribute("data-svg-origin", v.join(" "));
    }
  },
      _getBBoxHack = function (swapIfPossible) {
    //works around issues in some browsers (like Firefox) that don't correctly report getBBox() on SVG elements inside a <defs> element and/or <mask>. We try creating an SVG, adding it to the documentElement and toss the element in there so that it's definitely part of the rendering tree, then grab the bbox and if it works, we actually swap out the original getBBox() method for our own that does these extra steps whenever getBBox is needed. This helps ensure that performance is optimal (only do all these extra steps when absolutely necessary...most elements don't need it).
    var svg = _createElement("svg", this.ownerSVGElement && this.ownerSVGElement.getAttribute("xmlns") || "http://www.w3.org/2000/svg"),
        oldParent = this.parentNode,
        oldSibling = this.nextSibling,
        oldCSS = this.style.cssText,
        bbox;

    _docElement.appendChild(svg);

    svg.appendChild(this);
    this.style.display = "block";

    if (swapIfPossible) {
      try {
        bbox = this.getBBox();
        this._originalGetBBox = this.getBBox;
        this.getBBox = _getBBoxHack;
      } catch (e) {}
    } else if (this._originalGetBBox) {
      bbox = this._originalGetBBox();
    }

    if (oldSibling) {
      oldParent.insertBefore(this, oldSibling);
    } else {
      oldParent.appendChild(this);
    }

    _docElement.removeChild(svg);

    this.style.cssText = oldCSS;
    return bbox;
  },
      _getBBox = function (e) {
    try {
      return e.getBBox(); //Firefox throws errors if you try calling getBBox() on an SVG element that's not rendered (like in a <symbol> or <defs>). https://bugzilla.mozilla.org/show_bug.cgi?id=612118
    } catch (error) {
      return _getBBoxHack.call(e, true);
    }
  },
      _isSVG = function (e) {
    //reports if the element is an SVG on which getBBox() actually works
    return !!(_SVGElement && e.getCTM && (!e.parentNode || e.ownerSVGElement) && _getBBox(e));
  },
      _identity2DMatrix = [1, 0, 0, 1, 0, 0],
      _getMatrix = function (e, force2D) {
    var tm = e._gsTransform || new Transform(),
        rnd = 100000,
        style = e.style,
        isDefault,
        s,
        m,
        n,
        dec,
        none;

    if (_transformProp) {
      s = _getStyle(e, _transformPropCSS, null, true);
    } else if (e.currentStyle) {
      //for older versions of IE, we need to interpret the filter portion that is in the format: progid:DXImageTransform.Microsoft.Matrix(M11=6.123233995736766e-17, M12=-1, M21=1, M22=6.123233995736766e-17, sizingMethod='auto expand') Notice that we need to swap b and c compared to a normal matrix.
      s = e.currentStyle.filter.match(_ieGetMatrixExp);
      s = s && s.length === 4 ? [s[0].substr(4), Number(s[2].substr(4)), Number(s[1].substr(4)), s[3].substr(4), tm.x || 0, tm.y || 0].join(",") : "";
    }

    isDefault = !s || s === "none" || s === "matrix(1, 0, 0, 1, 0, 0)";

    if (_transformProp && ((none = !_getComputedStyle(e) || _getComputedStyle(e).display === "none") || !e.parentNode)) {
      //note: Firefox returns null for getComputedStyle() if the element is in an iframe that has display:none. https://bugzilla.mozilla.org/show_bug.cgi?id=548397
      if (none) {
        //browsers don't report transforms accurately unless the element is in the DOM and has a display value that's not "none". Firefox and Microsoft browsers have a partial bug where they'll report transforms even if display:none BUT not any percentage-based values like translate(-50%, 8px) will be reported as if it's translate(0, 8px).
        n = style.display;
        style.display = "block";
      }

      if (!e.parentNode) {
        dec = 1; //flag

        _docElement.appendChild(e);
      }

      s = _getStyle(e, _transformPropCSS, null, true);
      isDefault = !s || s === "none" || s === "matrix(1, 0, 0, 1, 0, 0)";

      if (n) {
        style.display = n;
      } else if (none) {
        _removeProp(style, "display");
      }

      if (dec) {
        _docElement.removeChild(e);
      }
    }

    if (tm.svg || e.getCTM && _isSVG(e)) {
      if (isDefault && (style[_transformProp] + "").indexOf("matrix") !== -1) {
        //some browsers (like Chrome 40) don't correctly report transforms that are applied inline on an SVG element (they don't get included in the computed style), so we double-check here and accept matrix values
        s = style[_transformProp];
        isDefault = 0;
      }

      m = e.getAttribute("transform");

      if (isDefault && m) {
        m = e.transform.baseVal.consolidate().matrix; //ensures that even complex values like "translate(50,60) rotate(135,0,0)" are parsed because it mashes it into a matrix.

        s = "matrix(" + m.a + "," + m.b + "," + m.c + "," + m.d + "," + m.e + "," + m.f + ")";
        isDefault = 0;
      }
    }

    if (isDefault) {
      return _identity2DMatrix;
    } //split the matrix values out into an array (m for matrix)


    m = (s || "").match(_numExp) || [];
    i = m.length;

    while (--i > -1) {
      n = Number(m[i]);
      m[i] = (dec = n - (n |= 0)) ? (dec * rnd + (dec < 0 ? -0.5 : 0.5) | 0) / rnd + n : n; //convert strings to Numbers and round to 5 decimal places to avoid issues with tiny numbers. Roughly 20x faster than Number.toFixed(). We also must make sure to round before dividing so that values like 0.9999999999 become 1 to avoid glitches in browser rendering and interpretation of flipped/rotated 3D matrices. And don't just multiply the number by rnd, floor it, and then divide by rnd because the bitwise operations max out at a 32-bit signed integer, thus it could get clipped at a relatively low value (like 22,000.00000 for example).
    }

    return force2D && m.length > 6 ? [m[0], m[1], m[4], m[5], m[12], m[13]] : m;
  },

  /**
   * Parses the transform values for an element, returning an object with x, y, z, scaleX, scaleY, scaleZ, rotation, rotationX, rotationY, skewX, and skewY properties. Note: by default (for performance reasons), all skewing is combined into skewX and rotation but skewY still has a place in the transform object so that we can record how much of the skew is attributed to skewX vs skewY. Remember, a skewY of 10 looks the same as a rotation of 10 and skewX of -10.
   * @param {!Object} t target element
   * @param {Object=} cs computed style object (optional)
   * @param {boolean=} rec if true, the transform values will be recorded to the target element's _gsTransform object, like target._gsTransform = {x:0, y:0, z:0, scaleX:1...}
   * @param {boolean=} parse if true, we'll ignore any _gsTransform values that already exist on the element, and force a reparsing of the css (calculated style)
   * @return {object} object containing all of the transform properties/values like {x:0, y:0, z:0, scaleX:1...}
   */
  _getTransform = _internals.getTransform = function (t, cs, rec, parse) {
    if (t._gsTransform && rec && !parse) {
      return t._gsTransform; //if the element already has a _gsTransform, use that. Note: some browsers don't accurately return the calculated style for the transform (particularly for SVG), so it's almost always safest to just use the values we've already applied rather than re-parsing things.
    }

    var tm = rec ? t._gsTransform || new Transform() : new Transform(),
        invX = tm.scaleX < 0,
        //in order to interpret things properly, we need to know if the user applied a negative scaleX previously so that we can adjust the rotation and skewX accordingly. Otherwise, if we always interpret a flipped matrix as affecting scaleY and the user only wants to tween the scaleX on multiple sequential tweens, it would keep the negative scaleY without that being the user's intent.
    min = 0.00002,
        rnd = 100000,
        zOrigin = _supports3D ? parseFloat(_getStyle(t, _transformOriginProp, cs, false, "0 0 0").split(" ")[2]) || tm.zOrigin || 0 : 0,
        defaultTransformPerspective = parseFloat(CSSPlugin.defaultTransformPerspective) || 0,
        m,
        i,
        scaleX,
        scaleY,
        rotation,
        skewX;
    tm.svg = !!(t.getCTM && _isSVG(t));

    if (tm.svg) {
      _parseSVGOrigin(t, _getStyle(t, _transformOriginProp, cs, false, "50% 50%") + "", tm, t.getAttribute("data-svg-origin"));

      _useSVGTransformAttr = CSSPlugin.useSVGTransformAttr || _forceSVGTransformAttr;
    }

    m = _getMatrix(t);

    if (m !== _identity2DMatrix) {
      if (m.length === 16) {
        //we'll only look at these position-related 6 variables first because if x/y/z all match, it's relatively safe to assume we don't need to re-parse everything which risks losing important rotational information (like rotationX:180 plus rotationY:180 would look the same as rotation:180 - there's no way to know for sure which direction was taken based solely on the matrix3d() values)
        var a11 = m[0],
            a21 = m[1],
            a31 = m[2],
            a41 = m[3],
            a12 = m[4],
            a22 = m[5],
            a32 = m[6],
            a42 = m[7],
            a13 = m[8],
            a23 = m[9],
            a33 = m[10],
            a14 = m[12],
            a24 = m[13],
            a34 = m[14],
            a43 = m[11],
            angle = Math.atan2(a32, a33),
            t1,
            t2,
            t3,
            t4,
            cos,
            sin; //we manually compensate for non-zero z component of transformOrigin to work around bugs in Safari

        if (tm.zOrigin) {
          a34 = -tm.zOrigin;
          a14 = a13 * a34 - m[12];
          a24 = a23 * a34 - m[13];
          a34 = a33 * a34 + tm.zOrigin - m[14];
        } //note for possible future consolidation: rotationX: Math.atan2(a32, a33), rotationY: Math.atan2(-a31, Math.sqrt(a33 * a33 + a32 * a32)), rotation: Math.atan2(a21, a11), skew: Math.atan2(a12, a22). However, it doesn't seem to be quite as reliable as the full-on backwards rotation procedure.


        tm.rotationX = angle * _RAD2DEG; //rotationX

        if (angle) {
          cos = Math.cos(-angle);
          sin = Math.sin(-angle);
          t1 = a12 * cos + a13 * sin;
          t2 = a22 * cos + a23 * sin;
          t3 = a32 * cos + a33 * sin;
          a13 = a12 * -sin + a13 * cos;
          a23 = a22 * -sin + a23 * cos;
          a33 = a32 * -sin + a33 * cos;
          a43 = a42 * -sin + a43 * cos;
          a12 = t1;
          a22 = t2;
          a32 = t3;
        } //rotationY


        angle = Math.atan2(-a31, a33);
        tm.rotationY = angle * _RAD2DEG;

        if (angle) {
          cos = Math.cos(-angle);
          sin = Math.sin(-angle);
          t1 = a11 * cos - a13 * sin;
          t2 = a21 * cos - a23 * sin;
          t3 = a31 * cos - a33 * sin;
          a23 = a21 * sin + a23 * cos;
          a33 = a31 * sin + a33 * cos;
          a43 = a41 * sin + a43 * cos;
          a11 = t1;
          a21 = t2;
          a31 = t3;
        } //rotationZ


        angle = Math.atan2(a21, a11);
        tm.rotation = angle * _RAD2DEG;

        if (angle) {
          cos = Math.cos(angle);
          sin = Math.sin(angle);
          t1 = a11 * cos + a21 * sin;
          t2 = a12 * cos + a22 * sin;
          t3 = a13 * cos + a23 * sin;
          a21 = a21 * cos - a11 * sin;
          a22 = a22 * cos - a12 * sin;
          a23 = a23 * cos - a13 * sin;
          a11 = t1;
          a12 = t2;
          a13 = t3;
        }

        if (tm.rotationX && Math.abs(tm.rotationX) + Math.abs(tm.rotation) > 359.9) {
          //when rotationY is set, it will often be parsed as 180 degrees different than it should be, and rotationX and rotation both being 180 (it looks the same), so we adjust for that here.
          tm.rotationX = tm.rotation = 0;
          tm.rotationY = 180 - tm.rotationY;
        } //skewX


        angle = Math.atan2(a12, a22); //scales

        tm.scaleX = (Math.sqrt(a11 * a11 + a21 * a21 + a31 * a31) * rnd + 0.5 | 0) / rnd;
        tm.scaleY = (Math.sqrt(a22 * a22 + a32 * a32) * rnd + 0.5 | 0) / rnd;
        tm.scaleZ = (Math.sqrt(a13 * a13 + a23 * a23 + a33 * a33) * rnd + 0.5 | 0) / rnd;
        a11 /= tm.scaleX;
        a12 /= tm.scaleY;
        a21 /= tm.scaleX;
        a22 /= tm.scaleY;

        if (Math.abs(angle) > min) {
          tm.skewX = angle * _RAD2DEG;
          a12 = 0; //unskews

          if (tm.skewType !== "simple") {
            tm.scaleY *= 1 / Math.cos(angle); //by default, we compensate the scale based on the skew so that the element maintains a similar proportion when skewed, so we have to alter the scaleY here accordingly to match the default (non-adjusted) skewing that CSS does (stretching more and more as it skews).
          }
        } else {
          tm.skewX = 0;
        }
        /* //for testing purposes
        var transform = "matrix3d(",
        	comma = ",",
        	zero = "0";
        a13 /= tm.scaleZ;
        a23 /= tm.scaleZ;
        a31 /= tm.scaleX;
        a32 /= tm.scaleY;
        a33 /= tm.scaleZ;
        transform += ((a11 < min && a11 > -min) ? zero : a11) + comma + ((a21 < min && a21 > -min) ? zero : a21) + comma + ((a31 < min && a31 > -min) ? zero : a31);
        transform += comma + ((a41 < min && a41 > -min) ? zero : a41) + comma + ((a12 < min && a12 > -min) ? zero : a12) + comma + ((a22 < min && a22 > -min) ? zero : a22);
        transform += comma + ((a32 < min && a32 > -min) ? zero : a32) + comma + ((a42 < min && a42 > -min) ? zero : a42) + comma + ((a13 < min && a13 > -min) ? zero : a13);
        transform += comma + ((a23 < min && a23 > -min) ? zero : a23) + comma + ((a33 < min && a33 > -min) ? zero : a33) + comma + ((a43 < min && a43 > -min) ? zero : a43) + comma;
        transform += a14 + comma + a24 + comma + a34 + comma + (tm.perspective ? (1 + (-a34 / tm.perspective)) : 1) + ")";
        console.log(transform);
        document.querySelector(".test").style[_transformProp] = transform;
        */


        tm.perspective = a43 ? 1 / (a43 < 0 ? -a43 : a43) : 0;
        tm.x = a14;
        tm.y = a24;
        tm.z = a34;

        if (tm.svg) {
          tm.x -= tm.xOrigin - (tm.xOrigin * a11 - tm.yOrigin * a12);
          tm.y -= tm.yOrigin - (tm.yOrigin * a21 - tm.xOrigin * a22);
        }
      } else if (!_supports3D || parse || !m.length || tm.x !== m[4] || tm.y !== m[5] || !tm.rotationX && !tm.rotationY) {
        //sometimes a 6-element matrix is returned even when we performed 3D transforms, like if rotationX and rotationY are 180. In cases like this, we still need to honor the 3D transforms. If we just rely on the 2D info, it could affect how the data is interpreted, like scaleY might get set to -1 or rotation could get offset by 180 degrees. For example, do a TweenLite.to(element, 1, {css:{rotationX:180, rotationY:180}}) and then later, TweenLite.to(element, 1, {css:{rotationX:0}}) and without this conditional logic in place, it'd jump to a state of being unrotated when the 2nd tween starts. Then again, we need to honor the fact that the user COULD alter the transforms outside of CSSPlugin, like by manually applying new css, so we try to sense that by looking at x and y because if those changed, we know the changes were made outside CSSPlugin and we force a reinterpretation of the matrix values. Also, in Webkit browsers, if the element's "display" is "none", its calculated style value will always return empty, so if we've already recorded the values in the _gsTransform object, we'll just rely on those.
        var k = m.length >= 6,
            a = k ? m[0] : 1,
            b = m[1] || 0,
            c = m[2] || 0,
            d = k ? m[3] : 1;
        tm.x = m[4] || 0;
        tm.y = m[5] || 0;
        scaleX = Math.sqrt(a * a + b * b);
        scaleY = Math.sqrt(d * d + c * c);
        rotation = a || b ? Math.atan2(b, a) * _RAD2DEG : tm.rotation || 0; //note: if scaleX is 0, we cannot accurately measure rotation. Same for skewX with a scaleY of 0. Therefore, we default to the previously recorded value (or zero if that doesn't exist).

        skewX = c || d ? Math.atan2(c, d) * _RAD2DEG + rotation : tm.skewX || 0;
        tm.scaleX = scaleX;
        tm.scaleY = scaleY;
        tm.rotation = rotation;
        tm.skewX = skewX;

        if (_supports3D) {
          tm.rotationX = tm.rotationY = tm.z = 0;
          tm.perspective = defaultTransformPerspective;
          tm.scaleZ = 1;
        }

        if (tm.svg) {
          tm.x -= tm.xOrigin - (tm.xOrigin * a + tm.yOrigin * c);
          tm.y -= tm.yOrigin - (tm.xOrigin * b + tm.yOrigin * d);
        }
      }

      if (Math.abs(tm.skewX) > 90 && Math.abs(tm.skewX) < 270) {
        if (invX) {
          tm.scaleX *= -1;
          tm.skewX += tm.rotation <= 0 ? 180 : -180;
          tm.rotation += tm.rotation <= 0 ? 180 : -180;
        } else {
          tm.scaleY *= -1;
          tm.skewX += tm.skewX <= 0 ? 180 : -180;
        }
      }

      tm.zOrigin = zOrigin; //some browsers have a hard time with very small values like 2.4492935982947064e-16 (notice the "e-" towards the end) and would render the object slightly off. So we round to 0 in these cases. The conditional logic here is faster than calling Math.abs(). Also, browsers tend to render a SLIGHTLY rotated object in a fuzzy way, so we need to snap to exactly 0 when appropriate.

      for (i in tm) {
        if (tm[i] < min) if (tm[i] > -min) {
          tm[i] = 0;
        }
      }
    } //DEBUG: _log("parsed rotation of " + t.getAttribute("id")+": "+(tm.rotationX)+", "+(tm.rotationY)+", "+(tm.rotation)+", scale: "+tm.scaleX+", "+tm.scaleY+", "+tm.scaleZ+", position: "+tm.x+", "+tm.y+", "+tm.z+", perspective: "+tm.perspective+ ", origin: "+ tm.xOrigin+ ","+ tm.yOrigin);


    if (rec) {
      t._gsTransform = tm; //record to the object's _gsTransform which we use so that tweens can control individual properties independently (we need all the properties to accurately recompose the matrix in the setRatio() method)

      if (tm.svg) {
        //if we're supposed to apply transforms to the SVG element's "transform" attribute, make sure there aren't any CSS transforms applied or they'll override the attribute ones. Also clear the transform attribute if we're using CSS, just to be clean.
        if (_useSVGTransformAttr && t.style[_transformProp]) {
          _TweenLite.default.delayedCall(0.001, function () {
            //if we apply this right away (before anything has rendered), we risk there being no transforms for a brief moment and it also interferes with adjusting the transformOrigin in a tween with immediateRender:true (it'd try reading the matrix and it wouldn't have the appropriate data in place because we just removed it).
            _removeProp(t.style, _transformProp);
          });
        } else if (!_useSVGTransformAttr && t.getAttribute("transform")) {
          _TweenLite.default.delayedCall(0.001, function () {
            t.removeAttribute("transform");
          });
        }
      }
    }

    return tm;
  },
      //for setting 2D transforms in IE6, IE7, and IE8 (must use a "filter" to emulate the behavior of modern day browser transforms)
  _setIETransformRatio = function (v) {
    var t = this.data,
        //refers to the element's _gsTransform object
    ang = -t.rotation * _DEG2RAD,
        skew = ang + t.skewX * _DEG2RAD,
        rnd = 100000,
        a = (Math.cos(ang) * t.scaleX * rnd | 0) / rnd,
        b = (Math.sin(ang) * t.scaleX * rnd | 0) / rnd,
        c = (Math.sin(skew) * -t.scaleY * rnd | 0) / rnd,
        d = (Math.cos(skew) * t.scaleY * rnd | 0) / rnd,
        style = this.t.style,
        cs = this.t.currentStyle,
        filters,
        val;

    if (!cs) {
      return;
    }

    val = b; //just for swapping the variables an inverting them (reused "val" to avoid creating another variable in memory). IE's filter matrix uses a non-standard matrix configuration (angle goes the opposite way, and b and c are reversed and inverted)

    b = -c;
    c = -val;
    filters = cs.filter;
    style.filter = ""; //remove filters so that we can accurately measure offsetWidth/offsetHeight

    var w = this.t.offsetWidth,
        h = this.t.offsetHeight,
        clip = cs.position !== "absolute",
        m = "progid:DXImageTransform.Microsoft.Matrix(M11=" + a + ", M12=" + b + ", M21=" + c + ", M22=" + d,
        ox = t.x + w * t.xPercent / 100,
        oy = t.y + h * t.yPercent / 100,
        dx,
        dy; //if transformOrigin is being used, adjust the offset x and y

    if (t.ox != null) {
      dx = (t.oxp ? w * t.ox * 0.01 : t.ox) - w / 2;
      dy = (t.oyp ? h * t.oy * 0.01 : t.oy) - h / 2;
      ox += dx - (dx * a + dy * b);
      oy += dy - (dx * c + dy * d);
    }

    if (!clip) {
      m += ", sizingMethod='auto expand')";
    } else {
      dx = w / 2;
      dy = h / 2; //translate to ensure that transformations occur around the correct origin (default is center).

      m += ", Dx=" + (dx - (dx * a + dy * b) + ox) + ", Dy=" + (dy - (dx * c + dy * d) + oy) + ")";
    }

    if (filters.indexOf("DXImageTransform.Microsoft.Matrix(") !== -1) {
      style.filter = filters.replace(_ieSetMatrixExp, m);
    } else {
      style.filter = m + " " + filters; //we must always put the transform/matrix FIRST (before alpha(opacity=xx)) to avoid an IE bug that slices part of the object when rotation is applied with alpha.
    } //at the end or beginning of the tween, if the matrix is normal (1, 0, 0, 1) and opacity is 100 (or doesn't exist), remove the filter to improve browser performance.


    if (v === 0 || v === 1) if (a === 1) if (b === 0) if (c === 0) if (d === 1) if (!clip || m.indexOf("Dx=0, Dy=0") !== -1) if (!_opacityExp.test(filters) || parseFloat(RegExp.$1) === 100) if (filters.indexOf("gradient(" && filters.indexOf("Alpha")) === -1) {
      style.removeAttribute("filter");
    } //we must set the margins AFTER applying the filter in order to avoid some bugs in IE8 that could (in rare scenarios) cause them to be ignored intermittently (vibration).

    if (!clip) {
      var mult = _ieVers < 8 ? 1 : -1,
          //in Internet Explorer 7 and before, the box model is broken, causing the browser to treat the width/height of the actual rotated filtered image as the width/height of the box itself, but Microsoft corrected that in IE8. We must use a negative offset in IE8 on the right/bottom
      marg,
          prop,
          dif;
      dx = t.ieOffsetX || 0;
      dy = t.ieOffsetY || 0;
      t.ieOffsetX = Math.round((w - ((a < 0 ? -a : a) * w + (b < 0 ? -b : b) * h)) / 2 + ox);
      t.ieOffsetY = Math.round((h - ((d < 0 ? -d : d) * h + (c < 0 ? -c : c) * w)) / 2 + oy);

      for (i = 0; i < 4; i++) {
        prop = _margins[i];
        marg = cs[prop]; //we need to get the current margin in case it is being tweened separately (we want to respect that tween's changes)

        val = marg.indexOf("px") !== -1 ? parseFloat(marg) : _convertToPixels(this.t, prop, parseFloat(marg), marg.replace(_suffixExp, "")) || 0;

        if (val !== t[prop]) {
          dif = i < 2 ? -t.ieOffsetX : -t.ieOffsetY; //if another tween is controlling a margin, we cannot only apply the difference in the ieOffsets, so we essentially zero-out the dx and dy here in that case. We record the margin(s) later so that we can keep comparing them, making this code very flexible.
        } else {
          dif = i < 2 ? dx - t.ieOffsetX : dy - t.ieOffsetY;
        }

        style[prop] = (t[prop] = Math.round(val - dif * (i === 0 || i === 2 ? 1 : mult))) + "px";
      }
    }
  },

  /* translates a super small decimal to a string WITHOUT scientific notation
  _safeDecimal = function(n) {
  	var s = (n < 0 ? -n : n) + "",
  		a = s.split("e-");
  	return (n < 0 ? "-0." : "0.") + new Array(parseInt(a[1], 10) || 0).join("0") + a[0].split(".").join("");
  },
  */
  _setTransformRatio = _internals.set3DTransformRatio = _internals.setTransformRatio = function (v) {
    var t = this.data,
        //refers to the element's _gsTransform object
    style = this.t.style,
        angle = t.rotation,
        rotationX = t.rotationX,
        rotationY = t.rotationY,
        sx = t.scaleX,
        sy = t.scaleY,
        sz = t.scaleZ,
        x = t.x,
        y = t.y,
        z = t.z,
        isSVG = t.svg,
        perspective = t.perspective,
        force3D = t.force3D,
        skewY = t.skewY,
        skewX = t.skewX,
        t1,
        a11,
        a12,
        a13,
        a21,
        a22,
        a23,
        a31,
        a32,
        a33,
        a41,
        a42,
        a43,
        zOrigin,
        min,
        cos,
        sin,
        t2,
        transform,
        comma,
        zero,
        skew,
        rnd;

    if (skewY) {
      //for performance reasons, we combine all skewing into the skewX and rotation values. Remember, a skewY of 10 degrees looks the same as a rotation of 10 degrees plus a skewX of 10 degrees.
      skewX += skewY;
      angle += skewY;
    } //check to see if we should render as 2D (and SVGs must use 2D when _useSVGTransformAttr is true)


    if (((v === 1 || v === 0) && force3D === "auto" && (this.tween._totalTime === this.tween._totalDuration || !this.tween._totalTime) || !force3D) && !z && !perspective && !rotationY && !rotationX && sz === 1 || _useSVGTransformAttr && isSVG || !_supports3D) {
      //on the final render (which could be 0 for a from tween), if there are no 3D aspects, render in 2D to free up memory and improve performance especially on mobile devices. Check the tween's totalTime/totalDuration too in order to make sure it doesn't happen between repeats if it's a repeating tween.
      //2D
      if (angle || skewX || isSVG) {
        angle *= _DEG2RAD;
        skew = skewX * _DEG2RAD;
        rnd = 100000;
        a11 = Math.cos(angle) * sx;
        a21 = Math.sin(angle) * sx;
        a12 = Math.sin(angle - skew) * -sy;
        a22 = Math.cos(angle - skew) * sy;

        if (skew && t.skewType === "simple") {
          //by default, we compensate skewing on the other axis to make it look more natural, but you can set the skewType to "simple" to use the uncompensated skewing that CSS does
          t1 = Math.tan(skew - skewY * _DEG2RAD);
          t1 = Math.sqrt(1 + t1 * t1);
          a12 *= t1;
          a22 *= t1;

          if (skewY) {
            t1 = Math.tan(skewY * _DEG2RAD);
            t1 = Math.sqrt(1 + t1 * t1);
            a11 *= t1;
            a21 *= t1;
          }
        }

        if (isSVG) {
          x += t.xOrigin - (t.xOrigin * a11 + t.yOrigin * a12) + t.xOffset;
          y += t.yOrigin - (t.xOrigin * a21 + t.yOrigin * a22) + t.yOffset;

          if (_useSVGTransformAttr && (t.xPercent || t.yPercent)) {
            //The SVG spec doesn't support percentage-based translation in the "transform" attribute, so we merge it into the matrix to simulate it.
            min = this.t.getBBox();
            x += t.xPercent * 0.01 * min.width;
            y += t.yPercent * 0.01 * min.height;
          }

          min = 0.000001;
          if (x < min) if (x > -min) {
            x = 0;
          }
          if (y < min) if (y > -min) {
            y = 0;
          }
        }

        transform = (a11 * rnd | 0) / rnd + "," + (a21 * rnd | 0) / rnd + "," + (a12 * rnd | 0) / rnd + "," + (a22 * rnd | 0) / rnd + "," + x + "," + y + ")";

        if (isSVG && _useSVGTransformAttr) {
          this.t.setAttribute("transform", "matrix(" + transform);
        } else {
          //some browsers have a hard time with very small values like 2.4492935982947064e-16 (notice the "e-" towards the end) and would render the object slightly off. So we round to 5 decimal places.
          style[_transformProp] = (t.xPercent || t.yPercent ? "translate(" + t.xPercent + "%," + t.yPercent + "%) matrix(" : "matrix(") + transform;
        }
      } else {
        style[_transformProp] = (t.xPercent || t.yPercent ? "translate(" + t.xPercent + "%," + t.yPercent + "%) matrix(" : "matrix(") + sx + ",0,0," + sy + "," + x + "," + y + ")";
      }

      return;
    }

    if (_isFirefox) {
      //Firefox has a bug (at least in v25) that causes it to render the transparent part of 32-bit PNG images as black when displayed inside an iframe and the 3D scale is very small and doesn't change sufficiently enough between renders (like if you use a Power4.easeInOut to scale from 0 to 1 where the beginning values only change a tiny amount to begin the tween before accelerating). In this case, we force the scale to be 0.00002 instead which is visually the same but works around the Firefox issue.
      min = 0.0001;

      if (sx < min && sx > -min) {
        sx = sz = 0.00002;
      }

      if (sy < min && sy > -min) {
        sy = sz = 0.00002;
      }

      if (perspective && !t.z && !t.rotationX && !t.rotationY) {
        //Firefox has a bug that causes elements to have an odd super-thin, broken/dotted black border on elements that have a perspective set but aren't utilizing 3D space (no rotationX, rotationY, or z).
        perspective = 0;
      }
    }

    if (angle || skewX) {
      angle *= _DEG2RAD;
      cos = a11 = Math.cos(angle);
      sin = a21 = Math.sin(angle);

      if (skewX) {
        angle -= skewX * _DEG2RAD;
        cos = Math.cos(angle);
        sin = Math.sin(angle);

        if (t.skewType === "simple") {
          //by default, we compensate skewing on the other axis to make it look more natural, but you can set the skewType to "simple" to use the uncompensated skewing that CSS does
          t1 = Math.tan((skewX - skewY) * _DEG2RAD);
          t1 = Math.sqrt(1 + t1 * t1);
          cos *= t1;
          sin *= t1;

          if (t.skewY) {
            t1 = Math.tan(skewY * _DEG2RAD);
            t1 = Math.sqrt(1 + t1 * t1);
            a11 *= t1;
            a21 *= t1;
          }
        }
      }

      a12 = -sin;
      a22 = cos;
    } else if (!rotationY && !rotationX && sz === 1 && !perspective && !isSVG) {
      //if we're only translating and/or 2D scaling, this is faster...
      style[_transformProp] = (t.xPercent || t.yPercent ? "translate(" + t.xPercent + "%," + t.yPercent + "%) translate3d(" : "translate3d(") + x + "px," + y + "px," + z + "px)" + (sx !== 1 || sy !== 1 ? " scale(" + sx + "," + sy + ")" : "");
      return;
    } else {
      a11 = a22 = 1;
      a12 = a21 = 0;
    } // KEY  INDEX   AFFECTS a[row][column]
    // a11  0       rotation, rotationY, scaleX
    // a21  1       rotation, rotationY, scaleX
    // a31  2       rotationY, scaleX
    // a41  3       rotationY, scaleX
    // a12  4       rotation, skewX, rotationX, scaleY
    // a22  5       rotation, skewX, rotationX, scaleY
    // a32  6       rotationX, scaleY
    // a42  7       rotationX, scaleY
    // a13  8       rotationY, rotationX, scaleZ
    // a23  9       rotationY, rotationX, scaleZ
    // a33  10      rotationY, rotationX, scaleZ
    // a43  11      rotationY, rotationX, perspective, scaleZ
    // a14  12      x, zOrigin, svgOrigin
    // a24  13      y, zOrigin, svgOrigin
    // a34  14      z, zOrigin
    // a44  15
    // rotation: Math.atan2(a21, a11)
    // rotationY: Math.atan2(a13, a33) (or Math.atan2(a13, a11))
    // rotationX: Math.atan2(a32, a33)


    a33 = 1;
    a13 = a23 = a31 = a32 = a41 = a42 = 0;
    a43 = perspective ? -1 / perspective : 0;
    zOrigin = t.zOrigin;
    min = 0.000001; //threshold below which browsers use scientific notation which won't work.

    comma = ",";
    zero = "0";
    angle = rotationY * _DEG2RAD;

    if (angle) {
      cos = Math.cos(angle);
      sin = Math.sin(angle);
      a31 = -sin;
      a41 = a43 * -sin;
      a13 = a11 * sin;
      a23 = a21 * sin;
      a33 = cos;
      a43 *= cos;
      a11 *= cos;
      a21 *= cos;
    }

    angle = rotationX * _DEG2RAD;

    if (angle) {
      cos = Math.cos(angle);
      sin = Math.sin(angle);
      t1 = a12 * cos + a13 * sin;
      t2 = a22 * cos + a23 * sin;
      a32 = a33 * sin;
      a42 = a43 * sin;
      a13 = a12 * -sin + a13 * cos;
      a23 = a22 * -sin + a23 * cos;
      a33 = a33 * cos;
      a43 = a43 * cos;
      a12 = t1;
      a22 = t2;
    }

    if (sz !== 1) {
      a13 *= sz;
      a23 *= sz;
      a33 *= sz;
      a43 *= sz;
    }

    if (sy !== 1) {
      a12 *= sy;
      a22 *= sy;
      a32 *= sy;
      a42 *= sy;
    }

    if (sx !== 1) {
      a11 *= sx;
      a21 *= sx;
      a31 *= sx;
      a41 *= sx;
    }

    if (zOrigin || isSVG) {
      if (zOrigin) {
        x += a13 * -zOrigin;
        y += a23 * -zOrigin;
        z += a33 * -zOrigin + zOrigin;
      }

      if (isSVG) {
        //due to bugs in some browsers, we need to manage the transform-origin of SVG manually
        x += t.xOrigin - (t.xOrigin * a11 + t.yOrigin * a12) + t.xOffset;
        y += t.yOrigin - (t.xOrigin * a21 + t.yOrigin * a22) + t.yOffset;
      }

      if (x < min && x > -min) {
        x = zero;
      }

      if (y < min && y > -min) {
        y = zero;
      }

      if (z < min && z > -min) {
        z = 0; //don't use string because we calculate perspective later and need the number.
      }
    } //optimized way of concatenating all the values into a string. If we do it all in one shot, it's slower because of the way browsers have to create temp strings and the way it affects memory. If we do it piece-by-piece with +=, it's a bit slower too. We found that doing it in these sized chunks works best overall:


    transform = t.xPercent || t.yPercent ? "translate(" + t.xPercent + "%," + t.yPercent + "%) matrix3d(" : "matrix3d(";
    transform += (a11 < min && a11 > -min ? zero : a11) + comma + (a21 < min && a21 > -min ? zero : a21) + comma + (a31 < min && a31 > -min ? zero : a31);
    transform += comma + (a41 < min && a41 > -min ? zero : a41) + comma + (a12 < min && a12 > -min ? zero : a12) + comma + (a22 < min && a22 > -min ? zero : a22);

    if (rotationX || rotationY || sz !== 1) {
      //performance optimization (often there's no rotationX or rotationY, so we can skip these calculations)
      transform += comma + (a32 < min && a32 > -min ? zero : a32) + comma + (a42 < min && a42 > -min ? zero : a42) + comma + (a13 < min && a13 > -min ? zero : a13);
      transform += comma + (a23 < min && a23 > -min ? zero : a23) + comma + (a33 < min && a33 > -min ? zero : a33) + comma + (a43 < min && a43 > -min ? zero : a43) + comma;
    } else {
      transform += ",0,0,0,0,1,0,";
    }

    transform += x + comma + y + comma + z + comma + (perspective ? 1 + -z / perspective : 1) + ")";
    style[_transformProp] = transform;
  };

  p = Transform.prototype;
  p.x = p.y = p.z = p.skewX = p.skewY = p.rotation = p.rotationX = p.rotationY = p.zOrigin = p.xPercent = p.yPercent = p.xOffset = p.yOffset = 0;
  p.scaleX = p.scaleY = p.scaleZ = 1;

  _registerComplexSpecialProp("transform,scale,scaleX,scaleY,scaleZ,x,y,z,rotation,rotationX,rotationY,rotationZ,skewX,skewY,shortRotation,shortRotationX,shortRotationY,shortRotationZ,transformOrigin,svgOrigin,transformPerspective,directionalRotation,parseTransform,force3D,skewType,xPercent,yPercent,smoothOrigin", {
    parser: function (t, e, parsingProp, cssp, pt, plugin, vars) {
      if (cssp._lastParsedTransform === vars) {
        return pt;
      } //only need to parse the transform once, and only if the browser supports it.


      cssp._lastParsedTransform = vars;
      var scaleFunc = vars.scale && typeof vars.scale === "function" ? vars.scale : 0,
          //if there's a function-based "scale" value, swap in the resulting numeric value temporarily. Otherwise, if it's called for both scaleX and scaleY independently, they may not match (like if the function uses Math.random()).
      swapFunc;

      if (typeof vars[parsingProp] === "function") {
        //whatever property triggers the initial parsing might be a function-based value in which case it already got called in parse(), thus we don't want to call it again in here. The most efficient way to avoid this is to temporarily swap the value directly into the vars object, and then after we do all our parsing in this function, we'll swap it back again.
        swapFunc = vars[parsingProp];
        vars[parsingProp] = e;
      }

      if (scaleFunc) {
        vars.scale = scaleFunc(_index, t);
      }

      var originalGSTransform = t._gsTransform,
          style = t.style,
          min = 0.000001,
          i = _transformProps.length,
          v = vars,
          endRotations = {},
          transformOriginString = "transformOrigin",
          m1 = _getTransform(t, _cs, true, v.parseTransform),
          orig = v.transform && (typeof v.transform === "function" ? v.transform(_index, _target) : v.transform),
          m2,
          copy,
          has3D,
          hasChange,
          dr,
          x,
          y,
          matrix,
          p;

      m1.skewType = v.skewType || m1.skewType || CSSPlugin.defaultSkewType;
      cssp._transform = m1;

      if ("rotationZ" in v) {
        v.rotation = v.rotationZ;
      }

      if (orig && typeof orig === "string" && _transformProp) {
        //for values like transform:"rotate(60deg) scale(0.5, 0.8)"
        copy = _tempDiv.style; //don't use the original target because it might be SVG in which case some browsers don't report computed style correctly.

        copy[_transformProp] = orig;
        copy.display = "block"; //if display is "none", the browser often refuses to report the transform properties correctly.

        copy.position = "absolute";

        if (orig.indexOf("%") !== -1) {
          //%-based translations will fail unless we set the width/height to match the original target...
          copy.width = _getStyle(t, "width");
          copy.height = _getStyle(t, "height");
        }

        _doc.body.appendChild(_tempDiv);

        m2 = _getTransform(_tempDiv, null, false);

        if (m1.skewType === "simple") {
          //the default _getTransform() reports the skewX/scaleY as if skewType is "compensated", thus we need to adjust that here if skewType is "simple".
          m2.scaleY *= Math.cos(m2.skewX * _DEG2RAD);
        }

        if (m1.svg) {
          //if it's an SVG element, x/y part of the matrix will be affected by whatever we use as the origin and the offsets, so compensate here...
          x = m1.xOrigin;
          y = m1.yOrigin;
          m2.x -= m1.xOffset;
          m2.y -= m1.yOffset;

          if (v.transformOrigin || v.svgOrigin) {
            //if this tween is altering the origin, we must factor that in here. The actual work of recording the transformOrigin values and setting up the PropTween is done later (still inside this function) so we cannot leave the changes intact here - we only want to update the x/y accordingly.
            orig = {};

            _parseSVGOrigin(t, _parsePosition(v.transformOrigin), orig, v.svgOrigin, v.smoothOrigin, true);

            x = orig.xOrigin;
            y = orig.yOrigin;
            m2.x -= orig.xOffset - m1.xOffset;
            m2.y -= orig.yOffset - m1.yOffset;
          }

          if (x || y) {
            matrix = _getMatrix(_tempDiv, true);
            m2.x -= x - (x * matrix[0] + y * matrix[2]);
            m2.y -= y - (x * matrix[1] + y * matrix[3]);
          }
        }

        _doc.body.removeChild(_tempDiv);

        if (!m2.perspective) {
          m2.perspective = m1.perspective; //tweening to no perspective gives very unintuitive results - just keep the same perspective in that case.
        }

        if (v.xPercent != null) {
          m2.xPercent = _parseVal(v.xPercent, m1.xPercent);
        }

        if (v.yPercent != null) {
          m2.yPercent = _parseVal(v.yPercent, m1.yPercent);
        }
      } else if (typeof v === "object") {
        //for values like scaleX, scaleY, rotation, x, y, skewX, and skewY or transform:{...} (object)
        m2 = {
          scaleX: _parseVal(v.scaleX != null ? v.scaleX : v.scale, m1.scaleX),
          scaleY: _parseVal(v.scaleY != null ? v.scaleY : v.scale, m1.scaleY),
          scaleZ: _parseVal(v.scaleZ, m1.scaleZ),
          x: _parseVal(v.x, m1.x),
          y: _parseVal(v.y, m1.y),
          z: _parseVal(v.z, m1.z),
          xPercent: _parseVal(v.xPercent, m1.xPercent),
          yPercent: _parseVal(v.yPercent, m1.yPercent),
          perspective: _parseVal(v.transformPerspective, m1.perspective)
        };
        dr = v.directionalRotation;

        if (dr != null) {
          if (typeof dr === "object") {
            for (copy in dr) {
              v[copy] = dr[copy];
            }
          } else {
            v.rotation = dr;
          }
        }

        if (typeof v.x === "string" && v.x.indexOf("%") !== -1) {
          m2.x = 0;
          m2.xPercent = _parseVal(v.x, m1.xPercent);
        }

        if (typeof v.y === "string" && v.y.indexOf("%") !== -1) {
          m2.y = 0;
          m2.yPercent = _parseVal(v.y, m1.yPercent);
        }

        m2.rotation = _parseAngle("rotation" in v ? v.rotation : "shortRotation" in v ? v.shortRotation + "_short" : m1.rotation, m1.rotation, "rotation", endRotations);

        if (_supports3D) {
          m2.rotationX = _parseAngle("rotationX" in v ? v.rotationX : "shortRotationX" in v ? v.shortRotationX + "_short" : m1.rotationX || 0, m1.rotationX, "rotationX", endRotations);
          m2.rotationY = _parseAngle("rotationY" in v ? v.rotationY : "shortRotationY" in v ? v.shortRotationY + "_short" : m1.rotationY || 0, m1.rotationY, "rotationY", endRotations);
        }

        m2.skewX = _parseAngle(v.skewX, m1.skewX);
        m2.skewY = _parseAngle(v.skewY, m1.skewY);
      }

      if (_supports3D && v.force3D != null) {
        m1.force3D = v.force3D;
        hasChange = true;
      }

      has3D = m1.force3D || m1.z || m1.rotationX || m1.rotationY || m2.z || m2.rotationX || m2.rotationY || m2.perspective;

      if (!has3D && v.scale != null) {
        m2.scaleZ = 1; //no need to tween scaleZ.
      }

      while (--i > -1) {
        p = _transformProps[i];
        orig = m2[p] - m1[p];

        if (orig > min || orig < -min || v[p] != null || _forcePT[p] != null) {
          hasChange = true;
          pt = new CSSPropTween(m1, p, m1[p], orig, pt);

          if (p in endRotations) {
            pt.e = endRotations[p]; //directional rotations typically have compensated values during the tween, but we need to make sure they end at exactly what the user requested
          }

          pt.xs0 = 0; //ensures the value stays numeric in setRatio()

          pt.plugin = plugin;

          cssp._overwriteProps.push(pt.n);
        }
      }

      orig = v.transformOrigin;

      if (m1.svg && (orig || v.svgOrigin)) {
        x = m1.xOffset; //when we change the origin, in order to prevent things from jumping we adjust the x/y so we must record those here so that we can create PropTweens for them and flip them at the same time as the origin

        y = m1.yOffset;

        _parseSVGOrigin(t, _parsePosition(orig), m2, v.svgOrigin, v.smoothOrigin);

        pt = _addNonTweeningNumericPT(m1, "xOrigin", (originalGSTransform ? m1 : m2).xOrigin, m2.xOrigin, pt, transformOriginString); //note: if there wasn't a transformOrigin defined yet, just start with the destination one; it's wasteful otherwise, and it causes problems with fromTo() tweens. For example, TweenLite.to("#wheel", 3, {rotation:180, transformOrigin:"50% 50%", delay:1}); TweenLite.fromTo("#wheel", 3, {scale:0.5, transformOrigin:"50% 50%"}, {scale:1, delay:2}); would cause a jump when the from values revert at the beginning of the 2nd tween.

        pt = _addNonTweeningNumericPT(m1, "yOrigin", (originalGSTransform ? m1 : m2).yOrigin, m2.yOrigin, pt, transformOriginString);

        if (x !== m1.xOffset || y !== m1.yOffset) {
          pt = _addNonTweeningNumericPT(m1, "xOffset", originalGSTransform ? x : m1.xOffset, m1.xOffset, pt, transformOriginString);
          pt = _addNonTweeningNumericPT(m1, "yOffset", originalGSTransform ? y : m1.yOffset, m1.yOffset, pt, transformOriginString);
        }

        orig = "0px 0px"; //certain browsers (like firefox) completely botch transform-origin, so we must remove it to prevent it from contaminating transforms. We manage it ourselves with xOrigin and yOrigin
      }

      if (orig || _supports3D && has3D && m1.zOrigin) {
        //if anything 3D is happening and there's a transformOrigin with a z component that's non-zero, we must ensure that the transformOrigin's z-component is set to 0 so that we can manually do those calculations to get around Safari bugs. Even if the user didn't specifically define a "transformOrigin" in this particular tween (maybe they did it via css directly).
        if (_transformProp) {
          hasChange = true;
          p = _transformOriginProp;
          orig = (orig || _getStyle(t, p, _cs, false, "50% 50%")) + ""; //cast as string to avoid errors

          pt = new CSSPropTween(style, p, 0, 0, pt, -1, transformOriginString);
          pt.b = style[p];
          pt.plugin = plugin;

          if (_supports3D) {
            copy = m1.zOrigin;
            orig = orig.split(" ");
            m1.zOrigin = (orig.length > 2 && !(copy !== 0 && orig[2] === "0px") ? parseFloat(orig[2]) : copy) || 0; //Safari doesn't handle the z part of transformOrigin correctly, so we'll manually handle it in the _set3DTransformRatio() method.

            pt.xs0 = pt.e = orig[0] + " " + (orig[1] || "50%") + " 0px"; //we must define a z value of 0px specifically otherwise iOS 5 Safari will stick with the old one (if one was defined)!

            pt = new CSSPropTween(m1, "zOrigin", 0, 0, pt, -1, pt.n); //we must create a CSSPropTween for the _gsTransform.zOrigin so that it gets reset properly at the beginning if the tween runs backward (as opposed to just setting m1.zOrigin here)

            pt.b = copy;
            pt.xs0 = pt.e = m1.zOrigin;
          } else {
            pt.xs0 = pt.e = orig;
          } //for older versions of IE (6-8), we need to manually calculate things inside the setRatio() function. We record origin x and y (ox and oy) and whether or not the values are percentages (oxp and oyp).

        } else {
          _parsePosition(orig + "", m1);
        }
      }

      if (hasChange) {
        cssp._transformType = !(m1.svg && _useSVGTransformAttr) && (has3D || this._transformType === 3) ? 3 : 2; //quicker than calling cssp._enableTransforms();
      }

      if (swapFunc) {
        vars[parsingProp] = swapFunc;
      }

      if (scaleFunc) {
        vars.scale = scaleFunc;
      }

      return pt;
    },
    prefix: true
  });

  _registerComplexSpecialProp("boxShadow", {
    defaultValue: "0px 0px 0px 0px #999",
    prefix: true,
    color: true,
    multi: true,
    keyword: "inset"
  });

  _registerComplexSpecialProp("borderRadius", {
    defaultValue: "0px",
    parser: function (t, e, p, cssp, pt, plugin) {
      e = this.format(e);
      var props = ["borderTopLeftRadius", "borderTopRightRadius", "borderBottomRightRadius", "borderBottomLeftRadius"],
          style = t.style,
          ea1,
          i,
          es2,
          bs2,
          bs,
          es,
          bn,
          en,
          w,
          h,
          esfx,
          bsfx,
          rel,
          hn,
          vn,
          em;
      w = parseFloat(t.offsetWidth);
      h = parseFloat(t.offsetHeight);
      ea1 = e.split(" ");

      for (i = 0; i < props.length; i++) {
        //if we're dealing with percentages, we must convert things separately for the horizontal and vertical axis!
        if (this.p.indexOf("border")) {
          //older browsers used a prefix
          props[i] = _checkPropPrefix(props[i]);
        }

        bs = bs2 = _getStyle(t, props[i], _cs, false, "0px");

        if (bs.indexOf(" ") !== -1) {
          bs2 = bs.split(" ");
          bs = bs2[0];
          bs2 = bs2[1];
        }

        es = es2 = ea1[i];
        bn = parseFloat(bs);
        bsfx = bs.substr((bn + "").length);
        rel = es.charAt(1) === "=";

        if (rel) {
          en = parseInt(es.charAt(0) + "1", 10);
          es = es.substr(2);
          en *= parseFloat(es);
          esfx = es.substr((en + "").length - (en < 0 ? 1 : 0)) || "";
        } else {
          en = parseFloat(es);
          esfx = es.substr((en + "").length);
        }

        if (esfx === "") {
          esfx = _suffixMap[p] || bsfx;
        }

        if (esfx !== bsfx) {
          hn = _convertToPixels(t, "borderLeft", bn, bsfx); //horizontal number (we use a bogus "borderLeft" property just because the _convertToPixels() method searches for the keywords "Left", "Right", "Top", and "Bottom" to determine of it's a horizontal or vertical property, and we need "border" in the name so that it knows it should measure relative to the element itself, not its parent.

          vn = _convertToPixels(t, "borderTop", bn, bsfx); //vertical number

          if (esfx === "%") {
            bs = hn / w * 100 + "%";
            bs2 = vn / h * 100 + "%";
          } else if (esfx === "em") {
            em = _convertToPixels(t, "borderLeft", 1, "em");
            bs = hn / em + "em";
            bs2 = vn / em + "em";
          } else {
            bs = hn + "px";
            bs2 = vn + "px";
          }

          if (rel) {
            es = parseFloat(bs) + en + esfx;
            es2 = parseFloat(bs2) + en + esfx;
          }
        }

        pt = _parseComplex(style, props[i], bs + " " + bs2, es + " " + es2, false, "0px", pt);
      }

      return pt;
    },
    prefix: true,
    formatter: _getFormatter("0px 0px 0px 0px", false, true)
  });

  _registerComplexSpecialProp("borderBottomLeftRadius,borderBottomRightRadius,borderTopLeftRadius,borderTopRightRadius", {
    defaultValue: "0px",
    parser: function (t, e, p, cssp, pt, plugin) {
      return _parseComplex(t.style, p, this.format(_getStyle(t, p, _cs, false, "0px 0px")), this.format(e), false, "0px", pt);
    },
    prefix: true,
    formatter: _getFormatter("0px 0px", false, true)
  });

  _registerComplexSpecialProp("backgroundPosition", {
    defaultValue: "0 0",
    parser: function (t, e, p, cssp, pt, plugin) {
      var bp = "background-position",
          cs = _cs || _getComputedStyle(t, null),
          bs = this.format((cs ? _ieVers ? cs.getPropertyValue(bp + "-x") + " " + cs.getPropertyValue(bp + "-y") : cs.getPropertyValue(bp) : t.currentStyle.backgroundPositionX + " " + t.currentStyle.backgroundPositionY) || "0 0"),
          //Internet Explorer doesn't report background-position correctly - we must query background-position-x and background-position-y and combine them (even in IE10). Before IE9, we must do the same with the currentStyle object and use camelCase
      es = this.format(e),
          ba,
          ea,
          i,
          pct,
          overlap,
          src;

      if (bs.indexOf("%") !== -1 !== (es.indexOf("%") !== -1) && es.split(",").length < 2) {
        src = _getStyle(t, "backgroundImage").replace(_urlExp, "");

        if (src && src !== "none") {
          ba = bs.split(" ");
          ea = es.split(" ");

          _tempImg.setAttribute("src", src); //set the temp IMG's src to the background-image so that we can measure its width/height


          i = 2;

          while (--i > -1) {
            bs = ba[i];
            pct = bs.indexOf("%") !== -1;

            if (pct !== (ea[i].indexOf("%") !== -1)) {
              overlap = i === 0 ? t.offsetWidth - _tempImg.width : t.offsetHeight - _tempImg.height;
              ba[i] = pct ? parseFloat(bs) / 100 * overlap + "px" : parseFloat(bs) / overlap * 100 + "%";
            }
          }

          bs = ba.join(" ");
        }
      }

      return this.parseComplex(t.style, bs, es, pt, plugin);
    },
    formatter: _parsePosition
  });

  _registerComplexSpecialProp("backgroundSize", {
    defaultValue: "0 0",
    formatter: function (v) {
      v += ""; //ensure it's a string

      return v.substr(0, 2) === "co" ? v : _parsePosition(v.indexOf(" ") === -1 ? v + " " + v : v); //if set to something like "100% 100%", Safari typically reports the computed style as just "100%" (no 2nd value), but we should ensure that there are two values, so copy the first one. Otherwise, it'd be interpreted as "100% 0" (wrong). Also remember that it could be "cover" or "contain" which we can't tween but should be able to set.
    }
  });

  _registerComplexSpecialProp("perspective", {
    defaultValue: "0px",
    prefix: true
  });

  _registerComplexSpecialProp("perspectiveOrigin", {
    defaultValue: "50% 50%",
    prefix: true
  });

  _registerComplexSpecialProp("transformStyle", {
    prefix: true
  });

  _registerComplexSpecialProp("backfaceVisibility", {
    prefix: true
  });

  _registerComplexSpecialProp("userSelect", {
    prefix: true
  });

  _registerComplexSpecialProp("margin", {
    parser: _getEdgeParser("marginTop,marginRight,marginBottom,marginLeft")
  });

  _registerComplexSpecialProp("padding", {
    parser: _getEdgeParser("paddingTop,paddingRight,paddingBottom,paddingLeft")
  });

  _registerComplexSpecialProp("clip", {
    defaultValue: "rect(0px,0px,0px,0px)",
    parser: function (t, e, p, cssp, pt, plugin) {
      var b, cs, delim;

      if (_ieVers < 9) {
        //IE8 and earlier don't report a "clip" value in the currentStyle - instead, the values are split apart into clipTop, clipRight, clipBottom, and clipLeft. Also, in IE7 and earlier, the values inside rect() are space-delimited, not comma-delimited.
        cs = t.currentStyle;
        delim = _ieVers < 8 ? " " : ",";
        b = "rect(" + cs.clipTop + delim + cs.clipRight + delim + cs.clipBottom + delim + cs.clipLeft + ")";
        e = this.format(e).split(",").join(delim);
      } else {
        b = this.format(_getStyle(t, this.p, _cs, false, this.dflt));
        e = this.format(e);
      }

      return this.parseComplex(t.style, b, e, pt, plugin);
    }
  });

  _registerComplexSpecialProp("textShadow", {
    defaultValue: "0px 0px 0px #999",
    color: true,
    multi: true
  });

  _registerComplexSpecialProp("autoRound,strictUnits", {
    parser: function (t, e, p, cssp, pt) {
      return pt;
    }
  }); //just so that we can ignore these properties (not tween them)


  _registerComplexSpecialProp("border", {
    defaultValue: "0px solid #000",
    parser: function (t, e, p, cssp, pt, plugin) {
      var bw = _getStyle(t, "borderTopWidth", _cs, false, "0px"),
          end = this.format(e).split(" "),
          esfx = end[0].replace(_suffixExp, "");

      if (esfx !== "px") {
        //if we're animating to a non-px value, we need to convert the beginning width to that unit.
        bw = parseFloat(bw) / _convertToPixels(t, "borderTopWidth", 1, esfx) + esfx;
      }

      return this.parseComplex(t.style, this.format(bw + " " + _getStyle(t, "borderTopStyle", _cs, false, "solid") + " " + _getStyle(t, "borderTopColor", _cs, false, "#000")), end.join(" "), pt, plugin);
    },
    color: true,
    formatter: function (v) {
      var a = v.split(" ");
      return a[0] + " " + (a[1] || "solid") + " " + (v.match(_colorExp) || ["#000"])[0];
    }
  });

  _registerComplexSpecialProp("borderWidth", {
    parser: _getEdgeParser("borderTopWidth,borderRightWidth,borderBottomWidth,borderLeftWidth")
  }); //Firefox doesn't pick up on borderWidth set in style sheets (only inline).


  _registerComplexSpecialProp("float,cssFloat,styleFloat", {
    parser: function (t, e, p, cssp, pt, plugin) {
      var s = t.style,
          prop = "cssFloat" in s ? "cssFloat" : "styleFloat";
      return new CSSPropTween(s, prop, 0, 0, pt, -1, p, false, 0, s[prop], e);
    }
  }); //opacity-related


  var _setIEOpacityRatio = function (v) {
    var t = this.t,
        //refers to the element's style property
    filters = t.filter || _getStyle(this.data, "filter") || "",
        val = this.s + this.c * v | 0,
        skip;

    if (val === 100) {
      //for older versions of IE that need to use a filter to apply opacity, we should remove the filter if opacity hits 1 in order to improve performance, but make sure there isn't a transform (matrix) or gradient in the filters.
      if (filters.indexOf("atrix(") === -1 && filters.indexOf("radient(") === -1 && filters.indexOf("oader(") === -1) {
        t.removeAttribute("filter");
        skip = !_getStyle(this.data, "filter"); //if a class is applied that has an alpha filter, it will take effect (we don't want that), so re-apply our alpha filter in that case. We must first remove it and then check.
      } else {
        t.filter = filters.replace(_alphaFilterExp, "");
        skip = true;
      }
    }

    if (!skip) {
      if (this.xn1) {
        t.filter = filters = filters || "alpha(opacity=" + val + ")"; //works around bug in IE7/8 that prevents changes to "visibility" from being applied properly if the filter is changed to a different alpha on the same frame.
      }

      if (filters.indexOf("pacity") === -1) {
        //only used if browser doesn't support the standard opacity style property (IE 7 and 8). We omit the "O" to avoid case-sensitivity issues
        if (val !== 0 || !this.xn1) {
          //bugs in IE7/8 won't render the filter properly if opacity is ADDED on the same frame/render as "visibility" changes (this.xn1 is 1 if this tween is an "autoAlpha" tween)
          t.filter = filters + " alpha(opacity=" + val + ")"; //we round the value because otherwise, bugs in IE7/8 can prevent "visibility" changes from being applied properly.
        }
      } else {
        t.filter = filters.replace(_opacityExp, "opacity=" + val);
      }
    }
  };

  _registerComplexSpecialProp("opacity,alpha,autoAlpha", {
    defaultValue: "1",
    parser: function (t, e, p, cssp, pt, plugin) {
      var b = parseFloat(_getStyle(t, "opacity", _cs, false, "1")),
          style = t.style,
          isAutoAlpha = p === "autoAlpha";

      if (typeof e === "string" && e.charAt(1) === "=") {
        e = (e.charAt(0) === "-" ? -1 : 1) * parseFloat(e.substr(2)) + b;
      }

      if (isAutoAlpha && b === 1 && _getStyle(t, "visibility", _cs) === "hidden" && e !== 0) {
        //if visibility is initially set to "hidden", we should interpret that as intent to make opacity 0 (a convenience)
        b = 0;
      }

      if (_supportsOpacity) {
        pt = new CSSPropTween(style, "opacity", b, e - b, pt);
      } else {
        pt = new CSSPropTween(style, "opacity", b * 100, (e - b) * 100, pt);
        pt.xn1 = isAutoAlpha ? 1 : 0; //we need to record whether or not this is an autoAlpha so that in the setRatio(), we know to duplicate the setting of the alpha in order to work around a bug in IE7 and IE8 that prevents changes to "visibility" from taking effect if the filter is changed to a different alpha(opacity) at the same time. Setting it to the SAME value first, then the new value works around the IE7/8 bug.

        style.zoom = 1; //helps correct an IE issue.

        pt.type = 2;
        pt.b = "alpha(opacity=" + pt.s + ")";
        pt.e = "alpha(opacity=" + (pt.s + pt.c) + ")";
        pt.data = t;
        pt.plugin = plugin;
        pt.setRatio = _setIEOpacityRatio;
      }

      if (isAutoAlpha) {
        //we have to create the "visibility" PropTween after the opacity one in the linked list so that they run in the order that works properly in IE8 and earlier
        pt = new CSSPropTween(style, "visibility", 0, 0, pt, -1, null, false, 0, b !== 0 ? "inherit" : "hidden", e === 0 ? "hidden" : "inherit");
        pt.xs0 = "inherit";

        cssp._overwriteProps.push(pt.n);

        cssp._overwriteProps.push(p);
      }

      return pt;
    }
  });

  var _removeProp = function (s, p) {
    if (p) {
      if (s.removeProperty) {
        if (p.substr(0, 2) === "ms" || p.substr(0, 6) === "webkit") {
          //Microsoft and some Webkit browsers don't conform to the standard of capitalizing the first prefix character, so we adjust so that when we prefix the caps with a dash, it's correct (otherwise it'd be "ms-transform" instead of "-ms-transform" for IE9, for example)
          p = "-" + p;
        }

        s.removeProperty(p.replace(_capsExp, "-$1").toLowerCase());
      } else {
        //note: old versions of IE use "removeAttribute()" instead of "removeProperty()"
        s.removeAttribute(p);
      }
    }
  },
      _setClassNameRatio = function (v) {
    this.t._gsClassPT = this;

    if (v === 1 || v === 0) {
      this.t.setAttribute("class", v === 0 ? this.b : this.e);
      var mpt = this.data,
          //first MiniPropTween
      s = this.t.style;

      while (mpt) {
        if (!mpt.v) {
          _removeProp(s, mpt.p);
        } else {
          s[mpt.p] = mpt.v;
        }

        mpt = mpt._next;
      }

      if (v === 1 && this.t._gsClassPT === this) {
        this.t._gsClassPT = null;
      }
    } else if (this.t.getAttribute("class") !== this.e) {
      this.t.setAttribute("class", this.e);
    }
  };

  _registerComplexSpecialProp("className", {
    parser: function (t, e, p, cssp, pt, plugin, vars) {
      var b = t.getAttribute("class") || "",
          //don't use t.className because it doesn't work consistently on SVG elements; getAttribute("class") and setAttribute("class", value") is more reliable.
      cssText = t.style.cssText,
          difData,
          bs,
          cnpt,
          cnptLookup,
          mpt;
      pt = cssp._classNamePT = new CSSPropTween(t, p, 0, 0, pt, 2);
      pt.setRatio = _setClassNameRatio;
      pt.pr = -11;
      _hasPriority = true;
      pt.b = b;
      bs = _getAllStyles(t, _cs); //if there's a className tween already operating on the target, force it to its end so that the necessary inline styles are removed and the class name is applied before we determine the end state (we don't want inline styles interfering that were there just for class-specific values)

      cnpt = t._gsClassPT;

      if (cnpt) {
        cnptLookup = {};
        mpt = cnpt.data; //first MiniPropTween which stores the inline styles - we need to force these so that the inline styles don't contaminate things. Otherwise, there's a small chance that a tween could start and the inline values match the destination values and they never get cleaned.

        while (mpt) {
          cnptLookup[mpt.p] = 1;
          mpt = mpt._next;
        }

        cnpt.setRatio(1);
      }

      t._gsClassPT = pt;
      pt.e = e.charAt(1) !== "=" ? e : b.replace(new RegExp("(?:\\s|^)" + e.substr(2) + "(?![\\w-])"), "") + (e.charAt(0) === "+" ? " " + e.substr(2) : "");
      t.setAttribute("class", pt.e);
      difData = _cssDif(t, bs, _getAllStyles(t), vars, cnptLookup);
      t.setAttribute("class", b);
      pt.data = difData.firstMPT;
      t.style.cssText = cssText; //we recorded cssText before we swapped classes and ran _getAllStyles() because in cases when a className tween is overwritten, we remove all the related tweening properties from that class change (otherwise class-specific stuff can't override properties we've directly set on the target's style object due to specificity).

      pt = pt.xfirst = cssp.parse(t, difData.difs, pt, plugin); //we record the CSSPropTween as the xfirst so that we can handle overwriting propertly (if "className" gets overwritten, we must kill all the properties associated with the className part of the tween, so we can loop through from xfirst to the pt itself)

      return pt;
    }
  });

  var _setClearPropsRatio = function (v) {
    if (v === 1 || v === 0) if (this.data._totalTime === this.data._totalDuration && this.data.data !== "isFromStart") {
      //this.data refers to the tween. Only clear at the END of the tween (remember, from() tweens make the ratio go from 1 to 0, so we can't just check that and if the tween is the zero-duration one that's created internally to render the starting values in a from() tween, ignore that because otherwise, for example, from(...{height:100, clearProps:"height", delay:1}) would wipe the height at the beginning of the tween and after 1 second, it'd kick back in).
      var s = this.t.style,
          transformParse = _specialProps.transform.parse,
          a,
          p,
          i,
          clearTransform,
          transform;

      if (this.e === "all") {
        s.cssText = "";
        clearTransform = true;
      } else {
        a = this.e.split(" ").join("").split(",");
        i = a.length;

        while (--i > -1) {
          p = a[i];

          if (_specialProps[p]) {
            if (_specialProps[p].parse === transformParse) {
              clearTransform = true;
            } else {
              p = p === "transformOrigin" ? _transformOriginProp : _specialProps[p].p; //ensures that special properties use the proper browser-specific property name, like "scaleX" might be "-webkit-transform" or "boxShadow" might be "-moz-box-shadow"
            }
          }

          _removeProp(s, p);
        }
      }

      if (clearTransform) {
        _removeProp(s, _transformProp);

        transform = this.t._gsTransform;

        if (transform) {
          if (transform.svg) {
            this.t.removeAttribute("data-svg-origin");
            this.t.removeAttribute("transform");
          }

          delete this.t._gsTransform;
        }
      }
    }
  };

  _registerComplexSpecialProp("clearProps", {
    parser: function (t, e, p, cssp, pt) {
      pt = new CSSPropTween(t, p, 0, 0, pt, 2);
      pt.setRatio = _setClearPropsRatio;
      pt.e = e;
      pt.pr = -10;
      pt.data = cssp._tween;
      _hasPriority = true;
      return pt;
    }
  });

  p = "bezier,throwProps,physicsProps,physics2D".split(",");
  i = p.length;

  while (i--) {
    _registerPluginProp(p[i]);
  }

  p = CSSPlugin.prototype;
  p._firstPT = p._lastParsedTransform = p._transform = null; //gets called when the tween renders for the first time. This kicks everything off, recording start/end values, etc.

  p._onInitTween = function (target, vars, tween, index) {
    if (!target.nodeType) {
      //css is only for dom elements
      return false;
    }

    this._target = _target = target;
    this._tween = tween;
    this._vars = vars;
    _index = index;
    _autoRound = vars.autoRound;
    _hasPriority = false;
    _suffixMap = vars.suffixMap || CSSPlugin.suffixMap;
    _cs = _getComputedStyle(target, "");
    _overwriteProps = this._overwriteProps;
    var style = target.style,
        v,
        pt,
        pt2,
        first,
        last,
        next,
        zIndex,
        tpt,
        threeD;
    if (_reqSafariFix) if (style.zIndex === "") {
      v = _getStyle(target, "zIndex", _cs);

      if (v === "auto" || v === "") {
        //corrects a bug in [non-Android] Safari that prevents it from repainting elements in their new positions if they don't have a zIndex set. We also can't just apply this inside _parseTransform() because anything that's moved in any way (like using "left" or "top" instead of transforms like "x" and "y") can be affected, so it is best to ensure that anything that's tweening has a z-index. Setting "WebkitPerspective" to a non-zero value worked too except that on iOS Safari things would flicker randomly. Plus zIndex is less memory-intensive.
        this._addLazySet(style, "zIndex", 0);
      }
    }

    if (typeof vars === "string") {
      first = style.cssText;
      v = _getAllStyles(target, _cs);
      style.cssText = first + ";" + vars;
      v = _cssDif(target, v, _getAllStyles(target)).difs;

      if (!_supportsOpacity && _opacityValExp.test(vars)) {
        v.opacity = parseFloat(RegExp.$1);
      }

      vars = v;
      style.cssText = first;
    }

    if (vars.className) {
      //className tweens will combine any differences they find in the css with the vars that are passed in, so {className:"myClass", scale:0.5, left:20} would work.
      this._firstPT = pt = _specialProps.className.parse(target, vars.className, "className", this, null, null, vars);
    } else {
      this._firstPT = pt = this.parse(target, vars, null);
    }

    if (this._transformType) {
      threeD = this._transformType === 3;

      if (!_transformProp) {
        style.zoom = 1; //helps correct an IE issue.
      } else if (_isSafari) {
        _reqSafariFix = true; //if zIndex isn't set, iOS Safari doesn't repaint things correctly sometimes (seemingly at random).

        if (style.zIndex === "") {
          zIndex = _getStyle(target, "zIndex", _cs);

          if (zIndex === "auto" || zIndex === "") {
            this._addLazySet(style, "zIndex", 0);
          }
        } //Setting WebkitBackfaceVisibility corrects 3 bugs:
        // 1) [non-Android] Safari skips rendering changes to "top" and "left" that are made on the same frame/render as a transform update.
        // 2) iOS Safari sometimes neglects to repaint elements in their new positions. Setting "WebkitPerspective" to a non-zero value worked too except that on iOS Safari things would flicker randomly.
        // 3) Safari sometimes displayed odd artifacts when tweening the transform (or WebkitTransform) property, like ghosts of the edges of the element remained. Definitely a browser bug.
        //Note: we allow the user to override the auto-setting by defining WebkitBackfaceVisibility in the vars of the tween.


        if (_isSafariLT6) {
          this._addLazySet(style, "WebkitBackfaceVisibility", this._vars.WebkitBackfaceVisibility || (threeD ? "visible" : "hidden"));
        }
      }

      pt2 = pt;

      while (pt2 && pt2._next) {
        pt2 = pt2._next;
      }

      tpt = new CSSPropTween(target, "transform", 0, 0, null, 2);

      this._linkCSSP(tpt, null, pt2);

      tpt.setRatio = _transformProp ? _setTransformRatio : _setIETransformRatio;
      tpt.data = this._transform || _getTransform(target, _cs, true);
      tpt.tween = tween;
      tpt.pr = -1; //ensures that the transforms get applied after the components are updated.

      _overwriteProps.pop(); //we don't want to force the overwrite of all "transform" tweens of the target - we only care about individual transform properties like scaleX, rotation, etc. The CSSPropTween constructor automatically adds the property to _overwriteProps which is why we need to pop() here.

    }

    if (_hasPriority) {
      //reorders the linked list in order of pr (priority)
      while (pt) {
        next = pt._next;
        pt2 = first;

        while (pt2 && pt2.pr > pt.pr) {
          pt2 = pt2._next;
        }

        if (pt._prev = pt2 ? pt2._prev : last) {
          pt._prev._next = pt;
        } else {
          first = pt;
        }

        if (pt._next = pt2) {
          pt2._prev = pt;
        } else {
          last = pt;
        }

        pt = next;
      }

      this._firstPT = first;
    }

    return true;
  };

  p.parse = function (target, vars, pt, plugin) {
    var style = target.style,
        p,
        sp,
        bn,
        en,
        bs,
        es,
        bsfx,
        esfx,
        isStr,
        rel;

    for (p in vars) {
      es = vars[p]; //ending value string

      if (typeof es === "function") {
        es = es(_index, _target);
      }

      sp = _specialProps[p]; //SpecialProp lookup.

      if (sp) {
        pt = sp.parse(target, es, p, this, pt, plugin, vars);
      } else if (p.substr(0, 2) === "--") {
        //for tweening CSS variables (which always start with "--"). To maximize performance and simplicity, we bypass CSSPlugin altogether and just add a normal property tween to the tween instance itself.
        this._tween._propLookup[p] = this._addTween.call(this._tween, target.style, "setProperty", _getComputedStyle(target).getPropertyValue(p) + "", es + "", p, false, p);
        continue;
      } else {
        bs = _getStyle(target, p, _cs) + "";
        isStr = typeof es === "string";

        if (p === "color" || p === "fill" || p === "stroke" || p.indexOf("Color") !== -1 || isStr && _rgbhslExp.test(es)) {
          //Opera uses background: to define color sometimes in addition to backgroundColor:
          if (!isStr) {
            es = _parseColor(es);
            es = (es.length > 3 ? "rgba(" : "rgb(") + es.join(",") + ")";
          }

          pt = _parseComplex(style, p, bs, es, true, "transparent", pt, 0, plugin);
        } else if (isStr && _complexExp.test(es)) {
          pt = _parseComplex(style, p, bs, es, true, null, pt, 0, plugin);
        } else {
          bn = parseFloat(bs);
          bsfx = bn || bn === 0 ? bs.substr((bn + "").length) : ""; //remember, bs could be non-numeric like "normal" for fontWeight, so we should default to a blank suffix in that case.

          if (bs === "" || bs === "auto") {
            if (p === "width" || p === "height") {
              bn = _getDimension(target, p, _cs);
              bsfx = "px";
            } else if (p === "left" || p === "top") {
              bn = _calculateOffset(target, p, _cs);
              bsfx = "px";
            } else {
              bn = p !== "opacity" ? 0 : 1;
              bsfx = "";
            }
          }

          rel = isStr && es.charAt(1) === "=";

          if (rel) {
            en = parseInt(es.charAt(0) + "1", 10);
            es = es.substr(2);
            en *= parseFloat(es);
            esfx = es.replace(_suffixExp, "");
          } else {
            en = parseFloat(es);
            esfx = isStr ? es.replace(_suffixExp, "") : "";
          }

          if (esfx === "") {
            esfx = p in _suffixMap ? _suffixMap[p] : bsfx; //populate the end suffix, prioritizing the map, then if none is found, use the beginning suffix.
          }

          es = en || en === 0 ? (rel ? en + bn : en) + esfx : vars[p]; //ensures that any += or -= prefixes are taken care of. Record the end value before normalizing the suffix because we always want to end the tween on exactly what they intended even if it doesn't match the beginning value's suffix.
          //if the beginning/ending suffixes don't match, normalize them...

          if (bsfx !== esfx) if (esfx !== "" || p === "lineHeight") if (en || en === 0) if (bn) {
            //note: if the beginning value (bn) is 0, we don't need to convert units!
            bn = _convertToPixels(target, p, bn, bsfx);

            if (esfx === "%") {
              bn /= _convertToPixels(target, p, 100, "%") / 100;

              if (vars.strictUnits !== true) {
                //some browsers report only "px" values instead of allowing "%" with getComputedStyle(), so we assume that if we're tweening to a %, we should start there too unless strictUnits:true is defined. This approach is particularly useful for responsive designs that use from() tweens.
                bs = bn + "%";
              }
            } else if (esfx === "em" || esfx === "rem" || esfx === "vw" || esfx === "vh") {
              bn /= _convertToPixels(target, p, 1, esfx); //otherwise convert to pixels.
            } else if (esfx !== "px") {
              en = _convertToPixels(target, p, en, esfx);
              esfx = "px"; //we don't use bsfx after this, so we don't need to set it to px too.
            }

            if (rel) if (en || en === 0) {
              es = en + bn + esfx; //the changes we made affect relative calculations, so adjust the end value here.
            }
          }

          if (rel) {
            en += bn;
          }

          if ((bn || bn === 0) && (en || en === 0)) {
            //faster than isNaN(). Also, previously we required en !== bn but that doesn't really gain much performance and it prevents _parseToProxy() from working properly if beginning and ending values match but need to get tweened by an external plugin anyway. For example, a bezier tween where the target starts at left:0 and has these points: [{left:50},{left:0}] wouldn't work properly because when parsing the last point, it'd match the first (current) one and a non-tweening CSSPropTween would be recorded when we actually need a normal tween (type:0) so that things get updated during the tween properly.
            pt = new CSSPropTween(style, p, bn, en - bn, pt, 0, p, _autoRound !== false && (esfx === "px" || p === "zIndex"), 0, bs, es);
            pt.xs0 = esfx; //DEBUG: _log("tween "+p+" from "+pt.b+" ("+bn+esfx+") to "+pt.e+" with suffix: "+pt.xs0);
          } else if (style[p] === undefined || !es && (es + "" === "NaN" || es == null)) {
            _log("invalid " + p + " tween value: " + vars[p]);
          } else {
            pt = new CSSPropTween(style, p, en || bn || 0, 0, pt, -1, p, false, 0, bs, es);
            pt.xs0 = es === "none" && (p === "display" || p.indexOf("Style") !== -1) ? bs : es; //intermediate value should typically be set immediately (end value) except for "display" or things like borderTopStyle, borderBottomStyle, etc. which should use the beginning value during the tween.
            //DEBUG: _log("non-tweening value "+p+": "+pt.xs0);
          }
        }
      }

      if (plugin) if (pt && !pt.plugin) {
        pt.plugin = plugin;
      }
    }

    return pt;
  }; //gets called every time the tween updates, passing the new ratio (typically a value between 0 and 1, but not always (for example, if an Elastic.easeOut is used, the value can jump above 1 mid-tween). It will always start and 0 and end at 1.


  p.setRatio = function (v) {
    var pt = this._firstPT,
        min = 0.000001,
        val,
        str,
        i; //at the end of the tween, we set the values to exactly what we received in order to make sure non-tweening values (like "position" or "float" or whatever) are set and so that if the beginning/ending suffixes (units) didn't match and we normalized to px, the value that the user passed in is used here. We check to see if the tween is at its beginning in case it's a from() tween in which case the ratio will actually go from 1 to 0 over the course of the tween (backwards).

    if (v === 1 && (this._tween._time === this._tween._duration || this._tween._time === 0)) {
      while (pt) {
        if (pt.type !== 2) {
          if (pt.r && pt.type !== -1) {
            val = pt.r(pt.s + pt.c);

            if (!pt.type) {
              pt.t[pt.p] = val + pt.xs0;
            } else if (pt.type === 1) {
              //complex value (one that typically has multiple numbers inside a string, like "rect(5px,10px,20px,25px)"
              i = pt.l;
              str = pt.xs0 + val + pt.xs1;

              for (i = 1; i < pt.l; i++) {
                str += pt["xn" + i] + pt["xs" + (i + 1)];
              }

              pt.t[pt.p] = str;
            }
          } else {
            pt.t[pt.p] = pt.e;
          }
        } else {
          pt.setRatio(v);
        }

        pt = pt._next;
      }
    } else if (v || !(this._tween._time === this._tween._duration || this._tween._time === 0) || this._tween._rawPrevTime === -0.000001) {
      while (pt) {
        val = pt.c * v + pt.s;

        if (pt.r) {
          val = pt.r(val);
        } else if (val < min) if (val > -min) {
          val = 0;
        }

        if (!pt.type) {
          pt.t[pt.p] = val + pt.xs0;
        } else if (pt.type === 1) {
          //complex value (one that typically has multiple numbers inside a string, like "rect(5px,10px,20px,25px)"
          i = pt.l;

          if (i === 2) {
            pt.t[pt.p] = pt.xs0 + val + pt.xs1 + pt.xn1 + pt.xs2;
          } else if (i === 3) {
            pt.t[pt.p] = pt.xs0 + val + pt.xs1 + pt.xn1 + pt.xs2 + pt.xn2 + pt.xs3;
          } else if (i === 4) {
            pt.t[pt.p] = pt.xs0 + val + pt.xs1 + pt.xn1 + pt.xs2 + pt.xn2 + pt.xs3 + pt.xn3 + pt.xs4;
          } else if (i === 5) {
            pt.t[pt.p] = pt.xs0 + val + pt.xs1 + pt.xn1 + pt.xs2 + pt.xn2 + pt.xs3 + pt.xn3 + pt.xs4 + pt.xn4 + pt.xs5;
          } else {
            str = pt.xs0 + val + pt.xs1;

            for (i = 1; i < pt.l; i++) {
              str += pt["xn" + i] + pt["xs" + (i + 1)];
            }

            pt.t[pt.p] = str;
          }
        } else if (pt.type === -1) {
          //non-tweening value
          pt.t[pt.p] = pt.xs0;
        } else if (pt.setRatio) {
          //custom setRatio() for things like SpecialProps, external plugins, etc.
          pt.setRatio(v);
        }

        pt = pt._next;
      } //if the tween is reversed all the way back to the beginning, we need to restore the original values which may have different units (like % instead of px or em or whatever).

    } else {
      while (pt) {
        if (pt.type !== 2) {
          pt.t[pt.p] = pt.b;
        } else {
          pt.setRatio(v);
        }

        pt = pt._next;
      }
    }
  };
  /**
   * @private
   * Forces rendering of the target's transforms (rotation, scale, etc.) whenever the CSSPlugin's setRatio() is called.
   * Basically, this tells the CSSPlugin to create a CSSPropTween (type 2) after instantiation that runs last in the linked
   * list and calls the appropriate (3D or 2D) rendering function. We separate this into its own method so that we can call
   * it from other plugins like BezierPlugin if, for example, it needs to apply an autoRotation and this CSSPlugin
   * doesn't have any transform-related properties of its own. You can call this method as many times as you
   * want and it won't create duplicate CSSPropTweens.
   *
   * @param {boolean} threeD if true, it should apply 3D tweens (otherwise, just 2D ones are fine and typically faster)
   */


  p._enableTransforms = function (threeD) {
    this._transform = this._transform || _getTransform(this._target, _cs, true); //ensures that the element has a _gsTransform property with the appropriate values.

    this._transformType = !(this._transform.svg && _useSVGTransformAttr) && (threeD || this._transformType === 3) ? 3 : 2;
  };

  var lazySet = function (v) {
    this.t[this.p] = this.e;

    this.data._linkCSSP(this, this._next, null, true); //we purposefully keep this._next even though it'd make sense to null it, but this is a performance optimization, as this happens during the while (pt) {} loop in setRatio() at the bottom of which it sets pt = pt._next, so if we null it, the linked list will be broken in that loop.

  };
  /** @private Gives us a way to set a value on the first render (and only the first render). **/


  p._addLazySet = function (t, p, v) {
    var pt = this._firstPT = new CSSPropTween(t, p, 0, 0, this._firstPT, 2);
    pt.e = v;
    pt.setRatio = lazySet;
    pt.data = this;
  };
  /** @private **/


  p._linkCSSP = function (pt, next, prev, remove) {
    if (pt) {
      if (next) {
        next._prev = pt;
      }

      if (pt._next) {
        pt._next._prev = pt._prev;
      }

      if (pt._prev) {
        pt._prev._next = pt._next;
      } else if (this._firstPT === pt) {
        this._firstPT = pt._next;
        remove = true; //just to prevent resetting this._firstPT 5 lines down in case pt._next is null. (optimized for speed)
      }

      if (prev) {
        prev._next = pt;
      } else if (!remove && this._firstPT === null) {
        this._firstPT = pt;
      }

      pt._next = next;
      pt._prev = prev;
    }

    return pt;
  };

  p._mod = function (lookup) {
    var pt = this._firstPT;

    while (pt) {
      if (typeof lookup[pt.p] === "function") {
        //only gets called by RoundPropsPlugin (ModifyPlugin manages all the rendering internally for CSSPlugin properties that need modification). Remember, we handle rounding a bit differently in this plugin for performance reasons, leveraging "r" as an indicator that the value should be rounded internally.
        pt.r = lookup[pt.p];
      }

      pt = pt._next;
    }
  }; //we need to make sure that if alpha or autoAlpha is killed, opacity is too. And autoAlpha affects the "visibility" property.


  p._kill = function (lookup) {
    var copy = lookup,
        pt,
        p,
        xfirst;

    if (lookup.autoAlpha || lookup.alpha) {
      copy = {};

      for (p in lookup) {
        //copy the lookup so that we're not changing the original which may be passed elsewhere.
        copy[p] = lookup[p];
      }

      copy.opacity = 1;

      if (copy.autoAlpha) {
        copy.visibility = 1;
      }
    }

    if (lookup.className && (pt = this._classNamePT)) {
      //for className tweens, we need to kill any associated CSSPropTweens too; a linked list starts at the className's "xfirst".
      xfirst = pt.xfirst;

      if (xfirst && xfirst._prev) {
        this._linkCSSP(xfirst._prev, pt._next, xfirst._prev._prev); //break off the prev

      } else if (xfirst === this._firstPT) {
        this._firstPT = pt._next;
      }

      if (pt._next) {
        this._linkCSSP(pt._next, pt._next._next, xfirst._prev);
      }

      this._classNamePT = null;
    }

    pt = this._firstPT;

    while (pt) {
      if (pt.plugin && pt.plugin !== p && pt.plugin._kill) {
        //for plugins that are registered with CSSPlugin, we should notify them of the kill.
        pt.plugin._kill(lookup);

        p = pt.plugin;
      }

      pt = pt._next;
    }

    return _TweenLite.TweenPlugin.prototype._kill.call(this, copy);
  }; //used by cascadeTo() for gathering all the style properties of each child element into an array for comparison.


  var _getChildStyles = function (e, props, targets) {
    var children, i, child, type;

    if (e.slice) {
      i = e.length;

      while (--i > -1) {
        _getChildStyles(e[i], props, targets);
      }

      return;
    }

    children = e.childNodes;
    i = children.length;

    while (--i > -1) {
      child = children[i];
      type = child.type;

      if (child.style) {
        props.push(_getAllStyles(child));

        if (targets) {
          targets.push(child);
        }
      }

      if ((type === 1 || type === 9 || type === 11) && child.childNodes.length) {
        _getChildStyles(child, props, targets);
      }
    }
  };
  /**
   * Typically only useful for className tweens that may affect child elements, this method creates a TweenLite
   * and then compares the style properties of all the target's child elements at the tween's start and end, and
   * if any are different, it also creates tweens for those and returns an array containing ALL of the resulting
   * tweens (so that you can easily add() them to a TimelineLite, for example). The reason this functionality is
   * wrapped into a separate static method of CSSPlugin instead of being integrated into all regular className tweens
   * is because it creates entirely new tweens that may have completely different targets than the original tween,
   * so if they were all lumped into the original tween instance, it would be inconsistent with the rest of the API
   * and it would create other problems. For example:
   *  - If I create a tween of elementA, that tween instance may suddenly change its target to include 50 other elements (unintuitive if I specifically defined the target I wanted)
   *  - We can't just create new independent tweens because otherwise, what happens if the original/parent tween is reversed or pause or dropped into a TimelineLite for tight control? You'd expect that tween's behavior to affect all the others.
   *  - Analyzing every style property of every child before and after the tween is an expensive operation when there are many children, so this behavior shouldn't be imposed on all className tweens by default, especially since it's probably rare that this extra functionality is needed.
   *
   * @param {Object} target object to be tweened
   * @param {number} Duration in seconds (or frames for frames-based tweens)
   * @param {Object} Object containing the end values, like {className:"newClass", ease:Linear.easeNone}
   * @return {Array} An array of TweenLite instances
   */


  CSSPlugin.cascadeTo = function (target, duration, vars) {
    var tween = _TweenLite.default.to(target, duration, vars),
        results = [tween],
        b = [],
        e = [],
        targets = [],
        _reservedProps = _TweenLite.default._internals.reservedProps,
        i,
        difs,
        p,
        from;

    target = tween._targets || tween.target;

    _getChildStyles(target, b, targets);

    tween.render(duration, true, true);

    _getChildStyles(target, e);

    tween.render(0, true, true);

    tween._enabled(true);

    i = targets.length;

    while (--i > -1) {
      difs = _cssDif(targets[i], b[i], e[i]);

      if (difs.firstMPT) {
        difs = difs.difs;

        for (p in vars) {
          if (_reservedProps[p]) {
            difs[p] = vars[p];
          }
        }

        from = {};

        for (p in difs) {
          from[p] = b[i][p];
        }

        results.push(_TweenLite.default.fromTo(targets[i], duration, from, difs));
      }
    }

    return results;
  };

  _TweenLite.TweenPlugin.activate([CSSPlugin]);

  return CSSPlugin;
}, true);

var CSSPlugin = _TweenLite.globals.CSSPlugin;
exports.default = exports.CSSPlugin = CSSPlugin;
},{"./TweenLite.js":"node_modules/gsap/TweenLite.js"}],"node_modules/gsap/AttrPlugin.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.AttrPlugin = void 0;

var _TweenLite = require("./TweenLite.js");

/*!
 * VERSION: 0.6.1
 * DATE: 2018-08-27
 * UPDATES AND DOCS AT: http://greensock.com
 *
 * @license Copyright (c) 2008-2018, GreenSock. All rights reserved.
 * This work is subject to the terms at http://greensock.com/standard-license or for
 * Club GreenSock members, the software agreement that was issued with your membership.
 * 
 * @author: Jack Doyle, jack@greensock.com
 */
var AttrPlugin = _TweenLite._gsScope._gsDefine.plugin({
  propName: "attr",
  API: 2,
  version: "0.6.1",
  //called when the tween renders for the first time. This is where initial values should be recorded and any setup routines should run.
  init: function (target, value, tween, index) {
    var p, end;

    if (typeof target.setAttribute !== "function") {
      return false;
    }

    for (p in value) {
      end = value[p];

      if (typeof end === "function") {
        end = end(index, target);
      }

      this._addTween(target, "setAttribute", target.getAttribute(p) + "", end + "", p, false, p);

      this._overwriteProps.push(p);
    }

    return true;
  }
});

exports.default = exports.AttrPlugin = AttrPlugin;
},{"./TweenLite.js":"node_modules/gsap/TweenLite.js"}],"node_modules/gsap/RoundPropsPlugin.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.p = exports._roundLinkedList = exports._getRoundFunc = exports.default = exports.RoundPropsPlugin = void 0;

var _TweenLite = require("./TweenLite.js");

/*!
 * VERSION: 1.6.0
 * DATE: 2018-08-27
 * UPDATES AND DOCS AT: http://greensock.com
 *
 * @license Copyright (c) 2008-2018, GreenSock. All rights reserved.
 * This work is subject to the terms at http://greensock.com/standard-license or for
 * Club GreenSock members, the software agreement that was issued with your membership.
 * 
 * @author: Jack Doyle, jack@greensock.com
 **/
var RoundPropsPlugin = _TweenLite._gsScope._gsDefine.plugin({
  propName: "roundProps",
  version: "1.7.0",
  priority: -1,
  API: 2,
  //called when the tween renders for the first time. This is where initial values should be recorded and any setup routines should run.
  init: function (target, value, tween) {
    this._tween = tween;
    return true;
  }
}),
    _getRoundFunc = function (v) {
  //pass in 0.1 get a function that'll round to the nearest tenth, or 5 to round to the closest 5, or 0.001 to the closest 1000th, etc.
  var p = v < 1 ? Math.pow(10, (v + "").length - 2) : 1; //to avoid floating point math errors (like 24 * 0.1 == 2.4000000000000004), we chop off at a specific number of decimal places (much faster than toFixed()

  return function (n) {
    return (Math.round(n / v) * v * p | 0) / p;
  };
},
    _roundLinkedList = function (node, mod) {
  while (node) {
    if (!node.f && !node.blob) {
      node.m = mod || Math.round;
    }

    node = node._next;
  }
},
    p = RoundPropsPlugin.prototype;

exports.p = p;
exports._roundLinkedList = _roundLinkedList;
exports._getRoundFunc = _getRoundFunc;
exports.default = exports.RoundPropsPlugin = RoundPropsPlugin;

p._onInitAllProps = function () {
  var tween = this._tween,
      rp = tween.vars.roundProps,
      lookup = {},
      rpt = tween._propLookup.roundProps,
      pt,
      next,
      i,
      p;

  if (typeof rp === "object" && !rp.push) {
    for (p in rp) {
      lookup[p] = _getRoundFunc(rp[p]);
    }
  } else {
    if (typeof rp === "string") {
      rp = rp.split(",");
    }

    i = rp.length;

    while (--i > -1) {
      lookup[rp[i]] = Math.round;
    }
  }

  for (p in lookup) {
    pt = tween._firstPT;

    while (pt) {
      next = pt._next; //record here, because it may get removed

      if (pt.pg) {
        pt.t._mod(lookup);
      } else if (pt.n === p) {
        if (pt.f === 2 && pt.t) {
          //a blob (text containing multiple numeric values)
          _roundLinkedList(pt.t._firstPT, lookup[p]);
        } else {
          this._add(pt.t, p, pt.s, pt.c, lookup[p]); //remove from linked list


          if (next) {
            next._prev = pt._prev;
          }

          if (pt._prev) {
            pt._prev._next = next;
          } else if (tween._firstPT === pt) {
            tween._firstPT = next;
          }

          pt._next = pt._prev = null;
          tween._propLookup[p] = rpt;
        }
      }

      pt = next;
    }
  }

  return false;
};

p._add = function (target, p, s, c, mod) {
  this._addTween(target, p, s, s + c, p, mod || Math.round);

  this._overwriteProps.push(p);
};
},{"./TweenLite.js":"node_modules/gsap/TweenLite.js"}],"node_modules/gsap/DirectionalRotationPlugin.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.DirectionalRotationPlugin = void 0;

var _TweenLite = require("./TweenLite.js");

/*!
 * VERSION: 0.3.1
 * DATE: 2018-08-27
 * UPDATES AND DOCS AT: http://greensock.com
 *
 * @license Copyright (c) 2008-2018, GreenSock. All rights reserved.
 * This work is subject to the terms at http://greensock.com/standard-license or for
 * Club GreenSock members, the software agreement that was issued with your membership.
 * 
 * @author: Jack Doyle, jack@greensock.com
 **/
var DirectionalRotationPlugin = _TweenLite._gsScope._gsDefine.plugin({
  propName: "directionalRotation",
  version: "0.3.1",
  API: 2,
  //called when the tween renders for the first time. This is where initial values should be recorded and any setup routines should run.
  init: function (target, value, tween, index) {
    if (typeof value !== "object") {
      value = {
        rotation: value
      };
    }

    this.finals = {};
    var cap = value.useRadians === true ? Math.PI * 2 : 360,
        min = 0.000001,
        p,
        v,
        start,
        end,
        dif,
        split;

    for (p in value) {
      if (p !== "useRadians") {
        end = value[p];

        if (typeof end === "function") {
          end = end(index, target);
        }

        split = (end + "").split("_");
        v = split[0];
        start = parseFloat(typeof target[p] !== "function" ? target[p] : target[p.indexOf("set") || typeof target["get" + p.substr(3)] !== "function" ? p : "get" + p.substr(3)]());
        end = this.finals[p] = typeof v === "string" && v.charAt(1) === "=" ? start + parseInt(v.charAt(0) + "1", 10) * Number(v.substr(2)) : Number(v) || 0;
        dif = end - start;

        if (split.length) {
          v = split.join("_");

          if (v.indexOf("short") !== -1) {
            dif = dif % cap;

            if (dif !== dif % (cap / 2)) {
              dif = dif < 0 ? dif + cap : dif - cap;
            }
          }

          if (v.indexOf("_cw") !== -1 && dif < 0) {
            dif = (dif + cap * 9999999999) % cap - (dif / cap | 0) * cap;
          } else if (v.indexOf("ccw") !== -1 && dif > 0) {
            dif = (dif - cap * 9999999999) % cap - (dif / cap | 0) * cap;
          }
        }

        if (dif > min || dif < -min) {
          this._addTween(target, p, start, start + dif, p);

          this._overwriteProps.push(p);
        }
      }
    }

    return true;
  },
  //called each time the values should be updated, and the ratio gets passed as the only parameter (typically it's a value between 0 and 1, but it can exceed those when using an ease like Elastic.easeOut or Back.easeOut, etc.)
  set: function (ratio) {
    var pt;

    if (ratio !== 1) {
      this._super.setRatio.call(this, ratio);
    } else {
      pt = this._firstPT;

      while (pt) {
        if (pt.f) {
          pt.t[pt.p](this.finals[pt.p]);
        } else {
          pt.t[pt.p] = this.finals[pt.p];
        }

        pt = pt._next;
      }
    }
  }
});

exports.default = exports.DirectionalRotationPlugin = DirectionalRotationPlugin;
DirectionalRotationPlugin._autoCSS = true;
},{"./TweenLite.js":"node_modules/gsap/TweenLite.js"}],"node_modules/gsap/TimelineLite.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.TimelineLite = void 0;

var _TweenLite = _interopRequireWildcard(require("./TweenLite.js"));

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

/*!
 * VERSION: 2.0.2
 * DATE: 2018-08-27
 * UPDATES AND DOCS AT: http://greensock.com
 *
 * @license Copyright (c) 2008-2018, GreenSock. All rights reserved.
 * This work is subject to the terms at http://greensock.com/standard-license or for
 * Club GreenSock members, the software agreement that was issued with your membership.
 * 
 * @author: Jack Doyle, jack@greensock.com
 */
_TweenLite._gsScope._gsDefine("TimelineLite", ["core.Animation", "core.SimpleTimeline", "TweenLite"], function () {
  var TimelineLite = function (vars) {
    _TweenLite.SimpleTimeline.call(this, vars);

    this._labels = {};
    this.autoRemoveChildren = this.vars.autoRemoveChildren === true;
    this.smoothChildTiming = this.vars.smoothChildTiming === true;
    this._sortChildren = true;
    this._onUpdate = this.vars.onUpdate;
    var v = this.vars,
        val,
        p;

    for (p in v) {
      val = v[p];
      if (_isArray(val)) if (val.join("").indexOf("{self}") !== -1) {
        v[p] = this._swapSelfInParams(val);
      }
    }

    if (_isArray(v.tweens)) {
      this.add(v.tweens, 0, v.align, v.stagger);
    }
  },
      _tinyNum = 0.0000000001,
      TweenLiteInternals = _TweenLite.default._internals,
      _internals = TimelineLite._internals = {},
      _isSelector = TweenLiteInternals.isSelector,
      _isArray = TweenLiteInternals.isArray,
      _lazyTweens = TweenLiteInternals.lazyTweens,
      _lazyRender = TweenLiteInternals.lazyRender,
      _globals = _TweenLite._gsScope._gsDefine.globals,
      _copy = function (vars) {
    var copy = {},
        p;

    for (p in vars) {
      copy[p] = vars[p];
    }

    return copy;
  },
      _applyCycle = function (vars, targets, i) {
    var alt = vars.cycle,
        p,
        val;

    for (p in alt) {
      val = alt[p];
      vars[p] = typeof val === "function" ? val(i, targets[i]) : val[i % val.length];
    }

    delete vars.cycle;
  },
      _pauseCallback = _internals.pauseCallback = function () {},
      _slice = function (a) {
    //don't use [].slice because that doesn't work in IE8 with a NodeList that's returned by querySelectorAll()
    var b = [],
        l = a.length,
        i;

    for (i = 0; i !== l; b.push(a[i++]));

    return b;
  },
      p = TimelineLite.prototype = new _TweenLite.SimpleTimeline();

  TimelineLite.version = "2.0.2";
  p.constructor = TimelineLite;
  p.kill()._gc = p._forcingPlayhead = p._hasPause = false;
  /* might use later...
  //translates a local time inside an animation to the corresponding time on the root/global timeline, factoring in all nesting and timeScales.
  function localToGlobal(time, animation) {
  	while (animation) {
  		time = (time / animation._timeScale) + animation._startTime;
  		animation = animation.timeline;
  	}
  	return time;
  }
  	//translates the supplied time on the root/global timeline into the corresponding local time inside a particular animation, factoring in all nesting and timeScales
  function globalToLocal(time, animation) {
  	var scale = 1;
  	time -= localToGlobal(0, animation);
  	while (animation) {
  		scale *= animation._timeScale;
  		animation = animation.timeline;
  	}
  	return time * scale;
  }
  */

  p.to = function (target, duration, vars, position) {
    var Engine = vars.repeat && _globals.TweenMax || _TweenLite.default;
    return duration ? this.add(new Engine(target, duration, vars), position) : this.set(target, vars, position);
  };

  p.from = function (target, duration, vars, position) {
    return this.add((vars.repeat && _globals.TweenMax || _TweenLite.default).from(target, duration, vars), position);
  };

  p.fromTo = function (target, duration, fromVars, toVars, position) {
    var Engine = toVars.repeat && _globals.TweenMax || _TweenLite.default;
    return duration ? this.add(Engine.fromTo(target, duration, fromVars, toVars), position) : this.set(target, toVars, position);
  };

  p.staggerTo = function (targets, duration, vars, stagger, position, onCompleteAll, onCompleteAllParams, onCompleteAllScope) {
    var tl = new TimelineLite({
      onComplete: onCompleteAll,
      onCompleteParams: onCompleteAllParams,
      callbackScope: onCompleteAllScope,
      smoothChildTiming: this.smoothChildTiming
    }),
        cycle = vars.cycle,
        copy,
        i;

    if (typeof targets === "string") {
      targets = _TweenLite.default.selector(targets) || targets;
    }

    targets = targets || [];

    if (_isSelector(targets)) {
      //senses if the targets object is a selector. If it is, we should translate it into an array.
      targets = _slice(targets);
    }

    stagger = stagger || 0;

    if (stagger < 0) {
      targets = _slice(targets);
      targets.reverse();
      stagger *= -1;
    }

    for (i = 0; i < targets.length; i++) {
      copy = _copy(vars);

      if (copy.startAt) {
        copy.startAt = _copy(copy.startAt);

        if (copy.startAt.cycle) {
          _applyCycle(copy.startAt, targets, i);
        }
      }

      if (cycle) {
        _applyCycle(copy, targets, i);

        if (copy.duration != null) {
          duration = copy.duration;
          delete copy.duration;
        }
      }

      tl.to(targets[i], duration, copy, i * stagger);
    }

    return this.add(tl, position);
  };

  p.staggerFrom = function (targets, duration, vars, stagger, position, onCompleteAll, onCompleteAllParams, onCompleteAllScope) {
    vars.immediateRender = vars.immediateRender != false;
    vars.runBackwards = true;
    return this.staggerTo(targets, duration, vars, stagger, position, onCompleteAll, onCompleteAllParams, onCompleteAllScope);
  };

  p.staggerFromTo = function (targets, duration, fromVars, toVars, stagger, position, onCompleteAll, onCompleteAllParams, onCompleteAllScope) {
    toVars.startAt = fromVars;
    toVars.immediateRender = toVars.immediateRender != false && fromVars.immediateRender != false;
    return this.staggerTo(targets, duration, toVars, stagger, position, onCompleteAll, onCompleteAllParams, onCompleteAllScope);
  };

  p.call = function (callback, params, scope, position) {
    return this.add(_TweenLite.default.delayedCall(0, callback, params, scope), position);
  };

  p.set = function (target, vars, position) {
    position = this._parseTimeOrLabel(position, 0, true);

    if (vars.immediateRender == null) {
      vars.immediateRender = position === this._time && !this._paused;
    }

    return this.add(new _TweenLite.default(target, 0, vars), position);
  };

  TimelineLite.exportRoot = function (vars, ignoreDelayedCalls) {
    vars = vars || {};

    if (vars.smoothChildTiming == null) {
      vars.smoothChildTiming = true;
    }

    var tl = new TimelineLite(vars),
        root = tl._timeline,
        hasNegativeStart,
        time,
        tween,
        next;

    if (ignoreDelayedCalls == null) {
      ignoreDelayedCalls = true;
    }

    root._remove(tl, true);

    tl._startTime = 0;
    tl._rawPrevTime = tl._time = tl._totalTime = root._time;
    tween = root._first;

    while (tween) {
      next = tween._next;

      if (!ignoreDelayedCalls || !(tween instanceof _TweenLite.default && tween.target === tween.vars.onComplete)) {
        time = tween._startTime - tween._delay;

        if (time < 0) {
          hasNegativeStart = 1;
        }

        tl.add(tween, time);
      }

      tween = next;
    }

    root.add(tl, 0);

    if (hasNegativeStart) {
      //calling totalDuration() will force the adjustment necessary to shift the children forward so none of them start before zero, and moves the timeline backwards the same amount, so the playhead is still aligned where it should be globally, but the timeline doesn't have illegal children that start before zero.
      tl.totalDuration();
    }

    return tl;
  };

  p.add = function (value, position, align, stagger) {
    var curTime, l, i, child, tl, beforeRawTime;

    if (typeof position !== "number") {
      position = this._parseTimeOrLabel(position, 0, true, value);
    }

    if (!(value instanceof _TweenLite.Animation)) {
      if (value instanceof Array || value && value.push && _isArray(value)) {
        align = align || "normal";
        stagger = stagger || 0;
        curTime = position;
        l = value.length;

        for (i = 0; i < l; i++) {
          if (_isArray(child = value[i])) {
            child = new TimelineLite({
              tweens: child
            });
          }

          this.add(child, curTime);

          if (typeof child !== "string" && typeof child !== "function") {
            if (align === "sequence") {
              curTime = child._startTime + child.totalDuration() / child._timeScale;
            } else if (align === "start") {
              child._startTime -= child.delay();
            }
          }

          curTime += stagger;
        }

        return this._uncache(true);
      } else if (typeof value === "string") {
        return this.addLabel(value, position);
      } else if (typeof value === "function") {
        value = _TweenLite.default.delayedCall(0, value);
      } else {
        throw "Cannot add " + value + " into the timeline; it is not a tween, timeline, function, or string.";
      }
    }

    _TweenLite.SimpleTimeline.prototype.add.call(this, value, position);

    if (value._time) {
      //in case, for example, the _startTime is moved on a tween that has already rendered. Imagine it's at its end state, then the startTime is moved WAY later (after the end of this timeline), it should render at its beginning.
      curTime = Math.max(0, Math.min(value.totalDuration(), (this.rawTime() - value._startTime) * value._timeScale));

      if (Math.abs(curTime - value._totalTime) > 0.00001) {
        //if an onComplete restarts the tween in a nested timeline, for example, there could be an endless loop without this logic (v2.0.2), like var masterTL = new TimelineMax({autoRemoveChildren: true}), tl = new TimelineMax(); tl.eventCallback("onComplete", function() { tl.restart() } );tl.fromTo('div', 1.1, { rotation: 0 }, { rotation: 360 }, 0);masterTL.add(tl);
        value.render(curTime, false, false);
      }
    } //if the timeline has already ended but the inserted tween/timeline extends the duration, we should enable this timeline again so that it renders properly. We should also align the playhead with the parent timeline's when appropriate.


    if (this._gc || this._time === this._duration) if (!this._paused) if (this._duration < this.duration()) {
      //in case any of the ancestors had completed but should now be enabled...
      tl = this;
      beforeRawTime = tl.rawTime() > value._startTime; //if the tween is placed on the timeline so that it starts BEFORE the current rawTime, we should align the playhead (move the timeline). This is because sometimes users will create a timeline, let it finish, and much later append a tween and expect it to run instead of jumping to its end state. While technically one could argue that it should jump to its end state, that's not what users intuitively expect.

      while (tl._timeline) {
        if (beforeRawTime && tl._timeline.smoothChildTiming) {
          tl.totalTime(tl._totalTime, true); //moves the timeline (shifts its startTime) if necessary, and also enables it.
        } else if (tl._gc) {
          tl._enabled(true, false);
        }

        tl = tl._timeline;
      }
    }
    return this;
  };

  p.remove = function (value) {
    if (value instanceof _TweenLite.Animation) {
      this._remove(value, false);

      var tl = value._timeline = value.vars.useFrames ? _TweenLite.Animation._rootFramesTimeline : _TweenLite.Animation._rootTimeline; //now that it's removed, default it to the root timeline so that if it gets played again, it doesn't jump back into this timeline.

      value._startTime = (value._paused ? value._pauseTime : tl._time) - (!value._reversed ? value._totalTime : value.totalDuration() - value._totalTime) / value._timeScale; //ensure that if it gets played again, the timing is correct.

      return this;
    } else if (value instanceof Array || value && value.push && _isArray(value)) {
      var i = value.length;

      while (--i > -1) {
        this.remove(value[i]);
      }

      return this;
    } else if (typeof value === "string") {
      return this.removeLabel(value);
    }

    return this.kill(null, value);
  };

  p._remove = function (tween, skipDisable) {
    _TweenLite.SimpleTimeline.prototype._remove.call(this, tween, skipDisable);

    var last = this._last;

    if (!last) {
      this._time = this._totalTime = this._duration = this._totalDuration = 0;
    } else if (this._time > this.duration()) {
      this._time = this._duration;
      this._totalTime = this._totalDuration;
    }

    return this;
  };

  p.append = function (value, offsetOrLabel) {
    return this.add(value, this._parseTimeOrLabel(null, offsetOrLabel, true, value));
  };

  p.insert = p.insertMultiple = function (value, position, align, stagger) {
    return this.add(value, position || 0, align, stagger);
  };

  p.appendMultiple = function (tweens, offsetOrLabel, align, stagger) {
    return this.add(tweens, this._parseTimeOrLabel(null, offsetOrLabel, true, tweens), align, stagger);
  };

  p.addLabel = function (label, position) {
    this._labels[label] = this._parseTimeOrLabel(position);
    return this;
  };

  p.addPause = function (position, callback, params, scope) {
    var t = _TweenLite.default.delayedCall(0, _pauseCallback, params, scope || this);

    t.vars.onComplete = t.vars.onReverseComplete = callback;
    t.data = "isPause";
    this._hasPause = true;
    return this.add(t, position);
  };

  p.removeLabel = function (label) {
    delete this._labels[label];
    return this;
  };

  p.getLabelTime = function (label) {
    return this._labels[label] != null ? this._labels[label] : -1;
  };

  p._parseTimeOrLabel = function (timeOrLabel, offsetOrLabel, appendIfAbsent, ignore) {
    var clippedDuration, i; //if we're about to add a tween/timeline (or an array of them) that's already a child of this timeline, we should remove it first so that it doesn't contaminate the duration().

    if (ignore instanceof _TweenLite.Animation && ignore.timeline === this) {
      this.remove(ignore);
    } else if (ignore && (ignore instanceof Array || ignore.push && _isArray(ignore))) {
      i = ignore.length;

      while (--i > -1) {
        if (ignore[i] instanceof _TweenLite.Animation && ignore[i].timeline === this) {
          this.remove(ignore[i]);
        }
      }
    }

    clippedDuration = typeof timeOrLabel === "number" && !offsetOrLabel ? 0 : this.duration() > 99999999999 ? this.recent().endTime(false) : this._duration; //in case there's a child that infinitely repeats, users almost never intend for the insertion point of a new child to be based on a SUPER long value like that so we clip it and assume the most recently-added child's endTime should be used instead.

    if (typeof offsetOrLabel === "string") {
      return this._parseTimeOrLabel(offsetOrLabel, appendIfAbsent && typeof timeOrLabel === "number" && this._labels[offsetOrLabel] == null ? timeOrLabel - clippedDuration : 0, appendIfAbsent);
    }

    offsetOrLabel = offsetOrLabel || 0;

    if (typeof timeOrLabel === "string" && (isNaN(timeOrLabel) || this._labels[timeOrLabel] != null)) {
      //if the string is a number like "1", check to see if there's a label with that name, otherwise interpret it as a number (absolute value).
      i = timeOrLabel.indexOf("=");

      if (i === -1) {
        if (this._labels[timeOrLabel] == null) {
          return appendIfAbsent ? this._labels[timeOrLabel] = clippedDuration + offsetOrLabel : offsetOrLabel;
        }

        return this._labels[timeOrLabel] + offsetOrLabel;
      }

      offsetOrLabel = parseInt(timeOrLabel.charAt(i - 1) + "1", 10) * Number(timeOrLabel.substr(i + 1));
      timeOrLabel = i > 1 ? this._parseTimeOrLabel(timeOrLabel.substr(0, i - 1), 0, appendIfAbsent) : clippedDuration;
    } else if (timeOrLabel == null) {
      timeOrLabel = clippedDuration;
    }

    return Number(timeOrLabel) + offsetOrLabel;
  };

  p.seek = function (position, suppressEvents) {
    return this.totalTime(typeof position === "number" ? position : this._parseTimeOrLabel(position), suppressEvents !== false);
  };

  p.stop = function () {
    return this.paused(true);
  };

  p.gotoAndPlay = function (position, suppressEvents) {
    return this.play(position, suppressEvents);
  };

  p.gotoAndStop = function (position, suppressEvents) {
    return this.pause(position, suppressEvents);
  };

  p.render = function (time, suppressEvents, force) {
    if (this._gc) {
      this._enabled(true, false);
    }

    var prevTime = this._time,
        totalDur = !this._dirty ? this._totalDuration : this.totalDuration(),
        prevStart = this._startTime,
        prevTimeScale = this._timeScale,
        prevPaused = this._paused,
        tween,
        isComplete,
        next,
        callback,
        internalForce,
        pauseTween,
        curTime;

    if (prevTime !== this._time) {
      //if totalDuration() finds a child with a negative startTime and smoothChildTiming is true, things get shifted around internally so we need to adjust the time accordingly. For example, if a tween starts at -30 we must shift EVERYTHING forward 30 seconds and move this timeline's startTime backward by 30 seconds so that things align with the playhead (no jump).
      time += this._time - prevTime;
    }

    if (time >= totalDur - 0.0000001 && time >= 0) {
      //to work around occasional floating point math artifacts.
      this._totalTime = this._time = totalDur;
      if (!this._reversed) if (!this._hasPausedChild()) {
        isComplete = true;
        callback = "onComplete";
        internalForce = !!this._timeline.autoRemoveChildren; //otherwise, if the animation is unpaused/activated after it's already finished, it doesn't get removed from the parent timeline.

        if (this._duration === 0) if (time <= 0 && time >= -0.0000001 || this._rawPrevTime < 0 || this._rawPrevTime === _tinyNum) if (this._rawPrevTime !== time && this._first) {
          internalForce = true;

          if (this._rawPrevTime > _tinyNum) {
            callback = "onReverseComplete";
          }
        }
      }
      this._rawPrevTime = this._duration || !suppressEvents || time || this._rawPrevTime === time ? time : _tinyNum; //when the playhead arrives at EXACTLY time 0 (right on top) of a zero-duration timeline or tween, we need to discern if events are suppressed so that when the playhead moves again (next time), it'll trigger the callback. If events are NOT suppressed, obviously the callback would be triggered in this render. Basically, the callback should fire either when the playhead ARRIVES or LEAVES this exact spot, not both. Imagine doing a timeline.seek(0) and there's a callback that sits at 0. Since events are suppressed on that seek() by default, nothing will fire, but when the playhead moves off of that position, the callback should fire. This behavior is what people intuitively expect. We set the _rawPrevTime to be a precise tiny number to indicate this scenario rather than using another property/variable which would increase memory usage. This technique is less readable, but more efficient.

      time = totalDur + 0.0001; //to avoid occasional floating point rounding errors - sometimes child tweens/timelines were not being fully completed (their progress might be 0.999999999999998 instead of 1 because when _time - tween._startTime is performed, floating point errors would return a value that was SLIGHTLY off). Try (999999999999.7 - 999999999999) * 1 = 0.699951171875 instead of 0.7.
    } else if (time < 0.0000001) {
      //to work around occasional floating point math artifacts, round super small values to 0.
      this._totalTime = this._time = 0;

      if (prevTime !== 0 || this._duration === 0 && this._rawPrevTime !== _tinyNum && (this._rawPrevTime > 0 || time < 0 && this._rawPrevTime >= 0)) {
        callback = "onReverseComplete";
        isComplete = this._reversed;
      }

      if (time < 0) {
        this._active = false;

        if (this._timeline.autoRemoveChildren && this._reversed) {
          //ensures proper GC if a timeline is resumed after it's finished reversing.
          internalForce = isComplete = true;
          callback = "onReverseComplete";
        } else if (this._rawPrevTime >= 0 && this._first) {
          //when going back beyond the start, force a render so that zero-duration tweens that sit at the very beginning render their start values properly. Otherwise, if the parent timeline's playhead lands exactly at this timeline's startTime, and then moves backwards, the zero-duration tweens at the beginning would still be at their end state.
          internalForce = true;
        }

        this._rawPrevTime = time;
      } else {
        this._rawPrevTime = this._duration || !suppressEvents || time || this._rawPrevTime === time ? time : _tinyNum; //when the playhead arrives at EXACTLY time 0 (right on top) of a zero-duration timeline or tween, we need to discern if events are suppressed so that when the playhead moves again (next time), it'll trigger the callback. If events are NOT suppressed, obviously the callback would be triggered in this render. Basically, the callback should fire either when the playhead ARRIVES or LEAVES this exact spot, not both. Imagine doing a timeline.seek(0) and there's a callback that sits at 0. Since events are suppressed on that seek() by default, nothing will fire, but when the playhead moves off of that position, the callback should fire. This behavior is what people intuitively expect. We set the _rawPrevTime to be a precise tiny number to indicate this scenario rather than using another property/variable which would increase memory usage. This technique is less readable, but more efficient.

        if (time === 0 && isComplete) {
          //if there's a zero-duration tween at the very beginning of a timeline and the playhead lands EXACTLY at time 0, that tween will correctly render its end values, but we need to keep the timeline alive for one more render so that the beginning values render properly as the parent's playhead keeps moving beyond the begining. Imagine obj.x starts at 0 and then we do tl.set(obj, {x:100}).to(obj, 1, {x:200}) and then later we tl.reverse()...the goal is to have obj.x revert to 0. If the playhead happens to land on exactly 0, without this chunk of code, it'd complete the timeline and remove it from the rendering queue (not good).
          tween = this._first;

          while (tween && tween._startTime === 0) {
            if (!tween._duration) {
              isComplete = false;
            }

            tween = tween._next;
          }
        }

        time = 0; //to avoid occasional floating point rounding errors (could cause problems especially with zero-duration tweens at the very beginning of the timeline)

        if (!this._initted) {
          internalForce = true;
        }
      }
    } else {
      if (this._hasPause && !this._forcingPlayhead && !suppressEvents) {
        if (time >= prevTime) {
          tween = this._first;

          while (tween && tween._startTime <= time && !pauseTween) {
            if (!tween._duration) if (tween.data === "isPause" && !tween.ratio && !(tween._startTime === 0 && this._rawPrevTime === 0)) {
              pauseTween = tween;
            }
            tween = tween._next;
          }
        } else {
          tween = this._last;

          while (tween && tween._startTime >= time && !pauseTween) {
            if (!tween._duration) if (tween.data === "isPause" && tween._rawPrevTime > 0) {
              pauseTween = tween;
            }
            tween = tween._prev;
          }
        }

        if (pauseTween) {
          this._time = time = pauseTween._startTime;
          this._totalTime = time + this._cycle * (this._totalDuration + this._repeatDelay);
        }
      }

      this._totalTime = this._time = this._rawPrevTime = time;
    }

    if ((this._time === prevTime || !this._first) && !force && !internalForce && !pauseTween) {
      return;
    } else if (!this._initted) {
      this._initted = true;
    }

    if (!this._active) if (!this._paused && this._time !== prevTime && time > 0) {
      this._active = true; //so that if the user renders the timeline (as opposed to the parent timeline rendering it), it is forced to re-render and align it with the proper time/frame on the next rendering cycle. Maybe the timeline already finished but the user manually re-renders it as halfway done, for example.
    }
    if (prevTime === 0) if (this.vars.onStart) if (this._time !== 0 || !this._duration) if (!suppressEvents) {
      this._callback("onStart");
    }
    curTime = this._time;

    if (curTime >= prevTime) {
      tween = this._first;

      while (tween) {
        next = tween._next; //record it here because the value could change after rendering...

        if (curTime !== this._time || this._paused && !prevPaused) {
          //in case a tween pauses or seeks the timeline when rendering, like inside of an onUpdate/onComplete
          break;
        } else if (tween._active || tween._startTime <= curTime && !tween._paused && !tween._gc) {
          if (pauseTween === tween) {
            this.pause();
          }

          if (!tween._reversed) {
            tween.render((time - tween._startTime) * tween._timeScale, suppressEvents, force);
          } else {
            tween.render((!tween._dirty ? tween._totalDuration : tween.totalDuration()) - (time - tween._startTime) * tween._timeScale, suppressEvents, force);
          }
        }

        tween = next;
      }
    } else {
      tween = this._last;

      while (tween) {
        next = tween._prev; //record it here because the value could change after rendering...

        if (curTime !== this._time || this._paused && !prevPaused) {
          //in case a tween pauses or seeks the timeline when rendering, like inside of an onUpdate/onComplete
          break;
        } else if (tween._active || tween._startTime <= prevTime && !tween._paused && !tween._gc) {
          if (pauseTween === tween) {
            pauseTween = tween._prev; //the linked list is organized by _startTime, thus it's possible that a tween could start BEFORE the pause and end after it, in which case it would be positioned before the pause tween in the linked list, but we should render it before we pause() the timeline and cease rendering. This is only a concern when going in reverse.

            while (pauseTween && pauseTween.endTime() > this._time) {
              pauseTween.render(pauseTween._reversed ? pauseTween.totalDuration() - (time - pauseTween._startTime) * pauseTween._timeScale : (time - pauseTween._startTime) * pauseTween._timeScale, suppressEvents, force);
              pauseTween = pauseTween._prev;
            }

            pauseTween = null;
            this.pause();
          }

          if (!tween._reversed) {
            tween.render((time - tween._startTime) * tween._timeScale, suppressEvents, force);
          } else {
            tween.render((!tween._dirty ? tween._totalDuration : tween.totalDuration()) - (time - tween._startTime) * tween._timeScale, suppressEvents, force);
          }
        }

        tween = next;
      }
    }

    if (this._onUpdate) if (!suppressEvents) {
      if (_lazyTweens.length) {
        //in case rendering caused any tweens to lazy-init, we should render them because typically when a timeline finishes, users expect things to have rendered fully. Imagine an onUpdate on a timeline that reports/checks tweened values.
        _lazyRender();
      }

      this._callback("onUpdate");
    }
    if (callback) if (!this._gc) if (prevStart === this._startTime || prevTimeScale !== this._timeScale) if (this._time === 0 || totalDur >= this.totalDuration()) {
      //if one of the tweens that was rendered altered this timeline's startTime (like if an onComplete reversed the timeline), it probably isn't complete. If it is, don't worry, because whatever call altered the startTime would complete if it was necessary at the new time. The only exception is the timeScale property. Also check _gc because there's a chance that kill() could be called in an onUpdate
      if (isComplete) {
        if (_lazyTweens.length) {
          //in case rendering caused any tweens to lazy-init, we should render them because typically when a timeline finishes, users expect things to have rendered fully. Imagine an onComplete on a timeline that reports/checks tweened values.
          _lazyRender();
        }

        if (this._timeline.autoRemoveChildren) {
          this._enabled(false, false);
        }

        this._active = false;
      }

      if (!suppressEvents && this.vars[callback]) {
        this._callback(callback);
      }
    }
  };

  p._hasPausedChild = function () {
    var tween = this._first;

    while (tween) {
      if (tween._paused || tween instanceof TimelineLite && tween._hasPausedChild()) {
        return true;
      }

      tween = tween._next;
    }

    return false;
  };

  p.getChildren = function (nested, tweens, timelines, ignoreBeforeTime) {
    ignoreBeforeTime = ignoreBeforeTime || -9999999999;
    var a = [],
        tween = this._first,
        cnt = 0;

    while (tween) {
      if (tween._startTime < ignoreBeforeTime) {//do nothing
      } else if (tween instanceof _TweenLite.default) {
        if (tweens !== false) {
          a[cnt++] = tween;
        }
      } else {
        if (timelines !== false) {
          a[cnt++] = tween;
        }

        if (nested !== false) {
          a = a.concat(tween.getChildren(true, tweens, timelines));
          cnt = a.length;
        }
      }

      tween = tween._next;
    }

    return a;
  };

  p.getTweensOf = function (target, nested) {
    var disabled = this._gc,
        a = [],
        cnt = 0,
        tweens,
        i;

    if (disabled) {
      this._enabled(true, true); //getTweensOf() filters out disabled tweens, and we have to mark them as _gc = true when the timeline completes in order to allow clean garbage collection, so temporarily re-enable the timeline here.

    }

    tweens = _TweenLite.default.getTweensOf(target);
    i = tweens.length;

    while (--i > -1) {
      if (tweens[i].timeline === this || nested && this._contains(tweens[i])) {
        a[cnt++] = tweens[i];
      }
    }

    if (disabled) {
      this._enabled(false, true);
    }

    return a;
  };

  p.recent = function () {
    return this._recent;
  };

  p._contains = function (tween) {
    var tl = tween.timeline;

    while (tl) {
      if (tl === this) {
        return true;
      }

      tl = tl.timeline;
    }

    return false;
  };

  p.shiftChildren = function (amount, adjustLabels, ignoreBeforeTime) {
    ignoreBeforeTime = ignoreBeforeTime || 0;
    var tween = this._first,
        labels = this._labels,
        p;

    while (tween) {
      if (tween._startTime >= ignoreBeforeTime) {
        tween._startTime += amount;
      }

      tween = tween._next;
    }

    if (adjustLabels) {
      for (p in labels) {
        if (labels[p] >= ignoreBeforeTime) {
          labels[p] += amount;
        }
      }
    }

    return this._uncache(true);
  };

  p._kill = function (vars, target) {
    if (!vars && !target) {
      return this._enabled(false, false);
    }

    var tweens = !target ? this.getChildren(true, true, false) : this.getTweensOf(target),
        i = tweens.length,
        changed = false;

    while (--i > -1) {
      if (tweens[i]._kill(vars, target)) {
        changed = true;
      }
    }

    return changed;
  };

  p.clear = function (labels) {
    var tweens = this.getChildren(false, true, true),
        i = tweens.length;
    this._time = this._totalTime = 0;

    while (--i > -1) {
      tweens[i]._enabled(false, false);
    }

    if (labels !== false) {
      this._labels = {};
    }

    return this._uncache(true);
  };

  p.invalidate = function () {
    var tween = this._first;

    while (tween) {
      tween.invalidate();
      tween = tween._next;
    }

    return _TweenLite.Animation.prototype.invalidate.call(this);
    ;
  };

  p._enabled = function (enabled, ignoreTimeline) {
    if (enabled === this._gc) {
      var tween = this._first;

      while (tween) {
        tween._enabled(enabled, true);

        tween = tween._next;
      }
    }

    return _TweenLite.SimpleTimeline.prototype._enabled.call(this, enabled, ignoreTimeline);
  };

  p.totalTime = function (time, suppressEvents, uncapped) {
    this._forcingPlayhead = true;

    var val = _TweenLite.Animation.prototype.totalTime.apply(this, arguments);

    this._forcingPlayhead = false;
    return val;
  };

  p.duration = function (value) {
    if (!arguments.length) {
      if (this._dirty) {
        this.totalDuration(); //just triggers recalculation
      }

      return this._duration;
    }

    if (this.duration() !== 0 && value !== 0) {
      this.timeScale(this._duration / value);
    }

    return this;
  };

  p.totalDuration = function (value) {
    if (!arguments.length) {
      if (this._dirty) {
        var max = 0,
            tween = this._last,
            prevStart = 999999999999,
            prev,
            end;

        while (tween) {
          prev = tween._prev; //record it here in case the tween changes position in the sequence...

          if (tween._dirty) {
            tween.totalDuration(); //could change the tween._startTime, so make sure the tween's cache is clean before analyzing it.
          }

          if (tween._startTime > prevStart && this._sortChildren && !tween._paused && !this._calculatingDuration) {
            //in case one of the tweens shifted out of order, it needs to be re-inserted into the correct position in the sequence
            this._calculatingDuration = 1; //prevent endless recursive calls - there are methods that get triggered that check duration/totalDuration when we add(), like _parseTimeOrLabel().

            this.add(tween, tween._startTime - tween._delay);
            this._calculatingDuration = 0;
          } else {
            prevStart = tween._startTime;
          }

          if (tween._startTime < 0 && !tween._paused) {
            //children aren't allowed to have negative startTimes unless smoothChildTiming is true, so adjust here if one is found.
            max -= tween._startTime;

            if (this._timeline.smoothChildTiming) {
              this._startTime += tween._startTime / this._timeScale;
              this._time -= tween._startTime;
              this._totalTime -= tween._startTime;
              this._rawPrevTime -= tween._startTime;
            }

            this.shiftChildren(-tween._startTime, false, -9999999999);
            prevStart = 0;
          }

          end = tween._startTime + tween._totalDuration / tween._timeScale;

          if (end > max) {
            max = end;
          }

          tween = prev;
        }

        this._duration = this._totalDuration = max;
        this._dirty = false;
      }

      return this._totalDuration;
    }

    return value && this.totalDuration() ? this.timeScale(this._totalDuration / value) : this;
  };

  p.paused = function (value) {
    if (!value) {
      //if there's a pause directly at the spot from where we're unpausing, skip it.
      var tween = this._first,
          time = this._time;

      while (tween) {
        if (tween._startTime === time && tween.data === "isPause") {
          tween._rawPrevTime = 0; //remember, _rawPrevTime is how zero-duration tweens/callbacks sense directionality and determine whether or not to fire. If _rawPrevTime is the same as _startTime on the next render, it won't fire.
        }

        tween = tween._next;
      }
    }

    return _TweenLite.Animation.prototype.paused.apply(this, arguments);
  };

  p.usesFrames = function () {
    var tl = this._timeline;

    while (tl._timeline) {
      tl = tl._timeline;
    }

    return tl === _TweenLite.Animation._rootFramesTimeline;
  };

  p.rawTime = function (wrapRepeats) {
    return wrapRepeats && (this._paused || this._repeat && this.time() > 0 && this.totalProgress() < 1) ? this._totalTime % (this._duration + this._repeatDelay) : this._paused ? this._totalTime : (this._timeline.rawTime(wrapRepeats) - this._startTime) * this._timeScale;
  };

  return TimelineLite;
}, true);

var TimelineLite = _TweenLite.globals.TimelineLite;
exports.default = exports.TimelineLite = TimelineLite;
},{"./TweenLite.js":"node_modules/gsap/TweenLite.js"}],"node_modules/gsap/TimelineMax.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
Object.defineProperty(exports, "TimelineLite", {
  enumerable: true,
  get: function () {
    return _TimelineLite.default;
  }
});
exports.default = exports.TimelineMax = void 0;

var _TweenLite = _interopRequireWildcard(require("./TweenLite.js"));

var _TimelineLite = _interopRequireDefault(require("./TimelineLite.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

/*!
 * VERSION: 2.0.2
 * DATE: 2018-08-27
 * UPDATES AND DOCS AT: http://greensock.com
 *
 * @license Copyright (c) 2008-2018, GreenSock. All rights reserved.
 * This work is subject to the terms at http://greensock.com/standard-license or for
 * Club GreenSock members, the software agreement that was issued with your membership.
 * 
 * @author: Jack Doyle, jack@greensock.com
 */
_TweenLite._gsScope._gsDefine("TimelineMax", ["TimelineLite", "TweenLite", "easing.Ease"], function () {
  var TimelineMax = function (vars) {
    _TimelineLite.default.call(this, vars);

    this._repeat = this.vars.repeat || 0;
    this._repeatDelay = this.vars.repeatDelay || 0;
    this._cycle = 0;
    this._yoyo = this.vars.yoyo === true;
    this._dirty = true;
  },
      _tinyNum = 0.0000000001,
      TweenLiteInternals = _TweenLite.default._internals,
      _lazyTweens = TweenLiteInternals.lazyTweens,
      _lazyRender = TweenLiteInternals.lazyRender,
      _globals = _TweenLite._gsScope._gsDefine.globals,
      _easeNone = new _TweenLite.Ease(null, null, 1, 0),
      p = TimelineMax.prototype = new _TimelineLite.default();

  p.constructor = TimelineMax;
  p.kill()._gc = false;
  TimelineMax.version = "2.0.2";

  p.invalidate = function () {
    this._yoyo = this.vars.yoyo === true;
    this._repeat = this.vars.repeat || 0;
    this._repeatDelay = this.vars.repeatDelay || 0;

    this._uncache(true);

    return _TimelineLite.default.prototype.invalidate.call(this);
  };

  p.addCallback = function (callback, position, params, scope) {
    return this.add(_TweenLite.default.delayedCall(0, callback, params, scope), position);
  };

  p.removeCallback = function (callback, position) {
    if (callback) {
      if (position == null) {
        this._kill(null, callback);
      } else {
        var a = this.getTweensOf(callback, false),
            i = a.length,
            time = this._parseTimeOrLabel(position);

        while (--i > -1) {
          if (a[i]._startTime === time) {
            a[i]._enabled(false, false);
          }
        }
      }
    }

    return this;
  };

  p.removePause = function (position) {
    return this.removeCallback(_TimelineLite.default._internals.pauseCallback, position);
  };

  p.tweenTo = function (position, vars) {
    vars = vars || {};
    var copy = {
      ease: _easeNone,
      useFrames: this.usesFrames(),
      immediateRender: false,
      lazy: false
    },
        Engine = vars.repeat && _globals.TweenMax || _TweenLite.default,
        duration,
        p,
        t;

    for (p in vars) {
      copy[p] = vars[p];
    }

    copy.time = this._parseTimeOrLabel(position);
    duration = Math.abs(Number(copy.time) - this._time) / this._timeScale || 0.001;
    t = new Engine(this, duration, copy);

    copy.onStart = function () {
      t.target.paused(true);

      if (t.vars.time !== t.target.time() && duration === t.duration() && !t.isFromTo) {
        //don't make the duration zero - if it's supposed to be zero, don't worry because it's already initting the tween and will complete immediately, effectively making the duration zero anyway. If we make duration zero, the tween won't run at all.
        t.duration(Math.abs(t.vars.time - t.target.time()) / t.target._timeScale).render(t.time(), true, true); //render() right away to ensure that things look right, especially in the case of .tweenTo(0).
      }

      if (vars.onStart) {
        //in case the user had an onStart in the vars - we don't want to overwrite it.
        vars.onStart.apply(vars.onStartScope || vars.callbackScope || t, vars.onStartParams || []); //don't use t._callback("onStart") or it'll point to the copy.onStart and we'll get a recursion error.
      }
    };

    return t;
  };

  p.tweenFromTo = function (fromPosition, toPosition, vars) {
    vars = vars || {};
    fromPosition = this._parseTimeOrLabel(fromPosition);
    vars.startAt = {
      onComplete: this.seek,
      onCompleteParams: [fromPosition],
      callbackScope: this
    };
    vars.immediateRender = vars.immediateRender !== false;
    var t = this.tweenTo(toPosition, vars);
    t.isFromTo = 1; //to ensure we don't mess with the duration in the onStart (we've got the start and end values here, so lock it in)

    return t.duration(Math.abs(t.vars.time - fromPosition) / this._timeScale || 0.001);
  };

  p.render = function (time, suppressEvents, force) {
    if (this._gc) {
      this._enabled(true, false);
    }

    var prevTime = this._time,
        totalDur = !this._dirty ? this._totalDuration : this.totalDuration(),
        dur = this._duration,
        prevTotalTime = this._totalTime,
        prevStart = this._startTime,
        prevTimeScale = this._timeScale,
        prevRawPrevTime = this._rawPrevTime,
        prevPaused = this._paused,
        prevCycle = this._cycle,
        tween,
        isComplete,
        next,
        callback,
        internalForce,
        cycleDuration,
        pauseTween,
        curTime;

    if (prevTime !== this._time) {
      //if totalDuration() finds a child with a negative startTime and smoothChildTiming is true, things get shifted around internally so we need to adjust the time accordingly. For example, if a tween starts at -30 we must shift EVERYTHING forward 30 seconds and move this timeline's startTime backward by 30 seconds so that things align with the playhead (no jump).
      time += this._time - prevTime;
    }

    if (time >= totalDur - 0.0000001 && time >= 0) {
      //to work around occasional floating point math artifacts.
      if (!this._locked) {
        this._totalTime = totalDur;
        this._cycle = this._repeat;
      }

      if (!this._reversed) if (!this._hasPausedChild()) {
        isComplete = true;
        callback = "onComplete";
        internalForce = !!this._timeline.autoRemoveChildren; //otherwise, if the animation is unpaused/activated after it's already finished, it doesn't get removed from the parent timeline.

        if (this._duration === 0) if (time <= 0 && time >= -0.0000001 || prevRawPrevTime < 0 || prevRawPrevTime === _tinyNum) if (prevRawPrevTime !== time && this._first) {
          internalForce = true;

          if (prevRawPrevTime > _tinyNum) {
            callback = "onReverseComplete";
          }
        }
      }
      this._rawPrevTime = this._duration || !suppressEvents || time || this._rawPrevTime === time ? time : _tinyNum; //when the playhead arrives at EXACTLY time 0 (right on top) of a zero-duration timeline or tween, we need to discern if events are suppressed so that when the playhead moves again (next time), it'll trigger the callback. If events are NOT suppressed, obviously the callback would be triggered in this render. Basically, the callback should fire either when the playhead ARRIVES or LEAVES this exact spot, not both. Imagine doing a timeline.seek(0) and there's a callback that sits at 0. Since events are suppressed on that seek() by default, nothing will fire, but when the playhead moves off of that position, the callback should fire. This behavior is what people intuitively expect. We set the _rawPrevTime to be a precise tiny number to indicate this scenario rather than using another property/variable which would increase memory usage. This technique is less readable, but more efficient.

      if (this._yoyo && (this._cycle & 1) !== 0) {
        this._time = time = 0;
      } else {
        this._time = dur;
        time = dur + 0.0001; //to avoid occasional floating point rounding errors - sometimes child tweens/timelines were not being fully completed (their progress might be 0.999999999999998 instead of 1 because when _time - tween._startTime is performed, floating point errors would return a value that was SLIGHTLY off). Try (999999999999.7 - 999999999999) * 1 = 0.699951171875 instead of 0.7. We cannot do less then 0.0001 because the same issue can occur when the duration is extremely large like 999999999999 in which case adding 0.00000001, for example, causes it to act like nothing was added.
      }
    } else if (time < 0.0000001) {
      //to work around occasional floating point math artifacts, round super small values to 0.
      if (!this._locked) {
        this._totalTime = this._cycle = 0;
      }

      this._time = 0;

      if (prevTime !== 0 || dur === 0 && prevRawPrevTime !== _tinyNum && (prevRawPrevTime > 0 || time < 0 && prevRawPrevTime >= 0) && !this._locked) {
        //edge case for checking time < 0 && prevRawPrevTime >= 0: a zero-duration fromTo() tween inside a zero-duration timeline (yeah, very rare)
        callback = "onReverseComplete";
        isComplete = this._reversed;
      }

      if (time < 0) {
        this._active = false;

        if (this._timeline.autoRemoveChildren && this._reversed) {
          internalForce = isComplete = true;
          callback = "onReverseComplete";
        } else if (prevRawPrevTime >= 0 && this._first) {
          //when going back beyond the start, force a render so that zero-duration tweens that sit at the very beginning render their start values properly. Otherwise, if the parent timeline's playhead lands exactly at this timeline's startTime, and then moves backwards, the zero-duration tweens at the beginning would still be at their end state.
          internalForce = true;
        }

        this._rawPrevTime = time;
      } else {
        this._rawPrevTime = dur || !suppressEvents || time || this._rawPrevTime === time ? time : _tinyNum; //when the playhead arrives at EXACTLY time 0 (right on top) of a zero-duration timeline or tween, we need to discern if events are suppressed so that when the playhead moves again (next time), it'll trigger the callback. If events are NOT suppressed, obviously the callback would be triggered in this render. Basically, the callback should fire either when the playhead ARRIVES or LEAVES this exact spot, not both. Imagine doing a timeline.seek(0) and there's a callback that sits at 0. Since events are suppressed on that seek() by default, nothing will fire, but when the playhead moves off of that position, the callback should fire. This behavior is what people intuitively expect. We set the _rawPrevTime to be a precise tiny number to indicate this scenario rather than using another property/variable which would increase memory usage. This technique is less readable, but more efficient.

        if (time === 0 && isComplete) {
          //if there's a zero-duration tween at the very beginning of a timeline and the playhead lands EXACTLY at time 0, that tween will correctly render its end values, but we need to keep the timeline alive for one more render so that the beginning values render properly as the parent's playhead keeps moving beyond the begining. Imagine obj.x starts at 0 and then we do tl.set(obj, {x:100}).to(obj, 1, {x:200}) and then later we tl.reverse()...the goal is to have obj.x revert to 0. If the playhead happens to land on exactly 0, without this chunk of code, it'd complete the timeline and remove it from the rendering queue (not good).
          tween = this._first;

          while (tween && tween._startTime === 0) {
            if (!tween._duration) {
              isComplete = false;
            }

            tween = tween._next;
          }
        }

        time = 0; //to avoid occasional floating point rounding errors (could cause problems especially with zero-duration tweens at the very beginning of the timeline)

        if (!this._initted) {
          internalForce = true;
        }
      }
    } else {
      if (dur === 0 && prevRawPrevTime < 0) {
        //without this, zero-duration repeating timelines (like with a simple callback nested at the very beginning and a repeatDelay) wouldn't render the first time through.
        internalForce = true;
      }

      this._time = this._rawPrevTime = time;

      if (!this._locked) {
        this._totalTime = time;

        if (this._repeat !== 0) {
          cycleDuration = dur + this._repeatDelay;
          this._cycle = this._totalTime / cycleDuration >> 0; //originally _totalTime % cycleDuration but floating point errors caused problems, so I normalized it. (4 % 0.8 should be 0 but it gets reported as 0.79999999!)

          if (this._cycle !== 0) if (this._cycle === this._totalTime / cycleDuration && prevTotalTime <= time) {
            this._cycle--; //otherwise when rendered exactly at the end time, it will act as though it is repeating (at the beginning)
          }
          this._time = this._totalTime - this._cycle * cycleDuration;
          if (this._yoyo) if ((this._cycle & 1) !== 0) {
            this._time = dur - this._time;
          }

          if (this._time > dur) {
            this._time = dur;
            time = dur + 0.0001; //to avoid occasional floating point rounding error
          } else if (this._time < 0) {
            this._time = time = 0;
          } else {
            time = this._time;
          }
        }
      }

      if (this._hasPause && !this._forcingPlayhead && !suppressEvents) {
        time = this._time;

        if (time >= prevTime || this._repeat && prevCycle !== this._cycle) {
          tween = this._first;

          while (tween && tween._startTime <= time && !pauseTween) {
            if (!tween._duration) if (tween.data === "isPause" && !tween.ratio && !(tween._startTime === 0 && this._rawPrevTime === 0)) {
              pauseTween = tween;
            }
            tween = tween._next;
          }
        } else {
          tween = this._last;

          while (tween && tween._startTime >= time && !pauseTween) {
            if (!tween._duration) if (tween.data === "isPause" && tween._rawPrevTime > 0) {
              pauseTween = tween;
            }
            tween = tween._prev;
          }
        }

        if (pauseTween && pauseTween._startTime < dur) {
          this._time = time = pauseTween._startTime;
          this._totalTime = time + this._cycle * (this._totalDuration + this._repeatDelay);
        }
      }
    }

    if (this._cycle !== prevCycle) if (!this._locked) {
      /*
      make sure children at the end/beginning of the timeline are rendered properly. If, for example, 
      a 3-second long timeline rendered at 2.9 seconds previously, and now renders at 3.2 seconds (which
      would get transated to 2.8 seconds if the timeline yoyos or 0.2 seconds if it just repeats), there
      could be a callback or a short tween that's at 2.95 or 3 seconds in which wouldn't render. So 
      we need to push the timeline to the end (and/or beginning depending on its yoyo value). Also we must
      ensure that zero-duration tweens at the very beginning or end of the TimelineMax work. 
      */
      var backwards = this._yoyo && (prevCycle & 1) !== 0,
          wrap = backwards === (this._yoyo && (this._cycle & 1) !== 0),
          recTotalTime = this._totalTime,
          recCycle = this._cycle,
          recRawPrevTime = this._rawPrevTime,
          recTime = this._time;
      this._totalTime = prevCycle * dur;

      if (this._cycle < prevCycle) {
        backwards = !backwards;
      } else {
        this._totalTime += dur;
      }

      this._time = prevTime; //temporarily revert _time so that render() renders the children in the correct order. Without this, tweens won't rewind correctly. We could arhictect things in a "cleaner" way by splitting out the rendering queue into a separate method but for performance reasons, we kept it all inside this method.

      this._rawPrevTime = dur === 0 ? prevRawPrevTime - 0.0001 : prevRawPrevTime;
      this._cycle = prevCycle;
      this._locked = true; //prevents changes to totalTime and skips repeat/yoyo behavior when we recursively call render()

      prevTime = backwards ? 0 : dur;
      this.render(prevTime, suppressEvents, dur === 0);
      if (!suppressEvents) if (!this._gc) {
        if (this.vars.onRepeat) {
          this._cycle = recCycle; //in case the onRepeat alters the playhead or invalidates(), we shouldn't stay locked or use the previous cycle.

          this._locked = false;

          this._callback("onRepeat");
        }
      }

      if (prevTime !== this._time) {
        //in case there's a callback like onComplete in a nested tween/timeline that changes the playhead position, like via seek(), we should just abort.
        return;
      }

      if (wrap) {
        this._cycle = prevCycle; //if there's an onRepeat, we reverted this above, so make sure it's set properly again. We also unlocked in that scenario, so reset that too.

        this._locked = true;
        prevTime = backwards ? dur + 0.0001 : -0.0001;
        this.render(prevTime, true, false);
      }

      this._locked = false;

      if (this._paused && !prevPaused) {
        //if the render() triggered callback that paused this timeline, we should abort (very rare, but possible)
        return;
      }

      this._time = recTime;
      this._totalTime = recTotalTime;
      this._cycle = recCycle;
      this._rawPrevTime = recRawPrevTime;
    }

    if ((this._time === prevTime || !this._first) && !force && !internalForce && !pauseTween) {
      if (prevTotalTime !== this._totalTime) if (this._onUpdate) if (!suppressEvents) {
        //so that onUpdate fires even during the repeatDelay - as long as the totalTime changed, we should trigger onUpdate.
        this._callback("onUpdate");
      }
      return;
    } else if (!this._initted) {
      this._initted = true;
    }

    if (!this._active) if (!this._paused && this._totalTime !== prevTotalTime && time > 0) {
      this._active = true; //so that if the user renders the timeline (as opposed to the parent timeline rendering it), it is forced to re-render and align it with the proper time/frame on the next rendering cycle. Maybe the timeline already finished but the user manually re-renders it as halfway done, for example.
    }
    if (prevTotalTime === 0) if (this.vars.onStart) if (this._totalTime !== 0 || !this._totalDuration) if (!suppressEvents) {
      this._callback("onStart");
    }
    curTime = this._time;

    if (curTime >= prevTime) {
      tween = this._first;

      while (tween) {
        next = tween._next; //record it here because the value could change after rendering...

        if (curTime !== this._time || this._paused && !prevPaused) {
          //in case a tween pauses or seeks the timeline when rendering, like inside of an onUpdate/onComplete
          break;
        } else if (tween._active || tween._startTime <= this._time && !tween._paused && !tween._gc) {
          if (pauseTween === tween) {
            this.pause();
          }

          if (!tween._reversed) {
            tween.render((time - tween._startTime) * tween._timeScale, suppressEvents, force);
          } else {
            tween.render((!tween._dirty ? tween._totalDuration : tween.totalDuration()) - (time - tween._startTime) * tween._timeScale, suppressEvents, force);
          }
        }

        tween = next;
      }
    } else {
      tween = this._last;

      while (tween) {
        next = tween._prev; //record it here because the value could change after rendering...

        if (curTime !== this._time || this._paused && !prevPaused) {
          //in case a tween pauses or seeks the timeline when rendering, like inside of an onUpdate/onComplete
          break;
        } else if (tween._active || tween._startTime <= prevTime && !tween._paused && !tween._gc) {
          if (pauseTween === tween) {
            pauseTween = tween._prev; //the linked list is organized by _startTime, thus it's possible that a tween could start BEFORE the pause and end after it, in which case it would be positioned before the pause tween in the linked list, but we should render it before we pause() the timeline and cease rendering. This is only a concern when going in reverse.

            while (pauseTween && pauseTween.endTime() > this._time) {
              pauseTween.render(pauseTween._reversed ? pauseTween.totalDuration() - (time - pauseTween._startTime) * pauseTween._timeScale : (time - pauseTween._startTime) * pauseTween._timeScale, suppressEvents, force);
              pauseTween = pauseTween._prev;
            }

            pauseTween = null;
            this.pause();
          }

          if (!tween._reversed) {
            tween.render((time - tween._startTime) * tween._timeScale, suppressEvents, force);
          } else {
            tween.render((!tween._dirty ? tween._totalDuration : tween.totalDuration()) - (time - tween._startTime) * tween._timeScale, suppressEvents, force);
          }
        }

        tween = next;
      }
    }

    if (this._onUpdate) if (!suppressEvents) {
      if (_lazyTweens.length) {
        //in case rendering caused any tweens to lazy-init, we should render them because typically when a timeline finishes, users expect things to have rendered fully. Imagine an onUpdate on a timeline that reports/checks tweened values.
        _lazyRender();
      }

      this._callback("onUpdate");
    }
    if (callback) if (!this._locked) if (!this._gc) if (prevStart === this._startTime || prevTimeScale !== this._timeScale) if (this._time === 0 || totalDur >= this.totalDuration()) {
      //if one of the tweens that was rendered altered this timeline's startTime (like if an onComplete reversed the timeline), it probably isn't complete. If it is, don't worry, because whatever call altered the startTime would complete if it was necessary at the new time. The only exception is the timeScale property. Also check _gc because there's a chance that kill() could be called in an onUpdate
      if (isComplete) {
        if (_lazyTweens.length) {
          //in case rendering caused any tweens to lazy-init, we should render them because typically when a timeline finishes, users expect things to have rendered fully. Imagine an onComplete on a timeline that reports/checks tweened values.
          _lazyRender();
        }

        if (this._timeline.autoRemoveChildren) {
          this._enabled(false, false);
        }

        this._active = false;
      }

      if (!suppressEvents && this.vars[callback]) {
        this._callback(callback);
      }
    }
  };

  p.getActive = function (nested, tweens, timelines) {
    if (nested == null) {
      nested = true;
    }

    if (tweens == null) {
      tweens = true;
    }

    if (timelines == null) {
      timelines = false;
    }

    var a = [],
        all = this.getChildren(nested, tweens, timelines),
        cnt = 0,
        l = all.length,
        i,
        tween;

    for (i = 0; i < l; i++) {
      tween = all[i];

      if (tween.isActive()) {
        a[cnt++] = tween;
      }
    }

    return a;
  };

  p.getLabelAfter = function (time) {
    if (!time) if (time !== 0) {
      //faster than isNan()
      time = this._time;
    }
    var labels = this.getLabelsArray(),
        l = labels.length,
        i;

    for (i = 0; i < l; i++) {
      if (labels[i].time > time) {
        return labels[i].name;
      }
    }

    return null;
  };

  p.getLabelBefore = function (time) {
    if (time == null) {
      time = this._time;
    }

    var labels = this.getLabelsArray(),
        i = labels.length;

    while (--i > -1) {
      if (labels[i].time < time) {
        return labels[i].name;
      }
    }

    return null;
  };

  p.getLabelsArray = function () {
    var a = [],
        cnt = 0,
        p;

    for (p in this._labels) {
      a[cnt++] = {
        time: this._labels[p],
        name: p
      };
    }

    a.sort(function (a, b) {
      return a.time - b.time;
    });
    return a;
  };

  p.invalidate = function () {
    this._locked = false; //unlock and set cycle in case invalidate() is called from inside an onRepeat

    return _TimelineLite.default.prototype.invalidate.call(this);
  }; //---- GETTERS / SETTERS -------------------------------------------------------------------------------------------------------


  p.progress = function (value, suppressEvents) {
    return !arguments.length ? this._time / this.duration() || 0 : this.totalTime(this.duration() * (this._yoyo && (this._cycle & 1) !== 0 ? 1 - value : value) + this._cycle * (this._duration + this._repeatDelay), suppressEvents);
  };

  p.totalProgress = function (value, suppressEvents) {
    return !arguments.length ? this._totalTime / this.totalDuration() || 0 : this.totalTime(this.totalDuration() * value, suppressEvents);
  };

  p.totalDuration = function (value) {
    if (!arguments.length) {
      if (this._dirty) {
        _TimelineLite.default.prototype.totalDuration.call(this); //just forces refresh
        //Instead of Infinity, we use 999999999999 so that we can accommodate reverses.


        this._totalDuration = this._repeat === -1 ? 999999999999 : this._duration * (this._repeat + 1) + this._repeatDelay * this._repeat;
      }

      return this._totalDuration;
    }

    return this._repeat === -1 || !value ? this : this.timeScale(this.totalDuration() / value);
  };

  p.time = function (value, suppressEvents) {
    if (!arguments.length) {
      return this._time;
    }

    if (this._dirty) {
      this.totalDuration();
    }

    if (value > this._duration) {
      value = this._duration;
    }

    if (this._yoyo && (this._cycle & 1) !== 0) {
      value = this._duration - value + this._cycle * (this._duration + this._repeatDelay);
    } else if (this._repeat !== 0) {
      value += this._cycle * (this._duration + this._repeatDelay);
    }

    return this.totalTime(value, suppressEvents);
  };

  p.repeat = function (value) {
    if (!arguments.length) {
      return this._repeat;
    }

    this._repeat = value;
    return this._uncache(true);
  };

  p.repeatDelay = function (value) {
    if (!arguments.length) {
      return this._repeatDelay;
    }

    this._repeatDelay = value;
    return this._uncache(true);
  };

  p.yoyo = function (value) {
    if (!arguments.length) {
      return this._yoyo;
    }

    this._yoyo = value;
    return this;
  };

  p.currentLabel = function (value) {
    if (!arguments.length) {
      return this.getLabelBefore(this._time + 0.00000001);
    }

    return this.seek(value, true);
  };

  return TimelineMax;
}, true);

var TimelineMax = _TweenLite.globals.TimelineMax;
exports.default = exports.TimelineMax = TimelineMax;
},{"./TweenLite.js":"node_modules/gsap/TweenLite.js","./TimelineLite.js":"node_modules/gsap/TimelineLite.js"}],"node_modules/gsap/BezierPlugin.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.BezierPlugin = void 0;

var _TweenLite = require("./TweenLite.js");

/*!
 * VERSION: 1.3.8
 * DATE: 2018-05-30
 * UPDATES AND DOCS AT: http://greensock.com
 *
 * @license Copyright (c) 2008-2018, GreenSock. All rights reserved.
 * This work is subject to the terms at http://greensock.com/standard-license or for
 * Club GreenSock members, the software agreement that was issued with your membership.
 * 
 * @author: Jack Doyle, jack@greensock.com
 **/
var _RAD2DEG = 180 / Math.PI,
    _r1 = [],
    _r2 = [],
    _r3 = [],
    _corProps = {},
    _globals = _TweenLite._gsScope._gsDefine.globals,
    Segment = function (a, b, c, d) {
  if (c === d) {
    //if c and d match, the final autoRotate value could lock at -90 degrees, so differentiate them slightly.
    c = d - (d - b) / 1000000;
  }

  if (a === b) {
    //if a and b match, the starting autoRotate value could lock at -90 degrees, so differentiate them slightly.
    b = a + (c - a) / 1000000;
  }

  this.a = a;
  this.b = b;
  this.c = c;
  this.d = d;
  this.da = d - a;
  this.ca = c - a;
  this.ba = b - a;
},
    _correlate = ",x,y,z,left,top,right,bottom,marginTop,marginLeft,marginRight,marginBottom,paddingLeft,paddingTop,paddingRight,paddingBottom,backgroundPosition,backgroundPosition_y,",
    cubicToQuadratic = function (a, b, c, d) {
  var q1 = {
    a: a
  },
      q2 = {},
      q3 = {},
      q4 = {
    c: d
  },
      mab = (a + b) / 2,
      mbc = (b + c) / 2,
      mcd = (c + d) / 2,
      mabc = (mab + mbc) / 2,
      mbcd = (mbc + mcd) / 2,
      m8 = (mbcd - mabc) / 8;
  q1.b = mab + (a - mab) / 4;
  q2.b = mabc + m8;
  q1.c = q2.a = (q1.b + q2.b) / 2;
  q2.c = q3.a = (mabc + mbcd) / 2;
  q3.b = mbcd - m8;
  q4.b = mcd + (d - mcd) / 4;
  q3.c = q4.a = (q3.b + q4.b) / 2;
  return [q1, q2, q3, q4];
},
    _calculateControlPoints = function (a, curviness, quad, basic, correlate) {
  var l = a.length - 1,
      ii = 0,
      cp1 = a[0].a,
      i,
      p1,
      p2,
      p3,
      seg,
      m1,
      m2,
      mm,
      cp2,
      qb,
      r1,
      r2,
      tl;

  for (i = 0; i < l; i++) {
    seg = a[ii];
    p1 = seg.a;
    p2 = seg.d;
    p3 = a[ii + 1].d;

    if (correlate) {
      r1 = _r1[i];
      r2 = _r2[i];
      tl = (r2 + r1) * curviness * 0.25 / (basic ? 0.5 : _r3[i] || 0.5);
      m1 = p2 - (p2 - p1) * (basic ? curviness * 0.5 : r1 !== 0 ? tl / r1 : 0);
      m2 = p2 + (p3 - p2) * (basic ? curviness * 0.5 : r2 !== 0 ? tl / r2 : 0);
      mm = p2 - (m1 + ((m2 - m1) * (r1 * 3 / (r1 + r2) + 0.5) / 4 || 0));
    } else {
      m1 = p2 - (p2 - p1) * curviness * 0.5;
      m2 = p2 + (p3 - p2) * curviness * 0.5;
      mm = p2 - (m1 + m2) / 2;
    }

    m1 += mm;
    m2 += mm;
    seg.c = cp2 = m1;

    if (i !== 0) {
      seg.b = cp1;
    } else {
      seg.b = cp1 = seg.a + (seg.c - seg.a) * 0.6; //instead of placing b on a exactly, we move it inline with c so that if the user specifies an ease like Back.easeIn or Elastic.easeIn which goes BEYOND the beginning, it will do so smoothly.
    }

    seg.da = p2 - p1;
    seg.ca = cp2 - p1;
    seg.ba = cp1 - p1;

    if (quad) {
      qb = cubicToQuadratic(p1, cp1, cp2, p2);
      a.splice(ii, 1, qb[0], qb[1], qb[2], qb[3]);
      ii += 4;
    } else {
      ii++;
    }

    cp1 = m2;
  }

  seg = a[ii];
  seg.b = cp1;
  seg.c = cp1 + (seg.d - cp1) * 0.4; //instead of placing c on d exactly, we move it inline with b so that if the user specifies an ease like Back.easeOut or Elastic.easeOut which goes BEYOND the end, it will do so smoothly.

  seg.da = seg.d - seg.a;
  seg.ca = seg.c - seg.a;
  seg.ba = cp1 - seg.a;

  if (quad) {
    qb = cubicToQuadratic(seg.a, cp1, seg.c, seg.d);
    a.splice(ii, 1, qb[0], qb[1], qb[2], qb[3]);
  }
},
    _parseAnchors = function (values, p, correlate, prepend) {
  var a = [],
      l,
      i,
      p1,
      p2,
      p3,
      tmp;

  if (prepend) {
    values = [prepend].concat(values);
    i = values.length;

    while (--i > -1) {
      if (typeof (tmp = values[i][p]) === "string") if (tmp.charAt(1) === "=") {
        values[i][p] = prepend[p] + Number(tmp.charAt(0) + tmp.substr(2)); //accommodate relative values. Do it inline instead of breaking it out into a function for speed reasons
      }
    }
  }

  l = values.length - 2;

  if (l < 0) {
    a[0] = new Segment(values[0][p], 0, 0, values[0][p]);
    return a;
  }

  for (i = 0; i < l; i++) {
    p1 = values[i][p];
    p2 = values[i + 1][p];
    a[i] = new Segment(p1, 0, 0, p2);

    if (correlate) {
      p3 = values[i + 2][p];
      _r1[i] = (_r1[i] || 0) + (p2 - p1) * (p2 - p1);
      _r2[i] = (_r2[i] || 0) + (p3 - p2) * (p3 - p2);
    }
  }

  a[i] = new Segment(values[i][p], 0, 0, values[i + 1][p]);
  return a;
},
    bezierThrough = function (values, curviness, quadratic, basic, correlate, prepend) {
  var obj = {},
      props = [],
      first = prepend || values[0],
      i,
      p,
      a,
      j,
      r,
      l,
      seamless,
      last;
  correlate = typeof correlate === "string" ? "," + correlate + "," : _correlate;

  if (curviness == null) {
    curviness = 1;
  }

  for (p in values[0]) {
    props.push(p);
  } //check to see if the last and first values are identical (well, within 0.05). If so, make seamless by appending the second element to the very end of the values array and the 2nd-to-last element to the very beginning (we'll remove those segments later)


  if (values.length > 1) {
    last = values[values.length - 1];
    seamless = true;
    i = props.length;

    while (--i > -1) {
      p = props[i];

      if (Math.abs(first[p] - last[p]) > 0.05) {
        //build in a tolerance of +/-0.05 to accommodate rounding errors.
        seamless = false;
        break;
      }
    }

    if (seamless) {
      values = values.concat(); //duplicate the array to avoid contaminating the original which the user may be reusing for other tweens

      if (prepend) {
        values.unshift(prepend);
      }

      values.push(values[1]);
      prepend = values[values.length - 3];
    }
  }

  _r1.length = _r2.length = _r3.length = 0;
  i = props.length;

  while (--i > -1) {
    p = props[i];
    _corProps[p] = correlate.indexOf("," + p + ",") !== -1;
    obj[p] = _parseAnchors(values, p, _corProps[p], prepend);
  }

  i = _r1.length;

  while (--i > -1) {
    _r1[i] = Math.sqrt(_r1[i]);
    _r2[i] = Math.sqrt(_r2[i]);
  }

  if (!basic) {
    i = props.length;

    while (--i > -1) {
      if (_corProps[p]) {
        a = obj[props[i]];
        l = a.length - 1;

        for (j = 0; j < l; j++) {
          r = a[j + 1].da / _r2[j] + a[j].da / _r1[j] || 0;
          _r3[j] = (_r3[j] || 0) + r * r;
        }
      }
    }

    i = _r3.length;

    while (--i > -1) {
      _r3[i] = Math.sqrt(_r3[i]);
    }
  }

  i = props.length;
  j = quadratic ? 4 : 1;

  while (--i > -1) {
    p = props[i];
    a = obj[p];

    _calculateControlPoints(a, curviness, quadratic, basic, _corProps[p]); //this method requires that _parseAnchors() and _setSegmentRatios() ran first so that _r1, _r2, and _r3 values are populated for all properties


    if (seamless) {
      a.splice(0, j);
      a.splice(a.length - j, j);
    }
  }

  return obj;
},
    _parseBezierData = function (values, type, prepend) {
  type = type || "soft";
  var obj = {},
      inc = type === "cubic" ? 3 : 2,
      soft = type === "soft",
      props = [],
      a,
      b,
      c,
      d,
      cur,
      i,
      j,
      l,
      p,
      cnt,
      tmp;

  if (soft && prepend) {
    values = [prepend].concat(values);
  }

  if (values == null || values.length < inc + 1) {
    throw "invalid Bezier data";
  }

  for (p in values[0]) {
    props.push(p);
  }

  i = props.length;

  while (--i > -1) {
    p = props[i];
    obj[p] = cur = [];
    cnt = 0;
    l = values.length;

    for (j = 0; j < l; j++) {
      a = prepend == null ? values[j][p] : typeof (tmp = values[j][p]) === "string" && tmp.charAt(1) === "=" ? prepend[p] + Number(tmp.charAt(0) + tmp.substr(2)) : Number(tmp);
      if (soft) if (j > 1) if (j < l - 1) {
        cur[cnt++] = (a + cur[cnt - 2]) / 2;
      }
      cur[cnt++] = a;
    }

    l = cnt - inc + 1;
    cnt = 0;

    for (j = 0; j < l; j += inc) {
      a = cur[j];
      b = cur[j + 1];
      c = cur[j + 2];
      d = inc === 2 ? 0 : cur[j + 3];
      cur[cnt++] = tmp = inc === 3 ? new Segment(a, b, c, d) : new Segment(a, (2 * b + a) / 3, (2 * b + c) / 3, c);
    }

    cur.length = cnt;
  }

  return obj;
},
    _addCubicLengths = function (a, steps, resolution) {
  var inc = 1 / resolution,
      j = a.length,
      d,
      d1,
      s,
      da,
      ca,
      ba,
      p,
      i,
      inv,
      bez,
      index;

  while (--j > -1) {
    bez = a[j];
    s = bez.a;
    da = bez.d - s;
    ca = bez.c - s;
    ba = bez.b - s;
    d = d1 = 0;

    for (i = 1; i <= resolution; i++) {
      p = inc * i;
      inv = 1 - p;
      d = d1 - (d1 = (p * p * da + 3 * inv * (p * ca + inv * ba)) * p);
      index = j * resolution + i - 1;
      steps[index] = (steps[index] || 0) + d * d;
    }
  }
},
    _parseLengthData = function (obj, resolution) {
  resolution = resolution >> 0 || 6;
  var a = [],
      lengths = [],
      d = 0,
      total = 0,
      threshold = resolution - 1,
      segments = [],
      curLS = [],
      //current length segments array
  p,
      i,
      l,
      index;

  for (p in obj) {
    _addCubicLengths(obj[p], a, resolution);
  }

  l = a.length;

  for (i = 0; i < l; i++) {
    d += Math.sqrt(a[i]);
    index = i % resolution;
    curLS[index] = d;

    if (index === threshold) {
      total += d;
      index = i / resolution >> 0;
      segments[index] = curLS;
      lengths[index] = total;
      d = 0;
      curLS = [];
    }
  }

  return {
    length: total,
    lengths: lengths,
    segments: segments
  };
},
    BezierPlugin = _TweenLite._gsScope._gsDefine.plugin({
  propName: "bezier",
  priority: -1,
  version: "1.3.8",
  API: 2,
  global: true,
  //gets called when the tween renders for the first time. This is where initial values should be recorded and any setup routines should run.
  init: function (target, vars, tween) {
    this._target = target;

    if (vars instanceof Array) {
      vars = {
        values: vars
      };
    }

    this._func = {};
    this._mod = {};
    this._props = [];
    this._timeRes = vars.timeResolution == null ? 6 : parseInt(vars.timeResolution, 10);
    var values = vars.values || [],
        first = {},
        second = values[0],
        autoRotate = vars.autoRotate || tween.vars.orientToBezier,
        p,
        isFunc,
        i,
        j,
        prepend;
    this._autoRotate = autoRotate ? autoRotate instanceof Array ? autoRotate : [["x", "y", "rotation", autoRotate === true ? 0 : Number(autoRotate) || 0]] : null;

    for (p in second) {
      this._props.push(p);
    }

    i = this._props.length;

    while (--i > -1) {
      p = this._props[i];

      this._overwriteProps.push(p);

      isFunc = this._func[p] = typeof target[p] === "function";
      first[p] = !isFunc ? parseFloat(target[p]) : target[p.indexOf("set") || typeof target["get" + p.substr(3)] !== "function" ? p : "get" + p.substr(3)]();
      if (!prepend) if (first[p] !== values[0][p]) {
        prepend = first;
      }
    }

    this._beziers = vars.type !== "cubic" && vars.type !== "quadratic" && vars.type !== "soft" ? bezierThrough(values, isNaN(vars.curviness) ? 1 : vars.curviness, false, vars.type === "thruBasic", vars.correlate, prepend) : _parseBezierData(values, vars.type, first);
    this._segCount = this._beziers[p].length;

    if (this._timeRes) {
      var ld = _parseLengthData(this._beziers, this._timeRes);

      this._length = ld.length;
      this._lengths = ld.lengths;
      this._segments = ld.segments;
      this._l1 = this._li = this._s1 = this._si = 0;
      this._l2 = this._lengths[0];
      this._curSeg = this._segments[0];
      this._s2 = this._curSeg[0];
      this._prec = 1 / this._curSeg.length;
    }

    if (autoRotate = this._autoRotate) {
      this._initialRotations = [];

      if (!(autoRotate[0] instanceof Array)) {
        this._autoRotate = autoRotate = [autoRotate];
      }

      i = autoRotate.length;

      while (--i > -1) {
        for (j = 0; j < 3; j++) {
          p = autoRotate[i][j];
          this._func[p] = typeof target[p] === "function" ? target[p.indexOf("set") || typeof target["get" + p.substr(3)] !== "function" ? p : "get" + p.substr(3)] : false;
        }

        p = autoRotate[i][2];
        this._initialRotations[i] = (this._func[p] ? this._func[p].call(this._target) : this._target[p]) || 0;

        this._overwriteProps.push(p);
      }
    }

    this._startRatio = tween.vars.runBackwards ? 1 : 0; //we determine the starting ratio when the tween inits which is always 0 unless the tween has runBackwards:true (indicating it's a from() tween) in which case it's 1.

    return true;
  },
  //called each time the values should be updated, and the ratio gets passed as the only parameter (typically it's a value between 0 and 1, but it can exceed those when using an ease like Elastic.easeOut or Back.easeOut, etc.)
  set: function (v) {
    var segments = this._segCount,
        func = this._func,
        target = this._target,
        notStart = v !== this._startRatio,
        curIndex,
        inv,
        i,
        p,
        b,
        t,
        val,
        l,
        lengths,
        curSeg;

    if (!this._timeRes) {
      curIndex = v < 0 ? 0 : v >= 1 ? segments - 1 : segments * v >> 0;
      t = (v - curIndex * (1 / segments)) * segments;
    } else {
      lengths = this._lengths;
      curSeg = this._curSeg;
      v *= this._length;
      i = this._li; //find the appropriate segment (if the currently cached one isn't correct)

      if (v > this._l2 && i < segments - 1) {
        l = segments - 1;

        while (i < l && (this._l2 = lengths[++i]) <= v) {}

        this._l1 = lengths[i - 1];
        this._li = i;
        this._curSeg = curSeg = this._segments[i];
        this._s2 = curSeg[this._s1 = this._si = 0];
      } else if (v < this._l1 && i > 0) {
        while (i > 0 && (this._l1 = lengths[--i]) >= v) {}

        if (i === 0 && v < this._l1) {
          this._l1 = 0;
        } else {
          i++;
        }

        this._l2 = lengths[i];
        this._li = i;
        this._curSeg = curSeg = this._segments[i];
        this._s1 = curSeg[(this._si = curSeg.length - 1) - 1] || 0;
        this._s2 = curSeg[this._si];
      }

      curIndex = i; //now find the appropriate sub-segment (we split it into the number of pieces that was defined by "precision" and measured each one)

      v -= this._l1;
      i = this._si;

      if (v > this._s2 && i < curSeg.length - 1) {
        l = curSeg.length - 1;

        while (i < l && (this._s2 = curSeg[++i]) <= v) {}

        this._s1 = curSeg[i - 1];
        this._si = i;
      } else if (v < this._s1 && i > 0) {
        while (i > 0 && (this._s1 = curSeg[--i]) >= v) {}

        if (i === 0 && v < this._s1) {
          this._s1 = 0;
        } else {
          i++;
        }

        this._s2 = curSeg[i];
        this._si = i;
      }

      t = (i + (v - this._s1) / (this._s2 - this._s1)) * this._prec || 0;
    }

    inv = 1 - t;
    i = this._props.length;

    while (--i > -1) {
      p = this._props[i];
      b = this._beziers[p][curIndex];
      val = (t * t * b.da + 3 * inv * (t * b.ca + inv * b.ba)) * t + b.a;

      if (this._mod[p]) {
        val = this._mod[p](val, target);
      }

      if (func[p]) {
        target[p](val);
      } else {
        target[p] = val;
      }
    }

    if (this._autoRotate) {
      var ar = this._autoRotate,
          b2,
          x1,
          y1,
          x2,
          y2,
          add,
          conv;
      i = ar.length;

      while (--i > -1) {
        p = ar[i][2];
        add = ar[i][3] || 0;
        conv = ar[i][4] === true ? 1 : _RAD2DEG;
        b = this._beziers[ar[i][0]];
        b2 = this._beziers[ar[i][1]];

        if (b && b2) {
          //in case one of the properties got overwritten.
          b = b[curIndex];
          b2 = b2[curIndex];
          x1 = b.a + (b.b - b.a) * t;
          x2 = b.b + (b.c - b.b) * t;
          x1 += (x2 - x1) * t;
          x2 += (b.c + (b.d - b.c) * t - x2) * t;
          y1 = b2.a + (b2.b - b2.a) * t;
          y2 = b2.b + (b2.c - b2.b) * t;
          y1 += (y2 - y1) * t;
          y2 += (b2.c + (b2.d - b2.c) * t - y2) * t;
          val = notStart ? Math.atan2(y2 - y1, x2 - x1) * conv + add : this._initialRotations[i];

          if (this._mod[p]) {
            val = this._mod[p](val, target); //for modProps
          }

          if (func[p]) {
            target[p](val);
          } else {
            target[p] = val;
          }
        }
      }
    }
  }
}),
    p = BezierPlugin.prototype;

exports.default = exports.BezierPlugin = BezierPlugin;
BezierPlugin.bezierThrough = bezierThrough;
BezierPlugin.cubicToQuadratic = cubicToQuadratic;
BezierPlugin._autoCSS = true; //indicates that this plugin can be inserted into the "css" object using the autoCSS feature of TweenLite

BezierPlugin.quadraticToCubic = function (a, b, c) {
  return new Segment(a, (2 * b + a) / 3, (2 * b + c) / 3, c);
};

BezierPlugin._cssRegister = function () {
  var CSSPlugin = _globals.CSSPlugin;

  if (!CSSPlugin) {
    return;
  }

  var _internals = CSSPlugin._internals,
      _parseToProxy = _internals._parseToProxy,
      _setPluginRatio = _internals._setPluginRatio,
      CSSPropTween = _internals.CSSPropTween;

  _internals._registerComplexSpecialProp("bezier", {
    parser: function (t, e, prop, cssp, pt, plugin) {
      if (e instanceof Array) {
        e = {
          values: e
        };
      }

      plugin = new BezierPlugin();
      var values = e.values,
          l = values.length - 1,
          pluginValues = [],
          v = {},
          i,
          p,
          data;

      if (l < 0) {
        return pt;
      }

      for (i = 0; i <= l; i++) {
        data = _parseToProxy(t, values[i], cssp, pt, plugin, l !== i);
        pluginValues[i] = data.end;
      }

      for (p in e) {
        v[p] = e[p]; //duplicate the vars object because we need to alter some things which would cause problems if the user plans to reuse the same vars object for another tween.
      }

      v.values = pluginValues;
      pt = new CSSPropTween(t, "bezier", 0, 0, data.pt, 2);
      pt.data = data;
      pt.plugin = plugin;
      pt.setRatio = _setPluginRatio;

      if (v.autoRotate === 0) {
        v.autoRotate = true;
      }

      if (v.autoRotate && !(v.autoRotate instanceof Array)) {
        i = v.autoRotate === true ? 0 : Number(v.autoRotate);
        v.autoRotate = data.end.left != null ? [["left", "top", "rotation", i, false]] : data.end.x != null ? [["x", "y", "rotation", i, false]] : false;
      }

      if (v.autoRotate) {
        if (!cssp._transform) {
          cssp._enableTransforms(false);
        }

        data.autoRotate = cssp._target._gsTransform;
        data.proxy.rotation = data.autoRotate.rotation || 0;

        cssp._overwriteProps.push("rotation");
      }

      plugin._onInitTween(data.proxy, v, cssp._tween);

      return pt;
    }
  });
};

p._mod = function (lookup) {
  var op = this._overwriteProps,
      i = op.length,
      val;

  while (--i > -1) {
    val = lookup[op[i]];

    if (val && typeof val === "function") {
      this._mod[op[i]] = val;
    }
  }
};

p._kill = function (lookup) {
  var a = this._props,
      p,
      i;

  for (p in this._beziers) {
    if (p in lookup) {
      delete this._beziers[p];
      delete this._func[p];
      i = a.length;

      while (--i > -1) {
        if (a[i] === p) {
          a.splice(i, 1);
        }
      }
    }
  }

  a = this._autoRotate;

  if (a) {
    i = a.length;

    while (--i > -1) {
      if (lookup[a[i][2]]) {
        a.splice(i, 1);
      }
    }
  }

  return this._super._kill.call(this, lookup);
};
},{"./TweenLite.js":"node_modules/gsap/TweenLite.js"}],"node_modules/gsap/EasePack.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
Object.defineProperty(exports, "Linear", {
  enumerable: true,
  get: function () {
    return _TweenLite.Linear;
  }
});
Object.defineProperty(exports, "Power0", {
  enumerable: true,
  get: function () {
    return _TweenLite.Power0;
  }
});
Object.defineProperty(exports, "Power1", {
  enumerable: true,
  get: function () {
    return _TweenLite.Power1;
  }
});
Object.defineProperty(exports, "Power2", {
  enumerable: true,
  get: function () {
    return _TweenLite.Power2;
  }
});
Object.defineProperty(exports, "Power3", {
  enumerable: true,
  get: function () {
    return _TweenLite.Power3;
  }
});
Object.defineProperty(exports, "Power4", {
  enumerable: true,
  get: function () {
    return _TweenLite.Power4;
  }
});
exports.ExpoScaleEase = exports.Sine = exports.Expo = exports.Circ = exports.SteppedEase = exports.SlowMo = exports.RoughEase = exports.Bounce = exports.Elastic = exports.Back = void 0;

var _TweenLite = require("./TweenLite.js");

/*!
 * VERSION: 1.16.1
 * DATE: 2018-08-27
 * UPDATES AND DOCS AT: http://greensock.com
 *
 * @license Copyright (c) 2008-2018, GreenSock. All rights reserved.
 * This work is subject to the terms at http://greensock.com/standard-license or for
 * Club GreenSock members, the software agreement that was issued with your membership.
 * 
 * @author: Jack Doyle, jack@greensock.com
 **/
_TweenLite._gsScope._gsDefine("easing.Back", ["easing.Ease"], function () {
  var w = _TweenLite._gsScope.GreenSockGlobals || _TweenLite._gsScope,
      gs = w.com.greensock,
      _2PI = Math.PI * 2,
      _HALF_PI = Math.PI / 2,
      _class = gs._class,
      _create = function (n, f) {
    var C = _class("easing." + n, function () {}, true),
        p = C.prototype = new _TweenLite.Ease();

    p.constructor = C;
    p.getRatio = f;
    return C;
  },
      _easeReg = _TweenLite.Ease.register || function () {},
      //put an empty function in place just as a safety measure in case someone loads an OLD version of TweenLite.js where Ease.register doesn't exist.
  _wrap = function (name, EaseOut, EaseIn, EaseInOut, aliases) {
    var C = _class("easing." + name, {
      easeOut: new EaseOut(),
      easeIn: new EaseIn(),
      easeInOut: new EaseInOut()
    }, true);

    _easeReg(C, name);

    return C;
  },
      EasePoint = function (time, value, next) {
    this.t = time;
    this.v = value;

    if (next) {
      this.next = next;
      next.prev = this;
      this.c = next.v - value;
      this.gap = next.t - time;
    }
  },
      //Back
  _createBack = function (n, f) {
    var C = _class("easing." + n, function (overshoot) {
      this._p1 = overshoot || overshoot === 0 ? overshoot : 1.70158;
      this._p2 = this._p1 * 1.525;
    }, true),
        p = C.prototype = new _TweenLite.Ease();

    p.constructor = C;
    p.getRatio = f;

    p.config = function (overshoot) {
      return new C(overshoot);
    };

    return C;
  },
      Back = _wrap("Back", _createBack("BackOut", function (p) {
    return (p = p - 1) * p * ((this._p1 + 1) * p + this._p1) + 1;
  }), _createBack("BackIn", function (p) {
    return p * p * ((this._p1 + 1) * p - this._p1);
  }), _createBack("BackInOut", function (p) {
    return (p *= 2) < 1 ? 0.5 * p * p * ((this._p2 + 1) * p - this._p2) : 0.5 * ((p -= 2) * p * ((this._p2 + 1) * p + this._p2) + 2);
  })),
      //SlowMo
  SlowMo = _class("easing.SlowMo", function (linearRatio, power, yoyoMode) {
    power = power || power === 0 ? power : 0.7;

    if (linearRatio == null) {
      linearRatio = 0.7;
    } else if (linearRatio > 1) {
      linearRatio = 1;
    }

    this._p = linearRatio !== 1 ? power : 0;
    this._p1 = (1 - linearRatio) / 2;
    this._p2 = linearRatio;
    this._p3 = this._p1 + this._p2;
    this._calcEnd = yoyoMode === true;
  }, true),
      p = SlowMo.prototype = new _TweenLite.Ease(),
      SteppedEase,
      ExpoScaleEase,
      RoughEase,
      _createElastic;

  p.constructor = SlowMo;

  p.getRatio = function (p) {
    var r = p + (0.5 - p) * this._p;

    if (p < this._p1) {
      return this._calcEnd ? 1 - (p = 1 - p / this._p1) * p : r - (p = 1 - p / this._p1) * p * p * p * r;
    } else if (p > this._p3) {
      return this._calcEnd ? p === 1 ? 0 : 1 - (p = (p - this._p3) / this._p1) * p : r + (p - r) * (p = (p - this._p3) / this._p1) * p * p * p; //added p === 1 ? 0 to avoid floating point rounding errors from affecting the final value, like 1 - 0.7 = 0.30000000000000004 instead of 0.3
    }

    return this._calcEnd ? 1 : r;
  };

  SlowMo.ease = new SlowMo(0.7, 0.7);

  p.config = SlowMo.config = function (linearRatio, power, yoyoMode) {
    return new SlowMo(linearRatio, power, yoyoMode);
  }; //SteppedEase


  SteppedEase = _class("easing.SteppedEase", function (steps, immediateStart) {
    steps = steps || 1;
    this._p1 = 1 / steps;
    this._p2 = steps + (immediateStart ? 0 : 1);
    this._p3 = immediateStart ? 1 : 0;
  }, true);
  p = SteppedEase.prototype = new _TweenLite.Ease();
  p.constructor = SteppedEase;

  p.getRatio = function (p) {
    if (p < 0) {
      p = 0;
    } else if (p >= 1) {
      p = 0.999999999;
    }

    return ((this._p2 * p | 0) + this._p3) * this._p1;
  };

  p.config = SteppedEase.config = function (steps, immediateStart) {
    return new SteppedEase(steps, immediateStart);
  }; //ExpoScaleEase


  ExpoScaleEase = _class("easing.ExpoScaleEase", function (start, end, ease) {
    this._p1 = Math.log(end / start);
    this._p2 = end - start;
    this._p3 = start;
    this._ease = ease;
  }, true);
  p = ExpoScaleEase.prototype = new _TweenLite.Ease();
  p.constructor = ExpoScaleEase;

  p.getRatio = function (p) {
    if (this._ease) {
      p = this._ease.getRatio(p);
    }

    return (this._p3 * Math.exp(this._p1 * p) - this._p3) / this._p2;
  };

  p.config = ExpoScaleEase.config = function (start, end, ease) {
    return new ExpoScaleEase(start, end, ease);
  }; //RoughEase


  RoughEase = _class("easing.RoughEase", function (vars) {
    vars = vars || {};
    var taper = vars.taper || "none",
        a = [],
        cnt = 0,
        points = (vars.points || 20) | 0,
        i = points,
        randomize = vars.randomize !== false,
        clamp = vars.clamp === true,
        template = vars.template instanceof _TweenLite.Ease ? vars.template : null,
        strength = typeof vars.strength === "number" ? vars.strength * 0.4 : 0.4,
        x,
        y,
        bump,
        invX,
        obj,
        pnt;

    while (--i > -1) {
      x = randomize ? Math.random() : 1 / points * i;
      y = template ? template.getRatio(x) : x;

      if (taper === "none") {
        bump = strength;
      } else if (taper === "out") {
        invX = 1 - x;
        bump = invX * invX * strength;
      } else if (taper === "in") {
        bump = x * x * strength;
      } else if (x < 0.5) {
        //"both" (start)
        invX = x * 2;
        bump = invX * invX * 0.5 * strength;
      } else {
        //"both" (end)
        invX = (1 - x) * 2;
        bump = invX * invX * 0.5 * strength;
      }

      if (randomize) {
        y += Math.random() * bump - bump * 0.5;
      } else if (i % 2) {
        y += bump * 0.5;
      } else {
        y -= bump * 0.5;
      }

      if (clamp) {
        if (y > 1) {
          y = 1;
        } else if (y < 0) {
          y = 0;
        }
      }

      a[cnt++] = {
        x: x,
        y: y
      };
    }

    a.sort(function (a, b) {
      return a.x - b.x;
    });
    pnt = new EasePoint(1, 1, null);
    i = points;

    while (--i > -1) {
      obj = a[i];
      pnt = new EasePoint(obj.x, obj.y, pnt);
    }

    this._prev = new EasePoint(0, 0, pnt.t !== 0 ? pnt : pnt.next);
  }, true);
  p = RoughEase.prototype = new _TweenLite.Ease();
  p.constructor = RoughEase;

  p.getRatio = function (p) {
    var pnt = this._prev;

    if (p > pnt.t) {
      while (pnt.next && p >= pnt.t) {
        pnt = pnt.next;
      }

      pnt = pnt.prev;
    } else {
      while (pnt.prev && p <= pnt.t) {
        pnt = pnt.prev;
      }
    }

    this._prev = pnt;
    return pnt.v + (p - pnt.t) / pnt.gap * pnt.c;
  };

  p.config = function (vars) {
    return new RoughEase(vars);
  };

  RoughEase.ease = new RoughEase(); //Bounce

  _wrap("Bounce", _create("BounceOut", function (p) {
    if (p < 1 / 2.75) {
      return 7.5625 * p * p;
    } else if (p < 2 / 2.75) {
      return 7.5625 * (p -= 1.5 / 2.75) * p + 0.75;
    } else if (p < 2.5 / 2.75) {
      return 7.5625 * (p -= 2.25 / 2.75) * p + 0.9375;
    }

    return 7.5625 * (p -= 2.625 / 2.75) * p + 0.984375;
  }), _create("BounceIn", function (p) {
    if ((p = 1 - p) < 1 / 2.75) {
      return 1 - 7.5625 * p * p;
    } else if (p < 2 / 2.75) {
      return 1 - (7.5625 * (p -= 1.5 / 2.75) * p + 0.75);
    } else if (p < 2.5 / 2.75) {
      return 1 - (7.5625 * (p -= 2.25 / 2.75) * p + 0.9375);
    }

    return 1 - (7.5625 * (p -= 2.625 / 2.75) * p + 0.984375);
  }), _create("BounceInOut", function (p) {
    var invert = p < 0.5;

    if (invert) {
      p = 1 - p * 2;
    } else {
      p = p * 2 - 1;
    }

    if (p < 1 / 2.75) {
      p = 7.5625 * p * p;
    } else if (p < 2 / 2.75) {
      p = 7.5625 * (p -= 1.5 / 2.75) * p + 0.75;
    } else if (p < 2.5 / 2.75) {
      p = 7.5625 * (p -= 2.25 / 2.75) * p + 0.9375;
    } else {
      p = 7.5625 * (p -= 2.625 / 2.75) * p + 0.984375;
    }

    return invert ? (1 - p) * 0.5 : p * 0.5 + 0.5;
  })); //CIRC


  _wrap("Circ", _create("CircOut", function (p) {
    return Math.sqrt(1 - (p = p - 1) * p);
  }), _create("CircIn", function (p) {
    return -(Math.sqrt(1 - p * p) - 1);
  }), _create("CircInOut", function (p) {
    return (p *= 2) < 1 ? -0.5 * (Math.sqrt(1 - p * p) - 1) : 0.5 * (Math.sqrt(1 - (p -= 2) * p) + 1);
  })); //Elastic


  _createElastic = function (n, f, def) {
    var C = _class("easing." + n, function (amplitude, period) {
      this._p1 = amplitude >= 1 ? amplitude : 1; //note: if amplitude is < 1, we simply adjust the period for a more natural feel. Otherwise the math doesn't work right and the curve starts at 1.

      this._p2 = (period || def) / (amplitude < 1 ? amplitude : 1);
      this._p3 = this._p2 / _2PI * (Math.asin(1 / this._p1) || 0);
      this._p2 = _2PI / this._p2; //precalculate to optimize
    }, true),
        p = C.prototype = new _TweenLite.Ease();

    p.constructor = C;
    p.getRatio = f;

    p.config = function (amplitude, period) {
      return new C(amplitude, period);
    };

    return C;
  };

  _wrap("Elastic", _createElastic("ElasticOut", function (p) {
    return this._p1 * Math.pow(2, -10 * p) * Math.sin((p - this._p3) * this._p2) + 1;
  }, 0.3), _createElastic("ElasticIn", function (p) {
    return -(this._p1 * Math.pow(2, 10 * (p -= 1)) * Math.sin((p - this._p3) * this._p2));
  }, 0.3), _createElastic("ElasticInOut", function (p) {
    return (p *= 2) < 1 ? -0.5 * (this._p1 * Math.pow(2, 10 * (p -= 1)) * Math.sin((p - this._p3) * this._p2)) : this._p1 * Math.pow(2, -10 * (p -= 1)) * Math.sin((p - this._p3) * this._p2) * 0.5 + 1;
  }, 0.45)); //Expo


  _wrap("Expo", _create("ExpoOut", function (p) {
    return 1 - Math.pow(2, -10 * p);
  }), _create("ExpoIn", function (p) {
    return Math.pow(2, 10 * (p - 1)) - 0.001;
  }), _create("ExpoInOut", function (p) {
    return (p *= 2) < 1 ? 0.5 * Math.pow(2, 10 * (p - 1)) : 0.5 * (2 - Math.pow(2, -10 * (p - 1)));
  })); //Sine


  _wrap("Sine", _create("SineOut", function (p) {
    return Math.sin(p * _HALF_PI);
  }), _create("SineIn", function (p) {
    return -Math.cos(p * _HALF_PI) + 1;
  }), _create("SineInOut", function (p) {
    return -0.5 * (Math.cos(Math.PI * p) - 1);
  }));

  _class("easing.EaseLookup", {
    find: function (s) {
      return _TweenLite.Ease.map[s];
    }
  }, true); //register the non-standard eases


  _easeReg(w.SlowMo, "SlowMo", "ease,");

  _easeReg(RoughEase, "RoughEase", "ease,");

  _easeReg(SteppedEase, "SteppedEase", "ease,");

  return Back;
}, true);

var Back = _TweenLite.globals.Back;
exports.Back = Back;
var Elastic = _TweenLite.globals.Elastic;
exports.Elastic = Elastic;
var Bounce = _TweenLite.globals.Bounce;
exports.Bounce = Bounce;
var RoughEase = _TweenLite.globals.RoughEase;
exports.RoughEase = RoughEase;
var SlowMo = _TweenLite.globals.SlowMo;
exports.SlowMo = SlowMo;
var SteppedEase = _TweenLite.globals.SteppedEase;
exports.SteppedEase = SteppedEase;
var Circ = _TweenLite.globals.Circ;
exports.Circ = Circ;
var Expo = _TweenLite.globals.Expo;
exports.Expo = Expo;
var Sine = _TweenLite.globals.Sine;
exports.Sine = Sine;
var ExpoScaleEase = _TweenLite.globals.ExpoScaleEase;
exports.ExpoScaleEase = ExpoScaleEase;
},{"./TweenLite.js":"node_modules/gsap/TweenLite.js"}],"node_modules/gsap/TweenMax.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
Object.defineProperty(exports, "TweenLite", {
  enumerable: true,
  get: function () {
    return _TweenLite.default;
  }
});
Object.defineProperty(exports, "TweenPlugin", {
  enumerable: true,
  get: function () {
    return _TweenLite.TweenPlugin;
  }
});
Object.defineProperty(exports, "Ease", {
  enumerable: true,
  get: function () {
    return _TweenLite.Ease;
  }
});
Object.defineProperty(exports, "Power0", {
  enumerable: true,
  get: function () {
    return _TweenLite.Power0;
  }
});
Object.defineProperty(exports, "Power1", {
  enumerable: true,
  get: function () {
    return _TweenLite.Power1;
  }
});
Object.defineProperty(exports, "Power2", {
  enumerable: true,
  get: function () {
    return _TweenLite.Power2;
  }
});
Object.defineProperty(exports, "Power3", {
  enumerable: true,
  get: function () {
    return _TweenLite.Power3;
  }
});
Object.defineProperty(exports, "Power4", {
  enumerable: true,
  get: function () {
    return _TweenLite.Power4;
  }
});
Object.defineProperty(exports, "Linear", {
  enumerable: true,
  get: function () {
    return _TweenLite.Linear;
  }
});
Object.defineProperty(exports, "CSSPlugin", {
  enumerable: true,
  get: function () {
    return _CSSPlugin.default;
  }
});
Object.defineProperty(exports, "AttrPlugin", {
  enumerable: true,
  get: function () {
    return _AttrPlugin.default;
  }
});
Object.defineProperty(exports, "RoundPropsPlugin", {
  enumerable: true,
  get: function () {
    return _RoundPropsPlugin.default;
  }
});
Object.defineProperty(exports, "DirectionalRotationPlugin", {
  enumerable: true,
  get: function () {
    return _DirectionalRotationPlugin.default;
  }
});
Object.defineProperty(exports, "TimelineLite", {
  enumerable: true,
  get: function () {
    return _TimelineLite.default;
  }
});
Object.defineProperty(exports, "TimelineMax", {
  enumerable: true,
  get: function () {
    return _TimelineMax.default;
  }
});
Object.defineProperty(exports, "BezierPlugin", {
  enumerable: true,
  get: function () {
    return _BezierPlugin.default;
  }
});
Object.defineProperty(exports, "Back", {
  enumerable: true,
  get: function () {
    return _EasePack.Back;
  }
});
Object.defineProperty(exports, "Elastic", {
  enumerable: true,
  get: function () {
    return _EasePack.Elastic;
  }
});
Object.defineProperty(exports, "Bounce", {
  enumerable: true,
  get: function () {
    return _EasePack.Bounce;
  }
});
Object.defineProperty(exports, "RoughEase", {
  enumerable: true,
  get: function () {
    return _EasePack.RoughEase;
  }
});
Object.defineProperty(exports, "SlowMo", {
  enumerable: true,
  get: function () {
    return _EasePack.SlowMo;
  }
});
Object.defineProperty(exports, "SteppedEase", {
  enumerable: true,
  get: function () {
    return _EasePack.SteppedEase;
  }
});
Object.defineProperty(exports, "Circ", {
  enumerable: true,
  get: function () {
    return _EasePack.Circ;
  }
});
Object.defineProperty(exports, "Expo", {
  enumerable: true,
  get: function () {
    return _EasePack.Expo;
  }
});
Object.defineProperty(exports, "Sine", {
  enumerable: true,
  get: function () {
    return _EasePack.Sine;
  }
});
Object.defineProperty(exports, "ExpoScaleEase", {
  enumerable: true,
  get: function () {
    return _EasePack.ExpoScaleEase;
  }
});
exports.default = exports.TweenMax = void 0;

var _TweenLite = _interopRequireWildcard(require("./TweenLite.js"));

var _TweenMaxBase = _interopRequireDefault(require("./TweenMaxBase.js"));

var _CSSPlugin = _interopRequireDefault(require("./CSSPlugin.js"));

var _AttrPlugin = _interopRequireDefault(require("./AttrPlugin.js"));

var _RoundPropsPlugin = _interopRequireDefault(require("./RoundPropsPlugin.js"));

var _DirectionalRotationPlugin = _interopRequireDefault(require("./DirectionalRotationPlugin.js"));

var _TimelineLite = _interopRequireDefault(require("./TimelineLite.js"));

var _TimelineMax = _interopRequireDefault(require("./TimelineMax.js"));

var _BezierPlugin = _interopRequireDefault(require("./BezierPlugin.js"));

var _EasePack = require("./EasePack.js");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

/*!
 * VERSION: 2.0.2
 * DATE: 2018-08-27
 * UPDATES AND DOCS AT: http://greensock.com
 *
 * @license Copyright (c) 2008-2018, GreenSock. All rights reserved.
 * This work is subject to the terms at http://greensock.com/standard-license or for
 * Club GreenSock members, the software agreement that was issued with your membership.
 * 
 * @author: Jack Doyle, jack@greensock.com
 **/
//the following two lines are designed to prevent tree shaking of the classes that were historically included with TweenMax (otherwise, folks would have to reference CSSPlugin, for example, to ensure their CSS-related animations worked)
var TweenMax = _TweenMaxBase.default;
exports.default = exports.TweenMax = TweenMax;
TweenMax._autoActivated = [_TimelineLite.default, _TimelineMax.default, _CSSPlugin.default, _AttrPlugin.default, _BezierPlugin.default, _RoundPropsPlugin.default, _DirectionalRotationPlugin.default, _EasePack.Back, _EasePack.Elastic, _EasePack.Bounce, _EasePack.RoughEase, _EasePack.SlowMo, _EasePack.SteppedEase, _EasePack.Circ, _EasePack.Expo, _EasePack.Sine, _EasePack.ExpoScaleEase];
},{"./TweenLite.js":"node_modules/gsap/TweenLite.js","./TweenMaxBase.js":"node_modules/gsap/TweenMaxBase.js","./CSSPlugin.js":"node_modules/gsap/CSSPlugin.js","./AttrPlugin.js":"node_modules/gsap/AttrPlugin.js","./RoundPropsPlugin.js":"node_modules/gsap/RoundPropsPlugin.js","./DirectionalRotationPlugin.js":"node_modules/gsap/DirectionalRotationPlugin.js","./TimelineLite.js":"node_modules/gsap/TimelineLite.js","./TimelineMax.js":"node_modules/gsap/TimelineMax.js","./BezierPlugin.js":"node_modules/gsap/BezierPlugin.js","./EasePack.js":"node_modules/gsap/EasePack.js"}],"../../../AppData/Roaming/npm/node_modules/parcel-bundler/src/builtins/bundle-url.js":[function(require,module,exports) {
var bundleURL = null;

function getBundleURLCached() {
  if (!bundleURL) {
    bundleURL = getBundleURL();
  }

  return bundleURL;
}

function getBundleURL() {
  // Attempt to find the URL of the current script and use that as the base URL
  try {
    throw new Error();
  } catch (err) {
    var matches = ('' + err.stack).match(/(https?|file|ftp):\/\/[^)\n]+/g);

    if (matches) {
      return getBaseURL(matches[0]);
    }
  }

  return '/';
}

function getBaseURL(url) {
  return ('' + url).replace(/^((?:https?|file|ftp):\/\/.+)\/[^/]+$/, '$1') + '/';
}

exports.getBundleURL = getBundleURLCached;
exports.getBaseURL = getBaseURL;
},{}],"../../../AppData/Roaming/npm/node_modules/parcel-bundler/src/builtins/css-loader.js":[function(require,module,exports) {
var bundle = require('./bundle-url');

function updateLink(link) {
  var newLink = link.cloneNode();

  newLink.onload = function () {
    link.remove();
  };

  newLink.href = link.href.split('?')[0] + '?' + Date.now();
  link.parentNode.insertBefore(newLink, link.nextSibling);
}

var cssTimeout = null;

function reloadCSS() {
  if (cssTimeout) {
    return;
  }

  cssTimeout = setTimeout(function () {
    var links = document.querySelectorAll('link[rel="stylesheet"]');

    for (var i = 0; i < links.length; i++) {
      if (bundle.getBaseURL(links[i].href) === bundle.getBundleURL()) {
        updateLink(links[i]);
      }
    }

    cssTimeout = null;
  }, 50);
}

module.exports = reloadCSS;
},{"./bundle-url":"../../../AppData/Roaming/npm/node_modules/parcel-bundler/src/builtins/bundle-url.js"}],"assets/scss/main.scss":[function(require,module,exports) {
var reloadCSS = require('_css_loader');

module.hot.dispose(reloadCSS);
module.hot.accept(reloadCSS);
},{"./..\\fonts\\Raleway-Regular.ttf":[["Raleway-Regular.7c5750c5.ttf","assets/fonts/Raleway-Regular.ttf"],"assets/fonts/Raleway-Regular.ttf"],"./..\\fonts\\Raleway-Bold.ttf":[["Raleway-Bold.6f766e30.ttf","assets/fonts/Raleway-Bold.ttf"],"assets/fonts/Raleway-Bold.ttf"],"./..\\font\\fontello.eot":[["fontello.5ba468ce.eot","assets/font/fontello.eot"],"assets/font/fontello.eot"],"./..\\font\\fontello.woff2":[["fontello.50cd5947.woff2","assets/font/fontello.woff2"],"assets/font/fontello.woff2"],"./..\\font\\fontello.woff":[["fontello.871433a6.woff","assets/font/fontello.woff"],"assets/font/fontello.woff"],"./..\\font\\fontello.ttf":[["fontello.8c712a45.ttf","assets/font/fontello.ttf"],"assets/font/fontello.ttf"],"./..\\font\\fontello.svg":[["fontello.caa62654.svg","assets/font/fontello.svg"],"assets/font/fontello.svg"],"./..\\img\\mark_icon_light.jpg":[["mark_icon_light.c6a2b715.jpg","assets/img/mark_icon_light.jpg"],"assets/img/mark_icon_light.jpg"],"./..\\img\\bullet.png":[["bullet.7fa5b3ed.png","assets/img/bullet.png"],"assets/img/bullet.png"],"_css_loader":"../../../AppData/Roaming/npm/node_modules/parcel-bundler/src/builtins/css-loader.js"}],"assets/js/scripts.js":[function(require,module,exports) {
"use strict";

require("babel-polyfill");

var _TweenMax = require("gsap/TweenMax");

require("../scss/main.scss");

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance"); }

function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }

var scrollButton = _toConsumableArray(document.querySelectorAll(".btn__scroll"));

var popupButton = _toConsumableArray(document.querySelectorAll(".btn__popup"));

var footer = document.querySelector("footer");
var flooring = document.querySelector(".flooring");
var popup = document.querySelector(".popup");
var popupClose = document.querySelector(".popup__close");
var scrollToElements = [footer, flooring]; // scrolling to

scrollButton.forEach(function (el, i) {
  el.addEventListener('click', function () {
    scrollToElements[i].scrollIntoView({
      behavior: "smooth",
      block: "start",
      inline: "nearest"
    });
  });
}); //   popup on/off

popupButton.forEach(function (el, i) {
  el.addEventListener('click', function () {
    popup.classList.add("popup--visible");
  });
});
popupClose.addEventListener('click', function () {
  popup.classList.remove("popup--visible");
}); // slider
// slider

var slider = document.querySelector(".slider");

var slides = _toConsumableArray(document.querySelectorAll('.slider__item'));

var h1 = _toConsumableArray(document.querySelectorAll('.slider__h1'));

var description = _toConsumableArray(document.querySelectorAll('.slider__description'));

var button = document.querySelector('.btn__slider'); // controls

var dots = _toConsumableArray(document.querySelectorAll('.icon-circle-empty'));

var tl = new TimelineMax({
  repeat: 123
});
var tl_text = new _TweenMax.TimelineLite({
  repeat: 123
});

function setSliderHeight() {
  var image = document.querySelector(".slider__item img").clientHeight;
  slider.style.height = "".concat(image, "px");
}

window.addEventListener('resize', setSliderHeight);
window.addEventListener('load', setSliderHeight);

_TweenMax.TweenLite.set(slides[1], {
  opacity: 0
});

tl.set(h1[1], {
  display: 'none'
}).set(description[1], {
  display: 'none'
}).set(dots[1], {
  textShadow: 'none'
}).set(dots[0], {
  textShadow: '0 0 10px black'
}).from(slides[0], 1, {
  opacity: 0
}).fromTo(h1[0], 1, {
  transform: "rotateX(-150deg)",
  transformOriginin: '20% 40%'
}, {
  transform: "rotateX(0)",
  opacity: 1,
  transformOriginin: '20% 40%',
  ease: Bounce.easeOut
}).fromTo(description[0], 3, {
  transform: "translateX(10vw)",
  opacity: 0
}, {
  transform: "translateX(0)",
  opacity: 1,
  ease: Elastic.easeOut.config(1, 0.3)
}, '-=1').fromTo(button, 3, {
  transform: "translateX(2vw)",
  opacity: 0
}, {
  transform: "translateX(0)",
  opacity: 1,
  ease: Elastic.easeOut.config(1, 0.3)
}, '-=2').set(h1[0], {
  display: 'none'
}).set(description[0], {
  display: 'none'
}).set(button, {
  visibility: 'hidden'
}).set(h1[1], {
  display: 'block'
}).set(description[1], {
  display: 'block'
}).to(slides[0], 1, {
  opacity: 1
}).to(slides[0], 1, {
  opacity: 0
}).set(dots[0], {
  textShadow: 'none'
}).set(dots[1], {
  textShadow: '0 0 10px black'
}).to(slides[1], 1, {
  opacity: 1
}).fromTo(h1[1], 1, {
  transform: "rotateX(-150deg)",
  transformOriginin: '20% 40%'
}, {
  transform: "rotateX(0)",
  opacity: 1,
  transformOriginin: '20% 40%',
  ease: Bounce.easeOut
}).fromTo(description[1], 3, {
  transform: "translateX(10vw)",
  opacity: 0
}, {
  transform: "translateX(0)",
  opacity: 1,
  ease: Elastic.easeOut.config(1, 0.3)
}, '-=1').fromTo(button, 3, {
  visibility: 'visible',
  transform: "translateX(2vw)",
  opacity: 0
}, {
  visibility: 'visible',
  transform: "translateX(0)",
  opacity: 1,
  ease: Elastic.easeOut.config(1, 0.3)
}, '-=2').to(slides[1], 1, {
  opacity: 0
}).set(h1[0], {
  display: 'block'
}).set(description[0], {
  display: 'block'
});
},{"babel-polyfill":"node_modules/babel-polyfill/lib/index.js","gsap/TweenMax":"node_modules/gsap/TweenMax.js","../scss/main.scss":"assets/scss/main.scss"}],"../../../AppData/Roaming/npm/node_modules/parcel-bundler/src/builtins/hmr-runtime.js":[function(require,module,exports) {
var global = arguments[3];
var OVERLAY_ID = '__parcel__error__overlay__';
var OldModule = module.bundle.Module;

function Module(moduleName) {
  OldModule.call(this, moduleName);
  this.hot = {
    data: module.bundle.hotData,
    _acceptCallbacks: [],
    _disposeCallbacks: [],
    accept: function (fn) {
      this._acceptCallbacks.push(fn || function () {});
    },
    dispose: function (fn) {
      this._disposeCallbacks.push(fn);
    }
  };
  module.bundle.hotData = null;
}

module.bundle.Module = Module;
var parent = module.bundle.parent;

if ((!parent || !parent.isParcelRequire) && typeof WebSocket !== 'undefined') {
  var hostname = "" || location.hostname;
  var protocol = location.protocol === 'https:' ? 'wss' : 'ws';
  var ws = new WebSocket(protocol + '://' + hostname + ':' + "65382" + '/');

  ws.onmessage = function (event) {
    var data = JSON.parse(event.data);

    if (data.type === 'update') {
      console.clear();
      data.assets.forEach(function (asset) {
        hmrApply(global.parcelRequire, asset);
      });
      data.assets.forEach(function (asset) {
        if (!asset.isNew) {
          hmrAccept(global.parcelRequire, asset.id);
        }
      });
    }

    if (data.type === 'reload') {
      ws.close();

      ws.onclose = function () {
        location.reload();
      };
    }

    if (data.type === 'error-resolved') {
      console.log('[parcel] ✨ Error resolved');
      removeErrorOverlay();
    }

    if (data.type === 'error') {
      console.error('[parcel] 🚨  ' + data.error.message + '\n' + data.error.stack);
      removeErrorOverlay();
      var overlay = createErrorOverlay(data);
      document.body.appendChild(overlay);
    }
  };
}

function removeErrorOverlay() {
  var overlay = document.getElementById(OVERLAY_ID);

  if (overlay) {
    overlay.remove();
  }
}

function createErrorOverlay(data) {
  var overlay = document.createElement('div');
  overlay.id = OVERLAY_ID; // html encode message and stack trace

  var message = document.createElement('div');
  var stackTrace = document.createElement('pre');
  message.innerText = data.error.message;
  stackTrace.innerText = data.error.stack;
  overlay.innerHTML = '<div style="background: black; font-size: 16px; color: white; position: fixed; height: 100%; width: 100%; top: 0px; left: 0px; padding: 30px; opacity: 0.85; font-family: Menlo, Consolas, monospace; z-index: 9999;">' + '<span style="background: red; padding: 2px 4px; border-radius: 2px;">ERROR</span>' + '<span style="top: 2px; margin-left: 5px; position: relative;">🚨</span>' + '<div style="font-size: 18px; font-weight: bold; margin-top: 20px;">' + message.innerHTML + '</div>' + '<pre>' + stackTrace.innerHTML + '</pre>' + '</div>';
  return overlay;
}

function getParents(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return [];
  }

  var parents = [];
  var k, d, dep;

  for (k in modules) {
    for (d in modules[k][1]) {
      dep = modules[k][1][d];

      if (dep === id || Array.isArray(dep) && dep[dep.length - 1] === id) {
        parents.push(k);
      }
    }
  }

  if (bundle.parent) {
    parents = parents.concat(getParents(bundle.parent, id));
  }

  return parents;
}

function hmrApply(bundle, asset) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (modules[asset.id] || !bundle.parent) {
    var fn = new Function('require', 'module', 'exports', asset.generated.js);
    asset.isNew = !modules[asset.id];
    modules[asset.id] = [fn, asset.deps];
  } else if (bundle.parent) {
    hmrApply(bundle.parent, asset);
  }
}

function hmrAccept(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (!modules[id] && bundle.parent) {
    return hmrAccept(bundle.parent, id);
  }

  var cached = bundle.cache[id];
  bundle.hotData = {};

  if (cached) {
    cached.hot.data = bundle.hotData;
  }

  if (cached && cached.hot && cached.hot._disposeCallbacks.length) {
    cached.hot._disposeCallbacks.forEach(function (cb) {
      cb(bundle.hotData);
    });
  }

  delete bundle.cache[id];
  bundle(id);
  cached = bundle.cache[id];

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    cached.hot._acceptCallbacks.forEach(function (cb) {
      cb();
    });

    return true;
  }

  return getParents(global.parcelRequire, id).some(function (id) {
    return hmrAccept(global.parcelRequire, id);
  });
}
},{}]},{},["../../../AppData/Roaming/npm/node_modules/parcel-bundler/src/builtins/hmr-runtime.js","assets/js/scripts.js"], null)
//# sourceMappingURL=/scripts.66fe92b2.map