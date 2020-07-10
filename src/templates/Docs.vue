<template>
  <!-- <Layout> -->
    <Docs>
      <div class="flex flex-wrap items-start justify-start">
        <div class="order-2 w-full md:w-1/3 sm:pl-4 md:pl-6 lg:pl-8 sticky" style="top: 4rem">
          <!-- <OnThisPage /> -->
        </div>

        <div class="order-1 w-full md:w-2/3">
          <div class="content" v-html="$page.docs.content" />

          <div class="mt-8 pt-8 lg:mt-12 lg:pt-12 border-t border-ui-border">
            <!-- <NextPrevLinks /> -->
          </div>
        </div>
      </div>
    </Docs>
  <!-- </Layout> -->
</template>

<page-query>
query ($id: ID!) {
  docs(id: $id) {
    id
    title
    path
    sidebar
    content
  }
  allDocs{
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
import Docs from "@/layouts/Docs.vue";
import OnThisPage from "@/components/OnThisPage.vue";
import NextPrevLinks from "@/components/NextPrevLinks.vue";

export default {
  components: {
    Docs,
    OnThisPage,
    NextPrevLinks
  },

  metaInfo() {
    const title = this.$page.docs.title;
    const description = this.$page.docs.description || this.$page.docs.excerpt;

    return {
      title: title,
      meta: [
        {
          name: "description",
          content: description
        },
        {
          key: "og:title",
          name: "og:title",
          content: title
        },
        {
          key: "twitter:title",
          name: "twitter:title",
          content: title
        },
        {
          key: "og:description",
          name: "og:description",
          content: description
        },
        {
          key: "twitter:description",
          name: "twitter:description",
          content: description
        }
      ]
    };
  }
};
</script>

<style>
/* @import 'prism-themes/themes/prism-material-oceanic.css'; */
</style>