<template>
    <v-container grid-list-lg fluid>
      <v-layout row wrap>
        <v-flex xs12 md3 v-for="repo in $page.gitapi.organization.repositories.nodes" :key="repo.name">
          <RepoCard
            v-on:click="showContent(repo.name)"
            :repoImg="getImgUrl(repo.nameWithOwner, repo.images.entries[0].name)"
            :repoName="repo.name"
            :repoSum="repo.description"
          >
          </RepoCard>
        </v-flex>
      </v-layout>
    </v-container>
</template>

<script>
import RepoCard from '~/components/RepoCard.vue'
export default {
    name: "ReposList",
    props:[],
    components:{
      RepoCard
    },
    computed:{
      computed: {
      // _Always_ sanitize anything that might contain html...soon in Vuex, we anticipate
      repoName: function () {
        return this.designRepo.name
      },
      summaryTitle:  function () {
        return this.titleCase(this.spaceDashes(this.htmlSanitize(this.repoName)))
      },
      repos: function () {
        return this.$static.gitapi.organization.repositories.nodes
      },
      summaryText: function () {
        return this.htmlSanitize(this.designRepo.docs.folders[0].contents.files[0].object.text)
      },
      imagePath: function () {
        return 'https://raw.githubusercontent.com/CombatCovid/' +
          this.repoName +
          '/master/docs/img' +'/'
      },

      // Get design repo
      designRepo: function () {
        let dRepo = this.repos[3]

        if (typeof this.design === "undefined") {
          // this case if page called directly, as from menu
          // then we'd set view to 'first' repo
          // *todo* at early moment first valid is fifth - metadata will rescue
          dRepo = this.repos[4]
        }
        else {
          const filtered = this.repos.filter (repo => repo.name === this.design)
          dRepo = filtered[0]
        }
        return dRepo
      }
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