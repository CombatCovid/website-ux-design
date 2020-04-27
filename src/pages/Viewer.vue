<template>
  <Layout>
    <v-container>
      <h1 class="horiz-center">Viewer</h1>
      <div class="xmaster-detail">
        <v-container class="grey lighten-5">
          <HorizontalMD :design="design" :summaryDoc="summaryDoc" :summaryImage="summaryImage"/>
        </v-container>
      </div>
    </v-container>
  </Layout>
</template>

<script>
  import HorizontalMD from '@/components/HorizontalMD'
  import VerticalMD from '@/components/VerticalMD'

  export default {
    metaInfo: {
      title: 'Viewer'
    },
    name: 'viewer',
    props: {
      // repoName: String,
      // summaryDoc: String,
      // summaryImage: String,
    },
    data: function () {
      return {
        design: this.$route.params.design,
        summaryImage: this.$route.params.summaryImage,
        anchorParts: {
          target: '_blank',
          rel: 'noreferrer noopener'
        },
        numberRepos: 99
      }
    },
    computed: {
      summaryDoc: function () { return this.$route.params.summaryDoc }

    },
    components: {VerticalMD, HorizontalMD},
    async mounted () {
      // console.log ('Viewer: route params: ' + JSON.stringify(this.$route.params))
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
  @media only screen and (max-width: 959px) {
    .master-detail {
      margin: 10px;
      padding: 5px;
    }
  }
  .horiz-center {
    margin: 0 auto;
    text-align: center;
  }
  .repo-list {
    padding: 2px 10px;
  }
  .formal-look {
    color: #1d5c87;
    font-family: Roboto, sans-serif;
    font-size: small;
    padding: 20px;
    max-width: 640px;
  }
</style>
