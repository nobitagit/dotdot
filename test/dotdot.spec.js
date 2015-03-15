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

  it('should allow numeric chars in the field', function(){
    Dotdot(inputEl);
    inputEl.value = '7';
    createEvt('keyup', 90);
    inputEl.dispatchEvent(evts.keyup);
    expect(inputEl.value).toBe('7');      
  });

  it('should not fire when just moving with arrow key inside the field', function(){
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

  it('should work also when instantiated with HTML collections', function () {

    var inputEl2 = document.createElement('input');
    inputEl2.id = 'myInput2';
    document.body.appendChild(inputEl2);
    
    var elems = document.getElementsByTagName('input');

    Dotdot(elems);

    inputEl.value = '123d4';
    createEvt('keyup', 100);
    inputEl.dispatchEvent(evts.keyup); 
    expect(inputEl.value).toBe('1.234');

    inputEl2.value = '1234';
    createEvt('keyup', 100);
    inputEl2.dispatchEvent(evts.keyup); 
    expect(inputEl2.value).toBe('1.234');    
  });
});




