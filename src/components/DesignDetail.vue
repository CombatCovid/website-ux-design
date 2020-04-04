<template>
  <div>
    <h1 class="normal-h-size horiz-center">This design is: {{ summaryTitle }}</h1>
    <div class="design-image-hold">
      <img :src="summaryImg" class="design-image"/>
    </div>
    <div class="horiz-center doc-title">
      <h1>Summary</h1>
    </div>
    <VueMarkdown :source="summaryTxt"/>
  </div>
</template>
<script>

  import VueMarkdown from 'vue-markdown'

  export default {
    name: "DesignDetail",
    props: {
      design: { type: String, default: "" }
    },
    data: function () {
      return {
        demoImage: '/resources/image/Example.jpg' // *todo* we'll want our own default...
      }
    },
    computed: {
      // _Always_ sanitize anything that might contain html...soon in Vuex, we anticipate
      designRepo: function () {

        // this is used when Viewer is called directly
        // we'll do something with validity and/or Vuex memory to do better here
        // *todo* at this moment first valid is fifth - metadata will rescue
        let dRepo = this.repos[4]

        if (this.design) {
          const filtered = this.repos.filter (repo => repo.name === this.design)
          dRepo = filtered[0]
        }
        // console.log('DesignDetail:designRepo: ' + JSON.stringify(dRepo.name) )

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
        // const sanitary = this.htmlSanitize(this.repoName + '/' + this.summaryText)
        const sanitary = this.htmlSanitize(this.designRepo.docs.folders[0].contents.files[0].object.text)
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
        // return this.imagePath + this.htmlSanitize(this.repoName + '/' + this.summaryImage)
        return this.imagePath + this.htmlSanitize(this.designRepo.images.entries[0].name)
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
  .doc-title {
    padding: 0 20px 20px 20px;
  }
  .formal-look {
    color: #1d5c87;
    font-family: Roboto, sans-serif;
    font-size: small;
    padding: 20px;
    max-width: 640px;
  }
</style>
