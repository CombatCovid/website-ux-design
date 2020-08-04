<template>
  <div>
    <div>
      <div class="">
        <DesignDetail :design="design" :summaryDoc="summaryDoc" :summaryImage="summaryImage" />
      </div>
    </div>
  </div>
</template>

<script>
import BookmarksMenu from "~/components/BookmarksMenu";
import DesignDetail from "~/components/DesignDetail";

export default {
  props: {
    design: { type: String, default: "" },
    summaryDoc: { type: String, default: null },
    summaryImage: { type: String, default: "/summary.jpg" }
  },
  name: "HorizontalMD",
  components: { BookmarksMenu, DesignDetail }
};
</script>

<style scoped>
</style>
