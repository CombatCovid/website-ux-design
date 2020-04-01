<template>
  <v-row>
    <v-col cols="3">
      <!-- <RepoContentSidebar/> -->
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
    name: "RepoContentSidebar",
    components: { RepoContentDocs }
  }
</script>

<style scoped>

</style>
