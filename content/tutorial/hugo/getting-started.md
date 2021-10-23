---
title: "Getting Started!"
date: 2021-10-22T11:41:22+02:00
draft: false
---

# Building websites with Markdown instead of HTML

When you write more than a few pages of [HTML](http://html.com), you quickly get tired of the nonsense.
Which (among other reasons) is why [Markdown](https://en.wikipedia.org/wiki/Markdown) was build.

To convert a collection of markdown files into a functional website and do
extra processing to build your website code, you can use a [site
generator](https://en.wikipedia.org/wiki/Web_template_system#Static_site_generators).

The most famous of these (because it was the 'first') is
[Jekyll](http://jeyllrb.com).  I gave it a spin, but because Go is my new
favourite programming language (comes with a nice [template
library](https://pkg.go.dev/text/template)), I started to look for something
written in it.

# Enter Hugo

[Hugo](http://gohugo.io) then became the natural choice. It has many nice
features, it's fast and it's written in Go! What more could I want?

So basically Hugo creates 2 views by default, one is a 'folder view' (list) and
the other is a single page view.  They are created by the templates list.html
and single.html, which are in turn created by the baseof.html template.  A list
view will use markdown file 'content/foo/_index.md', a page view will use
'content/foo/bar.md'.

Each theme will/should have a Readme on what kinds of content you should add.
You add new content with the command 'hugo new folder/file.md', this adds the
basic preamble with settings that the system needs.  After that you can edit
the file content/folder/file.md.

## Getting started
Unfortunately, it was a little complicated to get started. The
[documentation](https://gohugo.io/documentation/) does a good job of explaining
the basic functions, but finding a decent introduction for beginners was
difficult for me the first hour.

The only beginner tutorials I could find just say "Install Hugo,
select a theme and pump out Markdown files". Which is great!
Because that means it's easy to make a nice site for just about
anybody. However, how to learn Hugo well enough to produce a custom site?

[Here](https://levelup.gitconnected.com/a-quick-tutorial-on-hugo-templates-creating-your-theme-a4102b42a85f)
is a very nice tutorial to get you started in writing your first templates.
After this one the [official documentation](https://gohugo.io/documentation/)
should start to make sense! Enjoy!

# Follow along!
From now on, every blog post in this series will document some work I did on this site,
some CSS trick I learned, and how I used Hugo to improve the functionality of this site step by step. Along the way to we will learn HTML, CSS, Javascript and modern web programming practices!
1. Follow the tutorial above! It explains quite a lot.
2. Create a new hugo site.
3. Create the following extremely basic templates, this should get you started with Hugo.

layouts/_defaults/baseof.html:
```HTML
<!DOCTYPE html>
<html>
{{- partial "head.html" . -}}

<body>
    <div id="content">
        {{- block "main" . }}{{- end }}
    </div>
</body>
</html>
   ```

   layouts/_default/list.html:
   ```HTML
{{ define "main" }}
<main>
	<article>
		{{ .Content }}
	</article>
	<div>
		{{ range .Pages }}
			<a href="{{ .Permalink }}"> {{ .Title }}</a>
		{{ end }}
	</div>
</main>
{{ end }}
   ```

   layouts/defaults/single.html:
   ```HTML
{{ define "main" }}
<main>
	<article>
		{{ .Content }}
	</article>
</main>
{{ end }}
   ```

   layouts/partials/head.html:
   ```HTML
<head>
	<title>
		{{ .Site.Title }}
		{{ if not .IsHome }} | {{ .Title }} {{ end }}
	</title>
</head>
   ```

4. ```hugo add``` some different files and categories and see if your new site is working! Happy hacking!
