<template>
    <v-app-bar app dark>
      <span class="hidden-sm-and-up">
        <v-app-bar-nav-icon @click="sidebar = !sidebar" src="navIcon">
        </v-app-bar-nav-icon>
      </span>
      <v-toolbar-title >
        <router-link to="/" tag="span" style="cursor: pointer">
          {{ $static.metadata.siteName }}
        </router-link>
      </v-toolbar-title>
      <v-spacer></v-spacer>
      <v-toolbar-items class="hidden-xs-only">
        <v-btn text to="/demo-connect">List of designs</v-btn>
        <v-btn text to="/repo-docs">Doc demo</v-btn>
        <v-btn text to="/design-choices">Design Choices</v-btn>
        <v-btn text>
          <g-link to="/Documentation">Documentation</g-link>
        </v-btn>
        <v-btn text>
          <g-link to="/About">About</g-link>
        </v-btn>
      </v-toolbar-items>
    </v-app-bar>
</template>
<static-query>
query{
  metadata{
    siteName
  }
}
</static-query>

<script>


export default {
  name: "Nav",
  data: function () {
    return {
      navIcon: '/resources/images/combatcovid.png'
    }
  }
};
</script>

<style scoped>
  .nav-title {
    color: darkgoldenrod;
    margin-right: 20px;
  }
</style>
