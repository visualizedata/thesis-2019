const colors = [
  "rgba(87,176,234,1)",
  "rgba(255, 138, 24,1)",
  "rgba(240, 234, 0, 1)",
  "rgba(228, 36, 28, 1)",
  "rgba(77, 175, 74, 1)",
  "rgba(152, 78, 168, 1)",
  "rgba(247, 129, 191)"
];
const names = [
  {
    fileName: "hh_total.csv",
    population: true,
    shortName: "hhtotal",
    listName: "Total households in range",
    longName: "Total count of households in income range",
    desc: "",
    category: "population"
  },
  {
    fileName: "hh_t_persons.csv",
    population: true,
    shortName: "tpersons",
    listName: "Total persons in range",
    longName: "Total count of persons in income range",
    desc: "",
    category: "population"
  },
  {
    fileName: "hh_t_adults.csv",
    population: true,
    shortName: "tadults",
    listName: "Total adults in range",
    longName: "Total count of adults  in income range",
    desc: "",
    category: "population"
  },
  {
    fileName: "hh_m_persons.csv",
    population: true,
    shortName: "mpersons",
    listName: "Avg. persons per household",
    longName: "Mean count of person per household in income range",
    desc: "",
    category: "population"
  },
  {
    fileName: "hh_m_adults.csv",
    population: true,
    shortName: "madults",
    listName: "Avg. adults per household",
    longName: "Mean count of adults per household in income range",
    desc: "",
    category: "population"
  },
  // Make proper list names for the different welfare positions
  {
    fileName: "hh_m_inc.csv",
    population: false,
    shortName: "minc",
    longName: "Mean market income",
    desc: "",
    category: "income"
  },
  {
    fileName: "hh_oadivs.csv",
    population: false,
    shortName: "oadivs",
    longName: "SSI and disability, retirement, survivor and veteran benefits",
    desc: "",
    category: "welfare"
  },
  {
    fileName: "hh_eitcred.csv",
    population: false,
    shortName: "eitc",
    longName: "Earned Income Tax Credit",
    desc: "",
    category: "welfare"
  },
  {
    fileName: "hh_child.csv",
    population: false,
    shortName: "child",
    longName: "Child support programs and child tax credits",
    desc: "",
    category: "welfare"
  },
  {
    fileName: "hh_snap_plus.csv",
    population: false,
    shortName: "snapp",
    longName: "SNAP, AFDC, TANF and energy subsidies",
    desc: "",
    category: "welfare"
  },
  {
    fileName: "hh_eduwrkunem.csv",
    population: false,
    shortName: "eduwrkunem",
    longName: "Education, Worker Compensation and unemployment benefits",
    desc: "",
    category: "welfare"
  },
  {
    fileName: "hh_socialsec.csv",
    population: false,
    shortName: "socialsec",
    longName: "Social Security benefits",
    desc: "",
    category: "welfare"
  },
  {
    fileName: "uig_empty.csv",
    population: false,
    shortName: "uig",
    listName: "Universal Income Guarantee",
    longName: "Hypothetical Universal Income Guarantee",
    desc: "",
    category: "uig"
  }
];
const bins = [
  { string: "< 10,000", ll: -20000, ul: 9999, id: 0 },
  { string: "10,000 – 14,999", ll: 10000, ul: 14999, id: 1 },
  { string: "15,000 – 24,999", ll: 15000, ul: 24999, id: 2 },
  { string: "25,000 – 34,999", ll: 25000, ul: 34999, id: 3 },
  { string: "35,000 – 49,999", ll: 35000, ul: 49999, id: 4 },
  { string: "50,000 – 74,999", ll: 50000, ul: 74999, id: 5 },
  { string: "75,000 – 99,999", ll: 75000, ul: 99999, id: 6 },
  { string: "100,000 – 149,999", ll: 100000, ul: 149999, id: 7 },
  { string: "150,000 – 199,999", ll: 150000, ul: 199999, id: 8 },
  { string: "> 200,000", ll: 200000, ul: 4000000, id: 9 }
];

d3.csv(`hh_t_persons.csv`).then(data => {
  processCSV(
    data,
    {
      shortName: "tpersons",
      longName: "Total count of person per household",
      desc: ""
    },
    true
  );
  for (const [i, p] of names.entries()) {
    d3.csv(p.fileName).then(pData => {
      // console.log(p.population);
      processCSV(pData, p, p.population);
      // console.log(pData);
      for (const [i, e] of pData.entries()) {
        if (e.hasOwnProperty("position")) {
          data[i].positions.push(e.position);
        } else {
          data[i].populationDetails[e.population.name] = e.population;
        }
      }
    });
  }
  data.map((e, i) => {
    e.bin = bins[i].string;
    e.binDetails = bins[i];
    delete e.population;
  });
  console.log(data);
});

const processCSV = (data, names, population) => {
  data.map((e, i) => {
    if (population) {
      e.population = {
        val: parseInt(e.b),
        moe: parseInt(e.se),
        name: names.shortName,
        longName: names.longName,
        desc: names.desc
      };
    } else {
      e.position = {
        val: parseInt(e.b),
        valueBefore: parseInt(e.b),
        moe: parseInt(e.se),
        moeBefore: parseInt(e.se),
        name: names.shortName,
        longName: names.longName,
        desc: names.desc,
        category: names.category
      };
    }
    e.bin = e[""];
    e.id = i;
    e.positions = [];
    e.populationDetails = {};
    delete e[""];
    delete e.b;
    delete e.crit;
    delete e.df;
    delete e.eform;
    delete e.pvalue;
    delete e.se;
    delete e.ll;
    delete e.ul;
    delete e.z;
  });
};
