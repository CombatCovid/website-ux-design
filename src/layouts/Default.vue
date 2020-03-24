<template>
  <div>
    <Nav/>
    <div class="layout container is-fullheight hero-body">
      <slot/>
    </div>
  </div>
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
  h1, h2, h3 {
    color: darkblue;
    font-weight: bold;
    display: block;
  }
  h1 {
    font-size: x-large;
    line-height: 2em;
  }
  h2 {
    font-size: large;
  }
  h3 {
    font-size: medium;
  }
</style>
