---
title: "Basic DOM traversal"
date: 2021-10-25T08:49:11+02:00
draft: false
series: "Beginner Javascript"
tags: ["DOM", "Javascript", "Programming"]
---

Having made such a nice collapsible in the last tutorial, it would be nice if
we can apply it to make an entire article foldable. Taking a quick look at the
HTML output of our articles it is obvious that it won't be as easy as making
every h1, h2, h3 element collapsible -- our markdown converter appears to be
making a flat file, even though it's input is tree structured by the header
tags. However, with some simple Javascript programming, we can still achieve
our goal.

# How we will do it
There are 2 obvious approaches, one would be to adjust the HTML document so
that we can use our standard collapsible on every header tag. This seems like 
a clean and neat way to do it. Unfortunately we don't control our markdown generator.
We will do this with Javascript in some next tutorial about DOM manipulation.

The other is to walk over the HTML tree starting at the header we want to
collapse and hide or show everything until we find the next one.  In order to
achieve this, we will use the [Javascript](https://devdocs.io/javascript/)
[DOM](https://devdocs.io/dom/) [element](https://devdocs.io/dom/element) interface methods to walk over our
HTML, toggling display-ability of the nodes we find.

We will make the following assumptions:
- The only content worth folding is within ```<article>``` HTML tags
- The next same level header will be at the same level in the DOM, meaning we will not traverse down children to find the next header.

We will hardcode some levels of folding, using different classes to toggle content.
We cannot use our simple toggle-visible class, because different layers of folding would toggle the same visibility!

## Walking a list

If you haven't read the last tutorial [collapsibles](../collapsible/), do
so now.  This will be basically the same, except we will use the
[elements'](https://devdocs.io/dom/element)
[next](https://devdocs.io/dom/element/nextelementsibling) fields to find
everything until the next header that is higher or equal to the current one.

```Javascript
function addFold(node, foldname) {
	node.classList.add("collapsible")
	node.addEventListener("click", (ev) => {
		let clicked = ev.currentTarget
		clicked.classList.toggle("collapsible-closed")
		doAfter(ev.currentTarget, (el) => {
			el.classList.toggle("collapsible-hide-" + foldname)
		});
	});
}

function lvl(n) {
	switch (n.tagName) {
		case "H1": return 1;
		case "H2": return 2;
		case "H3": return 3;
		case "H4": return 4;
		case "H5": return 5;
		case "H6": return 6;
		default: return 7;
	}
}

function doAfter(node, fn) {
	let cur = node.nextElementSibling
	while (cur && lvl(node) < lvl(cur)) {
		fn(cur)
		cur = cur.nextElementSibling
	}
}

//find all headers in an article and make them foldable
for (var article of document.getElementsByTagName("article")) {
	for (var h1 of article.getElementsByTagName("h1")) {
		addFold(h1, "h1")
	}
	for (var h2 of article.getElementsByTagName("h2")) {
		addFold(h2, "h2")
	}
	for (var h3 of article.getElementsByTagName("h3")) {
		addFold(h3, "h3")
	}
}

```

Our CSS is the same as our collapsible CSS, except it adds some
header-level dependent classes to toggle visibility.
```SCSS

.collapsible {
	display: block;
	cursor: pointer;
	border-bottom: 2px solid darkgrey;

	&::before {
		position: absolute;
		content: "-";
		left: 10px;
	}
	&.collapsible-closed::before {
		content: "+";
	}
}

.collapsible-hide-h1,
.collapsible-hide-h2,
.collapsible-hide-h3 {
	display: none !important;
}
```


# Codepen
{{< codepen "XWaMzWE" >}}

# Exercises
1. We made the assumption that the next same level header will be at the same
   level in the DOM tree. This seems sensible, but not everybody is.  Use the
   elements' [children](https://devdocs.io/dom/element/children) to [recurse]()
   down and stop when you find a higher or same lvl() header.
2. (for extremely poor formatted HTML, I guess). Element is a subclass of
   [Node](https://devdocs.io/dom/node), use the
   [parentNode](https://devdocs.io/dom/node/parentnode) to go up to find the
   next same level header also.
3. The UI doesn't clue people how far a header reaches.  Create visual
   clues on the page that give the user an indication of what will be
   folded and on what level a header operates.
   Indentation and highlighting might help. So might CSS [Custom properties](https://developer.mozilla.org/en-US/docs/Web/CSS/Using_CSS_custom_properties)
