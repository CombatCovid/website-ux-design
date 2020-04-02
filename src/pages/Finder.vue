<template>
  <Layout>
    <h1 class="horiz-center">Finder</h1>

    <client-only>
      <ais-instant-search :index-name="indexName"
                          :search-client="searchClient" class="horiz-center searchbox">

        <ais-configure :hits-per-page.camel="8" />

        <ais-powered-by/>
        <ais-search-box/>

        <ais-hits class="clear-above">
          <div slot-scope="{ items }">
<!--            <p>{{ JSON.stringify(items)}}</p>-->
            <v-container grid-list-lg fluid>
              <v-layout d-flex flex-wrap>
                <v-row>
                  <v-col cols="12" md="3" v-for="(item, index) in items" :key="index">
                    <JoseCard :repo="{ title: item.title, name:
                  item.name, nameWithOwner: item.nameWithOwner,
                  description: item.description, cardImage: item.cardImage }"/>
                  </v-col>
                </v-row>
              </v-layout>
            </v-container>
          </div>
        </ais-hits>

      </ais-instant-search>
    </client-only>

<!--    prior way...-->
<!--    <v-container grid-list-lg fluid>-->
<!--      <v-layout row wrap>-->
<!--        <v-flex xs12 md3 v-for="repo in $page.gitapi.organization.repositories.nodes" :key="repo.name">-->
<!--          <v-card-->
<!--            v-on:click="showContent(repo.name)"-->
<!--            hover min-height="350px" max-height="350px"-->
<!--          >-->
<!--            <v-img v-if="repo.images !== null"-->
<!--                   p-5 class="white&#45;&#45;text align-end" height="200px"-->
<!--                   :src="getImgUrl(repo.nameWithOwner, repo.images.entries[0].name)"-->
<!--            >-->
<!--            </v-img>-->
<!--            <v-img v-else p-5 class="white&#45;&#45;text align-end" height="200px" max-width="200px"-->
<!--                   src="https://www.stleos.uq.edu.au/wp-content/uploads/2016/08/image-placeholder.png"-->
<!--            >-->
<!--            </v-img>-->
<!--            <v-card-title v-text="repo.name"></v-card-title>-->
<!--            <v-card-subtitle v-text="repo.description"></v-card-subtitle>-->
<!--          </v-card>-->
<!--        </v-flex>-->
<!--      </v-layout>-->
<!--    </v-container>-->
  </Layout>
</template>

<script>

  import { createSearchClient } from '@algolia/client-search'
  import algoliasearch from 'algoliasearch'
  import JoseLayout from '../components/JoseLayout';
  import JoseCard from '../components/JoseCard';

  export default {
    metaInfo: {
      title: 'Finder'
    },
    data: function () {
      return {
        numberRepos: 3,
        indexName: process.env.GRIDSOME_ALGO_SEARCH_INDEX,
        searchClient: algoliasearch(
          process.env.GRIDSOME_ALGO_APPLICATION_ID,
          process.env.GRIDSOME_ALGO_SEARCH_KEY
        )
      }
    },
    components: { JoseCard, JoseLayout },
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
      showContent(repoName){
        return this.$router.push({ path: `/viewer/${repoName}`, design: '${repoName}' })
      }
    }
  }
</script>

// this is hardwired, as api graphql requires a first: or last: value,
// but I believe this isn't settable in Gridsome unless creating page
// programatically, via createPage()
<!--<page-query>-->
<!--  query Algo1 {-->
<!--  gitapi{-->
<!--    organization(login:"CombatCovid"){-->
<!--      repositories(first:50){-->
<!--        nodes {-->
<!--          name-->
<!--          nameWithOwner-->
<!--          docs: object(expression: "master:docs") {-->
<!--            ... on GitApi_Tree {-->
<!--              folders: entries {-->
<!--                lang: name-->
<!--                ... FolderInfo-->
<!--              }-->
<!--            }-->
<!--           }-->
<!--           images: object(expression: "master:docs/img") {-->
<!--             ... on GitApi_Tree {-->
<!--               entries {-->
<!--                 name-->
<!--               }-->
<!--             }-->
<!--           }-->
<!--           srcs: object(expression: "master:src") {-->
<!--             ... on GitApi_Tree {-->
<!--               entries {-->
<!--                 name-->
<!--               }-->
<!--             }-->
<!--           }-->
<!--        }-->
<!--      }-->
<!--    }-->
<!--  }-->
<!--}-->

<!--fragment FolderInfo on GitApi_TreeEntry {-->
<!--    contents: object {-->
<!--      ... on GitApi_Tree {-->
<!--        files: entries {-->
<!--          name-->
<!--          object {-->
<!--            ...on GitApi_Blob {-->
<!--              isBinary-->
<!--              text-->
<!--            }-->
<!--          }-->
<!--        }-->
<!--      }-->
<!--    }-->
<!--  }-->
<!--</page-query>-->

<style scoped>
  .horiz-center {
    margin: 0 auto;
    text-align: center;
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
</style>
