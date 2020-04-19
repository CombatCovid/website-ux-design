<template>
  <v-card d-flex hover v-on:click="showContent(repo.name, repo.cardSummary, repo.cardImage)">
    <v-col class="col">
<!--      <v-flex>-->


    <div class="card-image-holder">
      <img v-if="repo.cardImage"
             p-5 class="white--text align-end card-image"
             :src="getImgUrl(repo.nameWithOwner, repo.cardImage)"
      >
      </img>
      <img v-else

             p-5 class="white--text align-end card-image"
             src="/resources/image/image-placeholder.png"
      >
      </img>
    </div>
      <div class="bottom-block">
        <h2 v-text="repo.title" class="card-title wrapping-text horiz-center"></h2>
        <p class="card-subtitle wrapping-text horiz-center">{{ niceTruncate(repo.description) }}</p>
      </div>
<!--      </v-flex>-->
    </v-col>
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
          cardImage: '/cardimage.jpg',
          cardSummary: '/Readme.md',
          thumbImage: 'thumbimage.jpg',
        }
      }
    },
    methods: {
      getImgUrl: function (nameWithOwner, fileName) {
        if (fileName !== null) {
          // console.log('fileName: ' + fileName)
          // console.log('cardImage path: ' + `https://raw.githubusercontent.com/${nameWithOwner}/master${fileName}`)
          return `https://raw.githubusercontent.com/${nameWithOwner}/master${fileName}`
        } else {
          return "/resources/image/image-placeholder.png"
        }
      },
      showContent(repoName, summaryDoc, summaryImage){
        console.log('JoseCard: showContent: '+
          'repoName: ' + `${repoName}`,
          'summaryDoc: ' + `${summaryDoc}`,
          'summaryImage: ' + `${summaryImage}`,
        )
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
  .card-image {
    width: 90%;
    margin: 20px auto;
  }
  .card-image-holder {
    min-height: 65%;
    max-height: 65%;
    width: 90%;
    margin: 20px auto;
  }
  @media only screen and (max-width: 959px) {
    .card-image-holder {
      min-height: 67%;
      max-height: 67%;
      width: 90%;
      margin: 20px auto;
    }
  }
  @media only screen and (max-width: 1260px) {
    .card-image-holder {
      min-height: 67%;
      max-height: 67%;
      width: 100%;
      margin: 20px auto;
    }
  }
  .col {
    flex: 1;
    display: flex;                 /* create nested flex container */
    flex-wrap: wrap;               /* enable flex items to wrap */
    justify-content: center;       /* center flex items on each line */
  }
  .bottom-block {
    align-self: flex-end;
  }
  .card-title {
    margin-bottom: 0.5em;
  }
  .card-subtitle {
    font-size: small;
    margin: 1em;
  }
  .wrapping-text {
    word-break: normal;
  }
  .horiz-center {
    margin: 0 auto;
    text-align: center;
  }
</style>
