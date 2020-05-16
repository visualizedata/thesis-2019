<template>
  <div id="app">
    <siteMenu />
    <landingPage />
    <quotePage />
    <firstSection />
    <secondSection />
    <thirdSection />
    <forthSection />
    <fifthSection />
    <endNotes />
    <div class="standard-hidden">
    <img src="../public/assets/presentation/thank-you.jpg" alt="Thanks" id="thank-you" @click="goToLast">
    <img src="../public/assets/presentation/thank-you2.jpg" alt="Thanks" id="thank-you2">

    </div>
    <div class="grid-container">
      <div class="margin-left"></div>
      <div class="center-block"></div>
      <div class="margin-right"></div>
    </div>
  </div>
</template>

<script>
import siteMenu from "./components/siteMenu.vue";
import landingPage from "./components/landingPage.vue";
import quotePage from "./components/quotePage.vue";
import firstSection from "./components/firstSection.vue";
import secondSection from "./components/secondSection.vue";
import thirdSection from "./components/thirdSection.vue";
import forthSection from "./components/forthSection.vue";
import fifthSection from "./components/fifthSection.vue";
import endNotes from "./components/endNotes.vue";

export default {
  name: "app",
  components: {
    siteMenu,
    landingPage,
    quotePage,
    firstSection,
    secondSection,
    thirdSection,
    forthSection,
    fifthSection,
    endNotes
  },
  title: "Universal Income Guarantees",
  mounted() {
    // Credit: https://stackoverflow.com/questions/7717527/smooth-scrolling-when-clicking-an-anchor-link
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener("click", function(e) {
        e.preventDefault();

        document.querySelector(this.getAttribute("href")).scrollIntoView({
          block: "start",
          behavior: "smooth"
        });
      });
    });
  },
  methods: {
    goToLast() {
      const element_to_scroll_to = document.getElementById("thank-you2");
        element_to_scroll_to.scrollIntoView({
          // behavior: "smooth"
      }); 
    }
  }
};
</script>

<style lang="scss"></style>
