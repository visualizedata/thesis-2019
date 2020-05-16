<template>
  <div class="grid-container">
    <div class="margin-left"></div>
    <div class="center-block">
      <div class="chart sans">
        <h5 class="sans hug-bottom" id="graph-welfare-trap">
          Uneven progression of benefits with growing income:
        </h5>
        Scenario: Single mother with two kids in Chicago

        <svg
          class="unhug-top"
          v-if="isLoaded"
          :width="svgWidth"
          :height="svgHeight"
          id="incomedistribution"
        >
          <g :transform="`translate(${margin.left}, ${margin.top})`">
            <!-- Credit grid-lines: Andrew Levinson
                  https://github.com/AndrewLevinson/thesis/blob/master/src/components/ChartOne.vue
              -->
            <g v-if="isLoaded">
              <g
                v-grid:x="scale"
                class="grid-lines"
                :transform="`translate(${0}, ${height})`"
              ></g>
              <line
                :x1="scale.x(0)"
                :x2="scale.x(75000)"
                :y1="scale.y(0)"
                :y2="scale.y(75000)"
                fill="none"
                stroke="rgba(140,140,140,1)"
                stroke-width="1"
                stroke-dasharray="2 2"
              />
              <text
                :x="scale.x(71000)"
                :y="scale.y(71500)"
                fill="rgba(140,140,140,1)"
                text-anchor="end"
              >
                1:1 reference
              </text>
              <line
                :x1="0"
                :x2="width"
                :y1="scale.y(63272)"
                :y2="scale.y(63272)"
                fill="none"
                stroke="rgba(140,140,140,1)"
                stroke-width="1"
                stroke-dasharray="2 2"
              />
              <text
                :x="scale.x(40000)"
                :y="scale.y(63272) - 5"
                fill="rgba(140,140,140,1)"
                text-anchor="start"
              >
                break-even line
              </text>
            </g>
            <g v-if="isLoaded">
              <g v-grid:y="scale" class="grid-lines"></g>
            </g>
            <g
              v-for="(e, i) in data"
              :key="i"
              :id="`gross-income-${e.grossIncome}`"
            >
              <rect
                :key="`sum${e.sumIncomeAndBenefits}${i}`"
                :x="scale.x(e.grossIncome) - 4"
                :y="scale.y(e.sumIncomeAndBenefits)"
                :width="8"
                :height="height - scale.y(e.sumIncomeAndBenefits)"
                opacity="1"
                fill="rgba(87,176,234,1)"
                :id="e.id"
              />
              <rect
                :key="`netIncome${e.netIncome}${i}`"
                :x="scale.x(e.grossIncome) - 4"
                :y="scale.y(e.netIncome)"
                :width="8"
                :height="height - scale.y(e.netIncome)"
                opacity="1"
                fill="rgba(100,100,100,1)"
                :id="e.id"
              />
              <g
                :transform="
                  `translate(${scale.x(e.grossIncome)},${scale.y(
                    e.sumIncomeAndBenefits
                  ) - 10})`
                "
              >
                <!-- v-if="i > 0" -->
                <text text-anchor="middle">$ {{ e.wageHourly }}</text>
              </g>
            </g>
            <!-- <g v-for="(f, j) in e.positions" :key="`${i}${f.name}`">
                  <rect
                    v-show="show"
                    :key="`${i}${e.name}`"
                    :x="scale.x(e.bin)"
                    :y="0"
                    :width="scale.x.bandwidth()"
                    :height="height"
                    opacity="0"
                    fill="red"
                    :id="e.id"
                  ></rect>
          </g> -->
          <text
              class="graph-label-small"
              :transform="`translate(${width},${height + 40})`"
              text-anchor="end"
              fill="currentColor"
            >
              Income before taxes in $
            </text>
            <g
              v-axis:x="scale"
              :transform="`translate(${0}, ${height})`"
              class="x-axis"
            ></g>
            <text
              class="graph-label-small"
              :transform="`translate(${0},-10)`"
              text-anchor="start"
              fill="currentColor"
            >
              Net income and benefits in $
            </text>
            <g v-axis:y="scale" class="y-axis"></g>
          </g>
        </svg>
      </div>
    </div>
    <div class="margin-right">
      <div class="simple-graph-legend margin-container sans small">
        <div class="border-top-with-note">
          <p class="note-top-unhug">Legend:</p>
          <div class="simple-flex-center">
            <div
              style="width:8px;height:38px;background:rgba(87,176,234,1);margin-right:16px;"
            ></div>
            <div>Sum of income after taxes and benefits</div>
          </div>
          <div class="simple-flex-center unhug-top-tiny">
            <div
              style="width:8px;height:38px;background:rgba(100,100,100,1);margin-right:16px;"
            ></div>
            <div>Income after taxes</div>
          </div>
          <p>
            Numbers: hourly wage to reach the gross income when working 40
            h/week
          </p>
          <p class="unhug-bottom-70 italic">Source: <br>
            Randolph, E. (2014). <a href="https://files.illinoispolicy.org/wp-content/uploads/2014/12/Welfare_Report_finalfinal.pdf">Modeling Potential Income and Welfare- Assistance Benefits in Illinois.</a> Chicago: Illinois Policy Institute.
          </p>
        </div>
      </div>
    </div>
  </div>
  <!-- ***************************************************************************************** -->
