<template>
  <v-app>
    <v-content>
      <Nav/>
<!--      <v-container>-->
        <slot/>
<!--      </v-container>-->
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
a {
    text-decoration: none;
}

/** Styles applied to code blocks in documentation */
code{
  color:#c6cfe6 !important;
  font-weight:100 !important;
  width:100% !important;
  padding:1em;
  background-color: #2e374a !important;
}

</style>
