---
title: "Tags, Series and Taxonomies"
date: 2021-10-23T03:26:20+02:00
draft: false
tags: ["tags", "taxonomies", "Hugo", "CSS", "Templates"]
series: "Hugo"
---

We will organize our tutorial collection using the default Taxonomies: tags and series.

Then we will write some better looking indexes to create a nice display of the tutorials.
<!--more-->

# Improving the default templates
The idea for the site seems to be coming together nicely now. There will be several tutorial tracks. Each in their own folder in content/tutorial/track.
Now, we will create several new html templates to:
  - display all tutorial tracks
  - display a list of the contents of each single track.
  - display a tutorial

Along the way we will explore [front matter](https://gohugo.io/content-management/front-matter/), [archetypes](https://gohugo.io/content-management/archetypes/), pagination and breadcrumbs.

Grab the [archived website](https://github.com/snhmibby/jurjen.dev/releases/tag/V0.1-templates-tutorial) for this tutorial if you want to follow along!

## Front Matter, archetypes and taxonomies
To display a nice list of tutorials, we will add some basic info 
to the [front matter](https://gohugo.io/content-management/front-matter/). First we add the fields we need to the [archetype](https://gohugo.io/content-management/archetypes/). This ensures that ```hugo new tutorial/track/post``` will automatically add those fields.

XXX TODO !!! -- learn how to use taxonomies, series and cascade!!!

```
archetypes/tutorial/default.md:
---
title: "{{ replace .Name "-" " " | title }}"
date: {{ .Date }}
draft: false
---

In this Episode, our hero explores <subjects> to imploment <cool feature>.
<!-- more -->
# Implement {{ .Title }}

...

# Folow Along!
Some simple, fun and educational EXERCISES.

```

## Creating a card layout
