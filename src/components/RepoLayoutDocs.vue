<template>
  <v-layout>
    <v-flex xs11>
      <RepoSidebar/>
    </v-flex>
    <v-flex>
      <RepoDocs/>
    </v-flex>
  </v-layout>
</template>

<script>
  import RepoSidebar from '@/components/RepoSidebar'
  import RepoDocs from '@/components/RepoDocs'

  export default {
    name: "RepoLayoutDocs",
    components: { RepoSidebar, RepoDocs },
    data: function () {
      return {
        summaryText: '<p>SummaryText goes here</p>',
        summaryImage: '/resources/images/combatcovid.png'
      }
    },
    mounted () {
      console.log('RepoLayoutDocs mounted: ' + this.summaryText)
    }
  }
</script>

<style scoped>

</style>
