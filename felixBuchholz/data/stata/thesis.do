* -----------------------------------------------------------------------------
* ## Initializing: Loading files / setting output / setting survey weights


* Set filepath for the output csv file / generic
* putexcel set "/Users/felixbuchholz/repos/thesis/data/stata/output.csv", replace
* Changed method to esttab

* -----------------------------------------------------------------------------
* -----------------------------------------------------------------------------
* ### Prepare output template
	* return list
	* matrix a = r(table)
	* matrix colnames a = <10000 10000-14999 15000-24999 25000-34999 35000-49999 50000-74999 75000-99999 100000-149999 150000-199999 >200000
	* mat at = a'	
	* esttab matrix(at, fmt(2)) using hh_persons.csv, plain replace eqlabels(none) mlabels(none)
* -----------------------------------------------------------------------------
* -----------------------------------------------------------------------------

* Change directory
cd 
cd repos/thesis2019/data/stata

* Read in IPUMS CPS data // Citation:
do cps_00012.do

* Setting survey weights, using household weights
svyset [iw=asecwth], sdrweight(repwtp1-repwtp160) vce(sdr) mse

* Add code numbers to the labels!
numlabel , add

* -----------------------------------------------------------------------------
* ## Introduction, data exploration


* Check the file structure and labels
	* describe

* Summarize the data set, caution unweighted!
	* summarize

* Get the Median household income 
* https://cps.ipums.org/cps-action/variables/HHINCOME#codes_section
* Code 99999999 = N.I.U. (Not in Universe)
* pernum == 1, only the first person in household


	*mean hhincome [aweight = asecwth] if hhincome != 99999999 & pernum == 1
 
 * --------------------------------------------------------------
 *              |       Mean   Std. Err.     [95% Conf. Interval]
 * -------------+------------------------------------------------
 *     hhincome |   82957.25   365.6695      82240.54    83673.96
 * --------------------------------------------------------------

 * Comparison American fact finder: 81,283	+/-159
 * See: https://factfinder.census.gov/faces/tableservices/jsf/pages/productview.xhtml?pid=ACS_17_5YR_DP03&src=pt

	* summarize hhincome [aweight = asecwth] if hhincome != 99999999 & pernum == 1, detail

* More checks on the data set
	* codebook hhincome
	* tab foodstmp


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


* Show the mean household income in the income bins, without replicate weights
	* mean hhincome if hhincome != 99999999 & pernum == 1 [aweight = asecwth], over(hh_incomecat)
* Show the mean household income in the income bins, with replicate weights
	* svy: mean hhincome if hhincome != 99999999 & pernum == 1, over(hh_incomecat)

* -----------------------------------------------------------------------------
* ## Output .csv-file, template

* Get the household income by bins
	* svy: mean hhincome if hhincome != 99999999 & pernum == 1, over(hh_incomecat)

* Return the result to be able to access the table
	* return list

* Write the result to the csv file specified 
	* putexcel A1=matrix(r(table)), names




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
	replace clean_incdivid = 0 if clean_incdivid == 999999

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
	
	
* -----------------------------------------------------------------------------
* ### Template income value sum by household

* Template
	* bys serial: egen hh_incint=total(clean_incint)
* - Clean up, retain values just for head of household
	* replace hh_incint = 0 if pernum != 1
	
* -----------------------------------------------------------------------------
* ### Split income, pre-tax

* -----------------------------------------------------------------------------
* #### Education benefits
	
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
* #### Disability benefits

* incdisa1, market
	gen clean_mkt_incdisa1=incdisa1
	* Replace "Not in universe" by zero
	replace clean_mkt_incdisa1 = 0 if clean_mkt_incdisa1 == 99999
	* Replace topcode according to table
	replace clean_mkt_incdisa1 = 48800 if clean_mkt_incdisa1 == 99997
*!! WELFARE splitting the data here
	gen clean_wel_incdisa1=clean_mkt_incdisa1
	* Set the state worker compensation to 0 for market income * Workers compensation is code 1
	replace clean_mkt_incdisa1 = clean_mkt_incdisa1/2 if srcdisa1 == 10
	replace clean_mkt_incdisa1 = 0 if srcdisa1 == 1 | srcdisa1 == 3 | srcdisa1 == 4 | srcdisa1 == 5 | srcdisa1 == 6 | srcdisa1 == 8 | srcdisa1 == 9
