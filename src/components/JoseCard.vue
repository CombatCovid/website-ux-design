<template>
  <v-card class=""
          v-on:click="showContent(repo.name)"
          hover min-height="350px" max-height="350px"
  >
    <v-img v-if="repo.cardImage !== null && typeof repo.cardImage !== 'undefined'"
           p-5 class="white--text align-end" height="200px"
           :src="getImgUrl(repo.nameWithOwner, repo.cardImage)"
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

</template>

<script>
  export default {
    name: "JoseCard",
    props: {
      repo: {
        type: Object,
        default: {
          title: 'A Repo',
          name: 'a-repo',
          nameWithOwner: 'a-repo-repo-owner',
          description: 'this is a repo',
          cardImage: 'cardimage.jpg',
          thumbImage: 'thumbimage.jpg'
        }
      }
    },
    methods: {
      getImgUrl: function (nameWithOwner, fileName) {
        if (fileName !== null) {
          console.log('fileName: ' + fileName)
          console.log('cardImage path: ' + `https://raw.githubusercontent.com/${nameWithOwner}/master${fileName}`)
          return `https://raw.githubusercontent.com/${nameWithOwner}/master${fileName}`
        } else {
          return "/resources/image/image-placeholder.png"
        }
      },
      showContent(repoName){
        return this.$router.push({ path: `/viewer/${repoName}`, design: '${repoName}' })      }
    }
  }
</script>

<style scoped>

</style>
