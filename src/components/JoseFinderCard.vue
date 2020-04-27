<template>
  <v-card d-flex hover v-on:click="showContent(repo.name, repo.cardSummary, repo.cardImage)">
    <v-col class="col">
      <div class="card-image-holder">
        <img p-5 class="white--text align-end card-image"
               :src="getImgUrl(repo.nameWithOwner, repo.isPrivate, repo.cardImage)">
      </div>
      <div class="bottom-block">
        <h2 v-text="repo.title" class="card-title wrapping-text horiz-center"></h2>
        <p class="card-subtitle wrapping-text horiz-center">{{ niceTruncate(repo.description) }}</p>
      </div>
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
