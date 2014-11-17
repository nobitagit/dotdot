;(function(window, document, undefined){

  'use strict';

  var DEFAULTS = {},
      arrowKeys = [37, 38, 39, 40];
  
  function _extend( a, b ) {
    for ( var prop in b ) {
      if( b.hasOwnProperty(prop) ){
        a[ prop ] = b[ prop ];        
      }
    }
    return a;
  }

  function _attachEvts( elem ){
    elem.addEventListener('keyup', _addDots, false); 
    elem.addEventListener('paste', _addDots, false); 
  }

  function _addDots(e) {
    // Don't execute anything if the user is just moving the cursor around and
    // not really enetring anything new.
    if(arrowKeys.indexOf(e.keyCode) !== -1){ return; }
    // keep track of the cursor position for later
    var cursorPos = this.selectionEnd,
        len = this.value.length,
        newLen,
        // remove the dots (and any non-integer character), 
        // split the string and reverse it
        a = this.value.replace(/\D/g,'').split('').reverse();

    // start from 3 and as long as there's a number 
    // add a dot every three digits.
    var pos = 3;
    while(a[pos] !== undefined){
      a.splice(pos,0,'.');
      pos = pos + 4;
    }  
    newLen = a.length;    
    // reverse, join and reassign the value
    this.value = a.reverse().join(''); 
    // Compare the original string with the generated one.
    // If the 2 strings length are identical (hence no new dot was added)
    // place the cursor at the same position it was placed in the beginning.
    // If the strings length is different a new dot was added and we need to
    // shift the cursor one step forward.
    this.selectionEnd = len === newLen ? cursorPos : cursorPos + 1;
    console.log(cursorPos%4)
    this.focus();
  }

  var Dotdot = function( node, opts ){

    if(!node){
      throw new Error('Dotdot needs an input element to be passed as a parameter');
    }

    if(opts){
      DEFAULTS = _extend(DEFAULTS, opts);      
    }

    if(node.length !== undefined){
      Array.prototype.forEach.call(node, _attachEvts);
    } else {
      _attachEvts(node);
    }
  };

  window.Dotdot = Dotdot;

})(window, document);