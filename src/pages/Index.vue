<template>
  <HomeLayout>
    <main class="w-screen bg-primary-100 bg-image">
      <div class="container px-2 sm:px-2 mx-auto py-32 md:flex md:pr-6">
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

            <g-link to="/docs/publish/how-to/">
              <button
                class="block md:inline-block py-2 px-6 border-2 border-white border-solid mt-4 w-full md:w-auto md:mt-0 md:ml-6 rounded-lg hover:shadow-xl font-bold text-white"
              >Document a design</button>
            </g-link>
          </div>
        </div>
        <!-- <div class="flex-1 flex justify-center items-center relative mt-24 md:mt-0">
          <div class="circle-transparent"></div>
          <button class="solid" v-on:click="isOpen = !isOpen">
            <Play />
          </button>
        </div>-->
      </div>
    </main>

    <section class="container px-2 sm:px-2 mx-auto py-20">
      <h2 class="text-center text-2xl md:text-3xl font-bold text-primary-75">HOW THE APP WORKS</h2>
      <hr class="mx-auto w-32 rounded-full mt-2 h-2 bg-primary-75" />
      <div class="grid md:grid-cols-2 gap-12 mt-16">
        <div v-for="(item, i) in appFeatures" :key="i">
          <HomeCard
            :link="item.link"
            :blank="item.blank"
            :icon="item.icon"
            :title="item.title"
            :subtitle="item.subtitle"
          ></HomeCard>
        </div>
      </div>
    </section>

    <div class="bg-gray-15">
      <section class="container px-2 mx-auto py-20">
        <h2
          class="text-center text-2xl md:text-3xl font-bold text-primary-75"
        >HOW TO DOCUMENT A SOLUTION</h2>
        <hr class="mx-auto w-32 rounded-full mt-2 h-2 bg-primary-75" />

        <div class="grid md:grid-cols-2 gap-12 mt-16">
          <div v-for="(item, i) in documentation" :key="i">
            <HomeCard
              bg
              :link="item.link"
              :blank="item.blank"
              :icon="item.icon"
              :title="item.title"
              :subtitle="item.subtitle"
            ></HomeCard>
          </div>
        </div>
      </section>
    </div>

    <section class="container px-2 sm:px-2 mx-auto py-20">
      <h2
        class="text-center text-2xl md:text-3xl font-bold text-accent-75"
      >CONTRIBUTE TO THE PROJECT</h2>
      <hr class="mx-auto w-32 rounded-full mt-2 h-2 bg-accent-75" />

      <div class="grid md:grid-cols-3 gap-5 mt-16">
        <div v-for="(item, i) in contribute" :key="i">
          <HomeCard
            styleBg="bg-primary-100"
            styleTitle="text-white text-2xl"
            styleSubtitle="text-white"
            :link="item.link"
            :blank="item.blank"
            :title="item.title"
            :subtitle="item.subtitle"
          ></HomeCard>
        </div>
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
import HomeCard from "~/components/HomeCard.vue";

export default {
  metaInfo: {
    title: "Home"
  },
  components: {
    Virus,
    HomeCard
  },
  data() {
    return {
      isOpen: false,
      appFeatures: [
        {
          title: "Instant search",
          subtitle: `Go to FINDER and search for keywords like mask`,
          icon: "Search",
          link: "/finder",
          blank: false
        },
        {
          title: "Download",
          subtitle: "Download instantly the design you have chosen",
          icon: "Download",
          link: "/finder",
          blank: false
        },
        {
          title: "Complete documentation",
          subtitle: "Find guides, bill of materials, and images",
          icon: "Document",
          link: "/finder",
          blank: false
        },
        {
          title: "Github based content delivery",
          subtitle: "We use github powerful apis to build documents",
          icon: "Github",
          link: "/docs/contrib/intro/",
          blank: false
        },
        {
          title: "Markdown based",
          subtitle:
            "Use Markdown interoperable format to export easily to different formats including epub, pdf, html",
          icon: "Markdown",
          link: "/docs/publish/how-to/",
          blank: false
        },
        {
          title: "Standard",
          subtitle: "Follow conventions for simple documentation",
          icon: "Standard",
          link: "/docs/publish/how-to/",
          blank: false
        }
      ],
      documentation: [
        {
          title: "Learn to document open hardware",
          subtitle:
            "We help you with a starting template, resources and community support",
          icon: "Osh",
          link: "/docs/publish/how-to/"
        },
        {
          title: "Review and validate",
          subtitle:
            "Make sure we are uploading a solution that is effective by getting feedback",
          icon: "Validate",
          link: "https://discord.gg/KB3bwpw",
          blank: true
        },
        {
          title: "Get community help",
          subtitle:
            "We have a team of contributors that can help you, join our chat group",
          icon: "People",
          link: "https://discord.gg/KB3bwpw",
          blank: true
        }
      ],
      contribute: [
        {
          title: "Code",
          subtitle: "Help us work on new features",
          icon: "InstantSearch",
          link: "/docs/contrib/intro/"
        },
        {
          title: "Clinical feedback",
          subtitle: "Help us get feedback from experts on solutions",
          icon: "InstantSearch",
          link: "https://discord.gg/KB3bwpw",
          blank: true
        },
        {
          title: "Translate",
          subtitle: "Translate to new languages",
          icon: "InstantSearch",
          link: "docs/publish/translate/"
        },
        {
          title: "Identify new solutions",
          subtitle:
            "Help us adding more solutions to the list and let us know in the chat",
          icon: "InstantSearch",
          link: "https://discord.gg/KB3bwpw",
          blank: true
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
