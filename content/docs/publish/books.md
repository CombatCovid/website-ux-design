---
description: ''
sidebar: 'docs'
---
# Build e-books from markdown
You can build an e-book from markdown using [pandocs](https://pandoc.org/).
Once you have installed pandoc in your computer you can use it in your terminal like this:
```sh
pandoc  file.md file2.md  -s  --number-sections   -o  the-Name-of-the-document.pdf
```
You could also do this in a more automatic fashion by doing it for every file. But we don't have this script implemented at the moment. Feel free to do it and let us know 😁.
