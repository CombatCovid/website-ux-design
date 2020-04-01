<template>
  <Layout>
    <h1>Design Choices</h1>
    <p>Initial mock, showing master-detail for Designs, inactive until real data.</p>
    <p>This very preliminary display, only horizontal layout, which is not impossible
      even with a small phone, when put on its side, but we will do better,
      and of course in all formatted looks.</p>
    <p>Intent is to have normal list select -> summary pane for larger screens,
      but then for phones, vertical-down-opening summaries; or alternatively a
      menu-icon for select, then full-screen for summary.</p>
    <div class="master-detail">
      <v-container class="grey lighten-5">
          <RepoContent/>
      </v-container>
    </div>

  </Layout>
</template>

<script>
  import RepoContent from '@/components/RepoContent'
  import RepoContentMarkdown from '@/components/RepoContentMarkdown'

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
    components: {RepoContentMarkdown, RepoContent},
    async mounted () {
      console.log ('route params: ' + JSON.stringify(this.$route.params))
    }
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
