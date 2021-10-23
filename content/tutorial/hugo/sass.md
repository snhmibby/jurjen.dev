---
title: "Sass"
date: 2021-10-22T15:54:14+02:00
draft: false
---

# Back to learning CSS, SASS edition

I thought all stylesheet examples looked convoluted and confusing (they are).
So I decided to switch to using a CSS framework ([Bootstrap](https://getbootstrap.com/),
it's quite nice).  However, I came across
SASS and it just made CSS much easier to use AND understand. Having a bit of
structure makes all the difference for comprehension and readability.

So I decided to not use bootstrap for this site, but use SASS stylesheets instead.
Conveniently, Hugo has excellent support for them.

## Set up SASS stylesheets with Hugo

In partial/head.html, you will want something like this:
```HTML
<!-- Custom CSS -->
{{ $custom := resources.Get "scss/custom.scss" | toCSS }}
{{ $css := $custom | minify | fingerprint }}
<link rel="stylesheet" href="{{$css.RelPermalink}}" integrity="{{$css.Data.Integrity}}">
```
See also: [Hugo best practices](https://github.com/spech66/hugo-best-practices#css-and-javascript) for more tips!

Now you can just edit your scss files, include them in
<code>assets/scss/custom.scss</code> and Hugo (if the development server is
running) will recompile them and update the page you're viewing, which makes
trying out different styles and options until it's "just right" an extremely
pleasant experience.

## Adding a navigation bar to the website
Now that I got rid of the Bootstrap CSS library, I cannot use their
navigation bar anymore... Time to make one myself!  Since we live in 2021,
and everybody has mobiles and smaller screens, the navigation bar should
adapt to that.  So, there will be 1 button that can hide and open the
navigation bar (the typical 'hamburger' icon. This one comes from [Bootstrap
Icons](https://icons.getbootstrap.com/#install).  The CSS will use [media
queries](https://css-tricks.com/a-complete-guide-to-css-media-queries/) to
switch a [flex
container](https://css-tricks.com/snippets/css/a-guide-to-flexbox/#examples)
to a column layout when the screen gets too small.

It should be simple enough... Here is the HTML for the navigation bar:
```HTML
<nav id="navigation">
	<a class="toggle-icon" href="#" onclick="toggleMenu()"><i id="nav-toggle" class="house-fill"></i></a>
	<div class="nav-menu">
		<a href="/">Home</a>
		<a href="/about/">About</a>
		<a href="/blog/">Blogs</a>
		<a href="https://wiki.jurjen.dev">Wiki</a>
		<a href="https://github.com/snhmibby">Github</a>
	</div>
</nav>

<script>
function toggleMenu() {
	$(".nav-menu").toggleClass("toggle-visible")
}
</script>
```
Our hamburger icon calls the toggleMenu function when clicked. ToggleMenu uses
the [JQuery](https://jquery.com/download/)
[toggleClass](https://devdocs.io/jquery/toggleclass) function to switch the
toggle-visible class. Which is defined in our scss.

And finally, the CSS:
```SCSS
nav {
	display: flex;
	background-color: #333;

	a {
		padding: 5px;
		color: white;
		text-decoration: none;
		&:hover {
			background-color: darkred;
		}
	}

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

Now if only I could figure out how to center the links when it's in column mode...

# Follow along!
1. The example uses JQuery and Fontawesome. Install them (or link to a cdn) so
   that they are automatically added on all our pages.
2. Hugo has support for menu generation. Set ```sectionPagesMenu="main"``` in
   config.toml, then create ```partial/navbar.html``` and loop over the
   .Site.Menus.main object to create our menu links.
   Add ```navbar.html``` in the default templates so it is included in the body on all pages.
