<template>
  <HomeLayout>
    <main class="w-screen bg-primary-100 bg-image">
      <div class="container py-32 mx-auto md:flex pr-6">
        <div class="flex-3 mt-20 md:mt-0">
          <h1
            class="text-white font-semibold text-3xl md:text-5xl"
            style="text-transform: uppercase;"
          >
            Combat covid
            <br />
            <span class="text-primary-25 font-bold">with hardware</span>
          </h1>
          <hr class="w-full my-4 rounded-full h-1 md:h-2 bg-primary-25 border-none" />

          <p class="text-xl md:text-2xl text-white">
            Search for well documented
            <b>designs</b> 🔍
            <br />and
            <b>document</b> new solutions
          </p>

          <div class="md:flex md:mt-6 mt-12">
            <g-link to="/finder">
              <button
                class="block md:inline-block py-2 px-6 bg-accent-75 rounded-lg hover:shadow-xl w-full md:w-auto hover:bg-accent-100 font-bold text-white"
              >Search for designs</button>
            </g-link>

            <g-link to="/documentation#prepare">
              <button
                class="block md:inline-block py-2 px-6 border-2 border-white border-solid mt-4 w-full md:w-auto md:mt-0 md:ml-6 rounded-lg hover:shadow-xl font-bold text-white"
              >Upload designs</button>
            </g-link>
          </div>
        </div>

        <div class="flex-1 flex justify-center items-center relative mt-24 md:mt-0">
          <div class="circle-transparent"></div>
          <button class="solid" v-on:click="isOpen = !isOpen">
            <Play />
          </button>
        </div>
      </div>
    </main>

    <section class="container py-20">
      <h2 class="text-center text-2xl md:text-3xl font-bold text-primary-75">HOW THE APP WORKS</h2>

      <hr class="mx-auto w-32 rounded-full mt-2 h-2 bg-primary-75" />

      <div class="grid md:grid-cols-2 gap-12 mt-16">
        <div class="card grid grid-cols-6" v-for="(item, i) in appFeatures" :key="i">
          <div class="col-span-5">
            <h2 class="text-gray-100 font-bold text-3xl" v-html="item.title"></h2>
            <p class="text-gray-75 text-xl" v-html="item.subtitle"></p>
          </div>
          <div>
            <component :is="item.icon" />
          </div>
        </div>
      </div>
    </section>

    <div class="bg-gray-15">
      <section class="container py-20">
        <h2
          class="text-center text-2xl md:text-3xl font-bold text-primary-75"
        >HOW TO DOCUMENT A SOLUTION</h2>
        <hr class="mx-auto w-32 rounded-full mt-2 h-2 bg-primary-75" />
        <div class="grid md:grid-cols-2 gap-12 mt-16">
          <div class="card grid grid-cols-6" v-for="(item, i) in documentation" :key="i">
            <div class="col-span-5">
              <h2 class="text-gray-100 font-bold text-3xl" v-html="item.title"></h2>
              <p class="text-gray-75 text-xl" v-html="item.subtitle"></p>
            </div>
            <div>
              <component :is="item.icon" />
            </div>
          </div>
        </div>
      </section>
    </div>

    <section class="container py-20">
      <h2
        class="text-center text-2xl md:text-3xl font-bold text-accent-75"
      >CONTRIBUTE TO CODE AND MORE</h2>
      <hr class="mx-auto w-32 rounded-full mt-2 h-2 bg-accent-75" />

      <div class="grid md:grid-cols-3 gap-5 mt-16">
        <div v-for="(item) in contribute" :key="item.title" class="card bg-primary-100">
          <h2 class="text-white text-2xl" v-html="item.title"></h2>
          <p class="text-white" v-html="item.subtitle"></p>
        </div>
      </div>
    </section>

    <section class="relative py-20 bg-image w-full bg-primary-100">
      <!-- <div
        class="background-color absolute top-0 opacity-50 w-full h-full bg-primary-100 z-0"
      ></div>-->
      <div class="container text-center z-20">
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
      class="animate fixed w-screen h-screen top-0 left-0 right-0 bottom-0 flex justify-center items-center transparent-bg overflow-hidden"
      v-if="isOpen"
    >
      <div class="absolute top-0 right-0 mr-10 mt-10 rounded-full flex justify-center items-center">
        <button class="close text-white" v-on:click="isOpen = !isOpen">&times;</button>
      </div>
      <div class="loading"></div>
      <iframe
        class="iframe"
        src="https://www.youtube.com/embed/lIPwHRS_imY"
        frameborder="0"
        allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
        allowfullscreen
      ></iframe>
    </div>
  </HomeLayout>
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
import Osh from "~/assets/Osh2.svg";
import Standard from "~/assets/Standard.svg";
import Validate from "~/assets/Audit.svg";

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
    People,
    Osh,
    Standard,
    Validate
  },
  data() {
    return {
      isOpen: false,
      appFeatures: [
        {
          title: "Instant search",
          subtitle: `Go to FINDER and search for keywords like mask`,
          icon: "Search"
        },
        {
          title: "Download",
          subtitle: "Download instantly the design you have chosen",
          icon: "Download"
        },
        {
          title: "Complete documentation",
          subtitle: "Find guides, bill of materials, and images",
          icon: "Document"
        },
        {
          title: "Github based content delivery",
          subtitle: "We use github powerful apis to build documents",
          icon: "Github"
        },
        {
          title: "Markdown based",
          subtitle:
            "Use Markdown interoperable format to export easily to different formats including epob, pdf, html",
          icon: "Markdown"
        },

        {
          title: "Standard",
          subtitle: "Follow conventions for simple documentation",
          icon: "Standard"
        }
      ],
      documentation: [
        {
          title: "Learn to document open hardware",
          subtitle:
            "We help you with a starting template, resources and community support",
          icon: "Osh"
        },
        {
          title: "Review and validate",
          subtitle: "Make sure we are uploading a solution that is effective",
          icon: "Validate"
        },
        {
          title: "Get community help",
          subtitle: "We have a team of contributors that can help you",
          icon: "People"
        }
      ],
      contribute: [
        {
          title: "Code",
          subtitle: "Help us work on new features",
          icon: "InstantSearch"
        },
        {
          title: "Clinical feedback",
          subtitle: "Help us get feedback from experts on solutions",
          icon: "InstantSearch"
        },
        {
          title: "Translate",
          subtitle: "Translate to new languages",
          icon: "InstantSearch"
        },
        {
          title: "Identify new solutions",
          subtitle: "Help us adding more solutions to the list",
          icon: "InstantSearch"
        },
        {
          title: "Contact authors",
          subtitle:
            "Help us reach the authors of solutions to update the content",
          icon: "InstantSearch"
        }
      ]
    };
  }
};
</script>

<style scoped lang="scss">
.container {
  max-width: 64rem;
}
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
  @apply shadow-lg bg-white-100 p-6 rounded-lg;
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

.animate {
  animation: animate 0.4s ease;
}

.loading {
  width: 90px;
  height: 90px;
  animation: loading 1s infinite alternate ease;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  @apply bg-white-100 rounded-full absolute;
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

@keyframes loading {
  from {
    opacity: 0.3;
    width: 60px;
    height: 60px;
  }
  to {
    opacity: 0.7;

    width: 30px;
    height: 30px;
  }
}

@keyframes animate {
  from {
    width: 0%;
    height: 0%;
    top: 30%;
    left: 70%;
    transform: translate(-50%, -50%);
    opacity: 0.3;
  }
  to {
    width: 100vw;
    height: 100vh;
    opacity: 1;
  }
}

@media screen and (max-width: 600px) {
  .iframe {
    min-width: 360px;
    min-height: 220px;
  }
}
</style>
