<template>
  <Layout>
    <div class="container max-w-4xl">
      <div class="content">
        <h1 class="font-bold text-3xl md:text-4xl mb-3">Documentation</h1>
        <p class="text-lg">
          This is a very early stage of this page area, and you will certainly see it
          grow, soon to come also in much nicer presentation.
        </p>
        <p class="text-lg">
          There's a most important statement we would like you to consider with care,
          so you'll find that next, always at the front.
        </p>
        <h2
          class="text-xl"
          id="cautionary"
        >Cautionary Statement -- essential to read first, thank you.</h2>
        <p class="text-lg">
          Please be careful to note, that while building with 3D Printing can be fun
          and interesting certainly, medical equipment is a serious undertaking.
        </p>

        <p class="text-lg">
          We encourage you to take all care and caution to heart, and to work directly
          with the medical staff who will use what you make.
        </p>

        <p class="text-lg">
          A medical ventilator, for example, can be priceless when it is needed, but
          it is also potentially
          <i>very dangerous to the patient</i> if not mechanically precise,
          or if it is not set up and consistently monitored for them, with the care that
          only persons who have full skills and training in its use can give.
        </p>

        <p class="text-lg">
          The documents of the MIT Emergency Ventilator that you find here describe
          very well these concerns for its own case, and will also give you a very usable idea of
          what similar cautions and considerations you should look for, should actively seek out,
          for any of the designs.
        </p>

        <p class="text-lg">
          You'll see why you'll want and will need to get best and constant advice
          of those medical persons who will actually use your results, and
          according to conditions in the situation where you may wish to build them.
        </p>

        <p class="text-lg">
          It's our intention to become as useful as possible on capabilities
          and concerns, while you can see that the responsibility must remain
          with you who use the designs. You must do so properly and with informed due care, so that
          the best can come of your efforts, providing for others through making medical equipment.
        </p>

        <p class="text-lg">Thank you.</p>

        <h2>Getting your Design Documents published, up on this App</h2>

        <p class="text-lg">
          Basically, you'll be in touch with us to do this. We're friendly
          communicators, and it won't be hard.
        </p>

        <p class="text-lg">... the rest is an early and brief outline, for now! ...</p>

        <h3>What Design Documents are, and where they go</h3>
        <p class="text-lg">
          There's a specification for a simple folder layout, where you will place your set
          of documents and illustrations, with simple summary items at top. .
        </p>
        <p
          class="text-lg"
        >You'll create this package on your own GitHub repository, following the project form.</p>
        <p class="text-lg">
          Design texts are written in plain Markdown, which helps you and us get your structure
          and formatting to come out easily. They go in the /docs folder.
        </p>
        <p class="text-lg">
          Design images are in the normal web-compatible forms: jpg and png mainly,
          and go in their own /docs/img folder, where they're easily included in Markdown,
          and can also be rapidly scanned through when viewing on the app.
        </p>
        <h4>How do you include what's on your own website(s)</h4>
        <p class="text-lg">
          This is very important in our picture, as this is where you open your rich
          further resources, and intentions, framings, and so forth as you wish,
          for the Designs searcher to reference and understand.
        </p>
        <p class="text-lg">
          We provide that you can use normal internet
          <u>web links</u> for this, simply
          done anywhere in the design texts, and these will always open a fresh page
          on the app user's browser, so they won't lose their place in discovering
          your Design there, when they click them.
        </p>
        <h3>Uploading, once your initial package is ready</h3>
        <p class="text-lg">
          This is very simple. You will make a normal Github 'pull request', (PR), to
          the CombatCovid project repository, and after we've verified the contents,
          it will go into that resource, and become immediately available throughout the
          internet world, on web browsers from phones to desktops, where the app appears.
        </p>
        <h3>Then, how to upgrade, as you have more material for your Design?</h3>
        <p class="text-lg">Again, this is going to be comfortable and suitably easy.</p>
        <p class="text-lg">
          You'll do just as for the initial upload, place a PR with us, and we'll
          make this your online results, with the care always in the normal process.
        </p>
        <h2 id="metadata">Metadata, a real opportunity</h2>
        <p class="text-lg">
          Metadata is the key to making it very easy for persons to discover your Design, and
          discover it
          <em>appropriately to their needs</em>, through the app.
        </p>
        <p class="text-lg">
          For the moment, it's good to be aware that you can specify your own apropos
          search
          <em>keywords</em> by yourself -- and the Finder will then intelligently use
          them -- so you can have control.
        </p>
        <p class="text-lg">
          You'll put these and other important Metadata in specific locations of your project,
          mainly in the per-language and root folders appropriately, and that's one of the things
          we'll give you a good explanation how to do.
        </p>
        <h2>Approvals</h2>
        <p class="text-lg">
          The quality of the Discovery Experience, for persons wanting to build
          your Design out in the world, is the central important experience they'll have.
        </p>
        <p class="text-lg">
          We can all appreciate that as these designs are for medical purposes, and
          especially in the current crisis, that there needs to be oversight to enable
          both ease and confidence.
        </p>
        <p class="text-lg">
          We'll help you get your document repository into form, using the normal
          and very well experienced Github PR process.
        </p>
        <p class="text-lg">
          And we are committed to providing the best ease for you and your Design Documents,
          in referencing professional medical and other (engineering, builder?) advice,
          as well as connecting resources for matters such as ratings.
          Details and capabilities will develop with our project.
        </p>
      </div>
    </div>
  </Layout>
</template>

<script>
export default {
  metaInfo: {
    title: "Documentation"
  }
};
</script>

<style scoped lang="scss">
.container {
  max-width: 64rem;
  & > * {
  line-height: 2;

  p {
    margin-bottom: 1rem;
  }

  h2 {
    font-size: 1.5em;
    margin-top: 2rem;
  }
  h2::before {
    content: "# ";
    font-size: 1.5em;
    margin-left: -1.1em;
  }
}
}
</style>
