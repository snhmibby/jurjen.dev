---
title: "Collapsible"
date: 2021-10-25T01:18:48+02:00
draft: false
series: "Beginner Javascript"
tags: ["Javascript", "CSS", "Programming", "Web"]
---

We will make a component that can show or collapse its content so a page isn't cluttered too much.
<!--more-->


# Approach

We will make a class "collapsible", with the implicit expectation that the next element in the document is its content.
Clicking the collapsible will open or close its content.
For visual feedback we add a + or - sign to the header.

## Javascript
Let's start with javascript this time.  To open and close a collapsible we
toggle the collapsible-closed class in the header and the toggle-visible class
in its content.

To register click handlers, we create a simple initialization function that is
called when the document is loaded.

```Javascript
var inits = [] //a list of functions to call at startup
window.onload = function() {
	//execute all initialization functions
	for (let i = 0; i < inits.length; i++) {
		inits[i](); //this is how you execute a function in an array
	}
};

/* simple collapsible implementation */
inits.push(function () {
	let a = document.getElementsByClassName("collapsible");
	for (let i = 0; i < a.length; i++) {
		a[i].addEventListener("click", function () {
			this.classList.toggle("collapsible-closed");
			var content = this.nextElementSibling;
			content.classList.toggle('toggle-visible')
		});
	}
});
```

## CSS
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

.toggle-visible {
	display: none !important;
}

```

## Try it on codepen

{{< codepen "vYJgqrK" >}}
