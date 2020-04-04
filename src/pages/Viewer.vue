<template>
  <Layout>
    <h1 class="horiz-center">Viewer</h1>
    <div class="master-detail formal-look">
      <p>
        Alpha notes:  This display is to the point of what we want, showing
        Designs chosen out of a visual list resulting from your rapid keywords
        and title search in the Finder.
      </p>
      <p>
        What follows when we have the Vuex data foundation in,
        will be the ability to Mark chosen designs,
        and refer to them from the Chosen Designs list,
        which is sketched in mock at present.
      </p>
    </div>
    <div class="master-detail">
      <v-container class="grey lighten-5">
          <HorizontalMD :design="design"/>
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
        design: this.$route.params.design,
        anchorParts: {
          target: '_blank',
          rel: 'noreferrer noopener'
        },
        numberRepos: 99
      }
    },
    components: {VerticalMD, HorizontalMD},
    async mounted () {
      console.log ('route params: ' + JSON.stringify(this.$route.params.design))
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
    /*max-width: 640px;*/
  }
</style>
