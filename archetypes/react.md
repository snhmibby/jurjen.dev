---
title: "{{ replace .Name "-" " " | title }}"
date: {{ .Date }}
react: {script: {{.Name}}/index.jsx, style: {{.Name}}/style.scss}
---

Some words about my shit code.
