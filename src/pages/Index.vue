<template>
  <div>
    <Layout class="">
      <v-parallax dark src="https://cdn.vuetifyjs.com/images/backgrounds/vbanner.jpg">
        <v-row align="center" justify="center">
          <v-col class="text-center" cols="12">
            <h1 class="display-5 font-weight-bold mb-1">Combat Covid with Hardware</h1>
            <h2 class="subheading font-weight-light">Find solutions and help us document more</h2>
            <v-layout row wrap class="pt-6" justify-center>
              <v-flex xs12 md3>
                <v-btn to="/finder" class="spaced-btn"
                       dark color="blue">Search for designs
                </v-btn>
              </v-flex>
              <v-flex xs12 md3>
                <v-btn to="/documentation#prepare" class="spaced-btn"
                       dark color="orange">Upload designs
                </v-btn>
              </v-flex>
            </v-layout>
          </v-col>
        </v-row>
      </v-parallax>

      <v-container grid-list-xs class="home-container">
        <v-layout row wrap>
          <v-row xs-6 class="formal-look">
            <h2 class="formal-intro">Greetings</h2>
            <div class="formal-body">
              <br>
              <p>You're meeting the demonstration app of the Combat Covid with Hardware project.</p>
              <p>This is a fast-moving Alpha production, so be reassured if you find that
                items may move, appear, disappear, and at moments perhaps not function entirely
                as you expected.</p>
              <p>We're moving rapidly and constantly to add what's needed for early real use,
                and anything unexpected will soon be repaired.</p>
              <p>Thank you for your patience, and especially for your interest.</p>
              <p class="sig-indent">The Combat Covid with Hardware Team</p>
            </div>
          </v-row>
        </v-layout>
      </v-container>
    </Layout>
  </div>
</template>

<script>
  export default {
    metaInfo: {
      title: "Home"
    }
  }
</script>

<style scoped>

  @media only screen and (min-width: 959px) {
    .home-container {
      max-width: 960px;

    }
  }

  @media only screen and (max-width: 959px) {
    .spaced-btn {
      margin: 0.3rem 0;
    }
  }

  .home-links a {
    padding-top: 2em;
    margin-right: 1rem;
  }

  .sig-indent {
    margin-left: 24px;
  }

  .formal-look {
    color: #1d5c87;
    font-family: Roboto, sans-serif;
    font-size: small;
    max-width: 640px; /* This is narrow for glance-readability...esp. eyeglass wearers */
    margin-top: 1.5rem;
    padding-left: 30px;
  }

  .formal-intro, .formal-title {
    padding: 0 10px;
  }

  .formal-body {
    padding: 0 30px;
  }

  @media only screen and (max-width: 640px) {
    .formal-look {
      padding-left: 10px;
    }

    .formal-intro, .formal-title {
      padding: 0 5px;
    }

    .formal-body {
      padding: 0 15px;
    }
  }

</style>
