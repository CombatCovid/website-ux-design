<template>
  <v-row>
    <!-- I'm leaving trimmings as a start, in case we find it's good to have -->
    <!-- Bookmarks convenient at left, on some level of larger screen -->
    <!--    <v-col cols="6" class="hidden-sm-and-down">-->
    <!--      <v-flex -->
    <!--        <DesignDetail :design="design"/>-->
    <!--      </v-flex>-->
    <!--    </v-col>-->

    <!--    <v-col cols="6" class="xhidden-md-and-up">-->
    <v-col cols="12">
      <v-flex>
        <DesignDetail :design="design" :summaryDoc="summaryDoc" :summaryImage="summaryImage"/>
      </v-flex>
    </v-col>
    <!--    </v-col>-->
  </v-row>
</template>

<script>
  import BookmarksMenu from '~/components/BookmarksMenu'
  import DesignDetail from '~/components/DesignDetail'

  export default {
    props: {
      design: { type: String, default: "" },
      summaryDoc: { type: String, default: null },
      summaryImage: { type: String, default: '/summary.jpg' }
    },
    name: "HorizontalMD",
    components: { BookmarksMenu, DesignDetail }
  }
</script>

<style scoped>

</style>
