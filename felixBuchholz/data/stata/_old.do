* -----------------------------------------------------------------------------
* ## Initializing: Loading files / setting output / setting survey weights


* Set filepath for the output csv file / generic
putexcel set "/Users/felixbuchholz/repos/thesis/data/stata/output.csv", replace

* Change directory
cd 
cd repos/thesis/data/stata

* Read in IPUMS CPS data // Citation:
do cps_00011.do

* Setting survey weights, using household weights
svyset [iw=asecwth], sdrweight(repwtp1-repwtp160) vce(sdr) mse

* -----------------------------------------------------------------------------
* ## Introduction, data check


* Check the file structure and labels
describe

* Summarize the data set, caution unweighted!
summarize

* Get the Median household income 
* https://cps.ipums.org/cps-action/variables/HHINCOME#codes_section
* Code 99999999 = N.I.U. (Not in Universe)
* pernum == 1, only the first person in household


mean hhincome [aweight = asecwth] if hhincome != 99999999 & pernum == 1
 
 * --------------------------------------------------------------
 *              |       Mean   Std. Err.     [95% Conf. Interval]
 * -------------+------------------------------------------------
 *     hhincome |   82957.25   365.6695      82240.54    83673.96
 * --------------------------------------------------------------

 * Comparison American fact finder: 81,283	+/-159
 * See: https://factfinder.census.gov/faces/tableservices/jsf/pages/productview.xhtml?pid=ACS_17_5YR_DP03&src=pt

summarize hhincome [aweight = asecwth] if hhincome != 99999999 & pernum == 1, detail

* More checks on the data set
codebook hhincome
tab foodstmp


* -----------------------------------------------------------------------------
* ### Creating bins:


* Sorting is not necessary but facilitates checking results in the data editor
sort hhincome

* We need the min and max values of hhincome to create the bins:
sum hhincome
* We need the return list method to access the min and max values
return list
* Assign the global variables
local minhhincome = r(min)-1
local maxhhincome = r(max)+1

