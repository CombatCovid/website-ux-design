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
      <v-toolbar-items class="hidden-sm-and-down"
                       v-for="(item, key) in items"
                       :key="item.label">
        <v-btn text exact :to="item.name">{{item.label}}</v-btn>
      </v-toolbar-items>

    </v-app-bar>
    <v-navigation-drawer appf v-model="sidebar" temporary absolute width="200" id="drawer">
      <v-list dense nav>
        <div
                v-for="item in items"
                :key="item.name"
        >
          <v-btn text exact :to="item.name">{{item.label}}</v-btn>
        </div>
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
        navIcon: '/resources/images/combatcovid.png',
        items: [
          {name: '/', label: 'Home'},
          {name: '/finder', label: 'Finder'},
          {name: '/viewer', label: 'Viewer'},
          {name: '/documentation', label: 'Documentation'},
          {name: '/about', label: 'About'}
        ]
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
