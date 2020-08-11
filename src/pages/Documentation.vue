<template>
  <Layout>
    <div class="container doc-look formal-look">
      <div class="content">
        <h1>Documentation</h1>
        <p>This is from an early stage of this page area, and you will soon see it
          in much nicer organization and presentation.</p>

        <h2 id="prepare">Getting your Design Documents published, so that they
          can show on this CombatCovid App</h2>

        <p>Basically, you'll be in touch with us to do this. We're friendly
          communicators, and it won't be hard.</p>

        <p>... the rest is in early and brief outline, so you can get an idea
          about this, for now! ...</p>

        <h3>What Design Documents are, and where they go</h3>
        <p>There's a specification for a simple folder layout, where you will place your set
          of documents and illustrations, with simple summary items at top. .</p>
        <p>You'll create this package on your own GitHub repository, following the project form.</p>
        <p>Design texts are written in plain Markdown, which helps you and us get your structure
          and formatting to come out easily. They go in the /docs folder.</p>
        <p>Design images are in the normal web-compatible forms: jpg and png mainly,
          and go in their own /docs/img folder, where they're easily included in Markdown,
          and can also be rapidly scanned through when viewing on the app.</p>
        <h4>How do you include what's on your own website(s)</h4>
        <p>This is very important in our picture, as this is where you open your rich
          further resources, and intentions, framings, and so forth as you wish,
          for the Designs searcher to reference and understand.</p>
        <p>We provide that you can use normal internet <u>web links</u> for this, simply
          done anywhere in the design texts, and these will always open a fresh page
          on the app user's browser, so they won't lose their place in discovering
          your Design there, when they click them.</p>
        <h3>Uploading, once your initial package is ready</h3>
        <p>This is very simple. You will make a normal Github 'pull request', (PR), to
          the CombatCovid project repository, and after we've verified the contents,
          it will go into that resource, and become immediately available throughout the
          internet world, on web browsers from phones to desktops, where the app appears.
        </p>
        <h3>Then, how to upgrade, as you have more material for your Design?</h3>
        <p>Again, this is going to be comfortable and suitably easy.</p>
        <p>You'll do just as for the initial upload, place a PR with us, and we'll
          make this your online results, with the care always in the normal process.</p>
        <h2 id="metadata">Metadata, a real opportunity</h2>
        <p>Metadata is the key to making it very easy for persons to discover your Design, and
          discover it <em>appropriately to their needs</em>, through the app.</p>
        <p>For the moment, it's good to be aware that you can specify your own apropos
          search <em>keywords</em> by yourself -- and the Finder will then intelligently use
          them -- so you can have control.</p>
        <p>You'll put these and other important Metadata in specific locations of your project,
          mainly in the per-language and root folders appropriately, and that's one of the things
          we'll give you a good explanation how to do.</p>
        <h2>Approvals</h2>
        <p>The quality of the Discovery Experience, for persons wanting to build
          your Design out in the world, is the central important experience they'll have.</p>
        <p>We can all appreciate that as these designs are for medical purposes, and
          especially in the current crisis, that there needs to be oversight to enable
          both ease and confidence.</p>
        <p>We'll help you get your document repository into form, using the normal
          and very well experienced Github PR process.</p>
        <p>And we are committed to providing the best ease for you and your Design Documents,
          in referencing professional medical and other (engineering, builder?) advice,
          as well as connecting resources for matters such as ratings.
          Details and capabilities will develop with our project.</p></div>
    </div>
  </Layout>
</template>

<script>
  export default {
    metaInfo: {
      title: 'Documentation'
    }
  }
</script>

<style lang="scss" scoped>

/*
  *todo* somehow we should have Tailwind automatically doing normal markup as default...
  not having to redo it on every page...
*/
h1 {
  @apply text-4xl;
}

h2 {
  @apply text-2xl;
}

h3 {
  @apply text-xl;
}

h4 {
  @apply text-lg;
}

p,
ol,
ul,
pre,
strong,
blockquote {
  @apply mb-4 text-base text-ui-typo;
}

@media only screen and (max-width: 480px) {
  pre {
    font-size: 12px;
  }
}

h1,
h2,
h3,
h4,
h5,
h6 {
  @apply py-3;
}

h1.top { /* *todo* this is where you want first of n behavior with Tailwind */
  @apply pt-0;
  @apply pb-2;
}

/*
  *todo* all of this seems broken now, due to Tailwind??, and in
  the @media small screen version also.

  This is the fix for universal offset problems with fixed menu bars
  and links to anchors, compliments of
  https://css-tricks.com/hash-tag-links-padding/#article-header-id-1

  It needs to be used on every page that can be called through anchors,
  within the scoped style block wherever one is used.
*/

h1:before, h2:before, h3:before, h4:before {
  display: block;
  content: " ";
  height: 64px;
  margin-top: -64px;
  visibility: hidden;
  pointer-events: none;
}

@media only screen and (min-width: 961px) {
  h1:before, h2:before, h3:before, h4:before {
    display: block;
    content: " ";
    margin-top: -82px;
    height: 82px;
    visibility: hidden;
    pointer-events: none;
  }
}

/*end linked anchor fix*/

.horiz-center {
  margin: 0 auto;
  text-align: center;
}
.page-width {
  max-width: 920px;
  margin: 10px;
}
.page-content {
  margin: 10px auto;
  text-align: left;
}
.design-image {
  width: 100%;
}
.design-image-hold {
  margin: 3% auto;
}
.doc-title {
  padding: 0 20px 20px 20px;
}
.team-signature {
  margin-left: 20px;
}
.formal-look {
  color: #1d5c87;
  font-family: Roboto, sans-serif;
  font-size: small;
  padding: 20px;
  max-width: 640px;
  box-sizing: content-box;
  margin: 20px auto;
  color: darkslategray;
  background-color: beige;
}

</style>


<style scoped>

  /*  Initially set after Vuetify grabs basics for these... */

  body {
    background-color: #e3f9fd;
  }

  h2, h3, h4 {
    margin-bottom: 0.5rem;
  }

/*
  This is the fix for universal offset problems with fixed menu bars
  and links to anchors, compliments of
  https://css-tricks.com/hash-tag-links-padding/#article-header-id-1

  It needs to be used on every page that can be called through anchors,
  within the scoped style block wherever one is used.
*/

  h1:before, h2:before, h3:before, h4:before {
    display: block;
    content: " ";
    /*margin-top: -20px;*/
    height: 20px;
    visibility: hidden;
    pointer-events: none;
  }

  @media only screen and (min-width: 961px) {
    h1:before, h2:before, h3:before, h4:before {
      display: block;
      content: " ";
      margin-top: -82px;
      height: 82px;
      visibility: hidden;
      pointer-events: none;
    }
  }

  /*end linked anchor fix*/

  p {
    margin-left: 1rem;
  }

  .content {
    background-color: #fdfde3;
    padding: 20px;
    margin-top: 0px; /* essential to miss the now-fixed menu */
  }

  .doc-look {
    color: #164361;
    font-family: Roboto, sans-serif;
    font-size: small;
    max-width: 640px; /* This is narrow for glance-readability...esp. eyeglass wearers */
    margin-top: 1.5rem;
    padding-left: 30px;
  }

  body {

  }
</style>
