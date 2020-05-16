<template>
  <div class="grid-container">
    <div class="margin-left">
      <div v-if="isLoaded" class="interface grid-vertical-container-interface">
        <!-- <br /> -->
        <div class="interface-headline">
          <div class="blur" id="selectHeadline">
            <h5 class="sans small regular unhug-top">Configure the scheme:</h5>
          </div>
          <div class="uig unhug-top border-top-with-note blur" id="selectUIG">
            <div
              :class="
                `positions position${positionsArray.length -
                  1} transfer-checkboxes`
              "
              @mouseenter="mouseenterCheckboxes"
              @mouseleave="mouseleaveCheckboxes"
              :id="positionsArray.length - 1"
            >
              <p class="sans small note-top-unhug">Should a UIG be active?</p>
              <div>
                <label
                  class="checkbox-container sans color-primary checkbox-primary"
                >
                  <div class="center">Universal Income Guarantee</div>
                  <input
                    v-if="isLoaded"
                    v-show="positionsArray[positionsArray.length - 1].checked"
                    type="checkbox"
                    v-model="positionsArray[positionsArray.length - 1].checked"
                    @click="clickOnUIGCheckbox"
                  />
                  <span class="checkmark checkmark-primary"></span>
                </label>
              </div>
              <!-- <h5 class="sans">Change the parameters of this scheme:</h5> -->
              <transition name="fade">
                <div v-show-slide="onlyUIG[0].checked" class="parameters">
                  <p class="sans small note-top-unhug hug-bottom">
                    – Yes, and the UIG should go to the
                  </p>
                  <!-- Credit input field:  https://codepen.io/anon/pen/MRXvdp -->
                  <div class="group bignumberinput">
                    <!-- <label for="incomebrackets" class="bignumberinput">lowest</label> -->
                    <input
                      type="text"
                      pattern="\d*"
                      maxlength="1"
                      id="incomebrackets"
                      required="required"
                      class="bignumberinput sans"
                      max="9"
                      v-model.number="numOfUIGBins"
                      tabindex="-1"
                      @change="doAfterIncomeBracketsChanged()"
                    />
                    <div
                      for="incomebrackets"
                      class="controls bold sans control-minus"
                      @click="minusBins()"
                    >
                      -
                    </div>
                    <label for="incomebrackets" class="bignumberinput sans"
                      >lowest income brackets</label
                    >
                    <div
                      class="controls bold sans control-plus"
                      @click="plusBins()"
                    >
                      +
                    </div>
                    <div class="bar bignumberinput"></div>
                  </div>
                </div>
              </transition>
            </div>
          </div>
        </div>
        <div
          class="interface-welfare border-top-with-note blur"
          id="selectWelfare"
        >
          <p class="sans small note-top-unhug">
            Programs in which of these categories should be in place?
          </p>

          <div
            :class="
              `positions position${positionsOnlyWelfareR.length -
                i -
                1 +
                1} transfer-checkboxes`
            "
            v-for="(e, i) in positionsOnlyWelfareR"
            :key="i + 1"
            :id="positionsOnlyWelfareR.length - i"
            @mouseenter="mouseenterCheckboxes"
            @mouseleave="mouseleaveCheckboxes"
          >
            <label
              :key="i + 1"
              :class="
                `checkbox-container sans color-${e.name} checkbox-${e.name}`
              "
            >
              <div class="center">{{ e.listName }}</div>
              <input
                type="checkbox"
                v-model="e.checked"
                @click="
                  togglePosition(positionsOnlyWelfareR.length - 1 - i + 1)
                "
              />
              <span :class="`checkmark checkmark-${e.name}`"></span>
            </label>
          </div>
        </div>
        <div
          class="interface-zoom income border-top-with-note blur"
          id="selectScale"
        >
          <p class="sans small note-top-unhug">
            Show the income without benefits in comparison?
          </p>
          <div
            :class="`positions position${0} transfer-checkboxes`"
            @mouseenter="mouseenterCheckboxes"
            @mouseleave="mouseleaveCheckboxes"
            id="0"
          >
            <label class="checkbox-container sans">
              <div class="color-minc center">Income without benefits</div>
              <input
                v-if="isLoaded"
                type="checkbox"
                v-model="positionsArray[0].checked"
                @click="togglePosition(0)"
              />
              <span class="checkmark"></span>
            </label>
          </div>
          <p class="sans small note-top-unhug">
            Focus on the lower six income brackets?
          </p>
          <div class="zoom-container" @click="scaleYAxis">
            <div class="icon-medium">
              <zoomIcon class="zoom-icon" />
              <div class="small sans color-light plusOrMinus">
                {{ zoomSign[0] }}
              </div>
            </div>
            <div>
              <p class="sans zoomText color-light">
                Zoom {{ zoomSign[1] }} the Y-axis
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="center-block" id="graph-headline2">
      <Scrollama
        @step-enter="stepEnterHandler"
        @step-exit="stepExitHandler"
        :offset="0.9"
      >
        <div slot="graphic" class="graphic">
          <div class="chart">
            <h5 class="sans hug-bottom" >UIG scheme 2:</h5>
            <span class="sans">
              Select welfare programs to be replaced and provide a UIG to the
              <span class="bold">
                lowest
                <span v-if="isLoaded & (numOfUIGBins > 0)" class="color-uig">
                  {{ numOfUIGBins }}
                </span>
                income brackets
              </span>
            </span>
            <div
              class="tooltip-container tooltip sans tooltip-zero-opacity"
              id="tooltip"
              v-html="tooltip.html"
              :style="
                `position:fixed;left:${tooltip.left}px;top:${tooltip.top}px;`
              "
              @mouseenter="touchedToolTip"
            ></div>
            <!-- <div v-if="tooltip.id != null">
              <transition-group name="tipmove" tag="div">
                <div
                  class="tooltip-container"
                  v-for="(element, index) in data"
                  :key="index * 10 + element.id"
                  :style="
                    `position:fixed;left:${tooltip.left}px;top:${
                      tooltip.top
                    }px;right:${tooltip.right}px;bottom:${tooltip.bottom}px`
                  "
                >
                  <div
                    class="tooltip sans"
                    :id="`tooltip${element.id}`"
                    v-show="index == tooltip.id"
                    v-html="formatTooltip(element)"
                    @mouseenter="touchedToolTip"
                  ></div>
                </div>
              </transition-group>
            </div>-->

            <transition name="fade">
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
                    <g v-grid:gridLine="scale" class="grid-lines"></g>
                  </g>
                  <g v-for="(e, i) in data" :key="i" :id="`bin${i}`">
                    <transition name="fade">
                      <g v-if="show" :id="`${e.id}`">
                        <g v-for="(f, j) in e.positions" :key="`${i}${f.name}`">
                          <transition name="fade">
                            <g
                              :transform="
                                `translate(${scale.x(
                                  e.bin
                                )},${findVerticalPosition(e.positions, j)})`
                              "
                            >
                              <path
                                v-show="show"
                                :class="
                                  `positions path ${
                                    f.category
                                  } position${j} stroke-${
                                    f.name
                                  } stroke-deactive-${f.category}`
                                "
                                fill="none"
                                stroke="currentColor"
                                stroke-width="0.5"
                                :d="f.path.fill"
                              ></path>
                              <path
                                v-show="
                                  show & positionsArray[j].checked & (f.val > 0)
                                "
                                :class="
                                  `positions path ${
                                    f.category
                                  } position${j} stroke-${
                                    f.name
                                  } stroke-deactive-${f.category}`
                                "
                                fill="none"
                                stroke="currentColor"
                                stroke-width="0.8"
                                :d="f.path.stroke"
                              ></path>

                              <text
                                :x="scale.x.bandwidth() / 2"
                                y="-10"
                                :class="
                                  `positions text text-no-opacity bold fill-${
                                    f.name
                                  } position${j}`
                                "
                                text-anchor="middle"
                              >
                                $ {{ showCurrentWelfareOrIncomeBefore(f, j) }}
                              </text>
                            </g>
                          </transition>
                        </g>
                        <g :transform="`translate(${0},${lineYPosition(e)})`">
                          <line
                            class="positions"
                            :x1="scale.x(e.bin) - scale.x.bandwidth() * 0.2"
                            :x2="scale.x(e.bin) + scale.x.bandwidth() * 1.2"
                            :stroke="decideStrokeColor(i)"
                            stroke-width="3"
                            stroke-dasharray="0.5 5"
                            stroke-linecap="round"
                          ></line>
                        </g>
                      </g>
                    </transition>
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
                      @mouseenter="mouseenterBarsOneTip"
                      @mousemove="mousemoveBarsOneTip"
                      @mouseout="mouseleaveBarsOneTip"
                      @click="clickBars"
                    ></rect>
                    <!-- @mousemove="mousemoveBars"
                    @mouseout="mouseleaveBars"-->
                  </g>

                  <rect
                    x="0"
                    :y="height"
                    :height="margin.bottom"
                    :width="width"
                    fill="#fcfcfc"
                  ></rect>
                  <text
                    class="graph-label"
                    :transform="`translate(${width}, ${height + 25})`"
                    text-anchor="end"
                    fill="currentColor"
                  >
                    *X
                  </text>
                  <g
                    v-axis:x="scale"
                    :transform="`translate(${0}, ${height})`"
                    class="x-axis"
                  ></g>
                  <text
                    class="graph-label"
                    :transform="`translate(${0},-10)`"
                    text-anchor="end"
                    fill="currentColor"
                  >
                    *Y
                  </text>
                  <g v-axis:y="scale" class="y-axis"></g>
                </g>
              </svg>
            </transition>
          </div>
        </div>
        <!-- Index 0 ******************************************************************** -->
        <div
          class="step1 scrolling-over-container"
          data-step="a"
          id="start-of-the-intro2"
        >
          <!-- v-if="insight == 'intro'" -->
          <div class="scrolling-over-content">
            <h5>UIG Scheme 2, Introduction</h5>
            <div class="unhug-bottom">
              In comparsion to the previous scheme this one has a slightly different approach. 
              The idea is to decide which existing welfare programs can replaced by an income guarantee.
              The overall savings are then used to grant a certain amount of lower income groups a UIG.
            </div>
            To learn how you can interact with some additions to the previous graph, you can just keep on
            <span class="bold">scrolling.</span>
            <!-- <button class="button" @click="startIntro">
              scroll through a small introduction.
            </button>-->
            <p>
              Or you can
              <!-- <a href="#end-of-intro2"> -->
                <button class="button" @click="skipIntro">
                  skip the introduction.
                </button>
              <!-- </a> -->
            </p>
          </div>
        </div>
        <!-- Index 1 ******************************************************************** -->
        <div class="step2 scrolling-over-container" data-step="b">
          <!-- v-if="insight == 'introLegendA'" -->
          <div class="scrolling-over-content">
            <div>
              <h5>New lines</h5>
            </div>
            <div class="unhug-top">
              This line&nbsp;
              <svg
                class="inline-svg"
                v-if="isLoaded"
                :width="scale.x.bandwidth() * 1.6"
                height="5"
              >
                <line
                  x1="0"
                  y1="1"
                  :x2="scale.x.bandwidth() * 1.6"
                  y2="1"
                  stroke="rgba(0,0,0,0.6)"
                  stroke-width="2"
                  stroke-dasharray="1 3"
                  stroke-linecap="round"
                ></line>
              </svg>
              above each stacked bar group indicates how much the sum of income
              and benefits was before you made any changes. It will turn
              <span class="regular color-negative">red</span> if the result of
              this group is negative. It turns
              <span class="regular color-positive">green</span> if the group
              profits from your configuration.
            </div>
          </div>
        </div>
        <!-- Index 2 ******************************************************************** -->
        <div class="step3 scrolling-over-container" data-step="d">
          <div class="scrolling-over-content">
            <div>
              <h5>Scale again</h5>
              <div class="unhug-top">
                You still have 2 options to focus just on benefits or zoom in to see more detailed differences:
              </div>
              <div class="simple-flex unhug-top">
                <div class>
                  Uncheck this box to hide incomes:
                  <label class="checkbox-container sans">
                    <div class="color-minc center">Income without benefits</div>
                    <input
                      v-if="isLoaded"
                      type="checkbox"
                      v-model="positionsArray[0].checked"
                      @click="togglePosition(0)"
                    />
                    <span class="checkmark"></span>
                  </label>
                </div>
                <div>or</div>
                <div>
                  Zoom on the first 6 groups with this icon:
                  <div class="zoom-container unhug-top-175" @click="scaleYAxis">
                    <div class="icon-medium">
                      <zoomIcon class="zoom-icon" />
                      <div
                        class="small sans color-light plusOrMinus pom-scroll-adjust"
                      >
                        {{ zoomSign[0] }}
                      </div>
                    </div>
                    <p class="sans zoomText color-light">
                      Zoom {{ zoomSign[1] }} the Y-axis
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <!-- Index 3 ******************************************************************** -->
        <div class="step4 scrolling-over-container" data-step="d">
          <div class="scrolling-over-content">
            <div>
              <h5>The welfare interface</h5>
              In this scheme the idea is to replace current welfare benefits
              with a UIG. You can hover over the different categories to see how
              they affect incomes in all groups and select them individually. – But for now let’s
              <p v-if="!allWelfareUnchecked">
                <button @click="uncheckAll">
                  see a scenerio where all the listed welfare is replaced
                </button>
              </p>
              <p v-else-if="allWelfareUnchecked">Ok!</p>
            </div>
          </div>
        </div>
        <!-- Index 4 ******************************************************************** -->
        <div class="step5 scrolling-over-container" data-step="d">
          <div class="scrolling-over-content">
            <div>
              <div>
                We can now activate the UIG.
                <label
                  class="checkbox-inline checkbox-container sans color-primary checkbox-primary"
                >
                  <input
                    v-if="isLoaded"
                    v-show="positionsArray[positionsArray.length - 1].checked"
                    type="checkbox"
                    v-model="positionsArray[positionsArray.length - 1].checked"
                    @click="togglePosition(positionsArray.length - 1)"
                  />
                  <span class="checkmark checkmark-primary"></span>
                </label>
              </div>
              <transition name="fade">
                <div
                  v-if="isLoaded"
                  v-show="onlyUIG[0].checked"
                  class="unhug-top"
                >
                  Now we have to decide how many of the lower income groups
                  should benefit from it. <br>
                  <button @click="setUIGBinsTo5">The lower five income groups</button> are a good place to start.
                </div>
              </transition>
              <div v-if="uigChanged & (numOfUIGBins == 5)" class="unhug-top">
                Great! Now every household with an income less than the upper
                boundary of group 5,
                <span class="regular color-primary"
                  >$ {{ UIGthresholdF }},</span
                >
                will get 50 % of the difference to the threshold as an income
                guarantee.
              </div>
            </div>
          </div>
        </div>
        <!-- Index 5 ******************************************************************** -->
        <div class="step6 scrolling-over-container" data-step="d">
          <div class="scrolling-over-content">
            <div>
              <h5>The balance</h5>
              Our changes result in a overall balance of
              <span :class="`bold color-${balancePosOrNeg}`"
                >$ {{ currentBalanceF.join(" ") }}.</span
              >
              Still room to tweak this scheme! We could think about whether some
              welfare programs should still be active, or adjust the amount of
              groups that benefit from the UIG.
              <br />
              <br />Scroll a little bit further… <br />and you’ll see a summary
              of the effects of your changes below the graph and can start using
              it.
              <p class="bold color-primary">Enjoy exploring!</p>
              <!-- <div class="unhug-top">
                <button @click="readyToChange">Enjoy exploring!</button>
              </div>-->
            </div>
          </div>
        </div>
        <!-- Index 6 ******************************************************************** -->
        <div class="step7" data-step="d" id="end-of-intro2">
          <hr />
        </div>
        <!-- Index 7 ******************************************************************** -->
        <div class="step8" data-step="d">
          <hr />
        </div>
        <!-- Template ******************************************************************** -->
        <!-- <div class="stepX scrolling-over-container" data-step="d">
          <div class="scrolling-over-content">
            X
          </div>
        </div>-->
      </Scrollama>

      <!-- <button class="sans bold" @click="scaleYAxis">scale y-axis</button> -->
      <div class="insight sans light">
        <div v-if="insight == 'readyToChange'">
          <transition name="fade">
            <div v-show="uigChanged">
              <span class="regular">
                Households earning less than {{ UIGthresholdF }} $ receive a
                UIG.
              </span>
              They represent
              {{ currentTotalRecipientPercentagePopulationF }} % of the
              population and receive on average
              <span :class="`regular color-${currentAvgPosOrNeg}`">
                {{ currentAvgIncomeDifferenceRecipientHouseholds }} $
                {{ currentAvgMoreOrLess }}
              </span>
              benefits than before.
            </div>
          </transition>
          <transition name="fade">
            <div v-show="welfareChanged">
              <span class="regular">
                {{ connectingWordInInsight }}
                {{ currentTotalNonRecipientHouseholdsF }} households not
                receiving a UIG
              </span>
              will on average experience a loss of welfare benefits equal to
              <span class="regular color-negative"
                >{{ avgPercentageChangeNonRecipients }} %</span
              >
              of their original income.
            </div>
          </transition>
          <transition name="fade">
            <div v-show="!anythingChanged">
              This is the income distribution in the US without any changes in
              2017.
            </div>
          </transition>
          <div class="return-button">
            <a href="#start-of-the-intro2">
              <button @click="startIntro" class="small">
                Back to the intro
              </button>
            </a>
          </div>
        </div>
        <div class="standard-hidden">
            <a href="#thank-you"
            ><button @click="" class="small">
              >
            </button></a>
          </div>
      </div>
      <!-- <div id="end-of-insight"><hr></div> -->
    </div>
    <div class="margin-right">
      <div v-if="isLoaded" class="budget grid-vertical-container">
        <div class="budget-calculations blur" id="selectBudget">
          <h5 class="sans small regular unhug-top">
            Overall balance effects of this scheme:
          </h5>
          <div>
            <div class="border-top-with-note unhug-top">
              <transition name="fade">
                <div v-show-slide="currentTotalSavings != 0">
                  <p class="sans small note-top-unhug">
                    Current subtotal welfare savings ($):
                  </p>
                  <p class="sans bold align-right">
                    {{ currentTotalSavingsF }}
                  </p>
                </div>
              </transition>
              <transition name="fade">
                <div v-show-slide="currentTotalSpendings != 0">
                  <p class="sans small">Current subtotal UIG spendings ($):</p>
                  <p class="sans bold align-right">
                    {{ currentTotalSpendingsF }}
                  </p>
                </div>
              </transition>
            </div>
            <div class="simple-flex border-top-with-note">
              <p class="sans bold note-top-unhug">Balance ($):</p>
              <div>
                <div
                  class="sans bold note-top-unhug"
                  v-html="currentBalanceHTML"
                ></div>
                <p
                  v-if="currentBalance != 0"
                  class="small sans regular color-standard align-right"
                >
                  &#8776; {{ currentBalanceAsPercentageOfGDP }}&#8201;% of GDP,
                  <br />
                  {{ currentBalanceAsPercentageOfFedExp }}&#8201;% of fed. exp.
                </p>
              </div>
            </div>
          </div>
        </div>
        <div class="spacer-auto"></div>
        <div class="legend-for-graph">
          <div class="border-top-with-note blur" id="selectLegend">
            <p class="sans small note-top-unhug">Legend:</p>
            <div class="sans small note-top-unhug simple-flex-row-nowrap">
              <div class="bold">*Y:</div>
              <div class="unhug-left-tiny">
                Household income with benefits and tax credits, before taxes
                ($), 2017
              </div>
            </div>
            <div class="sans small note-top-unhug simple-flex-row-nowrap">
              <div class="bold">*X:</div>
              <div class="unhug-left-tiny">
                Household income brackets without benefits, before taxes ($),
                2017
              </div>
            </div>
            <div class="unhug-top-small">
              <div class="simple-flex-center">
                <svg
                  class="inline-svg"
                  v-if="isLoaded"
                  :width="scale.x.bandwidth() * 1.6"
                  height="3"
                >
                  <line
                    x1="0"
                    y1="1"
                    :x2="scale.x.bandwidth() * 1.6"
                    y2="1"
                    stroke="rgba(0,0,0,0.6)"
                    stroke-width="2"
                    stroke-dasharray="1 3"
                    stroke-linecap="round"
                  ></line>
                </svg>
                <p class="sans small legend-description">
                  Situation before changes
                </p>
              </div>
              <div class="simple-flex-center">
                <svg
                  class="inline-svg"
                  v-if="isLoaded"
                  :width="scale.x.bandwidth() * 1.6"
                  height="3"
                >
                  <line
                    x1="0"
                    y1="1"
                    :x2="scale.x.bandwidth() * 1.6"
                    y2="1"
                    stroke="rgba(51,160,44,1)"
                    stroke-width="2"
                    stroke-dasharray="1 3"
                    stroke-linecap="round"
                  ></line>
                </svg>
                <p class="sans small color-positive legend-description">
                  More after changes
                </p>
              </div>
              <div class="simple-flex-center">
                <svg
                  class="inline-svg"
                  v-if="isLoaded"
                  :width="scale.x.bandwidth() * 1.6"
                  height="3"
                >
                  <line
                    x1="0"
                    y1="1"
                    :x2="scale.x.bandwidth() * 1.6"
                    y2="1"
                    stroke="rgba(227,26,28, 1)"
                    stroke-width="2"
                    stroke-dasharray="1 3"
                    stroke-linecap="round"
                  ></line>
                </svg>
                <p class="sans small color-negative legend-description">
                  Less after changes
                </p>
              </div>
            </div>
            <div class="unhug-top-small">
              <div class="simple-flex-center">
                <svg
                  class="inline-svg"
                  v-if="isLoaded"
                  :width="scale.x.bandwidth() * 1.6"
                  height="30"
                >
                  <path
                    :transform="`translate(1, 1)`"
                    stroke-width="0.5"
                    fill="none"
                    stroke="currentColor"
                    :d="legendPathTransfers.fill"
                  ></path>
                  <path
                    :transform="`translate(1, 1)`"
                    stroke-width="0.5"
                    fill="none"
                    stroke="currentColor"
                    :d="legendPathTransfers.stroke"
                  ></path>
                </svg>
                <p class="sans small legend-description">
                  Welfare or UIG benefits
                </p>
              </div>
            </div>
            <div class="simple-flex-center unhug-top-tiny">
              <svg
                class="inline-svg"
                v-if="isLoaded"
                :width="scale.x.bandwidth() * 1.6"
                height="30"
              >
                <path
                  :transform="`translate(1, 1)`"
                  stroke-width="0.5"
                  fill="none"
                  stroke="currentColor"
                  :d="legendPathMarketIncome.fill"
                ></path>
                <path
                  :transform="`translate(1, 1)`"
                  stroke-width="0.5"
                  fill="none"
                  stroke="currentColor"
                  :d="legendPathMarketIncome.stroke"
                ></path>
              </svg>
              <p class="sans small legend-description">
                Income without benefits
              </p>
            </div>
          </div>
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
import { setTimeout } from 'timers';

