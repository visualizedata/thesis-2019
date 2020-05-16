<template>
  <div class="subsection">
    <!-- * Template * -->
    <div class="grid-container">
      <div class="margin-left">
        <div class="margin-container">
          <a href="#bureaucracy">
            <div class="icon-small unhug-top-small">
              <arrowIcon class="arrow-icon" />
            </div>
          </a>
        </div>
      </div>
      <div class="center-block">
        <h6 class="topheadline slam-bottom light" id="automation">
          First entry point
        </h6>
        <h3 class="slam-top">
          <span class="italic">How</span> many jobs will be lost due to <br />
          <span class="italic">Artificial Intelligence?</span>
        </h3>
      </div>
      <div class="margin-right">
        <div class="margin-container">
          <a href="#section-2">
            <div class="icon-small unhug-top-small">
              <arrowIcon class="arrow-icon up" />
            </div>
          </a>
        </div>
      </div>
    </div>
    <!-- * -->
    <graphCenterAutomationWage />

    <!-- * -->
    <div class="grid-container">
      <div class="margin-left"></div>
      <div class="center-block">
        <p class="right">
          These numbers convey an <span class="bold">alarming</span> image.
          However there is <span class="bold">a dispute,</span> whether
          artificial intelligence will result in more layoffs than other forms
          of automation have in the past. Right now it still seems like a
          majority of economists are
          <span class="bold"
            >optimistic that dynamic effects will balance the impact of
            artificial intelligence.</span
          >
        </p>
        <div class="right">
          <!-- <img src="../../public/assets/mockup/job-benchmark.jpg" alt="" /> -->
        </div>
      </div>
      <div class="margin-right"></div>
    </div>
    <!-- * -->
      <graphAutomationBenchmark />
    <!-- * -->
    <div class="grid-container">
      <div class="margin-left"></div>
      <div class="center-block">
        <p class="left">
          Even if artificial intelligence won’t result in higher unemployment,
          there is still concern about the
          <span class="bold">quality and compensation</span> of remaining or new
          <span class="bold">jobs.</span> When wages go down, the reduced demand
          could be damaging to the overall economy. Following this notion, it
          makes sense to
          <span class="bold">develop guarantees to share the growth</span> of
          productivity.
        </p>
      </div>
      <div class="margin-right"></div>
    </div>
    <!-- * -->
    <div class="grid-container">
      <div class="margin-left"></div>
      <div class="center-block">
        <p class="right">
          But income guarantees are <span class="bold">only one option</span> to
          address demand. Depending on the political vision a range of policies
          can be suggested: from
          <span class="bold"
            >increased efforts in education and re-training to strategies to
            bring employees to the table</span
          >
          when it comes to decide how new technologies are implemented.
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
import graphCenterAutomationWage from "../components/graphCenterAutomationWage.vue";
import graphAutomationBenchmark from "../components/graphAutomationBenchmark.vue";
import arrowIcon from "../../public/assets/svg/arrow.svg";

export default {
  name: "automationSubsection",
  components: { graphCenterAutomationWage, arrowIcon, graphAutomationBenchmark },
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
</style>
