<template>
  <div class="w-screen h-20 bg-primary-100 text-white bg-image">
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
  }
};
</script>
