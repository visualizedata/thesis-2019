let selectedSlideNum = 0;
function refreshSlides(slides, dots) {
  // Hide all except for shown slide
  for (let i = 0; i < dots.length; i++) {
    // Show selected slide
    if (i == selectedSlideNum) {
      slides[i].className = "slide-visible";
      dots[i].className = "dot dot-active";
    }
    // Hide others
    else {
      dots[i].className = "dot dot-inactive";
      slides[i].className = "slide-hidden";
    }
  }

  // Maybe call function, if function "showingSlide_x" exists
  if (typeof window["showingSlide_" + selectedSlideNum] === "function")
    window["showingSlide_" + selectedSlideNum]();
}

function showNextSlide() {
  // Find all slides
  slides = document.querySelectorAll(".slide-visible,.slide-hidden");
  dots = document.querySelectorAll(".dot-active, .dot-inactive");

  // Update selected slide num
  selectedSlideNum++;
  if (selectedSlideNum > slides.length - 1) selectedSlideNum = 0;

  refreshSlides(slides, dots);
}

function showPreviousSlide() {
  console.log(selectedSlideNum);

  // Find all slides
  slides = document.querySelectorAll(".slide-visible,.slide-hidden");
  dots = document.querySelectorAll(".dot-active, .dot-inactive");

  // Update selected slide num
  selectedSlideNum--;
  if (selectedSlideNum < 0) selectedSlideNum = slides.length - 1;

  refreshSlides(slides, dots);
}

function initialize() {
  console.log(selectedSlideNum);
  // Find the slide navigation arrows
  let slidePreviousElm = document.getElementById("slide-previous-arrow");
  let slideNextElm = document.getElementById("slide-next-arrow");
  let dotGroup = document.querySelectorAll(".dot");

  // Find all slides
  let slides = document.querySelectorAll(".slide-visible,.slide-hidden");
  let dots = document.querySelectorAll(".dot-active, .dot-inactive");

  // Abort and keep retrying until DOM is ready
  if (!slidePreviousElm || !slideNextElm) return setTimeout(initialize, 100);

  // Set event actions
  slidePreviousElm.addEventListener("click", showPreviousSlide);
  slideNextElm.addEventListener("click", showNextSlide);

  let startArrowElm = document.getElementById("startArrow");
  startArrowElm.addEventListener("click", showNextSlide);

  [...dotGroup].forEach(dot => {
    dot.addEventListener("click", i => {
      selectedSlideNum = i.srcElement.dataset.key;

      refreshSlides(slides, dots);
    });
  });
}

// Call on startup
initialize();
