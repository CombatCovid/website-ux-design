<template>
  <h1 class="horiz-center">#HardwareCombats.covid</h1>
  <v-container grid-list-lg fluid>
    <v-layout row wrap>
      <v-flex xs12 md3 v-for="repo in repos" :key="repo.name">
        <v-card
                v-on:click="showContent(repo.name)"
                hover min-height="350px" max-height="350px"
        >
          <v-img v-if="repo.images !== null"
                 p-5 class="white--text align-end" height="200px"
                 :src="getImgUrl(repo.nameWithOwner, repo.images.entries[0].name)"
          >
          </v-img>
          <v-img v-else
                 p-5 class="white--text align-end" height="200px"
                 src="/resources/image/image-placeholder.png"
          >
          </v-img>
          <v-card-title v-text="repo.name"></v-card-title>
          <v-card-subtitle v-text="repo.description"></v-card-subtitle>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>

</template>

<script>
  export default {
    name: "JoseCards",
    metaInfo: {
      title: 'Jose Cards'
    },
    props: {
      repos: { type: Array, default: []}
    },
    data: function () {
      return {
        numberRepos: 3
      }
    },
    methods: {
      getImgUrl: function (repoName, fileName) {
        if (fileName !== null) {
          return `https://raw.githubusercontent.com/${repoName}/master/docs/img/${fileName}`
        } else {
          return "/resources/image/image-placeholder.png"
        }
      },
      showContent(repoName){
        return this.$router.push({ path: `/doc/${repoName}` })
      }
    }
  }
</script>

<style scoped>

</style>
