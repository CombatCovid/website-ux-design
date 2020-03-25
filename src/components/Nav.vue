<template>
  <b-navbar transparent class="is-dark" wrapper-class="container">
    <template slot="brand">
     
      <b-navbar-item tag="router-link" :to="{ path: '/' }">
<!--        <p class="nav-title">Hardware Combats Covid</p>-->
        <img
          src="/resources/images/combatcovid.png"
          alt="Hardware Combats Covid"
        />
      </b-navbar-item>
    </template>
    <template slot="start">
      <b-navbar-item href="/" tag="router-link" :to="{ path: '/' }">Home</b-navbar-item>
      <b-navbar-item href="documentation">Documentation</b-navbar-item>
      <b-navbar-item href="demo-connect">Demo Connect</b-navbar-item>
      <b-navbar-item href="repo-docs">Repo Docs</b-navbar-item>
      <b-navbar-dropdown label="Info">
        <b-navbar-item href="about">About</b-navbar-item>
        <b-navbar-item href="contact">Contact</b-navbar-item>
      </b-navbar-dropdown>
    </template>

    <template slot="end">
      <b-navbar-item tag="div">
        <div class="buttons">
          <a class="button is-primary">
            <strong>Sign up</strong>
          </a>
          <a class="button is-light">Log in</a>
        </div>
      </b-navbar-item>
    </template>
  </b-navbar>
</template>

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
