<template>
  <section class="intro">
    <div class="row justify-content-center">
      <div class="col-6">
        <h1 class="intro-title">{{title}}</h1>
        <p class="intro-desc">{{desc}}</p>
      </div>
    </div>
  </section>
</template>

<script>

import imgsrc from '../assets/images/black_and_yellow_smoke.png';

export default {
  name: 'Intro',
  props: {
    title: String,
    desc: String,
    background: String
  },
  data: () => {
    return {
      imgsrc: imgsrc
    }
  },
  watch: {
    background: function(prev, current) {
      console.log('################');
      console.log(current);
    }
  }
}


</script>
<style scoped lang="scss">
  .intro {
    width: 100%;
    height: 1000px;
    background-color: #000;
    background-repeat:no-repeat;
    background-size: 100% 100%;
    background-image: url(~../assets/images/opioid_pills_updated.png);
    .intro-title {
        font-family: 'Adelle Bold', sans-serif;
        color: #fff;
        font-size: 40px;
        margin-top: 220px;
        text-align: center;
        margin-left: 30px;
    }
    .intro-desc {
        font-family: 'Adelle Regular', sans-serif;
        color: #fff;
        font-size: 20px;
        text-align: justify;
        margin-left: 30px;
        margin-top: 100px;
    }
    .opioid-pills {
      width: 100%;
      margin-top: 20px;
    }
  }
 </style>
