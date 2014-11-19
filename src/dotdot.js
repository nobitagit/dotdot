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

  // Compare the original string with the generated one.
  // If the 2 strings length are identical (hence no new dot was added)
  // place the cursor at the same position it was placed in the beginning.
  // If the new string is longer put the cursor one place forward.
  // if it's shorter put it one place backwards.
  function _getSelectionEnd(len, newLen, cursorPos){
    if(len === newLen){
      return cursorPos;
    } else if(newLen > len){
      return cursorPos + 1;
    } else {
      return cursorPos - 1;
    }
  }

  function _addDots( e ) {
    // Don't execute anything if the user is just moving the cursor around and
    // not really enetring anything new.
    if(arrowKeys.indexOf(e.keyCode) !== -1){ return; }
    // keep track of the cursor position for later
    var cursorPos = this.selectionEnd,
        len = this.value.length,
        newLen;

    // remove the dots (and any non-integer character), 
    // split the string and reverse it
    var a = this.value.replace(/\D/g,'').split('').reverse();

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

    this.selectionEnd = _getSelectionEnd(len, newLen, cursorPos);
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