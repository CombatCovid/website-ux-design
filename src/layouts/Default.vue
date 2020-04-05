<template>
  <v-app>
    <v-content>
      <Nav/>

      <!-- <v-container> -->
        <slot/>
      <!-- </v-container> -->
    </v-content>
    <Footer></Footer>
  </v-app>
</template>

<static-query>
  query {
    metadata {
              siteName
    }
  }
</static-query>

<script>
  import Nav from '~/components/Nav.vue'
  import Footer from '~/components/Footer.vue'

  export default {
    components: {
      "Nav": Nav,
      "Footer": Footer
    }
  }
</script>

<style>

</style>
