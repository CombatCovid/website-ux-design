<template>
  <Layout>
    <h1 class="horiz-center">One-Button Index Builder</h1>
    <div class="horiz-center">
      <v-btn @click="previewForBuild">Preview</v-btn>
      <v-btn @click="algoClearReplaceBuild">Fast Build (preferred)</v-btn>
      <v-btn @click="algoAtomicStepBuild">Hoare Build</v-btn>
      <v-btn @click="algoReadbackAll">Read Back All</v-btn>
      <v-btn @click="clearAll">Clear the Screen</v-btn>
    </div>
    <div>
      <br>
      <h1 class="horiz-center">Available Indexes:</h1>
      <div v-if="availableIndexes && availableIndexes.length > 0">
        <div v-for="(item, index) in availableIndexes" index="i">
          <p class="horiz-center">{{ item }} {{ item === indexInUse ? '(in use)' : '' }}</p>
        </div>
      </div>
      <div v-else>
        <p>(no list yet)</p>
      </div>
      <h1 class="horiz-center">Object Results</h1>
      <div v-if="objectsError">
        <h2>Error: {{ objectsError }}</h2>
      </div>
      <div v-else-if="objectResults.length > 0">
        <h2>total Objects: {{ objectResults.length }}</h2>
        <div v-for="(obj, i) in objectResults" index="i">
          <h3>Title: {{ obj.title }}</h3>
          <p>Description: {{ obj.description }}</p>
          <p>EN Keywords: {{ obj.keywords }}</p>
          <p>Full Keywords: {{ obj.fullKeywords }}</p>
<!--          <div v-for="(key, i) in obj.fullKeyWords" index="i">-->
<!--            <p>language {{ key[i] }}</p>-->
<!--            <p>{{ key[i].keywords }}</p>-->
<!--          </div>-->
          <p>Card Image: {{ obj.cardImage }}</p>
        </div>
      </div>
      <div v-else>
        <h2 class="horiz-center">Nothing yet...</h2>
      </div>
    </div>
  </Layout>
</template>

