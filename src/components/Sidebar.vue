<template>
  <div style="margin:0 auto; max-width:800px">
    <li v-for="page in pages" :id="page" :key="page">{{page.title}}</li>
  </div>
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
      expanded: []
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
