<template>
  <div>
    <h1 class="normal-h-size horiz-center">This design is: {{ summaryTitle }}</h1>
    <div v-if="imagesShow" class="images-slide image-display-mask design-image-hold docs-show-pane">
        <div class="d-flex flex-nowrap justify-center doc-title temp-shift-small-screen">
          <v-btn @click="slideImages('<')"></v-btn>
          <v-tooltip bottom>
            <template v-slot:activator="{ on }">
              <v-btn class="xslider-title" v-on="on" @click="popImages">
                Design Images ({{ nrImages }})
              </v-btn>
            </template>
            <span>Click to return to the summary.</span>
          </v-tooltip>
          <v-btn @click="slideImages('>')"></v-btn>
        </div>
      <VueGlide :perView="1" :gap="30" :rewind="false" type="carousel" ref="imagesSlider">
        <VueGlideSlide class="xslide-image" v-for="(imagesImg, i) in imagesImgs" :key="i">
          <div class="horiz-center">
            <img :src="imagesImg" class="ximage-lim"
                 alt="imagesImg" width="100%"> <!-- that width 100% is critical -->
          </div>
        </VueGlideSlide>
      </VueGlide>
    </div>
    <div v-else class="design-image-hold">
      <div class="image-display-mask">
        <div class="horiz-center doc-title temp-shift-small-screen" @click="popImages">
          <v-tooltip bottom>
            <template v-slot:activator="{ on }">
              <v-btn v-on="on">Summary Image - click for all</v-btn>
            </template>
            <span>Click to see view all the design images. Click again to return to the summary.</span>
          </v-tooltip>
        </div>
        <div class="images-slide">
          <img :src="summaryImg" alt="summaryImg" class="design-image"/>
        </div>
      </div>
    </div>
    <hr color="#e3ebef" size="2px" class="rule-appearance">
    <div v-if="docsShow" class="docs-show-pane">
      <div class="d-flex flex-nowrap justify-center doc-title temp-shift-small-screen">
        <v-btn @click="slideDocs('<')"><</v-btn>
          <v-tooltip bottom>
            <template v-slot:activator="{ on }">
              <v-btn v-on="on" @click="popDocs">
                Design Documents ({{ nrTexts }})
              </v-btn>
            </template>
            <span>Click to return to the summary.</span>
          </v-tooltip>
        <v-btn @click="slideDocs('>')">></v-btn>
      </div>
      <div class="docs-slides-pane">
        <VueGlide :perView="1" :gap="10" :rewind="false" type="carousel" ref="docsSlider">
          <VueGlideSlide v-for="(docText, i) in docsTexts" :key="i">
            <!--        Slide {{ i }}-->
            <div class="docs-slide">
              <VueMarkdown :source="unscopeBasisMarkup(docText)" :postrender="unscopeBasisMarkup" />
            </div>
          </VueGlideSlide>
        </VueGlide>
      </div>
    </div>
    <div v-else>
      <div class="horiz-center doc-title temp-shift-small-screen">
        <v-tooltip bottom>
          <template v-slot:activator="{ on }">
            <v-btn @click="popDocs" v-on="on">Design Summary - click for all</v-btn>
          </template>
          <span>Click to see view all the design documentse. Click again to return to the summary.</span>
        </v-tooltip>
      </div>
        <div class="docs-slide docs-slides-pane">
          <VueMarkdown :source="unscopeBasisMarkup(summaryText)" :postrender="unscopeBasisMarkup"/>
        </div>
    </div>
  </div>
