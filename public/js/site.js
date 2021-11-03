//import sum from "lib/math"; //top level
//site global js functions
let inits = [];

window.onload = function () {
  /* initialize all javascript after loading the DOM */
  let i;

  for (i = 0; i < inits.length; i++) {
    inits[i]();
  }
};
/*******************************************************************************
 * navigation bar toggler
 */


const MENUCOOKIE = 'menu-toggle-visible';

function toggleMenu() {
  menu = document.getElementById("main-menu");
  menu.classList.toggle('toggle-visible');
  showmenu = menu.classList.contains('toggle-visible');
  setCookie(MENUCOOKIE, showmenu, 3);
}

inits.push(() => {
  if (getCookie(MENUCOOKIE)) {
    menu = document.getElementById("main-menu");
    menu.classList.add('toggle-visible');
  }
});
/*******************************************************************************
 * Cookie handling
 */
//https://stackoverflow.com/questions/51312980/how-to-get-and-set-cookies-in-javascript

function setCookie(name, value, days) {
  var expires = "";

  if (days) {
    var date = new Date();
    date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000);
    expires = "; expires=" + date.toUTCString();
  }

  document.cookie = name + "=" + (value || "") + expires + "; path=/";
}

function getCookie(name) {
  var nameEQ = name + "=";
  var ca = document.cookie.split(';');

  for (var i = 0; i < ca.length; i++) {
    var c = ca[i];

    while (c.charAt(0) == ' ') c = c.substring(1, c.length);

    if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length, c.length);
  }

  return null;
}
/*******************************************************************************
 * Collapsible implementation (style: "collapsible.scss")
 */


inits.push(function () {
  for (var collapsible of document.getElementsByClassName("collapsible")) {
    collapsible.addEventListener("click", function () {
      this.classList.toggle("collapsible-closed");
    });
  }
});
/*******************************************************************************
 * Article Collapser (style: "collapse-article.scss")
 * functions for making a document collapsible
 * See tutorial/collapsible-article
 */

/* take all article tags and then add collapse-functionaly to all headers */

inits.push(function () {
  for (var article of document.getElementsByTagName("article")) {
    for (var h1 of article.getElementsByTagName("h1")) {
      addFold(h1, "h1");
    }

    for (var h2 of article.getElementsByTagName("h2")) {
      addFold(h2, "h2");
    }

    for (var h3 of article.getElementsByTagName("h3")) {
      addFold(h3, "h3");
    }
  }
});

function addFold(node, foldname) {
  node.classList.add("collapsible");
  node.addEventListener("click", ev => {
    let clicked = ev.currentTarget;
    clicked.classList.toggle("collapsible-closed");
    doAfter(ev.currentTarget, el => {
      el.classList.toggle("collapsible-hide-" + foldname);
    });
  });
} //return header lvl of this node


function lvl(n) {
  console.log(n);

  switch (n.tagName) {
    case "H1":
      return 1;

    case "H2":
      return 2;

    case "H3":
      return 3;

    case "H4":
      return 4;

    case "H5":
      return 5;

    case "H6":
      return 6;

    default:
      return 7;
  }
}

function doAfter(node, fn) {
  let cur = node.nextElementSibling;

  while (cur && lvl(node) < lvl(cur)) {
    fn(cur);
    cur = cur.nextElementSibling;
  }
}
/* Testing features of javascript
 * see:
 * - ES2015 https://babeljs.io/docs/en/learn
 * - Web Components https://github.com/mdn/web-components-examples
 * - React JSX https://reactjs.org/docs/introducing-jsx.html
 */
//pattern matching in javascript


[a, _, b] = [1, 2, 3];
console.log(a);
console.log(b); // Interpolate variable bindings

var name = "Jurjen",
    time = "!!";
console.log(`Hello ${name}, how are you ${time}?`); // Fail-soft destructuring with defaults

var [a = 1] = [];
console.log(a === 1); // Destructuring + defaults arguments

function r({
  x,
  y,
  w = 10,
  h = 10
}) {
  return x + y + w + h;
}

r({
  x: 1,
  y: 2
}) === 23;
let fibonacci = {
  [Symbol.iterator]() {
    let pre = 0,
        cur = 1;
    return {
      next() {
        [pre, cur] = [cur, pre + cur];
        return {
          done: false,
          value: cur
        };
      }

    };
  }

};
/*
for (var n of fibonacci) {
	// truncate the sequence at 100
	if (n > 100)
		break;
	console.log(n);
}
*/
//generator functions simplify writing iterators:
//note: yield/return can also be used in an iterator

function* fib2() {
  let pre = 0;
  let cur = 1;

  while (true) {
    [pre, cur] = [cur, pre + cur];
    yield cur;
  }
}

for (var n of fib2()) {
  if (n > 100) break;
  console.log(n);
} //libraries:


console.log("using imported function: " + math.sum(1337, 0));

