<template>
  <Layout>
    <main class="w-screen bg-primary-100">
      <!-- <div class="h-full w-full relative top-0 left-0">
        <div class="absolute svg">
          <Virus />
        </div>
      </div> -->

      <div class="container py-24 max-w-5xl mx-auto md:flex">
        <div class="flex-3">
          <h1
            class="text-white font-semibold text-5xl"
            style="text-transform: uppercase;"
          >
            Combat covid
            <br />
            <span class="text-primary-50 font-bold">with hardware</span>
          </h1>
          <hr class="w-full my-4 rounded-full h-2 bg-primary-50 border-none" />

          <p class="text-xl md:text-2xl text-white">
            Search for well documented <b>designs</b> 🔍 <br />
            and <b>document</b> new solutions
          </p>

          <div class="flex mt-6">
            <g-link to="/finder">
              <button
                class="py-2 px-6 bg-accent-75 rounded-lg hover:shadow-xl hover:bg-accent-100 font-bold text-white"
              >
                Search for designs
              </button>
            </g-link>

            <g-link to="/documentation#prepare">
              <button
                class="py-2 px-6 border-2 border-white border-solid ml-6 rounded-lg hover:shadow-xl font-bold text-white"
              >
                Upload designs
              </button>
            </g-link>
          </div>
        </div>

        <div class="flex-1 flex justify-center items-center relative">
          <div class="circle-transparent"></div>
          <div class="solid">
            <Play />
          </div>
        </div>
      </div>
    </main>

    <section class="container max-w-5xl mt-20">
      <h2 class="text-center text-2xl md:text-3xl font-bold text-primary-100">
        HOW THE APP WORKS
      </h2>
      <hr class="mx-auto w-32 rounded-full mt-2 h-2 bg-primary-100" />

      <div class="md:grid grid-cols-2 gap-12 mt-16">
        <div class="card grid grid-cols-6">
          <div class="col-span-5">
            <h2 class="text-gray-100 font-bold text-3xl">Instant search</h2>
            <p class="text-gray-75 text-xl">
              Go to FINDER and search for keywords like mask
            </p>
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
            <h2 class="text-gray-100 font-bold text-3xl">
              Complete Documentation
            </h2>
            <p class="text-gray-75 text-xl">
              Find guides, bill of materials, and images of designs
            </p>
          </div>
          <div>
            <Document />
          </div>
        </div>
        <div class="card grid grid-cols-6">
          <div class="col-span-5">
            <h2 class="text-gray-100 font-bold text-3xl">
              Github based content delivery
            </h2>
            <p class="text-gray-75 text-xl">
              We use github powerful apis to build documents
            </p>
          </div>
          <div>
            <Github />
          </div>
        </div>
        <div class="card grid grid-cols-6">
          <div class="col-span-5">
            <h2 class="text-gray-100 font-bold text-3xl">
              Markdown based template
            </h2>
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
            <h2 class="text-gray-100 font-bold text-3xl">
              Learn how to document open hardware
            </h2>
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

    <div class="parallax">
      <v-layout py-12 row wrap justify-center>
        <v-flex class="ma-2" xs12 sm12 md4 lg4>
          <div class="header--text hero-statements">
            <h1 class="horiz-center font-weight-bold">
              Combat covid&nbsp;with hardware
            </h1>
            <h2 class="horiz-center font-weight-light">
              Search for well documented&nbsp;
              <span class="title-emphasis">designs</span>&nbsp;🔍 <br />and
              <span class="title-emphasis">document</span> new solutions
            </h2>
          </div>
          <v-layout xs12 md4 row wrap class="pt-2 ma-3" justify-center>
            <v-btn to="/finder" class="ma-1 centered" dark color="blue"
              >Search for designs</v-btn
            >
            <v-btn
              to="/documentation#prepare"
              class="ma-1 centered"
              dark
              color="orange"
              >Upload designs</v-btn
            >
          </v-layout>
          <v-layout xs12 md4 row wrap class="pt-2 close-up-top" justify-center>
            <v-btn
              to="/documentation#cautionary"
              class="ma-1 centered"
              dark
              color="teal"
              >Consider for designs...</v-btn
            >
          </v-layout>
        </v-flex>
        <v-flex py-5 xs12 sm12 md4 style="margin:1.5em;">
          <div class="iframe--shadow">
            <div class="iframe-container">
              <iframe
                class="iframe"
                src="https://www.youtube.com/embed/lIPwHRS_imY"
                frameborder="0"
                allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
                allowfullscreen
              ></iframe>
            </div>
          </div>
        </v-flex>
      </v-layout>
    </div>
    <v-layout py-10 class="section-2" row wrap justify-center>
      <v-flex class xs12 sm4 md4 max-12>
        <v-list>
          <v-subheader class="font-weight-bold">HOW THE APP WORKS</v-subheader>
          <v-list-item v-for="(item, i) in appFeatures" :key="i">
            <v-list-item-content>
              <v-list-item-title
                class="font-weight-bold"
                v-html="item.title"
              ></v-list-item-title>
              <v-list-item-subtitle
                v-html="item.subtitle"
              ></v-list-item-subtitle>
            </v-list-item-content>
          </v-list-item>
        </v-list>
      </v-flex>
      <v-flex class xs12 sm4 md4 max-12>
        <v-list>
          <v-subheader class="font-weight-bold"
            >HOW TO DOCUMENT A SOLUTION</v-subheader
          >
          <v-list-item v-for="(item, i) in documentation" :key="i">
            <v-list-item-content>
              <v-list-item-title
                class="font-weight-bold"
                v-html="item.title"
              ></v-list-item-title>
              <v-list-item-subtitle
                v-html="item.subtitle"
              ></v-list-item-subtitle>
            </v-list-item-content>
          </v-list-item>
        </v-list>
      </v-flex>
      <v-flex class xs12 sm3 md3 max-12>
        <v-list>
          <v-subheader class="font-weight-bold"
            >CONTRIBUTE TO CODE AND MORE</v-subheader
          >
          <v-list-item v-for="(item, i) in contribute" :key="i">
            <v-list-item-content>
              <v-list-item-title
                class="font-weight-bold"
                v-html="item.title"
              ></v-list-item-title>
              <v-list-item-subtitle
                v-html="item.subtitle"
              ></v-list-item-subtitle>
            </v-list-item-content>
          </v-list-item>
        </v-list>
      </v-flex>
    </v-layout>
  </Layout>
