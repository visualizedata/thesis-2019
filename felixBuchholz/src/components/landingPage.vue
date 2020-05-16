<template>
  <div class="grid-container">
    <div class="margin-left"></div>
    <div class="center-block landing">
      <div>
        <h1 class="hug-bottom">
          Universal Income Guarantees. <br />
          An opportunity to rethink welfare?
        </h1>
        <h6 class="subheadline">An interactive visual inquiry</h6>
      </div>
    </div>
    <div class="margin-right"></div>
  </div>
</template>

<script>
export default {
  name: "landingPage",
  props: {
    msg: String
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
@import "../assets/scss/color_defs.scss";
.landing {
  margin-top: 36vh;
  margin-bottom: 40vh;
  background: $body-background-color;
}
</style>
