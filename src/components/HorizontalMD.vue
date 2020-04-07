<template>
  <v-layout justify-center>
    <!-- <v-col cols="3" class="hidden-sm-and-down">
      <DesignChoices/>
    </v-col> -->
    <v-flex xs12 md7 class="">
      <DesignDetail :design="design"/>
    </v-flex>
    <!-- <v-flex xs12 md7 class="">
      <DesignDetail :design="design"/>
    </v-flex> -->
  </v-layout>
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


