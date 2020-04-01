<template>
  <v-layout>
    <v-flex xs11>
      <RepoSidebar/>
    </v-flex>
    <v-flex>
      <RepoContentDocs/>
    </v-flex>
  </v-layout>
</template>

<script>
  import RepoSidebar from '@/components/RepoSidebar'
  import RepoContentDocs from '@/components/RepoContentDocs'

  export default {
    name: "RepoContentMarkdown",
    components: { RepoSidebar, RepoContentDocs },
    data: function () {
      return {
        summaryText: '<p>SummaryText goes here</p>',
        summaryImage: '/resources/images/combatcovid.png'
      }
    },
    mounted () {
      console.log('RepoContentMarkdown mounted: ' + this.summaryText)
    }
  }
</script>

<style scoped>

</style>
