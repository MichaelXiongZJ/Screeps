'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

// Transcrypt'ed from Python, 2022-12-26 17:47:53
var __name__ = 'org.transcrypt.__runtime__';

function __nest__ (headObject, tailNames, value) {
    var current = headObject;
    if (tailNames != '') {
        var tailChain = tailNames.split ('.');
        var firstNewIndex = tailChain.length;
        for (var index = 0; index < tailChain.length; index++) {
            if (!current.hasOwnProperty (tailChain [index])) {
                firstNewIndex = index;
                break;
            }
            current = current [tailChain [index]];
        }
        for (var index = firstNewIndex; index < tailChain.length; index++) {
            current [tailChain [index]] = {};
            current = current [tailChain [index]];
        }
    }
    for (let attrib of Object.getOwnPropertyNames (value)) {
        Object.defineProperty (current, attrib, {
            get () {return value [attrib];},
            enumerable: true,
            configurable: true
        });
    }
}function __get__ (self, func, quotedFuncName) {
    if (self) {
        if (self.hasOwnProperty ('__class__') || typeof self == 'string' || self instanceof String) {
            if (quotedFuncName) {
                Object.defineProperty (self, quotedFuncName, {
                    value: function () {
                        var args = [] .slice.apply (arguments);
                        return func.apply (null, [self] .concat (args));
                    },
                    writable: true,
                    enumerable: true,
                    configurable: true
                });
            }
            return function () {
                var args = [] .slice.apply (arguments);
                return func.apply (null, [self] .concat (args));
            };
        }
        else {
            return func;
        }
    }
    else {
        return func;
    }
}var py_metatype = {
    __name__: 'type',
    __bases__: [],
    __new__: function (meta, name, bases, attribs) {
        var cls = function () {
            var args = [] .slice.apply (arguments);
            return cls.__new__ (args);
        };
        for (var index = bases.length - 1; index >= 0; index--) {
            var base = bases [index];
            for (var attrib in base) {
                var descrip = Object.getOwnPropertyDescriptor (base, attrib);
                if (descrip == null) {
                    continue;
                }
                Object.defineProperty (cls, attrib, descrip);
            }
            for (let symbol of Object.getOwnPropertySymbols (base)) {
                let descrip = Object.getOwnPropertyDescriptor (base, symbol);
                Object.defineProperty (cls, symbol, descrip);
            }
        }
        cls.__metaclass__ = meta;
        cls.__name__ = name.startsWith ('py_') ? name.slice (3) : name;
        cls.__bases__ = bases;
        for (var attrib in attribs) {
            var descrip = Object.getOwnPropertyDescriptor (attribs, attrib);
            Object.defineProperty (cls, attrib, descrip);
        }
        for (let symbol of Object.getOwnPropertySymbols (attribs)) {
            let descrip = Object.getOwnPropertyDescriptor (attribs, symbol);
            Object.defineProperty (cls, symbol, descrip);
        }
        return cls;
    }
};
py_metatype.__metaclass__ = py_metatype;
var object = {
    __init__: function (self) {},
    __metaclass__: py_metatype,
    __name__: 'object',
    __bases__: [],
    __new__: function (args) {
        var instance = Object.create (this, {__class__: {value: this, enumerable: true}});
        if ('__getattr__' in this || '__setattr__' in this) {
            instance = new Proxy (instance, {
                get: function (target, name) {
                    let result = target [name];
                    if (result == undefined) {
                        return target.__getattr__ (name);
                    }
                    else {
                        return result;
                    }
                },
                set: function (target, name, value) {
                    try {
                        target.__setattr__ (name, value);
                    }
                    catch (exception) {
                        target [name] = value;
                    }
                    return true;
                }
            });
        }
        this.__init__.apply (null, [instance] .concat (args));
        return instance;
    }
};
function __class__ (name, bases, attribs, meta) {
    if (meta === undefined) {
        meta = bases [0] .__metaclass__;
    }
    return meta.__new__ (meta, name, bases, attribs);
}function __kwargtrans__ (anObject) {
    anObject.__kwargtrans__ = null;
    anObject.constructor = Object;
    return anObject;
}
function __setproperty__ (anObject, name, descriptor) {
    if (!anObject.hasOwnProperty (name)) {
        Object.defineProperty (anObject, name, descriptor);
    }
}
function __specialattrib__ (attrib) {
    return (attrib.startswith ('__') && attrib.endswith ('__')) || attrib == 'constructor' || attrib.startswith ('py_');
}function len (anObject) {
    if (anObject === undefined || anObject === null) {
        return 0;
    }
    if (anObject.__len__ instanceof Function) {
        return anObject.__len__ ();
    }
    if (anObject.length !== undefined) {
        return anObject.length;
    }
    var length = 0;
    for (var attr in anObject) {
        if (!__specialattrib__ (attr)) {
            length++;
        }
    }
    return length;
}function __t__ (target) {
    return (
        target === undefined || target === null ? false :
        ['boolean', 'number'] .indexOf (typeof target) >= 0 ? target :
        target.__bool__ instanceof Function ? (target.__bool__ () ? target : false) :
        target.__len__ instanceof Function ?  (target.__len__ () !== 0 ? target : false) :
        target instanceof Function ? target :
        len (target) !== 0 ? target :
        false
    );
}
function float (any) {
    if (any == 'inf') {
        return Infinity;
    }
    else if (any == '-inf') {
        return -Infinity;
    }
    else if (any == 'nan') {
        return NaN;
    }
    else if (isNaN (parseFloat (any))) {
        if (any === false) {
            return 0;
        }
        else if (any === true) {
            return 1;
        }
        else {
            throw ValueError ("could not convert string to float: '" + str(any) + "'", new Error ());
        }
    }
    else {
        return +any;
    }
}float.__name__ = 'float';
float.__bases__ = [object];
function int (any, radix) {
    if (any === false) {
        return 0;
    } else if (any === true) {
        return 1;
    } else {
        var number = parseInt(any, radix);
        if (isNaN (number)) {
            if (radix == undefined) {
                radix = 10;
            }
            throw ValueError('invalid literal for int() with base ' + radix + ': ' + any, new Error());
        }
        return number;
    }
}int.__name__ = 'int';
int.__bases__ = [object];
function bool (any) {
    return !!__t__ (any);
}bool.__name__ = 'bool';
bool.__bases__ = [int];
function py_typeof (anObject) {
    var aType = typeof anObject;
    if (aType == 'object') {
        try {
            return '__class__' in anObject ? anObject.__class__ : object;
        }
        catch (exception) {
            return aType;
        }
    }
    else {
        return (
            aType == 'boolean' ? bool :
            aType == 'string' ? str :
            aType == 'number' ? (anObject % 1 == 0 ? int : float) :
            null
        );
    }
}function issubclass (aClass, classinfo) {
    if (classinfo instanceof Array) {
        for (let aClass2 of classinfo) {
            if (issubclass (aClass, aClass2)) {
                return true;
            }
        }
        return false;
    }
    try {
        var aClass2 = aClass;
        if (aClass2 == classinfo) {
            return true;
        }
        else {
            var bases = [].slice.call (aClass2.__bases__);
            while (bases.length) {
                aClass2 = bases.shift ();
                if (aClass2 == classinfo) {
                    return true;
                }
                if (aClass2.__bases__.length) {
                    bases = [].slice.call (aClass2.__bases__).concat (bases);
                }
            }
            return false;
        }
    }
    catch (exception) {
        return aClass == classinfo || classinfo == object;
    }
}function isinstance (anObject, classinfo) {
    try {
        return '__class__' in anObject ? issubclass (anObject.__class__, classinfo) : issubclass (py_typeof (anObject), classinfo);
    }
    catch (exception) {
        return issubclass (py_typeof (anObject), classinfo);
    }
}function repr (anObject) {
    if (anObject == null) {
        return 'None';
    }
    switch (typeof anObject) {
        case "undefined":
            return 'None';
        case "boolean":
            if (anObject) {
                return "True"
            } else {
                return "False";
            }
        case "number":
        case "string":
        case "symbol":
            return String (anObject);
        case "function":
            try {
                return String (anObject);
            } catch (e) {
                return "<function " + anObject.name + ">"
            }
    }
    if (anObject.__repr__) {
        return anObject.__repr__ ();
    } else if (anObject.__str__) {
        return anObject.__str__ ();
    } else {
        try {
            if (anObject.constructor == Object) {
                var result = '{';
                var comma = false;
                for (var attrib in anObject) {
                    if (!__specialattrib__ (attrib)) {
                        if (attrib.isnumeric ()) {
                            var attribRepr = attrib;
                        }
                        else {
                            var attribRepr = '\'' + attrib + '\'';
                        }
                        if (comma) {
                            result += ', ';
                        }
                        else {
                            comma = true;
                        }
                        result += attribRepr + ': ' + repr (anObject [attrib]);
                    }
                }
                result += '}';
                return result;
            }
            else {
                return String(anObject);
            }
        }
        catch (exception) {
            return '<object of type: ' + typeof anObject + '>';
        }
    }
}var abs = Math.abs;
function __PyIterator__ (iterable) {
    this.iterable = iterable;
    this.index = 0;
}
__PyIterator__.prototype.__next__ = function() {
    if (this.index < this.iterable.length) {
        return this.iterable [this.index++];
    }
    else {
        throw StopIteration (new Error ());
    }
};
function __JsIterator__ (iterable) {
    this.iterable = iterable;
    this.index = 0;
}
__JsIterator__.prototype.next = function () {
    if (this.index < this.iterable.py_keys.length) {
        return {value: this.index++, done: false};
    }
    else {
        return {value: undefined, done: true};
    }
};
function list (iterable) {
    let instance = iterable ? Array.from (iterable) : [];
    return instance;
}
Array.prototype.__class__ = list;
list.__name__ = 'list';
list.__bases__ = [object];
Array.prototype.__iter__ = function () {return new __PyIterator__ (this);};
Array.prototype.__getslice__ = function (start, stop, step) {
    if (start < 0) {
        start = this.length + start;
    }
    if (stop == null) {
        stop = this.length;
    }
    else if (stop < 0) {
        stop = this.length + stop;
    }
    else if (stop > this.length) {
        stop = this.length;
    }
    if (step == 1) {
        return Array.prototype.slice.call(this, start, stop);
    }
    let result = list ([]);
    for (let index = start; index < stop; index += step) {
        result.push (this [index]);
    }
    return result;
};
Array.prototype.__setslice__ = function (start, stop, step, source) {
    if (start < 0) {
        start = this.length + start;
    }
    if (stop == null) {
        stop = this.length;
    }
    else if (stop < 0) {
        stop = this.length + stop;
    }
    if (step == null) {
        Array.prototype.splice.apply (this, [start, stop - start] .concat (source));
    }
    else {
        let sourceIndex = 0;
        for (let targetIndex = start; targetIndex < stop; targetIndex += step) {
            this [targetIndex] = source [sourceIndex++];
        }
    }
};
Array.prototype.__repr__ = function () {
    if (this.__class__ == set && !this.length) {
        return 'set()';
    }
    let result = !this.__class__ || this.__class__ == list ? '[' : this.__class__ == tuple ? '(' : '{';
    for (let index = 0; index < this.length; index++) {
        if (index) {
            result += ', ';
        }
        result += repr (this [index]);
    }
    if (this.__class__ == tuple && this.length == 1) {
        result += ',';
    }
    result += !this.__class__ || this.__class__ == list ? ']' : this.__class__ == tuple ? ')' : '}';    return result;
};
Array.prototype.__str__ = Array.prototype.__repr__;
Array.prototype.append = function (element) {
    this.push (element);
};
Array.prototype.py_clear = function () {
    this.length = 0;
};
Array.prototype.extend = function (aList) {
    this.push.apply (this, aList);
};
Array.prototype.insert = function (index, element) {
    this.splice (index, 0, element);
};
Array.prototype.remove = function (element) {
    let index = this.indexOf (element);
    if (index == -1) {
        throw ValueError ("list.remove(x): x not in list", new Error ());
    }
    this.splice (index, 1);
};
Array.prototype.index = function (element) {
    return this.indexOf (element);
};
Array.prototype.py_pop = function (index) {
    if (index == undefined) {
        return this.pop ();
    }
    else {
        return this.splice (index, 1) [0];
    }
};
Array.prototype.py_sort = function () {
    __sort__.apply  (null, [this].concat ([] .slice.apply (arguments)));
};
Array.prototype.__add__ = function (aList) {
    return list (this.concat (aList));
};
Array.prototype.__mul__ = function (scalar) {
    let result = this;
    for (let i = 1; i < scalar; i++) {
        result = result.concat (this);
    }
    return result;
};
Array.prototype.__rmul__ = Array.prototype.__mul__;
function tuple (iterable) {
    let instance = iterable ? [] .slice.apply (iterable) : [];
    instance.__class__ = tuple;
    return instance;
}
tuple.__name__ = 'tuple';
tuple.__bases__ = [object];
function set (iterable) {
    let instance = [];
    if (iterable) {
        for (let index = 0; index < iterable.length; index++) {
            instance.add (iterable [index]);
        }
    }
    instance.__class__ = set;
    return instance;
}
set.__name__ = 'set';
set.__bases__ = [object];
Array.prototype.__bindexOf__ = function (element) {
    element += '';
    let mindex = 0;
    let maxdex = this.length - 1;
    while (mindex <= maxdex) {
        let index = (mindex + maxdex) / 2 | 0;
        let middle = this [index] + '';
        if (middle < element) {
            mindex = index + 1;
        }
        else if (middle > element) {
            maxdex = index - 1;
        }
        else {
            return index;
        }
    }
    return -1;
};
Array.prototype.add = function (element) {
    if (this.indexOf (element) == -1) {
        this.push (element);
    }
};
Array.prototype.discard = function (element) {
    var index = this.indexOf (element);
    if (index != -1) {
        this.splice (index, 1);
    }
};
Array.prototype.isdisjoint = function (other) {
    this.sort ();
    for (let i = 0; i < other.length; i++) {
        if (this.__bindexOf__ (other [i]) != -1) {
            return false;
        }
    }
    return true;
};
Array.prototype.issuperset = function (other) {
    this.sort ();
    for (let i = 0; i < other.length; i++) {
        if (this.__bindexOf__ (other [i]) == -1) {
            return false;
        }
    }
    return true;
};
Array.prototype.issubset = function (other) {
    return set (other.slice ()) .issuperset (this);
};
Array.prototype.union = function (other) {
    let result = set (this.slice () .sort ());
    for (let i = 0; i < other.length; i++) {
        if (result.__bindexOf__ (other [i]) == -1) {
            result.push (other [i]);
        }
    }
    return result;
};
Array.prototype.intersection = function (other) {
    this.sort ();
    let result = set ();
    for (let i = 0; i < other.length; i++) {
        if (this.__bindexOf__ (other [i]) != -1) {
            result.push (other [i]);
        }
    }
    return result;
};
Array.prototype.difference = function (other) {
    let sother = set (other.slice () .sort ());
    let result = set ();
    for (let i = 0; i < this.length; i++) {
        if (sother.__bindexOf__ (this [i]) == -1) {
            result.push (this [i]);
        }
    }
    return result;
};
Array.prototype.symmetric_difference = function (other) {
    return this.union (other) .difference (this.intersection (other));
};
Array.prototype.py_update = function () {
    let updated = [] .concat.apply (this.slice (), arguments) .sort ();
    this.py_clear ();
    for (let i = 0; i < updated.length; i++) {
        if (updated [i] != updated [i - 1]) {
            this.push (updated [i]);
        }
    }
};
Array.prototype.__eq__ = function (other) {
    if (this.length != other.length) {
        return false;
    }
    if (this.__class__ == set) {
        this.sort ();
        other.sort ();
    }
    for (let i = 0; i < this.length; i++) {
        if (this [i] != other [i]) {
            return false;
        }
    }
    return true;
};
Array.prototype.__ne__ = function (other) {
    return !this.__eq__ (other);
};
Array.prototype.__le__ = function (other) {
    if (this.__class__ == set) {
        return this.issubset (other);
    }
    else {
        for (let i = 0; i < this.length; i++) {
            if (this [i] > other [i]) {
                return false;
            }
            else if (this [i] < other [i]) {
                return true;
            }
        }
        return true;
    }
};
Array.prototype.__ge__ = function (other) {
    if (this.__class__ == set) {
        return this.issuperset (other);
    }
    else {
        for (let i = 0; i < this.length; i++) {
            if (this [i] < other [i]) {
                return false;
            }
            else if (this [i] > other [i]) {
                return true;
            }
        }
        return true;
    }
};
Array.prototype.__lt__ = function (other) {
    return (
        this.__class__ == set ?
        this.issubset (other) && !this.issuperset (other) :
        !this.__ge__ (other)
    );
};
Array.prototype.__gt__ = function (other) {
    return (
        this.__class__ == set ?
        this.issuperset (other) && !this.issubset (other) :
        !this.__le__ (other)
    );
};
Uint8Array.prototype.__add__ = function (aBytes) {
    let result = new Uint8Array (this.length + aBytes.length);
    result.set (this);
    result.set (aBytes, this.length);
    return result;
};
Uint8Array.prototype.__mul__ = function (scalar) {
    let result = new Uint8Array (scalar * this.length);
    for (let i = 0; i < scalar; i++) {
        result.set (this, i * this.length);
    }
    return result;
};
Uint8Array.prototype.__rmul__ = Uint8Array.prototype.__mul__;
function str (stringable) {
    if (stringable === null || typeof stringable === 'undefined') {
        return 'None';
    } else if (stringable.__str__) {
        return stringable.__str__ ();
    } else {
        return repr (stringable);
    }
}String.prototype.__class__ = str;
str.__name__ = 'str';
str.__bases__ = [object];
String.prototype.__iter__ = function () {new __PyIterator__ (this);};
String.prototype.__repr__ = function () {
    return (this.indexOf ('\'') == -1 ? '\'' + this + '\'' : '"' + this + '"') .py_replace ('\t', '\\t') .py_replace ('\n', '\\n');
};
String.prototype.__str__ = function () {
    return this;
};
String.prototype.capitalize = function () {
    return this.charAt (0).toUpperCase () + this.slice (1);
};
String.prototype.endswith = function (suffix) {
    if (suffix instanceof Array) {
        for (var i=0;i<suffix.length;i++) {
            if (this.slice (-suffix[i].length) == suffix[i])
                return true;
        }
    } else
        return suffix == '' || this.slice (-suffix.length) == suffix;
    return false;
};
String.prototype.find = function (sub, start) {
    return this.indexOf (sub, start);
};
String.prototype.__getslice__ = function (start, stop, step) {
    if (start < 0) {
        start = this.length + start;
    }
    if (stop == null) {
        stop = this.length;
    }
    else if (stop < 0) {
        stop = this.length + stop;
    }
    var result = '';
    if (step == 1) {
        result = this.substring (start, stop);
    }
    else {
        for (var index = start; index < stop; index += step) {
            result = result.concat (this.charAt(index));
        }
    }
    return result;
};
__setproperty__ (String.prototype, 'format', {
    get: function () {return __get__ (this, function (self) {
        var args = tuple ([] .slice.apply (arguments).slice (1));
        var autoIndex = 0;
        return self.replace (/\{(\w*)\}/g, function (match, key) {
            if (key == '') {
                key = autoIndex++;
            }
            if (key == +key) {
                return args [key] === undefined ? match : str (args [key]);
            }
            else {
                for (var index = 0; index < args.length; index++) {
                    if (typeof args [index] == 'object' && args [index][key] !== undefined) {
                        return str (args [index][key]);
                    }
                }
                return match;
            }
        });
    });},
    enumerable: true
});
String.prototype.isalnum = function () {
    return /^[0-9a-zA-Z]{1,}$/.test(this)
};
String.prototype.isalpha = function () {
    return /^[a-zA-Z]{1,}$/.test(this)
};
String.prototype.isdecimal = function () {
    return /^[0-9]{1,}$/.test(this)
};
String.prototype.isdigit = function () {
    return this.isdecimal()
};
String.prototype.islower = function () {
    return /^[a-z]{1,}$/.test(this)
};
String.prototype.isupper = function () {
    return /^[A-Z]{1,}$/.test(this)
};
String.prototype.isspace = function () {
    return /^[\s]{1,}$/.test(this)
};
String.prototype.isnumeric = function () {
    return !isNaN (parseFloat (this)) && isFinite (this);
};
String.prototype.join = function (strings) {
    strings = Array.from (strings);
    return strings.join (this);
};
String.prototype.lower = function () {
    return this.toLowerCase ();
};
String.prototype.py_replace = function (old, aNew, maxreplace) {
    return this.split (old, maxreplace) .join (aNew);
};
String.prototype.lstrip = function () {
    return this.replace (/^\s*/g, '');
};
String.prototype.rfind = function (sub, start) {
    return this.lastIndexOf (sub, start);
};
String.prototype.rsplit = function (sep, maxsplit) {
    if (sep == undefined || sep == null) {
        sep = /\s+/;
        var stripped = this.strip ();
    }
    else {
        var stripped = this;
    }
    if (maxsplit == undefined || maxsplit == -1) {
        return stripped.split (sep);
    }
    else {
        var result = stripped.split (sep);
        if (maxsplit < result.length) {
            var maxrsplit = result.length - maxsplit;
            return [result.slice (0, maxrsplit) .join (sep)] .concat (result.slice (maxrsplit));
        }
        else {
            return result;
        }
    }
};
String.prototype.rstrip = function () {
    return this.replace (/\s*$/g, '');
};
String.prototype.py_split = function (sep, maxsplit) {
    if (sep == undefined || sep == null) {
        sep = /\s+/;
        var stripped = this.strip ();
    }
    else {
        var stripped = this;
    }
    if (maxsplit == undefined || maxsplit == -1) {
        return stripped.split (sep);
    }
    else {
        var result = stripped.split (sep);
        if (maxsplit < result.length) {
            return result.slice (0, maxsplit).concat ([result.slice (maxsplit).join (sep)]);
        }
        else {
            return result;
        }
    }
};
String.prototype.startswith = function (prefix) {
    if (prefix instanceof Array) {
        for (var i=0;i<prefix.length;i++) {
            if (this.indexOf (prefix [i]) == 0)
                return true;
        }
    } else
        return this.indexOf (prefix) == 0;
    return false;
};
String.prototype.strip = function () {
    return this.trim ();
};
String.prototype.upper = function () {
    return this.toUpperCase ();
};
String.prototype.__mul__ = function (scalar) {
    var result = '';
    for (var i = 0; i < scalar; i++) {
        result = result + this;
    }
    return result;
};
String.prototype.__rmul__ = String.prototype.__mul__;
function __contains__ (element) {
    return this.hasOwnProperty (element);
}
function __keys__ () {
    var keys = [];
    for (var attrib in this) {
        if (!__specialattrib__ (attrib)) {
            keys.push (attrib);
        }
    }
    return keys;
}
function __items__ () {
    var items = [];
    for (var attrib in this) {
        if (!__specialattrib__ (attrib)) {
            items.push ([attrib, this [attrib]]);
        }
    }
    return items;
}
function __del__ (key) {
    delete this [key];
}
function __clear__ () {
    for (var attrib in this) {
        delete this [attrib];
    }
}
function __getdefault__ (aKey, aDefault) {
    var result = this [aKey];
    if (result == undefined) {
        result = this ['py_' + aKey];
    }
    return result == undefined ? (aDefault == undefined ? null : aDefault) : result;
}
function __setdefault__ (aKey, aDefault) {
    var result = this [aKey];
    if (result != undefined) {
        return result;
    }
    var val = aDefault == undefined ? null : aDefault;
    this [aKey] = val;
    return val;
}
function __pop__ (aKey, aDefault) {
    var result = this [aKey];
    if (result != undefined) {
        delete this [aKey];
        return result;
    } else {
        if ( aDefault === undefined ) {
            throw KeyError (aKey, new Error());
        }
    }
    return aDefault;
}
function __popitem__ () {
    var aKey = Object.keys (this) [0];
    if (aKey == null) {
        throw KeyError ("popitem(): dictionary is empty", new Error ());
    }
    var result = tuple ([aKey, this [aKey]]);
    delete this [aKey];
    return result;
}
function __update__ (aDict) {
    for (var aKey in aDict) {
        this [aKey] = aDict [aKey];
    }
}
function __values__ () {
    var values = [];
    for (var attrib in this) {
        if (!__specialattrib__ (attrib)) {
            values.push (this [attrib]);
        }
    }
    return values;
}
function __dgetitem__ (aKey) {
    return this [aKey];
}
function __dsetitem__ (aKey, aValue) {
    this [aKey] = aValue;
}
function dict (objectOrPairs) {
    var instance = {};
    if (!objectOrPairs || objectOrPairs instanceof Array) {
        if (objectOrPairs) {
            for (var index = 0; index < objectOrPairs.length; index++) {
                var pair = objectOrPairs [index];
                if ( !(pair instanceof Array) || pair.length != 2) {
                    throw ValueError(
                        "dict update sequence element #" + index +
                        " has length " + pair.length +
                        "; 2 is required", new Error());
                }
                var key = pair [0];
                var val = pair [1];
                if (!(objectOrPairs instanceof Array) && objectOrPairs instanceof Object) {
                     if (!isinstance (objectOrPairs, dict)) {
                         val = dict (val);
                     }
                }
                instance [key] = val;
            }
        }
    }
    else {
        if (isinstance (objectOrPairs, dict)) {
            var aKeys = objectOrPairs.py_keys ();
            for (var index = 0; index < aKeys.length; index++ ) {
                var key = aKeys [index];
                instance [key] = objectOrPairs [key];
            }
        } else if (objectOrPairs instanceof Object) {
            instance = objectOrPairs;
        } else {
            throw ValueError ("Invalid type of object for dict creation", new Error ());
        }
    }
    __setproperty__ (instance, '__class__', {value: dict, enumerable: false, writable: true});
    __setproperty__ (instance, '__contains__', {value: __contains__, enumerable: false});
    __setproperty__ (instance, 'py_keys', {value: __keys__, enumerable: false});
    __setproperty__ (instance, '__iter__', {value: function () {new __PyIterator__ (this.py_keys ());}, enumerable: false});
    __setproperty__ (instance, Symbol.iterator, {value: function () {new __JsIterator__ (this.py_keys ());}, enumerable: false});
    __setproperty__ (instance, 'py_items', {value: __items__, enumerable: false});
    __setproperty__ (instance, 'py_del', {value: __del__, enumerable: false});
    __setproperty__ (instance, 'py_clear', {value: __clear__, enumerable: false});
    __setproperty__ (instance, 'py_get', {value: __getdefault__, enumerable: false});
    __setproperty__ (instance, 'py_setdefault', {value: __setdefault__, enumerable: false});
    __setproperty__ (instance, 'py_pop', {value: __pop__, enumerable: false});
    __setproperty__ (instance, 'py_popitem', {value: __popitem__, enumerable: false});
    __setproperty__ (instance, 'py_update', {value: __update__, enumerable: false});
    __setproperty__ (instance, 'py_values', {value: __values__, enumerable: false});
    __setproperty__ (instance, '__getitem__', {value: __dgetitem__, enumerable: false});
    __setproperty__ (instance, '__setitem__', {value: __dsetitem__, enumerable: false});
    return instance;
}
dict.__name__ = 'dict';
dict.__bases__ = [object];
function __setdoc__ (docString) {
    this.__doc__ = docString;
    return this;
}
__setproperty__ (Function.prototype, '__setdoc__', {value: __setdoc__, enumerable: false});
function __mod__ (a, b) {
    if (typeof a == 'object' && '__mod__' in a) {
        return a.__mod__ (b);
    }
    else if (typeof b == 'object' && '__rmod__' in b) {
        return b.__rmod__ (a);
    }
    else {
        return ((a % b) + b) % b;
    }
}var BaseException =  __class__ ('BaseException', [object], {
	__module__: __name__,
});
var Exception =  __class__ ('Exception', [BaseException], {
	__module__: __name__,
	get __init__ () {return __get__ (this, function (self) {
		var kwargs = {};
		if (arguments.length) {
			var __ilastarg0__ = arguments.length - 1;
			if (arguments [__ilastarg0__] && arguments [__ilastarg0__].hasOwnProperty ("__kwargtrans__")) {
				var __allkwargs0__ = arguments [__ilastarg0__--];
				for (var __attrib0__ in __allkwargs0__) {
					switch (__attrib0__) {
						case 'self': var self = __allkwargs0__ [__attrib0__]; break;
						default: kwargs [__attrib0__] = __allkwargs0__ [__attrib0__];
					}
				}
				delete kwargs.__kwargtrans__;
			}
			var args = [].slice.apply (arguments).slice (1, __ilastarg0__ + 1);
		}
		else {
			var args = [];
		}
		self.__args__ = args;
		if (kwargs.error != null) {
			self.stack = kwargs.error.stack;
		}
		else if (Error) {
			self.stack = new Error ().stack;
		}
		else {
			self.stack = 'No stack trace available';
		}
	});},
	get __repr__ () {return __get__ (this, function (self) {
		if (len (self.__args__) > 1) {
			return '{}{}'.format (self.__class__.__name__, repr (tuple (self.__args__)));
		}
		else if (len (self.__args__)) {
			return '{}({})'.format (self.__class__.__name__, repr (self.__args__[0]));
		}
		else {
			return '{}()'.format (self.__class__.__name__);
		}
	});},
	get __str__ () {return __get__ (this, function (self) {
		if (len (self.__args__) > 1) {
			return str (tuple (self.__args__));
		}
		else if (len (self.__args__)) {
			return str (self.__args__[0]);
		}
		else {
			return '';
		}
	});}
});
__class__ ('IterableError', [Exception], {
	__module__: __name__,
	get __init__ () {return __get__ (this, function (self, error) {
		Exception.__init__ (self, "Can't iterate over non-iterable", __kwargtrans__ ({error: error}));
	});}
});
var StopIteration =  __class__ ('StopIteration', [Exception], {
	__module__: __name__,
	get __init__ () {return __get__ (this, function (self, error) {
		Exception.__init__ (self, 'Iterator exhausted', __kwargtrans__ ({error: error}));
	});}
});
var ValueError =  __class__ ('ValueError', [Exception], {
	__module__: __name__,
	get __init__ () {return __get__ (this, function (self, message, error) {
		Exception.__init__ (self, message, __kwargtrans__ ({error: error}));
	});}
});
var KeyError =  __class__ ('KeyError', [Exception], {
	__module__: __name__,
	get __init__ () {return __get__ (this, function (self, message, error) {
		Exception.__init__ (self, message, __kwargtrans__ ({error: error}));
	});}
});
__class__ ('AssertionError', [Exception], {
	__module__: __name__,
	get __init__ () {return __get__ (this, function (self, message, error) {
		if (message) {
			Exception.__init__ (self, message, __kwargtrans__ ({error: error}));
		}
		else {
			Exception.__init__ (self, __kwargtrans__ ({error: error}));
		}
	});}
});
__class__ ('NotImplementedError', [Exception], {
	__module__: __name__,
	get __init__ () {return __get__ (this, function (self, message, error) {
		Exception.__init__ (self, message, __kwargtrans__ ({error: error}));
	});}
});
__class__ ('IndexError', [Exception], {
	__module__: __name__,
	get __init__ () {return __get__ (this, function (self, message, error) {
		Exception.__init__ (self, message, __kwargtrans__ ({error: error}));
	});}
});
__class__ ('AttributeError', [Exception], {
	__module__: __name__,
	get __init__ () {return __get__ (this, function (self, message, error) {
		Exception.__init__ (self, message, __kwargtrans__ ({error: error}));
	});}
});
__class__ ('py_TypeError', [Exception], {
	__module__: __name__,
	get __init__ () {return __get__ (this, function (self, message, error) {
		Exception.__init__ (self, message, __kwargtrans__ ({error: error}));
	});}
});
var Warning =  __class__ ('Warning', [Exception], {
	__module__: __name__,
});
__class__ ('UserWarning', [Warning], {
	__module__: __name__,
});
__class__ ('DeprecationWarning', [Warning], {
	__module__: __name__,
});
__class__ ('RuntimeWarning', [Warning], {
	__module__: __name__,
});
var __sort__ = function (iterable, key, reverse) {
	if (typeof key == 'undefined' || (key != null && key.hasOwnProperty ("__kwargtrans__"))) {		var key = null;
	}	if (typeof reverse == 'undefined' || (reverse != null && reverse.hasOwnProperty ("__kwargtrans__"))) {		var reverse = false;
	}	if (arguments.length) {
		var __ilastarg0__ = arguments.length - 1;
		if (arguments [__ilastarg0__] && arguments [__ilastarg0__].hasOwnProperty ("__kwargtrans__")) {
			var __allkwargs0__ = arguments [__ilastarg0__--];
			for (var __attrib0__ in __allkwargs0__) {
				switch (__attrib0__) {
					case 'iterable': var iterable = __allkwargs0__ [__attrib0__]; break;
					case 'key': var key = __allkwargs0__ [__attrib0__]; break;
					case 'reverse': var reverse = __allkwargs0__ [__attrib0__]; break;
				}
			}
		}
	}
	if (key) {
		iterable.sort ((function __lambda__ (a, b) {
			if (arguments.length) {
				var __ilastarg0__ = arguments.length - 1;
				if (arguments [__ilastarg0__] && arguments [__ilastarg0__].hasOwnProperty ("__kwargtrans__")) {
					var __allkwargs0__ = arguments [__ilastarg0__--];
					for (var __attrib0__ in __allkwargs0__) {
						switch (__attrib0__) {
							case 'a': var a = __allkwargs0__ [__attrib0__]; break;
							case 'b': var b = __allkwargs0__ [__attrib0__]; break;
						}
					}
				}
			}
			return (key (a) > key (b) ? 1 : -(1));
		}));
	}
	else {
		iterable.sort ();
	}
	if (reverse) {
		iterable.reverse ();
	}
};
var divmod = function (n, d) {
	return [Math.floor (n / d), __mod__ (n, d)];
};
var __Terminal__ =  __class__ ('__Terminal__', [object], {
	__module__: __name__,
	get print () {return __get__ (this, function (self) {
		var sep = ' ';
		if (arguments.length) {
			var __ilastarg0__ = arguments.length - 1;
			if (arguments [__ilastarg0__] && arguments [__ilastarg0__].hasOwnProperty ("__kwargtrans__")) {
				var __allkwargs0__ = arguments [__ilastarg0__--];
				for (var __attrib0__ in __allkwargs0__) {
					switch (__attrib0__) {
						case 'self': var self = __allkwargs0__ [__attrib0__]; break;
						case 'sep': var sep = __allkwargs0__ [__attrib0__]; break;
					}
				}
			}
			var args = [].slice.apply (arguments).slice (1, __ilastarg0__ + 1);
		}
		else {
			var args = [];
		}
		var length = len (args);
		if (length < 1) {
			console.log ();
		}
		else if (length == 1) {
			console.log (args[0]);
		}
		else {
			console.log (sep.join ((function () {
				var __accu0__ = [];
				for (var arg of args) {
					__accu0__.append (str (arg));
				}
				return __accu0__;
			}) ()));
		}
	});}
});
var __terminal__ = __Terminal__ ();
var print = __terminal__.print;
__terminal__.input;

