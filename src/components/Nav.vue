<template>
  <span>
    <div class="w-screen h-20 bg-primary-100 fixed top-0 text-white bg-image hidden md:block">
      <div class="container mx-auto max-w-5xl flex items-center h-full">
        <g-link to="/" class="text-white-100 font-bold mr-4">
          {{
          $static.metadata.siteName
          }}
        </g-link>

        <nav class="flex">
          <g-link
            v-for="item in items"
            :key="item.label"
            exact
            active-class="text-white-100 font-bold"
            :to="item.name"
            class="p-4 mx-2 text-primary-25 hover:font-semibold"
          >{{ item.label }}</g-link>
        </nav>
      </div>
    </div>

    <div class="w-screen h-20 bg-primary-100 fixed top-0 text-white bg-image md:hidden">
      <div class="container mx-auto max-w-5xl flex items-center justify-between h-full">
        <g-link to="/" class="text-white-100 font-bold mr-4">
          {{
          $static.metadata.siteName
          }}
        </g-link>

        <button class="mr-4" @click="toggleMenu">
          <svg
            width="38"
            height="27"
            viewBox="0 0 38 27"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M36 9.88885H9.55554"
              stroke="white"
              stroke-width="3.77778"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
            <path
              d="M36 2.33331H2"
              stroke="white"
              stroke-width="3.77778"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
            <path
              d="M36 17.4445H2"
              stroke="white"
              stroke-width="3.77778"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
            <path
              d="M36 25H9.55554"
              stroke="white"
              stroke-width="3.77778"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
          </svg>
        </button>
      </div>
    </div>

    <div class="md:hidden fixed top-0 w-screen h-screen overflow-hidden z-10" v-if="isOpen">
      <div
        class="w-screen h-screen fixed overflow-hidden bg-primary-100 opacity-75"
        v-bind:class="{'translate': isOpen}"
        @click="toggleMenu"
      ></div>
      <div
        v-bind:class="{'translate': isOpen}"
        class="h-screen w-4/6 z-20 bg-white fixed top-0 left-0 shadow-2xl p-6"
      >
        <div class="mb-6">
          <g-link to="/" class="text-primary-100 font-bold mr-4">
            {{
            $static.metadata.siteName
            }}
          </g-link>
        </div>

        <nav class="flex flex-col">
          <g-link
            v-for="item in items"
            :key="item.label"
            exact
            active-class="text-primary-25 font-bold hover:text-gray-100"
            :to="item.name"
            class="p-2 hover:bg-primary-25 rounded-md mx-2 text-gray-100 hover:font-semibold"
          >{{ item.label }}</g-link>
        </nav>
      </div>
    </div>
  </span>
</template>

<static-query>
  query{
    metadata{
      siteName
    }
  }
</static-query>

<script>
import { mdiDotsVertical, mdiDotsHorizontal } from "@mdi/js";
import BookmarksMenu from "./BookmarksMenu";
import store from "~/store";

export default {
  name: "Nav",
  components: { BookmarksMenu },
  data: function() {
    return {
      isOpen: false,
      choicesBar: false,
      firstTimeViewer: false,
      ccwhIcon: "/resources/images/combatcovid.png",
      extrasIcon: mdiDotsVertical,
      designIcon: mdiDotsHorizontal,
      items: [
        { name: "/", label: "Home" },
        {
          name: "/finder",
          label: "Finder"
        },
        {
          name: "/viewer",
          label: "Viewer"
        },
        {
          name: "/documentation",
          label: "Documentation"
        },
        { name: "/about", label: "About" }
      ]
    };
  },
  computed: {
    hideWhen: function() {
      if (typeof window !== "undefined") {
        const w =
          window.innerWidth ||
          document.documentElement.clientWidth ||
          document.body.clientWidth;
        return w <= 640;
      } else {
        return false;
      }
    },
    designRemembered: function() {
      return store.getters.lastRepoName;
    }
  },
  methods: {
    toggleMenu: function() {
      this.isOpen = !this.isOpen;
    }
  }
};
</script>

<style lang="scss" scoped>
.translate {
  animation: animate alternate 0.5s ease-in-out;
}

@keyframes animate {
  from {
    transform: translateX(-100%);
  }
  to {
    transform: translateX(0);
  }
}
</style>