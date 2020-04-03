<template>
  
</template>

<script>
  export default {
    name: "404",
    created () {
      // we have this Gridsome over-ride 404 page and this result for two reasons:
      // - phone browsers can not act properly when reloading/starting up on a previous viewer page
      // - for this app, we don't want to disrupt on bad links, just offer the Finder again - smooth
      this.$router.push({
        path: '/finder'
      })
    }
  }
</script>

<style scoped>

</style>
