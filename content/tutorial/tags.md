---
title: "Ordering content"
date: 2021-10-23
draft: false
series: "My 1st Website"
tags: ["Tags", "Taxonomies", "Hugo", "CSS", "Templates"]
---

Lets organize the tutorial collection using article tags and tutorial series.
Along the way we discover Hugo's archetypes, front matter, 'taxonomies' and will create a simple card view with CSS.
<!--more-->

# Order documents in series
Now we have some documents in our tutorials section, it is time to organize them.
To this effect we will do the following:
1. Create an [archetype](https://gohugo.io/content-management/archetypes/) file for tutorials.
2. We will update the existing tutorials to add these variables to their front matter parameters and we will add [taxonomies]((https://gohugo.io/content-management/taxonomies/)) to our site.
3. Then, we write some templates to display our tutorial subjects and series.

To supplement the official documentation, read some [introductory](https://www.javeriyash.me/blog/hugo-series/) [articles](https://blog.cavelab.dev/2021/07/hugo-series-taxonomy/) about [exactly](https://damien.co/blog/2020-06-29-display-related-content-series-hugo/) this [subject](https://www.kiroule.com/article/add-series-taxonomy-to-hugo-theme/)

## Add archetype for tutorial markdown files
An [archetype](https://gohugo.io/content-management/archetypes/) is a text
template that generates the initial markdown file when you create content with
'hugo new foo/article.md' This sets default fields in the front matter and adds
initial content for authors.  We will just use the default [front
matter](https://gohugo.io/content-management/front-matter/) fields tags and
series to order our tutorials. We will also add a handwritten [summary].

archetypes/tutorial.md:
```markdown
---
title: "{{ replace .Name "-" " " | title }}"
date: {{ .Date }}
draft: false
series: "Hugo"
tags: []
---

Summary
<!--more-->

# Introduction
Problem outline & approach discussion

## Tutorial
Sketch steps to implement solution

# Conclusion
```

## Brief intro to Taxonomies
A [taxonomy](https://gohugo.io/content-management/taxonomies/) is a relation
between articles. An example is the default 'tags' field. All articles with the
same tag have some relation with each other. Because tags are built in, you can
add a tags field to the front matter, then navigate to /tags on your site and
there will be a basic list view! Try it!

The series relation is not turned on by default, but is recognized by some
plugins.  To turn it on, add the following to the configuration file:
```toml
[taxonomies]
	tag = "tags"
	series = "series"
```
Bam, that's everything. Go check out /series on your site!

## More navigation
Now that articles can be part of a series (sorted by date, by default), we can
add links to the previous and next article in the series. This requires a
little bit of template programming.

The following template code tries to find the next and previous page in a
series by comparing each item from first to last to our current page. When the
current page is the 1st (index 0) or the last (index (len series) - 1), the
corresponding scratch variable is not set.

I found this code
[here](https://notestoself.dev/posts/hugo-taxonomy-term-next-prev-page-links/).
Thank you!

layout/partials/series_nav.html
```HTML
{{ if .Params.series }}
	{{ $curPage := .Permalink }}
	{{ $key := .Params.series | urlize }}
	{{ $series := index .Site.Taxonomies.series $key }}
	{{ range $i, $p := $series.Pages }}
		{{ if eq $curPage $p.Permalink }}
			{{ if gt $i 0 }}
				{{ .Scratch.Set "prev" (index $series (sub $i 1)) }}
			{{ end }}
			{{ if lt $i ((sub (len $series) 1)) }}
				{{ .Scratch.Set "next" (index $series (add $i 1)) }}
			{{ end }}
		{{ end }}
	{{ end }}
	<nav class="nav-series">
		{{ with index .Scratch.Values "prev"}}
			<a class="nav-prev" href="{{- .Permalink -}}" rel="prev">&larr;</a>
		{{ end }}
		<a class="nav-up" href="/series/{{.Params.series | urlize}}">{{.Params.series}} Track</a>
		{{ with index .Scratch.Values "next"}}
			<a class="nav-next" href="{{- .Permalink -}}" rel="next">&rarr;</a>
		{{ end }}
	</nav>
{{ end }}
```

Our partial is included by layout/tutorial/single.html:
```HTML
{{ define "main" }}
{{ partial "series_nav.html" . }}
<article>
	<h1>{{ .Title }}</h1>
	{{ .Content }}
</article>
{{ partial "series_nav.html" . }}
{{ end }}
```

The prev/next navigation is simply centered with a flex display.
It's a bit rough around the edges, but it will do for now.

navbar.scss:
```SCSS
.nav-series {
	display: flex;
	justify-content: center;
	a {
		text-decoration: none;
		display: block;
		padding: 5px;
	}
}
```

## A Card view
Remember those summaries we made earlier?
Now it is time to use them! First, we will make a [content view](https://gohugo.io/templates/views/) that provides a summary of a page.

layouts/_defaults/summary.html:
```HTML
<section class="summary">
	<h1><a href="{{.Permalink}}">{{.Title}}</a></h1>
	<p>{{.Summary}}</p>
	{{ if .Params.tags }}
		<ul>
			{{ range .Params.tags }}
				<li class="summary-tag"><a href="/tags/{{.|urlize}}/">{{.}}</a></li>
			{{ end }}
		</ul>
	{{ end }}
</section>
```

And we will style our summary so our website doesn't look too boring.

assets/scss/summary-card.scss:
```SCSS
.summary {
	margin: 5px;
	padding: 10px;
	background: lightgrey;
	border-radius: 15px;
	h1, p {
		margin: 1px;
	}
	a {
		text-decoration: none;
	}
	ul {
		margin: 1px;
		display: flex;
		flex-direction: row;
		flex-wrap: wrap;
		justify-content: space-around;
		list-style: none;
	}
	&:hover {
		background: darkgrey;
	}
}
```

Don't forget to update 'assets/scss/site.scss' to include our card style.
Check the website, our list looks a lot better already!

Now to use the summary content view, we will update

layouts/_default/list.html:
```HTML
{{ define "main" }}
<main>
	<article>
		<h1>{{ .Title }}</h1>
		{{ .Content }}
	</article>
	{{ range .Pages }}
		{{ .Render "summary" }}
	{{ end }}
</main>
{{ end }}
```

and create layouts/tutorial/list.html:
```HTML
{{ define "main" }}
<main>
	<h1>{{ .Title }}</h1>
	{{ range $k,$v := .Site.Taxonomies.series }}
		<section>
			<h2>{{humanize $k}}</h2>
			<div class="card-grid">
				{{ range $v.Pages}}
					{{ .Render "summary" }}
				{{ end }}
			</div>
		</section>
	{{ end }}
</main>
{{ end }}
```

and to wrap it up, we create a simple card grid that holds 1 article on
small screens, 2 on medium screens and 3 on big screens.
```SCSS
.card-grid {
	display: grid;

	@media (min-width: 450px) {
		grid-template-columns: 1fr 1fr;
	}

	@media (min-width: 700px) {
		grid-template-columns: 1fr 1fr 1fr;
	}
}
```
