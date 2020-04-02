<template>
  <v-row>
    <v-col cols="3" class="hidden-sm-and-down">
      <DesignChoices/>
    </v-col>
    <v-col cols="12" class="hidden-md-and-up">
      <DesignDetail :design="design"/>
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
      design: String
    },
    name: "HorizontalMD",
    components: { DesignChoices, DesignDetail }
  }
</script>

<style scoped>

</style>
