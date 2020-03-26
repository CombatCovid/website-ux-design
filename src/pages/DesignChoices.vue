<template>
  <Layout>
    <h1>Design Choices</h1>
    <p>Initial mock, showing master-detail for Designs, inactive until real data.</p>
    <p>This very preliminary display, with only horizontal layout, is not impossible
      even with a small phone when put on its side, but we will do better.</p>
    <p>Intent is to have normal list select -> summary pane for larger screens,
      but then for phones, vertical-down-opening summaries; or alternatively a
      menu-icon for select, then full-screen for summary.</p>
    <div class="master-detail">
      <v-container class="grey lighten-5">
        <HorizontalMD/>
      </v-container>
    </div>

  </Layout>
</template>

<script>
  import HorizontalMD from '@/components/HorizontalMD'
  import VerticalMD from '@/components/VerticalMD'

  export default {
    metaInfo: {
      title: 'Demo Connect'
    },
    data: function () {
      return {
        anchorParts: {
          target: '_blank',
          rel: 'noreferrer noopener'
        },
        numberRepos: 99
      }
    },
    components: {VerticalMD, HorizontalMD}
  }
</script>

<style>
  .li {
    margin-bottom: 1em !important;
  }
</style>

<style scoped>
  .master-detail {
    margin: 20px;
    padding: 15px;
    color: darkslategray;
    background-color: beige;
  }

  .repo-list {
    padding: 2px 10px;
  }
</style>
