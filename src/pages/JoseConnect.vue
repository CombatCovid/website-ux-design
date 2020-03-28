<template>
  <Layout>
  <v-container grid-list-md>
    <v-layout row wrap>
      <v-flex xs6 sm5 v-for="repo in $page.gitapi.organization.repositories.nodes" :key="repo.name">
        <v-card  hover>
          <v-img 
            p-5 class="white--text align-end" height="200px" 
            :src="getImgUrl(repo.nameWithOwner, repo.images.entries[0].name)"
          >  
          </v-img>
          <v-card-title v-text="repo.name"></v-card-title>
          <v-card-subtitle v-text="getImgUrl(repo.nameWithOwner, repo.images.entries[1].name)"></v-card-subtitle>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
  </Layout>
</template>

<script>

export default {
  metaInfo: {
    title: 'Demo Connect'
  },
  data: function () {
    return {
      numberRepos: 3,
    }
  },
  methods: {
    getImgUrl: function(repoName, fileName){
        return `https://raw.githubusercontent.com/${repoName}/master/docs/img/${fileName}`
    }
  }
}
</script>

// this is hardwired, as api graphql requires a first: or last: value,
// but I believe this isn't settable in Gridsome unless creating page
// programatically, via createPage()
<page-query>
  query Jurra1 {
  gitapi{
    organization(login:"CombatCovid"){
      repositories(last:1){
        nodes{
          name
          nameWithOwner
          docs: object(expression: "master:docs") {
            ... on GitApi_Tree {
              entries {
                name
              }
            }
            ... on GitApi_Blob {
              text
            }
           }
           images: object(expression: "master:docs/img") {
             ... on GitApi_Tree {
#             ... on Tree {
               entries {
                 name
               }
             }
           }
           srcs: object(expression: "master:src") {
             ... on GitApi_Tree {
#             ... on Tree {
               entries {
                 name
               }
             }
           }
        }
      }
    }
  }
}

</page-query>
<!--  query DemoConnect  {-->
<!--    gitapi {-->
<!--      repos: viewer {-->
<!--        name-->
<!--        repositories(last: 99) {-->
<!--          nodes {-->
<!--            name-->
<!--          }-->
<!--        }-->
<!--      }-->
<!--    }-->
<!--  }-->

<style scoped>
  .query-content {
    margin: 20px;
    padding: 15px;
    color: darkslategray;
    background-color: beige;
  }
  .repo-list {
    padding: 2px 10px;
  }
</style>
