<template>
  <v-row>
    <v-col cols="3">
      <!-- <RepoContent/> -->
    </v-col>
    <v-col>
      <RepoContentDocs :design="design"/>
    </v-col>
  </v-row>
</template>

<script>
  import RepoContentDocs from '~/components/RepoContentDocs'

  export default {
    props: {
      design: String
    },
    name: "RepoContent",
    components: { RepoContentDocs }
  }
</script>

<style scoped>

</style>