</template>
<script>
// *********************************************************************************************
import * as d3 from "d3";
import { rough } from "../assets/lib/rough.js";
import zoomIcon from "../../public/assets/svg/zoom_s.svg";
import "intersection-observer"; // for cross-browser support
import Scrollama from "vue-scrollama";

export default {
  name: "graphCenterWelfareTrap",
  components: {
    zoomIcon,
    Scrollama
  },
  props: {
    msg: String
  },
  data() {
    return {
      data: [],
      positionsArray: [],
      totalMax: 0,
      svgWidth: 400,
      svgHeight: 700,
      margin: { top: 30, left: 40, bottom: 70, right: 30 },
      show: true,
      mouseDown: false,
      isLoaded: false
    };
  },
  computed: {
    width() {
      return this.svgWidth - this.margin.left - this.margin.right;
    },
    height() {
      return this.svgHeight - this.margin.top - this.margin.bottom;
    },
    scale() {
      const x = d3
        .scaleLinear()
        .domain([0, 80000])
        .rangeRound([0, this.width]);
      const y = d3
        .scaleLinear()
        .domain([0, 70000])
        .rangeRound([this.height, 0]);
      const gridLineX = d3
        .scaleLinear()
        .domain([0, 80000])
        .rangeRound([0, this.width]);
      const gridLineY = d3
        .scaleLinear()
        .domain([0, 70000])
        .rangeRound([this.height, 0]);
      return { x, y, gridLineX, gridLineY };
    }
  },
  watch: {
    tooltip() {
      // console.log("tooltip has changed");
    },
    width() {
      // console.log("width has changed");
    }
  },
  created() {
    this.loadData();
  },
  mounted() {
    this.onResize();
    let w = window.innerWidth;
    let h = window.innerHeight;
    window.addEventListener("resize", this.onResize);
    window.onmousedown = () => {
      this.mouseDown = true;
    };
    window.onmouseup = () => {
      this.mouseDown = false;
    };
  },
  updated() {
    // useful but not for what I thought
  },
  methods: {
    loadData() {
      d3.csv("data/chicago-welfare.csv").then(d => {
        const data = d.map(x => {
          return {
            grossIncome: parseInt(x.grossIncome),
            netIncome: parseInt(x.netIncome),
            sumIncomeAndBenefits: parseInt(x.sumIncomeAndBenefits),
            wageHourly: parseInt(x.wageHourly)
          };
        });
        // console.log(data);
        this.data = data;
        // console.log(this.data);
        this.doAfterDataIsLoaded();
      });
    },
    doAfterDataIsLoaded() {
      this.isLoaded = true;
    },
    computeDataOnlyOnce() {},
    computeData() {},
    // eslint-disable-next-line no-unused-vars
    onResize(event) {
      const chartElement = this.$el.querySelectorAll(".chart")[0];
      const padding = parseInt(
        getComputedStyle(chartElement).padding.substring(0, 2)
      );
      // console.log(padding);
      const parentWidth = chartElement.getBoundingClientRect().width;
      this.svgWidth = parentWidth - 2 * padding;
      // Fade
      this.show = false;
      setTimeout(() => {
        if (this.mouseDown == false) {
          this.show = true;
          // this.computeAllPaths();
        }
      }, 600); // was 1000
    },
    // This is just to test the modal event, might not be that important
    // eslint-disable-next-line no-unused-vars
    onChange(event) {}
  },
  directives: {
    // eslint-disable-next-line no-unused-vars
    axis(el, binding, update) {
      // console.log(update);
      const axis = binding.arg; // x or y
      const axisMethod = { x: "axisBottom", y: "axisLeft" }[axis];
      let methodArg = binding.value[axis];
      if (binding.arg == "y") {
        d3.select(el)
          .call(
            d3[axisMethod](methodArg)
              // alternative:
              //.tickFormat(d3.format(",d"))
              .tickFormat(d3.format(".2s"))
              .ticks(15)
          )
          .selectAll(".tick text")
          // .attr("transform", "rotate(-25)")
          .attr("text-anchor", "end");
      } else {
        // let self = this;
        // x-axis
        d3.select(el)
          .call(d3[axisMethod](methodArg).tickFormat(d3.format(".2s")))
          .selectAll(".tick text")
          // .attr("transform", "rotate(-25) translate(-2,4)")
          .attr("text-anchor", "middle");
        // .attr("alignment-baseline", "after-edge");
      }
    },
    grid(el, binding) {
      const axis = binding.arg; // x or y
      const axisMethod = { x: "axisBottom", y: "axisLeft" }[axis];
      let methodArg = binding.value[axis];
      if (binding.arg == "y") {
        d3.select(el).call(
          d3[axisMethod](methodArg)
            .tickFormat("")
            // Fix for actual width
            .tickSize(-1000)
            .ticks(6)
        );
      } else {
        // let self = this;
        // x-axis
        d3.select(el).call(
          d3[axisMethod](methodArg)
            .tickFormat("")
            // Fix for actual width
            .tickSize(-1000)
            .ticks(8)
        );
      }
    }
  },
  beforeDestroy() {
    // Unregister the event listener before destroying this Vue instance
    window.removeEventListener("resize", this.onResize);
  }
};
</script>
<style src="vue-scrollama/dist/vue-scrollama.css"></style>
<style scoped lang="scss"></style>
