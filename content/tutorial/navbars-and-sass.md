---
title: "Navigation"
date: 2021-10-22
draft: false
series: "My 1st Website"
tags: ["Hugo", "CSS", "jQuery", "Javascript"]
---

In this tutorial, we will create a simple navigation bar that works for both
mobile and desktop browsers. We will look into Hugos Pipelines and do our first
bit of Javascript programming.
<!--more-->

# Learning CSS, SASS edition

I thought all stylesheet examples looked convoluted and confusing (they are).
So I decided to switch to using a CSS framework ([Bootstrap](https://getbootstrap.com/),
it's quite nice).  However, I came across
SASS and it just made CSS much easier to use AND understand. Having a bit of
structure makes all the difference for comprehension and readability.

So I decided to not use bootstrap for this site, but use SASS stylesheets instead.
Conveniently, Hugo has excellent support for them.

## Set up a SASS pipeline with Hugo

In partial/head.html, you will want something like this:
```HTML
<!-- Custom CSS -->
{{ $site := resources.Get "scss/site.scss" | toCSS }}
<link rel="stylesheet" href="{{$site.RelPermalink}}">
```
This is called a [pipeline](https://gohugo.io/templates/introduction/#pipes),
they string [template](https://gohugo.io/templates/introduction/) functions
together. This example will look up 'assets/scss/site.scss' call a SASS
'compiler' on it (which produces a CSS object) and then later we use the
.RelPermalink method on this object, which tells Hugo to create the css object
in our site and link to it.

I found this [here](https://github.com/spech66/hugo-best-practices#css-and-javascript).
It's a collection of Hugo tips!

With this snippet in place, you can just edit your scss files and Hugo (if
the development server is running) will recompile them and automatically
update the page you're viewing, which makes trying out different styles and
options as easy as editing your scss file and saving it!

## Adding a navigation bar to the website
Now that I got rid of the Bootstrap CSS library, I cannot use their
navigation bar anymore... Time to make one myself!  Since we live in 2021,
and everybody has mobiles and smaller screens, the navigation bar should
adapt to that. It does so by using a [flex container](https://css-tricks.com/snippets/css/a-guide-to-flexbox/#examples), and switching it from row mode to column mode through a
[CSS media query](https://css-tricks.com/a-complete-guide-to-css-media-queries/).

Also, we will add a cool icon bar, with a menu icon and add some
[Javascript](https://api.jquery.com/toggleclass/) code to open and close our menu to provide some funny interaction.

This is the HTML template:
```HTML
<nav class="nav-main">
	<div class="nav-icon-bar">
		<a href="#" onclick='$("#main-menu").toggleClass("toggle-visible")'><i class="bi bi-list"></i></a>
		<a href="/"><i class="bi bi-house-fill"></i></a>
		<a href="https://wiki.jurjen.dev"><i class="bi bi-stickies-fill"></i></a>
		<a href="https://github.com/snhmibby"><i class="bi bi-github"></i></a>
	</div>

	<div id="main-menu" class="nav-menu">
		<a href="/">Home</a>
		{{ $currentPage := . }}
		{{ range .Site.Menus.main }}
			<a  href="{{ .URL }}"
			{{ if $currentPage.IsMenuCurrent "main" . }}
				class="active"
			{{ end }}>
			{{ .Name }}
			</a>
		{{ end }}

		<a href="https://wiki.jurjen.dev">Wiki</a>
		<a href="https://github.com/snhmibby">Github</a>
	</div>
</nav>
```

The CSS looks like this:
```SCSS
/* Navigation bar, structure is:
 * <nav>
 *   <div class="nav-icon-bar"/>
 *   <div class="nav-menu">
 *   	<a>menu link
 *   	...
 * Support for small screens through flexbox and media queries
 */

.nav-main {
	background-color: #333;

	a {
		display: block;
		padding: 5px;
		color: white;
		text-decoration: none;
		&:hover {
			background-color: darkred;
		}
	}

	.nav-icon-bar,
	.nav-menu {
		display: flex;
	}

	.toggle-visible {
		display: none;
	}

	@media (max-width: 350px) {
		.nav-menu {
			flex-direction: column;
		}
	}
}
```


# Follow along!
0. The example uses the [jQuery](https://jquery.com/download/) library and [Bootstrap Icons](https://icons.getbootstrap.com/). Install both in the static/ directory (or link to a cdn)
   and update the head.html template so that they are automatically added on all our pages.
1. [Center the text](https://www.w3schools.com/css/css_text_align.asp) in the links so column mode looks better.
2. Hugo has support for [menu generation](https://gohugo.io/templates/menu-templates/). Set ```sectionPagesMenu="main"``` in config.toml
3. Create ```partials/navbar.html``` and add it in the default baseof.html template in the HTML body.
4. Create ```assets/navbar.scss```, include 'navbar.scss' in 'site.scss'.

Our navigation bar will be added on every page on the entire site! Notice how
we only had to include it explicitly in one place.

# Exercises:
- Importing the entire jQuery library just because we want to use a single
  function is wasteful. Implement the toggleMenu function using [standard
  Javascript
  functions](https://developer.mozilla.org/en-US/docs/Web/API/Element/classList).

