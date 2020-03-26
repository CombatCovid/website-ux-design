<template>
  <Layout>
    <h1>Demo Connect</h1>
    <p>Demonstrate a single connection to GitHub API -- the
      actual app will need to dynamically manage multiple connections,
      one at a time, for each participating Github account.</p>
    <div class="query-content">
      <div v-if="$page">
        <h2>Repo owner = {{ $page.gitapi.repos.name }}</h2>
        <div class="repo-list" v-for="node in $page.gitapi.repos.repositories.nodes" :key="node.name">
          <p>Repo name is {{ node.name }}</p>
        </div>
      </div>
      <div v-else>
        <h2>No data yet...</h2>
      </div>
    </div>

  </Layout>
</template>

<script>
export default {
  metaInfo: {
    title: 'Demo Connect'
  },
  data: function () {
    return {
      numberRepos: 3
    }
  }
}
</script>

// this is hardwired, as api graphql requires a first: or last: value,
// but I believe this isn't settable in Gridsome unless creating page
// programatically, via createPage()
<page-query>
  query DemoConnect  {
    gitapi {
      repos: viewer {
        name
        repositories(last: 99) {
          nodes {
            name
          }
        }
      }
    }
  }
</page-query>

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
