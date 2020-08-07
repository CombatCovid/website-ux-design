---
description: ''
sidebar: 'docs'
next: '/docs/document/how-to/'
---
# Understand the app
**The simple version**: the basis of this app concept is to use github powerful API and create an app that presents github repo in a more user friendly way for the community of users and contributors. We basically started using gridsome static site generator to 

**The real and more complex architecture**: due to github API call limitations we decided to create a backend server that would store the projects created in github and serve them also in graphQL, very similar to what github does. As a result of this we have not only a frontend application, but also a backend that delivers github "copied" content to the web app.

## The github organization CombatCovid hosts the repositories
Having all the projects under a common github organization makes it easier to develop, maintain and also ensure good content quality. 

## Instant AI based search with Algolia
The finder is able to match almost instantly any keyword even when misspelled. This makes the user experience more

## Software business logic
- New contributors need to join the github organization in order to publish a project in the app.
- Contributors in charge of a project can also invite other contributors.
- Once a contributor adds a new project the algolia index is rebuilt and the new design is added to the index.

## Folder and metadata structure
The folder and file structure allows the app to easily map contents to views. There is no need of complex graphQL querying because the folder has a common basic structure that allows to easily present a project if created with the standard provided in [the template]().
