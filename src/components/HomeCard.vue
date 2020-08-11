<template>
  <g-link
    v-if="blank == false"
    :to="getLink(link,blank)"
    :class="styleBg"
    class="card grid grid-cols-6 gap-2 transition duration-300 ease-in-out transform hover:-translate-y-1 hover:scale-105"
  >
    <div class="col-span-5">
      <h2 :class="styleTitle" v-html="title"></h2>
      <p :class="styleSubtitle" v-html="subtitle"></p>
    </div>
    <div>
      <component :is="getIcon(icon)" />
    </div>
  </g-link>

  <!-- Blank page -->
  <div
    v-else
    @click="getLink(link,blank)"
    :class="styleBg"
    class="card grid grid-cols-6 gap-2 transition duration-300 ease-in-out transform hover:-translate-y-1 hover:scale-105"
  >
    <div class="col-span-5">
      <h2 :class="styleTitle" v-html="title"></h2>
      <p :class="styleSubtitle" v-html="subtitle"></p>
    </div>
    <div>
      <component :is="getIcon(icon)" />
    </div>
  </div>
</template>
<script>
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
  name: "HomeCard",
  components: {
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
  props: {
    link: {
      type: String,
      required: false,
      default: "/docs/"
    },
    blank: {
      type: Boolean,
      required: false,
      default: false
    },
    icon: {
      type: String,
      required: false,
      default: null
    },
    title: {
      type: String,
      required: true,
      default: "You are missing a title"
    },
    subtitle: {
      type: String,
      required: false,
      default: null
    },

    // Style classes
    styleBg: {
      type: String,
      required: false,
      default: "card"
    },
    styleTitle: {
      type: String,
      required: false,
      default: "text-gray-100 font-bold text-3xl"
    },
    styleSubtitle: {
      type: String,
      required: false,
      default: "text-gray-75 text-xl"
    }
  },
  data() {
    return {};
  },
  methods: {
    getIcon: function(icon) {
      return icon ? this.icon : null;
    },
    getLink: function(link, blank) {
      return !blank ? this.link : window.open(this.link, "_blank");
    }
  }
};
</script>

<style scoped>
.card {
  min-height: 200px;
  @apply shadow-lg bg-white-100 p-6 rounded-lg;
  cursor: pointer;
}
</style>