*! 	incdisab, welfare
	* Set the market worker compensation to 0 for welfare income
	replace clean_wel_incdisa1 = clean_wel_incdisa1/2 if srcdisa1 == 10
	replace clean_wel_incdisa1 = 0 if srcdisa1 == 2 | srcdisa1 == 7
	
* incdisa2, market
	gen clean_mkt_incdisa2=incdisa2
	* Replace "Not in universe" by zero
	replace clean_mkt_incdisa2 = 0 if clean_mkt_incdisa2 == 99999
*!! WELFARE splitting the data here
	gen clean_wel_incdisa2=clean_mkt_incdisa2
	* Set the state worker compensation to 0 for market income
	replace clean_mkt_incdisa2 = clean_mkt_incdisa2/2 if srcdisa2 == 10
	replace clean_mkt_incdisa2 = 0 if srcdisa2 == 3 | srcdisa2 == 4 | srcdisa2 == 5 | srcdisa2 == 9
*! 	incdisab, welfare
	* Set the market worker compensation to 0 for welfare income
	replace clean_wel_incdisa2 = clean_wel_incdisa2/2 if srcdisa2 == 10
	replace clean_wel_incdisa2 = 0 if srcdisa2 == 2 | srcdisa2 == 7
	
* incdisa_tot, market
	gen clean_mkt_incdisa_tot = clean_mkt_incdisa1 + clean_mkt_incdisa2
* incdisa_tot, welfare
	gen clean_wel_incdisa_tot = clean_wel_incdisa1 + clean_wel_incdisa2

* -----------------------------------------------------------------------------
* #### Survivor benefits
	
* incsurv1, market
	gen clean_mkt_incsurv1=incsurv1
	* Replace "Not in universe" by zero
	replace clean_mkt_incsurv1 = 0 if clean_mkt_incsurv1 == 99999
	* Replace topcode according to table
	replace clean_mkt_incsurv1 = 65000 if clean_mkt_incsurv1 == 99997
*!! WELFARE splitting the data here
	gen clean_wel_incsurv1=clean_mkt_incsurv1
	* Set the state worker compensation to 0 for market income
	replace clean_mkt_incsurv1 = clean_mkt_incsurv1/2 if srcsurv1 == 10
	replace clean_mkt_incsurv1 = 0 if srcsurv1 == 2 | srcsurv1 == 3 | srcsurv1 == 4 | srcsurv1 == 5 | srcsurv1 == 6 | srcsurv1 == 7
*! 	incdisab, welfare
	* Set the market worker compensation to 0 for welfare income
	replace clean_wel_incsurv1 = clean_wel_incsurv1/2 if  srcsurv1 == 10
	replace clean_wel_incsurv1 = 0 if srcsurv1 == 8 | srcsurv1 == 9 

* incsurv2, market
	gen clean_mkt_incsurv2=incsurv2
	* Replace "Not in universe" by zero
	replace clean_mkt_incsurv2 = 0 if clean_mkt_incsurv2 == 99999
	* Replace topcode according to table
	replace clean_mkt_incsurv2 = 65000 if clean_mkt_incsurv2 == 99997
*!! WELFARE splitting the data here
	gen clean_wel_incsurv2=clean_mkt_incsurv2
	* Set the state worker compensation to 0 for market income
	replace clean_mkt_incsurv2 = clean_mkt_incsurv2/2 if srcsurv2 == 10
	replace clean_mkt_incsurv2 = 0 if srcsurv2 == 2 | srcsurv2 == 3 | srcsurv2 == 4 | srcsurv2 == 5 | srcsurv2 == 6 | srcsurv2 == 7
*! 	incdisab, welfare
	* Set the market worker compensation to 0 for welfare income
	replace clean_wel_incsurv2 = clean_wel_incsurv2/2 if  srcsurv2 == 10
	replace clean_wel_incsurv2 = 0 if srcsurv2 == 8 | srcsurv2 == 9

