---
title: "Ordering content"
date: 2021-10-23T03:26:20+02:00
draft: false
series: "Hugo"
tags: ["tags", "taxonomies", "Hugo", "CSS", "Templates"]
---

# Creating order in your document collection

Lets organize the tutorial collection using article tags and tutorial series.
Then we will write some better looking HTML templates to create displays of the tutorials.
Along the way we discover Hugo's archetypes, front matter and 'taxonomies'.
<!--more-->

## Creating order: action plan.
Now we have some documents in our tutorials section, it is time to organize them.
To this effect we will do the following:
1. Create an [archetype](https://gohugo.io/content-management/archetypes/) file for tutorials.
2. We will update the existing tutorials to add these variables to their front matter parameters and we will add add [taxonomies]((https://gohugo.io/content-management/taxonomies/)) to our site.
3. Then, we write some templates to display our tutorial subjects and series.

To supplement the official documentation, read some [introductory](https://www.javeriyash.me/blog/hugo-series/) [articles](https://blog.cavelab.dev/2021/07/hugo-series-taxonomy/) about [exactly](https://damien.co/blog/2020-06-29-display-related-content-series-hugo/) this [subject](https://www.kiroule.com/article/add-series-taxonomy-to-hugo-theme/)

### Create an archetype
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

# {{ replace .Name "-" " " | title }}

!! Enter Summary
<!--more-->

## Introduction

### Tutorial

# Follow along!
Conclusion and Exercises

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

## Creating nicer templates
Our basic one liner templates have served well, but the time has come to write something more appealing.
- For starters, we will create layouts/tutorial/single.html, to show our taxonomy info.
- Then we will create a simple [Card](Basic web design item) that shows the
  outline of an article, and create new list templates with it.  We will make
- an explicit index.md and layout.html for the tutorial section,
  instead of relying on the _default list templates.


# Follow along!
Put some simple exercises here
