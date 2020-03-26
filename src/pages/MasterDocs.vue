<template>
  <Layout>
    <h1>Master Docs</h1>
    <p>Initial mock, showing master-detail for Designs.</p>
    <p>Intent is to have normal list select -> summary pane for larger screens, 
      but then vertical-down-opening summaries when on phones</p>
    <div class="master-detail">
      <v-layout>
        <v-flex xs12 sm8 offset-sm2>
          <v-layout>
            <v-flex xs11>
              <DesignList/>
            </v-flex>
            <v-flex>
              <DesignDetail/>
            </v-flex>
          </v-layout>
        </v-flex>
      </v-layout>
    </div>

  </Layout>
</template>

<script>
  import DesignList from '@/components/DesignList'
  import DesignDetail from '@/components/DesignDetail'

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
  components: { DesignList, DesignDetail }
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
  .master-detail {
    margin: 20px;
    padding: 15px;
    color: darkslategray;
    background-color: beige;
  }
  .repo-list {
    padding: 2px 10px;
  }
</style>
