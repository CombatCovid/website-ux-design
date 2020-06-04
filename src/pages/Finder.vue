<template>
  <Layout class="finder">
    <div class="finder__container">
      <div v-if="algoliaReady">
      <client-only>
          <ais-instant-search 
            :index-name="indexName"
            :search-client="searchClient" 
            class="horiz-center searchbox"    
            >

            <ais-configure :hits-per-page.camel="9" />
            <!-- <ais-powered-by/> -->
            <ais-search-box>
              <div class="finder__header" slot-scope="{ currentRefinement, isSearchStalled, refine }">
              <div class="searchBox">
                <div>
                <h1>FINDER</h1>
                <ais-powered-by/>
                </div>
                <div class="searchBox__input">
                <v-icon style="margin-right:0.2em;" large>{{mdiMagnify}}</v-icon>
                <input
                  class=""
                  type="search"
                  v-model="currentRefinement"
                  @input="refine($event.currentTarget.value)"
                  placeholder="Type keywords like ventilator or 3D printing"
                ></input>
                </div>
                <span :hidden="!isSearchStalled">Loading...</span>
                <FinderPaginator/>
                </div>

              </div>
            </ais-search-box>
            

            <ais-hits class="clear-above">
              <div slot-scope="{ items }">
                <div class="">
                  <div class="flex flex-wrap">
                    <div 
                      class="lg:w-1/4 md:w-1/3 sm:w-auto p-2 "
                      v-for="(item, index) in items" :key="index"
                      >
                      <JoseFinderCard :repo="{ title: item.title, name: item.name,
                        nameWithOwner: item.nameWithOwner, isPrivate: item.isPrivate,
                        description: item.description, cardImage: item.cardImage,
                        summaryDoc: item.cardSummary, summaryImage: item.cardImage,
                        repoBranch: repoBranch }"/>
                    </div>
                  </div>
                </div>
              </div>
            </ais-hits>
  

          </ais-instant-search>
        </client-only>
      </div>
      <div v-else-if="algoliaError">
        <h2>Sorry, app isn't able to connect.</h2>
        <h2>{{ algoliaError }}</h2>
      </div>
    </div>
  </Layout>
</template>

<script>

  import algoliasearch from 'algoliasearch'
  import store from '~/store'
  import { setAlgoliaConfig } from '~/modules/habitat-requests'
  import FinderPaginator from '../components/FinderPaginator'
  import JoseFinderCard from '../components/JoseFinderCard'
  import { mdiMagnify } from "@mdi/js";


  export default {
    metaInfo: {
      title: 'Finder'
    },
    data: function () {
      return {
        numberRepos: 3,
        // indexName: store.getters.algoSearchIndex,
        // searchClient: algoliasearch(
        //   store.getters.algoAppId,
        //   store.getters.algoSearchKey
        // ),
        repoBranch: store.getters.repoBranch,
        mdiMagnify: mdiMagnify
      }
    },
    beforeCreate: () => {
      setAlgoliaConfig() // must prepare before Algolia parts get used
    },
    computed: {
      algoliaError: () => { return store.getters.algoConfigError },
      algoliaReady: () => { return store.getters.algoConfigReady },
      indexName: () => { return store.getters.algoSearchIndex },
      searchClient: () =>
      {
        return algoliasearch(
          store.getters.algoAppId,
          store.getters.algoSearchKey
        )
      },
    },
    methods: {
      algoApp: () => {
        return JSON.stringify(store.getters.currentAlgoSearchIndex)
      },
    },
    components: { JoseFinderCard , FinderPaginator }
  }
</script>

<style scoped>
  .finder{
    background-color: #F3F4F4;
  }

  .finder__header{
    display:flex;
    justify-content:space-around;
    width:100%;
  }

  .finder__paginator{
    display:flex;
    flex-direction:row;
    justify-content:center;
    align-items:center;
  }

  .searchBox{
    width:100%;
    display:flex;
    flex-direction:column;
    justify-content:center;
    align-items:center;
  }
  
  .searchBox__input{
    /* border-style: solid; */
    background-color:white;
    padding:0.5em 0.5em 0.5em 1em;
    border-radius:0.5em;
    -webkit-box-shadow: 4px 10px 44px -4px rgba(0,0,0,0.49);
    -moz-box-shadow: 4px 10px 44px -4px rgba(0,0,0,0.49);
    box-shadow: 0px 16px 25px rgba(29, 53, 87, 0.26);
    border-radius: 5px;
    width:100%;
  }

  .searchBox__input > input{
    width:80%;
  }

  .searchBox__input:focus, input:focus{
    outline: none;
  }

  .searchForm{
    margin:3em;
  }
  
  .searchbox {
    margin: 15px;
  }
  
  

@media only screen and (min-width:1600px){
  .finder__container{
    width:85%;
    margin:auto;
  }
}

@media only screen and (min-width:1000px){
  .finder__header{
    /* width:100%; */
  }
  
  .searchBox{
    display:flex;
    align-items:center;
    flex-direction:row;
    justify-content:center;
    width:100%; 
    margin:0 auto;
    margin-top:1.5em;
    margin-bottom:2.5em;
  }

  .searchBox__input{
    width:600px;
    margin-left:1em;
    margin-right:1em;
    padding:1em 0.5em 1em 1em;
    font-size:1.3em;
    border-radius: 10px;
  }

  .searchBox span{
    font-size:1em;
  }

}

</style>
