<template>
  <Layout class="finder min-h-screen">
    <div class="">
        <client-only>
          <ais-instant-search 
            :index-name="indexName"
            :search-client="searchClient" 
            class=""    
            >

            <ais-configure :hits-per-page.camel="8" />
            <!-- <ais-powered-by/> -->
            <ais-search-box class="fixed z-50 w-full bg-gray-200 px-5 border border-solid border-gray-400">
              <div class="" slot-scope="{ currentRefinement, isSearchStalled, refine }">
              <div class="md:flex md:flex-col lg:flex-row items-center pl-5 mb-2">
                <div>
                <h1 class="font-bold text-xl">FINDER</h1>
                <ais-powered-by/>
                </div>
                <div class="md:w-full lg:w-3/5">
                  <div class="md:mx-5 shadow-xl rounded-md sm:my-3 bg-white p-4">
                    <div class="flex">
                    <!-- <svg class="fill-current h-4 w-4" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M26.398 3C21.7053 3 17.1179 4.39157 13.216 6.99874C9.31405 9.60591 6.27288 13.3116 4.47703 17.6472C2.68118 21.9827 2.2113 26.7535 3.12682 31.3561C4.04234 35.9587 6.30213 40.1864 9.62043 43.5047C12.9387 46.823 17.1665 49.0828 21.7691 49.9984C26.3717 50.9139 31.1425 50.444 35.478 48.6481C39.8136 46.8523 43.5193 43.8111 46.1264 39.9092C48.7336 36.0073 50.1252 31.4199 50.1252 26.7271C50.1248 20.4344 47.6248 14.3996 43.1752 9.94996C38.7256 5.50035 32.6907 3.0004 26.398 3V3Z" stroke="#2D9CDB" stroke-width="4.83333" stroke-miterlimit="10"/>
                      <path d="M44.1006 44.4293L60.6714 61" stroke="#2D9CDB" stroke-width="4.83333" stroke-miterlimit="10" stroke-linecap="round"/>
                    </svg> -->
                    <input
                      class="text-xl w-full"
                      type="search"
                      v-model="currentRefinement"
                      @input="refine($event.currentTarget.value)"
                      placeholder="Type keywords like ventilator or 3D printing"
                    ></input>
                    <span :hidden="!isSearchStalled">Loading...</span>
                    </div>
                  </div>
                </div>
                <div class="w-8">
                  <FinderPaginator/>
                </div>
                </div>

              </div>
            </ais-search-box>
            

            <ais-hits class="clear-above pt-24">
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
                        repoBranch: repoBranch }"
                    />
                  </div>
                </div>
              </div>
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
  import FinderPaginator from '../components/FinderPaginator'
  import JoseFinderCard from '../components/JoseFinderCard'
  // import { mdiMagnify } from "@mdi/js";
  import Search from "~/assets/Search.svg";


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
        repoBranch: store.getters.repoBranch,
        // mdiMagnify: mdiMagnify
      }
    },
    components: { JoseFinderCard , FinderPaginator, Search }
  }
};
</script>

<style scoped>
.finder__header {
  display: flex;
  justify-content: space-around;
  width: 100%;
}

.finder__paginator {
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
}

.searchBox {
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.searchBox__input {
  /* border-style: solid; */
  background-color: white;
  padding: 0.5em 0.5em 0.5em 1em;
  border-radius: 0.5em;
  -webkit-box-shadow: 4px 10px 44px -4px rgba(0, 0, 0, 0.49);
  -moz-box-shadow: 4px 10px 44px -4px rgba(0, 0, 0, 0.49);
  box-shadow: 0px 16px 25px rgba(29, 53, 87, 0.26);
  border-radius: 5px;
  width: 100%;
}

.searchBox__input > input {
  width: 80%;
}

.searchBox__input:focus,
input:focus {
  outline: none;
}

.searchForm {
  margin: 3em;
}

.searchbox {
  margin: 15px;
}

@media only screen and (min-width: 1600px) {
  .finder__container {
    width: 85%;
    margin: auto;
  }
}

@media only screen and (min-width: 1000px) {
  .finder__header {
    /* width:100%; */
  }

  .searchBox {
    display: flex;
    align-items: center;
    flex-direction: row;
    justify-content: center;
    width: 100%;
    margin: 0 auto;
    margin-top: 1.5em;
    margin-bottom: 2.5em;
  }

  .searchBox__input {
    width: 600px;
    margin-left: 1em;
    margin-right: 1em;
    padding: 1em 0.5em 1em 1em;
    font-size: 1.3em;
    border-radius: 10px;
  }

  .searchBox span {
    font-size: 1em;
  }
}
</style>
