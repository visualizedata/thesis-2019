const totalPersons = 320371997;
const totalHouseholds = 126519331;

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
    ttName: "Households in this group",
    desc: "",
    category: "population"
  },
  {
    fileName: "hh_t_persons.csv",
    population: true,
    shortName: "tpersons",
    listName: "Total persons in range",
    longName: "Total count of persons in income range",
    ttName: "People in this group",
    desc: "",
    category: "population"
  },
  {
    fileName: "hh_t_adults.csv",
    population: true,
    shortName: "tadults",
    listName: "Total adults in range",
    longName: "Total count of adults  in income range",
    ttName: "Adults in this group",
    desc: "",
    category: "population"
  },
  {
    fileName: "hh_m_persons.csv",
    population: true,
    shortName: "mpersons",
    listName: "Avg. persons per household",
    longName: "Mean count of person per household in income range",
    ttName: "Avg. household size",
    desc: "",
    category: "population"
  },
  {
    fileName: "hh_m_adults.csv",
    population: true,
    shortName: "madults",
    listName: "Avg. adults per household",
    longName: "Mean count of adults per household in income range",
    ttName: "Avg. number of adults per household",
    desc: "",
    category: "population"
  },
  // Make proper list names for the different welfare positions
  {
    fileName: "hh_m_inc.csv",
    population: false,
    shortName: "minc",
    longName: "Mean market income",
    ttName: "Income without benefits",
    desc: "",
    category: "income"
  },
  {
    fileName: "hh_3retirement.csv",
    population: false,
    shortName: "retirement",
    longName: "Benefits due to retirement, veteran & survivor status",
    listName: "Retirement, veteran and survivor status",
    ttName: "Retirement, veteran and survivor status",
    desc:
      "Income from Social Security due to retirment (biggest share in this group by far), retirement benefits from government programs and all income from the Department of Veterans Affairs (includes transfers due to diability, data could not be distinguished in this regard",
    technical: "clean_wel_increti_tot clean_incvet clean_incss_ret",
    category: "welfare"
  },
  {
    fileName: "hh_1work.csv",
    population: false,
    shortName: "work",
    longName: "Category Work & Education, e.g. EITC",
    listName: "Work related, education",
    ttName: "Work related, education",
    desc:
      "EITC, Worker compensation, Education programs (without veteran education programs), Unemployment benefits",
    technical:
      "clean_incwkcom clean_eitcred clean_wel_inceduc clean_wel_incunemp",
    category: "welfare"
  },
  {
    fileName: "hh_2family.csv",
    population: false,
    shortName: "family",
    longName:
      "Family and child support also including SNAP, AFDC/TANF, child support, child tax credit, Social security child benefits, support for heating",
    listName: "Family and child assistance, SNAP",
    ttName: "Family and child assistance, SNAP",
    desc:
      "Family Assistance, SNAP and other: AFDC/TANF, Child support, child tax credit, child, Social security child benefits, SNAP, Energy Subsidy",
    technical:
      "clean_incwelfr clean_incchild clean_ctccrd clean_actccrd clean_incss_child spmsnap heatval",
    category: "welfare"
  },
  {
    fileName: "hh_4disa.csv",
    population: false,
    shortName: "disability",
    longName:
      "Supplemental Security Income, other benefits due to disability status and ‘other’ in social security income",
    listName: "Disability status and ‘other’",
    ttName: "Disability status and ‘other’",
    desc:
      "Supplemental Security Income, other benefits due to disability status and ‘other’ in social security income",
    technical: "clean_incssi clean_wel_incdisa_tot clean_incss_disa",
    category: "welfare"
  },
  {
    fileName: "uig_empty.csv",
    population: false,
    shortName: "uig",
    listName: "Universal Income Guarantee",
    longName: "Hypothetical Universal Income Guarantee",
    ttName: "Universal Income Guarantee",
    desc: "",
    category: "uig"
  }
];
const bins = [
  { string: "< 10k", ll: -20000, ul: 9999, id: 0 },
  { string: "10k – 15k", ll: 10000, ul: 14999, id: 1 },
  { string: "15k – 25k", ll: 15000, ul: 24999, id: 2 },
  { string: "25k – 35k", ll: 25000, ul: 34999, id: 3 },
  { string: "35k – 50k", ll: 35000, ul: 49999, id: 4 },
  { string: "50k – 75k", ll: 50000, ul: 74999, id: 5 },
  { string: "75k – 100k", ll: 75000, ul: 99999, id: 6 },
  { string: "100k – 150k", ll: 100000, ul: 149999, id: 7 },
  { string: "150k – 200k", ll: 150000, ul: 199999, id: 8 },
  { string: "> 200k", ll: 200000, ul: 4000000, id: 9 }
];

// Alternative
// const bins = [
//   { string: "< 10,000", ll: -20000, ul: 9999, id: 0 },
//   { string: "10,000 – 14,999", ll: 10000, ul: 14999, id: 1 },
//   { string: "15,000 – 24,999", ll: 15000, ul: 24999, id: 2 },
//   { string: "25,000 – 34,999", ll: 25000, ul: 34999, id: 3 },
//   { string: "35,000 – 49,999", ll: 35000, ul: 49999, id: 4 },
//   { string: "50,000 – 74,999", ll: 50000, ul: 74999, id: 5 },
//   { string: "75,000 – 99,999", ll: 75000, ul: 99999, id: 6 },
//   { string: "100,000 – 149,999", ll: 100000, ul: 149999, id: 7 },
//   { string: "150,000 – 199,999", ll: 150000, ul: 199999, id: 8 },
//   { string: "> 200,000", ll: 200000, ul: 4000000, id: 9 }
// ];

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
          // console.log(e.population);
          if (e.population.name == "hhtotal") {
            let f = d3.format(".2f");
            data[i].populationDetails[
              "percentageOfTotalHousholds"
            ] = parseFloat(f((e.population.val / totalHouseholds) * 100));
          }
          if (e.population.name == "tpersons") {
            let f = d3.format(".2f");
            data[i].populationDetails["percentageOfTotalPersons"] = parseFloat(
              f((e.population.val / totalPersons) * 100)
            );
          }
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
      console.log(names.shortName, e.b);
      if (names.shortName == "mpersons" || names.shortName == "madults") {
        e.population = {
          val: parseFloat(e.b),
          moe: parseFloat(e.se),
          name: names.shortName,
          longName: names.longName,
          ttName: names.ttName,
          desc: names.desc
        };
      } else {
        e.population = {
          val: parseInt(e.b),
          moe: parseInt(e.se),
          name: names.shortName,
          longName: names.longName,
          desc: names.desc
        };
      }
    } else {
      e.position = {
        val: parseInt(e.b),
        valueBefore: parseInt(e.b),
        moe: parseInt(e.se),
        moeBefore: parseInt(e.se),
        name: names.shortName,
        longName: names.longName,
        ttName: names.ttName,
        listName: names.listName,
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
