<template>
  <v-card d-flex hover v-on:click="showContent(repo.name, repo.cardSummary, repo.cardImage)">
    <!-- <v-col class=""> -->
      <!-- <v-img
      :src="getImgUrl(repo.nameWithOwner, repo.isPrivate, repo.cardImage)"
      height="250"
      width=""
      ></v-img> -->
      <div class="" style="width:100%;">
        <!-- Set the image background instead of actual image -->
        <img p-5 class="white--text align-end card-image" style="width:100%;"
               :src="getImgUrl(repo.nameWithOwner, repo.isPrivate, repo.cardImage)">
      </div>
      <div class="">
        <v-card-title v-text="repo.title" class=""></v-card-title>
        <v-card-subtitle class="">{{ niceTruncate(repo.description) }}</v-card-subtitle>
      </div>
    <!-- </v-col> -->
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
          isPrivate: false,
          description: 'this is a repo',
          cardImage: '/cardimage.jpg',
          cardSummary: '/Readme.md',
          thumbImage: 'thumbimage.jpg',
          repoBranch: 'master',
        }
      }
    },
    computed: {
    },
    methods: {
      getImgUrl: function (nameWithOwner, isPrivate, cardImage) {
        if (isPrivate) {
          return '/resources/image/private-placeholder.png'
        } else if (cardImage && cardImage !== null) {
          return `https://raw.githubusercontent.com/${nameWithOwner}/${this.repo.repoBranch}${cardImage}`
        } else {
          return '/resources/image/no-summary-img-placeholder.png'
        }
      },
      showContent(repoName, summaryDoc, summaryImage){
        // console.log('JoseFinderCard: showContent: '+
        //   'repoName: ' + `${repoName}`,
        //   'summaryDoc: ' + `${summaryDoc}`,
        //   'summaryImage: ' + `${summaryImage}`,
        // )
        if (repoName) {
          return this.$router.push(
            {
              path: `/viewer/${repoName}`,
              summaryDoc: `${summaryDoc}`,
              summaryImage: `${summaryImage}`,
            })
        }
      }
    }
  }
</script>

<style scoped>

</style>
