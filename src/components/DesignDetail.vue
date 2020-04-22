<template>
  <div>
    <h1 class="normal-h-size horiz-center">This design is: {{ summaryTitle }}</h1>
    <div v-if="imagesShow" class="images-slide image-display-mask design-image-hold docs-show-pane">
        <div class="d-flex flex-nowrap justify-center doc-title fix-box temp-shift-small-screen">
          <v-btn @click="slideImages('<')"><</v-btn>
          <v-tooltip bottom>
            <template v-slot:activator="{ on }">
              <v-btn class="xslider-title" v-on="on" @click="popImages">
                Design Images ({{ nrImages }})
              </v-btn>
            </template>
            <span>Click to return to the summary.</span>
          </v-tooltip>
          <v-btn @click="slideImages('>')">></v-btn>
        </div>
      <VueGlide :perView="1" :gap="30" :rewind="false" type="carousel" ref="imagesSlider">
        <VueGlideSlide class="xslide-image" v-for="(imagesImg, i) in imagesImgs" :key="i">
          <div class="horiz-center">
            <img :src="imagesImg" alt="imagesImg" width="100%"> <!-- that width 100% is critical -->
          </div>
        </VueGlideSlide>
      </VueGlide>
    </div>
    <div v-else class="design-image-hold">
      <div class="image-display-mask">
        <div class="horiz-center doc-title fix-box temp-shift-small-screen" @click="popImages">
          <v-tooltip bottom>
            <template v-slot:activator="{ on }">
              <v-btn v-on="on">Summary Image - click<span class="hide-small">&nbsp;for&nbsp;all</span></v-btn>
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
      <div class="d-flex flex-nowrap justify-center doc-title fix-box temp-shift-small-screen">
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
      <div class="horiz-center doc-title fix-box temp-shift-small-screen">
        <v-tooltip bottom>
          <template v-slot:activator="{ on }">
            <v-btn @click="popDocs" v-on="on">Design Summary - click<span class="hide-small">&nbsp;for&nbsp;all</span></v-btn>
          </template>
          <span>Click to see view all the design documentse. Click again to return to the summary.</span>
        </v-tooltip>
      </div>
        <div class="docs-slide docs-slides-pane">
          <VueMarkdown :source="summaryText" :postrender="unscopeBasisMarkup"/>
        </div>
    </div>
  </div>
