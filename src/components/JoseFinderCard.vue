<template>
  <v-card class d-flex hover  v-on:click="showContent(repo.name, repo.cardSummary, repo.cardImage)">
    <div
      class="card__image">
      <img class="card__image" :src="getImgUrl(repo.nameWithOwner, repo.isPrivate, repo.cardImage)">
    </div>
    <div class="card__content">
      <h3 v-text="repo.title" class></h3>
      <p class>{{ niceTruncate(repo.description) }}</p>
    </div>
      <v-card-actions class="card__btns">
        <v-btn
          outlined
          small
          v-on:click="showContent(repo.name, repo.cardSummary, repo.cardImage)"
        >documentation</v-btn>
        <v-btn color="green" dark small>
          <a :href="getRepoZip(repo.nameWithOwner, repo.repoBranch)" target="_blank">download</a>
        </v-btn>
      </v-card-actions>
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
    }
  },
  computed: {},
  methods: {
    
    getRepoZip: function(nameWithOwner, repoBranch) {
      console.log(
        `https://github.com/${nameWithOwner}/archive/${repoBranch}.zip`
      );
      return `https://github.com/${nameWithOwner}/archive/${repoBranch}.zip`;
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
a{
 text-decoration: none;
 color:white !important; 
}

.card{
  position:relative;
}

.card__image {
  width:100%;
  height:150px;
  object-fit:cover;
}

.card__gradient::after{
    background-image: linear-gradient(to bottom, transparent 0%, white 100%);
}

.card__content {
  border-top: #C5C6C8 solid 1px;
  padding: 1em;
  margin-bottom:1em;
  /* position: relative; */
  /* height: 200px; */
}

.card__btns {
  display: flex;
  flex-direction: row;
  position: absolute;
  bottom: 0;
  padding-bottom: 0.8em;
}

@media only screen and (min-width:1200px){
  .card__content{
    padding:1.5em;
  }
}

</style>