* incsurv_tot, market
	gen clean_mkt_incsurv_tot = clean_mkt_incsurv1 + clean_mkt_incsurv2
* incsurv_tot, welfare
	gen clean_wel_incsurv_tot = clean_wel_incsurv1 + clean_wel_incsurv2

* -----------------------------------------------------------------------------
* #### Retirement income
	
* increti1, market
	gen clean_mkt_increti1=increti1
	* Replace "Not in universe" by zero
	replace clean_mkt_increti1 = 0 if clean_mkt_increti1 == 99999
	* Replace topcode according to table
	replace clean_mkt_increti1 = 69600 if clean_mkt_increti1 == 99997
*!! WELFARE splitting the data here
	gen clean_wel_increti1=clean_mkt_increti1
	* Set the state worker compensation to 0 for market income
	replace clean_mkt_increti1 = clean_mkt_increti1/2 if srcreti1 == 8
	replace clean_mkt_increti1 = 0 if srcreti1 == 2 | srcreti1 == 3 | srcreti1 == 4 | srcreti1 == 5
*! 	incdisab, welfare
	* Set the market worker compensation to 0 for welfare income
	replace clean_wel_increti1 = clean_wel_increti1/2 if  srcreti1 == 8
	replace clean_wel_increti1 = 0 if srcreti1 == 1 | srcreti1 == 6 | srcreti1 == 7

* increti2, market
	gen clean_mkt_increti2=increti2
	* Replace "Not in universe" by zero
	replace clean_mkt_increti2 = 0 if clean_mkt_increti2 == 99999
	* Replace topcode according to table
	replace clean_mkt_increti2 = 69600 if clean_mkt_increti2 == 99997
*!! WELFARE splitting the data here
	gen clean_wel_increti2=clean_mkt_increti2
	* Set the state worker compensation to 0 for market income
	replace clean_mkt_increti2 = clean_mkt_increti2/2 if srcreti2 == 8
	replace clean_mkt_increti2 = 0 if srcreti2 == 2 | srcreti2 == 3 | srcreti2 == 4 | srcreti2 == 5
*! 	incdisab, welfare
	* Set the market worker compensation to 0 for welfare income
	replace clean_wel_increti2 = clean_wel_increti2/2 if  srcreti2 == 10
	replace clean_wel_increti2 = 0 if srcreti2 == 1 | srcreti2 == 6 | srcreti2 == 7
	
* increti_tot, market
	gen clean_mkt_increti_tot = clean_mkt_increti1 + clean_mkt_increti2
* increti_tot, welfare
	gen clean_wel_increti_tot = clean_wel_increti1 + clean_wel_increti2
	
* -----------------------------------------------------------------------------
* #### Unemployment benefits

* incunemp, market
	gen clean_mkt_incunemp=incunemp
	* Replace "Not in universe" by zero
	replace clean_mkt_incunemp = 0 if clean_mkt_incunemp == 99999
	* Replace topcode, no value provided
	replace clean_mkt_incunemp = 0 if clean_mkt_incunemp == 99997
*!! WELFARE splitting the data here
	gen clean_wel_incunemp=clean_mkt_incunemp
	* Set the state worker compensation to 0 for market income
	replace clean_mkt_incunemp = 0 if srcunemp != 2
*! 	incunemp, welfare
	* Set the market worker compensation to 0 for welfare income
	replace clean_wel_incunemp = 0 if srcunemp == 2

* -----------------------------------------------------------------------------
* #### Total all market income variables, pre-tax

egen float clean_mkt_inc_total = rowtotal(clean_incwage clean_incbus clean_incfarm clean_incint clean_incdivid clean_incrent clean_incasist clean_incother clean_mkt_inceduc clean_mkt_incdisa_tot clean_mkt_incsurv_tot clean_mkt_increti_tot clean_mkt_incunemp)

* - - - - -
* ##### Aggregate total market income by household

* clean_mkt_inc_total by household
bys serial: egen hh_clean_mkt_inc_total=total(clean_mkt_inc_total)
* cleanup
replace hh_clean_mkt_inc_total = 0 if pernum != 1