</template>

<script>
import Virus from '~/assets/Virus.svg';
import Play from '~/assets/Play.svg';
import InstantSearch from '~/assets/InstantSearch.svg';
import Download from '~/assets/Download.svg';
import Github from '~/assets/Github.svg';
import Learn from '~/assets/Learn.svg';
import Search from '~/assets/Search.svg';
import Lock from '~/assets/Lock.svg';
import Document from '~/assets/Document.svg';
import Markdown from '~/assets/Markdown.svg';

export default {
  metaInfo: {
    title: 'Home',
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
  },
  data() {
    return {
      appFeatures: [
        {
          title: 'Instant search',
          subtitle: 'Go to FINDER and search for keywords like mask',
        },
        {
          title: 'Download',
          subtitle: 'Download instantly the design you have chosen',
        },
        {
          title: 'Complete documentation',
          subtitle: 'Find guides, bill of materials, and images',
        },
        {
          title: 'Github based content delivery',
          subtitle: 'We use github powerful apis to build documents',
        },
      ],
      documentation: [
        {
          title: 'Find validated solutions',
          subtitle: 'Make sure we are uploading a solution that is effective',
        },
        {
          title: 'Community guidance',
          subtitle: 'We have a team of contributors that can help you',
        },
        {
          title: 'Standard',
          subtitle: 'Follow conventions for simple documentation',
        },
      ],
      contribute: [
        { title: 'Code', subtitle: 'Help us work on new features' },
        {
          title: 'Clinical feedback',
          subtitle: 'Help us get feedback from experts on solutions',
        },
        { title: 'Translate', subtitle: 'Translate to new languages' },
        {
          title: 'Identify new solutions',
          subtitle: 'Help us adding more solutions to the list',
        },
        {
          title: 'Contact authors',
          subtitle:
            'Help us reach the authors of solutions to update the content',
        },
      ],
      // icons: [
      //   'fab fa-facebook',
      //   'fab fa-twitter',
      //   'fab fa-google-plus',
      //   'fab fa-linkedin',
      //   'fab fa-instagram',
      // ],
    };
  },
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
</style>
