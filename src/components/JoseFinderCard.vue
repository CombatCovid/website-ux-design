<template>
  <v-card d-flex hover v-on:click="showContent(repo.name, repo.cardSummary, repo.cardImage)">
    <!-- <v-col class=""> -->
    <!-- <v-img
      :src="getImgUrl(repo.nameWithOwner, repo.isPrivate, repo.cardImage)"
      height="250"
      width=""
    ></v-img>-->
    <div class="card__image" :style="getStyles(getImgUrl(repo.nameWithOwner, repo.isPrivate, repo.cardImage))">
      <!-- Set the image background instead of actual image -->
      <!-- <img
        p-5
        class="white--text align-end card-image"
        style="width:100%;"
        :src="getImgUrl(repo.nameWithOwner, repo.isPrivate, repo.cardImage)"
      /> -->
    </div>
    <div class>
      <v-card-title v-text="repo.title" class></v-card-title>
      <v-card-subtitle class>{{ niceTruncate(repo.description) }}</v-card-subtitle>
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
        title: "A Repo",
        name: "a-repo",
        nameWithOwner: "a-repo-repo-owner",
        isPrivate: false,
        description: "this is a repo",
        cardImage: "/cardimage.jpg",
        cardSummary: "/Readme.md",
        thumbImage: "thumbimage.jpg",
        repoBranch: "master"
      }
    },
  },
  computed: {
  },
  methods: {
    getStyles:function(url){
      return{
        // "height":`200px`,
        "background":`linear-gradient(180deg, rgba(51, 94, 165, 0.4) 0%, rgba(255, 255, 255, 0) 152.64%), url(${url})`,
        "background-size": "cover",
        "background-color": this.bgColor,
        height: `${this.height}px`
      }
    },
    getImgUrl: function(nameWithOwner, isPrivate, cardImage) {
      if (isPrivate) {
        return "/resources/image/private-placeholder.png";
      } else if (cardImage && cardImage !== null) {
        return `https://raw.githubusercontent.com/${nameWithOwner}/${this.repo.repoBranch}${cardImage}`;
      } else {
        return "/resources/image/no-summary-img-placeholder.png";
      }
    },
    showContent(repoName, summaryDoc, summaryImage) {
      // console.log('JoseFinderCard: showContent: '+
      //   'repoName: ' + `${repoName}`,
      //   'summaryDoc: ' + `${summaryDoc}`,
      //   'summaryImage: ' + `${summaryImage}`,
      // )
      if (repoName) {
        return this.$router.push({
          path: `/viewer/${repoName}`,
          summaryDoc: `${summaryDoc}`,
          summaryImage: `${summaryImage}`
        });
      }
    }
  }
};
</script>

<style scoped>
.card__image{
  height:100px;
}


</style>
