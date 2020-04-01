<template>
  <v-card
          v-on:click="showContent(repo.name)"
          hover min-height="350px" max-height="350px"
  >
    <v-img v-if="repo.images !== null"
           p-5 class="white--text align-end" height="200px"
           :src="getImgUrl(repo.nameWithOwner, repo.image)"
    >
    </v-img>
    <v-img v-else
           p-5 class="white--text align-end" height="200px"
           src="https://www.stleos.uq.edu.au/wp-content/uploads/2016/08/image-placeholder.png"
    >
    </v-img>
    <v-card-title v-text="repo.name"></v-card-title>
    <v-card-subtitle v-text="repo.description"></v-card-subtitle>
  </v-card>

</template>

<script>
  export default {
    name: "JoseCard",
    props: {
      repo: {
        type: Object,
        default: {
          name: 'A Repo',
          nameWithOwner: 'a-repo-repo-owner',
          description: 'this is a repo',
          image: 'repoimage.jpg'
        }
      }
    },
    methods: {
      getImgUrl: function (repoName, fileName) {
        if (fileName !== null) {
          return `https://raw.githubusercontent.com/${repoName}/master/docs/img/${fileName}`
        } else {
          return "https://heavenly-holland.com/wp-content/uploads/2017/05/Vermeer03.jpg"
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
