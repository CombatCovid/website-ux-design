<template>
  <v-row>
    <v-col cols="3">
      <DesignChoices/>
    </v-col>
    <v-col>
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
