dotdot
======

This script masks an input field by adding a dot every three digits starting from the last integer and allowing only numbers to be typed in.

You can use it with both vanilla JavaScript and jQuery, although jQuery is NOT required.
Simply pass your selector(s) like this: 

```javascript
var elems = document.getElementsByTagName('input')
Dotdot(elems);

// or...
var elems = $('#myElem');
Dotdot(elems);

```

Look in the `demo/` folder for an example or check this [bin](http://jsbin.com/yateme/2).


