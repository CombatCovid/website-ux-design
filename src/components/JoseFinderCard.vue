<template>
  <v-card class d-flex hover  v-on:click="showContent(repo.name, repo.cardSummary, repo.cardImage)">
    <div class="card__gradient">
      <div
        class="">
        <img class="card__image" :src="getImgUrl(repo.nameWithOwner, repo.isPrivate, repo.cardImage)">
      </div>
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
  border-bottom: #C5C6C8 solid 1px;
  width:100%;
  height:150px;
  object-fit:cover;
}


.card__content {
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

.card__gradient{
  position:relative;
  display:inline-block;
}

/* 
#002f4b,#dc4225 
Convert HEX to RGBA - http://hex2rgba.devoth.com/
*/
.card__gradient:after {
  content:'';
  position:absolute;
  left:0; top:0;
  width:100%; height:100%;
  display:inline-block;
  background: -moz-linear-gradient(top, rgba(1, 44, 68, 0.56) 0%, rgba(1, 44, 68, 0.12) 100.13%); /* FF3.6+ */
  background: -webkit-gradient(linear, left top, left bottom, color-stop(0%,rgba(220, 66, 37, 0.5)), color-stop(100%,rgba(0,47,75,0.5))); /* Chrome,Safari4+ */
  background: -webkit-linear-gradient(top, rgba(1, 44, 68, 0.56) 0%,rgba(1, 44, 68, 0.12) 100.13%); /* Chrome10+,Safari5.1+ */
  background: -o-linear-gradient(top, rgba(1, 44, 68, 0.56) 0%,rgba(1, 44, 68, 0.12) 100.13%); /* Opera 11.10+ */
  background: -ms-linear-gradient(top, rgba(1, 44, 68, 0.56) 0%,rgba(1, 44, 68, 0.12) 100.13%); /* IE10+ */
  background: linear-gradient(180deg, rgba(1, 44, 68, 0.56) 0%, rgba(1, 44, 68, 0.12) 100.13%); /* W3C */
  filter: progid:DXImageTransform.Microsoft.gradient( startColorstr='#002f4b', endColorstr='#00000000',GradientType=0 ); /* IE6-9 */
}
.card__gradient img{
  display:block;
}

@media only screen and (min-width:1200px){
  .card__content{
    padding:1.5em;
  }
}

</style>
