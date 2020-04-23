<template>
  <v-navigation-drawer permanent>
    <v-list-item>
      <v-list-item-content>
        <v-list-item-title class="title">Application</v-list-item-title>
        <v-list-item-subtitle>subtext</v-list-item-subtitle>
      </v-list-item-content>
    </v-list-item>

    <v-divider></v-divider>

    <v-list dense nav>
      <v-list-item v-for="page in pages" :id="page" :key="page">
        <!-- <v-list-item-icon>
            <v-icon>{{ item.icon }}</v-icon>
        </v-list-item-icon>-->

        <v-list-item-content>
          <router-link :to="`${page.path}`">
            <v-list-item-title>{{ page.title }}</v-list-item-title>
          </router-link>
        </v-list-item-content>
      </v-list-item>
    </v-list>
  </v-navigation-drawer>
  <!-- <div style="margin:0 auto; max-width:800px; padding-top:20px;">
    <li v-for="page in pages" :id="page" :key="page">
      <router-link :to="`${page.path}`">
      {{page.title}}
      </router-link>
      </li>
  </div>-->
</template>

<static-query>
query Sidebar {
  metadata {
    settings {
      sidebar {
        name
        sections {
          title
          items
        }
      }
    }
  }
}
</static-query>

<script>
export default {
  data() {
    return {
      drawer: true,
      items: [
        { title: "Dashboard", icon: "mdi-view-dashboard" },
        { title: "Photos", icon: "mdi-image" },
        { title: "About", icon: "mdi-help-box" }
      ],
      color: "primary",
      colors: ["primary", "blue", "success", "red", "teal"],
      right: true,
      miniVariant: false,
      expandOnHover: false,
      background: false
    };
  },
  computed: {
    pages() {
      // console.log(this.$page.allDocumentation.edges.node.path)
      return this.$page.allDocumentation.edges.map(edge => edge.node);
    },
    sidebar() {
      return this.$static.metadata.settings.sidebar;
    },
    showSidebar() {
      return this.$page.markdownPage.sidebar && this.sidebar;
    },
    currentPage() {
      return this.$page.documentation;
    }
  },
  methods: {
    getClassesForAnchor({ path }) {
      return {
        "text-ui-primary": this.currentPage.path === path,
        "transition transform hover:translate-x-1 hover:text-ui-primary":
          !this.currentPage.path === path
      };
    },
    findPages(links) {
      return links.map(link => this.pages.find(page => page.path === link));
    }
  }
};
</script>