// Transcrypt'ed from Python, 2022-12-26 17:47:54
var run_claimer = function (creep) {
	if (!(creep.memory.targetRoom)) {
		creep.say ('NO TARGET');
		return ;
	}
	if (creep.room.name != creep.memory.targetRoom) {
		var exits = creep.findExitTo (creep.memory.targetRoom);
		var exit = creep.pos.findClosestByRange (exits);
		if (creep.pos != exit) {
			creep.moveTo (exit);
		}
	}
	else {
		var result = creep.claimController (creep.room.controller);
		if (result == ERR_NOT_IN_RANGE) {
			creep.moveTo (creep.room.controller);
		}
		else if (result != OK) {
			creep.say (result);
		}
	}
};

var __module_claimer__ = /*#__PURE__*/Object.freeze({
    __proto__: null,
    run_claimer: run_claimer
});

// Transcrypt'ed from Python, 2022-12-26 17:47:54
var run_tower = function (tower) {
	var targets = tower.room.find (FIND_HOSTILE_CREEPS, {['filter']: (function __lambda__ (x) {
		return x.getActiveBodyparts (HEAL) != 0;
	})});
	if (targets.length > 0) {
		var closest = tower.pos.findClosestByRange (targets);
		tower.attack (closest);
		return ;
	}
	var targets = tower.room.find (FIND_HOSTILE_CREEPS, {['filter']: (function __lambda__ (x) {
		return x.getActiveBodyparts (ATTACK) != 0 || x.getActiveBodyparts (RANGED_ATTACK) != 0;
	})});
	if (targets.length > 0) {
		var closest = tower.pos.findClosestByRange (targets);
		tower.attack (closest);
		return ;
	}
	var terget_structures = tower.room.find (FIND_HOSTILE_STRUCTURES);
	if (terget_structures.length > 0) {
		var closest = tower.pos.findClosestByRange (targets);
		tower.attack (closest);
		return ;
	}
	var injured = tower.room.find (FIND_MY_CREEPS, {['filter']: (function __lambda__ (x) {
		return x.hits < x.hitsMax;
	})});
	if (injured.length > 0) {
		var closest = tower.pos.findClosestByRange (injured);
		tower.heal (closest);
		return ;
	}
	if (tower.store[RESOURCE_ENERGY] > 200) {
		var brokens = tower.room.find (FIND_STRUCTURES, {['filter']: (function __lambda__ (s) {
			return s.hits < s.hitsMax * 0.95 && s.structureType != STRUCTURE_WALL && s.structureType != STRUCTURE_RAMPART;
		})});
		if (brokens.length > 0) {
			var closest = tower.pos.findClosestByRange (brokens);
			tower.repair (closest);
			return ;
		}
		var broken_walls = tower.room.find (FIND_STRUCTURES, {['filter']: (function __lambda__ (s) {
			return s.hits < 250000 && s.structureType == STRUCTURE_WALL;
		})});
		if (broken_walls.length > 0) {
			var closest = tower.pos.findClosestByRange (broken_walls);
			tower.repair (closest);
			return ;
		}
		var broken_Ramparts = tower.room.find (FIND_STRUCTURES, {['filter']: (function __lambda__ (s) {
			return s.hits < 250000 && s.structureType == STRUCTURE_RAMPART;
		})});
		if (broken_Ramparts.length > 0) {
			var closest = tower.pos.findClosestByRange (broken_Ramparts);
			tower.repair (closest);
			return ;
		}
	}
};

