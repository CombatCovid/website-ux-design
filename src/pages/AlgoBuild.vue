<template>
  <Layout>
    <h1 class="horiz-center">#HardwareCombats.covid</h1>
    <div class="horiz-center">
      <v-btn @click="algoIndex">Build</v-btn>
      <v-btn @click="algoSearch">Search</v-btn>
    </div>
    <v-container grid-list-lg fluid>
      <v-layout row wrap>
        <v-flex xs12 md3 v-for="repo in $page.gitapi.organization.repositories.nodes" :key="repo.name">
          <v-card hover min-height="350px" max-height="350px">
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

  import { createSearchClient } from '@algolia/client-search'
  import algoliasearch from 'algoliasearch'

  export default {
    metaInfo: {
      title: 'Demo Connect'
    },
    data: function () {
      return {
        numberRepos: 3
      }
    },
    mounted: function () {
      return {
        repos: this.$page.gitapi.organization.repositories.nodes
      }
    },
    methods: {
      getImgUrl: function (repoName, fileName) {
        if (fileName !== null) {
          return `https://raw.githubusercontent.com/${repoName}/master/docs/img/${fileName}`
        } else {
          return "https://heavenly-holland.com/wp-content/uploads/2017/05/Vermeer03.jpg"
        }
      },
      algoIndex: function () {

        const appId = process.env.GRIDSOME_ALGO_APPLICATION_ID
        const adminKey = process.env.GRIDSOME_ALGO_ADMIN_KEY
        const indexName = process.env.GRIDSOME_ALGO_SEARCH_INDEX
        // console.log('algoIndex appId: ' + appId + ', type: ' + typeof appId)
        // console.log('algoIndex adminKey: ' + adminKey + ', type: ' + typeof adminKey)
        console.log('algoIndex index: ' + process.env.GRIDSOME_ALGO_SEARCH_INDEX)
        const client = algoliasearch(appId, adminKey);
        const index = client.initIndex(indexName);

        const objects = [
          {
            objectID: 1,
            name: "Foo"
          },
          {
            objectID: 2,
            name: "Combat with Hardware"
          },
          {
            objectID: 3,
            name: "combat with hardware"
          }
        ]

        index
          .saveObjects(objects)
          .then(({objectIDs}) => {
            console.log(objectIDs)
          })
          .catch(err => {
            console.log(err)
          })

        index
          .search("Fo")
          .then(({ hits }) => {
            console.log(hits);
          })
          .catch(err => {
            console.log(err);
          });
      },
      algoSearch: function () {

        const appId = process.env.GRIDSOME_ALGO_APPLICATION_ID
        const adminKey = process.env.GRIDSOME_ALGO_ADMIN_KEY
        const indexName = process.env.GRIDSOME_ALGO_SEARCH_INDEX

        const client = algoliasearch(appId, adminKey);
        const index = client.initIndex(indexName);

        index
          .search("Fo")
          .then(({ hits }) => {
            console.log(hits)
          })
          .catch(err => {
            console.log(err)
          })
      }
    }
  }
</script>

// this is hardwired, as api graphql requires a first: or last: value,
// but I believe this isn't settable in Gridsome unless creating page
// programatically, via createPage()
<page-query>
  query Algo1 {
  gitapi{
    organization(login:"CombatCovid"){
      repositories(first:50){
        nodes {
          name
          nameWithOwner
          docs: object(expression: "master:docs") {
            ... on GitApi_Tree {
              folders: entries {
                lang: name
                ... FolderInfo
              }
            }
           }
           images: object(expression: "master:docs/img") {
             ... on GitApi_Tree {
               entries {
                 name
               }
             }
           }
           srcs: object(expression: "master:src") {
             ... on GitApi_Tree {
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

fragment FolderInfo on GitApi_TreeEntry {
    contents: object {
      ... on GitApi_Tree {
        files: entries {
          name
          object {
            ...on GitApi_Blob {
              isBinary
              text
            }
          }
        }
      }
    }
  }
</page-query>

<style scoped>
  .horiz-center {
    margin: 0 auto;
    text-align: center;
  }
</style>
