<template>
  <div>
    <svg class="cost-chart" ref="cost"></svg>
    <div class="internal-medicine description">
      Doctors working in
      <span class="selected-medicine dropdown-container">
        <b-nav-item-dropdown :text="selectedMed" right>
            <b-dropdown-item href="#" :key="index"
                v-on:click="selectMedicine(med)"
                v-for="(med, index) of internalMeds" >
                {{med}}
            </b-dropdown-item>
        </b-nav-item-dropdown>
      </span>
      in
      <span class="selected-state dropdown-container">
        <b-nav-item-dropdown :text="selectedState.name" right>
          <b-dropdown-item href="#" :key="index"
              v-on:click="selectState(state)"
              v-for="(state, index) of states">
              {{state.name}}
          </b-dropdown-item>
        </b-nav-item-dropdown>
      </span>
      allocate
      <span class="cost-value">
        {{costValue}}
      </span>
      on opioids in year
      <span class="selected-year dropdown-container">
        <b-nav-item-dropdown :text="year.toString()" right>
          <b-dropdown-item href="#" :key="index"
              v-on:click="selectYear(y)"
              v-for="(y, index) of years">
              {{y}}
          </b-dropdown-item>
        </b-nav-item-dropdown>
      </span>
    </div>
  </div>
</template>

<script>
// external libraries
import * as d3 from 'd3'
import * as _ from 'lodash'

// read chart data
import data_2013 from '@/assets/data/2013.json'
import data_2014 from '@/assets/data/2014.json'
import data_2015 from '@/assets/data/2015.json'
import data_2016 from '@/assets/data/2016.json'

import STATES from '@/assets/states.json'

// init chart constants
const WIDTH = 1250
const HEIGHT = 800
const MARGIN = {
  top: 20,
  bottom: 100,
  left: 100,
  right: 20
}
const SUB_HEADING_SHIFT = 300
const HEADING_SHIFT = 100
const headingWidth = WIDTH / 2 - 300
const heading = 'What is it Costing the United States?'
const DATA = {
  2013: data_2013,
  2014: data_2014,
  2015: data_2015,
  2016: data_2016
}
const INITYEAR = 2013
const DATA_RANGE = 45
const YEARS = _.range(2013, 2017)

