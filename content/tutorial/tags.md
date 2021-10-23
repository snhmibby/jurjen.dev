---
title: "Ordering content"
date: 2021-10-23T03:26:20+02:00
draft: false
series: "Hugo"
tags: ["tags", "taxonomies", "Hugo", "CSS", "Templates"]
---

Lets organize the tutorial collection using article tags and tutorial series.
Along the way we discover Hugo's archetypes, front matter and 'taxonomies'.
<!--more-->

# Creating order: action plan.
Now we have some documents in our tutorials section, it is time to organize them.
To this effect we will do the following:
1. Create an [archetype](https://gohugo.io/content-management/archetypes/) file for tutorials.
2. We will update the existing tutorials to add these variables to their front matter parameters and we will add add [taxonomies]((https://gohugo.io/content-management/taxonomies/)) to our site.
3. Then, we write some templates to display our tutorial subjects and series.

To supplement the official documentation, read some [introductory](https://www.javeriyash.me/blog/hugo-series/) [articles](https://blog.cavelab.dev/2021/07/hugo-series-taxonomy/) about [exactly](https://damien.co/blog/2020-06-29-display-related-content-series-hugo/) this [subject](https://www.kiroule.com/article/add-series-taxonomy-to-hugo-theme/)

## Create an archetype
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
series: ["Unsorted"]
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

### Brief intro to Taxonomies
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

### More navigation
Now that articles can be part of a series (sorted by date, by default), we can
add links to the previous and next article in the series. This requires a
little bit of template programming.

The following template code tries to find the next and previous page in a
series by comparing each item from first to last to our current page. When the
current page is the 1st (index 0) or the last (index (len series) - 1), the
corresponding scratch variable is not set.

After there is a bit of template HTML generation where we check for the prev
and next variables and generate the necessary links.

I found this code [here](https://notestoself.dev/posts/hugo-taxonomy-term-next-prev-page-links/).

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

### A nice list view
Remember those summaries we made earlier?
Now it is time to use them! Let's create a list.html layout specifically for
the tutorial section, that will display each series as a list of summaries. 

First, we create another partial that will create an HTML summary for a single page:

layouts/partials/summary.html:
```HTML
<section class="summary">
	<h4 class="summary-title"><a href="{{.Permalink}}">{{.Title}}</a></h2>
	<p class="summary-text">{{.Summary}}</p>
	{{ if .Params.tags }}
		whoop print tags here
	{{ end }}
</section>
```

TODO!!

# Exercises
