---
description: ''
sidebar: 'docs'
---
# How to document a design
[See this documentation example](https://github.com/CombatCovid/mit-emergency-ventilator). You can also download it to see the final result.
## 1. Download the basic template
Use [this template](https://github.com/CombatCovid/doc-template) and guidelines to make your documentation more FAIR (Findable Accessible Interoperable and Reusable). The template has a simple structure that allows to easily present your content separating the source files(src) that users need to replicate from explanations (docs), and guides that explain how to use the source files. 

-  Download or clone this template to start documenting easily.
-  Replace the content in this `README.md` file with content that describes the key features of your project. Consider it the entry point for the users of your content. 

## 2. Create your design content
- Fill in the source files like STLS, CAD, etc inside the `./src` folder.
- Inside `./docs/img/` put images that describe visually your hardware design.
- Describe in markdown inside `.docs/` how the content in the `./src` folder should be used. This is where you provide some context and description on how to replicate and use your design.
- Inside `./docs/LANGUAGE-CHOSEN` write down a simple README in your language of choice, for example `./docs/NL`.
- Write down steps to replicate if necessesary as well as guides in sequence.

If this part becomes difficult ask for help here in the [`#how-to-document-designs` channel ](https://discord.gg/KB3bwpw).

- Fill in the fields in the `metadata.yaml` file at the root of this folder.
- Describe more extensively your project in `metadataExtended.yaml`.
- Replace the `summary.jpg` image with the one that shows your design using the same name.

## 3. Upload your repository
- If you don't know how to do it we can help you.
- Upload your repository to CombatCovid org, alternatively upload it in your private repo and let us know so that we can fork it and put it in list.

## Translating content
If you want to translate the content in the `docs` folder for instance to Russian or French, a simple way to do it is to first open the new folder inside `docs` for instance `docs/FR`, and put the texts in google translate, to then refine and correct the translation.

## Advanced steps that we can help with
- Create automatically EPUBs, and PDFs from markdown files. 