export default {
  name: "graphModelOne",
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
      svgHeight: 660,
      margin: { top: 25, left: 40, bottom: 70, right: 2 },
      tooltip: { id: -1, left: null, top: null, html: "Test" },
      tooltipStay: false,
      show: true,
      mouseDown: false,
      isLoaded: false,
      moe: false,
      yAxisScaled: false,
      previousScrollPosition: 0,
      numOfUIGBins: 0,
      zoomSign: ["+", "in"],
      insight: "intro",
      introUIGActive: false,
      allIntroElements: [
        "selectLegend",
        "selectScale",
        "selectWelfare",
        "selectHeadline",
        "selectUIG",
        "selectBudget"
      ],
      currentTotalIncomeDifferenceRecipientHouseholds: 0,
      currentAvgIncomeDifferenceRecipientHouseholds: 0,
      totalWeightedPercentageChangeNonRecipients: 0,
      avgPercentageChangeNonRecipients: 0,
      gdpUSA2017: 19390600000000,
      fedGovExpUSA2017: 3980311000000,
      featuresOpen: false
    };
  },
  computed: {
    width() {
      return this.svgWidth - this.margin.left - this.margin.right;
    },
    height() {
      return this.svgHeight - this.margin.top - this.margin.bottom;
    },
    maxValue() {
      let max = 0;
      for (const e of this.data) {
        if (max < e.totalIncome) {
          max = e.totalIncome;
        }
      }
      return this.totalMax;
    },
    scale() {
      const x = d3
        .scaleBand()
        .domain(this.data.map(x => x.bin))
        .rangeRound([0, this.width])
        .padding(0.4);
      const y = d3
        .scaleLinear()
        // .domain([
        //   0,
        //   () => {
        //     return 1 * this.maxValue;
        //   }
        // ])
        .domain([0, this.maxValue * 1.01])
        // .domain([0, Math.max(...this.data.map(x => x.totalIncome))])
        .rangeRound([this.height, 0]);
      const gridLine = d3
        .scaleLinear()
        .domain([0, this.maxValue * 1.01])
        .rangeRound([this.height, 0]);
      return { x, y, gridLine };
    },
    legendPathMarketIncome() {
      return this.computeGenericPath(this.scale.x.bandwidth() * 1.55, 28, 0);
    },
    legendPathTransfers() {
      return this.computeGenericPath(this.scale.x.bandwidth() * 1.55, 28, 1);
    },
    legendPathMarketIncomeSmall() {
      return this.computeGenericPath(this.scale.x.bandwidth() * 1.55, 14, 0);
    },
    legendPathTransfersSmall() {
      return this.computeGenericPath(this.scale.x.bandwidth() * 1.55, 14, 1);
    },
    positionsOnlyWelfare() {
      return this.positionsArray.slice(1, this.positionsArray.length - 1);
    },
    positionsOnlyWelfareR() {
      // eslint-disable-next-line vue/no-side-effects-in-computed-properties
      return this.positionsOnlyWelfare.reverse();
    },
    onlyIncome() {
      return this.positionsArray.slice(0, 1);
    },
    onlyUIG() {
      return this.positionsArray.slice(this.positionsArray.length - 1);
    },
    totalHousholds() {
      let sum = 0;
      for (const e of this.data) {
        sum += e.populationDetails.hhtotal.val;
      }
      return sum;
    },
    totalHousholdsF() {
      const f = d3.format(".2s");
      return f(this.totalHousholds);
    },
    currentTotalSavings() {
      let sum = 0;
      for (const e of this.positionsOnlyWelfare) {
        if (e.checked == false) {
          sum += e.savings;
        }
      }
      return sum;
    },
    currentTotalSavingsF() {
      const f = d3.format(".3s");
      const d3FormatString = f(this.currentTotalSavings);
      return this.lazyfixFormat(d3FormatString);
    },
    UIGthreshold() {
      if (this.isLoaded && this.numOfUIGBins > 0) {
        const binIndex = this.numOfUIGBins - 1;
        return this.data[binIndex].binDetails.ul;
      } else {
        return 0;
      }
    },
    welfareChanged() {
      let welfareChanged = false;
      for (const position of this.positionsOnlyWelfare) {
        if (position.checked == false) {
          welfareChanged = true;
        }
      }
      return welfareChanged;
    },
    uigChanged() {
      let uigChanged = false;

      if (this.numOfUIGBins > 0 && this.onlyUIG[0].checked == true) {
        uigChanged = true;
      }
      return uigChanged;
    },
    anythingChanged() {
      let anythingChanged = false;
      if (this.welfareChanged || this.uigChanged) {
        anythingChanged = true;
      }
      return anythingChanged;
    },
    bothChanged() {
      let bothChanged = false;
      if (this.welfareChanged && this.uigChanged) {
        bothChanged = true;
      }
      return bothChanged;
    },
    connectingWordInInsight() {
      let connectingWordInInsight = "With the current changes in welfare";
      if (this.bothChanged) {
        connectingWordInInsight = "But";
      }
      return connectingWordInInsight;
    },

    UIGthresholdText() {
      return this.UIGthreshold + 1;
    },
    UIGthresholdF() {
      const f = d3.format(",d");
      const d3FormatString = f(this.UIGthresholdText);
      return d3FormatString;
    },
    currentTotalSpendings() {
      let sum = 0;
      for (let i = 0; i < this.numOfUIGBins; i++) {
        const positionOfUIG = this.positionsArray.length - 1;
        const meanCostsInThisBracket = this.data[i].positions[positionOfUIG]
          .val;
        // console.log(meanCostsInThisBracket);
        const householdsInThisBracket = this.data[i].populationDetails.hhtotal
          .val;
        const totalCostsInThisBracket =
          meanCostsInThisBracket * householdsInThisBracket;
        sum += totalCostsInThisBracket;
      }
      return sum;
    },
    currentTotalSpendingsF() {
      const f = d3.format(".3s");
      const d3FormatString = f(this.currentTotalSpendings);
      return this.lazyfixFormat(d3FormatString);
    },
    currentBalance() {
      const balance = this.currentTotalSavings - this.currentTotalSpendings;
      return balance;
    },
    currentBalanceF() {
      const f = d3.format(".3s");
      const d3FormatString = f(this.currentBalance);
      const formatArray = this.lazyfixFormat(d3FormatString).split(" ");
      if (formatArray[0] == 0) {
        formatArray[0] = parseInt(formatArray[0]);
      }
      if (typeof formatArray[1] == "undefined") {
        formatArray[1] = "";
      }
      return formatArray;
    },
    gdpUSA2017F() {
      const f = d3.format(".3s");
      const d3FormatString = f(this.gdpUSA2017);
      return this.lazyfixFormat(d3FormatString);
    },
    balancePosOrNeg() {
      let posOrNeg = this.currentBalance >= 0 ? "positive" : "negative";
      if (this.currentBalance == 0) {
        posOrNeg = "neutral";
      }
      return posOrNeg;
    },
    currentBalanceAsPercentageOfGDP() {
      let percentage = (this.currentBalance / this.gdpUSA2017) * 100;
      percentage = parseFloat(percentage.toFixed(1));
      return percentage;
    },
    currentBalanceAsPercentageOfFedExp() {
      let percentage = (this.currentBalance / this.fedGovExpUSA2017) * 100;
      percentage = parseFloat(percentage.toFixed(1));
      return percentage;
    },
    currentBalanceHTML() {
      let posOrNeg = this.currentBalance >= 0 ? "positive" : "negative";
      const htmlString = `<div class="align-right color-${posOrNeg}"><div class="huge">${
        this.currentBalanceF[0]
      }</div><div class="huge-label">${this.currentBalanceF[1]}</div></div>`;
      return htmlString;
    },
    currentTotalNonRecipientHouseholds() {
      let sum = 0;
      for (let i = 0; i < this.data.length; i++) {
        if (i >= this.numOfUIGBins) {
          sum += this.data[i].populationDetails.hhtotal.val;
        }
      }
      return sum;
    },
    currentTotalNonRecipientHouseholdsF() {
      const f = d3.format(".3s");
      const d3FormatString = f(this.currentTotalNonRecipientHouseholds);
      return this.lazyfixFormat(d3FormatString);
    },
    currentTotalRecipientHouseholds() {
      let sum = 0;
      for (let i = 0; i < this.numOfUIGBins; i++) {
        sum += this.data[i].populationDetails.hhtotal.val;
      }
      return sum;
    },
    currentTotalRecipientHouseholdsF() {
      const f = d3.format(".3s");
      const d3FormatString = f(this.currentTotalRecipientHouseholds);
      return this.lazyfixFormat(d3FormatString);
    },
    currentAvgPosOrNeg() {
      let posOrNeg =
        this.currentAvgIncomeDifferenceRecipientHouseholds >= 0
          ? "positive"
          : "negative";
      if (this.currentAvgIncomeDifferenceRecipientHouseholds == 0) {
        posOrNeg = "neutral";
      }
      return posOrNeg;
    },
    currentAvgMoreOrLess() {
      let moreOrLess =
        this.currentAvgIncomeDifferenceRecipientHouseholds >= 0
          ? "more"
          : "less";
      if (this.currentAvgIncomeDifferenceRecipientHouseholds == 0) {
        moreOrLess = "";
      }
      return moreOrLess;
    },
    currentTotalRecipientPercentagePopulation() {
      let sum = 0;
      for (let i = 0; i < this.numOfUIGBins; i++) {
        sum += this.data[i].populationDetails.percentageOfTotalPersons;
      }
      return sum;
    },
    currentTotalRecipientPercentagePopulationF() {
      const f = d3.format(".3s");
      const d3FormatString = f(this.currentTotalRecipientPercentagePopulation);
      return this.lazyfixFormat(d3FormatString);
    },
    allWelfareUnchecked() {
      let sum = 0;
      for (const e of this.positionsOnlyWelfare) {
        if (e.checked) {
          sum++;
        }
      }
      return sum == 0;
    },
    positiveBins() {
      let binArray = [];
      for (const bin of this.data) {
        if (bin.totalWelfareBefore < bin.totalCurrentTransfers) {
          // console.log(bin.bin);
          let percentageOfTotalPopulation =
            bin.populationDetails.tpersons.val / (3.2 * Math.pow(10, 8));
          bin["percentageOfTotalPopulation"] = percentageOfTotalPopulation;
          binArray.push(bin);
        }
      }
      return binArray;
    }
  },
  watch: {
    data: {
      deep: true,
      handler(update) {
        // console.log("data has changed", update);
      }
    },
    positionsArray: {
      deep: true,
      // eslint-disable-next-line no-unused-vars
      handler(update) {
        // console.log("positionsArray has changed");
        setTimeout(() => {
          this.computeData();
          this.calculateUIGInAllBins();
          this.calculateTotalIncomePerBin();
          this.calculateMaxMax();
          this.computeAllPaths();
        }, 800); // was 1200
      }
    },
    numOfUIGBins() {
      this.doAfterIncomeBracketsChanged();
    },
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
    this.tooltip.left = w * 0.1;
    this.tooltip.top = h * 0.5;
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
      d3.json("data/stata.json").then(d => {
        // console.log(d);
        this.data = d;
        this.doAfterDataIsLoaded();
      });
    },
    doAfterDataIsLoaded() {
      this.isLoaded = true;
      this.computeDataOnlyOnce();
      this.computeData();
      this.positionsArrayCreate();
      this.calculateSavingsOfAllPositions();
      this.calculateTotalIncomePerBin();
      this.calculateMaxMax();
      this.calculateUIGInAllBins();
      this.initiallyUncheckUIG();
      this.computeAllPaths();
      // This doesn’t work currently
      // Idea: you can change the initial state here later by using another function
      // this.positionArrayToggleForAll(false);
    },
    computeDataOnlyOnce() {
      this.calculateTotalIncomePerBinBefore();
      this.calculateTotalWelfarePerBinBefore();
    },
    computeData() {
      this.calculateUpperAndLowerLimit();
    },
    calculateUpperAndLowerLimit() {
      for (const e of this.data) {
        for (const f of e.positions) {
          f.valLowLim = f.val - f.moe;
          f.valUpLim = f.val + f.moe;
          if (this.moe) {
            f.total = f.val + f.moe;
          } else {
            f.total = f.val;
          }
        }
      }
    },
    calculateTotalIncomePerBin() {
      for (const e of this.data) {
        let sum = 0;
        for (const f of e.positions) {
          sum += f.val;
        }
        e.totalIncome = sum;
      }
      this.calculateTotalCurrentTransfersPerBin();
    },
    calculateTotalIncomePerBinBefore() {
      for (const e of this.data) {
        let sum = 0;
        for (const f of e.positions) {
          sum += f.valueBefore;
        }
        e.totalIncomeBefore = sum;
      }
    },
    calculateTotalWelfarePerBinBefore() {
      for (const e of this.data) {
        let sum = 0;
        for (const [j, f] of e.positions.entries()) {
          if (j != 0 && j != e.positions.length - 1) {
            sum += f.val;
          }
        }
        e.totalWelfareBefore = sum;
      }
    },
    calculateTotalCurrentTransfersPerBin() {
      for (const e of this.data) {
        let sum = 0;
        for (const [j, f] of e.positions.entries()) {
          if (j != 0) {
            sum += f.val;
          }
        }
        e.totalCurrentTransfers = sum;
      }
      this.calculateIncomeDifferencePerBin();
    },
    calculateIncomeDifferencePerBin() {
      for (const e of this.data) {
        e.incomeDifference = e.totalCurrentTransfers - e.totalWelfareBefore;
        if (e.incomeDifference == 0) {
          e.incomeDifferenceCat = "neutral";
        } else if (e.incomeDifference > 0) {
          e.incomeDifferenceCat = "positive";
        } else if (e.incomeDifference < 0) {
          e.incomeDifferenceCat = "negative";
        }
      }
      this.calculateIncomeDifferenceAllHouseholdsInBin();
      this.calculateIncomeDifferencePercentagePerBin();
    },
    calculateIncomeDifferencePercentagePerBin() {
      for (const e of this.data) {
        let percentageChange = 0;
        percentageChange = (e.incomeDifference / e.totalIncomeBefore) * 100;
        percentageChange = parseFloat(percentageChange.toFixed(2));
        e.incomeDifferencePercentage = percentageChange;
      }
      this.calculateWeightedPercentageChangePerBin();
    },
    calculateWeightedPercentageChangePerBin() {
      for (const e of this.data) {
        e.weightedPercentageChange =
          e.incomeDifferencePercentage * e.populationDetails.hhtotal.val;
      }
      this.calculateTotalWeightedPercentageChangeNonRecipients();
    },
    calculateIncomeDifferenceAllHouseholdsInBin() {
      for (const e of this.data) {
        e.totalIncomeDifferenceAllHouseholdsInBin =
          e.incomeDifference * e.populationDetails.hhtotal.val;
        e.totalIncomeDifferenceAllHouseholdsInBinPerAdult =
          e.totalIncomeDifferenceAllHouseholdsInBin /
          e.populationDetails.madults.val;
      }
      this.calculateTotalIncomeDifferenceRecipients();
    },
    calculateTotalIncomeDifferenceRecipients() {
      let sum = 0;
      for (let i = 0; i < this.numOfUIGBins; i++) {
        sum += this.data[i].totalIncomeDifferenceAllHouseholdsInBin;
      }
      this.currentTotalIncomeDifferenceRecipientHouseholds = sum;
      this.calculateAvgIncomeDifferenceRecipients();
    },
    calculateAvgIncomeDifferenceRecipients() {
      let avg =
        this.currentTotalIncomeDifferenceRecipientHouseholds /
        this.currentTotalRecipientHouseholds;
      avg = parseInt(avg);
      this.currentAvgIncomeDifferenceRecipientHouseholds = avg;
    },
    calculateTotalWeightedPercentageChangeNonRecipients() {
      let sum = 0;
      for (const [i, e] of this.data.entries()) {
        if (i >= this.numOfUIGBins) {
          sum += e.weightedPercentageChange;
        }
      }
      this.totalWeightedPercentageChangeNonRecipients = sum;
      this.calculateAvgPercentageChangeNonRecipients();
    },
    calculateAvgPercentageChangeNonRecipients() {
      let avg =
        this.totalWeightedPercentageChangeNonRecipients /
        this.currentTotalNonRecipientHouseholds;
      avg = parseFloat(avg.toFixed(2));
      this.avgPercentageChangeNonRecipients = avg;
    },
    calculateSavingsOfAllPositions() {
      // eslint-disable-next-line no-unused-vars
      for (const [i, e] of this.positionsOnlyWelfare.entries()) {
        this.calculateSavingsOfOnePosition(i);
      }
    },
    lazyfixFormat(string) {
      const lazyfix = string
        .replace("M", " million")
        .replace("G", " billion")
        .replace("T", " trillion");
      return lazyfix;
    },
    calculateSavingsOfOnePosition(index) {
      let sum = 0;
      for (const e of this.data) {
        // console.log(e.positions[index]);
        // !!!! +1
        sum +=
          e.positions[index + 1].valueBefore * e.populationDetails.hhtotal.val;
      }
      this.positionsOnlyWelfare[index]["savings"] = sum;
    },
    initiallyUncheckUIG() {
      this.positionsArray[this.positionsArray.length - 1].checked = false;
    },
    doAfterIncomeBracketsChanged() {
      // console.log("input changed");
      if (this.numOfUIGBins >= 0 && this.numOfUIGBins < 10) {
        setTimeout(() => {
          this.computeData();
          this.calculateUIGInAllBins();
          this.calculateTotalIncomePerBin();
          this.calculateUpperAndLowerLimit();
          this.computePathsOfOnePosition(this.positionsArray.length - 1);
          this.calculateMaxMax();
          this.computeAllPaths();
        }, 200); // was 500
      }
    },
    calculateUIGPerBin(i) {
      let e = this.data[i];
      let UIGPositionInBin = e.positions[e.positions.length - 1];
      let incomeInBin = e.positions[0].valueBefore;
      // Negative marginal tax rate = 50 %
      // console.log("num", i, this.numOfUIGBins);
      if (this.onlyUIG[0].checked && i < this.numOfUIGBins) {
        UIGPositionInBin.val = (this.UIGthreshold - incomeInBin) * 0.5;
        UIGPositionInBin.valueBefore = (this.UIGthreshold - incomeInBin) * 0.5;
        UIGPositionInBin.valUpLim = (this.UIGthreshold - incomeInBin) * 0.5;
        UIGPositionInBin.valLowLim = (this.UIGthreshold - incomeInBin) * 0.5;
        UIGPositionInBin.total = (this.UIGthreshold - incomeInBin) * 0.5;
      } else {
        UIGPositionInBin.val = 0;
        UIGPositionInBin.valueBefore = 0;
        UIGPositionInBin.valUpLim = 0;
        UIGPositionInBin.valLowLim = 0;
        UIGPositionInBin.total = 0;
      }
    },
    calculateUIGInAllBins() {
      for (let i = 0; i < this.data.length; i++) {
        this.calculateUIGPerBin(i);
      }
    },
    calculateMaxMax() {
      let max = 0;
      for (const e of this.data) {
        if (max < e.totalIncome) {
          // console.log(max, e.totalIncome);
          max = e.totalIncome;
        }
      }
      this.totalMax = max;
      return max;
    },
    positionsArrayCreate() {
      // console.log(this.data[0].positions);
      this.positionsArray = this.data[0].positions.map(x => {
        return {
          name: x.name,
          longName: x.longName,
          listName: x.listName,
          desc: x.desc,
          checked: true
        };
      });
    },
    positionArrayToggleForAll(bool) {
      for (const position of this.positionsArray) {
        position.checked = bool;
      }
    },
    computePath(val, j) {
      const x = 0;
      const y = 0;
      const w = this.scale.x.bandwidth();
      const h = this.height - this.scale.y(val);
      let hachureAngle = -(90 - 25);
      let hachureGap = 10;
      let fillWeight = 1;
      let fillStyle = "hachure";
      // let fillStyle = "cross-hatch";
      // let fillStyle = "hachure";
      // let fillStyle = "zigzag-line";
      if (j > 0) {
        hachureAngle = -(90 + 25);
        hachureGap = 4.5;
        fillWeight = 1;
        fillStyle = "cross-hatch";
      }
      let roughness = 1;
      if (h < 10) {
        roughness = 0.3;
      }
      if (h > 510) {
        roughness = 0.3;
      }
      let generator = rough.generator();
      let rect = generator.rectangle(x, y, w, h, {
        fill: "rgba(0,0,0,1)",
        stroke: "rgba(0,0,0,1)",
        roughness: roughness,
        fillWeight: fillWeight,
        hachureGap: hachureGap,
        hachureAngle: hachureAngle,
        fillStyle: fillStyle
      });
      let path = generator.toPaths(rect);
      return { stroke: path[1].d, fill: path[0].d };
    },
    computeGenericPath(width, height, j) {
      const x = 0;
      const y = 0;
      const w = width;
      const h = height;
      let hachureAngle = -(90 - 25);
      let hachureGap = 10;
      let fillWeight = 1;
      let fillStyle = "hachure";
      // let fillStyle = "cross-hatch";
      // let fillStyle = "hachure";
      // let fillStyle = "zigzag-line";
      if (j > 0) {
        hachureAngle = -(90 + 25);
        hachureGap = 5;
        fillWeight = 1;
        fillStyle = "cross-hatch";
      }
      let generator = rough.generator();
      let rect = generator.rectangle(x, y, w, h, {
        fill: "rgba(0,0,0,1)",
        stroke: "rgba(0,0,0,1)",
        roughness: 0.8,
        fillWeight: fillWeight,
        hachureGap: hachureGap,
        hachureAngle: hachureAngle,
        fillStyle: fillStyle
      });
      let path = generator.toPaths(rect);
      return { stroke: path[1].d, fill: path[0].d };
    },
    computePathsOfOnePosition(i) {
      const index = i;
      // eslint-disable-next-line no-unused-vars
      for (const [i, e] of this.data.entries()) {
        const position = e.positions[index];
        position.path = this.computePath(position.val, index);
      }
    },
    computeAllPaths() {
      // eslint-disable-next-line no-unused-vars
      for (const [i, e] of this.data.entries()) {
        for (const [j, f] of e.positions.entries()) {
          f["path"] = this.computePath(f.val, j);
        }
      }
    },
    lineYPosition(e) {
      let valueToScale = 0;
      if (this.positionsArray[0].checked == true) {
        valueToScale = e.totalIncomeBefore;
      } else {
        valueToScale = e.totalWelfareBefore;
      }
      return this.scale.y(valueToScale);
    },
    decideStrokeColor(i) {
      let color = "rgba(0,0,0,0.7)";
      if (this.data[i].incomeDifferenceCat == "neutral") {
        color = "rgba(0,0,0,0.7)";
      } else if (this.data[i].incomeDifferenceCat == "positive") {
        color = "rgba(51,160,44,1)"; // green
      } else {
        color = "rgba(227,26,28, 1)"; // red
      }
      return color;
    },
    plusBins() {
      if (this.numOfUIGBins < 9) {
        this.numOfUIGBins++;
      }
    },
    minusBins() {
      if (this.numOfUIGBins > 0) {
        this.numOfUIGBins--;
      }
    },
    mouseenterCheckboxes(e) {
      // position indey in this case
      const i = parseInt(e.target.id);
      // console.log(i);
      this.findPositionAndToggleDeactive(i);
    },
    showCurrentWelfareOrIncomeBefore(f, j) {
      let valueToShow = "";
      // console.log(f, j);
      if (j == 0) {
        valueToShow = f.valueBefore;
        if (this.positionsArray[0].checked == false) {
          [].map.call(this.$el.querySelectorAll(`text.position0`), e => {
            e.classList.add("rotateText");
          });
        } else {
          [].map.call(this.$el.querySelectorAll(`text.position0`), e => {
            e.classList.remove("rotateText");
          });
        }
      } else {
        valueToShow = f.val;
      }
      return valueToShow;
    },
    mouseleaveCheckboxes(e) {
      // position indey in this case
      const i = parseInt(e.target.id);
      // console.log(i);
      this.findPositionAndToggleDeactive(i);
    },
    findPositionAndToggleDeactive(i) {
      const positionNum = i;
      [].map.call(this.$el.querySelectorAll(`.positions`), e => {
        e.classList.toggle("positions-less-opacity");
        // if (!e.classList.contains(`.position${positionNum}`)) {
        // }
      });
      [].map.call(this.$el.querySelectorAll(`.position${positionNum}`), e => {
        e.classList.toggle("positions-less-opacity");
        e.classList.toggle("more-stroke");
        // Colors
        if (e.classList.contains("income")) {
          e.classList.toggle("stroke-deactive-income");
        } else if (e.classList.contains("welfare")) {
          e.classList.toggle("stroke-deactive-welfare");
        } else if (e.classList.contains("uig")) {
          e.classList.toggle("stroke-deactive-uig");
        } else if (e.classList.contains("text")) {
          e.classList.toggle("text-no-opacity");
        }
      });
    },
    mouseenterBarsOneTip(e) {
      this.findBinAndToggleDeactive(e);
      let tooltip = this.$el.querySelector(`#tooltip`);
      tooltip.classList.remove("tooltip-zero-opacity");
      const i = e.target.id;
      const element = this.data[i];
      this.tooltip.html = this.formatTooltip(element);
    },
    findBinAndToggleDeactive(e) {
      const binNum = e.target.id;
      [].map.call(this.$el.querySelectorAll(`#bin${binNum} .path`), e => {
        e.classList.toggle("more-stroke");
        // Colors
        if (e.classList.contains("income")) {
          e.classList.toggle("stroke-deactive-income");
        } else if (e.classList.contains("welfare")) {
          e.classList.toggle("stroke-deactive-welfare");
        } else if (e.classList.contains("uig")) {
          e.classList.toggle("stroke-deactive-uig");
        }
      });
    },
    mousemoveBarsOneTip(e) {
      if (!this.tooltipStay) {
        let tooltip = this.$el.querySelector(`#tooltip`);
        tooltip.classList.remove("tooltip-zero-opacity");
        const tooltipHeight = tooltip.getBoundingClientRect().height;
        let mouse = { x: e.clientX, y: e.clientY };
        let w = window.innerWidth;
        let h = window.innerHeight;
        let barWidth = this.scale.x.bandwidth();
        // this.tooltip.left = mouse.x + barWidth;
        if (mouse.x < w / 2) {
          this.tooltip.left = mouse.x + barWidth;
        } else {
          this.tooltip.left = null;
          this.tooltip.left = mouse.x - 450;
        }
        if (mouse.y > h / 2) {
          this.tooltip.top = mouse.y - tooltipHeight - 20;
        } else {
          // this.tooltip.bottom = null;
          this.tooltip.top = mouse.y + 30;
        }
      }
    },
    mouseleaveBarsOneTip(e) {
      this.findBinAndToggleDeactive(e);
      let tooltip = this.$el.querySelector(`#tooltip`);
      tooltip.classList.add("tooltip-zero-opacity");
    },
    clickBars(e) {
      let tooltip = this.$el.querySelector(`#tooltip`);
      tooltip.classList.toggle("tooltip-stay");
      if (this.tooltipStay) {
        this.tooltipStay = false;
      } else {
        this.tooltipStay = true;
      }
    },
    touchedToolTip(e) {
      console.log("happened");
      let tooltip = this.$el.querySelector(`#tooltip`);
      setTimeout(() => {
        tooltip.classList.remove("tooltip-hidden");
      }, 800);
      tooltip.classList.add("tooltip-hidden");
    },
    formatTooltip(e) {
      const f = d3.format(",d");
      const fbig = d3.format(".2s");

      let posOrNeg = e.incomeDifference >= 0 ? "positive" : "negative";
      if (e.incomeDifference == 0) {
        posOrNeg = "neutral";
      }

      let positionshtml = "";

      // <div class="italic tooltip-right"> +/- $ ${position.moe}</div>
      for (const [i, position] of e.positions.entries()) {
        if (this.positionsArray[i].checked == true || i == 0) {
          positionshtml += `<div class="small simple-flex-bottom unhug-bottom-tooltip tooltip-p color-${
            position.name
          }">
          <div>${position.ttName}:</div>
           <div class="">$&nbsp;${f(position.val)}</div></div>`;
        }
      }
      let percentagehtml = "";

      if (this.anythingChanged) {
        percentagehtml = `
        <div class="unhug-top small simple-flex-bottom">
          <div class="bold color-${posOrNeg}">
            Income change:
          </div>
          <div class="bold color-${posOrNeg}">
            ${e.incomeDifferencePercentage} %
          </div>
        </div>`;
      }

      let tooltiphtml = `<div class="graph-label">Income range: ${e.bin}</div>
      <p class="small">
        # of households: ${this.lazyfixFormat(
          fbig(e.populationDetails.hhtotal.val)
        )} <br />
        % of population: ${e.populationDetails.percentageOfTotalPersons} <br />
        Original total income: $ ${f(e.totalIncomeBefore)} <br />
        
      </p>
      <div class="tooltip-table-start">${positionshtml}</div>
      <div class="small tooltip-table-end simple-flex-bottom">
        <div class="color-medium">
          Current income total:
        </div>
        <div class="color-medium">
          $ ${f(e.totalIncome)}
        </div>
      </div>
      <div>${percentagehtml}</div>
      `;
      return tooltiphtml;
    },
    clickOnUIGCheckbox() {
      this.togglePosition(this.positionsArray.length - 1);
      // setTimeout(() => {
      //   const endOfIntro = this.$el.querySelector("#end-of-intro2");
      //   endOfIntro.scrollIntoView({ behavior: "smooth", block: "start" });
      //   console.log(endOfIntro);
      // }, 510);
    },
    togglePosition(i) {
      // console.log(i);
      const index = i;
      let checkedAtIndex = this.positionsArray[index].checked;
      // console.log(checkedAtIndex);
      if (checkedAtIndex == true) {
        checkedAtIndex = false;
        for (const e of this.data) {
          const positionObject = e.positions[index];
          positionObject["valueBefore"] = positionObject["val"];
          positionObject["moeBefore"] = positionObject["moe"];
          positionObject["val"] = 0;
          positionObject["moe"] = 0;
        }
      } else if (checkedAtIndex == false) {
        checkedAtIndex = true;
        // console.log(checkedAtIndex);
        for (const e of this.data) {
          const positionObject = e.positions[index];
          positionObject["val"] = positionObject["valueBefore"];
          positionObject["moe"] = positionObject["moeBefore"];
        }
      }
      this.computeData();
      this.calculateUpperAndLowerLimit();
      this.computePathsOfOnePosition(index);
    },
    toggleFeatures() {
      this.featuresOpen = !this.featuresOpen;
    },
    scaleYAxis() {
       if (!this.yAxisScaled) {
        // console.log(window.scrollY);
        this.previousScrollPosition = window.scrollY;
        this.yAxisScaled = true;
        this.zoomSign = ["-", "out"];
        this.svgHeight = 3000;
        this.computeAllPaths();

        // console.log( document.getElementById("graph-headline1"));
        [].map.call(this.$el.querySelectorAll(`.scrollama-steps`), e => {
          e.classList.add("hidden-steps");
        });
        setTimeout(() => {
          const element_to_scroll_to = document.getElementById("end-of-intro2");
          element_to_scroll_to.scrollIntoView({
            behavior: "smooth"
          });
        }, 1000);
      } else {
        this.zoomSign = ["+", "in"];
        setTimeout(() => {
          [].map.call(this.$el.querySelectorAll(`.scrollama-steps`), e => {
            e.classList.remove("hidden-steps");
          });
          this.yAxisScaled = false;
          this.svgHeight = 700;
          this.computeAllPaths();
        }, 1000);
        window.scrollTo({
          top: this.previousScrollPosition,
          behavior: "smooth"
        })
      }
    },
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
          this.computeAllPaths();
        }
      }, 600); // was 1000
    },
    // This is just to test the modal event, might not be that important
    // eslint-disable-next-line no-unused-vars
    onChange(event) {
      this.computeData();
      this.computeAllPaths();
    },
    findVerticalPosition(array, index) {
      // Note:
      // This was extremely painful,
      // only individualSum is needed to calculate
      // the correct position
      // sum of scale(individual) != scale(sum)
      // … leave the comment in here to remember
      // let sum = 0;
      let individualSum = this.height;
      let arrayUpToPosition = array.slice(0, index + 1);
      for (var i = 0; i < arrayUpToPosition.length; i++) {
        // sum += arrayUpToPosition[i]["val"];
        individualSum -=
          this.height - this.scale.y(arrayUpToPosition[i]["total"]);
      }
      // console.log(
      //   "comparison:",
      //   index,
      //   "valueTotal",
      //   this.scale.y(sum),
      //   "valueindiv",
      //   individualSum
      // );
      // console.log(sum == individualSum);
      return individualSum;
    },
    stepEnterHandler({ element, index, direction }) {
      // console.log("*enter*", element, index, direction);
      if (!this.yAxisScaled) {
        switch (index) {
          case 0:
            this.startIntro();
            break;
          case 1:
            this.goToLegendA();
            break;
          case 2:
            this.goToScaleA();
            break;
          case 3:
            this.goToInterfaceA();
            break;
          case 4:
            this.goToInterfaceB();
            break;
          case 5:
            this.goToBudgetA();
            break;
          case 6:
            break;
          case 7:
            this.readyToChange();
            break;
          default:
            console.log(
              "Sorry, we are out of options, this is index:" + index + "."
            );
        }
      }
    },
    stepExitHandler({ element, index, direction }) {
      // console.log("*exit*", element, index, direction);
      if (!this.yAxisScaled) {
        if (direction == "up") {
          switch (index) {
            case 0:
              break;
            case 1:
              this.startIntro();
              break;
            case 2:
              this.goToLegendA();
              break;
            case 3:
              this.goToScaleA();
              break;
            case 4:
              this.goToInterfaceA();
              break;
            case 5:
              this.goToInterfaceB();
              break;
            case 6:
              break;
            case 7:
              this.goToBudgetA();
              break;
            default:
              console.log(
                "Sorry, we are out of options, this is index:" + index + "."
              );
          }
        }
      }
    },
    blurOne(identifier) {
      let element = this.$el.querySelector(`#${identifier}`);
      if (element) {
        element.classList.add("blur");
      }
    },
    blurList(array) {
      for (const identifier of array) {
        this.blurOne(identifier);
      }
    },
    blurAll() {
      this.blurList(this.allIntroElements);
    },
    unblurOne(identifier) {
      let element = this.$el.querySelector(`#${identifier}`);
      if (element) {
        element.classList.remove("blur");
      }
    },
    unblurList(array) {
      for (const identifier of array) {
        this.unblurOne(identifier);
      }
    },
    unblurAll() {
      this.unblurList(this.allIntroElements);
    },
    readyToChange() {
      this.hideScrollovers();
      this.unblurAll();
      this.insight = "readyToChange";
      // const element_to_scroll_to = document.getElementById("end-of-intro2")
      // element_to_scroll_to.scrollIntoView()
    },
    skipIntro() {
      setTimeout(() => {
        this.unblurAll();
      }, 500);
      this.hideScrollovers();
      this.insight = "readyToChange";
      const element_to_scroll_to = document.getElementById("end-of-intro2")
      element_to_scroll_to.scrollIntoView()
      // this.yZoomActive = true;
    },
    startIntro() {
      this.showScrollovers();
      // const element_to_scroll_to = document.getElementById("start-of-the-intro2")
      // element_to_scroll_to.scrollIntoView()
      this.blurAll();
    },
    goToLegendA() {
      this.blurAll();
      this.unblurOne("selectLegend");
    },
    goToScaleA() {
      this.blurAll();
      this.unblurOne("selectScale");
    },
    goToInterfaceA() {
      this.blurAll();
      this.unblurList(["selectWelfare", "selectHeadline"]);
    },
    uncheckAll() {
      for (const [i, e] of this.positionsOnlyWelfare.entries()) {
        // this.positionsArray[i + 1].checked = true;
        if (this.positionsArray[i + 1].checked == true) {
          this.togglePosition(i + 1);
          this.positionsArray[i + 1].checked = false;
        }
      }
    },
    goToInterfaceB() {
      this.blurAll();
      this.unblurList(["selectUIG", "selectHeadline"]);
    },
    activateUIG() {
      if (
        this.positionsArray[this.positionsArray.length - 1].checked == false
      ) {
        // console.log("… the thing is not checked ");
        this.positionsArray[0].checked = true;
        this.togglePosition(this.positionsArray.length - 1);
      }
    },
    setUIGBinsTo5() {
      this.numOfUIGBins = 5;
      this.introUIGActive = true;
    },
    goToBudgetA() {
      this.showScrollovers();
      this.blurAll();
      this.unblurOne("selectBudget");
    },
    showScrollovers() {
      [].map.call(this.$el.querySelectorAll(`.scrollama-steps`), e => {
          e.classList.remove("hidden-steps");
      });
    },
    hideScrollovers() {
      [].map.call(this.$el.querySelectorAll(`.scrollama-steps`), e => {
          e.classList.add("hidden-steps");
      });
    }
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
          .attr("transform", "rotate(-25)")
          .attr("text-anchor", "end");
      } else {
        // let self = this;
        // x-axis
        d3.select(el)
          .call(d3[axisMethod](methodArg).tickFormat(d3.format("c")))
          .selectAll(".tick text")
          .attr("transform", "rotate(-25) translate(-2,4)")
          .attr("text-anchor", "end")
          .attr("alignment-baseline", "after-edge");
      }
    },
    grid(el, binding) {
      const axis = binding.arg; // x or y
      const axisMethod = { gridLine: "axisLeft" }[axis];
      // The line below assigns the x or y function of the scale object
      const methodArg = binding.value[axis];
      // d3.axisBottom(scale.x)
      d3.select(el).call(
        d3[axisMethod](methodArg)
          .tickFormat("")
          // Fix for actual width
          .tickSize(-1000)
          .ticks(15)
      );
    }
  },
  beforeDestroy() {
    // Unregister the event listener before destroying this Vue instance
    window.removeEventListener("resize", this.onResize);
  }
};
</script>
<style src="vue-scrollama/dist/vue-scrollama.css"></style>
<style scoped lang="scss">
// Credit: https://codepen.io/anon/pen/MRXvdp
$main-color: rgba(255, 255, 255, 0.01);
$secondary-color: rgba(87, 176, 234, 1);
$width: 550px; // Change Me

