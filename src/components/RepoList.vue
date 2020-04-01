<template>
    <v-container grid-list-lg fluid>
      <v-layout row wrap>
        <v-flex xs12 md3 v-for="repo in $page.gitapi.organization.repositories.nodes" :key="repo.name">
          <v-card
            v-on:click="showContent(repo.name)"
            hover min-height="350px" max-height="350px"
          >
            <v-img v-if="repo.images !== null"
                   p-5 class="white--text align-end" height="200px"
                   :src="getImgUrl(repo.nameWithOwner, repo.images.entries[0].name)"
            >
            </v-img>
            <v-img v-else
                   p-5 class="white--text align-end" height="200px"
                   src="https://www.stleos.uq.edu.au/wp-content/uploads/2016/08/image-placeholder.png"
            >
            </v-img>
            <v-card-title v-text="repo.name"></v-card-title>
            <v-card-subtitle v-text="repo.description"></v-card-subtitle>
          </v-card>
        </v-flex>
      </v-layout>
    </v-container>
</template>

<script>
export default {
    name: "ReposList",
    props:[],
    components:{
      RepoCard
    }
}
</script>