</template>
<script>

  import VueMarkdown from 'vue-markdown'
  import { Glide, GlideSlide } from 'vue-glide-js'
  import 'vue-glide-js/dist/vue-glide.css'
  import store from '~/store'

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
        theDesign: this.design, // this because we may mutate from the prop...
        nrTexts: 1,
        nrImages: 1,
        imagesShow: false,
        docsShow: false,
        repoBranch: store.getters.repoBranch // essential so we choose it
      }
    },
    mounted () {
      store.dispatch('loadDesign', this.theDesign) // a good beginning
      if (!this.theDesign || this.theDesign.length <= 0) {
        this.theDesign = store.getters.lastRepoName // so use it if had any
      }
    },
    computed: {
      // _Always_ sanitize anything that might contain html...soon in Vuex, we anticipate
      designRepo: function () {

        // this is used when Viewer is called directly
        // *todo* we'll do something with validity via Vuex persistence to do better here
        // *todo* at this moment first valid is fifth - metadata will rescue
        let dRepo = null // this.repos[4]

        if (this.repos && this.repos.length > 0 && this.theDesign) {
          const filtered = this.repos.filter (repo => repo.repository.name === this.theDesign)
          // console.log('DesignDetail:filtered: ' + JSON.stringify(filtered) )
          dRepo = filtered.length > 0
            ? filtered[0].repository
            : null
        }
        if (dRepo) {
          // console.log('DesignDetail:designRepo: ' + JSON.stringify(dRepo) )
          console.log('DesignDetail:designRepo:: name ' + dRepo.name)
        }

        return dRepo
      },
      repoName: function () {
        // return this.designRepo
        //   ? this.designRepo.name
        //   : 'empty (until we remember what you had, please begin from the Finder)'
        return this.designRepo
          ? this.designRepo.name
          : 'empty (until we remember what you had, please begin from the Finder)'
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
      summaryText: function () {
        // console.log ('summaryMarkdown: ' + store.getters.summaryMarkdown)
        return this.cleanFormatMarkdown(
          store.getters.summaryMarkdown, this.summaryImageFolder, this.repoTreeFolder)
        // *todo* isn't this alternate call actually correct at this point?? -- fix
        // return this.htmlSanitize(
        //   store.getters.summaryMarkdown)
      },
      repos: function () {
        // console.log ('init:this.$static: ' + this.$static)
        // console.log ('repos:designRepos[theDesign].name: ' + store.getters.designRepos[this.theDesign].name)
        // console.log ('repos:designRepos: ' + JSON.stringify(store.getters.designRepos))
        return typeof this.$static !== 'undefined'
          ? this.$static.gitapi.organization.repositories.nodes
          : store.getters.designRepos
      },
      summaryTxt: function () {
        // const sanitary = this.htmlSanitize(this.repoName + '/' + this.summaryText)
        // const sanitary = this.htmlSanitize(this.designRepo.docs.folders[0].contents.files[0].object.text)
        // return this.cleanFormatMarkdown(sanitary, this.repoBlobsFolder)
      },
      docsTexts () {
        let texts = new Array()
        // this.designRepo.docs.folders[0].contents.files.forEach(file => {
        this.designRepo.docs.entries[0].object.entries.forEach(file => {
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
          '/'  + this.repoBranch + '/docs/'
      },
      summaryImageFolder: function () {
        // console.log('summaryImageFolder: repoBranch: ' + this.repoBranch)
        return 'https://raw.githubusercontent.com/CombatCovid/' +
          this.repoName +
          '/'  + this.repoBranch + '/'
      },
      repoTreeFolder: function () {
        return 'https://github.com/CombatCovid/' +
          this.repoName +
          '/tree/'  + this.repoBranch + '/'
      },
      imagePath: function () {
        return this.imageFolder + 'img/'
      },
      summaryImg: function () {
        return 'https://raw.githubusercontent.com/CombatCovid/' +
          this.htmlSanitize(this.repoName) +
          '/'  + this.repoBranch + '/summary.jpg'
      },
      imagesImgs () {

        // *todo* push this back into texts, if order of need allows? this is cheap and safe...

        let images = new Array()
        let repoImages = null
        this.designRepo.docs.entries.forEach(file => {
          if (file.lang === 'img') {
            repoImages = file.object.entries
          }
        })

        if (repoImages) {
          repoImages.forEach(entry => {
            if (entry.name.search(/jpg|png|jpeg|gif/i) > 0) {
              images.push(this.imagePath + this.htmlSanitize(entry.name))
            }
          })
        } else {
          this.nrImages = 0
          return null
        }

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

// this was a temporary solution, as Gridsome supports just id and path
// as query variables at this time. Probably the answer is axios in the
// component build -- next to try, but need this out today. As long as
// this is the way, then, it's a two-points-of truth solution.
// To change the branch the app views,
// - alter the tail of this query script name to either develop or master
// - set the environmental GRIDSOME_REPO_BRANCH to match.

//  *todo* but now this is legacy, as we have active wire and Vuex to remember
<static-query>
</static-query>

<style>

  /*
    here are the filter-translated equivalents for the converted Markdown:
    h1 -> .h1-unscoped, etc.. These have to be in <style> non-scoped,
    as Markdown conversions can't be scoped. Translation by unscopeBasisMarkup()
    gets us these tags.

    Don't be fooled if your IDE suggests they aren't being used.
    They are, and I can assure they are essentiaal, unscoped as here.
    cns/narration-sd 11Apr2020
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

  .md-image-fit { /* must be unscoped, as these apply to unscoped rendered Markdown */
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

  .images-slide {
    /* these along with box-fix is absolutely essential: centering and
      fixing the aspect ratio, and at all media sizes, is half the key */
    width: 72%;
    /*max-height: 600px;*/
    margin: 0 auto;
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

  .doc-title {
    padding: 0 20px 20px 20px;
  }

  .design-image {
    width: 100%;
  }
  @media only screen and (min-width: 1601px) {
    .container {
      max-width: 1600px;
    }
  }

  .design-image-hold {
    margin: 3% auto;
    max-height: 60vw; /* *todo* careful - improves, but mind aspect ratio again - improve where/how later */
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

  .fix-box {
    /* this is absolutely crucial, and a bigger half of solving
       the out-of control image problem, with images-slide */
    box-sizing: content-box;
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

  @media only screen and (max-width: 420px) {
    .hide-small {
      display: none;
    }
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
