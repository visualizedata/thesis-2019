<template>
  <div>
    <div v-for="(e, i) in innerHTML" class="grid-container" :key="i">
      <div class="margin-left" v-html="e.left"></div>
      <div class="center-block" v-html="e.center.trim()"></div>
      <div class="margin-left" v-html="e.right"></div>
    </div>
  </div>
</template>

<script>
import graphSide from "../components/graphSide.vue";
export default {
  name: "firstSection",
  components: {
    graphSide
  },
  props: {
    msg: String
  },
  data() {
    return {
      innerHTML: [
        {
          left: "",
          center: `<h2 class="hug-bottom" id="section1">
            <span class="italic">What</span> are we talking about, <br />
                when we talk about <br />
                <span class="italic">universal income guarantees?</span>
            </h2>
            <h6 class="subheadline">Current interest & uncertainties</h6>`,
          right: ""
        },
        {
          left: ``,
          center: `<p class="intro">
            Today political debates are polarized. A certain buzz-word can
            easily trigger a
            <span class="sans bold color-primary"
              ><a href="https://twitter.com/hashtag/socialism?lang=en"
                >#socialism</a
              ></span
            >-uproar or similar types of reactions ending a conversation.
            Peculiarly the idea of an income guarantee seems to gain traction
            with
            <span class="bold">the potential to bridge these poles.</span>
            </p>`,
          right: `<graphSide />`
        },
        {
          left: ``,
          center: `<p class="left">
              Broadly speaking this idea is to introduce a program that
              <span class="bold">guarantees</span> a
              <span class="bold">certain amount of income to everyone.</span> Let’s
              use the term
              <span class="bold">Universal Income Guarantees (UIGs)</span>
              to refer to this broad notion.
            </p>`,
          right: ``
        },
        {
          left: ``,
          center: `<p class="right">
              Although the idea is not entirely new, it hasn’t yet risen to the
              level of a fixed plan. Hence, it comes in considerable variations and
              with different labels.
            </p>`,
          right: `<p class="note">
              Names include: (Universal) Basic Income, Mincome, Negative Income Tax,
              Freedom Dividend … and many more
            </p>`
        },
        {
          left: ``,
          center: `<p class="left">Advocates for UIGs tend to have very different 
            political visions and thus their proposals probably have divergent outcomes. 
            Overall UIGS are <span class="bold">still searching for a home on the political compass.</span></p>`,
          right: ``
        },
        {
          left: ``,
          center: ``,
          right: ``
        },
        {
          left: ``,
          center: `<p class="right">The number of variations and <span class="bold">uncertainties</span>
            are definitely part of the difficulty to decide whether a UIG is actually 
            a good or a bad idea.</p>`,
          right: ``
        },
        {
          left: ``,
          center: `<p class="left">But they are also an <span class="bold">opportunity</span> to 
            decide which questions we want to see answered by specific proposals and be part 
            of shaping the debate.</p>`,
          right: ``
        },
        {
          left: ``,
          center: ``,
          right: ``
        }
      ]
    };
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
// @import "../assets/scss/color_defs.scss";
</style>
