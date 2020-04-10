<template>
  <Layout>
    <client-only>
      <h1 class="horiz-center">One-Button Index Builder</h1>
      <div class="horiz-center">
        <v-btn @click="algoBuildFreshIndex">Build</v-btn>
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
  import store from '~/store'

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
    computed: {
      indexableRepoInfo: function () {

        let buildObjectID = 0 // initiate at beginning

        const info = this.$page.gitapi.organization.repositories.nodes
          .filter (repo => this.validRepo(repo))
          .map (repo => {
            return {
                objectID: buildObjectID++,
                title: this.summaryTitleFromRepo(repo),
                name: repo.name,
                nameWithOwner: repo.nameWithOwner,
                description: this.descriptionFromRepo (repo),
                cardSummary: "/README.md",
                cardImage: '/summary.jpg', // this.summaryImageFromRepo(repo, "/summary.jpg"),
                thumbImage: null,
                keywords: "medical personnel doctor nurse protection hospital ambulance emt uniform safety"
              }
            })

        return info
      },
    },
    methods: {  // *todo* overall: get some .env-conditioned debug into this, soon, commented console.logs
      summaryImageFromRepo: function (repo, fileName) {
        const repoFile = `repo.${repo.nameWithOwner}/master${fileName}`
        console.log('summaryImageFromRepo: filename; ' + JSON.stringify(repoFile))
        if (fileName !== null
          && repoFile
          && this.safeImageFileType(fileName)) {
          return repoFile
        } else {
          return "/resources/image/image-placeholder.png"
        }
      },
      getImgUrl: function (repoName, fileName) {
        // console.log('getImgUrl: filename; ' + JSON.stringify(fileName))
        if (fileName !== null && this.safeImageFileType(fileName)) {
          return `https://raw.githubusercontent.com/${repoName}/master/docs/img/${fileName}`
        } else {
          return "/resources/image/image-placeholder.png"
        }
      },
      validRepo: (repo) => repo.docs !== null && !repo.name.includes('template'),
      summaryTitleFromRepo: function (repo) {
        // *todo* next, return from metadata.yaml if there
        return this.summaryTitleFromName(repo.name)
      },
      descriptionFromRepo: function (repo) {
        // *todo* next, return from metadata.yaml if there
        return 'description from metadata.yaml will go here...'
      },
      summaryTitleFromName:  function (repoName) {
        let sani = this.htmlSanitize(repoName)

        sani = sani.replace(/-+/ig, ' ')
        sani = this.titleCase(this.spaceDashes(sani))

        // *todo* def special casing for demos until we get Vuex & metadata on line to pass real title
        return sani.match(/mit/i)
          ? sani.replace(/mit/i, 'MIT')
          : sani
      },
      algoBuildFreshIndex: async function () {

        const appId = store.getters.algoAppId
        const adminKey = store.getters.algoAdminKey
        const indexName = store.getters.algoIndexName

        const client = algoliasearch(appId, adminKey);
        const index = client.initIndex(indexName);

        // *IMPORTANT* we're going to build fresh: everything out first
        // and it's a Promise, must then be written this way:
        // wait for Algolia actually completing this command -- and _properly_ handle any UX activity
        await index.clearObjects()
          .then(() => {
            // done
            console.log('index: ' + indexName + ' now cleared.')
        });

        const objects = this.indexableRepoInfo // now we go...

        index
          .saveObjects(objects)
          .then(({objectIDs}) => {
            console.log('algoBuildFreshIndex: added ' + objectIDs.length + ' records.')
            console.log('algoBuildFreshIndex: record objects: ' + JSON.stringify(objects))
          })
          .catch(err => {
            console.log('algoBuildFreshIndex: Error: ' + err)
          })
      },
      algoSearch: function () {

        const appId = store.getters.algoAppId
        const searchKey = store.getters.algoSearchKey
        const indexName = store.getters.algoBuildFreshIndex

        const client = algoliasearch(appId, searchKey);
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
