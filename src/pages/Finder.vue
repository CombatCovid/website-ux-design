<template>
  <Layout class="finder">
    <div class="finder__container">
      <v-layout d-flex style="width:30%;margin:0 auto">
        <!-- <h1 class="horiz-center" style="margin-right:1em;">FINDER</h1> -->
     </v-layout>
        <client-only>
          <ais-instant-search 
            :index-name="indexName"
            :search-client="searchClient" 
            class="horiz-center searchbox"
            
            >

            <ais-configure :hits-per-page.camel="8" />

            <!-- <ais-powered-by/> -->
            <ais-search-box>
              <div class="searchBox" slot-scope="{ currentRefinement, isSearchStalled, refine }">
                <h1>FINDER 🔍</h1>
                <input
                  class="searchBox__input"
                  type="search"
                  v-model="currentRefinement"
                  @input="refine($event.currentTarget.value)"
                  placeholder="Type keywords like ventilator or 3D printing"
                >
                <span :hidden="!isSearchStalled">Loading...</span>
              </div>
            </ais-search-box>
            

            <ais-hits class="clear-above">
              <div slot-scope="{ items }">
                <v-layout d-flex flex-wrap>
                  <v-row d-flex cols="1">
                    <v-col 
                          cols="12" 
                          md="4"
                          sm="6"
                          lg="3"
                          class="d-flex child-flex"
                           v-for="(item, index) in items" :key="index">
                      <JoseFinderCard :repo="{ title: item.title, name: item.name,
                        nameWithOwner: item.nameWithOwner, isPrivate: item.isPrivate,
                        description: item.description, cardImage: item.cardImage,
                        summaryDoc: item.cardSummary, summaryImage: item.cardImage,
                        repoBranch: repoBranch }"/>
                    </v-col>
                  </v-row>
                </v-layout>
              </div>
            </ais-hits>
  

          </ais-instant-search>
        </client-only>
    </div>
  </Layout>
</template>

<script>

  import algoliasearch from 'algoliasearch'
  import store from '~/store'
  import JoseFinderCard from '../components/JoseFinderCard'

  export default {
    metaInfo: {
      title: 'Finder'
    },
    data: function () {
      return {
        numberRepos: 3,
        indexName: store.getters.algoSearchIndex,
        searchClient: algoliasearch(
          store.getters.algoAppId,
          store.getters.algoSearchKey
        ),
        repoBranch: store.getters.repoBranch
      }
    },
    components: { JoseFinderCard },
  }
</script>

<style scoped>
  .finder{
    background-color: #F3F4F4;
  }

  .searchBox{
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

  .searchForm{
    margin:3em;
  }
  .searchInput{
    color:blue !important;
    padding: 12px 20px;
    margin: 8px 0;
    display: inline-block;
    border: 1px solid #ccc;
    border-radius: 15px;
    box-sizing: border-box;
  }
  .horiz-center {
    margin: 0 auto;
    /* text-align: center; */
  }
  .searchbox {
    margin: 15px;
  }
  .low-attention {
    font-size: x-small;
  }
  .clear-above {
    margin-top: 10px;
  }

@media only screen and (min-width:1600px){
  .finder__container{
    width:85%;
    margin:auto;
  }
}

@media only screen and (min-width:1000px){
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
