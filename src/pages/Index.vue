<template>
  <div>
    <Layout>
      <!-- Learn how to use images here: https://gridsome.org/docs/images -->
      <!-- <Carousel></Carousel> -->
      <v-parallax dark src="https://cdn.vuetifyjs.com/images/backgrounds/vbanner.jpg">
        <v-row align="center" justify="center">
          <v-col class="text-center" cols="12">
            <h1 class="display-5 font-weight-bold mb-1">Combat Covid with Hardware</h1>
            <h2 class="subheading font-weight-light">Find solutions and help us document more</h2>
            <v-layout row wrap class="pt-6" justify-center>
              <v-flex xs12 md2>
                <v-btn dark color="blue">Search for designs</v-btn>
              </v-flex>
              <v-flex xs12 md2>
                <v-btn dark color="orange">Upload designs</v-btn>
              </v-flex>
            </v-layout>
          </v-col>
        </v-row>
        
      </v-parallax>

      <v-container  grid-list-xs class="home__container">
        <v-layout row wrap>
          <h1>Hello, world!</h1>

        <p>
          Lorem ipsum dolor sit amet, consectetur adipisicing elit.
          Pariatur excepturi labore tempore expedita, et iste tenetur suscipit explicabo!
          Dolores, aperiam non officia eos quod asperiores
        </p>
        </v-layout>
        
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



@media only screen and (min-width:959px){
  .home__container{
    width:50%;
  }
}

</style>
