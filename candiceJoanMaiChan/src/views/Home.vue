<template>
  <div class="home container-fluid">
    <!-- <img alt="Vue logo" src="../assets/logo.png"> -->
    <Intro :title="introTitle" :desc="introDesc" :background="introBackground" ref="intro" />
    <section class="row advert-section" ref="advert">
      <div class="col-6">
        <div class="row row-even" v-for="(advert, idx) of content" :key="idx" v-if="idx % 2 !== 0">
          <div class="col-11">
            <Advert :title="advert.title" :index="idx+1" :desc="advert.desc" :content="advert.content"/>
          </div>
        </div>
      </div>
      <div class="col-6">
        <div class="row row-odd" v-for="(advert, idx) of content" :key="idx" v-if="idx % 2 === 0">
          <div class="col-11">
            <Advert :title="advert.title" :index="idx+1" :desc="advert.desc" :content="advert.content"/>
          </div>
        </div>
      </div>
    </section>
    <section class="row specialty-chart-section" ref="specialty">
      <div class="col-12">
        <SpecialtyChart />
      </div>
    </section>
    <section class="row cost-chart-section" ref="costchart">
      <div class="col-12">
        <CostChart />
      </div>
    </section>
    <OpioidList :data="opioidList" />
    <section>
      <div class="row">
        <div class="col-12">
          <!-- <div class="quote">
            <p class="quote-text">
              “ In your mind, you can be O.K.; you can just do one. But one too many, and a thousand is never enough.“
            </p>
            <p class="quote-author">- Bruce Cherry, 58, Pennsylvania</p>
          </div> -->
          <img alt="yellow smoke" class="bottom-img img-fluid"
               src="../assets/images/opioid_bottom_picture.png"/>
        </div>
      </div>
    </section>

    <!-- <a v-on:click="scrollTo()" style="color: #fff">Scroll to #element</a> -->

    <!-- Modal Component -->
    <b-modal ref="image-modal" size="xl" hide-footer hide-header centered title="">
      <b-container fluid>
        <template v-for="(img, index) of modalContent" v-if="index === showImageIndex">
          <b-row>
            <b-col cols="11">
                <h3 class="float-left modal-number">{{img.index}}</h3>
            </b-col>
            <b-col cols="1">
                <p class="modal-close-btn" v-on:click="closeModal()">x</p>
            </b-col>
          </b-row>
          <b-row class="modal-img-content">
            <b-col cols="2">
              <button class="modal-prev-btn modal-nav-btn" v-on:click="changeModalImage('prev')"><</button>
            </b-col>
            <b-col cols="5" :key="index">
              <img class="img-fluid modal-img" :src="require('../assets/images/' + img.imagelink)"/>
            </b-col>
            <b-col cols="3" :key="index">
              <p class="modal-img-desc">{{img.imagedesc}}</p>
            </b-col>
            <b-col cols="2">
              <button class="modal-next-btn modal-nav-btn" v-on:click="changeModalImage('next')">></button>
            </b-col>
          </b-row>
        </template>
      </b-container>
    </b-modal>

    <!-- carousel

    float left and right
    remove position absolute from carousel-caption
    adjust the widths -->

  </div>
</template>

<script>
import CONFIG from '@/assets/content.json'
import * as _ from 'lodash'
import VueScrollTo from 'vue-scrollto'

// @ is an alias to /src
import HelloWorld from '@/components/HelloWorld.vue'
import Intro from '@/components/intro.vue'
import Advert from '@/components/advert.vue'
import SpecialtyChart from '@/components/specialty_chart.vue'
import CostChart from '@/components/cost_chart.vue'
import OpioidList from '@/components/opioid_list.vue'

export default {
  name: 'home',
  data: () => {
    return {
      introTitle: CONFIG.title,
      introDesc: CONFIG.desc,
      introBackground: CONFIG.background,
      content: CONFIG.content,
      opioidList: CONFIG.opioid_list,
      modalContent: [],
      showImageIndex: 0
    }
  },
  created() {
    this.$on('modal-open', (d) => {
      const images1 = this.content.slice(d.index)
        .map( (k, index) => k.content
                .map(v => {
                  v.index = d.index + index + 1;
                  return v;
                }));
      const images2 = this.content.slice(0, d.index)
        .map( (k, index) => k.content
                  .map(v => {
                    v.index = index + 1;
                    return v}));
      this.modalContent = _.flatten(images1.concat(images2));
      this.showImageIndex = 0;
      this.$refs['image-modal'].show();
    })
  },
  methods: {
    changeModalImage(type) {
      if(type === 'next') {
        this.showImageIndex += 1;
        this.showImageIndex %= this.modalContent.length;
      } else {
        this.showImageIndex -= 1;
        this.showImageIndex = this.showImageIndex < 0 ?
            (this.modalContent.length - 1) : this.showImageIndex;
      }
    },
    closeModal() {
      this.$refs['image-modal'].hide();
    },
    scrollTo() {
      const element = this.$refs['intro']
      const cancelScroll = this.$scrollTo(element)
    }
  },
  components: {
    HelloWorld,
    Intro,
    Advert,
    SpecialtyChart,
    CostChart,
    OpioidList
  }
}
</script>
<style lang="scss">
.container-fluid {
  padding-left: 0px !important;
  padding-right: 0px !important;
}
  .heading {
    font-family: 'Adelle Bold', sans-serif;
  }
  .description {
    font-family: 'Adelle Regular', sans-serif;
  }
  .home {
    padding-left: 0px;
    padding-right: 0px;
    background-color: #000;
  }
  .modal {
      background-color: #000;
  }
  .modal-dialog {
    position: absolute;
    left: 20px;
    top: 20px;
  }
  .modal-content {
    position: absolute !important;
    top: 20px !important;
    left: 20px !important;
    border: 1px solid #000 !important;
    .modal-body {
      background-color: #000;
      color: #fff;
      border: 1px solid #000 !important;
      .modal-prev-btn {
        display: inline-block;
      }
      .modal-next-btn {
        display: inline-block;
      }
      .modal-nav-btn {
        background-color: transparent;
        color: #fff;
        border: none;
        font-size: 50px;
        font-weight: bold;
      }
      .modal-img-desc {
        text-align: left;
        font-size:20px;
      }
      .modal-close-btn {
        background-color: transparent;
        color: #fff;
        border: none;
        font-size: 50px;
        font-weight: bold;
        margin-bottom: 50px;
        margin-top: -50px;
        cursor: pointer;
        &:hover {
          color: yellow;
        }
      }
    }
  }
  .advert-section {
    margin-top: 30px;
    .row-even {
      .advert {
        margin-top:200px;
      }
    }
    .advert-3 {
      margin-top: 200px;
    }
  }

  .opioid-list-section {
    margin-top: 10%;
  }

  .bottom-img {
    width: 100%;
  }
  .quote {
    font-family: 'Open Sans', sans-serif;
    color: #fff;
    position: absolute;
    top: 440px;
    left: 18%;
    font-size: 25px;
    width: 70%;
  }

  .modal-dialog {
    margin:0px !important;
    width: 100% !important;
    max-width: 100% !important;
  }

  .modal-number {
    font-size: 600px;
    position: absolute;
    left: 0;
    opacity: 0.5;
  }

  .modal-img-content {
    margin-left: 20% !important;
  }

  .specialty-chart-section, .cost-chart-section {
    margin-top: 9em;
  }

</style>