* mean by old household income bins
	* svy: mean hh_clean_mkt_inc_total if pernum == 1, over(hh_incomecat)

* - - - - -
* ##### Create new household market income bins
	
* Sorting is not necessary but facilitates checking results in the data editor
sort hh_clean_mkt_inc_total

* We need the min and max values of hhincome to create the bins:
sum hh_clean_mkt_inc_total
* We need the return list method to access the min and max values
return list
* Assign the global variables
local min_hh_clean_mkt_inc_total = r(min)-1
local max_hh_clean_mkt_inc_total = r(max)+1

* Encoding the bins in a new variable, hhincomecat, 
* using the income bins commonly used by American fact finder
egen hh_clean_mkt_inc_total_cat = cut(hh_clean_mkt_inc_total), at(`min_hh_clean_mkt_inc_total', 10000, 15000, 25000, 35000, 50000, 75000, 100000, 150000, 200000, `max_hh_clean_mkt_inc_total')

* -----------------------------------------------------------------------------
* -----------------------------------------------------------------------------
* - - - - -
* ##### Calculate mean income over new household market income bins

* Check the new bins:
svy: mean hh_clean_mkt_inc_total if pernum == 1, over(hh_clean_mkt_inc_total_cat)

* - - - - -
* ##### Store the output

* Return the result to be able to access the table
	return list

* Write the result to the income.csv file 
return list
matrix a = r(table)
matrix colnames a = <10000 10000-14999 15000-24999 25000-34999 35000-49999 50000-74999 75000-99999 100000-149999 150000-199999 >200000
mat at = a'	
esttab matrix(at, fmt(2)) using hh_m_inc.csv, plain replace eqlabels(none) mlabels(none)
* -----------------------------------------------------------------------------
* -----------------------------------------------------------------------------

* -----------------------------------------------------------------------------
* ### Count persons per household:
bys serial: egen hh_persons=max(pernum)
replace hh_persons = 0 if pernum != 1

* -----------------------------------------------------------------------------
* ### Count adults and children per household:
gen is_adult = 1 if age >= 18
replace is_adult = 0 if age < 18
bys serial: egen hh_adults=sum(is_adult)
gen hh_children = hh_persons - hh_adults
replace hh_adults = 0 if pernum != 1
replace hh_children = 0 if pernum != 1

* -----------------------------------------------------------------------------
* ### Mean count adults and children per household:

* Mean persons:
svy: mean hh_persons if pernum == 1, over(hh_clean_mkt_inc_total_cat)

* Output to csv file 
return list
matrix a = r(table)
matrix colnames a = <10000 10000-14999 15000-24999 25000-34999 35000-49999 50000-74999 75000-99999 100000-149999 150000-199999 >200000
mat at = a'	
esttab matrix(at, fmt(2)) using hh_m_persons.csv, plain replace eqlabels(none) mlabels(none)

* Mean adults:
svy: mean hh_adults if pernum == 1, over(hh_clean_mkt_inc_total_cat)

* Return the result to be able to access the table
return list
matrix a = r(table)
matrix colnames a = <10000 10000-14999 15000-24999 25000-34999 35000-49999 50000-74999 75000-99999 100000-149999 150000-199999 >200000
mat at = a'	
esttab matrix(at, fmt(2)) using hh_m_adults.csv, plain replace eqlabels(none) mlabels(none)
* -----------------------------------------------------------------------------	
* -----------------------------------------------------------------------------
* ### Total count adults and children per houshold:

* Total persons:
svy: total hh_persons if pernum == 1, over(hh_clean_mkt_inc_total_cat)

* Output to csv file 
return list
matrix a = r(table)
matrix colnames a = <10000 10000-14999 15000-24999 25000-34999 35000-49999 50000-74999 75000-99999 100000-149999 150000-199999 >200000
mat at = a'	
esttab matrix(at, fmt(2)) using hh_t_persons.csv, plain replace eqlabels(none) mlabels(none)

* Total adults:
svy: total hh_adults if pernum == 1, over(hh_clean_mkt_inc_total_cat)

* Output to csv file 
return list
matrix a = r(table)
matrix colnames a = <10000 10000-14999 15000-24999 25000-34999 35000-49999 50000-74999 75000-99999 100000-149999 150000-199999 >200000
mat at = a'	
esttab matrix(at, fmt(2)) using hh_t_adults.csv, plain replace eqlabels(none) mlabels(none)
* -----------------------------------------------------------------------------
* -----------------------------------------------------------------------------
	
* -----------------------------------------------------------------------------
* ### Welfare 

* -----------------------------------------------------------------------------
* #### Workers compensation

* incwkcom * Note: paid bay employer, state run insurance
	gen clean_incwkcom=incwkcom
	* Replace "Not in universe" by zero
	replace clean_incwkcom = 0 if clean_incwkcom == 99999
	* Replace topcode, there’s 6 obs in the dataset,
	* there might be a method to infer values
	replace clean_incwkcom = 0 if clean_incwkcom == 99997
	
* -----------------------------------------------------------------------------
* -----------------------------------------------------------------------------
* Bucket: Education, Work and Unemployment benefits
egen float clean_eduwrkunem_total = rowtotal(clean_wel_inceduc clean_wel_incunemp clean_incwkcom)

* by household
bys serial: egen hh_clean_eduwrkunem_total=total(clean_eduwrkunem_total)
* cleanup
replace hh_clean_eduwrkunem_total = 0 if pernum != 1

svy: mean hh_clean_eduwrkunem_total if pernum == 1, over(hh_clean_mkt_inc_total_cat)

return list
matrix a = r(table)
matrix colnames a = <10000 10000-14999 15000-24999 25000-34999 35000-49999 50000-74999 75000-99999 100000-149999 150000-199999 >200000
mat at = a'	
esttab matrix(at, fmt(2)) using hh_eduwrkunem.csv, plain replace eqlabels(none) mlabels(none)
* -----------------------------------------------------------------------------
* -----------------------------------------------------------------------------
	


* -----------------------------------------------------------------------------
* #### Veterans' Administration payments

* incvet
	gen clean_incvet=incvet
	* Replace "Not in universe" by zero
	replace clean_incvet = 0 if clean_incvet == 99999
	* Replace topcode, no values provided in topcode list 
	* https://cps.ipums.org/cps/topcodes_tables.shtml#2017top
	replace clean_incvet = 0 if clean_incvet == 99997
	* 12 observations in the data
	
* -----------------------------------------------------------------------------
* #### Social Securtiy

* incss
	gen clean_incss=incss
	* Replace "Not in universe" by zero
	replace clean_incss = 0 if clean_incss == 99999
	* Replace topcode
	* replace clean_incwkcom = 0 if clean_incwkcom == 99997
	* No observations in the data

* -----------------------------------------------------------------------------
* -----------------------------------------------------------------------------
* clean_incss
* 
* egen float clean_oadivs_total = rowtotal(clean_incssi clean_wel_increti_tot clean_wel_incdisa_tot clean_incvet)

* by household
bys serial: egen hh_clean_incss=total(clean_incss)
* cleanup
replace hh_clean_incss = 0 if pernum != 1

svy: mean hh_clean_incss if pernum == 1, over(hh_clean_mkt_inc_total_cat)

return list
matrix a = r(table)
matrix colnames a = <10000 10000-14999 15000-24999 25000-34999 35000-49999 50000-74999 75000-99999 100000-149999 150000-199999 >200000
mat at = a'	
esttab matrix(at, fmt(2)) using hh_socialsec.csv, plain replace eqlabels(none) mlabels(none)
* -----------------------------------------------------------------------------
* -----------------------------------------------------------------------------

* -----------------------------------------------------------------------------
* #### Supplemental Security Income

* incssi
	gen clean_incssi=incssi
	* Replace "Not in universe" by zero
	replace clean_incssi = 0 if clean_incssi == 99999

* -----------------------------------------------------------------------------
* -----------------------------------------------------------------------------
* Bucket: Old Age, Disability, Veteran Status
* 
* clean_incss
* 
egen float clean_oadivs_total = rowtotal(clean_incssi clean_wel_increti_tot clean_wel_incdisa_tot clean_incvet)

* by household
bys serial: egen hh_clean_oadivs_total=total(clean_oadivs_total)
* cleanup
replace hh_clean_oadivs_total = 0 if pernum != 1

svy: mean hh_clean_oadivs_total if pernum == 1, over(hh_clean_mkt_inc_total_cat)

return list
matrix a = r(table)
matrix colnames a = <10000 10000-14999 15000-24999 25000-34999 35000-49999 50000-74999 75000-99999 100000-149999 150000-199999 >200000
mat at = a'	
esttab matrix(at, fmt(2)) using hh_oadivs.csv, plain replace eqlabels(none) mlabels(none)
* -----------------------------------------------------------------------------
* -----------------------------------------------------------------------------


* -----------------------------------------------------------------------------
* #### Earned Income Tax Credit

* eitcred
	gen clean_eitcred=eitcred
	* Replace "Not in universe" by zero
	replace clean_eitcred = 0 if clean_eitcred == 9999

* EITC sum by household
	bys serial: egen hh_clean_eitcred=total(clean_eitcred)
* - Clean up, retain values just for head of household
	replace hh_clean_eitcred = 0 if pernum != 1
* -----------------------------------------------------------------------------
* -----------------------------------------------------------------------------
* Get EITC value by bins
	svy: mean hh_clean_eitcred if pernum == 1, over(hh_clean_mkt_inc_total_cat)

return list
matrix a = r(table)
matrix colnames a = <10000 10000-14999 15000-24999 25000-34999 35000-49999 50000-74999 75000-99999 100000-149999 150000-199999 >200000
mat at = a'	
esttab matrix(at, fmt(2)) using hh_eitcred.csv, plain replace eqlabels(none) mlabels(none)
* -----------------------------------------------------------------------------
* -----------------------------------------------------------------------------

* -----------------------------------------------------------------------------
* #### Child support

* incchild
	gen clean_incchild=incchild
	* Replace "Not in universe" by zero
	replace clean_incchild = 0 if clean_incchild == 99999
	* Replace topcode according to table
	replace clean_incchild = 18200 if clean_incchild == 99997

* -----------------------------------------------------------------------------
* #### Child Tax Credit

* CTCCRD
	gen clean_ctccrd=ctccrd
	* Replace "Not in universe" by zero
	replace clean_ctccrd = 0 if clean_ctccrd == 999999

* -----------------------------------------------------------------------------
* ##### Additional Child Tax Credit

* actccrd
	gen clean_actccrd=actccrd
	* Replace "Not in universe" by zero
	replace clean_actccrd = 0 if clean_actccrd == 99999
	
* -----------------------------------------------------------------------------
* -----------------------------------------------------------------------------
* Bucket: Child
egen float clean_child_total = rowtotal(clean_incchild clean_ctccrd clean_actccrd)

* BucketChild by household
bys serial: egen hh_clean_child_total=total(clean_child_total)
* cleanup
replace hh_clean_child_total = 0 if pernum != 1

svy: mean hh_clean_child_total if pernum == 1, over(hh_clean_mkt_inc_total_cat)

return list
matrix a = r(table)
matrix colnames a = <10000 10000-14999 15000-24999 25000-34999 35000-49999 50000-74999 75000-99999 100000-149999 150000-199999 >200000
mat at = a'	
esttab matrix(at, fmt(2)) using hh_child.csv, plain replace eqlabels(none) mlabels(none)
* -----------------------------------------------------------------------------
* -----------------------------------------------------------------------------

* -----------------------------------------------------------------------------
* #### "AFDC/TANF | Other | All", https://cps.ipums.org/cps-action/variables/INCWELFR#comparability_section

* incwelfr
	gen clean_incwelfr=incwelfr
	* Replace "Not in universe" by zero
	replace clean_incwelfr = 0 if clean_incwelfr == 99999

* -----------------------------------------------------------------------------
* #### SNAP 
* SPMSNAP, not self-reported 
* https://cps.ipums.org/cps-action/variables/FOODSTAMP#description_section
* > Slightly higher than foodstamp which is self reported

* snap by household
	* bys serial: egen hh_spmsnap=total(spmsnap)
* cleanup
	* replace hh_spmsnap = 0 if pernum != 1

* Calculate by hh_clean_mkt_inc_total_cat bins:
	* svy: mean hh_spmsnap if pernum == 1, over(hh_clean_mkt_inc_total_cat)

* - - - - -

* -----------------------------------------------------------------------------
* #### Energy subsidy

* Energy subsidy value sum by household
	* 	bys serial: egen hh_heatval=total(heatval)
* - Clean up, retain values just for head of household
	* replace hh_heatval = 0 if pernum != 1

* Get the energy subsidy value by bins
	* svy: mean hh_heatval if pernum == 1, over(hh_incomecat)
	

* -----------------------------------------------------------------------------
* -----------------------------------------------------------------------------
* BucketPov: SNAP, Energy Subsidy, AFDC/TANF

egen float snap_plus_total = rowtotal(spmsnap heatval clean_incwelfr)

* BucketPov by household
bys serial: egen hh_snap_plus_total=total(snap_plus_total)
* cleanup
replace hh_snap_plus_total = 0 if pernum != 1

svy: mean hh_snap_plus_total if pernum == 1, over(hh_clean_mkt_inc_total_cat)

return list
matrix a = r(table)
matrix colnames a = <10000 10000-14999 15000-24999 25000-34999 35000-49999 50000-74999 75000-99999 100000-149999 150000-199999 >200000
mat at = a'	
esttab matrix(at, fmt(2)) using hh_snap_plus.csv, plain replace eqlabels(none) mlabels(none)
* -----------------------------------------------------------------------------
* -----------------------------------------------------------------------------


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
			
	* INCWELFR 
		* Code: 99999 = N.I.U. (Not in Universe)
		* Note: https://cps.ipums.org/cps-action/variables/INCWELFR#comparability_section
		
	* INCSSI
		* Code: 99999 = N.I.U. (Not in Universe)
		* Persons age 15+
		
	* INCCHILD
		* Codes: 99999 = N.I.U. = 0, 99997 = Top Code = 18,200 *!!*
	
	* INCSS 
		* Codes: 99999 = N.I.U. = 0, 99997 = Top Code = None provided = 0 *!!*
	
	* INCVET 
		* 99999 = N.I.U. (Not in Universe). 
		* 99997 = Top Code (1994-onward). No topcode provided
	
	* INCWKCOM * NO! split
		* Codes: 99999 = N.I.U. = 0, 99997 = Top Code = 50,827 *!!*
		* Topcode, see: https://cps.ipums.org/cps/topcodes_tables.shtml#2017top
		* 1980+: Persons age 15+
		
	* FOODSTAMP 
		* Codes: none, Persons: all, Aggregate: sum person values over households
	
	* HEATVAL
		* Codes: none
		
	* EITCRED Earned Income Tax Credit 
		* Codes: 9999 = N.I.U.
	
	* CTCCRD Child Tax Credit
		* 999999 = N.I.U. (Not in Universe)
		
	* ACTCCRD Additional Child Tax Credit
		* 99999 = N.I.U. (Not in Universe)
		

	
* SPLIT
	* INCDISA1, INCDISA2, compare to srcdisa1 & srcdisa2
		* Code: 99999 = N.I.U. , topcode disa1: 99997, equals 48,800
		* I’m attributing the entire value to srcdisa1
		* count if srcdisa2 > 0
			* > 18, only 18 observations with a secondary source for incdisab
			* compare: tab srcdisa2 srcdisa1
			* I’m attributing src workers compensation and other
			* half to market income, half to welfare income)
			
	* INCRETIR1 & 2, see INCDISA1 and INCDISA2
		* Codes: 99999 = N.I.U. = 0, 99997 = Top Code = 69,600 *!!*
	
	* INCSURV1 & 2, see INCDISA1 and INCDISA2
		* Codes: 99999 = N.I.U. = 0, 99997 = Top Code = 65,000 *!!*

	* INCUNEMP
		* 99999 = N.I.U. (Not in Universe). 
		* 99997 = Top Code (1994-onward). No topcode provided
		* Note: https://cps.ipums.org/cps-action/variables/SRCUNEMP#description_section
		* Splitting on code 2, union unemployment or strike benefits
		

		
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
