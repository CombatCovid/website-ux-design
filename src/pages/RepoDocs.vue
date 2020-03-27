<template>
  <Layout>
    <h1>Repo Docs</h1>
    <p>Showing expected standard '01-title.md' descriptions, on a single connection to GitHub API,
      and for as many repos have the standard `docs/ES/` folder arrangement so we see ES documents.</p>
    <p>Display formatting is rough, and I may want to go a better means than VueMarkdown, but it gives a first demo.
      A master-detail layout to view one listed doc at a time may or not be needed for performance
      and feel. The actual app will need to dynamically manage multiple connections, one at a time,
      for each participating Github account.</p>
    <p>N.b. at the moment, there's a proving test at the bottom of the summary - will go away.</p>
    <div class="query-content">
      <div v-if="$page">
        <h2>Repo owner is {{ htmlSanitize($page.gitapi.repos.name) }}</h2>
        <div class="repo-list" v-for="node in $page.gitapi.repos.repositories.nodes" v-if="node.object">
          <p>Repo name is {{ htmlSanitize(node.name) }}</p>
          <!-- _Always_ sanitize what could contain html, as Markdown can -->
          <!-- normal: <VueMarkdown :source="htmlSanitize(node.object.text)" :prerender="cleanFormatMarkdown"/>-->
          <VueMarkdown :source="testSummaryText(node.object.text)" :prerender="cleanFormatMarkdown"/>
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
        numberRepos: 99
      }
    },
    methods: {
      // this will go out -- it's a test method for assuring img can pass through
      // our htmlSanitize (summary proves links can), but not any other html
      testSummaryText: function (mdText) {
        return this.htmlSanitize(mdText +
          'What follows is a test: <img src="/resources/image/Example.jpg"> ' +
          'abc <badhtml xyz></badhtml>' +
          'abd <otherbadhtml/>' +
          'abe <thirdbadhtml>')
      }
    },
    components: {VueMarkdown}
  }
</script>

// this is hardwired, as api graphql requires a first: or last: value,
// but I believe this isn't settable in Gridsome unless creating page
// programatically, thus having a context, via createPage().
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
