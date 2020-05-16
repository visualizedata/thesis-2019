<template>
  <div class="grid-container">
    <div class="margin-left"></div>
    <div class="center-block">
      <div class="chart sans">
        <h5 class="sans hug-bottom" id="graph-ideal-ubi">
          Ideal income progression with a UIG scheme <br />
          for a household with two adults and one child
        </h5>
        $ 12.000 per adult, $ 6.000 per child, 50 % marginal tax rate
        <svg
          class="unhug-top"
          :width="svgWidth"
          :height="svgHeight"
          id="incomedistribution"
        >
          <g :transform="`translate(${margin.left}, ${margin.top})`">
            <!-- Credit grid-lines: Andrew Levinson
                  https://github.com/AndrewLevinson/thesis/blob/master/src/components/ChartOne.vue
              -->
            <g>
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
            </g>
            <g>
              <g v-grid:y="scale" class="grid-lines"></g>
            </g>
            <path
              stroke-width="1"
              fill="none"
              stroke="currentColor"
              :d="pathIncomePolygon.stroke"
            ></path>
            <!-- **** Income *** -->
            <g id="incomeTriangle">
              <pattern
                :x="pathIncomePolygon.fill.pattern.x"
                :y="pathIncomePolygon.fill.pattern.y"
                height="1"
                width="1"
                patternUnits="objectBoundingBox"
                :viewBox="pathIncomePolygon.fill.pattern.viewBox"
                id="hachure"
              >
                <path
                  :d="pathIncomePolygon.fill.pattern.path.d"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="pathIncomePolygon.fill.pattern.path.strokeWidth"
                />
              </pattern>
              <path
                fill="url(#hachure)"
                stroke-width="1"
                stroke="currentColor"
                :d="pathIncomePolygon.fill.d"
              />
              <!-- old -->
              <!-- <polygon 
            fill="grey"
            :points="`0,${height} ${scale.x(60000)},${height} ${scale.x(60000)},${scale.y(60000)}`" /> -->
            </g>
            <!-- *** -->
            <!-- **** UIG *** -->
            <g id="uigTriangle">
              <pattern
                :x="pathUIGPolygon.fill.pattern.x"
                :y="pathUIGPolygon.fill.pattern.y"
                height="1"
                width="1"
                patternUnits="objectBoundingBox"
                :viewBox="pathUIGPolygon.fill.pattern.viewBox"
                id="cross-hatch"
              >
                <path
                  class="stroke-uig"
                  :d="pathUIGPolygon.fill.pattern.path.d"
                  fill="none"
                  stroke="currentColor"
                  :stroke-width="pathUIGPolygon.fill.pattern.path.strokeWidth"
                />
              </pattern>
              <path
                class="stroke-uig"
                fill="url(#cross-hatch)"
                stroke-width="1"
                stroke="currentColor"
                :d="pathUIGPolygon.fill.d"
              />
              <!-- old -->
              <!-- <polygon 
            fill="grey"
            :points="`0,${height} ${scale.x(60000)},${height} ${scale.x(60000)},${scale.y(60000)}`" /> -->
            </g>
            <line
              v-for="(e, i) in lines"
              :key="i"
              :x1="scale.x(60000)"
              :x2="scale.x(e[0])"
              :y1="scale.y(60000)"
              :y2="scale.y(e[1])"
              fill="none"
              stroke="rgba(140,140,140,1)"
              stroke-width="1"
            />
            <text
              :x="scale.x(65000)"
              :y="scale.y(60500)"
              fill="rgba(140,140,140,1)"
            >
              * Taxes after
            </text>
            <!-- *** -->
            <text
              class="graph-label-small"
              :transform="`translate(${width},${height + 40})`"
              text-anchor="end"
              fill="currentColor"
            >
              Income in $
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
              Income and UIG in $
            </text>
            <g v-axis:y="scale" class="y-axis"></g>
          </g>
        </svg>
      </div>
    </div>
    <div class="margin-right">
      <div class="simple-graph-legend margin-container sans small">
        <div class="border-top-with-note unhug-bottom-70">
          <p class="note-top-unhug">Legend:</p>
          <div class="simple-flex-center">
            <svg class="legend-space-after-svg" width="56" height="50">
              <g id="uigTriangleLegend">
                <pattern
                  :x="pathUIGPolygonLegend.fill.pattern.x"
                  :y="pathUIGPolygonLegend.fill.pattern.y"
                  height="1"
                  width="1"
                  patternUnits="objectBoundingBox"
                  :viewBox="pathUIGPolygonLegend.fill.pattern.viewBox"
                  id="cross-hatch-legend"
                >
                  <path
                    class="stroke-uig"
                    :d="pathUIGPolygonLegend.fill.pattern.path.d"
                    fill="none"
                    stroke="currentColor"
                    :stroke-width="
                      pathUIGPolygonLegend.fill.pattern.path.strokeWidth
                    "
                  />
                </pattern>
                <path
                  class="stroke-uig"
                  fill="url(#cross-hatch-legend)"
                  stroke-width="1"
                  stroke="currentColor"
                  d="M2,48 L2,2 L48,2 L2,48"
                />
                <!-- old -->
                <!-- <polygon 
            fill="grey"
            :points="`0,${height} ${scale.x(60000)},${height} ${scale.x(60000)},${scale.y(60000)}`" /> -->
              </g>
            </svg>
            <div class="color-uig">Universal income guarantee</div>
          </div>
          <div class="simple-flex-center unhug-top-tiny">
            <svg class="legend-space-after-svg" width="50" height="50">
              <g id="incomeTriangleLegend">
                <pattern
                  :x="pathIncomePolygonLegend.fill.pattern.x"
                  :y="pathIncomePolygonLegend.fill.pattern.y"
                  height="1"
                  width="1"
                  patternUnits="objectBoundingBox"
                  :viewBox="pathIncomePolygonLegend.fill.pattern.viewBox"
                  id="hachure-legend"
                >
                  <path
                    class="stroke-standard"
                    :d="pathIncomePolygonLegend.fill.pattern.path.d"
                    fill="none"
                    stroke="currentColor"
                    :stroke-width="
                      pathIncomePolygonLegend.fill.pattern.path.strokeWidth
                    "
                  />
                </pattern>
                <path
                  class="stroke-standard"
                  fill="url(#hachure-legend)"
                  stroke-width="1"
                  stroke="currentColor"
                  d="M2,48 L48,48 L48,2 L2,48"
                />
                <!-- old -->
                <!-- <polygon 
            fill="grey"
            :points="`0,${height} ${scale.x(60000)},${height} ${scale.x(60000)},${scale.y(60000)}`" /> -->
              </g>
            </svg>
            <div>Income</div>
          </div>
          <div class="simple-flex-center unhug-top-small">
            <div>* Taxes after: The tax rate after the break-even point can be different</div>
          </div>
          <!-- <a href="#graph-headline1"><p class="unhug-bottom-70 italic">Let’s see how this scheme would affect incomes in the US</p></a> -->
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
  name: "graphCenterNIT",
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
      isLoaded: false,
      lines: [[76000, 73500], [80000, 73500], [84000, 73500], [90000, 73500]]
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
    },
    pathIncomePolygonLegend() {
      const point1Array = [2, 48];
      const point2Array = [48, 48];
      const point3Array = [48, 2];
      const style = "income";

      return this.generateRoughPolygon(
        point1Array,
        point2Array,
        point3Array,
        style
      );
    },
    pathIncomePolygon() {
      const point1Array = [0, this.height];
      const point2Array = [this.scale.x(60000), this.height];
      const point3Array = [this.scale.x(60000), this.scale.y(60000)];
      const style = "income";

      return this.generateRoughPolygon(
        point1Array,
        point2Array,
        point3Array,
        style
      );
    },
    pathUIGPolygonLegend() {
      const point1Array = [2, 48];
      const point2Array = [2, 2];
      const point3Array = [48, 2];
      const style = "welfare";

      return this.generateRoughPolygon(
        point1Array,
        point2Array,
        point3Array,
        style
      );
    },
    pathUIGPolygon() {
      const point1Array = [0, this.height];
      const point2Array = [0, this.scale.y(30000)];
      const point3Array = [this.scale.x(60000), this.scale.y(60000)];
      const style = "welfare";

      return this.generateRoughPolygon(
        point1Array,
        point2Array,
        point3Array,
        style
      );
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
  created() {},
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
    generateRoughPolygon(point1Array, point2Array, point3Array, style) {
      let generator = rough.generator();
      let vertices = [point1Array, point2Array, point3Array];
      let roughness = 0.1;
      let fillWeight = 0.5;
      let hachureAngle = -(90 - 25);
      let hachureGap = 10;
      let fillStyle = "hachure";
      if (style == "welfare") {
        hachureAngle = -(90 + 25);
        hachureGap = 4.5;
        fillStyle = "cross-hatch";
      }
      let polygon = generator.polygon(vertices, {
        fill: "rgba(0,0,0,1)",
        stroke: "rgba(0,0,0,1)",
        roughness: roughness,
        fillWeight: fillWeight,
        hachureGap: hachureGap,
        hachureAngle: hachureAngle,
        fillStyle: fillStyle
      });
      let path = generator.toPaths(polygon);
      return { stroke: path[1].d, fill: path[0] };
    },
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
