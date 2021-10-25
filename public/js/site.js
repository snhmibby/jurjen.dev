//site global js functions
//navigation bar toggler
function toggleMenu() {
  menu = document.getElementById("main-menu");
  menu.classList.toggle('toggle-visible');
}

let inits = [];

window.onload = function () {
  /* initialize all javascript after loading the DOM */
  let i;

  for (i = 0; i < inits.length; i++) {
    inits[i]();
  }
};
/*******************************************************************************
 * Collapsible implementation (style: "collapsible.scss")
 */


inits.push(function () {
  for (var collapsible of document.getElementsByClassName("collapsible")) {
    collapsible.addEventListener("click", function () {
      this.classList.toggle("collapsible-closed");
      let content = this.nextElementSibling;
      content.classList.toggle('toggle-visible');
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

