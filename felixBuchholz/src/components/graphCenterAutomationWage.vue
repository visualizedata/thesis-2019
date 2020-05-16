<template>
  <div class="grid-container">
    <div class="margin-left"></div>
    <div class="center-block">
      <div class="center-graph-container">
        <div>
          <h6 class="sans bold unhug-top-small hug-bottom">
            Share of Jobs with high probability of automation, by occupation's
            median hourly wage
          </h6>
        </div>
        <div class="chart">
          <svg
            v-if="isLoaded"
            class="center-graph"
            :width="svgWidth"
            :height="svgHeight"
          >
            <g :transform="`translate(${margin.left}, ${margin.top})`">
              <rect
                v-for="(e, i) in data"
                :y="scale.y(e.band)"
                :height="scale.y.bandwidth()"
                :width="scale.x(e.val)"
                fill="rgba(87,176,234,1)"
                :key="i"
              />
              <!-- <path
            fill="none"
            stroke="rgba(87,176,234,1)"
            stroke-width="2"
            :d="d"
          /> -->
              <text :y="height + 5" text-anchor="end" class="sidegraph-axis">
                <tspan x="0" dy="16">Median</tspan>
                <tspan x="0" dy="16">hourly</tspan>
                <tspan x="0" dy="16">wage</tspan>
              </text>
              <g class="sidegraph-axis" v-axis:x="scale"></g>
              <text y="-30" class="sidegraph-axis">
                Median Probability of Automation, Percent
              </text>
              <g class="sidegraph-axis" v-axis:y="scale"></g>
            </g>
          </svg>
        </div>
      </div>
    </div>
    <div class="margin-right">
      <div class="note unhug-top-small">
        Source: <br />
        Executive Office of the President. (2016).
        <a
          class="sans"
          href="https://obamawhitehouse.archives.gov/sites/whitehouse.gov/files/documents/Artificial-Intelligence-Automation-Economy.PDF"
        >
          Artificial Intelligence, Automation, and the Economy,
        </a>
        Washington, D.C.
      </div>
    </div>
  </div>
</template>

<script>
import * as d3 from "d3";
export default {
  name: "graphCenterAutomationWage",
  props: {
    msg: String
  },
  data() {
    return {
      svgHeight: 160,
      svgWidth: 200,
      margin: { top: 40, left: 70, bottom: 60, right: 25 },
      data: [],
      isLoaded: false
    };
  },
  created() {
    this.loadData();
  },
  mounted() {
    this.onResize();
    window.addEventListener("resize", this.onResize);
  },
  methods: {
    loadData() {
      d3.json("data/automation-wage.json").then(d => {
        // console.log(JSON.stringify(d));
        // console.log(d);
        this.data = d;
        this.isLoaded = true;
      });
    },
    parseTime(dateString) {
      const parseTime = d3.timeParse("%Y-%m");
      return parseTime(dateString);
    },
    onResize() {
      // console.log("window has been resized");
      // console.log(this.$el);
      const chartElement = this.$el.querySelectorAll(".chart")[0];
      const padding = parseInt(
        getComputedStyle(chartElement).padding.substring(0, 2)
      );
      const parentWidth = chartElement.getBoundingClientRect().width;
      this.svgWidth = parentWidth - 2 * padding;
    }
  },
  computed: {
    width() {
      return this.svgWidth - this.margin.left - this.margin.right;
    },
    height() {
      return this.svgHeight - this.margin.top - this.margin.bottom;
    },
    dataComputed() {
      let dataComputed = this.data.map(x => {
        return { date: this.parseTime(x.date), val: x.val };
      });
      return dataComputed;
    },
    scale() {
      const x = d3
        .scaleLinear()
        .domain([0, 100])
        .rangeRound([0, this.width]);
      const y = d3
        .scaleBand()
        .domain(this.data.map(x => x.band))
        .rangeRound([0, this.height])
        .padding(0.2);
      return { x, y };
    },
    d() {
      const lineGenerator = d3
        .line()
        .x(d => this.scale.x(d.date))
        .y(d => this.scale.y(d.val));
      return lineGenerator(this.dataComputed);
    }
  },
  directives: {
    axis(el, binding) {
      const axis = binding.arg; // x or y
      const axisMethod = { x: "axisTop", y: "axisLeft" }[axis];
      const methodArg = binding.value[axis];
      if (binding.arg == "y") {
        d3.select(el)
          .call(
            d3[axisMethod](methodArg)
              // .tickFormat(d3.format(",d"))
              .ticks(3)
          )
          .selectAll(".tick text")
          .classed("side-graph-text", true);
        // .attr("transform", "rotate(-25)")
        // .attr("text-anchor", "end");
      } else {
        d3.select(el)
          .call(d3[axisMethod](methodArg))
          .selectAll(".tick text")
          .classed("side-graph-text", true);
        // .attr("transform", "rotate(-25) translate(-2,4)")
        // .attr("text-anchor", "start")
        // .attr("alignment-baseline", "after-edge");
      }
    }
  },
  beforeDestroy() {
    // Unregister the event listener before destroying this Vue instance
    window.removeEventListener("resize", this.onResize);
  }
};
</script>

<style scoped lang="scss">
@import "../assets/scss/color_defs";
.h6-unhug {
  text-align: right;
  position: relative;
  padding-right: 16px;
  margin-top: -2rem;
  font-size: 1.2rem;
}
</style>
