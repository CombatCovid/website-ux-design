<template>
    <div>
        <slot/>
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

</style>
