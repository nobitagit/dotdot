describe('dotdot', function() {

	"use strict";

	var inputEl,
			keyUpEvt;

	beforeEach(function() {
		inputEl = document.createElement('input');
		inputEl.id = 'myInput';
		document.body.appendChild(inputEl);
		Dotdot(inputEl);
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

  it('should', function(){
  	//inputEl.value();
  	// see: http://codepen.io/jweden/pen/Irmil/
  	// http://stackoverflow.com/questions/18055095/how-do-i-use-jasmine-to-test-a-text-length-counter
  	// http://stackoverflow.com/questions/19073570/how-to-add-jquery-to-jasmine-angularjs-unittests
  	console.log(document)
  });
});