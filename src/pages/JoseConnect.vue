<template>
  <Layout>
  <v-container grid-list-lg fluid>
    <v-layout>
      <v-flex xs5 v-for="repo in $page.gitapi.organization.repositories.nodes" :key="repo.name">
        <v-card  hover min-height="350px" max-height="350px">
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
      if(fileName!== null){
        return `https://raw.githubusercontent.com/${repoName}/master/docs/img/${fileName}`
      }
      else{
        return "https://heavenly-holland.com/wp-content/uploads/2017/05/Vermeer03.jpg"
      }
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
      repositories(first:50){
        nodes{
          name
          nameWithOwner
          description
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
