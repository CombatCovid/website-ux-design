<template>
  <div class="container xl:w-4/5 xs:w-full">
    <div v-if="!announcementNeeded">
      <div v-if="theDesign">
        <h1 class="normal-h-size horiz-center">This design is: {{ summaryTitle }}</h1>
        <div
          v-if="imagesShow"
          class="images-slide image-display-mask design-image-hold docs-show-pane"
        >
          <div class="flex justify-center buttons">
            <button class="btn" @click="slideImages('<')"><</button>
            <!-- <v-tooltip bottom> -->
              <template>
                <button
                  class="btn"
                  v-on="on"
                  @click="popImages"
                >Design Images ({{ nrImages }})</button>
              </template>
              <!-- <span>Click to return to the summary.</span> -->
            <!-- </v-tooltip> -->
            <button class="btn" @click="slideImages('>')">></button>
          </div>
          <VueGlide :perView="1" :gap="30" :rewind="false" type="carousel" ref="imagesSlider">
            <VueGlideSlide class="xslide-image" v-for="(imagesImg, i) in imagesImgs" :key="i">
              <div class="horiz-center">
                <img :src="imagesImg" alt="imagesImg" width="100%" />
                <!-- that width 100% is critical -->
              </div>
            </VueGlideSlide>
          </VueGlide>
        </div>
        <div v-else class="design-image-hold">
          <div class="image-display-mask">
            <div class="horiz-center doc-title fix-box temp-shift-small-screen" @click="popImages">
              <!-- <v-tooltip bottom> -->
                <template>
                  <button class="btn" v-on="on">
                    See all images
                    <!-- <span class="hide-small">&nbsp;for&nbsp;all</span> -->
                  </button>
                </template>
                <!-- <span>Click to see view all the design images. Click again to return to the summary.</span> -->
              <!-- </v-tooltip> -->
            </div>
            <div class="images-slide">
              <img :src="summaryImg" alt="summaryImg" class="design-image" />
            </div>
          </div>
        </div>
        <hr color="#e3ebef" size="2px" class="rule-appearance" />
        <div v-if="docsShow" class="docs-show-pane">
          <div class="flex justify-center buttons doc-title">
            <button class="btn" @click="slideDocs('<')"><</button>
            <!-- <v-tooltip bottom> -->
              <template>
                <button class="btn" v-on="on" @click="popDocs">Design Documents ({{ nrTexts }})</button>
              </template>
              <!-- <span>Click to return to the summary.</span> -->
            <!-- </v-tooltip> -->
            <button class="btn" @click="slideDocs('>')">></button>
          </div>
          <div class="docs-slides-pane">
            <VueGlide :perView="1" :gap="10" :rewind="false" type="slider" ref="docsSlider">
              <VueGlideSlide v-for="(docText, i) in docsTexts" :key="i">
                <div class="markdown" >
                  <VueMarkdown class=""
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
            <!-- <v-tooltip bottom> -->
              <template>
                <button class="btn" @click="popDocs" v-on="on">
                  See full documentation
                </button>
              </template>
              <!-- <span>Click to see view all the design documentse. Click again to return to the summary.</span> -->
            <!-- </v-tooltip> -->
          </div>
          <div class="markdown">
            <h1 class="text-3xl">Design Summary</h1>
            <VueMarkdown :source="summaryText" :postrender="unscopeBasisMarkup" />
          </div>
        </div>
      </div>
    </div>
    <div v-else class="announcement-look">
      <div class="announcement-frame">
        <h2>Greetings...</h2>
        <div class="announcement-message">
          <p>{{ announceMessage1 }}</p>
          <p>{{ announceMessage2 }}</p>
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
      announcementNeeded: false,
      announceMessage1: "announce1",
      announceMessage2: "announce2",
      theDesign: this.design, // this because we may mutate from the prop...
      nrTexts: 1,
      nrImages: 1,
      imagesShow: false,
      docsShow: false,
      repoBranch: store.getters.repoBranch // essential so we choose it
    };
  },
  mounted() {
    if (!this.theDesign || this.theDesign.length <= 0) {
      this.theDesign = store.getters.lastRepoName; // so use it if had any
      if (!this.theDesign) {
        // still, then we'll need a Find first
        this.announcementNeeded = true;
        this.announceMessage1 =
          "It looks like it's the first time you've used this app on your browser, or after you've cleared its cache, so we don't yet know what you'd like the Viewer to show.";
        this.announceMessage2 =
          "Just use the Finder now, to choose your first Design. We'll show it -- and afterwards, we'll remember it, and any other Design which was the last one you viewed.";
      } else {
        this.announcementNeeded = false;
        store.dispatch("loadDesign", this.theDesign); // a good beginning, recovered via persistenc4e
      }
    } else {
      this.announcementNeeded = false;
      store.commit("setLastRepoName", this.theDesign);
      store.dispatch("loadDesign", this.theDesign); // a good beginning
      // console.log({ store });
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
          repo => repo.repository.name === this.theDesign
        );
        // console.log('DesignDetail:filtered: ' + JSON.stringify(filtered) )
        dRepo = filtered.length > 0 ? filtered[0].repository : null;
      }
      if (dRepo) {
        // console.log('DesignDetail:designRepo: ' + JSON.stringify(dRepo) )
        // console.log('DesignDetail:designRepo:: name ' + dRepo.name)
      }

      return dRepo;
    },
    repoName: function() {
      return this.designRepo ? this.designRepo.name : ""; // 'until' // n.b. need something here on recovery from empty Viewer, as events try before ready next time
      // *todo* asap: should be a variable we can use for actual flag, to avoid all ghosts like this
    },
    summaryTitle: function() {
      if (this.repoName && this.repoName !== "") {
        // fix why this even gets called soon...
        let sani = this.htmlSanitize(this.repoName);

        sani = sani.replace(/-+/gi, " "); // TODO: I think this is not necessary since the _this.spaceDashes() method trims all the dashes including underscores better.
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
      const summary = this.cleanFormatMarkdown(
        store.getters.summaryMarkdown,
        this.summaryImageFolder,
        this.repoTreeFolder
      );
      // console.log(store.getters.summaryMarkdown);
      return summary;
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
      // this.designRepo.docs.folders[0].contents.files.forEach(file => {
      this.designRepo.docs.entries[0].object.entries.forEach(file => {
        // console.log('file: ' + JSON.stringify(file))
        if (file.name.search(/\.md/) > 0) {
          texts.push(
            this.cleanFormatMarkdown(
              this.htmlSanitize(file.object.text),
              this.imageFolder,
              this.repoTreeFolder
            )
          );
        }
      });

      // console.log("texts: " + JSON.stringify(texts));
      this.nrTexts = texts.length;
      return texts;
    },
    imageFolder: function() {
      const imageF =
        "https://raw.githubusercontent.com/CombatCovid/" +
        this.repoName +
        "/" +
        this.repoBranch +
        "/docs/";
      return imageF;
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
      const repoTreeF =
        "https://github.com/CombatCovid/" +
        this.repoName +
        "/tree/" +
        this.repoBranch +
        "/";

      return repoTreeF;
    },
    imagePath: function() {
      return this.imageFolder + "img/";
    },
    summaryImg: function() {
      if (!this.designRepo) {
        return null; // we're not ready yet, in the event scheme of things
      }

      let imgUrl;
      const summaryImage = this.designRepo.summaryImg;
      const nameWithOwner = this.designRepo.nameWithOwner;
      const summaryJpg = "/summary.jpg";

      if (this.designRepo.isPrivate) {
        imgUrl = "/resources/image/private-placeholder.png";
      } else if (summaryImage && summaryImage !== null) {
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
      this.designRepo.docs.entries.forEach(file => {
        if (file.lang === "img") {
          repoImages = file.object.entries;
        }
      });

      if (repoImages) {
        repoImages.forEach(entry => {
          if (entry.name.search(/jpg|png|jpeg|gif/i) > 0) {
            images.push(this.imagePath + this.htmlSanitize(entry.name));
          }
        });
      } else {
        this.nrImages = 0;
        return null;
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


.design-image-hold {
  margin: 3% auto;
  max-height: 66vw; /* *todo* careful - improves, but mind aspect ratio again - improve where/how later */
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
