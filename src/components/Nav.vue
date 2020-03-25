<template>
    <v-toolbar app dark>
      <span class="hidden-sm-and-up">
        <v-toolbar-side-icon @click="sidebar = !sidebar">
        </v-toolbar-side-icon>
      </span>
      <v-toolbar-title >
        <router-link to="/" tag="span" style="cursor: pointer">
          {{ $static.metaData.siteName }}
        </router-link>
      </v-toolbar-title>
      <v-spacer></v-spacer>
      <v-toolbar-items class="hidden-xs-only">
        <v-btn flat to="/demo-connect">List of designs</v-btn>
        <v-btn flat to="/repo-docs">Doc demo</v-btn>
        <v-btn flat>
          <g-link to="/Documentation">Documentation</g-link>
        </v-btn>
        <v-btn flat>
          <g-link to="/About">About</g-link>
        </v-btn>
      </v-toolbar-items>
    </v-toolbar>
</template>
<static-query>
query{
  metaData{
    siteName
  }
}
</static-query>

<script>


export default {
  name: "Nav"
};
</script>

<style scoped>
  .nav-title {
    color: darkgoldenrod;
    margin-right: 20px;
  }
</style>
