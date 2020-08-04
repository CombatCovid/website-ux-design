<template>
  <div class="">
    <div v-if="!repoError">
      <div v-if="!loading">
        <h1 class="normal-h-size horiz-center pb-2"><span class="font-bold"></span> <span class="font-regular">{{ summaryTitle }}</span></h1>
        <div v-if="imagesShow">
          <div class="flex justify-center">
                <button
                  class="btn"
                  @click="popImages"
                >Go back to image summary</button>
              </div>
          <Vue-glide :perView="1" :gap="10" :rewind="false" type="slider">
            <vue-glide-slide class="pt-2" v-for="(imagesImg, i) in imagesImgs" :key="i">
              <img class="w-full md:w-2/3 lg:w-1/2 mx-auto" :src="imagesImg" alt="imagesImg" />
            </vue-glide-slide>
            <template class="flex justify-between" slot="control">
              <button class="slide-image__button" data-glide-dir="<"><</button>
              <button class="slide-image__button" data-glide-dir=">">></button>
            </template>
          </vue-glide>
        </div>
        <div v-else class="">
          <div class="">
            <div class="horiz-center fix-box temp-shift-small-screen" @click="popImages">
              <template class="mx-auto">
                <button class="btn">See all images</button>
              </template>
            </div>
            <div class="py-2">
              <img :src="summaryImg" alt="summaryImg" class="w-full md:w-2/3 lg:w-1/2 mx-auto" />
            </div>
          </div>
        </div>

        <hr color="#e3ebef" size="2px" class="rule-appearance" />
        <div v-if="docsShow" class="docs-show-pane">
          <div class="flex justify-center buttons doc-title">
            <button class="btn" @click="slideDocs('<')"><</button>
            <template>
              <button class="btn" @click="popDocs">Design Documents ({{ nrTexts }})</button>
            </template>
            <button class="btn" @click="slideDocs('>')">></button>
          </div>
          <div class="docs-slides-pane">
            <VueGlide :perView="1" :gap="10" :rewind="false" type="slider" ref="docsSlider">
              <VueGlideSlide v-for="(docText, i) in docsTexts" :key="i">
                <template class="hidden flex justify-between" slot="control">
                <button class="content-button" data-glide-dir="<"><</button>
                <button class="content-button" data-glide-dir=">">></button>
              </template>
                <div class="markdown container md:w-4/5 xl:w-1/2 xs:w-full">
                  <VueMarkdown
                    class=""
                    :source="unscopeBasisMarkup(docText)"
                    :postrender="unscopeBasisMarkup"
                  />
                </div>
              </VueGlideSlide>

            </VueGlide>
          </div>
        </div>
        <div v-else>
          <div class="flex justify-center">
            <template>
              <button class="btn" @click="popDocs">See full documentation</button>
            </template>
          </div>
          <div class="markdown container md:w-4/5 xl:w-1/2 xs:w-full">
            <h1 class="text-3xl">Design Summary</h1>
            <VueMarkdown :source="summaryText" :postrender="unscopeBasisMarkup" />
          </div>
        </div>
      </div>
      <div v-else  class="announcement-look">
        <div class="announcement-frame">
          <h2>Loading...</h2>
        </div>
      </div>
    </div>
    <div v-else class="announcement-look">
      <div class="announcement-frame">
        <h2>Greetings...</h2>
        <div class="announcement-message">
          <p>{{ announceMessage1 }}</p>
          <br> <!-- *todo* not design formatted yet because TailWind -->
          <p>{{ repoError }}</p>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import VueMarkdown from "vue-markdown";
