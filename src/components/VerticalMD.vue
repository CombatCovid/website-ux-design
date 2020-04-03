<template>
  <v-layout>
    <v-flex xs11>
      <DesignList/>
    </v-flex>
    <v-flex>
      <DesignDetail/>
    </v-flex>
  </v-layout>
</template>

<script>
  import DesignList from '@/components/DesignList'
  import DesignDetail from '@/components/DesignDetail'

  export default {
    name: "VerticalMD",
    components: { DesignList, DesignDetail },
    data: function () {
      return {
        summaryText: '<p>SummaryText goes here</p>',
        summaryImage: '/resources/images/combatcovid.png'
      }
    },
    mounted () {
      console.log('VerticalMD mounted: ' + this.summaryText)
    }
  }
</script>

<style scoped>

</style>
