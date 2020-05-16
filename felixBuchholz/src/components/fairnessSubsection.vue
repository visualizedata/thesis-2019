<template>
  <div class="subsection">
    <!-- * Template * -->
    <div class="grid-container">
      <div class="margin-left">
        <div class="margin-container">
          <a href="#section-3">
            <div class="icon-small unhug-top-small">
              <arrowIcon class="arrow-icon" />
            </div>
          </a>
        </div>
      </div>
      <div class="center-block">
        <h6 class="topheadline slam-bottom light" id="fairness">
          Third entry point
        </h6>
        <h3 class="slam-top">
          <span class="italic">How</span> can we improve <br />
          welfare <span class="italic">fairness?</span>
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
        <p class="intro">
          Probably the most challenging question is how to make the
          welfare system fairer. To do this, we usually need to agree on a definition of fariness first. 
          In the case of income guarantees this might not be necessary. 
          Even if people disagree on a definition of fairness, 
          there is still a possibility they can agree on UIGs providing fair results.
        </p>
      </div>
      <div class="margin-right"></div>
    </div>
    <!-- * -->
    <div class="grid-container">
      <div class="margin-left"></div>
      <div class="center-block">
        <p class="left">
          Proponents of <span class="bold">poverty reduction,</span> for
          example, focus on the aspect of introducing an income floor that no
          one would have to fall below.
        </p>
      </div>
      <div class="margin-right"></div>
    </div>
    <!-- * -->
    <div class="grid-container">
      <div class="margin-left"></div>
      <div class="center-block">
        <p class="left">
          The unconditional character of a UIG would make means-testing obsolete
          which seems favorable from a
          <span class="bold">privacy advocacy</span> perspective.
        </p>
      </div>
      <div class="margin-right"></div>
    </div>
    <!-- * -->
    <div class="grid-container">
      <div class="margin-left"></div>
      <div class="center-block">
        <p class="right">
          People who agree that the
          <span class="bold">government influence</span> on private matters
          should be <span class="bold">small when possible</span> might also
          agree that it is a <span class="bold">recipients choice</span> how to
          spend it in the most useful way instead of limiting their options, for
          example with the restrictions like in the case of SNAP
          <span class="italic">(food stamps).</span>
        </p>
      </div>
      <div class="margin-right"></div>
    </div>
    <!-- * -->
    <div class="grid-container">
      <div class="margin-left"></div>
      <div class="center-block">
        <p class="right">
          A UIG plan also touches on a belief that is deeply rooted in current
          welfare implementations. The
          <span class="bold"
            >notion that a welfare design has to determine who needs assistance
            and who does not.</span
          >
          An unconditional transfer conceptually doesn’t make this distinction.
          While for proponents of a UIG this is a significant advantage, making
          the transfer a citizen’s right, this point might be the most
          controversial one in the discussions around the idea.
        </p>
      </div>
      <div class="margin-right"></div>
    </div>
    <!-- * -->
    <div class="grid-container">
      <div class="margin-left"></div>
      <div class="center-block">
        <p class="left">
          The question of need can also be rephrased: Who deserves assistance
          and who does not? Even people who do not work right now? Some
          advocates for UIGs welcome this debate hoping that it might open the
          door to <span class="bold">rethink what work means</span> and if all
          work that is done in a society is actually accounted for with fair
          compensation. In this regard, it is often highlighted that an unequal
          share of work in the domestic realm could be compensated with a UIG
          having positive effects on gender equality.
        </p>
      </div>
      <div class="margin-right"></div>
    </div>
    <!-- * -->
    <div class="grid-container">
      <div class="margin-left"></div>
      <div class="center-block">
        <p class="left">
          Other authors emphasize the thought that in our work today, we all
          rely to a large extent on the work that was done by someone else
          before us. The large share of our current productivity is possible due
          to
          <span class="bold">knowledge created by earlier generations,</span>
          the efficiency created by the institutions we work in and not the
          least technological advancements that became part of the Commons.
          These authors suggest that it would be fair, to share more of this
          <span class="bold">inherited productivity.</span>
        </p>
      </div>
      <div class="margin-right"></div>
    </div>
    <!-- * -->
    <div class="grid-container">
      <div class="margin-left"></div>
      <div class="center-block">
        <p class="left">
          To acknowledge and account for historic economic injustice The
          Movement for Black Lives regards a minimum guaranteed income with an
          additional amount for Black Americans over a specified amount of time
          as <span class="bold">an adequate form of reparations.</span>
        </p>
      </div>
      <div class="margin-right"></div>
    </div>
    <!-- * -->
    <div class="grid-container">
      <div class="margin-left"></div>
      <div class="center-block">
        <p class="left">
          In the next section we will look at the nuances and challenges of a practical implementation. It’s important
          to look at how a UIG would affect incomes and check if the result matches the fairness expectations.
        </p>
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
    <!-- * Template * -->
    <div class="grid-container">
      <div class="margin-left"></div>
      <div class="center-block"><div class="spacer-small"></div></div>
      <div class="margin-right"></div>
    </div>
  </div>
</template>

<script>
// import graphSide from "../components/graphSide.vue";
import arrowIcon from "../../public/assets/svg/arrow.svg";
export default {
  name: "fairnessSubsection",
  components: { arrowIcon },
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
