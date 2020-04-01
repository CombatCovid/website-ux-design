<template>
  <v-card 
    v-on:click="showContent(repoName)"
    hover min-height="350px" max-height="350px">
    <v-img :src="repoImg" p-5 class="white--text align-end" height="200px"></v-img>
    <v-card-title v-text="repoName"></v-card-title>
    <v-card-subtitle v-text="repoSum"></v-card-subtitle>
  </v-card>
</template>
<script>
export default {
  name: "RepoCard",
  props: {
    repoImg: String,
    repoName: String,
    repoTitle: String,

    // Repository summary
    repoSum: String
  },
  methods: {
    getImgUrl: function(repoName, fileName) {
      return `https://raw.githubusercontent.com/${this.repoName}/master/docs/img/${this.repoImg}`;
    },
    showContent(repoName){
      return this.$router.push({ path: `/viewer/${repoName}` })
    }
  }
};
</script>