.move-right {
  margin-left: 0%;
}

.controls {
  position: absolute;
  font-size: 2rem;
  font-weight: 900;
  cursor: pointer;
  padding: 6px 12px;
  top: 1.2rem;
  // opacity: 0;
  color: $secondary-color;
  // color: white;
  // background: $secondary-color;
  border-radius: 50%;
}
.controls:hover {
  color: white;
  background: $secondary-color;
}
.control-minus {
  left: 0%;
}
.control-plus {
  left: 83%;
}

.group.bignumberinput {
  width: 100%;
  height: $width/5;
  overflow: hidden;
  position: relative;
}

label.bignumberinput {
  position: absolute;
  text-align: center;
  top: 2.8rem;
  left: 10%;
  width: 80%;
  color: $secondary-color;
  font-size: 1.6rem;
  line-height: 1.5rem;
  cursor: text;
  transition: 0.25s ease;
  // content: "enter a number";
}

input.bignumberinput {
  text-align: center;
  display: block;
  // margin-left: 42%;
  margin-top: 0rem;
  width: 100%;
  // padding-top: $width/15;
  border: none;
  border-radius: 0; // For iOS
  // border-bottom: solid $width/150 rgba(white, .5);
  color: $secondary-color;
  background: $main-color;
  font-size: 5rem;
  font-weight: 900;
  transition: 0.3s 0.2s ease;
  &:invalid {
    color: grey;
    ~ label {
      color: grey;
    }
    ~ .controls {
      color: grey;
      opacity: 0;
    }
    ~ .bar {
      background: grey;
    }
  }
  &:valid {
    // border-bottom-color: rgba(white, .5);
    ~ label {
      top: 7.4rem;
      font-size: 1.6rem;
      color: $secondary-color;
      text-align: center;
    }
    ~ .control-plus {
      left: 64%;
    }
    ~ .control-minus {
      left: 22%;
    }
    ~ .bar {
      // text-align: center;
      margin-left: 43%;
      width: 4rem;
      height: 0.1rem;
    }
  }
  &:focus {
    outline: none;
    // border-bottom-color: $secondary-color;
    ~ label {
      top: 7.4rem;
      // left: 3.8rem;
      font-size: 1.4rem;
      font-weight: 900;
      color: $secondary-color;
      text-align: center;
    }
    ~ .bar {
      margin-left: 43%;
      width: 4rem;
      height: 0.4rem;
      background: $secondary-color;
    }
    ~ .controls {
      // color: $secondary-color;
    }
    ~ input {
      color: $secondary-color;
    }
  }

  // Stop Chrome's hideous pale yellow background on auto-fill

  &:-webkit-autofill {
    -webkit-box-shadow: 0 0 0px 1000px $main-color inset;
    -webkit-text-fill-color: $secondary-color !important;
    // border-bottom-color: rgba(white, .5);
  }
}

