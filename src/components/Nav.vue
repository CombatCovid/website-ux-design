<template>
  <div>
    <v-app-bar app dark>
      <span class="hidden-md-and-up">
        <v-app-bar-nav-icon class="hidden-sg-and-up" @click="sidebar = !sidebar" src="navIcon">
        </v-app-bar-nav-icon>
      </span>
      <v-img src="/resources/image/combatcovid.png" max-width="50px"></v-img>
      <v-toolbar-title xs>
        <router-link to="/" tag="span" style="cursor: pointer">
          <span class="bar-title">{{ $static.metadata.siteName }}</span>
        </router-link>
      </v-toolbar-title>
      <v-spacer></v-spacer>
      <v-toolbar-items class="hidden-sm-and-down">
        <v-btn text to="/jose-connect">Jurra Connect</v-btn>
        <v-btn text to="/algo-build">Algo Build</v-btn>
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
    <v-navigation-drawer appf v-model="sidebar" temporary absolute width="200" id="drawer">
      <v-list dense nav>
<!-- this is borrowed, so items not provided yet if we do it that way, in which case bar as well  -->
<!--        <div-->
<!--                v-for="item in items"-->
<!--                :key="item.name"-->
<!--                @click=""-->
<!--        >-->
<!--          <v-btn flat exact :to="item.name">{{item.label}}</v-btn>-->
<!--        </div>-->
        <v-btn text exact to="/demo-connect">List of designs</v-btn>
        <v-btn text to="/repo-docs">Doc demo</v-btn>
        <v-btn text to="/design-choices">Design Choices</v-btn>
        <v-btn text to="/Documentation">Documentation</v-btn>
        <v-btn text to="/About">About</v-btn>
      </v-list>
    </v-navigation-drawer>
  </div>
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
        sidebar: false,
        navIcon: '/resources/images/combatcovid.png'
      }
    }
  };
</script>

<style scoped>
  a {
    color: white;
    text-decoration: none;
  }

  a:visited {
    color: white;
  }

  /* a:active{
    background:red;
  } */

  .bar-title {
    font-size: small;
    padding: 0 1em;
  }
</style>