// chart vue code
export default {
  name: 'CostChart',
  data: () => {
    return {
      year: INITYEAR,
      years: YEARS,
      data: [],
      internalMeds: [],
      states: [],
      selectedMed: '',
      selectedState: {},
      svgElement: '',
      svg: '',
      chartg: '',
      width: WIDTH - MARGIN.left - MARGIN.right,
      height: HEIGHT - MARGIN.top - MARGIN.bottom,
      rscale_drug_cost: '',
      rscale_opioid_cost: '',
      yearScale: '',
      centerx: '',
      centery: '',
      costValue: '',
      randomRadii: _.range(10, 200, 30),
      textFormat: d3.format('$,.0f')
    }
  },
  mounted() {
      this.changeYearData();
      this.svgElement = this.$refs.cost;
      this.initChart();
      this.drawChart();
      // this.addYearAxis();
  },
  methods: {
    initChart: function() {
      this.svg = d3.select(this.svgElement)
        .attr('width', WIDTH)
        .attr('height', HEIGHT)

      this.centerx = this.width / 2 + 60;
      this.centery = (this.height + SUB_HEADING_SHIFT)/2;

      this.costValue = this.textFormat(0);

      const defs = this.svg.append('defs');
      const clip_total_cost = defs.append('clipPath')
        .attr('id', 'clip-path-total-cost');
      clip_total_cost.append('rect')
        .attr('x', 0)
        .attr('y', 0)
        .attr('width', this.centerx)
        .attr('height', this.centery + 200 + 10)

      const clip_opioid = defs.append('clipPath')
        .attr('id', 'clip-path-opioid');
      clip_opioid.append('rect')
        .attr('x', this.centerx)
        .attr('y', 0)
        .attr('width', this.centerx)
        .attr('height', this.centery + 200 + 10)

      // chart heading
      this.svg.append('text')
        .classed('cost-chart-heading heading', true)
        .attr('x', headingWidth - 30)
        .attr('y', HEADING_SHIFT)
        .text(heading);

      // y scale. shift height due to heading and sub heading
      this.rscale_drug_cost = d3.scaleLinear()
        .range([20, 200]);

      this.rscale_opioid_cost = d3.scaleLinear()
        .range([20, 200]);

      this.yearScale = d3.scalePoint()
        .range([0.2 * this.width, 0.8 * this.width])
        .domain(YEARS)
    },
    addYearAxis() {
      const axis = d3.axisBottom(this.yearScale);
      const g = this.svg.append('g')
        .attr('class', 'cost-year-axis axis')
        .attr('transform', `translate(60, ${this.height + 50})`)
        .call(axis)

      g.append("text")
        .attr("y", 50)
        .attr("x", 0.5 * this.width)
        .attr('class', 'axis-label')
        .text("Year");

      const self = this;

      d3.selectAll('.cost-year-axis .tick text')
        .classed('highlighted', function(d) {
          const year = +d3.select(this).text();
          if(year === INITYEAR) {
            return true
          } else {
            return false
          }
        })
        .on('click', function(d) {
          self.year = +d3.select(this).text();
          d3.selectAll('.cost-year-axis .tick text').classed('highlighted', false)
          d3.select(this).classed('highlighted', true)
          self.changeYearData();
          self.drawChart();
        });
    },
    selectYear(y) {
      this.year = y;
      d3.selectAll('.cost-year-axis .tick text')
        .classed('highlighted', function(d) {
          const year = +d3.select(this).text();
          return year === y ? true : false;
        });
      this.changeYearData();
      this.drawChart();
    },
    selectState(state) {
      this.selectedState = state; //{ state: state, name: STATES[state] };
      this.drawChart();
    },
    selectMedicine(med) {
      this.selectedMed = med;
      this.drawChart();
    },
    changeYearData() {
      this.data = DATA[this.year];
      const chainData = _.chain(this.data);

      this.internalMeds = chainData
          .map('specialty_description')
          .uniq()
          .concat('all fields')
          .sortBy()
          .value()

      this.states = chainData.map('nppes_provider_state').uniq()
        .concat('ALL')
        .sortBy()
        .map(state => {
          return { state: state, name: STATES[state] }
        })
        .value()

      if(_.keys(this.selectedState).length === 0)
        this.selectedState = this.states.filter(d => d.state === 'ALL')[0]
      if(this.selectedMed === '')
        this.selectedMed = this.internalMeds.filter(d => d === 'Internal Medicine')[0]

      const groupings = _.chain(this.data)
        .groupBy('specialty_description')
        .toPairs()
        .map(d => {
          const totalCostOfDrugs = _.reduce(d[1], (sum, val) => sum + (+val['total_drug_cost'] || 0), 0);
          const totalOpioidCost = _.reduce(d[1], (sum, val) => sum + (+val.opioid_drug_cost || 0) + (+val.la_opioid_drug_cost || 0), 0);
          return {
            specialty_description: d[0],
            totalCostOfDrugs,
            totalOpioidCost
          }
        })
        .sortBy(d => d.totalOpioidCost)
        .value();

      console.log(groupings);

    },
    filterData: function() {
    },
    drawTotalCostCircles: function(){
      const total_all_states = _.chain(this.data)
        .filter(d => d.specialty_description === this.selectedMed || this.selectedMed === 'all fields')
        .map(d => +d['total_drug_cost'] || 0)
        .reduce( (sum, d) => d + sum)
        .value();

      let total_selected_state = _.chain(this.data)
        .filter(d => {
            return (
              (
                (d.specialty_description === this.selectedMed) ||
                (this.selectedMed === 'all fields')
              ) &&
              ((d.nppes_provider_state === this.selectedState.state) ||
              (this.selectedState.state === 'ALL'))
            );
        });

      const total_branded = total_selected_state
        .map(d => +d['brand_drug_cost'] || 0)
        .reduce( (sum, d) => d + sum )
        .value() || 0;

      const total_generic = total_selected_state
        .map(d => +d['generic_drug_cost'] || 0)
        .reduce( (sum, d) => ((d || 0) + sum) )
        .value() || 0;

      total_selected_state = total_selected_state
        .map(d => +d['total_drug_cost'] || 0)
        .reduce( (sum, d) => d + sum)
        .value() || 0;

      this.rscale_drug_cost.domain([0, total_all_states])

      d3.select('.total-cost-circles').remove();

      const group = this.svg.append('g').attr('class', 'total-cost-circles description');

      const centerx = this.centerx;
      const centery = this.centery;

      group.append('circle')
        .attr('class', 'total-all-circle')
        .attr('clip-path', 'url(#clip-path-total-cost)')
        .attr('r', d => this.rscale_drug_cost(total_all_states))
        .attr('cx', centerx)
        .attr('cy', centery)

      group.append('circle')
        .attr('class', 'total-sel-circle')
        .attr('clip-path', 'url(#clip-path-total-cost)')
        .attr('r', d => {
          return total_selected_state === 0 ? 0 :
            this.rscale_drug_cost(total_selected_state);
        })
        .attr('cx', centerx)
        .attr('cy', centery)

      group.append('line')
        .attr('class', 'hor-line-total-cost')
        .attr('x1', this.centerx - 200)
        .attr('y1', this.centery)
        .attr('x2', this.centerx - 500 - 80)
        .attr('y2', this.centery)
        .style('stroke', '#fff')
        .style('stroke-width', '2px');

      group.append('text')
        .attr('x', this.centerx - 500 - 80)
        .attr('y', this.centery - 50)
        .attr('class', 'circle-text')
        .text(this.textFormat(total_selected_state));

      group.append('text')
        .attr('x', this.centerx - 500 - 80)
        .attr('y', this.centery - 20)
        .attr('class', 'circle-text-general')
        .text('Total Cost of Drugs in Internal Medicine');

      group.append('text')
        .attr('x', this.centerx - 500 - 80)
        .attr('y', this.centery + 30)
        .attr('class', 'circle-text-general')
        .text(`Total Branded Drug Costs: ${this.textFormat(total_branded)}`);

      group.append('text')
        .attr('x', this.centerx - 500 - 80)
        .attr('y', this.centery + 60)
        .attr('class', 'circle-text-general')
        .text(`Total Generic Drug Costs: ${this.textFormat(total_generic)}`);

      d3.selectAll('.random-circles .circle-ring')
          .classed('colored-circle', d => {
            if(d <= this.rscale_drug_cost(total_selected_state)) {
              return true;
            } else {
              return false;
            }
          });
    },
    drawOpioidCircles: function() {
      const total_all_states_opioid = _.chain(this.data)
        .filter(d => d.specialty_description === this.selectedMed || this.selectedMed === 'all fields')
        .map(d => {
          return (+d.opioid_drug_cost || 0) + (+d.la_opioid_drug_cost || 0)
        })
        .reduce( (sum, d) => d + sum)
        .value();

      let total_selected_state_opioid = _.chain(this.data)
        .filter(d => {
            return (
              (
                (d.specialty_description === this.selectedMed) ||
                (this.selectedMed === 'all fields')
              ) &&
              ((d.nppes_provider_state === this.selectedState.state) ||
              (this.selectedState.state === 'ALL'))
            );
        });

      const total_opioid_drug_cost = total_selected_state_opioid
        .map(d => (+d.opioid_drug_cost || 0))
        .reduce( (sum, d) => d + sum)
        .value() || 0;

      const total_la_opioid_drug_cost = total_selected_state_opioid
        .map(d => (+d.la_opioid_drug_cost || 0))
        .reduce( (sum, d) => d + sum)
        .value() || 0;


      total_selected_state_opioid = total_selected_state_opioid
        .map(d => {
          return (+d.opioid_drug_cost || 0) + (+d.la_opioid_drug_cost || 0)
        })
        .reduce( (sum, d) => d + sum)
        .value() || 0;

      this.costValue = this.textFormat(total_selected_state_opioid);

      this.rscale_opioid_cost.domain([0, total_all_states_opioid])

      const centerx = this.centerx;
      const centery = this.centery;

      d3.select('.opioid-circles').remove();

      const group = this.svg.append('g').attr('class', 'opioid-circles description');

      group.append('circle')
        .attr('class', 'total-all-circle')
        .attr('clip-path', 'url(#clip-path-opioid)')
        .attr('r', d => this.rscale_opioid_cost(total_all_states_opioid))
        .attr('cx', centerx)
        .attr('cy', centery)

      group.append('circle')
        .attr('class', 'total-sel-circle')
        .attr('clip-path', 'url(#clip-path-opioid)')
        .attr('r', d => {
          return total_selected_state_opioid === 0 ? 0 :
            this.rscale_opioid_cost(total_selected_state_opioid);
        })
        .attr('cx', centerx)
        .attr('cy', centery)

      group.append('line')
        .attr('class', 'hor-line-opioid')
        .attr('x1', this.centerx + 200)
        .attr('y1', this.centery)
        .attr('x2', WIDTH)
        .attr('y2', this.centery)
        .style('stroke', '#fff')
        .style('stroke-width', '2px');

      group.append('text')
        .attr('x', this.centerx + 500)
        .attr('dx', 0)
        .attr('y', this.centery - 50)
        .attr('class', 'circle-text')
        .text(this.textFormat(total_selected_state_opioid));

      group.append('text')
        .attr('x', this.centerx + 500)
        .attr('dx', -200)
        .attr('y', this.centery - 20)
        .attr('class', 'circle-text-general')
        .text('Total cost of drugs spent on opiods');

      group.append('text')
        .attr('x', this.centerx + 500)
        .attr('dx', -180)
        .attr('y', this.centery + 30)
        .attr('class', 'circle-text-general')
        .text(`Total Opioid Drug Costs: ${this.textFormat(total_opioid_drug_cost)}`);

      group.append('text')
        .attr('x', this.centerx + 500)
        .attr('dx', -295)
        .attr('y', this.centery + 60)
        .attr('class', 'circle-text-general')
        .text(`Total Long Acting Opioid Drug Costs: ${this.textFormat(total_la_opioid_drug_cost)}`);

      d3.selectAll('.random-circles .circle-ring')
          .classed('colored-circle', d => {
            if(d <= this.rscale_opioid_cost(total_selected_state_opioid)) {
              return true;
            } else {
              return false;
            }
          });
    },
    drawRandomCircles: function() {
      d3.select('.random-circles').remove();
      const group = this.svg.append('g').attr('class', 'random-circles');

      const gdata = group.selectAll('circle')
                .data(this.randomRadii);

      gdata.enter()
        .append('circle')
        .attr('class', 'circle-ring')
        .attr('r', d => d)
        .attr('cx', this.centerx)
        .attr('cy', this.centery)
    },
    drawChart: function() {
      // const data = this.filterData()
      const numFormat = d3.format('.0%');

      this.drawRandomCircles();
      this.drawTotalCostCircles();
      this.drawOpioidCircles();

      d3.select('.circle-split-line').remove();
      this.svg.append('line')
        .attr('class', 'circle-split-line')
        .attr('x1', this.centerx)
        .attr('y1', this.centery - 210)
        .attr('x2', this.centerx)
        .attr('y2', this.centery + 210)
        .style('stroke', '#000')
        .style('stroke-width', '5px');

    }
  }
}
</script>