</template>
<script>

  import VueMarkdown from 'vue-markdown'
  import { Glide, GlideSlide } from 'vue-glide-js'
  import 'vue-glide-js/dist/vue-glide.css'
  import axios from 'axios'

  export default {
    name: "DesignDetail",
    props: {
      design: { type: String, default: "" }
    },
    components: {
      VueMarkdown,
      [Glide.name]: Glide,
      [GlideSlide.name]: GlideSlide
    },
    data: function () {
      return {
        summaryText: 'retrieving...',
        nrTexts: 1,
        nrImages: 1,
        imagesShow: false,
        docsShow: false,
        demoImage: '/resources/image/Example.jpg' // *todo* we'll want our own default...
      }
    },
    mounted () {
      axios.get('https://raw.githubusercontent.com/CombatCovid/' +
        this.htmlSanitize(this.repoName) + '/master/README.md')
        .then(response => {
            this.summaryText = this.cleanFormatMarkdown(response.data, this.summaryImageFolder, this.repoTreeFolder)
          },
          error => {
            console.log('summaryTxt retrieval error: ' + JSON.stringify(error))
            this.summaryText = 'summaryTxt retrieval error: ' + JSON.stringify(error)
          })
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
        let sani = this.htmlSanitize(this.repoName)

        sani = sani.replace(/-+/ig, ' ')
        sani = this.titleCase(this.spaceDashes(sani))

        if (sani.match(/mit/i)) {
          // *todo* def special casing for demos until we get Vuex on line to pass real title
          return sani.replace(/mit/i, 'MIT')
        } else {
          return sani
        }
      },
      repos: function () {
        return this.$static.gitapi.organization.repositories.nodes
      },
      summaryTxt: function () {
        // const sanitary = this.htmlSanitize(this.repoName + '/' + this.summaryText)
        // const sanitary = this.htmlSanitize(this.designRepo.docs.folders[0].contents.files[0].object.text)
        // return this.cleanFormatMarkdown(sanitary, this.repoBlobsFolder)
      },
      docsTexts () {
        let texts = new Array()
        this.designRepo.docs.folders[0].contents.files.forEach(file => {
          // console.log('file: ' + JSON.stringify(file))
          if (file.name.search(/\.md/) > 0) {
            texts.push(this.cleanFormatMarkdown(
              this.htmlSanitize(file.object.text), this.imageFolder, this.repoTreeFolder))
          }
        })
        // console.log ('texts: ' + JSON.stringify(texts))
        this.nrTexts = texts.length
        return texts
      },
      imageFolder: function () {
        return 'https://raw.githubusercontent.com/CombatCovid/' +
          this.repoName +
          '/master/docs/'
      },
      summaryImageFolder: function () {
        return 'https://raw.githubusercontent.com/CombatCovid/' +
          this.repoName +
          '/master/'
      },
      repoTreeFolder: function () {
        return 'https://github.com/CombatCovid/' +
          this.repoName +
          '/tree/master/'
      },
      imagePath: function () {
        return this.imageFolder + 'img/'
      },
      summaryImg: function () {
        return 'https://raw.githubusercontent.com/CombatCovid/' +
          this.htmlSanitize(this.repoName) +
          '/master/summary.jpg'
      },
      imagesImgs () {
        let images = new Array()
        this.designRepo.images.entries.forEach(entry => {
          if (entry.name.search(/jpg|png|jpeg|gif/) > 0) {
            images.push(this.imagePath + this.htmlSanitize(entry.name))
          }
        })
        // console.log ('images: ' + JSON.stringify(images))
        this.nrImages = images.length
        return images
      }
    },
    methods: {
      popImages: function () {
        this.imagesShow = !this.imagesShow;
      },
      slideImages: function (direction) {
        this.$refs.imagesSlider.go(direction)
      },
      popDocs: function () {
        this.docsShow = !this.docsShow;
      },
      slideDocs: function (direction) {
        this.$refs.docsSlider.go(direction)
      }
    }
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
      width:100%!important;

    /* width: 50%; */
    /* margin: 2% 5% 0 5% */
  }

  /*
    here are the filter-translated equivalents for the converted Markdown:
    h1 -> .h1-unscoped, etc.. These have to be in <style> non-scoped,
    as Markdown conversions can't be scoped. Translation by unscopeBasisMarkup()
    gets us these tags.
}  */
  .h1-unscoped {
    /*font-size: 0.9em;*/
    margin-bottom: 1em;
  }

  .h2-unscoped {
    /*font-size: 0.85em;*/
    margin-bottom: 1em;
  }

  .h3-unscoped {
    /*font-size: 0.8em;*/
    margin-bottom: 1em;
  }

  .h4-unscoped {
    /*font-size: 0.7em;*/
    margin-bottom: 1em;
  }

  .li-unscoped {
    /*font-size: 0.9em;*/
    margin-bottom: 1em;
  }

  .p-unscoped {
    /*font-size: 0.9em;*/
    margin-bottom: 1em;
  }

  @media only screen and (max-width: 640px) {
    .h1-unscoped {
      font-size: 0.9em;
      margin-bottom: 1em;
    }

    .h2-unscoped {
      font-size: 0.85em;
      margin-bottom: 1em;
    }

    .h3-unscoped {
      font-size: 0.8em;
      margin-bottom: 0.8em;
    }

    .h4-unscoped {
      font-size: 0.7em;
      margin-bottom: 0.8em;
    }

    .li-unscoped {
      font-size: 0.9em !important;
      margin-bottom: 0.9em;
    }

    .p-unscoped {
      font-size: 0.9em !important;
      margin-bottom: 0.9em;
    }
  }
  /** end unscoped markup conversion tags, so far: h5 and h6 available */

  .md-image-fit { /* must be unscoped, as these apply to unscopedrendered Markdown */
    width: 90%;
    margin: 2% 5% 0 5%
  }

  .md-caption-fit {
    text-align: center;
    margin: 0 auto;
  }

  .v-application ul {
    padding-left: 16px /* *todo* defeat v, maybe tag instead later */
  }

  @media only screen and (max-width: 959px) {
    .v-application ul {
      padding-left: 10px; /* *todo* defeat v, maybe tag instead later */
    }
  }