.bar.bignumberinput {
  // background: $secondary-color;
  background: $secondary-color;
  content: "";
  width: 100%;
  height: 0.1rem;
  margin-top: 0.6rem;
  position: relative;
  // // transform: translateX(-100%);
  // transition: .3s ease;

  // &:before {
  //   content: '';
  //   // position: absolute;
  //   width: 100%;
  //   height: 250%;
  //   left: 3.6rem;
  //   background: $secondary-color;
  //   // transform: translateX(-100%);

  // }
}

::selection {
  background: rgba($secondary-color, 0.3);
}

// Credit: Andrei Gheorghiu
// https://stackoverflow.com/questions/45396280/customizing-increment-arrows-on-input-of-type-number-using-css
input[type="number"] {
  -webkit-appearance: textfield;
  -moz-appearance: textfield;
  appearance: textfield;
}
input[type="number"]::-webkit-inner-spin-button,
input[type="number"]::-webkit-outer-spin-button {
  -webkit-appearance: none;
}
.step1 {
  // width: 100%;
  margin-top: -86.5vh;
  margin-bottom: 65vh;
  // height: 50vh;
  // background: rgba(252,252,252,0.95)
}

.step2 {
  // margin-bottom: 0;
 }

.step2 {
  margin-bottom: 78vh;
}

.step3 {
  margin-bottom: 78vh;
}

.step4 {
  margin-bottom: 78vh;
}

.step5 {
  margin-bottom: 78vh;
  // TODO: fix this somehow!
  height: 40vh;
  // background: rgba(252,252,252,0.8)

}

.step6 {
  margin-bottom: 5vh;
}

.step7 {
  margin-bottom: 52vh;
}

.step8 {
  margin-bottom: 30vh;
}
</style>
