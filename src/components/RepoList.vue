<template>
  <v-container grid-list-lg fluid>
    <v-layout row wrap>
      <v-flex
        xs12
        md3
        v-for="repo in $page.gitapi.organization.repositories.nodes"
        :key="repo.name"
      >
        <RepoCard
          v-on:click="showContent(repo.name)"
          v-if="repo.images !== null"
          :repoImg="getImgUrl(repo.nameWithOwner, repo.images.entries[0].name)"
          :repoName="repo.name"
          :repoSum="repo.description"
        ></RepoCard>
        <RepoCard
          v-on:click="showContent(repo.name)"
          v-else
          repoImg="https://www.stleos.uq.edu.au/wp-content/uploads/2016/08/image-placeholder.png"
          :repoName="repo.name"
          :repoSum="repo.description"
        ></RepoCard>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import RepoCard from "~/components/RepoCard.vue";

export default {
  name: "ReposList",
  props: [],
  components: {
    RepoCard
  },
  methods: {
    getImgUrl: function (repoName, fileName) {
      if (fileName !== null) {
        return `https://raw.githubusercontent.com/${repoName}/master/docs/img/${fileName}`
      } 
    }
  },

    // Get design repo
    designRepo: function() {
      let dRepo = this.repos[3];

      if (typeof this.design === "undefined") {
        // this case if page called directly, as from menu
        // then we'd set view to 'first' repo
        // *todo* at early moment first valid is fifth - metadata will rescue
        dRepo = this.repos[4];
      } else {
        const filtered = this.repos.filter(repo => repo.name === this.design);
        dRepo = filtered[0];
      }
      return dRepo;
    }
  };
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