</style>

<style scoped>

  /* *todo* later we'll have our own md-h1 etc. for, used via filter on md as it
       becomes html, so then to be in control of its formatting on screens */
  /*h1, h2, h3, h4 {*/
  /*  font-size: medium;*/
  /*}*/

  /*@media only screen and (max-width: 959px) {*/
  /*  h1, h2, h3, h4 {*/
  /*    font-size: small;*/
  /*  }*/
  /*}*/

  .slider-title {
    margin-top: 20px;
  }

  .image-display-mask {
    overflow: hidden !important;
  }

  .image-lim {
    max-height: 600px;
  }

  .images-slide {
    width: 80%;
    max-height: 600px;
    margin: 0 10%;
  }

  @media only screen and (max-width: 959px) {
    .images-slide {
      width: 94%;
      max-height: 600px;
      margin: 0 2%;
    }
  }

  .slide-image {
    width: 600px;
    max-height: 600px;
  }

  .docs-show-pane {
    margin-top: 2rem;
    /*background-color: teal;*/
    /* *todo* later work out: background-color: #348F50 !important;*/
  }

  .docs-slide {
    width: 80%;
    margin: 0 10%;
  }
  @media only screen and (min-width: 1601px) {
    .docs-slide {
      max-width: 1600px; /* 1600px;*/
    }
  }

  @media only screen and (max-width: 959px) {
    .docs-slide {
      width: 94%;
      max-height: 600px;
      margin: 0 2%;
    }
  }

  .slide-docs {
    width: 600px;
    max-height: 600px;
  }

  .normal-h-size {
    /* font-size: larger; */
  }

  @media only screen and (max-width: 959px) {
    .normal-h-size {
      /* font-size: small; */
    }
  }

  .horiz-center {
    margin: 0 auto;
    text-align: center;
  }

  .doc-title {
    padding: 0 20px 20px 20px;
  }

  .design-image {
    /* width: 100%; */
  }
  @media only screen and (min-width: 1601px) {
    .container {
      max-width: 1600px;
    }
  }

  .design-image-hold {
    /* margin: 3% auto; */
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

  .rule-appearance {
    color: #e3ebef;
    margin-bottom: 40px;
  }

  @media only screen and (max-width: 639px) {
    .temp-shift-small-screen {
      margin-left: -10px;
    }
  }

  .docs-slides-pane { /* see below */
    /*background-color: #56B4D3;*/
    padding: 0 10px;
  }

  /* *todo* that docs-slides-pane _overrides_ padding set where?? in glide? later../ */
  /*@media only screen and (max-width: 1024px) {*/
  /*  .docs-slides-pane {*/
  /*    !*background-color: #56B4D3;*!*/
  /*    padding: 0 50px;*/
  /*  }*/
  /*}*/
  /*@media only screen and (max-width: 639px) {*/
  /*  .docs-slides-pane {*/
  /*    !*background-color: #56B4D3;*!*/
  /*    padding: 0;*/
  /*  }*/
  /*}*/

</style>
