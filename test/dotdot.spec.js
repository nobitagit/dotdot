/**
* For a list of keycodes see: http://help.adobe.com/en_US/AS2LCR/Flash_10.0/help.html?content=00000520.html
*
*/
describe('dotdot', function() {

	"use strict";

	var inputEl,
      evts = {};

  function createEvt(evt, key){
    evts[evt] = document.createEvent('HTMLEvents');
    evts[evt].initEvent(evt,true,false);
    if(key){
      evts[evt].keyCode = key;      
    }
  }

	beforeEach(function() {
		inputEl = document.createElement('input');
		inputEl.id = 'myInput';
		document.body.appendChild(inputEl);
		//Dotdot(inputEl);

	});

	afterEach(function(){
		document.body.removeChild(inputEl);
	});

  it('check if the dummy input is correctly placed', function() {
    expect(inputEl).not.toBe(undefined);
    expect(inputEl.id).toBe('myInput');
  });

  it('should expose the Dotdot function properly', function() {
    expect(Dotdot).not.toBe(undefined);
  });

  it('should throw an error when no input element is passed as first param', function(){
  	// see: http://codepen.io/jweden/pen/Irmil/
  	// http://stackoverflow.com/questions/18055095/how-do-i-use-jasmine-to-test-a-text-length-counter
  	// http://stackoverflow.com/questions/19073570/how-to-add-jquery-to-jasmine-angularjs-unittests
  	expect(Dotdot).toThrow();
  });

  it('should not allow entering non numeric chars in the field', function(){
    Dotdot(inputEl);
    inputEl.value = 'f';
    createEvt('keyup', 70);
    inputEl.dispatchEvent(evts.keyup);
    expect(inputEl.value).toBe('');

    inputEl.value = 'm';
    createEvt('keyup', 77);
    inputEl.dispatchEvent(evts.keyup);
    expect(inputEl.value).toBe(''); 

    inputEl.value = '.';
    createEvt('keyup', 190);
    inputEl.dispatchEvent(evts.keyup);
    expect(inputEl.value).toBe('');       
  });

  it('should not fire when just moving with arrows', function(){
    // This string would normally be stripped if entered or copy pasted
    // but we use it in this test to make sure that the script does not fire when
    // using arrow keys only.
    var str = 'some random string',
        arrowKeys = [37, 38, 39, 40];
    Dotdot(inputEl);
    inputEl.value = str;

    for(var i = 0; i < arrowKeys.length; i++){
      createEvt('keyup', arrowKeys[i]);
      inputEl.dispatchEvent(evts.keyup);
      expect(inputEl.value).toBe(str);
    }   
  });

  it('should strip non numeric chars only when pasting a string with both integers and letters', function () {
    Dotdot(inputEl);  
    inputEl.value = 'aryydr....,779saa';  
    createEvt('paste');
    inputEl.dispatchEvent(evts.paste); 
    expect(inputEl.value).toBe('779');       
  });

  it('should properly add a dot every 3 charachters in a number starting from the last integer', function () {
    Dotdot(inputEl);  
    inputEl.value = '1234567890';  
    createEvt('paste');
    inputEl.dispatchEvent(evts.paste); 
    expect(inputEl.value).toBe('1.234.567.890');       
  });

  it('should properly add the dots to strings with mixed integers and other chars', function () {
    Dotdot(inputEl);  
    inputEl.value = 'ary4241yd888r..7..,779saa';  
    createEvt('paste');
    inputEl.dispatchEvent(evts.paste); 
    expect(inputEl.value).toBe('42.418.887.779');       
  });
});




