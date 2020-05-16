<template>
  <div class="standard-hidden">
    <div class="grid-container">
      <div class="margin-left"></div>
      <div class="center-block landing">
        <div>
          <h1 class="hug-bottom regular">
            Were people to mingle only with those of like mind, <br />
            every man would be an insulate being.
          </h1>
          <p>– Thomas Jefferson</p>
        </div>
      </div>
      <div class="margin-right"></div>
    </div>
    <img src="../../public/assets/presentation/balance.png" alt="View of the layout balance approach">
    <img src="../../public/assets/presentation/ubi-ideal.jpg" alt="Ideal UBI scheme, income floor view" @click="goToPresentationMenu">
    <img src="../../public/assets/presentation/questions.jpg" alt="Menu view" id="presentation-menu" @click="goToGraph1">
  </div>
</template>

<script>
export default {
  name: "landingPage",
  props: {
    msg: String
  }, 
  methods: {
    goToGraph1() {
       const element_to_scroll_to = document.getElementById("end-of-intro1");
          element_to_scroll_to.scrollIntoView();
    },
    goToPresentationMenu() {
      const element_to_scroll_to = document.getElementById("presentation-menu");
          element_to_scroll_to.scrollIntoView({
            behavior: "smooth"
          });
    }
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
