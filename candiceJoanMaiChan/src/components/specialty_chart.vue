<template>
  <div>
    <svg class="specialty-chart" ref="specialty"></svg>
    <div class="internal-medicine-spl description">
      Among all the prescriptions by doctors working in
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
      there were
      <span class="opioid-claims">
        {{opioidClaims}}
      </span>
      opioid claims
      in year
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
    <div class="opioid-text description">
      Opiods made up
      <span class="prescription highlighted">28%</span>
      of total prescriptions for doctor
      <span class="doctor highlighted">Jane Doe</span> in
      <span class="state highlighted">California</span>
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

import SpecialtyUtils from '@/utils/specialty_utils'

// init chart constants
const WIDTH = 1200
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
const heading = 'How Does the United States Feel Pain?'
const DATA = {
  2013: data_2013,
  2014: data_2014,
  2015: data_2015,
  2016: data_2016
}
const INITYEAR = 2013
const DATA_RANGE = 45
const YEARS = _.range(2013, 2017)

const specialtyutils = new SpecialtyUtils(MARGIN);

// chart vue code
export default {
  name: 'SpecialtyChart',
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
      yscale: '',
      xscale: '',
      yearScale: '',
      textFormat: d3.format(',.0f'),
      opioidClaims: '',
      drag: '',
      startSlice: 0
    }
  },
  mounted() {
      this.changeYearData();
      this.svgElement = this.$refs.specialty;
      this.initChart();
      this.drawChart(this.filterData());
      // this.addYearAxis();
      this.addYaxis();
  },
  methods: {
    initChart: function() {
      this.svg = d3.select(this.svgElement)
        .attr('width', WIDTH)
        .attr('height', HEIGHT)

      // x scale
      this.xscale = d3.scalePoint()
        .range([0, this.width])
        .domain(_.range(0, DATA_RANGE))

      // y scale. shift height due to heading and sub heading
      this.yscale = d3.scaleLinear()
        .range([this.height - (MARGIN.top + SUB_HEADING_SHIFT), 0])
        .domain([0, 100])

      this.yearScale = d3.scalePoint()
        .range([0.2 * this.width, 0.8 * this.width])
        .domain(YEARS)

      this.drag = d3.drag()
        .on('start', () => {
          specialtyutils.dragStart(this.xscale)
        })
        .on('drag', () => {
          const obj = specialtyutils.dragMove(this.xscale);
          this.startSlice = obj.direction === 'left' ?
              this.startSlice + obj.diff :
              this.startSlice - obj.diff;
          this.startSlice = this.startSlice <= 0 ? 0 : this.startSlice;
          this.drawChart(this.filterData());
        })
        .on('end', () => {
          specialtyutils.dragEnd(this.xscale)
        })

      this.svg.append('rect')
      .attr('x', MARGIN.left)
      .attr('width', WIDTH - MARGIN.left - MARGIN.right)
      .attr('height', HEIGHT)
      .attr('class', 'scroll-rect')
      .call(this.drag);

      // chart heading
      this.svg.append('text')
        .classed('specialty-chart-heading heading', true)
        .attr('x', headingWidth - 30)
        .attr('y', HEADING_SHIFT)
        .text(heading);

      this.addMeanPrescriptions();

      //main chart container
      this.chartg = this.svg
        .append('g')
        .attr('transform', `translate(${MARGIN.left}, ${MARGIN.top + SUB_HEADING_SHIFT})`)

    },
    addMeanPrescriptions() {
      const g = this.svg.append('g')
        .classed('mean-prescriptions description', true)
        .attr('transform', `translate(${headingWidth + 130}, ${SUB_HEADING_SHIFT - 20})`);

      //g.append('text').text('Mean Rate of Prescriptions by opioid type');

      const data = [
        {color: '#fff', label: 'Long Acting Opioids', class: 'la-opioids', value: '20%'},
        {color: '#F8E368', label: 'Standard Opioids', class: 'opioids', value: '12%'}
      ];

      const gLower = this.svg.append('g')
        .classed('mean-prescriptions description description-lower', true)
        .attr('transform', `translate(${headingWidth - 50 + 1}, ${HEIGHT - 70})`);

      gLower.append('text')
          .attr('class', 'sentence')
          .text('The Mean Rate of Prescriptions for Long Acting Opioids is');
          //.text(specialtyutils.createMeanText(0, 0));

      gLower.append('text')
          .attr('x', 550)
          .attr('class', 'sentence sentence-la-opioid')
          .text('000');

      gLower.append('text')
          .attr('x', 590)
          .attr('class', 'sentence')
          .text('and Standard Opioid is');

      gLower.append('text')
          .attr('x', 810)
          .attr('class', 'sentence sentence-opioid')
          .text('000');


      const group = g.selectAll('g')
        .data(data).enter()
        .append('g')
        .attr('class', d => d.class + '_group')
        // .attr('transform', (d, i) => `translate(0, ${i * 30 + 30})`);
        .attr('transform', (d, i) => `translate(${i * 200 + 30}, 0)`);

      group.append('circle')
        .attr('r', 5)
        .style('fill', d => d.color);

      group.append('text')
        .attr('class', 'label')
        .attr('x', 10)
        .attr('y', 5)
        .text(d => d.label);

      // group.append('text')
      //   .attr('class', d => d.class)
      //   .attr('x', 200)
      //   .attr('y', 5)
      //   .text(d => d.value)
    },
    addYearAxis() {
      const axis = d3.axisBottom(this.yearScale);
      const g = this.chartg.append('g')
        .attr('class', 'specialty-year-axis axis')
        .attr('transform', `translate(0, ${this.height - (MARGIN.top + SUB_HEADING_SHIFT - 30)})`)
        .call(axis)

      g.append("text")
        .attr("y", 50)
        .attr("x", 0.5 * this.width)
        .attr('class', 'axis-label')
        .text("Year");

      const self = this;

      d3.selectAll('.specialty-year-axis .tick text')
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
          d3.selectAll('.specialty-year-axis .tick text').classed('highlighted', false)
          d3.select(this).classed('highlighted', true)
          self.changeYearData();
          self.startSlice = 0;
          const data = self.filterData()
          self.drawChart(data);
        });
    },
    addYaxis() {
      const axis = d3.axisLeft(this.yscale);
      const g = this.chartg.append('g')
        .attr('class', 'y-axis')
        .attr('transform', `translate(-20, 0)`)
        .call(axis)

      g.append("text")
            .attr("transform", "rotate(-90)")
            .attr("y", -50)
            .attr("x", -200)
            .attr('class', 'axis-label description')
            .text("Opioids as a Percentage of Total Prescriptions");

    },
    selectYear(y) {
      this.year = y;
      this.changeYearData();
      this.startSlice = 0;
      const data = this.filterData()
      this.drawChart(data);
    },
    selectState(state) {
      this.selectedState = state; //{ state: state, name: STATES[state] };
      this.startSlice = 0;
      const data = this.filterData()
      this.drawChart(data);
    },
    selectMedicine(med) {
      this.selectedMed = med;
      this.startSlice = 0;
      const data = this.filterData()
      this.drawChart(data);
    },
    changeYearData() {
      this.data = DATA[this.year];
      const chainData = _.chain(this.data);

      this.internalMeds = chainData.map('specialty_description')
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
        this.selectedMed = this.internalMeds.filter(d => d === 'all fields')[0]
    },
    filterData: function() {
      // filter the data to get the relevant dataset
      const filtered = _.chain(this.data)
          .filter(d => (this.selectedMed === 'all fields' ||
                d.specialty_description === this.selectedMed) &&
              (this.selectedState.state === 'ALL' ||
                d.nppes_provider_state === this.selectedState.state)
          )
          // sort by the sum of opioid_prescriber_rate and la_opioid_prescriber_rate ascending
          .sortBy(d => (+d.opioid_prescriber_rate || 0) + (+d.la_opioid_prescriber_rate || 0))
          // make sure values are numbers
          .map(d => {
            _.keys(d).forEach(key => {
              d[key] = typeof +d[key] === 'undefined' || isNaN(+d[key]) ? d[key] : +d[key];
            })
            if(typeof d.la_opioid_prescriber_rate === 'undefined') {
              d.la_opioid_prescriber_rate = 0;
            }
            if(typeof d.opioid_prescriber_rate === 'undefined') {
              d.opioid_prescriber_rate = 0;
            }
            d.lowest = d.la_opioid_prescriber_rate <= d.opioid_prescriber_rate ?
              d.la_opioid_prescriber_rate : d.opioid_prescriber_rate;
            d.showOpioid = d.la_opioid_prescriber_rate > d.opioid_prescriber_rate ?
              true : false;
            d.lowest -= 10;
            d.total_opioid = d.la_opioid_prescriber_rate + d.opioid_prescriber_rate;
            d.showTotal = d.la_opioid_prescriber_rate === 0 || d.opioid_prescriber_rate === 0 ?
              false : true;
            return d
          })
          // make it descending
          .reverse()
          // remove undefined / 0 values
          .filter(d => !(d.la_opioid_prescriber_rate === 0 && d.opioid_prescriber_rate === 0))
          .value()

      return filtered
    },
    drawChart: function(allData) {
      const numFormat = d3.format('.0%');
      let endSlice = this.startSlice + DATA_RANGE;
      endSlice = endSlice > allData.lengt ? allData.length : endSlice;
      const data = _.slice(allData, this.startSlice, endSlice);

      const totalOpioidClaimCount = _.reduce(allData, (sum, a) => sum + (a.opioid_claim_count || 0),0)
      this.opioidClaims = this.textFormat(totalOpioidClaimCount);

      const la = d3.sum(allData, d => d.la_opioid_prescriber_rate) / allData.length
      const op = d3.sum(allData, d => d.opioid_prescriber_rate) / allData.length

      d3.select('.mean-prescriptions .la-opioids')
        .text(numFormat(la/100));

      d3.select('.mean-prescriptions .opioids')
        .text(numFormat(op/100));

      d3.selectAll('.description-lower')
        .select('.sentence-la-opioid')
        .text(numFormat(la/100));

      d3.selectAll('.description-lower')
        .select('.sentence-opioid')
        .text(numFormat(op/100));

      const gdata = this.chartg.selectAll('.ball-group')
        .data(data, (d, i) => {
          return i + d.opioid_prescriber_rate + d.la_opioid_prescriber_rate;
        })

      gdata.exit().remove();

      // circle line text group
      const group = gdata.enter()
        .append('g')
        .classed('ball-group', true)
        .attr('transform', (d, i) => {
          return `translate(${this.xscale(i)}, 0)`
        })

      // on hover
      group.on('mouseenter', function(d){
        const total = (d.opioid_prescriber_rate || 0) +
          (d.la_opioid_prescriber_rate || 0);
        const name = _.startCase(_.toLower(
          `${d.nppes_provider_first_name} ${d.nppes_provider_last_org_name}`
        ));

        // hide all balls and show the hovered ones
        d3.selectAll('.ball-group').classed('faded', true);
        d3.selectAll('.ball-group').classed('highlighted', false);
        d3.select(this).classed('faded', false);
        d3.select(this).classed('highlighted', true);
        // d3.select('.opioid-prescriber-line').classed('show-hover', true);

        // change the value in the hovered text
        d3.select('.opioid-text').classed('show-hover', true);
        d3.select('.opioid-text .prescription').text(numFormat(total/100));

        // change the name in the hovered text
        d3.select('.opioid-text .doctor').text(name);
        d3.select('.opioid-text .state').text(STATES[d.nppes_provider_state]);
      });

      // on hover leave
      group.on('mouseleave', function(d){
        d3.selectAll('.ball-group').classed('faded', false);
        d3.selectAll('.ball-group').classed('highlighted', false);
        d3.select('.opioid-text').classed('show-hover', false);
        d3.select('.opioid-prescriber-line').classed('show-hover', false);
      });

      // white line joining the circles
      group.append('line')
          .filter(d => {
            return (d.opioid_prescriber_rate !== 0) && (d.showOpioid || !d.showTotal);
          })
          .attr('y1', d => this.yscale(d.total_opioid))
          .attr('y2', d => {
              return this.yscale(d.opioid_prescriber_rate)
          })
          .classed('opioid-prescriber-line opioid-value', true)
          .classed('white-line', true)

      group.append('line')
          .filter(d => {
            return (d.opioid_prescriber_rate !== 0) && (d.showOpioid || !d.showTotal);
          })
          .attr('y1', d => {
              return this.yscale(d.opioid_prescriber_rate)
          })
          .attr('y2', d => this.yscale(0))
          .classed('opioid-prescriber-line opioid-value', true)
          .classed('yellow-line', true)

      group.append('line')
          .filter(d => {
            return (d.la_opioid_prescriber_rate !== 0) && (!d.showOpioid || !d.showTotal);
          })
          .attr('y1', d => this.yscale(d.total_opioid))
          .attr('y2', d => {
            return this.yscale(d.la_opioid_prescriber_rate);
          })
          .classed('opioid-prescriber-line opioid-value', true)
          .classed('yellow-line', true)

      group.append('line')
          .filter(d => {
            return (d.la_opioid_prescriber_rate !== 0) && (!d.showOpioid || !d.showTotal);
          })
          .attr('y1', d => {
            return this.yscale(d.la_opioid_prescriber_rate);
          })
          .attr('y2', d => this.yscale(0))
          .classed('opioid-prescriber-line opioid-value', true)
          .classed('white-line', true)

      // opioid_prescriber_rate circle
      group.append('circle')
        .filter(d => {
          return (d.opioid_prescriber_rate !== 0) && (d.showOpioid || !d.showTotal);
        })
        .attr('r', 5)
        .attr('cy', d => {
          const yval = this.yscale(d.opioid_prescriber_rate)
          return yval;
        })
        .classed('opioid-prescriber-rate', true)
        .classed('opioid-value', d => {
          return d.showTotal ? true : false;
        });

      group.append('rect')
        .filter(d => d.opioid_prescriber_rate !== 0)
        .attr('width', 40)
        .attr('height', 20)
        .attr('x', -12) // -8
        .attr('y', d => {
          if(d.showOpioid || !d.showTotal){
            let val = d.opioid_prescriber_rate / 2;
            val = val <= 10 ? 0 : val;
            return this.yscale(val) - 14;
          } else {
            const val1 = (d.total_opioid - d.la_opioid_prescriber_rate) / 2;
            const val2 = d.la_opioid_prescriber_rate + val1;
            return this.yscale(val2) - 14;
          }
        })
        .classed('opioid-prescriber-rate-box opioid-value', true);

      // opioid_prescriber_rate text
      group.append('text')
        .filter(d => d.opioid_prescriber_rate !== 0)
        .attr('x', -8)
        .attr('y', d => {
          if(d.showOpioid || !d.showTotal){
            let val = d.opioid_prescriber_rate / 2;
            val = val <= 10 ? 0 : val;
            return this.yscale(val);
          } else {
            const val1 = (d.total_opioid - d.la_opioid_prescriber_rate) / 2;
            const val2 = d.la_opioid_prescriber_rate + val1;
            return this.yscale(val2);
          }
        })
        .classed('opioid-prescriber-rate opioid-value', true)
        .text(d => numFormat(d.opioid_prescriber_rate/100))

      // opioid_prescriber_rate circle. when lowest
      group.append('circle')
        .filter(d => {
          return (d.la_opioid_prescriber_rate !== 0) && (!d.showOpioid || !d.showTotal);
        })
        .attr('r', 5)
        .attr('cy', d => this.yscale(d.la_opioid_prescriber_rate))
        .classed('la-opioid-prescriber-rate', true)
        .classed('opioid-value', d => {
          return d.showTotal ? true : false;
        })

      group.append('rect')
        .filter(d => d.la_opioid_prescriber_rate !== 0)
        .attr('width', 40)
        .attr('height', 20)
        .attr('x', -12) // -8
        .attr('y', d => {
          if(!d.showOpioid || !d.showTotal){
            let val = d.la_opioid_prescriber_rate / 2;
            val = val <= 10 ? 0 : val;
            return this.yscale(val) - 14;
          } else {
            const val1 = (d.total_opioid - d.opioid_prescriber_rate) / 2;
            const val2 = d.opioid_prescriber_rate + val1;
            // console.log(d.total_opioid, d.la_opioid_prescriber_rate, val1, val2);
            return this.yscale(val2) - 14;
          }
        })
        .classed('opioid-prescriber-rate-box opioid-value', true);

      // opioid_prescriber_rate text
      group.append('text')
        .filter(d => d.la_opioid_prescriber_rate !== 0)
        .attr('x', -8)
        .attr('y', d => {
          if(!d.showOpioid || !d.showTotal){
            let val = d.la_opioid_prescriber_rate / 2;
            val = val <= 10 ? 0 : val;
            return this.yscale(val);
          } else {
            const val1 = (d.total_opioid - d.opioid_prescriber_rate) / 2;
            const val2 = d.opioid_prescriber_rate + val1;
            // console.log(d.total_opioid, d.la_opioid_prescriber_rate, val1, val2);
            return this.yscale(val2);
          }
        })
        .classed('la-opioid-prescriber-rate opioid-value', true)
        .text(d => numFormat(d.la_opioid_prescriber_rate/100))

      const totalCircle = group.append('g')
        .filter(d => d.showTotal)
        .attr('class', 'total-opioid')
        .attr('transform', d => `translate(0, ${this.yscale(d.total_opioid)})`)

      totalCircle.append('circle')
        .attr('r', 5)
        .classed('center-circle', true);

      totalCircle.append('circle')
        .attr('r', 8)
        .classed('surrounding-circle', true);
    }
  }
}
</script>

