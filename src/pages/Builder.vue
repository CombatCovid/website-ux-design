<template>
  <Layout>
    <client-only>
      <h1 class="horiz-center">One-Button Index Builder</h1>
      <div class="horiz-center">
        <v-btn @click="algoIndex">Build</v-btn>
        <v-btn @click="algoSearch">Search</v-btn>
      </div>
      <div class="horiz-center searchbox">
        <ais-instant-search :index-name="indexName" :search-client="searchClient">
          <ais-search-box />
          <ais-hits>
            <div slot="item" slot-scope="{ item }">
              <h2>{{ item.name }}</h2>
            </div>
          </ais-hits>
        </ais-instant-search>
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
    </client-only>
  </Layout>
</template>

<script>

  import { createSearchClient } from '@algolia/client-search'
  import algoliasearch from 'algoliasearch'

  export default {
    metaInfo: {
      title: 'Builder'
    },
    data: function () {
      return {
        numberRepos: 3,
        indexName: process.env.GRIDSOME_ALGO_SEARCH_INDEX,
        searchClient: algoliasearch(
          process.env.GRIDSOME_ALGO_APPLICATION_ID,
          process.env.GRIDSOME_ALGO_ADMIN_KEY
        )
      }
    },
    components: { },
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
          return "/resources/image/image-placeholder.png"
        }
      },
      algoIndex: function () {

        const appId = process.env.GRIDSOME_ALGO_APPLICATION_ID
        const adminKey = process.env.GRIDSOME_ALGO_ADMIN_KEY
        const indexName = process.env.GRIDSOME_ALGO_SEARCH_INDEX

        // console.log('algoIndex appId: ' + appId + ', type: ' + typeof appId)
        // console.log('algoIndex adminKey: ' + adminKey + ', type: ' + typeof adminKey)
        // console.log('algoIndex index: ' + process.env.GRIDSOME_ALGO_SEARCH_INDEX)

        const client = algoliasearch(appId, adminKey);
        const index = client.initIndex(indexName);

        const objects = [
          {
            objectID: 1,
            title: "SPA Website",
            path: "",
            keywords: ""
          },
          {
            objectID: 2,
            title: "simple-covid-repos-search",
            path: "",
            keywords: ""
          },
          {
            objectID: 3,
            title: "backend-hardware-designs-registry",
            path: "",
            keywords: ""
          },
          {
            objectID: 3,
            title: "backend-hardware-designs-registry",
            path: "",
            keywords: ""
          },
          {
            objectID: 4,
            title: "doc-template",
            path: "",
            keywords: ""
          },
          {
            objectID: 5,
            title: "Medical Shields for 3d Printing",
            name: "medical-shields-for-3d-printing",
            nameWithOwner: "CombatCovid/medical-shields-for-3d-printing",
            description: "The materials required to manufacture one unit are less than $1",
            cardSummary: "/docs/01-Getting Started.md",
            cardImage: "/docs/img/Capture-design.JPG",
            thumbImage: null,
            keywords: "medical personnel doctor nurse protection hospital ambulance emt uniform safety"
          },
          {
            objectID: 6,
            title: "MIT Emergency Ventilator",
            name: "mit-emergency-ventilator",
            nameWithOwner: "CombatCovid/mit-emergency-ventilator",
            description: "A low-cost ventilator, based on the collective wisdom of many clinicians",
            cardSummary: "/docs/01-Getting Started.md",
            cardImage: "/docs/img/Electrical-System-Architecture-2.jpg",
            thumbImage: null,
            keywords: "patient recovery critical intensive care equipment emergency helper treatment hospital operating room"
          },
          {
            objectID: 7,
            title: "TU Delft Scuba Mask for Covid19",
            name: "TU-Delft-Scuba-Mask-covid-19",
            nameWithOwner: "CombatCovid/TU-Delft-Scuba-Mask-covid-19",
            description: "A reusable full face mask, for application by medical staff in operating rooms and intensive care",
            cardSummary: "/docs/01-Geeting Started.md",
            cardImage: "/cpap_600.jpg",
            thumbImage: null,
            keywords: "patient recovery critical intensive care equipment emergency helper treatment hospital operating room"
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

        index
          .search("hosp")
          .then(({ hits }) => {
            console.log('rdw hits: ' + JSON.stringify(hits))
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
  .searchbox {
    margin: 10px;
  }
</style>
