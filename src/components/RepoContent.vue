<template>
  <v-row>
    <v-col cols="3">
      <!-- <RepoContent/> -->
    </v-col>
    <v-col>
      <RepoDocs :design="design"/>
    </v-col>
  </v-row>
</template>

<script>
  import RepoDocs from '~/components/RepoDocs'

  export default {
    props: {
      design: String
    },
    name: "RepoContent",
    components: { RepoDocs }
  }
</script>

<style scoped>

</style>
