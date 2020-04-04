<template>
  <v-row>
    <v-col cols="3" class="hidden-sm-and-down">
      <DesignChoices/>
    </v-col>
    <v-col cols="12" class="hidden-md-and-up">
      <DesignDetail :design="design" :summaryDoc="summaryDoc" :summaryImage="summaryImage"/>
    </v-col>
    <v-col class="hidden-sm-and-down">
      <DesignDetail :design="design"/>
    </v-col>
  </v-row>
</template>

<script>
  import DesignChoices from '~/components/DesignChoices'
  import DesignDetail from '~/components/DesignDetail'

  export default {
    props: {
      design: { type: String, default: 'no design' },
      summaryDoc: { type: String, default: '/Readme.md' },
      summaryImage: { type: String, default: '/summary.jpg' }
    },
    name: "HorizontalMD",
    components: { DesignChoices, DesignDetail }
  }
</script>

<style scoped>

</style>
