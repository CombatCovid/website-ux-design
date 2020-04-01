<template>
  <v-layout>
    <v-flex xs11>
      <DesignList/>
    </v-flex>
    <v-flex>
      <RepoContentDocs/>
    </v-flex>
  </v-layout>
</template>

<script>
  import DesignList from '@/components/DesignList'
  import RepoContentDocs from '@/components/RepoContentDocs'

  export default {
    name: "RepoContentMarkdown",
    components: { DesignList, RepoContentDocs },
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
