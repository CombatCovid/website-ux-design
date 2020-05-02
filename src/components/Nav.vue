<template>
  <div>
    <div class="w-screen h-20 bg-primary-100 text-white">
      <div class="container mx-auto max-w-4xl flex items-center h-full">
        <g-link to="/" class="text-white-100 font-bold mr-4">{{ $static.metadata.siteName }}</g-link>

        <nav class="flex">
          <g-link
            v-for="item in items"
            :key="item.label"
            exact
            active-class="text-primary-25"
            :to="item.name"
            class="p-4 mx-2 text-white"
          >{{item.label}}</g-link>
        </nav>
      </div>
    </div>
  </div>
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
      sidebar: false,
      choicesBar: false,
      firstTimeViewer: false,
      ccwhIcon: "/resources/images/combatcovid.png",
      extrasIcon: mdiDotsVertical,
      designIcon: mdiDotsHorizontal,
      items: [
        { name: "/", label: "Home", color: "teal", class: "spaced-btn" },
        {
          name: "/finder",
          label: "Finder",
          color: "blue",
          class: "soft-antwerp-light"
        },
        {
          name: "/viewer",
          label: "Viewer",
          color: "blue",
          class: "soft-antwerp-light spaced-btn"
        },
        {
          name: "/documentation",
          label: "Documentation",
          color: "teal",
          class: "spaced-btn"
        },
        { name: "/about", label: "About", color: "teal", class: "spaced-btn" }
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
  }
};
</script>
