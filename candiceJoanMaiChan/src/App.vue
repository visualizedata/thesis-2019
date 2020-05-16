<template>
  <div id="app">
    <!-- <div id="nav">
      <router-link to="/">Home</router-link> |
      <router-link to="/about">About</router-link>
    </div> -->
    <router-view/>
  </div>
</template>

<style lang="scss">
@font-face {
  font-family: "Adelle Bold";
  font-style: normal;
  font-weight: normal;
  src: url(~./assets/fonts/adelle-cufonfonts-webfont/Adelle_Bold.woff) format('woff');
}
@font-face {
  font-family: 'Adelle Regular';
  font-style: normal;
  font-weight: normal;
  src: url(~./assets/fonts/adelle-cufonfonts-webfont/Adelle_Reg.woff) format('woff');
}
@import url('https://fonts.googleapis.com/css?family=Lora');
@import url('https://fonts.googleapis.com/css?family=Open+Sans');
#app {
  font-family: 'Adelle Regular', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
#nav {
  padding: 30px;
  a {
    font-weight: bold;
    color: #2c3e50;
    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
</style>
