/**
* For a list of keycodes see: http://help.adobe.com/en_US/AS2LCR/Flash_10.0/help.html?content=00000520.html
*
*/
describe('dotdot', function() {

	"use strict";

	var inputEl,
      keyupEvt,
      pasteEvt;

  function createKeyupEvt(key){
    keyupEvt = document.createEvent('HTMLEvents');
    keyupEvt.initEvent('keyup',true,false);
    keyupEvt.keyCode = key;
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

  it('should not allow entering letters', function(){
    Dotdot(inputEl);
    inputEl.value = 'f';
    createKeyupEvt(70);
    inputEl.dispatchEvent(keyupEvt);
    expect(inputEl.value).toBe('');

    inputEl.value = 'm';
    createKeyupEvt(77);
    inputEl.dispatchEvent(keyupEvt);
    expect(inputEl.value).toBe(''); 

    inputEl.value = '.';
    createKeyupEvt(190);
    inputEl.dispatchEvent(keyupEvt);
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
      createKeyupEvt(arrowKeys[i]);
      inputEl.dispatchEvent(keyupEvt);
      expect(inputEl.value).toBe(str);
    }   
  });

    
});