<style lang="scss">
  .y-axis {
    .tick {
      line { stroke: #fff; }
      text {
        fill: #fff;
        cursor: pointer;
        font-size: 14px;
      }
    }
    path {
      stroke: #fff;
    }
    .axis-label {
      fill: #fff;
      text-anchor: middle;
      font-size: 14px;
    }
  }
  .specialty-year-axis {
      .highlighted {
        font-size: 16px !important;
        fill: #F8E368 !important;
        font-weight: bold;
      }
  }
  .opioid-text {
    display: none;
    position: absolute;
    top: 220px !important;
    left: 28% !important;
    color: #fff;
    font-size: 20px;
    border-radius: 5px;
    padding-left: 5px;
    padding-right: 5px;
    background-color: grey;
    .highlighted {
      color: #F8E368;
      font-weight: bold;
    }
  }
  .internal-medicine-spl {
    position: absolute;
    top: 120px;
    left: 12%;
    width:80%;
    color: #fff;
    font-size: 20px;
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
  .total-opioid {
    .center-circle {
      fill: #F8E368;
      stroke: none;
    }
    .surrounding-circle {
      stroke: #fff;
      fill: none;
      stroke-width: 2px;
    }
  }
  .specialty-chart-heading {
    font-family: 'Adelle Bold', sans-serif;
    font-size: 40px;
    fill: #F8E368;
  }
  .specialty-chart-sub-heading {
    fill: #FFF;
    font-size: 20px;
  }
  .ball-group {
    cursor: pointer;
    .opioid-prescriber-rate {
      fill: #F8E368
    }
    .opioid-prescriber-rate-box {
      fill: #000;
      stroke: none;
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
  .opioid-claims {
    color: #F8E368;
    font-weight: bold;
  }
  .faded {
    opacity: 0.3;
  }
  .show-hover {
    display: block !important;
  }
  .highlighted {
    .opioid-value {
      display: block;
    }
  }
  .mean-prescriptions {
    fill:#fff;
    .sentence {
      font-size: 20px;
    }
  }
  .scroll-rect {
    fill: transparent;
    stroke: none;
  }
  .yellow-line {
    stroke: #F8E368 !important;
    stroke-width: 3px;
  }
  .white-line {
    stroke: #ffffff !important;
    stroke-width: 3px;
  }
  .sentence-la-opioid {
    fill: #fffff;
    font-weight: bold;
  }
  .sentence-opioid {
    fill: #F8E368;
    font-weight: bold;
  }
</style>
