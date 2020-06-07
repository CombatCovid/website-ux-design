<template>
  <Layout class="min-h-screen">
    <div class>
      <client-only>
        <ais-instant-search :index-name="indexName" :search-client="searchClient" class>
          <ais-configure :hits-per-page.camel="8" />
          <!-- <ais-powered-by/> -->
          <ais-search-box class="fixed z-50 w-full bg-gray-15 border-b border-solid border-gray-25">
            <div
              class="max-w-5xl mx-auto"
              slot-scope="{ currentRefinement, isSearchStalled, refine }"
            >
              <div class="md:flex md:flex-col lg:flex-row items-center pl-5 mb-2 py-4">
                <div>
                  <h1 class="font-bold text-3xl">FINDER</h1>
                  <ais-powered-by />
                </div>
                <div class="md:w-full lg:w-3/5 md:mx-5">
                  <div class="relative w-full">
                    <input
                      class="text-xl w-full rounded-md bg-white p-4 focus:shadow-xl"
                      type="search"
                      v-model="currentRefinement"
                      @input="refine($event.currentTarget.value)"
                      placeholder="Type keywords like ventilator or 3D printing"
                    />
                    <Search class="absolute top-0 h-full mr-6 right-0" />
                    <span :hidden="!isSearchStalled">Loading...</span>
                  </div>
                </div>
                <div class="w-8">
                  <FinderPaginator />
                </div>
              </div>
            </div>
          </ais-search-box>

          <ais-hits class="clear-above pt-32 pb-12 lg:px-12">
            <div slot-scope="{ items }">
              <div class>
                <div class="flex flex-wrap">
                  <div
                    class="lg:w-1/4 md:w-1/3 sm:w-auto p-2"
                    v-for="(item, index) in items"
                    :key="index"
                  >
                    <JoseFinderCard
                      :repo="{ title: item.title, name: item.name,
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
import algoliasearch from "algoliasearch";
import store from "~/store";
import FinderPaginator from "../components/FinderPaginator";
import JoseFinderCard from "../components/JoseFinderCard";
// import { mdiMagnify } from "@mdi/js";
import Search from "~/assets/GreenSearch";

export default {
  metaInfo: {
    title: "Finder"
  },
  data: function() {
    return {
      numberRepos: 3,
      indexName: store.getters.algoSearchIndex,
      searchClient: algoliasearch(
        store.getters.algoAppId,
        store.getters.algoSearchKey
      ),
      repoBranch: store.getters.repoBranch
      // mdiMagnify: mdiMagnify
    };
  },
  components: { JoseFinderCard, FinderPaginator, Search }
};
</script>

<style scoped>
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