<style lang="scss">
  .axis {
    .tick {
      line { stroke: #fff; }
      text {
        fill: #fff;
        cursor: pointer;
        font-size: 12px;
      }
    }
    path {
      stroke: #fff;
    }
    .axis-label {
      fill: #fff;
      text-anchor: middle;
      font-size: 12px;
    }
  }
  .cost-year-axis {
      .highlighted {
        font-size: 16px !important;
        fill: #F8E368 !important;
        font-weight: bold;
      }
  }
  .opioid-text {
    display: none;
    position: absolute;
    top: 200px;
    left: 25%;
    color: #fff;
    font-size: 20px;
    background-color: grey;
    .highlighted {
      color: #F8E368;
      font-weight: bold;
    }
  }
  .internal-medicine {
    position: absolute;
    top: 120px;
    left: 15%;
    width: 70%;
    color: #fff;
    font-size: 20px;
    .cost-value {
      color: #F8E368;
      font-weight: bold;
    }
    .dropdown-container {
      display: inline-block;
      .nav-item {
        list-style: none;
        a {
          color: #F8E368;
          font-weight: bold;
          &:hover {
            background-color: #e1e1e1 !important;
            color: #000;
          }
        }
        .dropdown-menu {
          background-color: #000;
          height: 300px;
          overflow-y: scroll;
          overflow-x: none;
        }
      }
    }
  }
  .cost-chart-heading {
    font-family: 'Adelle Bold', sans-serif;
    font-size: 40px;
    fill: #F8E368;
  }
  .ball-group {
    cursor: pointer;
    .opioid-prescriber-rate {
      fill: #F8E368
    }
    .la-opioid-prescriber-rate {
      fill: #fff;
    }
    .opioid-prescriber-line {
      stroke: #fff;
      fill: none;
    }
    .opioid-value {
      display: none;
    }
  }
  .faded {
    opacity: 0.3;
  }
  .visible {
    display: block;
  }
  .highlighted {
    .opioid-value {
      display: block;
    }
  }
  .mean-prescriptions {
    fill:#fff;
  }
  .total-all-circle {
    stroke: #fff;
    stroke-width: 3px;
    fill: none;
  }
  .total-sel-circle {
    stroke: #F8E368;
    stroke-width: 3px;
    fill: #F8E368;
  }
  .circle-text {
    fill: #F8E368;
    font-size: 36px;
    font-weight: bold;
  }
  .circle-text-general {
    fill: #fff;
    font-size: 20px;
  }
  .circle-ring {
    stroke: #fff;
    fill: none;
    stroke-width: 1px;
  }
  .colored-circle {
    stroke: #F8E368;
  }
  .dropdown-menu::-webkit-scrollbar {
      display: none !important;
  }
  .selected-year .dropdown-menu {
    height: 200px !important;
  }
</style>
