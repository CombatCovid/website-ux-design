<template>
  <Layout>
    <main class="w-screen bg-primary-100 bg-image">
      <div class="container py-24 max-w-5xl mx-auto md:flex">
        <div class="flex-3">
          <h1 class="text-white font-semibold text-5xl" style="text-transform: uppercase;">
            Combat covid
            <br />
            <span class="text-primary-25 font-bold">with hardware</span>
          </h1>
          <hr class="w-full my-4 rounded-full h-2 bg-primary-25 border-none" />

          <p class="text-xl md:text-2xl text-white">
            Search for well documented
            <b>designs</b> 🔍
            <br />and
            <b>document</b> new solutions
          </p>

          <div class="flex mt-6">
            <g-link to="/finder">
              <button
                class="py-2 px-6 bg-accent-75 rounded-lg hover:shadow-xl hover:bg-accent-100 font-bold text-white"
              >Search for designs</button>
            </g-link>

            <g-link to="/documentation#prepare">
              <button
                class="py-2 px-6 border-2 border-white border-solid ml-6 rounded-lg hover:shadow-xl font-bold text-white"
              >Upload designs</button>
            </g-link>
          </div>
        </div>

        <div class="flex-1 flex justify-center items-center relative">
          <div class="circle-transparent"></div>
          <button class="solid" v-on:click="isOpen = !isOpen">
            <Play />
          </button>
        </div>
      </div>
    </main>

    <section class="container max-w-5xl py-20">
      <h2 class="text-center text-2xl md:text-3xl font-bold text-primary-75">HOW THE APP WORKS</h2>
      <hr class="mx-auto w-32 rounded-full mt-2 h-2 bg-primary-75" />

      <div class="grid md:grid-cols-2 gap-12 mt-16">
        <div class="card grid grid-cols-6">
          <div class="col-span-5">
            <h2 class="text-gray-100 font-bold text-3xl">Instant search</h2>
            <p class="text-gray-75 text-xl">Go to FINDER and search for keywords like mask</p>
          </div>
          <div>
            <InstantSearch />
          </div>
        </div>
        <div class="card grid grid-cols-6">
          <div class="col-span-5">
            <h2 class="text-gray-100 font-bold text-3xl">Download designs</h2>
            <p class="text-gray-75 text-xl">
              Download instantly the design you’ve chosen based on its features
              and your needs
            </p>
          </div>
          <div>
            <Download />
          </div>
        </div>
        <div class="card grid grid-cols-6">
          <div class="col-span-5">
            <h2 class="text-gray-100 font-bold text-3xl">Complete Documentation</h2>
            <p class="text-gray-75 text-xl">Find guides, bill of materials, and images of designs</p>
          </div>
          <div>
            <Document />
          </div>
        </div>
        <div class="card grid grid-cols-6">
          <div class="col-span-5">
            <h2 class="text-gray-100 font-bold text-3xl">Github based content delivery</h2>
            <p class="text-gray-75 text-xl">We use github powerful apis to build documents</p>
          </div>
          <div>
            <Github />
          </div>
        </div>
        <div class="card grid grid-cols-6">
          <div class="col-span-5">
            <h2 class="text-gray-100 font-bold text-3xl">Markdown based template</h2>
            <p class="text-gray-75 text-xl">
              User markup interoperable format to facilitate export to different
              formats including epubs, and pdfs
            </p>
          </div>
          <div>
            <Markdown />
          </div>
        </div>
        <div class="card grid grid-cols-6">
          <div class="col-span-5">
            <h2 class="text-gray-100 font-bold text-3xl">Learn how to document open hardware</h2>
            <p class="text-gray-75 text-xl">
              User markup interoperable format to facilitate export to different
              formats including epubs, and pdfs
            </p>
          </div>
          <div>
            <Learn />
          </div>
        </div>
      </div>
    </section>

    <div class="bg-gray-15">
      <section class="container max-w-5xl py-20">
        <h2
          class="text-center text-2xl md:text-3xl font-bold text-primary-75"
        >HOW TO DOCUMENT A SOLUTION</h2>
        <hr class="mx-auto w-32 rounded-full mt-2 h-2 bg-primary-75" />

        <div class="grid md:grid-cols-2 gap-12 mt-16">
          <div class="card grid bg-white-100 grid-cols-6">
            <div class="col-span-5">
              <h2 class="text-gray-100 font-bold text-3xl">Find validated solutions</h2>
              <p
                class="text-gray-75 text-xl"
              >Make sure we are uploading a solution that is effective</p>
            </div>
            <div>
              <Search />
            </div>
          </div>
          <div class="card grid bg-white-100 grid-cols-6">
            <div class="col-span-5">
              <h2 class="text-gray-100 font-bold text-3xl">Community guidance</h2>
              <p class="text-gray-75 text-xl">We have a team of contributors that can help you</p>
            </div>
            <div>
              <People />
            </div>
          </div>
          <div class="card grid bg-white-100 grid-cols-6">
            <div class="col-span-5">
              <h2 class="text-gray-100 font-bold text-3xl">Standard</h2>
              <p class="text-gray-75 text-xl">Follow conventions for simple documentation</p>
            </div>
            <div>
              <Lock />
            </div>
          </div>
        </div>
      </section>
    </div>

    <section class="container max-w-5xl py-20">
      <h2
        class="text-center text-2xl md:text-3xl font-bold text-accent-75"
      >CONTRIBUTE TO CODE AND MORE</h2>
      <hr class="mx-auto w-32 rounded-full mt-2 h-2 bg-accent-75" />

      <div class="grid md:grid-cols-2 gap-12 mt-16">
        <div class="card bg-primary-100">
          <h2 class="text-white font-bold text-3xl">Find validated solutions</h2>
          <p class="text-white text-xl">Make sure we are uploading a solution that is effective</p>
        </div>
        <div class="card bg-primary-100">
          <h2 class="text-white font-bold text-3xl">Community guidance</h2>
          <p class="text-white text-xl">We have a team of contributors that can help you</p>
        </div>
        <div class="card bg-primary-100">
          <h2 class="text-white font-bold text-3xl">Standard</h2>
          <p class="text-white text-xl">Follow conventions for simple documentation</p>
        </div>
      </div>
    </section>

    <section class="relative py-20 bg-image w-full bg-primary-100">
      <!-- <div
        class="background-color absolute top-0 opacity-50 w-full h-full bg-primary-100 z-0"
      ></div>-->
      <div class="container max-w-5xl text-center z-20">
        <h2 class="text-2xl text-white font-bold">NOTE</h2>
        <p class="mt-6 text-white text-xl">
          You're meeting the demonstration app of the Combat Covid with Hardware
          project. This is a fast-moving Alpha production, so be reassured if
          you find that items may move, appear, disappear, and at moments
          perhaps not function entirely as you expected. We're moving rapidly
          and constantly to add what's needed for early real use, and anything
          unexpected will soon be repaired. Thank you for your patience, and
          especially for your interest.
        </p>
      </div>
    </section>

    <div
      class="fixed w-screen h-screen top-0 left-0 flex justify-center items-center transparent-bg"
      v-if="isOpen"
    >
      <div class="absolute top-0 right-0 mr-10 mt-10 rounded-full flex justify-center items-center">
        <button class="close text-white" v-on:click="isOpen = !isOpen">&times;</button>
      </div>
      <iframe
        class="iframe"
        src="https://www.youtube.com/embed/lIPwHRS_imY"
        frameborder="0"
        allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
        allowfullscreen
      ></iframe>
    </div>
  </Layout>
