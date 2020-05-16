<template>
  <div class="subsection">
    <!-- * Template * -->
    <div class="grid-container">
      <div class="margin-left">
        <div class="margin-container">
          <a href="#fairness">
            <div class="icon-small unhug-top-small">
              <arrowIcon class="arrow-icon" />
            </div>
          </a>
        </div>
      </div>
      <div class="center-block">
        <h6 class="topheadline slam-bottom light" id="bureaucracy">
          Second entry point
        </h6>
        <h3 class="slam-top">
          <span class="italic">How</span> can welfare transfers <br />
          be more <span class="italic">effective?</span>
        </h3>
      </div>
      <div class="margin-right">
        <div class="margin-container">
          <a href="#automation">
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
        <p class="left">
          Proponents of a universal income guarantee often highlight
          <span class="bold">issues of the current welfare system.</span>
        </p>
        <div class="tiny-spacer"></div>
      </div>
      <div class="margin-right"></div>
    </div>
    <!-- * -->
    <div class="grid-container">
      <div class="margin-left"></div>
      <div class="center-block">
        <p class="left"> Checking for eligibility can be
            <span class="bold">intrusive</span> to people’s lives. It is
            <span class="bold">challenging to design</span> transfers to give
            the right recipients the right amount of money, because the combination of benefits can lead to the so-called
            <span class="bold">“welfare&nbsp;trap”:</span> The sudden drop in
            transfers when crossing a threshold of eligibility due to increased
            earnings can disincentivize efforts to be independent of welfare.</p>
      </div>
      <div class="margin-right"></div>
    </div>
    <graphCenterWelfareTrap />
    <!-- * -->
    <div class="grid-container">
      <div class="margin-left"></div>
      <div class="center-block">
        <!-- <img src="../../public/assets/mockup/welfare-trap.jpg" alt="" /> -->
      </div>
      <div class="margin-right"></div>
    </div>
    <!-- * -->
    <div class="grid-container">
      <div class="margin-left"></div>
      <div class="center-block">
        <p class="left">
          In this regard, an income guarantee that
          <span class="bold"
            >fades out in constant steps for every additional dollar
            earned</span
          >
          might be a solution. Often a (marginal tax) rate of 50% is suggested
          to balance the incentives. Ideally, that would lead to a linear total
          income progression.
        </p>
      </div>
      <div class="margin-right"></div>
    </div>
    <!-- * -->
    <graphCenterNIT />
    <div class="grid-container">
      <div class="margin-left"></div>
      <div class="center-block">
        <!-- <img src="../../public/assets/mockup/nit-model.jpg" alt="" /> -->
      </div>
      <div class="margin-right"></div>
    </div>
    <!-- * -->
    <div class="grid-container">
      <div class="margin-left"></div>
      <div class="center-block">
        <p class="right">
          Even if we acknowledge the cliff effect problem, the solution doesn’t
          have to be the most general money transfer.
          <span class="bold"
            >A smarter way to coordinate welfare programs is possible.</span
          >
        </p>
      </div>
      <div class="margin-right"></div>
    </div>
    <!-- * -->
    <div class="grid-container">
      <div class="margin-left"></div>
      <div class="center-block">
        <p class="right">
          The allocation of resources to everyone would also result in
          <span class="bold"
            >fewer possibilities to support specific individuals and
            communities</span
          >
          who need more assistance than the general income guarantee.
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
import graphCenterWelfareTrap from "../components/graphCenterWelfareTrap.vue";
import graphCenterNIT from "../components/graphCenterNIT.vue";
import arrowIcon from "../../public/assets/svg/arrow.svg";
export default {
  name: "bureaucracySubsection",
  components: { arrowIcon, graphCenterWelfareTrap, graphCenterNIT },
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