import { Glide, GlideSlide } from "vue-glide-js";
import "vue-glide-js/dist/vue-glide.css";
import store from "~/store";

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
  data: function() {
    return {
      announceMessage1: "",
      theDesign: this.design, // this because we may mutate from the prop...
      nrTexts: 1,
      nrImages: 1,
      imagesShow: false,
      docsShow: false,
      repoBranch: store.getters.lastRepoBranch // essential so we choose it
    };
  },
  mounted() {
    // always begin with the Loading... screen showing
    store.dispatch('setRepoRequestReady', false)

    // then we prepare, or announce a Finder choice if needed, covering the bases
    if (!this.theDesign || this.theDesign.length <= 0) {
      this.theDesign = store.getters.lastRepoName // so use it if had any
      if (!this.theDesign) {
        // still, then we'll need a Find first
        this.announceMessage1 =
          "It looks like it's the first time you've used this app on your " +
          "browser, or after you've cleared its cache, so we don't yet know " +
          "what you'd like the Viewer to show."
        store.dispatch('setRepoRequestError',
          "Just use the Finder now, to choose your first Design. " +
          "We'll show it -- and afterwards, we'll remember it, and " +
          "any other Design which was the last one you viewed.")
      } else {
        store.dispatch('setRepoRequestError', null)
        store.dispatch("loadDesign", this.theDesign, store.getters.lastRepoBranch) // a good beginning, recovered via persistenc4e
      }
    } else {
      store.dispatch('setRepoRequestError', null)
      store.dispatch("loadDesign", this.theDesign) // a good beginning
    }
  },
  computed: {
    // _Always_ sanitize anything that might contain html...soon in Vuex, we anticipate
    designRepo: function() {
      // this is used when Viewer is called directly
      // *todo* we'll do something with validity via Vuex persistence to do better here
      // *todo* at this moment first valid is fifth - metadata will rescue
      let dRepo = null; // this.repos[4]

      if (this.repos && this.repos.length > 0 && this.theDesign) {
        const filtered = this.repos.filter(
          repo => repo.name === this.theDesign
        );
        // console.log('DesignDetail:filtered: ' + JSON.stringify(filtered) )
        dRepo = filtered.length > 0 ? filtered[0] : null;
      }
      if (!dRepo) {
        this.announceMessage1 = "Unable to retrieve the Design at this time..."
      }

      return dRepo;
    },
    loading: function() {
      return !store.getters.repoRequestReady;
    },
    repoError: function() {
      return store.getters.repoRequestError;
    },
    repoName: function() {
      return this.designRepo ? this.designRepo.name : ""; // 'until' // n.b. need something here on recovery from empty Viewer, as events try before ready next time
      // *todo* asap: should be a variable we can use for actual flag, to avoid all ghosts like this
    },
    summaryTitle: function() {
      if (this.repoName && this.repoName !== "") {
        // fix why this even gets called soon...
        let sani = this.htmlSanitize(this.repoName);

        sani = sani.replace(/-+/gi, " ");
        sani = this.titleCase(this.spaceDashes(sani));

        if (sani.match(/mit/i)) {
          // *todo* def special casing for demos until we get Vuex on line to pass real title
          return sani.replace(/mit/i, "MIT");
        } else {
          return sani;
        }
      } else {
        return "";
      }
    },
    summaryText: function() {
      // console.log ('summaryMarkdown: ' + store.getters.summaryMarkdown)
      return this.cleanFormatMarkdown(
        store.getters.summaryMarkdown,
        this.summaryImageFolder,
        this.repoTreeFolder
      );
      // *todo* isn't this alternate call actually correct at this point?? -- fix
      // return this.htmlSanitize(
      //   store.getters.summaryMarkdown)
    },
    repos: function() {
      // console.log ('init:this.$static: ' + this.$static)
      // console.log ('repos:designRepos[theDesign].name: ' + store.getters.designRepos[this.theDesign].name)
      // console.log ('repos:designRepos: ' + JSON.stringify(store.getters.designRepos))
      return typeof this.$static !== "undefined"
        ? this.$static.gitapi.organization.repositories.nodes
        : store.getters.designRepos;
    },
    summaryTxt: function() {
      // const sanitary = this.htmlSanitize(this.repoName + '/' + this.summaryText)
      // const sanitary = this.htmlSanitize(this.designRepo.docs.folders[0].contents.files[0].object.text)
      // return this.cleanFormatMarkdown(sanitary, this.repoBlobsFolder)
    },
    docsTexts() {
      let texts = new Array();
      if (this.designRepo.docs && this.designRepo.docs.langs) {
        // *todo* not '0' here - need to get actual lang in when we do langs....
        // *todo* this old code should be called with the repo also
        this.designRepo.docs.langs[0].content.items.forEach(file => {
          // console.log('file: ' + JSON.stringify(file))
          if (file.name.search(/\.md/) > 0) {
            texts.push(
              this.cleanFormatMarkdown(
                this.htmlSanitize(file.item.text),
                this.imageFolder,
                this.repoTreeFolder
              )
            );
          }
        });
        this.nrTexts = texts.length;
      } else {
        texts.push(
          '<h2 style="text-align: center;">No Design Documents in this repo yet!</h2><br>'
        );
        this.nrTexts = 0; // no real ones...
      }

      return texts;
    },
    imageFolder: function() {
      return (
        "https://raw.githubusercontent.com/CombatCovid/" +
        this.repoName +
        "/" +
        this.repoBranch +
        "/docs/"
      );
    },
    summaryImageFolder: function() {
      // console.log('summaryImageFolder: repoBranch: ' + this.repoBranch)
      return (
        "https://raw.githubusercontent.com/CombatCovid/" +
        this.repoName +
        "/" +
        this.repoBranch +
        "/"
      );
    },
    repoTreeFolder: function() {
      return (
        "https://github.com/CombatCovid/" +
        this.repoName +
        "/tree/" +
        this.repoBranch +
        "/"
      );
    },
    imagePath: function() {
      return this.imageFolder + "img/";
    },
    summaryImg: function() {
      if (!this.designRepo) {
        return null; // we're not ready yet, in the event scheme of things
      }

      let imgUrl;
      let summaryImage = this.designRepo.summaryImg;

      summaryImage =
        summaryImage && typeof summaryImage === "object"
          ? summaryImage.present
          : summaryImage;

      const nameWithOwner = this.designRepo.nameWithOwner;
      const summaryJpg = "/summary.jpg";

      if (this.designRepo.isPrivate) {
        imgUrl = "/resources/image/private-placeholder.png";
      } else if (summaryImage && summaryImage === "Blob") {
        // the condition here is tricky. In our ability to get anything out of GitHub GraphQL API
        // the only thing properly returned is an object point to "Blob", but if it's missing,
        // the whole object is replaced with null, which is unacceptable to a database expecting
        // a structured object type. So we translate null to a fake object, having a string "null".
        // this will not be equal to "Blob" on retrieval, so our condition properly fails.
        // When it's "Blob", we know where to get it, which GitHub API decidedly does not.
        imgUrl = `https://raw.githubusercontent.com/${nameWithOwner}/${this.repoBranch}${summaryJpg}`;
      } else {
        imgUrl = "/resources/image/no-summary-img-placeholder.png";
      }

      return imgUrl;
    },
    imagesImgs() {
      // *todo* push this back into texts, if order of need allows? this is cheap and safe...

      let images = new Array();
      let repoImages = null;

      if (this.designRepo.docs && this.designRepo.docs.langs) {
        // sometimes they don't even have this - Sterilo...
        this.designRepo.docs.langs.forEach(folder => {
          if (folder.lang === "img") {
            repoImages = folder.content.items;
          }
        });
      }

      if (repoImages) {
        repoImages.forEach(file => {
          if (file.name.search(/jpg|png|jpeg|gif/i) > 0) {
            images.push(this.imagePath + this.htmlSanitize(file.name));
          }
        });

        // one of two ways to be empty - no folder, or no images...see just below
        if (images.length <= 0) {
          this.nrImages = 0;
          return ["/resources/image/no-design-imgs-placeholder.png"];
        }
      } else {
        this.nrImages = 0;
        return ["/resources/image/no-design-imgs-placeholder.png"];
      }

      this.nrImages = images.length;
      return images;
    }
  },
  methods: {
    popImages: function() {
      this.imagesShow = !this.imagesShow;
    },
    slideImages: function(direction) {
      this.$refs.imagesSlider.go(direction);
    },
    popDocs: function() {
      this.docsShow = !this.docsShow;
    },
    slideDocs: function(direction) {
      this.$refs.docsSlider.go(direction);
    }
  }
};
</script>

