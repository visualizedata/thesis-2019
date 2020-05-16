<template>
  <div class="section">
    <!-- * Template * -->
    <div class="grid-container">
      <div class="margin-left"></div>
      <div class="center-block"></div>
      <div class="margin-right"></div>
    </div>
    <!-- * -->
    <div class="grid-container">
      <div class="margin-left"></div>
      <div class="center-block">
        <h2 class="hug-bottom" id="section-5">
          <span class="italic">Where</span> to go from here?
        </h2>
        <h6 class="subheadline">
          Next steps
        </h6>
      </div>
      <div class="margin-right">
        <div class="margin-container">
          <a href="#section-4">
            <div class="icon-small unhug-top-small">
              <arrowIcon class="arrow-icon up" />
            </div>
          </a>
        </div>
      </div>
    </div>
    <!-- * -->
    <div class="grid-container">
      <div class="margin-left"></div>
      <div class="center-block">
        <p class="intro">It now depends on you! If you made it this far, chances are you have some interest in universal income guarantees.</p>
        <p class="left">If you want to find more information, why don’t you start with the UIG schemes presented in this essay? Karl Widerquist developed the methodology for the first UIG scheme and wrote about it <a href="https://works.bepress.com/widerquist/75/">here.</a> For the second UIG scheme, I adapted Milton Friedman’s approach to a negative income tax that he developed in <a href="https://en.wikipedia.org/wiki/Capitalism_and_Freedom">“Capitalism and Freedom”.</a> These authors position themselves at opposite ends of the UIG discussion. For a more moderate approach and other alternatives, you can take a look at Anthony B. Atkinson’s <a href="https://www.tony-atkinson.com/new-book-inequality-what-can-be-done/">“Inequality – What can be done?”</a></p>
        <p class="left">When you think this is a great idea and want to support it, there is currently a candidate with a UIG proposal, he calls it the <a href="https://www.yang2020.com/policies/the-freedom-dividend/">Freedom Dividend,</a> running for president in the US. A network of advocates and supporters of UBI working for over thirty years now is <a href="https://basicincome.org/">another entry point.</a></p>
        <p class="right">If you hate the idea and want to do something against it, I can reassure you, that it’s currently still not at risk to be implemented soon. For another perspective, this Guardian article might be a <a href="https://www.theguardian.com/commentisfree/2019/may/06/universal-basic-income-public-realm-poverty-inequality">good starting point,</a> where Anna Coote promotes and links her research. But I hope this essay also provided a nuanced argument against income guarantees for you and you feel prepared to become a part of the debate.</p>
      </div>
      <div class="margin-right"></div>
    </div>
    <!-- * -->
    <div class="grid-container">
      <div class="margin-left"></div>
      <div class="center-block"></div>
      <div class="margin-right"></div>
    </div>
    <!-- * -->
    <div class="grid-container">
      <div class="margin-left"></div>
      <div class="center-block"></div>
      <div class="margin-right"></div>
    </div>
    <!-- * -->
    <div class="grid-container">
      <div class="margin-left"></div>
      <div class="center-block"></div>
      <div class="margin-right"></div>
    </div>
    <!-- * Template * -->
    <div class="grid-container">
      <div class="margin-left"></div>
      <div class="center-block"><div class="spacer"></div></div>
      <div class="margin-right"></div>
    </div>
  </div>
</template>

<script>
// import graphSide from "../components/graphSide.vue";
import arrowIcon from "../../public/assets/svg/arrow.svg";
export default {
  name: "fifthSection",
  components: {
    // graphSide
    arrowIcon
  },
  props: {
    msg: String
  },
  data() {
    return {};
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
// @import "../assets/scss/color_defs.scss";
graphSide {
  position: absolute;
}
.graph-container {
  width: 80%;
}
</style>
