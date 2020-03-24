<template>
  <Layout>
    <h1>Demo Connect</h1>
    <p>Demonstrate a single connection to GitHub API -- the
      actual app will need to dynamically manage multiple connections,
      one at a time, for each tool repo.</p>
    <div class="query-content">
      <div v-if="repoData">
        <h2>Repo owner = {{ $page.gitapi.repos.name }}</h2>
        <div v-for="node in $page.gitapi.repos.repositories.nodes">
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
      number: 3
    }
  },
  context: {
    number: 3,
  },
  created () {
    this.$context.number = 3
    console.log('context: ' + JSON.stringify(this.$context))
    console.log ('mounted: ' + JSON.stringify(this.$page))
  },
  computed: {
    repoData: function () {
      return JSON.stringify (this.$page)
    }
  }
}
</script>

<page-query>
  query DemoConnect($number: Int)  {
    gitapi {
      repos: viewer {
        name
        repositories(last: $number) {
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
</style>
