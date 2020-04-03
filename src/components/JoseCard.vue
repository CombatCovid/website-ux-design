<template>
  <v-card d-flex hover v-on:click="showContent(repo.name)">
    <v-col class="col">
<!--      <v-flex>-->


    <div class="card-image-holder">
      <v-img v-if="repo.cardImage" width="350px"
             p-5 class="white--text align-end card-image"
             :src="getImgUrl(repo.nameWithOwner, repo.cardImage)"
      >
      </v-img>
      <v-img v-else
             width="300px"
             p-5 class="white--text align-end card-image"
             src="/resources/image/image-placeholder.png"
      >
      </v-img>
    </div>
      <div class="bottom-block">
        <h2 v-text="repo.title" class="card-title wrapping-text horiz-center"></h2>
        <p class="card-subtitle wrapping-text horiz-center">{{ repo.description }}</p>
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
          cardImage: 'cardimage.jpg',
          thumbImage: 'thumbimage.jpg'
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
      showContent(repoName){
        if (repoName) {
          return this.$router.push({ path: `/viewer/${repoName}`, design: `${repoName}` })      }
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
      width: 90%;
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
