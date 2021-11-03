---
title: "Modern Javascript"
date: 2021-10-27T10:43:01+02:00
draft: false
series: "Beginner Javascript"
tags: []
---

It's not 1995 anymore...
A list of links to modern Javascript features.
Basically my todo list of things to get familiar with.
Expect tutorials on this subject in the future :)
<!--more-->


# OOP in Javascript
This is a collection of syntax, not an introduction to OOP.
I just copied some interesting things for myself from the [MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Classes)

```Javascript
class Rectangle {
	height = 0; //public field
	#width = 0; //private field
	constructor(width, height) {
		this.width = width
		this.height = height
	}

	//method
	calcArea() {
		return this.height * this.width;
	}

	//getter
	// use like: 'myrect.get'  (no parenthesis)
	get area() {
		return this.calcArea()
	}

	//iterator
	*vertexes() {
		yield Point(0, 0);
		yield Point(0, height);
		yield Point(width, height)
		yield Point(width, 0)
	}
}

class Square extends Rectangle {
	constructor(size) {
		super(size, size)
	}
}
```

# ES2015
Javascript has new fancy language features like:
- pattern matching
- generators/iterators
- object reflection
- weak references/maps
- asynchronous values (Promise?)


# Web components
Javascript can 'attach' ['shadow' DOM trees](https://developer.mozilla.org/en-US/docs/Web/Web_Components/Using_shadow_DOM) into the main one.
Subclassing HTMLElements allows you to create custom tags.

# Other things to look into
- [JSX](https://reactjs.org/docs/introducing-jsx.html)
- Setting up/configuring [babel](https://babeljs.io/) beyond the defaults of Hugo

# Conclusion
Lots of new stuff to learn...
