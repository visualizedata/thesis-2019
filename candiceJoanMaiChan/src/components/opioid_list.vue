<template>
  <section class="opioid-list-section">
      <div class="row justify-content-center">
        <div class="col-7">
          <h1 class="opioid-list-title heading">{{data.title}}</h1>
          <p class="opioid-list-desc description">{{data.desc}}</p>
        </div>
      </div>
      <section class="opioid-names">
        <div class="row" v-for="(row, index) in rows" :key="'opioid-' + index">
          <div class="col-3" v-for="(col, idx) in row" :key="'opioid-col-' + idx">
              <p class="opioid-name heading"
                 :class="{'selected-opioid-name': selectedOpioid.title === col.title}"
                 v-on:click="opioidClicked(col)">{{col.title}}</p>
          </div>
        </div>
      </section>
      <section class="opioid-details" v-if="showOpioid">
        <div class="row">
          <div class="col-3">
            <img class="img-fluid opioid-img" :src="selectedOpioid.src"/>
          </div>
          <div class="offset-1 col-8" style="margin-left: 6.93%;">
              <div class="row">
                <div class="col-11">
                  <p class="opioid-title">{{selectedOpioid.title}}</p>
                </div>
              </div>
              <div class="row">
                <div class="col-11">
                  <p>{{selectedOpioid.desc}}</p>
                </div>
              </div>
              <div class="row">
                <div class="col-11">
                  <p>{{selectedOpioid.names}}</p>
                </div>
              </div>
              <div class="row">
                <div class="offset-11 col-1">
                  <button class="opioid-nav-btn" v-on:click="changeOpioid()">></button>
                </div>
              </div>
              <div class="row withdrawal-symptoms">
                <div class="col-3">
                  <p style="color: #F8E368; margin-top: 30px; margin-bottom: 0px;">{{selectedOpioid.title}}</p>
                  <p style="margin-top:0px; margin-bottom: 0px;">Withdrawal</p>
                  <p style="margin-top:0px">Symptoms</p>
                </div>
                <div class="col-8">
                  <div class="row" v-for="(orow, oindex) in selectedOpioid.symptoms" :key="'symptom-'+oindex">
                    <div class="col-4" v-for="(ocol, oidx) in orow" :key="'symptom-col'+oidx">
                      <div class="opioid-pill-box">
                        <div class="top"></div>
                        <!-- <div class="bottom"></div> -->
                      </div>
                      <div class="opioid-symptom-name">
                        <span>{{ocol}}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
          </div>
        </div>
      </section>
  </section>
</template>
<script>

import * as _ from 'lodash'

export default {
  name: 'OpioidList',
  props: {
    data: Object
  },
  data: () => {
    return {
      rows: [],
      colsize: 4,
      selectedOpioid: {},
      showOpioid: false,
      content: []
    }
  },
  mounted(){
    this.workOnData(this.data.content);
  },
  watch: {
    data: function(prev, current){
      this.workOnData(current.content);
    }
  },
  methods: {
    opioidClicked(opioid) {
      this.selectedOpioid = opioid;
      this.showOpioid = true;
    },
    workOnData(content) {
      this.content = _.map(content, d => {
        d.src = require('../' + d.imgsrc);
        d.names = `Common Street Names: ${d.street_names.join(', ')}`;
        d.symptoms = _.chunk(d.symptoms, 3);
        return d;
      });
      this.rows = _.chunk(this.content, this.colsize);
    },
    changeOpioid() {
      const titles = _.map(this.content, 'title');
      const index = titles.indexOf(this.selectedOpioid.title);
      let newIndex = index + 1;
      newIndex = newIndex === this.content.length ? 0 : newIndex;
      this.selectedOpioid = this.content[newIndex];
    }
  }
}
</script>
<style lang="scss">
.opioid-list-title {
  color: #F8E368;
}
.opioid-list-desc {
  color: #FFF;
  font-size:20px;
}
.opioid-names {
  margin-top: 50px;
  .opioid-name {
    color: #FFF;
    font-size: 30px;
    cursor: pointer;
    text-align: left;
    margin-left: 30%;
  }
  .selected-opioid-name {
    color: #F8E368;
  }
}
.opioid-details {
  margin-top: 100px;
  margin-bottom: 100px;
  text-align: left;
  color: #fff;
  font-size: 20px;
  font-family: 'Adelle Regular' sans-serif;
  .opioid-title {
    font-size: 30px;
    color: #F8E368;
  }
  .withdrawal-symptoms {
    margin-top: -50px;
    .opioid-symptom-name {
      display: inline-block;
      height: 50px;
      margin-left:10px;
      span {
        position: absolute;
        top: 35%;
      }
    }
    .opioid-pill-box {
      height: 15px;
      width: 10px;
      display: inline-block;
      .top {
        background-color: #F8E368;
        border-radius: 20px;
        height: 100%;
        width: 15px;
        margin-top: -8px;
      }
      .bottom {
        background-color: #FFF;
        height: 50%;
      }
    }
  }
}
.opioid-nav-btn {
  background-color: transparent;
  color: #fff;
  border: none;
  font-size: 50px;
  font-weight: bold;
}
.opioid-img {
  margin-left: 20%;
}
</style>
