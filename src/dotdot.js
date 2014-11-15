;(function(window, document, undefined){

  'use strict';

  var DEFAULTS = {
    paste: false
  };
  
  function _extend( a, b ) {
    for ( var prop in b ) {
      if( b.hasOwnProperty(prop) ){
        a[ prop ] = b[ prop ];        
      }
    }
    return a;
  }

  var Dotdot = function( el, opts ){

    if(opts){
      DEFAULTS = _extend(DEFAULTS, opts);      
    }

    el.addEventListener('keyup', function(){
      // prevent every character except numbers to be entered
      if(!this.value.slice(-1).match(/^[0-9]+\.?[0-9]*$/) ){
        this.value = this.value.slice(0, -1);
        return;
      }
      // remove the dots, split the string and reverse it
      var a = this.value.replace(/\./g, '').split('').reverse();

      // start from 3 and as long as there's a number 
      // add a dot every three digits.
      var pos = 3;
      while(a[pos] !== undefined){
        a.splice(pos,0,'.');
        pos = pos + 4;
      }  
      // reverse, join and reassign the value
      this.value = a.reverse().join('');  
    }, false);
  };

  window.Dotdot = Dotdot;

})(window, document);