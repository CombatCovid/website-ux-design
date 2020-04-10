<template>
  <v-row>
    <v-col cols="12" class="hidden-md-and-up">
      <DesignDetail :design="design" :summaryDoc="summaryDoc" :summaryImage="summaryImage"/>
    </v-col>
    <v-col class="hidden-sm-and-down">
      <v-flex xs12 md12 lg16>
        <DesignDetail :design="design"/>
      </v-flex>
    </v-col>
  </v-row>
</template>

<script>
  import DesignChoices from '~/components/DesignChoices'
  import DesignDetail from '~/components/DesignDetail'

  export default {
    props: {
      design: { type: String, default: "" },
      summaryDoc: { type: String, default: null },
      summaryImage: { type: String, default: '/summary.jpg' }
    },
    name: "HorizontalMD",
    components: { DesignChoices, DesignDetail }
  }
</script>


