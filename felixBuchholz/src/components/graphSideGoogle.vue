<template>
  <div class="sidegraph-container">
    <div>
      <h6 class="note-typo unhug-top-small hug-bottom regular">
        “Popularity” of the search term <br />
        <span class="bold">universal basic income</span> according to <br />
        Google Trends.
      </h6>
      <div class="source-note">
        <a
          class="sans"
          href="https://trends.google.com/trends/explore?date=all&geo=US&q=universal%20basic%20income"
          >Source</a
        >
      </div>
    </div>
    <div class="chart">
      <svg
        v-if="isLoaded"
        class="side-graph"
        :width="svgWidth"
        :height="svgHeight"
      >
        <g :transform="`translate(${margin.left}, ${margin.top})`">
          <!-- <rect
          v-for="(element, index) in dataComputed"
          :x="scale.x(element.date)"
          :y="scale.y(element.val)"
          width="1"
          :height="height - scale.y(element.val)"
          fill="rgba(0,0,0,0.1)"
          :key="index"
        /> -->
          <path
            fill="none"
            stroke="rgba(87,176,234,1)"
            stroke-width="2"
            :d="d"
          />
          <text :y="height + 45" :x="width - 30" class="sidegraph-axis">
            Years
          </text>
          <g
            class="sidegraph-axis"
            v-axis:x="scale"
            :transform="`translate(${0}, ${height})`"
          ></g>
          <text y="-10" :x="-margin.left" class="sidegraph-axis">
            Popularity
          </text>
          <g class="sidegraph-axis" v-axis:y="scale"></g>
        </g>
      </svg>
    </div>
  </div>
</template>

<script>
import * as d3 from "d3";
export default {
  name: "graphSide",
  props: {
    msg: String
  },
  data() {
    return {
      svgHeight: 160,
      svgWidth: 200,
      margin: { top: 20, left: 30, bottom: 55, right: 25 },
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
      d3.csv("data/google.csv").then(d => {
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
      // console.log(chartElement);
      const padding = parseInt(
        getComputedStyle(chartElement).padding.substring(0, 2)
      );
      // console.log(padding);
      const parentWidth = chartElement.getBoundingClientRect().width;
      this.svgWidth = parentWidth - 2 * padding;
      // // Fade
      // this.show = false;
      // setTimeout(() => {
      //   if (this.mouseDown == false) {
      //     this.show = true;
      //     this.computeAllPaths();
      //   }
      // }, 1000);
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
        .scaleTime()
        .domain([
          this.dataComputed[0].date,
          this.dataComputed[this.dataComputed.length - 1].date
        ])
        .range([0, this.width]);
      const y = d3
        .scaleLinear()
        .domain([0, Math.max(...this.data.map(x => x.val))])
        .rangeRound([this.height, 0]);
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
      const axisMethod = { x: "axisBottom", y: "axisLeft" }[axis];
      const methodArg = binding.value[axis];
      if (binding.arg == "y") {
        d3.select(el)
          .call(
            d3[axisMethod](methodArg)
              .tickFormat(d3.format(",d"))
              .ticks(3)
          )
          .selectAll(".tick text")
          .classed("side-graph-text", true)
          .attr("transform", "rotate(-25)")
          .attr("text-anchor", "end");
      } else {
        d3.select(el)
          .call(d3[axisMethod](methodArg).ticks(d3.timeYear.every(3)))
          .selectAll(".tick text")
          .classed("side-graph-text", true)
          .attr("transform", "rotate(-25) translate(-2,4)")
          .attr("text-anchor", "end")
          .attr("alignment-baseline", "after-edge");
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
.source-note {
  position: absolute;
  margin-top: 158px;
  font-size: 1.2rem;
}
</style>
