<template>
  <Layout>
    <h1>Repo Docs</h1>
    <p>Showing expected standard '01-title.md' descriptions, on a single connection to GitHub API,
      and for as many repos have the standard `docs/ES/` folder arrangement so we see ES documents.</p>
    <p>Display formatting is rough, and I may want to go a better means than VueMarkdown, but it gives a first demo.
      A master-detail layout to view one listed doc at a time may or not be needed for performance
      and feel. The actual app will need to dynamically manage multiple connections, one at a time,
      for each participating Github account.</p>
    <div class="query-content">
      <div v-if="$page">
        <h2>Repo owner is {{ $page.gitapi.repos.name }}</h2>
        <div class="repo-list" v-for="node in $page.gitapi.repos.repositories.nodes" v-if="node.object">
          <p>Repo name is {{ node.name }}</p>
          <VueMarkdown :source="node.object.text"
                       :anchorAttributes="anchorParts"
                       :prerender="cleanFormatMarkdown"/>
        </div>
      </div>
      <div v-else>
        <h2>No data yet...</h2>
      </div>
    </div>

  </Layout>
</template>

<script>
import VueMarkdown from 'vue-markdown'

export default {
  metaInfo: {
    title: 'Demo Connect'
  },
  data: function () {
    return {
      anchorParts: {
        target: '_blank',
        rel: 'noreferrer noopener'
      },
      numberRepos: 99
    }
  },
  mounted () {
    // this.tabTargetLinks ();
  },
  methods: {
    cleanFormatMarkdown (lines) {
      // in case we have other operations to do, like properly
      // *todo* formatting included [name](url) links if VueMarkdown doesn't???
      // *todo* but a more complete markdown converter may be appearing on the horizon.
      return this.stripFrontMatter(lines)
    },
    stripFrontMatter: function (lines) {
      // *todo* later some way that VueMarkdown handles this itself?
      return lines.replace(/---\n.+---\n/gs, '')
    }
  },
  components: { VueMarkdown }
}
</script>

// this is hardwired, as api graphql requires a first: or last: value,
// but I believe this isn't settable in Gridsome unless creating page
// programatically, via createPage().
<page-query>
query RepoDocs {
  gitapi {
    repos: viewer {
      name
      repositories(last: 99) {
        nodes {
          name
          nameWithOwner
          updatedAt
          url
          object(expression: "master:docs/ES/01-Title.md") {
            ... on GitApi_Blob {
              commitUrl
              text
            }
          }
        }
      }
    }
  }
}
</page-query>

<style>
  .li {
    margin-bottom: 1em !important;
  }
</style>

<style scoped>
  .query-content {
    margin: 20px;
    padding: 15px;
    color: darkslategray;
    background-color: beige;
  }
  .repo-list {
    padding: 2px 10px;
  }
</style>
