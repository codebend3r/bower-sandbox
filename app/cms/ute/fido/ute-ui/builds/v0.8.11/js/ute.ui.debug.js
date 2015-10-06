(function () {

  'use strict';

  /**
   * @name ute-ui
   * @version 0.8.12-RC1
   * @namespace ute-ui
   */

  angular.module('ute.ui', [
		'pascalprecht.translate',
		'angularMoment',
		'ngCookies',
		'oc.lazyLoad',
		'ui.bootstrap',
		'ngTable'
  ]);

})();

////////////////////////////
// UTE-UI JQuery polyfill
////////////////////////////
(function () {

  'use strict';

  if (typeof $.prototype.hasAttr === 'undefined') {
    $.prototype.hasAttr = function (attrName) {
      return this.attr(attrName) !== null && this.attr(attrName) !== undefined;
    };
  }

})();
////////////////////////////
////////////////////////////
////////////////////////////

////////////////////////////
// UTE-UI JavaScript polyfill
////////////////////////////
(function () {

  'use strict';

  String.prototype.toCamelCase = function () {
    return this.replace(/^([A-Z])|\s(\w)/g, function (match, p1, p2, offset) {
      if (p2) return p2.toUpperCase();
      return p1.toLowerCase();
    }).replace(/(’|'|"|!|$|%|^|&)/g, '');
  };

})();
////////////////////////////
////////////////////////////
////////////////////////////

/*! PHP-JS | @link https://github.com/kvz/phpjs | @copyright Kevin van Zonneveld | @license MIT and GPL */
function count (mixed_var, mode) {
    // http://kevin.vanzonneveld.net
    // +   original by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
    // +      input by: Waldo Malqui Silva
    // +   bugfixed by: Soren Hansen
    // +      input by: merabi
    // +   improved by: Brett Zamir (http://brett-zamir.me)
    // +   bugfixed by: Olivier Louvignes (http://mg-crea.com/)
    // +   improved by: Obinwanne Hill on 22-03-2013 (https://about.me/obinwanne.hill)
    // +   dependencies: isArray() and isObject()
    // *     example 1: count([[0,0],[0,-4]], 'COUNT_RECURSIVE');
    // *     returns 1: 6
    // *     example 2: count({'one' : [1,2,3,4,5]}, 'COUNT_RECURSIVE');
    // *     returns 2: 6
    var key, nvld = false, cnt = 0;

    switch(true)
    {
        case (mixed_var === null || typeof mixed_var === 'undefined'):
            return 0;
            break;

        case (!isArray(mixed_var) && !isObject(mixed_var)):
            nvld = true;
            break;
    }

    switch(true)
    {
        case (mixed_var.hasOwnProperty('length')):
            return mixed_var.length;
            break;
    }

    //Return 1 if !isArray && !Object && does not have .length
    switch(true)
    {
        case (nvld):
            return 1;
            break;
    }

    switch(true)
    {
        case (mode === 'COUNT_RECURSIVE'):
            mode = 1;
            break;
    }

    switch(true)
    {
        case (mode != 1):
            mode = 0;
            break;
    }

    for (key in mixed_var) {
        switch(true)
        {
            case (mixed_var.hasOwnProperty(key)):
                cnt++;
                switch(true)
                {
                    case (mode == 1 && mixed_var[key] && (isArray(mixed_var[key]) || isObject(mixed_var[key]))):
                        cnt += this.count(mixed_var[key], 1);
                        break;
                }
                break;
        }
    }

    return cnt;
}

function in_array (needle, haystack, argStrict) {
    // http://kevin.vanzonneveld.net
    // +   original by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
    // +   improved by: vlado houba
    // +   input by: Billy
    // +   bugfixed by: Brett Zamir (http://brett-zamir.me)
    // *     example 1: in_array('van', ['Kevin', 'van', 'Zonneveld']);
    // *     returns 1: true
    // *     example 2: in_array('vlado', {0: 'Kevin', vlado: 'van', 1: 'Zonneveld'});
    // *     returns 2: false
    // *     example 3: in_array(1, ['1', '2', '3']);
    // *     returns 3: true
    // *     example 3: in_array(1, ['1', '2', '3'], false);
    // *     returns 3: true
    // *     example 4: in_array(1, ['1', '2', '3'], true);
    // *     returns 4: false
    var key = '',
        strict = !! argStrict;

    if (strict) {
        for (key in haystack) {
            if (haystack[key] === needle) {
                return true;
            }
        }
    } else {
        for (key in haystack) {
            if (haystack[key] == needle) {
                return true;
            }
        }
    }

    return false;
}

function array_search (needle, haystack, argStrict) {
    // http://kevin.vanzonneveld.net
    // +   original by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
    // +      input by: Brett Zamir (http://brett-zamir.me)
    // +   bugfixed by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
    // *     example 1: array_search('zonneveld', {firstname: 'kevin', middle: 'van', surname: 'zonneveld'});
    // *     returns 1: 'surname'
    // *     example 2: ini_set('phpjs.return_phpjs_arrays', 'on');
    // *     example 2: var ordered_arr = array({3:'value'}, {2:'value'}, {'a':'value'}, {'b':'value'});
    // *     example 2: var key = array_search(/val/g, ordered_arr); // or var key = ordered_arr.search(/val/g);
    // *     returns 2: '3'

    var strict = !!argStrict,
        key = '';

    if (haystack && typeof haystack === 'object' && haystack.change_key_case) { // Duck-type check for our own array()-created PHPJS_Array
        return haystack.search(needle, argStrict);
    }
    if (typeof needle === 'object' && needle.exec) { // Duck-type for RegExp
        if (!strict) { // Let's consider case sensitive searches as strict
            var flags = 'i' + (needle.global ? 'g' : '') +
                (needle.multiline ? 'm' : '') +
                (needle.sticky ? 'y' : ''); // sticky is FF only
            needle = new RegExp(needle.source, flags);
        }
        for (key in haystack) {
            if (needle.test(haystack[key])) {
                return key;
            }
        }
        return false;
    }

    for (key in haystack) {
        if ((strict && haystack[key] === needle) || (!strict && haystack[key] == needle)) {
            return key;
        }
    }

    return false;
}

function array_keys (input, search_value, argStrict) {
    // http://kevin.vanzonneveld.net
    // +   original by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
    // +      input by: Brett Zamir (http://brett-zamir.me)
    // +   bugfixed by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
    // +   improved by: jd
    // +   improved by: Brett Zamir (http://brett-zamir.me)
    // +   input by: P
    // +   bugfixed by: Brett Zamir (http://brett-zamir.me)
    // *     example 1: array_keys( {firstname: 'Kevin', surname: 'van Zonneveld'} );
    // *     returns 1: {0: 'firstname', 1: 'surname'}

    var search = typeof search_value !== 'undefined',
        tmp_arr = [],
        strict = !!argStrict,
        include = true,
        key = '';

    if (input && typeof input === 'object' && input.change_key_case) { // Duck-type check for our own array()-created PHPJS_Array
        return input.keys(search_value, argStrict);
    }

    for (key in input) {
        if (input.hasOwnProperty(key)) {
            include = true;
            if (search) {
                if (strict && input[key] !== search_value) {
                    include = false;
                }
                else if (input[key] != search_value) {
                    include = false;
                }
            }

            if (include) {
                tmp_arr[tmp_arr.length] = key;
            }
        }
    }

    return tmp_arr;
}

function array_values (input) {
    // http://kevin.vanzonneveld.net
    // +   original by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
    // +      improved by: Brett Zamir (http://brett-zamir.me)
    // *     example 1: array_values( {firstname: 'Kevin', surname: 'van Zonneveld'} );
    // *     returns 1: {0: 'Kevin', 1: 'van Zonneveld'}
    var tmp_arr = [],
        key = '';

    if (input && typeof input === 'object' && input.change_key_case) { // Duck-type check for our own array()-created PHPJS_Array
        return input.values();
    }

    for (key in input) {
        tmp_arr[tmp_arr.length] = input[key];
    }

    return tmp_arr;
}

function array_combine (keys, values) {
    // http://kevin.vanzonneveld.net
    // +   original by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
    // +   improved by: Brett Zamir (http://brett-zamir.me)
    // *     example 1: array_combine([0,1,2], ['kevin','van','zonneveld']);
    // *     returns 1: {0: 'kevin', 1: 'van', 2: 'zonneveld'}
    var new_array = {},
        keycount = keys && keys.length,
        i = 0;

    // input sanitation
    if (typeof keys !== 'object' || typeof values !== 'object' || // Only accept arrays or array-like objects
        typeof keycount !== 'number' || typeof values.length !== 'number' || !keycount) { // Require arrays to have a count
        return false;
    }

    // number of elements does not match
    if (keycount != values.length) {
        return false;
    }

    for (i = 0; i < keycount; i++) {
        new_array[keys[i]] = values[i];
    }

    return new_array;
}

function implode (glue, pieces) {
    // http://kevin.vanzonneveld.net
    // +   original by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
    // +   improved by: Waldo Malqui Silva
    // +   improved by: Itsacon (http://www.itsacon.net/)
    // +   bugfixed by: Brett Zamir (http://brett-zamir.me)
    // +   improved by: Obinwanne Hill (http://about.me/obinwanne.hill)
    // *     example 1: implode(' ', ['Kevin', 'van', 'Zonneveld']);
    // *     returns 1: 'Kevin van Zonneveld'
    // *     example 2: implode(' ', {first:'Kevin', last: 'van Zonneveld'});
    // *     returns 2: 'Kevin van Zonneveld'
    var myArgs = Array.prototype.slice.call(arguments),
        use_count_for_loop_bool = myArgs[2],
        i = '',
        retVal = '',
        tGlue = '';
    if (arguments.length === 1) {
        pieces = glue;
        glue = '';
    }
    if (typeof(pieces) === 'object') {
        if(use_count_for_loop_bool)
        {
            for (i = 0; i < count(pieces); i++){
                retVal += tGlue + pieces[i];
                tGlue = glue;
            }
        }
        else
        {
            for (i in pieces) {
                retVal += tGlue + pieces[i];
                tGlue = glue;
            }
        }

        return retVal;
    }
    return pieces;
}

function explode (delimiter, string, limit) {

    if ( arguments.length < 2 || typeof delimiter == 'undefined' || typeof string == 'undefined' ) return null;
    if ( delimiter === '' || delimiter === false || delimiter === null) return false;
    if ( typeof delimiter == 'function' || typeof delimiter == 'object' || typeof string == 'function' || typeof string == 'object'){
        return { 0: '' };
    }
    if ( delimiter === true ) delimiter = '1';

    // Here we go...
    delimiter += '';
    string += '';

    var s = string.split( delimiter );


    if ( typeof limit === 'undefined' ) return s;

    // Support for limit
    if ( limit === 0 ) limit = 1;

    // Positive limit
    if ( limit > 0 ){
        if ( limit >= s.length ) return s;
        return s.slice( 0, limit - 1 ).concat( [ s.slice( limit - 1 ).join( delimiter ) ] );
    }

    // Negative limit
    if ( -limit >= s.length ) return [];

    s.splice( s.length + limit );
    return s;
}

function urlencode (str) {
    // http://kevin.vanzonneveld.net
    // + original by: Philip Peterson
    // + improved by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
    // + input by: AJ
    // + improved by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
    // + improved by: Brett Zamir (http://brett-zamir.me)
    // + bugfixed by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
    // + input by: travc
    // + input by: Brett Zamir (http://brett-zamir.me)
    // + bugfixed by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
    // + improved by: Lars Fischer
    // + input by: Ratheous
    // + reimplemented by: Brett Zamir (http://brett-zamir.me)
    // + bugfixed by: Joris
    // + reimplemented by: Brett Zamir (http://brett-zamir.me)
    // % note 1: This reflects PHP 5.3/6.0+ behavior
    // % note 2: Please be aware that this function expects to encode into UTF-8 encoded strings, as found on
    // % note 2: pages served as UTF-8
    // * example 1: urlencode('Kevin van Zonneveld!');
    // * returns 1: 'Kevin+van+Zonneveld%21'
    // * example 2: urlencode('http://kevin.vanzonneveld.net/');
    // * returns 2: 'http%3A%2F%2Fkevin.vanzonneveld.net%2F'
    // * example 3: urlencode('http://www.google.nl/search?q=php.js&ie=utf-8&oe=utf-8&aq=t&rls=com.ubuntu:en-US:unofficial&client=firefox-a');
    // * returns 3: 'http%3A%2F%2Fwww.google.nl%2Fsearch%3Fq%3Dphp.js%26ie%3Dutf-8%26oe%3Dutf-8%26aq%3Dt%26rls%3Dcom.ubuntu%3Aen-US%3Aunofficial%26client%3Dfirefox-a'
    str = (str + '').toString();

    // Tilde should be allowed unescaped in future versions of PHP (as reflected below), but if you want to reflect current
    // PHP behavior, you would need to add ".replace(/~/g, '%7E');" to the following.
    return encodeURIComponent(str).replace(/!/g, '%21').replace(/'/g, '%27').replace(/\(/g, '%28').
        replace(/\)/g, '%29').replace(/\*/g, '%2A').replace(/%20/g, '+');
}

function strrpos (haystack, needle, offset) {
    // http://kevin.vanzonneveld.net
    // +   original by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
    // +   bugfixed by: Onno Marsman
    // +   input by: saulius
    // +   bugfixed by: Brett Zamir (http://brett-zamir.me)
    // *     example 1: strrpos('Kevin van Zonneveld', 'e');
    // *     returns 1: 16
    // *     example 2: strrpos('somepage.com', '.', false);
    // *     returns 2: 8
    // *     example 3: strrpos('baa', 'a', 3);
    // *     returns 3: false
    // *     example 4: strrpos('baa', 'a', 2);
    // *     returns 4: 2
    var i = -1;
    if (offset) {
        i = (haystack + '').slice(offset).lastIndexOf(needle); // strrpos' offset indicates starting point of range till end,
        // while lastIndexOf's optional 2nd argument indicates ending point of range from the beginning
        if (i !== -1) {
            i += offset;
        }
    } else {
        i = (haystack + '').lastIndexOf(needle);
    }
    return i >= 0 ? i : false;
}

function uasort (inputArr, sorter) {
    // http://kevin.vanzonneveld.net
    // +   original by: Brett Zamir (http://brett-zamir.me)
    // +   improved by: Brett Zamir (http://brett-zamir.me)
    // +   improved by: Theriault
    // %        note 1: This function deviates from PHP in returning a copy of the array instead
    // %        note 1: of acting by reference and returning true; this was necessary because
    // %        note 1: IE does not allow deleting and re-adding of properties without caching
    // %        note 1: of property position; you can set the ini of "phpjs.strictForIn" to true to
    // %        note 1: get the PHP behavior, but use this only if you are in an environment
    // %        note 1: such as Firefox extensions where for-in iteration order is fixed and true
    // %        note 1: property deletion is supported. Note that we intend to implement the PHP
    // %        note 1: behavior by default if IE ever does allow it; only gives shallow copy since
    // %        note 1: is by reference in PHP anyways
    // *     example 1: fruits = {d: 'lemon', a: 'orange', b: 'banana', c: 'apple'};
    // *     example 1: fruits = uasort(fruits, function (a, b) { if (a > b) {return 1;}if (a < b) {return -1;} return 0;});
    // *     results 1: fruits == {c: 'apple', b: 'banana', d: 'lemon', a: 'orange'}
    var valArr = [],
        tempKeyVal, tempValue, ret, k = '',
        i = 0,
        strictForIn = false,
        populateArr = {};

    if (typeof sorter === 'string') {
        sorter = this[sorter];
    } else if (Object.prototype.toString.call(sorter) === '[object Array]') {
        sorter = this[sorter[0]][sorter[1]];
    }

    // BEGIN REDUNDANT
    this.php_js = this.php_js || {};
    this.php_js.ini = this.php_js.ini || {};
    // END REDUNDANT
    strictForIn = this.php_js.ini['phpjs.strictForIn'] && this.php_js.ini['phpjs.strictForIn'].local_value && this.php_js.ini['phpjs.strictForIn'].local_value !== 'off';
    populateArr = strictForIn ? inputArr : populateArr;


    for (k in inputArr) { // Get key and value arrays
        if (inputArr.hasOwnProperty(k)) {
            valArr.push([k, inputArr[k]]);
            if (strictForIn) {
                delete inputArr[k];
            }
        }
    }
    valArr.sort(function (a, b) {
        return sorter(a[1], b[1]);
    });

    for (i = 0; i < valArr.length; i++) { // Repopulate the old array
        populateArr[valArr[i][0]] = valArr[i][1];
    }

    return strictForIn || populateArr;
}

function microtime (get_as_float) {
    // http://kevin.vanzonneveld.net
    // +   original by: Paulo Freitas
    // *     example 1: timeStamp = microtime(true);
    // *     results 1: timeStamp > 1000000000 && timeStamp < 2000000000
    var now = new Date().getTime() / 1000;
    var s = parseInt(now, 10);

    return (get_as_float) ? now : (Math.round((now - s) * 1000) / 1000) + ' ' + s;
}

/*! md5.js - MD5 Message-Digest - v2.0.0 | @copyright 1999,2002 Masanao Izumo <iz@onicos.co.jp>  */
/* md5.js - MD5 Message-Digest
 * Copyright (C) 1999,2002 Masanao Izumo <iz@onicos.co.jp>
 * Version: 2.0.0
 * LastModified: May 13 2002
 *
 * This program is free software.  You can redistribute it and/or modify
 * it without any warranty.  This library calculates the MD5 based on RFC1321.
 * See RFC1321 for more information and algorithm.
 */

/* Interface:
 * md5_hexstr = md5(data);
 */

/* ChangeLog
 * 2013/07/20: Updated by Obinwanne Ugwuh
 * 2002/05/13: Version 2.0.0 released
 * NOTICE: API is changed.
 * 2002/04/15: Bug fix about MD5 length.
 */
(function() {
    var MD5_T = new Array(0x00000000, 0xd76aa478, 0xe8c7b756, 0x242070db, 0xc1bdceee, 0xf57c0faf, 0x4787c62a, 0xa8304613, 0xfd469501, 0x698098d8, 0x8b44f7af, 0xffff5bb1, 0x895cd7be, 0x6b901122, 0xfd987193, 0xa679438e, 0x49b40821, 0xf61e2562, 0xc040b340, 0x265e5a51, 0xe9b6c7aa, 0xd62f105d, 0x02441453, 0xd8a1e681, 0xe7d3fbc8, 0x21e1cde6, 0xc33707d6, 0xf4d50d87, 0x455a14ed, 0xa9e3e905, 0xfcefa3f8, 0x676f02d9, 0x8d2a4c8a, 0xfffa3942, 0x8771f681, 0x6d9d6122, 0xfde5380c, 0xa4beea44, 0x4bdecfa9, 0xf6bb4b60, 0xbebfbc70, 0x289b7ec6, 0xeaa127fa, 0xd4ef3085, 0x04881d05, 0xd9d4d039, 0xe6db99e5, 0x1fa27cf8, 0xc4ac5665, 0xf4292244, 0x432aff97, 0xab9423a7, 0xfc93a039, 0x655b59c3, 0x8f0ccc92, 0xffeff47d, 0x85845dd1, 0x6fa87e4f, 0xfe2ce6e0, 0xa3014314, 0x4e0811a1, 0xf7537e82, 0xbd3af235, 0x2ad7d2bb, 0xeb86d391);

    var MD5_round1 = new Array(new Array(0, 7, 1), new Array(1, 12, 2), new Array(2, 17, 3), new Array(3, 22, 4), new Array(4, 7, 5), new Array(5, 12, 6), new Array(6, 17, 7), new Array(7, 22, 8), new Array(8, 7, 9), new Array(9, 12, 10), new Array(10, 17, 11), new Array(11, 22, 12), new Array(12, 7, 13), new Array(13, 12, 14), new Array(14, 17, 15), new Array(15, 22, 16));

    var MD5_round2 = new Array(new Array(1, 5, 17), new Array(6, 9, 18), new Array(11, 14, 19), new Array(0, 20, 20), new Array(5, 5, 21), new Array(10, 9, 22), new Array(15, 14, 23), new Array(4, 20, 24), new Array(9, 5, 25), new Array(14, 9, 26), new Array(3, 14, 27), new Array(8, 20, 28), new Array(13, 5, 29), new Array(2, 9, 30), new Array(7, 14, 31), new Array(12, 20, 32));

    var MD5_round3 = new Array(new Array(5, 4, 33), new Array(8, 11, 34), new Array(11, 16, 35), new Array(14, 23, 36), new Array(1, 4, 37), new Array(4, 11, 38), new Array(7, 16, 39), new Array(10, 23, 40), new Array(13, 4, 41), new Array(0, 11, 42), new Array(3, 16, 43), new Array(6, 23, 44), new Array(9, 4, 45), new Array(12, 11, 46), new Array(15, 16, 47), new Array(2, 23, 48));

    var MD5_round4 = new Array(new Array(0, 6, 49), new Array(7, 10, 50), new Array(14, 15, 51), new Array(5, 21, 52), new Array(12, 6, 53), new Array(3, 10, 54), new Array(10, 15, 55), new Array(1, 21, 56), new Array(8, 6, 57), new Array(15, 10, 58), new Array(6, 15, 59), new Array(13, 21, 60), new Array(4, 6, 61), new Array(11, 10, 62), new Array(2, 15, 63), new Array(9, 21, 64));

    function MD5_F(x, y, z) {
        return (x & y) | (~x & z);
    }

    function MD5_G(x, y, z) {
        return (x & z) | (y & ~z);
    }

    function MD5_H(x, y, z) {
        return x ^ y ^ z;
    }

    function MD5_I(x, y, z) {
        return y ^ (x | ~z);
    }

    var MD5_round = new Array(new Array(MD5_F, MD5_round1), new Array(MD5_G, MD5_round2), new Array(MD5_H, MD5_round3), new Array(MD5_I, MD5_round4));

    function MD5_pack(n32) {
        return String.fromCharCode(n32 & 0xff) + String.fromCharCode((n32 >>> 8) & 0xff) + String.fromCharCode((n32 >>> 16) & 0xff) + String.fromCharCode((n32 >>> 24) & 0xff);
    }

    function MD5_unpack(s4) {
        return s4.charCodeAt(0) | (s4.charCodeAt(1) << 8) | (s4.charCodeAt(2) << 16) | (s4.charCodeAt(3) << 24);
    }

    function MD5_number(n) {
        while (n < 0)
            n += 4294967296;
        while (n > 4294967295)
            n -= 4294967296;
        return n;
    }

    function MD5_apply_round(x, s, f, abcd, r) {
        var a, b, c, d;
        var kk, ss, ii;
        var t, u;

        a = abcd[0];
        b = abcd[1];
        c = abcd[2];
        d = abcd[3];
        kk = r[0];
        ss = r[1];
        ii = r[2];

        u = f(s[b], s[c], s[d]);
        t = s[a] + u + x[kk] + MD5_T[ii];
        t = MD5_number(t);
        t = ((t << ss) | (t >>> (32 - ss)));
        t += s[b];
        s[a] = MD5_number(t);
    }

    function utf8_encode(s)
    {
        for(var c, i = -1, l = (s = s.split("")).length, o = String.fromCharCode; ++i < l;
            s[i] = (c = s[i].charCodeAt(0)) >= 127 ? o(0xc0 | (c >>> 6)) + o(0x80 | (c & 0x3f)) : s[i]
            );
        return s.join("");
    }

    function MD5_hash(data) {
        var abcd, x, state, s;
        var len, index, padLen, f, r;
        var i, j, k;
        var tmp;

        if (/[\x80-\xFF]/.test(data)) {
            data = utf8_encode(data);

        }

        state = new Array(0x67452301, 0xefcdab89, 0x98badcfe, 0x10325476);
        len = data.length;
        index = len & 0x3f;
        padLen = (index < 56) ? (56 - index) : (120 - index);
        if (padLen > 0) {
            data += "\x80";
            for (i = 0; i < padLen - 1; i++)
                data += "\x00";
        }
        data += MD5_pack(len * 8);
        data += MD5_pack(0);
        len += padLen + 8;
        abcd = new Array(0, 1, 2, 3);
        x = new Array(16);
        s = new Array(4);

        for (k = 0; k < len; k += 64) {
            for (i = 0, j = k; i < 16; i++, j += 4) {
                x[i] = data.charCodeAt(j) | (data.charCodeAt(j + 1) << 8) | (data.charCodeAt(j + 2) << 16) | (data.charCodeAt(j + 3) << 24);
            }
            for (i = 0; i < 4; i++)
                s[i] = state[i];
            for (i = 0; i < 4; i++) {
                f = MD5_round[i][0];
                r = MD5_round[i][1];
                for (j = 0; j < 16; j++) {
                    MD5_apply_round(x, s, f, abcd, r[j]);
                    tmp = abcd[0];
                    abcd[0] = abcd[3];
                    abcd[3] = abcd[2];
                    abcd[2] = abcd[1];
                    abcd[1] = tmp;
                }
            }

            for (i = 0; i < 4; i++) {
                state[i] += s[i];
                state[i] = MD5_number(state[i]);
            }
        }

        return MD5_pack(state[0]) + MD5_pack(state[1]) + MD5_pack(state[2]) + MD5_pack(state[3]);
    }

    function MD5_hexhash(data) {
        var i, out, c;
        var bit128;

        bit128 = MD5_hash(data);
        out = "";
        for (i = 0; i < 16; i++) {
            c = bit128.charCodeAt(i);
            out += "0123456789abcdef".charAt((c >> 4) & 0xf);
            out += "0123456789abcdef".charAt(c & 0xf);
        }
        return out;
    }

    md5 = function (s) {
        return MD5_hexhash(s);
    }
})();

/*! json2.js | @link https://github.com/douglascrockford/JSON-js | @copyright Douglas Crockford <douglas@crockford.com> */

// Create a JSON object only if one does not already exist. We create the
// methods in a closure to avoid creating global variables.

if (typeof JSON !== 'object') {
    JSON = {};
}

(function () {
    'use strict';

    function f(n) {
        // Format integers to have at least two digits.
        return n < 10 ? '0' + n : n;
    }

    if (typeof Date.prototype.toJSON !== 'function') {

        Date.prototype.toJSON = function () {

            return isFinite(this.valueOf())
                ? this.getUTCFullYear()     + '-' +
                f(this.getUTCMonth() + 1) + '-' +
                f(this.getUTCDate())      + 'T' +
                f(this.getUTCHours())     + ':' +
                f(this.getUTCMinutes())   + ':' +
                f(this.getUTCSeconds())   + 'Z'
                : null;
        };

        String.prototype.toJSON      =
            Number.prototype.toJSON  =
                Boolean.prototype.toJSON = function () {
                    return this.valueOf();
                };
    }

    var cx = /[\u0000\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g,
        escapable = /[\\\"\x00-\x1f\x7f-\x9f\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g,
        gap,
        indent,
        meta = {    // table of character substitutions
            '\b': '\\b',
            '\t': '\\t',
            '\n': '\\n',
            '\f': '\\f',
            '\r': '\\r',
            '"' : '\\"',
            '\\': '\\\\'
        },
        rep;


    function quote(string) {

// If the string contains no control characters, no quote characters, and no
// backslash characters, then we can safely slap some quotes around it.
// Otherwise we must also replace the offending characters with safe escape
// sequences.

        escapable.lastIndex = 0;
        return escapable.test(string) ? '"' + string.replace(escapable, function (a) {
            var c = meta[a];
            return typeof c === 'string'
                ? c
                : '\\u' + ('0000' + a.charCodeAt(0).toString(16)).slice(-4);
        }) + '"' : '"' + string + '"';
    }


    function str(key, holder) {

// Produce a string from holder[key].

        var i,          // The loop counter.
            k,          // The member key.
            v,          // The member value.
            length,
            mind = gap,
            partial,
            value = holder[key];

// If the value has a toJSON method, call it to obtain a replacement value.

        if (value && typeof value === 'object' &&
            typeof value.toJSON === 'function') {
            value = value.toJSON(key);
        }

// If we were called with a replacer function, then call the replacer to
// obtain a replacement value.

        if (typeof rep === 'function') {
            value = rep.call(holder, key, value);
        }

// What happens next depends on the value's type.

        switch (typeof value) {
            case 'string':
                return quote(value);

            case 'number':

// JSON numbers must be finite. Encode non-finite numbers as null.

                return isFinite(value) ? String(value) : 'null';

            case 'boolean':
            case 'null':

// If the value is a boolean or null, convert it to a string. Note:
// typeof null does not produce 'null'. The case is included here in
// the remote chance that this gets fixed someday.

                return String(value);

// If the type is 'object', we might be dealing with an object or an array or
// null.

            case 'object':

// Due to a specification blunder in ECMAScript, typeof null is 'object',
// so watch out for that case.

                if (!value) {
                    return 'null';
                }

// Make an array to hold the partial results of stringifying this object value.

                gap += indent;
                partial = [];

// Is the value an array?

                if (Object.prototype.toString.apply(value) === '[object Array]') {

// The value is an array. Stringify every element. Use null as a placeholder
// for non-JSON values.

                    length = value.length;
                    for (i = 0; i < length; i += 1) {
                        partial[i] = str(i, value) || 'null';
                    }

// Join all of the elements together, separated with commas, and wrap them in
// brackets.

                    v = partial.length === 0
                        ? '[]'
                        : gap
                        ? '[\n' + gap + partial.join(',\n' + gap) + '\n' + mind + ']'
                        : '[' + partial.join(',') + ']';
                    gap = mind;
                    return v;
                }

// If the replacer is an array, use it to select the members to be stringified.

                if (rep && typeof rep === 'object') {
                    length = rep.length;
                    for (i = 0; i < length; i += 1) {
                        if (typeof rep[i] === 'string') {
                            k = rep[i];
                            v = str(k, value);
                            if (v) {
                                partial.push(quote(k) + (gap ? ': ' : ':') + v);
                            }
                        }
                    }
                } else {

// Otherwise, iterate through all of the keys in the object.

                    for (k in value) {
                        if (Object.prototype.hasOwnProperty.call(value, k)) {
                            v = str(k, value);
                            if (v) {
                                partial.push(quote(k) + (gap ? ': ' : ':') + v);
                            }
                        }
                    }
                }

// Join all of the member texts together, separated with commas,
// and wrap them in braces.

                v = partial.length === 0
                    ? '{}'
                    : gap
                    ? '{\n' + gap + partial.join(',\n' + gap) + '\n' + mind + '}'
                    : '{' + partial.join(',') + '}';
                gap = mind;
                return v;
        }
    }

// If the JSON object does not yet have a stringify method, give it one.

    if (typeof JSON.stringify !== 'function') {
        JSON.stringify = function (value, replacer, space) {

// The stringify method takes a value and an optional replacer, and an optional
// space parameter, and returns a JSON text. The replacer can be a function
// that can replace values, or an array of strings that will select the keys.
// A default replacer method can be provided. Use of the space parameter can
// produce text that is more easily readable.

            var i;
            gap = '';
            indent = '';

// If the space parameter is a number, make an indent string containing that
// many spaces.

            if (typeof space === 'number') {
                for (i = 0; i < space; i += 1) {
                    indent += ' ';
                }

// If the space parameter is a string, it will be used as the indent string.

            } else if (typeof space === 'string') {
                indent = space;
            }

// If there is a replacer, it must be a function or an array.
// Otherwise, throw an error.

            rep = replacer;
            if (replacer && typeof replacer !== 'function' &&
                (typeof replacer !== 'object' ||
                    typeof replacer.length !== 'number')) {
                throw new Error('JSON.stringify');
            }

// Make a fake root object containing our value under the key of ''.
// Return the result of stringifying the value.

            return str('', {'': value});
        };
    }


// If the JSON object does not yet have a parse method, give it one.

    if (typeof JSON.parse !== 'function') {
        JSON.parse = function (text, reviver) {

// The parse method takes a text and an optional reviver function, and returns
// a JavaScript value if the text is a valid JSON text.

            var j;

            function walk(holder, key) {

// The walk method is used to recursively walk the resulting structure so
// that modifications can be made.

                var k, v, value = holder[key];
                if (value && typeof value === 'object') {
                    for (k in value) {
                        if (Object.prototype.hasOwnProperty.call(value, k)) {
                            v = walk(value, k);
                            if (v !== undefined) {
                                value[k] = v;
                            } else {
                                delete value[k];
                            }
                        }
                    }
                }
                return reviver.call(holder, key, value);
            }


// Parsing happens in four stages. In the first stage, we replace certain
// Unicode characters with escape sequences. JavaScript handles many characters
// incorrectly, either silently deleting them, or treating them as line endings.

            text = String(text);
            cx.lastIndex = 0;
            if (cx.test(text)) {
                text = text.replace(cx, function (a) {
                    return '\\u' +
                        ('0000' + a.charCodeAt(0).toString(16)).slice(-4);
                });
            }

// In the second stage, we run the text against regular expressions that look
// for non-JSON patterns. We are especially concerned with '()' and 'new'
// because they can cause invocation, and '=' because it can cause mutation.
// But just to be safe, we want to reject all unexpected forms.

// We split the second stage into 4 regexp operations in order to work around
// crippling inefficiencies in IE's and Safari's regexp engines. First we
// replace the JSON backslash pairs with '@' (a non-JSON character). Second, we
// replace all simple value tokens with ']' characters. Third, we delete all
// open brackets that follow a colon or comma or that begin the text. Finally,
// we look to see that the remaining characters are only whitespace or ']' or
// ',' or ':' or '{' or '}'. If that is so, then the text is safe for eval.

            if (/^[\],:{}\s]*$/
                .test(text.replace(/\\(?:["\\\/bfnrt]|u[0-9a-fA-F]{4})/g, '@')
                .replace(/"[^"\\\n\r]*"|true|false|null|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?/g, ']')
                .replace(/(?:^|:|,)(?:\s*\[)+/g, ''))) {

// In the third stage we use the eval function to compile the text into a
// JavaScript structure. The '{' operator is subject to a syntactic ambiguity
// in JavaScript: it can begin a block or an object literal. We wrap the text
// in parens to eliminate the ambiguity.

                j = eval('(' + text + ')');

// In the optional fourth stage, we recursively walk the new structure, passing
// each name/value pair to a reviver function for possible transformation.

                return typeof reviver === 'function'
                    ? walk({'': j}, '')
                    : j;
            }

// If the text is not JSON parseable, then a SyntaxError is thrown.

            throw new SyntaxError('JSON.parse');
        };
    }
}());

/*! AmplifyJS-Store - v1.1.0 | @link http://amplifyjs.com/api/store/ | @copyright 2012 AppendTo <http://appendto.com/contact> | @license MIT and GPL V2 */
(function( amplify, undefined ) {

    var store = amplify.store = function( key, value, options ) {
        var type = store.type;
        if ( options && options.type && options.type in store.types ) {
            type = options.type;
        }
        return store.types[ type ]( key, value, options || {} );
    };

    store.types = {};
    store.type = null;
    store.addType = function( type, storage ) {
        if ( !store.type ) {
            store.type = type;
        }

        store.types[ type ] = storage;
        store[ type ] = function( key, value, options ) {
            options = options || {};
            options.type = type;
            return store( key, value, options );
        };
    };
    store.error = function() {
        return "amplify.store quota exceeded";
    };

    var rprefix = /^__amplify__/;
    function createFromStorageInterface( storageType, storage ) {
        store.addType( storageType, function( key, value, options ) {
            var storedValue, parsed, i, remove,
                ret = value,
                now = (new Date()).getTime();

            if ( !key ) {
                ret = {};
                remove = [];
                i = 0;
                try {
                    // accessing the length property works around a localStorage bug
                    // in Firefox 4.0 where the keys don't update cross-page
                    // we assign to key just to avoid Closure Compiler from removing
                    // the access as "useless code"
                    // https://bugzilla.mozilla.org/show_bug.cgi?id=662511
                    key = storage.length;

                    while ( key = storage.key( i++ ) ) {
                        if ( rprefix.test( key ) ) {
                            parsed = JSON.parse( storage.getItem( key ) );
                            if ( parsed.expires && parsed.expires <= now ) {
                                remove.push( key );
                            } else {
                                ret[ key.replace( rprefix, "" ) ] = parsed.data;
                            }
                        }
                    }
                    while ( key = remove.pop() ) {
                        storage.removeItem( key );
                    }
                } catch ( error ) {}
                return ret;
            }

            // protect against name collisions with direct storage
            key = "__amplify__" + key;

            if ( value === undefined ) {
                storedValue = storage.getItem( key );
                parsed = storedValue ? JSON.parse( storedValue ) : { expires: -1 };
                if ( parsed.expires && parsed.expires <= now ) {
                    storage.removeItem( key );
                } else {
                    return parsed.data;
                }
            } else {
                if ( value === null ) {
                    storage.removeItem( key );
                } else {
                    parsed = JSON.stringify({
                        data: value,
                        expires: options.expires ? now + options.expires : null
                    });
                    try {
                        storage.setItem( key, parsed );
                        // quota exceeded
                    } catch( error ) {
                        // expire old data and try again
                        store[ storageType ]();
                        try {
                            storage.setItem( key, parsed );
                        } catch( error ) {
                            throw store.error();
                        }
                    }
                }
            }

            return ret;
        });
    }

// localStorage + sessionStorage
// IE 8+, Firefox 3.5+, Safari 4+, Chrome 4+, Opera 10.5+, iPhone 2+, Android 2+
    for ( var webStorageType in { localStorage: 1, sessionStorage: 1 } ) {
        // try/catch for file protocol in Firefox and Private Browsing in Safari 5
        try {
            // Safari 5 in Private Browsing mode exposes localStorage
            // but doesn't allow storing data, so we attempt to store and remove an item.
            // This will unfortunately give us a false negative if we're at the limit.
            window[ webStorageType ].setItem( "__amplify__", "x" );
            window[ webStorageType ].removeItem( "__amplify__" );
            createFromStorageInterface( webStorageType, window[ webStorageType ] );
        } catch( e ) {}
    }

// globalStorage
// non-standard: Firefox 2+
// https://developer.mozilla.org/en/dom/storage#globalStorage
    if ( !store.types.localStorage && window.globalStorage ) {
        // try/catch for file protocol in Firefox
        try {
            createFromStorageInterface( "globalStorage",
                window.globalStorage[ window.location.hostname ] );
            // Firefox 2.0 and 3.0 have sessionStorage and globalStorage
            // make sure we default to globalStorage
            // but don't default to globalStorage in 3.5+ which also has localStorage
            if ( store.type === "sessionStorage" ) {
                store.type = "globalStorage";
            }
        } catch( e ) {}
    }

// userData
// non-standard: IE 5+
// http://msdn.microsoft.com/en-us/library/ms531424(v=vs.85).aspx
    (function() {
        // IE 9 has quirks in userData that are a huge pain
        // rather than finding a way to detect these quirks
        // we just don't register userData if we have localStorage
        if ( store.types.localStorage ) {
            return;
        }

        // append to html instead of body so we can do this from the head
        var div = document.createElement( "div" ),
            attrKey = "amplify";
        div.style.display = "none";
        document.getElementsByTagName( "head" )[ 0 ].appendChild( div );

        // we can't feature detect userData support
        // so just try and see if it fails
        // surprisingly, even just adding the behavior isn't enough for a failure
        // so we need to load the data as well
        try {
            div.addBehavior( "#default#userdata" );
            div.load( attrKey );
        } catch( e ) {
            div.parentNode.removeChild( div );
            return;
        }

        store.addType( "userData", function( key, value, options ) {
            div.load( attrKey );
            var attr, parsed, prevValue, i, remove,
                ret = value,
                now = (new Date()).getTime();

            if ( !key ) {
                ret = {};
                remove = [];
                i = 0;
                while ( attr = div.XMLDocument.documentElement.attributes[ i++ ] ) {
                    parsed = JSON.parse( attr.value );
                    if ( parsed.expires && parsed.expires <= now ) {
                        remove.push( attr.name );
                    } else {
                        ret[ attr.name ] = parsed.data;
                    }
                }
                while ( key = remove.pop() ) {
                    div.removeAttribute( key );
                }
                div.save( attrKey );
                return ret;
            }

            // convert invalid characters to dashes
            // http://www.w3.org/TR/REC-xml/#NT-Name
            // simplified to assume the starting character is valid
            // also removed colon as it is invalid in HTML attribute names
            key = key.replace( /[^\-._0-9A-Za-z\xb7\xc0-\xd6\xd8-\xf6\xf8-\u037d\u037f-\u1fff\u200c-\u200d\u203f\u2040\u2070-\u218f]/g, "-" );
            // adjust invalid starting character to deal with our simplified sanitization
            key = key.replace( /^-/, "_-" );

            if ( value === undefined ) {
                attr = div.getAttribute( key );
                parsed = attr ? JSON.parse( attr ) : { expires: -1 };
                if ( parsed.expires && parsed.expires <= now ) {
                    div.removeAttribute( key );
                } else {
                    return parsed.data;
                }
            } else {
                if ( value === null ) {
                    div.removeAttribute( key );
                } else {
                    // we need to get the previous value in case we need to rollback
                    prevValue = div.getAttribute( key );
                    parsed = JSON.stringify({
                        data: value,
                        expires: (options.expires ? (now + options.expires) : null)
                    });
                    div.setAttribute( key, parsed );
                }
            }

            try {
                div.save( attrKey );
                // quota exceeded
            } catch ( error ) {
                // roll the value back to the previous value
                if ( prevValue === null ) {
                    div.removeAttribute( key );
                } else {
                    div.setAttribute( key, prevValue );
                }

                // expire old data and try again
                store.userData();
                try {
                    div.setAttribute( key, parsed );
                    div.save( attrKey );
                } catch ( error ) {
                    // roll the value back to the previous value
                    if ( prevValue === null ) {
                        div.removeAttribute( key );
                    } else {
                        div.setAttribute( key, prevValue );
                    }
                    throw store.error();
                }
            }
            return ret;
        });
    }() );

// in-memory storage
// fallback for all browsers to enable the API even if we can't persist data
    (function() {
        var memory = {},
            timeout = {};

        function copy( obj ) {
            return obj === undefined ? undefined : JSON.parse( JSON.stringify( obj ) );
        }

        store.addType( "memory", function( key, value, options ) {
            if ( !key ) {
                return copy( memory );
            }

            if ( value === undefined ) {
                return copy( memory[ key ] );
            }

            if ( timeout[ key ] ) {
                clearTimeout( timeout[ key ] );
                delete timeout[ key ];
            }

            if ( value === null ) {
                delete memory[ key ];
                return null;
            }

            memory[ key ] = value;
            if ( options.expires ) {
                timeout[ key ] = setTimeout(function() {
                    delete memory[ key ];
                    delete timeout[ key ];
                }, options.expires );
            }

            return value;
        });
    }() );

}( this.amplify = this.amplify || {} ) );

/*! ios-orientationchange-fix.js | Script by @scottjehl rebound by @wilto, modified by Peter Wooster | @link https://github.com/scottjehl/iOS-Orientationchange-Fix | @copyright Scott Jehl <@scottjehl> | @license MIT / GPLV2 */
(function(w){

    // This fix addresses an Mobile Safari iOS bug, so return early if the UA claims it's something else.
    var ua = navigator.userAgent.toLowerCase();
    if( !( /iphone|ipad|ipod/.test( navigator.platform.toLowerCase() )
        && /os [1-5]_[0-9_]* like mac os x/i.test(ua)
        && ua.indexOf( "applewebkit" ) > -1
        && ua.indexOf( "crios") == -1  // chrome for iOS doesn't have the bug
        )){
        return;
    }

    var doc = w.document;

    if( !doc.querySelector ){ return; }
    var meta = doc.querySelector( "meta[name=viewport]" );
    if( !meta ){ return; }
    var initialContent = meta && meta.getAttribute( "content" );
    var disabledZoom = initialContent + ",maximum-scale=1";
    var enabledZoom = initialContent + ",maximum-scale=10";
    var enabled = true;
    var	x, y, z, aig;
    function restoreZoom(){
        meta.setAttribute( "content", enabledZoom );
        enabled = true;
    }

    function disableZoom(){
        meta.setAttribute( "content", disabledZoom );
        enabled = false;
    }

    function checkTilt( e ){
        var ori = w.orientation;
        // if it's landscape we're out of here
        if(90 == Math.abs(w.orientation)) {
            if(enabled)restoreZoom();
            return;
        }

        aig = e.accelerationIncludingGravity;
        x = Math.abs( aig.x );
        y = Math.abs( aig.y );

        // If in the danger zone where x is much greater than y turn off zoom
        if(y == 0 || (x/y) > 1.2){
            if(enabled)disableZoom();
        }else if( !enabled )restoreZoom();
    }

    w.addEventListener( "orientationchange", restoreZoom, false );
    w.addEventListener( "devicemotion", checkTilt, false );

})( this );


/*! jQuery resize event - v1.1 | @link http://benalman.com/projects/jquery-resize-plugin/ | Copyright (c) 2010 "Cowboy" Ben Alman | @license MIT/GPL */
// Script: jQuery resize event
//
// *Version: 1.1, Last updated: 3/14/2010*
//
// Project Home - http://benalman.com/projects/jquery-resize-plugin/
// GitHub       - http://github.com/cowboy/jquery-resize/
// Source       - http://github.com/cowboy/jquery-resize/raw/master/jquery.ba-resize.js
// (Minified)   - http://github.com/cowboy/jquery-resize/raw/master/jquery.ba-resize.min.js (1.0kb)
//
// About: License
//
// Copyright (c) 2010 "Cowboy" Ben Alman,
// Dual licensed under the MIT and GPL licenses.
// http://benalman.com/about/license/
//
// About: Examples
//
// This working example, complete with fully commented code, illustrates a few
// ways in which this plugin can be used.
//
// resize event - http://benalman.com/code/projects/jquery-resize/examples/resize/
//
// About: Support and Testing
//
// Information about what version or versions of jQuery this plugin has been
// tested with, what browsers it has been tested in, and where the unit tests
// reside (so you can test it yourself).
//
// jQuery Versions - 1.3.2, 1.4.1, 1.4.2
// Browsers Tested - Internet Explorer 6-8, Firefox 2-3.6, Safari 3-4, Chrome, Opera 9.6-10.1.
// Unit Tests      - http://benalman.com/code/projects/jquery-resize/unit/
//
// About: Release History
//
// 1.1 - (3/14/2010) Fixed a minor bug that was causing the event to trigger
//       immediately after bind in some circumstances. Also changed $.fn.data
//       to $.data to improve performance.
// 1.0 - (2/10/2010) Initial release

(function($,window,undefined){
    '$:nomunge'; // Used by YUI compressor.

    // A jQuery object containing all non-window elements to which the resize
    // event is bound.
    var elems = $([]),

    // Extend $.resize if it already exists, otherwise create it.
        jq_resize = $.resizecontainer = $.extend( $.resize, {} ),

        timeout_id,

    // Reused strings.
        str_setTimeout = 'setTimeout',
        str_resize = 'resizecontainer',
        str_data = str_resize + '-special-event',
        str_delay = 'delay',
        str_throttle = 'throttleWindow';

    // Property: jQuery.resize.delay
    //
    // The numeric interval (in milliseconds) at which the resize event polling
    // loop executes. Defaults to 250.

    jq_resize[ str_delay ] = 250;

    // Property: jQuery.resize.throttleWindow
    //
    // Throttle the native window object resize event to fire no more than once
    // every <jQuery.resize.delay> milliseconds. Defaults to true.
    //
    // Because the window object has its own resize event, it doesn't need to be
    // provided by this plugin, and its execution can be left entirely up to the
    // browser. However, since certain browsers fire the resize event continuously
    // while others do not, enabling this will throttle the window resize event,
    // making event behavior consistent across all elements in all browsers.
    //
    // While setting this property to false will disable window object resize
    // event throttling, please note that this property must be changed before any
    // window object resize event callbacks are bound.

    jq_resize[ str_throttle ] = true;

    // Event: resize event
    //
    // Fired when an element's width or height changes. Because browsers only
    // provide this event for the window element, for other elements a polling
    // loop is initialized, running every <jQuery.resize.delay> milliseconds
    // to see if elements' dimensions have changed. You may bind with either
    // .resize( fn ) or .bind( "resize", fn ), and unbind with .unbind( "resize" ).
    //
    // Usage:
    //
    // > jQuery('selector').bind( 'resize', function(e) {
    // >   // element's width or height has changed!
    // >   ...
    // > });
    //
    // Additional Notes:
    //
    // * The polling loop is not created until at least one callback is actually
    //   bound to the 'resize' event, and this single polling loop is shared
    //   across all elements.
    //
    // Double firing issue in jQuery 1.3.2:
    //
    // While this plugin works in jQuery 1.3.2, if an element's event callbacks
    // are manually triggered via .trigger( 'resize' ) or .resize() those
    // callbacks may double-fire, due to limitations in the jQuery 1.3.2 special
    // events system. This is not an issue when using jQuery 1.4+.
    //
    // > // While this works in jQuery 1.4+
    // > $(elem).css({ width: new_w, height: new_h }).resize();
    // >
    // > // In jQuery 1.3.2, you need to do this:
    // > var elem = $(elem);
    // > elem.css({ width: new_w, height: new_h });
    // > elem.data( 'resize-special-event', { width: elem.width(), height: elem.height() } );
    // > elem.resize();

    $.event.special[ str_resize ] = {

        // Called only when the first 'resize' event callback is bound per element.
        setup: function() {
            // Since window has its own native 'resize' event, return false so that
            // jQuery will bind the event using DOM methods. Since only 'window'
            // objects have a .setTimeout method, this should be a sufficient test.
            // Unless, of course, we're throttling the 'resize' event for window.
            if ( !jq_resize[ str_throttle ] && this[ str_setTimeout ] ) { return false; }

            var elem = $(this);

            // Add this element to the list of internal elements to monitor.
            elems = elems.add( elem );

            // Initialize data store on the element.
            $.data( this, str_data, { w: elem.width(), h: elem.height() } );

            // If this is the first element added, start the polling loop.
            if ( elems.length === 1 ) {
                loopy();
            }
        },

        // Called only when the last 'resize' event callback is unbound per element.
        teardown: function() {
            // Since window has its own native 'resize' event, return false so that
            // jQuery will unbind the event using DOM methods. Since only 'window'
            // objects have a .setTimeout method, this should be a sufficient test.
            // Unless, of course, we're throttling the 'resize' event for window.
            if ( !jq_resize[ str_throttle ] && this[ str_setTimeout ] ) { return false; }

            var elem = $(this);

            // Remove this element from the list of internal elements to monitor.
            elems = elems.not( elem );

            // Remove any data stored on the element.
            elem.removeData( str_data );

            // If this is the last element removed, stop the polling loop.
            if ( !elems.length ) {
                clearTimeout( timeout_id );
            }
        },

        // Called every time a 'resize' event callback is bound per element (new in
        // jQuery 1.4).
        add: function( handleObj ) {
            // Since window has its own native 'resize' event, return false so that
            // jQuery doesn't modify the event object. Unless, of course, we're
            // throttling the 'resize' event for window.
            if ( !jq_resize[ str_throttle ] && this[ str_setTimeout ] ) { return false; }

            var old_handler;

            // The new_handler function is executed every time the event is triggered.
            // This is used to update the internal element data store with the width
            // and height when the event is triggered manually, to avoid double-firing
            // of the event callback. See the "Double firing issue in jQuery 1.3.2"
            // comments above for more information.

            function new_handler( e, w, h ) {
                var elem = $(this),
                    data = $.data( this, str_data );

                // If called from the polling loop, w and h will be passed in as
                // arguments. If called manually, via .trigger( 'resize' ) or .resize(),
                // those values will need to be computed.
                data.w = w !== undefined ? w : elem.width();
                data.h = h !== undefined ? h : elem.height();

                old_handler.apply( this, arguments );
            }

            // This may seem a little complicated, but it normalizes the special event
            // .add method between jQuery 1.4/1.4.1 and 1.4.2+
            if ( $.isFunction( handleObj ) ) {
                // 1.4, 1.4.1
                old_handler = handleObj;
                return new_handler;
            } else {
                // 1.4.2+
                old_handler = handleObj.handler;
                handleObj.handler = new_handler;
            }
        }

    };

    function loopy() {

        // Start the polling loop, asynchronously.
        timeout_id = window[ str_setTimeout ](function(){

            // Iterate over all elements to which the 'resize' event is bound.
            elems.each(function(){
                var elem = $(this),
                    width = elem.width(),
                    height = elem.height(),
                    data = $.data( this, str_data );

                // If element size has changed since the last time, update the element
                // data store and trigger the 'resize' event.
                if ( width !== data.w || height !== data.h ) {
                    elem.trigger( str_resize, [ data.w = width, data.h = height ] );
                }

            });

            // Loop.
            loopy();

        }, jq_resize[ str_delay ] );

    }

})(jQuery, window);

/**
 * Count the number of substring occurrences
 * @param haystack {String} the string to search in
 * @param needle {String} the substring to search for
 * @return {Number}
 */
function substr_count(haystack, needle)
{
    var needle_esc = needle.replace(/(?=[\\^$*+?.\(\)|{\}[\]])/g, "\\");
    var pattern = new RegExp(""+needle_esc+"", "g");
    var count = haystack.match(pattern);
    return count ? count.length : 0;
}

/**
 * Checks if a variable is a String
 * @param str {*} The variable to test
 * @return {Boolean}
 */
function isString(str)
{
    return typeof str == "string";
}

/**
 * Checks if a variable is a Number
 * @param num {*} The variable to test
 * @return {Boolean}
 */
function isNumber(num)
{
    return (!isNaN(parseFloat(num)) && isFinite(num));
}

/**
 * Checks if a variable is a Boolean
 * @param bool {*} The variable to test
 * @return {Boolean}
 */
function isBool(bool)
{
    return (bool === true || bool === false);
}

/**
 * Checks if the variable is an array
 * @param arr {*} The variable to test
 * @return {Boolean}
 */
function isArray(arr) {
    return Object.prototype.toString.call(arr) === "[object Array]";
}

/**
 * Checks if a variable is an Object
 * @param obj {*} The variable to test
 * @return {Boolean}
 */
function isObject(obj)
{
    switch(true)
    {
        case (isArray(obj)):
            return false;
            break;
    }

    var is_empty_obj_bool;
    for ( var p in obj )
    {
        if (obj.hasOwnProperty(p))
        {
            is_empty_obj_bool = false;
            break;
        }
    }
    is_empty_obj_bool = (isBool(is_empty_obj_bool)) ? is_empty_obj_bool: true;

    switch(true)
    {
        case (typeof obj === "object" && is_empty_obj_bool === false):
            return true;
            break;
    }

    return false;
}

/**
 * Checks if a variable is a Function
 * @param obj {*} The variable to test
 * @return {Boolean}
 */
function isFunction(obj) {
    return !!(obj && obj.constructor && obj.call && obj.apply);
}

/**
 * Converts a string array to an integer array
 * It converts all the string values of an array into their integer equivalents
 * @param str_arr {Array} The array to convert
 * @return {Array}
 */
function arrayToInteger(str_arr)
{
    var int_arr_item_int,
        array_count_int,
        keys_arr = [],
        values_arr = [],
        values_int_arr = [],
        final_int_arr = [];

    keys_arr = array_keys(str_arr);
    values_arr = array_values(str_arr);

    array_count_int = count(str_arr);
    for(var i = 0; i < array_count_int; i++)
    {
        int_arr_item_int = parseInt(values_arr[i]);
        values_int_arr.push(int_arr_item_int);
    }

    final_int_arr = array_combine(keys_arr, values_int_arr);
    return final_int_arr;
}

/**
 * Checks to see if array has duplicate values
 * @param arr {Array} the array to check
 * @return {Boolean}
 */
function arrayHasDuplicates(arr) {
    var valuesSoFar = {},
        array_count_int = count(arr);

    for (var i = 0; i < array_count_int; ++i) {
        var value = arr[i];
        if (Object.prototype.hasOwnProperty.call(valuesSoFar, value)) {
            return true;
        }
        valuesSoFar[value] = true;
    }
    return false;
}

/**
 * Gets a value from an array derived after a tokenized string is exploded
 * @param str {String} the tokenized string that will be exploded to an array
 * @param delim {String} the delimiter
 * @param key {Integer} the position of the array to return
 * @return {String}
 */
function getValueAfterExplode(str, delim, key)
{
    var arr = explode(delim, str);
    return arr[key];
}

/**
 * Sorts an array in numerical order and returns an array containing the keys of the array in the new sorted order
 * @param values_arr {Array} The array to sort
 * @return {Array}
 */
function getSortedKeys(values_arr)
{
    var array_with_keys = [];
    for (var i = 0; i < values_arr.length; i++) {
        array_with_keys.push({ key: i, value: values_arr[i] });
    }

    array_with_keys.sort(function(a, b) {
        if (a.value < b.value) { return -1; }
        if (a.value > b.value) { return  1; }
        return 0;
    });

    var keys = [];
    for (var i = 0; i < array_with_keys.length; i++) {
        keys.push(array_with_keys[i].key);
    }

    return keys;
}

/**
 * Finds the nearest matching number in an array containing integers
 * It is recommended that you sort the array in order before using it with this function
 * @param haystack_arr {Array} The array containing the integer values
 * @param needle_int {Number} The reference integer which is used to find the match
 * @param return_key_only_bool {Boolean} If true, will return the key position of the nearest match. Default is false.
 * @param is_ceil_bool {Boolean} If true, will return the nearest highest number even if a lower number is technically 'closer'. Default value is true.
 * @param disable_ceil_offset_int {Number} Please see explanation below.
 * For example, let's say needle_int is 120 and the nearest matching numbers are 115 on the lower end and 140 on the higher end
 * Being the is_ceil_bool is true by default, 140 would ordinarily be the nearest number selected. However, if disable_ceil_offset is set to 5, this will set is_ceil_bool to false, and 115 will be returned as the nearest number selected because the difference between it (the true nearest matching number) and 120 (needle_int) is 5 or less, even though needle_int is higher and under normal circumstances 120 would have been returned instead
 * @return {Number}
 */
function getClosestNumberMatchArray(haystack_arr, needle_int)
{
    var myArgs = Array.prototype.slice.call(arguments),
        return_key_only_bool = (isBool(myArgs[2])) ? myArgs[2]: false,
        is_ceil_bool = (isBool(myArgs[3])) ? myArgs[3]: true,
        disable_ceil_offset_int = (isNumber(myArgs[4])) ? myArgs[4] : 0,
        value_diff_int,
        value_diff_keys_sort_arr = [],
        value_diff_values_arr = [],
        key_final_int,
        value_final_int,
        value_final_needle_diff_int
        ;

    haystack_arr = arrayToInteger(haystack_arr);
    needle_int = parseInt(needle_int);

    for(var i = 0; i < count(haystack_arr); i++)
    {
        value_diff_int = needle_int - haystack_arr[i];
        value_diff_int = Math.abs(value_diff_int);
        value_diff_values_arr.push(value_diff_int);
    }

    value_diff_keys_sort_arr = getSortedKeys(value_diff_values_arr);
    key_final_int = value_diff_keys_sort_arr[0];
    value_final_int = haystack_arr[key_final_int];

    value_final_needle_diff_int = value_final_int - needle_int;
    value_final_needle_diff_int = Math.abs(value_final_needle_diff_int);

    //Manage for when needle_int is higher than nearest matching number, and highest matching number is required
    switch(true)
    {
        case (value_final_int < needle_int):
            is_ceil_bool = (value_final_needle_diff_int <= disable_ceil_offset_int) ? false : is_ceil_bool;
            key_final_int = (is_ceil_bool) ? key_final_int + 1 : key_final_int;
            break;
    }

    //return value or key
    value_final_int = haystack_arr[key_final_int];
    return (return_key_only_bool) ? key_final_int: value_final_int;
}

/**
 * This function checks if a number is an integer decimal and if the integral part of the decimal is even
 * For example, 640.123 will be true, 641.123 will be false
 * @param number_int {Number} The Integer Decimal
 * @param allow_negative_bool {Boolean} This will allow negative numbers to be considered
 * @return {Boolean}
 */
function isEvenDecimal(number_int)
{
    var myArgs = Array.prototype.slice.call(arguments),
        allow_negative_bool = (isBool(myArgs[1])) ? myArgs[1]: false,
        number_temp_int,
        number_temp_mod_int;

    number_temp_int = (number_int < 0 && allow_negative_bool) ? number_int * -1 : number_int;
    number_temp_mod_int = number_temp_int % 1;

    //return false if Number is less than one or is not a decimal integer
    switch(true)
    {
        case (!isNumber(number_temp_int) || number_temp_int < 1 || number_temp_mod_int == 0):
            return false;
            break;
    }

    //Check if integral part is even number
    number_temp_int = Math.floor(number_temp_int);
    number_temp_mod_int = number_temp_int % 2;

    return !!((number_temp_mod_int == 0));
}

/**
 * Retrieves the current and full URL of the document
 * @param option_flag_str {String} If present, specifies a specific part of the URL to return
 * The two options flags availabel are:
 * 1. bp [basepath] - Will return 'http://restive.io/index.html' if current URL is 'http://restive.io/index.html?id=1234'
 * 2. bd [basedir] - Will return 'http://restive.io/test' if current URL is 'http://restive.io/test/index.html?id=4'
 * 3. q [query] - Will return 'id=1234' if current URL is 'http://restive.io/index.html?id=1234'
 * @param url_str {String} By default, this function uses document.URL to capture the URL. You may provide your own url using this parameter
 * @return {String}
 */
function getUrl()
{
    var myArgs = Array.prototype.slice.call(arguments),
        option_flag_str = (isString(myArgs[0]) && myArgs[0] != '') ? myArgs[0]: '',
        url_str = (isString(myArgs[1]) && myArgs[1] != '') ? myArgs[1] : document.URL,
        url_temp_str,
        url_temp_arr = [],
        is_url_has_q_bool = /\?+/.test(url_str),
        url_match_arr = url_str.match(/^([h|f]{1}[t]{0,1}tp[s]{0,1}\:\/\/)([^ ]+?)\?([^ ]*)/i);

    switch(true)
    {
        case (option_flag_str == 'basepath' || option_flag_str == 'bp'):
            return (is_url_has_q_bool) ? url_match_arr[1]+url_match_arr[2] : url_str;
            break;

        case (option_flag_str == 'basedir' || option_flag_str == 'bd'):
            url_temp_str = (is_url_has_q_bool) ? url_match_arr[1]+url_match_arr[2] : url_str;
            url_temp_arr = explode('/', url_temp_str);
            url_temp_arr.pop();

            return implode('/', url_temp_arr);
            break;

        case (option_flag_str == 'query' || option_flag_str == 'q'):
            return (is_url_has_q_bool) ? url_match_arr[3]: "";
            break;

        default:
            return url_str;
    }
}

(function($){

    /**
     * Determines if a given element is a child or descendant of another
     * @param {String} $elem_sel_parent_str The selector of the parent object
     * @param {String} $elem_sel_child_str The selector of the suspected child object
     * @return {Boolean}
     */
    window.elementIsChildOf = function($elem_sel_parent_str, $elem_sel_child_str){
        var result_bool = false,
            elem_parent = $(''+$elem_sel_parent_str+''),
            elem_child = $(''+$elem_sel_child_str+'');

        switch(true)
        {
            case ($(elem_child).parents().index(elem_parent) != -1):
                result_bool = true;
                break;
        }

        return result_bool;
    };

    /**
     * Retrieves the text value of a JQuery Selector
     * @param {Object} el the JQuery Object/Element
     * @return {String}
     */
    window.getSelector = function(el){
        var $el = $(el);

        var id = $el.attr("id");
        if (id) { //"should" only be one of these if theres an ID
            return "#"+ id;
        }

        var node = $el[0].nodeName.toLowerCase();
        if(node == 'html' || node == 'body'){
            return node;
        }

        var selector = $el.parents()
            .map(function() { return this.tagName; })
            .get().reverse().join(" ");

        if (selector) {
            selector += " "+ $el[0].nodeName;
        }

        var classNames = $el.attr("class");
        if (classNames) {
            selector += "." + $.trim(classNames).replace(/\s/gi, ".");
        }

        var name = $el.attr('name');
        if (name) {
            selector += "[name='" + name + "']";
        }
        if (!name){
            var index = $el.index();
            if (index) {
                index = index + 1;
                selector += ":nth-child(" + index + ")";
            }
        }
        return selector;
    };

})(jQuery);


/*! Restive.JS | @copyright 2013 Obinwanne Hill */
var Restive = (function(window, document, $) {

    //Check for Dependency
    switch(true)
    {
        case (typeof $ != 'function'):
            //exit gracefully if missing
            throw 'Restive.JS requires JQuery to run!';
            break;
    }

    //Define local vars
    var root = this,
        Restive,
        win = window,
        docElem = document.documentElement,
        $win = $(win),
        screen = win.screen,
        vSpan, vPitch, cSpan, cPitch, dSpan, dPitch, eSpan, ePitch,
        media  = win.matchMedia || win.msMatchMedia || Object
        ;

    //Create window storage
    window.rstv_store = {'main': {}};
    window.parent.rstv_store = {'main': {}};

    //Create window storage function
    window.rstv_store.storage = function(){
        var myArgs = Array.prototype.slice.call(arguments),
            key_str = myArgs[0],
            value_res = myArgs[1],
            is_value_valid_bool = !!((typeof value_res !== "undefined" && value_res !== null) && ((isString(value_res) && value_res != "") || isNumber(value_res) || (isArray(value_res) && count(value_res) > 0) || isBool(value_res) || isObject(value_res))),
            is_value_null_bool = !!((value_res === null))
            ;

        switch(true)
        {
            case (is_value_valid_bool):
                window.rstv_store.main[""+key_str+""] = value_res;
                return;
                break;

            case (is_value_null_bool):
                window.rstv_store.main[""+key_str+""] = null;
                return;
                break;

            default:
                return window.rstv_store.main[""+key_str+""];
        }
    };

    /**
     * Initialize and store some important default values.
     * Return false if initialization has already been performed in same session.
     * @return {Boolean}
     */
    var init = function () {
        //detect private browsing
        window.rstv_store.main["rstv_is_priv_browsing"] = !!((_detectPrivateBrowsing()));

        var is_init_bool = store("rstv_is_init"),
            retr;

        switch (true) {
            case (is_init_bool):
                store("rstv_timestamp_curr", microtime(true));

                store("rstv_url", getUrl('bp'));

                //load counter
                _loadCounter();

                /** FIX FOR LOCAL BROWSER-BASED EMULATORS **/
                _fixForLocalDev();

                //update the dimension and orientation info storage-wide
                _initDimensionVars();
                _updateDimensionStore();
                _updateOrientationStore();

                retr = false;
                break;

            default:
                //flag that defaults are set
                store("rstv_timestamp_curr", microtime(true));
                store("rstv_timestamp_init", store("rstv_timestamp_curr"));
                store("rstv_loaded_count", 0, '', {expires: 1500});

                store("rstv_is_init", true);

                store("rstv_url", getUrl('bp'));
                store("rstv_url_hash", md5(getUrl('bp')));

                _initDimensionVars();
                _updateDimensionStore();
                store("rstv_ort_init", getOrientation());
                store("rstv_ort_curr", getOrientation());

                //load counter
                _loadCounter();

                retr = true;
        }

        return retr;
    };

    /**
     * Reinitializes the Restive Class on Demand
     * It resets Dimension, Orientation, and Timestamp Info
     * The Restive Class is initialized as soon as Restive.JS is called via <script\> tag. In certain circumstances
     * this might bring out a slight change in Dimension and Orientation Data especially for PCs.
     * Re-initialization will usually correct any discrepancies
     * NOTE: It is advised that you use this function only once, within document.ready, and before any other Restive-related methods
     */
    function reInit()
    {
        //reset timestamps
        store("rstv_timestamp_curr", microtime(true));
        store("rstv_timestamp_init", store("rstv_timestamp_curr"));

        //update the dimension and orientation info storage-wide
        _initDimensionVars();
        _updateDimensionStore();
        store("rstv_ort_init", getOrientation());
        store("rstv_ort_curr", getOrientation());
    }

    /**
     * Initializes important dimension variables to Local storage
     * @private
     */
    function _initDimensionVars()
    {
        store("rstv_var_doc_client_w", docElem.clientWidth);
        store("rstv_var_doc_client_h", docElem.clientHeight);
        store("rstv_var_win_outer_w", window.outerWidth);
        store("rstv_var_win_outer_h", window.outerHeight);
        store("rstv_var_win_screen_w", screen.width);
        store("rstv_var_win_screen_h", screen.height);
    }

    /**
     * Keeps track of how many times Restive.JS is loaded in rapid succession in a single browser session
     * @private
     */
    function _loadCounter()
    {
        var load_count_int = parseInt(store("rstv_loaded_count"));
        switch(true)
        {
            case (!isNumber(load_count_int)):
                load_count_int = 0;
                break;
        }
        load_count_int++;
        store("rstv_loaded_count", load_count_int, '', {expires: 1500});
    }

    /**
     * This is a special function to deal with certain issues experienced when using Restive.JS in Chrome Ripple
     * and other Browser Based Mobile Device emulators that load scripts more than once in rapid succession
     * when they are being initialized
     * @private
     */
    function _fixForLocalDev()
    {
        var load_count_int = parseInt(store("rstv_loaded_count")),
            ffld_is_init_bool = store("rstv_ffld_is_init");

        switch(true)
        {
            case (load_count_int > 1):
                store("rstv_viewportW rstv_viewportW_dip rstv_viewportH rstv_viewportH_dip rstv_screenW rstv_screenH", null);
                store("rstv_is_ios rstv_is_android rstv_is_blackberry rstv_is_symbian rstv_is_windows rstv_is_windows_phone", null);
                store("rstv_is_android_1_ rstv_is_android_2_ rstv_is_android_3_", null);
                store("rstv_is_phone rstv_is_tablet rstv_is_tv rstv_is_pc", null);
                store("rstv_ort_curr rstv_timestamp_curr rstv_is_portrait rstv_is_landscape", null);
                store("rstv_multi_count rstv_multi_bpm_idx rstv_cache_bpm rstv_cache_bpm_lock rstv_cache_req rstv_cache_bpm_viewport_diff", null);
                store("rstv_user_agent", null);

                store("rstv_timestamp_curr", microtime(true));
                store("rstv_ort_curr", getOrientation());

                switch(true)
                {
                    case (!ffld_is_init_bool):

                        store("rstv_timestamp_init", store("rstv_timestamp_curr"));
                        store("rstv_ort_init", getOrientation());

                        //Mark that this function has been executed
                        store("rstv_ffld_is_init", true);
                        break;
                }

                break;
        }
    }

    /**
     * Detects whether private browsing is active or not
     * @return {Boolean}
     */
    function _detectPrivateBrowsing()
    {
        try {
            localStorage.setItem("__test", "data");
        }
        catch (e)
        {
            if (/QUOTA_?EXCEEDED/i.test(e.name)) {
                return true;
            }
        }
        return false;
    }

    /**
     * Stores a value in LocalStorage [or other storage type], or retrieves previously stored value
     * Leverages AmplifyJS Store
     * @param key_str The identifier for the value being stored
     * @param value_res The value to store [optional]
     * @param type_str The type of storage format to be used
     * @param options_res A set of key/value pairs that relate to settings for storing the value
     * @return {*}
     */
    function store()
    {
        var myArgs = Array.prototype.slice.call(arguments);
        var is_priv_browsing_bool = window.rstv_store.main["rstv_is_priv_browsing"],
            key_str = myArgs[0],
            value_res = myArgs[1],
            type_str = ((typeof myArgs[2] !== "undefined" && myArgs[2] !== null) && (isString(myArgs[2]) && myArgs[2] != "")) ? myArgs[2] : 'ss',
            options_res = myArgs[3],
            store_func_name,
            store_func,
            list_del_key_arr = [],
            is_getall_bool = (isString(key_str) && key_str != "") ? false: true,
            is_value_valid_bool = !!((typeof value_res !== "undefined" && value_res !== null) && ((isString(value_res) && value_res != "") || isNumber(value_res) || (isArray(value_res) && count(value_res) > 0) || isBool(value_res) || isObject(value_res))),
            is_value_null_bool = !!((value_res === null));

        try
        {
            switch(true)
            {
                case (is_priv_browsing_bool):
                    //Private Browsing Detected, Use Windows Store
                    store_func_name = 'storage';
                    store_func = window.rstv_store[store_func_name];
                    break;

                default:
                    //Use AmplifyJS Store
                    switch(true)
                    {
                        case (type_str == 'ls'):
                            store_func_name = 'localStorage';
                            break;

                        default:
                            store_func_name = 'sessionStorage';
                    }
                    store_func = amplify.store[store_func_name];

                    //if sessionStorage is not supported, default to amplifyJS
                    switch(true)
                    {
                        case (!window.sessionStorage || !window.localStorage):
                            store_func = amplify.store;
                            break;
                    }

                    //return all values if no key is provided
                    switch(true)
                    {
                        case (is_getall_bool):
                            return store_func();
                            break;
                    }
            }

            //return stored value if empty value argument and value is not null
            switch(true)
            {
                case (!is_value_valid_bool && !is_value_null_bool):
                    return store_func(key_str);
                    break;
            }

            //delete object if value is null
            switch(true)
            {
                case (is_value_null_bool):
                    //delete stored object(s)
                    list_del_key_arr = explode(" ", key_str);
                    for (var i = 0; i < count(list_del_key_arr); i++)
                    {
                        store_func(list_del_key_arr[i], null);
                    }
                    return null;
                    break;
            }

            //store value
            store_func(key_str, null);
            store_func(key_str, value_res, options_res);
        }
        catch(e){
            alert(e);
            
        }
    }

    /**
     * This function is used to track specific String values in a storage system
     * The two possible storage options are (1) Cookies, and (2) Local Storage
     * It will store individual values as a tokenized string.
     * For example, if you call this function on two strings 'trial' and 'error', the stored value will be 'trial|error'
     *
     * @param key_str {String} The identifier of the value being stored
     * @param value_str {String} The individual value to store and track
     * @param store_type_str {String} The storage type of the container that will hold the stored value. 'ck' represents 'Cookie', and 'ls' represents 'LocalStorage'
     * @param unique_bool {Boolean} The setting that determines if the individual values should be unique. If this is true, no two string values will be identical
     * @param expires_ck_int|expires_ls_int {Number} Expiry setting
     * @param reverse_order_bool {Boolean} This affects the order with which data is stored. If true, data will be stored in a LIFO (Last In - First Out) format. If false, data will be store in a FIFO (First In - First Out) format
     * @param delim_str {String} The character that will be used to delimit the stored string
     * @param data_count_int {Number} The number of individual
     * @return {Boolean}
     */
    function storeVarTracker(key_str, value_str)
    {
        /**
         * This function saves the current Restive.JS settings tracking code to history
         */
        var myArgs = Array.prototype.slice.call(arguments),
            store_type_str = (isString(myArgs[2]) && myArgs[2] != "") ? myArgs[2] : 'ck',
            unique_bool = (isBool(myArgs[3])) ? myArgs[3]: false,
            expires_ls_int = (isNumber(myArgs[4]) || isString(myArgs[4])) ? parseInt(myArgs[4]): '',
            expires_ck_int = (isNumber(myArgs[4]) || isString(myArgs[4])) ? parseInt(myArgs[4]): 30,
            reverse_order_bool = (isBool(myArgs[5])) ? myArgs[5]: true,
            delim_str = (isString(myArgs[6]) && myArgs[6] != "") ? myArgs[6]: '-!',
            data_count_int = (isNumber(myArgs[7]) || isString(myArgs[7])) ? parseInt(myArgs[7]): 60,
            history_tok_str,
            history_upd_tok_str,
            history_arr = [],
            history_upd_arr = []
            ;

        //check if this tracking code exists
        history_tok_str = (store_type_str == 'ls') ? store(key_str) : $.cookie(key_str);
        switch(true)
        {
            case (history_tok_str === null || typeof history_tok_str === "undefined"):
                (store_type_str == 'ls') ? store(key_str, value_str,
                    '', {expires: expires_ls_int}) : $.cookie(key_str, value_str, { expires: expires_ck_int, path: '/' });

                return true;
                break;

            case (typeof history_tok_str !== "undefined" && history_tok_str !== null && history_tok_str != ""):
                //get cookie info and check if tracking cookie exists
                history_arr = explode(delim_str, history_tok_str);
                switch(true)
                {
                    case (in_array(value_str, history_arr) && unique_bool):
                        return false;
                        break;

                    default:
                        //generate the current tracking code
                        switch(true)
                        {
                            case (reverse_order_bool):
                                history_arr.unshift(value_str);
                                history_upd_arr = history_arr.slice(0, data_count_int);

                                history_upd_tok_str = implode(delim_str, history_upd_arr);
                                break;

                            default:
                                history_arr.push(value_str);
                                history_upd_tok_str = implode(delim_str, history_arr);
                        }

                        //store the tracking code
                        (store_type_str == 'ls') ? store(key_str, history_upd_tok_str, '', {expires: expires_ls_int}) : $.cookie(key_str, history_upd_tok_str, { expires: expires_ck_int, path: '/' });

                        return true;
                }
                break;
        }
    }

    /**
     * This function is used to validate a string value against the tokenized string stored via storeVarTracker()
     * It checks to see if the string value is one of the tokenized item. If yes, it returns true; if no, it returns false
     * For example if needle = 'trial', and the var_key_str identifies a stored string with value = 'trial|error', then validation will be successful
     * @param value_needle_str {String} The string value that will be validated against the stored value
     * @param key_str {String} The identifier of the value that was stored via storeVarTracker()
     * @param store_type_str {String} The storage type of the container holding the stored value. 'ck' represents 'Cookie', and 'ls' represents 'LocalStorage'
     * @param delim_str {String} The character that will be used to delimit the stored string
     * @return {Boolean}
     */
    function storeVarValidator(value_needle_str, key_str)
    {
        var myArgs = Array.prototype.slice.call(arguments),
            store_type_str = (isString(myArgs[2]) && myArgs[2] != "") ? myArgs[2] : 'ck',
            delim_str = (isString(myArgs[3]) && myArgs[3] != "") ? myArgs[3] : '-!',
            value_str = (store_type_str == 'ls') ? store(key_str) : $.cookie(key_str);

        switch(true)
        {
            case (typeof value_str !== "undefined" && value_str !== null && value_str != ""):
                var value_arr = [];
                value_arr = explode(delim_str, value_str);

                switch(true)
                {
                    case (in_array(value_needle_str, value_arr)):
                        //tracking code is in history
                        return true;
                        break;

                    default:
                        return false;
                }
                break;

            default:
                return false;
        }
    }

    /**
     * Checks if a value stored in LocalStorage exists and contains a value
     * Also stores a value if provided if the value did not previously exist or was invalid
     * @param key_str {String} The identifier for the value that was stored
     * @param value_store_res {*} The value to store [optional]
     * @return {Boolean}
     */
    function isStorageValueSet(key_str)
    {
        var myArgs = Array.prototype.slice.call(arguments),
            value_store_res = myArgs[1],
            value_retr_res = store(''+key_str+''),
            is_value_valid_bool = !!((typeof value_store_res !== "undefined" && value_store_res !== null)),
            is_store_value_set_bool = false
            ;

        //Determine if store value exists and is valid
        switch(true)
        {
            case (isBool(value_retr_res) || (value_retr_res !== null && typeof value_retr_res !== "undefined" && value_retr_res != "")):
                is_store_value_set_bool = true;
                break;
        }

        //Return result of check immediately if no value is provided
        switch(true)
        {
            case (!is_value_valid_bool):
                return is_store_value_set_bool;
                break;
        }

        //Store value if it does not exist and/or is invalid.
        switch(true)
        {
            case (!is_store_value_set_bool):
                store(key_str, value_store_res);
                break;
        }
    }

    /**
     * Increment (or Decrement) a stored variable
     * @param key_str {String} The identifier of the value that was stored
     * @param increment_value_int {Number} The size of the increment operation. Default is 1
     * @param is_decrement_bool {Boolean} If set to true, will decrement instead of increment
     * @return {Number|Boolean}
     */
    function incrementStorageValue(key_str)
    {
        var myArgs = Array.prototype.slice.call(arguments),
            increment_value_int = (isNumber(myArgs[1])) ? myArgs[1]: 1,
            is_decrement_bool = (isBool(myArgs[2])) ? myArgs[2]: false,
            value_int;

        value_int = parseInt(store(key_str));
        switch(true)
        {
            case (!isNumber(value_int)):
                return false;
                break;
        }

        value_int = (is_decrement_bool) ? value_int - increment_value_int: value_int + increment_value_int;
        store(key_str, value_int);

        return value_int;
    }

    /**
     * Returns a list of standard resolution dimensions
     * @param class_str {String} the class of dimensions to return. It could be 'w' = widths, or 'h' = heights
     * @return {Array}
     * @private
     */
    function _getResolutionDimensionList(class_str)
    {
        var std_w_arr = [120, 128, 160, 200, 240, 272, 300, 320, 352, 360, 480, 540, 576, 600, 640, 720, 768, 800, 864, 900, 1024, 1050, 1080, 1152, 1200, 1440, 1536, 1600, 1800, 2048, 2160, 2400, 3072, 3200, 4096, 4320, 4800],
            std_h_arr = [160, 240, 260, 320, 400, 432, 480, 640, 720, 800, 854, 960, 1024, 1136, 1152, 1280, 1360, 1366, 1400, 1440, 1600, 1680, 1920, 2048, 2560, 2880, 3200, 3840, 4096, 5120, 6400, 7680]
            ;

        switch(true)
        {
            case (class_str == 'w'):
                return std_w_arr;
                break;

            case (class_str == 'h'):
                return std_h_arr;
                break;
        }
    }

    /**
     * Get the Viewport or Screen Dimensions of the Device
     * @param type_str {String} The type of operation to execute
     * vW = viewport width, vH = viewport height, sW = screen width, sH = screen height
     * @param adj_screen_size_bool {Boolean} This determines if the screen size result should be adjusted to return the nearest standard resolution. For example if actual screen height is 1184, 1280 will be returned as it is the nearest standard resolution height. Default is true
     * @return {*}
     * @private
     */
    function _getDimension(type_str)
    {
        var myArgs = Array.prototype.slice.call(arguments),
            adj_screen_size_bool = (isBool(myArgs[1])) ? myArgs[1]: true,
            dim_res,
            dim_res_adj,
            adj_dim_res_bool = false,
            is_pc_or_tv_bool = !!((isPC() || isTV())),
            pixel_ratio_device_int = getPixelRatio(),
            pixel_ratio_virtual_int,
            win_outer_w_int = store("rstv_var_win_outer_w"),
            win_outer_h_int = store("rstv_var_win_outer_h"),
            doc_client_w_int = store("rstv_var_doc_client_w"),
            doc_client_h_int = store("rstv_var_doc_client_h"),
            win_screen_w_int = store("rstv_var_win_screen_w"),
            win_screen_h_int = store("rstv_var_win_screen_h")
            ;

        /**
         * Return dimensions quickly if device is PC
         */
        switch(true)
        {
            case (is_pc_or_tv_bool):
                switch(true)
                {
                    case (type_str == 'vW'):
                        dim_res = doc_client_w_int;
                        break;

                    case (type_str == 'vH'):
                        dim_res = doc_client_h_int;
                        break;

                    case (type_str == 'sW'):
                        dim_res = win_screen_w_int;
                        break;

                    case (type_str == 'sH'):
                        dim_res = win_screen_h_int;
                        break;
                }

                switch(true)
                {
                    case (type_str == 'vW' || type_str == 'vH'):
                        dim_res = (pixel_ratio_device_int >= 1.5) ? dim_res * pixel_ratio_device_int : dim_res;
                        break;
                }

                dim_res = Math.floor(dim_res);
                return dim_res;

                break;
        }

        /**
         * If not PC, continue processing
         */

        var device_user_agent_str = getUserAgent(),
            is_opera_browser_bool = /opera.+(mini|mobi)/i.test(device_user_agent_str),
            is_ios_bool = !!((isIOS())),
            is_symbian_bool = !!((isSymbian())),
            is_windows_bool = !!((isWindows())),
            is_android_bool = !!((isAndroid())),
            is_android_1_bool = !!((isAndroid('1.'))),
            is_android_2_bool = !!((isAndroid('2.'))),
            is_special_needs_bool = !!(((is_android_1_bool || is_android_2_bool) || is_symbian_bool || is_windows_bool)),
            viewport_w_int,
            viewport_h_int,
            screen_w_int = win_screen_w_int,
            screen_h_int = win_screen_h_int,
            screen_w_fix_int = screen_w_int,
            ort_w_int,
            ort_h_int,
            viewport_w_to_screen_w_ratio_int,
            screen_w_to_viewport_w_diff_int,
            screen_w_to_h_ratio_int,
            fixed_screen_dim_bool,
            std_w_arr = _getResolutionDimensionList('w'),
            std_h_arr = _getResolutionDimensionList('h'),
            std_w_temp_arr = std_w_arr,
            std_h_temp_arr = std_h_arr,
            is_landscape_v_bool,                    //viewport
            is_landscape_s_bool,                    //screen
            is_landscape_v_extended_verify_bool
            ;

        /**
         * Get the viewport dimensions
         */
        switch(true)
        {
            case (is_special_needs_bool):
                viewport_w_int = (win_outer_w_int <= 0) ? doc_client_w_int : win_outer_w_int;
                viewport_h_int = (win_outer_h_int <= 0) ? doc_client_h_int : win_outer_h_int;
                ort_w_int = viewport_w_int;
                ort_h_int = viewport_h_int;
                break;

            default:
                viewport_w_int = doc_client_w_int;
                viewport_h_int = doc_client_h_int;
                ort_w_int = doc_client_w_int;
                ort_h_int = doc_client_h_int;
        }

        /**
         * Modify Screen Dimensions if Android 2 or Symbian Platform
         */
        switch(true)
        {
            case ((is_android_2_bool || is_symbian_bool) && !is_opera_browser_bool):
                screen_w_int = (win_outer_w_int <= 0) ? screen_w_int : win_outer_w_int;
                screen_h_int = (win_outer_h_int <= 0) ? screen_h_int : win_outer_h_int;
                break;
        }

        //Determine orientation
        screen_w_to_h_ratio_int = screen_w_int/screen_h_int;
        screen_w_to_viewport_w_diff_int = screen_w_int - viewport_w_int;
        screen_w_to_viewport_w_diff_int = Math.abs(screen_w_to_viewport_w_diff_int);

        is_landscape_v_extended_verify_bool = (is_opera_browser_bool && viewport_w_int < 260) ? ((screen_w_to_viewport_w_diff_int <= 4) && (screen_w_to_h_ratio_int >= 1) ? true : false) : true;
        is_landscape_v_bool = !!((ort_h_int <= ort_w_int) && is_landscape_v_extended_verify_bool);
        is_landscape_s_bool = !!((screen_h_int <= screen_w_int));

        /**
         * Reduce resolution dimension list size if iOS
         * This improves the accuracy for first-generation iOS devices
         */
        switch(true)
        {
            case (is_ios_bool):
                std_w_temp_arr = std_w_temp_arr.slice(7);
                std_h_temp_arr = std_h_temp_arr.slice(6);
                break;

            case (is_android_bool):
                std_w_temp_arr = std_w_temp_arr.slice(4);
                std_h_temp_arr = std_h_temp_arr.slice(3);
                break;

            case (is_symbian_bool):
                std_w_temp_arr = std_w_temp_arr.slice(4);
                break;
        }

        /**
         * Reverse resolution dimension list when orientation changes
         */
        switch(true)
        {
            case (is_landscape_v_bool):
                std_w_arr = std_h_temp_arr;
                std_h_arr = std_w_temp_arr;
                break;

            default:
                std_w_arr = std_w_temp_arr;
                std_h_arr = std_h_temp_arr;
        }

        /**
         * Get Dimensions
         */
        switch(true)
        {
            case (type_str == 'vW'):
                dim_res = viewport_w_int;
                break;

            case (type_str == 'vH'):
                dim_res = viewport_h_int;
                break;

            case (type_str == 'sW'):
                /**
                 * This aims to correct any screen dimension discrepancies that usually occur when the
                 * raw viewport dimensions say the orientation is in one mode, but the raw screen dimensions
                 * say it is in another mode. Certain devices e.g. iPad will not change screen dimensions as the
                 * orientation changes. When this happens, we reverse values for screen_w and screen_h to compensate
                 */
                fixed_screen_dim_bool = !!((is_landscape_v_bool === true && is_landscape_s_bool === false) || (is_landscape_v_bool === false && is_landscape_s_bool === true));

                dim_res = (fixed_screen_dim_bool) ? screen_h_int : screen_w_int ;

                //get the fixed screen width
                screen_w_fix_int = (fixed_screen_dim_bool) ? screen_h_int : screen_w_int ;

                dim_res_adj = dim_res * pixel_ratio_device_int;
                adj_dim_res_bool = adj_screen_size_bool ? ((in_array(dim_res, std_w_arr) || in_array(dim_res_adj, std_w_arr)) ? false: true) : false;
                break;

            case (type_str == 'sH'):
                /**
                 * This aims to correct any screen dimension discrepancies that usually occur when the
                 * raw viewport dimensions say the orientation is in one mode, but the raw screen dimensions
                 * say it is in another mode. Certain devices e.g. iPad will not change screen dimensions as the
                 * orientation changes. When this happens, we reverse values for screen_w and screen_h to compensate
                 */
                fixed_screen_dim_bool = !!((is_landscape_v_bool === true && is_landscape_s_bool === false) || (is_landscape_v_bool === false && is_landscape_s_bool === true));

                dim_res = (fixed_screen_dim_bool) ? screen_w_int : screen_h_int ;

                //get the fixed screen width
                screen_w_fix_int = (fixed_screen_dim_bool) ? screen_h_int : screen_w_int ;

                dim_res_adj = dim_res * pixel_ratio_device_int;
                adj_dim_res_bool = adj_screen_size_bool ? ((in_array(dim_res, std_h_arr) || in_array(dim_res_adj, std_h_arr)) ? false: true) : false;
                break;
        }

        /**
         * Get the virtual pixel ratio i.e. screen vs viewport dimensions
         */
        pixel_ratio_virtual_int = screen_w_fix_int/viewport_w_int;

        /**
         * Return if Device Pixel Ratio is 1 or less and Virtual Pixel Ratio is less than 1.1
         */
        switch(true)
        {
            case (pixel_ratio_device_int <= 1 && pixel_ratio_virtual_int <= 1.1):
                switch(true)
                {
                    case (type_str == 'sW' && adj_dim_res_bool):
                        dim_res = getClosestNumberMatchArray(std_w_arr, dim_res, '', '', 8);
                        break;

                    case (type_str == 'sH' && adj_dim_res_bool):
                        dim_res = getClosestNumberMatchArray(std_h_arr, dim_res, '', '', 8);
                        break;
                }
                return dim_res;
                break;
        }

        /**
         * Continue if Pixel Ratio is greater than 1
         */
        switch(true)
        {
            case (is_ios_bool):
                dim_res = dim_res * pixel_ratio_device_int;
                break;

            default:
                switch(true)
                {
                    case (!is_android_2_bool):
                        /**
                         * Case 1: Device Pixel Ratio is 1 or less, and Virtual Pixel Ratio is greater than 1.1
                         * Update Viewport Dimensions only. Do not update Screen Dimensions
                         * Case 2. Device Pixel Ratio is more than 1, and Virtual Pixel Ratio is less than or equal to 1.1
                         * Update both Viewport and Screen Dimensions
                         * Case 3. Device Pixel Ratio is more than 1, and Virtual Pixel Ratio is greater than 1.1
                         * Update Viewport Dimensions only. Do not update Screen Dimensions
                         */
                        switch(true)
                        {
                            //1
                            case (pixel_ratio_device_int <= 1 && pixel_ratio_virtual_int > 1.1):
                                dim_res = (in_array(type_str, ['vW', 'vH'])) ? dim_res * pixel_ratio_virtual_int : dim_res;
                                break;
                            //2
                            case (pixel_ratio_device_int > 1 && pixel_ratio_virtual_int <= 1.1):
                                switch(true)
                                {
                                    case (pixel_ratio_device_int <= 1.1):
                                        //Special Operation for some devices that report device pixel ratio slightly above one
                                        switch(true)
                                        {
                                            case (in_array(type_str, ['vW', 'vH'])):
                                                dim_res = dim_res * pixel_ratio_device_int;
                                                dim_res = (isEvenDecimal(dim_res)) ? Math.floor(dim_res) : dim_res;
                                                break;
                                        }
                                        break;

                                    default:
                                        dim_res = dim_res * pixel_ratio_device_int;
                                }
                                break;
                            //3
                            case (pixel_ratio_device_int > 1 && pixel_ratio_virtual_int > 1.1):
                                switch(true)
                                {
                                    case (in_array(type_str, ['vW', 'vH'])):
                                        dim_res = dim_res * pixel_ratio_device_int;
                                        dim_res = (isEvenDecimal(dim_res)) ? Math.floor(dim_res) : Math.ceil(dim_res);
                                        break;
                                }
                                break;
                        }
                        break;
                }

                /**
                 * Get the nearest standard screen widths or heights
                 */
                switch(true)
                {
                    case (type_str == 'sW' && adj_dim_res_bool):
                        dim_res = getClosestNumberMatchArray(std_w_arr, dim_res, '', '', 8);
                        break;

                    case (type_str == 'sH' && adj_dim_res_bool):
                        dim_res = getClosestNumberMatchArray(std_h_arr, dim_res, '', '', 8);
                        break;
                }
        }

        dim_res = Math.floor(dim_res);
        return dim_res;
    }

    /**
     * Get the Viewport dimensions in Device-Independent Pixels
     * @param type_str {String} The type of operation. Either 'w' for width, or 'h' for height
     * @return {Number}
     * @private
     */
    function _getViewportDimensionDIP(type_str)
    {
        var dim_res,
            is_width_bool = !!((type_str == 'w')),
            is_pc_or_tv_bool = !!((isPC() || isTV())),
            pixel_ratio_int = getPixelRatio()
            ;

        switch(true)
        {
            case (is_pc_or_tv_bool):
                //If pc or tv, moderate use of pixel ratio
                pixel_ratio_int = (pixel_ratio_int <= 1.5) ? 1 : pixel_ratio_int;
                break;
        }
        dim_res = (is_width_bool) ? viewportW()/pixel_ratio_int : viewportH()/pixel_ratio_int;
        return Math.round(dim_res);
    }

    /**
     * Get the dimension of a DOM Element.
     * It uses the JQuery dimension functions e.g. width(), innerHeight(), etc.
     * @param el_obj {String} The JQuery element object
     * @param type_str {String} The type of operation. w = width, h = height
     * @param format_str {String} The dimension retrieval method to use. There are three as follows
     * 1: d = default = el_obj.width() or el_obj.height()
     * 2: i = inner = el_obj.innerWidth() or el_obj.innerHeight()
     * 3: o = outer = el_obj.outerWidth() or el_obj.outerHeight()
     * @param force_dip_bool {Boolean} Determines whether to consider the element dimensions in device-independent pixel format or not. true = do not use DIP, false [default] = use DIP
     * @return {Number|Boolean}
     * @private
     */
    function _getElementDimension(el_obj, type_str)
    {
        var myArgs = Array.prototype.slice.call(arguments),
            format_str = (isString(myArgs[2]) && myArgs[2] != "") ? myArgs[2]: 'd',
            force_dip_bool = (isBool(myArgs[3])) ? myArgs[3]: false,
            dim_final_int
            ;
        type_str = type_str.toLowerCase();

        switch(true)
        {
            case (type_str == 'w'):
                switch(true)
                {
                    case (format_str == 'i'):
                        dim_final_int = el_obj.innerWidth();
                        break;

                    case (format_str == 'o'):
                        dim_final_int = el_obj.outerWidth();
                        break;

                    default:
                        dim_final_int = el_obj.width();
                }
                break;

            case (type_str == 'h'):
                switch(true)
                {
                    case (format_str == 'i'):
                        dim_final_int = el_obj.innerHeight();
                        break;

                    case (format_str == 'o'):
                        dim_final_int = el_obj.outerHeight();
                        break;

                    default:
                        dim_final_int = el_obj.height();
                }
                break;

            default:
                dim_final_int = false;
        }

        switch(true)
        {
            case (force_dip_bool === false):
                //Convert to Device Pixels
                dim_final_int = dim_final_int * getPixelRatio();
                break;
        }

        return dim_final_int;
    }

    /**
     * Get the width of a DOM element
     * @param el_obj {Object} The JQuery Element Object
     * @param dim_format_str {String} The dimension retrieval method to use.
     * @param force_dip_bool {Boolean} Flag for forced Device-Independent Pixel consideration
     * @return {Number|Boolean}
     * @private
     */
    function _elementW(el_obj){
        var myArgs = Array.prototype.slice.call(arguments),
            dim_format_str = myArgs[1],
            force_dip_bool = myArgs[2]
            ;
        return _getElementDimension(el_obj, 'w', dim_format_str, force_dip_bool);
    }

    /**
     * Get the height of a DOM element
     * @param el_obj {Object} The JQuery Element Object
     * @param dim_format_str {String} The dimension retrieval method to use.
     * @param force_dip_bool {Boolean} Flag for forced Device-Independent Pixel consideration
     * @return {Number|Boolean}
     * @private
     */
    function _elementH(el_obj){
        var myArgs = Array.prototype.slice.call(arguments),
            dim_format_str = myArgs[1],
            force_dip_bool = myArgs[2]
            ;
        return _getElementDimension(el_obj, 'h', dim_format_str, force_dip_bool);
    }

    /**
     * Get the width of the viewport
     * @return {*|Number}
     */
    function viewportW(){
        return (isStorageValueSet("rstv_viewportW")) ? store("rstv_viewportW"): _getDimension('vW', store("rstv_is_getdim_screen_adj"));
    }

    /**
     * Get the height of the viewport
     * @return {*|Number}
     */
    function viewportH(){
        return (isStorageValueSet("rstv_viewportH")) ? store("rstv_viewportH"): _getDimension('vH', store("rstv_is_getdim_screen_adj"));
    }

    /**
     * Get the width of the screen i.e. device width
     * @return {*|Number}
     */
    function screenW(){
        return (isStorageValueSet("rstv_screenW")) ? store("rstv_screenW"): _getDimension('sW', store("rstv_is_getdim_screen_adj"));
    }

    /**
     * Get the height of the screen i.e. device height
     * @return {*|Number}
     */
    function screenH(){
        return (isStorageValueSet("rstv_screenH")) ? store("rstv_screenH"): _getDimension('sH', store("rstv_is_getdim_screen_adj"));
    }

    /**
     * Get the Device-Independent Pixel width of the viewport
     */
    function pixelW()
    {
        return (isStorageValueSet("rstv_viewportW_dip")) ? store("rstv_viewportW_dip"): _getViewportDimensionDIP('w');
    }

    /**
     * Get the Device-Independent Pixel height of the viewport
     */
    function pixelH()
    {
        return (isStorageValueSet("rstv_viewportH_dip")) ? store("rstv_viewportH_dip"): _getViewportDimensionDIP('h');
    }

    /**
     * Resets/Updates the cached values (localStorage) of Viewport and Screen Dimension Info
     * @private
     */
    function _updateDimensionStore()
    {
        //reset
        store("rstv_viewportW rstv_viewportW_dip rstv_viewportH rstv_viewportH_dip rstv_screenW rstv_screenH", null);

        //reload
        store("rstv_viewportW", viewportW());
        store("rstv_viewportH", viewportH());
        store("rstv_screenW", screenW());
        store("rstv_screenH", screenH());
        store("rstv_viewportW_dip", pixelW());
        store("rstv_viewportH_dip", pixelH());
    }

    /**
     * Get the Device Pixel Ratio
     * @param decimal {Number} An optional number (integer or float) to check against actual pixel ratio
     * @return {Number|Boolean}
     */
    function getPixelRatio(decimal)
    {
        //check if pixel ratio check has already been done. If so, return stored value
        switch(true)
        {
            case (isStorageValueSet("rstv_pixel_ratio")):
                return store("rstv_pixel_ratio");
                break;
        }

        var device_user_agent_str = getUserAgent(),
            is_opera_browser_bool = /opera.+(mini|mobi)/i.test(device_user_agent_str),
            doc_client_w = store("rstv_var_doc_client_w"),
            win_outer_w = store("rstv_var_win_outer_w"),
            win_screen_w = store("rstv_var_win_screen_w"),
            is_symbian_bool = !!(isSymbian()),
            is_windows_bool = !!(isWindows()),
            is_android_1_bool = !!((isAndroid('1.'))),
            is_android_2_bool = !!((isAndroid('2.'))),
            is_special_needs_bool = !!(((is_android_1_bool || is_android_2_bool) || is_symbian_bool || is_windows_bool)),
            is_windows_or_symbian_bool = !!(is_windows_bool || is_symbian_bool),
            viewport_w = (is_special_needs_bool) ? ((win_outer_w <= 0) ? doc_client_w : win_outer_w) : doc_client_w,
            screen_w = ((is_android_2_bool || is_symbian_bool) && !is_opera_browser_bool) ? ((win_outer_w <= 0) ? win_screen_w : win_outer_w) : win_screen_w,
            dPR,
            dPR_temp,
            dPR_virtual,
            dPR_retr
            ;

        /**
         * Get the Pixel Ratio
         * Make Adjustments for when window.devicePixelRatio is 0
         */
        dPR_temp = win.devicePixelRatio;
        switch(true)
        {
            case (dPR_temp <= 0 || typeof dPR_temp === 'undefined' || dPR_temp === null):
                dPR_virtual = screen_w/viewport_w;
                dPR = dPR_virtual;
                switch(true)
                {
                    case (is_windows_or_symbian_bool):
                        switch(true)
                        {
                            case (dPR > 0.5 && dPR < 1.2):
                                dPR = 1;
                                break;

                            case (dPR >= 1.2 && dPR < 2):
                                dPR = 1.5;
                                break;

                            case (dPR >= 2 && dPR < 3):
                                dPR = 2;
                                break;

                            case (dPR >= 3):
                                dPR = 3;
                                break;

                            default:
                                dPR = 1;
                        }
                        break;
                }
                store("rstv_pixel_ratio_virtual", dPR_virtual);
                break;

            default:
                dPR = dPR_temp;
        }

        //Return Pixel Ratio variations
        switch(true)
        {
            case (!isNumber(decimal)):
                dPR_retr = dPR || (getPixelRatio(3) ? 3 : getPixelRatio(2) ? 2 : getPixelRatio(1.5) ? 1.5 : getPixelRatio(1) ? 1 : 0);
                store("rstv_pixel_ratio", dPR_retr);
                return dPR_retr;
                break;
        }

        //Return false if not finite
        switch(true)
        {
            case (!isFinite(decimal)):
                return false;
                break;
        }

        switch(true)
        {
            case (dPR && dPR > 0):
                return dPR >= decimal;
                break;
        }

        //Revert to .matchMedia/.msMatchMedia for Gecko (FF6+) support
        decimal = 'only all and (min--moz-device-pixel-ratio:' + decimal + ')';
        switch(true)
        {
            case (media(decimal).matches):
                return true;
                break;
        }

        return !!media(decimal.replace('-moz-', '')).matches;
    }

    /**
     * Checks if the device is a Retina-device i.e. it has a Pixel Ratio of 2 or greater
     * @return {Boolean}
     */
    function isRetina()
    {
        var pixel_ratio_int = getPixelRatio();
        switch(true)
        {
            case (pixel_ratio_int >= 2):
                return true;
                break;
        }

        return false;
    }

    /**
     * A comparison function for checking if a number is within a range of two other numbers
     * @param {Function} fn
     * @return {Function}
     */
    function rangeCompare(fn) {
        return function(min, max) {
            var myArgs = Array.prototype.slice.call(arguments),
                bool,
                el = myArgs[2],
                el_valid_bool = !!((isObject(el) && (typeof el !== "undefined" && el !== null))),
                wf = myArgs[3],
                f_dip = myArgs[4],
                curr = (el_valid_bool) ? fn(el, wf, f_dip) : fn()
                ;

            bool = curr >= (min || 0);
            return !max ? bool : bool && curr <= max;
        };
    }

    //Range Comparison Booleans for Viewport and Screen
    vSpan = rangeCompare(viewportW);
    vPitch = rangeCompare(viewportH);
    dSpan = rangeCompare(screenW);
    dPitch = rangeCompare(screenH);
    cSpan = rangeCompare(pixelW);
    cPitch = rangeCompare(pixelH);

    //Range Comparison Booleans for DOM Element Containers
    eSpan = rangeCompare(_elementW);
    ePitch = rangeCompare(_elementH);

    /**
     * Gets the user agent of the Device
     * This function makes provision for proxy-based browsers that employ X11 forwarding
     * @return {String}
     */
    function getUserAgent()
    {
        //check if user agent check has been done and is in storage. If so, return stored value
        switch(true)
        {
            case (isStorageValueSet("rstv_user_agent")):
                return store("rstv_user_agent");
                break;
        }

        var ua = navigator.userAgent.toLowerCase(),
            is_proxy_bool;

        //Check if device user agent is being updated by proxy-based browser
        is_proxy_bool = /mozilla.+x11/i.test(ua);

        switch(true)
        {
            case (is_proxy_bool):
                $.ajax({
                    type: "GET",
                    async: false,
                    crossDomain: true,
                    url: "http://www.restive.io/ping/ua.php",
                    headers: {
                        "Cache-Control":"no-cache",
                        "Pragma":"no-cache"
                    },
                    success: function(response) {
                        ua = response;
                    },
                    error: function(xhr, status, error_msg){
                        console.log('error');/*RemoveLogging:skip*/
                    }
                });
                break;
        }

        store("rstv_user_agent", ua);
        return ua;
    }

    /**
     * Gets the Operating System Platform of the Device
     * There are six possible platforms availabel
     * (1) ios, (2) android, (3) Symbian, (4) Blackberry, (5) Windows, (6) Other
     * @return {String}
     */
    function getPlatform()
    {
        switch(true)
        {
            case (_checkOS("ios")):
                return "ios";
                break;

            case (_checkOS("android")):
                return "android";
                break;

            case (_checkOS("symbian")):
                return "symbian";
                break;

            case (_checkOS("blackberry")):
                return "blackberry";
                break;

            case (_checkOS("windows")):
                return "windows";
                break;

            default:
                return "other";
        }
    }

    /**
     * Detects the Operating System [Platform] of the Device
     * @param os_str {String} The name of the OS
     * @param version_str An optional version number [Only valid for Android]
     * @return {Boolean}
     * @private
     */
    function _checkOS(os_str)
    {
        var myArgs = Array.prototype.slice.call(arguments),
            is_version_valid_bool = !!((isString(myArgs[1]) && myArgs[1] != "")),
            version_str = '',
            version_regex_suffix_str = '',
            version_store_suffix_str = ''
            ;

        //manage version string if provided
        switch(true)
        {
            case (is_version_valid_bool):
                version_str = myArgs[1];
                version_str = version_str.replace(/^\s+|\s+$/g, "");
                version_regex_suffix_str = ' '+version_str;
                version_store_suffix_str = '_'+version_str.replace(".", "_");
                break;
        }

        //Check if value is stored. Return if true
        switch(true)
        {
            case (isStorageValueSet("rstv_is_"+os_str+version_store_suffix_str)):
                return store("rstv_is_"+os_str+version_store_suffix_str);
                break;
        }

        var nav = getUserAgent(),
            is_os_bool = false;

        switch(true)
        {
            case (os_str == "ios"):
                is_os_bool = /\bipad|\biphone|\bipod/i.test(nav);
                break;

            case (os_str == "android"):
                var pattern = new RegExp("\\bandroid"+version_regex_suffix_str, "i");
                is_os_bool = pattern.test(nav);
                break;

            case (os_str == "symbian"):
                is_os_bool = /series(4|6)0|symbian|symbos|syb-[0-9]+|\bs60\b/i.test(nav);
                break;

            case (os_str == "blackberry"):
                is_os_bool = /bb[0-9]+|blackberry|playbook|rim +tablet/i.test(nav);
                break;

            case (os_str == "windows"):
                is_os_bool = /window mobile|windows +(ce|phone)|windows +nt.+arm|windows +nt.+touch|xblwp7|zunewp7/i.test(nav);
                break;

            case (os_str == "windows_phone"):
                is_os_bool = /windows +phone|xblwp7|zunewp7/i.test(nav);
                break;

            default:
                return false;
        }

        //persist to local storage and return
        store("rstv_is_"+os_str+version_store_suffix_str, is_os_bool);
        return !!((is_os_bool));
    }

    /**
     * Checks if the Device is based on Apple's iOS Platform
     * @return {Boolean}
     */
    function isIOS()
    {
        return _checkOS("ios");
    }

    /**
     * Checks if the Device is based on Apple's iOS Platform
     * @return {Boolean}
     */
    function isApple()
    {
        return _checkOS("ios");
    }

    /**
     * Checks if the Device is based on Android Platform
     * @return {Boolean}
     */
    function isAndroid()
    {
        var myArgs = Array.prototype.slice.call(arguments),
            version_str = myArgs[0];
        return _checkOS("android", version_str);
    }

    /**
     * Checks if the Device is based on Symbian Platform
     * @return {Boolean}
     */
    function isSymbian()
    {
        return _checkOS("symbian");
    }

    /**
     * Checks if the Device is based on Blackberry Platform
     * @return {Boolean}
     */
    function isBlackberry()
    {
        return _checkOS("blackberry");
    }

    /**
     * Checks if the Device is based on a Windows Platform
     * @return {Boolean}
     */
    function isWindows()
    {
        return _checkOS("windows");
    }

    /**
     * Checks if the Device is based on Windows Phone Platform
     * @return {Boolean}
     */
    function isWindowsPhone()
    {
        return _checkOS("windows_phone");
    }

    /**
     * Mobile Browser Detection Regex
     * @param ua {String} User Agent String
     * @return {Boolean}
     * @private
     */
    function _mobileDetect(ua)
    {
        return /android|android.+mobile|avantgo|bada\/|\bbb[0-9]+|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|\bip(hone|od|ad)|iris|kindle|lge |maemo|meego.+mobile|midp|mmp|motorola|mobile.+firefox|netfront|nokia|nintendo +3ds|opera m(ob|in)i|palm|palm( os)?|phone|p(ixi|re)\/|playbook|rim +tablet|playstation.+vita|plucker|pocket|psp|samsung|(gt\-|bgt\-|sgh\-|sph\-|sch\-)[a-z][0-9]+|series(4|6)0|symbian|symbos|\bs60\b|treo|up\.(browser|link)|vertu|vodafone|wap|windows (ce|phone)|windows +nt.+arm|windows +nt.+touch|xda|xiino|xblwp7|zunewp7/i.test(ua) || /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(di|rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb|b\-[0-9]+)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(ua.substr(0, 4));
    }

    /**
     * Gets the Form Factor of the device
     * There are only three form factors availabel
     * (1) Phone, (2) Tablet, (3) TV, (4) PC
     * @return {String}
     */
    function getFormFactor()
    {
        var form_factor_str = "";

        switch(true)
        {
            case (isTablet()):
                form_factor_str = "tablet";
                break;

            case (isTV()):
                form_factor_str = "tv";
                break;

            default:
                switch(true)
                {
                    case (isPhone()):
                        form_factor_str = "phone";
                        break;

                    default:
                        form_factor_str = "pc";
                }
        }

        return form_factor_str;
    }

    /**
     * Check if the Device is a Phone
     * @return {Boolean}
     */
    function isPhone()
    {
        //check if phone check has already been done. If so, return stored value
        switch(true)
        {
            case (isStorageValueSet("rstv_is_phone")):
                return store("rstv_is_phone");
                break;
        }

        //Check if Device is a Tablet
        switch(true)
        {
            case (isTablet(true) || isTV()):
                //is not phone
                store("rstv_is_phone", false);
                return false;
                break;
        }

        //Check if it is a phone
        switch(true)
        {
            case (_mobileDetect(getUserAgent() || navigator.vendor.toLowerCase() || window.opera)):
                store("rstv_is_phone", true);
                return true;
                break;
        }

        store("rstv_is_phone", false);
        return false;
    }

    /**
     * Check if the Device is a Tablet
     * @param bypass_storage_bool {Boolean} Prevent this method from caching its result in local storage
     * @return {Boolean}
     */
    function isTablet()
    {
        var myArgs = Array.prototype.slice.call(arguments),
            bypass_storage_bool = isBool(myArgs[0]) ? myArgs[0] : false
            ;

        //check if tablet check has already been done. If so, return stored value
        switch(true)
        {
            case (isStorageValueSet("rstv_is_tablet")):
                return store("rstv_is_tablet");
                break;
        }

        var regex_raw_str,
            regex,
            is_tablet_bool,
            nav = getUserAgent(),
            pixel_w_int = parseInt(store("rstv_viewportW_dip")),
            pixel_h_int = parseInt(store("rstv_viewportH_dip")),
            pixel_dim_int = (store("rstv_is_portrait")) ? pixel_w_int : pixel_h_int
            ;

        //if iPad or Blackberry Playbook, return true
        regex = new RegExp("ipad|playbook|rim +tablet", "i");
        is_tablet_bool = regex.test(nav);
        switch(true)
        {
            case (is_tablet_bool):
                if(!bypass_storage_bool){ store("rstv_is_tablet", true); }
                return true;
                break;
        }

        //if Windows Surface, return true
        regex = new RegExp("windows +nt.+arm|windows +nt.+touch", "i");
        is_tablet_bool = regex.test(nav);
        switch(true)
        {
            case (is_tablet_bool):
                switch(true)
                {
                    case (isNumber(pixel_dim_int) && (pixel_dim_int <= 520)):
                        if(!bypass_storage_bool){
                            store("rstv_is_tablet", false);
                            if(store("rstv_is_phone") === false){ store("rstv_is_phone", true);}
                        }
                        return false;
                        break;

                    default:
                        if(!bypass_storage_bool){ store("rstv_is_tablet", true); }
                        return true;
                }
                break;
        }

        /**
         * Check Other Known Tablets
         *
         * 1. Amazon Kindle: android.+kindle|kindle +fire|android.+silk|silk.*accelerated
         * 2. Google Nexus Tablet: android.+nexus +(7|10)
         * 3. Samsung Tablet: samsung.*tablet|galaxy.*tab|sc-01c|gt-p1000|gt-p1003|gt-p1010|gt-p3105|gt-p6210|gt-p6800|gt-p6810|gt-p7100|gt-p7300|gt-p7310|gt-p7500|gt-p7510|sch-i800|sch-i815|sch-i905|sgh-i957|sgh-i987|sgh-t849|sgh-t859|sgh-t869|sph-p100|gt-p3100|gt-p3108|gt-p3110|gt-p5100|gt-p5110|gt-p6200|gt-p7320|gt-p7511|gt-n8000|gt-p8510|sgh-i497|sph-p500|sgh-t779|sch-i705|sch-i915|gt-n8013|gt-p3113|gt-p5113|gt-p8110|gt-n8010|gt-n8005|gt-n8020|gt-p1013|gt-p6201|gt-p7501|gt-n5100|gt-n5110|shv-e140k|shv-e140l|shv-e140s|shv-e150s|shv-e230k|shv-e230l|shv-e230s|shw-m180k|shw-m180l|shw-m180s|shw-m180w|shw-m300w|shw-m305w|shw-m380k|shw-m380s|shw-m380w|shw-m430w|shw-m480k|shw-m480s|shw-m480w|shw-m485w|shw-m486w|shw-m500w|gt-i9228|sch-p739|sch-i925|gt-i9200|gt-i9205|gt-p5200|gt-p5210|sm-t311|sm-t310|sm-t210|sm-t210r|sm-t211|sm-p600|sm-p601|sm-p605|sm-p900|sm-t217|sm-t217a|sm-t217s|sm-p6000|sm-t3100|sgh-i467|xe500
         * 4. HTC Tablet: htc flyer|htc jetstream|htc-p715a|htc evo view 4g|pg41200
         * 5. Motorola Tablet: xoom|sholest|mz615|mz605|mz505|mz601|mz602|mz603|mz604|mz606|mz607|mz608|mz609|mz615|mz616|mz617
         * 6. Asus Tablet: transformer|^.*padfone((?!mobile).)*$|tf101|tf201|tf300|tf700|tf701|tf810|me171|me301t|me302c|me371mg|me370t|me372mg|me172v|me173x|me400c|slider *sl101
         * 7. Nook Tablet: android.+nook|nookcolor|nook browser|bnrv200|bnrv200a|bntv250|bntv250a|bntv400|bntv600|logicpd zoom2
         * 8. Acer Tablet: android.*\b(a100|a101|a110|a200|a210|a211|a500|a501|a510|a511|a700|a701|w500|w500p|w501|w501p|w510|w511|w700|g100|g100w|b1-a71|b1-710|b1-711|a1-810)\b|w3-810
         * 9. Toshiba Tablet: android.*(at100|at105|at200|at205|at270|at275|at300|at305|at1s5|at500|at570|at700|at830)|toshiba.*folio
         * 10. LG Tablet: \bl-06c|lg-v900|lg-v905|lg-v909
         * 11. Yarvik Tablet: android.+(xenta.+tab|tab210|tab211|tab224|tab250|tab260|tab264|tab310|tab360|tab364|tab410|tab411|tab420|tab424|tab450|tab460|tab461|tab464|tab465|tab467|tab468|tab469)
         * 12. Medion Tablet: android.+\boyo\b|life.*(p9212|p9514|p9516|s9512)|lifetab
         * 13. Arnova Tablet: an10g2|an7bg3|an7fg3|an8g3|an8cg3|an7g3|an9g3|an7dg3|an7dg3st|an7dg3childpad|an10bg3|an10bg3dt
         * 14. Archos Tablet: android.+archos|\b(101g9|80g9|a101it)\b|qilive 97r|
         * 15. Ainol Tablet: novo7|novo7aurora|novo7basic|novo7paladin|novo8|novo9|novo10
         * 16. Sony Tablet: sony tablet|sony tablet s|sgpt12|sgpt121|sgpt122|sgpt123|sgpt111|sgpt112|sgpt113|sgpt211|sgpt213|ebrd1101|ebrd1102|ebrd1201|sgpt311|sgpt312|sonyso-03e
         * 17. Cube Tablet: android.*(k8gt|u9gt|u10gt|u16gt|u17gt|u18gt|u19gt|u20gt|u23gt|u30gt)|cube u8gt
         * 18. Coby Tablet: mid1042|mid1045|mid1125|mid1126|mid7012|mid7014|mid7034|mid7035|mid7036|mid7042|mid7048|mid7127|mid8042|mid8048|mid8127|mid9042|mid9740|mid9742|mid7022|mid7010
         * 19. SMiTTablet: android.*(\bmid\b|mid-560|mtv-t1200|mtv-pnd531|mtv-p1101|mtv-pnd530)
         * 20. RockchipTablet: android.*(rk2818|rk2808a|rk2918|rk3066)|rk2738|rk2808a
         * 21. TelstraTablet: t-hub2
         * 22. FlyTablet: iq310|fly vision
         * 23. bqTablet: bq.*(elcano|curie|edison|maxwell|kepler|pascal|tesla|hypatia|platon|newton|livingstone|cervantes|avant)
         * 24. HuaweiTablet: mediapad|ideos s7|s7-201c|s7-202u|s7-101|s7-103|s7-104|s7-105|s7-106|s7-201|s7-slim
         * 25. NecTablet: \bn-06d|\bn-08d
         * 26. Pantech: pantech.*p4100
         * 27. BronchoTablet: broncho.*(n701|n708|n802|a710)
         * 28. VersusTablet: touchpad.*[78910]|\btouchtab\b
         * 29. Zynctablet: z1000|z99 2g|z99|z930|z999|z990|z909|z919|z900
         * 30. Positivo: tb07sta|tb10sta|tb07fta|tb10fta
         * 31. NabiTablet: android.*\bnabi
         * 32. Playstation: playstation.*(portable|vita)
         * 33. Dell: dell.*streak
         * 34. Milagrow: milagrow +tab.*top
         * 35. Lenovo: android.+(ideapad|ideatab|lenovo +a1|s2110|s6000|k3011|a3000|a1000|a2107|a2109|a1107)
         * 37. UPad: android.+f8-sup
         * 38. Kobo: android.+(k080|arc|vox)
         * 39. MSI: android.*(msi.+enjoy|enjoy +7|enjoy +10)
         * 40. Agasio: dropad.+a8
         * 41. Acho: android.+c906
         * 42. Iberry: android.+iberry.+auxus
         * 43. Aigo: android.+aigopad
         * 44. Airpad: android.*(airpad|liquid metal)
         * 45. HCL: android.+hcl.+tablet|connect-3g-2.0|connect-2g-2.0|me tablet u1|me tablet u2|me tablet g1|me tablet x1|me tablet y2|me tablet sync
         * 46. Karbonn: android.*(a39|a37|a34|st8|st10|st7|smarttab|smart +tab)
         * 47. Micromax: android.*(micromax.+funbook|funbook|p250|p275|p300|p350|p362|p500|p600)|micromax.*(p250|p275|p350|p362|p500|p600)|funbook
         * 48. Penta: android.+penta
         * 49. Celkon: android.*(celkon.+ct|ct-[0-9])
         * 50. Intex: android.+i-buddy
         * 51. Viewsonic: android.*(viewbook|viewpad)
         * 52: ZTE: android.*(v9|zte.+v8110|light tab|light pro|beeline|base.*tab)
         * 53. Pegatron: chagall
         * 54. Advan: android.*(vandroid|t3i)
         * 55. Creative: android.*(ziio7|ziio10)
         * 56. OlivePad: android.*(v-t100|v-tw100|v-tr200|v-t300)
         * 57. Vizio: android.+vtab1008
         * 58. Bookeen: bookeen|cybook
         * 59. Medion: android.*lifetab_(s9512|p9514|p9516)
         * 60. IRU Tablet: m702pro
         * 61. IRULU: irulu-al101
         * 62. Prestigio: pmp3170b|pmp3270b|pmp3470b|pmp7170b|pmp3370b|pmp3570c|pmp5870c|pmp3670b|pmp5570c|pmp5770d|pmp3970b|pmp3870c|pmp5580c|pmp5880d|pmp5780d|pmp5588c|pmp7280c|pmp7280|pmp7880d|pmp5597d|pmp5597|pmp7100d|per3464|per3274|per3574|per3884|per5274|per5474|pmp5097cpro|pmp5097|pmp7380d|pmp5297c|pmp5297c_quad
         * 63. AllView: allview.*(viva|alldro|city|speed|all tv|frenzy|quasar|shine|tx1|ax1|ax2)
         * 64: Megafon: megafon v9
         * 65: Lava: android.+(z7c|z7h|z7s)
         * 66: iBall: android.+iball.+slide.+(3g *7271|3g *7334|3g *7307|3g *7316|i7119|i7011)|android.+iball.+i6012
         * 67. Tabulet: android.+(tabulet|troy +duos)
         * 68. Texet Tablet: navipad|tb-772a|tm-7045|tm-7055|tm-9750|tm-7016|tm-7024|tm-7026|tm-7041|tm-7043|tm-7047|tm-8041|tm-9741|tm-9747|tm-9748|tm-9751|tm-7022|tm-7021|tm-7020|tm-7011|tm-7010|tm-7023|tm-7025|tm-7037w|tm-7038w|tm-7027w|tm-9720|tm-9725|tm-9737w|tm-1020|tm-9738w|tm-9740|tm-9743w|tb-807a|tb-771a|tb-727a|tb-725a|tb-719a|tb-823a|tb-805a|tb-723a|tb-715a|tb-707a|tb-705a|tb-709a|tb-711a|tb-890hd|tb-880hd|tb-790hd|tb-780hd|tb-770hd|tb-721hd|tb-710hd|tb-434hd|tb-860hd|tb-840hd|tb-760hd|tb-750hd|tb-740hd|tb-730hd|tb-722hd|tb-720hd|tb-700hd|tb-500hd|tb-470hd|tb-431hd|tb-430hd|tb-506|tb-504|tb-446|tb-436|tb-416|tb-146se|tb-126se
         * 69. GalapadTablet: android.*\bg1\b
         * 70. GUTablet: tx-a1301|tx-m9002|q702
         * 71. GT-Pad: ly-f528
         * 72. Danew: android.+dslide.*\b(700|701r|702|703r|704|802|970|971|972|973|974|1010|1012)\b
         * 73. MIDTablet: m9701|m9000|m9100|m806|m1052|m806|t703|mid701|mid713|mid710|mid727|mid760|mid830|mid728|mid933|mid125|mid810|mid732|mid120|mid930|mid800|mid731|mid900|mid100|mid820|mid735|mid980|mid130|mid833|mid737|mid960|mid135|mid860|mid736|mid140|mid930|mid835|mid733
         * 74. Fujitsu: android.*\b(f-01d|f-05e|f-10d|m532|q572)\b
         * 75. GPad: android.+casiatab8
         * 76. Tesco Hudl: android.+hudl
         * 77. Polaroid: android.*(polaroid.*tablet|pmid1000|pmid10c|pmid800|pmid700|pmid4311|pmid701c|pmid701i|pmid705|pmid706|pmid70dc|pmid70c|pmid720|pmid80c|pmid901|ptab7200|ptab4300|ptab750|midc010|midc407|midc409|midc410|midc497|midc700|midc800|midc801|midc802|midc901)
         * 78. Eboda: e-boda.+(supreme|impresspeed|izzycomm|essential)
         * 79. HP Tablet: hp slate 7|hp elitepad 900|hp-tablet|elitebook.*touch
         * 80. AllFineTablet: fine7 genius|fine7 shine|fine7 air|fine8 style|fine9 more|fine10 joy|fine11 wide
         * 81. Sanei: android.*\b(n10|n10-4core|n78|n79|n83|n90 ii)\b
         * 82: ProScan Tablet: \b(pem63|plt1023g|plt1041|plt1044|plt1044g|plt1091|plt4311|plt4311pl|plt4315|plt7030|plt7033|plt7033d|plt7035|plt7035d|plt7044k|plt7045k|plt7045kb|plt7071kg|plt7072|plt7223g|plt7225g|plt7777g|plt7810k|plt7849g|plt7851g|plt7852g|plt8015|plt8031|plt8034|plt8036|plt8080k|plt8082|plt8088|plt8223g|plt8234g|plt8235g|plt8816k|plt9011|plt9045k|plt9233g|plt9735|plt9760g|plt9770g)\b
         * 83: YonesTablet : bq1078|bc1003|bc1077|rk9702|bc9730|bc9001|it9001|bc7008|bc7010|bc708|bc728|bc7012|bc7030|bc7027|bc7026
         * 84: ChangJiaTablet: tpc7102|tpc7103|tpc7105|tpc7106|tpc7107|tpc7201|tpc7203|tpc7205|tpc7210|tpc7708|tpc7709|tpc7712|tpc7110|tpc8101|tpc8103|tpc8105|tpc8106|tpc8203|tpc8205|tpc8503|tpc9106|tpc9701|tpc97101|tpc97103|tpc97105|tpc97106|tpc97111|tpc97113|tpc97203|tpc97603|tpc97809|tpc97205|tpc10101|tpc10103|tpc10106|tpc10111|tpc10203|tpc10205|tpc10503
         * 85: RoverPad: android.*(roverpad|rp3wg70)
         * 86. PointofView Tablet: tab-p506|tab-navi-7-3g-m|tab-p517|tab-p-527|tab-p701|tab-p703|tab-p721|tab-p731n|tab-p741|tab-p825|tab-p905|tab-p925|tab-pr945|tab-pl1015|tab-p1025|tab-pi1045|tab-p1325|tab-protab[0-9]+|tab-protab25|tab-protab26|tab-protab27|tab-protab26xl|tab-protab2-ips9|tab-protab30-ips9|tab-protab25xxl|tab-protab26-ips10|tab-protab30-ips10
         * 87: Overmax: android.*ov-(steelcore|newbase|basecore|baseone|exellen|quattor|edutab|solution|action|basictab|teddytab|magictab|stream|tb-08|tb-09)
         * 88: DPS Tablet: dps dream 9|dps dual 7
         * 89: Visture Tablet: v97 hd|i75 3g|visture v4( hd)?|visture v5( hd)?|visture v10
         * 90: Cresta Tablet: ctp(-)?810|ctp(-)?818|ctp(-)?828|ctp(-)?838|ctp(-)?888|ctp(-)?978|ctp(-)?980|ctp(-)?987|ctp(-)?988|ctp(-)?989
         * 200. Generic Tablet: android.*\b97d\b|tablet(?!.*pc)|viewpad7|lg-v909|mid7015|bntv250a|logicpd zoom2|\ba7eb\b|catnova8|a1_07|ct704|ct1002|\bm721\b|rk30sdk|\bevotab\b|smarttabii10|smarttab10
         */
        regex_raw_str = ""+
            "android.+kindle|kindle +fire|android.+silk|silk.*accelerated|"+
            "android.+nexus +(7|10)|"+
            "samsung.*tablet|galaxy.*tab|sc-01c|gt-p1000|gt-p1003|gt-p1010|gt-p3105|gt-p6210|gt-p6800|gt-p6810|gt-p7100|gt-p7300|gt-p7310|gt-p7500|gt-p7510|sch-i800|sch-i815|sch-i905|sgh-i957|sgh-i987|sgh-t849|sgh-t859|sgh-t869|sph-p100|gt-p3100|gt-p3108|gt-p3110|gt-p5100|gt-p5110|gt-p6200|gt-p7320|gt-p7511|gt-n8000|gt-p8510|sgh-i497|sph-p500|sgh-t779|sch-i705|sch-i915|gt-n8013|gt-p3113|gt-p5113|gt-p8110|gt-n8010|gt-n8005|gt-n8020|gt-p1013|gt-p6201|gt-p7501|gt-n5100|gt-n5110|shv-e140k|shv-e140l|shv-e140s|shv-e150s|shv-e230k|shv-e230l|shv-e230s|shw-m180k|shw-m180l|shw-m180s|shw-m180w|shw-m300w|shw-m305w|shw-m380k|shw-m380s|shw-m380w|shw-m430w|shw-m480k|shw-m480s|shw-m480w|shw-m485w|shw-m486w|shw-m500w|gt-i9228|sch-p739|sch-i925|gt-i9200|gt-i9205|gt-p5200|gt-p5210|sm-t311|sm-t310|sm-t210|sm-t210r|sm-t211|sm-p600|sm-p601|sm-p605|sm-p900|sm-t217|sm-t217a|sm-t217s|sm-p6000|sm-t3100|sgh-i467|xe500|"+
            "htc flyer|htc jetstream|htc-p715a|htc evo view 4g|pg41200|"+
            "xoom|sholest|mz615|mz605|mz505|mz601|mz602|mz603|mz604|mz606|mz607|mz608|mz609|mz615|mz616|mz617|"+
            "transformer|^.*padfone((?!mobile).)*$|tf101|tf201|tf300|tf700|tf701|tf810|me171|me301t|me302c|me371mg|me370t|me372mg|me172v|me173x|me400c|slider *sl101|"+
            "android.+nook|nookcolor|nook browser|bnrv200|bnrv200a|bntv250|bntv250a|bntv400|bntv600|logicpd zoom2|"+
            "android.*\\b(a100|a101|a110|a200|a210|a211|a500|a501|a510|a511|a700|a701|w500|w500p|w501|w501p|w510|w511|w700|g100|g100w|b1-a71|b1-710|b1-711|a1-810)\\b|w3-810|"+
            "android.*(at100|at105|at200|at205|at270|at275|at300|at305|at1s5|at500|at570|at700|at830)|toshiba.*folio|"+
            "\\bl-06c|lg-v900|lg-v905|lg-v909|"+
            "android.+(xenta.+tab|tab210|tab211|tab224|tab250|tab260|tab264|tab310|tab360|tab364|tab410|tab411|tab420|tab424|tab450|tab460|tab461|tab464|tab465|tab467|tab468|tab469)|"+
            "android.+\\boyo\\b|life.*(p9212|p9514|p9516|s9512)|lifetab|"+
            "an10g2|an7bg3|an7fg3|an8g3|an8cg3|an7g3|an9g3|an7dg3|an7dg3st|an7dg3childpad|an10bg3|an10bg3dt|"+
            "android.+archos|\\b(101g9|80g9|a101it)\\b|qilive 97r|"+
            "novo7|novo7aurora|novo7basic|novo7paladin|novo8|novo9|novo10|"+
            "sony tablet|sony tablet s|sgpt12|sgpt121|sgpt122|sgpt123|sgpt111|sgpt112|sgpt113|sgpt211|sgpt213|ebrd1101|ebrd1102|ebrd1201|sgpt311|sgpt312|sonyso-03e|"+
            "android.*(k8gt|u9gt|u10gt|u16gt|u17gt|u18gt|u19gt|u20gt|u23gt|u30gt)|cube u8gt|"+
            "mid1042|mid1045|mid1125|mid1126|mid7012|mid7014|mid7034|mid7035|mid7036|mid7042|mid7048|mid7127|mid8042|mid8048|mid8127|mid9042|mid9740|mid9742|mid7022|mid7010|"+
            "android.*(\\bmid\\b|mid-560|mtv-t1200|mtv-pnd531|mtv-p1101|mtv-pnd530)|"+
            "android.*(rk2818|rk2808a|rk2918|rk3066)|rk2738|rk2808a|"+
            "t-hub2|"+
            "iq310|fly vision|"+
            "bq.*(elcano|curie|edison|maxwell|kepler|pascal|tesla|hypatia|platon|newton|livingstone|cervantes|avant)|"+
            "mediapad|ideos s7|s7-201c|s7-202u|s7-101|s7-103|s7-104|s7-105|s7-106|s7-201|s7-slim|"+
            "\\bn-06d|\\bn-08d|"+
            "pantech.*p4100|"+
            "broncho.*(n701|n708|n802|a710)|"+
            "touchpad.*[78910]|\\btouchtab\\b|"+
            "z1000|z99 2g|z99|z930|z999|z990|z909|z919|z900|"+
            "tb07sta|tb10sta|tb07fta|tb10fta|"+
            "android.*\\bnabi|"+
            "playstation.*(portable|vita)|"+
            "dell.*streak|"+
            "milagrow +tab.*top|"+
            "android.+(ideapad|ideatab|lenovo +a1|s2110|s6000|k3011|a3000|a1000|a2107|a2109|a1107)|"+
            "android.+f8-sup|"+
            "android.*(k080|arc|vox)|"+
            "android.*(msi.+enjoy|enjoy +7|enjoy +10)|"+
            "dropad.+a8|"+
            "android.+c906|"+
            "android.+iberry.+auxus|"+
            "android.+aigopad|"+
            "android.*(airpad|liquid metal)|"+
            "android.+hcl.+tablet|connect-3g-2.0|connect-2g-2.0|me tablet u1|me tablet u2|me tablet g1|me tablet x1|me tablet y2|me tablet sync|"+
            "android.*(a39|a37|a34|st8|st10|st7|smarttab|smart +tab)|"+
            "android.*(micromax.+funbook|funbook|p250|p275|p300|p350|p362|p500|p600)|micromax.*(p250|p275|p350|p362|p500|p600)|funbook|"+
            "android.+penta|"+
            "android.*(celkon.+ct|ct-[0-9])|"+
            "android.+i-buddy|"+
            "android.*(viewbook|viewpad)|"+
            "android.*(v9|zte.+v8110|light tab|light pro|beeline|base.*tab)|"+
            "chagall|"+
            "android.*(vandroid|t3i)|"+
            "android.*(ziio7|ziio10)|"+
            "android.*(v-t100|v-tw100|v-tr200|v-t300)|"+
            "android.+vtab1008|"+
            "bookeen|cybook|"+
            "android.*lifetab_(s9512|p9514|p9516)|"+
            "m702pro|"+
            "irulu-al101|"+
            "pmp3170b|pmp3270b|pmp3470b|pmp7170b|pmp3370b|pmp3570c|pmp5870c|pmp3670b|pmp5570c|pmp5770d|pmp3970b|pmp3870c|pmp5580c|pmp5880d|pmp5780d|pmp5588c|pmp7280c|pmp7280|pmp7880d|pmp5597d|pmp5597|pmp7100d|per3464|per3274|per3574|per3884|per5274|per5474|pmp5097cpro|pmp5097|pmp7380d|pmp5297c|pmp5297c_quad|"+
            "allview.*(viva|alldro|city|speed|all tv|frenzy|quasar|shine|tx1|ax1|ax2)|"+
            "megafon +v9|"+
            "android.+(z7c|z7h|z7s)|"+
            "android.+iball.+slide.+(3g *7271|3g *7334|3g *7307|3g *7316|i7119|i7011)|android.+iball.+i6012|"+
            "navipad|tb-772a|tm-7045|tm-7055|tm-9750|tm-7016|tm-7024|tm-7026|tm-7041|tm-7043|tm-7047|tm-8041|tm-9741|tm-9747|tm-9748|tm-9751|tm-7022|tm-7021|tm-7020|tm-7011|tm-7010|tm-7023|tm-7025|tm-7037w|tm-7038w|tm-7027w|tm-9720|tm-9725|tm-9737w|tm-1020|tm-9738w|tm-9740|tm-9743w|tb-807a|tb-771a|tb-727a|tb-725a|tb-719a|tb-823a|tb-805a|tb-723a|tb-715a|tb-707a|tb-705a|tb-709a|tb-711a|tb-890hd|tb-880hd|tb-790hd|tb-780hd|tb-770hd|tb-721hd|tb-710hd|tb-434hd|tb-860hd|tb-840hd|tb-760hd|tb-750hd|tb-740hd|tb-730hd|tb-722hd|tb-720hd|tb-700hd|tb-500hd|tb-470hd|tb-431hd|tb-430hd|tb-506|tb-504|tb-446|tb-436|tb-416|tb-146se|tb-126se|"+
            "android.*\\bg1\\b|"+
            "tx-a1301|tx-m9002|q702|"+
            "ly-f528|"+
            "android.+dslide.*\\b(700|701r|702|703r|704|802|970|971|972|973|974|1010|1012)\\b|"+
            "m9701|m9000|m9100|m806|m1052|m806|t703|mid701|mid713|mid710|mid727|mid760|mid830|mid728|mid933|mid125|mid810|mid732|mid120|mid930|mid800|mid731|mid900|mid100|mid820|mid735|mid980|mid130|mid833|mid737|mid960|mid135|mid860|mid736|mid140|mid930|mid835|mid733|"+
            "android.*\\b(f-01d|f-05e|f-10d|m532|q572)\\b|"+
            "android.+casiatab8|"+
            "android.+hudl|"+
            "android.*(polaroid.*tablet|pmid1000|pmid10c|pmid800|pmid700|pmid4311|pmid701c|pmid701i|pmid705|pmid706|pmid70dc|pmid70c|pmid720|pmid80c|pmid901|ptab7200|ptab4300|ptab750|midc010|midc407|midc409|midc410|midc497|midc700|midc800|midc801|midc802|midc901)|"+
            "e-boda.+(supreme|impresspeed|izzycomm|essential)|"+
            "hp slate 7|hp elitepad 900|hp-tablet|elitebook.*touch|"+
            "fine7 genius|fine7 shine|fine7 air|fine8 style|fine9 more|fine10 joy|fine11 wide|"+
            "android.*\\b(n10|n10-4core|n78|n79|n83|n90 ii)\\b|"+
            "\\b(pem63|plt1023g|plt1041|plt1044|plt1044g|plt1091|plt4311|plt4311pl|plt4315|plt7030|plt7033|plt7033d|plt7035|plt7035d|plt7044k|plt7045k|plt7045kb|plt7071kg|plt7072|plt7223g|plt7225g|plt7777g|plt7810k|plt7849g|plt7851g|plt7852g|plt8015|plt8031|plt8034|plt8036|plt8080k|plt8082|plt8088|plt8223g|plt8234g|plt8235g|plt8816k|plt9011|plt9045k|plt9233g|plt9735|plt9760g|plt9770g)\\b|"+
            "bq1078|bc1003|bc1077|rk9702|bc9730|bc9001|it9001|bc7008|bc7010|bc708|bc728|bc7012|bc7030|bc7027|bc7026|"+
            "tpc7102|tpc7103|tpc7105|tpc7106|tpc7107|tpc7201|tpc7203|tpc7205|tpc7210|tpc7708|tpc7709|tpc7712|tpc7110|tpc8101|tpc8103|tpc8105|tpc8106|tpc8203|tpc8205|tpc8503|tpc9106|tpc9701|tpc97101|tpc97103|tpc97105|tpc97106|tpc97111|tpc97113|tpc97203|tpc97603|tpc97809|tpc97205|tpc10101|tpc10103|tpc10106|tpc10111|tpc10203|tpc10205|tpc10503|"+
            "android.*(roverpad|rp3wg70)|"+
            "tab-p506|tab-navi-7-3g-m|tab-p517|tab-p-527|tab-p701|tab-p703|tab-p721|tab-p731n|tab-p741|tab-p825|tab-p905|tab-p925|tab-pr945|tab-pl1015|tab-p1025|tab-pi1045|tab-p1325|tab-protab[0-9]+|tab-protab25|tab-protab26|tab-protab27|tab-protab26xl|tab-protab2-ips9|tab-protab30-ips9|tab-protab25xxl|tab-protab26-ips10|tab-protab30-ips10|"+
            "android.*ov-(steelcore|newbase|basecore|baseone|exellen|quattor|edutab|solution|action|basictab|teddytab|magictab|stream|tb-08|tb-09)|"+
            "dps dream 9|dps dual 7|"+
            "v97 hd|i75 3g|visture v4( hd)?|visture v5( hd)?|visture v10|"+
            "ctp(-)?810|ctp(-)?818|ctp(-)?828|ctp(-)?838|ctp(-)?888|ctp(-)?978|ctp(-)?980|ctp(-)?987|ctp(-)?988|ctp(-)?989|"+
            "android.*\\b97d\\b|tablet(?!.*pc)|viewpad7|lg-v909|mid7015|bntv250a|logicpd zoom2|\\ba7eb\\b|catnova8|a1_07|ct704|ct1002|\\bm721\\b|rk30sdk|\\bevotab\\b|smarttabii10|smarttab10"+
            "";

        //Check Main Tablet
        regex = new RegExp(regex_raw_str, "i");
        is_tablet_bool = regex.test(nav);
        switch(true)
        {
            case (is_tablet_bool):
                if(!bypass_storage_bool){ store("rstv_is_tablet", true); }
                return true;
                break;
        }

        //Check Android Tablet
        var regex_1_bool = /android/i.test(nav),
            regex_2_bool = !/mobile/i.test(nav)
            ;

        switch(true)
        {
            case (regex_1_bool):
                /**
                 * if tablet has either:
                 * 1. Device independent viewport width between 520px and 800px when in portrait
                 * 2. Device independent viewport height between 520px and 800px when in landscape
                 */
                switch(true)
                {
                    case (isNumber(pixel_dim_int) && (pixel_dim_int >= 520 && pixel_dim_int <= 810)):
                        if(!bypass_storage_bool){
                            store("rstv_is_tablet", true);
                            if(store("rstv_is_phone")){ store("rstv_is_phone", false);}
                        }
                        return true;
                        break;
                }

                //if user agent is Android but 'mobile' keyword is absent
                switch(true)
                {
                    case (regex_2_bool):
                        if(!bypass_storage_bool){ store("rstv_is_tablet", true); }
                        return true;
                        break;
                }

                break;
        }

        //Return false if otherwise
        if(!bypass_storage_bool){ store("rstv_is_tablet", false); }
        return false;
    }

    /**
     * Check if the device is a TV
     * @return {Boolean}
     */
    function isTV()
    {
        //check if TV check has already been done. If so, return stored value
        switch(true)
        {
            case (isStorageValueSet("rstv_is_tv")):
                return store("rstv_is_tv");
                break;
        }

        //get the user agent
        var nav = getUserAgent();

        /**
         * Check for known TVs
         */
        var is_tv_bool = /googletv|smart\-tv|smarttv|internet +tv|netcast|nettv|appletv|boxee|kylo|roku|vizio|dlnadoc|ce\-html|ouya|xbox|playstation *(3|4)|wii/i.test(nav);

        switch(true)
        {
            case (is_tv_bool):
                store("rstv_is_tv", true);
                return true;
                break;
        }

        store("rstv_is_tv", false);
        return false;
    }

    /**
     * Checks if the device is a Personal Computer
     * @return {Boolean}
     */
    function isPC()
    {
        //check if PC check has already been done. If so, return stored value
        switch(true)
        {
            case (isStorageValueSet("rstv_is_pc")):
                return store("rstv_is_pc");
                break;
        }

        switch(true)
        {
            case (isMobile() === false && isTV() === false):
                store("rstv_is_pc", true);
                return true;
                break;
        }

        store("rstv_is_pc", false);
        return false;
    }

    /**
     * Checks if the device is a mobile device
     * @return {Boolean}
     */
    function isMobile()
    {
        //check if device is phone or tablet
        switch(true)
        {
            case (isPhone() || isTablet(true)):
                return true;
                break;

            default:
                return false;
        }
    }

    /**
     * Checks if the device is a non-mobile device
     * @return {Boolean}
     */
    function isNonMobile()
    {
        //check if device is not phone or mobile
        switch(true)
        {
            case (!isMobile()):
                return true;
                break;

            default:
                return false;
        }
    }

    /**
     * Gets the orientation of the device
     * @param bypass_cache_bool {Boolean} Determines if the stored value for current orientation should be retrieved or not. True will ignore the value stored and will re-test the orientation
     * @return {String}
     */
    function getOrientation()
    {
        var myArgs = Array.prototype.slice.call(arguments),
            bypass_cache_bool = isBool(myArgs[0]) ? myArgs[0] : false,
            ort_final_str;

        //check if current orientation value is stored and bypass_cache_bool is false. If so, return stored value
        switch(true)
        {
            case (isStorageValueSet("rstv_ort_curr") && !bypass_cache_bool):
                return store("rstv_ort_curr");
                break;
        }

        //Reset Viewport Dimensions if bypass_cache_bool is true
        switch(true)
        {
            case (bypass_cache_bool):
                store("rstv_viewportW rstv_viewportW_dip rstv_viewportH rstv_viewportH_dip rstv_screenW rstv_screenH", null);
                break;
        }

        //Get the Viewport Dimensions
        var device_user_agent_str = getUserAgent(),
            is_opera_mini_bool = /opera.+(mini|mobi)/i.test(device_user_agent_str),
            viewport_w_int = viewportW(),
            viewport_h_int = viewportH(),
            screen_w_int = screenW(),
            screen_h_int = screenH(),
            screen_w_to_h_ratio_int = screen_w_int/screen_h_int,
            screen_w_to_viewport_w_diff_int = screen_w_int - viewport_w_int,
            is_landscape_extended_verify_bool,
            is_landscape_bool;

        screen_w_to_viewport_w_diff_int = Math.abs(screen_w_to_viewport_w_diff_int);
        is_landscape_extended_verify_bool = (is_opera_mini_bool && viewport_w_int < 260) ? ((screen_w_to_viewport_w_diff_int <= 4) && (screen_w_to_h_ratio_int >= 1) ? true : false) : true;
        is_landscape_bool = !!((viewport_h_int <= viewport_w_int) && is_landscape_extended_verify_bool);

        switch(true)
        {
            case (is_landscape_bool):
                //landscape
                ort_final_str = 'landscape';

                //do not alter cached orientation variables if bypass_cache_bool is true
                switch(true)
                {
                    case (!bypass_cache_bool):
                        store("rstv_is_portrait", false);
                        store("rstv_is_landscape", true);
                        break;
                }

                break;

            default:
                //portrait
                ort_final_str = 'portrait';

                //do not alter cached orientation variables if bypass_cache_bool is true
                switch(true)
                {
                    case (!bypass_cache_bool):
                        store("rstv_is_portrait", true);
                        store("rstv_is_landscape", false);
                        break;
                }
        }

        return ort_final_str;
    }

    /**
     * Resets/Updates the cached values (localStorage) of Orientation Info
     * @private
     */
    function _updateOrientationStore()
    {
        //reset
        store("rstv_ort_curr rstv_is_portrait rstv_is_landscape", null);

        //reload
        store("rstv_ort_curr", getOrientation());
    }

    /**
     * Checks if the device is currently in Portrait mode
     * @return {Boolean}
     */
    function isPortrait()
    {
        //check if portrait orientation value is stored. If so, return stored value
        switch(true)
        {
            case (isStorageValueSet("rstv_is_portrait")):
                return store("rstv_is_portrait");
                break;
        }
        return !!((getOrientation() == 'portrait'));
    }

    /**
     * Checks if the device is currently in Landscape mode
     * @return {Boolean}
     */
    function isLandscape()
    {
        //check if landscape orientation value is stored. If so, return stored value
        switch(true)
        {
            case (isStorageValueSet("rstv_is_landscape")):
                return store("rstv_is_landscape");
                break;
        }
        return !!((getOrientation() == 'landscape'));
    }

    /**
     * Gets the Standard Display Resolution of the given device
     * @return {String}
     */
    function getResolution()
    {
        var is_landscape_bool = isLandscape(),
            screen_w = screenW(),
            screen_h = screenH(),
            std_w_arr = (is_landscape_bool) ? _getResolutionDimensionList('h') :_getResolutionDimensionList('w'),
            std_h_arr = (is_landscape_bool) ? _getResolutionDimensionList('w'): _getResolutionDimensionList('h'),
            screen_w_std = getClosestNumberMatchArray(std_w_arr, screen_w),
            screen_h_std = getClosestNumberMatchArray(std_h_arr, screen_h),
            screen_res_str,
            screen_res_matrix_arr = _getResolutionMatrix(),
            screen_res_name_str
            ;

        switch(true)
        {
            case (screen_w_std >= screen_h_std):
                screen_res_str = screen_h_std+'_'+screen_w_std;
                break;

            default:
                screen_res_str = screen_w_std+'_'+screen_h_std;
        }

        screen_res_name_str = array_search(screen_res_str, screen_res_matrix_arr);

        return screen_res_name_str;
    }

    /**
     * Composes and Saves a List of Standard Graphic Resolutions
     * @return {Array}
     * @private
     */
    function _getResolutionList()
    {
        //Check if Resolution List is Stored
        switch(true)
        {
            case (isStorageValueSet("rstv_is_cache_res_list")):
                return store("rstv_cache_res_list");
                break;
        }

        var $res_arr = [
            'qqvga', 'qqvgax1', 'hqvga', 'hqvgax1', 'hqvgax2', 'hvgax1', 'qvga', 'wqvga', 'wqvga1', 'hvga',
            'hvga1', 'hvga2', 'hvga3', 'hvgax1', 'hvgax2', 'vga', 'wvga', 'wvgax1', 'fwvga', 'svga',
            'dvga', 'dvgax1', 'wsvga', 'wsvga1', 'xga', 'wxga', 'wxga1', 'wxga2', 'wxga3', 'wxga4', 'wxga5',
            'xga+', 'wxga+', 'sxga', 'sxga+', 'wsxga+', 'uxga', 'wuxga', 'qwxga', 'qxga', 'wqxga',
            'qsxga', 'wqsxga', 'quxga', 'wquxga', 'hxga', 'whxga', 'hsxga', 'whsxga', 'huxga', 'whuxga',
            'nhd', 'nhdx1', 'qhd', 'hd', '720p', 'fhd', '1080p', '1080i', 'wqhd', 'mbprhd', '4kuhd', '8kuhd'
        ];

        store("rstv_is_cache_res_list", true);
        store("rstv_cache_res_list", $res_arr);
        return $res_arr;
    }

    /**
     * Composes and Saves a Resolution Matrix (Resolution to Dimensions)
     * @return {Array|Object}
     * @private
     */
    function _getResolutionMatrix()
    {
        //Check if Resolution Matrix is Stored
        switch(true)
        {
            case (isStorageValueSet("rstv_is_cache_res_matrix")):
                return store("rstv_cache_res_matrix");
                break;
        }

        var $res_matrix_arr = {
            'qqvga': '120_160', 'qqvgax1': '128_160', 'hqvga': '160_240', 'hqvgax1': '240_240', 'hqvgax2': '240_260',
            'qvga': '240_320', 'wqvga': '240_400', 'wqvga1': '240_432', 'hvga': '320_480',
            'hvga1': '360_480', 'hvga2': '272_480', 'hvga3': '240_640', 'hvgax1': '200_640', 'hvgax2': '300_640',
            'hvgax3': '360_400',
            'vga': '480_640', 'wvga': '480_800', 'wvgax1': '352_800', 'fwvga': '480_854', 'svga': '600_800',
            'dvga': '640_960', 'dvgax1': '640_1136', 'wsvga': '576_1024', 'wsvga1': '600_1024', 'xga': '768_1024',
            'wxga': '768_1280', 'wxga1': '720_1280', 'wxga2': '800_1280', 'wxga3': '768_1360', 'wxga4': '768_1366',
            'wxga5': '720_720',
            'xga+': '864_1152', 'wxga+': '900_1440', 'sxga': '1024_1280', 'sxga+': '1050_1400', 'wsxga+': '1050_1680',
            'uxga': '1200_1600', 'wuxga': '1200_1920', 'qwxga': '1152_2048', 'qxga': '1536_2048', 'wqxga': '1600_2560',
            'wqxga+': '1800_3200',
            'qsxga': '2048_2560', 'wqsxga': '2048_3200', 'quxga': '2400_3200', 'wquxga': '2400_3840', 'hxga': '3072_4096',
            'whxga': '3200_5120', 'hsxga': '4096_5120', 'whsxga': '4096_6400', 'huxga': '4800_6400', 'whuxga': '4800_7680',
            'nhd': '360_640', 'nhdx1': '320_640', 'qhd': '540_960', 'hd': '720_1280', '720p': '720_1280', 'fhd': '1080_1920',
            '1080p': '1080_1920', '1080i': '1080_1920', 'wqhd': '1440_2560', 'mbprhd': '1800_2880', '4kuhd': '2160_3840',
            '8kuhd': '4320_7680'
        };

        store("rstv_is_cache_res_matrix", true);
        store("rstv_cache_res_matrix", $res_matrix_arr);
        return $res_matrix_arr;
    }

    /**
     * Converts various types of breakpoints into pixel breakpoints
     * It converts 'Device' and 'Resolution' breakpoints
     * @param bp_arr {Array} The breakpoints you define
     * @param bp_class_arr {Array} The names of CSS classes paired with breakpoints
     * @return {Array}
     * @private
     */
    function _toViewportBreakpoints(bp_arr, bp_class_arr)
    {
        try{
            //Create local variables
            var bp_attrib_arr = [],
                list_dev_arr,
                list_res_arr,
                matrix_dev_arr,
                matrix_res_arr,
                ort_marker_str = '',
                ort_marker_key_str = '',
                error_marker_str = '',
                bp_temp_w_arr = [],
                bp_item_w_temp_int = '',
                bp_temp_h_arr = [],
                bp_item_h_temp_int = '',
                bp_temp_type_arr = [],
                bp_ort_marker_temp_arr = [],
                bp_final_arr = [],
                bp_item_temp_str,
                bp_item_res_temp_str,
                bp_item_final_str,
                bp_item_v_temp_str,
                bp_item_v_temp_arr = [],
                is_class_def_bool = false,
                is_attrib_def_bool = false;

            //Create variables for counter functionality
            var counter_int = 0,
                counter_alpha_str = '',
                counter_alpha_arr = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p',
                    'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z', 'aa', 'ab', 'ac', 'ad', 'ae', 'af', 'ag', 'ah', 'ai',
                    'aj', 'ak', 'al', 'am', 'an', 'ao', 'ap', 'aq', 'ar', 'as', 'at', 'au', 'av', 'aw', 'ax'
                ],
                counter_alpha_pre_arr = [],
                counter_alpha_post_arr = [],
                bp_arr_count_int = count(bp_arr),
                bp_class_arr_count_int = count(bp_class_arr),
                bp_attrib_arr_count_int = count(bp_attrib_arr),
                bp_item_w_temp_final_int,
                bp_item_h_temp_final_int;

            //check that value in argument is array and is not empty
            switch(true)
            {
                case (!isArray(bp_arr)):
                    throw new Error ("The first argument must be an array!");
                    break;

                case (isArray(bp_arr) && bp_arr_count_int == 0):
                    throw new Error ("The first argument must not be empty!");
                    break;
            }

            //Check that only either classes or attributes are defined
            switch(true)
            {
                case ((bp_class_arr_count_int > 0) && (bp_attrib_arr_count_int > 0)):
                    throw new Error("You can only define either 'Classes' or 'Attributes' settings!");
                    break;
            }

            //If classes are defined, ensure they correspond with the number of breakpoints defined
            switch(true)
            {
                case (bp_class_arr_count_int > 0):
                    //classes are defined
                    is_class_def_bool = true;
                    switch(true)
                    {
                        case (bp_class_arr_count_int !== bp_arr_count_int):
                            throw new Error ("The number items for 'Breakpoints' and 'Classes' settings must match");
                            break;
                    }
                    break;
            }

            //If attributes are defined, ensure they correspond with the number of breakpoints defined
            switch(true)
            {
                case (bp_attrib_arr_count_int > 0):
                    //attributes are defined
                    is_attrib_def_bool = true;
                    switch(true)
                    {
                        case (bp_attrib_arr_count_int !== bp_arr_count_int):
                            throw new Error ("The number items for 'Breakpoints' and 'Attributes' settings must match");
                            break;
                    }
                    break;
            }

            //Get Breakpoint Reference Data
            list_res_arr = _getResolutionList();
            matrix_res_arr = _getResolutionMatrix();

            //iterate over the breakpoints provided
            for(var i = 0; i < bp_arr_count_int; i++)
            {
                bp_item_temp_str = bp_arr[i];

                counter_alpha_str = counter_alpha_arr[i];

                //ensure that the orientation markers are valid i.e. only -p and -l if any
                switch(true)
                {
                    case (/-+/i.test(bp_item_temp_str) && !/^[^-]*-[^-]*$/i.test(bp_item_temp_str)):
                        //error in the way orientation markers are defined
                        error_marker_str += '2';
                        break;
                }

                //find out if there are any resolution markers e.g. -l or -p
                ort_marker_str = '';
                ort_marker_key_str = '';
                switch(true)
                {
                    case (substr_count(bp_item_temp_str, '-p') > 0):
                        ort_marker_str = 'p';
                        ort_marker_key_str = '-p';

                        bp_ort_marker_temp_arr.push('p');
                        break;

                    case (substr_count(bp_item_temp_str, '-l') > 0):
                        ort_marker_str = 'l';
                        ort_marker_key_str = '-l';

                        bp_ort_marker_temp_arr.push('l');
                        break;

                    default:
                        bp_ort_marker_temp_arr.push('x');
                }

                //reset the breakpoint i.e. remove any resolution markers
                bp_item_final_str = bp_item_temp_str.replace(''+ort_marker_key_str+'', '');

                //find out which class of breakpoint i.e. viewport, device, or resolution
                switch(true)
                {
                    case (in_array(bp_item_final_str, list_res_arr)):
                        //is resolution breakpoint. Get viewport dimensions
                        bp_item_v_temp_str = matrix_res_arr[''+bp_item_final_str+''];

                        bp_item_v_temp_arr = arrayToInteger(explode('_', bp_item_v_temp_str));

                        bp_item_w_temp_int = parseInt(bp_item_v_temp_arr[0]);
                        bp_item_h_temp_int = parseInt(bp_item_v_temp_arr[1]);

                        //consider landscape orientation markers
                        bp_item_w_temp_final_int = bp_item_w_temp_int;
                        bp_item_h_temp_final_int = bp_item_h_temp_int;
                        switch(true)
                        {
                            case (ort_marker_str == 'l'):
                                bp_item_w_temp_final_int = bp_item_h_temp_int;
                                bp_item_h_temp_final_int = bp_item_w_temp_int;
                                break;
                        }

                        bp_temp_w_arr[counter_alpha_str] = bp_item_w_temp_final_int;
                        bp_temp_h_arr[counter_alpha_str] = bp_item_h_temp_final_int;

                        //set breakpoint type as resolution
                        bp_temp_type_arr.push('r');

                        break;

                    case (/[0-9]+/i.test(bp_item_final_str)):
                        //is viewport breakpoint
                        bp_temp_w_arr[counter_alpha_str] = parseInt(bp_item_final_str);
                        bp_temp_h_arr[counter_alpha_str] = parseInt(bp_item_final_str);

                        //set breakpoint type as viewport
                        bp_temp_type_arr.push('v');
                        break;

                    default:
                        //mark error
                        error_marker_str += '1';
                }

                counter_alpha_pre_arr.push(counter_alpha_str);

                counter_int++;
            }

            //check if there are any errors. If yes, throw error
            switch(true)
            {
                case (/[1]+/i.test(error_marker_str)):
                    throw new Error("There are errors in your 'Breakpoints' settings!");
                    break;

                case (/[2]+/i.test(error_marker_str)):
                    throw new Error("There are errors in your 'Breakpoints' settings with regard to the way you have defined orientation markers e.g. -p or -l!");
                    break;
            }

            //compose breakpoints
            var cmp = function ($a, $b) {
                if ($a == $b) {
                    return 0;
                }
                return ($a < $b) ? -1 : 1;
            };

            var bp_temp_w_sort_arr = [],
                bp_temp_h_sort_arr = [],
                bp_temp_w_sort_int,
                bp_temp_w_sort_juxta_key_int,
                bp_type_arr = [],
                bp_temp_ort_sort_arr = [],
                bp_temp_class_arr = [],
                bp_temp_pre_attrib_arr = [],
                bp_temp_attrib_arr = [];

            //reformat attribute array
            bp_temp_pre_attrib_arr = bp_attrib_arr;

            //sort viewport width breakpoints
            bp_temp_w_sort_arr = uasort(bp_temp_w_arr, cmp);

            //sort other arrays in an identical fashion to viewport width breakpoints
            counter_alpha_post_arr = array_keys(bp_temp_w_sort_arr);

            var bp_temp_w_sort_arr_size_int = count(bp_temp_w_sort_arr);
            for(var i = 0; i < bp_temp_w_sort_arr_size_int; i++)
            {
                bp_temp_w_sort_int = counter_alpha_post_arr[i];
                bp_temp_w_sort_juxta_key_int = array_search(bp_temp_w_sort_int, counter_alpha_pre_arr);

                //sort breakpoint heights array
                bp_temp_h_sort_arr[bp_temp_w_sort_int] = bp_temp_h_arr[bp_temp_w_sort_int];

                //sort breakpoint type array
                bp_type_arr[i] = bp_temp_type_arr[bp_temp_w_sort_juxta_key_int];

                //sort the orientation marker array
                bp_temp_ort_sort_arr[i] = bp_ort_marker_temp_arr[bp_temp_w_sort_juxta_key_int];

                //sort the classes array
                bp_temp_class_arr[i] = bp_class_arr[bp_temp_w_sort_juxta_key_int];

                //sort the attributes array
                bp_temp_attrib_arr[i] = bp_temp_pre_attrib_arr[bp_temp_w_sort_juxta_key_int];
            }

            //Save Primary Results Data to Array
            bp_final_arr["bp_w"] = implode('|', bp_temp_w_sort_arr);                //width
            bp_final_arr["bp_h"] = implode('|', bp_temp_h_sort_arr);                //height
            bp_final_arr["bp_o"] = implode('|', bp_temp_ort_sort_arr);              //orientation
            bp_final_arr["bp_t"] = implode('|', bp_type_arr);                       //type

            //add data for classes if defined
            switch(true)
            {
                case (is_class_def_bool):
                    var c_str = implode('|', bp_temp_class_arr);
                    bp_final_arr["bp_c"] = c_str;                   //classes
                    break;
            }

            //add data for attributes if defined
            switch(true)
            {
                case (is_attrib_def_bool):
                    var a_str = implode('|', bp_temp_attrib_arr);
                    bp_final_arr["bp_a"] = a_str;                   //attributes
                    break;
            }

            return bp_final_arr;
        }
        catch(e){
            var e_msg_str = "There was an error: "+ e.message;
            alert(e_msg_str);
        }
    }

    /**
     * Wrapper class for _toViewportBreakpoints
     * @param bp_arr {Array} The list of breakpoints
     * @param bp_class_arr {Array} The corresponding list of classes
     * @return {Array}
     */
    function getBreakpoints(bp_arr, bp_class_arr)
    {
        var data_arr = [];
        data_arr = _toViewportBreakpoints(bp_arr, bp_class_arr);

        return data_arr;
    }

    /**
     * Monitors the viewport for size and orientation changes
     */
    function viewportMonitor()
    {
        var myArgs = Array.prototype.slice.call(arguments),
            trigger_suffix_str = (isNumber(myArgs[0])) ? "_"+myArgs[0]: "";

        var viewport_monit_fn = function(){

            //get viewport info before they are reset in storage
            var viewport_w_prev_int = store("rstv_viewportW"),
                viewport_h_prev_int = store("rstv_viewportH");

            //re-initialize dimension variables
            _initDimensionVars();

            //get current and active and define local variables
            var is_mobile_bool = isMobile(),
                ort_active_str = getOrientation(true),
                ort_curr_str = store("rstv_ort_curr"),
                viewport_w_curr_int,
                viewport_h_curr_int,
                viewport_w_diff_int,
                viewport_w_diff_abs_int,
                viewport_w_diff_pc_int,
                viewport_h_diff_int,
                viewport_h_diff_abs_int,
                viewport_h_diff_pc_int,
                is_softkey_bool = false;

            //Update stored values for dimensions
            _updateDimensionStore();

            /**
             * Perform soft keyboard check
             * This manages for mobile devices that resize the viewport when the soft keyboard is initialized
             * This scenario will sometimes result in a pseudo-orientation change which is unwanted
             */
            switch(true)
            {
                case (is_mobile_bool):
                    viewport_w_curr_int = store("rstv_viewportW");
                    viewport_h_curr_int = store("rstv_viewportH");
                    viewport_w_diff_int = viewport_w_curr_int-viewport_w_prev_int;
                    viewport_h_diff_int = viewport_h_curr_int-viewport_h_prev_int;
                    viewport_w_diff_abs_int = Math.abs(viewport_w_diff_int);
                    viewport_h_diff_abs_int = Math.abs(viewport_h_diff_int);

                    //get the percentage changes in viewport width and height
                    viewport_w_diff_pc_int = (viewport_w_diff_abs_int/viewport_w_prev_int)*100;
                    viewport_h_diff_pc_int = (viewport_h_diff_abs_int/viewport_h_prev_int)*100;

                    switch(true)
                    {
                        case (viewport_w_diff_pc_int < 1):
                            switch(true)
                            {
                                case (viewport_h_diff_pc_int > 35 && viewport_h_diff_int < 0):
                                    //soft keyboard is opening
                                    is_softkey_bool = true;
                                    break;

                                case (viewport_h_diff_pc_int > 35 && viewport_h_diff_int > 0):
                                    //Soft keyboard closing - start
                                    is_softkey_bool = true;
                                    break;

                                case (viewport_h_diff_pc_int > 12 && viewport_h_diff_pc_int <= 35 && viewport_h_diff_int > 0):
                                    //Soft keyboard closing - end
                                    is_softkey_bool = true;
                                    break;

                                case (viewport_h_diff_pc_int == 0):
                                    //No movement - possible Soft keyboard action
                                    is_softkey_bool = true;
                                    break;
                            }
                            break;
                    }
                    break;
            }

            /**
             * Trigger events only if soft keyboard action is not detected
             */
            switch(true)
            {
                case (!is_softkey_bool):
                    switch(true)
                    {
                        case ((ort_curr_str !== ort_active_str)):
                            //orientation has changed. Update stored values for dimensions and orientation
                            _updateOrientationStore();

                            $(window).trigger("change_orientation"+trigger_suffix_str);
                            break;

                        default:
                            /**
                             * Fire resize only for devices that are non-mobile
                             * This eliminates resize callback functionality for mobile devices
                             */
                            switch(true)
                            {
                                case (!is_mobile_bool):
                                    $(window).trigger("resize_viewport"+trigger_suffix_str);
                                    break;
                            }
                    }
                    break;
            }
        };
        resize(viewport_monit_fn);
    }

    /**
     * Monitors a DOM element/container for size changes
     */
    function containerMonitor(elem)
    {
        var myArgs = Array.prototype.slice.call(arguments),
            trigger_suffix_str = (isNumber(myArgs[1])) ? "_"+myArgs[1]: ""
            ;

        var container_monit_fn = function(){
            $(window).trigger("resize_container"+trigger_suffix_str);
        };
        resizeContainer(elem, container_monit_fn);
    }

    /**
     * Attach an event handler for the resize event
     * @param {Function} fn The function to execute
     * @return object
     */
    function resize(fn)
    {
        $win.on('resize', fn);
        return Restive;
    }

    /**
     * Attach an event handler for the resizecontainer event
     * @param {Function} fn The function to execute
     * @return object
     */
    function resizeContainer(el, fn)
    {
        el.on('resizecontainer', fn);
        return Restive;
    }

    //Define Restive Object
    Restive = {
        init: init(),
        reInit: reInit,
        getUserAgent: getUserAgent,
        isStorageValueSet: isStorageValueSet,
        store: store,
        storeVarTracker: storeVarTracker,
        storeVarValidator: storeVarValidator,
        incrementStorageValue: incrementStorageValue,
        getBreakpoints: getBreakpoints,
        viewportW: viewportW,
        viewportH: viewportH,
        screenW: screenW,
        screenH: screenH,
        pixelW: pixelW,
        pixelH: pixelH,
        vSpan: vSpan,
        vPitch: vPitch,
        dSpan: dSpan,
        dPitch: dPitch,
        cSpan: cSpan,
        cPitch: cPitch,
        eSpan: eSpan,
        ePitch: ePitch,
        isRetina: isRetina,
        getPixelRatio: getPixelRatio,
        getPlatform: getPlatform,
        getFormFactor: getFormFactor,
        getOrientation: getOrientation,
        getResolution: getResolution,
        isPortrait: isPortrait,
        isLandscape: isLandscape,
        viewportMonitor: viewportMonitor,
        containerMonitor: containerMonitor,
        isMobile: isMobile,
        isNonMobile: isNonMobile,
        isPhone: isPhone,
        isTablet: isTablet,
        isPC: isPC,
        isTV: isTV,
        isIOS: isIOS,
        isApple: isApple,
        isAndroid: isAndroid,
        isSymbian: isSymbian,
        isBlackberry: isBlackberry,
        isWindows: isWindows,
        isWindowsPhone: isWindowsPhone,
        resize: resize,
        resizeContainer: resizeContainer
    };
    return Restive;

})(window, document, jQuery);

/*
 * Restive.JS Plugin v1.3.3
 * http://restivejs.com
 *
 * Copyright 2013 Obinwanne Hill <https://about.me/obinwanne.hill>
 * Released under MIT License
 */
(function (window, document, $, undefined) {
    //Gets the content of a function
    Function.prototype.getFuncBody = function()
    {
        // Get content between first { and last }
        var m = this.toString().match(/\{([\s\S]*)\}/m)[1];
        // Strip comments
        return m.replace(/^\s*\/\/.*$/mg,'');
    };

    var methods = {
		init : function(options){

			try{

                //Multiple Constructor Manager
                methods._multiConstructorCounter();
                methods._multiConstructorManager();

                //Create plugin variables
                var $options = options,
                    $valid_platform_arr = ['all', 'ios', 'android', 'symbian', 'blackberry', 'windows'],
                    $valid_formfactor_arr = ['all', 'pc', 'tv', 'tablet', 'phone'],
                    $platform_init_str = options.platform,
                    $formfactor_init_str = options.formfactor,
                    responsive_basis_str,
                    is_resp_basis_container_bool,
                    is_multi_start_bool = Restive.store("rstv_multi_start"),
                    rstv_store_multi_counter_int = Restive.store("rstv_multi_count"),
                    is_multi_abort_2_bool = Restive.store("rstv_multi_abort_2");

                //Ensure Platform Values are within range
				switch(true)
				{
					case(in_array($platform_init_str, $valid_platform_arr) === false):
						methods._error('rstv_error_001', '"'+$platform_init_str+'" is not a valid Platform option!');
                        return false;
					    break;
				}

                //Ensure Form Factor Values are within range
                switch(true)
                {
                    case(in_array($formfactor_init_str, $valid_formfactor_arr) === false):
                        methods._error('rstv_error_002', '"'+$formfactor_init_str+'" is not a valid Form Factor option!');
                        return false;
                        break;
                }

                //Abort if endMulti() is not called after startMulti() with multiple constructors
                switch(true)
                {
                    case (is_multi_abort_2_bool):
                        methods._error('rstv_error_003', 'If you are calling the Restive.JS Constructor more than once, you must call $.restive.endMulti() at the end!');
                        return false;
                        break;
                }

                //Get Initial Breakpoints
				var $breakpoints_arr = [],
                    $breakpoints_init_arr = [],
                    $classes_init_arr = [];

                $breakpoints_init_arr = options.breakpoints;
                $classes_init_arr = options.classes;

                $breakpoints_arr = methods.getBreakpoints($breakpoints_init_arr, $classes_init_arr);

                /**
                 * Generate Restive Core Information
                 */
                var $rstv_core_info_arr = [];

                //A1. Get the Device Platform e.g. iOS, Android, etc.
                $rstv_core_info_arr["platform"] = methods.getPlatform();

                //A2. Get the Device Form Factor
                $rstv_core_info_arr["formfactor"] = methods.getFormFactor();

                //A3. Check if Device is a mobile device
                $rstv_core_info_arr["is_mobile"] = methods.isMobile();

                //A4. Get the Device Pixel Ratio
                $rstv_core_info_arr["pixelratio"] = methods.getPixelRatio();

                //A5. Get the Orientation and Set Orientation Marker
                $rstv_core_info_arr["orientation"] = methods.getOrientation();

                //A6. Get the Selector of the Element
                $rstv_core_info_arr["selector"] = getSelector(this);

                //A7. Get the Tag Name of the Element
                $rstv_core_info_arr["tagname"] = this.prop("tagName").toLowerCase();

                //Get the Basis for Responsiveness
                responsive_basis_str = methods._responsiveBasis($options, $rstv_core_info_arr);
                is_resp_basis_container_bool = !!((responsive_basis_str == 'c'));

                //Add Responsive Basis Indicator to Device Core Info
                $rstv_core_info_arr["is_resp_basis_container"] = is_resp_basis_container_bool;

                //Set Event Handlers and Callbacks according to Responsive Basis
                switch(true)
                {
                    case (is_resp_basis_container_bool):
                        methods._containerMonitor($breakpoints_arr, this, $options, $rstv_core_info_arr);
                        break;

                    default:
                        switch(true)
                        {
                            case (!is_multi_start_bool):
                                methods._viewportMonitor($breakpoints_arr, this, $options, $rstv_core_info_arr);
                                methods._callbackManager($options, ['ready', 'init']);
                                break;

                            default:
                                //Store some variables required for later use
                                window.parent.rstv_store.main["rstv_breakpoints_"+rstv_store_multi_counter_int] = $breakpoints_arr;
                                window.parent.rstv_store.main["rstv_this_"+rstv_store_multi_counter_int] = this;
                                window.parent.rstv_store.main["rstv_options_"+rstv_store_multi_counter_int] = $options;
                                window.parent.rstv_store.main["rstv_core_info_"+rstv_store_multi_counter_int] = $rstv_core_info_arr;

                                window.rstv_store.main = window.parent.rstv_store.main;
                        }
                }

                //reset turbo_classes_reflow sessionStorage variable
                Restive.store("rstv_turbo_classes_reflow_status_in", null);

                /**
                 * Manage Breakpoints
                 */
                return this.each(function(){
					var $this = $(this);
                    methods.setBreakpoints($breakpoints_arr, $this, $options, $rstv_core_info_arr);
				});
			}
			catch(e){
				alert(e);
			    console.log(e)/*RemoveLogging:skip*/;
			}	
		},
        _error: function(code, message){
            var error_msg_is_init_bool = !!((String(Restive.store(code+"_init")).toLowerCase() === "true"));
            switch(true)
            {
                case (!error_msg_is_init_bool):
                    Restive.store(code+"_init", true);
                    throw new Error(message);
                    break;
            }
        },
        _callbackManager: function(){

            var myArgs = Array.prototype.slice.call(arguments),
                options = myArgs[0],
                callback_type_arr = myArgs[1],
                $on_func,
                $on_func_body_count
                ;

            //Execute onReady
            switch(true)
            {
                case (in_array('ready', callback_type_arr)):
                    var $on_ready = options.onReady,
                        $on_ready_body_count = options.onReady.getFuncBody().length;
                    switch(true)
                    {
                        case ($.isFunction($on_ready) && ($on_ready_body_count > 0)):
                            //Execute Callback
                            $on_ready();
                            break;
                    }
                break;
            }

            //Resize Callbacks
            switch(true)
            {
                case (in_array('resize', callback_type_arr)):
                    var $on_resize = options.onResize,
                        $on_resize_body_count = options.onResize.getFuncBody().length;
                    switch(true)
                    {
                        case ($.isFunction($on_resize) && ($on_resize_body_count > 0)):
                            //Execute Callback
                            $on_resize();
                            break;
                    }
                    break;
            }

            //PC Force Reflow Callbacks
            switch(true)
            {
                case (in_array('turboclassesreflow', callback_type_arr)):
                    var $reflow_direction_str = callback_type_arr[1],
                        $on_reflow = options.onTurboClassReflow,
                        $on_reflow_body_count = options.onTurboClassReflow.getFuncBody().length;
                    switch(true)
                    {
                        case ($.isFunction($on_reflow) && ($on_reflow_body_count > 0)):
                            //Execute Callback
                            $on_reflow();
                            break;
                    }

                    var $on_reflow_in = options.onTurboClassReflowIn,
                        $on_reflow_in_body_count = options.onTurboClassReflowIn.getFuncBody().length;
                    switch(true)
                    {
                        case ($.isFunction($on_reflow_in) && ($on_reflow_in_body_count > 0)):
                            //Execute Callback
                            switch(true)
                            {
                                case ($reflow_direction_str == 'in'):
                                    $on_reflow_in();
                                    break;
                            }
                            break;
                    }

                    var $on_reflow_out = options.onTurboClassReflowOut,
                        $on_reflow_out_body_count = options.onTurboClassReflowOut.getFuncBody().length;
                    switch(true)
                    {
                        case ($.isFunction($on_reflow_out) && ($on_reflow_out_body_count > 0)):
                            //Execute Callback
                            switch(true)
                            {
                                case ($reflow_direction_str == 'out'):
                                    $on_reflow_out();
                                    break;
                            }
                            break;
                    }

                    break;
            }

            //Rotate/Orientation Callbacks
            switch(true)
            {
                case (in_array('rotate', callback_type_arr)):
                    var ort_curr_str = Restive.getOrientation(),
                        $on_rotate = options.onRotate,
                        $on_rotate_body_count = options.onRotate.getFuncBody().length;
                    switch(true)
                    {
                        case ($.isFunction($on_rotate) && ($on_rotate_body_count > 0)):
                            //Execute Callback
                            $on_rotate();
                            break;
                    }

                    //Execute onRotateToP
                    var $on_rotate_to_p = options.onRotateToP,
                        $on_rotate_to_p_body_count = options.onRotateToP.getFuncBody().length;
                    switch(true)
                    {
                        case ($.isFunction($on_rotate_to_p) && ($on_rotate_to_p_body_count > 0)):
                            //Execute Callback
                            switch(true)
                            {
                                case (ort_curr_str == 'portrait'):
                                    $on_rotate_to_p();
                                    break;
                            }
                            break;
                    }

                    //Execute onRotateToL
                    var $on_rotate_to_l = options.onRotateToL,
                        $on_rotate_to_l_body_count = options.onRotateToL.getFuncBody().length;
                    switch(true)
                    {
                        case ($.isFunction($on_rotate_to_l) && ($on_rotate_to_l_body_count > 0)):
                            //Execute Callback
                            switch(true)
                            {
                                case (ort_curr_str == 'landscape'):
                                    $on_rotate_to_l();
                                    break;
                            }
                            break;
                    }
                    break;
            }

            //Add/Remove Class Callbacks
            switch(true)
            {
                case (in_array('addclass', callback_type_arr) || in_array('removeclass', callback_type_arr)):
                    var $callback_type_str = callback_type_arr[0],
                        $callback_type_args = callback_type_arr[1],
                        $callback_data_arr = {'addclass': 'onAddClass', 'removeclass': 'onRemoveClass'}
                        ;
                    $on_func = options[$callback_data_arr[''+$callback_type_str+'']];
                    $on_func_body_count = $on_func.getFuncBody().length;

                    switch(true)
                    {
                        case ($.isFunction($on_func) && ($on_func_body_count > 0)):
                            //Execute Callback
                            $on_func($callback_type_args);
                            break;
                    }
                    break;
            }

            //Initialization Callbacks
            switch(true)
            {
                case (in_array('init', callback_type_arr)):
                    switch(true)
                    {
                        case (in_array('init', callback_type_arr)):
                            var callback_name_arr = [
                                'onPortrait', 'onLandscape', 'onRetina', 'onPhone', 'onTablet', 'onPC', 'onTV', 'onIOS', 'onAndroid', 'onSymbian', 'onBlackberry', 'onWindows', 'onWindowsPhone', 'onMobile', 'onNonMobile'
                            ],
                                func_name_arr = [
                                'isPortrait', 'isLandscape', 'isRetina', 'isPhone', 'isTablet', 'isPC', 'isTV', 'isIOS', 'isAndroid', 'isSymbian', 'isBlackberry', 'isWindows', 'isWindowsPhone', 'isMobile', 'isNonMobile'
                            ];

                            for(var i = 0; i < count(func_name_arr); i++)
                            {
                                $on_func = options[callback_name_arr[i]];
                                $on_func_body_count = $on_func.getFuncBody().length;

                                switch(true)
                                {
                                    case ($.isFunction($on_func) && ($on_func_body_count > 0)):
                                        var $on_func_res = methods[func_name_arr[i]],
                                            $on_func_bool = $on_func_res();
                                        switch(true)
                                        {
                                            case ($on_func_bool):
                                                $on_func();
                                                break;
                                        }
                                        break;
                                }
                            }
                            break;
                    }
                    break;
            }
        },
        _URLMonitor: function(){
            //monitor changes from URL to URL
            var $rstv_url_str = Restive.store("rstv_url"),
                $rstv_url_hash_prev_str = Restive.store("rstv_url_hash"),
                $rstv_url_hash_curr_str = md5($rstv_url_str);

            switch(true)
            {
                case ($rstv_url_hash_curr_str != $rstv_url_hash_prev_str):
                    //page has changed
                    Restive.store("rstv_multi_bpm_idx rstv_cache_bpm rstv_cache_bpm_lock rstv_cache_req rstv_cache_bpm_viewport_diff", null);

                    Restive.store("rstv_url_hash", $rstv_url_hash_curr_str);
                    break;
            }
        },
        _responsiveBasis: function($options, $rstv_core_info){
            /**
             * This determines the basis for responsive i.e. viewport or container
             * 1. If anchor option is 'element' and Restive.JS selector is under the body tag, basis is 'container' or 'c'
             * 2. If not 1, basis is 'viewport' or 'v'
             */
            var resp_basis_str,
                selector_name_str = $rstv_core_info["selector"],
                elem_is_id_selector_bool = /^#[^\s]+$/i.test(selector_name_str),
                elem_is_child_of_body_bool = elementIsChildOf('body', selector_name_str),
                anchor_str = $options.anchor
                ;

            try
            {
                switch(true)
                {
                    case (elem_is_child_of_body_bool && (anchor_str == 'element' || anchor_str == 'e')):
                        switch(true)
                        {
                            case (!elem_is_id_selector_bool):
                                throw new Error("You must use only the JQuery ID selector when the 'anchor' option is set to 'e' or 'element'!");
                                break;
                        }
                        resp_basis_str = 'c';
                        break;

                    default:
                        resp_basis_str = 'v';
                        /**
                         * This indicates that at least one Restive.JS constructor has a Responsive Basis of 'viewport'
                         * NOTE: It is ultimately used to prevent the viewport and callback manager from being activated if all Restive.JS constructors are determined to have a 'container' responsiveness basis
                         */
                        Restive.store("rstv_resp_basis_viewport_init", true);
                }

                return resp_basis_str;
            }
            catch(e){
                alert(e);
                console.log(e);/*RemoveLogging:skip*/
            }
        },
        _viewportMonitor: function($bp_arr, $this, $options, $rstv_core_info){
            //set event handler for resize
            var event_name_resize_str = "resize_viewport",
                event_name_ort_str = "change_orientation";

            //set event handler for viewport resize
            $(window).on(event_name_resize_str, function(){
                methods._onResizeViewport($bp_arr, $this, $options, $rstv_core_info);
            });

            //set event handler for orientation change
            $(window).on(event_name_ort_str, function(){
                methods._onChangeOrientation($bp_arr, $this, $options, $rstv_core_info);
            });

            //activate Viewport Monitor
            Restive.viewportMonitor();
        },
        _containerMonitor: function($bp_arr, $this, $options, $rstv_core_info){
            var event_name_resize_container_str = "resizecontainer"
                ;

            //set event handler for container resize
            $this.on(event_name_resize_container_str, function(){
                methods._onResizeContainer($bp_arr, $this, $options, $rstv_core_info);
            });
        },
        _onResizeViewport: function($bp_arr, $this, $options, $rstv_core_info){
            try{
                return $this.each(function(){
                    var $_this = $(this)
                        ;
                    methods.setBreakpoints($bp_arr, $_this, $options, $rstv_core_info, 'rv');

                    //call resize callbacks
                    methods._callbackManager($options, ['resize']);
                });
            }
            catch(e){
                alert(e);
                console.log(e);/*RemoveLogging:skip*/
            }
        },
        _onResizeContainer: function($bp_arr, $this, $options, $rstv_core_info){
            try{
                return $this.each(function(){
                    var $_this = $(this)
                        ;
                    methods.setBreakpoints($bp_arr, $_this, $options, $rstv_core_info, 'rc');
                });
            }
            catch(e){
                alert(e);
                console.log(e);/*RemoveLogging:skip*/
            }
        },
        _onChangeOrientation: function($bp_arr, $this, $options, $rstv_core_info){
            try{
                return $this.each(function(){
                    var $_this = $(this);
                    methods.setBreakpoints($bp_arr, $_this, $options, $rstv_core_info, 'co');

                    //call orientation callbacks
                    methods._callbackManager($options, ['rotate']);
                });
            }
            catch(e){
                alert(e);
                console.log(e);/*RemoveLogging:skip*/
            }
        },
        getBreakpoints: function(bp_arr, bp_class_arr){
            return Restive.getBreakpoints(bp_arr, bp_class_arr);
        },
        setBreakpoints: function(){

            var myArgs = Array.prototype.slice.call(arguments);
            var bp_arr = myArgs[0],
                elem = myArgs[1],
                rstv_options = myArgs[2],
                rstv_core_info = myArgs[3],
                rstv_event_info = myArgs[4],
                is_ort_change_bool = false,
                is_resize_viewport_bool = false,
                is_resize_container_bool = false,
                is_resp_basis_container_bool = rstv_core_info["is_resp_basis_container"],
                is_multi_abort_1_bool = Restive.store("rstv_multi_abort_1")
            ;

            //Capture orientation change
            switch(true)
            {
                case (rstv_event_info == 'co'):
                    //there has been a change in orientation. manage accordingly
                    is_ort_change_bool = true;
                    break;
            }

            //Capture resize
            switch(true)
            {
                case (rstv_event_info == 'rv'):
                    //the viewport has been resized. manage accordingly
                    is_resize_viewport_bool = true;
                    break;
            }

            //Capture resize container
            switch(true)
            {
                case (rstv_event_info == 'rc'):
                    //the selected container has been resized. manage accordingly
                    is_resize_container_bool = true;
                    break;
            }

            //Abort Restive.JS if multiple constructor anomalies occur
            switch(true)
            {
                case (is_multi_abort_1_bool):
                    methods._error('rstv_error_004', 'If you are calling the Restive.JS Constructor more than once, you must call $.restive.startMulti() before calling these constructors!');
                    return false;
                    break;
            }

            /**
             * When multiple Restive.JS Constructors are used, and a match is found, that match is saved
             * On successive attempts, the breakpoint conditions that previously failed are prevented from being executed further to improve overall performace
             * The following code manages this process
             * NOTE: If the Responsive Basis is 'container', this functionality is ignored
             */
            var rstv_store_is_multi_bool = Restive.store("rstv_multi_start"),
                rstv_store_multi_count_int = parseInt(Restive.store("rstv_multi_count")),
                rstv_store_bpm_idx_int = parseInt(Restive.store("rstv_multi_bpm_idx")),
                rstv_store_bpm_lock_bool = Restive.store("rstv_cache_bpm_lock")
                ;

            switch(true)
            {
                case (!is_resp_basis_container_bool):
                    /**
                     * Do only if Responsive Basis is Viewport
                     */
                    switch(true)
                    {
                        case (rstv_store_is_multi_bool && !is_ort_change_bool && rstv_store_bpm_lock_bool):
                            switch(true)
                            {
                                case (isNumber(rstv_store_multi_count_int) && isNumber(rstv_store_bpm_idx_int) && rstv_store_multi_count_int != rstv_store_bpm_idx_int):
                                    return false;
                                    break;
                            }
                            break;
                    }
                    break;
            }

            //get Device and Orientation Options and Information
            var restive_user_agent_str = Restive.getUserAgent(),
                options_platform_str = rstv_options.platform,
                options_formfactor_str = rstv_options.formfactor,
                options_force_dip_str = rstv_options.force_dip,
                restive_platform_str = rstv_core_info["platform"],
                restive_formfactor_str = rstv_core_info["formfactor"],
                restive_pixelratio_str = rstv_core_info["pixelratio"],
                restive_is_mobile_str = (rstv_core_info["is_mobile"] == true) ? "true": "false",
                ort_init_str = Restive.store("rstv_ort_init"),
                ort_curr_str = Restive.store("rstv_ort_curr"),
                is_portrait_bool = Restive.isPortrait(),
                is_landscape_bool = (is_portrait_bool === true) ? false : true;


            var dim_arr = [],
                viewport_w_int,
                viewport_h_int,
                screen_w_int,
                screen_h_int,
                pixel_w_int,
                pixel_h_int,
                viewport_w_active_int,
                bp_set_arr = [],
                bp_class_arr = [],
                is_class_def_bool = false,
                bp_width_tok_str = bp_arr["bp_w"],
                bp_height_tok_str = bp_arr["bp_h"],
                bp_ort_tok_str = bp_arr["bp_o"],
                bp_type_tok_str = bp_arr["bp_t"],
                bp_class_tok_str = bp_arr["bp_c"],
                bp_width_arr = [],
                bp_height_arr = [],
                bp_ort_arr = [],
                bp_type_arr = [];

            viewport_w_int = Restive.viewportW();
            viewport_w_active_int = viewport_w_int;
            viewport_h_int = Restive.viewportH();
            screen_w_int = Restive.screenW();
            screen_h_int = Restive.screenH();
            pixel_w_int = Restive.pixelW();
            pixel_h_int = Restive.pixelH();

            switch(true)
            {
                case (options_force_dip_str == true):
                    viewport_w_active_int = Restive.pixelW();
                    break;
            }

            //Extract Data to Array
            bp_width_arr = arrayToInteger(explode("|", bp_width_tok_str));
            bp_height_arr = arrayToInteger(explode("|", bp_height_tok_str));
            bp_ort_arr = explode("|", bp_ort_tok_str);
            bp_type_arr = explode("|", bp_type_tok_str);

            //Manage Classes Data
            switch(true)
            {
                case (typeof bp_class_tok_str !== "undefined" || bp_class_tok_str != null):
                    is_class_def_bool = true;
                    bp_class_arr = explode("|", bp_class_tok_str);
                    break;
            }

            var bp_width_arr_has_dupl_bool,
                bp_width_tok_no_dupl_str = '',
                bp_break_on_match_bool,
                bp_width_int,
                bp_width_prev_int,
                bp_width_prev_ort_marker_int,
                is_curr_bp_in_ort_range_bool = true,
                is_prev_bp_in_ort_range_bool = true,
                is_ort_marker_set_init_bool = false,        //this indicates whether orientation markers have been used at least once
                bp_width_start_int,
                bp_width_min_int,
                bp_width_max_int,
                bp_height_int,
                bp_width_diff_r_int,                        //the difference between current viewport width and bp_width_max_int
                bp_width_diff_r_abs_int,                    //the absolute difference between current viewport width and bp_width_max_int
                bp_width_diff_l_int,                        //the difference between current viewport width and bp_width_min_int
                bp_width_diff_r_comp_int,
                bp_type_str,
                bp_ort_str,
                bp_class_str,
                bp_class_last_sel_str,
                span_range_bool,
                ort_range_bool,
                is_breakpoint_match_bool = false,
                is_breakpoint_match_hit_bool = false,
                is_breakpoint_match_os_bool = true,
                is_breakpoint_match_ff_bool = true,
                ba_usage_log_status_str = '',
                ba_usage_log_status_code_str = '',
                elem_set_data_str
                ;

            var bp_width_arr_count_int = count(bp_width_arr);

            //check if there are duplicate width values
            bp_width_arr_has_dupl_bool = arrayHasDuplicates(bp_width_arr);
            bp_break_on_match_bool = (bp_width_arr_has_dupl_bool) ? false : true;

            /**
             * Iterate over individual breakpoints
             */
            for(var i = 0; i < bp_width_arr_count_int; i++)
            {
                /**
                 * Filter for:
                 * 1. platform
                 * 2. form factor
                 * If provided in the options
                 * Break out of for loop
                 */
                //1
                switch(true)
                {
                    case (rstv_options.platform != 'all' && rstv_options.platform != restive_platform_str):
                        is_breakpoint_match_os_bool = false;
                        break;
                }

                //2
                switch(true)
                {
                    case (rstv_options.formfactor != 'all' && rstv_options.formfactor != restive_formfactor_str):
                        is_breakpoint_match_ff_bool = false;
                        break;
                }

                //break out of for loop if match is not found
                if(!is_breakpoint_match_os_bool || !is_breakpoint_match_ff_bool) break;

                var i_prev = i - 1;
                bp_width_int = bp_width_arr[i];

                //manage previous breakpoint widths
                switch(true)
                {
                    case (i > 0):
                        bp_width_prev_int = bp_width_arr[i_prev];
                        break;

                    default:
                        bp_width_prev_int = 0;
                        bp_width_prev_ort_marker_int = 0;
                }

                bp_height_int = bp_height_arr[i];

                bp_type_str = bp_type_arr[i];
                bp_ort_str = bp_ort_arr[i];

                //Consider orientation markers
                is_prev_bp_in_ort_range_bool = is_curr_bp_in_ort_range_bool;
                switch(true)
                {
                    case (bp_ort_str == "p"):
                        ort_range_bool = (is_portrait_bool) ? true : false;
                        is_ort_marker_set_init_bool = true;

                        is_curr_bp_in_ort_range_bool = ort_range_bool;
                        bp_width_tok_no_dupl_str = (is_prev_bp_in_ort_range_bool === false) ? bp_width_prev_ort_marker_int: bp_width_tok_no_dupl_str;
                        break;

                    case (bp_ort_str == "l"):
                        ort_range_bool = (is_landscape_bool) ? true : false;
                        is_ort_marker_set_init_bool = true;

                        is_curr_bp_in_ort_range_bool = ort_range_bool;
                        bp_width_tok_no_dupl_str = (is_prev_bp_in_ort_range_bool === false) ? bp_width_prev_ort_marker_int: bp_width_tok_no_dupl_str;
                        break;

                    default:
                        /**
                         * If is_prev_bp_in_ort_range_bool is false, it means that the previous breakpoint
                         * had an orientation marker ('-p' or '-l') that did not match the current
                         * orientation of the viewport.
                         * And if is_ort_marker_set_init_bool is true, then there has been a transition from a
                         * breakpoint with an orientation marker to one without one.
                         */
                        bp_width_tok_no_dupl_str = (is_ort_marker_set_init_bool === true && is_prev_bp_in_ort_range_bool === false) ? bp_width_prev_ort_marker_int: bp_width_tok_no_dupl_str;

                        bp_width_prev_ort_marker_int = (i > 0) ? bp_width_int: 0;
                        ort_range_bool = true;
                        is_curr_bp_in_ort_range_bool = ort_range_bool;
                }

                //Manage duplicate entries
                switch(true)
                {
                    case (i == 0):
                        bp_width_start_int = 0;
                        bp_width_tok_no_dupl_str = bp_width_int;
                        break;

                    case (i >= 1):

                        switch(true)
                        {
                            case (bp_width_int !== bp_width_prev_int):
                                bp_width_tok_no_dupl_str = bp_width_int+'-!'+bp_width_tok_no_dupl_str;
                                break;
                        }

                        bp_width_start_int = parseInt(getValueAfterExplode(bp_width_tok_no_dupl_str, '-!', 1));

                        break;
                }

                //Define classes
                bp_class_str = bp_class_arr[i];

                //set ranges for widths
                switch(true)
                {
                    case (i == 0):
                        bp_width_min_int = bp_width_start_int;
                        bp_width_max_int = bp_width_int;

                        break;

                    default:
                        bp_width_min_int = (bp_width_start_int == 0) ? bp_width_start_int : bp_width_start_int + 1;
                        bp_width_max_int = bp_width_int;
                }

                /**
                 * Check for Matching Breakpoints
                 * 1. Do for Container Basis
                 * 2. Do for Viewport Basis. Make sure to consider force_dip option
                 */
                switch(true)
                {
                    case (is_resp_basis_container_bool):
                        //1
                        span_range_bool = Restive.eSpan(bp_width_min_int, bp_width_max_int, elem, rstv_options.anchor_e_df, rstv_options.force_dip);
                        break;

                    default:
                        //2
                        span_range_bool = (options_force_dip_str == true) ? Restive.cSpan(bp_width_min_int, bp_width_max_int): Restive.vSpan(bp_width_min_int, bp_width_max_int);
                }

                /**
                 * Set Breakpoints
                 * A. For Container Basis
                 *
                 * B. For Viewport Basis
                 * Status codes as follows:
                 * 1: Viewport matched breakpoint with clean hit on initialization i.e. viewport is virtually identical to breakpoint
                 * 2: Viewport matched breakpoint with clean hit after orientation change
                 * 3: Viewport matched breakpoint but not with a clean hit i.e. margin between viewport width and upper limit of matched breakpoint range is significant
                 * 4: Viewport matched breakpoint after orientation change but not with a clean hit i.e. margin between viewport width and upper limit of matched breakpoint range is significant
                 */
                switch(true)
                {
                    case (span_range_bool && ort_range_bool):

                        switch(true)
                        {
                            case (is_resp_basis_container_bool):
                                //A
                                is_breakpoint_match_bool = true;
                                break;

                            default:
                                //B
                                bp_width_diff_r_int = bp_width_max_int - viewport_w_active_int;
                                bp_width_diff_r_abs_int = Math.abs(bp_width_diff_r_int);
                                bp_width_diff_l_int = viewport_w_active_int - bp_width_min_int;

                                bp_width_diff_r_comp_int = bp_width_max_int*0.1;
                                bp_width_diff_r_comp_int = Math.round(bp_width_diff_r_comp_int);

                                switch(true)
                                {
                                    case (is_ort_change_bool):
                                        //capture some key metrics
                                        switch(true)
                                        {
                                            case (bp_width_diff_r_int > bp_width_diff_r_comp_int):
                                                ba_usage_log_status_code_str = "4";
                                                break;

                                            default:
                                                ba_usage_log_status_code_str = "2";
                                        }
                                        break;

                                    default:
                                        //capture some key metrics
                                        switch(true)
                                        {
                                            case (bp_width_diff_r_int > bp_width_diff_r_comp_int):
                                                ba_usage_log_status_code_str = "3";
                                                break;

                                            default:
                                                ba_usage_log_status_code_str = "1";
                                        }
                                }

                                is_breakpoint_match_bool = true;

                                //Capture class values of last hit
                                switch(true)
                                {
                                    case (is_breakpoint_match_bool):
                                        is_breakpoint_match_hit_bool = true;

                                        bp_class_last_sel_str = bp_class_str;

                                        switch(true)
                                        {
                                            case (bp_ort_str != "x"):
                                                bp_break_on_match_bool = true;
                                                break;
                                        }
                                        break;
                                }
                        }

                        break;

                    default:
                        is_breakpoint_match_bool = false;
                }

                //break out of for loop if match is found
                if(is_breakpoint_match_bool && bp_break_on_match_bool) break;
            }

            //Perform adjustment of breakpoint match value to compensate for if bp_break_on_match_bool is false
            switch(true)
            {
                case (is_breakpoint_match_hit_bool):
                    is_breakpoint_match_bool = true;
                    bp_class_str = bp_class_last_sel_str;
                    break;
            }

            //Some Breakpoint Advisory Information
            switch(true)
            {
                case (!is_breakpoint_match_bool):

                    //Do for Container Basis
                    switch(true)
                    {
                        case (is_resp_basis_container_bool):
                            methods.unsetElementDOM(elem, rstv_options);
                            return;
                            break;
                    }

                    //Do for Viewport Basis
                    bp_width_min_int = 0;
                    bp_width_max_int = 0;

                    switch(true)
                    {
                        case (!Restive.store("rstv_multi_start") || is_ort_change_bool):
                            methods.unsetElementDOM(elem, rstv_options);
                            break;
                    }

                    switch(true)
                    {
                        case (!is_breakpoint_match_os_bool && is_breakpoint_match_ff_bool):
                            ba_usage_log_status_code_str = "7";
                            break;

                        case (!is_breakpoint_match_ff_bool && is_breakpoint_match_os_bool):
                            ba_usage_log_status_code_str = "8";
                            break;

                        case (!is_breakpoint_match_ff_bool && !is_breakpoint_match_os_bool):
                            ba_usage_log_status_code_str = "9";
                            break;

                        default:
                            switch(true)
                            {
                                case (is_ort_change_bool):
                                    ba_usage_log_status_code_str = "6";
                                    break;

                                default:
                                    ba_usage_log_status_code_str = "5";
                            }
                    }

                    //Add Turbo Classes if any
                    elem_set_data_str = methods._addTurboClasses('', rstv_options.turbo_classes);

                    //This if for turbo_classes_reflow option
                    elem_set_data_str = methods._addTurboClassesReflow(elem_set_data_str, rstv_options);

                    switch(true)
                    {
                        case (!Restive.store("rstv_multi_start") || is_ort_change_bool):
                            methods.setElementDOM(elem, elem_set_data_str, rstv_options);
                            break;
                    }

                    //persist
                    Restive.store("rstv_breakpoint_match_curr", false);

                    break;

                case (is_breakpoint_match_bool):
                    elem_set_data_str = methods._addTurboClasses(bp_class_str, rstv_options.turbo_classes);

                    //This if for turbo_classes_reflow option
                    elem_set_data_str = methods._addTurboClassesReflow(elem_set_data_str, rstv_options);

                    /**
                     * Set class
                     */
                    //Do for Container Basis
                    switch(true)
                    {
                        case (is_resp_basis_container_bool):
                            methods.setElementDOM(elem, elem_set_data_str, rstv_options);
                            return;
                            break;
                    }

                    //Do for Viewport Basis
                    switch(true)
                    {
                        case (Restive.store("rstv_multi_start")):
                            var bpm_h_counter_int = parseInt(Restive.store("rstv_bpm_h_counter"));
                            switch(true)
                            {
                                case (is_ort_change_bool):
                                    //change in orientation
                                    methods.setElementDOM(elem, elem_set_data_str, rstv_options);
                                    break;

                                default:
                                    //initialization
                                    switch(true)
                                    {
                                        case (bpm_h_counter_int > 1):
                                            //check if the current viewport offers a better match
                                            var ss_bp_width_diff_r_abs_int = parseInt(Restive.store("rstv_cache_bpm_viewport_diff"));

                                            switch(true)
                                            {
                                                case (bp_width_diff_r_abs_int < ss_bp_width_diff_r_abs_int):
                                                    //this is a better viewport match
                                                    methods.setElementDOM(elem, elem_set_data_str, rstv_options);

                                                    switch(true)
                                                    {
                                                        case(!rstv_store_bpm_lock_bool):
                                                            Restive.store("rstv_multi_bpm_idx", rstv_store_multi_count_int);
                                                            break;
                                                    }

                                                    Restive.store("rstv_cache_bpm_viewport_diff", bp_width_diff_r_abs_int);
                                                    break;
                                            }

                                            break;

                                        default:
                                            methods.setElementDOM(elem, elem_set_data_str, rstv_options);
                                            switch(true)
                                            {
                                                case(!rstv_store_bpm_lock_bool):
                                                    Restive.store("rstv_multi_bpm_idx", rstv_store_multi_count_int);
                                                    break;
                                            }

                                            Restive.store("rstv_cache_bpm_viewport_diff", bp_width_diff_r_abs_int);
                                    }

                                    bpm_h_counter_int++;
                                    Restive.store("rstv_bpm_h_counter", bpm_h_counter_int, '', {expires: 1000});
                            }

                            break;

                        default:
                            //Set the element class immediately
                            methods.setElementDOM(elem, elem_set_data_str, rstv_options);
                    }

                    //persist
                    Restive.store("rstv_breakpoint_match_curr", true);
                    break;
            }

            /**
             * Track Breakpoint Hits and Misses in Storage
             * Do this incrementally when:
             * 1. Multi-Constructor Mode is active
             * 2. There has not been a change in orientation
             * 3. Breakpoint Match Cache Lock is not set
             * NOTE: For Multi-constructor Operations only
             */
            var rstv_cache_bpm_lock_bool = Restive.store("rstv_cache_bpm_lock");
            switch(true)
            {
                case (rstv_store_is_multi_bool && !is_ort_change_bool && !((isString(rstv_cache_bpm_lock_bool) && rstv_cache_bpm_lock_bool != "") || isBool(rstv_cache_bpm_lock_bool))):
                    (Restive.store("rstv_breakpoint_match_curr")) ? methods._extVarTracker("rstv_cache_bpm", "h", "ls", false, '', false): methods._extVarTracker("rstv_cache_bpm", "m", "ls", false, '', false);
                    break;
            }

            //Exit for Matched Breakpoint
            switch(true)
            {
                case (is_breakpoint_match_bool):
                    return true;
                    break;
            }

            return false;
		},
        _addTurboClassesReflow: function(class_data_str, options){
            switch(true)
            {
                case (methods.isPC()):
                    //only do for Personal Computer environments

                    switch(true)
                    {
                        case (options.turbo_classes_reflow && isString(options.turbo_classes) && options.turbo_classes != ''):
                            //only do if turbo_classes_reflow option is true and turbo_classes are populated

                            var opt_isset_is_mobile_bool,
                                fpr_span_range_tomobile_bool,
                                fpr_span_range_tophone_bool,
                                fpr_span_range_totablet_bool,
                                fpr_limits_tablet_int,
                                fpr_limits_phone_int,
                                fpr_limits_bp_btw_phone_and_tablet_int,
                                fpr_test_key_str,
                                fpr_test_value_str,
                                fpr_limits_arr = [],
                                turbo_classes_arr = [],
                                fpr_final_data_str = class_data_str,
                                is_turbo_classes_reflow_match_bool = false,
                                is_turbo_classes_reflow_status_bool = Restive.store('rstv_turbo_classes_reflow_status_in')
                                ;

                            //get the turbo_classes_reflow_limits values
                            fpr_limits_arr = explode(',', options.turbo_classes_reflow_limits);
                            fpr_limits_phone_int = parseInt(fpr_limits_arr[0]);
                            fpr_limits_tablet_int = parseInt(fpr_limits_arr[1]);

                            //ensure is_mobile turbo_classes parameter
                            opt_isset_is_mobile_bool = /is_mobile=/i.test(options.turbo_classes);
                            switch(true)
                            {
                                case (opt_isset_is_mobile_bool):
                                    //iterate over all provided turbo_classes
                                    turbo_classes_arr = explode(',', options.turbo_classes);
                                    for(var j = 0; j < count(turbo_classes_arr); j++)
                                    {
                                        fpr_test_key_str = getValueAfterExplode(turbo_classes_arr[j], "=", 0);
                                        fpr_test_value_str = getValueAfterExplode(turbo_classes_arr[j], "=", 1);

                                        switch(true)
                                        {
                                            case (fpr_test_key_str == 'is_mobile'):
                                                fpr_span_range_tomobile_bool = (options.force_dip == true) ? Restive.cSpan(0, fpr_limits_tablet_int): Restive.vSpan(0, fpr_limits_tablet_int);

                                                switch(true)
                                                {
                                                    case (fpr_span_range_tomobile_bool):

                                                        fpr_final_data_str += ' '+fpr_test_value_str;
                                                        is_turbo_classes_reflow_match_bool = true;
                                                        switch(true)
                                                        {
                                                            case (!is_turbo_classes_reflow_status_bool && is_turbo_classes_reflow_match_bool):
                                                                Restive.store('rstv_turbo_classes_reflow_status_in', true);

                                                                //add callback
                                                                methods._callbackManager(options, ['turboclassesreflow', 'in']);

                                                                break;
                                                        }

                                                        break;

                                                    default:
                                                        is_turbo_classes_reflow_match_bool = false;
                                                        switch(true)
                                                        {
                                                            case (is_turbo_classes_reflow_status_bool && !is_turbo_classes_reflow_match_bool):
                                                                Restive.store('rstv_turbo_classes_reflow_status_in', false);

                                                                //add callback
                                                                methods._callbackManager(options, ['turboclassesreflow', 'out']);

                                                                break;
                                                        }
                                                }

                                                break;
                                        }

                                        switch(true)
                                        {
                                            case (fpr_test_key_str == 'is_phone'):
                                                fpr_span_range_tophone_bool = (options.force_dip == true) ? Restive.cSpan(0, fpr_limits_phone_int): Restive.vSpan(0, fpr_limits_phone_int);

                                                fpr_final_data_str = (fpr_span_range_tophone_bool) ? fpr_final_data_str + ' ' + fpr_test_value_str: fpr_final_data_str;
                                                break;
                                        }

                                        switch(true)
                                        {
                                            case (fpr_test_key_str == 'is_tablet'):
                                                fpr_limits_bp_btw_phone_and_tablet_int = fpr_limits_phone_int + 1;
                                                fpr_span_range_totablet_bool = (options.force_dip == true) ? Restive.cSpan(fpr_limits_bp_btw_phone_and_tablet_int, fpr_limits_tablet_int): Restive.vSpan(fpr_limits_bp_btw_phone_and_tablet_int, fpr_limits_tablet_int);
                                                fpr_final_data_str = (fpr_span_range_totablet_bool) ? fpr_final_data_str + ' ' + fpr_test_value_str: fpr_final_data_str;

                                                break;
                                        }

                                    }

                                    return fpr_final_data_str;
                                    break;
                            }
                            break;
                    }
                    break;
            }

            //Restive.store('rstv_turbo_classes_reflow_status_in', false);
            return class_data_str;
        },
        _addTurboClasses: function(class_data_str, opt_turbo_classes){
            //return class name only if power classes info is invalid or empty
            switch(true)
            {
                case (!isString(opt_turbo_classes) || opt_turbo_classes == ''):
                    return class_data_str;
                    break;
            }

            //Define variables
            var opt_pc_arr = [],
                pc_key_str,
                pc_value_str,
                pc_temp_arr = [],
                pc_temp_str = '',
                pc_final_str = '',
                pc_func_arr = {'is_mobile': 'isMobile', 'is_non_mobile': 'isNonMobile', 'is_retina': 'isRetina', 'is_phone': 'isPhone', 'is_tablet': 'isTablet', 'is_tv': 'isTV', 'is_pc': 'isPC', 'is_portrait': 'isPortrait', 'is_landscape': 'isLandscape'},
                pc_func_name_str,
                pc_func_res
                ;

            opt_pc_arr = explode(',', opt_turbo_classes);
            for(var i = 0; i < count(opt_pc_arr); i++)
            {
                pc_key_str = getValueAfterExplode(opt_pc_arr[i], "=", 0);
                pc_value_str = getValueAfterExplode(opt_pc_arr[i], "=", 1);

                pc_func_name_str = pc_func_arr[pc_key_str];
                switch(true)
                {
                    case (isString(pc_func_name_str) && pc_func_name_str != ''):
                        pc_func_res = methods[pc_func_name_str];
                        switch(true)
                        {
                            case (pc_func_res()):
                                pc_temp_arr.push(pc_value_str);
                                break;
                        }
                        break;
                }
            }

            pc_temp_str = implode(' ', pc_temp_arr, true);
            pc_final_str = (pc_temp_str != '') ? pc_temp_str+' '+class_data_str : class_data_str;
            return pc_final_str;
        },
        setElementDOM: function(elem, elem_set_str, options){
            var data_key_str = md5(getSelector(elem)),
                ds_elem_set_class_name_str = "rstv_bpm_class_"+data_key_str,
                ds_elem_set_str;

            ds_elem_set_str = (isString(Restive.store(ds_elem_set_class_name_str)) && Restive.store(ds_elem_set_class_name_str) != '') ? Restive.store(ds_elem_set_class_name_str): '';
            switch(true)
            {
                case (ds_elem_set_str != ''):
                    elem.removeClass(ds_elem_set_str).addClass(elem_set_str);
                    switch(true)
                    {
                        case (ds_elem_set_str != elem_set_str):
                            methods._callbackManager(options, ['removeclass', ''+ds_elem_set_str+'']);
                            break;
                    }
                    break;

                default:
                    elem.addClass(elem_set_str);
            }
            Restive.store(ds_elem_set_class_name_str, elem_set_str);
            methods._callbackManager(options, ['addclass', ''+elem_set_str+'']);
        },
        unsetElementDOM: function(elem, options){
            var data_key_str = md5(getSelector(elem)),
                ds_elem_set_class_name_str = "rstv_bpm_class_"+data_key_str,
                ds_elem_set_str;

            ds_elem_set_str = (isString(Restive.store(ds_elem_set_class_name_str)) && Restive.store(ds_elem_set_class_name_str) != '') ? Restive.store(ds_elem_set_class_name_str): '';
            elem.removeClass(ds_elem_set_str);

            methods._callbackManager(options, ['removeclass', ''+ds_elem_set_str+'']);
        },
        _extVarTracker: function($track_name_str, $track_value_str)
        {
            var myArgs = Array.prototype.slice.call(arguments);
            var store_type_str = (isString(myArgs[2]) && myArgs[2] != "") ? myArgs[2] : 'ck';
            var unique_bool = (isBool(myArgs[3])) ? myArgs[3]: false;
            var expires = (isNumber(myArgs[4]) || isString(myArgs[4])) ? parseInt(myArgs[4]): '';
            var reverse_order_bool = (isBool(myArgs[5])) ? myArgs[5]: true;
            var delim_str = (isString(myArgs[6]) && myArgs[6] != "") ? myArgs[6]: '-!';
            var data_count_int = (isNumber(myArgs[7]) || isString(myArgs[7])) ? parseInt(myArgs[7]): 80;

            return Restive.storeVarTracker($track_name_str, $track_value_str, store_type_str, unique_bool, expires, reverse_order_bool, delim_str, data_count_int);
        },
        _multiConstructorSelectPos: function(){
            var bpm_val_str = Restive.store("rstv_cache_bpm"),
                bpm_val_arr = explode("-!", bpm_val_str),
                bpm_val_temp_str,
                bpm_idx_int = parseInt(Restive.store("rstv_multi_bpm_idx"))
                ;

            bpm_val_temp_str = implode("", bpm_val_arr);

            /**
             * 1. If only one hit is recorded, get it's position
             * 2. If all misses, get the last position i.e. length of string
             * 3. If more than one hit, get the value for the best match previously calculated
             */
            var sel_constructor_pos,
                sel_constructor_pos_1,
                pattern_1 = new RegExp("^[^h]*h[^h]*$", "gi"),
                pattern_2 = new RegExp("^m+$", "gi");

            switch(true)
            {
                case (pattern_1.test(bpm_val_temp_str)):
                    //1
                    sel_constructor_pos = strrpos(bpm_val_temp_str, 'h');
                    break;

                case (pattern_2.test(bpm_val_temp_str)):
                    //2
                    Restive.store("rstv_cache_bpm_all_miss", true, '', {expires: 2000});
                    sel_constructor_pos = strrpos(bpm_val_temp_str, 'm');
                    break;

                case(substr_count(bpm_val_temp_str, "h") > 1):
                    //3
                    sel_constructor_pos = bpm_idx_int - 1;
                    break;
            }
            sel_constructor_pos_1 = sel_constructor_pos + 1;
            Restive.store("rstv_multi_bpm_idx", sel_constructor_pos_1);

            return sel_constructor_pos;
        },
        _multiConstructorManageEvents: function(sel_constructor_pos){
            //Remove any events previously attached
            $(window).off('resize');

            //Manage Viewport Monitoring and Callbacks
            var $sel_pos_final_int = parseInt(sel_constructor_pos) + 1,
                $breakpoints_arr = window.parent.rstv_store.main["rstv_breakpoints_"+$sel_pos_final_int],
                $this = window.parent.rstv_store.main["rstv_this_"+$sel_pos_final_int],
                $options = window.parent.rstv_store.main["rstv_options_"+$sel_pos_final_int],
                $rstv_core_info_arr = window.parent.rstv_store.main["rstv_core_info_"+$sel_pos_final_int]
                ;

            switch(true)
            {
                case (Restive.store("rstv_resp_basis_viewport_init")):
                    methods._viewportMonitor($breakpoints_arr, $this, $options, $rstv_core_info_arr);
                    methods._callbackManager($options, ['ready', 'init']);
                    break;
            }
        },
        _multiConstructorFinalize: function(){

            var sel_constructor_pos = methods._multiConstructorSelectPos();

            //Redo event handlers
            methods._multiConstructorManageEvents(sel_constructor_pos);

            /**
             * Set Breakpoint Match Cache Lock
             * This marks that a Breakpoint Match has been determined (i.e. hit or miss) and as such this result should be stored and reused
             * NOTE: Only used in Multi-Constructor Operations
             */
            Restive.store("rstv_cache_bpm_lock", true);

            //Reset some local storage variables
            Restive.store("rstv_cache_req", null);
            Restive.store("rstv_multi_count", null);
        },
        _multiConstructorStart: function(){
            Restive.store("rstv_multi_count", 0);                 //counts the number of multi-constructor operations
            Restive.store("rstv_multi_start", true);
            Restive.store("rstv_multi_abort_1", false);
            Restive.store("rstv_multi_abort_2", false);

            //set some expiring counters
            Restive.store("rstv_bpm_h_counter", 1, '', {expires: 1000});
            Restive.store("rstv_bpm_m_counter", 1, '', {expires: 1000});

            //set some persistent counters
            switch(true)
            {
                case (!Restive.isStorageValueSet("rstv_multi_start_count")):
                    Restive.store("rstv_multi_start_count", 1);
                    Restive.store("rstv_multi_end", false);
                    break;

                default:
                    Restive.incrementStorageValue("rstv_multi_start_count");
            }
        },
        _multiConstructorManager: function(){
            var is_multi_start_bool = Restive.store("rstv_multi_start"),
                is_multi_end_bool = Restive.store("rstv_multi_end"),
                rstv_count_int = parseInt(Restive.store("rstv_multi_count")),
                rstv_multi_start_count_int = parseInt(Restive.store("rstv_multi_start_count"))
            ;

            /**
             * Check if Restive.JS Constructor has been called multiple times
             */
            switch(true)
            {
                case (rstv_count_int > 1):
                    //Signal abort if startMulti() method call not used
                    switch(true)
                    {
                        case (is_multi_start_bool === false):
                            Restive.store("rstv_multi_abort_1", true);
                            break;
                    }
                    break;
            }

            /**
             * Check if Restive.JS Constructor has been called multiple times and has not been finalized properly with endMulti() method
             */
            switch(true)
            {
                case (rstv_multi_start_count_int > 1 && is_multi_end_bool === false):
                    Restive.store("rstv_multi_abort_2", true);
                    break;
            }
            methods._URLMonitor();
        },
        _multiConstructorCounter: function(){
            Restive.incrementStorageValue("rstv_multi_count");
        },
        _multiConstructorEnd: function(){
            //reset stored variables
            Restive.store("rstv_multi_start_count", 0);
            Restive.store("rstv_multi_end", true);

            //finalize multi constructor operations
            methods._multiConstructorFinalize();
        },
        getUserAgent: function (){
            return Restive.getUserAgent();
        },
        getPlatform: function (){
            return Restive.getPlatform();
        },
        getFormFactor: function(){
            return Restive.getFormFactor();
        },
        getOrientation: function(){
            return Restive.getOrientation();
        },
        getResolution: function(){
            return Restive.getResolution();
        },
        getPixelRatio: function(pxl_ratio){
            return Restive.getPixelRatio(pxl_ratio);
        },
        getViewportW: function(){
            return Restive.viewportW();
        },
        getViewportH: function(){
            return Restive.viewportH();
        },
        getScreenW: function(){
            return Restive.screenW();
        },
        getScreenH: function(){
            return Restive.screenH();
        },
        getPixelW: function(){
            return Restive.pixelW();
        },
        getPixelH: function(){
            return Restive.pixelH();
        },
        isRetina: function(){
            return Restive.isRetina();
        },
        isMobile: function(){
            return Restive.isMobile();
        },
        isNonMobile: function(){
            return Restive.isNonMobile();
        },
        isPhone: function(){
            return Restive.isPhone();
        },
        isTablet: function(){
            return Restive.isTablet();
        },
        isTV: function(){
            return Restive.isTV();
        },
        isPC: function(){
            return Restive.isPC();
        },
        isIOS: function(){
            return Restive.isIOS();
        },
        isApple: function(){
            return Restive.isApple();
        },
        isAndroid: function(){
            return Restive.isAndroid();
        },
        isSymbian: function(){
            return Restive.isSymbian();
        },
        isBlackberry: function(){
            return Restive.isBlackberry();
        },
        isWindows: function(){
            return Restive.isWindows();
        },
        isWindowsPhone: function(){
            return Restive.isWindowsPhone();
        },
        isPortrait: function(){
            return Restive.isPortrait();
        },
        isLandscape: function(){
            return Restive.isLandscape();
        }
	};

    /**
     * Plugin Initialize
     */
    $.fn.restive = function(args){
		
		if ( methods[args] )
		{
			//execute JQuery Plugin Method
		   	return methods[ args ].apply( this, Array.prototype.slice.call( arguments, 1 ));
		}
		else if ( typeof args === 'object' || ! args ) 
		{
			//Process JQuery Plugin Options
			var opts = $.extend({}, $.fn.restive.defaults, args);
			var new_args = new Array(opts);
			return methods.init.apply( this, new_args );
		}
		else 
		{
		   	$.error( 'Method ' +  args + ' does not exist on Restive.JS' );
		}
	};	
	
	/**
	 * Plugin Defaults
	 */
	$.fn.restive.defaults = {
        breakpoints: [],                                //the breakpoints
		classes: [],                                    //the corresponding classes
        anchor: 'window',                               //the basis for responsiveness
        anchor_e_df: 'w',                               //the dimension format for element-value anchor operations
        platform: 'all',						        //all, ios, android, symbian, blackberry, windows
        formfactor: 'all',                              //all, pc, tv, tablet, phone
        turbo_classes: '',                              //special class-based functionality
        turbo_classes_reflow: false,                    //this will apply specific turbo_classes based on limit settings
        turbo_classes_reflow_limits: '480,960',         //defines thresholds for turbo_classes_reflow option
        force_dip: false,                               //force breakpoints to use device-independent pixels
        onReady: 		    function(){},
		onResize: 		    function(){},
		onRotate:		    function(){},
		onRotateToP:	    function(){},
		onRotateToL:	    function(){},
        onPortrait:         function(){},
        onLandscape:        function(){},
        onRetina:           function(){},
        onPhone:            function(){},
        onTablet:           function(){},
        onPC:               function(){},
        onTV:               function(){},
        onIOS:              function(){},
        onAndroid:          function(){},
        onSymbian:          function(){},
        onBlackberry:       function(){},
        onWindows:          function(){},
        onWindowsPhone:     function(){},
        onMobile:           function(){},
        onNonMobile:        function(){},
        onTurboClassReflow:         function(){},
        onTurboClassReflowIn:       function(){},
        onTurboClassReflowOut:      function(){},
        onAddClass:         function(){},
        onRemoveClass:      function(){}
	};

    /**
     * Plugin Methods
     */
    var D = $.restive = function(){};
    $.extend(D, {
        getUserAgent: function(){
            return methods.getUserAgent();
        },
        getPlatform: function(){
            return methods.getPlatform();
        },
        getFormFactor: function(){
            return methods.getFormFactor();
        },
        getOrientation: function(){
            return methods.getOrientation();
        },
        getResolution: function(){
            return methods.getResolution();
        },
        getPixelRatio: function(pxl_ratio){
            return methods.getPixelRatio(pxl_ratio);
        },
        getViewportW: function(){
            return methods.getViewportW();
        },
        getViewportH: function(){
            return methods.getViewportH();
        },
        getScreenW: function(){
            return methods.getScreenW();
        },
        getScreenH: function(){
            return methods.getScreenH();
        },
        getPixelW: function(){
            return methods.getPixelW();
        },
        getPixelH: function(){
            return methods.getPixelH();
        },
        isRetina: function(){
            return methods.isRetina();
        },
        isMobile: function(){
            return methods.isMobile();
        },
        isNonMobile: function(){
            return methods.isNonMobile();
        },
        isPhone: function(){
            return methods.isPhone();
        },
        isTablet: function(){
            return methods.isTablet();
        },
        isTV: function(){
            return methods.isTV();
        },
        isPC: function(){
            return methods.isPC();
        },
        isIOS: function(){
            return methods.isIOS();
        },
        isApple: function(){
            return methods.isIOS();
        },
        isAndroid: function(){
            return methods.isAndroid();
        },
        isSymbian: function(){
            return methods.isSymbian();
        },
        isBlackberry: function(){
            return methods.isBlackberry();
        },
        isWindows: function(){
            return methods.isWindows();
        },
        isWindowsPhone: function(){
            return methods.isWindowsPhone();
        },
        isPortrait: function(){
            return methods.isPortrait();
        },
        isLandscape: function(){
            return methods.isLandscape();
        },
        startMulti: function(){
            methods._multiConstructorStart();
        },
        endMulti: function(){
            methods._multiConstructorEnd();
        }
    });

}(window, document, jQuery));

/*!
 * Isotope PACKAGED v2.2.0
 *
 * Licensed GPLv3 for open source use
 * or Isotope Commercial License for commercial use
 *
 * http://isotope.metafizzy.co
 * Copyright 2015 Metafizzy
 */

/**
 * Bridget makes jQuery widgets
 * v1.1.0
 * MIT license
 */

( function( window ) {



// -------------------------- utils -------------------------- //

var slice = Array.prototype.slice;

function noop() {}

// -------------------------- definition -------------------------- //

function defineBridget( $ ) {

// bail if no jQuery
if ( !$ ) {
  return;
}

// -------------------------- addOptionMethod -------------------------- //

/**
 * adds option method -> $().plugin('option', {...})
 * @param {Function} PluginClass - constructor class
 */
function addOptionMethod( PluginClass ) {
  // don't overwrite original option method
  if ( PluginClass.prototype.option ) {
    return;
  }

  // option setter
  PluginClass.prototype.option = function( opts ) {
    // bail out if not an object
    if ( !$.isPlainObject( opts ) ){
      return;
    }
    this.options = $.extend( true, this.options, opts );
  };
}

// -------------------------- plugin bridge -------------------------- //

// helper function for logging errors
// $.error breaks jQuery chaining
var logError = typeof console === 'undefined' ? noop :
  function( message ) {
    console.error( message );
  };

/**
 * jQuery plugin bridge, access methods like $elem.plugin('method')
 * @param {String} namespace - plugin name
 * @param {Function} PluginClass - constructor class
 */
function bridge( namespace, PluginClass ) {
  // add to jQuery fn namespace
  $.fn[ namespace ] = function( options ) {
    if ( typeof options === 'string' ) {
      // call plugin method when first argument is a string
      // get arguments for method
      var args = slice.call( arguments, 1 );

      for ( var i=0, len = this.length; i < len; i++ ) {
        var elem = this[i];
        var instance = $.data( elem, namespace );
        if ( !instance ) {
          logError( "cannot call methods on " + namespace + " prior to initialization; " +
            "attempted to call '" + options + "'" );
          continue;
        }
        if ( !$.isFunction( instance[options] ) || options.charAt(0) === '_' ) {
          logError( "no such method '" + options + "' for " + namespace + " instance" );
          continue;
        }

        // trigger method with arguments
        var returnValue = instance[ options ].apply( instance, args );

        // break look and return first value if provided
        if ( returnValue !== undefined ) {
          return returnValue;
        }
      }
      // return this if no return value
      return this;
    } else {
      return this.each( function() {
        var instance = $.data( this, namespace );
        if ( instance ) {
          // apply options & init
          instance.option( options );
          instance._init();
        } else {
          // initialize new instance
          instance = new PluginClass( this, options );
          $.data( this, namespace, instance );
        }
      });
    }
  };

}

// -------------------------- bridget -------------------------- //

/**
 * converts a Prototypical class into a proper jQuery plugin
 *   the class must have a ._init method
 * @param {String} namespace - plugin name, used in $().pluginName
 * @param {Function} PluginClass - constructor class
 */
$.bridget = function( namespace, PluginClass ) {
  addOptionMethod( PluginClass );
  bridge( namespace, PluginClass );
};

return $.bridget;

}

// transport
if ( typeof define === 'function' && define.amd ) {
  // AMD
  define( 'jquery-bridget/jquery.bridget',[ 'jquery' ], defineBridget );
} else if ( typeof exports === 'object' ) {
  defineBridget( require('jquery') );
} else {
  // get jquery from browser global
  defineBridget( window.jQuery );
}

})( window );

/*!
 * eventie v1.0.6
 * event binding helper
 *   eventie.bind( elem, 'click', myFn )
 *   eventie.unbind( elem, 'click', myFn )
 * MIT license
 */

/*jshint browser: true, undef: true, unused: true */
/*global define: false, module: false */

( function( window ) {



var docElem = document.documentElement;

var bind = function() {};

function getIEEvent( obj ) {
  var event = window.event;
  // add event.target
  event.target = event.target || event.srcElement || obj;
  return event;
}

if ( docElem.addEventListener ) {
  bind = function( obj, type, fn ) {
    obj.addEventListener( type, fn, false );
  };
} else if ( docElem.attachEvent ) {
  bind = function( obj, type, fn ) {
    obj[ type + fn ] = fn.handleEvent ?
      function() {
        var event = getIEEvent( obj );
        fn.handleEvent.call( fn, event );
      } :
      function() {
        var event = getIEEvent( obj );
        fn.call( obj, event );
      };
    obj.attachEvent( "on" + type, obj[ type + fn ] );
  };
}

var unbind = function() {};

if ( docElem.removeEventListener ) {
  unbind = function( obj, type, fn ) {
    obj.removeEventListener( type, fn, false );
  };
} else if ( docElem.detachEvent ) {
  unbind = function( obj, type, fn ) {
    obj.detachEvent( "on" + type, obj[ type + fn ] );
    try {
      delete obj[ type + fn ];
    } catch ( err ) {
      // can't delete window object properties
      obj[ type + fn ] = undefined;
    }
  };
}

var eventie = {
  bind: bind,
  unbind: unbind
};

// ----- module definition ----- //

if ( typeof define === 'function' && define.amd ) {
  // AMD
  define( 'eventie/eventie',eventie );
} else if ( typeof exports === 'object' ) {
  // CommonJS
  module.exports = eventie;
} else {
  // browser global
  window.eventie = eventie;
}

})( window );

/*!
 * EventEmitter v4.2.11 - git.io/ee
 * Unlicense - http://unlicense.org/
 * Oliver Caldwell - http://oli.me.uk/
 * @preserve
 */

;(function () {
    'use strict';

    /**
     * Class for managing events.
     * Can be extended to provide event functionality in other classes.
     *
     * @class EventEmitter Manages event registering and emitting.
     */
    function EventEmitter() {}

    // Shortcuts to improve speed and size
    var proto = EventEmitter.prototype;
    var exports = this;
    var originalGlobalValue = exports.EventEmitter;

    /**
     * Finds the index of the listener for the event in its storage array.
     *
     * @param {Function[]} listeners Array of listeners to search through.
     * @param {Function} listener Method to look for.
     * @return {Number} Index of the specified listener, -1 if not found
     * @api private
     */
    function indexOfListener(listeners, listener) {
        var i = listeners.length;
        while (i--) {
            if (listeners[i].listener === listener) {
                return i;
            }
        }

        return -1;
    }

    /**
     * Alias a method while keeping the context correct, to allow for overwriting of target method.
     *
     * @param {String} name The name of the target method.
     * @return {Function} The aliased method
     * @api private
     */
    function alias(name) {
        return function aliasClosure() {
            return this[name].apply(this, arguments);
        };
    }

    /**
     * Returns the listener array for the specified event.
     * Will initialise the event object and listener arrays if required.
     * Will return an object if you use a regex search. The object contains keys for each matched event. So /ba[rz]/ might return an object containing bar and baz. But only if you have either defined them with defineEvent or added some listeners to them.
     * Each property in the object response is an array of listener functions.
     *
     * @param {String|RegExp} evt Name of the event to return the listeners from.
     * @return {Function[]|Object} All listener functions for the event.
     */
    proto.getListeners = function getListeners(evt) {
        var events = this._getEvents();
        var response;
        var key;

        // Return a concatenated array of all matching events if
        // the selector is a regular expression.
        if (evt instanceof RegExp) {
            response = {};
            for (key in events) {
                if (events.hasOwnProperty(key) && evt.test(key)) {
                    response[key] = events[key];
                }
            }
        }
        else {
            response = events[evt] || (events[evt] = []);
        }

        return response;
    };

    /**
     * Takes a list of listener objects and flattens it into a list of listener functions.
     *
     * @param {Object[]} listeners Raw listener objects.
     * @return {Function[]} Just the listener functions.
     */
    proto.flattenListeners = function flattenListeners(listeners) {
        var flatListeners = [];
        var i;

        for (i = 0; i < listeners.length; i += 1) {
            flatListeners.push(listeners[i].listener);
        }

        return flatListeners;
    };

    /**
     * Fetches the requested listeners via getListeners but will always return the results inside an object. This is mainly for internal use but others may find it useful.
     *
     * @param {String|RegExp} evt Name of the event to return the listeners from.
     * @return {Object} All listener functions for an event in an object.
     */
    proto.getListenersAsObject = function getListenersAsObject(evt) {
        var listeners = this.getListeners(evt);
        var response;

        if (listeners instanceof Array) {
            response = {};
            response[evt] = listeners;
        }

        return response || listeners;
    };

    /**
     * Adds a listener function to the specified event.
     * The listener will not be added if it is a duplicate.
     * If the listener returns true then it will be removed after it is called.
     * If you pass a regular expression as the event name then the listener will be added to all events that match it.
     *
     * @param {String|RegExp} evt Name of the event to attach the listener to.
     * @param {Function} listener Method to be called when the event is emitted. If the function returns true then it will be removed after calling.
     * @return {Object} Current instance of EventEmitter for chaining.
     */
    proto.addListener = function addListener(evt, listener) {
        var listeners = this.getListenersAsObject(evt);
        var listenerIsWrapped = typeof listener === 'object';
        var key;

        for (key in listeners) {
            if (listeners.hasOwnProperty(key) && indexOfListener(listeners[key], listener) === -1) {
                listeners[key].push(listenerIsWrapped ? listener : {
                    listener: listener,
                    once: false
                });
            }
        }

        return this;
    };

    /**
     * Alias of addListener
     */
    proto.on = alias('addListener');

    /**
     * Semi-alias of addListener. It will add a listener that will be
     * automatically removed after its first execution.
     *
     * @param {String|RegExp} evt Name of the event to attach the listener to.
     * @param {Function} listener Method to be called when the event is emitted. If the function returns true then it will be removed after calling.
     * @return {Object} Current instance of EventEmitter for chaining.
     */
    proto.addOnceListener = function addOnceListener(evt, listener) {
        return this.addListener(evt, {
            listener: listener,
            once: true
        });
    };

    /**
     * Alias of addOnceListener.
     */
    proto.once = alias('addOnceListener');

    /**
     * Defines an event name. This is required if you want to use a regex to add a listener to multiple events at once. If you don't do this then how do you expect it to know what event to add to? Should it just add to every possible match for a regex? No. That is scary and bad.
     * You need to tell it what event names should be matched by a regex.
     *
     * @param {String} evt Name of the event to create.
     * @return {Object} Current instance of EventEmitter for chaining.
     */
    proto.defineEvent = function defineEvent(evt) {
        this.getListeners(evt);
        return this;
    };

    /**
     * Uses defineEvent to define multiple events.
     *
     * @param {String[]} evts An array of event names to define.
     * @return {Object} Current instance of EventEmitter for chaining.
     */
    proto.defineEvents = function defineEvents(evts) {
        for (var i = 0; i < evts.length; i += 1) {
            this.defineEvent(evts[i]);
        }
        return this;
    };

    /**
     * Removes a listener function from the specified event.
     * When passed a regular expression as the event name, it will remove the listener from all events that match it.
     *
     * @param {String|RegExp} evt Name of the event to remove the listener from.
     * @param {Function} listener Method to remove from the event.
     * @return {Object} Current instance of EventEmitter for chaining.
     */
    proto.removeListener = function removeListener(evt, listener) {
        var listeners = this.getListenersAsObject(evt);
        var index;
        var key;

        for (key in listeners) {
            if (listeners.hasOwnProperty(key)) {
                index = indexOfListener(listeners[key], listener);

                if (index !== -1) {
                    listeners[key].splice(index, 1);
                }
            }
        }

        return this;
    };

    /**
     * Alias of removeListener
     */
    proto.off = alias('removeListener');

    /**
     * Adds listeners in bulk using the manipulateListeners method.
     * If you pass an object as the second argument you can add to multiple events at once. The object should contain key value pairs of events and listeners or listener arrays. You can also pass it an event name and an array of listeners to be added.
     * You can also pass it a regular expression to add the array of listeners to all events that match it.
     * Yeah, this function does quite a bit. That's probably a bad thing.
     *
     * @param {String|Object|RegExp} evt An event name if you will pass an array of listeners next. An object if you wish to add to multiple events at once.
     * @param {Function[]} [listeners] An optional array of listener functions to add.
     * @return {Object} Current instance of EventEmitter for chaining.
     */
    proto.addListeners = function addListeners(evt, listeners) {
        // Pass through to manipulateListeners
        return this.manipulateListeners(false, evt, listeners);
    };

    /**
     * Removes listeners in bulk using the manipulateListeners method.
     * If you pass an object as the second argument you can remove from multiple events at once. The object should contain key value pairs of events and listeners or listener arrays.
     * You can also pass it an event name and an array of listeners to be removed.
     * You can also pass it a regular expression to remove the listeners from all events that match it.
     *
     * @param {String|Object|RegExp} evt An event name if you will pass an array of listeners next. An object if you wish to remove from multiple events at once.
     * @param {Function[]} [listeners] An optional array of listener functions to remove.
     * @return {Object} Current instance of EventEmitter for chaining.
     */
    proto.removeListeners = function removeListeners(evt, listeners) {
        // Pass through to manipulateListeners
        return this.manipulateListeners(true, evt, listeners);
    };

    /**
     * Edits listeners in bulk. The addListeners and removeListeners methods both use this to do their job. You should really use those instead, this is a little lower level.
     * The first argument will determine if the listeners are removed (true) or added (false).
     * If you pass an object as the second argument you can add/remove from multiple events at once. The object should contain key value pairs of events and listeners or listener arrays.
     * You can also pass it an event name and an array of listeners to be added/removed.
     * You can also pass it a regular expression to manipulate the listeners of all events that match it.
     *
     * @param {Boolean} remove True if you want to remove listeners, false if you want to add.
     * @param {String|Object|RegExp} evt An event name if you will pass an array of listeners next. An object if you wish to add/remove from multiple events at once.
     * @param {Function[]} [listeners] An optional array of listener functions to add/remove.
     * @return {Object} Current instance of EventEmitter for chaining.
     */
    proto.manipulateListeners = function manipulateListeners(remove, evt, listeners) {
        var i;
        var value;
        var single = remove ? this.removeListener : this.addListener;
        var multiple = remove ? this.removeListeners : this.addListeners;

        // If evt is an object then pass each of its properties to this method
        if (typeof evt === 'object' && !(evt instanceof RegExp)) {
            for (i in evt) {
                if (evt.hasOwnProperty(i) && (value = evt[i])) {
                    // Pass the single listener straight through to the singular method
                    if (typeof value === 'function') {
                        single.call(this, i, value);
                    }
                    else {
                        // Otherwise pass back to the multiple function
                        multiple.call(this, i, value);
                    }
                }
            }
        }
        else {
            // So evt must be a string
            // And listeners must be an array of listeners
            // Loop over it and pass each one to the multiple method
            i = listeners.length;
            while (i--) {
                single.call(this, evt, listeners[i]);
            }
        }

        return this;
    };

    /**
     * Removes all listeners from a specified event.
     * If you do not specify an event then all listeners will be removed.
     * That means every event will be emptied.
     * You can also pass a regex to remove all events that match it.
     *
     * @param {String|RegExp} [evt] Optional name of the event to remove all listeners for. Will remove from every event if not passed.
     * @return {Object} Current instance of EventEmitter for chaining.
     */
    proto.removeEvent = function removeEvent(evt) {
        var type = typeof evt;
        var events = this._getEvents();
        var key;

        // Remove different things depending on the state of evt
        if (type === 'string') {
            // Remove all listeners for the specified event
            delete events[evt];
        }
        else if (evt instanceof RegExp) {
            // Remove all events matching the regex.
            for (key in events) {
                if (events.hasOwnProperty(key) && evt.test(key)) {
                    delete events[key];
                }
            }
        }
        else {
            // Remove all listeners in all events
            delete this._events;
        }

        return this;
    };

    /**
     * Alias of removeEvent.
     *
     * Added to mirror the node API.
     */
    proto.removeAllListeners = alias('removeEvent');

    /**
     * Emits an event of your choice.
     * When emitted, every listener attached to that event will be executed.
     * If you pass the optional argument array then those arguments will be passed to every listener upon execution.
     * Because it uses `apply`, your array of arguments will be passed as if you wrote them out separately.
     * So they will not arrive within the array on the other side, they will be separate.
     * You can also pass a regular expression to emit to all events that match it.
     *
     * @param {String|RegExp} evt Name of the event to emit and execute listeners for.
     * @param {Array} [args] Optional array of arguments to be passed to each listener.
     * @return {Object} Current instance of EventEmitter for chaining.
     */
    proto.emitEvent = function emitEvent(evt, args) {
        var listeners = this.getListenersAsObject(evt);
        var listener;
        var i;
        var key;
        var response;

        for (key in listeners) {
            if (listeners.hasOwnProperty(key)) {
                i = listeners[key].length;

                while (i--) {
                    // If the listener returns true then it shall be removed from the event
                    // The function is executed either with a basic call or an apply if there is an args array
                    listener = listeners[key][i];

                    if (listener.once === true) {
                        this.removeListener(evt, listener.listener);
                    }

                    response = listener.listener.apply(this, args || []);

                    if (response === this._getOnceReturnValue()) {
                        this.removeListener(evt, listener.listener);
                    }
                }
            }
        }

        return this;
    };

    /**
     * Alias of emitEvent
     */
    proto.trigger = alias('emitEvent');

    /**
     * Subtly different from emitEvent in that it will pass its arguments on to the listeners, as opposed to taking a single array of arguments to pass on.
     * As with emitEvent, you can pass a regex in place of the event name to emit to all events that match it.
     *
     * @param {String|RegExp} evt Name of the event to emit and execute listeners for.
     * @param {...*} Optional additional arguments to be passed to each listener.
     * @return {Object} Current instance of EventEmitter for chaining.
     */
    proto.emit = function emit(evt) {
        var args = Array.prototype.slice.call(arguments, 1);
        return this.emitEvent(evt, args);
    };

    /**
     * Sets the current value to check against when executing listeners. If a
     * listeners return value matches the one set here then it will be removed
     * after execution. This value defaults to true.
     *
     * @param {*} value The new value to check for when executing listeners.
     * @return {Object} Current instance of EventEmitter for chaining.
     */
    proto.setOnceReturnValue = function setOnceReturnValue(value) {
        this._onceReturnValue = value;
        return this;
    };

    /**
     * Fetches the current value to check against when executing listeners. If
     * the listeners return value matches this one then it should be removed
     * automatically. It will return true by default.
     *
     * @return {*|Boolean} The current value to check for or the default, true.
     * @api private
     */
    proto._getOnceReturnValue = function _getOnceReturnValue() {
        if (this.hasOwnProperty('_onceReturnValue')) {
            return this._onceReturnValue;
        }
        else {
            return true;
        }
    };

    /**
     * Fetches the events object and creates one if required.
     *
     * @return {Object} The events storage object.
     * @api private
     */
    proto._getEvents = function _getEvents() {
        return this._events || (this._events = {});
    };

    /**
     * Reverts the global {@link EventEmitter} to its previous value and returns a reference to this version.
     *
     * @return {Function} Non conflicting EventEmitter class.
     */
    EventEmitter.noConflict = function noConflict() {
        exports.EventEmitter = originalGlobalValue;
        return EventEmitter;
    };

    // Expose the class either via AMD, CommonJS or the global object
    if (typeof define === 'function' && define.amd) {
        define('eventEmitter/EventEmitter',[],function () {
            return EventEmitter;
        });
    }
    else if (typeof module === 'object' && module.exports){
        module.exports = EventEmitter;
    }
    else {
        exports.EventEmitter = EventEmitter;
    }
}.call(this));

/*!
 * getStyleProperty v1.0.4
 * original by kangax
 * http://perfectionkills.com/feature-testing-css-properties/
 * MIT license
 */

/*jshint browser: true, strict: true, undef: true */
/*global define: false, exports: false, module: false */

( function( window ) {



var prefixes = 'Webkit Moz ms Ms O'.split(' ');
var docElemStyle = document.documentElement.style;

function getStyleProperty( propName ) {
  if ( !propName ) {
    return;
  }

  // test standard property first
  if ( typeof docElemStyle[ propName ] === 'string' ) {
    return propName;
  }

  // capitalize
  propName = propName.charAt(0).toUpperCase() + propName.slice(1);

  // test vendor specific properties
  var prefixed;
  for ( var i=0, len = prefixes.length; i < len; i++ ) {
    prefixed = prefixes[i] + propName;
    if ( typeof docElemStyle[ prefixed ] === 'string' ) {
      return prefixed;
    }
  }
}

// transport
if ( typeof define === 'function' && define.amd ) {
  // AMD
  define( 'get-style-property/get-style-property',[],function() {
    return getStyleProperty;
  });
} else if ( typeof exports === 'object' ) {
  // CommonJS for Component
  module.exports = getStyleProperty;
} else {
  // browser global
  window.getStyleProperty = getStyleProperty;
}

})( window );

/*!
 * getSize v1.2.2
 * measure size of elements
 * MIT license
 */

/*jshint browser: true, strict: true, undef: true, unused: true */
/*global define: false, exports: false, require: false, module: false, console: false */

( function( window, undefined ) {



// -------------------------- helpers -------------------------- //

// get a number from a string, not a percentage
function getStyleSize( value ) {
  var num = parseFloat( value );
  // not a percent like '100%', and a number
  var isValid = value.indexOf('%') === -1 && !isNaN( num );
  return isValid && num;
}

function noop() {}

var logError = typeof console === 'undefined' ? noop :
  function( message ) {
    console.error( message );
  };

// -------------------------- measurements -------------------------- //

var measurements = [
  'paddingLeft',
  'paddingRight',
  'paddingTop',
  'paddingBottom',
  'marginLeft',
  'marginRight',
  'marginTop',
  'marginBottom',
  'borderLeftWidth',
  'borderRightWidth',
  'borderTopWidth',
  'borderBottomWidth'
];

function getZeroSize() {
  var size = {
    width: 0,
    height: 0,
    innerWidth: 0,
    innerHeight: 0,
    outerWidth: 0,
    outerHeight: 0
  };
  for ( var i=0, len = measurements.length; i < len; i++ ) {
    var measurement = measurements[i];
    size[ measurement ] = 0;
  }
  return size;
}



function defineGetSize( getStyleProperty ) {

// -------------------------- setup -------------------------- //

var isSetup = false;

var getStyle, boxSizingProp, isBoxSizeOuter;

/**
 * setup vars and functions
 * do it on initial getSize(), rather than on script load
 * For Firefox bug https://bugzilla.mozilla.org/show_bug.cgi?id=548397
 */
function setup() {
  // setup once
  if ( isSetup ) {
    return;
  }
  isSetup = true;

  var getComputedStyle = window.getComputedStyle;
  getStyle = ( function() {
    var getStyleFn = getComputedStyle ?
      function( elem ) {
        return getComputedStyle( elem, null );
      } :
      function( elem ) {
        return elem.currentStyle;
      };

      return function getStyle( elem ) {
        var style = getStyleFn( elem );
        if ( !style ) {
          logError( 'Style returned ' + style +
            '. Are you running this code in a hidden iframe on Firefox? ' +
            'See http://bit.ly/getsizebug1' );
        }
        return style;
      };
  })();

  // -------------------------- box sizing -------------------------- //

  boxSizingProp = getStyleProperty('boxSizing');

  /**
   * WebKit measures the outer-width on style.width on border-box elems
   * IE & Firefox measures the inner-width
   */
  if ( boxSizingProp ) {
    var div = document.createElement('div');
    div.style.width = '200px';
    div.style.padding = '1px 2px 3px 4px';
    div.style.borderStyle = 'solid';
    div.style.borderWidth = '1px 2px 3px 4px';
    div.style[ boxSizingProp ] = 'border-box';

    var body = document.body || document.documentElement;
    body.appendChild( div );
    var style = getStyle( div );

    isBoxSizeOuter = getStyleSize( style.width ) === 200;
    body.removeChild( div );
  }

}

// -------------------------- getSize -------------------------- //

function getSize( elem ) {
  setup();

  // use querySeletor if elem is string
  if ( typeof elem === 'string' ) {
    elem = document.querySelector( elem );
  }

  // do not proceed on non-objects
  if ( !elem || typeof elem !== 'object' || !elem.nodeType ) {
    return;
  }

  var style = getStyle( elem );

  // if hidden, everything is 0
  if ( style.display === 'none' ) {
    return getZeroSize();
  }

  var size = {};
  size.width = elem.offsetWidth;
  size.height = elem.offsetHeight;

  var isBorderBox = size.isBorderBox = !!( boxSizingProp &&
    style[ boxSizingProp ] && style[ boxSizingProp ] === 'border-box' );

  // get all measurements
  for ( var i=0, len = measurements.length; i < len; i++ ) {
    var measurement = measurements[i];
    var value = style[ measurement ];
    value = mungeNonPixel( elem, value );
    var num = parseFloat( value );
    // any 'auto', 'medium' value will be 0
    size[ measurement ] = !isNaN( num ) ? num : 0;
  }

  var paddingWidth = size.paddingLeft + size.paddingRight;
  var paddingHeight = size.paddingTop + size.paddingBottom;
  var marginWidth = size.marginLeft + size.marginRight;
  var marginHeight = size.marginTop + size.marginBottom;
  var borderWidth = size.borderLeftWidth + size.borderRightWidth;
  var borderHeight = size.borderTopWidth + size.borderBottomWidth;

  var isBorderBoxSizeOuter = isBorderBox && isBoxSizeOuter;

  // overwrite width and height if we can get it from style
  var styleWidth = getStyleSize( style.width );
  if ( styleWidth !== false ) {
    size.width = styleWidth +
      // add padding and border unless it's already including it
      ( isBorderBoxSizeOuter ? 0 : paddingWidth + borderWidth );
  }

  var styleHeight = getStyleSize( style.height );
  if ( styleHeight !== false ) {
    size.height = styleHeight +
      // add padding and border unless it's already including it
      ( isBorderBoxSizeOuter ? 0 : paddingHeight + borderHeight );
  }

  size.innerWidth = size.width - ( paddingWidth + borderWidth );
  size.innerHeight = size.height - ( paddingHeight + borderHeight );

  size.outerWidth = size.width + marginWidth;
  size.outerHeight = size.height + marginHeight;

  return size;
}

// IE8 returns percent values, not pixels
// taken from jQuery's curCSS
function mungeNonPixel( elem, value ) {
  // IE8 and has percent value
  if ( window.getComputedStyle || value.indexOf('%') === -1 ) {
    return value;
  }
  var style = elem.style;
  // Remember the original values
  var left = style.left;
  var rs = elem.runtimeStyle;
  var rsLeft = rs && rs.left;

  // Put in the new values to get a computed value out
  if ( rsLeft ) {
    rs.left = elem.currentStyle.left;
  }
  style.left = value;
  value = style.pixelLeft;

  // Revert the changed values
  style.left = left;
  if ( rsLeft ) {
    rs.left = rsLeft;
  }

  return value;
}

return getSize;

}

// transport
if ( typeof define === 'function' && define.amd ) {
  // AMD for RequireJS
  define( 'get-size/get-size',[ 'get-style-property/get-style-property' ], defineGetSize );
} else if ( typeof exports === 'object' ) {
  // CommonJS for Component
  module.exports = defineGetSize( require('desandro-get-style-property') );
} else {
  // browser global
  window.getSize = defineGetSize( window.getStyleProperty );
}

})( window );

/*!
 * docReady v1.0.4
 * Cross browser DOMContentLoaded event emitter
 * MIT license
 */

/*jshint browser: true, strict: true, undef: true, unused: true*/
/*global define: false, require: false, module: false */

( function( window ) {



var document = window.document;
// collection of functions to be triggered on ready
var queue = [];

function docReady( fn ) {
  // throw out non-functions
  if ( typeof fn !== 'function' ) {
    return;
  }

  if ( docReady.isReady ) {
    // ready now, hit it
    fn();
  } else {
    // queue function when ready
    queue.push( fn );
  }
}

docReady.isReady = false;

// triggered on various doc ready events
function onReady( event ) {
  // bail if already triggered or IE8 document is not ready just yet
  var isIE8NotReady = event.type === 'readystatechange' && document.readyState !== 'complete';
  if ( docReady.isReady || isIE8NotReady ) {
    return;
  }

  trigger();
}

function trigger() {
  docReady.isReady = true;
  // process queue
  for ( var i=0, len = queue.length; i < len; i++ ) {
    var fn = queue[i];
    fn();
  }
}

function defineDocReady( eventie ) {
  // trigger ready if page is ready
  if ( document.readyState === 'complete' ) {
    trigger();
  } else {
    // listen for events
    eventie.bind( document, 'DOMContentLoaded', onReady );
    eventie.bind( document, 'readystatechange', onReady );
    eventie.bind( window, 'load', onReady );
  }

  return docReady;
}

// transport
if ( typeof define === 'function' && define.amd ) {
  // AMD
  define( 'doc-ready/doc-ready',[ 'eventie/eventie' ], defineDocReady );
} else if ( typeof exports === 'object' ) {
  module.exports = defineDocReady( require('eventie') );
} else {
  // browser global
  window.docReady = defineDocReady( window.eventie );
}

})( window );

/**
 * matchesSelector v1.0.3
 * matchesSelector( element, '.selector' )
 * MIT license
 */

/*jshint browser: true, strict: true, undef: true, unused: true */
/*global define: false, module: false */

( function( ElemProto ) {

  'use strict';

  var matchesMethod = ( function() {
    // check for the standard method name first
    if ( ElemProto.matches ) {
      return 'matches';
    }
    // check un-prefixed
    if ( ElemProto.matchesSelector ) {
      return 'matchesSelector';
    }
    // check vendor prefixes
    var prefixes = [ 'webkit', 'moz', 'ms', 'o' ];

    for ( var i=0, len = prefixes.length; i < len; i++ ) {
      var prefix = prefixes[i];
      var method = prefix + 'MatchesSelector';
      if ( ElemProto[ method ] ) {
        return method;
      }
    }
  })();

  // ----- match ----- //

  function match( elem, selector ) {
    return elem[ matchesMethod ]( selector );
  }

  // ----- appendToFragment ----- //

  function checkParent( elem ) {
    // not needed if already has parent
    if ( elem.parentNode ) {
      return;
    }
    var fragment = document.createDocumentFragment();
    fragment.appendChild( elem );
  }

  // ----- query ----- //

  // fall back to using QSA
  // thx @jonathantneal https://gist.github.com/3062955
  function query( elem, selector ) {
    // append to fragment if no parent
    checkParent( elem );

    // match elem with all selected elems of parent
    var elems = elem.parentNode.querySelectorAll( selector );
    for ( var i=0, len = elems.length; i < len; i++ ) {
      // return true if match
      if ( elems[i] === elem ) {
        return true;
      }
    }
    // otherwise return false
    return false;
  }

  // ----- matchChild ----- //

  function matchChild( elem, selector ) {
    checkParent( elem );
    return match( elem, selector );
  }

  // ----- matchesSelector ----- //

  var matchesSelector;

  if ( matchesMethod ) {
    // IE9 supports matchesSelector, but doesn't work on orphaned elems
    // check for that
    var div = document.createElement('div');
    var supportsOrphans = match( div, 'div' );
    matchesSelector = supportsOrphans ? match : matchChild;
  } else {
    matchesSelector = query;
  }

  // transport
  if ( typeof define === 'function' && define.amd ) {
    // AMD
    define( 'matches-selector/matches-selector',[],function() {
      return matchesSelector;
    });
  } else if ( typeof exports === 'object' ) {
    module.exports = matchesSelector;
  }
  else {
    // browser global
    window.matchesSelector = matchesSelector;
  }

})( Element.prototype );

/**
 * Fizzy UI utils v1.0.1
 * MIT license
 */

/*jshint browser: true, undef: true, unused: true, strict: true */

( function( window, factory ) {
  /*global define: false, module: false, require: false */
  'use strict';
  // universal module definition

  if ( typeof define == 'function' && define.amd ) {
    // AMD
    define( 'fizzy-ui-utils/utils',[
      'doc-ready/doc-ready',
      'matches-selector/matches-selector'
    ], function( docReady, matchesSelector ) {
      return factory( window, docReady, matchesSelector );
    });
  } else if ( typeof exports == 'object' ) {
    // CommonJS
    module.exports = factory(
      window,
      require('doc-ready'),
      require('desandro-matches-selector')
    );
  } else {
    // browser global
    window.fizzyUIUtils = factory(
      window,
      window.docReady,
      window.matchesSelector
    );
  }

}( window, function factory( window, docReady, matchesSelector ) {



var utils = {};

// ----- extend ----- //

// extends objects
utils.extend = function( a, b ) {
  for ( var prop in b ) {
    a[ prop ] = b[ prop ];
  }
  return a;
};

// ----- modulo ----- //

utils.modulo = function( num, div ) {
  return ( ( num % div ) + div ) % div;
};

// ----- isArray ----- //
  
var objToString = Object.prototype.toString;
utils.isArray = function( obj ) {
  return objToString.call( obj ) == '[object Array]';
};

// ----- makeArray ----- //

// turn element or nodeList into an array
utils.makeArray = function( obj ) {
  var ary = [];
  if ( utils.isArray( obj ) ) {
    // use object if already an array
    ary = obj;
  } else if ( obj && typeof obj.length == 'number' ) {
    // convert nodeList to array
    for ( var i=0, len = obj.length; i < len; i++ ) {
      ary.push( obj[i] );
    }
  } else {
    // array of single index
    ary.push( obj );
  }
  return ary;
};

// ----- indexOf ----- //

// index of helper cause IE8
utils.indexOf = Array.prototype.indexOf ? function( ary, obj ) {
    return ary.indexOf( obj );
  } : function( ary, obj ) {
    for ( var i=0, len = ary.length; i < len; i++ ) {
      if ( ary[i] === obj ) {
        return i;
      }
    }
    return -1;
  };

// ----- removeFrom ----- //

utils.removeFrom = function( ary, obj ) {
  var index = utils.indexOf( ary, obj );
  if ( index != -1 ) {
    ary.splice( index, 1 );
  }
};

// ----- isElement ----- //

// http://stackoverflow.com/a/384380/182183
utils.isElement = ( typeof HTMLElement == 'function' || typeof HTMLElement == 'object' ) ?
  function isElementDOM2( obj ) {
    return obj instanceof HTMLElement;
  } :
  function isElementQuirky( obj ) {
    return obj && typeof obj == 'object' &&
      obj.nodeType == 1 && typeof obj.nodeName == 'string';
  };

// ----- setText ----- //

utils.setText = ( function() {
  var setTextProperty;
  function setText( elem, text ) {
    // only check setTextProperty once
    setTextProperty = setTextProperty || ( document.documentElement.textContent !== undefined ? 'textContent' : 'innerText' );
    elem[ setTextProperty ] = text;
  }
  return setText;
})();

// ----- getParent ----- //

utils.getParent = function( elem, selector ) {
  while ( elem != document.body ) {
    elem = elem.parentNode;
    if ( matchesSelector( elem, selector ) ) {
      return elem;
    }
  }
};

// ----- getQueryElement ----- //

// use element as selector string
utils.getQueryElement = function( elem ) {
  if ( typeof elem == 'string' ) {
    return document.querySelector( elem );
  }
  return elem;
};

// ----- handleEvent ----- //

// enable .ontype to trigger from .addEventListener( elem, 'type' )
utils.handleEvent = function( event ) {
  var method = 'on' + event.type;
  if ( this[ method ] ) {
    this[ method ]( event );
  }
};

// ----- filterFindElements ----- //

utils.filterFindElements = function( elems, selector ) {
  // make array of elems
  elems = utils.makeArray( elems );
  var ffElems = [];

  for ( var i=0, len = elems.length; i < len; i++ ) {
    var elem = elems[i];
    // check that elem is an actual element
    if ( !utils.isElement( elem ) ) {
      continue;
    }
    // filter & find items if we have a selector
    if ( selector ) {
      // filter siblings
      if ( matchesSelector( elem, selector ) ) {
        ffElems.push( elem );
      }
      // find children
      var childElems = elem.querySelectorAll( selector );
      // concat childElems to filterFound array
      for ( var j=0, jLen = childElems.length; j < jLen; j++ ) {
        ffElems.push( childElems[j] );
      }
    } else {
      ffElems.push( elem );
    }
  }

  return ffElems;
};

// ----- debounceMethod ----- //

utils.debounceMethod = function( _class, methodName, threshold ) {
  // original method
  var method = _class.prototype[ methodName ];
  var timeoutName = methodName + 'Timeout';

  _class.prototype[ methodName ] = function() {
    var timeout = this[ timeoutName ];
    if ( timeout ) {
      clearTimeout( timeout );
    }
    var args = arguments;

    var _this = this;
    this[ timeoutName ] = setTimeout( function() {
      method.apply( _this, args );
      delete _this[ timeoutName ];
    }, threshold || 100 );
  };
};

// ----- htmlInit ----- //

// http://jamesroberts.name/blog/2010/02/22/string-functions-for-javascript-trim-to-camel-case-to-dashed-and-to-underscore/
utils.toDashed = function( str ) {
  return str.replace( /(.)([A-Z])/g, function( match, $1, $2 ) {
    return $1 + '-' + $2;
  }).toLowerCase();
};

var console = window.console;
/**
 * allow user to initialize classes via .js-namespace class
 * htmlInit( Widget, 'widgetName' )
 * options are parsed from data-namespace-option attribute
 */
utils.htmlInit = function( WidgetClass, namespace ) {
  docReady( function() {
    var dashedNamespace = utils.toDashed( namespace );
    var elems = document.querySelectorAll( '.js-' + dashedNamespace );
    var dataAttr = 'data-' + dashedNamespace + '-options';

    for ( var i=0, len = elems.length; i < len; i++ ) {
      var elem = elems[i];
      var attr = elem.getAttribute( dataAttr );
      var options;
      try {
        options = attr && JSON.parse( attr );
      } catch ( error ) {
        // log error, do not initialize
        if ( console ) {
          console.error( 'Error parsing ' + dataAttr + ' on ' +
            elem.nodeName.toLowerCase() + ( elem.id ? '#' + elem.id : '' ) + ': ' +
            error );
        }
        continue;
      }
      // initialize
      var instance = new WidgetClass( elem, options );
      // make available via $().data('layoutname')
      var jQuery = window.jQuery;
      if ( jQuery ) {
        jQuery.data( elem, namespace, instance );
      }
    }
  });
};

// -----  ----- //

return utils;

}));

/**
 * Outlayer Item
 */

( function( window, factory ) {
  'use strict';
  // universal module definition
  if ( typeof define === 'function' && define.amd ) {
    // AMD
    define( 'outlayer/item',[
        'eventEmitter/EventEmitter',
        'get-size/get-size',
        'get-style-property/get-style-property',
        'fizzy-ui-utils/utils'
      ],
      function( EventEmitter, getSize, getStyleProperty, utils ) {
        return factory( window, EventEmitter, getSize, getStyleProperty, utils );
      }
    );
  } else if (typeof exports === 'object') {
    // CommonJS
    module.exports = factory(
      window,
      require('wolfy87-eventemitter'),
      require('get-size'),
      require('desandro-get-style-property'),
      require('fizzy-ui-utils')
    );
  } else {
    // browser global
    window.Outlayer = {};
    window.Outlayer.Item = factory(
      window,
      window.EventEmitter,
      window.getSize,
      window.getStyleProperty,
      window.fizzyUIUtils
    );
  }

}( window, function factory( window, EventEmitter, getSize, getStyleProperty, utils ) {
'use strict';

// ----- helpers ----- //

var getComputedStyle = window.getComputedStyle;
var getStyle = getComputedStyle ?
  function( elem ) {
    return getComputedStyle( elem, null );
  } :
  function( elem ) {
    return elem.currentStyle;
  };


function isEmptyObj( obj ) {
  for ( var prop in obj ) {
    return false;
  }
  prop = null;
  return true;
}

// -------------------------- CSS3 support -------------------------- //

var transitionProperty = getStyleProperty('transition');
var transformProperty = getStyleProperty('transform');
var supportsCSS3 = transitionProperty && transformProperty;
var is3d = !!getStyleProperty('perspective');

var transitionEndEvent = {
  WebkitTransition: 'webkitTransitionEnd',
  MozTransition: 'transitionend',
  OTransition: 'otransitionend',
  transition: 'transitionend'
}[ transitionProperty ];

// properties that could have vendor prefix
var prefixableProperties = [
  'transform',
  'transition',
  'transitionDuration',
  'transitionProperty'
];

// cache all vendor properties
var vendorProperties = ( function() {
  var cache = {};
  for ( var i=0, len = prefixableProperties.length; i < len; i++ ) {
    var prop = prefixableProperties[i];
    var supportedProp = getStyleProperty( prop );
    if ( supportedProp && supportedProp !== prop ) {
      cache[ prop ] = supportedProp;
    }
  }
  return cache;
})();

// -------------------------- Item -------------------------- //

function Item( element, layout ) {
  if ( !element ) {
    return;
  }

  this.element = element;
  // parent layout class, i.e. Masonry, Isotope, or Packery
  this.layout = layout;
  this.position = {
    x: 0,
    y: 0
  };

  this._create();
}

// inherit EventEmitter
utils.extend( Item.prototype, EventEmitter.prototype );

Item.prototype._create = function() {
  // transition objects
  this._transn = {
    ingProperties: {},
    clean: {},
    onEnd: {}
  };

  this.css({
    position: 'absolute'
  });
};

// trigger specified handler for event type
Item.prototype.handleEvent = function( event ) {
  var method = 'on' + event.type;
  if ( this[ method ] ) {
    this[ method ]( event );
  }
};

Item.prototype.getSize = function() {
  this.size = getSize( this.element );
};

/**
 * apply CSS styles to element
 * @param {Object} style
 */
Item.prototype.css = function( style ) {
  var elemStyle = this.element.style;

  for ( var prop in style ) {
    // use vendor property if available
    var supportedProp = vendorProperties[ prop ] || prop;
    elemStyle[ supportedProp ] = style[ prop ];
  }
};

 // measure position, and sets it
Item.prototype.getPosition = function() {
  var style = getStyle( this.element );
  var layoutOptions = this.layout.options;
  var isOriginLeft = layoutOptions.isOriginLeft;
  var isOriginTop = layoutOptions.isOriginTop;
  var xValue = style[ isOriginLeft ? 'left' : 'right' ];
  var yValue = style[ isOriginTop ? 'top' : 'bottom' ];
  var x = parseInt( xValue, 10 );
  var y = parseInt( yValue, 10 );
  // convert percent to pixels
  var layoutSize = this.layout.size;
  x = xValue.indexOf('%') != -1 ? ( x / 100 ) * layoutSize.width : x;
  y = yValue.indexOf('%') != -1 ? ( y / 100 ) * layoutSize.height : y;

  // clean up 'auto' or other non-integer values
  x = isNaN( x ) ? 0 : x;
  y = isNaN( y ) ? 0 : y;
  // remove padding from measurement
  x -= isOriginLeft ? layoutSize.paddingLeft : layoutSize.paddingRight;
  y -= isOriginTop ? layoutSize.paddingTop : layoutSize.paddingBottom;

  this.position.x = x;
  this.position.y = y;
};

// set settled position, apply padding
Item.prototype.layoutPosition = function() {
  var layoutSize = this.layout.size;
  var layoutOptions = this.layout.options;
  var style = {};

  // x
  var xPadding = layoutOptions.isOriginLeft ? 'paddingLeft' : 'paddingRight';
  var xProperty = layoutOptions.isOriginLeft ? 'left' : 'right';
  var xResetProperty = layoutOptions.isOriginLeft ? 'right' : 'left';

  var x = this.position.x + layoutSize[ xPadding ];
  // set in percentage or pixels
  style[ xProperty ] = this.getXValue( x );
  // reset other property
  style[ xResetProperty ] = '';

  // y
  var yPadding = layoutOptions.isOriginTop ? 'paddingTop' : 'paddingBottom';
  var yProperty = layoutOptions.isOriginTop ? 'top' : 'bottom';
  var yResetProperty = layoutOptions.isOriginTop ? 'bottom' : 'top';

  var y = this.position.y + layoutSize[ yPadding ];
  // set in percentage or pixels
  style[ yProperty ] = this.getYValue( y );
  // reset other property
  style[ yResetProperty ] = '';

  this.css( style );
  this.emitEvent( 'layout', [ this ] );
};

Item.prototype.getXValue = function( x ) {
  var layoutOptions = this.layout.options;
  return layoutOptions.percentPosition && !layoutOptions.isHorizontal ?
    ( ( x / this.layout.size.width ) * 100 ) + '%' : x + 'px';
};

Item.prototype.getYValue = function( y ) {
  var layoutOptions = this.layout.options;
  return layoutOptions.percentPosition && layoutOptions.isHorizontal ?
    ( ( y / this.layout.size.height ) * 100 ) + '%' : y + 'px';
};


Item.prototype._transitionTo = function( x, y ) {
  this.getPosition();
  // get current x & y from top/left
  var curX = this.position.x;
  var curY = this.position.y;

  var compareX = parseInt( x, 10 );
  var compareY = parseInt( y, 10 );
  var didNotMove = compareX === this.position.x && compareY === this.position.y;

  // save end position
  this.setPosition( x, y );

  // if did not move and not transitioning, just go to layout
  if ( didNotMove && !this.isTransitioning ) {
    this.layoutPosition();
    return;
  }

  var transX = x - curX;
  var transY = y - curY;
  var transitionStyle = {};
  transitionStyle.transform = this.getTranslate( transX, transY );

  this.transition({
    to: transitionStyle,
    onTransitionEnd: {
      transform: this.layoutPosition
    },
    isCleaning: true
  });
};

Item.prototype.getTranslate = function( x, y ) {
  // flip cooridinates if origin on right or bottom
  var layoutOptions = this.layout.options;
  x = layoutOptions.isOriginLeft ? x : -x;
  y = layoutOptions.isOriginTop ? y : -y;
  x = this.getXValue( x );
  y = this.getYValue( y );

  if ( is3d ) {
    return 'translate3d(' + x + ', ' + y + ', 0)';
  }

  return 'translate(' + x + ', ' + y + ')';
};

// non transition + transform support
Item.prototype.goTo = function( x, y ) {
  this.setPosition( x, y );
  this.layoutPosition();
};

// use transition and transforms if supported
Item.prototype.moveTo = supportsCSS3 ?
  Item.prototype._transitionTo : Item.prototype.goTo;

Item.prototype.setPosition = function( x, y ) {
  this.position.x = parseInt( x, 10 );
  this.position.y = parseInt( y, 10 );
};

// ----- transition ----- //

/**
 * @param {Object} style - CSS
 * @param {Function} onTransitionEnd
 */

// non transition, just trigger callback
Item.prototype._nonTransition = function( args ) {
  this.css( args.to );
  if ( args.isCleaning ) {
    this._removeStyles( args.to );
  }
  for ( var prop in args.onTransitionEnd ) {
    args.onTransitionEnd[ prop ].call( this );
  }
};

/**
 * proper transition
 * @param {Object} args - arguments
 *   @param {Object} to - style to transition to
 *   @param {Object} from - style to start transition from
 *   @param {Boolean} isCleaning - removes transition styles after transition
 *   @param {Function} onTransitionEnd - callback
 */
Item.prototype._transition = function( args ) {
  // redirect to nonTransition if no transition duration
  if ( !parseFloat( this.layout.options.transitionDuration ) ) {
    this._nonTransition( args );
    return;
  }

  var _transition = this._transn;
  // keep track of onTransitionEnd callback by css property
  for ( var prop in args.onTransitionEnd ) {
    _transition.onEnd[ prop ] = args.onTransitionEnd[ prop ];
  }
  // keep track of properties that are transitioning
  for ( prop in args.to ) {
    _transition.ingProperties[ prop ] = true;
    // keep track of properties to clean up when transition is done
    if ( args.isCleaning ) {
      _transition.clean[ prop ] = true;
    }
  }

  // set from styles
  if ( args.from ) {
    this.css( args.from );
    // force redraw. http://blog.alexmaccaw.com/css-transitions
    var h = this.element.offsetHeight;
    // hack for JSHint to hush about unused var
    h = null;
  }
  // enable transition
  this.enableTransition( args.to );
  // set styles that are transitioning
  this.css( args.to );

  this.isTransitioning = true;

};

// dash before all cap letters, including first for
// WebkitTransform => -webkit-transform
function toDashedAll( str ) {
  return str.replace( /([A-Z])/g, function( $1 ) {
    return '-' + $1.toLowerCase();
  });
}

var transitionProps = 'opacity,' +
  toDashedAll( vendorProperties.transform || 'transform' );

Item.prototype.enableTransition = function(/* style */) {
  // HACK changing transitionProperty during a transition
  // will cause transition to jump
  if ( this.isTransitioning ) {
    return;
  }

  // make `transition: foo, bar, baz` from style object
  // HACK un-comment this when enableTransition can work
  // while a transition is happening
  // var transitionValues = [];
  // for ( var prop in style ) {
  //   // dash-ify camelCased properties like WebkitTransition
  //   prop = vendorProperties[ prop ] || prop;
  //   transitionValues.push( toDashedAll( prop ) );
  // }
  // enable transition styles
  this.css({
    transitionProperty: transitionProps,
    transitionDuration: this.layout.options.transitionDuration
  });
  // listen for transition end event
  this.element.addEventListener( transitionEndEvent, this, false );
};

Item.prototype.transition = Item.prototype[ transitionProperty ? '_transition' : '_nonTransition' ];

// ----- events ----- //

Item.prototype.onwebkitTransitionEnd = function( event ) {
  this.ontransitionend( event );
};

Item.prototype.onotransitionend = function( event ) {
  this.ontransitionend( event );
};

// properties that I munge to make my life easier
var dashedVendorProperties = {
  '-webkit-transform': 'transform',
  '-moz-transform': 'transform',
  '-o-transform': 'transform'
};

Item.prototype.ontransitionend = function( event ) {
  // disregard bubbled events from children
  if ( event.target !== this.element ) {
    return;
  }
  var _transition = this._transn;
  // get property name of transitioned property, convert to prefix-free
  var propertyName = dashedVendorProperties[ event.propertyName ] || event.propertyName;

  // remove property that has completed transitioning
  delete _transition.ingProperties[ propertyName ];
  // check if any properties are still transitioning
  if ( isEmptyObj( _transition.ingProperties ) ) {
    // all properties have completed transitioning
    this.disableTransition();
  }
  // clean style
  if ( propertyName in _transition.clean ) {
    // clean up style
    this.element.style[ event.propertyName ] = '';
    delete _transition.clean[ propertyName ];
  }
  // trigger onTransitionEnd callback
  if ( propertyName in _transition.onEnd ) {
    var onTransitionEnd = _transition.onEnd[ propertyName ];
    onTransitionEnd.call( this );
    delete _transition.onEnd[ propertyName ];
  }

  this.emitEvent( 'transitionEnd', [ this ] );
};

Item.prototype.disableTransition = function() {
  this.removeTransitionStyles();
  this.element.removeEventListener( transitionEndEvent, this, false );
  this.isTransitioning = false;
};

/**
 * removes style property from element
 * @param {Object} style
**/
Item.prototype._removeStyles = function( style ) {
  // clean up transition styles
  var cleanStyle = {};
  for ( var prop in style ) {
    cleanStyle[ prop ] = '';
  }
  this.css( cleanStyle );
};

var cleanTransitionStyle = {
  transitionProperty: '',
  transitionDuration: ''
};

Item.prototype.removeTransitionStyles = function() {
  // remove transition
  this.css( cleanTransitionStyle );
};

// ----- show/hide/remove ----- //

// remove element from DOM
Item.prototype.removeElem = function() {
  this.element.parentNode.removeChild( this.element );
  // remove display: none
  this.css({ display: '' });
  this.emitEvent( 'remove', [ this ] );
};

Item.prototype.remove = function() {
  // just remove element if no transition support or no transition
  if ( !transitionProperty || !parseFloat( this.layout.options.transitionDuration ) ) {
    this.removeElem();
    return;
  }

  // start transition
  var _this = this;
  this.once( 'transitionEnd', function() {
    _this.removeElem();
  });
  this.hide();
};

Item.prototype.reveal = function() {
  delete this.isHidden;
  // remove display: none
  this.css({ display: '' });

  var options = this.layout.options;

  var onTransitionEnd = {};
  var transitionEndProperty = this.getHideRevealTransitionEndProperty('visibleStyle');
  onTransitionEnd[ transitionEndProperty ] = this.onRevealTransitionEnd;

  this.transition({
    from: options.hiddenStyle,
    to: options.visibleStyle,
    isCleaning: true,
    onTransitionEnd: onTransitionEnd
  });
};

Item.prototype.onRevealTransitionEnd = function() {
  // check if still visible
  // during transition, item may have been hidden
  if ( !this.isHidden ) {
    this.emitEvent('reveal');
  }
};

/**
 * get style property use for hide/reveal transition end
 * @param {String} styleProperty - hiddenStyle/visibleStyle
 * @returns {String}
 */
Item.prototype.getHideRevealTransitionEndProperty = function( styleProperty ) {
  var optionStyle = this.layout.options[ styleProperty ];
  // use opacity
  if ( optionStyle.opacity ) {
    return 'opacity';
  }
  // get first property
  for ( var prop in optionStyle ) {
    return prop;
  }
};

Item.prototype.hide = function() {
  // set flag
  this.isHidden = true;
  // remove display: none
  this.css({ display: '' });

  var options = this.layout.options;

  var onTransitionEnd = {};
  var transitionEndProperty = this.getHideRevealTransitionEndProperty('hiddenStyle');
  onTransitionEnd[ transitionEndProperty ] = this.onHideTransitionEnd;

  this.transition({
    from: options.visibleStyle,
    to: options.hiddenStyle,
    // keep hidden stuff hidden
    isCleaning: true,
    onTransitionEnd: onTransitionEnd
  });
};

Item.prototype.onHideTransitionEnd = function() {
  // check if still hidden
  // during transition, item may have been un-hidden
  if ( this.isHidden ) {
    this.css({ display: 'none' });
    this.emitEvent('hide');
  }
};

Item.prototype.destroy = function() {
  this.css({
    position: '',
    left: '',
    right: '',
    top: '',
    bottom: '',
    transition: '',
    transform: ''
  });
};

return Item;

}));

/*!
 * Outlayer v1.4.1
 * the brains and guts of a layout library
 * MIT license
 */

( function( window, factory ) {
  'use strict';
  // universal module definition

  if ( typeof define == 'function' && define.amd ) {
    // AMD
    define( 'outlayer/outlayer',[
        'eventie/eventie',
        'eventEmitter/EventEmitter',
        'get-size/get-size',
        'fizzy-ui-utils/utils',
        './item'
      ],
      function( eventie, EventEmitter, getSize, utils, Item ) {
        return factory( window, eventie, EventEmitter, getSize, utils, Item);
      }
    );
  } else if ( typeof exports == 'object' ) {
    // CommonJS
    module.exports = factory(
      window,
      require('eventie'),
      require('wolfy87-eventemitter'),
      require('get-size'),
      require('fizzy-ui-utils'),
      require('./item')
    );
  } else {
    // browser global
    window.Outlayer = factory(
      window,
      window.eventie,
      window.EventEmitter,
      window.getSize,
      window.fizzyUIUtils,
      window.Outlayer.Item
    );
  }

}( window, function factory( window, eventie, EventEmitter, getSize, utils, Item ) {
'use strict';

// ----- vars ----- //

var console = window.console;
var jQuery = window.jQuery;
var noop = function() {};

// -------------------------- Outlayer -------------------------- //

// globally unique identifiers
var GUID = 0;
// internal store of all Outlayer intances
var instances = {};


/**
 * @param {Element, String} element
 * @param {Object} options
 * @constructor
 */
function Outlayer( element, options ) {
  var queryElement = utils.getQueryElement( element );
  if ( !queryElement ) {
    if ( console ) {
      console.error( 'Bad element for ' + this.constructor.namespace +
        ': ' + ( queryElement || element ) );
    }
    return;
  }
  this.element = queryElement;
  // add jQuery
  if ( jQuery ) {
    this.$element = jQuery( this.element );
  }

  // options
  this.options = utils.extend( {}, this.constructor.defaults );
  this.option( options );

  // add id for Outlayer.getFromElement
  var id = ++GUID;
  this.element.outlayerGUID = id; // expando
  instances[ id ] = this; // associate via id

  // kick it off
  this._create();

  if ( this.options.isInitLayout ) {
    this.layout();
  }
}

// settings are for internal use only
Outlayer.namespace = 'outlayer';
Outlayer.Item = Item;

// default options
Outlayer.defaults = {
  containerStyle: {
    position: 'relative'
  },
  isInitLayout: true,
  isOriginLeft: true,
  isOriginTop: true,
  isResizeBound: true,
  isResizingContainer: true,
  // item options
  transitionDuration: '0.4s',
  hiddenStyle: {
    opacity: 0,
    transform: 'scale(0.001)'
  },
  visibleStyle: {
    opacity: 1,
    transform: 'scale(1)'
  }
};

// inherit EventEmitter
utils.extend( Outlayer.prototype, EventEmitter.prototype );

/**
 * set options
 * @param {Object} opts
 */
Outlayer.prototype.option = function( opts ) {
  utils.extend( this.options, opts );
};

Outlayer.prototype._create = function() {
  // get items from children
  this.reloadItems();
  // elements that affect layout, but are not laid out
  this.stamps = [];
  this.stamp( this.options.stamp );
  // set container style
  utils.extend( this.element.style, this.options.containerStyle );

  // bind resize method
  if ( this.options.isResizeBound ) {
    this.bindResize();
  }
};

// goes through all children again and gets bricks in proper order
Outlayer.prototype.reloadItems = function() {
  // collection of item elements
  this.items = this._itemize( this.element.children );
};


/**
 * turn elements into Outlayer.Items to be used in layout
 * @param {Array or NodeList or HTMLElement} elems
 * @returns {Array} items - collection of new Outlayer Items
 */
Outlayer.prototype._itemize = function( elems ) {

  var itemElems = this._filterFindItemElements( elems );
  var Item = this.constructor.Item;

  // create new Outlayer Items for collection
  var items = [];
  for ( var i=0, len = itemElems.length; i < len; i++ ) {
    var elem = itemElems[i];
    var item = new Item( elem, this );
    items.push( item );
  }

  return items;
};

/**
 * get item elements to be used in layout
 * @param {Array or NodeList or HTMLElement} elems
 * @returns {Array} items - item elements
 */
Outlayer.prototype._filterFindItemElements = function( elems ) {
  return utils.filterFindElements( elems, this.options.itemSelector );
};

/**
 * getter method for getting item elements
 * @returns {Array} elems - collection of item elements
 */
Outlayer.prototype.getItemElements = function() {
  var elems = [];
  for ( var i=0, len = this.items.length; i < len; i++ ) {
    elems.push( this.items[i].element );
  }
  return elems;
};

// ----- init & layout ----- //

/**
 * lays out all items
 */
Outlayer.prototype.layout = function() {
  this._resetLayout();
  this._manageStamps();

  // don't animate first layout
  var isInstant = this.options.isLayoutInstant !== undefined ?
    this.options.isLayoutInstant : !this._isLayoutInited;
  this.layoutItems( this.items, isInstant );

  // flag for initalized
  this._isLayoutInited = true;
};

// _init is alias for layout
Outlayer.prototype._init = Outlayer.prototype.layout;

/**
 * logic before any new layout
 */
Outlayer.prototype._resetLayout = function() {
  this.getSize();
};


Outlayer.prototype.getSize = function() {
  this.size = getSize( this.element );
};

/**
 * get measurement from option, for columnWidth, rowHeight, gutter
 * if option is String -> get element from selector string, & get size of element
 * if option is Element -> get size of element
 * else use option as a number
 *
 * @param {String} measurement
 * @param {String} size - width or height
 * @private
 */
Outlayer.prototype._getMeasurement = function( measurement, size ) {
  var option = this.options[ measurement ];
  var elem;
  if ( !option ) {
    // default to 0
    this[ measurement ] = 0;
  } else {
    // use option as an element
    if ( typeof option === 'string' ) {
      elem = this.element.querySelector( option );
    } else if ( utils.isElement( option ) ) {
      elem = option;
    }
    // use size of element, if element
    this[ measurement ] = elem ? getSize( elem )[ size ] : option;
  }
};

/**
 * layout a collection of item elements
 * @api public
 */
Outlayer.prototype.layoutItems = function( items, isInstant ) {
  items = this._getItemsForLayout( items );

  this._layoutItems( items, isInstant );

  this._postLayout();
};

/**
 * get the items to be laid out
 * you may want to skip over some items
 * @param {Array} items
 * @returns {Array} items
 */
Outlayer.prototype._getItemsForLayout = function( items ) {
  var layoutItems = [];
  for ( var i=0, len = items.length; i < len; i++ ) {
    var item = items[i];
    if ( !item.isIgnored ) {
      layoutItems.push( item );
    }
  }
  return layoutItems;
};

/**
 * layout items
 * @param {Array} items
 * @param {Boolean} isInstant
 */
Outlayer.prototype._layoutItems = function( items, isInstant ) {
  this._emitCompleteOnItems( 'layout', items );

  if ( !items || !items.length ) {
    // no items, emit event with empty array
    return;
  }

  var queue = [];

  for ( var i=0, len = items.length; i < len; i++ ) {
    var item = items[i];
    // get x/y object from method
    var position = this._getItemLayoutPosition( item );
    // enqueue
    position.item = item;
    position.isInstant = isInstant || item.isLayoutInstant;
    queue.push( position );
  }

  this._processLayoutQueue( queue );
};

/**
 * get item layout position
 * @param {Outlayer.Item} item
 * @returns {Object} x and y position
 */
Outlayer.prototype._getItemLayoutPosition = function( /* item */ ) {
  return {
    x: 0,
    y: 0
  };
};

/**
 * iterate over array and position each item
 * Reason being - separating this logic prevents 'layout invalidation'
 * thx @paul_irish
 * @param {Array} queue
 */
Outlayer.prototype._processLayoutQueue = function( queue ) {
  for ( var i=0, len = queue.length; i < len; i++ ) {
    var obj = queue[i];
    this._positionItem( obj.item, obj.x, obj.y, obj.isInstant );
  }
};

/**
 * Sets position of item in DOM
 * @param {Outlayer.Item} item
 * @param {Number} x - horizontal position
 * @param {Number} y - vertical position
 * @param {Boolean} isInstant - disables transitions
 */
Outlayer.prototype._positionItem = function( item, x, y, isInstant ) {
  if ( isInstant ) {
    // if not transition, just set CSS
    item.goTo( x, y );
  } else {
    item.moveTo( x, y );
  }
};

/**
 * Any logic you want to do after each layout,
 * i.e. size the container
 */
Outlayer.prototype._postLayout = function() {
  this.resizeContainer();
};

Outlayer.prototype.resizeContainer = function() {
  if ( !this.options.isResizingContainer ) {
    return;
  }
  var size = this._getContainerSize();
  if ( size ) {
    this._setContainerMeasure( size.width, true );
    this._setContainerMeasure( size.height, false );
  }
};

/**
 * Sets width or height of container if returned
 * @returns {Object} size
 *   @param {Number} width
 *   @param {Number} height
 */
Outlayer.prototype._getContainerSize = noop;

/**
 * @param {Number} measure - size of width or height
 * @param {Boolean} isWidth
 */
Outlayer.prototype._setContainerMeasure = function( measure, isWidth ) {
  if ( measure === undefined ) {
    return;
  }

  var elemSize = this.size;
  // add padding and border width if border box
  if ( elemSize.isBorderBox ) {
    measure += isWidth ? elemSize.paddingLeft + elemSize.paddingRight +
      elemSize.borderLeftWidth + elemSize.borderRightWidth :
      elemSize.paddingBottom + elemSize.paddingTop +
      elemSize.borderTopWidth + elemSize.borderBottomWidth;
  }

  measure = Math.max( measure, 0 );
  this.element.style[ isWidth ? 'width' : 'height' ] = measure + 'px';
};

/**
 * emit eventComplete on a collection of items events
 * @param {String} eventName
 * @param {Array} items - Outlayer.Items
 */
Outlayer.prototype._emitCompleteOnItems = function( eventName, items ) {
  var _this = this;
  function onComplete() {
    _this.dispatchEvent( eventName + 'Complete', null, [ items ] );
  }

  var count = items.length;
  if ( !items || !count ) {
    onComplete();
    return;
  }

  var doneCount = 0;
  function tick() {
    doneCount++;
    if ( doneCount === count ) {
      onComplete();
    }
  }

  // bind callback
  for ( var i=0, len = items.length; i < len; i++ ) {
    var item = items[i];
    item.once( eventName, tick );
  }
};

/**
 * emits events via eventEmitter and jQuery events
 * @param {String} type - name of event
 * @param {Event} event - original event
 * @param {Array} args - extra arguments
 */
Outlayer.prototype.dispatchEvent = function( type, event, args ) {
  // add original event to arguments
  var emitArgs = event ? [ event ].concat( args ) : args;
  this.emitEvent( type, emitArgs );

  if ( jQuery ) {
    // set this.$element
    this.$element = this.$element || jQuery( this.element );
    if ( event ) {
      // create jQuery event
      var $event = jQuery.Event( event );
      $event.type = type;
      this.$element.trigger( $event, args );
    } else {
      // just trigger with type if no event available
      this.$element.trigger( type, args );
    }
  }
};

// -------------------------- ignore & stamps -------------------------- //


/**
 * keep item in collection, but do not lay it out
 * ignored items do not get skipped in layout
 * @param {Element} elem
 */
Outlayer.prototype.ignore = function( elem ) {
  var item = this.getItem( elem );
  if ( item ) {
    item.isIgnored = true;
  }
};

/**
 * return item to layout collection
 * @param {Element} elem
 */
Outlayer.prototype.unignore = function( elem ) {
  var item = this.getItem( elem );
  if ( item ) {
    delete item.isIgnored;
  }
};

/**
 * adds elements to stamps
 * @param {NodeList, Array, Element, or String} elems
 */
Outlayer.prototype.stamp = function( elems ) {
  elems = this._find( elems );
  if ( !elems ) {
    return;
  }

  this.stamps = this.stamps.concat( elems );
  // ignore
  for ( var i=0, len = elems.length; i < len; i++ ) {
    var elem = elems[i];
    this.ignore( elem );
  }
};

/**
 * removes elements to stamps
 * @param {NodeList, Array, or Element} elems
 */
Outlayer.prototype.unstamp = function( elems ) {
  elems = this._find( elems );
  if ( !elems ){
    return;
  }

  for ( var i=0, len = elems.length; i < len; i++ ) {
    var elem = elems[i];
    // filter out removed stamp elements
    utils.removeFrom( this.stamps, elem );
    this.unignore( elem );
  }

};

/**
 * finds child elements
 * @param {NodeList, Array, Element, or String} elems
 * @returns {Array} elems
 */
Outlayer.prototype._find = function( elems ) {
  if ( !elems ) {
    return;
  }
  // if string, use argument as selector string
  if ( typeof elems === 'string' ) {
    elems = this.element.querySelectorAll( elems );
  }
  elems = utils.makeArray( elems );
  return elems;
};

Outlayer.prototype._manageStamps = function() {
  if ( !this.stamps || !this.stamps.length ) {
    return;
  }

  this._getBoundingRect();

  for ( var i=0, len = this.stamps.length; i < len; i++ ) {
    var stamp = this.stamps[i];
    this._manageStamp( stamp );
  }
};

// update boundingLeft / Top
Outlayer.prototype._getBoundingRect = function() {
  // get bounding rect for container element
  var boundingRect = this.element.getBoundingClientRect();
  var size = this.size;
  this._boundingRect = {
    left: boundingRect.left + size.paddingLeft + size.borderLeftWidth,
    top: boundingRect.top + size.paddingTop + size.borderTopWidth,
    right: boundingRect.right - ( size.paddingRight + size.borderRightWidth ),
    bottom: boundingRect.bottom - ( size.paddingBottom + size.borderBottomWidth )
  };
};

/**
 * @param {Element} stamp
**/
Outlayer.prototype._manageStamp = noop;

/**
 * get x/y position of element relative to container element
 * @param {Element} elem
 * @returns {Object} offset - has left, top, right, bottom
 */
Outlayer.prototype._getElementOffset = function( elem ) {
  var boundingRect = elem.getBoundingClientRect();
  var thisRect = this._boundingRect;
  var size = getSize( elem );
  var offset = {
    left: boundingRect.left - thisRect.left - size.marginLeft,
    top: boundingRect.top - thisRect.top - size.marginTop,
    right: thisRect.right - boundingRect.right - size.marginRight,
    bottom: thisRect.bottom - boundingRect.bottom - size.marginBottom
  };
  return offset;
};

// -------------------------- resize -------------------------- //

// enable event handlers for listeners
// i.e. resize -> onresize
Outlayer.prototype.handleEvent = function( event ) {
  var method = 'on' + event.type;
  if ( this[ method ] ) {
    this[ method ]( event );
  }
};

/**
 * Bind layout to window resizing
 */
Outlayer.prototype.bindResize = function() {
  // bind just one listener
  if ( this.isResizeBound ) {
    return;
  }
  eventie.bind( window, 'resize', this );
  this.isResizeBound = true;
};

/**
 * Unbind layout to window resizing
 */
Outlayer.prototype.unbindResize = function() {
  if ( this.isResizeBound ) {
    eventie.unbind( window, 'resize', this );
  }
  this.isResizeBound = false;
};

// original debounce by John Hann
// http://unscriptable.com/index.php/2009/03/20/debouncing-javascript-methods/

// this fires every resize
Outlayer.prototype.onresize = function() {
  if ( this.resizeTimeout ) {
    clearTimeout( this.resizeTimeout );
  }

  var _this = this;
  function delayed() {
    _this.resize();
    delete _this.resizeTimeout;
  }

  this.resizeTimeout = setTimeout( delayed, 100 );
};

// debounced, layout on resize
Outlayer.prototype.resize = function() {
  // don't trigger if size did not change
  // or if resize was unbound. See #9
  if ( !this.isResizeBound || !this.needsResizeLayout() ) {
    return;
  }

  this.layout();
};

/**
 * check if layout is needed post layout
 * @returns Boolean
 */
Outlayer.prototype.needsResizeLayout = function() {
  var size = getSize( this.element );
  // check that this.size and size are there
  // IE8 triggers resize on body size change, so they might not be
  var hasSizes = this.size && size;
  return hasSizes && size.innerWidth !== this.size.innerWidth;
};

// -------------------------- methods -------------------------- //

/**
 * add items to Outlayer instance
 * @param {Array or NodeList or Element} elems
 * @returns {Array} items - Outlayer.Items
**/
Outlayer.prototype.addItems = function( elems ) {
  var items = this._itemize( elems );
  // add items to collection
  if ( items.length ) {
    this.items = this.items.concat( items );
  }
  return items;
};

/**
 * Layout newly-appended item elements
 * @param {Array or NodeList or Element} elems
 */
Outlayer.prototype.appended = function( elems ) {
  var items = this.addItems( elems );
  if ( !items.length ) {
    return;
  }
  // layout and reveal just the new items
  this.layoutItems( items, true );
  this.reveal( items );
};

/**
 * Layout prepended elements
 * @param {Array or NodeList or Element} elems
 */
Outlayer.prototype.prepended = function( elems ) {
  var items = this._itemize( elems );
  if ( !items.length ) {
    return;
  }
  // add items to beginning of collection
  var previousItems = this.items.slice(0);
  this.items = items.concat( previousItems );
  // start new layout
  this._resetLayout();
  this._manageStamps();
  // layout new stuff without transition
  this.layoutItems( items, true );
  this.reveal( items );
  // layout previous items
  this.layoutItems( previousItems );
};

/**
 * reveal a collection of items
 * @param {Array of Outlayer.Items} items
 */
Outlayer.prototype.reveal = function( items ) {
  this._emitCompleteOnItems( 'reveal', items );

  var len = items && items.length;
  for ( var i=0; len && i < len; i++ ) {
    var item = items[i];
    item.reveal();
  }
};

/**
 * hide a collection of items
 * @param {Array of Outlayer.Items} items
 */
Outlayer.prototype.hide = function( items ) {
  this._emitCompleteOnItems( 'hide', items );

  var len = items && items.length;
  for ( var i=0; len && i < len; i++ ) {
    var item = items[i];
    item.hide();
  }
};

/**
 * reveal item elements
 * @param {Array}, {Element}, {NodeList} items
 */
Outlayer.prototype.revealItemElements = function( elems ) {
  var items = this.getItems( elems );
  this.reveal( items );
};

/**
 * hide item elements
 * @param {Array}, {Element}, {NodeList} items
 */
Outlayer.prototype.hideItemElements = function( elems ) {
  var items = this.getItems( elems );
  this.hide( items );
};

/**
 * get Outlayer.Item, given an Element
 * @param {Element} elem
 * @param {Function} callback
 * @returns {Outlayer.Item} item
 */
Outlayer.prototype.getItem = function( elem ) {
  // loop through items to get the one that matches
  for ( var i=0, len = this.items.length; i < len; i++ ) {
    var item = this.items[i];
    if ( item.element === elem ) {
      // return item
      return item;
    }
  }
};

/**
 * get collection of Outlayer.Items, given Elements
 * @param {Array} elems
 * @returns {Array} items - Outlayer.Items
 */
Outlayer.prototype.getItems = function( elems ) {
  elems = utils.makeArray( elems );
  var items = [];
  for ( var i=0, len = elems.length; i < len; i++ ) {
    var elem = elems[i];
    var item = this.getItem( elem );
    if ( item ) {
      items.push( item );
    }
  }

  return items;
};

/**
 * remove element(s) from instance and DOM
 * @param {Array or NodeList or Element} elems
 */
Outlayer.prototype.remove = function( elems ) {
  var removeItems = this.getItems( elems );

  this._emitCompleteOnItems( 'remove', removeItems );

  // bail if no items to remove
  if ( !removeItems || !removeItems.length ) {
    return;
  }

  for ( var i=0, len = removeItems.length; i < len; i++ ) {
    var item = removeItems[i];
    item.remove();
    // remove item from collection
    utils.removeFrom( this.items, item );
  }
};

// ----- destroy ----- //

// remove and disable Outlayer instance
Outlayer.prototype.destroy = function() {
  // clean up dynamic styles
  var style = this.element.style;
  style.height = '';
  style.position = '';
  style.width = '';
  // destroy items
  for ( var i=0, len = this.items.length; i < len; i++ ) {
    var item = this.items[i];
    item.destroy();
  }

  this.unbindResize();

  var id = this.element.outlayerGUID;
  delete instances[ id ]; // remove reference to instance by id
  delete this.element.outlayerGUID;
  // remove data for jQuery
  if ( jQuery ) {
    jQuery.removeData( this.element, this.constructor.namespace );
  }

};

// -------------------------- data -------------------------- //

/**
 * get Outlayer instance from element
 * @param {Element} elem
 * @returns {Outlayer}
 */
Outlayer.data = function( elem ) {
  elem = utils.getQueryElement( elem );
  var id = elem && elem.outlayerGUID;
  return id && instances[ id ];
};


// -------------------------- create Outlayer class -------------------------- //

/**
 * create a layout class
 * @param {String} namespace
 */
Outlayer.create = function( namespace, options ) {
  // sub-class Outlayer
  function Layout() {
    Outlayer.apply( this, arguments );
  }
  // inherit Outlayer prototype, use Object.create if there
  if ( Object.create ) {
    Layout.prototype = Object.create( Outlayer.prototype );
  } else {
    utils.extend( Layout.prototype, Outlayer.prototype );
  }
  // set contructor, used for namespace and Item
  Layout.prototype.constructor = Layout;

  Layout.defaults = utils.extend( {}, Outlayer.defaults );
  // apply new options
  utils.extend( Layout.defaults, options );
  // keep prototype.settings for backwards compatibility (Packery v1.2.0)
  Layout.prototype.settings = {};

  Layout.namespace = namespace;

  Layout.data = Outlayer.data;

  // sub-class Item
  Layout.Item = function LayoutItem() {
    Item.apply( this, arguments );
  };

  Layout.Item.prototype = new Item();

  // -------------------------- declarative -------------------------- //

  utils.htmlInit( Layout, namespace );

  // -------------------------- jQuery bridge -------------------------- //

  // make into jQuery plugin
  if ( jQuery && jQuery.bridget ) {
    jQuery.bridget( namespace, Layout );
  }

  return Layout;
};

// ----- fin ----- //

// back in global
Outlayer.Item = Item;

return Outlayer;

}));


/**
 * Isotope Item
**/

( function( window, factory ) {
'use strict';
  // universal module definition
  if ( typeof define == 'function' && define.amd ) {
    // AMD
    define( 'isotope/js/item',[
        'outlayer/outlayer'
      ],
      factory );
  } else if ( typeof exports == 'object' ) {
    // CommonJS
    module.exports = factory(
      require('outlayer')
    );
  } else {
    // browser global
    window.Isotope = window.Isotope || {};
    window.Isotope.Item = factory(
      window.Outlayer
    );
  }

}( window, function factory( Outlayer ) {
'use strict';

// -------------------------- Item -------------------------- //

// sub-class Outlayer Item
function Item() {
  Outlayer.Item.apply( this, arguments );
}

Item.prototype = new Outlayer.Item();

Item.prototype._create = function() {
  // assign id, used for original-order sorting
  this.id = this.layout.itemGUID++;
  Outlayer.Item.prototype._create.call( this );
  this.sortData = {};
};

Item.prototype.updateSortData = function() {
  if ( this.isIgnored ) {
    return;
  }
  // default sorters
  this.sortData.id = this.id;
  // for backward compatibility
  this.sortData['original-order'] = this.id;
  this.sortData.random = Math.random();
  // go thru getSortData obj and apply the sorters
  var getSortData = this.layout.options.getSortData;
  var sorters = this.layout._sorters;
  for ( var key in getSortData ) {
    var sorter = sorters[ key ];
    this.sortData[ key ] = sorter( this.element, this );
  }
};

var _destroy = Item.prototype.destroy;
Item.prototype.destroy = function() {
  // call super
  _destroy.apply( this, arguments );
  // reset display, #741
  this.css({
    display: ''
  });
};

return Item;

}));

/**
 * Isotope LayoutMode
 */

( function( window, factory ) {
  'use strict';
  // universal module definition

  if ( typeof define == 'function' && define.amd ) {
    // AMD
    define( 'isotope/js/layout-mode',[
        'get-size/get-size',
        'outlayer/outlayer'
      ],
      factory );
  } else if ( typeof exports == 'object' ) {
    // CommonJS
    module.exports = factory(
      require('get-size'),
      require('outlayer')
    );
  } else {
    // browser global
    window.Isotope = window.Isotope || {};
    window.Isotope.LayoutMode = factory(
      window.getSize,
      window.Outlayer
    );
  }

}( window, function factory( getSize, Outlayer ) {
  'use strict';

  // layout mode class
  function LayoutMode( isotope ) {
    this.isotope = isotope;
    // link properties
    if ( isotope ) {
      this.options = isotope.options[ this.namespace ];
      this.element = isotope.element;
      this.items = isotope.filteredItems;
      this.size = isotope.size;
    }
  }

  /**
   * some methods should just defer to default Outlayer method
   * and reference the Isotope instance as `this`
  **/
  ( function() {
    var facadeMethods = [
      '_resetLayout',
      '_getItemLayoutPosition',
      '_manageStamp',
      '_getContainerSize',
      '_getElementOffset',
      'needsResizeLayout'
    ];

    for ( var i=0, len = facadeMethods.length; i < len; i++ ) {
      var methodName = facadeMethods[i];
      LayoutMode.prototype[ methodName ] = getOutlayerMethod( methodName );
    }

    function getOutlayerMethod( methodName ) {
      return function() {
        return Outlayer.prototype[ methodName ].apply( this.isotope, arguments );
      };
    }
  })();

  // -----  ----- //

  // for horizontal layout modes, check vertical size
  LayoutMode.prototype.needsVerticalResizeLayout = function() {
    // don't trigger if size did not change
    var size = getSize( this.isotope.element );
    // check that this.size and size are there
    // IE8 triggers resize on body size change, so they might not be
    var hasSizes = this.isotope.size && size;
    return hasSizes && size.innerHeight != this.isotope.size.innerHeight;
  };

  // ----- measurements ----- //

  LayoutMode.prototype._getMeasurement = function() {
    this.isotope._getMeasurement.apply( this, arguments );
  };

  LayoutMode.prototype.getColumnWidth = function() {
    this.getSegmentSize( 'column', 'Width' );
  };

  LayoutMode.prototype.getRowHeight = function() {
    this.getSegmentSize( 'row', 'Height' );
  };

  /**
   * get columnWidth or rowHeight
   * segment: 'column' or 'row'
   * size 'Width' or 'Height'
  **/
  LayoutMode.prototype.getSegmentSize = function( segment, size ) {
    var segmentName = segment + size;
    var outerSize = 'outer' + size;
    // columnWidth / outerWidth // rowHeight / outerHeight
    this._getMeasurement( segmentName, outerSize );
    // got rowHeight or columnWidth, we can chill
    if ( this[ segmentName ] ) {
      return;
    }
    // fall back to item of first element
    var firstItemSize = this.getFirstItemSize();
    this[ segmentName ] = firstItemSize && firstItemSize[ outerSize ] ||
      // or size of container
      this.isotope.size[ 'inner' + size ];
  };

  LayoutMode.prototype.getFirstItemSize = function() {
    var firstItem = this.isotope.filteredItems[0];
    return firstItem && firstItem.element && getSize( firstItem.element );
  };

  // ----- methods that should reference isotope ----- //

  LayoutMode.prototype.layout = function() {
    this.isotope.layout.apply( this.isotope, arguments );
  };

  LayoutMode.prototype.getSize = function() {
    this.isotope.getSize();
    this.size = this.isotope.size;
  };

  // -------------------------- create -------------------------- //

  LayoutMode.modes = {};

  LayoutMode.create = function( namespace, options ) {

    function Mode() {
      LayoutMode.apply( this, arguments );
    }

    Mode.prototype = new LayoutMode();

    // default options
    if ( options ) {
      Mode.options = options;
    }

    Mode.prototype.namespace = namespace;
    // register in Isotope
    LayoutMode.modes[ namespace ] = Mode;

    return Mode;
  };

  return LayoutMode;

}));

/*!
 * Masonry v3.3.0
 * Cascading grid layout library
 * http://masonry.desandro.com
 * MIT License
 * by David DeSandro
 */

( function( window, factory ) {
  'use strict';
  // universal module definition
  if ( typeof define === 'function' && define.amd ) {
    // AMD
    define( 'masonry/masonry',[
        'outlayer/outlayer',
        'get-size/get-size',
        'fizzy-ui-utils/utils'
      ],
      factory );
  } else if ( typeof exports === 'object' ) {
    // CommonJS
    module.exports = factory(
      require('outlayer'),
      require('get-size'),
      require('fizzy-ui-utils')
    );
  } else {
    // browser global
    window.Masonry = factory(
      window.Outlayer,
      window.getSize,
      window.fizzyUIUtils
    );
  }

}( window, function factory( Outlayer, getSize, utils ) {



// -------------------------- masonryDefinition -------------------------- //

  // create an Outlayer layout class
  var Masonry = Outlayer.create('masonry');

  Masonry.prototype._resetLayout = function() {
    this.getSize();
    this._getMeasurement( 'columnWidth', 'outerWidth' );
    this._getMeasurement( 'gutter', 'outerWidth' );
    this.measureColumns();

    // reset column Y
    var i = this.cols;
    this.colYs = [];
    while (i--) {
      this.colYs.push( 0 );
    }

    this.maxY = 0;
  };

  Masonry.prototype.measureColumns = function() {
    this.getContainerWidth();
    // if columnWidth is 0, default to outerWidth of first item
    if ( !this.columnWidth ) {
      var firstItem = this.items[0];
      var firstItemElem = firstItem && firstItem.element;
      // columnWidth fall back to item of first element
      this.columnWidth = firstItemElem && getSize( firstItemElem ).outerWidth ||
        // if first elem has no width, default to size of container
        this.containerWidth;
    }

    var columnWidth = this.columnWidth += this.gutter;

    // calculate columns
    var containerWidth = this.containerWidth + this.gutter;
    var cols = containerWidth / columnWidth;
    // fix rounding errors, typically with gutters
    var excess = columnWidth - containerWidth % columnWidth;
    // if overshoot is less than a pixel, round up, otherwise floor it
    var mathMethod = excess && excess < 1 ? 'round' : 'floor';
    cols = Math[ mathMethod ]( cols );
    this.cols = Math.max( cols, 1 );
  };

  Masonry.prototype.getContainerWidth = function() {
    // container is parent if fit width
    var container = this.options.isFitWidth ? this.element.parentNode : this.element;
    // check that this.size and size are there
    // IE8 triggers resize on body size change, so they might not be
    var size = getSize( container );
    this.containerWidth = size && size.innerWidth;
  };

  Masonry.prototype._getItemLayoutPosition = function( item ) {
    item.getSize();
    // how many columns does this brick span
    var remainder = item.size.outerWidth % this.columnWidth;
    var mathMethod = remainder && remainder < 1 ? 'round' : 'ceil';
    // round if off by 1 pixel, otherwise use ceil
    var colSpan = Math[ mathMethod ]( item.size.outerWidth / this.columnWidth );
    colSpan = Math.min( colSpan, this.cols );

    var colGroup = this._getColGroup( colSpan );
    // get the minimum Y value from the columns
    var minimumY = Math.min.apply( Math, colGroup );
    var shortColIndex = utils.indexOf( colGroup, minimumY );

    // position the brick
    var position = {
      x: this.columnWidth * shortColIndex,
      y: minimumY
    };

    // apply setHeight to necessary columns
    var setHeight = minimumY + item.size.outerHeight;
    var setSpan = this.cols + 1 - colGroup.length;
    for ( var i = 0; i < setSpan; i++ ) {
      this.colYs[ shortColIndex + i ] = setHeight;
    }

    return position;
  };

  /**
   * @param {Number} colSpan - number of columns the element spans
   * @returns {Array} colGroup
   */
  Masonry.prototype._getColGroup = function( colSpan ) {
    if ( colSpan < 2 ) {
      // if brick spans only one column, use all the column Ys
      return this.colYs;
    }

    var colGroup = [];
    // how many different places could this brick fit horizontally
    var groupCount = this.cols + 1 - colSpan;
    // for each group potential horizontal position
    for ( var i = 0; i < groupCount; i++ ) {
      // make an array of colY values for that one group
      var groupColYs = this.colYs.slice( i, i + colSpan );
      // and get the max value of the array
      colGroup[i] = Math.max.apply( Math, groupColYs );
    }
    return colGroup;
  };

  Masonry.prototype._manageStamp = function( stamp ) {
    var stampSize = getSize( stamp );
    var offset = this._getElementOffset( stamp );
    // get the columns that this stamp affects
    var firstX = this.options.isOriginLeft ? offset.left : offset.right;
    var lastX = firstX + stampSize.outerWidth;
    var firstCol = Math.floor( firstX / this.columnWidth );
    firstCol = Math.max( 0, firstCol );
    var lastCol = Math.floor( lastX / this.columnWidth );
    // lastCol should not go over if multiple of columnWidth #425
    lastCol -= lastX % this.columnWidth ? 0 : 1;
    lastCol = Math.min( this.cols - 1, lastCol );
    // set colYs to bottom of the stamp
    var stampMaxY = ( this.options.isOriginTop ? offset.top : offset.bottom ) +
      stampSize.outerHeight;
    for ( var i = firstCol; i <= lastCol; i++ ) {
      this.colYs[i] = Math.max( stampMaxY, this.colYs[i] );
    }
  };

  Masonry.prototype._getContainerSize = function() {
    this.maxY = Math.max.apply( Math, this.colYs );
    var size = {
      height: this.maxY
    };

    if ( this.options.isFitWidth ) {
      size.width = this._getContainerFitWidth();
    }

    return size;
  };

  Masonry.prototype._getContainerFitWidth = function() {
    var unusedCols = 0;
    // count unused columns
    var i = this.cols;
    while ( --i ) {
      if ( this.colYs[i] !== 0 ) {
        break;
      }
      unusedCols++;
    }
    // fit container to columns that have been used
    return ( this.cols - unusedCols ) * this.columnWidth - this.gutter;
  };

  Masonry.prototype.needsResizeLayout = function() {
    var previousWidth = this.containerWidth;
    this.getContainerWidth();
    return previousWidth !== this.containerWidth;
  };

  return Masonry;

}));

/*!
 * Masonry layout mode
 * sub-classes Masonry
 * http://masonry.desandro.com
 */

( function( window, factory ) {
  'use strict';
  // universal module definition
  if ( typeof define == 'function' && define.amd ) {
    // AMD
    define( 'isotope/js/layout-modes/masonry',[
        '../layout-mode',
        'masonry/masonry'
      ],
      factory );
  } else if ( typeof exports == 'object' ) {
    // CommonJS
    module.exports = factory(
      require('../layout-mode'),
      require('masonry-layout')
    );
  } else {
    // browser global
    factory(
      window.Isotope.LayoutMode,
      window.Masonry
    );
  }

}( window, function factory( LayoutMode, Masonry ) {
'use strict';

// -------------------------- helpers -------------------------- //

// extend objects
function extend( a, b ) {
  for ( var prop in b ) {
    a[ prop ] = b[ prop ];
  }
  return a;
}

// -------------------------- masonryDefinition -------------------------- //

  // create an Outlayer layout class
  var MasonryMode = LayoutMode.create('masonry');

  // save on to these methods
  var _getElementOffset = MasonryMode.prototype._getElementOffset;
  var layout = MasonryMode.prototype.layout;
  var _getMeasurement = MasonryMode.prototype._getMeasurement;

  // sub-class Masonry
  extend( MasonryMode.prototype, Masonry.prototype );

  // set back, as it was overwritten by Masonry
  MasonryMode.prototype._getElementOffset = _getElementOffset;
  MasonryMode.prototype.layout = layout;
  MasonryMode.prototype._getMeasurement = _getMeasurement;

  var measureColumns = MasonryMode.prototype.measureColumns;
  MasonryMode.prototype.measureColumns = function() {
    // set items, used if measuring first item
    this.items = this.isotope.filteredItems;
    measureColumns.call( this );
  };

  // HACK copy over isOriginLeft/Top options
  var _manageStamp = MasonryMode.prototype._manageStamp;
  MasonryMode.prototype._manageStamp = function() {
    this.options.isOriginLeft = this.isotope.options.isOriginLeft;
    this.options.isOriginTop = this.isotope.options.isOriginTop;
    _manageStamp.apply( this, arguments );
  };

  return MasonryMode;

}));

/**
 * fitRows layout mode
 */

( function( window, factory ) {
  'use strict';
  // universal module definition
  if ( typeof define == 'function' && define.amd ) {
    // AMD
    define( 'isotope/js/layout-modes/fit-rows',[
        '../layout-mode'
      ],
      factory );
  } else if ( typeof exports == 'object' ) {
    // CommonJS
    module.exports = factory(
      require('../layout-mode')
    );
  } else {
    // browser global
    factory(
      window.Isotope.LayoutMode
    );
  }

}( window, function factory( LayoutMode ) {
'use strict';

var FitRows = LayoutMode.create('fitRows');

FitRows.prototype._resetLayout = function() {
  this.x = 0;
  this.y = 0;
  this.maxY = 0;
  this._getMeasurement( 'gutter', 'outerWidth' );
};

FitRows.prototype._getItemLayoutPosition = function( item ) {
  item.getSize();

  var itemWidth = item.size.outerWidth + this.gutter;
  // if this element cannot fit in the current row
  var containerWidth = this.isotope.size.innerWidth + this.gutter;
  if ( this.x !== 0 && itemWidth + this.x > containerWidth ) {
    this.x = 0;
    this.y = this.maxY;
  }

  var position = {
    x: this.x,
    y: this.y
  };

  this.maxY = Math.max( this.maxY, this.y + item.size.outerHeight );
  this.x += itemWidth;

  return position;
};

FitRows.prototype._getContainerSize = function() {
  return { height: this.maxY };
};

return FitRows;

}));

/**
 * vertical layout mode
 */

( function( window, factory ) {
  'use strict';
  // universal module definition
  if ( typeof define == 'function' && define.amd ) {
    // AMD
    define( 'isotope/js/layout-modes/vertical',[
        '../layout-mode'
      ],
      factory );
  } else if ( typeof exports == 'object' ) {
    // CommonJS
    module.exports = factory(
      require('../layout-mode')
    );
  } else {
    // browser global
    factory(
      window.Isotope.LayoutMode
    );
  }

}( window, function factory( LayoutMode ) {
'use strict';

var Vertical = LayoutMode.create( 'vertical', {
  horizontalAlignment: 0
});

Vertical.prototype._resetLayout = function() {
  this.y = 0;
};

Vertical.prototype._getItemLayoutPosition = function( item ) {
  item.getSize();
  var x = ( this.isotope.size.innerWidth - item.size.outerWidth ) *
    this.options.horizontalAlignment;
  var y = this.y;
  this.y += item.size.outerHeight;
  return { x: x, y: y };
};

Vertical.prototype._getContainerSize = function() {
  return { height: this.y };
};

return Vertical;

}));

/*!
 * Isotope v2.2.0
 *
 * Licensed GPLv3 for open source use
 * or Isotope Commercial License for commercial use
 *
 * http://isotope.metafizzy.co
 * Copyright 2015 Metafizzy
 */

( function( window, factory ) {
  'use strict';
  // universal module definition

  if ( typeof define == 'function' && define.amd ) {
    // AMD
    define( [
        'outlayer/outlayer',
        'get-size/get-size',
        'matches-selector/matches-selector',
        'fizzy-ui-utils/utils',
        'isotope/js/item',
        'isotope/js/layout-mode',
        // include default layout modes
        'isotope/js/layout-modes/masonry',
        'isotope/js/layout-modes/fit-rows',
        'isotope/js/layout-modes/vertical'
      ],
      function( Outlayer, getSize, matchesSelector, utils, Item, LayoutMode ) {
        return factory( window, Outlayer, getSize, matchesSelector, utils, Item, LayoutMode );
      });
  } else if ( typeof exports == 'object' ) {
    // CommonJS
    module.exports = factory(
      window,
      require('outlayer'),
      require('get-size'),
      require('desandro-matches-selector'),
      require('fizzy-ui-utils'),
      require('./item'),
      require('./layout-mode'),
      // include default layout modes
      require('./layout-modes/masonry'),
      require('./layout-modes/fit-rows'),
      require('./layout-modes/vertical')
    );
  } else {
    // browser global
    window.Isotope = factory(
      window,
      window.Outlayer,
      window.getSize,
      window.matchesSelector,
      window.fizzyUIUtils,
      window.Isotope.Item,
      window.Isotope.LayoutMode
    );
  }

}( window, function factory( window, Outlayer, getSize, matchesSelector, utils,
  Item, LayoutMode ) {



// -------------------------- vars -------------------------- //

var jQuery = window.jQuery;

// -------------------------- helpers -------------------------- //

var trim = String.prototype.trim ?
  function( str ) {
    return str.trim();
  } :
  function( str ) {
    return str.replace( /^\s+|\s+$/g, '' );
  };

var docElem = document.documentElement;

var getText = docElem.textContent ?
  function( elem ) {
    return elem.textContent;
  } :
  function( elem ) {
    return elem.innerText;
  };

// -------------------------- isotopeDefinition -------------------------- //

  // create an Outlayer layout class
  var Isotope = Outlayer.create( 'isotope', {
    layoutMode: "masonry",
    isJQueryFiltering: true,
    sortAscending: true
  });

  Isotope.Item = Item;
  Isotope.LayoutMode = LayoutMode;

  Isotope.prototype._create = function() {
    this.itemGUID = 0;
    // functions that sort items
    this._sorters = {};
    this._getSorters();
    // call super
    Outlayer.prototype._create.call( this );

    // create layout modes
    this.modes = {};
    // start filteredItems with all items
    this.filteredItems = this.items;
    // keep of track of sortBys
    this.sortHistory = [ 'original-order' ];
    // create from registered layout modes
    for ( var name in LayoutMode.modes ) {
      this._initLayoutMode( name );
    }
  };

  Isotope.prototype.reloadItems = function() {
    // reset item ID counter
    this.itemGUID = 0;
    // call super
    Outlayer.prototype.reloadItems.call( this );
  };

  Isotope.prototype._itemize = function() {
    var items = Outlayer.prototype._itemize.apply( this, arguments );
    // assign ID for original-order
    for ( var i=0, len = items.length; i < len; i++ ) {
      var item = items[i];
      item.id = this.itemGUID++;
    }
    this._updateItemsSortData( items );
    return items;
  };


  // -------------------------- layout -------------------------- //

  Isotope.prototype._initLayoutMode = function( name ) {
    var Mode = LayoutMode.modes[ name ];
    // set mode options
    // HACK extend initial options, back-fill in default options
    var initialOpts = this.options[ name ] || {};
    this.options[ name ] = Mode.options ?
      utils.extend( Mode.options, initialOpts ) : initialOpts;
    // init layout mode instance
    this.modes[ name ] = new Mode( this );
  };


  Isotope.prototype.layout = function() {
    // if first time doing layout, do all magic
    if ( !this._isLayoutInited && this.options.isInitLayout ) {
      this.arrange();
      return;
    }
    this._layout();
  };

  // private method to be used in layout() & magic()
  Isotope.prototype._layout = function() {
    // don't animate first layout
    var isInstant = this._getIsInstant();
    // layout flow
    this._resetLayout();
    this._manageStamps();
    this.layoutItems( this.filteredItems, isInstant );

    // flag for initalized
    this._isLayoutInited = true;
  };

  // filter + sort + layout
  Isotope.prototype.arrange = function( opts ) {
    // set any options pass
    this.option( opts );
    this._getIsInstant();
    // filter, sort, and layout

    // filter
    var filtered = this._filter( this.items );
    this.filteredItems = filtered.matches;

    var _this = this;
    function hideReveal() {
      _this.reveal( filtered.needReveal );
      _this.hide( filtered.needHide );
    }

    this._bindArrangeComplete();

    if ( this._isInstant ) {
      this._noTransition( hideReveal );
    } else {
      hideReveal();
    }

    this._sort();
    this._layout();
  };
  // alias to _init for main plugin method
  Isotope.prototype._init = Isotope.prototype.arrange;

  // HACK
  // Don't animate/transition first layout
  // Or don't animate/transition other layouts
  Isotope.prototype._getIsInstant = function() {
    var isInstant = this.options.isLayoutInstant !== undefined ?
      this.options.isLayoutInstant : !this._isLayoutInited;
    this._isInstant = isInstant;
    return isInstant;
  };

  // listen for layoutComplete, hideComplete and revealComplete
  // to trigger arrangeComplete
  Isotope.prototype._bindArrangeComplete = function() {
    // listen for 3 events to trigger arrangeComplete
    var isLayoutComplete, isHideComplete, isRevealComplete;
    var _this = this;
    function arrangeParallelCallback() {
      if ( isLayoutComplete && isHideComplete && isRevealComplete ) {
        _this.dispatchEvent( 'arrangeComplete', null, [ _this.filteredItems ] );
      }
    }
    this.once( 'layoutComplete', function() {
      isLayoutComplete = true;
      arrangeParallelCallback();
    });
    this.once( 'hideComplete', function() {
      isHideComplete = true;
      arrangeParallelCallback();
    });
    this.once( 'revealComplete', function() {
      isRevealComplete = true;
      arrangeParallelCallback();
    });
  };

  // -------------------------- filter -------------------------- //

  Isotope.prototype._filter = function( items ) {
    var filter = this.options.filter;
    filter = filter || '*';
    var matches = [];
    var hiddenMatched = [];
    var visibleUnmatched = [];

    var test = this._getFilterTest( filter );

    // test each item
    for ( var i=0, len = items.length; i < len; i++ ) {
      var item = items[i];
      if ( item.isIgnored ) {
        continue;
      }
      // add item to either matched or unmatched group
      var isMatched = test( item );
      // item.isFilterMatched = isMatched;
      // add to matches if its a match
      if ( isMatched ) {
        matches.push( item );
      }
      // add to additional group if item needs to be hidden or revealed
      if ( isMatched && item.isHidden ) {
        hiddenMatched.push( item );
      } else if ( !isMatched && !item.isHidden ) {
        visibleUnmatched.push( item );
      }
    }

    // return collections of items to be manipulated
    return {
      matches: matches,
      needReveal: hiddenMatched,
      needHide: visibleUnmatched
    };
  };

  // get a jQuery, function, or a matchesSelector test given the filter
  Isotope.prototype._getFilterTest = function( filter ) {
    if ( jQuery && this.options.isJQueryFiltering ) {
      // use jQuery
      return function( item ) {
        return jQuery( item.element ).is( filter );
      };
    }
    if ( typeof filter == 'function' ) {
      // use filter as function
      return function( item ) {
        return filter( item.element );
      };
    }
    // default, use filter as selector string
    return function( item ) {
      return matchesSelector( item.element, filter );
    };
  };

  // -------------------------- sorting -------------------------- //

  /**
   * @params {Array} elems
   * @public
   */
  Isotope.prototype.updateSortData = function( elems ) {
    // get items
    var items;
    if ( elems ) {
      elems = utils.makeArray( elems );
      items = this.getItems( elems );
    } else {
      // update all items if no elems provided
      items = this.items;
    }

    this._getSorters();
    this._updateItemsSortData( items );
  };

  Isotope.prototype._getSorters = function() {
    var getSortData = this.options.getSortData;
    for ( var key in getSortData ) {
      var sorter = getSortData[ key ];
      this._sorters[ key ] = mungeSorter( sorter );
    }
  };

  /**
   * @params {Array} items - of Isotope.Items
   * @private
   */
  Isotope.prototype._updateItemsSortData = function( items ) {
    // do not update if no items
    var len = items && items.length;

    for ( var i=0; len && i < len; i++ ) {
      var item = items[i];
      item.updateSortData();
    }
  };

  // ----- munge sorter ----- //

  // encapsulate this, as we just need mungeSorter
  // other functions in here are just for munging
  var mungeSorter = ( function() {
    // add a magic layer to sorters for convienent shorthands
    // `.foo-bar` will use the text of .foo-bar querySelector
    // `[foo-bar]` will use attribute
    // you can also add parser
    // `.foo-bar parseInt` will parse that as a number
    function mungeSorter( sorter ) {
      // if not a string, return function or whatever it is
      if ( typeof sorter != 'string' ) {
        return sorter;
      }
      // parse the sorter string
      var args = trim( sorter ).split(' ');
      var query = args[0];
      // check if query looks like [an-attribute]
      var attrMatch = query.match( /^\[(.+)\]$/ );
      var attr = attrMatch && attrMatch[1];
      var getValue = getValueGetter( attr, query );
      // use second argument as a parser
      var parser = Isotope.sortDataParsers[ args[1] ];
      // parse the value, if there was a parser
      sorter = parser ? function( elem ) {
        return elem && parser( getValue( elem ) );
      } :
      // otherwise just return value
      function( elem ) {
        return elem && getValue( elem );
      };

      return sorter;
    }

    // get an attribute getter, or get text of the querySelector
    function getValueGetter( attr, query ) {
      var getValue;
      // if query looks like [foo-bar], get attribute
      if ( attr ) {
        getValue = function( elem ) {
          return elem.getAttribute( attr );
        };
      } else {
        // otherwise, assume its a querySelector, and get its text
        getValue = function( elem ) {
          var child = elem.querySelector( query );
          return child && getText( child );
        };
      }
      return getValue;
    }

    return mungeSorter;
  })();

  // parsers used in getSortData shortcut strings
  Isotope.sortDataParsers = {
    'parseInt': function( val ) {
      return parseInt( val, 10 );
    },
    'parseFloat': function( val ) {
      return parseFloat( val );
    }
  };

  // ----- sort method ----- //

  // sort filteredItem order
  Isotope.prototype._sort = function() {
    var sortByOpt = this.options.sortBy;
    if ( !sortByOpt ) {
      return;
    }
    // concat all sortBy and sortHistory
    var sortBys = [].concat.apply( sortByOpt, this.sortHistory );
    // sort magic
    var itemSorter = getItemSorter( sortBys, this.options.sortAscending );
    this.filteredItems.sort( itemSorter );
    // keep track of sortBy History
    if ( sortByOpt != this.sortHistory[0] ) {
      // add to front, oldest goes in last
      this.sortHistory.unshift( sortByOpt );
    }
  };

  // returns a function used for sorting
  function getItemSorter( sortBys, sortAsc ) {
    return function sorter( itemA, itemB ) {
      // cycle through all sortKeys
      for ( var i = 0, len = sortBys.length; i < len; i++ ) {
        var sortBy = sortBys[i];
        var a = itemA.sortData[ sortBy ];
        var b = itemB.sortData[ sortBy ];
        if ( a > b || a < b ) {
          // if sortAsc is an object, use the value given the sortBy key
          var isAscending = sortAsc[ sortBy ] !== undefined ? sortAsc[ sortBy ] : sortAsc;
          var direction = isAscending ? 1 : -1;
          return ( a > b ? 1 : -1 ) * direction;
        }
      }
      return 0;
    };
  }

  // -------------------------- methods -------------------------- //

  // get layout mode
  Isotope.prototype._mode = function() {
    var layoutMode = this.options.layoutMode;
    var mode = this.modes[ layoutMode ];
    if ( !mode ) {
      // TODO console.error
      throw new Error( 'No layout mode: ' + layoutMode );
    }
    // HACK sync mode's options
    // any options set after init for layout mode need to be synced
    mode.options = this.options[ layoutMode ];
    return mode;
  };

  Isotope.prototype._resetLayout = function() {
    // trigger original reset layout
    Outlayer.prototype._resetLayout.call( this );
    this._mode()._resetLayout();
  };

  Isotope.prototype._getItemLayoutPosition = function( item  ) {
    return this._mode()._getItemLayoutPosition( item );
  };

  Isotope.prototype._manageStamp = function( stamp ) {
    this._mode()._manageStamp( stamp );
  };

  Isotope.prototype._getContainerSize = function() {
    return this._mode()._getContainerSize();
  };

  Isotope.prototype.needsResizeLayout = function() {
    return this._mode().needsResizeLayout();
  };

  // -------------------------- adding & removing -------------------------- //

  // HEADS UP overwrites default Outlayer appended
  Isotope.prototype.appended = function( elems ) {
    var items = this.addItems( elems );
    if ( !items.length ) {
      return;
    }
    // filter, layout, reveal new items
    var filteredItems = this._filterRevealAdded( items );
    // add to filteredItems
    this.filteredItems = this.filteredItems.concat( filteredItems );
  };

  // HEADS UP overwrites default Outlayer prepended
  Isotope.prototype.prepended = function( elems ) {
    var items = this._itemize( elems );
    if ( !items.length ) {
      return;
    }
    // start new layout
    this._resetLayout();
    this._manageStamps();
    // filter, layout, reveal new items
    var filteredItems = this._filterRevealAdded( items );
    // layout previous items
    this.layoutItems( this.filteredItems );
    // add to items and filteredItems
    this.filteredItems = filteredItems.concat( this.filteredItems );
    this.items = items.concat( this.items );
  };

  Isotope.prototype._filterRevealAdded = function( items ) {
    var filtered = this._filter( items );
    this.hide( filtered.needHide );
    // reveal all new items
    this.reveal( filtered.matches );
    // layout new items, no transition
    this.layoutItems( filtered.matches, true );
    return filtered.matches;
  };

  /**
   * Filter, sort, and layout newly-appended item elements
   * @param {Array or NodeList or Element} elems
   */
  Isotope.prototype.insert = function( elems ) {
    var items = this.addItems( elems );
    if ( !items.length ) {
      return;
    }
    // append item elements
    var i, item;
    var len = items.length;
    for ( i=0; i < len; i++ ) {
      item = items[i];
      this.element.appendChild( item.element );
    }
    // filter new stuff
    var filteredInsertItems = this._filter( items ).matches;
    // set flag
    for ( i=0; i < len; i++ ) {
      items[i].isLayoutInstant = true;
    }
    this.arrange();
    // reset flag
    for ( i=0; i < len; i++ ) {
      delete items[i].isLayoutInstant;
    }
    this.reveal( filteredInsertItems );
  };

  var _remove = Isotope.prototype.remove;
  Isotope.prototype.remove = function( elems ) {
    elems = utils.makeArray( elems );
    var removeItems = this.getItems( elems );
    // do regular thing
    _remove.call( this, elems );
    // bail if no items to remove
    var len = removeItems && removeItems.length;
    if ( !len ) {
      return;
    }
    // remove elems from filteredItems
    for ( var i=0; i < len; i++ ) {
      var item = removeItems[i];
      // remove item from collection
      utils.removeFrom( this.filteredItems, item );
    }
  };

  Isotope.prototype.shuffle = function() {
    // update random sortData
    for ( var i=0, len = this.items.length; i < len; i++ ) {
      var item = this.items[i];
      item.sortData.random = Math.random();
    }
    this.options.sortBy = 'random';
    this._sort();
    this._layout();
  };

  /**
   * trigger fn without transition
   * kind of hacky to have this in the first place
   * @param {Function} fn
   * @returns ret
   * @private
   */
  Isotope.prototype._noTransition = function( fn ) {
    // save transitionDuration before disabling
    var transitionDuration = this.options.transitionDuration;
    // disable transition
    this.options.transitionDuration = 0;
    // do it
    var returnValue = fn.call( this );
    // re-enable transition for reveal
    this.options.transitionDuration = transitionDuration;
    return returnValue;
  };

  // ----- helper methods ----- //

  /**
   * getter method for getting filtered item elements
   * @returns {Array} elems - collection of item elements
   */
  Isotope.prototype.getFilteredItemElements = function() {
    var elems = [];
    for ( var i=0, len = this.filteredItems.length; i < len; i++ ) {
      elems.push( this.filteredItems[i].element );
    }
    return elems;
  };

  // -----  ----- //

  return Isotope;

}));


/*
BttrLazyLoading, Responsive Lazy Loading plugin for JQuery
by Julien Renaux http://bttrlazyloading.julienrenaux.fr

Version: 1.0.8

Full source at https://github.com/shprink/BttrLazyLoading

MIT License, https://github.com/shprink/BttrLazyLoading/blob/master/LICENSE
*/
(function(){"use strict";var t,i,n,o={}.hasOwnProperty;t=jQuery,i=function(){function i(i,n){var o;null==n&&(n={}),this.$img=t(i),this.loaded=!1,this.loading=!1,o=t.extend(!0,{},t.bttrlazyloading.constructor.options),this.options=t.extend(!0,o,n),this.breakpoints=t.bttrlazyloading.constructor.breakpoints,this.$container=t(this.options.container),"number"==typeof window.devicePixelRatio&&(this.constructor.dpr=window.devicePixelRatio),this.whiteList=["lg","md","sm","xs"],this.blackList=[],A.call(this),this.$wrapper=t('<span class="bttrlazyloading-wrapper"></span>'),this.options.wrapperClasses&&"string"==typeof this.options.wrapperClasses&&this.$wrapper.addClass(this.options.wrapperClasses),this.$img.before(this.$wrapper),this.$clone=t('<canvas class="bttrlazyloading-clone"></canvas>'),c.call(this),this.$wrapper.append(this.$clone),this.$img.hide(),this.$wrapper.append(this.$img),this.options.backgroundcolor&&this.$wrapper.css("background-color",this.options.backgroundcolor),p.call(this,"on"),setTimeout(function(t){return function(){return d.call(t)}}(this),100)}var n,r,e,s,a,l,h,A,p,d,c;return i.dpr=1,c=function(){var t;return t=r.call(this),this.$clone.attr("width",t.width),this.$clone.attr("height",t.height)},A=function(){var i,n,r,e;r=this.$img.data(),e=[];for(i in r)o.call(r,i)&&(n=r[i],(null==n||0===i.indexOf("bttrlazyloading"))&&(i=i.replace("bttrlazyloading","").replace(/([a-z])([A-Z])/g,"$1-$2").toLowerCase().split("-"),i.length>1?"undefined"!=typeof this.options[i[0]][i[1]]?e.push(this.options[i[0]][i[1]]=n):e.push(void 0):"object"==typeof n?e.push(t.extend(this.options[i[0]],n)):"undefined"!=typeof this.options[i[0]]?e.push(this.options[i[0]]=n):e.push(void 0)));return e},p=function(i){var o,e,s,a;return s=function(t){return function(){return t.$clone.hide(),t.$img.show(),t.$wrapper.addClass("bttrlazyloading-loaded"),t.options.animation&&t.$img.addClass("animated "+t.options.animation),t.loaded=t.$img.attr("src"),t.$img.trigger("bttrlazyloading.afterLoad")}}(this),this.$img[i]("load",s),o=function(t){return function(){var i;return t.loading?void 0:(t.loading=!0,i=r.call(t),t.loaded?(t.$wrapper.removeClass("bttrlazyloading-loaded"),t.options.animation&&t.$img.removeClass("animated "+t.options.animation),t.$img.removeAttr("src"),t.$img.hide(),t.$clone.attr("width",i.width),t.$clone.attr("height",i.height),t.$clone.show()):t.$wrapper.css("background-image","url('"+t.options.placeholder+"')"),setTimeout(function(){return t.$img.trigger("bttrlazyloading.beforeLoad"),t.$img.data("bttrlazyloading.range",i.range),t.$img.attr("src",n.call(t,i.src,i.range)),t.loading=!1},t.options.delay))}}(this),this.$img[i]("bttrlazyloading.load",o),e=function(t){return function(){var i,n;if(n=t.$img.attr("src"),i=t.$img.data("bttrlazyloading.range"),t.constructor.dpr>=2&&t.options.retina&&n.match(/@2x/gi))t.blackList.push(i+"@2x");else if(t.blackList.push(i),t.whiteList.splice(t.whiteList.indexOf(i),1),0===t.whiteList.length)return t.$img.trigger("bttrlazyloading.error"),!1;return t.$img.trigger("bttrlazyloading.load")}}(this),this.$img[i]("error",e),a=function(t){return function(){return d.call(t)}}(this),this.$container[i](this.options.event,a),this.options.container!==window&&t(window)[i](this.options.event,a),t(window)[i]("resize",a)},a=function(){var t;return t=window.innerWidth,t<=this.breakpoints.xs?"xs":this.breakpoints.sm<=t&&t<this.breakpoints.md?"sm":this.breakpoints.md<=t&&t<this.breakpoints.lg?"md":this.breakpoints.lg<=t?"lg":void 0},r=function(){return this.range=a.call(this),s.call(this)},n=function(t,i){return this.constructor.dpr>=2&&this.options.retina&&-1===this.blackList.indexOf(i+"@2x")?t.replace(/\.\w+$/,function(t){return"@2x"+t}):t},e=function(t){return"undefined"!=typeof this.options[t].src&&null!==this.options[t].src?this.options[t]:null},s=function(){var t,i,n,o,r,s;if(t=this.whiteList.indexOf(this.range),t>-1&&(n=e.call(this,this.range)))return n.range=this.range,n;for(s=this.whiteList,t=o=0,r=s.length;r>o;t=++o)if(i=s[t],n=e.call(this,i))return n.range=i,n;return""},l=function(){var i,o,e;return!this.loaded&&this.options.triggermanually?!1:this.loaded&&this.options.updatemanually?!1:(i=r.call(this),i.src&&this.loaded!==n.call(this,i.src,i.range)?(e=0,this.loaded||(e=this.options.threshold),o=h.call(this,t(window),{top:t(window).scrollTop()+e,left:t(window).scrollLeft()}),this.options.container!==window?o&&h.call(this,this.$container,{top:this.$container.offset().top+e,left:this.$container.offset().left}):o):!1)},h=function(t,i){var n;return null==i&&(i={}),i.right=i.left+t.width(),i.bottom=i.top+t.height(),n=this.$wrapper.offset(),n.right=n.left+this.$wrapper.outerWidth(),n.bottom=n.top+this.$wrapper.outerHeight(),!(i.right<n.left||i.left>n.right||i.bottom<n.top||i.top>n.bottom)},d=function(){return this.range!==a.call(this)&&c.call(this),l.call(this)?this.$img.trigger("bttrlazyloading.load"):void 0},i.prototype.get$Img=function(){return this.$img},i.prototype.get$Clone=function(){return this.$clone},i.prototype.get$Wrapper=function(){return this.$wrapper},i.prototype.destroy=function(){return this.$wrapper.before(this.$img),this.$wrapper.remove(),p.call(this,"off"),this.$img.off("bttrlazyloading"),this.$wrapper.removeClass("bttrlazyloading-loaded"),this.options.animation&&this.$img.removeClass("animated "+this.options.animation),this.$img.removeData("bttrlazyloading"),this.$img},i}(),t.fn.extend({bttrlazyloading:function(n){return this.each(function(){var o,r;return o=t(this),r=o.data("bttrlazyloading"),"undefined"==typeof r&&(r=new i(this,n),o.data("bttrlazyloading",r)),"string"==typeof n&&"undefined"!=typeof r[n]?r[n].call(r):void 0})}}),t.fn.bttrlazyloading.Constructor=i,n=function(){function i(){}return i.prototype.version="1.0.8",i.breakpoints={xs:767,sm:768,md:992,lg:1200},i.options={xs:{src:null,width:100,height:100,animation:null},sm:{src:null,width:100,height:100,animation:null},md:{src:null,width:100,height:100,animation:null},lg:{src:null,width:100,height:100,animation:null},retina:!1,animation:"bounceIn",delay:0,event:"scroll",container:window,threshold:0,triggermanually:!1,updatemanually:!1,wrapperClasses:null,backgroundcolor:"#EEE",placeholder:"data:image/gif;base64,R0lGODlhEAALAPQAAP/391tbW+bf3+Da2vHq6l5dXVtbW3h2dq6qqpiVldLMzHBvb4qHh7Ovr5uYmNTOznNxcV1cXI2Kiu7n5+Xf3/fw8H58fOjh4fbv78/JycG8vNzW1vPs7AAAAAAAAAAAACH/C05FVFNDQVBFMi4wAwEAAAAh/hpDcmVhdGVkIHdpdGggYWpheGxvYWQuaW5mbwAh+QQJCwAAACwAAAAAEAALAAAFLSAgjmRpnqSgCuLKAq5AEIM4zDVw03ve27ifDgfkEYe04kDIDC5zrtYKRa2WQgAh+QQJCwAAACwAAAAAEAALAAAFJGBhGAVgnqhpHIeRvsDawqns0qeN5+y967tYLyicBYE7EYkYAgAh+QQJCwAAACwAAAAAEAALAAAFNiAgjothLOOIJAkiGgxjpGKiKMkbz7SN6zIawJcDwIK9W/HISxGBzdHTuBNOmcJVCyoUlk7CEAAh+QQJCwAAACwAAAAAEAALAAAFNSAgjqQIRRFUAo3jNGIkSdHqPI8Tz3V55zuaDacDyIQ+YrBH+hWPzJFzOQQaeavWi7oqnVIhACH5BAkLAAAALAAAAAAQAAsAAAUyICCOZGme1rJY5kRRk7hI0mJSVUXJtF3iOl7tltsBZsNfUegjAY3I5sgFY55KqdX1GgIAIfkECQsAAAAsAAAAABAACwAABTcgII5kaZ4kcV2EqLJipmnZhWGXaOOitm2aXQ4g7P2Ct2ER4AMul00kj5g0Al8tADY2y6C+4FIIACH5BAkLAAAALAAAAAAQAAsAAAUvICCOZGme5ERRk6iy7qpyHCVStA3gNa/7txxwlwv2isSacYUc+l4tADQGQ1mvpBAAIfkECQsAAAAsAAAAABAACwAABS8gII5kaZ7kRFGTqLLuqnIcJVK0DeA1r/u3HHCXC/aKxJpxhRz6Xi0ANAZDWa+kEAA7AAAAAAAAAAAA"},i.prototype.setOptions=function(i){return null==i&&(i={}),t.extend(!0,this.constructor.options,i),this},i.prototype.setRanges=function(i){return null==i&&(i={}),t.extend(!0,this.constructor.breakpoints,i),this},i.prototype.setBreakPoints=function(i){return null==i&&(i={}),t.extend(!0,this.constructor.breakpoints,i),this},i}(),t.bttrlazyloading=new n}).call(this);
/* Adobe Tag Container Loader version: 1.0.7
 Copyright 1996-2012 Adobe, Inc. All Rights Reserved
 More info availabel at http://www.omniture.com */
var s_rc=new TagContainerLoader()
s_rc.tagContainerDC="d1"
s_rc.tagContainerNamespace="rogerscommunicationspartnership"
s_rc.tagContainerName="RogersCommunications"
s_rc.loadTagContainer()

/************* DO NOT ALTER ANYTHING BELOW THIS LINE ! **************/
function TagContainerLoader(){var t=this,w=t.w=window;t.d=w.document;t._c='s_l';if(!w.s_c_il){w.s_c_il=[];w.s_c_in=0}t._il=w.s_c_il;t._in=w.s_c_in;t._il[t._in]=t;w.s_c_in++;t.timeout=5000;t.to=
  new Function('var t=s_c_il['+t._in+'];if(t.mt)t.mt(0)');t.loadTagContainer=function(){var t=this,l,p=t.d.body,n,a=t.tagContainerServer?t.tagContainerServer:'www.adobetag.com',b=
  t.tagContainerServerSecure?t.tagContainerServerSecure:a,c=t.d.cookie,d=t.tagContainerEnv?t.tagContainerEnv:(c?(c.indexOf('s_tagEnv=dev')>=0?'dev':(c.indexOf('s_tagEnv=stage')>=0?'stage':'live')):
  'live'),u=(t.w.location.protocol.toLowerCase().indexOf('https')>=0?'https://'+b:'http://'+a)+'/'+(t.tagContainerDC?t.tagContainerDC+'/':'')+t.tagContainerNamespace+'/'+d+'/'+t.tagContainerName+'.js'
  if(t.tagContainerURL)u=t.tagContainerURL;if(t.timeout)t.ti=setTimeout(t.to,t.timeout);if(t.d.getElementsByTagName){l=t.d.getElementsByTagName('HEAD');if(l&&l[0])p=l[0]}else p=0;if(
    p&&!t.tagContainerSynchronous){n=t.d.createElement('SCRIPT');if(n){n.type='text/javascript';n.setAttribute('async','async');n.src=u;if(p.firstChild)p.insertBefore(n,p.firstChild);else p.appendChild(n)
  }}else t.d.write('<sc'+'ript language="JavaScript" type="text/javascript" sr'+'c="'+u+'"></sc'+'ript>')};t.fs=function(x,y){if(x&&y){var a=x.split(','),b=y.split(','),i,j;for(i=0;i<a.length;i++){
  for(j=0;j<b.length;j++)if(a[i]==b[j])return 1}}return 0};t.aa=function(a){var b=0,i;if(a){b=[];for(i=0;i<a.length;i++)b[i]=a[i]}return b};t.wl=[];t.wq=[];t.createAsynchronousCustomTagHandler=function(
  o,f){var t=this,x,i;if(!f){f=o;o=0;x=t.w}else{if(!t.w[o])t.w[o]={};x=t.wl[o]=t.w[o]}if(typeof(f)!='object')f=[f];for(i=0;i<f.length;i++)if(!x[f[i]])x[f[i]]=new Function('var t=s_c_il['+t._in+
  '];t.wq[t.wq.length]={'+(o?'o:"'+o+'",':'')+'f:"'+f[i]+'",a:t.aa(arguments)}')};t.as=function(x){var y=[],i;for(i=1;i<x.length;i++)y[y.length]=x[i];return y};t.s=0;t.contextData={}
  t.retrieveLightData={};if(!w.s_giq)w.s_giq=[];t._gi=w.s_gi;w.s_gi=new Function('u','var t=s_c_il['+t._in+
    '],w=t.w,l=t._il,i,j,x,s;u=u.toLowerCase();if(l)for(j=0;j<2;j++)for(i=0;i<l.length;i++){s=l[i];x=s._c;if((!x||x=="s_c"||(j>0&&x=="s_l"))&&s.oun&&(s.oun==u||(s.fs&&s.sa&&s.fs(s.oun,u)))){'+
    'if(s.sa)s.sa(u);return s}}if(!t.oun){t.sa(u);return t}if(t._gi)return t._gi(u);s=new TagContainerLoader();s.tagContainerName="s_tca_"+w.s_giq.length;s.sa(u);w.s_giq[w.s_giq.length]=s;return s');t.sa=
    function(u){var t=this;if(t.s)t.s.sa(u);t.un=u;if(!t.oun)t.oun=u;else if(!t.fs(t.oun,u))t.oun+=','+u};t.tq=[];t.track=t.t=function(vo){var t=this,m;if(t.s)return t.s.t(vo);if(!vo)vo={};for(m in t){if(
    m!='un'||t.u!=t.un)vo[m]=t[m]}t.tq[t.tq.length]=vo;t.lnk=t.linkName=t.linkType='';return '';};t.trackLink=t.tl=function(o,u,n,vo){var t=this;if(t.s)return t.s.tl(o,u,v,vo);t.lnk=o;t.linkType=u
    t.linkName=n;return t.t(vo)};t.trackLight=function(p,ss,i,vo){var t=this;if(t.s)return t.s.trackLight(p,ss,i,vo);t.lightProfileID=p;t.lightStoreForSeconds=ss;t.lightIncrementBy=i;return t.t(vo)}
  t.lmq=[];t.loadModule=function(n,u,d){var t=this;if(t.s)return t.s.loadModule(n,u,d);t.lmq[t.lmq.length]={n:n,u:u,d:d};return 0};t.ml=[];t.mmq=[];t.mo=function(m,f){var t=this,i;t.ml[m]=t[m]={};if(f)
    for(i=0;i<f.length;i++)t[m][f[i]]=new Function('var t=s_c_il['+t._in+'];t.mmq[t.mmq.length]={m:"'+m+'",f:"'+f[i]+'",a:t.aa(arguments)}')};t.mo('Media',['open','play','stop','close','track']);t.mo(
    'Survey',['launch']);t.mci=[];t.mn=[];t.mc=function(n,m,p,k){var t=this,b,l=0;if(typeof(mboxFactoryDefault)=='undefined'||t.d.getElementById(m)==null)return;if(!mboxFactoryDefault.isEnabled()){
    clearInterval(t.mci[k]);t.mt(true);return}if(typeof(mboxFactoryDefault.get(t.mn[0],0))!='undefined')l=mboxFactoryDefault.get(t.mn[0],0).isShown();if(k==0||l){clearInterval(t.mci[k]);b=
    mboxFactoryDefault.create(n,p.split("&"));if(b)b.load()}};if(!w.mboxCreate&&!w.mboxDefine&&!w.mboxUpdate){w.mboxVersion='mini';if(!t.d.getElementById('mboxScriptContainer'))t.d.write(
    '<div id="mboxScriptContainer" style="display:none;visibility:hidden;"></div><style>.mboxDefault{visibility:hidden;}</style>');t.mt=function(f){var t=this,i,j,d;if(typeof(mboxFactoryDefault)==
    'undefined'||f){for(i in t.mci)clearInterval(t.mci[i]);d=(t.d.getElementsByClassName)?t.d.getElementsByClassName('mboxDefault'):t.d.getElementsByTagName('div');for(j in d)if(d[j].className==
    "mboxDefault")d[j].style.visibility="visible"}};t.mpi={};t.mp=function(x,m){var t=this;t.mpi[x]=setInterval(function(){if(typeof(mboxFactoryDefault)==='undefined')return;m();clearInterval(t.mpi[x])},
    13)};w.mboxCreate=function(n){var j=0,i,m,p,k;for(i in t.mn)if(t.mn[i]==n)j++;t.mn[t.mn.length]=n;m='mboxMarker-default-'+n+'-'+j;t.d.write('<div id="'+m+
    '" style="visibility:hidden;display:none">&nbsp;</div>');p=t.as(arguments).join("&");k=t.mci.length;t.mci[k]=setInterval(function(){t.mc(n,m,p,k);},5)};w.mboxDefine=function(d,n){var a=t.as(arguments)
    t.mp('define_'+n,function(){mboxFactoryDefault.create(n,a,d);})};w.mboxUpdate=function(n){var a=t.as(arguments),x;x='update_'+n;t.mpi[x]=setInterval(function(){if(typeof(mboxFactoryDefault)===
    'undefined'||typeof(mboxFactoryDefault.get(n))==='undefined')return;mboxFactoryDefault.update(n,a);clearInterval(t.mpi[x]);},13)};w.mboxLoadSCPlugin=function(s){(function(){if(typeof(
      mboxFactoryDefault)==='undefined'||typeof(mboxExternalLoadSCPlugin)==='undefined'||(s._c=='s_l'&&!s.s)){setTimeout(arguments.callee,19);return}if(s._c=='s_l')s=s.s;mboxExternalLoadSCPlugin(s)})()};}}
(function () {

  'use strict';

  /**
   * @author Ronald Nicholls | Chester Rivas
   * @description directive which wraps uteContentLoader, which makes request to CMS for data
   * @class ute-ui
   * @memberOf ute-ui
   */
  angular.module('ute.ui')

  /**
   * @class ute-ui.uteContentInjector
   */
    .directive('uteContentInjector', function ($rootScope, $templateCache, uteContentLoader, $cookies, uteLocale, uteEndpoint) {

      return {
        scope: {
          localContentId: '@',
          contentId: '@',
          compile: '=',
          province: '@',
          language: '@'
        },
        replace: true,
        restrict: 'EA',
        controller: function ($scope, $element) {          
          
          /**
           * @description toggle for showing meta data for developer purposes
           * @name metaShown
           * @memberOf ute-ui.uteContentInjector
           */
          var metaShown = false,
            containerWidth = $element[0].offsetWidth;

          if (containerWidth <= 500) {
            $element.addClass('cms-content-width-narrow');
          }

          /**
           * @description toggle hidden dev divs and displays metadata after user clicks hidden cms-metadata-toggle div
           * @name displayMetadata
           * @memberOf ute-ui.uteContentInjector
           */
          var displayMetadata = function () {

            metaShown = !metaShown;
            var settings = {
              scope: $scope,
              element: $element,
              method: 'GET',
              dataType: 'json',
              fileType: '.json',
              contentId: $scope.contentId,
              compile: angular.isDefined($scope.compile) && $scope.compile || false,
              language: $scope.language || uteLocale.language(),
              province: $scope.province || uteLocale.province(),
              localContentId: $scope.localContentId,
              teamsiteUrl: uteEndpoint('', 'teamsite')
            };

            metaShown ? uteContentLoader.makeRequest(settings) : $element.children().children()[0].remove();

          };

          /**
           * @description add and removed active from cms-metadata div
           * @name metadataActive
           * @memberOf ute-ui.uteContentInjector
           */
          var metadataActive = function () {
            $(this).toggleClass('active');
          };

          /**
           * @description inits the directive
           * @name init
           * @memberOf ute-ui.uteContentInjector
           */
          var init = function () {

            $('ins').off().on('click', '.cms-metadata', metadataActive);

            $element.addClass('preloader loading');

            if (!$rootScope.ute) {
              $rootScope.ute = {
                language: 'en',
                province: 'on'
              };
            }

            makeRequest();

            //TODO - change .bind to .on method
            angular.element(document.getElementById('cms-metadata-toggle')).bind('click', displayMetadata);

          };

          /**
           * @description makes http request, also called by watcher
           * @name makeRequest
           * @memberOf ute-ui.uteContentInjector
           */
          var makeRequest = function () {

            var settings = {
              scope: $scope,
              element: $element,
              method: 'GET',
              dataType: 'html',
              fileType: '.html',
              contentId: $scope.contentId,
              compile: angular.isDefined($scope.compile) && $scope.compile || false,
              language: $scope.language || uteLocale.language(),
              province: $scope.province || uteLocale.province(),
              localContentId: $scope.localContentId,
              teamsiteUrl: uteEndpoint('', 'teamsite')
              
            };

            uteContentLoader.makeRequest(settings);

          };

          /**
           * @description checks to see if new values are different from the old values then makes an http request again
           * @name metaShown
           * @param oldValue
           * @param newValue
           * @memberOf ute-ui.uteContentInjector
           */
          var update = function (oldValue, newValue) {
            if (oldValue !== newValue) {
              makeRequest();
            }
          };

          init();

          $scope.$watch('language', update);
          $scope.$watch('province', update);
          $scope.$watch('contentId', update);


        }

      };

    });

})();

(function () {

  'use strict';

  /**
   * @author Ronald Nicolls | Chester Rivas
   * @description factory used to load content from Rogers CMS and compiling it
   * @class ute-ui
   * @memberOf ute-ui
   */
  angular.module('ute.ui')

  /**
   * @class ute-ui.content.uteContentLoader
   */
    .factory('uteContentLoader', function ($http, uteEndpoint, $compile, moment) {

      /**
       * @name uteContentLoader
       * @type {object}
       * @memberOf ute-ui.content
       */
      var uteContentLoader = {};

      /**
       * @property uteContentLoader.contentObjects
       * @type {Array}
       * @memberOf ute-ui.content.uteContentLoader
       * @description holds each instance of the directive that calls the makeRequest method, using to loop through and match after loading content
       */
      uteContentLoader.contentObjects = [];

      /**
       * @property uteContentLoader.localizedUrl
       * @type {function}
       * @memberOf ute-ui.content.uteContentLoader
       * @description returns a string with the language and province appended
       * @param config - object containing language and province
       * @returns {string}
       */
      uteContentLoader.localizedUrl = function (config) {
        var contentId = config.localContentId || config.contentId;
        var seperator = contentId.indexOf('intergration') === -1 ? '_' : '-';
        return contentId + seperator + config.language + seperator + config.province;
      };

      /**
       * @property uteContentLoader.unescapeHTML
       * @type {function}
       * @memberOf ute-ui.content.uteContentLoader
       * @description converts ascii/html characters to < > characters, also replaces ampersands and a specific pattenr of double quotes
       * @param escapedHTML - string to convert
       * @returns {string}
       */
      uteContentLoader.unescapeHTML = function (escapedHTML) {
        return escapedHTML.replace(/&lt;/g, '<').replace(/&gt;/g, '>').replace(/&amp;/g, '&').replace(/\\"/g, '"');
      };

      /**
       * @name onCMSLoadSuccess
       * @property uteContentLoader.onCMSLoadSuccess
       * @type {function}
       * @memberOf ute-ui.content.uteContentLoader
       * @description callback for CMS loading success
       * @param {object} currentContentObj - config object
       * @param {object} result - data containing html markup
       */
      uteContentLoader.onCMSLoadSuccess = function (currentContentObj, result) {

        var convertedHTML,
          matchedContent = null;

        // loop through contents object array and find the matching content and it's config object
        _.some(uteContentLoader.contentObjects, function (eachContent) {

          return currentContentObj.rid === eachContent.rid && currentContentObj.element === eachContent.element && (matchedContent = currentContentObj);

        });

        if (angular.isUndefinedOrNull(matchedContent)) throw new Error('uteContentLoader error "matchedContent" was not defined');

        // if attribute option compile is set to true then compile the markup
        if (matchedContent.compile) {

          // convert the markup into valid HTML
          //convertedHTML = matchedContent.element.html(result.data).text();

          // populate that markup into the html
          matchedContent.element.html(result.data);

          // compile only the inner markup so there's no recursive loop
          //$compile($element.children().first())($scope.$parent);
          $compile(matchedContent.element.contents())(matchedContent.scope.$parent);

        } else if (matchedContent.fileType === '.json') {
          
          /* replace content url with proper url based on attr param
          */
          
          if(currentContentObj.teamsiteUrl !== 'undefined'){
            result.data.cmsContentURL = currentContentObj.teamsiteUrl + result.data.cmsContentURL;
          }
                    
          /*jshint camelcase: false */
          matchedContent.element.children().prepend('<div class="cms-metadata"><span class="content-url">' + uteContentLoader.path.replace('.json', '.html') +
            '</span><span class="edit-date">' + moment().format('MMMM Do YYYY, h:mm:ss a', result.data.editDate) + '</span><span class="version">' +
            result.data.version + '</span><span class="is-published">' + result.data.is_active + '</span><span class="content-edit-url"><a href="' +
            result.data.cmsContentURL + '" target="_blank">Edit</a></span></div>');
            
        } else {

          convertedHTML = uteContentLoader.unescapeHTML(result.data);
          matchedContent.element.html(convertedHTML);

        }

        matchedContent.element.removeClass('preloader loading');

      };

      /**
       * @property uteContentLoader.onCMSLoadError
       * @type function
       * @description callback for CMS loading error error
       * @memberOf ute-ui.content.uteContentLoader
       * @param {HTMLElement} currentContentObj - config object
       */
      uteContentLoader.onCMSLoadError = function (currentContentObj) {
        var placeholder = '<div class="col-xs-12 cms-content" style="background-color: #f5f5f5; text-align:center; margin-bottom:25px; margin-top:25px; border:1px dashed #ccc; padding:10px;"><span id="cms-header" style="text-align:center; color:#999;">' + uteContentLoader.localizedUrl(currentContentObj) + currentContentObj.fileType + '</span></div>';
        currentContentObj.element.removeClass('preloader loading');
        currentContentObj.element.html(placeholder);
      };

      /**
       * @property uteContentLoader.setOptions
       * @type {function}
       * @description sets all the default options before making the $http request
       * @memberOf ute-ui.content.uteContentLoader
       * @param {object} config - config object
       * @property {object} config.scope - scope of the directive
       * @property {string} config.contentId - the id/path to a CMS view from teamsite
       * @property {boolean} config.compile - to compile html string as angular binded markup
       * @property {string} config.language - language en or fr
       * @property {string} config.province - a province
       * @property {string} config.localContentId - the id/path to a local view, used for dev purposes
       */
      uteContentLoader.setOptions = function (config) {

        config.rid = Math.round(Math.random() * 1000);
        config.localContentId = angular.isDefined(config.localContentId) ? uteContentLoader.localizedUrl(config) + '.html' : undefined;

        // push processed object into array
        uteContentLoader.contentObjects.push(config);

        return config;

      };

      /**
       * @property uteContentLoader.makeRequest
       * @type {function}
       * @description make $http request to retrieve content of either html or json file
       * @memberOf ute-ui.content.uteContentLoader
       * @param {object} configObj - object which contains all the data associated with request
       */
      uteContentLoader.makeRequest = function (configObj) {

        // save current config object and push to array
        // returns object with rid defined
        var config = uteContentLoader.setOptions(configObj);

        config.fileType = config.contentId.indexOf('intergration') === -1 ? config.fileType : '.xml';

        //Take parts of configObj.contentId and remove trailing content id after final /
        var parts = config.contentId.split('/'),
          removedContentId = config.contentId.replace(parts[parts.length - 1], '');

        // Use full config.contentId if dateType is html, if dataType is json reform the $scope.contentId to have json subfolder added to it
        config.contentId = config.dataType === 'json' ? removedContentId + '/json/' + parts[parts.length - 1] : config.contentId;

        uteContentLoader.path = uteContentLoader.localizedUrl(config) + config.fileType;

        $http({
          method: config.method,
          dataType: config.dataType,
          url: config.localContentId || uteEndpoint(uteContentLoader.path, 'cms')
        }).then(uteContentLoader.onCMSLoadSuccess.bind(uteContentLoader, config), uteContentLoader.onCMSLoadError.bind(uteContentLoader, config));

      };

      return uteContentLoader;

    });

})();

(function () {

  'use strict';

  /**
   * @author Zain Syed
   * @ngdoc constant
   * @name uteEnv
   * @description
   * @class ute-ui
   * @memberOf ute-ui
   */

  angular.module('ute.ui')

    // cp key
    .constant('PCA_KEY', 'ND15-HD21-KA99-KT89')

    // plus any other contants you want

    // wrap in an iife so the values get parsed
    .constant('uteEnv', (function () {

      // polyfill for IE
      if (!window.location.origin) {
        window.location.origin = window.location.protocol + '//' + window.location.hostname + (window.location.port ? ':' + window.location.port : '');
      }

      var environment = {
        name: 'local',

        //apiBaseUrl: 'http://localhost:3000/',
        apiBaseUrl: 'http://ute-qa02.fido.ca:8080/html-fido/',

        //cmsFilesURL: 'resource/',
        cmsFilesURL: 'http://ute-dev02.fido.ca:8080/html-fido/cms/ute/fido/resource/',
        //cmsFilesURL: 'http://ute-qa02.fido.ca:8080/html-fido/cms/ute/fido/resource/',

        cmsContentURL: 'http://ute-dev02.fido.ca:8080/html-fido/cms/content/ute/fido/views/',
        //cmsContentURL: 'http://ute-qa02.fido.ca:8080/html-fido/cms/content/ute/fido/views/',

        apiBasePath: 'api/selfserve',
        custom: {
          'v2/searchCustomerDetails': 'http://localhost:8888/resource/searchCustomerDetails.json',
          'v1/createContact': 'http://localhost:8888/resource/createContact.json',
          'v1/creditCheck': 'http://localhost:8888/resource/creditCheck.json',
          'v1/createCustomer': 'http://localhost:8888/resource/createCustomer.json',
          'fullfillmentOptions': 'http://localhost:8888/resource/fulfillmentOptions.json',
          'v1/createFinancialAccount': 'http://localhost:8888/resource/createFinancialAccount.json',
          'v1/orderSummary': 'http://localhost:8888/resource/orderSummary.json',
          'iptvOffers': 'http://localhost:8888/resource/tvPackages.json',
          'getMyTimeSlots': 'http://localhost:8888/resource/getMyTimeSlots.json',
          'v1/recommendedPackages': 'http://localhost:8888/resource/recommendedPackages.json',
          'v1/cfaInfo': 'http://localhost:3000/v1/cfaInfo',
          'v1/hardwareExchange': 'http://ute-qa02.fido.ca:9001/html-fido/api/selfserve/v1/hardwareExchange'
        },
        semafoneParameters: {
          en: '',
          fr: '',
          semafoneUrl: 'https://htsqa03.rogers.com/semafone/service/capture/getSemafoneIMEcommerceFragment.html',
          semafoneMode: 'DISABLED',
          gatewayId: 'CYBERSOURCE',
          methodId: 'TOKENISE',
          transactionReference: '1234567890',
          ppUserId: 'fido-ca',
          ppPassword: 'MIIBlzCCAQCgAwIBAgIEVOyMQzANBgkqhkiG9w0BAQUFADAOMQwwCgYDVQQDDANUREUwHhcNMTUwMjI0MTQzNTQ3WhcNMjUwMjIxMTQzNTQ3WjASMRAwDgYDVQQDDAdmaWRvLWNhMIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQDEfWYpQ1DqL90UnuzN4Y5MFqXBxoV%2FMtqfUSHh5EuoWF8cLNA%2FtMAZ8g9db3m29T%2BgdC2Xk%2BkwUOw8r65a9qCf%2FXODAPIhPtAtr64viC2iUiCUmgIqFU9rZw0d2n4g3SRyWPVgFLIHKJRrsT98aB1qMZY7oXFnd6iNWY%2BdWXyZwwIDAQABMA0GCSqGSIb3DQEBBQUAA4GBAH1tAqVXyId%2FedKUv8f76cp0ugIutoyJKQ2o5zc%2BUbhXo4fjsyeAPIJ7%2FU6Tg2uTCgaql7d9QHsixjUlXwQv9p%2B8EdfRsGrlUYmws%2BnAdgZ1k0imOMfJzehuyYJMpjozQsKWHFL804ErggcLqayMLkfVGtOm%2FoNpUoxr3Zo9r6Uy',
          tenantId: 'RCI',
          clientId: '9',
          accountId: '541',
          principle: 'fidop',
          licenseCode: 'p9UnWrjEfW',
          transactionType: 'GetTokenPan',
          responseType: 'web',
          responseURL: 'https://htsqa03.rogers.com/semafone/service/capture/getSemafoneIMResultsEcommerceFragment.html'
        }
      };

      // janrain settings - Check for settings, create if it doesn't exist
      if (typeof window.janrain !== 'object') window.janrain = {};
      if (typeof window.janrain.settings !== 'object') {
        window.janrain.settings = {
          packages: ['capture'],
          language: angular.isDefined(window.__ute) && angular.isDefined(window.__ute.language) && window.__ute.language === 'fr' ? 'fr' : 'en-US',
          tokenUrl: 'http://localhost/',
          tokenAction: 'event',
          borderColor: '#ffffff',
          fontFamily: 'Helvetica, Lucida Grande, Verdana, sans-serif',
          width: 300,
          actionText: ' ',
          appUrl: 'https://fido-dev.rpxnow.com',
          capture: {
            captureServer: 'https://rogers-fido-dev.janraincapture.com',
            appId: 'r3jhdpkcm3ggrb2bjuzxewbxsv',
            clientId: 'd2hw34rwwgynjaa3m7kyx7agh5curpc3',
            redirectUri: 'http://localhost:8888/',
            flowName: 'fido',
            flowVersion: 'HEAD',
            screenToRender: 'returnTraditional',
            registerFlow: 'traditionalRegistration',
            setProfileCookie: true,
            keepProfileCookieAfterLogout: true,
            modalCloseHtml: 'X',
            noModalBorderInlineCss: true,
            responseType: 'token',
            returnExperienceUserData: ['displayName', 'userID', 'uuid'],
            federate: true,
            federateServer: 'https://rogers-fido-dev.janrainsso.com',
            federateXdReceiver: window.location.origin + '/validate/janrain/xfederate.html',
            federateLogoutUri: window.location.origin + '/validate/janrain/blank.html',
            federateLogoutCallback: function () {
              // noop
            },
            federateEnableSafari: false
          },
          ute: {
            widgetpath: document.location.protocol === 'https:' ? 'https://rpxnow.com/load/fido-dev' : 'http://widget-cdn.rpxnow.com/load/fido-dev',
          }
        };
      }

      // janrain starter
      if (document.addEventListener) {
        document.addEventListener('DOMContentLoaded', function () {
          window.janrain.ready = true;
        }, false);
      } else {
        window.attachEvent('onload', function () {
          window.janrain.ready = true;
        });
      }

      $('<script src="' + window.janrain.settings.ute.widgetpath + '" type="text/javascript" id="janrainAuthWidget"></script>').appendTo('body');

      return environment;

    })());

}());

(function () {

  'use strict';

  /**
   * @author Chester Rivas
   * @description
   * @ngdoc config
   * @name uteEnvConfig
   * @class ute-ui
   * @memberOf ute-ui
   */
  angular.module('ute.ui')

    .config(function (uteEnv, uteEndpointProvider) {

      // configure endpoints so that we can use simplified urls
      uteEndpointProvider.setBaseUrl(uteEnv.apiBaseUrl);
      uteEndpointProvider.setCMSContentURL(uteEnv.cmsContentURL);
      uteEndpointProvider.setBasePath(uteEnv.apiBasePath);
      if (uteEnv.custom) {
        uteEndpointProvider.setEndpoints(uteEnv.custom);
      }


    });

})();

(function () {

  'use strict';

  /**
   * @author Ronald Nicholls | Chester Rivas
   * @ngdoc directive
   * @description
   * @name uteRule
   * @class ute-ui
   * @memberOf ute-ui
   */
  angular.module('ute.ui')

    .constant('restive', $.restive)

    .directive('uteRestive', function (restive) {

      /**
       * @class ute-ui.uteRestive
       */

      return {
        restrict: 'AE',
        scope: {
          bandwidthSource: '@',
          speed: '@'
        },
        replace: false,
        controller: function ($scope, $element) {

          var breakClass,
            deviceSize,
            selector = $($element),
            classes = ['xs', 'sm', 'md', 'lg', 'xl', '2k', '4k', '8k'],
            setAttributes = function () {
              _.each(classes, function (value) {
                if (selector.attr('class').indexOf(value) > -1) {
                  deviceSize = value;
                }
              });

              //var req = new XMLHttpRequest();
              //req.open('GET', $scope.bandwidthSource || 'http://www.fido.ca/' , false);
              //req.send(null);
              //var headers = req.getAllResponseHeaders().toLowerCase();

              // Find and retrieve "Bandwidth" value
              //var arrHeaders = headers.split('\r\n');
              //var bandwidth = arrHeaders[arrHeaders.indexOf("bandwidth: fast")].split(': ')[1];

              breakClass = restive.isPhone() === true ? 'xs' : deviceSize;
              selector.attr('ute-device-orientation', restive.getOrientation())
                //.attr('ute-device-pixel-density', restive.getPixelRatio())
                .attr('ute-device-platform', restive.getPlatform())
                .attr('ute-device-formfactor', restive.getFormFactor())
                .attr('ute-device-mobile', restive.isMobile())
                .attr('ute-device-resolution', restive.getResolution())
                .attr('ute-device-bandwidth', $scope.speed || 'fast')
                .attr('ute-device-size', breakClass);
            };

          restive.startMulti();

          /*jshint camelcase: false */
          selector.restive({
            breakpoints: ['640', '720', '960', '1024', '1280', '1920', '3840', '7680'],
            classes: ['xs', 'sm', 'md', 'lg', 'xl', '2k', '4k', '8k'],
            force_dip: true,
            onRotate: function () {
              selector.attr('ute-device-orientation', restive.getOrientation());
            },
            onAddClass: function () {
              setAttributes();
            }
          });

          selector.restive({
            breakpoints: ['800'],
            classes: ['xs'],
            formfactor: 'phone',
            force_dip: true,
            onRotate: function () {
              selector.attr('ute-device-orientation', restive.getOrientation());
            },
            onAddClass: function () {
              setAttributes();
            }
          });

          restive.endMulti();

          setAttributes();

        }

      };

    });

})();

(function () {

  'use strict';

  /**
   * @author Ronald Nicholls
   * @description factory for unifying the logic for getting language and province based on $rootScope object rui or ute or cookies
   * @ngdoc factory
   * @name uteLocale
   * @class ute-ui
   * @memberOf ute-ui
   */
  angular.module('ute.ui')

    .factory('uteLocale', function ($rootScope, $cookies) {

      var ute = {},
        language,
        country = 'ca',
        province;

      /**
       * locale language
       * @returns {string}
       */
      ute.language = function () {

        if (typeof $rootScope.rui !== 'undefined' && typeof $rootScope.rui.language !== 'undefined') {
          language = $rootScope.rui.language;
        } else if (typeof $rootScope.ute !== 'undefined' && typeof $rootScope.ute.language !== 'undefined') {
          language = $rootScope.ute.language;
        } else if (typeof $cookies !== 'undefined' && typeof $cookies.get('language') !== 'undefined') {
          language = $cookies.get('language');
        } else {
          language = 'en';
        }

        return language;

      };

      /**
       * locale country
       * @returns {string}
       */
      ute.country = function() {
        return country;
      };

      /**
       * locale province
       * @returns {string}
       */
      ute.province = function () {
        if (typeof $rootScope.rui !== 'undefined' && typeof $rootScope.rui.province !== 'undefined') {
          province = $rootScope.rui.province;
        } else if (typeof $rootScope.ute !== 'undefined' && typeof $rootScope.ute.province !== 'undefined') {
          province = $rootScope.ute.province;
        } else if (typeof $cookies !== 'undefined' && typeof $cookies.get('province') !== 'undefined') {
          province = $cookies.get('province');
        } else {
          province = 'on';
        }

        return province;

      };

      /**
       * locale - combination of language and province
       * @returns {string}
       */
      ute.locale = function() {
        return ute.language() + '-' + ute.country();
      };

      return ute;


    });

})();

(function () {

  /**
   * @ngdoc service
   * @class ute-ui
   * @memberOf ute-ui
   * @param key Endpoint key name to generate a complete url
   * @description
   *   Returns endpoint url for http(s) services
   *
   * Requirements;
   *
   *   Input/Configuration/Parameter;
   *
   *     . MUST be able to configure `baseUrl`
   *     . MUST be able to configure `basePath`
   *     . MUST be able to configure keys to override the default behaviour
   *
   *   Output
   *
   *     . MUST return complete url starting from http, https, or //
   *
   * @example
   * <script>
   *   app.config(function(uteEndpointProvider) {
   *     uteEndpointProvider.setBaseUrl("http://base.url.com");
   *     uteEndpointProvider.setBasePath("/base/path");
   *     uteEndpointProvider.setEndpoints({
   *       'custom1': "http://custom.com/foo",
   *       'custom2': "/foo/bar",
   *       'custom3': "bar",
   *     });
   *     uteEndpointProvider.set('custom4', "http://custom.com/bar");
   *   });
   *
   *  app.controller('MyCtrl', function($scope, uteEndpoint) {
   *    uteEndpoint("foo");     // http://base.url.com/base/path/foo
   *    uteEndpoint("bar");     // http://base.url.com/base/path/bar
   *    uteEndpoint("/foo");    // http://base.url.com/foo
   *    uteEndpoint("custom1"); // http://custom.com/foo
   *    uteEndpoint("custom2"); // http://base.url.com/foo/bar
   *    uteEndpoint("custom3"); // http://base.url.com/base/path/bar
   *    uteEndpoint("custom4"); // http://custom.com/bar
   *  });
   * </script>
   */

  'use strict';

  /**
   * @ngdoc provider
   * @name uteEndpointProvider
   * @description  uteEndpoint configuration object
   */
  angular.module('ute.ui')

    .provider('uteEndpoint', function () {
      this.baseUrl = '';
      this.basePath = '';
      this.cmsContentURL = '';
      this.teamsiteURL = '';
      this.endpoints = {};

      /**
       * set cms content url
       */
      this.setCMSContentURL = function (url) {
        this.cmsContentURL = url;
      };

      this.setTeamsiteURL = function (url) {
        this.teamsiteURL = url;
      };


      /**
       * @memberof uteEndpointProvider
       * @description set all options
       * @param {Object} options
       * @example
       *   uteEndpointProvider.configure({baseUrl:"http://foo.com", basePath: "/bar"});
       */
      this.configure = function (options) {
        this.baseUrl = options.baseUrl;
        this.basePath = options.basePath;
        this.endpoints = options.endpoints;
      };

      /**
       * @memberof uteEndpointProvider
       * @description set base url
       * @param {String} url
       * @example
       *   uteEndpointProvider.setBaseUrl("http://foo.com");
       */
      this.setBaseUrl = function (url) {
        this.baseUrl = url;
      };

      /**
       * @memberof uteEndpointProvider
       * @description set base path
       * @param {String} path
       * @example
       *   uteEndpointProvider.setBasePath("/bar");
       */
      this.setBasePath = function (path) {
        this.basePath = path;
      };

      /**
       * @memberof uteEndpointProvider
       * @description set all custom endpoints to override the default behaviour
       * @param {Object}  endpoints object with key/value
       * @example
       *   uteEndpointProvider.setEndpoints({foo:"/foo", bar: "https://foo.com/bar"});
       */
      this.setEndpoints = function (endpoints) {
        this.endpoints = endpoints;
      };

      // set cms content url
      this.setCMSContentURL = function (url) {
        this.cmsContentURL = url;
      };

      this.setTeamsiteURL = function (url) {
        this.teamsiteURL = url;
      };

      /**
       * @memberof uteEndpointProvider
       * @description set a single custom endpoint to override the default behaviour
       * @param key key of endpoint, i.e. 'myurl"
       * @param url url, i.e. 'https://my.custom.com/url/endpoint"
       * @example
       *   uteEndpointProvider.set("foo", "https://foo.com/bar");
       */
      this.set = function (key, url) {
        this.endpoints[key] = url;
      };

      this.$get = function () {
        var _this = this;
        return function (key, typeOfEndpoint) {

          // if it's a cms call
          if (typeOfEndpoint && typeOfEndpoint === 'cms') {
            if (!_this.cmsContentURL) {
              _this.cmsContentURL = _this.baseUrl;
            }
            return _this.cmsContentURL + key;
          }

          // if it's a teamsite call
          if (typeOfEndpoint && typeOfEndpoint === 'teamsite') {
            return _this.teamsiteURL + key;
          }


          // not a cms call
          if (_this.endpoints[key]) {
            var url = _this.endpoints[key];
            if (url.match(/^http/)) {
              return url;
            } else if (url.match(/^\//)) {
              return _this.baseUrl + url;
            } else {
              return _this.baseUrl + _this.basePath + '/' + url;
            }
          } else if (key.match(/^\//)) {
            return _this.baseUrl + key;
          } else {
            return _this.baseUrl + _this.basePath + '/' + key;
          }
        };
      };
    });

})();

(function () {

  'use strict';

  /**
   * @author Zain Syed
   * @ngdoc directive
   * @name uteHeader
   * @description
   * @class ute-ui
   * @memberOf ute-ui
   */

  angular.module('ute.ui')

    .directive('uteHeader', function ($rootScope, $http, $compile, uteEndpoint, uteEnv, commonService) {

      return {
        restrict: 'AE',
        scope: true,
        replace: false,
        controllerAs: 'uteHeaderCtrl',
        templateUrl: 'uteHeader/header.html',
        link: function ($scope, $element, $attrs) {
          
          $scope.useHref = $scope.$eval($attrs.useHref) || false;
          
          $scope.internetNotificationsCount = 0;

          $scope.commonService = commonService;

          $scope.$watch(function () {
            return commonService.accountDetails;
          }, function (newVal) {
            $scope.accountDetails = newVal;

            $scope.internetNotificationsCount = 0;

            $scope.internetSubscriberNo = commonService.internetSubscriberNo;
            $scope.internetAccountNumber = commonService.internetAccountNumber;
            $scope.tvSubscriberNo = commonService.tvSubscriberNo;
            $scope.tvAccountNumber = commonService.tvAccountNumber;
            $scope.wirelessSubscriberNo = commonService.wirelessSubscriberNo;
            $scope.wirelessAccountNumber = commonService.wirelessAccountNumber;

            if ($scope.internetSubscriberNo) {
              var url = uteEndpoint('v1/productNotificationHistory');
              $http.post(url, {
                accountNumber: $scope.internetAccountNumber,
                subscriptionID: $scope.internetSubscriberNo
              }).success(function (data) {
                $scope.internetNotificationsCount = data.getUsageNotifications.notification.length;
              });
            }
          }, true);

          if ($attrs.isCms === 'true') {

            console.log('get header from cms');

            var path = 'global/header/header_' + $rootScope.rui.language + '_' + $rootScope.rui.province + '.html',
              markUpUrl = uteEnv.cmsContentURL + path;

            console.log('markUpUrl:', markUpUrl);

            $http.get(markUpUrl).success(function (result) {

              // convert html char
              //var convertedHTML = $element.html(result).text();

              // populate with converted string
              $element.html(result);

              // compiled markup
              $compile($element.contents())($scope);

            }).error(function (data) {

            });

          }
        }
      };

    })

    .factory('commonService', function ($http, uteEndpoint, $q, $window, $rootScope, uteJanrainService, uteCoreFactory) {

      var service = {};
      var self = {};
      var collections = uteCoreFactory.collections;

      service.accountDetails = [];
      service.samKeys = [];

      service.loginFrom = '';
      service.accessToken = '';

      service.customerHasWirelessService = false;
      service.customerHasInternetService = false;
      service.customerHasTVService = false;

      service.internetSubscriberNo = '';
      service.internetAccountNumber = '';
      service.tvSubscriberNo = '';
      service.tvAccountNumber = '';
      service.wirelessSubscriberNo = '';
      service.wirelessAccountNumber = '';

      var loading = false;
      self.deferred = {};

      self.countJanrainChecks = 0;

      //Call logout as soon as Janrain is ready, check every 500 ms
      self.logOutJanrain = function () {
        console.log('inside self.logOutJanrain. count=' + self.countJanrainChecks);

        setTimeout(function () {
          self.countJanrainChecks += 1;
          if (typeof $window.janrain === 'object' && typeof $window.janrain.capture === 'object' && typeof $window.janrain.capture.ui === 'object') {
            console.log('self.logOutJanrain. $window.janrain.capture.ui.hasActiveSession()=' + $window.janrain.capture.ui.hasActiveSession());
            if ($window.janrain.capture.ui.hasActiveSession() == true) {
              $window.janrain.capture.ui.endCaptureSession();
            }
          } else {
            //Stop trying after failing 10 times
            if (self.countJanrainChecks <= 10) {
              self.logOutJanrain();
            } else {
              console.log('Exiting from self.logOutJanrain. count=' + self.countJanrainChecks);
            }
          }
        }, 500);
      };

      service.logOutUser = function () {
        collections.userInfo = {};
        uteJanrainService.clearLocalStorageValue();

        // TODO - ute-ui-extended - handle the below routing via host app...use promises instead of hard-coding redirection
        // $state.go('home');


        $rootScope.payment = {};

        service.resetServiceData();

        //Reset the counter and try to logout when janrain object is ready
        self.countJanrainChecks = 0;
        self.logOutJanrain();
      };

      service.getAccountDetails = function (accounts, forceReload) {

        if (forceReload == true) {
          service.accountDetails = [];
        }

        if (loading) {
          return self.deferred.promise;
        } else if ((service.accountDetails || []).length > 0) {
          var deferred = $q.defer();
          setTimeout(function () {
            deferred.resolve();
          }, 20);
          return deferred.promise;
        } else {
          loading = true;
        }

        var promises = [];
        self.deferred = $q.defer();

        service.accountDetails = [];
        service.samKeys = [];
        service.customerHasWirelessService = false;
        service.customerHasInternetService = false;
        service.customerHasTVService = false;

        service.internetSubscriberNo = '';
        service.internetAccountNumber = '';
        service.tvSubscriberNo = '';
        service.tvAccountNumber = '';
        service.wirelessSubscriberNo = '';
        service.wirelessAccountNumber = '';

        _.each(accounts, function (account) {
          if (account && account.accountNumber && account.status !== 'TENTATIVE') {
            var promise = $http({
              method: 'POST',
              url: uteEndpoint('v2/accountOverview'),
              data: {
                accountNumber: account.accountNumber
              }
            });
            promises.push(promise);
          }
        });

        $q.all(promises).then(function (responses) {
            _.each(responses, function (response, index) {
              console.log('v2/accountOverview response', response);
              var accountDetail = {};
              accountDetail.accountNumber = accounts[index].accountNumber;
              accountDetail.hasInternetTV = false;
              accountDetail.hasWireless = false;
              if (accounts[index].serviceName === 'Internet/TV') {
                accountDetail.hasInternetTV = true;
              } else if (accounts[index].serviceName === 'Wireless') {
                accountDetail.hasWireless = true;
              }
              accountDetail.balance = response.data.getAccountInfo.balance;
              accountDetail.paymentDueDate = response.data.getAccountInfo.paymentDueDate;
              accountDetail.LOB = response.data.getAccountInfo.lob;
              accountDetail.nextCycleDueIn = response.data.getAccountInfo.nextCycleDueIn;
              accountDetail.contactEmail = response.data.getAccountInfo.primaryEmailID;
              accountDetail.MOPType = response.data.getAccountInfo.mop;
              accountDetail.subscriberServices = [];
              accountDetail.hasError = response.data.getAccountInfo.error;

              _.each(response.data.getAccountInfo.subscriberService, function (subscriberService) {
                var accountSubscriberService = {
                  serviceAddress: subscriberService.serviceAddress
                };

                if (subscriberService && subscriberService.serviceAddress && subscriberService.serviceAddress.samKey) {
                  service.samKeys.push(subscriberService.serviceAddress.samKey);
                }

                _.each(subscriberService.service, function (serviceData) {
                  if (serviceData.serviceName === 'Hi-Speed Internet' || serviceData.serviceName === 'HSI') {
                    accountSubscriberService.internet = serviceData;
                    service.customerHasInternetService = true;
                    service.internetSubscriberNo = serviceData.subscriberNo;
                    service.internetAccountNumber = accountDetail.accountNumber;
                  } else if (serviceData.serviceName == 'IPTV') {
                    accountSubscriberService.tv = serviceData;
                    service.customerHasTVService = ((serviceData.subscriberNo || '') !== '');
                    service.tvSubscriberNo = serviceData.subscriberNo;
                    service.tvAccountNumber = accountDetail.accountNumber;
                  } else if (serviceData.serviceName == 'CTN') {
                    accountSubscriberService.wireless = serviceData;
                    service.customerHasWirelessService = true;
                    service.wirelessSubscriberNo = serviceData.subscriberNo;
                    service.wirelessAccountNumber = accountDetail.accountNumber;
                  }
                });
                accountDetail.subscriberServices.push(accountSubscriberService);
              });

              service.accountDetails.push(accountDetail);
            });

            console.log('old collections.userPref.samKey', collections.userPref.samKey);
            if ((service.samKeys || []).length > 0) {
              collections.userPref.samKey = service.samKeys[0];
            }
            console.log('new collections.userPref.samKey', collections.userPref.samKey);

            self.deferred.resolve();
            console.log('service.accountDetails', service.accountDetails);
            console.log('service.samKeys', service.samKeys);
            loading = false;
          },
          function (reason) {
            self.deferred.reject();
            console.log('Error in service.accountDetails', reason);
            loading = false;

            if (reason.status === 401) {
              service.logOutUser();
            }
          });

        if (promises.length === 0) {
          console.log('Warning in service.accountDetails - No open account exist.');
          loading = false;
          self.deferred.resolve();
        }

        return self.deferred.promise;
      };

      service.loadPaymentDetails = function (accounts) {
        var deferred = $q.defer();

        var promises = [];

        _.each(accounts, function (account) {
          if (account && account.accountNumber && account.status !== 'TENTATIVE') {
            var promise = $http({
              method: 'POST',
              url: uteEndpoint('v1/billingArrangementData'),
              data: { billingArrangementId: account.accountNumber }
            });
            promises.push(promise);
          }
        });

        $q.all(promises).then(function (responses) {
            _.each(responses, function (response, index) {
              console.log('v1/billingArrangementData response', response);

              var MOPType = 'invoice';
              if (response.data.methodOfPayment === 'pac') {
                MOPType = 'pac';
              } else if (response.data.methodOfPayment === 'pacc') {
                MOPType = 'pacc';
              } else if (response.data.methodOfPayment === 'invoice') {
                MOPType = 'invoice';
              }

              _.each(service.accountDetails, function (accountDetail) {
                if (accountDetail.accountNumber == accounts[index].accountNumber) {
                  accountDetail.MOPType = MOPType;
                }
              });
            });
            deferred.resolve();
          },
          function (reason) {
            deferred.reject();
            console.log('Error in service.loadPaymentDetails', reason);
          });
        return deferred.promise;
      };

      service.resetServiceData = function () {
        loading = false;
        self.countJanrainChecks = 0;
        service.accountDetails = [];
        service.samKeys = [];
        service.loginFrom = '';
        service.accessToken = '';
        service.customerHasWirelessService = false;
        service.customerHasInternetService = false;
        service.customerHasTVService = false;
        service.internetSubscriberNo = '';
        service.internetAccountNumber = '';
        service.tvSubscriberNo = '';
        service.tvAccountNumber = '';
        service.wirelessSubscriberNo = '';
        service.wirelessAccountNumber = '';
        collections.userPref.samKey = 'default';
      };

      return service;

    });

})();

(function () {

  'use strict';

  /**
   * @author Zain Syed
   * @ngdoc controller
   * @name uteHeaderCtrl
   * @description
   * @class ute-ui
   * @memberOf ute-ui
   */

  angular.module('ute.ui')

    .controller('uteHeaderCtrl', function ($scope, $rootScope, $state, $window, uteUserService, uteModal, uteCartManager, uteJanrainService) {

      /**
       * @description opens up a search modal
       */
      $scope.openSearch = function () {
        uteModal.open({
          templateUrl: 'uteModal/search.html',
          size: 'md',
          ok: function () {
            $scope.modalClickedOk = true;
          },
          cancel: function () {
            $scope.modalClickedCancel = true;
          }
        });
      };

      /**
       * @description gets quantity from cart
       */
      $scope.getQuantity = uteCartManager.getQuantity;

      /**
       * current route name
       */
      $scope.currentRouteName = '';

      /**
       * @description toggle menu method
       * @param e
       */
      $scope.toggleMobileNav = function (e) {
        e.preventDefault();
        $rootScope.ruiMethods.toggleMobileMenu();
      };

      /**
       * TODO - comment
       */
      $scope.headerTypeClass = function () {
        return $scope.headerType;
      };

      /**
       * @description login user into app
       */
      $scope.login = function () {
        uteJanrainService.renderLogin();
      };

      /**
       * @description log out user from app
       */
      $scope.logout = function () {
        // TODO - ute-ui-extended - commented out userService methods for the moment
        // uteSserService.logout(false);
      };

      /**
       * TODO - comment
       */
      $scope.headerType = 'default';

      /**
       * TODO - comment
       */
      $scope.$on('rciLoginStatusChange', function (response, result) {
        //noop
      });

      /**
       * TODO - comment
       */
      $rootScope.$on('$stateChangeSuccess', function (event, toState) {

        $state.current = toState;
        $scope.currentRouteName = $state.current.name;

        if ($scope.currentRouteName === 'cartSummary' && $rootScope.utePopoverScope) {
          $rootScope.utePopoverScope.disable();
        } else if ($scope.currentRouteName !== 'cartSummary' && $rootScope.utePopoverScope) {
          $rootScope.utePopoverScope.enable();
        }

        if ($state.current.url.indexOf('profile') !== -1) {
          $scope.headerType = 'profile-header';
        } else {
          $scope.headerType = 'default';
        }

      });

    });

})();

(function () {

  'use strict';

  /**
   * @author Ronald Nicholls
   * @description directive for unified dom structure for terms and conditions
   * @class ute-ui
   * @memberOf ute-ui
   */
  angular.module('ute.ui')

    .directive('uteAcknowledge', function ($rootScope, $parse) {

      return {
        restrict: 'EA',
        scope: true,
        templateUrl: 'uteAcknowledge/acknowledge.html',
        controller: function ($scope, $element, $attrs) {

          $scope.navOffset = $attrs.navOffset;

          $scope.contentId = $attrs.contentId;

          $scope.buttonText = $attrs.buttonText;

          $scope.customClass = $attrs.customClass;

          $scope.checkboxText = $attrs.checkboxText;

          $scope.trackingId = $attrs.trackingId;

          $scope.callback = $parse($attrs.callback);

          $scope.isSelected = false;
          
          var readPolicy = false;

          $scope.accept = function () {
            //if callback is defined then fire it off
            if (angular.isDefined($scope.callback)) {
              $scope.callback($scope);
            }
          };

        }

      };
    });

})();

(function () {

  /**
   /**
   * @class ute-ui
   * @memberOf ute-ui
   * @name uteAddressComplete
   * @description
   *   Canada Post address auto completion in an input tag
   *   Requirements;
   *
   *   Input/Configuration/Parameter;
   *     1. MUST load required .js and .css automatically, so that user does not have to deal with these files
   *     2. MUST be able to specify license `key` as attribute or configuration.
   *     3. MUST be able to specify language as attribute or configuration.
   *
   *   Output;
   *     1. MUST be able to call callback function when the final address is populated
   *     2. BETTER to be able to call callback function when the address is not found
   *
   *   Restrict To:
   *     Attribute
   *
   * @param {String} key
   *    Canada post license key, if not defined it uses hard-coded license key, i.e. 'JJ22-BF18-BM96-CT77'
   * @param {String} locale
   *    Language preference for all messages and labels.  i.e. 'en-us', 'fr-ca'
   * @param {String} callback
   *    The callback function called when address is determined(pupulated). i.e. 'myCallback'
   * @param {String} callback-not-found
   *    The callback function called when address cannot be determined
   * @param {String} callback-error
   *    The callback function called when there is error
   * @example
   * Usage:
   *   <input ute-address-complete key='<<LICENSE-KEY>>'
   *     locale='<<LOCALE>>' callback='<<CALLBACK>>' callback-not-found='<<NOTFOUND>>' callback-error='<<ERROR>>' />
   *
   * Example:
   *    <script>
   *     app.controller('MyCtrl', function($scope) {
   *       $scope.processAddress = function(address) {
   *         $scope.address = address;
   *         $scope.$apply();
   *       };
   *       $scope.processNotFound = function() {
   *         console.log('no address is found');
   *       };
   *       $scope.processError = function(e) {
   *         console.log('there is error', e);
   *       };
   *     });
   *    </script>
   *    <div ng-controller='MyCtrl'>
   *      Address: <br/>
   *      <input ute-address-complete  key='AA11-BB22-CC33-DD44' locale='en-ca'
   *         callback='processAddress'
   *         callback-not-found='processNotFound'
   *         callback-error='processError'
   *         size=60 /> <br/>
   *    </div>
   */

  'use strict';

  /*global pca:false */

  angular.module('ute.ui')

    .directive('uteAddressComplete', function ($ocLazyLoad, $timeout) {
      return {
        restrict: 'EA',
        controller: function ($scope, $element, $attrs) {

          $scope.lazyLoaded = function () {

            // on success load; fire off configuration;
            var fields = [{
              element: $element[0],
              field: 'Label'
            }];
            try {
              var control = new pca.Address(fields, {
                key: $attrs.key || 'JJ22-BF18-BM96-CT77',
                culture: $attrs.locale || 'en-us',
                advancedFields: [
                  '{StreetNumber}',
                  '{StreetName}',
                  '{StreetType}',
                  '{StreetDirection}',
                  '{StreetNumberSuffix}',
                  '{StreetPreDirection}',
                  '{StreetPostDirection}'
                ],
                bar: {
                  visible: false,
                  showCountry: false,
                  showLogo: false
                }
              });
              control.listen('populate', function (address) {
                $attrs.callback && $scope[$attrs.callback](address);
              });
              control.listen('noresults', function () {
                $attrs.callbackNotFound && $scope[$attrs.callbackNotFound]();
              });

              // if processing object has been passed from the parent
              if ($scope.processing) {
                $scope.processing.loading = false;
              } else {
                $timeout(function () {
                  $scope.$emit('addressCompleteReady');
                }, 0);
              }

              // set autocomplete to 'off'; cp updates this to 'pca' when loaded
              $($element[0]).attr('autocomplete', 'off');
              if ($($element[0]).parents().hasClass('modal-dialog')) {
                $('.pca:first').insertBefore($($element[0]));
                $('.pca:first').addClass('formodal');
              }

            } catch (e) {
              $attrs.callbackError && $scope[$attrs.callbackError](e);
            }

          };

          // lazy load all canadapost files
          $ocLazyLoad.load([
            window.location.protocol + '//ws1.postescanada-canadapost.ca/css/addresscomplete-2.30.min.css',
            window.location.protocol + '//ws1.postescanada-canadapost.ca/js/addresscomplete-2.30.min.js'
          ]).then($scope.lazyLoaded);

        }
      };
    });
})();

(function () {

  'use strict';

  /**
   * @author Chester Rivas
   * @class ute-ui
   * @memberOf ute-ui
   */
  angular.module('ute.ui')

  /**
   * @class ute-ui.charts.uteChartist
   */
    .factory('uteBarOptions', function (chartist) {

      return {
        // Options for X-Axis
        axisX: {
          // The offset of the chart drawing area to the border of the container
          offset: 30,
          // Allows you to correct label positioning on this axis by positive or negative x and y offset.
          labelOffset: {
            x: 0,
            y: 0
          },
          // If labels should be shown or not
          showLabel: true,
          // If the axis grid should be drawn or not
          showGrid: true,
          // Interpolation function that allows you to intercept the value from the axis label
          labelInterpolationFnc: chartist.noop,
          // This value specifies the minimum width in pixel of the scale steps
          scaleMinSpace: 40
        },
        // Options for Y-Axis
        axisY: {
          // The offset of the chart drawing area to the border of the container
          offset: 40,
          // Allows you to correct label positioning on this axis by positive or negative x and y offset.
          labelOffset: {
            x: 0,
            y: 0
          },
          // If labels should be shown or not
          showLabel: true,
          // If the axis grid should be drawn or not
          showGrid: true,
          // Interpolation function that allows you to intercept the value from the axis label
          labelInterpolationFnc: chartist.noop,
          // This value specifies the minimum height in pixel of the scale steps
          scaleMinSpace: 20
        },
        // Specify a fixed width for the chart as a string (i.e. '100px' or '50%')
        width: undefined,
        // Specify a fixed height for the chart as a string (i.e. '100px' or '50%')
        height: undefined,
        // Overriding the natural high of the chart allows you to zoom in or limit the charts highest displayed value
        high: undefined,
        // Overriding the natural low of the chart allows you to zoom in or limit the charts lowest displayed value
        low: undefined,
        // Padding of the chart drawing area to the container element and labels as a number or padding object {top: 5, right: 5, bottom: 5, left: 5}
        chartPadding: 5,
        // Specify the distance in pixel of bars in a group
        seriesBarDistance: 15,
        // If set to true this property will cause the series bars to be stacked and form a total for each series point. This will also influence the y-axis and the overall bounds of the chart. In stacked mode the seriesBarDistance property will have no effect.
        stackBars: false,
        // Inverts the axes of the bar chart in order to draw a horizontal bar chart. Be aware that you also need to invert your axis settings as the Y Axis will now display the labels and the X Axis the values.
        horizontalBars: false,
        // If true the whole data is reversed including labels, the series order as well as the whole series data arrays.
        reverseData: false,
        // Override the class names that get used to generate the SVG structure of the chart
        classNames: {
          chart: 'ute-ct-chart-bar ct-chart-bar',
          label: 'ute-ct-label ct-label',
          labelGroup: 'ute-ct-labels ct-labels',
          series: 'ute-ct-series ct-series',
          bar: 'ute-ct-bar ct-bar',
          grid: 'ute-ct-grid ct-grid',
          gridGroup: 'ute-ct-grids ct-grids',
          vertical: 'ute-ct-vertical ct-vertical',
          horizontal: 'ute-ct-horizontal ct-horizontal'
        }
      };

    });

})();

(function () {

  'use strict';

  /**
   * @author Chester Rivas
   * @class ute-ui
   * @memberOf ute-ui
   */
  angular.module('ute.ui')

  /**
   * @class ute-ui.charts.uteChartBadge
   */
    .directive('uteChartBadge', function () {

      return {
        restrict: 'EA',
        replace: true,
        scope: {
          limitValue: '@'
        },
        template: '<div class="badge ute-ct-badge"><p><b>{{limitValue | uteCapacity}}</b><br/> data limit</p></div>'
      };

    });

})();

(function () {

  'use strict';

  /**
   * @author Chester Rivas
   * @description wrapper directive for chartist
   * @class ute-ui
   * @memberOf ute-ui
   */
  angular.module('ute.ui')

    /*global Chartist:false */
    .constant('chartist', Chartist)

  /**
   * @class ute-ui.charts.uteChartist
   */
    .directive('uteChartist', function ($compile, chartist, uteLineOptions, uteBarOptions, utePieOptions) {

      /**
       * @class ute-ui.chartist.uteChartist
       */
      return {
        restrict: 'EA',
        scope: {
          chartData: '=',
          chartOptions: '=',
          chartResponsiveOptions: '=',
          chartBreakLine: '=',
          chartShowLimitLine: '=',
          chartType: '@',
          onCreated: '&',
          onFinishedDrawing: '&',
          onDraw: '&'
        },
        replace: true,
        template: '<div class="ct-chart ute-chart"></div>',
        link: function ($scope, $element) {

          $scope.chart = null;
          $scope.chartData = angular.copy($scope.chartData);
          $scope.chartOptions = angular.copy($scope.chartOptions);

          var $target = $element[0],
            options;

          if ($scope.chartType === 'line') {

            // if chart data is defined and has more than 2 properties: labels and series
            if (angular.isDefined($scope.chartData) && angular.isDefined($scope.chartData.labels) && angular.isDefined($scope.chartData.series)) {

              var findLongestArray = function (listOfArrays) {
                  return _.reduce(listOfArrays, function (memo, num) {
                    var length = angular.isDefined(num.data) ? num.data.length : num.length;
                    return length > memo ? num.data : memo;
                  }, 0);
                },
                seriesArray;

              if ($scope.chartData.series === null || $scope.chartData.series === undefined) {
                console.warn('chartData.series is null');
                return;
              }

              seriesArray = findLongestArray($scope.chartData.series);

              if ($scope.chartBreakLine && $scope.chartBreakLine.enabled) {

                var breakLine,
                  limitIndex,
                  limitValue,
                  lastValue,
                  findMatchingLabel = function (index) {
                    if (typeof $scope.chartBreakLine.breakOn === 'number') {
                      return index < $scope.chartBreakLine.breakOn;
                    } else if (typeof $scope.chartBreakLine.breakOn === 'string') {
                      return $scope.chartBreakLine.breakOn !== $scope.chartData.labels[index].toLowerCase();
                    } else {
                      return false;
                    }
                  },
                  first = true;

                if (angular.isDefined($scope.chartBreakLine.breakOn)) {

                  if (typeof $scope.chartBreakLine.breakOn !== 'number' && typeof $scope.chartBreakLine.breakOn !== 'string') {
                    throw new Error('uteChartist error: chartBreakLine.breakOn is not a number or a string, typeof value is: ' + typeof $scope.chartBreakLine.breakOn);
                  }

                  breakLine = [];
                  _.each(seriesArray, function (d, index, sourceArray) {
                    // if index value is less than breakOn value then push d to breakLine
                    var match = findMatchingLabel(index);
                    match && breakLine.push(d);
                    // if index is greater than or equal to breakOn then get the first next value and push one more data point
                    if (!match && first) {
                      limitIndex = index;
                      limitValue = seriesArray[index - 1];
                      lastValue = d;
                      first = false;
                      breakLine.push(d);
                      //sourceArray[index] = null; // TODO fix nullifying data
                    }
                  });

                  // create another graph line in the series
                  $scope.chartData.series.push({
                    data: breakLine,
                    limitData: {
                      lastValue: lastValue,
                      limitValue: limitValue,
                      index: limitIndex,
                      cap: $scope.chartBreakLine.limit
                    }
                  });

                } else if (angular.isDefined($scope.chartBreakLine.limit)) {

                  if (typeof $scope.chartBreakLine.limit !== 'object' && typeof $scope.chartBreakLine.limit !== 'number') {
                    throw new Error('uteChartist error: chartBreakLine.limit is not a object or a string, typeof value is: ' + typeof $scope.chartBreakLine.limit);
                  }

                  if (Array.isArray($scope.chartBreakLine.limit)) {

                    // if limit is an array
                    _.each($scope.chartBreakLine.limit.reverse(), function (l) {
                      breakLine = [];
                      _.each(seriesArray, function (d, index, sourceArray) {
                        // if data value is less than current value in limit array then push data point to breakLine array
                        d < l && breakLine.push(d);
                        // if data value is greater than or equal to current value in limit array then get the first next value and push one more data point
                        if (d >= l && first) {
                          limitIndex = index;
                          limitValue = seriesArray[index - 1];
                          lastValue = d;
                          first = false;
                          breakLine.push(d);
                          //sourceArray[index] = null; // TODO fix nullifying data
                        }
                      });

                      // create another graph line in the series
                      $scope.chartData.series.push({
                        data: breakLine,
                        limitData: {
                          lastValue: lastValue,
                          limitValue: limitValue,
                          index: limitIndex,
                          cap: l
                        }
                      });
                    });

                  } else {

                    // if limit is a number
                    breakLine = [];
                    _.each(seriesArray, function (d, index, sourceArray) {
                      // if data value is less than limit value then push data point to breakLine array
                      if (d <= $scope.chartBreakLine.limit) {
                        breakLine.push(d);
                        limitValue = seriesArray[index];
                        //sourceArray[index] = null; // TODO fix nullifying data
                      }
                      // if data is greater than or equal to limit value then get the first next value and push one more data point
                      if (d >= $scope.chartBreakLine.limit && first) {
                        limitIndex = index;
                        lastValue = d;
                        first = false;
                        breakLine.push(d);
                      }
                    });

                    // create another graph line in the series
                    $scope.chartData.series.push({
                      data: breakLine,
                      limitData: {
                        lastValue: lastValue,
                        limitValue: limitValue,
                        index: limitIndex,
                        cap: $scope.chartBreakLine.limit
                      }
                    });

                  }

                }

              }

              // if chartShowLimitLine is enabled
              if ($scope.chartShowLimitLine && $scope.chartShowLimitLine.enabled) {

                var maxLine;

                if (Array.isArray($scope.chartShowLimitLine.limit)) {
                  _.each($scope.chartShowLimitLine.limit, function (l, index) {
                    maxLine = [];
                    _.each(seriesArray, function () {
                      maxLine.push(l);
                    });
                    $scope.chartData.series.push({
                      data: maxLine,
                      className: 'ute-ct-limit-line ute-ct-limit-line-' + (index + 1)
                    });
                  });
                } else {
                  maxLine = [];
                  _.each(seriesArray, function () {
                    maxLine.push($scope.chartShowLimitLine.limit);
                  });
                  $scope.chartData.series.push({
                    data: maxLine,
                    className: 'ute-ct-limit-line'
                  });
                }

              }

              options = _.defaults({}, $scope.chartOptions, uteLineOptions);
              options.breakLine = $scope.chartBreakLine || {};
              options.showLimitLine = $scope.chartShowLimitLine || {};

              $scope.chart = chartist.Line($target, $scope.chartData, options, $scope.chartResponsiveOptions);

            } else {

              if (!angular.isDefined($scope.chartData)) {
                throw new Error('uteChartist error: $scope.chartData is undefined');
              } else {
                throw new Error('uteChartist error: $scope.chartData is defined but does not have the correct properties: series and labels');
              }

            }

          } else if ($scope.chartType === 'bar') {

            options = _.defaults({}, $scope.chartOptions, uteBarOptions);
            $scope.chart = chartist.Bar($target, $scope.chartData, options, $scope.chartResponsiveOptions);

          } else if ($scope.chartType === 'pie') {

            options = _.defaults({}, $scope.chartOptions, utePieOptions);
            $scope.chart = chartist.Pie($target, $scope.chartData, options, $scope.chartResponsiveOptions);

          } else {

            throw new Error('uteChartist error: unknown chartType, must be \'line\', \'bar\' or \'pie\'');

          }

          // CREATED
          $scope.chart.on('created', function () {

            if ($scope.chartShowLimitLine && $scope.chartShowLimitLine.showLabel && $scope.chartShowLimitLine.showLabel.enabled) {

              var labelHTML = $scope.chartShowLimitLine.showLabel.template,
                $limitLine = $($element).find('.ute-ct-limit-line'),
                $label,
                $svgParent,
                $svg,
                linkFn = $compile(labelHTML),
                $chartDirective = $(linkFn($scope));

              $chartDirective.addClass('ute-limit-line-badge');

              $svg = $($element).find('svg');
              $svg.css({
                top: 0,
                left: 0
              });

              $svgParent = $svg.parent();
              $svgParent.css({
                position: 'relative'
              });

              if ($($element).find('.badge.ute-ct-badge').length === 0) {
                // if not badge has been added before
                $svgParent.before($chartDirective);
              }

              $chartDirective.css({
                position: 'absolute',
                left: 0 - $limitLine.outerWidth() + 45,
                top: $limitLine.position().top + $chartDirective.height()
              });

            }

            // if $scope.onCreated is defined then fire method
            if (angular.isDefined($scope.onCreated)) {
              var expressionHandler = $scope.onCreated();
              if (typeof expressionHandler === 'function') {
                expressionHandler($scope.chart);
              }
            }

            $scope.chart.eventEmitter.emit('finishedDrawing');

          });

          // DRAWING
          $scope.chart.on('draw', function (drawData) {
            // if $scope.onDraw is defined then fire method
            if (angular.isDefined($scope.onDraw)) {
              var expressionHandler = $scope.onDraw();
              if (typeof expressionHandler === 'function') {
                expressionHandler(drawData);
              }
            }
          });

          // FINISHED DRAWING
          $scope.chart.on('finishedDrawing', function () {
            if (angular.isDefined($scope.onFinishedDrawing)) {
              var expressionHandler = $scope.onFinishedDrawing();
              if (typeof expressionHandler === 'function') {
                expressionHandler();
              }
            }
          });

        }

      };

    });

})();

(function () {

  'use strict';

  /**
   * @author Chester Rivas
   * @class ute-ui
   * @memberOf ute-ui
   */
  angular.module('ute.ui')

  /**
   * @class ute-ui.charts.uteChartist
   */
    .constant('uteLineOptions', function (chartist) {

      return {
        // Options for X-Axis
        axisX: {
          // The offset of the labels to the chart area
          offset: 30,
          // Allows you to correct label positioning on this axis by positive or negative x and y offset.
          labelOffset: {
            x: 0,
            y: 0
          },
          // If labels should be shown or not
          showLabel: true,
          // If the axis grid should be drawn or not
          showGrid: true,
          // Interpolation function that allows you to intercept the value from the axis label
          labelInterpolationFnc: chartist.noop
        },
        // Options for Y-Axis
        axisY: {
          // The offset of the labels to the chart area
          offset: 40,
          // Allows you to correct label positioning on this axis by positive or negative x and y offset.
          labelOffset: {
            x: 0,
            y: 0
          },
          // If labels should be shown or not
          showLabel: true,
          // If the axis grid should be drawn or not
          showGrid: true,
          // Interpolation function that allows you to intercept the value from the axis label
          labelInterpolationFnc: chartist.noop,
          // This value specifies the minimum height in pixel of the scale steps
          scaleMinSpace: 20
        },
        // Specify a fixed width for the chart as a string (i.e. '100px' or '50%')
        width: undefined,
        // Specify a fixed height for the chart as a string (i.e. '100px' or '50%')
        height: undefined,
        // If the line should be drawn or not
        showLine: true,
        // If dots should be drawn or not
        showPoint: true,
        // If the line chart should draw an area
        showArea: false,
        // The base for the area chart that will be used to close the area shape (is normally 0)
        areaBase: 0,
        // If the line will stop drawing when the data ends rather than normalizing. This will not manipulate data with multiple length.
        allowVariableDataLengths: false,
        // Specify if the lines should be smoothed. This value can be true or false where true will result in smoothing using the default smoothing interpolation function Chartist.Interpolation.cardinal and false results in Chartist.Interpolation.none. You can also choose other smoothing / interpolation functions availabel in the Chartist.Interpolation module, or write your own interpolation function. Check the examples for a brief description.
        lineSmooth: true,
        // Overriding the natural low of the chart allows you to zoom in or limit the charts lowest displayed value
        low: undefined,
        // Overriding the natural high of the chart allows you to zoom in or limit the charts highest displayed value
        high: undefined,
        // Padding of the chart drawing area to the container element and labels as a number or padding object {top: 5, right: 5, bottom: 5, left: 5}
        chartPadding: 5,
        // When set to true, the last grid line on the x-axis is not drawn and the chart elements will expand to the full availabel width of the chart. For the last label to be drawn correctly you might need to add chart padding or offset the last label with a draw event handler.
        fullWidth: false,
        // If true the whole data is reversed including labels, the series order as well as the whole series data arrays.
        reverseData: false,
        // Override the class names that get used to generate the SVG structure of the chart
        classNames: {
          chart: 'ute-ct-chart-line ct-chart-line',
          label: 'ute-ct-label ct-label',
          labelGroup: 'ute-ct-labels ct-labels',
          series: 'ute-ct-series ct-series',
          line: 'ute-ct-line ct-line',
          point: 'ute-ct-point ct-point',
          area: 'ute-ct-area ct-area',
          grid: 'ute-ct-grid ct-grid',
          gridGroup: 'ute-ct-grids ct-grids',
          vertical: 'ute-ct-vertical ct-vertical',
          horizontal: 'ute-ct-horizontal ct-horizontal'
        }
      };

    });

})();

(function () {

  'use strict';

  /**
   * @author Chester Rivas
   * @class ute-ui
   * @memberOf ute-ui
   */
  angular.module('ute.ui')

  /**
   * @class ute-ui.charts.uteChartist
   */
    .constant('utePieOptions', function (chartist) {

      return {
        // Specify a fixed width for the chart as a string (i.e. '100px' or '50%')
        width: undefined,
        // Specify a fixed height for the chart as a string (i.e. '100px' or '50%')
        height: undefined,
        // Padding of the chart drawing area to the container element and labels as a number or padding object {top: 5, right: 5, bottom: 5, left: 5}
        chartPadding: 5,
        // Override the class names that get used to generate the SVG structure of the chart
        classNames: {
          chart: 'ute-ct-chart-pie',
          series: 'ute-ct-series ct-series',
          slice: 'ute-ct-slice ct-slice',
          donut: 'ute-ct-donut ct-donut',
          label: 'ute-ct-label ct-label'
        },
        // The start angle of the pie chart in degrees where 0 points north. A higher value offsets the start angle clockwise.
        startAngle: 0,
        // An optional total you can specify. By specifying a total value, the sum of the values in the series must be this total in order to draw a full pie. You can use this parameter to draw only parts of a pie or gauge charts.
        total: undefined,
        // If specified the donut CSS classes will be used and strokes will be drawn instead of pie slices.
        donut: false,
        // Specify the donut stroke width, currently done in javascript for convenience. May move to CSS styles in the future.
        donutWidth: 60,
        // If a label should be shown or not
        showLabel: true,
        // Label position offset from the standard position which is half distance of the radius. This value can be either positive or negative. Positive values will position the label away from the center.
        labelOffset: 0,
        // An interpolation function for the label value
        labelInterpolationFnc: chartist.noop,
        // Label direction can be 'neutral', 'explode' or 'implode'. The labels anchor will be positioned based on those settings as well as the fact if the labels are on the right or left side of the center of the chart. Usually explode is useful when labels are positioned far away from the center.
        labelDirection: 'neutral',
        // If true the whole data is reversed including labels, the series order as well as the whole series data arrays.
        reverseData: false
      };

    });

})();

(function () {

  'use strict';

  /**
   * @author Ronald Nicholls
   * @description wraps directive for currency filter
   * @ngdoc factory
   * @name uteCurrency
   * @class ute-ui
   * @memberOf ute-ui
   */
  angular.module('ute.ui')

  /**
   * @class ute-ui.extras.uteCurrency
   */
    .directive('uteCurrency', function ($http, $rootScope, $filter, $sce, $translate, uteLocale) {

      return {
        scope: {
          fontSize: '@',
          price: '@',
          frequency: '@',
          tax: '=',
          showCents: '@'
        },
        //scope: true,
        transclude: false,
        replace: true,
        template: '<span ng-style="{fontSize: fontSize};"><ins ng-bind-html="currencyValue"></ins></span>',
        restrict: 'EA',
        link: function ($scope, $element, $attrs) {

          /**
           * Check if fontSize attribute exists or is set
           * @scope.fontSize
           */
          $scope.fontSize = $scope.fontSize || '5rem';

          /**
           * @name buildCurrency
           * @description Builds currency with proper DOM structure
           * @param value - currency amount
           */
          var buildCurrency = function (value) {

            var currencySymbol = '<sup>$</sup>',
              taxText = '',
              translatedFrequency,
              dollarValue,
              freq = '';

            var toEnglish = function () {
              $scope.centsClass = $scope.showCents === 'false' ? 'hidden' : '';
              var priceArray = value.toString().replace('$', '').split('.');
              $scope.currencyValue = $sce.trustAsHtml(currencySymbol + priceArray[0] + '<sup class="' + $scope.centsClass + '">.' + priceArray[1] + '</sup>' + taxText + freq);
            };

            var toFrench = function () {
              var priceArray = value.toString().replace('$', '').split(',');
              $scope.currencyValue = $sce.trustAsHtml(priceArray[0] + '<sup class="' + $scope.centsClass + '">,' + priceArray[1] + '</sup>' + currencySymbol + taxText + freq);
            };

            $scope.getCurrencyValue = function () {

              if ($scope.tax) {
                var tax = parseFloat($scope.tax);
                if (tax && _.isNumber(tax)) {
                  taxText = '<span class="plux-tax-text">+' + tax.toFixed(2).toString() + '</span>';
                } else {
                  var plusTax = uteLocale.language() === 'en' ? '+ taxes' : '+ taxes';
                  taxText = '<span class="plux-tax-text">' + plusTax + '</span>';
                }
              }

              if (uteLocale.language() === 'en') {
                toEnglish();
              } else if (uteLocale.language() === 'fr') {
                toFrench();
              } else {
                toEnglish();
              }
            };

            if ($scope.frequency) {
              $translate.use(uteLocale.language());
              $translate($scope.frequency).then(function (result) {
                freq = '<sub>' + result + '</sub>';
                $scope.getCurrencyValue();
              });

            } else {

              $scope.getCurrencyValue();

            }

          };


          /**
           * Watch for Locale Change & Initialization. buildCurrency when everything is ok
           * @scope.price
           */
          $scope.$watch(function () {

            var priceNumber = Number($scope.price.replace('$', ''));
            $scope.price = !isNaN(priceNumber) ? $scope.price : '$0.00';
            $scope.price = $scope.price.replace('$', '').toString();

            return $filter('currency')($scope.price, '$');

          }, function (value) {
            buildCurrency(value);
          });

        }

      };
    });

})();

(function () {

  'use strict';

  /**
   * @author Ronald Nicholls
   * @description extends the angular bootstrap ui date picker
   * @class ute-ui
   * @memberOf ute-ui
   */
  angular.module('ute.ui')

    .directive('uteDatePicker', function () {

      return {
        scope: {
          endDate: '=',
          ngModel: '=',
          navigate: '=',
          preSelectDate: '@'
        },
        transclude: true,
        template: '<i class="ute-icon-calendar ute-xl" show-button-bar="false" datepicker-popup="{{format}}" ng-click="open($event)" ng-model="ngModel" is-open="opened" min-date="minDate" max-date="maxDate" datepicker-options="dateOptions"></i>',
        restrict: 'E',
        controller: function ($scope) {

          /**
           * Open function used to trigger datepicker pop overz
           * @event required to prevent bubble up
           */
          $scope.open = function ($event) {
            $event.preventDefault();
            $event.stopPropagation();
            $scope.opened = true;
          };

          /**
           * If preSelectDate = today, set it today, else make it null
           * TODO: Add abillity to add a UTC date that will be selected
           */
          $scope.ngModel = $scope.preSelectDate || moment().format();

          /**
           * Clear functiont that will clear the selecte date and put it back to null
           */
          $scope.clear = function () {
            $scope = null;
          };

          /**
           * Set MinDate.
           * ToDo: Add ability to set min date from outside directive. If no min date is set, than there is no min date
           */
          $scope.toggleMin = function () {
            $scope.minDate = $scope.minDate ? null : moment().format();
          };
          $scope.toggleMin();

          /**
           * Set max date date range.
           * ToDo: If no max date is set, than there is no max date
           */
          $scope.maxDate = moment().add($scope.endDate, 'd');

          /**
           * Date options. Year Format, and Starting Day;
           * Starting day of the week from 0-6 (0=Sunday, ..., 6=Saturday)
           * maxMode day will dissable year / month navigation
           */
          $scope.dateOptions = { formatYear: 'yy', startingDay: 1, maxMode: 'day', showWeeks: false };


          /**
           * Array of date formats
           */
          $scope.formats = ['dd-MMMM-yyyy', 'yyyy/MM/dd', 'dd.MM.yyyy', 'shortDate'];

          /**
           * set date format
           */
          $scope.format = $scope.formats[0];

        }

      };
    });

})();

(function () {

  'use strict';

  /**
   * @author Ronald Nicholls
   * @class ute-ui
   * @memberOf ute-ui
   */
  angular.module('ute.ui')

  /**
   * @class ute-ui.extras.uteGlobalMessage
   */
    .directive('uteGlobalMessage', function () {

      return {
        restrict: 'E',
        transclude: true,
        scope: {
          globalMessage: '@'
        },
        template: '<div class="alert alert-{{globalMessageObj.type}}"><div><i class="{{iconType}}"></i></div><div><h4><ins translate="{{globalMessageObj.title}}"></ins></h4><ins translate="{{globalMessageObj.code}}"></ins></div></div>',
        controller: function ($scope) {
          if ($scope.globalMessage !== '') {
            $scope.globalMessageObj = JSON.parse($scope.globalMessage);
            switch ($scope.globalMessageObj.type) {
              case 'success':
                $scope.iconType = 'ute-icon-check';
                break;
              case 'error':
              case 'warning':
              case 'danger':
                $scope.iconType = 'ute-icon-error';
                break;
              case 'info':
                $scope.iconType = 'ute-icon-info';
                break;
              default:

            }
          }
        }
      };

    });

})();

(function () {

  'use strict';

  /**
   * @author Ronald Nicholls
   * @class ute-ui
   * @memberOf ute-ui
   */

  angular.module('ute.ui')

    .directive('uteImg', function (restive) {

      return {
        restrict: 'AE',
        scope: {
          uteImg: '@',
          size: '@',
          prefix: '@',
          suffix: '@'
        },
        replace: true,
        link: function ($scope, $element) {

          $scope.suffix = $scope.suffix || '';
          $scope.prefix = $scope.prefix || '';
          $scope.size = $scope.size || '';

          $scope.suffix = $scope.suffix === '_square2' ? '_square' : $scope.suffix;

          var filename = $scope.uteImg.substring($scope.uteImg.lastIndexOf('/') + 1),
            filePath = $scope.uteImg.substring(0, $scope.uteImg.lastIndexOf('/') + 1),
            extension = $scope.uteImg.split('.').pop(),
            imageString = filename.substring(0, filename.lastIndexOf('.')),
            finalImage;

          $scope.size = $scope.size || '';
          $scope.size = restive.isRetina() === true ? 'x2' : $scope.size;

          finalImage = filePath + $scope.prefix + imageString + $scope.suffix + $scope.size + '.' + extension;

          $element.attr('class', 'bttrlazyloading');
          $element.attr('data-bttrlazyloading-sm-src', finalImage);

          $('.bttrlazyloading').bttrlazyloading({ animation: null });

        }

      };

    });

})();
(function () {

  'use strict';

  /**
   * @author Ronald Nicholls
   * @class ute-ui
   * @memberOf ute-ui
   */

  angular.module('ute.ui')

    .directive('uteIptvWhatyoulove', function ($http, $timeout, uteEndpoint) {

      return {
        restrict: 'AE',
        scope: {
          imageFolder: '@',
          jsonSource: '@',
          ratioOdds: '@',
          data: '@',
          selectedShows: '=shows',
          selectedChannels: '=channels'
        },
        replace: false,
        templateUrl: function (elem, attrs) {
          return attrs.templateUrl || 'modules/tv/views/iptv.html';
        },
        controller: function ($scope, $element) {

          // path to load the shows
          var dataSource = $scope.jsonSource || uteEndpoint('v1/endeca/proxy/what-you-love?N=0&Nr=AND(Language_D:en,Record_Type:Shows)');
          // var dataSource = $scope.jsonSource || 'http://142.146.172.51:8006/assembler-fido/json/pages/what-you-love?N=0&Nr=AND(Language_D:en,Record_Type:Shows)';
          $scope.imgList = [
            '//ute-dev02.fido.ca:8080/html-fido/cms/ute/fido/images/iptv/TWDS4_CC.jpeg',
            '//ute-dev02.fido.ca:8080/html-fido/cms/ute/fido/images/iptv/revolution.jpeg',
            '//ute-dev02.fido.ca:8080/html-fido/cms/ute/fido/images/iptv/arrow.jpeg',
            '//ute-dev02.fido.ca:8080/html-fido/cms/ute/fido/images/iptv/the-flash.jpeg',
            '//ute-dev02.fido.ca:8080/html-fido/cms/ute/fido/images/iptv/breaking-bad.jpeg',
            '//ute-dev02.fido.ca:8080/html-fido/cms/ute/fido/images/iptv/fringe.jpeg',
            '//ute-dev02.fido.ca:8080/html-fido/cms/ute/fido/images/iptv/daredevil.jpeg',
            '//ute-dev02.fido.ca:8080/html-fido/cms/ute/fido/images/iptv/falling-skies.jpeg',
            '//ute-dev02.fido.ca:8080/html-fido/cms/ute/fido/images/iptv/vikings.jpeg',
            '//ute-dev02.fido.ca:8080/html-fido/cms/ute/fido/images/iptv/the-100.jpeg',
            '//ute-dev02.fido.ca:8080/html-fido/cms/ute/fido/images/iptv/brooklyn-99.jpeg',
            '//ute-dev02.fido.ca:8080/html-fido/cms/ute/fido/images/iptv/the-big-bang-theory.jpeg',
            '//ute-dev02.fido.ca:8080/html-fido/cms/ute/fido/images/iptv/game-of-thrones.jpeg',
            '//ute-dev02.fido.ca:8080/html-fido/cms/ute/fido/images/iptv/simpsons.jpeg',
            '//ute-dev02.fido.ca:8080/html-fido/cms/ute/fido/images/iptv/family-guy.jpeg',
            '//ute-dev02.fido.ca:8080/html-fido/cms/ute/fido/images/iptv/castle.jpeg',
            '//ute-dev02.fido.ca:8080/html-fido/cms/ute/fido/images/iptv/modern-family.jpeg',
            '//ute-dev02.fido.ca:8080/html-fido/cms/ute/fido/images/iptv/mad-men.jpeg',
            '//ute-dev02.fido.ca:8080/html-fido/cms/ute/fido/images/iptv/orphan-black.jpeg',
            '//ute-dev02.fido.ca:8080/html-fido/cms/ute/fido/images/iptv/true-detective.jpeg',
            '//ute-dev02.fido.ca:8080/html-fido/cms/ute/fido/images/iptv/grimm.jpeg'
          ];

          /**
           * the odds for randomizing a class name
           * @type {{square: number, square2: number, portrait: number, landscape: number}}
           */
          var defaultRatios = {
            square: 40,
            square2: 10,
            portrait: 20,
            landscape: 30
          };

          /**
           * will set to $scope variable or fallback to default
           * @type {string|{square: number, square2: number, portrait: number, landscape: number}}
           */
          var ratioOddObj = $scope.ratioOdds || defaultRatios;
          var count = 0;
          /**
           * returns 1 of 4 options which will be used as a class name
           * @returns {string}
           */
          $scope.getRandomRatio = function () {

            var randomNumber = Math.round(Math.random() * 100),
              currentMax = 0,
              cssClass = '';

            _.each(ratioOddObj, function (prop, key) {

              var currentMin = currentMax;
              currentMax += prop;

              if (randomNumber >= currentMin && randomNumber < currentMax) {
                cssClass = key;
              }

            });

            return cssClass;

          };

          $scope.getChannelName = function (object) {
            for (var key in object) {
              if (object.hasOwnProperty(key)) {
                console.log(key);
                return key;
              }
            }
          };

          /**
           *
           * @param item
           */
          $scope.select = function (item) {
            $scope.selected = item;
          };

          /**
           *
           * @param item
           * @returns {boolean}
           */
          $scope.isActive = function (item) {
            return $scope.selected === item;
          };

          // update channel selection based on selected shows
          $scope.$watch('selectedShows', function (nv, ov) {
            // get array of different channels selected
            $scope.selectedChannels = _.groupBy(_.without(nv, undefined, false, null), 'channel');

            // channel count
            $scope.channelCount = _.size($scope.selectedChannels);
          }, true);


          /**
           * folder path
           * @type {string|string}
           */
          $scope.folder = $scope.imageFolder || 'resource/iptv/';

          /**
           * callback for shows data success
           * @param result
           */
          var onResourceSuccess = function (result) {

            $scope.channelsList = _.map(result.data.mainContent[0].contents[0].records, function (record) {

              /*jshint camelcase: false */
              if (record.attributes.ChannelCallLetter_P) {
                return {
                  channel: record.attributes.ChannelCallLetter_P[0],
                  tvShow: record.attributes.ShowName_P[0],
                  description: record.attributes.Show_ShortDescription_P[0],
                  ratio: ( $.restive.isPhone() === true || $.restive.getViewportW() < 600 ) ? 'square' : $scope.getRandomRatio()
                };
              }

            });

            // runs $.isotope on the container class .grid with inner divs being .grid-item
            $timeout(function () {
              //$('div.grid-item').addClass('square');
              $('.grid').isotope({
                layoutMode: 'packery',
                itemSelector: '.grid-item'
              });

            }, 500);

            // emit requestdata value to parent controllers
            $scope.$emit('uteIptvWhatyouloveRequestData', {
              loading: false,
              loadError: false
            });

          };

          /**
           * callback for shows data failure
           * @param result
           */
          var onResourceError = function (result) {
            console.warn('resource loading error', result);

            // emit requestdata value to parent controllers
            $scope.$emit('uteIptvWhatyouloveRequestData', {
              loading: false,
              loadError: true
            });
          };

          // makes request for what you love data
          $http.get(dataSource).then(onResourceSuccess, onResourceError);
        }

      };

    });

})();

(function () {

  'use strict';

  /**
   * @author Chester Rivas
   * @description multi element directive that will set permissions on the current DOM element and all the children
   *    default match codes
   *    if 0 - (hidden) content will not be transcluded, and therefore none of the children will ever touch the DOM
   *    if 1 - (display) content will be transcluded but will run functions to disable all ng-click methods
   *    if 2 - (enable) content will be transcluded and not disabled
   * @class ute-ui
   * @memberOf ute-ui
   */
  angular.module('ute.ui')

    .directive('utePermission', function (utePermissionManager, $rootScope, $compile, $animate) {

      // runs 1st

      /**
       * transcludes content
       */
      var transcludeLink = function ($scope, $element, $attrs, ctrl, $transclude) {

        var init = function() {

          if (utePermissionManager.getPermissionById($attrs.utePermission) === utePermissionManager.permissionsStatuses.HIDDEN) {

            //console.log('-- LEVEL 1 - HIDE');

            // hide
            // $transclude(function(clone) {
            //   $element.html('');
            // });

          } else {

            // show
             $transclude(function (clone) {
               $animate.enter(clone, $element.parent(), $element);
             });

          }

        };

        // watch utePermissions to become defined
        $scope.$watch(function () {
          return utePermissionManager.utePermissions;
        }, function() {
          if (!angular.isUndefinedOrNull(utePermissionManager.utePermissions)) {
            init();
          }
        });

      };

      /**
       * will run permissions ready
       */
      var permissionsCtrl = function ($scope, $element, $attrs) {

        /**
         * @description event listener
         * @name permissionsListener
         * @memberOf ute-ui.permissions
         */
        var permissionsListener;

        /**
         * @description init
         * @name init
         * @memberOf ute-ui.permissions
         */
        $scope.init = function () {

          // if not loaded
          // waiting for permissions data to be ready
          if (!utePermissionManager.permissionsLoaded) {
            permissionsListener = $rootScope.$on(utePermissionManager.events.PERMISSION_DATA_READY, $scope.permissionsReady);
          } else {
            $scope.permissionsReady(null, utePermissionManager.utePermissions);
          }

        };

        /**
         * @description callback for when permission object is ready
         * @name permissionsReady
         * @param event
         * @param permissions
         * @memberOf ute-ui.permissions
         */
        $scope.permissionsReady = function (event, permissions) {

          // if permissionsListener is defined then unregister it
          if (angular.isDefined(permissionsListener)) {
            permissionsListener();
          }

        };

        if (utePermissionManager.getPermissionById($attrs.utePermission) !== utePermissionManager.permissionsStatuses.HIDDEN) {
          $scope.init();
        }

      };

      var permissions = {};
      permissions.multiElement = true;
      permissions.transclude = 'element';
      //permissions.transclude = true;
      permissions.priority = 1210;
      permissions.terminal = true;
      permissions.restrict = 'A';
      permissions.controller = permissionsCtrl;
      permissions.link = transcludeLink;

      return permissions;

    })

    .directive('utePermission', function ($parse, $compile, utePermissionManager) {

      // runs 2nd

      /**
       * will disable ng-clicks if visible but not enabled
       */
      var disablingLink = function ($scope, $element, $attrs) {

        if (utePermissionManager.getPermissionById($attrs.utePermission) === utePermissionManager.permissionsStatuses.DISPLAY) {

          // if visible but not enabled

          /**
           * @description looks through a string and returns the variable name of a function
           * @param ngClickName
           * @memberOf ute-ui.permissions
           * @returns {Array}
           */
          var ifValidFunctionName = function (ngClickName) {
            var methodsArray = [];
            ngClickName
              .replace(/(?:\$?[\w]+?\((?:.+?)??\))/gi, function (str) {
                methodsArray.push(str.slice(0, str.indexOf('(')));
                return 'null';
              });
            return methodsArray;
          };

          /**
           * @description loops through any element that has children
           * @memberOf ute-ui.permissions
           * @param index
           * @param el
           */
          var loopThroughChildren = function (index, el) {

            if ($(el).hasAttr('ng-click')) {
              var methodName = ifValidFunctionName($(el).attr('ng-click'));
              $(el).removeAttr('ng-click');
              // loop through each methods null
              _.each(methodName, function (key) {
                if (!angular.isUndefinedOrNull($scope[key])) {
                  $scope[key] = null;
                }
              });
            }

            $(el).attr('disabled', 'disabled');

            $.each($(el).children(), loopThroughChildren);

          };

          $.each($($element).children(), loopThroughChildren);
          $($element).append('<div class="ute-disabled"></div>');

        }

      };

      var permissions = {};
      permissions.multiElement = true;
      permissions.priority = 1205;
      permissions.restrict = 'A';
      permissions.link = disablingLink;

      return permissions;

    });

})();

(function () {

  'use strict';

  /**
   * @author Chester Rivas
   * @description handles loading of a JSON file that contains all the permissions information, then uses a directive to get permission information about that DOM element
   * @class ute-ui
   * @memberOf ute-ui
   */
  angular.module('ute.ui')

    .factory('utePermissionManager', function ($rootScope, $http, $log, $q) {

      /**
       * @description object return by factory
       * @memberOf ute-ui.permissions
       */
      var utePermissionManager = {};

      /**
       * @name utePermissions
       * @description object containing all permission information
       * @memberOf ute-ui.permissions
       */
      utePermissionManager.utePermissions = null;

      /**
       * @name permissionsStatuses
       * @description constants for permissions
       * @type {{HIDDEN: string, VISIBLE: string, ENABLED: string}}
       * @memberOf ute-ui.permissions
       */
      utePermissionManager.permissionsStatuses = {
        HIDDEN: 'N',
        DISPLAY: 'D',
        ENABLE: 'E'
      };

      /**
       * @name defaultPermissionsMap
       * @description mapping permissions
       * @memberOf ute-ui.permissions
       * @type {Array}
       */
      utePermissionManager.defaultPermissionsMap = [
        {
          id: '0',
          permission: utePermissionManager.permissionsStatuses.HIDDEN
        },
        {
          id: '1',
          permission: utePermissionManager.permissionsStatuses.DISPLAY
        },
        {
          id: '2',
          permission: utePermissionManager.permissionsStatuses.ENABLE
        }
      ];

      /**
       * @name getPermissionById
       * @description gets permission code by id reference in defaultPermissionsMap
       * @param id
       * @memberOf ute-ui.permissions
       * @returns {string}
       */
      utePermissionManager.getPermissionById = function (id) {

        var permission = null;

        _.some(utePermissionManager.defaultPermissionsMap, function (localIdObj) {
          // purposely do not strict match
          if (id === localIdObj.id) {
            permission = localIdObj.permission;
            return true;
          }
        });

        return angular.isDefined(permission) ? permission : utePermissionManager.permissionsStatuses.HIDDEN;

      };

      /**
       * @name permissionsLoaded
       * @description whether permission json has been loaded
       * @memberOf ute-ui.permissions
       * @type {boolean}
       */
      utePermissionManager.permissionsLoaded = false;

      /**
       * @name events
       * @description vents dispatched internally within factory
       * @memberOf ute-ui.permissions
       * @type {{PERMISSION_DATA_READY: string}}
       */
      utePermissionManager.events = {
        PERMISSION_DATA_READY: 'PERMISSION_DATA_READY'
      };

      /**
       * @name nameSpace
       * @description string delimited with commas
       * @memberOf ute-ui.permissions
       * @type {string}
       */
      utePermissionManager.nameSpace = null;

      /**
       * @name requestPermissionJSON
       * @description makes $http request for a JSON file, once loaded it will $emit an event telling utePermission directive that the data is ready
       * @param jsonFile
       * @memberOf ute-ui.permissions
       * @returns {promise}
       */
      utePermissionManager.requestPermissionJSON = function (jsonFile) {

        if (angular.isUndefinedOrNull(jsonFile)) new Error('utePermissionManager: you must specify a valid path to a json file containing tagging id information');

        var deferred = $q.defer();

        $http.get(jsonFile).then(function (result) {

          utePermissionManager.utePermissions = result.data;

          // remaps default permissions
          utePermissionManager.defaultPermissionsMap = [];

          _.each(utePermissionManager.utePermissions.permissions, function(obj, key) {
            utePermissionManager.defaultPermissionsMap.push({
              id: key,
              permission: obj
            });
          });

          $rootScope.$emit(utePermissionManager.events.PERMISSION_DATA_READY, utePermissionManager.utePermissions);
          utePermissionManager.permissionsLoaded = true;
          deferred.resolve(utePermissionManager.utePermissions);

        }, function (result) {

          $log.warn('could not load json file:', result);

        });

        return deferred.promise;

      };

      /**
       * @name init
       * @description starts the http request for json file containing data for omniture events
       * @param {string} jsonUrl - path to json file
       * @memberOf ute-ui.permissions
       * @returns {promise}
       */
      utePermissionManager.init = function (jsonUrl) {

        var deferred = $q.defer();

        if (angular.isUndefinedOrNull(utePermissionManager.utePermissions)) {
          utePermissionManager.requestPermissionJSON(jsonUrl).then(function () {
            deferred.resolve(utePermissionManager.utePermissions);
          });
        } else {
          $rootScope.$emit(utePermissionManager.events.PERMISSION_DATA_READY, utePermissionManager.utePermissions);
          deferred.resolve(utePermissionManager.utePermissions);
        }

        return deferred.promise;

      };

      return utePermissionManager;

    });

})();

(function () {

  'use strict';

  /**
   * requires JQuery, Bootstrap
   * @author Chester Rivas
   * @description extends bootstrap popover component to be able to pass in a partial view or a directive or inline markup
   * @class ute-ui
   * @memberOf ute-ui
   */
  angular.module('ute.ui')

    .directive('utePopover', function ($compile, $timeout, $document, $window, utePopoverFactory) {

      return {
        restrict: 'EA',
        scope: {
          popoverContent: '@',
          popoverBackdrop: '=',
          popoverClass: '@',
          popoverTarget: '@',
          popoverCloseTarget: '@',
          popoverPlacement: '@',
          popoverRemoveSelf: '=',
          popoverInsertMode: '@',
          popoverArrowPadding: '@'
        },
        controller: function ($scope, $element) {

          /**
           * @memberOf ute-ui.content
           * @type {object}
           * @property {string} popoverContent
           * @property {boolean} popoverBackdrop
           * @property {string} popoverClass
           * @property {string} popoverTarget
           * @property {string} popoverCloseTarget
           * @property {string} popoverPlacement
           * @property {boolean} popoverRemoveSelf
           * @property {string} popoverInsertMode
           * @property {boolean} popoverArrowPadding
           */

          /**
           * how insert the content into the target div
           * @options - replace | append | after
           * @default replace
           * @type {string}
           */
          var popoverInsertMode = $scope.popoverInsertMode || 'append';

          /**
           * popoverClass
           * @type {string}
           */
          $scope.popoverClass = $scope.popoverClass || '';

          /**
           * options for popoverPlacement
           * @type {string}
           */
          $scope.popoverPlacement = $scope.popoverPlacement || 'bottom';

          /**
           * the offset of the arrow when position popover over target
           * @default true
           * @type {number}
           */
          var popoverArrowPadding = $scope.popoverArrowPadding || 10;

          /**
           * displays the tooltip
           */
          $scope.show = function () {

            if (!disabled) {

              // if another popover is open, then close it
              if ($document.find('popover.active')) {
                $document.find('popover.active').removeClass('active');
              }

              showToggle = true;

              if (angular.isDefined($scope.popoverTarget) && (popoverRemoveSelf || firstTimeOpen)) {

                $target = $($scope.popoverTarget);

              } else if (!angular.isDefined($scope.popoverTarget) && (popoverRemoveSelf || firstTimeOpen)) {

                $target = $($element);

              }

              ////////////////////////////////////////

              firstTimeOpen = false;

              insertPopoverContent();

              // if popoverCloseTarget is defined then only use that element to close the popover
              if (angular.isDefined($scope.popoverCloseTarget)) {
                $scope.$closeTarget = $($scope.popoverCloseTarget);
                $scope.$closeTarget.on('click', $scope.hide);
              }

              // if popover backdrop is defined
              if (popoverBackdrop) {

                // if not in DOM then add to DOM
                if (!$('#backdrop').length) {
                  if (angular.isDefined($scope.popoverTarget)) {
                    $($scope.popoverTarget).parent().after(backDrop);
                  } else {
                    $element.parent().after(backDrop);
                  }
                }

                // find backdrop by id
                $backDrop = $backDrop || $('#backdrop');
                $backDrop.addClass('active');
                $backDrop.css({
                  zIndex: 10
                });
                // if popover close target is defined then hide on bg click
                // !angular.isDefined($scope.popoverCloseTarget) && $backDrop.one('click', $scope.hide);
                $backDrop.one('click', $scope.hide);

              }

              $target.css({
                position: 'relative',
                zIndex: 201
              });

              positionPopover(placement, $content, $target);

              ////////////////////////////////////////


              // makes it visible via css
              $content.addClass('active');
              $content.css({
                zIndex: 202,
                position: 'absolute'
              });

              // set the currently open directive to this $scope
              utePopoverFactory.pushCurrentPopover($scope);

            }

          };

          /**
           * hides the tooltip
           */
          $scope.hide = function () {

            if (!disabled) {

              showToggle = false;
              $content.removeClass('active');
              if (popoverRemoveSelf) {
                $content.remove();
              }

              $backDrop = $backDrop || $document.find('#backdrop');
              $backDrop.removeClass('active');

              $timeout(function () {
                $element.one('click', function () {
                  $scope.show();
                });
              }, 0);

              if ($target) {
                $target.css({
                  zIndex: 0
                });
              }

              if ($content) {
                $content.css({
                  zIndex: 0
                });
              }

              utePopoverFactory.popCurrentPopover($scope);

            }

          };

          /**
           * disable clicking to show/hide popover
           */
          $scope.disable = function () {
            disabled = true;
            $scope.hide();
            $element.css({
              cursor: 'auto'
            });
          };

          /**
           * enable clicking to show/hide popover
           */
          $scope.enable = function () {
            disabled = false;
            init();
            $element.css({
              cursor: 'pointer'
            });
          };

          ///////////////////////////////
          // private
          ///////////////////////////////

          var defaultOptions = {
              placement: $scope.popoverPlacement,
              animation: false,
              appendToBody: false,
              popupDelay: 0
            },
            placement = defaultOptions.placement,
            isHTMLView = (/\.(html)$/i).test($scope.popoverContent),
            viewContent = isHTMLView ?
              '<div class=\'popover-content\' ng-include=\'popoverContent\'></div>' :
              $scope.popoverContent,
            tipHTML = '<div class="popover ute-popover" ng-class="{ in: isOpen(), fade: animation() }">\n' +
              '<div class="arrow"></div>\n' +
              '<div class="popover-inner">\n' +
              '<h3 class="popover-title" ng-bind="title" ng-show="title"></h3>\n' +
              viewContent +
              '</div>\n' +
              '</div>\n' +
              '</div>\n' +
              '',
            backDrop = '<div id="backdrop" class="backdrop ute-backdrop"></div>',
            linkFn = $compile(tipHTML),
            $content = $(linkFn($scope)),
            showToggle = false,
            popoverRemoveSelf,
            popoverBackdrop,
            $backDrop,
            firstTimeOpen = true,
            disabled = false,
            $target;

          /**
           * positions the popover based on position and target and content dimensions
           * @param pPosition - position either top, bottom, left and right
           * @param content - the content being displayed in the popover
           * @param target - the target div where the popover will be added to
           */
          var positionPopover = function (pPosition, content, target) {
            $scope.popoverArrowPadding = $scope.popoverArrowPadding || 10;
            if (pPosition === 'bottom') {
              content.css({
                top: 0 + target.outerHeight() - 1 + popoverArrowPadding,
                bottom: 'auto',
                left: (target.outerWidth() / 2) - (content.outerWidth() / 2),
                right: 'auto'
              });
            } else if (pPosition === 'top') {
              content.css({
                top: 0 - content.outerHeight() - 1 - popoverArrowPadding,
                bottom: 'auto',
                left: (target.outerWidth() / 2) - (content.outerWidth() / 2),
                right: 'auto'
              });
            } else if (pPosition === 'left') {
              content.css({
                top: 0 - (content.outerHeight() / 2) + (target.outerHeight() / 2),
                bottom: 'auto',
                left: 'auto',
                right: 0 + target.outerWidth() + 9 - popoverArrowPadding
              });
            } else if (pPosition === 'right') {
              content.css({
                top: 0 - (content.outerHeight() / 2) + (target.outerHeight() / 2),
                bottom: 'auto',
                left: 0 + target.outerWidth() - 2 + popoverArrowPadding,
                right: 'auto'
              });
            } else {
              throw new Error('utePopover: positionPopover method --> placement: is undefined');
            }
          };

          /**
           * the method in which the content will be injectedß
           */
          var insertPopoverContent = function () {

            if (popoverInsertMode === 'replace') {
              $target.html($content);
            } else if (popoverInsertMode === 'append') {
              $target.append($content);
            } else if (popoverInsertMode === 'after') {
              $target.after($content);
            } else {
              $target.after($content);
              throw new Error('utePopover: unknown insert mode string: ' + popoverInsertMode + ' --> $scope.popoverInsertMode should be replace, append or after, defaulting to after method');
            }

          };

          /**
           * init entire directive
           */
          var init = function () {

            if (!$window.jQuery || !$window.$) {
              throw new Error('utePopover error: JQuery ($) is not defined, please add JQuery source to the HTML page');
            }

            // so arrow displays properly
            $content.addClass(placement);
            $content.addClass($scope.popoverClass);

            /**
             * whether to remove the content from the DOM when popover closes
             * @type {boolean}
             */
            popoverRemoveSelf = $scope.popoverRemoveSelf || false;

            /**
             * whether to display backdrop/lightbox when the popover is open
             * @type {boolean}
             */
            popoverBackdrop = $scope.popoverBackdrop || true;

            if ($scope.popoverCloseTarget) {

              $element.one('click', function () {
                $scope.show();
              });

            } else {

              $element.on('click', function (e) {
                // if the target is not what was clicked then return false, prevents children from firing click events
                if (e.target !== this) return;
                showToggle = !showToggle;
                showToggle ? $scope.show() : $scope.hide();
              });

            }

          };

          init();

        }
      };

    });

})();

(function () {

  'use strict';

  /**
   * @author Chester Rivas
   * @description extends bootstrap popover component to be able to pass in a partial view or a directive or inline markup
   * @class ute-ui
   * @memberOf ute-ui
   */
  angular.module('ute.ui')

  /**
   * service for utePopover directive that will allow access to the scope of all the directives
   */
    .factory('utePopoverFactory', function () {

      var utePopoverFactory = {

        /**
         * an array of the scope of currently opened popovers
         */
        utePopoverScopes: [],

        /**
         * saves the $scope instance and pushes to rgPopoverScope array
         */
        popCurrentPopover: function (popOverScope) {
          utePopoverFactory.utePopoverScopes = utePopoverFactory.utePopoverScopes || [];
          _.each(utePopoverFactory.utePopoverScopes, function (eachPopOver, index) {
            if (angular.equals(popOverScope, eachPopOver)) {
              utePopoverFactory.utePopoverScopes.slice(index, 1);
            }
          });
        },

        /**
         * pushes the passed in $scope instance and utePopoverFactory level array
         */
        pushCurrentPopover: function (popOverScope) {
          utePopoverFactory.utePopoverScopes = utePopoverFactory.utePopoverScopes || [];
          utePopoverFactory.utePopoverScopes.push(popOverScope);
        },

        /**
         * hides all popovers
         */
        hideAllOpenPopovers: function () {

          _.each(utePopoverFactory.utePopoverScopes, function (eachPopOver) {
            eachPopOver.hide();
          });

          utePopoverFactory.utePopoverScopes = [];

        },

        /**
         * shows all popovers
         */
        showAllOpenPopovers: function () {

          _.each(utePopoverFactory.utePopoverScopes, function (eachPopOver) {
            eachPopOver.show();
          });

        }
      };

      return utePopoverFactory;

    });

})();

(function () {

  'use strict';

  /**
   * @author Ronald Nicolls
   * @ngdoc directive
   * @name uteTable
   * @description uses ngTable to display tables
   * @class ute-ui
   * @memberOf ute-ui
   */
  angular.module('ute.ui')

  /**
   * @class ute-ui.extras.uteTable
   */
    .directive('uteTable', function ($http, $filter, ngTableParams) {

      return {
        restrict: 'EA',
        scope: {
          tableData: '=',
          footerData: '=',
          language: '@',
          itemsPerPage: '=',
          initialSort: '@',
          order: '@',
          tableTemplateFolder: '@'
        },
        transclude: true,
        templateUrl: function ($element, $attrs) {
          var templateFolder = $attrs.tableTemplateFolder || 'views/uteTable/';
          return templateFolder + $attrs.tableBodyTemplate + '.html';
        },
        link: function ($scope) {

          /**
           * @name updateTableData
           * @type {function}
           * @memberOf ute-ui.extras.uteTable
           * @description updates table with new data
           * @param tableData
           */
          var updateTableData = function (tableData) {

            if (angular.isDefined(tableData)) {

              $scope.tableParams = new ngTableParams({
                  page: 1,
                  count: $scope.itemsPerPage >= 0 ? $scope.itemsPerPage : 1000,
                  sorting: {}
                },
                {
                  counts: [],
                  total: tableData.length,
                  getData: function ($defer, params) {
                    var orderedData = params.sorting() ? $filter('orderBy')(tableData, params.orderBy()) : tableData;
                    $defer.resolve(orderedData.slice((params.page() - 1) * params.count(), params.page() * params.count()));
                  }
                });

              /**
               * Adds dynamic sorting param from attribute
               */
              var orderDirection = $scope.order || 'desc';
              $scope.tableParams.$params.sorting[$scope.initialSort] = orderDirection;

              /**
               * Adds dynamic table data update behaviour
               */
              //$scope.tableParams.count(tableData.length);
              $scope.tableParams.count($scope.itemsPerPage >= 0 ? $scope.itemsPerPage : 1000);
              $scope.tableParams.reload();

            }

          };

          $scope.$watch('tableData', updateTableData);

        }

      };
    });

})();

(function () {

  'use strict';

  /**
   * @author Chester Rivas
   * @ngdoc directive
   * @name uteTracking
   * @description directive for matching adobe tagging id on an element and broadcasts an event
   * @class ute-ui
   * @memberOf ute-ui
   */
  angular.module('ute.ui')

    .directive('uteTracking', function ($rootScope, uteTrackingManager, $log, $window, $location) {

      return {
        restrict: 'AE',
        scope: true,
        priority: 1600, // if you have another directive on this same element make sure that the priority is less than 1600
        controller: function ($scope, $element, $attrs) {

          /**
           * @description id of event that matches up to the id in the JSON file
           * @name uteTracking
           * @memberOf ute-ui.tracking
           */
          $scope.uteTracking = $attrs.uteTracking;

          /**
           * @description optional override options for the selected id
           * @name trackOptions
           * @memberOf ute-ui.tracking
           */
          $scope.trackOptions = $scope.$eval($attrs.trackOptions) || {};

          /**
           * set up watcher
           */
          $scope.$watch($attrs.trackOptions, function (newValue, oldValue) {

            if (oldValue !== newValue) {
              $scope.trackOptions = $scope.$eval($attrs.trackOptions);
              if ($scope.type === 'pageload') {
                $scope.sendPageLoadEvent();
              }
            }

          }, true);

          /**
           * @description event listener
           * @name tagsListener
           * @memberOf ute-ui.tracking
           */
          var tagsListener;

          /**
           * @description init
           * @name init
           * @memberOf ute-ui.tracking
           */
          $scope.init = function () {
            // waiting for tags to be ready
            if (!uteTrackingManager.tagsLoaded) {
              tagsListener = $rootScope.$on(uteTrackingManager.events.TAG_DATA_READY, $scope.tagsReady);
            } else {
              $scope.tagsReady(null, uteTrackingManager.uteTags);
            }
          };

          /**
           * @name sendPageLoadEvent
           * @memberOf ute-ui.tracking
           */
          $scope.sendPageLoadEvent = function () {

            return uteTrackingManager.sendPageLoadEvent({
              trackingId: $scope.uteTracking,
              overrideParams: $scope.trackOptions
            });

          };

          /**
           * @name sendClickEvent
           * @memberOf ute-ui.tracking
           */
          $scope.sendClickEvent = function () {

            return uteTrackingManager.sendClickEvent({
              trackingId: $scope.uteTracking,
              overrideParams: $scope.trackOptions
            });

          };

          /**
           * @name prepareEvents
           * @memberOf ute-ui.tracking
           */
          $scope.prepareEvents = function () {

            if ($scope.type === 'click') {

              if ($element[0].tagName === 'A') {

                if (angular.isDefined($attrs.href)) {

                  var link = $attrs.href,
                    clickEvent,
                    afterClick = function () {

                      $element.off('click');

                      // after click event has been sent

                      var immediateFire = function (e) {
                        console.log('-- new click event function --');
                        return true;
                      };

                      $element.on('click', immediateFire);

                      $element.triggerHandler('click');

                    };

                  $element.on('click', function (e) {
                    console.log('-- prevent default (once) --');
                    clickEvent = e;
                    //clickEvent.preventDefault();
                    //clickEvent.stopPropagation();
                    $scope.sendClickEvent();
                    //$scope.sendClickEvent().then(afterClick, afterClick);
                  });

                }

              } else if ($element[0].tagName === 'SELECT') {

                // when an option is selected
                $($element).on('change', function () {

                  var optionText = $($element).find('option:selected').text().toCamelCase(),
                    data = uteTrackingManager.getProp($scope.uteTracking).data;

                  $scope.selectedOption = {};

                  _.each(data, function (prop, key) {

                    var hasReplaceText = (/(<([^>]+)>)/g).test(prop.toString());

                    if (hasReplaceText) {
                      $scope.selectedOption[key] = prop.toString().replace(/(<([^>]+)>)/g, function () {
                        return optionText;
                      });
                    } else {
                      $scope.selectedOption[key] = optionText;
                    }

                  });

                  $scope.sendClickEvent();

                });

              } else {

                $element.on('click', function () {
                  $scope.sendClickEvent();
                });

              }

            } else if ($scope.type === 'pageload') {

              $scope.$watch(function () {
                return $($element).is(':visible');
              }, function () {

                // send event only if DOM element is visible
                if ($($element).is(':visible')) {
                  $scope.sendPageLoadEvent();
                }

              });

            }

          };

          /**
           * @name tagsReady
           * @description populates directive
           * @memberOf ute-ui.tracking
           * @param event - name of event
           * @param tagObject - object containing tag info
           */
          $scope.tagsReady = function (event, tagObject) {

            // set tagObject on scope to get type and prop
            $scope.tagObject = tagObject;

            // get type, either click or pageload
            $scope.type = uteTrackingManager.getType($scope.uteTracking);

            // get target property id
            $scope.selectedProp = uteTrackingManager.getProp($scope.uteTracking);

            if (angular.isUndefinedOrNull($scope.type)) {
              $log.warn('uteTracking error: type does not exist, is it a click or pageload type');
              return;
            }

            if (angular.isUndefinedOrNull($scope.selectedProp)) {
              $log.warn('uteTracking error: ' + $scope.uteTracking + ' does not exist, please look at the source tags JSON file and make sure the ID is an exact match');
              return;
            }

            $scope.prepareEvents();

            // if tagsListener is defined then unregister it
            if (angular.isDefined(tagsListener)) {
              tagsListener();
            }

          };

          $scope.init();

        }
      };

    });

})();

(function () {

  'use strict';

  /**
   * @author Chester Rivas
   * @ngdoc directive
   * @name uteTrackingManager
   * @description handles loading of JSON file and $emits event that is used with uteTag directive
   * @class ute-ui
   * @memberOf ute-ui
   */
  angular.module('ute.ui')

    .factory('uteTrackingManager', function ($rootScope, uteLocale, $http, $log, $window, $document, $interval, $state, $q) {

      /**
       * @description object return by factory
       * @memberOf ute-ui.tracking
       */
      var uteTrackingManager = {};

      /**
       * @description object containing all tag information
       * @memberOf ute-ui.tracking
       */
      uteTrackingManager.uteTags = null;

      /**
       * @description max number of times to retry sending adobe analytic events
       * @memberOf ute-ui.tracking
       * @type {number}
       */
      uteTrackingManager.maxRetries = 3;

      /**
       * @description reference to an interval
       * @memberOf ute-ui.tracking
       */
      uteTrackingManager.interval = null;

      /**
       * @description whether tags json has been loaded
       * @memberOf ute-ui.tracking
       * @type {boolean}
       */
      uteTrackingManager.tagsLoaded = false;

      /**
       * @description object containing default params
       * @memberOf ute-ui.tracking
       * @type {object}
       */
      uteTrackingManager.defaultProps = {
        pageURL: 'prop17',
        stateName: 'prop20',
        idName: 'prop29',
        province: 'prop34',
        language: 'prop35'
      };

      /**
       * @description events dispatched internally within factory
       * @memberOf ute-ui.tracking
       * @type {{ATAGS_READY: string}}
       */
      uteTrackingManager.events = {
        TAG_DATA_READY: 'TAG_DATA_READY'
      };

      /**
       * @description event type constants
       * @memberOf ute-ui.tracking
       * @type {{CLICK: string, PAGELOAD: string}}
       */
      uteTrackingManager.trackingTypes = {
        CLICK: 'click',
        PAGELOAD: 'pageload'
      };

      /**
       * @description string delimited with commas
       * @memberOf ute-ui.tracking
       * @type {string}
       */
      uteTrackingManager.nameSpace = null;

      /**
       * @description window object
       * @memberOf ute-ui.tracking
       * @type {object}
       */
      uteTrackingManager.omni = null;

      /**
       * @description send click adobe tagging click event
       * @name sendClickEvent
       * @memberOf ute-ui.tracking
       * @param tagObject - object containing options for sending events
       * @property {object} tagObject.trackingId
       * @property {object} tagObject.overrideParams
       * @property {object} tagObject.element
       */
      uteTrackingManager.sendClickEvent = function (tagObject) {

        var deferred = $q.defer();

        uteTrackingManager.interval = $interval(function () {

          uteTrackingManager.omni = $window.s;

          if (angular.isDefined(uteTrackingManager.omni && uteTrackingManager.omni.tl)) {

            if (angular.isDefined(tagObject.element)) {
              if ($(tagObject.element).length === 0) {
                $log.warn('uteTrackingManager.sendClickEvent --> could not find element property');
              }
              $(tagObject.element).attr('ute-tracking', tagObject.trackingId);
            }

            var params = uteTrackingManager.getProp(tagObject.trackingId),
              options = _.defaults({}, tagObject.overrideParams, params.data);

            options[uteTrackingManager.defaultProps.stateName] = $state.current.name;
            options[uteTrackingManager.defaultProps.idName] = tagObject.trackingId;
            options[uteTrackingManager.defaultProps.pageURL] = $window.location && $window.location.href ? $window.location.href : $document.URL;
            options[uteTrackingManager.defaultProps.province] = uteLocale.province();
            options[uteTrackingManager.defaultProps.language] = uteLocale.language();

            options.linkTrackVars = _.keys(options).join();

            uteTrackingManager.omni.tl(uteTrackingManager.omni, 'o', tagObject.trackingId, options);

            $interval.cancel(uteTrackingManager.interval);

            deferred.resolve();

          }

        }, 0, uteTrackingManager.maxRetries);

        return deferred.promise;

      };

      /**
       * @description send click adobe tagging pageload event
       * @name sendPageLoadEvent
       * @memberOf ute-ui.tracking
       * @param tagObject - object containing options for sending events
       * @property {object} tagObject.trackingId
       * @property {object} tagObject.overrideParams
       * @property {object} tagObject.element
       */
      uteTrackingManager.sendPageLoadEvent = function (tagObject) {

        var deferred = $q.defer();

        uteTrackingManager.interval = $interval(function () {

          uteTrackingManager.omni = $window.s;

          if (angular.isDefined(uteTrackingManager.omni && uteTrackingManager.omni.t)) {

            if (angular.isDefined(tagObject.element)) {
              if ($(tagObject.element).length === 0) {
                $log.warn('uteTrackingManager.sendPageLoadEvent --> could not find element property');
              }
              $(tagObject.element).attr('ute-tracking', tagObject.trackingId);
            }

            var params = uteTrackingManager.getProp(tagObject.trackingId),
              options = _.defaults({}, tagObject.overrideParams, params.data);

            options[uteTrackingManager.defaultProps.stateName] = $state.current.name;
            options[uteTrackingManager.defaultProps.idName] = tagObject.trackingId;
            options[uteTrackingManager.defaultProps.pageURL] = $window.location && $window.location.href ? $window.location.href : $document.URL;
            options[uteTrackingManager.defaultProps.province] = uteLocale.province();
            options[uteTrackingManager.defaultProps.language] = uteLocale.language();

            options.linkTrackVars = _.keys(options).join();

            uteTrackingManager.omni.t(options);

            $interval.cancel(uteTrackingManager.interval);

            deferred.resolve(uteTrackingManager.uteTags);

          }

        }, 100, uteTrackingManager.maxRetries);

        return deferred.promise;

      };

      /**
       * @name requestTagJSON
       * @description loads JSON and saves to to service scope
       * @param jsonFile
       * @memberOf ute-ui.tracking
       * @returns {promise}
       */
      uteTrackingManager.requestTagJSON = function (jsonFile) {

        if (angular.isUndefinedOrNull(jsonFile)) new Error('uteTrackingManager: you must specify a valid path to a json file containing tagging id information');

        var deferred = $q.defer();

        $http.get(jsonFile).then(function (result) {

          if (!angular.isUndefinedOrNull(uteTrackingManager.nameSpace)) {

            var keys = uteTrackingManager.nameSpace.split(','),
              filteredObject = {};

            _.each(keys, function (k) {
              if (result.data[k]) {
                filteredObject[k] = result.data[k];
              }
            });

            // save entire object to service
            uteTrackingManager.uteTags = filteredObject;

          } else {

            // save entire object to service
            uteTrackingManager.uteTags = result.data;
          }

          // emit event
          $rootScope.$emit(uteTrackingManager.events.TAG_DATA_READY, uteTrackingManager.uteTags);
          uteTrackingManager.tagsLoaded = true;
          deferred.resolve(uteTrackingManager.uteTags);

        }, function (result) {

          $log.warn('could not load json file:', result);

        });

        return deferred.promise;

      };

      /**
       * @name getType
       * @description loops through tagObject and return the key name of the containing object
       * @param trackingId
       * @memberOf ute-ui.tracking
       * @returns {string}
       */
      uteTrackingManager.getType = function (trackingId) {

        if (trackingId.indexOf('pageload') !== -1) {
          return 'pageload';
        } else if (trackingId.indexOf('click') !== -1) {
          return 'click';
        } else {
          console.warn('uteTracking error: uteTracking name not event type pageload and click');
          return null;
        }

      };

      /**
       * @name getProp
       * @description returns the correct prop
       * @param trackingId
       * @memberOf ute-ui.tracking
       * @returns {object}
       */
      uteTrackingManager.getProp = function (trackingId) {

        var selectedProp,
          stopLoop = false;

        _.some(uteTrackingManager.uteTags, function (nameSpace) {
          _.some(nameSpace, function (eventType) {
            _.some(eventType, function (prop, key) {
              if (key === trackingId) {
                selectedProp = prop;
                stopLoop = true;
                return true;
              }
            });
            return stopLoop;
          });
          return stopLoop;
        });

        return selectedProp;

      };

      /**
       * starts the http request for json file containing data for omniture events
       * @param {string} jsonUrl - path to json file
       * @param {string} nameSpace - comma delimited list
       * @returns {promise}
       */
      uteTrackingManager.init = function (jsonUrl, nameSpace) {

        var deferred = $q.defer();
        uteTrackingManager.omni = $window.s;
        uteTrackingManager.nameSpace = nameSpace;
        if (uteTrackingManager.uteTags === null) {
          uteTrackingManager.requestTagJSON(jsonUrl).then(function () {
            deferred.resolve();
          });
        } else {
          $rootScope.$emit(uteTrackingManager.events.TAG_DATA_READY, uteTrackingManager.uteTags);
          deferred.resolve();
        }

        return deferred.promise;

      };

      return uteTrackingManager;

    });

})();

(function () {

  'use strict';

  /**
   * @author Zain Syed | Chester Rivas
   * @ngdoc factory
   * @name uteCartManager
   * @description
   * @class ute-ui
   * @memberOf ute-ui
   */
  angular.module('ute.ui')

    .factory('uteCartManager', function ($rootScope, $q, $state, $http, uteModal, uteEndpoint, uteEnv, uteCoreFactory) {

      var collections = uteCoreFactory.collections;

      var uteCartManager = {};

      /**
       *
       */
      uteCartManager.STATUS = {
        N_A: 'N_A',
        AVAILABLE: 'AVAILABLE',
        SELECTED: 'SELECTED',
        IN_CART: 'IN_CART',
        REMOVED: 'REMOVED'
      };

      /**
       *
       */
      uteCartManager.EVENTS = {
        ADDED_TO_CART: 'ADDED_TO_CART',
        REMOVE_FROM_CART: 'REMOVE_FROM_CART',
        CART_CLEARED: 'CART_CLEARED'
      };

      /**
       * @description get total quantity
       * @returns {*}
       */
      uteCartManager.getQuantity = function () {
        return $rootScope.shoppingCart && $rootScope.shoppingCart.quantity ? $rootScope.shoppingCart.quantity : 0;
      };

      /**
       * @description validate the cart
       * @returns {*}
       */
      uteCartManager.validate = function () {
        var deferred = $q.defer();

        $http({
          url: uteEndpoint('shoppingCart'),
          method: 'POST',
          params: {
            actionType: 'validateCart',
            userId: collections.atg.userId.value,
            samKey: collections.userPref.samKey,
            hashKey: collections.atg.hashKey.value
          }
        }).then(function (data) {
          deferred.resolve(data);
        }, function (data) {
          deferred.reject();
        });

        return deferred.promise;
      };

      /**
       * @description clean all cart items
       * @param silent
       * @returns {*}
       */
      uteCartManager.cleanCart = function (silent) {

        var deferred = $q.defer();

        // only do if cart is not empty
        if (this.getQuantity() > 0) {
          $http({
            url: uteEndpoint('shoppingCart'),
            //url: 'http://10.16.88.67:9000/selfserve/shoppingCart',
            method: 'POST',
            params: {
              'actionType': 'clean',
              'province': collections.userPref.province,
              'samKey': collections.userPref.samKey
            },
            cache: false
          }).then(function (result) {
            // check if clean should be quiet -- don't update $rootScope.shoppingCart on success (mainly for province change pre-req)
            if (angular.isUndefined(silent) || silent === false) {
              $rootScope.shoppingCart = result.data.shoppingCart;
            }

            deferred.resolve(result);
          }, function () {
            deferred.reject();
          });
        } else {
          deferred.resolve({});
        }

        return deferred.promise;

      };

      /**
       * @description modify root or service sub-object; add
       * @param props
       * @param serviceName
       * @returns {*}
       */
      uteCartManager.addMeta = function (props, serviceName) {
        var deferred = $q.defer();

        // reject if shoppingCart doesn't exist
        if (!$rootScope.shoppingCart) {
          deferred.reject();
        }

        // extend the shopping cart
        if (serviceName) {
          _.extend($rootScope.shoppingCart[collections.userPref.language].services[serviceName], props);

          // check if passed prop has been added
          if (_.isMatch($rootScope.shoppingCart[collections.userPref.language].services[serviceName], props)) {
            deferred.resolve(true);
          } else {
            deferred.reject();
          }
        } else {
          _.extend($rootScope.shoppingCart, props);

          if (_.isMatch($rootScope.shoppingCart, props)) {
            deferred.resolve(true);
          } else {
            deferred.reject();
          }
        }

        return deferred.promise;
      };

      /**
       * @description modify root or service sub-object; remove
       * @param propertyName
       * @param serviceName
       * @returns {*}
       */
      uteCartManager.removeMeta = function (propertyName, serviceName) {
        var deferred = $q.defer();

        // reject if shoppingCart doesn't exist
        if (!$rootScope.shoppingCart) {
          deferred.reject();
        }

        // remove from the shopping cart; service/root
        if (serviceName) {
          $rootScope.shoppingCart[collections.userPref.language].services[serviceName] = _.omit($rootScope.shoppingCart[collections.userPref.language].services[serviceName], propertyName);
          deferred.resolve(true);
        } else {
          $rootScope.shoppingCart = _.omit($rootScope.shoppingCart, propertyName);
          deferred.resolve(true);
        }

        return deferred.promise;
      };

      /**
       * @description all internet services
       * @type {{stockInternetTierToCart: Function, tierInCart: Function, swapOffers: Function, removeOffer: Function, addOffer: Function}}
       */
      uteCartManager.internet = {

        stockInternetTierToCart: function (shoppingCart) {
          // for demo purpose, uncomment the following line, then comment all the remaining lines in stockInternetTierToCart function.
          //$rootScope.shoppingCart = { en : { services : { internet : shoppingCart}}};
          $rootScope.shoppingCart = shoppingCart;
          if ($rootScope.shoppingCart && $rootScope.shoppingCart[collections.userPref.language] &&
            $rootScope.shoppingCart[collections.userPref.language].services && $rootScope.shoppingCart[collections.userPref.language].services.internet &&
            $rootScope.shoppingCart[collections.userPref.language].services.internet.tier && $rootScope.shoppingCart[collections.userPref.language].services.internet.tier.length > 0 &&
            $rootScope.shoppingCart[collections.userPref.language].services.internet.tier[0].products && $rootScope.shoppingCart[collections.userPref.language].services.internet.tier[0].products.length > 0) {
            $rootScope.shoppingCart[collections.userPref.language].services.internet.tier[0].selectedOffer = $rootScope.shoppingCart[collections.userPref.language].services.internet.tier[0].products[0].offers[0];
            $rootScope.shoppingCart[collections.userPref.language].services.internet.tier[0].selectedOffer.tierId = $rootScope.shoppingCart[collections.userPref.language].services.internet.tier[0].tierId;
            $rootScope.shoppingCart[collections.userPref.language].services.internet.tier[0].selectedOffer.productId = $rootScope.shoppingCart[collections.userPref.language].services.internet.tier[0].products[0].id;
          }
        },

        // returns tier that's already in cart
        tierInCart: function () {
          if (uteCartManager.getQuantity() > 0 && $rootScope.shoppingCart && $rootScope.shoppingCart[collections.userPref.language] &&
            $rootScope.shoppingCart[collections.userPref.language].services && $rootScope.shoppingCart[collections.userPref.language].services.internet &&
            $rootScope.shoppingCart[collections.userPref.language].services.internet.tier && $rootScope.shoppingCart[collections.userPref.language].services.internet.tier.length > 0) {
            var currentCart = $rootScope.shoppingCart[collections.userPref.language].services.internet.tier[0];

            if (currentCart.selectedOffer)
              return currentCart;
            else if (currentCart.products && currentCart.products.length > 0) {
              currentCart.offers = [];
              for (var i = 0, product; product = currentCart.products[i]; i++) {
                for (var j = 0, offer; offer = product.offers[j]; j++) {
                  offer.productId = product.id;
                  offer.tierId = currentCart.tierId;
                  currentCart.offers.push(offer);
                }
              }
              currentCart.selectedOffer = currentCart.offers[0];

              return currentCart;
            }

            return false;
          }

          return false;
        },

        // swap internet offers
        swapOffers: function (tierIdIn, productIdIn, offerIn, tierIdOut, productIdOut, offerOut) {
          var deferred = $q.defer();
          uteModal.processRequest({
            request: {
              url: uteEndpoint('shoppingCart'),
              //url: 'http://10.16.88.67:9000/selfserve/shoppingCart',
              method: 'POST',
              params: {
                'actionType': 'addAndRemove',
                'province': collections.userPref.province,
                'samKey': collections.userPref.samKey,
                'tierIdIn': tierIdIn,
                'productIdIn': productIdIn,
                'offerIdIn': offerIn,
                'tierIdOut': tierIdOut,
                'productIdOut': productIdOut,
                'offerIdOut': offerOut,
                'userId': collections.atg.userId.value,
                'hashKey': collections.atg.hashKey.value
              },
              cache: false
            }
          }).then(function (result) {
            uteCartManager.internet.stockInternetTierToCart(result.shoppingCart);

            deferred.resolve(result);

          }, function () {
            deferred.reject();
          });

          return deferred.promise;
        },

        // remove offer from cart
        removeOffer: function (tierId, productId, offerId) {

          var deferred = $q.defer(),
            modalConfig = {
              templateUrl: 'uteModal/remove-from-cart.html',
              controller: function ($scope, $modalInstance) {

                $scope.ok = function () {
                  $modalInstance.close();
                };

                $scope.cancel = function () {
                  $modalInstance.dismiss('cancel');
                };

              },
              ok: function () {

                uteModal.processRequest({
                  request: {
                    url: uteEndpoint('shoppingCart'),
                    method: 'POST',
                    params: {
                      'actionType': 'remove',
                      'province': collections.userPref.province,
                      'samKey': collections.userPref.samKey,
                      'tierId': tierId,
                      'productId': productId,
                      'offerId': offerId,
                      'userId': collections.atg.userId.value,
                      'hashKey': collections.atg.hashKey.value
                    },
                    cache: false
                  }
                }).then(function (result) {
                  uteCartManager.internet.stockInternetTierToCart(result.shoppingCart);
                  deferred.resolve(result);
                }, function () {
                  deferred.reject();
                });
              },
              cancel: function () {
              }
            };

          // show modal
          uteModal.open(modalConfig);

          return deferred.promise;

        },

        // add offer to the cart
        addOffer: function (tier) {
          var deferred = $q.defer(),
            tempTier = tier;

          // first check if max quantity for service reached; if so, confirm with user to swap offers
          if (uteCartManager.maxItemsInCart('internet')) {

            var tierInCart = this.tierInCart(),
              modalConfig = {
                oldPackage: 'tier ' + tierInCart.name + ' with offer' + tierInCart.selectedOffer.name,
                newPackage: 'tier ' + tempTier.name + ' with offer ' + tempTier.selectedOffer.name,
                controller: function ($scope, $modalInstance, oldPackage, newPackage) {
                  $scope.ok = function () {
                    $modalInstance.close();
                  };
                  $scope.cancel = function () {
                    $modalInstance.dismiss('cancel');
                  };
                  $scope.oldPackage = oldPackage;
                  $scope.newPackage = newPackage;
                },
                templateUrl: 'uteModal/add-to-cart.html',
                ok: function () {
                  uteCartManager.internet.swapOffers(tempTier.selectedOffer.tierId, tempTier.selectedOffer.productId, tempTier.selectedOffer.offerId, tierInCart.selectedOffer.tierId, tierInCart.selectedOffer.productId, tierInCart.selectedOffer.offerId).then(function () {
                    $state.go('cartSummary');
                  });
                },
                cancel: function () {
                }
              };

            // show modal
            uteModal.open(modalConfig);

          } else {

            uteModal.processRequest({
              request: {
                url: uteEndpoint('shoppingCart'),
                method: 'POST',
                params: {
                  'actionType': 'add',
                  'province': collections.userPref.province,
                  'samKey': collections.userPref.samKey,
                  'tierId': tier.selectedOffer.tierId,
                  'productId': tier.selectedOffer.productId,
                  'offerId': tier.selectedOffer.offerId,
                  'userId': collections.atg.userId.value,
                  'hashKey': collections.atg.hashKey.value
                },
                cache: false
              }
            }).then(function (data) {
              uteCartManager.internet.stockInternetTierToCart(data.shoppingCart);
              deferred.resolve(data);
            }, function (data) {
              deferred.reject();
            });

          }

          return deferred.promise;
        }

      };

      /**
       * @description fetch shopping cart data
       * @returns {*}
       */
      uteCartManager.fetch = function () {

        // do fetch only if userId and hashKey are not 'default'
        var deferred = $q.defer();

        $http({
          url: uteEndpoint('shoppingCart'),
          method: 'POST',
          params: {
            'actionType': 'fetch',
            'province': collections.userPref.province,
            'samKey': collections.userPref.samKey,
            'userId': collections.atg.userId.value,
            'hashKey': collections.atg.hashKey.value,
            'auid': collections.userPref.auId
          },
          cache: false
        }).then(function (result) {
          uteCartManager.internet.stockInternetTierToCart(result.data.shoppingCart);
          deferred.resolve(result);
        }, function (data) {
          deferred.reject();
        });

        return deferred.promise;

      };

      /**
       * @description
       * @param status
       * @returns {boolean}
       */
      uteCartManager.statusSelected = function (status) {
        return angular.isUndefined(status) ? false : angular.stringContains(status, uteCartManager.STATUS.SELECTED);
      };

      /**
       * @description
       * @param status
       * @returns {boolean}
       */
      uteCartManager.statusInCart = function (status) {
        return angular.isUndefined(status) ? false : angular.stringContains(status, uteCartManager.STATUS.IN_CART);
      };

      /**
       * @description
       * @param status
       * @returns {boolean}
       */
      uteCartManager.statusAvailable = function (status) {
        return angular.isUndefined(status) ? false : angular.stringContains(status, uteCartManager.STATUS.AVAILABLE);
      };

      /**
       * @description returns boolean based on whether max has been reached for a service
       * @param service
       * @returns {boolean}
       */
      uteCartManager.maxItemsInCart = function (service) {

        var max = {
          internet: 1
        };

        if (uteCartManager.getQuantity() > 0) {
          return $rootScope.shoppingCart[collections.userPref.language].services[service].quantity >= max[service];
        }

        return false;

      };

      return uteCartManager;

    });

})();

(function () {

  'use strict';

  /**
   * @author Zain Syed
   * @ngdoc directive
   * @name uteMiniCart
   * @description
   * @class ute-ui
   * @memberOf ute-ui
   */
  angular.module('ute.ui')

    .directive('uteMiniCart', function () {

      return {
        restrict: 'AE',
        scope: true,
        replace: true,
        bindToController: true,
        templateUrl: 'uteMiniCart/mini-cart.html',
        controllerAs: 'uteMiniCartCtrl'
      };

    });

})();

(function () {

  'use strict';

  /**
   * @author Zain Syed
   * @ngdoc directive
   * @name uteMiniCartCtrl
   * @description
   * @class ute-ui
   * @memberOf ute-ui
   */
  angular.module('ute.ui')

    .controller('uteMiniCartCtrl', function ($scope, $rootScope, $state, $location, commonService, utePopoverFactory, uteModal, uteCartManager, uteCoreFactory) {

      /**
       * @description watch for changes for $rootScope.shoppingCart
       */
      $rootScope.$watch('shoppingCart', function (newShoppingCart) {
        $scope.cartItems = newShoppingCart;
      });

      /**
       * TODO lang
       */
      $scope.lang = uteCoreFactory.collections.userPref.language;

      /**
       * TODO totalPriceFrequency
       * @type {string}
       */
      $scope.totalPriceFrequency = 'monthly';

      /**
       * @description removes an item from a cart
       * @param tierId
       * @param productId
       * @param offerId
       * @type {function}
       */
      $scope.removeOfferFromCart = function (tierId, productId, offerId) {
        uteCartManager.internet.removeOffer(tierId, productId, offerId).then(function () {
          //noop
        });
      };

      /**
       * if currently on cart summary page
       * @returns {boolean}
       */
      $scope.isCartSummary = function () {
        return angular.isDefined($state) && angular.isDefined($state.current.name) && $state.current.name === 'cartSummary';
      };

      /**
       * @description called by cart-summary.html
       *      fire analytics click event
       *      goes back to the internet state
       * @type {function}
       */
      $scope.editCart = function () {

        angular.isDefined($state) && $state.go('internet');

      };

      /**
       * TODO checkout
       * @type {function}
       */
      $scope.checkout = function () {

        var _route = 'buy';

        // close popover before leaving
        utePopoverFactory.hideAllOpenPopovers();

        $scope.processCheckout(_route);

      };

    });

})();

(function () {

  'use strict';

  /**
   * @author Zain Syed
   * @ngdoc directive
   * @name uteFooter
   * @description
   * @class ute-ui
   * @memberOf ute-ui
   */

})();

(function () {

  'use strict';

  /**
   * @author Zain Syed | Manpreet Bhinder
   * @ngdoc directive
   * @name uteLanguageSelector
   * @description
   * @class ute-ui
   * @memberOf ute-ui
   */
  angular.module('ute.ui')

    .directive('uteLanguageSelector', function ($rootScope) {

      console.log('--> uteLanguageSelector');

      return {
        scope: true,
        replace: true,
        templateUrl: 'uteLanguageSelector/language-selector.html',
        restrict: 'E',
        link: function ($scope) {

          /**
           * object of options
           * @type {{en: string, fr: string}}
           */
          $scope.languages = {
            en: 'English',
            fr: 'Français'
          };

          /**
           * toggles between two languages en/fr
           */
          $scope.changeLanguage = function () {
            if ($rootScope.rui.language === 'en') {
              $rootScope.rui.language = 'fr';
            } else if ($rootScope.rui.language === 'fr') {
              $rootScope.rui.language = 'en';
            }
          };

        }
      };

    });

})();

(function () {

  'use strict';

  /**
   * @author Zain Syed | Manpreet Bhinder
   * @ngdoc constant
   * @name provinceMeta
   * @description
   * @class ute-ui
   * @memberOf ute-ui
   */

  // declare provinceMeta as angular constant provinceMeta ONLY if not previously defined by cms
  if (_.isUndefined(window.provinceMeta)) {

    angular.module('ute.ui')
      .constant('uteProvinceMeta', {
        'ab': {
          'services': ['support', 'rewards'],
          'ageOfMajority': 18,
          'driversLicense': '(\\d{6}\\-\\d{3})',
          'language': 'en'
        },
        'bc': {
          'services': ['support', 'rewards'],
          'driversLicense': '(\\d{7})',
          'ageOfMajority': 19,
          'language': 'en'
        },
        'mb': {
          'services': ['support', 'rewards'],
          'ageOfMajority': 18,
          'driversLicense': '([a-zA-Z]{2}\\-[a-zA-Z]{2}\\-[a-zA-Z]{2}\\-[a-zA-Z]{1}\\d{3}[a-zA-Z]{2})',
          'language': 'en'
        },
        'nb': {
          'services': ['support', 'rewards'],
          'ageOfMajority': 18,
          'driversLicense': '(\\d{7})',
          'language': 'en'
        },
        'nl': {
          'services': ['support', 'rewards'],
          'driversLicense': '([a-zA-Z]{1}\\d{9})',
          'ageOfMajority': 19,
          'language': 'en'
        },
        'ns': {
          'services': ['support', 'rewards'],
          'driversLicense': '([a-zA-Z]{5}\\d{9})',
          'ageOfMajority': 19,
          'language': 'en'
        },
        'on': {
          'services': ['internet', 'support', 'rewards', 'iptv'],
          'ageOfMajority': 18,
          'driversLicense': '([a-zA-Z]{1}\\d{4}\\-\\d{5}\\-\\d{5})',
          'language': 'en'
        },
        'pe': {
          'services': ['support', 'rewards'],
          'ageOfMajority': 18,
          'driversLicense': '(\\d{1,6})',
          'language': 'en'
        },
        'qc': {
          'services': ['support', 'rewards'],
          'ageOfMajority': 18,
          'driversLicense': '([a-zA-Z]{1}\\d{4}\\-\\d{6}\\-\\d{2})',
          'language': 'fr'
        },
        'sk': {
          'services': ['support', 'rewards'],
          'ageOfMajority': 18,
          'driversLicense': '(\\d{8})',
          'language': 'en'
        }
      });
  } else {

    angular.module('ute.ui')
      .constant('uteProvinceMeta', window.provinceMeta);

  }

})();

(function () {

  'use strict';

  /**
   * @author Zain Syed | Manpreet Bhinder
   * @ngdoc directive
   * @name uteProvinceSelector
   * @description
   * @class ute-ui
   * @memberOf ute-ui
   */
  angular.module('ute.ui')

    .directive('uteProvinceSelector', function () {

      console.log('--> uteProvinceSelector');

      return {
        restrict: 'E',
        scope: true,
        replace: true,
        bindToController: true,
        templateUrl: 'uteProvinceSelector/province-selector.html',
        controllerAs: 'uteProvinceSelectorCtrl'
      };

    });

})();

(function () {

  'use strict';

  /**
   * @author Zain Syed | Manpreet Bhinder
   * @ngdoc controller
   * @name provinceSelectorCtrl
   * @description
   * @class ute-ui
   * @memberOf ute-ui
   */
  angular.module('ute.ui')

    .controller('uteProvinceSelectorCtrl', function ($scope, $element, $rootScope, $state, uteModal, uteMiniCartCtrl, uteProvinceServices) {

      // prevent action from the anchors in the dom
      $($element).on('click', function (e) {
        e.preventDefault();
      });

      // get list of provinces
      $scope.provinces = _.keys(uteProvinceServices);

      // get selected province from rui object
      $scope.selectedProvince = $rootScope.rui.province;

      // update rootscope, set samkey as default
      var updateProvince = function (province) {
        uteMiniCartCtrl.cleanCart(true)
          .then(function () {
            $rootScope.rui.samKey = 'default';
            $rootScope.atg = {
              userId: {
                value: 'default'
              },
              hashKey: {
                value: 'default'
              }
            };
            $rootScope.rui.province = province;
          });
      };

      // check with user if switching to a province that doesn't have the current service is ok
      var checkProvinceFootPrint = function (province) {

        var requiredService = null;
        if ($state.current.data && $state.current.data.service) {
          requiredService = $state.current.data.service;
        }

        // if the requested province doesn't have current footprint, prompt user
        if (requiredService && !$rootScope.ruiMethods.serviceAvailable(requiredService, province)) {
          uteModal.open({
            title: 'Service Not Available on Province Selected',
            message: 'Unfortunately ' + requiredService + ' is not available in ' + (province).toUpperCase() + '.',
            ok: function () {
              updateProvince(province);
            },
            cancel: function () {
              $scope.selectedProvince = $rootScope.rui.province;
            },
            okButtonLabel: 'View Services Available in ' + (province).toUpperCase()
          });
        } else {
          updateProvince(province);
        }
      };


      // update province method
      $scope.saveProvince = function (province) {

        // check if province is being called from the directive or outside
        if (angular.isUndefined(province)) {
          province = $scope.selectedProvince;
        }

        // first check if the shopping cart is empty; prompt user if it isn't
        if (uteMiniCartCtrl.getQuantity() > 0) {
          uteModal.open({
            title: 'Caution',
            message: 'Your shopping cart will be empty if you decide to change the province.',
            ok: function () {
              checkProvinceFootPrint(province, true);
            },
            cancel: function () {
              $scope.selectedProvince = $rootScope.rui.province;
            }
          });
          return;
        }

        checkProvinceFootPrint(province);

      };

    });

})();

(function () {

  'use strict';

  /**
   * @author Zain Syed | Manpreet Bhinder
   * @ngdoc directive
   * @name uteProvinceService
   * @description
   * @class ute-ui
   * @memberOf ute-ui
   */

  angular.module('ute.ui')

    .factory('uteProvinceService', function ($rootScope, uteModal, $state, $translate, $q, uteMiniCartCtrl, uteProvinceMeta, uteCoreFactory) {

      console.log('factory --> uteProvinceService');

      // get list of provinces
      var provinces = _.keys(uteProvinceMeta),
        collections = uteCoreFactory.collections;

      var provinceService = {
        // update rootscope, set samkey as default
        update: function (province) {
          uteMiniCartCtrl.cleanCart(true).then(function () {
            collections.userPref.samKey = 'default';
            collections.atg = {
              userId: {
                value: 'default'
              },
              hashKey: {
                value: 'default'
              }
            };
            collections.userPref.province = province;
          });
        },

        // check with user if switching to a province that doesn't have the current service is ok
        checkFootPrint: function (province) {

          var requiredService = null, deferred = $q.defer();

          // check if there is a service dependency for this state
          if ($state.current.data && $state.current.data.service) {
            requiredService = $state.current.data.service;
          }

          // if the requested province doesn't have current footprint, prompt user
          if (requiredService && !$rootScope.ruiMethods.serviceAvailable(requiredService, province)) {
            var promises = [
              $translate('non-serviceable-province-modal-heading'),
              $translate('non-serviceable-province-modal-message'),
              $translate('service-' + requiredService),
              $translate('global.province.' + province + '.name'),
              $translate('non-serviceable-province-modal-right-button'),
              $translate('global.province.' + province + '.abbrev')
            ];
            $q.all(promises).then(function (responses) {
              uteModal.open({
                title: responses[0],
                message: responses[1].replace('[service]', responses[2]).replace('[prov]', responses[3]),
                ok: function () {
                  // return resolved promise
                  deferred.resolve(province);
                },
                cancel: function () {
                  // return rejected promise
                  deferred.reject($rootScope.rui.province);
                },
                okButtonLabel: (responses[5] === 'BC') ? responses[4].replace('[prov]', 'B.C.') : responses[4].replace('[prov]', responses[5])
              });
            });
          } else {
            deferred.resolve(province);
          }

          return deferred.promise;
        }
      };

      return provinceService;

    });

})();

(function () {

  'use strict';

  /**
   * @author Zain Syed
   * @ngdoc directive
   * @name uteGlobalSearch
   * @description
   * @class ute-ui
   * @memberOf ute-ui
   */

  angular.module('ute.ui')

    .directive('uteGlobalSearch', function (uteModal) {
      return {
        restrict: 'E',
        scope: {
          templateUrl: '@'
        },
        template: '<div ng-click="openSearch()"><i class="ute-icon-search"></i></div>',
        controller: function ($scope) {

          $scope.openSearch = function () {

            uteModal.open({
              templateUrl: 'views/uteModal/global-search.html',
              //controller: 'customModalCtrl',
              message: 'text for custom modal',
              listOfStuff: [10, true, 20, 'apples'],
              ok: function () {
                $scope.modalClickedOk = true;
              },
              cancel: function () {
                $scope.modalClickedCancel = true;
              }
            });

          };

        }

      };

    });

})();

/* Directive */

(function () {
  'use strict';

  /**
   * @author Dahang Xu
   * @description Directive of Semafone CreditCard
   * @class ute-ui
   * @memberOf ute-ui
   */

  angular.module('ute.ui')
    .directive('uteSemafoneCreditCard', _directive);

  function _directive() {
    var directive = {
      restrict: 'AE',
      templateUrl: 'bower_components/ute-ui/dist/views/semafone-creditcard.html',
      scope: true,
      replace: false,
      controller: 'uteSemafoneCreditCardCtrl',
      controllerAs: 'sm',
      bindToController: true
    };
    return directive;
  }
})();

(function () {
  'use strict';

  /**
   * @author Dahang Xu
   * @description factory of SemafoneCreditCardService load Semafone URL
   * @class ute-ui
   * @memberOf ute-ui
   */

  angular.module('ute.ui')
    .factory('uteSemafoneCreditCardService', _service);

  _service.$inject = ['env'];

  /* @ngInject */
  function _service(env) {

    var service = {
      loadSemafoneCapturePageUrl: loadSemafoneCapturePageUrl
    };

    return service;

    function loadSemafoneCapturePageUrl(maskedCardNumber, isPanFocusedOnInitialise, isPanResetOnInitialFocus) {
      var semafoneUrl = env.semafoneParameters.semafoneUrl;
      var semafoneMode = env.semafoneParameters.semafoneMode;
      var gatewayId = env.semafoneParameters.gatewayId;
      var methodId = env.semafoneParameters.methodId;
      var ppUserId = env.semafoneParameters.ppUserId;
      var ppPassword = env.semafoneParameters.ppPassword;
      var tenantId = env.semafoneParameters.tenantId;
      var clientId = env.semafoneParameters.clientId;
      var accountId = env.semafoneParameters.accountId;
      var principle = env.semafoneParameters.principle;
      var licenseCode = env.semafoneParameters.licenseCode;
      var transactionType = env.semafoneParameters.transactionType;
      var responseType = env.semafoneParameters.responseType;
      var responseURL = env.semafoneParameters.responseURL;
      // var lang = localStorage();
      var lang = 'en'; // Need to read it from local storage
      //var isPanFocusedOnInitialise = false;
      var elementFontSize = '18';
      var elementWidth = '400';
      var elementMaxLength = '16';
      var maskedPan = env.semafoneParameters[lang];
      var url = '';

      //if (angular.element('#maskedCardNumber').length > 0 && angular.element('#maskedCardNumber').val().length >
      //    0) {
      //    maskedPan = angular.element('#maskedCardNumber').val();
      //}
      if (maskedCardNumber.length > 0) {
        maskedPan = maskedCardNumber;
      }
      //alert("inside maskedPan : "+maskedPan);
      // var isPanFocusedOnInitialise = false;

      //if (angular.element('#isPanFocusedOnInitialise').length > 0 && angular.element(
      //        '#isPanFocusedOnInitialise').val().length > 0) {
      //    isPanFocusedOnInitialise = angular.element('#isPanFocusedOnInitialise').val();
      //}

      //var isPanResetOnInitialFocus = true;
      //
      //if (angular.element('#isPanResetOnInitialFocus').length > 0 && angular.element(
      //        '#isPanResetOnInitialFocus').val().length > 0) {
      //    isPanResetOnInitialFocus = angular.element('#isPanResetOnInitialFocus').val();
      //}

      //alert('isPanResetOnInitialFocus  :: '+isPanResetOnInitialFocus);

      if (semafoneMode != 'UNKNOWN' && methodId != 'UNKNOWN') {
        if (methodId == 'TOKENISE') {
          if (semafoneMode == 'DISABLED') {
            url = semafoneUrl + '?semafoneMode=' + semafoneMode +
              '&gatewayId=' + gatewayId + '&methodId=' + methodId +
              '&ppUserId=' + ppUserId + '&ppPassword=' + ppPassword +
              '&tenantId=' + tenantId + '&clientId=' + clientId +
              '&accountId=' + accountId + '&principle=' + principle +
              '&licenseCode=' + licenseCode + '&responseType=' + responseType +
              '&transactionType=' + transactionType + '&maskedPan=' +
              maskedPan + '&isPanFocusedOnInitialise=' +
              isPanFocusedOnInitialise + '&isPanResetOnInitialFocus=' +
              isPanResetOnInitialFocus + '&elementFontSize=' +
              elementFontSize + '&elementWidth=' + elementWidth +
              '&elementMaxLength=' + elementMaxLength + '&responseURL=' +
              responseURL;
            // alert('url :: '+url);
            return url;
          } else {
            //Error condition: Invalid semafoneMode
          }
        } else {
          //Error condition: Invalid methodId
        }
      } else {
        //Error condition: methodId or semafoneMode not specified
      }

    }
  }
})();

/* Controller */

(function () {
  'use strict';

  /**
   * @author Dahang Xu
   * @description Controller of Semafone CreditCard
   * @class ute-ui
   * @memberOf ute-ui
   */

  angular.module('ute.ui')
    .controller('uteSemafoneCreditCardCtrl', _controller);

  _controller.$inject = ['$scope', '$sce',
    'uteSemafonePaymentService', 'uteSemafoneCreditCardService', 'uteSemafoneService'
  ];

  /* @ngInject */
  function _controller($scope, $sce, uteSemafonePaymentService,
                       uteSemafoneCreditCardService, uteSemafoneService) {

    var vm = this; // jshint ignore:line
    vm.isNotValidCard = false;
    vm.isCybersourceError = false;
    vm.months, vm.years;
    vm.cards = {};
    vm.creditPaymentObj = {};
    vm.validateSecurityCode = validateSecurityCode;
    vm.validateExpireDate = validateExpireDate;
    vm.callDigest = callDigest;

    vm.semafoneIframeUrl;
    vm.payNowRule = {};
    vm.decodeSpaces = decodeSpaces;

    vm.loadSemafoneCapturePageIframe = loadSemafoneCapturePageIframe;
    vm.semafoneCapturePageEventHandlers = semafoneCapturePageEventHandlers;
    vm.listenSemafoneCaptureIframeEvents = listenSemafoneCaptureIframeEvents;

    vm.token = '';
    vm.cardScheme = '';
    vm.maskedCardNumber = '';
    vm.semafoneTokeniseErrorCode = '';
    vm.semafoneTokeniseReasonCode = '';
    vm.isPanResetOnInitialFocus = true;
    vm.isPanFocusedOnInitialise = false;
    vm.semafoneTokeniseResponseCode = '';
    vm.semafoneTokeniseErrorDesc = '';
    vm.semafoneValidationState = '';
    vm.semafoneState = '';
    vm.cybersourceTokeniseResponseCode = '';
    vm.cybersourceTokeniseReasonCode = '';
    vm.cybersourceTokeniseMessage = '';
    vm.cybersourceTokeniseErrorCause = '';

    activate();

    function activate() {
      vm.months = uteSemafonePaymentService.months;
      vm.years = uteSemafonePaymentService.expireYears();
      vm.cards = {
        visa: {
          id: 0,
          name: 'VISA',
          image: '/html-fido/cms/ute/fido/images/visa.png'
        },
        mc: {
          id: 1,
          name: 'MASTER',
          image: '/html-fido/cms/ute/fido/images/mc.png'
        },
        amex: {
          id: 2,
          name: 'AMEX',
          image: '/html-fido/cms/ute/fido/images/am.png'
        }
      };

      vm.creditPaymentObj = {
        creditCardType: null,
        creditCardNo: null,
        expireDate: {
          month: null,
          year: null
        },
        securityCode: null
      };
      vm.semafoneIframeUrl = getSemafoneIframeUrl();

      vm.payNowRule = {
        amount: {
          type: 'number',
          min: 0.01
        },
        ccNumber: {
          pattern: '([0-9]{4}[ -]?){4}'
        },
        expMonth: {
          type: 'number',
          min: 1,
          max: 12
        },
        expYear: {
          type: 'number',
          min: 2015,
          max: 2025
        },
        securityCode: {
          type: 'number',
          minlength: 3,
          maxlength: 4
        },
        ccName: {
          pattern: 'VISA|MASTER|AMEX'
        }
      };

      vm.listenSemafoneCaptureIframeEvents();
    }

    function validateSecurityCode() {

    }

    function validateExpireDate() {
    }

    function callDigest() {
      if (!$scope.$$phase) {
        //$digest or $apply to make sure that the view is getting updated when scope changes
        $scope.$digest();
      }
    }

    //alert('Semafone got loaded');
    function getSemafoneIframeUrl() {
      var _semafoneIframeUrl = $sce.trustAsHtml(
        '<iframe src="' + $sce.trustAsResourceUrl(
          uteSemafoneCreditCardService.loadSemafoneCapturePageUrl(vm.maskedCardNumber, vm.isPanFocusedOnInitialise, vm.isPanResetOnInitialFocus) + '#' +
          encodeURIComponent(document.location.href)) +
        '" class="ute-input-text", scrolling="no" transparency="true" offset="0" border="0" outline="0" frameBorder="0" frameborder="0" marginwidth="0" marginheight="0"><\/iframe>'
      );
      return _semafoneIframeUrl;
    }

    /*$scope.semafoneIframeUrl = $sce.trustAsResourceUrl(semafoneCreditCardService.loadSemafoneCapturePageUrl()+ "#" + encodeURIComponent(document.location.href));*/


    function decodeSpaces(s) {
      s = s.replace(/\+/g, ' ');
      return s;
    }

    function loadSemafoneCapturePageIframe() {
      //alert("loadSemafoneCapturePageIframe");
      vm.semafoneIframeUrl = '';
      vm.callDigest();
      vm.semafoneIframeUrl = $sce.trustAsHtml('<iframe src="' +
        $sce.trustAsResourceUrl(uteSemafoneCreditCardService.loadSemafoneCapturePageUrl(vm.maskedCardNumber, vm.isPanFocusedOnInitialise, vm.isPanResetOnInitialFocus) +
          '#' + encodeURIComponent(document.location.href)) +
        '" class="ute-input-text", scrolling="no" transparency="true" offset="0" border="0" outline="0" frameBorder="0" frameborder="0" marginwidth="0" marginheight="0"><\/iframe>'
      );
      /*$scope.semafoneIframeUrl = $sce.trustAsResourceUrl(semafoneCreditCardService.loadSemafoneCapturePageUrl()+ "#" + encodeURIComponent(document.location.href));*/
      vm.callDigest();
      console.log('$scope.semafoneIframeUrl :: ' + vm.semafoneIframeUrl);
      vm.listenSemafoneCaptureIframeEvents();
    }

    function semafoneCapturePageEventHandlers(semafoneEvents) {

      //angular.element('#semafone-iframe').contents().find('#pan').css({
      //    border: 0,
      //    height: 35 + 'px',
      //    outline: 0
      //});

      if (semafoneEvents.semafoneState && semafoneEvents.semafoneState.length >
        0) {
        //angular.element('#semafoneState').val(semafoneEvents.semafoneState);
        vm.semafoneState = semafoneEvents.semafoneState;

      }
      if (semafoneEvents.semafoneValidationState && semafoneEvents.semafoneValidationState
          .length > 0) {
        //angular.element('#semafoneValidationState').val(semafoneEvents.semafoneValidationState);
        vm.semafoneValidationState = semafoneEvents.semafoneValidationState;
      }
      if (semafoneEvents.semafoneValidationErrorCode && semafoneEvents.semafoneValidationErrorCode
          .length > 0) {
        //angular.element('#semafoneValidationErrorCode').val(semafoneEvents.semafoneValidationErrorCode);
        vm.semafoneValidationErrorCode = semafoneEvents.semafoneValidationErrorCode;
      } else {
        //angular.element('#semafoneValidationErrorCode').val('');
        vm.semafoneValidationErrorCode = '';
      }

      if (semafoneEvents.semafoneValidationErrorDesc && semafoneEvents.semafoneValidationErrorDesc
          .length > 0) {
        //angular.element('#semafoneValidationErrorDesc').val(semafoneEvents.semafoneValidationErrorDesc);
        vm.semafoneValidationErrorDesc = semafoneEvents.semafoneValidationErrorDesc;
      } else {
        //angular.element('#semafoneValidationErrorDesc').val('');
        vm.semafoneTokeniseErrorDesc = '';
      }

      if ((semafoneEvents.semafoneState && semafoneEvents.semafoneState
          .length > 0 && semafoneEvents.semafoneState == 'ACTIVE')) {

        //angular.element('#token').val('');
        //angular.element('#cardScheme').val('');
        //angular.element('#maskedCardNumber').val('');
        vm.token = '';
        vm.cardScheme = '';
        vm.maskedCardNumber = '';
        //angular.element('#semafoneTokeniseReasonCode').val('');
        //angular.element('#semafoneTokeniseResponseCode').val('');
        //angular.element('#semafoneTokeniseErrorCode').val('');
        //angular.element('#semafoneTokeniseErrorDesc').val('');
        //angular.element('#cybersourceTokeniseResponseCode').val('');
        //angular.element('#cybersourceTokeniseReasonCode').val('');
        //angular.element('#cybersourceTokeniseMessage').val('');
        //angular.element('#cybersourceTokeniseErrorCause').val('');

        vm.semafoneTokeniseReasonCode = '';
        vm.semafoneTokeniseResponseCode = '';
        vm.semafoneTokeniseErrorCode = '';
        vm.semafoneTokeniseErrorDesc = '';
        vm.cybersourceTokeniseResponseCode = '';
        vm.cybersourceTokeniseReasonCode = '';
        vm.cybersourceTokeniseMessage = '';
        vm.cybersourceTokeniseErrorCause = '';

        uteSemafoneService.setToken('');
        uteSemafoneService.setCardScheme('');
        uteSemafoneService.setMaskedCardNumber('');
        uteSemafoneService.setSemafoneValidationState('Unknown');
        uteSemafoneService.setExpectedSecurityCodeLength('');
        vm.isNotValidCard = false;
        vm.isCybersourceError = false;
        vm.creditPaymentObj.creditCardType = null;
        vm.callDigest();

      }
      if (semafoneEvents.semafoneState && semafoneEvents.semafoneState.length >
        0 && semafoneEvents.semafoneState != 'COMPLETE') {
        //angular.element('#semafoneState').val(semafoneEvents.semafoneState);
        vm.semafoneState = semafoneEvents.semafoneState;
      }
      if (semafoneEvents.semafoneValidationState && semafoneEvents.semafoneValidationState
          .length > 0 && semafoneEvents.semafoneValidationState !=
        'SUCCESS') {
        //angular.element('#semafoneValidationState').val(semafoneEvents.semafoneValidationState);
        vm.semafoneValidationState = semafoneEvents.semafoneValidationState;

      }
      if (semafoneEvents.semafoneValidationState && semafoneEvents.semafoneValidationState
          .length > 0 && semafoneEvents.semafoneValidationState == 'FAIL'
      ) {
        uteSemafoneService.setToken('');
        uteSemafoneService.setMaskedCardNumber('');
        uteSemafoneService.setCardScheme('');
        uteSemafoneService.setSemafoneValidationState('FAIL');
        vm.isNotValidCard = true;
        vm.isCybersourceError = false;
        vm.creditPaymentObj.creditCardType = null;
        vm.callDigest();
      }

      if (semafoneEvents.semafoneReasonCode && semafoneEvents.semafoneReasonCode
          .length > 0) {
        //angular.element('#semafoneTokeniseReasonCode').val(semafoneEvents.semafoneReasonCode);
        vm.semafoneTokeniseReasonCode = semafoneEvents.semafoneReasonCode;
      }

      if (semafoneEvents.semafoneResponseCode && semafoneEvents.semafoneResponseCode
          .length > 0) {
        //angular.element('#semafoneTokeniseResponseCode').val(semafoneEvents.semafoneResponseCode);
        vm.semafoneTokeniseResponseCode = semafoneEvents.semafoneResponseCode;
        if (semafoneEvents.semafoneResponseCode != 'SUCCESS' && (!
            semafoneEvents.serviceResponseCode || semafoneEvents.serviceResponseCode
            .length < 1)) {
          //angular.element('#isPanResetOnInitialFocus').val(true);
          vm.isPanResetOnInitialFocus = true;
          vm.loadSemafoneCapturePageIframe();
          //launchSemafoneCapturePage('semafoneCapturePage');
        }
      }
      if (semafoneEvents.semafoneErrorCode && semafoneEvents.semafoneErrorCode
          .length > 0) {
        angular.element('#semafoneTokeniseErrorCode').val(semafoneEvents.semafoneErrorCode);
        if (semafoneEvents.semafoneErrorCode == 200101 ||
          semafoneEvents.semafoneErrorCode == 201999) {
          //$('#error404').css('display','block');
          vm.isCybersourceError = true;
          vm.callDigest();
        }
      }
      if (semafoneEvents.semafoneErrorCause && semafoneEvents.semafoneErrorCause
          .length > 0) {
        //angular.element('#semafoneTokeniseErrorDesc').val(semafoneEvents.semafoneErrorCause);
        vm.semafoneTokeniseErrorDesc = semafoneEvents.semafoneErrorCause;
      }
      if (semafoneEvents.serviceResponseCode && semafoneEvents.serviceResponseCode
          .length > 0) {
        //angular.element('#cybersourceTokeniseResponseCode').val(semafoneEvents.serviceResponseCode);
        vm.cybersourceTokeniseResponseCode = semafoneEvents.serviceResponseCode;
        if (semafoneEvents.serviceResponseCode != 100) {
          //angular.element('#isPanResetOnInitialFocus').val(true);
          vm.isPanResetOnInitialFocus = true;
          vm.loadSemafoneCapturePageIframe();
          //launchSemafoneCapturePage('semafoneCapturePage');
        }
      }
      if (semafoneEvents.serviceErrorCause && semafoneEvents.serviceErrorCause
          .length > 0) {
        //angular.element('#cybersourceTokeniseErrorCause').val(semafoneEvents.serviceErrorCause);
        vm.cybersourceTokeniseErrorCause = semafoneEvents.serviceErrorCause;
      }
      if (semafoneEvents.serviceReasonCode && semafoneEvents.serviceReasonCode
          .length > 0) {
        //angular.element('#cybersourceTokeniseReasonCode').val(semafoneEvents.serviceReasonCode);
        vm.cybersourceTokeniseReasonCode = semafoneEvents.serviceReasonCode;
      }
      if (semafoneEvents.serviceMessage && semafoneEvents.serviceMessage
          .length > 0) {
        //angular.element('#cybersourceTokeniseMessage').val(semafoneEvents.serviceMessage);
        vm.cybersourceTokeniseMessage = semafoneEvents.serviceMessage;
      }

      if (semafoneEvents.semafoneState && semafoneEvents.semafoneState.length >
        0 && semafoneEvents.semafoneState == 'COMPLETE' &&
        semafoneEvents.semafoneValidationState && semafoneEvents.semafoneValidationState
          .length > 0 && semafoneEvents.semafoneValidationState ==
        'SUCCESS') {
        //alert('Inside Complete & Success');
        uteSemafoneService.setSemafoneValidationState('SUCCESS');
        if (semafoneEvents.cardScheme && semafoneEvents.cardScheme.length >
          0) {
          //angular.element('#cardScheme').val(semafoneEvents.cardScheme);
          vm.cardScheme = semafoneEvents.cardScheme;
          if (semafoneEvents.token && semafoneEvents.token.length > 0) {
            uteSemafoneService.setCardScheme(semafoneEvents.cardScheme);
          }
        }
        if (semafoneEvents.token && semafoneEvents.token.length > 0) {
          //angular.element('#token').val(semafoneEvents.token);
          vm.token = semafoneEvents.token;
          uteSemafoneService.setToken(semafoneEvents.token);
        }

        if (semafoneEvents.expectedSecurityCodeLength && semafoneEvents.expectedSecurityCodeLength.length > 0) {
          uteSemafoneService.setExpectedSecurityCodeLength(semafoneEvents.expectedSecurityCodeLength);
        }

        if (semafoneEvents.maskedPan && semafoneEvents.maskedPan.length >
          0) {
          //angular.element('#maskedCardNumber').val(semafoneEvents.maskedPan);
          vm.maskedCardNumber = semafoneEvents.maskedPan;
          uteSemafoneService.setMaskedCardNumber(semafoneEvents.maskedPan);
          //angular.element('#isPanResetOnInitialFocus').val(true);
          vm.isPanResetOnInitialFocus = true;
          if (uteSemafoneService.getCardScheme() === 'VISA') {
            vm.creditPaymentObj.creditCardType = 'VISA';
          } else if (uteSemafoneService.getCardScheme() === 'MASTERCARD') {
            vm.creditPaymentObj.creditCardType = 'MASTER';
          } else if (uteSemafoneService.getCardScheme() === 'AMEX') {
            vm.creditPaymentObj.creditCardType = 'AMEX';
          } else {
            vm.creditPaymentObj.creditCardType = null;
          }
          vm.isNotValidCard = false;
          vm.isCybersourceError = false;
          vm.loadSemafoneCapturePageIframe();
          //launchSemafoneCapturePage('semafoneCapturePage');
        }

      }

    }

    function listenSemafoneCaptureIframeEvents() {
      vm.semafoneEvents = {
        semafoneState: '',
        semafoneValidationState: '',
        semafoneValidationErrorCode: '',
        semafoneValidationErrorDesc: '',
        cardScheme: '',
        currentCardNumberLength: '',
        expectedCardNumberLength: '',
        expectedSecurityCodeLength: '',
        token: '',
        maskedPan: '',
        processResultState: '',
        semafoneResponseCode: '',
        semafoneReasonCode: '',
        semafoneErrorCode: '',
        semafoneErrorName: '',
        semafoneErrorCause: '',
        semafoneErrorRemedy: '',
        semafoneWarningCode: '',
        semafoneWarningName: '',
        semafoneWarningCause: '',
        semafoneWarningRemedy: '',
        serviceReasonCode: '',
        serviceResponseCode: '',
        serviceMessage: '',
        serviceErrorCode: '',
        serviceErrorName: '',
        serviceErrorCause: '',
        serviceErrorRemedy: ''
      };

      $.receiveMessage(function (event) {
        var bar = event.data.split('&');
        for (var i = 0; i < bar.length; i++) {
          var pair = bar[i].split('=');
          var key = pair[0];
          var value = pair[1];
          if (key == 'semafoneState') {
            vm.semafoneEvents.semafoneState = value;
          } else if (key == 'semafoneValidationState') {
            vm.semafoneEvents.semafoneValidationState = value;
          } else if (key == 'semafoneValidationErrorCode') {
            vm.semafoneEvents.semafoneValidationErrorCode =
              value;
          } else if (key == 'semafoneValidationErrorDesc') {
            vm.semafoneEvents.semafoneValidationErrorDesc =
              decodeURIComponent(vm.decodeSpaces(value));
          } else if (key == 'cardScheme') {
            vm.semafoneEvents.cardScheme = decodeURIComponent(
              vm.decodeSpaces(value));
          } else if (key == 'currentCardNumberLength') {
            vm.semafoneEvents.currentCardNumberLength = value;
          } else if (key == 'expectedCardNumberLength') {
            vm.semafoneEvents.expectedCardNumberLength = value;
          } else if (key == 'expectedSecurityCodeLength') {
            vm.semafoneEvents.expectedSecurityCodeLength =
              value;
          } else if (key == 'token') {
            vm.semafoneEvents.token = decodeURIComponent(value);
          } else if (key == 'maskedPan') {
            vm.semafoneEvents.maskedPan = decodeURIComponent(
              vm.decodeSpaces(value));
          } else if (key == 'processResultState') {
            vm.semafoneEvents.processResultState = value;
          } else if (key == 'semafoneResponseCode') {
            vm.semafoneEvents.semafoneResponseCode =
              decodeURIComponent(vm.decodeSpaces(value));
          } else if (key == 'semafoneReasonCode') {
            vm.semafoneEvents.semafoneReasonCode =
              decodeURIComponent(vm.decodeSpaces(value));
          } else if (key == 'semafoneErrorCode') {
            vm.semafoneEvents.semafoneErrorCode =
              decodeURIComponent(vm.decodeSpaces(value));
          } else if (key == 'semafoneErrorName') {
            vm.semafoneEvents.semafoneErrorName =
              decodeURIComponent(vm.decodeSpaces(value));
          } else if (key == 'semafoneErrorCause') {
            vm.semafoneEvents.semafoneErrorCause =
              decodeURIComponent(vm.decodeSpaces(value));
          } else if (key == 'semafoneErrorRemedy') {
            vm.semafoneEvents.semafoneErrorRemedy =
              decodeURIComponent(vm.decodeSpaces(value));
          } else if (key == 'semafoneWarningCode') {
            vm.semafoneEvents.semafoneWarningCode =
              decodeURIComponent(vm.decodeSpaces(value));
          } else if (key == 'semafoneWarningName') {
            vm.semafoneEvents.semafoneWarningName =
              decodeURIComponent(vm.decodeSpaces(value));
          } else if (key == 'semafoneWarningCause') {
            vm.semafoneEvents.semafoneWarningCause =
              decodeURIComponent(vm.decodeSpaces(value));
          } else if (key == 'semafoneWarningRemedy') {
            vm.semafoneEvents.semafoneWarningRemedy =
              decodeURIComponent(vm.decodeSpaces(value));
          } else if (key == 'serviceReasonCode') {
            vm.semafoneEvents.serviceReasonCode =
              decodeURIComponent(vm.decodeSpaces(value));
          } else if (key == 'serviceResponseCode') {
            vm.semafoneEvents.serviceResponseCode =
              decodeURIComponent(vm.decodeSpaces(value));
          } else if (key == 'serviceMessage') {
            vm.semafoneEvents.serviceMessage =
              decodeURIComponent(vm.decodeSpaces(value));
          } else if (key == 'serviceErrorCode') {
            vm.semafoneEvents.serviceErrorCode =
              decodeURIComponent(vm.decodeSpaces(value));
          } else if (key == 'serviceErrorName') {
            vm.semafoneEvents.serviceErrorName =
              decodeURIComponent(vm.decodeSpaces(value));
          } else if (key == 'serviceErrorCause') {
            vm.semafoneEvents.serviceErrorCause =
              decodeURIComponent(vm.decodeSpaces(value));
          } else if (key == 'serviceErrorRemedy') {
            vm.semafoneEvents.serviceErrorRemedy =
              decodeURIComponent(vm.decodeSpaces(value));
          }
        }
        vm.semafoneCapturePageEventHandlers(vm.semafoneEvents);
      });

    }
  }
})();

(function () {
  'use strict';

  /**
   * @author Dahang Xu
   * @description Factory of Semafone PaymentService
   * @class ute-ui
   * @memberOf ute-ui
   */

  angular.module('ute.ui')
    .factory('uteSemafonePaymentService', _factory);

  _factory.$inject = [];

  /* @ngInject */
  function _factory() {
    var _expireYears = [];
    var postExpireYearsNum = 10;
    var months = ['01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12'];
    var ccTye = ['V', 'M', 'A']; //credit card types: visa, master and amex
    var service = {
      postExpireYearsNum: postExpireYearsNum,
      months: months,
      ccType: ccTye,
      expireYears: expireYears
    };

    return service;

    function expireYears() {
      //return already calculated data
      if (_expireYears.length > 0) {
        return _expireYears;
      }
      var _currentYear = new Date().getFullYear();
      _expireYears.push(_currentYear);
      //get current year and add up to 10 years
      for (var i = 1; i <= 10; i++) {
        _expireYears.push(_currentYear + i);
      }
      return _expireYears;
    }
  }

})();

(function () {
  'use strict';

  /**
   * @author Dahang Xu
   * @description factory of Semafone CreditCardService
   * @class ute-ui
   * @memberOf ute-ui
   */

  angular.module('ute.ui')
    .factory('uteSemafoneService', _service);

  _service.$inject = [];

  /* @ngInject */
  function _service() {

    var token = '',
      cardScheme = '',
      maskedCardNumber = '',
      validCard = true,
      semafoneValidationState = '',
      expectedSecurityCodeLength = '';

    var service = {
      setToken: setToken,
      getToken: getToken,
      setCardScheme: setCardScheme,
      getCardScheme: getCardScheme,
      setMaskedCardNumber: setMaskedCardNumber,
      getMaskedCardNumber: getMaskedCardNumber,
      setSemafoneValidationState: setSemafoneValidationState,
      getSemafoneValidationState: getSemafoneValidationState,
      setValidCard: setValidCard,
      isValidCard: isValidCard,
      clearData: clearData,
      getExpectedSecurityCodeLength: getExpectedSecurityCodeLength,
      setExpectedSecurityCodeLength: setExpectedSecurityCodeLength
    };

    return service;

    function setToken(semafoneToken) {
      token = semafoneToken;
    }

    function getToken() {
      return token;
    }

    function setCardScheme(semafonecardScheme) {
      cardScheme = semafonecardScheme;
    }

    function getCardScheme() {
      return cardScheme;
    }

    function setMaskedCardNumber(semafonemaksedCardNumber) {
      maskedCardNumber = semafonemaksedCardNumber;
    }

    function getMaskedCardNumber() {
      return maskedCardNumber;
    }

    function setSemafoneValidationState(semafoneValidateState) {
      semafoneValidationState = semafoneValidateState;
    }

    function getSemafoneValidationState() {
      return semafoneValidationState;
    }

    function setValidCard(cardState) {
      validCard = cardState;
    }

    function isValidCard() {
      return validCard;
    }

    function clearData() {
      token = '';
      cardScheme = '';
      maskedCardNumber = '';
      validCard = true;
      semafoneValidationState = '';
    }

    function getExpectedSecurityCodeLength() {
      return expectedSecurityCodeLength;
    }

    function setExpectedSecurityCodeLength(securityCodeLength) {
      expectedSecurityCodeLength = securityCodeLength;
    }
  }
})();

(function () {


  'use strict';

  /**
   * @author Zain Syed
   * @ngdoc factory
   * @name uteCoreFactory
   * @description
   * @class ute-ui
   * @memberOf ute-ui
   */
  angular.module('ute.ui')

    .factory('uteCoreFactory', function ($rootScope, $window) {

      var uteCoreFactory = {
          collections: {}
        },
        mappings = [
          {
            windowObjName: '__userPref',
            rootScopeVarName: 'userPref',
            watchMethod: function (nv, ov) {

              // the value is new, update cookie
              if (nv !== ov) {
                $.cookie('userPref', nv, {
                  expires: 30
                });

                // if province has changed, reload window
                if (nv.province !== ov.province) {
                  $window.location.reload();
                }

                // if language has changed, reload window
                if (nv.language !== ov.language) {
                  $window.location.reload();
                }
              }
            },
            deepWatch: true
          },
          {
            windowObjName: '__atg',
            rootScopeVarName: 'atg',
            watchMethod: function (nv, ov) {
              // the value is new, update cookie
              if (nv !== ov) {
                // need all attributes to be preset in atg cookie; SS passes expirations (-1 or timestamp)
                if (
                  nv.userId.name && nv.userId.value && nv.userId.expire &&
                  nv.hashKey.name && nv.hashKey.value && nv.hashKey.expire
                ) {

                  // secondary condition to update cookie: check if expiry is -1, store cookie if it is not
                  if (nv.userId.expire.toString() !== '-1') {
                    var expiry = null;

                    // do some math with moment
                    expiry = moment(nv.userId.expire).diff(moment(), 'days', true);

                    // set cookie with processed expiry
                    $.cookie('atg', nv, {
                      expires: expiry
                    });
                  }

                } else {
                  $.removeCookie('atg');
                }
              }
            },
            deepWatch: true
          },
          {
            windowObjName: '__userInfo',
            rootScopeVarName: 'userInfo',
            watchMethod: function (nv, ov) {
              // the value is new, update cookie
              if (nv !== ov) {
                if (nv === {}) {
                  $.removeCookie('userInfo');
                } else {

                  // if user is agent, sync expiry with session timer
                  if (nv.expiry) {
                    var expiry = new Date();
                    if (nv.expiry !== ov.expiry) {
                      expiry = moment(nv.expiry).toDate();
                    }
                    $.cookie('userInfo', nv, { expires: expiry });
                  } else {
                    $.cookie('userInfo', nv);
                  }
                }
              }
            },
            deepWatch: true
          }
        ],
        self = this;

      // to avoid reprocessing of uteCoreFactory collection variables
      self.ready = false;

      var initFactory = function () {

        _.each(mappings, function (varToMap) {
          // method to add the mappings to the main factory in 'collections';
          uteCoreFactory.collections[varToMap.rootScopeVarName] = $window[varToMap.windowObjName];
          // map the collection values to rootScope watches
          $rootScope.$watch(function () {
            return uteCoreFactory.collections[varToMap.rootScopeVarName];
          }, varToMap.watchMethod, varToMap.deepWatch);
        });

        // ready the factory
        self.ready = true;

      };

      // if the service isn't ready, initialize
      if (!uteCoreFactory || self.ready === false) {
        initFactory();
      }

      return uteCoreFactory;

    })
    .run(function (uteCoreFactory, uteCartManager, $rootScope) {

      // fetch cart if there's something in cart cookie  //Todo add define checking avoid exception
      if (angular.isDefined(uteCoreFactory.collections.userPref)){
        if (uteCoreFactory.collections.userPref.cartQuantity > 0) {
          uteCartManager.fetch();
        }
      }

      // exception: $rootScope.shoppingCart.quantity needs to be stored as a cookie; so adding a watch
      $rootScope.$watch('shoppingCart.quantity', function (nv, ov) {
        if (nv !== ov) {
          uteCoreFactory.collections.userPref.cartQuantity = nv;
        }
      });


    })
    .factory('uteUtil', function ($rootScope, $window, commonService, uteProvinceMeta, uteCoreFactory, $http, $state, $q, uteEndpoint) {

      var collections = uteCoreFactory.collections;

      return {

        // is available province -- usually to validate redirection via url to particular province
        isValidProvince: function (province) {
          return uteProvinceMeta[province] ? true : false;
        },

        // is valid language
        isValidLanguage: function (language) {
          return ['en', 'fr'].indexOf(language.toLowerCase()) !== -1 ? true : false;
        },

        isPromise: function (obj) {
          return !!obj && angular.isFunction(obj.then);
        },

        // start agent session
        startAgentSession: function () {
          var deferred = $q.defer();
          var $this = this;

          // make blank call to endpoint to get session info (cfa)
          $http({
            method: 'GET',
            url: uteEndpoint('v1/cfaInfo'),
            cache: false
          }).
            success(function (data, status) {

              // var data = {}; data.cfaInfo = {"province":"ON","language":"en","jSessionID":"hTBdVQnbZkGK62GHRbjXDZf2CYTB1VkqQ7n2tTJtxpkd33n0v9CS!257750106!1434480187778","sourceURL":"https://dev09.ssp.fido.ca","signOutURL":"/shop/home","closeAccountURL":"/shop/home","accountNumber":"210920088","targetURL":"FOVERVIEW","heartBeatURL":"/shop/o/logout-keep-alive","uteHeartBeatURL":"/v1/cfaHb","agentName":"sheela bhogadi","getCustomerAccounts":{"firstName":"prasfido","lastName":"hsi","error":"","accounts":[{"accountNumber":"210920088","status":"OPEN","serviceName":"Internet/TV"}]}};
              // console.log('cfaInfo', data.cfaInfo);

              if (!data.cfaInfo) {
                deferred.reject('No cfaInfo');
                return;
              }

              // declare new userInfo
              collections.userInfo = {
                cfaInfo: data.cfaInfo,
                type: 'cfa'
              };

              // if there is user context
              if (data.cfaInfo.getCustomerAccounts) {
                collections.userInfo.accounts = data.cfaInfo.getCustomerAccounts.accounts ? data.cfaInfo.getCustomerAccounts.accounts : [];
                collections.userInfo.firstName = data.cfaInfo.getCustomerAccounts.firstName ? data.cfaInfo.getCustomerAccounts.firstName : '';
                collections.userInfo.lastName = data.cfaInfo.getCustomerAccounts.lastName ? data.cfaInfo.getCustomerAccounts.lastName : '';

                // make call to get more details on the customer accounts
                commonService.getAccountDetails(collections.userInfo.accounts, true);
              }

              // console.log('CFA has Cx context:', $rootScope.ruiMethods.agent.has.customerContext());
              // start timer
              $this.renewAgentSession();

              // return
              deferred.resolve(data);
            }).
            error(function (data, status) {
              deferred.reject(data);
            });

          return deferred.promise;
        },

        // renew agent session
        renewAgentSession: function () {
          // renew expiration, update timer
          $rootScope.$broadcast('timer-clear');
          collections.userInfo.expiry = (moment().add(15, 'm'));
          $rootScope.$broadcast('timer-start');

          // send heartbeats; one for ssp and the other for ute
          $http.post(collections.userInfo.cfaInfo.sourceURL + collections.userInfo.cfaInfo.heartBeatURL + ';jsessionid=' + collections.userInfo.cfaInfo.jSessionID);
          var heartBeatURL = collections.userInfo.cfaInfo.uteHeartBeatURL;

          if (heartBeatURL && heartBeatURL.substring(0, 1) === '/') {
            $http.post(uteEndpoint(collections.userInfo.cfaInfo.uteHeartBeatURL.substring(1)));
          }
        },

        // end user session
        endAgentSession: function () {
          var path = collections.userInfo.cfaInfo.sourceURL ? collections.userInfo.cfaInfo.sourceURL + collections.userInfo.cfaInfo.signOutURL + ';jsessionid=' + collections.userInfo.cfaInfo.jSessionID : false;
          collections.userInfo = {};

          // if the url to ssp is not available, go to home of ute
          if (!path) {
            $state.go('home');
          } else {
            $window.location = path;
          }
        },
        formatPhoneNumber: function (number) {


          if (typeof number === 'undefined') {
            return number;

          }
          if (number.indexOf('.') > 0) {
            number = number.split('.').join('');
          } else if (number.indexOf(' ') > 0) {
            number = number.split(' ').join('');
          } else if (number.indexOf('-') > 0) {
            number = number.split('-').join('');
          }

          return number;
        },


        objectToArray: function (obj) {

          var arr = [];
          for (var prop in obj) {
            if (obj.hasOwnProperty(prop)) {
              console.log('o.' + prop + ' = ' + obj[prop]);
              arr.push(obj[prop]);
            }
          }

          return arr;

        },

        // use this method to add window objects (declared in cookieRead) to $rootScope with watches to store back into cookies
        setCookiesOnRootScope: function (cookiesToSet) {
          _.each(cookiesToSet, function (cookieToSet) {
            $rootScope[cookieToSet.rootScopeVarName] = $window[cookieToSet.windowObjName];
            $rootScope.$watch(cookieToSet.rootScopeVarName, cookieToSet.watchMethod, cookieToSet.deepWatch);
          });
          return;
        },

        arrayToObject: function (arr) {
          var obj = {};
          arr.forEach(function (ele, index) {
            obj[index] = ele;
          });
          return obj;
        },


        clearLocalStorageValue: function () {
          /* set keys that you do not wat to be deleted from local storage
           ngStorage does not work with janrain
           */
          var keepKeys = ['janrainCaptureReturnExperienceData', 'janrainCaptureReturnExperienceData_Expires'];
          var keyValue = {};

          $.each(keepKeys, function (index, key) {
            keyValue[key] = $window.localStorage.getItem(key)
          });

          $window.localStorage.clear();

          $.each(keepKeys, function (index, key) {
            // localStorage.setLocalStorageValue(key,keyValue[key]);
            $window.localStorage.setItem(key, keyValue[key]);
          });
        },

        getParameterByName: function (name) {
          name = name.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
          var regex = new RegExp("[\\?&]" + name + "=([^&#]*)"),

            results = regex.exec(location.href);
          return results === null ? "" : decodeURIComponent(results[1].replace(/\+/g, " "));

        },
        getCCType: function (ccNumber) {
          if (ccNumber.length > 3) {
            if (ccNumber.match(/^(34|37)/)) {
              return 'AMEX';
            } else if (ccNumber.match(/^(4[0-9])/)) {
              return 'VISA';
            } else if (ccNumber.match(/^5[1-5]/)) {
              return 'MASTER';
            }
          } else if (ccNumber.length < 3) {
            return '';
          }
        },
        validateFormOnSubmit: function (formValue) {
          /* function being used to make form to display postback results */
          // dont submit if form is invalid and allow angular to show form invalid messages
          if (formValue.$invalid) {
            for (var field in formValue) {
              // look at each form input with a name attribute set
              // checking if it is pristine and not a '$' special field
              if (field[0] != '$' && formValue[field].$pristine) {
                console.log(field);
                formValue[field].$setTouched();
              }
            }
            return false;
          }
          return true;
        },
        setCacheVariable: function (variable, value) {
          /* set cache variable here, used to use accross the different controlleres */

          this[variable] = value;
          return true;
        },

        getCacheVariable: function (variable) {
          /* get cache variable here */
          return this[variable];

        },
        calculateAge: function (birthDate) { // Format is mm/dd/yyyy
          birthDate = new Date(birthDate);
          var currentDate = new Date();
          var years = (currentDate.getFullYear() - birthDate.getFullYear());

          if (currentDate.getMonth() < birthDate.getMonth() ||
            currentDate.getMonth() == birthDate.getMonth() &&
            currentDate.getDay() < birthDate.getDay()) {
            years--;
          }

          return years;
        }

      };
    });

})();
/* jshint ignore:start */

(function () {

  /**
   * @class ute-ui
   * @memberOf ute-ui
   *
   * Warning
   * ===========================
   * Don't use strict for this file as it's based on old code base and needs updated.
   * This file is copied and customized from the existing Rogers.com for encryption the credit card number purpose.
   * The third-party code used in this file was created in 2005 and doesn't pass the jshint,to keep the functionality working, this file has been excluded from the jshint.
   * Ideally, we should introduce an upgraded version of a Javascript encryption algorithm to replace this piece of code.
   */

  angular.module('ute.ui')

    .factory('uteEncryption', function () {

      // Augment the basic prototypes if they have not already been augmented.
      // These forms are obsolete. It is recommended that JSON.stringify and
      // JSON.parse be used instead.

      //}// prng4.js - uses Arcfour as a PRNG

      function Arcfour() {
        this.i = 0;
        this.j = 0;
        this.S = [];
      }

      // Initialize arcfour context from key, an array of ints, each from [0..255]
      function ARC4init(key) {
        var i, j, t;
        for (i = 0; i < 256; ++i)
          this.S[i] = i;
        j = 0;
        for (i = 0; i < 256; ++i) {
          j = (j + this.S[i] + key[i % key.length]) & 255;
          t = this.S[i];
          this.S[i] = this.S[j];
          this.S[j] = t;
        }
        this.i = 0;
        this.j = 0;
      }

      function ARC4next() {
        var t;
        this.i = (this.i + 1) & 255;
        this.j = (this.j + this.S[this.i]) & 255;
        t = this.S[this.i];
        this.S[this.i] = this.S[this.j];
        this.S[this.j] = t;
        return this.S[(t + this.S[this.i]) & 255];
      }

      Arcfour.prototype.init = ARC4init;
      Arcfour.prototype.next = ARC4next;

      // Plug in your RNG constructor here
      function prng_newstate() {
        return new Arcfour();
      }

      // Pool size must be a multiple of 4 and greater than 32.
      // An array of bytes the size of the pool will be passed to init()
      var rng_psize = 256;
      // Random number generator - requires a PRNG backend, e.g. prng4.js

      // For best results, put code like
      // <body onClick='rng_seed_time();' onKeyPress='rng_seed_time();'>
      // in your main HTML document.

      var rng_state;
      var rng_pool;
      var rng_pptr;

      // Mix in a 32-bit integer into the pool
      function rng_seed_int(x) {
        rng_pool[rng_pptr++] ^= x & 255;
        rng_pool[rng_pptr++] ^= (x >> 8) & 255;
        rng_pool[rng_pptr++] ^= (x >> 16) & 255;
        rng_pool[rng_pptr++] ^= (x >> 24) & 255;
        if (rng_pptr >= rng_psize) rng_pptr -= rng_psize;
      }

      // Mix in the current time (w/milliseconds) into the pool
      function rng_seed_time() {
        rng_seed_int(new Date().getTime());
      }

      // Initialize the pool with junk if needed.
      if (rng_pool == null) {
        rng_pool = [];
        rng_pptr = 0;
        var t;
        if (navigator.appName == "Netscape" && navigator.appVersion < "5" && window.crypto) {
          // Extract entropy (256 bits) from NS4 RNG if availabel
          var z = window.crypto.random(32);
          for (t = 0; t < z.length; ++t)
            rng_pool[rng_pptr++] = z.charCodeAt(t) & 255;
        }
        while (rng_pptr < rng_psize) { // extract some randomness from Math.random()
          t = Math.floor(65536 * Math.random());
          rng_pool[rng_pptr++] = t >>> 8;
          rng_pool[rng_pptr++] = t & 255;
        }
        rng_pptr = 0;
        rng_seed_time();
        //rng_seed_int(window.screenX);
        //rng_seed_int(window.screenY);
      }

      function rng_get_byte() {
        if (rng_state == null) {
          rng_seed_time();
          rng_state = prng_newstate();
          rng_state.init(rng_pool);
          for (rng_pptr = 0; rng_pptr < rng_pool.length; ++rng_pptr)
            rng_pool[rng_pptr] = 0;
          rng_pptr = 0;
          //rng_pool = null;
        }
        // TODO: allow reseeding after first request
        return rng_state.next();
      }

      function rng_get_bytes(ba) {
        var i;
        for (i = 0; i < ba.length; ++i) ba[i] = rng_get_byte();
      }

      function SecureRandom() {
      }

      SecureRandom.prototype.nextBytes = rng_get_bytes;
      // Depends on jsbn.js and rng.js

      // Version 1.1: support utf-8 encoding in pkcs1pad2

      // convert a (hex) string to a bignum object
      function parseBigInt(str, r) {
        return new BigInteger(str, r);
      }

      function linebrk(s, n) {
        var ret = "";
        var i = 0;
        while (i + n < s.length) {
          ret += s.substring(i, i + n) + "\n";
          i += n;
        }
        return ret + s.substring(i, s.length);
      }

      function byte2Hex(b) {
        if (b < 0x10)
          return "0" + b.toString(16);
        else
          return b.toString(16);
      }

      // PKCS#1 (type 2, random) pad input string s to n bytes, and return a bigint
      function pkcs1pad2(s, n) {
        if (n < s.length + 11) { // TODO: fix for utf-8
          throw "encryption, Message too long for RSA";
          return null;
        }
        var ba = [];
        var i = s.length - 1;
        while (i >= 0 && n > 0) {
          var c = s.charCodeAt(i--);
          if (c < 128) { // encode using utf-8
            ba[--n] = c;
          } else if ((c > 127) && (c < 2048)) {
            ba[--n] = (c & 63) | 128;
            ba[--n] = (c >> 6) | 192;
          } else {
            ba[--n] = (c & 63) | 128;
            ba[--n] = ((c >> 6) & 63) | 128;
            ba[--n] = (c >> 12) | 224;
          }
        }
        ba[--n] = 0;
        var rng = new SecureRandom();
        var x = [];
        while (n > 2) { // random non-zero pad
          x[0] = 0;
          while (x[0] == 0) rng.nextBytes(x);
          ba[--n] = x[0];
        }
        ba[--n] = 2;
        ba[--n] = 0;
        return new BigInteger(ba);
      }

      // "empty" RSA key constructor
      function RSAKey() {
        this.n = null;
        this.e = 0;
        this.d = null;
        this.p = null;
        this.q = null;
        this.dmp1 = null;
        this.dmq1 = null;
        this.coeff = null;
      }

      // Set the public key fields N and e from hex strings
      function RSASetPublic(N, E) {
        if (N != null && E != null && N.length > 0 && E.length > 0) {
          this.n = parseBigInt(N, 16);
          this.e = parseInt(E, 16);
        } else
          throw "Invalid RSA public key";
      }

      // Perform raw public operation on "x": return x^e (mod n)
      function RSADoPublic(x) {
        return x.modPowInt(this.e, this.n);
      }

      // Return the PKCS#1 RSA encryption of "text" as an even-length hex string
      function RSAEncrypt(text) {
        var m = pkcs1pad2(text, (this.n.bitLength() + 7) >> 3);
        if (m == null) return null;
        var c = this.doPublic(m);
        if (c == null) return null;
        var h = c.toString(16);
        if ((h.length & 1) == 0) return h;
        else return "0" + h;
      }

      // Return the PKCS#1 RSA encryption of "text" as a Base64-encoded string
      //function RSAEncryptB64(text) {
      //  var h = this.encrypt(text);
      //  if(h) return hex2b64(h); else return null;
      //}

      // protected
      RSAKey.prototype.doPublic = RSADoPublic;

      // public
      RSAKey.prototype.setPublic = RSASetPublic;
      RSAKey.prototype.encrypt = RSAEncrypt;
      //RSAKey.prototype.encrypt_b64 = RSAEncryptB64;
      var b64map = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";
      var b64pad = "=";

      function hex2b64(h) {
        var i;
        var c;
        var ret = "";
        for (i = 0; i + 3 <= h.length; i += 3) {
          c = parseInt(h.substring(i, i + 3), 16);
          ret += b64map.charAt(c >> 6) + b64map.charAt(c & 63);
        }
        if (i + 1 == h.length) {
          c = parseInt(h.substring(i, i + 1), 16);
          ret += b64map.charAt(c << 2);
        } else if (i + 2 == h.length) {
          c = parseInt(h.substring(i, i + 2), 16);
          ret += b64map.charAt(c >> 2) + b64map.charAt((c & 3) << 4);
        }
        while ((ret.length & 3) > 0) ret += b64pad;
        return ret;
      }

      // convert a base64 string to hex
      function b64tohex(s) {
        var ret = "",
          v,
          i,
          k = 0, // b64 state, 0-3
          slop;
        for (i = 0; i < s.length; ++i) {
          if (s.charAt(i) == b64pad) break;
          v = b64map.indexOf(s.charAt(i));
          if (v < 0) continue;
          if (k == 0) {
            ret += int2char(v >> 2);
            slop = v & 3;
            k = 1;
          } else if (k == 1) {
            ret += int2char((slop << 2) | (v >> 4));
            slop = v & 0xf;
            k = 2;
          } else if (k == 2) {
            ret += int2char(slop);
            ret += int2char(v >> 2);
            slop = v & 3;
            k = 3;
          } else {
            ret += int2char((slop << 2) | (v >> 4));
            ret += int2char(v & 0xf);
            k = 0;
          }
        }
        if (k == 1)
          ret += int2char(slop << 2);
        return ret;
      }

      // convert a base64 string to a byte/number array
      function b64toBA(s) {
        //piggyback on b64tohex for now, optimize later
        var h = b64tohex(s);
        var i;
        var a = [];
        for (i = 0; 2 * i < h.length; ++i) {
          a[i] = parseInt(h.substring(2 * i, 2 * i + 2), 16);
        }
        return a;
      }


      // Copyright (c) 2005  Tom Wu
      // All Rights Reserved.
      // See "LICENSE" for details.

      // Basic JavaScript BN library - subset useful for RSA encryption.

      // Bits per digit
      var dbits;

      // JavaScript engine analysis
      var canary = 0xdeadbeefcafe;
      var j_lm = ((canary & 0xffffff) == 0xefcafe);

      // (public) Constructor
      function BigInteger(a, b, c) {
        if (a != null)
        //if("number" == typeof a) this.fromNumber(a,b,c);
          if ("number" == typeof a) this.fromInt(a);
          else if (b == null && "string" != typeof a) this.fromString(a, 256);
          else this.fromString(a, b);
      }

      // return new, unset BigInteger
      function nbi() {
        return new BigInteger(null);
      }

      // am: Compute w_j += (x*this_i), propagate carries,
      // c is initial carry, returns final carry.
      // c < 3*dvalue, x < 2*dvalue, this_i < dvalue
      // We need to select the fastest one that works in this environment.

      // am1: use a single mult and divide to get the high bits,
      // max digit bits should be 26 because
      // max internal value = 2*dvalue^2-2*dvalue (< 2^53)
      function am1(i, x, w, j, c, n) {
        while (--n >= 0) {
          var v = x * this[i++] + w[j] + c;
          c = Math.floor(v / 0x4000000);
          w[j++] = v & 0x3ffffff;
        }
        return c;
      }

      // am2 avoids a big mult-and-extract completely.
      // Max digit bits should be <= 30 because we do bitwise ops
      // on values up to 2*hdvalue^2-hdvalue-1 (< 2^31)
      function am2(i, x, w, j, c, n) {
        var xl = x & 0x7fff,
          xh = x >> 15;
        while (--n >= 0) {
          var l = this[i] & 0x7fff;
          var h = this[i++] >> 15;
          var m = xh * l + h * xl;
          l = xl * l + ((m & 0x7fff) << 15) + w[j] + (c & 0x3fffffff);
          c = (l >>> 30) + (m >>> 15) + xh * h + (c >>> 30);
          w[j++] = l & 0x3fffffff;
        }
        return c;
      }

      // Alternately, set max digit bits to 28 since some
      // browsers slow down when dealing with 32-bit numbers.
      function am3(i, x, w, j, c, n) {
        var xl = x & 0x3fff,
          xh = x >> 14;
        while (--n >= 0) {
          var l = this[i] & 0x3fff;
          var h = this[i++] >> 14;
          var m = xh * l + h * xl;
          l = xl * l + ((m & 0x3fff) << 14) + w[j] + c;
          c = (l >> 28) + (m >> 14) + xh * h;
          w[j++] = l & 0xfffffff;
        }
        return c;
      }

      if (j_lm && (navigator.appName == "Microsoft Internet Explorer")) {
        BigInteger.prototype.am = am2;
        dbits = 30;
      } else if (j_lm && (navigator.appName != "Netscape")) {
        BigInteger.prototype.am = am1;
        dbits = 26;
      } else { // Mozilla/Netscape seems to prefer am3
        BigInteger.prototype.am = am3;
        dbits = 28;
      }

      BigInteger.prototype.DB = dbits;
      BigInteger.prototype.DM = ((1 << dbits) - 1);
      BigInteger.prototype.DV = (1 << dbits);

      var BI_FP = 52;
      BigInteger.prototype.FV = Math.pow(2, BI_FP);
      BigInteger.prototype.F1 = BI_FP - dbits;
      BigInteger.prototype.F2 = 2 * dbits - BI_FP;

      // Digit conversions
      var BI_RM = "0123456789abcdefghijklmnopqrstuvwxyz";
      var BI_RC = [];
      var rr, vv;
      rr = "0".charCodeAt(0);
      for (vv = 0; vv <= 9; ++vv) BI_RC[rr++] = vv;
      rr = "a".charCodeAt(0);
      for (vv = 10; vv < 36; ++vv) BI_RC[rr++] = vv;
      rr = "A".charCodeAt(0);
      for (vv = 10; vv < 36; ++vv) BI_RC[rr++] = vv;

      function int2char(n) {
        return BI_RM.charAt(n);
      }

      function intAt(s, i) {
        var c = BI_RC[s.charCodeAt(i)];
        return (c == null) ? -1 : c;
      }

      // (protected) copy this to r
      function bnpCopyTo(r) {
        for (var i = this.t - 1; i >= 0; --i) r[i] = this[i];
        r.t = this.t;
        r.s = this.s;
      }

      // (protected) set from integer value x, -DV <= x < DV
      function bnpFromInt(x) {
        this.t = 1;
        this.s = (x < 0) ? -1 : 0;
        if (x > 0) this[0] = x;
        else if (x < -1) this[0] = x + this.DV;
        else this.t = 0;
      }

      // return bigint initialized to value
      function nbv(i) {
        var r = nbi();
        r.fromInt(i);
        return r;
      }

      // (protected) set from string and radix
      function bnpFromString(s, b) {
        var k;
        if (b == 16) k = 4;
        else if (b == 8) k = 3;
        else if (b == 256) k = 8; // byte array
        else if (b == 2) k = 1;
        else if (b == 32) k = 5;
        else if (b == 4) k = 2;
        else {
          this.fromRadix(s, b);
          return;
        }
        this.t = 0;
        this.s = 0;
        var i = s.length,
          mi = false,
          sh = 0;
        while (--i >= 0) {
          var x = (k == 8) ? s[i] & 0xff : intAt(s, i);
          if (x < 0) {
            if (s.charAt(i) == "-") mi = true;
            continue;
          }
          mi = false;
          if (sh == 0)
            this[this.t++] = x;
          else if (sh + k > this.DB) {
            this[this.t - 1] |= (x & ((1 << (this.DB - sh)) - 1)) << sh;
            this[this.t++] = (x >> (this.DB - sh));
          } else
            this[this.t - 1] |= x << sh;
          sh += k;
          if (sh >= this.DB) sh -= this.DB;
        }
        if (k == 8 && (s[0] & 0x80) != 0) {
          this.s = -1;
          if (sh > 0) this[this.t - 1] |= ((1 << (this.DB - sh)) - 1) << sh;
        }
        this.clamp();
        if (mi) BigInteger.ZERO.subTo(this, this);
      }

      // (protected) clamp off excess high words
      function bnpClamp() {
        var c = this.s & this.DM;
        while (this.t > 0 && this[this.t - 1] == c) --this.t;
      }

      // (public) return string representation in given radix
      function bnToString(b) {
        if (this.s < 0) return "-" + this.negate().toString(b);
        var k;
        if (b == 16) k = 4;
        else if (b == 8) k = 3;
        else if (b == 2) k = 1;
        else if (b == 32) k = 5;
        else if (b == 4) k = 2;
        else return this.toRadix(b);
        var km = (1 << k) - 1,
          d, m = false,
          r = "",
          i = this.t;
        var p = this.DB - (i * this.DB) % k;
        if (i-- > 0) {
          if (p < this.DB && (d = this[i] >> p) > 0) {
            m = true;
            r = int2char(d);
          }
          while (i >= 0) {
            if (p < k) {
              d = (this[i] & ((1 << p) - 1)) << (k - p);
              d |= this[--i] >> (p += this.DB - k);
            } else {
              d = (this[i] >> (p -= k)) & km;
              if (p <= 0) {
                p += this.DB;
                --i;
              }
            }
            if (d > 0) m = true;
            if (m) r += int2char(d);
          }
        }
        return m ? r : "0";
      }

      // (public) -this
      function bnNegate() {
        var r = nbi();
        BigInteger.ZERO.subTo(this, r);
        return r;
      }

      // (public) |this|
      function bnAbs() {
        return (this.s < 0) ? this.negate() : this;
      }

      // (public) return + if this > a, - if this < a, 0 if equal
      function bnCompareTo(a) {
        var r = this.s - a.s;
        if (r != 0) return r;
        var i = this.t;
        r = i - a.t;
        if (r != 0) return (this.s < 0) ? -r : r;
        while (--i >= 0)
          if ((r = this[i] - a[i]) != 0) return r;
        return 0;
      }

      // returns bit length of the integer x
      function nbits(x) {
        var r = 1,
          t;
        if ((t = x >>> 16) != 0) {
          x = t;
          r += 16;
        }
        if ((t = x >> 8) != 0) {
          x = t;
          r += 8;
        }
        if ((t = x >> 4) != 0) {
          x = t;
          r += 4;
        }
        if ((t = x >> 2) != 0) {
          x = t;
          r += 2;
        }
        if ((t = x >> 1) != 0) {
          x = t;
          r += 1;
        }
        return r;
      }

      // (public) return the number of bits in "this"
      function bnBitLength() {
        if (this.t <= 0) return 0;
        return this.DB * (this.t - 1) + nbits(this[this.t - 1] ^ (this.s & this.DM));
      }

      // (protected) r = this << n*DB
      function bnpDLShiftTo(n, r) {
        var i;
        for (i = this.t - 1; i >= 0; --i) r[i + n] = this[i];
        for (i = n - 1; i >= 0; --i) r[i] = 0;
        r.t = this.t + n;
        r.s = this.s;
      }

      // (protected) r = this >> n*DB
      function bnpDRShiftTo(n, r) {
        for (var i = n; i < this.t; ++i) r[i - n] = this[i];
        r.t = Math.max(this.t - n, 0);
        r.s = this.s;
      }

      // (protected) r = this << n
      function bnpLShiftTo(n, r) {
        var bs = n % this.DB;
        var cbs = this.DB - bs;
        var bm = (1 << cbs) - 1;
        var ds = Math.floor(n / this.DB),
          c = (this.s << bs) & this.DM,
          i;
        for (i = this.t - 1; i >= 0; --i) {
          r[i + ds + 1] = (this[i] >> cbs) | c;
          c = (this[i] & bm) << bs;
        }
        for (i = ds - 1; i >= 0; --i) r[i] = 0;
        r[ds] = c;
        r.t = this.t + ds + 1;
        r.s = this.s;
        r.clamp();
      }

      // (protected) r = this >> n
      function bnpRShiftTo(n, r) {
        r.s = this.s;
        var ds = Math.floor(n / this.DB);
        if (ds >= this.t) {
          r.t = 0;
          return;
        }
        var bs = n % this.DB;
        var cbs = this.DB - bs;
        var bm = (1 << bs) - 1;
        r[0] = this[ds] >> bs;
        for (var i = ds + 1; i < this.t; ++i) {
          r[i - ds - 1] |= (this[i] & bm) << cbs;
          r[i - ds] = this[i] >> bs;
        }
        if (bs > 0) r[this.t - ds - 1] |= (this.s & bm) << cbs;
        r.t = this.t - ds;
        r.clamp();
      }

      // (protected) r = this - a
      function bnpSubTo(a, r) {
        var i = 0,
          c = 0,
          m = Math.min(a.t, this.t);
        while (i < m) {
          c += this[i] - a[i];
          r[i++] = c & this.DM;
          c >>= this.DB;
        }
        if (a.t < this.t) {
          c -= a.s;
          while (i < this.t) {
            c += this[i];
            r[i++] = c & this.DM;
            c >>= this.DB;
          }
          c += this.s;
        } else {
          c += this.s;
          while (i < a.t) {
            c -= a[i];
            r[i++] = c & this.DM;
            c >>= this.DB;
          }
          c -= a.s;
        }
        r.s = (c < 0) ? -1 : 0;
        if (c < -1) r[i++] = this.DV + c;
        else if (c > 0) r[i++] = c;
        r.t = i;
        r.clamp();
      }

      // (protected) r = this * a, r != this,a (HAC 14.12)
      // "this" should be the larger one if appropriate.
      function bnpMultiplyTo(a, r) {
        var x = this.abs(),
          y = a.abs();
        var i = x.t;
        r.t = i + y.t;
        while (--i >= 0) r[i] = 0;
        for (i = 0; i < y.t; ++i) r[i + x.t] = x.am(0, y[i], r, i, 0, x.t);
        r.s = 0;
        r.clamp();
        if (this.s != a.s) BigInteger.ZERO.subTo(r, r);
      }

      // (protected) r = this^2, r != this (HAC 14.16)
      function bnpSquareTo(r) {
        var x = this.abs();
        var i = r.t = 2 * x.t;
        while (--i >= 0) r[i] = 0;
        for (i = 0; i < x.t - 1; ++i) {
          var c = x.am(i, x[i], r, 2 * i, 0, 1);
          if ((r[i + x.t] += x.am(i + 1, 2 * x[i], r, 2 * i + 1, c, x.t - i - 1)) >= x.DV) {
            r[i + x.t] -= x.DV;
            r[i + x.t + 1] = 1;
          }
        }
        if (r.t > 0) r[r.t - 1] += x.am(i, x[i], r, 2 * i, 0, 1);
        r.s = 0;
        r.clamp();
      }

      // (protected) divide this by m, quotient and remainder to q, r (HAC 14.20)
      // r != q, this != m.  q or r may be null.
      function bnpDivRemTo(m, q, r) {
        var pm = m.abs();
        if (pm.t <= 0) return;
        var pt = this.abs();
        if (pt.t < pm.t) {
          if (q != null) q.fromInt(0);
          if (r != null) this.copyTo(r);
          return;
        }
        if (r == null) r = nbi();
        var y = nbi(),
          ts = this.s,
          ms = m.s;
        var nsh = this.DB - nbits(pm[pm.t - 1]); // normalize modulus
        if (nsh > 0) {
          pm.lShiftTo(nsh, y);
          pt.lShiftTo(nsh, r);
        } else {
          pm.copyTo(y);
          pt.copyTo(r);
        }
        var ys = y.t;
        var y0 = y[ys - 1];
        if (y0 == 0) return;
        var yt = y0 * (1 << this.F1) + ((ys > 1) ? y[ys - 2] >> this.F2 : 0);
        var d1 = this.FV / yt,
          d2 = (1 << this.F1) / yt,
          e = 1 << this.F2;
        var i = r.t,
          j = i - ys,
          t = (q == null) ? nbi() : q;
        y.dlShiftTo(j, t);
        if (r.compareTo(t) >= 0) {
          r[r.t++] = 1;
          r.subTo(t, r);
        }
        BigInteger.ONE.dlShiftTo(ys, t);
        t.subTo(y, y); // "negative" y so we can replace sub with am later
        while (y.t < ys) y[y.t++] = 0;
        while (--j >= 0) {
          // Estimate quotient digit
          var qd = (r[--i] == y0) ? this.DM : Math.floor(r[i] * d1 + (r[i - 1] + e) * d2);
          if ((r[i] += y.am(0, qd, r, j, 0, ys)) < qd) { // Try it out
            y.dlShiftTo(j, t);
            r.subTo(t, r);
            while (r[i] < --qd) r.subTo(t, r);
          }
        }
        if (q != null) {
          r.drShiftTo(ys, q);
          if (ts != ms) BigInteger.ZERO.subTo(q, q);
        }
        r.t = ys;
        r.clamp();
        if (nsh > 0) r.rShiftTo(nsh, r); // Denormalize remainder
        if (ts < 0) BigInteger.ZERO.subTo(r, r);
      }

      // (public) this mod a
      function bnMod(a) {
        var r = nbi();
        this.abs().divRemTo(a, null, r);
        if (this.s < 0 && r.compareTo(BigInteger.ZERO) > 0) a.subTo(r, r);
        return r;
      }

      // Modular reduction using "classic" algorithm
      function Classic(m) {
        this.m = m;
      }

      function cConvert(x) {
        if (x.s < 0 || x.compareTo(this.m) >= 0) return x.mod(this.m);
        else return x;
      }

      function cRevert(x) {
        return x;
      }

      function cReduce(x) {
        x.divRemTo(this.m, null, x);
      }

      function cMulTo(x, y, r) {
        x.multiplyTo(y, r);
        this.reduce(r);
      }

      function cSqrTo(x, r) {
        x.squareTo(r);
        this.reduce(r);
      }

      Classic.prototype.convert = cConvert;
      Classic.prototype.revert = cRevert;
      Classic.prototype.reduce = cReduce;
      Classic.prototype.mulTo = cMulTo;
      Classic.prototype.sqrTo = cSqrTo;

      // (protected) return "-1/this % 2^DB"; useful for Mont. reduction
      // justification:
      //         xy == 1 (mod m)
      //         xy =  1+km
      //   xy(2-xy) = (1+km)(1-km)
      // x[y(2-xy)] = 1-k^2m^2
      // x[y(2-xy)] == 1 (mod m^2)
      // if y is 1/x mod m, then y(2-xy) is 1/x mod m^2
      // should reduce x and y(2-xy) by m^2 at each step to keep size bounded.
      // JS multiply "overflows" differently from C/C++, so care is needed here.
      function bnpInvDigit() {
        if (this.t < 1) return 0;
        var x = this[0];
        if ((x & 1) == 0) return 0;
        var y = x & 3; // y == 1/x mod 2^2
        y = (y * (2 - (x & 0xf) * y)) & 0xf; // y == 1/x mod 2^4
        y = (y * (2 - (x & 0xff) * y)) & 0xff; // y == 1/x mod 2^8
        y = (y * (2 - (((x & 0xffff) * y) & 0xffff))) & 0xffff; // y == 1/x mod 2^16
        // last step - calculate inverse mod DV directly;
        // assumes 16 < DB <= 32 and assumes ability to handle 48-bit ints
        y = (y * (2 - x * y % this.DV)) % this.DV; // y == 1/x mod 2^dbits
        // we really want the negative inverse, and -DV < y < DV
        return (y > 0) ? this.DV - y : -y;
      }

      // Montgomery reduction
      function Montgomery(m) {
        this.m = m;
        this.mp = m.invDigit();
        this.mpl = this.mp & 0x7fff;
        this.mph = this.mp >> 15;
        this.um = (1 << (m.DB - 15)) - 1;
        this.mt2 = 2 * m.t;
      }

      // xR mod m
      function montConvert(x) {
        var r = nbi();
        x.abs().dlShiftTo(this.m.t, r);
        r.divRemTo(this.m, null, r);
        if (x.s < 0 && r.compareTo(BigInteger.ZERO) > 0) this.m.subTo(r, r);
        return r;
      }

      // x/R mod m
      function montRevert(x) {
        var r = nbi();
        x.copyTo(r);
        this.reduce(r);
        return r;
      }

      // x = x/R mod m (HAC 14.32)
      function montReduce(x) {
        while (x.t <= this.mt2) // pad x so am has enough room later
          x[x.t++] = 0;
        for (var i = 0; i < this.m.t; ++i) {
          // faster way of calculating u0 = x[i]*mp mod DV
          var j = x[i] & 0x7fff;
          var u0 = (j * this.mpl + (((j * this.mph + (x[i] >> 15) * this.mpl) & this.um) << 15)) & x.DM;
          // use am to combine the multiply-shift-add into one call
          j = i + this.m.t;
          x[j] += this.m.am(0, u0, x, i, 0, this.m.t);
          // propagate carry
          while (x[j] >= x.DV) {
            x[j] -= x.DV;
            x[++j]++;
          }
        }
        x.clamp();
        x.drShiftTo(this.m.t, x);
        if (x.compareTo(this.m) >= 0) x.subTo(this.m, x);
      }

      // r = "x^2/R mod m"; x != r
      function montSqrTo(x, r) {
        x.squareTo(r);
        this.reduce(r);
      }

      // r = "xy/R mod m"; x,y != r
      function montMulTo(x, y, r) {
        x.multiplyTo(y, r);
        this.reduce(r);
      }

      Montgomery.prototype.convert = montConvert;
      Montgomery.prototype.revert = montRevert;
      Montgomery.prototype.reduce = montReduce;
      Montgomery.prototype.mulTo = montMulTo;
      Montgomery.prototype.sqrTo = montSqrTo;

      // (protected) true iff this is even
      function bnpIsEven() {
        return ((this.t > 0) ? (this[0] & 1) : this.s) == 0;
      }

      // (protected) this^e, e < 2^32, doing sqr and mul with "r" (HAC 14.79)
      function bnpExp(e, z) {
        if (e > 0xffffffff || e < 1) return BigInteger.ONE;
        var r = nbi(),
          r2 = nbi(),
          g = z.convert(this),
          i = nbits(e) - 1;
        g.copyTo(r);
        while (--i >= 0) {
          z.sqrTo(r, r2);
          if ((e & (1 << i)) > 0) z.mulTo(r2, g, r);
          else {
            var t = r;
            r = r2;
            r2 = t;
          }
        }
        return z.revert(r);
      }

      // (public) this^e % m, 0 <= e < 2^32
      function bnModPowInt(e, m) {
        var z;
        if (e < 256 || m.isEven()) z = new Classic(m);
        else z = new Montgomery(m);
        return this.exp(e, z);
      }

      // protected
      BigInteger.prototype.copyTo = bnpCopyTo;
      BigInteger.prototype.fromInt = bnpFromInt;
      BigInteger.prototype.fromString = bnpFromString;
      BigInteger.prototype.clamp = bnpClamp;
      BigInteger.prototype.dlShiftTo = bnpDLShiftTo;
      BigInteger.prototype.drShiftTo = bnpDRShiftTo;
      BigInteger.prototype.lShiftTo = bnpLShiftTo;
      BigInteger.prototype.rShiftTo = bnpRShiftTo;
      BigInteger.prototype.subTo = bnpSubTo;
      BigInteger.prototype.multiplyTo = bnpMultiplyTo;
      BigInteger.prototype.squareTo = bnpSquareTo;
      BigInteger.prototype.divRemTo = bnpDivRemTo;
      BigInteger.prototype.invDigit = bnpInvDigit;
      BigInteger.prototype.isEven = bnpIsEven;
      BigInteger.prototype.exp = bnpExp;

      // public
      BigInteger.prototype.toString = bnToString;
      BigInteger.prototype.negate = bnNegate;
      BigInteger.prototype.abs = bnAbs;
      BigInteger.prototype.compareTo = bnCompareTo;
      BigInteger.prototype.bitLength = bnBitLength;
      BigInteger.prototype.mod = bnMod;
      BigInteger.prototype.modPowInt = bnModPowInt;

      // "constants"
      BigInteger.ZERO = nbv(0);
      BigInteger.ONE = nbv(1);

      //serivce return object
      function encrptCard(idNumber, modulus, exponent) {
        var rsa = new RSAKey();
        rsa.setPublic(modulus, exponent);
        var encryptCardNumber = rsa.encrypt(idNumber);
        return hex2b64(encryptCardNumber);
      }

      return encrptCard;
    })
})();

/* jshint ignore:end */
(function () {

  'use strict';

  /**
   * @author Chester Rivas | Zain Syed
   * @description extends Bootstrap's modal directive
   * @class ute-ui
   * @memberOf ute-ui
   */
  angular.module('ute.ui')

  /**
   * @class ute-ui.modal.uteModal
   */
    .factory('uteModal', function ($modal, $q) {

      /**
       * @name uteModal
       * @memberOf ute-ui.modal
       * @type {Object}
       */
      var uteModal = {};

      /**
       * @property uteModal.config
       * @type {Object}
       * @memberOf ute-ui.modal.uteModal
       * @description object containing default controller variables
       */
      uteModal.config = {};

      /**
       * @property uteModal.controllerScope
       * @type {Object}
       * @memberOf ute-ui.modal.uteModal
       * @description
       */
      uteModal.controllerScope = null;

      /**
       * @property uteModal.defaultController
       * @type {Function}
       * @memberOf ute-ui.modal.uteModal
       * @description if no controller is specified by @open then this controller is used to display the modal
       */
      uteModal.defaultController = function ($scope, $modalInstance) {

        uteModal.controllerScope = $scope;

        $scope.title = angular.isDefined(uteModal.config.resolve) && angular.isDefined(uteModal.config.resolve.title) ? uteModal.config.resolve.title() : 'Confirm';

        $scope.message = angular.isDefined(uteModal.config.resolve) && angular.isDefined(uteModal.config.resolve.message) ? uteModal.config.resolve.message() : 'Please confirm';

        $scope.okButtonLabel = angular.isDefined(uteModal.config.resolve) && angular.isDefined(uteModal.config.resolve.okButtonLabel) ? uteModal.config.resolve.okButtonLabel() : 'Continue';

        $scope.cancelButtonLabel = angular.isDefined(uteModal.config.resolve) && angular.isDefined(uteModal.config.resolve.cancelButtonLabel) ? uteModal.config.resolve.cancelButtonLabel() : 'Cancel';

        $scope.ok = function () {
          $modalInstance.close();
          uteModal.closeThisModal($modalInstance);
        };

        $scope.cancel = function () {
          $modalInstance.dismiss('cancel');
          uteModal.closeThisModal($modalInstance);
        };

        return {
          $scope: $scope,
          $modalInstance: $modalInstance
        };

      };

      /**
       * @property uteModal.closeThisModal
       * @type {Function}
       * @memberOf ute-ui.modal.uteModal
       * @description closes a specific modal
       */
      uteModal.closeThisModal = function (modal) {

        _.each(uteModal.modalInstancesArray, function (eachModal, index) {
          if (angular.equals(modal, eachModal)) {
            uteModal.modalInstancesArray.splice(index, 1);
          }
        });

      };

      /**
       * @property uteModal.closeAllModals
       * @type {Function}
       * @memberOf ute-ui.modal.uteModal
       * @description loops through all open modal instance and closes it
       */
      uteModal.closeAllModals = function () {

        _.each(uteModal.modalInstancesArray, function (eachModal) {
          eachModal.dismiss('cancel');
        });

        uteModal.modalInstancesArray = [];

      };

      /**
       * @property uteModal.modalInstancesArray
       * @type {Array}
       * @memberOf ute-ui.modal.uteModal
       * @description holds an instance of all open modals
       */
      uteModal.modalInstancesArray = [];

      /**
       * @property uteModal.processRequest
       * @type {function}
       * @memberOf ute-ui.modal.uteModal
       * @description process modal - restricts the user from closing it; the user has to cancel, which would cancel the ajax request and close the modal
       */
      uteModal.processRequest = function (config) {

        // return a deferred object's promise at the end of this method
        var deferred = $q.defer();

        $modal.open({
          templateUrl: 'uteModal/processing-request.html',
          backdrop: 'static',
          resolve: {
            def: function () {
              return deferred;
            }
          },
          controller: function ($scope, $http, $modalInstance, def, $timeout) {

            /* The modal behaviour is segmented into 3 parts:
             *  1) Occurs from 0-10s - the user should see the 'loading' icon (roadblocker).
             *  2) Occurs from 10-30s - the user should see the 'processing' copy (non-roadblocker).
             *  3) If the SS returns an error or times out, show the error message.
             */

            var loadingDuration = config.delay ? config.delay : 10000;

            // the cancel method should kill the ajax call and close the modal
            $scope.cancel = function () {
              $modalInstance.close();
              $timeout.cancel($scope.loadingSegment);
              def.reject('Cancelled');
            };

            // make requested ajax call
            $scope.makeRequest = function () {

              // bind the promise to request so we can cancel it if the option is provided
              config.request.timeout = def.promise;

              // show loading segment information
              $scope.loadingView = true;
              $scope.processingView = false;
              $scope.errorView = false;

              // timers
              $scope.loadingSegment = $timeout(function () {
                // noop
              }, loadingDuration);

              // behaviour for success/failures of the timers
              $scope.loadingSegment.then(function () {
                // completed loadingDuration -- show next segment
                $scope.loadingView = false;
                $scope.processingView = true;
                $scope.errorView = false;

              }, function () {
                // noop
              });

              // make the ajax call
              $http(config.request).
                success(function (data, status) {
                  def.resolve(data);
                  $modalInstance.close();
                  $timeout.cancel($scope.loadingSegment);
                }).
                error(function (data, status) {
                  $scope.loadingView = false;
                  $scope.processingView = false;
                  $scope.errorView = true;
                  $timeout.cancel($scope.loadingSegment);
                });
            };

            // kick off!
            $scope.makeRequest();

          }

        });

        uteModal.config = config;

        return deferred.promise;

      };

      /**
       * @type {Object}
       * @memberOf ute-ui.modal.uteModal
       * @description contains a default object
       * @property uteModal.defaultConfigObject
       * @type {{backdrop: boolean, cp: boolean, templateUrl: boolean, controller: boolean, ok: boolean, cancel: boolean, opened: boolean, size: boolean, keyboard: boolean}}
       */
      uteModal.defaultConfigObject = {
        backdrop: true,
        cp: false,
        templateUrl: 'views/uteModal/modal.html',
        controller: uteModal.defaultController,
        ok: null,
        cancel: null,
        opened:  null,
        size: 'md',
        keyboard: true
      };

      /**
       * @type {Function}
       * @memberOf ute-ui.modal.uteModal
       * @description opens a modal with a custom view and ctrl has callback for ok and cancel clicks
       * @property uteModal.open
       * @param config {object}
       * @property {object} config.backdrop {boolean} - whether to show the backdrop behind the modal
       * @property {object} config.cp {boolean} - whether the modal is a canada post modal which requires dom manipulation logic
       * @property {object} config.templateUrl {string} - path to a view
       * @property {object} config.controller {function} - controller for that modal
       * @property {object} config.ok {function}
       * @property {object} config.cancel {function}
       * @property {object} config.size {string}
       * @property {object} config.keyboard {boolean}
       */
      uteModal.open = function (config) {

        var modalConfig = _.defaults({}, config ? config : {}, uteModal.defaultConfigObject),
          filteredResolveObj = {};

        if (angular.isDefined(modalConfig.resolve)) {
          // if config param contains a resolve object property that contains sub properties then loop through that
          _.each(modalConfig.resolve, uteModal.loopResolveFunction.bind(uteModal, filteredResolveObj));
        } else {
          // else loop through the entire config object to pick up any properties that should be passed into the controller
          _.each(config, uteModal.loopResolveFunction.bind(uteModal, filteredResolveObj));
        }

        // if tempResolve object is empty then don't define that property
        if (_.keys(filteredResolveObj).length) modalConfig.resolve = filteredResolveObj;

        // save last config to the service for referencing in default controller
        uteModal.config = modalConfig;

        var modalInstance = $modal.open(uteModal.config);

        uteModal.modalInstancesArray.push(modalInstance);

        if (uteModal.config.cp) {
          // close
          var cleanUpCanadaPost = function () {
            $('.pca:first').insertAfter($('#janrainModal'));
            $('.pca:first').removeClass('formodal');
          };
          modalInstance.result.then(cleanUpCanadaPost, cleanUpCanadaPost);
        }

        if (uteModal.config.ok && uteModal.config.cancel) {
          modalInstance.result.then(config.ok, config.cancel);
        }

        if (uteModal.config.opened) {
          modalInstance.opened.then(uteModal.config.opened, function () {
            console.warn('uteModal: open failed');
          });
        }

        return modalInstance;

      };

      /**
       * @property uteModal.isNotDefaultProperty
       * @type {Function}
       * @memberOf ute-ui.modal.uteModal
       * @description checks to see if passed in key exists on the uteModal.config object
       * @param key
       * @returns {boolean}
       */
      uteModal.isNotDefaultProperty = function (key) {

        return !angular.isDefined(uteModal.defaultConfigObject[key]);

      };

      /**
       * @property uteModal.loopResolveFunction
       * @type {Function}
       * @memberOf ute-ui.modal.uteModal
       * @description loops through an object and ignores certain properties
       * @param tempResolve - object which will be built up through the loop function
       * @param subObject - sub object within the loop
       * @param subKey - the sub key
       */
      uteModal.loopResolveFunction = function (tempResolve, subObject, subKey) {

        // ignore any key that is a default property of config object
        if (uteModal.isNotDefaultProperty(subKey)) {

          if (typeof subObject === 'function' && typeof subObject() === 'undefined') {
            // if subObject is type of function
            // and subObject() returns you something that's not undefined
            tempResolve[subKey] = subObject;
          } else {
            // else take each property and turn it into a "getter" function
            tempResolve[subKey] = function () {
              return subObject;
            };
          }
        }

        return tempResolve;

      };

      return uteModal;

    });

})();

(function () {

  'use strict';

  /**
   * @author Zain Syed
   * @ngdoc factory
   * @name uteJanrainEvents
   * @description
   * @class ute-ui
   * @memberOf ute-ui
   */

  angular.module('ute.ui')

    .factory('uteJanrainEvents', function ($timeout, $window, $rootScope, $state, uteUserService, $http, $translate, uteEndpoint, uteJanrainService, commonService, cartManager, $compile, util) {

      var emailSentResult,
        loginFailed = false;

      /* store where email is sent object test commit*/
      var proceedWithLogin = function (uuid, userID) {
        if (!commonService.accessToken) {
          $translate('50000')
            .then(function (translatedValue) {
              uteJanrainService.hideSuccessMessage();
              uteJanrainService.showErrorMessage(translatedValue);
              uteJanrainService.hideProcessing();
              uteJanrainService.focusElement('signIn', 'userID');
              $window.janrain.capture.ui.endCaptureSession();
            });
          return;
        }

        /* login success event */
        //close the pop up if we can.
        $http({
          method: 'POST',
          url: uteEndpoint('v3/login'),

          data: $.param({
            accessToken: commonService.accessToken,
            uuid: uuid
          }),
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
          }
        }).success(function (data) {
          if (data.error && data.error === 'ERR-MIGRATED') {

            $translate('ERR-MIGRATED')
              .then(function (translatedValue) {
                $window.janrain.capture.ui.endCaptureSession();
                uteJanrainService.displayMessage();
                uteJanrainService.showErrorMessage(translatedValue.replace('EMAIL_REPLACE', data.email));

              });


          } else if (data.error && data.error === '50000') {

            $translate('50000')
              .then(function (translatedValue) {
                uteJanrainService.hideSuccessMessage();
                uteJanrainService.showErrorMessage(translatedValue);
                uteJanrainService.hideProcessing();
                uteJanrainService.focusElement('signIn', 'userID');
                $window.janrain.capture.ui.endCaptureSession();
              });

          } else if (data.getCustomerAccounts && data.getCustomerAccounts.error && data.getCustomerAccounts.error === '50000') {
            $translate('50000')
              .then(function (translatedValue) {
                uteJanrainService.hideSuccessMessage();
                uteJanrainService.showErrorMessage(translatedValue);
                uteJanrainService.hideProcessing();
                uteJanrainService.focusElement('signIn', 'userID');
                $window.janrain.capture.ui.endCaptureSession();
              });

          } else {

            var userInfo = {
              uuid: uuid,
              userID: userID
            };

            /* see if this is linked account */
            if (data.isLinked == 'false' || data.isLinked == false) {
              userInfo.firstName = '';
              userInfo.lastName = '';
              userInfo.janrainOnlylogin = true;
              uteUserService.login(userInfo);

              $state.go('linkAccounts');

            } else {
              /** login is successful from SS */
              userInfo.firstName = data.getCustomerAccounts.firstName;
              userInfo.lastName = data.getCustomerAccounts.lastName;
              userInfo.accounts = data.getCustomerAccounts.accounts;
              userInfo.profileType = data.getCustomerAccounts.profileType;
              uteUserService.login(userInfo);

              console.log('before commonService.getAccountDetails()');
              console.log('$rootScope.userInfo.accounts', $rootScope.userInfo.accounts);

              if ($state.current.name === 'home') {
                console.log('login from home');

                commonService.getAccountDetails($rootScope.userInfo.accounts);
                if (data.getCustomerAccounts.profileType && (data.getCustomerAccounts.profileType.prepaid)) {
                  $state.go('myAccount.groupID');
                } else {
                  $state.go('myAccount.overview');
                }
              } else {
                console.log('login from buy');

                commonService.getAccountDetails($rootScope.userInfo.accounts)

                  .then(function () {
                    console.log('inside commonService.getAccountDetails()');
                    console.log('$state.current.name', $state.current.name);

                    if ($state.current.name === 'internet') {
                      if (commonService.customerHasInternetService) {
                        cartManager.cleanCart().then(function () {

                        });
                      }
                    } else if ($state.current.name === 'cartSummary' || $state.current.name === 'createUser') {
                      if (commonService.customerHasInternetService) {
                        cartManager.cleanCart().then(function () {
                          $state.go('internet', {});
                        });
                      } else {
                        $state.go('buy');
                      }
                    } else {
                      $state.go('myAccount.overview');
                    }
                  });
              }
            }
            $window.janrain.capture.ui.modal.close();
          }

        }).
          error(function (data, status, headers, config) {

            $window.janrain.capture.ui.endCaptureSession();
            $translate('50000')
              .then(function (translatedValue) {
                uteJanrainService.hideSuccessMessage();
                uteJanrainService.showErrorMessage(translatedValue);
                uteJanrainService.hideProcessing();
                uteJanrainService.focusElement('signIn', 'userID');
                $window.janrain.capture.ui.endCaptureSession();

              });
          });
      };

      // declare all janrain events here
      var allEvents = {
        onCaptureLoginSuccess: [
          function (result) {
            console.log('in login capture');
            proceedWithLogin(result.userData.uuid, result.userData.userID);
          }
        ],
        onCaptureSessionEnded: [
          function (result) {
            uteUserService.logout(false);
          }
        ],

        onCaptureRenderStart: [
          function (result) {

          }
        ],
        onCaptureSessionCreated: [
          function (result) {
            console.log(result, 'session created');
            if (result && result.accessToken) {
              commonService.accessToken = result.accessToken;
            } else {
              commonService.accessToken = '';
            }
          }
        ],
        onCaptureFieldsChanged: [
          function (result) {
            if (result.emailAddress && result.emailAddress.newValue != result.emailAddress.oldValue) {
              $window.janrain.capture.ui.setFieldAttribute('emailAddress', 'tip',
                'Your email address has changed. Please check your email for a verification link.');
            }
          }
        ],
        onCaptureValidationSuccess: [
          function (result) {
            // Note: Assumes CTN is identified by NOT have an '@' character.
            if (result.field && result.field.id == 'capture_editProfile_emailAddress' && (janrain.capture.ui.getProfileCookieData('profileType') == 2 || janrain.capture.ui.getProfileCookieData('profileType') == 3) && result.field.defaultValue != result.field.value && result.field.defaultValue.indexOf('@') == -1) {
              document.getElementById('capture_editProfile_msisdn').value = result.field.defaultValue;
            }
          }
        ],
        onCaptureEmailSent: [
          function (result) {
            /* store object to be used into capture screen */
            emailSentResult = result;
          }
        ],
        onCaptureProfileSaveSuccess: [
          function (result) {
            /* store object to be used into capture screen */
            if (result.form == 'editProfileForm') {
              console.log('profile form here');
              console.log('in profile success', result);
              $http({
                method: 'POST',
                url: uteEndpoint('v1/updateProfile'),
                data: $.param({
                  accountNumber: util.getCacheVariable('selectedAccount'),
                  userName: result.userData.email,

                }),
                headers: {
                  'Content-Type': 'application/x-www-form-urlencoded'
                }
              }).success(function (data) {
              }).error(function () {
                console.log('error');
              });

            } else if (result.form == 'changePasswordForm') {
              $('#passwordEditSuccess').show();
            } else if (result.form == 'changeSecurityQuestionForm') {
              $('#securityQAEditSuccess').show();
            }
          }
        ],
        onCaptureRenderComplete: [
          function (result) {
            window.janrain.loginUiModalReady = true;
            console.log(result.screen);
            if (result.flow.form) {
              switch (result.screen) {
                case 'signIn':
                case 'returnTraditional':
                  window.janrain.lastScreen = 'signIn';
                  window.janrain.lastScreenUpdated = 0;
                  uteJanrainService.displayMessage();
                  /* delete/hide sign in form error on click */
                  delete result.flow.fields.signInForm.errors;

                  break;
                case 'forgotPasswordSuccess':
                  $('#passwordResetEmail').html(emailSentResult.to);
                  break;
                case 'resendVerificationSuccess':
                  delete result.flow.fields.resetPasswordUserID.value;
                  $('#resendVerificationEmail').html(emailSentResult.to);
                  break;
                case 'emailNotVerified':
                  /* remove email not verified errors */
                  delete result.flow.fields.emailConfirm.value;
                  delete result.flow.fields.resendVerificationEmailAddress.value;
                  delete result.flow.fields.signInEmailAddress.value;
                  delete result.flow.fields.emailAddress.value;
                  delete result.flow.fields.userIDData.value;
                  delete result.flow.fields.emailAddressData.value;
                  delete result.flow.fields.securityQuestion.value;
                  delete result.flow.fields.securityQuestionData.value;
                  delete result.flow.fields.resetPasswordUserID.value;
                  // delete result.flow.fields.userID.value;

                  if ($window.janrain.capture.ui.getReturnExperienceData('userID')) {
                    $('.notVerifiedEmail').html(janrain.capture.ui.getReturnExperienceData('userID'));
                  }
                  /* make sure thank you screen is shown after registraion manual */
                  if (result.flow.form == 'registrationForm') {
                    $('.thankYouRegisteration').show();
                    $('.emailVerifiedForm').hide();
                    if ($window.janrain.capture.ui.getReturnExperienceData('userID')) {
                      $('#emailRegisteredRecently').html(janrain.capture.ui.getReturnExperienceData('userID'));
                    }
                  }

                  /* make sure email verificaiton is shown if link is not verified */
                  if (result.flow.form == 'signInForm') {
                    $('.emailVerifiedForm').show();
                    $('.thankYouRegisteration').hide();
                  }
                  break;
              }
            } else {
              /* flow not found clicked on login */
              switch (result.screen) {
                case 'signIn':
                case 'returnTraditional':

                  uteJanrainService.displayMessage();
                  /* set back the userID for login */
                  var e = document.getElementById('capture_' + result.screen + '_userID');
                  var toField = document.getElementById('capture_traditionalRegistration_emailAddress');

                  //  console.log(janrain.capture.ui);
                  if (e && typeof janrain.capture.ui.getReturnExperienceData('userID') == 'string' && janrain.capture.ui.getReturnExperienceData('userID')) {
                    e.value = janrain.capture.ui.getReturnExperienceData('userID');

                  }
                  break;

              }
            }

            /* set sign in rendered true open modal next time */
            //window._newvar = result.flow;

            if (result.screen == 'editProfile' && result.renderingBuiltInScreen == false) {
              $('#editProfileOuter').show();
              //$('#janrainCaptureWidget').show();
              $('#janrainEditProfileLoading').hide();

            }

            if (result.screen == 'signIn') {
              if (loginFailed == true) {
                $('#capture_signIn_currentPassword').val('');
                loginFailed = false;
              }
              var el = document.getElementById('capture_signIn_userID');
              if (el) {
                var i = el.value.indexOf('@sms.fido.ca');
                if (i > -1) {
                  el.value = el.value.substring(0, i);
                }
              }
            }

            /* delete/hide forgot password form error on click */
            if (result.screen == 'forgotPassword') {
              window.janrain.globalResult = {};
              delete result.flow.fields.forgotPasswordForm.errors;
              window.janrain.globalResult.userIdValidation = result.flow.fields.userID.validation.messages;
            }

            if (result.screen == 'forgotPassword' || result.screen == 'forgotPasswordSuccess') {
              delete result.flow.fields.resetPasswordUserID.value;
              //  delete result.flow.fields.userID.value;
            }

          }
        ],
        onCaptureEmailVerificationSuccess: [
          function (result) {
            if (result.screen == 'traditionalRegistration') {
              janrain.capture.ui.endCaptureSession();
            }
          }
        ],
        onCaptureScreenShow: [
          function (result) {
            if (result.screen == 'returnTraditional') {
              var span = document.getElementById('traditionalWelcomeName');
              var name = janrain.capture.ui.getReturnExperienceData('displayName');
              if (span && name) {
                span.innerHTML = 'Welcome back, ' + name + '!';
              }
            }
            if (result.screen == 'signIn') {
              uteJanrainService.focusElement(result.screen, 'userID');
            }

          }
        ],
        onCaptureContentChange: [
          function () {
            //noop
          }
        ],

        onCaptureSaveSuccess: [
          function (result) {
            if (result.controlName == 'resendVerificationEmail' &&
              result.screen == 'editProfile') {
              document.getElementById('capture_editProfile_resendLink').style.display = 'none';
            }
          }
        ],
        onCaptureModalReady: [
          function () {
            console.log('in modal ready');
            window.janrain.loginUiModalReady = true;
          }
        ],

        onCaptureSessionFound: [
          function (result) {
            /* login success event */
            //close the pop up if we can.
            if (!$rootScope.ruiMethods.user.is.loggedIn()) {
              console.log('useris not logged in, making call on session found');
              proceedWithLogin(janrain.capture.ui.getProfileCookieData('uuid'), janrain.capture.ui.getProfileCookieData('userID'));
            }
            //set redirect links here
          }
        ],
        onCaptureRegistrationSuccessNoLogin: [
          function (result) {
          }
        ],
        onCaptureLoginFailed: [
          function (result) {
            loginFailed = true;


            /* handle deactivated account scenario */
            if (result.statusMessage == 'accountDeactivated') {
              $translate('ERR-DISABLED-ACCOUNT')
                .then(function (translatedValue) {
                  uteJanrainService.showErrorMessage(translatedValue);
                  uteJanrainService.hideProcessing();
                  /* end janrain capture session as long as there is error */
                  $window.janrain.capture.ui.endCaptureSession();
                });
            }

            if (result.statusMessage == 'invalidCredentials') {
              $window.localStorage.removeItem('janrainCaptureReturnExperienceData');
              $window.localStorage.removeItem('janrainCaptureReturnExperienceData_Expires');
            }
          }
        ],
        onCaptureAccountDeactivateSuccess: [
          function (result) {
            if (result.status == 'success') {

              $translate('ERR-DISABLED-ACCOUNT')
                .then(function (translatedValue) {
                  uteJanrainService.showErrorMessage(translatedValue);
                  uteJanrainService.hideProcessing();
                  $window.janrain.capture.ui.endCaptureSession();
                });

            }
          }
        ],
      };

      /* now the events is sometimes not defined */

      var checkJanrainUiReady = function (callback) {

        window.starttime = new Date();

        setTimeout(function () {
          if (typeof $window.janrain.events == 'object' && typeof janrain.capture.ui.start == 'function') {
            _.each(allEvents, function (events, eventName) {
              _.each(events, function (eventMethod) {
                $window.janrain.events[eventName].addHandler(eventMethod);
              });
            });
            janrain.capture.ui.start();
            window.janrain.captureReady = true;
          } else {
            checkJanrainUiReady(callback);
          }

        }, 250);
      };
      return {
        checkJanrainUiReady: checkJanrainUiReady
      };
    });
})();

(function () {

  'use strict';

  /**
   * @author Zain Syed
   * @ngdoc constant
   * @name uteEnv
   * @description
   * @class ute-ui
   * @memberOf ute-ui
   */

  angular.module('ute.ui')

    .service('uteJanrainService', function ($window) {

      this.janrainStatus = {
        linkExpired: false,
        loginRendered: false,
        /* login is rendered or not*/
        successErrorMessage: false,
        /* weather to display error/success message */
        janrainMessage: '' /* set message here */
      };

      /* we have to manipulate dom here */
      this.focusElement = function (screenName, elementName) {
        console.log('focusing element', screenName, elementName);
        var e = $('#capture_' + screenName + '_' + elementName);
        e.focus();
        e.val(e.val());
      };

      this.showErrorMessage = function (message) {
        $('.capture_rightText .capture_secondary').show();
        $('.capture_rightText .capture_processing').hide();
        this.clearPasswordField();


        if ($('#capture_signIn_signInForm_errorMessages').children().first().length) {
          $('#capture_signIn_signInForm_errorMessages').children().first().html(message);

        } else {
          message = '<div data-capturefield="undefined" class="capture_form_error capture_formerror_1426861805991" id="capture_signIn_formerror_1426861805991">' + message + '</div>';
          $('#capture_signIn_signInForm_errorMessages').html(message);
        }

      };
      this.displayMessage = function () {
        if (this.janrainStatus.successErrorMessage == true) {
          $('#capture_signIn_signInForm_successMessages .capture_form_success').html(this.janrainStatus.janrainMessage);
          $('#capture_signIn_signInForm_successMessages').show();
          $('#capture_signIn_signInForm_successMessages').show();
          this.janrainStatus.successErrorMessage = false;
        } else {

          $('#capture_signIn_signInForm_successMessages').hide();

        }
      };

      /** show success message */
      this.showSuccessMessage = function (message) {
        $('#capture_signIn_signInForm_successMessages').html(message);
        $('#capture_signIn_signInForm_successMessages').show();
        this.setSuccessErrorMessage(true);

      };

      /** hide processing only as we make another call after login with janarain */
      this.hideProcessing = function (message) {
        $('.capture_processing').hide();
        $(".capture_btn ").css({
          display: "auto"
        });
      };

      /** hide success message only */
      this.hideSuccessMessage = function () {
        $('#capture_signIn_signInForm_successMessages').hide();
      };

      /** hide message when you click again on login button */
      this.hideAllErrorMessage = function (message) {
        $('#capture_signIn_signInForm_errorMessages').hide();
        $('.capture_form_error').hide();
      };

      /** set link expred status here */
      this.setLinkExpired = function (status) {
        this.janrainStatus.linkExpired = "demo here";
      };

      this.closeJanrainModal = function () {
        console.log('in janran modal cose');
        $window.janrain.capture.ui.modal.close();
      };

      /** set link expred status here */
      this.getStatus = function () {
        return this.janrainStatus;
      };

      /** set tue/false here weather to show message when screen is rendered */
      this.setSuccessErrorMessage = function (status) {
        this.janrainStatus.successErrorMessage = status;
      };

      /** set message here that will be shown in to pop up*/
      this.setJanrainMessage = function (message) {
        this.janrainStatus.janrainMessage = message;
      };

      this.clearPasswordField = function () {
        document.getElementById("capture_signIn_currentPassword").value = "";

      };


      this.clearLocalStorageValue = function () {
        /* set keys that you do not wat to be deleted from local storage*/
        var keepKeys = ['janrainCaptureReturnExperienceData', 'janrainCaptureReturnExperienceData_Expires'];
        var keyValue = {};

        $.each(keepKeys, function (index, key) {
          keyValue[key] = $window.localStorage.getItem(key)
        });

        $window.localStorage.clear();

        $.each(keepKeys, function (index, key) {
          // localStorage.setLocalStorageValue(key,keyValue[key]);
          $window.localStorage.setItem(key, keyValue[key]);
        });
      };


      var i = 0;

      /* checks if janrain is ready and uses callback as function */
      this.checkJanrainModalReady = function (callback) {

        var checkJanrainModalReadyInner = function () {

          /* check if ready fire right away */
          if (window.janrain.loginUiModalReady == true && janrain.captureReady == true) {
            callback();
          }
          else {
            setTimeout(function () {
              console.info('checking janrain modal ready', i);
              i = i + 1;
              /* make sure janrain capture and janrain login modal is ready */
              if (window.janrain.loginUiModalReady == true && janrain.captureReady == true) {
                callback();
              } else {
                checkJanrainModalReadyInner();
              }
            }, 300);
          }
        };
        checkJanrainModalReadyInner();
      };

      this.renderEditProfile = function () {
        window.endtime = new Date();
        $('#janrainCaptureWidget').hide();
        $('#janrainCaptureWidget .janrain-capture-ui').hide();
        this.checkJanrainModalReady(function () {
          $window.janrain.capture.ui.renderScreen('editProfile');
        });
      };

      this.renderLogin = function () {
        this.checkJanrainModalReady(function () {
          console.log('render login from janrain service');
          $window.janrain.capture.ui.renderScreen('signIn');
        });
      };

    });
})();
(function () {

  'use strict';

  /**
   * @author Zain Syed | Manpreet Bhinder
   * @ngdoc factory
   * @name uteUserService
   * @description
   * @class ute-ui
   * @memberOf ute-ui
   */

  angular.module('ute.ui')

    .factory('uteUserService', function (uteCoreFactory, uteUtil, $modal, $window, $rootScope, $state, uteModal, commonService) {

      var service = {},
        self = {},
        collection = uteCoreFactory.collections;

      self.confirmLogOut = function () {
        var modalConfig = {
          templateUrl: 'modules/user/views/confirm-logout.html',
          controller: function ($scope, $modalInstance) {
            $scope.ok = function () {
              $modalInstance.close();
            };

            $scope.cancel = function () {
              $modalInstance.dismiss('cancel');
            };
          },
          ok: function () {
            self.logOut();
          },
          cancel: function () {
          }
        };

        // show modal
        uteModal.open(modalConfig);
      };

      self.logOut = function () {
        if (janrain.capture.ui.hasActiveSession() == true) {
          $window.janrain.capture.ui.endCaptureSession();
        }
        collection.userInfo = {};
        uteUtil.clearLocalStorageValue();
        $state.go('home');
        $rootScope.payment = {};
        commonService.resetServiceData();
      };

      service.promptResetPassword = function () {
        $modal.open({
          templateUrl: 'modules/user/views/reset-password.html',
          controller: 'resetPasswordCtrl',
          size: 'md',
          backdrop: false
        });
      };

      service.promptAutoRegComplete = function () {
        $modal.open({
          templateUrl: 'modules/user/views/registration-complete.html',
          controller: 'registrationCompleteCtrl',
          size: 'md',
          backdrop: false
        });
      };


      service.logout = function (confirm) {
        if (confirm === true) {
          self.confirmLogOut();
        } else {
          self.logOut();
        }
      };

      service.login = function ($userdata) {
        /* make sure logic goes here after login */
        collection.userInfo = $userdata;
      };

      return service;

    });

})();
(function () {

  'use strict';

  /**
   * @author Ronald Nicholls
   * @description changes capacity to MB or GB
   * @class ute-ui
   * @memberOf ute-ui
   */
  angular.module('ute.ui')

    .filter('uteCapacity', function ($rootScope, uteLocale) {

      // Angular filter to handle the Canadian French and English formatting.
          
      return function (capacity, languageKey, showDecimals) {

        //languageKey = angular.isDefined(languageKey) ? languageKey : 'en';
        //showDecimals = angular.isDefined(showDecimals) ? showDecimals : true;
                        
        var setLanguage = languageKey || uteLocale.language() || 'en',
          capacityMB,
          capacityGB,
          calculateCapacity = function (capacity) {
            if (capacity >= 1000) {

              if (showDecimals === false) {
                return (Math.round(Number(capacity) / 1024)) + ' ' + capacityGB;
              } else {
                return (Math.round((Number(capacity) / 1024) * 100) / 100) + ' ' + capacityGB;
              }

            } else {
              return capacity + ' ' + capacityMB;
            }
          };

        if (setLanguage === 'en') {

          capacityMB = 'MB';
          capacityGB = 'GB';
          return calculateCapacity(capacity);

        } else if (setLanguage === 'fr') {

          capacityMB = 'Mo';
          capacityGB = 'Go';
          return calculateCapacity(capacity);

        } else {

          console.warn('language is not defined', setLanguage);

        }

      };

    });

})();

(function () {

  'use strict';

  // to be replaced by https://github.com/urish/angular-moment

  /**
   * @author Chester Rivas
   * @description wrapper filter for moment dates
   * @class ute-ui
   * @memberOf ute-ui
   */
  angular.module('ute.ui')

    .filter('uteDateFormatter', function (moment, uteLocale) {

      return function (date, dateFormat, languageKey) {

        angular.isUndefinedOrNull(dateFormat) && (dateFormat = 'LLLL'); // defaults to LLLL
        angular.isUndefinedOrNull(languageKey) && (languageKey = 'en'); // defaults to en

        var newMoment = moment(date);
        newMoment.locale(uteLocale.locale(languageKey));
        return newMoment.format(dateFormat);

      };


    });

})();

(function () {

  'use strict';

  /**
   * @class ute-ui
   * @memberOf ute-ui
   */


  /**
   * @memberOf ute-ui
   * @description returns credit card type from card number
   * @param {String} credit card number
   * @example
   *   uteCyberSource.getCardType('4444444444444448'); // VISA
   * @returns {String} credit card type; VISA, MASTER, or AMEX
   */
  var getCardType = function (number) {
    if (number.match(/^4[0-9]{12}(?:[0-9]{3})?$/)) {
      return 'VISA';
    } else if (number.match(/^5[1-5][0-9]{14}$/)) {
      return 'MASTER';
    } else if (number.match(/^3[47][0-9]{13}$/)) {
      return 'AMEX';
    } else if (number) {
      return '';
    }
    return undefined;
  };

  /**
   * @memberOf ute-ui
   * @description returns tokenized credit card number
   * @param {String} tokenized credit card number
   * @example
   *   uteCyberSource.getMaskedToken('9999999999991234'); // **** **** **** 1234
   * @returns {String} masked credit card number
   *   i.e., '**** **** **** 1234'
   */
  var getMaskedToken = function (token) {
    if (token.length == 15) {
      return '**** ****** *' + token.substr(11);
    } else {
      return '**** **** **** ' + token.substr(12);
    }
  };

  /**
   * @memberOf ute-ui
   */
  var getCybersourceUrl = function (cardNumber, uteEncryption, config) {
    var rsaEncrypted = uteEncryption(cardNumber, config.modulus, config.publicExponent);

    var JSONData = {
      pan: rsaEncrypted,
      sig: config.signature,
      si: config.systemIndicator,
      ts: config.timestamp,
      type: getCardType(cardNumber).substr(0, 1),
      service: config.serviceVal
    };
    var jsonStr = JSON.stringify(JSONData);

    var url = config.url +
      '?merchantID=' + config.applicationId +
      '&jsonstring=' + encodeURIComponent(jsonStr) + '&callback=JSON_CALLBACK';
    return url;
  };

  /**
   * @memberOf ute-ui
   * @class ute-ui.uteCyberSource
   * @name uteCyberSourceProvider
   * @description  uteCyberSource provider object
   */
  angular.module('ute.ui')

    .provider('uteCyberSource', function () {

      /**
       * @memberOf ute-ui
       * @class ute-ui.uteCyberSource
       * @this uteCyberSourceProvider
       * @description  set signature url
       * @param {String} url
       * @example
       *   uteCyberSourceProvider.setSignatureUrl('http://my.backend.com/signagurePath');
       */
      this.setSignatureUrl = function (url) {
        this.signatureUrl = url;
      };

      /**
       * * @memberOf ute-ui
       * @class ute-ui.uteCyberSource
       * @this uteCyberSourceProvider
       * @description  set decryption url
       * @param {String} url
       * @example
       *   uteCyberSourceProvider.setDecryptionUrl('http://my.backend.com/decryptionPath');
       */
      this.setDecryptionUrl = function (url) {
        this.decryptionUrl = url;
      };

      this.$get = function ($http, uteEncryption, $q) {
        var _this = this;
        return {
          getCardType: getCardType,
          getMaskedToken: getMaskedToken,

          /**
           * @class ute-ui.uteCyberSource
           * @description returns promise with encrypted token response
           * @param {String} credit card number
           * @example
           *   uteCyberSource.getEncryptedToken('4444444444444448').then(function(result) {
           *     console.log(result.data);
           *   });
           * @returns {HttpPromise} Future object
           */
          getEncryptedToken: function (cardNumber) {
            var deferred = $q.defer();
            $http.post(_this.signatureUrl).success(function (resp) {
              var url = getCybersourceUrl(cardNumber, uteEncryption, resp);
              deferred.resolve($http.jsonp(url));
            }).error(function (error) {
              deferred.reject('invalid cybersource environment, could not get uteEncryption signature');
            });
            return deferred.promise;
          },

          /**
           * @class ute-ui.uteCyberSource
           * @description returns promise with decrypted token response
           * @param {Object} response from #getEncryptedToken
           *     i.e. {token: 'xxxx', iin: 'xxxxx', rc: '100'}
           * @param {String} credit card type. i.e., 'V', 'M', or 'A'
           * @example
           *   uteCyberSource.getEncryptedToken(encrypted, 'M').then(function(result) {
           *     console.log(result.data);
           *   });
           * @returns {HttpPromise} Future object
           */
          getDecryptedToken: function (encrypted, cardType) {
            var url = _this.decryptionUrl +
              '?encryptedToken=' + encrypted.token +
              '&bin=' + encrypted.iin +
              '&result=' + encrypted.rc +
              '&creditCardType=' + cardType;
            return $http.post(url);
          }
        };
      };
    });
})();