<script>

  // import { createSearchClient } from '@algolia/client-search'
  import algoliasearch from 'algoliasearch'
  import Yaml from 'yaml'
  import store from '~/store'

  // *todo* nicer overall if a top-level catch could be placed in Vue - look into that

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
        ),
        objectResults: [],
        objectsError: null,
        indexInUse: store.getters.algoIndexName,
        availableIndexes: store.getters.algoIndexesList
      }
    },
    components: { },
    mounted: function () {
      console.log('available indexes: ' + JSON.stringify(store.getters.algoIndexesList))
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
                keywords: this.keywordsFromRepo(repo),
                fullKeywords: this.fullKeywordsFromRepo(repo), // ['fully', 'here'], // JSON.stringify(this.fullKeywordsFromRepo(repo)),
                cardSummary: "/README.md",
                cardImage: this.summaryJpgExists(repo) ? '/summary.jpg' : null, // this.summaryImageFromRepo(repo, "/summary.jpg"),
                thumbImage: null,
              }
            })

        return info
      },
    },
    methods: {  // *todo* overall: get some .env-conditioning on debug for this
      previewForBuild: function () {
        this.clearAll()
        try {
          const objects = this.indexableRepoInfo // now we go...

          if (objects.length < 1) {
            throw new Error('No repos available: nothing yet to preview...')
          }

          // console.log('previewForBuild: ' + JSON.stringify(objects))
          this.objectResults = objects
        }
        catch (err) {
          const msg = 'previewForBuild: No indexable objects: ' + err
          console.log(msg)
          this.objectsError = msg

          return
        }
      },
      clearResults: function () {
        this.objectResults = []
      },
      summaryJpgExists: function (repo) {
        return repo.summaryJpg !== null // a little redundant, yes, but clear; true meaning of null in data also
      },
      metaDataObject: function (repo) {
        return repo.metaData
          ? Yaml.parse (repo.metaData.text)
          : null
      },
      keywordsFromRepo: function (repo) {
        const meta = this.metaDataObject(repo)
        return meta
          ? meta.languages.EN.keywords
          : null // "!!!!n0n3!!!!"
      },
      descriptionFromRepo: function (repo) {
        const meta = this.metaDataObject(repo)
        // *todo* a little temporary fun touch prepared, waits until we put the langs in the data!
        const lang = 'EN' // (repo.name === 'mit.emergency.ventilator') ? 'ES' : 'EN'
        return meta
          ? meta.languages[lang].description
          : 'the description from metadata.yaml will go here'
      },
      notOurSoftwareBackground: function (obj) {
        return null === obj.name.match(/SPA-website|backend-hardware-designs-registry|simple-covid-repos-search|doc-template/)
      },
      getImgUrl: function (repoName, fileName) {
        // console.log('getImgUrl: filename; ' + JSON.stringify(fileName))
        if (fileName !== null && this.safeImageFileType(fileName)) {
          return `https://raw.githubusercontent.com/${repoName}/master/docs/img/${fileName}`
        } else {
          return "/resources/image/image-placeholder.png"
        }
      },
      validRepo: (repo) => {
        return null === repo.name.match(/SPA-website|backend-hardware-designs-registry|simple-covid-repos-search|doc-template/)
      },
      summaryTitleFromRepo: function (repo) {
        const meta = this.metaDataObject(repo)
        return meta && meta.title
          ? meta.title
          : this.summaryTitleFromName(repo.name)
      },
      fullKeywordsFromRepo: function (repo) {
        const meta = this.metaDataObject(repo)
        if (meta) {
          // console.log('fullKeywordsFromRepo : meta.languages: ' + JSON.stringify(meta.languages))
          let allKeys = ""
          Object.keys(meta.languages).forEach(lang => {
            allKeys = allKeys + meta.languages[lang].keywords
          })
          return allKeys
        }
        else {
          return null // "!!!!n0n3!!!!"
        }
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
      clearAll: function () {
        this.clearResults()
        this.clearErrors()
      },
      clearErrors: function () {
        this.objectsError = null
      },
      algoClearReplaceBuild: async function () {

        this.clearAll() // must

        const appId = store.getters.algoAppId
        const adminKey = store.getters.algoAdminKey
        const indexName = store.getters.algoIndexName

        const client = algoliasearch(appId, adminKey);
        const index = client.initIndex(indexName);

        try {
          const objects = this.indexableRepoInfo

          if (objects.length < 1) {
            throw new Error('No repos available: aborting index (re)build...')
          }

          // this way is faster, and the hiccup should be un-noticed,
          // if we need it to tame function timeouts remote.

          // *IMPORTANT* we're going to build fresh: everything out first
          // and it's a Promise, must then be written this way:
          // wait for Algolia actually completing this command -- and _properly_ handle any UX activity
          await index.clearObjects()
            .then(() => {
              // done
              console.log('index: ' + indexName + ' now cleared.')
            });

          index
            .saveObjects(objects)
            .then(({objectIDs}) => {
              console.log('algoClearReplaceBuild: added ' + objectIDs.length + ' records.')
              // console.log('algoClearReplaceBuild: record objects: ' + JSON.stringify(objects))
              this.objectResults = objects
            })
            .catch(err => {
              console.log('algoClearReplaceBuild: Error: ' + JSON.stringify(err))
              this.objectsError = JSON.stringify(err)
            })
        } catch (err) {
          const msg = 'algoClearReplaceBuild: No indexable objects: ' + err
          console.log('Error: ' + msg)
          this.objectsError = msg

          return // this is the essential safety...so present index remains
        }
      },
      algoAtomicStepBuild: function () {

        this.clearAll() // must

        const appId = store.getters.algoAppId
        const adminKey = store.getters.algoAdminKey
        const indexName = store.getters.algoIndexName

        const client = algoliasearch(appId, adminKey);
        const index = client.initIndex(indexName);

        // *IMPORTANT* we're going to build fresh: everything out first
        // and it's a Promise, must then be written this way:
        // wait for Algolia actually completing this command -- and _properly_ handle any UX activity

        try {
          const objects = this.indexableRepoInfo // now we go...

          if (objects.length < 1) {
            throw new Error('No repos available: aborting index (re)build...')
          }

          // this way is zero-downtime; algolia builds then swaps. slow, costs a little more
          index.replaceAllObjects(objects, {safe: true})
            .then(({objectIDs}) => {
              console.log('algoClearReplaceBuild: added ' + objectIDs.length + ' records.')
              // console.log('algoClearReplaceBuild: record objects: ' + JSON.stringify(objects))
              this.objectResults = objects
            })
            .catch(err => {
              console.log('algoClearReplaceBuild: Error: ' + JSON.stringify(err))
              this.objectsError = JSON.stringify(err)
            })
        } catch (err) {
          const msg = 'algoAtomicStepBuild: No indexable objects: ' + err
          console.log('Error: ' + msg)
          this.objectsError = msg

          return // this is the essential safety...so present index remains
        }
      },
      algoReadbackAll: function () {

        this.clearErrors() // must

        const appId = store.getters.algoAppId
        const searchKey = store.getters.algoAdminKey
        const indexName = store.getters.algoIndexName

        const client = algoliasearch(appId, searchKey);
        const index = client.initIndex(indexName);

        index
          .search("")
          .then(({ hits }) => {
            // console.log('algoReadbackAll hits: ' + JSON.stringify(hits))
            this.objectResults = hits
          })
          // .then((ret) => {
          //   this.objectResults = ret.hits
          // })
          .catch(err => {
            console.log('algoReadbackAll error: ' + JSON.stringify(err))
            this.objectsError = 'algoReadbackAll error: ' + JSON.stringify(err)
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
          metaData: object(expression: "master:metadata.yaml") {
            ...on GitApi_Blob {
              text
            }
          }
          summaryJpg: object(expression: "master:summary.jpg") {
            ...on GitApi_Blob {
              isBinary
              text
            }
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
