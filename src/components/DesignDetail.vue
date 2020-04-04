<template>
  <div>
    <h1 class="normal-h-size horiz-center">This design is: {{ summaryTitle }}</h1>
    <div class="design-image-hold">
      <img :src="summaryImg" class="design-image"/>
    </div>
    <VueMarkdown :source="summaryTxt"/>
  </div>
</template>

<script>

  import VueMarkdown from 'vue-markdown'

  export default {
    name: "DesignDetail",
    props: {
      design: { type: String, default: 'No Design passed' },
      summaryDoc: { type: String, default: '/Readme.md' },
      summaryImage: { type: String, default: '/summary.jpg' }
    },
    data: function () {
      return {
        demoImage: '/resources/image/Example.jpg' // *todo* we'll want our own default...
      }
    },
    mounted () {
      // console.log('mounted - repos: ' + JSON.stringify(this.repos) )
      console.log ('mounted: summaryDoc: ' + this.summaryDoc)
      console.log ('mounted: summaryImage: ' + this.summaryImage)
    },
    computed: {
      // _Always_ sanitize anything that might contain html...soon in Vuex, we anticipate
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
        console.log('repoName - designRepo: ' + JSON.stringify(dRepo) )

        return dRepo
      },
      repoName: function () {
        return this.designRepo.name
      },
      summaryTitle:  function () {
        return this.titleCase(this.spaceDashes(this.htmlSanitize(this.repoName)))
      },
      repos: function () {
        return this.$static.gitapi.organization.repositories.nodes
      },
      summaryTxt: function () {
        const sanitary = this.htmlSanitize(this.repoName + '/' + this.summaryText)
        return this.cleanFormatMarkdown(sanitary, this.imageFolder)
      },
      imageFolder: function () {
        return 'https://raw.githubusercontent.com/CombatCovid/' +
          this.repoName +
          '/master/docs/'
      },
      imagePath: function () {
        return this.imageFolder + 'img/'
      },
      summaryImg: function () {
        return this.imagePath + this.htmlSanitize(this.repoName + '/' + this.summaryImage)
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

<style>
  .md-image-fit { /* must be unscoped, as these apply to unscopedrendered Markdown */
    width: 90%;
    margin: 2% 5% 0 5%
  }
  .md-caption-fit {
    text-align: center;
    margin: 0 auto;
  }
  h1, h2, h3,h4 {
    font-size: medium;
  }
  @media only screen and (max-width: 959px) {
    h1, h2, h3,h4 {
      font-size: small;
    }
  }
</style>

<style scoped>
  .normal-h-size {
    font-size: larger;
  }
  @media only screen and (max-width: 959px) {
    .normal-h-size {
      font-size: small;
    }
  }
  .horiz-center {
    margin: 0 auto;
    text-align: center;
  }
  .design-image {
    width: 100%;
  }
  .design-image-hold {
    margin: 3% auto;
  }
</style>
