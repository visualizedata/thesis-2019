//commit directly to gh-pages subdirectory from master branch
//git subtree push --prefix src origin gh-pages
/* global Vue */

    // remove large Files from commit cache
    // git filter-branch --tree-filter 'rm -rf documentation/test.mov' HEAD



var app = new Vue({
    
    // This is the id of our referenced div-element
    // only this element and everything in it
    // will be connected to the data

    //el is defined by vue
    el: '#bars',
    //data is defined by vue
    data() {
        return {
            svgHeight: 300,
            svgWidth: 155,
            margin: {top:25, right:25, bottom:25, left:25},
            chartTitle: 'German Counting! Fun!',
            data: [
                { name: "eins", val: 1 },
                { name: "zwei", val: 2 },
                { name: "drei", val: 3 },
                { name: "vier", val: 4 },
                { name: "fünf", val: 5 }
            ],
            titles: [],
            jsonData: {},
        }
    },
    methods: {
      myFill(elVal) {
        if (elVal > 5) {
          return "#C06C84"
        } else {
          return "#355C7D"
        }
      },
     async fetchData() {
          let data = await d3.json("data/title.json");
          this.jsonData = data;
      }
    },
    //makes data available for html as function
    //can be used without parameter
    //or define function and pass parameter
    //computed data is double bound and updated automatically
    //state is computed all the time- only the ones that change will be computed
    computed:{
      width() {
        return this.svgWidth - this.margin.left - this.margin.right;
      },
      height() {
        return this.svgHeight - this.margin.top - this.margin.bottom;
      },
       // scale = {
      //   x: () => {
      //     do something
      //     return x
      // }
      // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Functions/Method_definitions
      scale() {
        const x = d3
          .scaleBand()
          .domain(this.data.map(x => x.name))
          // https://github.com/d3/d3-scale/blob/master/README.md#band_rangeRound
          .rangeRound([0, this.width])
          .padding(0.15); // There is also paddingInner and paddingOuter if preferred
        const y = d3
          .scaleLinear()
          // The spread operator ... can be used to convert an array
          // in places where a list of parameters is expected.
          // Because we are using a method here, Math.max(1, 2, 3) is expected.
          // The new mapped array is transformed with ...
          // so it can be interpreted by Math.max()
          .domain([0, Math.max(...this.data.map(x => x.val))])
          .rangeRound([this.height, 0]); // Already flipped
        return { x, y };
      }
    },
    //directives is vue mthod that allows us to introduce new elmenets we can bind
    directives: {
        
      axis(el, binding) { 
        console.log(el); // this is the g
        console.log(binding); // the scale object
        const axis = binding.arg; // x or y
        // Line below defines an object and immediately calls
        // only the property for x or y
        // it’s basically like a ternary expression
        const axisMethod = { x: "axisBottom", y: "axisLeft" }[axis];
        // The line below assigns the x or y function of the scale object
        const methodArg = binding.value[axis];
        // The variable assignments above are a very concise way to
        // guarantee that d3 can select *this* element and call
        // the axis method on it
        // with the right argument
        // so it ends up equivalent to the expression
        // d3.axisBottom(scale.x)
        d3.select(el).call(d3[axisMethod](methodArg));
      }
    },
    mounted() {
        console.log("app loaded");
        this.fetchData();
    }
  })
  