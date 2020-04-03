<template>
<!--  <h1 class="horiz-center">#HardwareCombats.covid</h1>-->
<!--  <v-container grid-list-lg fluid row>-->
    <v-layout d-flex flex-wrap>
      <v-row>
        <slot/>
      </v-row>
    </v-layout>
<!--  </v-container>-->

</template>

<script>
  export default {
    name: "JoseLayout",
    metaInfo: {
      title: 'Jose Layout'
    },
    // props: {
    //   repos: { type: Array, default: []}
    // },
    // data: function () {
    //   return {
    //     numberRepos: 3
    //   }
    // },
  }
</script>

<style scoped>

</style>
