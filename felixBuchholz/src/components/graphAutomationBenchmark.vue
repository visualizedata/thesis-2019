<template>
  <div class="grid-container">
    <div class="margin-left"></div>
    <div class="center-block">
      <div class="center-graph-container">
        <div class="right">
          <div>
            <h6 class="sans bold unhug-top-small hug-bottom">
              Comparison of influences on the employment rate (1993 – 2007) 
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
                  :x="scale.x(e.val)"
                  :y="scale.y(e.band)"
                  :height="scale.y.bandwidth()"
                  :width="width-scale.x(e.val)"
                  :fill="i == 0 ? 'rgba(87,176,234,1)' : 'rgba(255, 138, 24,1)' "
                  :key="i"
                />
                <text v-for="(e, i) in data"
                  text-anchor="end"
                  alignment-baseline="middle"
                  :x="width-10"
                  :y="scale.y(e.band) + scale.y.bandwidth()/2"
                  fill="#fff"
                  font-weight="900"
                >
                  {{ e.band }}
                </text>
                <!-- <path
              fill="none"
              stroke="rgba(87,176,234,1)"
              stroke-width="2"
              :d="d"
            /> -->
                <g :transform="`translate(${width}, ${0})`">
                  <text x="10" :y="height + 5" text-anchor="end" class="sidegraph-axis">
                    <tspan x="0" dy="16">Influence on</tspan>
                    <tspan x="0" dy="16">Employment</tspan>
                  </text>
                </g>
                <g class="sidegraph-axis" v-axis:x="scale"></g>
                <text :x="width" text-anchor="end" y="-30" class="sidegraph-axis">
                  Decrease in Employment Rate, Percentage Points
                </text>
                <g class="sidegraph-axis" v-axis:y="scale" :transform="`translate(${width}, ${0})`"></g>
              </g>
            </svg>
          </div>
        </div>
      </div>
    </div>
    <div class="margin-right">
      <div class="note unhug-top-small">
        Source: <br />
        Acemoglu, D., & Restrepo, P. (2017). 
        <a
          class="sans"
          href="https://www.nber.org/papers/w23285.pdf"
        >
          Robots and Jobs: Evidence from US Labor Markets.
        </a>
        Cambridge: National Bureau Of Economcic Research, p. 26
      </div>
    </div>
  </div>
</template>

<script>
import * as d3 from "d3";
export default {
  name: "graphAutomationBenchmark",
  props: {
    msg: String
  },
  data() {
    return {
      svgHeight: 180,
      svgWidth: 200,
      margin: { top: 40, left: 10, bottom: 60, right: 25 },
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
      d3.json("data/automation-benchmark.json").then(d => {
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
        .domain([0, -1])
        .rangeRound([this.width, 0]);
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
              // .ticks(3)
          )
          .selectAll(".tick")
          .style("display", "none")
          // .select("text")
          // .style("font-weight", "900")
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

.ytick {
  visibility: hidden;
}

</style>
