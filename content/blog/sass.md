---
title: "Sass"
date: 2021-10-22T15:54:14+02:00
draft: false
---

# Back to learning CSS, SASS edition

I thought all stylesheet examples looked convoluted and confusing (they are).
So I decided to switch to using a CSS framework (bootstrap).
However, I came across SASS and it just made CSS much easier to 'see' the hierarchy.
So I decided to not use bootstrap for this site, but learn CSS a little bit.

## Set up SASS stylesheets with Hugo

In partial/head.html, you will want something like this:
```
<!-- Custom CSS -->
{{ $custom := resources.Get "scss/custom.scss" | toCSS }}
{{ $css := $custom | minify | fingerprint }}
<link rel="stylesheet" href="{{$css.RelPermalink}}" integrity="{{$css.Data.Integrity}}">
```
See also: [Hugo best practices](https://github.com/spech66/hugo-best-practices#css-and-javascript) for more tips!

Now you can just edit your scss files and hugo (if the development server is running) will recompile them and update the page you're viewing. Which is superconvenient for messing around and trying out things.