* Encoding the bins in a new variable, hhincomecat, 
* using the income bins commonly used by American fact finder
egen hh_incomecat = cut(hhincome), at(`minhhincome', 10000, 15000, 25000, 35000, 50000, 75000, 100000, 150000, 200000, `maxhhincome')


* -----------------------------------------------------------------------------
* ## Aggregate statistics in bins


* Show the mean household income in the income bins
mean hhincome if hhincome != 99999999 & pernum == 1 [aweight = asecwth], over(hh_incomecat)

* -----------------------------------------------------------------------------
* ## Output .csv-file

* Return the result to be able to access the table
return list

* Write the result to the csv file specified 
putexcel A1=matrix(r(table)), names

* Get the household income by bins
svy: mean hhincome if hhincome != 99999999 & pernum == 1, over(hh_incomecat)


* -----------------------------------------------------------------------------
* ## Important identifiers

* ID columns in data:
* serial: household number
* pernum == 1: filter for head of household, holds the total values of the houshold
* famid: Unique family identifier
* asecfwt: asec family weight

	
* -----------------------------------------------------------------------------
* ### Market income, pre-tax

* incwage
	gen clean_incwage=incwage
	* Replace "Not in universe" by zero
	replace clean_incwage = 0 if clean_incwage == 9999999
	* Replace "Missing", there might be a method to infer values
	replace clean_incwage = 0 if clean_incwage == 9999998
	* Check if there are still values for persons < 15
		* total(clean_incwage) if age < 15 
		* > 0


* incbus
	gen clean_incbus=incbus
	* Replace "Not in universe" by zero
	replace clean_incbus = 0 if clean_incbus == 9999999
	* Replace "Missing", there might be a method to infer values
	replace clean_incbus = 0 if clean_incbus == 9999998
	* Check if there are still values for persons < 15
		* total(clean_incbus) if age < 15 
		* > 0


* incfarm
	gen clean_incfarm=incfarm
	* Replace "Not in universe" by zero
	replace clean_incfarm = 0 if clean_incfarm == 9999999
	* Replace "Missing", there might be a method to infer values
	replace clean_incfarm = 0 if clean_incfarm == 9999998
	* Check if there are still values for persons < 15
		* total(clean_incfarm) if age < 15 
		* > 0
	
* incint
	gen clean_incint=incint
	* Replace "Not in universe" by zero
	replace clean_incint = 0 if clean_incint == 99999
	* Replace topcode according to table
	replace clean_incint = 50827 if clean_incint == 99997
	* Check if there are still values for persons < 15
		* total(clean_incint) if age < 15 
		* > 0
	* Check if there are still topcoded values
		* count if clean_incint == 99997
		* > 0
		
* incdivid
	gen clean_incdivid=incdivid
	* Replace "Not in universe" by zero
	replace clean_incdivid = 0 if clean_incdivid == 99999

* incrent
	gen clean_incrent=incrent
	* Replace "Not in universe" by zero
	replace clean_incrent = 0 if clean_incrent == 99999
	* Replace topcode according to table
	replace clean_incrent = 60000 if clean_incrent == 99997
	

* incasist
	gen clean_incasist=incasist
	* Replace "Not in universe" by zero
	replace clean_incasist = 0 if clean_incasist == 99999
	* Replace topcode according to table
	replace clean_incasist = 42000 if clean_incasist == 99997
	
* incother
	gen clean_incother=incother
	* Replace "Not in universe" by zero
	replace clean_incother = 0 if clean_incother == 99999
	* Replace topcode according to table
	replace clean_incother = 40000 if clean_incother == 99997
	
	

* Template income value sum by household
bys serial: egen hh_incint=total(clean_incint)
* - Clean up, retain values just for head of household
replace hh_incint = 0 if pernum != 1
	
* -----------------------------------------------------------------------------
* ### Split income, pre-tax

* incwkcom, market
	gen clean_mkt_incwkcom=incwkcom
	* Replace "Not in universe" by zero
	replace clean_mkt_incwkcom = 0 if clean_mkt_incwkcom == 99999
	* Replace "Missing", there’s 6 obs in the dataset, 5 employer or other 1 state
	* there might be a method to infer values
	replace clean_mkt_incwkcom = 0 if clean_mkt_incwkcom == 99997
*!! WELFARE splitting the data here
	gen clean_wel_incwkcom=clean_mkt_incwkcom
	* Set the state worker compensation to 0 for market income
	replace clean_mkt_incwkcom = 0 if srcwkcom == 1
*! 	incwkcom, welfare
	* Set the market worker compensation to 0 for welfare income
	replace clean_wel_incwkcom = 0 if srcwkcom != 1
	
* inceduc, market
	gen clean_mkt_inceduc=inceduc
	* Replace "Not in universe" by zero
	replace clean_mkt_inceduc = 0 if clean_mkt_inceduc == 99999
	* Replace "Missing", there’s 6 obs in the dataset, 5 employer or other 1 state
	* there might be a method to infer values
	replace clean_mkt_inceduc = 0 if clean_mkt_inceduc == 99997
*!! WELFARE splitting the data here
	gen clean_wel_inceduc=clean_mkt_inceduc
	* Set the state worker compensation to 0 for market income
	replace clean_mkt_inceduc = 0 if srceduc == 1 | srceduc == 4 | srceduc == 5
*! 	inceduc, welfare
	* Set the market worker compensation to 0 for welfare income
	replace clean_wel_inceduc = 0 if !(srceduc == 1 | srceduc == 4 | srceduc == 5)

* -----------------------------------------------------------------------------
* #### Aggregate all market income, pre-tax



* -----------------------------------------------------------------------------
* ### Welfare 

* -----------------------------------------------------------------------------
* #### Disability 



* -----------------------------------------------------------------------------
* #### Food stamps 

* Foodstamp value sum by household
bys serial: egen hh_foodstampsum=total(foodstamp)
* - Clean up, retain values just for head of household
replace hh_foodstampsum = 0 if pernum != 1

* Get the foodstamp value by bins
svy: mean hh_foodstampsum if pernum == 1, over(hh_incomecat)

* -----------------------------------------------------------------------------
* ### Save to output, template 

* Total income before taxes, without welfare:
	* svy: mean hh_inc_pretax_nowel if pernum == 1, over(hh_incomecat)

* Return the result to be able to access the table
	* return list

* Write the result to the incom.csv file 
	* putexcel set "/Users/felixbuchholz/repos/thesis/data/stata/income.csv", replace
	* putexcel A1=matrix(r(table)), names


* -----------------------------------------------------------------------------
* ## Annotation:
	* Clean and narket income and welfare overview: 
	* Note on original CPS topcodes in incomes: 
	* https://cps.ipums.org/cps/topcodes_tables.shtml#2017top
* ## Welfare vs Market income breakdown for this research project


* WELFARE:

	* INCDISAB, compare to srcdisa1 & srcdisa2
		* Code: 999999 = N.I.U. 
		* I’m attributing the entire value to srcdisa1
		* count if srcdisa2 > 0
			* > 18, only 18 observations with a secondary source for incdisab
			* compare: tab srcdisa2 srcdisa1
			* I’m attributing srcdisa1 = 1 (workers compensation) 
			* half to market income, half to welfare income)
	* INCWELFR 
	* INCSSI
	* INCSURV
	* INCCHILD 
	* FOODSTAMP * Codes: none, Persons: all, Aggregate: sum person values over households
	* HEATVAL

	
