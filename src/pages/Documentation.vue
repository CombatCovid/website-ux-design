<template>
  <Layout>
    <div class="container doc-look">
      <div class="content">
        <h1>Documentation</h1>
        <p>This is a very early stage of this page area, and you will certainly see it
          grow, and soon in much nicer presentation.</p>
        <p>There's a most important statement we would like you to consider with care,
          so what comes next you'll find always at the front.</p>
        <h2 id="cautionary">Cautionary Statement -- essential to read first, thank you.</h2>
        <p>
          Please be careful to note, that while building with 3D Printing can be fun
          and interesting certainly, medical equipment is a serious undertaking.</p>

        <p>We encourage you to take all care and caution to heart, and to work directly
          with the medical staff who will use what you make.</p>

        <p>A medical ventilator, for example, can be priceless when it is needed, but
          it is also potentially <i>very dangerous to the patient</i> if not mechanically precise,
          or if it is not set up and consistently monitored for them very carefully, by persons
          who have full skills and training in its use.</p>

        <p>The documents of the MIT Emergency Ventilator that you find here describe
          very well these concerns in own its case, and will give a very usable idea of
          what similar cautions and considerations you should look for, actively seek out,
          for any of the designs.</p>

        <p>You'll see why you'll want and need to get best and constant advice
        of those medical persons who will actually use your results, and
          according to conditions in the situation where you may wish to build them.</p>

        <p>It's our intention to become as useful as possible on capabilities
          and concerns, while you can see that the responsibility must remain
          with you who use the designs, to do so properly and with informed due care, so that
          the best can come of your efforts, providing for others through medical equipment.</p>
        <p>Thank you.'</p>
        <h2 id="prepare">Getting your Design Documents published, up on this App</h2>
        <p>Basically, you'll be in touch with us to do this. We're friendly
          communicators, and it won't be hard.</p>
        <p>... the rest is an early and brief outline, for now! ...</p>
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
        <p>We provide that you can use normal internet _ web links_ for this, simply
          done anywhere in the design texts, and these will always open a fresh page
          on the app user's browser, so they won't lose their place in discovering
          your Design there when they click them.</p>
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
          search <em>keywords</em>by yourself -- and the Finder will intelligently use
          them -- so you can have control.</p>
        <p>You'll put these and other important Metadata in your Summary document,
          in the usual Markdown (frontmatter) way, and that's one of the things
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

<style scoped>

  /*  Initially set after Vuetify grabs basics for these... */

  body {
    background-color: #e3f9fd;
  }

  h2, h3, h4 {
    margin-bottom: 0.5rem;
  }

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
