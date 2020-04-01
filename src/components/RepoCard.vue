<template>
    <v-card 
        v-on:click="showContent(repo.name)" 
        hover min-height="350px" 
        max-height="350px">
      <v-img
        v-if="repo.images !== null"
        :repoImg="repoImg"
        :src="getImgUrl(repoImg)"
        p-5
        class="white--text align-end"
        height="200px"
      ></v-img>
      <v-img
        v-else
        p-5
        class="white--text align-end"
        height="200px"
        src="https://www.stleos.uq.edu.au/wp-content/uploads/2016/08/image-placeholder.png"
      ></v-img>
      <v-card-title v-text="repoName"></v-card-title>
      <v-card-subtitle v-text="repo"></v-card-subtitle>
    </v-card>
</template>
<script>
export default {
  name: "RepoCard",
  props: {
    repoImg: String,
    repoName: String,
    repoTitle:String,

    // Repository summary
    repoSum: String
  },
  methods: {
    getImgUrl: function(repoName, fileName) {
        return `https://raw.githubusercontent.com/${repoName}/master/docs/img/${repoImg}`;
    }
  }
};
</script>