<style lang="scss"  >
@import "../sass/button.scss";
/*
    here are the filter-translated equivalents for the converted Markdown:
    h1 -> .h1-unscoped, etc.. These have to be in <style> non-scoped,
    as Markdown conversions can't be scoped. Translation by unscopeBasisMarkup()
    gets us these tags.

    Don't be fooled if your IDE suggests they aren't being used.
    They are, and I can assure they are essentiaal, unscoped as here.
    cns/narration-sd 11Apr2020
}  */
@import "../sass/markdown.scss";
@import "../sass/glide.scss";

.slider-title {
  margin-top: 20px;
}

.image-display-mask {
  overflow: hidden !important;
}

.images-slide {
  /* these along with box-fix is absolutely essential: centering and
      fixing the aspect ratio, and at all media sizes, is half the key */
  @apply w-full;
  /*max-height: 600px;*/
  margin: 0 auto;
}

// .slide-image {
//   width: 600px;
//   max-height: 600px;
// }

.docs-show-pane {
  margin-top: 2rem;
  /*background-color: teal;*/
  /* *todo* later work out: background-color: #348F50 !important;*/
}

.docs-slide {
  width: 80%;
  margin: 0 10%;
}

@screen md {
  .images-slide {
    @apply w-3/5;
  }
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


.design-image-hold {
  margin: 3% auto;

  // max-height: 66vw; /* *todo* careful - improves, but mind aspect ratio again - improve where/how later */
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

.docs-slides-pane {
  /* see below */
  /*background-color: #56B4D3;*/
  padding: 0 10px;
}

@media only screen and (max-width: 420px) {
  .hide-small {
    display: none;
  }
}

.announcement-look {
  background: linear-gradient(to right, rgb(86, 180, 211), rgb(52, 143, 80));
  color: lightgoldenrodyellow;
  padding: 40px;
  margin: -20px;
  min-height: 80vh;
}

.announcement-frame {
  width: 90%;
  max-width: 700px;
  margin: 40px auto;
}

.announcement-message {
  margin: 40px;
}

@media only screen and (max-width: 640px) {
  .announcement-look {
    padding: 20px;
    margin: -20px;
    min-height: 80vh;
  }

  .announcement-message {
    margin: 20px;
  }
}
</style>
