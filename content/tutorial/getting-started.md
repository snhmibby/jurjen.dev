---
title: "Getting Started!"
date: 2021-10-22
draft: false
series: "My 1st Website"
tags: ["Hugo", "Markdown", "HTML", "Templates"]
---

When you write more than a few pages of [HTML](http://html.com), you quickly get tired of the nonsense.
Which is why [Markdown](https://en.wikipedia.org/wiki/Markdown) was build.
We will look at the [Hugo](http://gohugo.io) [site generator](https://en.wikipedia.org/wiki/Web_template_system#Static_site_generators) to fold markdown articles into a functional website.
<!--more-->

# Hugo

[Hugo](http://gohugo.io) is a program that takes a collection of markdown files and turns it into a nice website. It has many nice features, it's fast and it's written in
Go! What more could you want?

Unfortunately, it's complicated to get up to speed with Hugo. The
[documentation](https://gohugo.io/documentation/) does a good job of explaining
the functions, but where to start?

The only beginner tutorials I could find just say "Install Hugo,
select a theme and pump out Markdown files". Which is great!
Because that means it's easy to make a nice site for just about
anybody. However, how to learn Hugo well enough to produce a custom site?

[Here](https://levelup.gitconnected.com/a-quick-tutorial-on-hugo-templates-creating-your-theme-a4102b42a85f)
is a nice tutorial to get you started in writing your first templates.
After this one the [official documentation](https://gohugo.io/documentation/)
will slowly start to make sense!

## The basics
Hugo takes the collection of markdown in the content/ directory, applies the
HTML templates in the layout/ directory to produce a site in the public/
directory.

## Creating a barebones website
1. Create a new hugo site (```hugo new site my-cool-website```).
2. Create the following basic templates.

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
		<h1>{{ .Title }}</h1>
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
		<h1>{{ .Title }}</h1>
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

3. ```hugo add foo.md``` adds markdown file foo in the content directory.
4. ```hugo serve -D``` in the top directory will start the development server.
5. Start a server in the background and point your browser to the location it
   tells you. Experiment with adding and editing different files and directories and see
   what happens!

Once you are happy with your site, stop the development server
and run the 'hugo' program without arguments in the site
directory. This will create your site in the public/
directory, which you can then upload to a web server.

Happy hacking!
