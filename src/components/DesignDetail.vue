<template>
  <div>
    <h2>Design is {{ summaryTitle }}</h2>
    <img :src="summaryImage" width="240px"/>
    <VueMarkdown :source="summaryText" :prerender="cleanFormatMarkdown"/>
  </div>
</template>

<script>

  import VueMarkdown from 'vue-markdown'

  export default {
    name: "DesignDetail",
    props: {
      design: String
    },
    data: function () {
      return {
        demoImage: '/resources/image/Example.jpg' // *todo* we'll want our own default...
      }
    },
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
      summaryImage: function () {
        return this.imagePath + this.htmlSanitize(this.designRepo.images.entries[0].name)
      },
      designRepo: function () {
        let dRepo = this.repos[3]
console.log('design: ' + this.design)
        if (typeof this.design === "undefined") {
          dRepo = this.repos[4]
        }
        else {
          const filtered = this.repos.filter (repo => repo.name === this.design)
          dRepo = filtered[0]
        }
        return dRepo
      }
    },
    components: { VueMarkdown }
  }
</script>

// this is hardwired, as api graphql requires a first: or last: value,
// but I believe this isn't settable in Gridsome unless creating page
// programatically, via createPage() - which is still hardwired...
<static-query>
  query DesignDetail  {
    gitapi {
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
</static-query>

<style scoped>
</style>
