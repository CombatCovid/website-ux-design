<template>
  <v-row>
    <v-col cols="3">
      <DesignList/>
    </v-col>
    <v-col>
      <DesignDetail/>
    </v-col>
  </v-row>
</template>

<script>
  import DesignList from '~/components/DesignList'
  import DesignDetail from '~/components/DesignDetail'

  export default {
    name: "HorizontalMD",
    components: { DesignList, DesignDetail }
  }
</script>

<style scoped>

</style>
