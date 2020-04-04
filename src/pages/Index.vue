<template>
  <div>
    <Layout>
      <!-- Learn how to use images here: https://gridsome.org/docs/images -->
      <!-- <Carousel></Carousel> -->
      <v-parallax dark src="https://cdn.vuetifyjs.com/images/backgrounds/vbanner.jpg">
        <v-row align="center" justify="center">
          <v-col class="text-center" cols="12">
            <h1 class="display-1 font-weight-thin mb-4">Combat Covid with Hardware docs</h1>
            <h4 class="subheading">Lets help documenting solutions</h4>
          </v-col>
        </v-row>
      </v-parallax>

      <v-container  grid-list-xs>
        <v-subheader>text</v-subheader>
        <h1>Hello, world!</h1>

        <p>
          Lorem ipsum dolor sit amet, consectetur adipisicing elit.
          Pariatur excepturi labore tempore expedita, et iste tenetur suscipit explicabo!
          Dolores, aperiam non officia eos quod asperiores
        </p>
      </v-container>
    </Layout>
  </div>
</template>

<script>
import Layout from "~/layouts/Lander.vue";

export default {
  metaInfo: {
    title: "Home"
  },
  components: {
    // Carousel: Carousel
  }
};
</script>

<style>
.home-links a {
  padding-top: 2em;
  margin-right: 1rem;
}
</style>
