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
      <div class="margin-left">
        <div class="margin-container">
          <a href="#section-2">
            <div class="icon-small unhug-top-small">
              <arrowIcon class="arrow-icon" />
            </div>
          </a>
        </div>
      </div>
      <div class="center-block">
        <h2 class="hug-bottom" id="section-1">
          <span class="italic">What</span> are we talking about, <br />
          when we talk about <br />
          <span class="italic">universal income guarantees?</span>
        </h2>
        <h6 class="subheadline">Current interest & uncertainties</h6>
      </div>
      <div class="margin-right">
      </div>
    </div>
    <!-- * -->
    <div class="grid-container">
      <div class="margin-left"></div>
      <div class="center-block">
        <p class="intro">
          Today political debates are polarized. A certain buzz-word can easily
          trigger a
          <span class="sans bold color-primary"
            ><a href="https://twitter.com/hashtag/socialism?lang=en"
              >#socialism</a
            ></span
          >-uproar or similar types of reactions ending a conversation.
          Peculiarly the idea of an income guarantee seems to gain traction with
          <span class="bold">the potential to bridge these poles.</span>
        </p>
      </div>
      <div class="margin-right graph-container"><graphSideGoogle /></div>
    </div>
    <!-- * -->
    <div class="grid-container">
      <div class="margin-left"></div>
      <div class="center-block">
        <p class="left">
          Broadly speaking this idea is to introduce a program that
          <span class="bold">guarantees</span> a
          <span class="bold">certain amount of income to everyone.</span> Let’s
          use the term
          <span class="bold">Universal Income Guarantees (UIGs)</span>
          to refer to this broad notion.
        </p>
      </div>
      <div class="margin-right"></div>
    </div>
    <!-- * -->
    <div class="grid-container">
      <div class="margin-left"></div>
      <div class="center-block">
        <p class="right">
          Although the idea is not entirely new, it hasn’t yet risen to the
          level of a fixed plan. Hence, it comes in considerable variations and
          with different labels.
        </p>
      </div>
      <div class="margin-right">
        <p class="note">
          Names include: (Universal) Basic Income, Mincome, Negative Income Tax,
          Freedom Dividend … and many more
        </p>
      </div>
    </div>
    <!-- * -->
    <div class="grid-container">
      <div class="margin-left"></div>
      <div class="center-block">
        <p class="left">
          Advocates for UIGs tend to have very different political visions and
          thus their proposals probably have divergent outcomes. Overall UIGS
          are
          <span class="bold"
            >still searching for a home on the political compass.</span
          >
        </p>
      </div>
      <div class="margin-right"></div>
    </div>
    <!-- * -->
    <div class="grid-container">
      <div class="margin-left"></div>
      <div class="center-block">
        <p class="left">
          Over the next sections this interactive visual inquiry will set a framework to 
          decide whether a UIG is a good or a bad idea and tries to offer a
          multiple perspectives to find a nuanced argument for both sides.
        </p>
      </div>
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
import graphSideGoogle from "../components/graphSideGoogle.vue";
import arrowIcon from "../../public/assets/svg/arrow.svg";
export default {
  name: "firstSection",
  components: {
    graphSideGoogle,
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
