---
title: "{{ replace .Name "-" " " | title }}"
date: {{ .Date }}
react: {script: {{.Name}}/index.ts, style: {{.Name}}/style.scss}
---

Some words about my shit code.
