<template>
  <Layout class="" style="">
    <v-row>
    <v-col cols="3">
    <aside>
      <div class>
        <Sidebar @navigate="sidebarOpen = true" />
      </div>
    </aside>

    <div>
      <slot />
    </div> 
    </v-col>
    <div>
    <section class="docs-container">
      <h1>{{ $page.documentation.title }}</h1>
      <p class="intro">{{ $page.documentation.excerpt }}</p>
      <VueRemarkContent />
    </section>
    </div>
    </v-row>
  </Layout>
</template>

<!-- Front-matter fields can be queried from GraphQL layer -->
<page-query>
query Documentation ($id: ID!) {
  documentation(id: $id) {
    id
    title
    path
  }
  allDocumentation{
    edges {
      node {
        path
        title
      }
    }
  }
}
</page-query>

<script>
import Sidebar from "~/components/Sidebar.vue";
export default {
  components: {
    Sidebar
  }
};
</script>

<style scoped>

@media screen and (min-width: 800px) {
  .docs-container {
    padding-top: 3rem;
    margin: 0 auto;
    max-width: 750px;
  }
}
</style>