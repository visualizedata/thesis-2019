<template>
  <div>
    <!-- Credit: https://www.w3schools.com/howto/tryit.asp?filename=tryhow_js_overlay -->
    <div id="site-menu" class="overlay">
      <button
        class="menu-button hamburger hamburger--spin"
        type="button"
        @click="openCloseMenu"
        id="anim-hamburger-button"
      >
        <span class="hamburger-box">
          <span class="hamburger-inner"></span>
        </span>
      </button>
      <div class="overlay-content">
        <div class="menu-title">
          <h1 class="hug-bottom">
            Universal Income Guarantees. <br />
            An opportunity to rethink welfare?
          </h1>
          <h6 class="subheadline">An interactive visual inquiry</h6>
        </div>
        <div class="toc">
          <ol class="toc-ol">
            <a class="menu-link" href="#section-1" @click="goToInternalLink">
              <li class="toc-num">
                <span class="toc-li">
                  <span class="italic">What</span> are we talking about, <br />
                  when we talk about <br />
                  <span class="italic">universal income guarantees?</span>
                </span>
              </li>
            </a>
            <a class="menu-link" href="#section-2" @click="goToInternalLink">
              <li class="toc-num">
                <span class="toc-li">
                  <span class="italic">Why</span> should we talk about <br />
                  <span class="italic">universal income guarantees?</span>
                </span>
              </li>
            </a>
            <a class="menu-link" href="#section-3" @click="goToInternalLink">
              <li class="toc-num">
                <span class="toc-li">
                  <span class="italic">How</span> would a universal income
                  guarantee <br />
                  <span class="italic">affect incomes in the US?</span>
                </span>
              </li>
            </a>
            <a class="menu-link" href="#section-4" @click="goToInternalLink">
              <li class="toc-num">
                <span class="toc-li">
                  <span class="italic">What</span> are
                  <span class="italic">dynamic effects</span> <br />
                  of an income guarantee and <br />
                  <span class="italic">how</span> can it be
                  <span class="italic">economically sustainable?</span>
                </span>
              </li>
            </a>
            <a class="menu-link" href="#section-5" @click="goToInternalLink">
              <li class="toc-num">
                <span class="toc-li">
                  <span class="italic">Where</span> to go from here?
                </span>
              </li>
            </a>
          </ol>
        </div>
        <div class="presentation-button small" @click="goToPresentationMode">Presentation?</div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "siteMenu",
  props: {
    msg: String
  },
  data() {
    return {};
  },
  methods: {
    openCloseMenu() {
      // toggle button
      const button = this.$el.querySelector("#anim-hamburger-button");
      button.classList.toggle("is-active");

      // toggle menu
      const menu = this.$el.querySelector("#site-menu");
      menu.classList.toggle("is-active");
    },
    goToInternalLink() {
      this.openCloseMenu();
    },
    goToPresentationMode() {
      [].map.call(document.querySelectorAll(`.standard-hidden`), e => {
        e.classList.toggle("presentation-show");
      });
      [].map.call(document.querySelectorAll(`.blur`), e => {
        e.classList.toggle("presentation-unblur");
      });
      this.openCloseMenu();
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
@import "../assets/scss/color_defs";

.menu-button {
  position: fixed;
  padding-top: 32px;
  z-index: 999;
  right: 32px;
  color: $primary;
  // lazy transition
  transition: all 0.5s;
  background: rgba(235,235,235,0.5);
}

.menu-button.is-active {
  background: none;
}

.overlay {
  height: 0%;
  width: 100%;
  position: fixed;
  z-index: 1;
  top: 0;
  left: 0;
  background: $primary;
  overflow-x: hidden;
  // different transition?
  // opacity: 0;
  transition: height 0.5s;
}

.overlay.is-active {
  height: 100%;
}

.overlay-content {
  position: relative;
  // top: 25%;
  width: 100%;
  margin-top: 30px;
}

.overlay-content > * {
  color: $center-background-color;
}

.menu-title {
  padding: 0 32px;
  text-align: left;
}

.menu-title > .subheadline {
  border-bottom: 0.5px solid $center-background-color;
}

.toc {
  margin-top: 16px;
  text-align: center;
}

.toc-ol {
  display: inline-block;
  text-align: left;
}

.toc-num {
  font-size: 4rem;
  font-style: italic;
  line-height: 0.8;
  margin-bottom: 32px;
  padding: 8px;
}

.toc-li {
  font-size: 2.3rem;
  font-style: normal;
  font-weight: 900;
}

.menu-link {
  color: $center-background-color;
  text-decoration: underline;
  // text-decoration-style: dashed;

  text-decoration-color: rgba(252, 252, 252, 0);
  transition: all 0.3s;
}
.menu-link:hover {
  text-decoration: underline;
  // text-decoration-style: dashed;
  text-decoration-color: rgba(252, 252, 252, 1);
}
// consider this, if there’s time:
// .custom-underline {
//   box-shadow: inset 0 0px 0 white, inset 0 -1px 0 black;
// }
</style>
