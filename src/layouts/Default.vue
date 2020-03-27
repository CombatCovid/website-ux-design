<template>
  <v-app>
      <Nav/>
    <v-content>
      <v-container grid-list-sm>
        <slot/>
      </v-container>
    </v-content>
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

  export default {
    components: {
      "Nav": Nav
    }
  }
</script>

<style>
  @import 'https://cdnjs.cloudflare.com/ajax/libs/MaterialDesign-Webfont/3.8.95/css/materialdesignicons.css';

  body {
    font-family: -apple-system, system-ui, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif;
    margin: 0;
    padding: 0;
    line-height: 1.5;
  }

  .layout {
    max-width: 960px;
    margin: 0 auto;
    padding-top: 10px;
    padding-bottom: 10px;
    padding-left: 20px;
    padding-right: 20px;
  }

  /* these next because Buefy clears all expected formats -- probably need to define more, as needed */
  h1, h2, h3, h4 {
    color: darkblue;
    font-weight: bold;
    margin-bottom: 1em;
  }

  h1 {
    font-size: x-large;
  }

  h2 {
    font-size: large;
  }

  h3 {
    font-size: medium;
  }

  h4 {
    font-size: smaller;
  }

  ul {
    list-style: disc;
    margin-left: 2em;
  }

  li {
    margin-bottom: 1em;
  }

  p {
    margin-bottom: 1em;
  }
</style>