* CHECK:
	* INCSS 
	* INCVET 
	* INCUNEMP
	* INCRETIR

	
* SPLIT
	* INCWKCOM * Split
		* Codes: 99999 = N.I.U. = 0, 99997 = Top Code = 50,827 *!!*
		* Topcode, see: https://cps.ipums.org/cps/topcodes_tables.shtml#2017top
		* 1980+: Persons age 15+
		* market_incwkcom: Employer or employers insurance, Other
		* welfare_incwkcom: State Workers Compensation
		
	* INCEDUC * Split
		* Codes 0: NIU; 1, 4, 5: government assistance; 2, 3, 6: school and other assistance
		* Topcode: 99997 = value 40,000
		* Persons age 15+ who received educational assistance during the previous calendar year.


* MARKET:
	* INCWAGE 
		* Codes: 99999999 = N.I.U. = 0, 99999998 = Missing = 0
		* Persons: age: 15+
		
	* INCBUS 
		* Codes: 9999999 = N.I.U. = 0, 9999998 = Missing = 0
		* 1980+: Persons age 15+.
		
	* INCFARM
		* Codes: 9999999 = N.I.U. = 0, 9999998 = Missing = 0
		* 1980+: Persons age 15+.
		
	* INCINT 
		* Codes: 99999 = N.I.U. = 0, 99997 = Top Code = 50,827 *!!*
		* Topcode, see: https://cps.ipums.org/cps/topcodes_tables.shtml#2017top
		* 1980+: Persons age 15+
		
	* INCDIVID
		* Codes: 9999999 = N.I.U. = 0
		* 1980+: Persons age 15+.
		
	* INCRENT
		* Codes: 9999999 = N.I.U. = 0
		* 1980+: Persons age 15+.
		
	* INCALIM * Alimony, not in data anymore, stopped 2014
	
	* INCASIST * Friends & relatives not in household
		* Codes: 99999 = N.I.U. = 0
		* Topcode: 42,000, see: https://cps.ipums.org/cps/topcodes_tables.shtml#2017top
		* 1980+: Persons age 15+
	
	* INCOTHER * Hobbies, severance pay 
		* Codes: 99999 = N.I.U. = 0
		* Topcode: 50,000, see: https://cps.ipums.org/cps/topcodes_tables.shtml#2017top
		* 1980+: Persons age 15+
		
* -----------------------------------------------------------------------------
* ## Annotation, un-used income variables 


* faminc: Family income of householder

* inctot: 
	* Universe: Persons age 15+
	* Codes: 
		* 99999999 = N.I.U. (Not in Universe). 
		* 99999998 = Missing. 
	* INCTOT indicates each respondent's total pre-tax personal income or losses 
	* from all sources for the previous calendar year. 
	* Amounts are expressed as they were reported to the interviewer; 
	* Must be adjusted for inflation using CPI
	* Sum of: 
		* Market:
			* INCWAGE 
			* INCBUS 
			* INCFARM 
			* INCINT 
			* INCDIVID 
			* INCRENT 
			* INCEDUC 
			* INCALIM * Alimony, not in data anymore, stopped 2014
			* INCASIST * Friends & relatives not in household
			* INCOTHER * Hobbies, severance pay 
		
		* Welfare:
			* INCWELFR 
			* INCSSI
			* INCSURV
			* INCCHILD
			 
		* Split:
			* INCWKCOM
			* INCDISAB 
			* INCSS 
			* INCVET 
			* INCUNEMP
			* INCRETIR
			
* -----------------------------------------------------------------------------
* ## Annotation, Welfare positions, not encoded in inc

* Welfare columns in data:
	* Only recipiency
		* rentsub: bool (paying lower rent due to government subsidy
		* heatsub: bool (received energy subsidy)
		* foodstmp: bool (food stamp recipiency)
		* lunchsub: bool, but string (children received free or reduced price lunch)
		* frelunch: int, but string (number of children who received lunch
	* Values
		* heatval: int (value of energy subsidy)