</template>

<script>
import Virus from "~/assets/Virus.svg";
import Play from "~/assets/Play.svg";
import InstantSearch from "~/assets/InstantSearch.svg";
import Download from "~/assets/Download.svg";
import Github from "~/assets/Github.svg";
import Learn from "~/assets/Learn.svg";
import Search from "~/assets/Search.svg";
import Lock from "~/assets/Lock.svg";
import Document from "~/assets/Document.svg";
import Markdown from "~/assets/Markdown.svg";
import People from "~/assets/People.svg";

export default {
  metaInfo: {
    title: "Home"
  },
  components: {
    Virus,
    Play,
    InstantSearch,
    Download,
    Github,
    Learn,
    Search,
    Lock,
    Document,
    Markdown,
    People
  },
  data() {
    return {
      isOpen: false
      // icons: [
      //   'fab fa-facebook',
      //   'fab fa-twitter',
      //   'fab fa-google-plus',
      //   'fab fa-linkedin',
      //   'fab fa-instagram',
      // ],
    };
  }
};
</script>

<style scoped lang="scss">
.circle-transparent {
  width: 150px;
  height: 150px;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  opacity: 0.3;
  animation: spread 1s infinite alternate ease;
  @apply bg-accent-75 rounded-full absolute;
}
.solid {
  opacity: 1 !important;
  width: 100px;
  height: 100px;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  @apply absolute flex justify-center items-center rounded-full bg-accent-75 cursor-pointer;
}

.card {
  min-height: 172px;
  @apply shadow-lg bg-white-100 p-6 rounded-2xl;
}

.iframe {
  min-width: 600px;
  min-height: 370px;
}

.transparent-bg {
  background: rgba(4, 110, 171, 0.829);
}

.close {
  font-size: 4rem;
  margin: auto auto;
}

@keyframes spread {
  from {
    width: 120px;
    height: 120px;
    @apply opacity-75;
  }
  to {
    width: 150px;
    height: 150px;
  }
}

@media screen and (max-width: 600px) {
  .iframe {
    min-width: 360px;
    min-height: 220px;
  }
}
</style>
