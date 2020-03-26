<template>
  <div>
    <h2>Title: </h2>
    <g-image></g-image>
    <h2>Summary: </h2>
    <div v-html="summary"></div>
  </div>
</template>

<script>
  export default {
    name: "DesignDetail",
    data: function () {
      return {
        summary: '<p>Summary goes here</p>'
      }
    }
  }
</script>

<style scoped>

</style>