var __module_tower__ = /*#__PURE__*/Object.freeze({
    __proto__: null,
    run_tower: run_tower
});

// Transcrypt'ed from Python, 2022-12-26 17:47:54
var run_upgrader = function (creep) {
	if (!(creep.memory.target)) {
		creep.memory.target = creep.room.controller.id;
	}
	var controller = Game.getObjectById (creep.memory.target);
	if (!(creep.memory.arrived)) {
		if (creep.pos.isNearTo (controller)) {
			creep.memory.arrived = true;
			creep.memory.container = creep.pos.findClosestByRange (FIND_STRUCTURES, {['filter']: (function __lambda__ (s) {
				return s.structureType == STRUCTURE_CONTAINER;
			})}).id;
		}
		else {
			creep.moveTo (controller);
		}
	}
	else {
		if (creep.carry.energy == 0) {
			creep.memory.upgrading = false;
		}
		if (creep.memory.upgrading) {
			var result = creep.upgradeController (controller);
			if (result == ERR_NOT_IN_RANGE) {
				creep.moveTo (controller);
			}
			else if (result == ERR_NOT_ENOUGH_ENERGY) {
				creep.memory.upgrading = false;
			}
			else if (result != OK) {
				creep.say (result);
			}
		}
		else {
			var container = Game.getObjectById (creep.memory.container);
			if (creep.withdraw (container, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
				creep.moveTo (container);
			}
			else {
				creep.memory.upgrading = true;
			}
		}
	}
};

var __module_upgrader__ = /*#__PURE__*/Object.freeze({
    __proto__: null,
    run_upgrader: run_upgrader
});

// Transcrypt'ed from Python, 2022-12-26 17:47:54
var upgrader$3 = {};
__nest__ (upgrader$3, '', __module_upgrader__);
var run_builder = function (creep) {
	if (creep.carry.energy > 0) {
		creep.memory.mining = false;
		if (creep.memory.to_work) {
			var target = Game.getObjectById (creep.memory.to_work);
			if (!(target)) {
				delete creep.memory.to_work;
				return ;
			}
			if (creep.pos.inRangeTo (target, 3)) {
				if (!(creep.pos.isNearTo (target))) {
					creep.moveTo (target);
				}
				if (creep.memory.isRepair) {
					if (creep.repair (target) != OK || target.hits == target.hitsMax) {
						delete creep.memory.to_work;
					}
				}
				else if (creep.build (target) != OK) {
					delete creep.memory.to_work;
				}
			}
			else {
				creep.moveTo (target);
			}
		}
		else {
			var brokens = creep.room.find (FIND_STRUCTURES, {['filter']: (function __lambda__ (s) {
				return s.hits < s.hitsMax * 0.9 && s.structureType != STRUCTURE_WALL && s.structureType != STRUCTURE_RAMPART;
			})});
			if (brokens.length > 0) {
				var broken_Spawn = brokens.filter ((function __lambda__ (s) {
					return s.structureType == STRUCTURE_SPAWN;
				}));
				if (broken_Spawn.length > 0) {
					creep.memory.to_work = broken_Spawn[0].id;
					creep.memory.isRepair = true;
					return ;
				}
				var broken_storage = brokens.filter ((function __lambda__ (s) {
					return s.structureType == STRUCTURE_STORAGE;
				}));
				if (broken_storage.length > 0) {
					var lowest = broken_storage[0].hitsMax;
					for (var storage of broken_storage) {
						if (storage.hits < lowest) {
							var lowest = storage.hits;
							creep.memory.to_work = storage.id;
						}
					}
					creep.memory.isRepair = true;
					return ;
				}
				var broken_Extension = brokens.filter ((function __lambda__ (s) {
					return s.structureType == STRUCTURE_EXTENSION;
				}));
				if (broken_Extension.length > 0) {
					var lowest = broken_Extension[0].hitsMax;
					for (var extensions of broken_Extension) {
						if (extensions.hits < lowest) {
							var lowest = extensions.hits;
							creep.memory.to_work = extensions.id;
						}
					}
					creep.memory.isRepair = true;
					return ;
				}
				var broken_tower = brokens.filter ((function __lambda__ (s) {
					return s.structureType == STRUCTURE_TOWER;
				}));
				if (broken_tower.length > 0) {
					var lowest = broken_tower[0].hitsMax;
					for (var tower of broken_tower) {
						if (tower.hits < lowest) {
							var lowest = tower.hits;
							creep.memory.to_work = tower.id;
						}
					}
					creep.memory.isRepair = true;
					return ;
				}
				var broken_Container = brokens.filter ((function __lambda__ (s) {
					return s.structureType == STRUCTURE_CONTAINER;
				}));
				if (broken_Container.length > 0) {
					var lowest = broken_Container[0].hitsMax;
					for (var container of broken_Container) {
						if (container.hits < lowest) {
							var lowest = container.hits;
							creep.memory.to_work = container.id;
						}
					}
					creep.memory.isRepair = true;
					return ;
				}
			}
			var new_sites = creep.room.find (FIND_CONSTRUCTION_SITES);
			var piority_sites = new_sites.filter ((function __lambda__ (s) {
				return s.structureType != STRUCTURE_ROAD && s.structureType != STRUCTURE_WALL && s.structureType != STRUCTURE_RAMPART;
			}));
			if (piority_sites.length > 0) {
				creep.memory.to_work = creep.pos.findClosestByPath (piority_sites).id;
				creep.memory.isRepair = false;
				return ;
			}
			if (brokens.length > 0) {
				creep.memory.to_work = creep.pos.findClosestByPath (brokens).id;
				creep.memory.isRepair = true;
				return ;
			}
			else if (new_sites.length > 0) {
				creep.memory.to_work = creep.pos.findClosestByPath (new_sites).id;
				creep.memory.isRepair = false;
				return ;
			}
			else {
				console.log (creep.name + ' has no work and is working as an upgrader');
				upgrader$3.run_upgrader (creep);
			}
		}
	}
	else if (creep.memory.mining) {
		creep.say ('emergency mining');
		var source = creep.pos.findClosestByPath (FIND_SOURCES);
		if (creep.pos.isNearTo (source)) {
			creep.harvest (source);
		}
		else {
			creep.moveTo (source);
		}
	}
	else {
		if (creep.memory.container) {
			var container = Game.getObjectById (creep.memory.container);
			if (creep.pos.isNearTo (container)) {
				creep.withdraw (container, RESOURCE_ENERGY);
				delete creep.memory.container;
				return ;
			}
			else {
				creep.moveTo (container);
			}
		}
		var storage = creep.room.storage;
		if (storage && storage.store[RESOURCE_ENERGY] > 0) {
			creep.memory.container = storage.id;
			return ;
		}
		var containers = creep.room.find (FIND_STRUCTURES, {['filter']: (function __lambda__ (s) {
			return s.structureType == STRUCTURE_CONTAINER && s.id != '639c20b142482fabeb5ead9a';
		})});
		if (containers.length > 0) {
			var max = 0;
			for (var container of containers) {
				if (container.store[RESOURCE_ENERGY] > max) {
					var max = container.store[RESOURCE_ENERGY];
					creep.memory.container = container.id;
				}
			}
		}
		else {
			creep.memory.mining = true;
		}
	}
};

var __module_builder__ = /*#__PURE__*/Object.freeze({
    __proto__: null,
    run_builder: run_builder
});

// Transcrypt'ed from Python, 2022-12-26 17:47:54
var run_hauler = function (creep) {
	if (!(creep.memory.controller_container)) {
		creep.memory.controller_container = creep.room.controller.pos.findClosestByRange (FIND_STRUCTURES, {['filter']: (function __lambda__ (s) {
			return s.structureType == STRUCTURE_CONTAINER;
		})}).id;
	}
	if (creep.store.getUsedCapacity (RESOURCE_ENERGY) == 0) {
		delete creep.memory.target;
		if (creep.memory.dropped) {
			var dropped = Game.getObjectById (creep.memory.dropped);
			var result = creep.pickup (dropped);
			if (result == ERR_NOT_IN_RANGE) {
				creep.moveTo (dropped);
				return ;
			}
			else {
				delete creep.memory.dropped;
			}
		}
		else if (creep.memory.container) {
			if (creep.withdraw (Game.getObjectById (creep.memory.container), RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
				creep.moveTo (Game.getObjectById (creep.memory.container));
				return ;
			}
			else {
				delete creep.memory.container;
			}
		}
		var dropped = creep.room.find (FIND_DROPPED_RESOURCES, {['filter']: (function __lambda__ (r) {
			return r.amount >= 20;
		})});
		if (dropped.length > 0) {
			creep.memory.dropped = creep.pos.findClosestByPath (dropped).id;
			pickup (creep);
			return ;
		}
		var tombs = creep.room.find (FIND_TOMBSTONES, {['filter']: (function __lambda__ (t) {
			return t.store.getUsedCapacity () >= 20;
		})});
		if (tombs.length > 0) {
			creep.memory.container = creep.pos.findClosestByPath (tombs).id;
			pickup (creep);
			return ;
		}
		var containers = creep.room.find (FIND_STRUCTURES, {['filter']: (function __lambda__ (s) {
			return s.structureType == STRUCTURE_CONTAINER && s.id != creep.memory.controller_container;
		})});
		var max = 0;
		for (var container of containers) {
			if (container.store[RESOURCE_ENERGY] > max) {
				var max = container.store[RESOURCE_ENERGY];
				creep.memory.container = container.id;
			}
		}
		pickup (creep);
		return ;
	}
	else {
		delete creep.memory.container;
		delete creep.memory.dropped;
		if (creep.memory.target) {
			var target = Game.getObjectById (creep.memory.target);
			if (creep.store.getUsedCapacity (RESOURCES_ALL) > creep.store.getUsedCapacity (RESOURCE_ENERGY)) {
				for (var resourceType of creep.carry) {
					var result = creep.transfer (target, resourceType);
					if (result == ERR_NOT_IN_RANGE) {
						creep.moveTo (target);
						return ;
					}
					else if (result != OK) {
						creep.say (result);
						console.log ((((((creep + "can't transfer ") + resourceType) + ' into ') + target) + ', error: ') + result);
						delete creep.memory.target;
					}
				}
			}
			else {
				do_work (creep);
			}
		}
		else {
			if (creep.store.getUsedCapacity (RESOURCES_ALL) > creep.store.getUsedCapacity (RESOURCE_ENERGY)) {
				creep.memory.target = creep.room.storage.id;
				do_work (creep);
				return ;
			}
			var targets = creep.room.find (FIND_MY_STRUCTURES, {['filter']: (function __lambda__ (s) {
				return (s.structureType == STRUCTURE_EXTENSION || s.structureType == STRUCTURE_SPAWN) && s.store[RESOURCE_ENERGY] < s.store.getCapacity (RESOURCE_ENERGY);
			})});
			if (targets.length > 0) {
				creep.memory.target = creep.pos.findClosestByPath (targets).id;
				do_work (creep);
				return ;
			}
			var towers = creep.room.find (FIND_MY_STRUCTURES, {['filter']: (function __lambda__ (s) {
				return s.structureType == STRUCTURE_TOWER && s.store[RESOURCE_ENERGY] < s.store.getCapacity (RESOURCE_ENERGY) - 100;
			})});
			if (towers.length > 0) {
				creep.memory.target = creep.pos.findClosestByPath (towers).id;
				do_work (creep);
				return ;
			}
			var controller_container = Game.getObjectById (creep.memory.controller_container);
			if (controller_container.store.getFreeCapacity (RESOURCE_ENERGY) > 0) {
				creep.memory.target = creep.memory.controller_container;
				do_work (creep);
				return ;
			}
			else {
				creep.memory.target = creep.room.storage.id;
				do_work (creep);
				return ;
			}
		}
	}
};
var do_work = function (creep) {
	var result = creep.transfer (Game.getObjectById (creep.memory.target), RESOURCE_ENERGY);
	if (result == ERR_NOT_IN_RANGE) {
		creep.moveTo (Game.getObjectById (creep.memory.target));
	}
	else {
		delete creep.memory.target;
	}
};
var pickup = function (creep) {
	if (creep.memory.dropped) {
		var dropped = Game.getObjectById (creep.memory.dropped);
		var result = creep.pickup (dropped);
		if (result == ERR_NOT_IN_RANGE) {
			creep.moveTo (dropped);
		}
		else {
			delete creep.memory.dropped;
		}
	}
	else if (creep.memory.container) {
		if (creep.withdraw (Game.getObjectById (creep.memory.container), RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
			creep.moveTo (Game.getObjectById (creep.memory.container));
		}
		else {
			delete creep.memory.container;
		}
	}
};

var __module_hauler__ = /*#__PURE__*/Object.freeze({
    __proto__: null,
    run_hauler: run_hauler,
    do_work: do_work,
    pickup: pickup
});

// Transcrypt'ed from Python, 2022-12-26 17:47:54
var pi = Math.PI;
var e = Math.E;
var exp = Math.exp;
var expm1 = function (x) {
	return Math.exp (x) - 1;
};
var log = function (x, base) {
	return (base === undefined ? Math.log (x) : Math.log (x) / Math.log (base));
};
var log1p = function (x) {
	return Math.log (x + 1);
};
var log2 = function (x) {
	return Math.log (x) / Math.LN2;
};
var log10 = function (x) {
	return Math.log (x) / Math.LN10;
};
var pow = Math.pow;
var sqrt = Math.sqrt;
var sin = Math.sin;
var cos = Math.cos;
var tan = Math.tan;
var asin = Math.asin;
var acos = Math.acos;
var atan = Math.atan;
var atan2 = Math.atan2;
var hypot = Math.hypot;
var degrees = function (x) {
	return (x * 180) / Math.PI;
};
var radians = function (x) {
	return (x * Math.PI) / 180;
};
var sinh = Math.sinh;
var cosh = Math.cosh;
var tanh = Math.tanh;
var asinh = Math.asinh;
var acosh = Math.acosh;
var atanh = Math.atanh;
var floor = Math.floor;
var ceil = Math.ceil;
var trunc = Math.trunc;
var isnan = isNaN;
var inf = Infinity;
var nan = NaN;
var modf = function (n) {
	var sign = (n >= 0 ? 1 : -(1));
	var __left0__ = divmod (abs (n), 1);
	var f = __left0__ [0];
	var mod = __left0__ [1];
	return [mod * sign, f * sign];
};

var __module_math__ = /*#__PURE__*/Object.freeze({
    __proto__: null,
    pi: pi,
    e: e,
    exp: exp,
    expm1: expm1,
    log: log,
    log1p: log1p,
    log2: log2,
    log10: log10,
    pow: pow,
    sqrt: sqrt,
    sin: sin,
    cos: cos,
    tan: tan,
    asin: asin,
    acos: acos,
    atan: atan,
    atan2: atan2,
    hypot: hypot,
    degrees: degrees,
    radians: radians,
    sinh: sinh,
    cosh: cosh,
    tanh: tanh,
    asinh: asinh,
    acosh: acosh,
    atanh: atanh,
    floor: floor,
    ceil: ceil,
    trunc: trunc,
    isnan: isnan,
    inf: inf,
    nan: nan,
    modf: modf
});

// Transcrypt'ed from Python, 2022-12-26 17:47:54
var math = {};
__nest__ (math, '', __module_math__);
var run_sucker = function (creep) {
	if (!(creep.memory.target)) {
		if (creep.room.memory.emptySource) {
			creep.memory.target = creep.room.memory.emptySource;
		}
		else {
			creep.say ('NO TARGET');
			console.log (creep + 'has no target');
		}
	}
	if (!(creep.memory.arrived)) {
		if (creep.pos.isNearTo (Game.getObjectById (creep.memory.target))) {
			creep.memory.arrived = true;
			var container = creep.pos.findClosestByRange (FIND_STRUCTURES, {['filter']: (function __lambda__ (s) {
				return s.structureType == STRUCTURE_CONTAINER;
			})});
			creep.memory.container = container.id;
		}
		else {
			creep.moveTo (Game.getObjectById (creep.memory.target));
		}
	}
	else {
		var container = Game.getObjectById (creep.memory.container);
		if (!(creep.pos.isEqualTo (container.pos))) {
			creep.moveTo (container);
		}
		else {
			creep.harvest (Game.getObjectById (creep.memory.target));
		}
	}
};

var __module_sucker__ = /*#__PURE__*/Object.freeze({
    __proto__: null,
    run_sucker: run_sucker
});

// Transcrypt'ed from Python, 2022-12-26 17:47:54
var run_harvester = function (creep) {
	if (creep.memory.filling && _.sum (creep.carry) >= creep.carryCapacity) {
		creep.memory.filling = false;
		delete creep.memory.source;
	}
	else if (!(creep.memory.filling) && creep.carry.energy <= 0) {
		creep.memory.filling = true;
		delete creep.memory.target;
	}
	if (creep.memory.filling) {
		if (creep.memory.source) {
			var source = Game.getObjectById (creep.memory.source);
		}
		else {
			var source = _.sample (creep.room.find (FIND_SOURCES));
			creep.memory.source = source.id;
		}
		if (creep.pos.isNearTo (source)) {
			var result = creep.harvest (source);
			if (result != OK) {
				print ('[{}] Unknown result from creep.harvest({}): {}'.format (creep.name, source, result));
			}
		}
		else {
			creep.moveTo (source);
		}
	}
	else {
		if (creep.memory.target) {
			var target = Game.getObjectById (creep.memory.target);
		}
		else {
			var target = _ (creep.room.find (FIND_STRUCTURES)).filter ((function __lambda__ (s) {
				return (s.structureType == STRUCTURE_SPAWN || s.structureType == STRUCTURE_EXTENSION) && s.energy < s.energyCapacity || s.structureType == STRUCTURE_CONTROLLER;
			})).sample ();
		}
		if (target.energyCapacity) {
			var is_close = creep.pos.isNearTo (target);
		}
		else {
			var is_close = creep.pos.inRangeTo (target, 3);
		}
		if (is_close) {
			if (target.energyCapacity) {
				var result = creep.transfer (target, RESOURCE_ENERGY);
				if (result == OK || result == ERR_FULL) {
					delete creep.memory.target;
				}
				else {
					print ('[{}] Unknown result from creep.transfer({}, {}): {}'.format (creep.name, target, RESOURCE_ENERGY, result));
				}
			}
			else {
				var result = creep.upgradeController (target);
				if (result != OK) {
					print ('[{}] Unknown result from creep.upgradeController({}): {}'.format (creep.name, target, result));
				}
				if (!(creep.pos.inRangeTo (target, 2))) {
					creep.moveTo (target);
				}
			}
		}
		else {
			creep.moveTo (target);
		}
	}
};

var __module_harvester__ = /*#__PURE__*/Object.freeze({
    __proto__: null,
    run_harvester: run_harvester
});

// Transcrypt'ed from Python, 2022-12-26 17:47:54
var builder$2 = {};
var claimer$2 = {};
var harvester$2 = {};
var hauler$2 = {};
var sucker$2 = {};
var tower$2 = {};
var upgrader$2 = {};
__nest__ (claimer$2, '', __module_claimer__);
__nest__ (tower$2, '', __module_tower__);
__nest__ (upgrader$2, '', __module_upgrader__);
__nest__ (builder$2, '', __module_builder__);
__nest__ (hauler$2, '', __module_hauler__);
__nest__ (sucker$2, '', __module_sucker__);
__nest__ (harvester$2, '', __module_harvester__);
var getHauler = function (level) {
	if (level == 3) {
		return [CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, MOVE, MOVE, MOVE, MOVE];
	}
	else if (level == 4) {
		return [CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE];
	}
	else if (level == 5) {
		return [CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE];
	}
	else if (level > 5) {
		return [CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE];
	}
};
var getUpgrader = function (level) {
	if (level == 3) {
		return [WORK, WORK, WORK, WORK, WORK, WORK, CARRY, MOVE];
	}
	else if (level == 4) {
		return [WORK, WORK, WORK, WORK, WORK, WORK, WORK, WORK, WORK, WORK, CARRY, MOVE];
	}
	else if (level == 5) {
		return [WORK, WORK, WORK, WORK, WORK, WORK, WORK, WORK, WORK, WORK, WORK, WORK, WORK, WORK, CARRY, MOVE];
	}
	else if (level > 5) {
		return [WORK, WORK, WORK, WORK, WORK, WORK, WORK, WORK, WORK, WORK, WORK, WORK, WORK, WORK, WORK, WORK, WORK, WORK, CARRY, MOVE];
	}
};
var getSucker = function (level) {
	return [WORK, WORK, WORK, WORK, WORK, MOVE];
};
var getBuilder = function (level) {
	if (level == 2) {
		return [WORK, WORK, CARRY, CARRY, MOVE, MOVE, MOVE, MOVE];
	}
	else if (level == 3) {
		return [WORK, WORK, WORK, WORK, CARRY, CARRY, CARRY, CARRY, MOVE, MOVE, MOVE, MOVE];
	}
	else if (level == 4) {
		return [WORK, WORK, WORK, WORK, WORK, WORK, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE];
	}
	else if (level == 5) {
		return [WORK, WORK, WORK, WORK, WORK, WORK, WORK, WORK, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE];
	}
	else if (level > 5) {
		return [WORK, WORK, WORK, WORK, WORK, WORK, WORK, WORK, WORK, WORK, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE];
	}
};
var getHarvester = function (level) {
	if (level == 1) {
		return [WORK, CARRY, MOVE, MOVE];
	}
	else if (level == 2) {
		return [WORK, WORK, CARRY, CARRY, MOVE, MOVE, MOVE, MOVE];
	}
	else if (level > 2) {
		return [WORK, WORK, WORK, WORK, CARRY, CARRY, CARRY, CARRY, MOVE, MOVE, MOVE, MOVE];
	}
};
var getClaimer = function (level) {
	return [CLAIM, MOVE];
};
var getAttacker = function (level) {
	if (level == 4) {
		return [TOUGH, TOUGH, TOUGH, TOUGH, TOUGH, MOVE, ATTACK, MOVE, ATTACK, MOVE, ATTACK, MOVE, ATTACK, MOVE, RANGED_ATTACK, MOVE, RANGED_ATTACK, RANGED_ATTACK];
	}
	else if (level == 5) {
		return [TOUGH, TOUGH, TOUGH, TOUGH, TOUGH, TOUGH, TOUGH, MOVE, ATTACK, MOVE, ATTACK, MOVE, ATTACK, MOVE, ATTACK, MOVE, ATTACK, MOVE, ATTACK, MOVE, RANGED_ATTACK, MOVE, RANGED_ATTACK, MOVE, RANGED_ATTACK, RANGED_ATTACK, ATTACK];
	}
	else if (level > 5) {
		return [TOUGH, TOUGH, TOUGH, TOUGH, TOUGH, TOUGH, TOUGH, TOUGH, TOUGH, MOVE, ATTACK, MOVE, ATTACK, MOVE, ATTACK, MOVE, ATTACK, MOVE, ATTACK, MOVE, ATTACK, MOVE, ATTACK, MOVE, ATTACK, MOVE, ATTACK, MOVE, ATTACK, MOVE, RANGED_ATTACK, MOVE, RANGED_ATTACK, RANGED_ATTACK, RANGED_ATTACK, RANGED_ATTACK];
	}
};
var get_target_population = function (level, source_count) {
	var level_one_population = dict ({['harvester']: 3});
	var level_two_population = dict ({['harvester']: 3, ['builder']: 2});
	var level_three_population = dict ({['hauler']: 4, ['sucker']: 0, ['builder']: 3, ['upgrader']: 1});
	var level_four_population = dict ({['builder']: 2, ['hauler']: 3, ['sucker']: 0, ['upgrader']: 1});
	var level_five_population = dict ({['hauler']: 2, ['sucker']: 0, ['builder']: 2, ['upgrader']: 1});
	var level_six_population = dict ({['hauler']: 2, ['sucker']: 0, ['builder']: 2, ['upgrader']: 1});
	var level_seven_population = dict ({['hauler']: 2, ['sucker']: 0, ['builder']: 2, ['upgrader']: 1});
	var level_eight_population = dict ({['hauler']: 2, ['sucker']: 0, ['builder']: 2, ['upgrader']: 1});
	if (level == 1) {
		var population = dict (level_one_population);
		return population;
	}
	else if (level == 2) {
		var population = dict (level_two_population);
		return population;
	}
	else if (level == 3) {
		var population = dict (level_three_population);
		return population;
	}
	else if (level == 4) {
		var population = dict (level_four_population);
		return population;
	}
	else if (level == 5) {
		var population = dict (level_five_population);
		return population;
	}
	else if (level == 6) {
		var population = dict (level_six_population);
		return population;
	}
	else if (level == 7) {
		var population = dict (level_seven_population);
		return population;
	}
	else if (level == 8) {
		var population = dict (level_eight_population);
		return population;
	}
};

var __module_creep_spawn_helper__ = /*#__PURE__*/Object.freeze({
    __proto__: null,
    getHauler: getHauler,
    getUpgrader: getUpgrader,
    getSucker: getSucker,
    getBuilder: getBuilder,
    getHarvester: getHarvester,
    getClaimer: getClaimer,
    getAttacker: getAttacker,
    get_target_population: get_target_population
});

// Transcrypt'ed from Python, 2022-12-26 17:47:54
var creep_spawn_helper = {};
__nest__ (creep_spawn_helper, '', __module_creep_spawn_helper__);
var run_spawn = function (spawn, dict) {
	var level = spawn.room.memory.level;
	var sources = spawn.room.find (FIND_SOURCES);
	var target_dic = creep_spawn_helper.get_target_population (level, sources.length);
	console.log ('Target population: ');
	for (var [a, b] of _.pairs (target_dic)) {
		console.log ('       ', a, ': ', b);
	}
	if (spawn.spawning) {
		console.log ('Spawning: ' + spawn.spawning.name);
		spawn.room.visual.text (spawn.spawning.name, spawn.pos.x + 1, spawn.pos.y);
	}
	else {
		var next_spawn = decide_next_creep (spawn, target_dic, dict);
		console.log ('Next spawn: ' + next_spawn);
		spawnCreep (spawn, next_spawn, level);
	}
};
var decide_next_creep = function (spawn, target_dic, cur_dic) {
	var hostiles = spawn.room.find (FIND_HOSTILE_CREEPS, {['filter']: (function __lambda__ (x) {
		return x.getActiveBodyparts (ATTACK) != 0 || x.getActiveBodyparts (RANGED_ATTACK) != 0 || x.getActiveBodyparts (HEAL) != 0;
	})});
	if (hostiles.length > 0) {
		return 'attacker';
	}
	for (var [roleType, num] of _.pairs (target_dic)) {
		if (!(roleType in cur_dic) || cur_dic[roleType] < num) {
			return roleType;
		}
	}
};
var spawnCreep = function (spawn, role, level) {
	[WORK, CARRY, MOVE, MOVE];
	if (role == 'hauler') {
		creep_spawn_helper.getHauler (level);
	}
	else if (role == 'upgrader') {
		creep_spawn_helper.getUpgrader (level);
	}
	else if (role == 'sucker') {
		creep_spawn_helper.getSucker (level);
	}
	else if (role == 'builder') {
		creep_spawn_helper.getBuilder (level);
	}
	else if (role == 'harvester') {
		creep_spawn_helper.getHarvester (level);
	}
	else if (role == 'claimer') {
		creep_spawn_helper.getClaimer (level);
	}
	else if (role == 'attacker') {
		creep_spawn_helper.getAttacker (level);
	}
	console.log ((('spawning level ' + level) + ' ') + role);
};

var __module_spawn__ = /*#__PURE__*/Object.freeze({
    __proto__: null,
    run_spawn: run_spawn,
    decide_next_creep: decide_next_creep,
    spawnCreep: spawnCreep
});

// Transcrypt'ed from Python, 2022-12-26 17:47:54
var builder$1 = {};
var claimer$1 = {};
var harvester$1 = {};
var hauler$1 = {};
var spawn$1 = {};
var sucker$1 = {};
var tower$1 = {};
var upgrader$1 = {};
__nest__ (claimer$1, '', __module_claimer__);
__nest__ (tower$1, '', __module_tower__);
__nest__ (upgrader$1, '', __module_upgrader__);
__nest__ (builder$1, '', __module_builder__);
__nest__ (hauler$1, '', __module_hauler__);
__nest__ (sucker$1, '', __module_sucker__);
__nest__ (harvester$1, '', __module_harvester__);
__nest__ (spawn$1, '', __module_spawn__);
var run_room = function (room) {
	console.log (('\nData of: ' + room) + ' <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<');
	var creep_dic = dict ({});
	console.log ('Current Population:');
	var myCreeps = room.find (FIND_MY_CREEPS);
	for (var creep of myCreeps) {
		var role = creep.memory.role;
		run_creep_by_role (creep, role);
		if ((role in creep_dic)) {
			console.log ((role + ' old') + creep_dic[role]);
		}
		else {
			console.log (role + ' new');
		}
	}
	var energyCapacity = room.energyCapacityAvailable;
	room.memory.level = determine_room_level (energyCapacity);
	console.log ((('Energy Capacity = ' + energyCapacity) + ', level: ') + room.memory.level);
	if (room.memory.level == 0) {
		return ;
	}
	check_sources (room);
	var mySpawn = room.find (FIND_MY_SPAWNS)[0];
	if (mySpawn) {
		spawn$1.run_spawn (mySpawn, creep_dic);
	}
	run_the_tower (room);
	if (room.storage) {
		var percent_usage = (room.storage.store.getUsedCapacity () / room.storage.store.getCapacity ()) * 100;
		console.log (('Storage Usage: ' + percent_usage) + '%');
	}
	else {
		console.log ('NO STORAGE');
	}
};
var check_sources = function (room) {
	var sources = room.find (FIND_SOURCES);
	for (var source of sources) {
		var result = room.find (FIND_MY_CREEPS, {['filter']: (function __lambda__ (c) {
			return c.memory.role == 'sucker' && c.memory.target == source.id;
		})});
		if (result.length > 0) {
			delete room.memory.emptySource;
		}
		else {
			room.memory.emptySource = source.id;
			console.log (('source: ' + source) + 'is an empty source');
			break;
		}
	}
};
var run_the_tower = function (room) {
	var myTowers = room.find (FIND_MY_STRUCTURES, {['filter']: (function __lambda__ (s) {
		return s.structureType == STRUCTURE_TOWER;
	})});
	if (myTowers.length > 0) {
		for (var myTower of myTowers) {
			tower$1.run_tower (myTower);
		}
	}
};
var determine_room_level = function (capacity) {
	if (capacity > 3100) {
		return 7;
	}
	else if ((3100 >= capacity && capacity > 2300)) {
		return 6;
	}
	else if ((2300 >= capacity && capacity > 1800)) {
		return 5;
	}
	else if ((1800 >= capacity && capacity > 1300)) {
		return 4;
	}
	else if ((1300 >= capacity && capacity > 800)) {
		return 3;
	}
	else if ((800 >= capacity && capacity > 550)) {
		return 2;
	}
	else if ((550 >= capacity && capacity > 300)) {
		return 1;
	}
	else {
		return 0;
	}
};
var run_creep_by_role = function (creep, role) {
	if (role == 'sucker') {
		sucker$1.run_sucker (creep);
	}
	else if (role == 'hauler') {
		hauler$1.run_hauler (creep);
	}
	else if (role == 'builder') {
		builder$1.run_builder (creep);
	}
	else if (role == 'upgrader') {
		upgrader$1.run_upgrader (creep);
	}
	else if (role == 'claimer') {
		claimer$1.run_claimer (creep);
	}
	else if (role == 'harvester') {
		harvester$1.run_harvester (creep);
	}
	else {
		harvester$1.run_harvester (creep);
		console.log (('Creep: ' + creep.name) + ' has unknown role');
	}
};

var __module_room__ = /*#__PURE__*/Object.freeze({
    __proto__: null,
    run_room: run_room,
    check_sources: check_sources,
    run_the_tower: run_the_tower,
    determine_room_level: determine_room_level,
    run_creep_by_role: run_creep_by_role
});

// Transcrypt'ed from Python, 2022-12-26 17:47:53
var builder = {};
var claimer = {};
var harvester = {};
var hauler = {};
var room = {};
var spawn = {};
var sucker = {};
var tower = {};
var upgrader = {};
__nest__ (claimer, '', __module_claimer__);
__nest__ (tower, '', __module_tower__);
__nest__ (upgrader, '', __module_upgrader__);
__nest__ (builder, '', __module_builder__);
__nest__ (hauler, '', __module_hauler__);
__nest__ (sucker, '', __module_sucker__);
__nest__ (harvester, '', __module_harvester__);
__nest__ (spawn, '', __module_spawn__);
__nest__ (room, '', __module_room__);
var ideal_sucker_count = 2;
var ideal_hauler_count = 2;
var ideal_builder_count = 1;
var ideal_upgrader_count = 1;
var main = function () {
	for (var creep of Object.keys (Memory.creeps)) {
		if (!(Game.creeps[creep])) {
			delete Memory.creeps[creep];
			console.log ('Clearing non-existing creep memory:' + creep);
		}
	}
	for (var roomHash of Object.keys (Game.rooms)) {
		var a_room = Game.rooms[roomHash];
		console.log (a_room);
		var sources = a_room.find (FIND_SOURCES);
		for (var source of sources) {
			var result = source.pos.findInRange (FIND_MY_CREEPS, 5, {['filter']: (function __lambda__ (c) {
				return c.memory.role == 'sucker';
			})});
			if (result.length > 0) {
				delete a_room.memory.emptySource;
			}
			else {
				a_room.memory.emptySource = source.id;
				console.log (source + 'has no sucker');
				break;
			}
		}
	}
	for (var name of Object.keys (Game.creeps)) {
		var creep = Game.creeps[name];
		if (!(creep.memory.role)) {
			harvester.run_harvester (creep);
		}
		else if (creep.memory.role == 'sucker') {
			sucker.run_sucker (creep);
		}
		else if (creep.memory.role == 'hauler') {
			hauler.run_hauler (creep);
		}
		else if (creep.memory.role == 'builder') {
			builder.run_builder (creep);
		}
		else if (creep.memory.role == 'upgrader') {
			upgrader.run_upgrader (creep);
		}
	}
	for (var name of Object.keys (Game.spawns)) {
		var spawn = Game.spawns[name];
		var towers = spawn.room.find (FIND_MY_STRUCTURES, {['filter']: (function __lambda__ (s) {
			return s.structureType == STRUCTURE_TOWER;
		})});
		for (var a_tower of towers) {
			tower.run_tower (a_tower);
		}
		_.sum (Game.creeps, (function __lambda__ (c) {
			return !(c.memory.role) && c.pos.roomName == spawn.pos.roomName;
		}));
		var num_sucker = _.sum (Game.creeps, (function __lambda__ (c) {
			return c.memory.role == 'sucker' && c.pos.roomName == spawn.pos.roomName;
		}));
		var num_hauler = _.sum (Game.creeps, (function __lambda__ (c) {
			return c.memory.role == 'hauler' && c.pos.roomName == spawn.pos.roomName;
		}));
		var num_builders = _.sum (Game.creeps, (function __lambda__ (c) {
			return c.memory.role == 'builder' && c.pos.roomName == spawn.pos.roomName;
		}));
		var num_upgraders = _.sum (Game.creeps, (function __lambda__ (c) {
			return c.memory.role == 'upgrader' && c.pos.roomName == spawn.pos.roomName;
		}));
		if (spawn.spawning) {
			console.log ('Spawning: ' + spawn.spawning.name);
			spawn.room.visual.text ('🛠️' + spawn.spawning.name, spawn.pos.x + 1, spawn.pos.y);
		}
		else if (num_sucker < ideal_sucker_count) {
			var name = 'sucker_' + str (Game.time);
			spawn.createCreep ([WORK, WORK, WORK, WORK, WORK, MOVE], name, {['role']: 'sucker', ['arrived']: false});
		}
		else if (num_hauler < ideal_hauler_count) {
			var name = 'hauler_' + str (Game.time);
			spawn.createCreep ([CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE], name, {['role']: 'hauler'});
		}
		else if (num_builders < ideal_builder_count) {
			var name = 'builder_' + str (Game.time);
			spawn.createCreep ([WORK, WORK, WORK, WORK, WORK, WORK, WORK, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE], name, {['role']: 'builder'});
		}
		else if (num_upgraders < ideal_upgrader_count) {
			var name = 'upgrader_' + str (Game.time);
			spawn.createCreep ([WORK, WORK, WORK, WORK, WORK, WORK, WORK, WORK, WORK, WORK, CARRY, CARRY, MOVE], name, {['role']: 'upgrader'});
		}
	}
	console.log ((('Sucker have: ' + num_sucker) + ', want: ') + ideal_sucker_count);
	console.log ((('Hauler have: ' + num_hauler) + ', want: ') + ideal_hauler_count);
	console.log ((('Builders have: ' + num_builders) + ', want: ') + ideal_builder_count);
	console.log ((('Upgraders have: ' + num_upgraders) + ', want: ') + ideal_upgrader_count);
};
module.exports.loop = main;

exports.ideal_builder_count = ideal_builder_count;
exports.ideal_hauler_count = ideal_hauler_count;
exports.ideal_sucker_count = ideal_sucker_count;
exports.ideal_upgrader_count = ideal_upgrader_count;
exports.main = main;
