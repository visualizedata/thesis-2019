* NOTE: You need to set the Stata working directory to the path
* where the data file is located.

set more off

clear
quietly infix                     ///
  int     year         1-4        ///
  long    serial       5-9        ///
  byte    month        10-11      ///
  double  cpsid        12-25      ///
  byte    asecflag     26-26      ///
  double  asecwth      27-36      ///
  byte    statefip     37-38      ///
  int     metarea      39-42      ///
  long    county       43-47      ///
  byte    statecensus  48-49      ///
  byte    individcc    50-50      ///
  double  hhincome     51-58      ///
  byte    pubhous      59-59      ///
  byte    rentsub      60-60      ///
  byte    heatsub      61-61      ///
  int     heatval      62-65      ///
  byte    foodstmp     66-66      ///
  byte    stampno      67-67      ///
  byte    stampmo      68-69      ///
  byte    atelunch     70-71      ///
  byte    lunchsub     72-72      ///
  byte    frelunch     73-74      ///
  int     faminc       75-77      ///
  byte    nfams        78-79      ///
  byte    ncouples     80-80      ///
  byte    nmothers     81-81      ///
  byte    nfathers     82-82      ///
  byte    pernum       83-84      ///
  double  cpsidp       85-98      ///
  double  asecwt       99-108     ///
  byte    age          109-110    ///
  byte    sex          111-111    ///
  int     race         112-114    ///
  byte    marst        115-115    ///
  byte    famsize      116-117    ///
  byte    nchild       118-118    ///
  byte    nchlt5       119-119    ///
  byte    famunit      120-121    ///
  long    bpl          122-126    ///
  int     yrimmig      127-130    ///
  byte    citizen      131-131    ///
  byte    empstat      132-133    ///
  byte    labforce     134-134    ///
  byte    classwkr     135-136    ///
  int     uhrsworkt    137-139    ///
  byte    whyunemp     140-140    ///
  byte    whyabsnt     141-142    ///
  int     educ         143-145    ///
  byte    schlcoll     146-146    ///
  byte    diffany      147-147    ///
  double  earnwt       148-157    ///
  byte    repwtp       158-158    ///
  double  repwtp1      159-168    ///
  double  repwtp2      169-178    ///
  double  repwtp3      179-188    ///
  double  repwtp4      189-198    ///
  double  repwtp5      199-208    ///
  double  repwtp6      209-218    ///
  double  repwtp7      219-228    ///
  double  repwtp8      229-238    ///
  double  repwtp9      239-248    ///
  double  repwtp10     249-258    ///
  double  repwtp11     259-268    ///
  double  repwtp12     269-278    ///
  double  repwtp13     279-288    ///
  double  repwtp14     289-298    ///
  double  repwtp15     299-308    ///
  double  repwtp16     309-318    ///
  double  repwtp17     319-328    ///
  double  repwtp18     329-338    ///
  double  repwtp19     339-348    ///
  double  repwtp20     349-358    ///
  double  repwtp21     359-368    ///
  double  repwtp22     369-378    ///
  double  repwtp23     379-388    ///
  double  repwtp24     389-398    ///
  double  repwtp25     399-408    ///
  double  repwtp26     409-418    ///
  double  repwtp27     419-428    ///
  double  repwtp28     429-438    ///
  double  repwtp29     439-448    ///
  double  repwtp30     449-458    ///
  double  repwtp31     459-468    ///
  double  repwtp32     469-478    ///
  double  repwtp33     479-488    ///
  double  repwtp34     489-498    ///
  double  repwtp35     499-508    ///
  double  repwtp36     509-518    ///
  double  repwtp37     519-528    ///
  double  repwtp38     529-538    ///
  double  repwtp39     539-548    ///
  double  repwtp40     549-558    ///
  double  repwtp41     559-568    ///
  double  repwtp42     569-578    ///
  double  repwtp43     579-588    ///
  double  repwtp44     589-598    ///
  double  repwtp45     599-608    ///
  double  repwtp46     609-618    ///
  double  repwtp47     619-628    ///
  double  repwtp48     629-638    ///
  double  repwtp49     639-648    ///
  double  repwtp50     649-658    ///
  double  repwtp51     659-668    ///
  double  repwtp52     669-678    ///
  double  repwtp53     679-688    ///
  double  repwtp54     689-698    ///
  double  repwtp55     699-708    ///
  double  repwtp56     709-718    ///
  double  repwtp57     719-728    ///
  double  repwtp58     729-738    ///
  double  repwtp59     739-748    ///
  double  repwtp60     749-758    ///
  double  repwtp61     759-768    ///
  double  repwtp62     769-778    ///
  double  repwtp63     779-788    ///
  double  repwtp64     789-798    ///
  double  repwtp65     799-808    ///
  double  repwtp66     809-818    ///
  double  repwtp67     819-828    ///
  double  repwtp68     829-838    ///
  double  repwtp69     839-848    ///
  double  repwtp70     849-858    ///
  double  repwtp71     859-868    ///
  double  repwtp72     869-878    ///
  double  repwtp73     879-888    ///
  double  repwtp74     889-898    ///
  double  repwtp75     899-908    ///
  double  repwtp76     909-918    ///
  double  repwtp77     919-928    ///
  double  repwtp78     929-938    ///
  double  repwtp79     939-948    ///
  double  repwtp80     949-958    ///
  double  repwtp81     959-968    ///
  double  repwtp82     969-978    ///
  double  repwtp83     979-988    ///
  double  repwtp84     989-998    ///
  double  repwtp85     999-1008   ///
  double  repwtp86     1009-1018  ///
  double  repwtp87     1019-1028  ///
  double  repwtp88     1029-1038  ///
  double  repwtp89     1039-1048  ///
  double  repwtp90     1049-1058  ///
  double  repwtp91     1059-1068  ///
  double  repwtp92     1069-1078  ///
  double  repwtp93     1079-1088  ///
  double  repwtp94     1089-1098  ///
  double  repwtp95     1099-1108  ///
  double  repwtp96     1109-1118  ///
  double  repwtp97     1119-1128  ///
  double  repwtp98     1129-1138  ///
  double  repwtp99     1139-1148  ///
  double  repwtp100    1149-1158  ///
  double  repwtp101    1159-1168  ///
  double  repwtp102    1169-1178  ///
  double  repwtp103    1179-1188  ///
  double  repwtp104    1189-1198  ///
  double  repwtp105    1199-1208  ///
  double  repwtp106    1209-1218  ///
  double  repwtp107    1219-1228  ///
  double  repwtp108    1229-1238  ///
  double  repwtp109    1239-1248  ///
  double  repwtp110    1249-1258  ///
  double  repwtp111    1259-1268  ///
  double  repwtp112    1269-1278  ///
  double  repwtp113    1279-1288  ///
  double  repwtp114    1289-1298  ///
  double  repwtp115    1299-1308  ///
  double  repwtp116    1309-1318  ///
  double  repwtp117    1319-1328  ///
  double  repwtp118    1329-1338  ///
  double  repwtp119    1339-1348  ///
  double  repwtp120    1349-1358  ///
  double  repwtp121    1359-1368  ///
  double  repwtp122    1369-1378  ///
  double  repwtp123    1379-1388  ///
  double  repwtp124    1389-1398  ///
  double  repwtp125    1399-1408  ///
  double  repwtp126    1409-1418  ///
  double  repwtp127    1419-1428  ///
  double  repwtp128    1429-1438  ///
  double  repwtp129    1439-1448  ///
  double  repwtp130    1449-1458  ///
  double  repwtp131    1459-1468  ///
  double  repwtp132    1469-1478  ///
  double  repwtp133    1479-1488  ///
  double  repwtp134    1489-1498  ///
  double  repwtp135    1499-1508  ///
  double  repwtp136    1509-1518  ///
  double  repwtp137    1519-1528  ///
  double  repwtp138    1529-1538  ///
  double  repwtp139    1539-1548  ///
  double  repwtp140    1549-1558  ///
  double  repwtp141    1559-1568  ///
  double  repwtp142    1569-1578  ///
  double  repwtp143    1579-1588  ///
  double  repwtp144    1589-1598  ///
  double  repwtp145    1599-1608  ///
  double  repwtp146    1609-1618  ///
  double  repwtp147    1619-1628  ///
  double  repwtp148    1629-1638  ///
  double  repwtp149    1639-1648  ///
  double  repwtp150    1649-1658  ///
  double  repwtp151    1659-1668  ///
  double  repwtp152    1669-1678  ///
  double  repwtp153    1679-1688  ///
  double  repwtp154    1689-1698  ///
  double  repwtp155    1699-1708  ///
  double  repwtp156    1709-1718  ///
  double  repwtp157    1719-1728  ///
  double  repwtp158    1729-1738  ///
  double  repwtp159    1739-1748  ///
  double  repwtp160    1749-1758  ///
  byte    famid        1759-1760  ///
  double  asecfwt      1761-1772  ///
  byte    actnlfly     1773-1774  ///
  double  ftotval      1775-1784  ///
  double  inctot       1785-1792  ///
  long    incwage      1793-1799  ///
  long    incbus       1800-1806  ///
  long    incfarm      1807-1813  ///
  long    incss        1814-1818  ///
  long    incwelfr     1819-1823  ///
  long    incretir     1824-1829  ///
  long    incssi       1830-1834  ///
  long    incint       1835-1839  ///
  long    incunemp     1840-1844  ///
  long    incwkcom     1845-1849  ///
  long    incvet       1850-1854  ///
  long    incsurv      1855-1860  ///
  long    incdisab     1861-1866  ///
  long    incdivid     1867-1872  ///
  long    incrent      1873-1877  ///
  long    inceduc      1878-1882  ///
  long    incchild     1883-1887  ///
  long    incasist     1888-1892  ///
  long    incother     1893-1897  ///
  byte    gotvdisa     1898-1898  ///
  byte    gotveduc     1899-1899  ///
  byte    gotvothe     1900-1900  ///
  byte    gotvpens     1901-1901  ///
  byte    gotvsurv     1902-1902  ///
  long    incdisa1     1903-1907  ///
  long    incdisa2     1908-1912  ///
  long    inclongj     1913-1919  ///
  long    increti1     1920-1924  ///
  long    increti2     1925-1929  ///
  long    incsurv1     1930-1934  ///
  long    incsurv2     1935-1939  ///
  long    mthwelfr     1940-1944  ///
  long    oincbus      1945-1950  ///
  long    oincfarm     1951-1956  ///
  long    oincwage     1957-1963  ///
  byte    srcdisa1     1964-1965  ///
  byte    srcdisa2     1966-1967  ///
  byte    srcearn      1968-1968  ///
  byte    srceduc      1969-1969  ///
  byte    srcreti1     1970-1970  ///
  byte    srcreti2     1971-1971  ///
  byte    srcsurv1     1972-1973  ///
  byte    srcsurv2     1974-1975  ///
  byte    srcunemp     1976-1976  ///
  byte    srcwelfr     1977-1977  ///
  byte    srcwkcom     1978-1978  ///
  byte    ssikid       1979-1979  ///
  byte    sskid        1980-1980  ///
  byte    vetqa        1981-1981  ///
  byte    whyss1       1982-1982  ///
  byte    whyss2       1983-1983  ///
  byte    whyssi1      1984-1984  ///
  byte    whyssi2      1985-1985  ///
  long    ctccrd       1986-1991  ///
  long    actccrd      1992-1996  ///
  long    adjginc      1997-2003  ///
  int     eitcred      2004-2007  ///
  long    fedretir     2008-2013  ///
  long    fedtax       2014-2020  ///
  long    fedtaxac     2021-2027  ///
  long    fica         2028-2032  ///
  byte    filestat     2033-2033  ///
  byte    depstat      2034-2035  ///
  byte    margtax      2036-2037  ///
  long    statetax     2038-2043  ///
  long    stataxac     2044-2049  ///
  long    taxinc       2050-2056  ///
  byte    offpov       2057-2058  ///
  byte    offpovuniv   2059-2060  ///
  double  offtotval    2061-2070  ///
  byte    poverty      2071-2072  ///
  long    cutoff       2073-2078  ///
  long    foodstamp    2079-2083  ///
  int     schllunch    2084-2087  ///
  int     spmlunch     2088-2091  ///
  double  spmcaphous   2092-2109  ///
  byte    spmnewfam    2110-2110  ///
  byte    spmpov       2111-2111  ///
  byte    spmmort      2112-2112  ///
  double  spmeqscale   2113-2131  ///
  double  spmwt        2132-2139  ///
  double  spmmedxpns   2140-2149  ///
  long    spmchsup     2150-2154  ///
  double  spmsttax     2155-2164  ///
  double  spmfedtaxac  2165-2184  ///
  long    spmeitc      2185-2189  ///
  double  spmfica      2190-2204  ///
  double  spmfedtaxbc  2205-2224  ///
  double  spmwic       2225-2233  ///
  double  spmheat      2234-2255  ///
  long    spmsnap      2256-2260  ///
  long    spmftotval   2261-2267  ///
  double  spmtotres    2268-2289  ///
  byte    spmnadults   2290-2291  ///
  byte    spmnchild    2292-2293  ///
  byte    spmnpers     2294-2295  ///
  double  spmthresh    2296-2317  ///
  byte    disabwrk     2318-2318  ///
  byte    health       2319-2319  ///
  byte    quitsick     2320-2320  ///
  byte    himcaid      2321-2321  ///
  byte    himcare      2322-2322  ///
  byte    hichamp      2323-2323  ///
  byte    caid         2324-2324  ///
  byte    care         2325-2325  ///
  byte    champus      2326-2326  ///
  byte    champva      2327-2327  ///
  byte    militva      2328-2328  ///
  byte    indianh      2329-2329  ///
  byte    mocaid       2330-2331  ///
  byte    kidcaid      2332-2332  ///
  byte    hiurule      2333-2334  ///
  byte    hiunpers     2335-2336  ///
  double  hiuid        2337-2344  ///
  int     hiufpginc    2345-2348  ///
  long    hiufpgbase   2349-2353  ///
  byte    gotwic       2354-2354  ///
  byte    kidcneed     2355-2355  ///
  using `"cps_00012.dat"'

replace asecwth     = asecwth     / 10000
replace asecwt      = asecwt      / 10000
replace earnwt      = earnwt      / 10000
replace repwtp1     = repwtp1     / 10000
replace repwtp2     = repwtp2     / 10000
replace repwtp3     = repwtp3     / 10000
replace repwtp4     = repwtp4     / 10000
replace repwtp5     = repwtp5     / 10000
replace repwtp6     = repwtp6     / 10000
replace repwtp7     = repwtp7     / 10000
replace repwtp8     = repwtp8     / 10000
replace repwtp9     = repwtp9     / 10000
replace repwtp10    = repwtp10    / 10000
replace repwtp11    = repwtp11    / 10000
replace repwtp12    = repwtp12    / 10000
replace repwtp13    = repwtp13    / 10000
replace repwtp14    = repwtp14    / 10000
replace repwtp15    = repwtp15    / 10000
replace repwtp16    = repwtp16    / 10000
replace repwtp17    = repwtp17    / 10000
replace repwtp18    = repwtp18    / 10000
replace repwtp19    = repwtp19    / 10000
replace repwtp20    = repwtp20    / 10000
replace repwtp21    = repwtp21    / 10000
replace repwtp22    = repwtp22    / 10000
replace repwtp23    = repwtp23    / 10000
replace repwtp24    = repwtp24    / 10000
replace repwtp25    = repwtp25    / 10000
replace repwtp26    = repwtp26    / 10000
replace repwtp27    = repwtp27    / 10000
replace repwtp28    = repwtp28    / 10000
replace repwtp29    = repwtp29    / 10000
replace repwtp30    = repwtp30    / 10000
replace repwtp31    = repwtp31    / 10000
replace repwtp32    = repwtp32    / 10000
replace repwtp33    = repwtp33    / 10000
replace repwtp34    = repwtp34    / 10000
replace repwtp35    = repwtp35    / 10000
replace repwtp36    = repwtp36    / 10000
replace repwtp37    = repwtp37    / 10000
replace repwtp38    = repwtp38    / 10000
replace repwtp39    = repwtp39    / 10000
replace repwtp40    = repwtp40    / 10000
replace repwtp41    = repwtp41    / 10000
replace repwtp42    = repwtp42    / 10000
replace repwtp43    = repwtp43    / 10000
replace repwtp44    = repwtp44    / 10000
replace repwtp45    = repwtp45    / 10000
replace repwtp46    = repwtp46    / 10000
replace repwtp47    = repwtp47    / 10000
replace repwtp48    = repwtp48    / 10000
replace repwtp49    = repwtp49    / 10000
replace repwtp50    = repwtp50    / 10000
replace repwtp51    = repwtp51    / 10000
replace repwtp52    = repwtp52    / 10000
replace repwtp53    = repwtp53    / 10000
replace repwtp54    = repwtp54    / 10000
replace repwtp55    = repwtp55    / 10000
replace repwtp56    = repwtp56    / 10000
replace repwtp57    = repwtp57    / 10000
replace repwtp58    = repwtp58    / 10000
replace repwtp59    = repwtp59    / 10000
replace repwtp60    = repwtp60    / 10000
replace repwtp61    = repwtp61    / 10000
replace repwtp62    = repwtp62    / 10000
replace repwtp63    = repwtp63    / 10000
replace repwtp64    = repwtp64    / 10000
replace repwtp65    = repwtp65    / 10000
replace repwtp66    = repwtp66    / 10000
replace repwtp67    = repwtp67    / 10000
replace repwtp68    = repwtp68    / 10000
replace repwtp69    = repwtp69    / 10000
replace repwtp70    = repwtp70    / 10000
replace repwtp71    = repwtp71    / 10000
replace repwtp72    = repwtp72    / 10000
replace repwtp73    = repwtp73    / 10000
replace repwtp74    = repwtp74    / 10000
replace repwtp75    = repwtp75    / 10000
replace repwtp76    = repwtp76    / 10000
replace repwtp77    = repwtp77    / 10000
replace repwtp78    = repwtp78    / 10000
replace repwtp79    = repwtp79    / 10000
replace repwtp80    = repwtp80    / 10000
replace repwtp81    = repwtp81    / 10000
replace repwtp82    = repwtp82    / 10000
replace repwtp83    = repwtp83    / 10000
replace repwtp84    = repwtp84    / 10000
replace repwtp85    = repwtp85    / 10000
replace repwtp86    = repwtp86    / 10000
replace repwtp87    = repwtp87    / 10000
replace repwtp88    = repwtp88    / 10000
replace repwtp89    = repwtp89    / 10000
replace repwtp90    = repwtp90    / 10000
replace repwtp91    = repwtp91    / 10000
replace repwtp92    = repwtp92    / 10000
replace repwtp93    = repwtp93    / 10000
replace repwtp94    = repwtp94    / 10000
replace repwtp95    = repwtp95    / 10000
replace repwtp96    = repwtp96    / 10000
replace repwtp97    = repwtp97    / 10000
replace repwtp98    = repwtp98    / 10000
replace repwtp99    = repwtp99    / 10000
replace repwtp100   = repwtp100   / 10000
replace repwtp101   = repwtp101   / 10000
replace repwtp102   = repwtp102   / 10000
replace repwtp103   = repwtp103   / 10000
replace repwtp104   = repwtp104   / 10000
replace repwtp105   = repwtp105   / 10000
replace repwtp106   = repwtp106   / 10000
replace repwtp107   = repwtp107   / 10000
replace repwtp108   = repwtp108   / 10000
replace repwtp109   = repwtp109   / 10000
replace repwtp110   = repwtp110   / 10000
replace repwtp111   = repwtp111   / 10000
replace repwtp112   = repwtp112   / 10000
replace repwtp113   = repwtp113   / 10000
replace repwtp114   = repwtp114   / 10000
replace repwtp115   = repwtp115   / 10000
replace repwtp116   = repwtp116   / 10000
replace repwtp117   = repwtp117   / 10000
replace repwtp118   = repwtp118   / 10000
replace repwtp119   = repwtp119   / 10000
replace repwtp120   = repwtp120   / 10000
replace repwtp121   = repwtp121   / 10000
replace repwtp122   = repwtp122   / 10000
replace repwtp123   = repwtp123   / 10000
replace repwtp124   = repwtp124   / 10000
replace repwtp125   = repwtp125   / 10000
replace repwtp126   = repwtp126   / 10000
replace repwtp127   = repwtp127   / 10000
replace repwtp128   = repwtp128   / 10000
replace repwtp129   = repwtp129   / 10000
replace repwtp130   = repwtp130   / 10000
replace repwtp131   = repwtp131   / 10000
replace repwtp132   = repwtp132   / 10000
replace repwtp133   = repwtp133   / 10000
replace repwtp134   = repwtp134   / 10000
replace repwtp135   = repwtp135   / 10000
replace repwtp136   = repwtp136   / 10000
replace repwtp137   = repwtp137   / 10000
replace repwtp138   = repwtp138   / 10000
replace repwtp139   = repwtp139   / 10000
replace repwtp140   = repwtp140   / 10000
replace repwtp141   = repwtp141   / 10000
replace repwtp142   = repwtp142   / 10000
replace repwtp143   = repwtp143   / 10000
replace repwtp144   = repwtp144   / 10000
replace repwtp145   = repwtp145   / 10000
replace repwtp146   = repwtp146   / 10000
replace repwtp147   = repwtp147   / 10000
replace repwtp148   = repwtp148   / 10000
replace repwtp149   = repwtp149   / 10000
replace repwtp150   = repwtp150   / 10000
replace repwtp151   = repwtp151   / 10000
replace repwtp152   = repwtp152   / 10000
replace repwtp153   = repwtp153   / 10000
replace repwtp154   = repwtp154   / 10000
replace repwtp155   = repwtp155   / 10000
replace repwtp156   = repwtp156   / 10000
replace repwtp157   = repwtp157   / 10000
replace repwtp158   = repwtp158   / 10000
replace repwtp159   = repwtp159   / 10000
replace repwtp160   = repwtp160   / 10000
replace asecfwt     = asecfwt     / 100
replace spmwt       = spmwt       / 100

format cpsid       %14.0g
format asecwth     %10.4f
format hhincome    %8.0g
format cpsidp      %14.0g
format asecwt      %10.4f
format earnwt      %10.4f
format repwtp1     %10.4f
format repwtp2     %10.4f
format repwtp3     %10.4f
format repwtp4     %10.4f
format repwtp5     %10.4f
format repwtp6     %10.4f
format repwtp7     %10.4f
format repwtp8     %10.4f
format repwtp9     %10.4f
format repwtp10    %10.4f
format repwtp11    %10.4f
format repwtp12    %10.4f
format repwtp13    %10.4f
format repwtp14    %10.4f
format repwtp15    %10.4f
format repwtp16    %10.4f
format repwtp17    %10.4f
format repwtp18    %10.4f
format repwtp19    %10.4f
format repwtp20    %10.4f
format repwtp21    %10.4f
format repwtp22    %10.4f
format repwtp23    %10.4f
format repwtp24    %10.4f
format repwtp25    %10.4f
format repwtp26    %10.4f
format repwtp27    %10.4f
format repwtp28    %10.4f
format repwtp29    %10.4f
format repwtp30    %10.4f
format repwtp31    %10.4f
format repwtp32    %10.4f
format repwtp33    %10.4f
format repwtp34    %10.4f
format repwtp35    %10.4f
format repwtp36    %10.4f
format repwtp37    %10.4f
format repwtp38    %10.4f
format repwtp39    %10.4f
format repwtp40    %10.4f
format repwtp41    %10.4f
format repwtp42    %10.4f
format repwtp43    %10.4f
format repwtp44    %10.4f
format repwtp45    %10.4f
format repwtp46    %10.4f
format repwtp47    %10.4f
format repwtp48    %10.4f
format repwtp49    %10.4f
format repwtp50    %10.4f
format repwtp51    %10.4f
format repwtp52    %10.4f
format repwtp53    %10.4f
format repwtp54    %10.4f
format repwtp55    %10.4f
format repwtp56    %10.4f
format repwtp57    %10.4f
format repwtp58    %10.4f
format repwtp59    %10.4f
format repwtp60    %10.4f
format repwtp61    %10.4f
format repwtp62    %10.4f
format repwtp63    %10.4f
format repwtp64    %10.4f
format repwtp65    %10.4f
format repwtp66    %10.4f
format repwtp67    %10.4f
format repwtp68    %10.4f
format repwtp69    %10.4f
format repwtp70    %10.4f
format repwtp71    %10.4f
format repwtp72    %10.4f
format repwtp73    %10.4f
format repwtp74    %10.4f
format repwtp75    %10.4f
format repwtp76    %10.4f
format repwtp77    %10.4f
format repwtp78    %10.4f
format repwtp79    %10.4f
format repwtp80    %10.4f
format repwtp81    %10.4f
format repwtp82    %10.4f
format repwtp83    %10.4f
format repwtp84    %10.4f
format repwtp85    %10.4f
format repwtp86    %10.4f
format repwtp87    %10.4f
format repwtp88    %10.4f
format repwtp89    %10.4f
format repwtp90    %10.4f
format repwtp91    %10.4f
format repwtp92    %10.4f
format repwtp93    %10.4f
format repwtp94    %10.4f
format repwtp95    %10.4f
format repwtp96    %10.4f
format repwtp97    %10.4f
format repwtp98    %10.4f
format repwtp99    %10.4f
format repwtp100   %10.4f
format repwtp101   %10.4f
format repwtp102   %10.4f
format repwtp103   %10.4f
format repwtp104   %10.4f
format repwtp105   %10.4f
format repwtp106   %10.4f
format repwtp107   %10.4f
format repwtp108   %10.4f
format repwtp109   %10.4f
format repwtp110   %10.4f
format repwtp111   %10.4f
format repwtp112   %10.4f
format repwtp113   %10.4f
format repwtp114   %10.4f
format repwtp115   %10.4f
format repwtp116   %10.4f
format repwtp117   %10.4f
format repwtp118   %10.4f
format repwtp119   %10.4f
format repwtp120   %10.4f
format repwtp121   %10.4f
format repwtp122   %10.4f
format repwtp123   %10.4f
format repwtp124   %10.4f
format repwtp125   %10.4f
format repwtp126   %10.4f
format repwtp127   %10.4f
format repwtp128   %10.4f
format repwtp129   %10.4f
format repwtp130   %10.4f
format repwtp131   %10.4f
format repwtp132   %10.4f
format repwtp133   %10.4f
format repwtp134   %10.4f
format repwtp135   %10.4f
format repwtp136   %10.4f
format repwtp137   %10.4f
format repwtp138   %10.4f
format repwtp139   %10.4f
format repwtp140   %10.4f
format repwtp141   %10.4f
format repwtp142   %10.4f
format repwtp143   %10.4f
format repwtp144   %10.4f
format repwtp145   %10.4f
format repwtp146   %10.4f
format repwtp147   %10.4f
format repwtp148   %10.4f
format repwtp149   %10.4f
format repwtp150   %10.4f
format repwtp151   %10.4f
format repwtp152   %10.4f
format repwtp153   %10.4f
format repwtp154   %10.4f
format repwtp155   %10.4f
format repwtp156   %10.4f
format repwtp157   %10.4f
format repwtp158   %10.4f
format repwtp159   %10.4f
format repwtp160   %10.4f
format asecfwt     %12.2f
format ftotval     %10.0g
format inctot      %8.0g
format offtotval   %10.0g
format spmcaphous  %18.0g
format spmeqscale  %19.0g
format spmwt       %8.2f
format spmmedxpns  %10.0g
format spmsttax    %10.0g
format spmfedtaxac %20.0g
format spmfica     %15.0g
format spmfedtaxbc %20.0g
format spmwic      %9.0g
format spmheat     %22.0g
format spmtotres   %22.0g
format spmthresh   %22.0g
format hiuid       %8.0g

label var year        `"Survey year"'
label var serial      `"Household serial number"'
label var month       `"Month"'
label var cpsid       `"CPSID, household record"'
label var asecflag    `"Flag for ASEC"'
label var asecwth     `"Annual Social and Economic Supplement Household weight"'
label var statefip    `"State (FIPS code)"'
label var metarea     `"Metropolitan area"'
label var county      `"FIPS county code"'
label var statecensus `"State (Census code)"'
label var individcc   `"Individual principal city"'
label var hhincome    `"Total household income"'
label var pubhous     `"Living in public housing"'
label var rentsub     `"Paying lower rent due to government subsidy"'
label var heatsub     `"Received energy subsidy"'
label var heatval     `"Value of energy subsidy"'
label var foodstmp    `"Food stamp recipiency"'
label var stampno     `"Number of persons covered by food stamps"'
label var stampmo     `"Number of months received food stamps"'
label var atelunch    `"Number of children who ate complete school lunch"'
label var lunchsub    `"Government school lunch food subsidy"'
label var frelunch    `"Number of children with government school lunch subsidy"'
label var faminc      `"Family income of householder"'
label var nfams       `"Number of families in household"'
label var ncouples    `"Number of married couples in household"'
label var nmothers    `"Number of mothers in household"'
label var nfathers    `"Number of fathers in household"'
label var pernum      `"Person number in sample unit"'
label var cpsidp      `"CPSID, person record"'
label var asecwt      `"Annual Social and Economic Supplement Weight"'
label var age         `"Age"'
label var sex         `"Sex"'
label var race        `"Race"'
label var marst       `"Marital status"'
label var famsize     `"Number of own family members in hh"'
label var nchild      `"Number of own children in household"'
label var nchlt5      `"Number of own children under age 5 in hh"'
label var famunit     `"Family unit membership"'
label var bpl         `"Birthplace"'
label var yrimmig     `"Year of immigration"'
label var citizen     `"Citizenship status"'
label var empstat     `"Employment status"'
label var labforce    `"Labor force status"'
label var classwkr    `"Class of worker"'
label var uhrsworkt   `"Hours usually worked per week at all jobs"'
label var whyunemp    `"Reason for unemployment"'
label var whyabsnt    `"Reason for absence from work"'
label var educ        `"Educational attainment recode"'
label var schlcoll    `"School or college attendance"'
label var diffany     `"Any difficulty"'
label var earnwt      `"Earnings weight"'
label var repwtp      `"Person replicate weights"'
label var repwtp1     `"Person replicate weight 1"'
label var repwtp2     `"Person replicate weight 2"'
label var repwtp3     `"Person replicate weight 3"'
label var repwtp4     `"Person replicate weight 4"'
label var repwtp5     `"Person replicate weight 5"'
label var repwtp6     `"Person replicate weight 6"'
label var repwtp7     `"Person replicate weight 7"'
label var repwtp8     `"Person replicate weight 8"'
label var repwtp9     `"Person replicate weight 9"'
label var repwtp10    `"Person replicate weight 10"'
label var repwtp11    `"Person replicate weight 11"'
label var repwtp12    `"Person replicate weight 12"'
label var repwtp13    `"Person replicate weight 13"'
label var repwtp14    `"Person replicate weight 14"'
label var repwtp15    `"Person replicate weight 15"'
label var repwtp16    `"Person replicate weight 16"'
label var repwtp17    `"Person replicate weight 17"'
label var repwtp18    `"Person replicate weight 18"'
label var repwtp19    `"Person replicate weight 19"'
label var repwtp20    `"Person replicate weight 20"'
label var repwtp21    `"Person replicate weight 21"'
label var repwtp22    `"Person replicate weight 22"'
label var repwtp23    `"Person replicate weight 23"'
label var repwtp24    `"Person replicate weight 24"'
label var repwtp25    `"Person replicate weight 25"'
label var repwtp26    `"Person replicate weight 26"'
label var repwtp27    `"Person replicate weight 27"'
label var repwtp28    `"Person replicate weight 28"'
label var repwtp29    `"Person replicate weight 29"'
label var repwtp30    `"Person replicate weight 30"'
label var repwtp31    `"Person replicate weight 31"'
label var repwtp32    `"Person replicate weight 32"'
label var repwtp33    `"Person replicate weight 33"'
label var repwtp34    `"Person replicate weight 34"'
label var repwtp35    `"Person replicate weight 35"'
label var repwtp36    `"Person replicate weight 36"'
label var repwtp37    `"Person replicate weight 37"'
label var repwtp38    `"Person replicate weight 38"'
label var repwtp39    `"Person replicate weight 39"'
label var repwtp40    `"Person replicate weight 40"'
label var repwtp41    `"Person replicate weight 41"'
label var repwtp42    `"Person replicate weight 42"'
label var repwtp43    `"Person replicate weight 43"'
label var repwtp44    `"Person replicate weight 44"'
label var repwtp45    `"Person replicate weight 45"'
label var repwtp46    `"Person replicate weight 46"'
label var repwtp47    `"Person replicate weight 47"'
label var repwtp48    `"Person replicate weight 48"'
label var repwtp49    `"Person replicate weight 49"'
label var repwtp50    `"Person replicate weight 50"'
label var repwtp51    `"Person replicate weight 51"'
label var repwtp52    `"Person replicate weight 52"'
label var repwtp53    `"Person replicate weight 53"'
label var repwtp54    `"Person replicate weight 54"'
label var repwtp55    `"Person replicate weight 55"'
label var repwtp56    `"Person replicate weight 56"'
label var repwtp57    `"Person replicate weight 57"'
label var repwtp58    `"Person replicate weight 58"'
label var repwtp59    `"Person replicate weight 59"'
label var repwtp60    `"Person replicate weight 60"'
label var repwtp61    `"Person replicate weight 61"'
label var repwtp62    `"Person replicate weight 62"'
label var repwtp63    `"Person replicate weight 63"'
label var repwtp64    `"Person replicate weight 64"'
label var repwtp65    `"Person replicate weight 65"'
label var repwtp66    `"Person replicate weight 66"'
label var repwtp67    `"Person replicate weight 67"'
label var repwtp68    `"Person replicate weight 68"'
label var repwtp69    `"Person replicate weight 69"'
label var repwtp70    `"Person replicate weight 70"'
label var repwtp71    `"Person replicate weight 71"'
label var repwtp72    `"Person replicate weight 72"'
label var repwtp73    `"Person replicate weight 73"'
label var repwtp74    `"Person replicate weight 74"'
label var repwtp75    `"Person replicate weight 75"'
label var repwtp76    `"Person replicate weight 76"'
label var repwtp77    `"Person replicate weight 77"'
label var repwtp78    `"Person replicate weight 78"'
label var repwtp79    `"Person replicate weight 79"'
label var repwtp80    `"Person replicate weight 80"'
label var repwtp81    `"Person replicate weight 81"'
label var repwtp82    `"Person replicate weight 82"'
label var repwtp83    `"Person replicate weight 83"'
label var repwtp84    `"Person replicate weight 84"'
label var repwtp85    `"Person replicate weight 85"'
label var repwtp86    `"Person replicate weight 86"'
label var repwtp87    `"Person replicate weight 87"'
label var repwtp88    `"Person replicate weight 88"'
label var repwtp89    `"Person replicate weight 89"'
label var repwtp90    `"Person replicate weight 90"'
label var repwtp91    `"Person replicate weight 91"'
label var repwtp92    `"Person replicate weight 92"'
label var repwtp93    `"Person replicate weight 93"'
label var repwtp94    `"Person replicate weight 94"'
label var repwtp95    `"Person replicate weight 95"'
label var repwtp96    `"Person replicate weight 96"'
label var repwtp97    `"Person replicate weight 97"'
label var repwtp98    `"Person replicate weight 98"'
label var repwtp99    `"Person replicate weight 99"'
label var repwtp100   `"Person replicate weight 100"'
label var repwtp101   `"Person replicate weight 101"'
label var repwtp102   `"Person replicate weight 102"'
label var repwtp103   `"Person replicate weight 103"'
label var repwtp104   `"Person replicate weight 104"'
label var repwtp105   `"Person replicate weight 105"'
label var repwtp106   `"Person replicate weight 106"'
label var repwtp107   `"Person replicate weight 107"'
label var repwtp108   `"Person replicate weight 108"'
label var repwtp109   `"Person replicate weight 109"'
label var repwtp110   `"Person replicate weight 110"'
label var repwtp111   `"Person replicate weight 111"'
label var repwtp112   `"Person replicate weight 112"'
label var repwtp113   `"Person replicate weight 113"'
label var repwtp114   `"Person replicate weight 114"'
label var repwtp115   `"Person replicate weight 115"'
label var repwtp116   `"Person replicate weight 116"'
label var repwtp117   `"Person replicate weight 117"'
label var repwtp118   `"Person replicate weight 118"'
label var repwtp119   `"Person replicate weight 119"'
label var repwtp120   `"Person replicate weight 120"'
label var repwtp121   `"Person replicate weight 121"'
label var repwtp122   `"Person replicate weight 122"'
label var repwtp123   `"Person replicate weight 123"'
label var repwtp124   `"Person replicate weight 124"'
label var repwtp125   `"Person replicate weight 125"'
label var repwtp126   `"Person replicate weight 126"'
label var repwtp127   `"Person replicate weight 127"'
label var repwtp128   `"Person replicate weight 128"'
label var repwtp129   `"Person replicate weight 129"'
label var repwtp130   `"Person replicate weight 130"'
label var repwtp131   `"Person replicate weight 131"'
label var repwtp132   `"Person replicate weight 132"'
label var repwtp133   `"Person replicate weight 133"'
label var repwtp134   `"Person replicate weight 134"'
label var repwtp135   `"Person replicate weight 135"'
label var repwtp136   `"Person replicate weight 136"'
label var repwtp137   `"Person replicate weight 137"'
label var repwtp138   `"Person replicate weight 138"'
label var repwtp139   `"Person replicate weight 139"'
label var repwtp140   `"Person replicate weight 140"'
label var repwtp141   `"Person replicate weight 141"'
label var repwtp142   `"Person replicate weight 142"'
label var repwtp143   `"Person replicate weight 143"'
label var repwtp144   `"Person replicate weight 144"'
label var repwtp145   `"Person replicate weight 145"'
label var repwtp146   `"Person replicate weight 146"'
label var repwtp147   `"Person replicate weight 147"'
label var repwtp148   `"Person replicate weight 148"'
label var repwtp149   `"Person replicate weight 149"'
label var repwtp150   `"Person replicate weight 150"'
label var repwtp151   `"Person replicate weight 151"'
label var repwtp152   `"Person replicate weight 152"'
label var repwtp153   `"Person replicate weight 153"'
label var repwtp154   `"Person replicate weight 154"'
label var repwtp155   `"Person replicate weight 155"'
label var repwtp156   `"Person replicate weight 156"'
label var repwtp157   `"Person replicate weight 157"'
label var repwtp158   `"Person replicate weight 158"'
label var repwtp159   `"Person replicate weight 159"'
label var repwtp160   `"Person replicate weight 160"'
label var famid       `"Unique Family Identifier"'
label var asecfwt     `"ASEC Family weight"'
label var actnlfly    `"Activity when not in labor force last year (part-year workers)"'
label var ftotval     `"Total family income"'
label var inctot      `"Total personal income"'
label var incwage     `"Wage and salary income"'
label var incbus      `"Non-farm business income"'
label var incfarm     `"Farm income"'
label var incss       `"Social Security income"'
label var incwelfr    `"Welfare (public assistance) income"'
label var incretir    `"Retirement income"'
label var incssi      `"Income from SSI"'
label var incint      `"Income from interest"'
label var incunemp    `"Income from unemployment benefits"'
label var incwkcom    `"Income from worker's compensation"'
label var incvet      `"Income from veteran's benefits"'
label var incsurv     `"Income from survivor's benefits"'
label var incdisab    `"Income from disability benefits"'
label var incdivid    `"Income from dividends"'
label var incrent     `"Income from rent"'
label var inceduc     `"Income from educational assistance"'
label var incchild    `"Income from child support"'
label var incasist    `"Income from assistance"'
label var incother    `"Income from other Source not specified"'
label var gotvdisa    `"Received veterans' disability compensation"'
label var gotveduc    `"Received veterans' education assistance"'
label var gotvothe    `"Received other veterans' payments"'
label var gotvpens    `"Received veterans' pension"'
label var gotvsurv    `"Received veterans' survivor benefits"'
label var incdisa1    `"Disability income from first source"'
label var incdisa2    `"Disability income from second source"'
label var inclongj    `"Earnings from longest job"'
label var increti1    `"Retirement income from first source"'
label var increti2    `"Retirement income from second source"'
label var incsurv1    `"Survivor benefits income from first source"'
label var incsurv2    `"Survivor benefits income from second source"'
label var mthwelfr    `"Number of months received welfare income"'
label var oincbus     `"Earnings from other work included business self-employment earnings"'
label var oincfarm    `"Earnings from other work included farm self-employment earnings"'
label var oincwage    `"Earnings from other work included wage and salary earnings"'
label var srcdisa1    `"First source of disability income"'
label var srcdisa2    `"Second source of disability income"'
label var srcearn     `"Source of earnings from longest job"'
label var srceduc     `"Source of educational assistance"'
label var srcreti1    `"First source of retirement income"'
label var srcreti2    `"Second source of retirement income"'
label var srcsurv1    `"First source of survivor benefits"'
label var srcsurv2    `"Second source of survivor benefits"'
label var srcunemp    `"Source of unemployment income"'
label var srcwelfr    `"Source of welfare income"'
label var srcwkcom    `"Source of workmen's compensation"'
label var ssikid      `"Child under 18 received SSI income"'
label var sskid       `"Child under 19 received SS income"'
label var vetqa       `"Required to fill out annual income questionnaire for veterans' administration"'
label var whyss1      `"First reason for receiving social security income"'
label var whyss2      `"Second reason for receiving social security income"'
label var whyssi1     `"First reason for receiving supplementary security income"'
label var whyssi2     `"Second reason for receiving supplementary security income"'
label var ctccrd      `"Child Tax Credit"'
label var actccrd     `"Additional Child Tax Credit"'
label var adjginc     `"Adjusted gross income"'
label var eitcred     `"Earned income tax credit"'
label var fedretir    `"Federal retirement payroll deduction"'
label var fedtax      `"Federal income tax liability, before credits"'
label var fedtaxac    `"Federal income tax liability, after all credits"'
label var fica        `"Social security retirement payroll deduction"'
label var filestat    `"Tax filer status"'
label var depstat     `"Dependency status pointer"'
label var margtax     `"Federal income marginal tax rate"'
label var statetax    `"State income tax liability, before credits"'
label var stataxac    `"State income tax liability, after all credits"'
label var taxinc      `"Taxable income amount"'
label var offpov      `"Official Poverty Status (IPUMS constructed)"'
label var offpovuniv  `"Official Poverty Rate Universe"'
label var offtotval   `"Total Family Income for Replicating Official Poverty Rates"'
label var poverty     `"Original poverty status (PUMS original)"'
label var cutoff      `"Cutoff for original poverty status, in dollars"'
label var foodstamp   `"Family market value of food stamps"'
label var schllunch   `"Family market value of school lunch"'
label var spmlunch    `"SPM unit's school lunch value"'
label var spmcaphous  `"SPM unit's capped housing subsidy"'
label var spmnewfam   `"SPM unit's new family status"'
label var spmpov      `"SPM unit's poverty status"'
label var spmmort     `"SPM unit's tenure/mortgage status"'
label var spmeqscale  `"SPM unit's equivalence scale"'
label var spmwt       `"SPM unit's weight"'
label var spmmedxpns  `"SPM unit's medical out-of-pocket and Medicare B subsidy"'
label var spmchsup    `"SPM unit's child support paid"'
label var spmsttax    `"SPM unit's state tax"'
label var spmfedtaxac `"SPM unit's federal tax"'
label var spmeitc     `"SPM unit's federal EITC"'
label var spmfica     `"SPM unit's FICA and federal retirement"'
label var spmfedtaxbc `"SPM unit's federal tax before the EITC"'
label var spmwic      `"SPM unit's WIC value"'
label var spmheat     `"SPM unit's energy subsidy"'
label var spmsnap     `"SPM unit's SNAP subsidy"'
label var spmftotval  `"SPM unit's cash income"'
label var spmtotres   `"Total SPM resources for SPM unit"'
label var spmnadults  `"SPM unit's number of adults"'
label var spmnchild   `"SPM unit's number of chidren"'
label var spmnpers    `"SPM unit's number of persons"'
label var spmthresh   `"SPM unit's threshold"'
label var disabwrk    `"Work disability"'
label var health      `"Health status"'
label var quitsick    `"Quit job or retired for health reasons"'
label var himcaid     `"Covered by Medicaid last year"'
label var himcare     `"Covered by Medicare last year"'
label var hichamp     `"Covered by military health insurance last year"'
label var caid        `"Covered by Medicaid last year"'
label var care        `"Covered by Medicare last year"'
label var champus     `"Covered by Champus/Tricare last year"'
label var champva     `"Covered by CHAMPVA last year"'
label var militva     `"Covered by VA or Military health care last year"'
label var indianh     `"Covered by Indian Health Service last year"'
label var mocaid      `"Months of Medicaid coverage last year"'
label var kidcaid     `"Child covered by Medicaid, last year"'
label var hiurule     `"HIU pointer rule"'
label var hiunpers    `"HIU number of persons"'
label var hiuid       `"HIU identification"'
label var hiufpginc   `"Federal poverty guidelines (increment)"'
label var hiufpgbase  `"Federal poverty guidelines (base)"'
label var gotwic      `"Received WIC"'
label var kidcneed    `"Child needed care while parent worked"'

label define month_lbl 01 `"January"'
label define month_lbl 02 `"February"', add
label define month_lbl 03 `"March"', add
label define month_lbl 04 `"April"', add
label define month_lbl 05 `"May"', add
label define month_lbl 06 `"June"', add
label define month_lbl 07 `"July"', add
label define month_lbl 08 `"August"', add
label define month_lbl 09 `"September"', add
label define month_lbl 10 `"October"', add
label define month_lbl 11 `"November"', add
label define month_lbl 12 `"December"', add
label values month month_lbl

label define asecflag_lbl 1 `"ASEC"'
label define asecflag_lbl 2 `"March Basic"', add
label values asecflag asecflag_lbl

label define statefip_lbl 01 `"Alabama"'
label define statefip_lbl 02 `"Alaska"', add
label define statefip_lbl 04 `"Arizona"', add
label define statefip_lbl 05 `"Arkansas"', add
label define statefip_lbl 06 `"California"', add
label define statefip_lbl 08 `"Colorado"', add
label define statefip_lbl 09 `"Connecticut"', add
label define statefip_lbl 10 `"Delaware"', add
label define statefip_lbl 11 `"District of Columbia"', add
label define statefip_lbl 12 `"Florida"', add
label define statefip_lbl 13 `"Georgia"', add
label define statefip_lbl 15 `"Hawaii"', add
label define statefip_lbl 16 `"Idaho"', add
label define statefip_lbl 17 `"Illinois"', add
label define statefip_lbl 18 `"Indiana"', add
label define statefip_lbl 19 `"Iowa"', add
label define statefip_lbl 20 `"Kansas"', add
label define statefip_lbl 21 `"Kentucky"', add
label define statefip_lbl 22 `"Louisiana"', add
label define statefip_lbl 23 `"Maine"', add
label define statefip_lbl 24 `"Maryland"', add
label define statefip_lbl 25 `"Massachusetts"', add
label define statefip_lbl 26 `"Michigan"', add
label define statefip_lbl 27 `"Minnesota"', add
label define statefip_lbl 28 `"Mississippi"', add
label define statefip_lbl 29 `"Missouri"', add
label define statefip_lbl 30 `"Montana"', add
label define statefip_lbl 31 `"Nebraska"', add
label define statefip_lbl 32 `"Nevada"', add
label define statefip_lbl 33 `"New Hampshire"', add
label define statefip_lbl 34 `"New Jersey"', add
label define statefip_lbl 35 `"New Mexico"', add
label define statefip_lbl 36 `"New York"', add
label define statefip_lbl 37 `"North Carolina"', add
label define statefip_lbl 38 `"North Dakota"', add
label define statefip_lbl 39 `"Ohio"', add
label define statefip_lbl 40 `"Oklahoma"', add
label define statefip_lbl 41 `"Oregon"', add
label define statefip_lbl 42 `"Pennsylvania"', add
label define statefip_lbl 44 `"Rhode Island"', add
label define statefip_lbl 45 `"South Carolina"', add
label define statefip_lbl 46 `"South Dakota"', add
label define statefip_lbl 47 `"Tennessee"', add
label define statefip_lbl 48 `"Texas"', add
label define statefip_lbl 49 `"Utah"', add
label define statefip_lbl 50 `"Vermont"', add
label define statefip_lbl 51 `"Virginia"', add
label define statefip_lbl 53 `"Washington"', add
label define statefip_lbl 54 `"West Virginia"', add
label define statefip_lbl 55 `"Wisconsin"', add
label define statefip_lbl 56 `"Wyoming"', add
label define statefip_lbl 61 `"Maine-New Hampshire-Vermont"', add
label define statefip_lbl 65 `"Montana-Idaho-Wyoming"', add
label define statefip_lbl 68 `"Alaska-Hawaii"', add
label define statefip_lbl 69 `"Nebraska-North Dakota-South Dakota"', add
label define statefip_lbl 70 `"Maine-Massachusetts-New Hampshire-Rhode Island-Vermont"', add
label define statefip_lbl 71 `"Michigan-Wisconsin"', add
label define statefip_lbl 72 `"Minnesota-Iowa"', add
label define statefip_lbl 73 `"Nebraska-North Dakota-South Dakota-Kansas"', add
label define statefip_lbl 74 `"Delaware-Virginia"', add
label define statefip_lbl 75 `"North Carolina-South Carolina"', add
label define statefip_lbl 76 `"Alabama-Mississippi"', add
label define statefip_lbl 77 `"Arkansas-Oklahoma"', add
label define statefip_lbl 78 `"Arizona-New Mexico-Colorado"', add
label define statefip_lbl 79 `"Idaho-Wyoming-Utah-Montana-Nevada"', add
label define statefip_lbl 80 `"Alaska-Washington-Hawaii"', add
label define statefip_lbl 81 `"New Hampshire-Maine-Vermont-Rhode Island"', add
label define statefip_lbl 83 `"South Carolina-Georgia"', add
label define statefip_lbl 84 `"Kentucky-Tennessee"', add
label define statefip_lbl 85 `"Arkansas-Louisiana-Oklahoma"', add
label define statefip_lbl 87 `"Iowa-N Dakota-S Dakota-Nebraska-Kansas-Minnesota-Missouri"', add
label define statefip_lbl 88 `"Washington-Oregon-Alaska-Hawaii"', add
label define statefip_lbl 89 `"Montana-Wyoming-Colorado-New Mexico-Utah-Nevada-Arizona"', add
label define statefip_lbl 90 `"Delaware-Maryland-Virginia-West Virginia"', add
label define statefip_lbl 99 `"State not identified"', add
label values statefip statefip_lbl

label define metarea_lbl 0060 `"Abilene, TX"'
label define metarea_lbl 0080 `"Akron, OH"', add
label define metarea_lbl 0120 `"Albany, GA"', add
label define metarea_lbl 0160 `"Albany-Schenectady-Troy, NY"', add
label define metarea_lbl 0200 `"Albuquerque, NM"', add
label define metarea_lbl 0240 `"Allentown-Bethlehem-Easton, PA/NJ"', add
label define metarea_lbl 0280 `"Altoona, PA MSA"', add
label define metarea_lbl 0320 `"Amarillo, TX"', add
label define metarea_lbl 0380 `"Anchorage, AK"', add
label define metarea_lbl 0400 `"Anderson, IN"', add
label define metarea_lbl 0440 `"Ann Arbor, MI"', add
label define metarea_lbl 0450 `"Anniston, AL"', add
label define metarea_lbl 0451 `"Anniston-Oxford, AL"', add
label define metarea_lbl 0460 `"Appleton,Oshkosh-Neenah, WI"', add
label define metarea_lbl 0461 `"Appleton, WI"', add
label define metarea_lbl 0462 `"Oshkosh-Neenah, WI"', add
label define metarea_lbl 0480 `"Asheville, NC"', add
label define metarea_lbl 0500 `"Athens, GA"', add
label define metarea_lbl 0501 `"Athens-Clark County, GA"', add
label define metarea_lbl 0520 `"Atlanta, GA"', add
label define metarea_lbl 0521 `"Atlanta-Sandy Springs-Marietta, GA"', add
label define metarea_lbl 0560 `"Atlantic City, NJ"', add
label define metarea_lbl 0580 `"Auburn-Opelika, AL"', add
label define metarea_lbl 0600 `"Augusta-Aiken, GA-SC"', add
label define metarea_lbl 0601 `"Augusta-Richmond County, GA-SC"', add
label define metarea_lbl 0640 `"Austin, TX"', add
label define metarea_lbl 0641 `"Austin-Round Rock, TX"', add
label define metarea_lbl 0680 `"Bakersfield, CA"', add
label define metarea_lbl 0720 `"Baltimore, MD"', add
label define metarea_lbl 0721 `"Baltimore-Towson, MD"', add
label define metarea_lbl 0722 `"Baltimore-Towson-Columbia, MD"', add
label define metarea_lbl 0730 `"Bangor, ME"', add
label define metarea_lbl 0740 `"Barnstable-Yarmouth, MA"', add
label define metarea_lbl 0741 `"Barnstable Town, MA"', add
label define metarea_lbl 0760 `"Baton Rouge, LA"', add
label define metarea_lbl 0780 `"Battle Creek, MI"', add
label define metarea_lbl 0840 `"Beaumont-Port Arthur-Orange, TX"', add
label define metarea_lbl 0841 `"Beaumont-Port Arthur, TX"', add
label define metarea_lbl 0860 `"Bellingham, WA"', add
label define metarea_lbl 0870 `"Benton Harbor, MI"', add
label define metarea_lbl 0871 `"Niles-Benton Harbor, MI"', add
label define metarea_lbl 0880 `"Billings, MT"', add
label define metarea_lbl 0900 `"Bend, OR"', add
label define metarea_lbl 0920 `"Biloxi-Gulfport, MS"', add
label define metarea_lbl 0960 `"Binghamton, NY"', add
label define metarea_lbl 1000 `"Birmingham, AL"', add
label define metarea_lbl 1001 `"Birmingham-Hoover, AL"', add
label define metarea_lbl 1010 `"Blacksburg-Christiansburg-Radford, VA"', add
label define metarea_lbl 1020 `"Bloomington, IN"', add
label define metarea_lbl 1040 `"Bloomington-Normal, IL"', add
label define metarea_lbl 1041 `"Bloomington, IL"', add
label define metarea_lbl 1080 `"Boise City, ID"', add
label define metarea_lbl 1081 `"Boise City-Nampa, ID"', add
label define metarea_lbl 1120 `"Boston, MA"', add
label define metarea_lbl 1121 `"Lawrence-Haverhill. MA/NH"', add
label define metarea_lbl 1122 `"Lowell, MA/NH"', add
label define metarea_lbl 1123 `"Salem-Gloucester, MA"', add
label define metarea_lbl 1124 `"Boston-Cambridge-Quincy, MA-NH"', add
label define metarea_lbl 1125 `"Boston-Cambridge-Newton, MA-NH"', add
label define metarea_lbl 1130 `"Bowling Green, KY"', add
label define metarea_lbl 1140 `"Bradenton, FL"', add
label define metarea_lbl 1150 `"Bremerton-Silverdale, WA"', add
label define metarea_lbl 1160 `"Bridgeport, CT"', add
label define metarea_lbl 1161 `"Bridgeport-Stamford-Norwalk, CT"', add
label define metarea_lbl 1200 `"Brockton, MA"', add
label define metarea_lbl 1240 `"Brownsville-Harlingen-San Benito,TX"', add
label define metarea_lbl 1241 `"Brownsville-Harlingen, TX"', add
label define metarea_lbl 1280 `"Buffalo-Niagara Falls, NY"', add
label define metarea_lbl 1281 `"Niagara Falls, NY"', add
label define metarea_lbl 1300 `"Burlington, NC"', add
label define metarea_lbl 1310 `"Burlington, VT"', add
label define metarea_lbl 1311 `"Burlington-South Burlington, VT"', add
label define metarea_lbl 1305 `"California-Lexington Park, MD"', add
label define metarea_lbl 1320 `"Canton, OH"', add
label define metarea_lbl 1321 `"Canton-Massillon, OH"', add
label define metarea_lbl 1340 `"Carbondale-Marion, IL"', add
label define metarea_lbl 1360 `"Cedar Rapids, IA"', add
label define metarea_lbl 1390 `"Chambersburg-Waynesboro, PA"', add
label define metarea_lbl 1400 `"Champaign-Urbana-Rantoul, IL"', add
label define metarea_lbl 1401 `"Champaign-Urbana, IL"', add
label define metarea_lbl 1440 `"Charleston-North Charleston, SC"', add
label define metarea_lbl 1480 `"Charleston, WV"', add
label define metarea_lbl 1520 `"Charlotte-Gastonia-Rock Hill, NC/SC"', add
label define metarea_lbl 1521 `"Charlotte-Gastonia-Concord, NC/SC"', add
label define metarea_lbl 1530 `"Charlottesville, VA"', add
label define metarea_lbl 1560 `"Chattanooga, TN/GA"', add
label define metarea_lbl 1600 `"Chicago-Gary-Lake IL"', add
label define metarea_lbl 1601 `"Aurora-Elgin, IL"', add
label define metarea_lbl 1602 `"Gary-Hamond-East Chicago, IN"', add
label define metarea_lbl 1603 `"Joliet, IL"', add
label define metarea_lbl 1604 `"Lake County, IL"', add
label define metarea_lbl 1605 `"Chicago-Naperville-Joliet, IL-IN-WI"', add
label define metarea_lbl 1620 `"Chico,CA"', add
label define metarea_lbl 1640 `"Cincinnati-Hamilton,OH/KY/IN"', add
label define metarea_lbl 1641 `"Cincinnati-Middleton, OH/KY/IN"', add
label define metarea_lbl 1660 `"Clarksville-Hopkinsville,TN/KY"', add
label define metarea_lbl 1661 `"Clarksville, TN/KY, TN/KY"', add
label define metarea_lbl 1680 `"Cleveland, OH"', add
label define metarea_lbl 1681 `"Cleveland-Lorain-Mentor, OH"', add
label define metarea_lbl 1685 `"Cleveland, TN"', add
label define metarea_lbl 1700 `"Coeur d'Alene, ID"', add
label define metarea_lbl 1710 `"College Station-Bryan, TX"', add
label define metarea_lbl 1720 `"Colorado Springs, CO"', add
label define metarea_lbl 1740 `"Columbia, MO"', add
label define metarea_lbl 1760 `"Columbia, SC"', add
label define metarea_lbl 1800 `"Columbus, GA/AL"', add
label define metarea_lbl 1840 `"Columbus, OH"', add
label define metarea_lbl 1880 `"Corpus Christi, TX"', add
label define metarea_lbl 1920 `"Dallas-Fort Worth, TX"', add
label define metarea_lbl 1921 `"Fort Worth-Arlington, TX"', add
label define metarea_lbl 1922 `"Dallas-Fort Worth-Arlington, TX"', add
label define metarea_lbl 1930 `"Danbury, CT"', add
label define metarea_lbl 1940 `"Daphne-Fairhope-Foley, AL"', add
label define metarea_lbl 1960 `"Davenport-Rock Island-Moline, IA/IL"', add
label define metarea_lbl 2000 `"Dayton-Springfield, OH"', add
label define metarea_lbl 2001 `"Springfield, OH"', add
label define metarea_lbl 2002 `"Dayton, OH"', add
label define metarea_lbl 2020 `"Daytona Beach, FL"', add
label define metarea_lbl 2021 `"Deltona-Daytona Beach-Ormond Beach, FL"', add
label define metarea_lbl 2030 `"Decatur, AL"', add
label define metarea_lbl 2040 `"Decatur, IL"', add
label define metarea_lbl 2080 `"Denver-Boulder-Longmont, CO"', add
label define metarea_lbl 2081 `"Boulder-Longmont, CO"', add
label define metarea_lbl 2082 `"Boulder, CO"', add
label define metarea_lbl 2083 `"Denver-Aurora, CO"', add
label define metarea_lbl 2120 `"Des Moines, IA"', add
label define metarea_lbl 2160 `"Detroit, MI"', add
label define metarea_lbl 2161 `"Detroit-Warren-Livonia, MI"', add
label define metarea_lbl 2190 `"Dover, DE"', add
label define metarea_lbl 2240 `"Duluth-Superior, MN/WI"', add
label define metarea_lbl 2241 `"Duluth, MN/WI"', add
label define metarea_lbl 2281 `"Dutchess County, NY"', add
label define metarea_lbl 2285 `"East Stroudsburg, PA"', add
label define metarea_lbl 2290 `"Eau Claire, WI"', add
label define metarea_lbl 2300 `"El Centro, CA"', add
label define metarea_lbl 2310 `"El Paso, TX"', add
label define metarea_lbl 2330 `"Elkhart-Goshen, IN"', add
label define metarea_lbl 2360 `"Erie, PA"', add
label define metarea_lbl 2400 `"Eugene-Springfield, OR"', add
label define metarea_lbl 2440 `"Evansville, IN/KY"', add
label define metarea_lbl 2520 `"Fargo-Moorhead, ND/MN"', add
label define metarea_lbl 2521 `"Fargo, ND/MN"', add
label define metarea_lbl 2540 `"Farmington, NM"', add
label define metarea_lbl 2560 `"Fayetteville, NC"', add
label define metarea_lbl 2580 `"Fayetteville-Springdale, AR"', add
label define metarea_lbl 2581 `"Fayetteville-Springdale-Rogers, AR-MO"', add
label define metarea_lbl 2600 `"Fitchburg-Leominster, MA"', add
label define metarea_lbl 2601 `"Leominster-Fitchburg-Gardner, MA"', add
label define metarea_lbl 2640 `"Flint, MI"', add
label define metarea_lbl 2650 `"Florence, AL"', add
label define metarea_lbl 2651 `"Florence-Muscle Shoals, AL"', add
label define metarea_lbl 2660 `"Florence, SC"', add
label define metarea_lbl 2670 `"Fort Collins-Loveland, CO"', add
label define metarea_lbl 2680 `"Fort Lauderdale-Hollywood-Pompano Beach, FL"', add
label define metarea_lbl 2700 `"Fort Myers-Cape Coral, FL"', add
label define metarea_lbl 2710 `"Fort Pierce, FL"', add
label define metarea_lbl 2711 `"Port St. Lucie-Fort Pierce, FL"', add
label define metarea_lbl 2720 `"Fort Smith, AR/OK"', add
label define metarea_lbl 2750 `"Fort Walton Beach, FL"', add
label define metarea_lbl 2751 `"Fort Walton Beach-Crestview-Destin, FL"', add
label define metarea_lbl 2760 `"Fort Wayne, IN"', add
label define metarea_lbl 2840 `"Fresno, CA"', add
label define metarea_lbl 2880 `"Gadsden, AL"', add
label define metarea_lbl 2900 `"Gainesville, FL"', add
label define metarea_lbl 2905 `"Gainesville, GA"', add
label define metarea_lbl 2920 `"Galveston-Texas City, TX"', add
label define metarea_lbl 2940 `"Glens Falls, NY"', add
label define metarea_lbl 2980 `"Goldsboro, NC"', add
label define metarea_lbl 3000 `"Grand Rapids, MI"', add
label define metarea_lbl 3001 `"Grand Rapids-Wyoming, MI"', add
label define metarea_lbl 3002 `"Grand Rapids-Muskegon-Holland, MI MSA"', add
label define metarea_lbl 3003 `"Holland-Grand Haven, MI"', add
label define metarea_lbl 3060 `"Greeley, CO"', add
label define metarea_lbl 3080 `"Green Bay, WI"', add
label define metarea_lbl 3120 `"Greensboro-Winston Salem, NC"', add
label define metarea_lbl 3121 `"Winston-Salem, NC"', add
label define metarea_lbl 3122 `"Greensboro-High Point, NC"', add
label define metarea_lbl 3150 `"Greenville, NC"', add
label define metarea_lbl 3160 `"Greenville-Spartanburg-Anderson, SC"', add
label define metarea_lbl 3161 `"Anderson, SC"', add
label define metarea_lbl 3162 `"Greenville, SC"', add
label define metarea_lbl 3163 `"Spartanburg, SC"', add
label define metarea_lbl 3180 `"Hagerstown, MD"', add
label define metarea_lbl 3181 `"Hagerstown-Martinsburg, MD-WV"', add
label define metarea_lbl 3200 `"Hamilton-Middleton, OH"', add
label define metarea_lbl 3220 `"Hanford-Corcoran, CA"', add
label define metarea_lbl 3240 `"Harrisburg-Lebanon-Carlisle, PA"', add
label define metarea_lbl 3241 `"Harrisburg-Carlisle, PA"', add
label define metarea_lbl 3260 `"Harrisonburg, VA"', add
label define metarea_lbl 3280 `"Hartford-Bristol-Middleton- New Britain, CT"', add
label define metarea_lbl 3283 `"New Britain, CT"', add
label define metarea_lbl 3284 `"Hartford-West Hartford-East Hartford, CT"', add
label define metarea_lbl 3285 `"Hartford, CT"', add
label define metarea_lbl 3290 `"Hickory-Morganton, NC"', add
label define metarea_lbl 3291 `"Hickory-Morganton-Lenoir, NC"', add
label define metarea_lbl 3310 `"Hilton Head Island-Bluffton-Beaufort, SC"', add
label define metarea_lbl 3320 `"Honolulu, HI"', add
label define metarea_lbl 3350 `"Houma-Thibodaux, LA"', add
label define metarea_lbl 3351 `"Houma-Bayou Cane-Thibodaux, LA"', add
label define metarea_lbl 3360 `"Houston-Brazoria,TX"', add
label define metarea_lbl 3361 `"Brazoria, TX"', add
label define metarea_lbl 3362 `"Houston-Baytown-Sugar Land, TX"', add
label define metarea_lbl 3400 `"Huntington-Ashland,WV/KY/OH"', add
label define metarea_lbl 3440 `"Huntsville,AL"', add
label define metarea_lbl 3460 `"Idaho Falls, ID"', add
label define metarea_lbl 3480 `"Indianapolis, IN"', add
label define metarea_lbl 3500 `"Iowa City, IA"', add
label define metarea_lbl 3520 `"Jackson, MI"', add
label define metarea_lbl 3560 `"Jackson, MS"', add
label define metarea_lbl 3590 `"Jacksonville,FL"', add
label define metarea_lbl 3600 `"Jacksonville, NC"', add
label define metarea_lbl 3610 `"Jamestown-Dunkirk, NY"', add
label define metarea_lbl 3611 `"Jamestown, NY MSA"', add
label define metarea_lbl 3620 `"Janesville-Beloit, WI"', add
label define metarea_lbl 3621 `"Janvesville, WI"', add
label define metarea_lbl 3660 `"Johnson City-Kingsport-Bristol, TN/VA"', add
label define metarea_lbl 3661 `"Johnson City, TN"', add
label define metarea_lbl 3662 `"Kingsport-Bristol, TN-VA"', add
label define metarea_lbl 3680 `"Johnstown, PA"', add
label define metarea_lbl 3710 `"Joplin, MO"', add
label define metarea_lbl 3715 `"Kahului-Wailuku-Lahaina, HI"', add
label define metarea_lbl 3720 `"Kalamazoo-Portage, MI"', add
label define metarea_lbl 3721 `"Kalamazoo-Battle Creek, MI MSA"', add
label define metarea_lbl 3740 `"Kankakee, IL"', add
label define metarea_lbl 3741 `"Kankakee-Bradley, IL"', add
label define metarea_lbl 3760 `"Kansas City, MO/KS"', add
label define metarea_lbl 3790 `"Kennewick-Richland, WA"', add
label define metarea_lbl 3810 `"Killeen-Temple,TX"', add
label define metarea_lbl 3811 `"Killeen-Temple-Fort Hood, TX"', add
label define metarea_lbl 3830 `"Kingston, NY"', add
label define metarea_lbl 3840 `"Knoxville, TN"', add
label define metarea_lbl 3870 `"LaCrosse, WI"', add
label define metarea_lbl 3880 `"Lafayette, LA"', add
label define metarea_lbl 3890 `"Lafayette-West Lafayette, IN"', add
label define metarea_lbl 3960 `"Lake Charles, LA"', add
label define metarea_lbl 3980 `"Lakeland-Winterhaven, FL"', add
label define metarea_lbl 4000 `"Lancaster, PA"', add
label define metarea_lbl 4040 `"Lansing-East Lansing, MI"', add
label define metarea_lbl 4080 `"Laredo, TX"', add
label define metarea_lbl 4100 `"Las Cruces, NM"', add
label define metarea_lbl 4120 `"Las Vegas, NV"', add
label define metarea_lbl 4130 `"Las Vegas-Paradise, NV"', add
label define metarea_lbl 4150 `"Lawrence, KS"', add
label define metarea_lbl 4200 `"Lawton, OK"', add
label define metarea_lbl 4290 `"Lewiston-Auburn, ME"', add
label define metarea_lbl 4280 `"Lexington-Fayette, KY"', add
label define metarea_lbl 4320 `"Lima, OH"', add
label define metarea_lbl 4360 `"Lincoln, NE"', add
label define metarea_lbl 4400 `"Little Rock-North Little Rock, AR"', add
label define metarea_lbl 4420 `"Longview-Marshall, TX"', add
label define metarea_lbl 4421 `"Longview, TX"', add
label define metarea_lbl 4430 `"Longview, WA"', add
label define metarea_lbl 4440 `"Lorain-Elyria, OH"', add
label define metarea_lbl 4480 `"Los Angeles-Long Beach, CA"', add
label define metarea_lbl 4481 `"Anaheim-Santa Ana- Garden Grove, CA"', add
label define metarea_lbl 4482 `"Orange County, CA"', add
label define metarea_lbl 4483 `"Los Angeles-Long Beach-Santa Ana, CA"', add
label define metarea_lbl 4484 `"Los Angeles-Long Beach-Anaheim, CA"', add
label define metarea_lbl 4520 `"Louisville, KY/IN"', add
label define metarea_lbl 4600 `"Lubbock, TX"', add
label define metarea_lbl 4640 `"Lynchburg, VA"', add
label define metarea_lbl 4680 `"Macon-Warner Robins, GA"', add
label define metarea_lbl 4681 `"Macon, GA"', add
label define metarea_lbl 4682 `"Warner Robins, GA"', add
label define metarea_lbl 4700 `"Madera, CA"', add
label define metarea_lbl 4720 `"Madison, WI"', add
label define metarea_lbl 4760 `"Manchester, NH"', add
label define metarea_lbl 4761 `"Manchester-Nashua, NH"', add
label define metarea_lbl 4770 `"Manhattan, KS"', add
label define metarea_lbl 4800 `"Mansfield, OH"', add
label define metarea_lbl 4880 `"McAllen-Edinburg-Pharr-Mission, TX"', add
label define metarea_lbl 4881 `"McAllen-Edinburg-Pharr, TX"', add
label define metarea_lbl 4890 `"Medford, OR"', add
label define metarea_lbl 4900 `"Melbourne-Titusville-Cocoa-Palm Beach, FL"', add
label define metarea_lbl 4901 `"Palm Bay-Melbourne-Titusville, FL"', add
label define metarea_lbl 4920 `"Memphis, TN/AR/MS"', add
label define metarea_lbl 4940 `"Merced, CA"', add
label define metarea_lbl 5000 `"Miami-Hialeah, FL"', add
label define metarea_lbl 5001 `"Miami-Fort Lauderdale-Miami Beach, FL"', add
label define metarea_lbl 5020 `"Michigan City-La Porte, IN"', add
label define metarea_lbl 5080 `"Milwaukee, WI"', add
label define metarea_lbl 5081 `"Milwaukee-Waukesha-West Allis, WI"', add
label define metarea_lbl 5120 `"Minneapolis-St. Paul, MN"', add
label define metarea_lbl 5121 `"Minneapolis-St. Paul-Bloomington, MN/WI"', add
label define metarea_lbl 5160 `"Mobile, AL"', add
label define metarea_lbl 5170 `"Modesto, CA"', add
label define metarea_lbl 5190 `"Monmouth-Ocean, NJ"', add
label define metarea_lbl 5200 `"Monroe, LA"', add
label define metarea_lbl 5220 `"Monroe, MI"', add
label define metarea_lbl 5240 `"Montgomery, Al"', add
label define metarea_lbl 5260 `"Morgantown, WV"', add
label define metarea_lbl 5270 `"Mount Vernon-Anacortes, WA"', add
label define metarea_lbl 5320 `"Muskegon-Norton Shores-Muskegon Heights, MI"', add
label define metarea_lbl 5321 `"Muskegon-Norton Shores, MI"', add
label define metarea_lbl 5330 `"Myrtle Beach, SC"', add
label define metarea_lbl 5331 `"Myrtle Beach-Conway-North Myrtle Beach, SC"', add
label define metarea_lbl 5340 `"Naples, FL"', add
label define metarea_lbl 5341 `"Naples-Marco Island, FL"', add
label define metarea_lbl 5350 `"Nashua, NH"', add
label define metarea_lbl 5360 `"Nashville, TN"', add
label define metarea_lbl 5361 `"Nashville-Davidson-Murfreesboro, TN"', add
label define metarea_lbl 5400 `"New Bedford, MA"', add
label define metarea_lbl 5480 `"New Haven-Meriden, CT"', add
label define metarea_lbl 5481 `"New Haven, CT"', add
label define metarea_lbl 5482 `"New Haven-Milford, CT"', add
label define metarea_lbl 5520 `"New London-Norwich, CT/RI"', add
label define metarea_lbl 5560 `"New Orleans, LA"', add
label define metarea_lbl 5561 `"New Orleans-Metairie-Kenner, LA"', add
label define metarea_lbl 5600 `"New York-Northeastern NJ"', add
label define metarea_lbl 5601 `"Nassau-Suffolk, NY"', add
label define metarea_lbl 5602 `"Bergen-Passaic, NJ"', add
label define metarea_lbl 5603 `"Jersey City, NJ"', add
label define metarea_lbl 5604 `"Middlesex-Somerset-Hunterdon, NJ"', add
label define metarea_lbl 5605 `"Newark, NJ"', add
label define metarea_lbl 5606 `"New York-Northern New Jersey-Long Island, NY-NJ-PA"', add
label define metarea_lbl 5607 `"New York, NY"', add
label define metarea_lbl 5640 `"Newark, OH"', add
label define metarea_lbl 5660 `"Newburgh-Middletown, NY"', add
label define metarea_lbl 5720 `"Norfolk-Virginia Beach-Newport News, VA"', add
label define metarea_lbl 5721 `"Virginia Beach-Norfolk-Newport News, VA/NC"', add
label define metarea_lbl 5740 `"North Port-Sarasota-Bradenton, FL"', add
label define metarea_lbl 5760 `"Norwalk, CT"', add
label define metarea_lbl 5770 `"Norwich-New London, CT"', add
label define metarea_lbl 5790 `"Ocala, FL"', add
label define metarea_lbl 5800 `"Odessa, TX"', add
label define metarea_lbl 5801 `"Midland, TX"', add
label define metarea_lbl 5840 `"Ocean City, NJ"', add
label define metarea_lbl 5880 `"Oklahoma City, OK"', add
label define metarea_lbl 5910 `"Olympia, WA"', add
label define metarea_lbl 5920 `"Omaha, NE/IA"', add
label define metarea_lbl 5921 `"Omaha-Council Bluffs, NE/IA"', add
label define metarea_lbl 5950 `"Orange, NY"', add
label define metarea_lbl 5960 `"Orlando, FL"', add
label define metarea_lbl 6010 `"Panama City, FL"', add
label define metarea_lbl 6011 `"Panama City-Lynn Haven, FL"', add
label define metarea_lbl 6080 `"Pensacola, FL"', add
label define metarea_lbl 6081 `"Pensacola-Ferry Pass-Brent, FL"', add
label define metarea_lbl 6120 `"Peoria, IL"', add
label define metarea_lbl 6160 `"Philadelphia, PA/NJ"', add
label define metarea_lbl 6161 `"Philadelphia-Camden-Wilmington, PA/NJ/DE"', add
label define metarea_lbl 6200 `"Phoenix, AZ"', add
label define metarea_lbl 6201 `"Phoenix-Mesa-Scottsdale, AZ"', add
label define metarea_lbl 6250 `"Pine Bluff, AR"', add
label define metarea_lbl 6280 `"Pittsburg, PA"', add
label define metarea_lbl 6281 `"Beaver County"', add
label define metarea_lbl 6400 `"Portland, ME"', add
label define metarea_lbl 6401 `"Portland-South Portland, ME"', add
label define metarea_lbl 6440 `"Portland-Vancouver, OR/WA"', add
label define metarea_lbl 6441 `"Vancouver, WA"', add
label define metarea_lbl 6442 `"Portland-Vancouver-Beaverton, OR/WA"', add
label define metarea_lbl 6450 `"Portsmouth-Dover-Rochester, NH/ME"', add
label define metarea_lbl 6451 `"Portsmouth-Rochester, NH/ME MSA"', add
label define metarea_lbl 6452 `"Rochester-Dover, NH/ME"', add
label define metarea_lbl 6460 `"Poughkeepsie, NY"', add
label define metarea_lbl 6461 `"Poughkeepsie-Newburgh-Middletown, NY"', add
label define metarea_lbl 6470 `"Prescott, AZ"', add
label define metarea_lbl 6480 `"Providence-Fall River-Pawtucket, MA/RI"', add
label define metarea_lbl 6482 `"Pawtuckett-Woonsocket-Attleboro, RI/MA"', add
label define metarea_lbl 6483 `"Providence-Fall River-Warwick, MA-RI"', add
label define metarea_lbl 6484 `"Providence-Warwick, RI-MA"', add
label define metarea_lbl 6520 `"Provo-Orem, UT"', add
label define metarea_lbl 6560 `"Pueblo, CO"', add
label define metarea_lbl 6580 `"Punta Gorda, FL"', add
label define metarea_lbl 6600 `"Racine, WI"', add
label define metarea_lbl 6640 `"Raleigh-Durham, NC"', add
label define metarea_lbl 6641 `"Durham, NC"', add
label define metarea_lbl 6642 `"Raleigh-Carey, NC"', add
label define metarea_lbl 6680 `"Reading, PA"', add
label define metarea_lbl 6690 `"Redding, CA"', add
label define metarea_lbl 6720 `"Reno, NV"', add
label define metarea_lbl 6721 `"Reno-Sparks, NV"', add
label define metarea_lbl 6760 `"Richmond-Petersburg, VA"', add
label define metarea_lbl 6761 `"Richmond, VA"', add
label define metarea_lbl 6780 `"Riverside-San Bernadino, CA"', add
label define metarea_lbl 6800 `"Roanoke, VA"', add
label define metarea_lbl 6840 `"Rochester, NY"', add
label define metarea_lbl 6880 `"Rockford, IL"', add
label define metarea_lbl 6920 `"Sacramento, CA"', add
label define metarea_lbl 6921 `"Sacramento-Arden Arcade-Roseville, CA"', add
label define metarea_lbl 6960 `"Saginaw-Bay City-Midland, MI"', add
label define metarea_lbl 6961 `"Saginaw-Saginaw Township North, MI"', add
label define metarea_lbl 6980 `"St. Cloud, MN"', add
label define metarea_lbl 7000 `"St. George, UT"', add
label define metarea_lbl 7040 `"St. Louis, MO/IL"', add
label define metarea_lbl 7080 `"Salem, OR"', add
label define metarea_lbl 7120 `"Salinas-Sea Side-Monterey, CA"', add
label define metarea_lbl 7121 `"Salinas, CA"', add
label define metarea_lbl 7130 `"Salisbury, MD"', add
label define metarea_lbl 7160 `"Salt Lake City-Ogden, UT"', add
label define metarea_lbl 7161 `"Salt Lake City, UT"', add
label define metarea_lbl 7162 `"Ogden-Clearfield, UT"', add
label define metarea_lbl 7240 `"San Antonio, TX"', add
label define metarea_lbl 7320 `"San Diego, CA"', add
label define metarea_lbl 7321 `"San Diego-Carlsbad-San Marcos, CA"', add
label define metarea_lbl 7360 `"San Francisco-Oaklan-Vallejo, CA"', add
label define metarea_lbl 7361 `"Oakland, CA"', add
label define metarea_lbl 7362 `"Vallejo-Fairfield-Napa, CA"', add
label define metarea_lbl 7363 `"Vallejo-Fairfield, CA"', add
label define metarea_lbl 7364 `"Napa, CA"', add
label define metarea_lbl 7365 `"San Francisco-Oakland-Fremont, CA"', add
label define metarea_lbl 7400 `"San Jose, CA"', add
label define metarea_lbl 7401 `"San Jose-Sunnyvale-Santa Clara, CA"', add
label define metarea_lbl 7460 `"San Luis Obispo-Atascadero-Paso Robles, CA"', add
label define metarea_lbl 7461 `"San Luis Obispo-Paso Robles, CA"', add
label define metarea_lbl 7470 `"Santa Barbara-Santa Maria-Lompoc, CA"', add
label define metarea_lbl 7471 `"Santa Barbara-Santa Maria-Goleta, CA"', add
label define metarea_lbl 7472 `"Santa Barbara-Santa Maria, CA"', add
label define metarea_lbl 7480 `"Santa Cruz, CA"', add
label define metarea_lbl 7481 `"Santa Cruz-Watsonville, CA"', add
label define metarea_lbl 7490 `"Santa Fe, NM"', add
label define metarea_lbl 7500 `"Santa Rosa-Petaluma, CA"', add
label define metarea_lbl 7510 `"Sarasota, FL"', add
label define metarea_lbl 7511 `"Sarasota-Bradenton-Venice, FL"', add
label define metarea_lbl 7520 `"Savannah, GA"', add
label define metarea_lbl 7560 `"Scranton-Wilkes-Barre, PA"', add
label define metarea_lbl 7600 `"Seattle-Everett, WA"', add
label define metarea_lbl 7601 `"Seattle-Tacoma-Bellevue, WA"', add
label define metarea_lbl 7610 `"Sharon, PA"', add
label define metarea_lbl 7640 `"Sherman-Denison, TX"', add
label define metarea_lbl 7680 `"Shreveport, LA"', add
label define metarea_lbl 7681 `"Shreveport-Bossier City, LA"', add
label define metarea_lbl 7720 `"Sioux City, IA-NE"', add
label define metarea_lbl 7760 `"Sioux Falls, SD"', add
label define metarea_lbl 7800 `"South Bend-Mishawaka, IN"', add
label define metarea_lbl 7840 `"Spokane, WA"', add
label define metarea_lbl 7880 `"Springfield, IL"', add
label define metarea_lbl 7920 `"Springfield, MO"', add
label define metarea_lbl 8000 `"Springfield-Holyoke-Chicopee, MA"', add
label define metarea_lbl 8001 `"Springfield, MA/CT"', add
label define metarea_lbl 8040 `"Stamford, CT"', add
label define metarea_lbl 8120 `"Stockton, CA"', add
label define metarea_lbl 8160 `"Syracuse, NY"', add
label define metarea_lbl 8200 `"Tacoma, WA"', add
label define metarea_lbl 8240 `"Tallahassee, FL"', add
label define metarea_lbl 8280 `"Tampa-St. Petersburg-Clearwater, FL"', add
label define metarea_lbl 8320 `"Terre Haute, IN"', add
label define metarea_lbl 8400 `"Toledo, OH/MI"', add
label define metarea_lbl 8440 `"Topeka, KS"', add
label define metarea_lbl 8480 `"Trenton, NJ"', add
label define metarea_lbl 8481 `"Trenton-Ewing, NJ"', add
label define metarea_lbl 8520 `"Tucson, AZ"', add
label define metarea_lbl 8560 `"Tulsa, OK"', add
label define metarea_lbl 8600 `"Tuscaloosa, AL"', add
label define metarea_lbl 8620 `"Tyler, TX"', add
label define metarea_lbl 8640 `"Urban Honolulu, HI"', add
label define metarea_lbl 8680 `"Utica-Rome, NY"', add
label define metarea_lbl 8700 `"Valdosta, GA"', add
label define metarea_lbl 8730 `"Ventura-Oxnard-Simi Valley, CA"', add
label define metarea_lbl 8731 `"Oxnard-Thousand Oaks-Ventura, CA"', add
label define metarea_lbl 8740 `"Vero Beach, FL"', add
label define metarea_lbl 8750 `"Victoria, TX"', add
label define metarea_lbl 8760 `"Vineland-Milville-Bridgetown, NJ"', add
label define metarea_lbl 8780 `"Visalia-Tulare-Porterville, CA"', add
label define metarea_lbl 8781 `"Visalia-Porterville, CA"', add
label define metarea_lbl 8800 `"Waco, TX"', add
label define metarea_lbl 8840 `"Washington, DC/MD/VA"', add
label define metarea_lbl 8880 `"Waterbury, CT"', add
label define metarea_lbl 8920 `"Waterloo-Cedar Falls, IA"', add
label define metarea_lbl 8930 `"Watertown-Fort Drum, NY"', add
label define metarea_lbl 8940 `"Wausau, WI"', add
label define metarea_lbl 8960 `"West Palm Beach-Boca Raton-Delray Beach, FL"', add
label define metarea_lbl 9000 `"Wheeling, WV/OH"', add
label define metarea_lbl 9040 `"Wichita, KS"', add
label define metarea_lbl 9050 `"Wichita Falls, TX"', add
label define metarea_lbl 9140 `"Williamsport, PA"', add
label define metarea_lbl 9160 `"Wilmington, DE/NJ/MD"', add
label define metarea_lbl 9200 `"Wilmington, NC"', add
label define metarea_lbl 9220 `"Winchester, VA-WV"', add
label define metarea_lbl 9240 `"Worcester, MA"', add
label define metarea_lbl 9260 `"Yakima, WA"', add
label define metarea_lbl 9270 `"Yolo, CA"', add
label define metarea_lbl 9280 `"York, PA"', add
label define metarea_lbl 9281 `"York-Hanover, PA"', add
label define metarea_lbl 9320 `"Youngstown-Warren, OH/PA"', add
label define metarea_lbl 9321 `"Youngstown-Warren-Boardman, OH"', add
label define metarea_lbl 9340 `"Yuba City, CA"', add
label define metarea_lbl 9360 `"Yuma, AZ"', add
label define metarea_lbl 9997 `"Other metropolitan areas, unidentified"', add
label define metarea_lbl 9998 `"NIU, household not in a metropolitan area"', add
label define metarea_lbl 9999 `"Missing data"', add
label values metarea metarea_lbl

label define statecensus_lbl 00 `"Unknown"'
label define statecensus_lbl 11 `"Maine"', add
label define statecensus_lbl 12 `"New Hampshire"', add
label define statecensus_lbl 13 `"Vermont"', add
label define statecensus_lbl 14 `"Massachusetts"', add
label define statecensus_lbl 15 `"Rhode Island"', add
label define statecensus_lbl 16 `"Connecticut"', add
label define statecensus_lbl 19 `"Maine, New Hampshire, Vermont, Rhode Island"', add
label define statecensus_lbl 21 `"New York"', add
label define statecensus_lbl 22 `"New Jersey"', add
label define statecensus_lbl 23 `"Pennsylvania"', add
label define statecensus_lbl 31 `"Ohio"', add
label define statecensus_lbl 32 `"Indiana"', add
label define statecensus_lbl 33 `"Illinois"', add
label define statecensus_lbl 34 `"Michigan"', add
label define statecensus_lbl 35 `"Wisconsin"', add
label define statecensus_lbl 39 `"Michigan, Wisconsin"', add
label define statecensus_lbl 41 `"Minnesota"', add
label define statecensus_lbl 42 `"Iowa"', add
label define statecensus_lbl 43 `"Missouri"', add
label define statecensus_lbl 44 `"North Dakota"', add
label define statecensus_lbl 45 `"South Dakota"', add
label define statecensus_lbl 46 `"Nebraska"', add
label define statecensus_lbl 47 `"Kansas"', add
label define statecensus_lbl 49 `"Minnesota, Iowa, Missouri, North Dakota, South Dakota, Nebraska, Kansas"', add
label define statecensus_lbl 50 `"Delaware, Maryland, Virginia, West Virginia"', add
label define statecensus_lbl 51 `"Delaware"', add
label define statecensus_lbl 52 `"Maryland"', add
label define statecensus_lbl 53 `"District of Columbia"', add
label define statecensus_lbl 54 `"Virginia"', add
label define statecensus_lbl 55 `"West Virginia"', add
label define statecensus_lbl 56 `"North Carolina"', add
label define statecensus_lbl 57 `"South Carolina"', add
label define statecensus_lbl 58 `"Georgia"', add
label define statecensus_lbl 59 `"Florida"', add
label define statecensus_lbl 60 `"South Carolina, Georgia"', add
label define statecensus_lbl 61 `"Kentucky"', add
label define statecensus_lbl 62 `"Tennessee"', add
label define statecensus_lbl 63 `"Alabama"', add
label define statecensus_lbl 64 `"Mississippi"', add
label define statecensus_lbl 67 `"Kentucky, Tennessee"', add
label define statecensus_lbl 69 `"Alabama, Mississippi"', add
label define statecensus_lbl 71 `"Arkansas"', add
label define statecensus_lbl 72 `"Louisiana"', add
label define statecensus_lbl 73 `"Oklahoma"', add
label define statecensus_lbl 74 `"Texas"', add
label define statecensus_lbl 79 `"Arkansas, Louisiana, Oklahoma"', add
label define statecensus_lbl 81 `"Montana"', add
label define statecensus_lbl 82 `"Idaho"', add
label define statecensus_lbl 83 `"Wyoming"', add
label define statecensus_lbl 84 `"Colorado"', add
label define statecensus_lbl 85 `"New Mexico"', add
label define statecensus_lbl 86 `"Arizona"', add
label define statecensus_lbl 87 `"Utah"', add
label define statecensus_lbl 88 `"Nevada"', add
label define statecensus_lbl 89 `"Montana, Idaho, Wyoming, Colorado, New Mexico, Arizona, Utah, Nevada"', add
label define statecensus_lbl 91 `"Washington"', add
label define statecensus_lbl 92 `"Oregon"', add
label define statecensus_lbl 93 `"California"', add
label define statecensus_lbl 94 `"Alaska"', add
label define statecensus_lbl 95 `"Hawaii"', add
label define statecensus_lbl 99 `"Washington, Oregon, Alaska, Hawaii"', add
label values statecensus statecensus_lbl

label define pubhous_lbl 0 `"NIU"'
label define pubhous_lbl 1 `"No"', add
label define pubhous_lbl 2 `"Yes"', add
label values pubhous pubhous_lbl

label define rentsub_lbl 0 `"NIU"'
label define rentsub_lbl 1 `"No"', add
label define rentsub_lbl 2 `"Yes"', add
label values rentsub rentsub_lbl

label define heatsub_lbl 0 `"NIU"'
label define heatsub_lbl 1 `"No"', add
label define heatsub_lbl 2 `"Yes"', add
label values heatsub heatsub_lbl

label define foodstmp_lbl 0 `"NIU"'
label define foodstmp_lbl 1 `"No"', add
label define foodstmp_lbl 2 `"Yes"', add
label values foodstmp foodstmp_lbl

label define stampmo_lbl 00 `"NIU"'
label define stampmo_lbl 01 `"One"', add
label define stampmo_lbl 02 `"Two"', add
label define stampmo_lbl 03 `"Three"', add
label define stampmo_lbl 04 `"Four"', add
label define stampmo_lbl 05 `"Five"', add
label define stampmo_lbl 06 `"Six"', add
label define stampmo_lbl 07 `"Seven"', add
label define stampmo_lbl 08 `"Eight"', add
label define stampmo_lbl 09 `"Nine"', add
label define stampmo_lbl 10 `"Ten"', add
label define stampmo_lbl 11 `"Eleven"', add
label define stampmo_lbl 12 `"Twelve"', add
label values stampmo stampmo_lbl

label define atelunch_lbl 00 `"Zero"'
label define atelunch_lbl 01 `"One"', add
label define atelunch_lbl 02 `"Two"', add
label define atelunch_lbl 03 `"Three"', add
label define atelunch_lbl 04 `"Four"', add
label define atelunch_lbl 05 `"Five"', add
label define atelunch_lbl 06 `"Six"', add
label define atelunch_lbl 07 `"Seven"', add
label define atelunch_lbl 08 `"Eight"', add
label define atelunch_lbl 09 `"Nine or more"', add
label define atelunch_lbl 99 `"NIU"', add
label values atelunch atelunch_lbl

label define lunchsub_lbl 0 `"NIU"'
label define lunchsub_lbl 1 `"Yes, children receive free or reduced price lunch"', add
label define lunchsub_lbl 2 `"No, children did not receive free or reduced price lunch"', add
label values lunchsub lunchsub_lbl

label define frelunch_lbl 00 `"Zero"'
label define frelunch_lbl 01 `"One"', add
label define frelunch_lbl 02 `"Two"', add
label define frelunch_lbl 03 `"Three"', add
label define frelunch_lbl 04 `"Four"', add
label define frelunch_lbl 05 `"Five"', add
label define frelunch_lbl 06 `"Six"', add
label define frelunch_lbl 07 `"Seven"', add
label define frelunch_lbl 08 `"Eight"', add
label define frelunch_lbl 09 `"Nine or more"', add
label define frelunch_lbl 98 `"NIU -- Children didn't eat hot lunch"', add
label define frelunch_lbl 99 `"NIU -- No children in hh"', add
label values frelunch frelunch_lbl

label define faminc_lbl 100 `"Under $5,000"'
label define faminc_lbl 110 `"Under $1,000"', add
label define faminc_lbl 111 `"Under $500"', add
label define faminc_lbl 112 `"$500 - 999"', add
label define faminc_lbl 120 `"$1,000 - 1,999"', add
label define faminc_lbl 121 `"$1,000 - 1,499"', add
label define faminc_lbl 122 `"$1,500-1,999"', add
label define faminc_lbl 130 `"$2,000 - 2,999"', add
label define faminc_lbl 131 `"$2,000 - 2,499"', add
label define faminc_lbl 132 `"$2,500 - 2,999"', add
label define faminc_lbl 140 `"$3,000 - 3,999"', add
label define faminc_lbl 141 `"$3,000 - 3,499"', add
label define faminc_lbl 142 `"$3,500 - 3,999"', add
label define faminc_lbl 150 `"$4,000 - 4,999"', add
label define faminc_lbl 200 `"$5,000 - 7,999"', add
label define faminc_lbl 210 `"$5,000 - 7,499"', add
label define faminc_lbl 220 `"$5,000 - 5,999"', add
label define faminc_lbl 230 `"$6,000 - 7,999"', add
label define faminc_lbl 231 `"$6,000 - 7,499"', add
label define faminc_lbl 232 `"$6,000 - 6,999"', add
label define faminc_lbl 233 `"$7,000 - 7,499"', add
label define faminc_lbl 234 `"$7,000 - 7,999"', add
label define faminc_lbl 300 `"$7,500 - 9,999"', add
label define faminc_lbl 310 `"$7,500 - 7,999"', add
label define faminc_lbl 320 `"$8,000 - 8,499"', add
label define faminc_lbl 330 `"$8,500 - 8,999"', add
label define faminc_lbl 340 `"$8,000 - 8,999"', add
label define faminc_lbl 350 `"$9,000 - 9,999"', add
label define faminc_lbl 400 `"$10,000 - 14,999"', add
label define faminc_lbl 410 `"$10,000 - 10,999"', add
label define faminc_lbl 420 `"$11,000 - 11,999"', add
label define faminc_lbl 430 `"$10,000 - 12,499"', add
label define faminc_lbl 440 `"$10,000 - 11,999"', add
label define faminc_lbl 450 `"$12,000 - 12,999"', add
label define faminc_lbl 460 `"$12,000 - 14,999"', add
label define faminc_lbl 470 `"$12,500 - 14,999"', add
label define faminc_lbl 480 `"$13,000 - 13,999"', add
label define faminc_lbl 490 `"$14,000 - 14,999"', add
label define faminc_lbl 500 `"$15,000 - 19,999"', add
label define faminc_lbl 510 `"$15,000 - 15,999"', add
label define faminc_lbl 520 `"$16,000 - 16,999"', add
label define faminc_lbl 530 `"$17,000 - 17,999"', add
label define faminc_lbl 540 `"$15,000 - 17,499"', add
label define faminc_lbl 550 `"$17,500 - 19,999"', add
label define faminc_lbl 560 `"$18,000 - 19,999"', add
label define faminc_lbl 600 `"$20,000 - 24,999"', add
label define faminc_lbl 700 `"$25,000 - 49,999"', add
label define faminc_lbl 710 `"$25,000 - 29,999"', add
label define faminc_lbl 720 `"$30,000 - 34,999"', add
label define faminc_lbl 730 `"$35,000 - 39,999"', add
label define faminc_lbl 740 `"$40,000 - 49,999"', add
label define faminc_lbl 800 `"$50,000 and over"', add
label define faminc_lbl 810 `"$50,000 - 74,999"', add
label define faminc_lbl 820 `"$50,000 - 59,999"', add
label define faminc_lbl 830 `"$60,000 - 74,999"', add
label define faminc_lbl 840 `"$75,000 and over"', add
label define faminc_lbl 841 `"$75,000 - 99,999"', add
label define faminc_lbl 842 `"$100,000 - 149,999"', add
label define faminc_lbl 843 `"$150,000 and over"', add
label define faminc_lbl 995 `"Missing"', add
label define faminc_lbl 996 `"Refused"', add
label define faminc_lbl 997 `"Don't know"', add
label define faminc_lbl 999 `"Blank"', add
label values faminc faminc_lbl

label define nfams_lbl 00 `"0 families (vacant unit)"'
label define nfams_lbl 01 `"1 family or N/A"', add
label define nfams_lbl 02 `"2 families"', add
label define nfams_lbl 03 `"3"', add
label define nfams_lbl 04 `"4"', add
label define nfams_lbl 05 `"5"', add
label define nfams_lbl 06 `"6"', add
label define nfams_lbl 07 `"7"', add
label define nfams_lbl 08 `"8"', add
label define nfams_lbl 09 `"9"', add
label define nfams_lbl 10 `"10"', add
label define nfams_lbl 11 `"11"', add
label define nfams_lbl 12 `"12"', add
label define nfams_lbl 13 `"13"', add
label define nfams_lbl 14 `"14"', add
label define nfams_lbl 15 `"15"', add
label define nfams_lbl 16 `"16"', add
label define nfams_lbl 17 `"17"', add
label define nfams_lbl 18 `"18"', add
label define nfams_lbl 19 `"19"', add
label define nfams_lbl 20 `"20"', add
label define nfams_lbl 21 `"21"', add
label define nfams_lbl 22 `"22"', add
label define nfams_lbl 23 `"23"', add
label define nfams_lbl 24 `"24"', add
label define nfams_lbl 25 `"25"', add
label define nfams_lbl 26 `"26"', add
label define nfams_lbl 27 `"27"', add
label define nfams_lbl 28 `"28"', add
label define nfams_lbl 29 `"29"', add
label define nfams_lbl 30 `"30"', add
label values nfams nfams_lbl

label define ncouples_lbl 0 `"0 couples or NIU"'
label define ncouples_lbl 1 `"1"', add
label define ncouples_lbl 2 `"2"', add
label define ncouples_lbl 3 `"3"', add
label define ncouples_lbl 4 `"4"', add
label define ncouples_lbl 5 `"5"', add
label define ncouples_lbl 6 `"6"', add
label define ncouples_lbl 7 `"7"', add
label define ncouples_lbl 9 `"9"', add
label values ncouples ncouples_lbl

label define nmothers_lbl 0 `"0 mothers or NIU"'
label define nmothers_lbl 1 `"1"', add
label define nmothers_lbl 2 `"2"', add
label define nmothers_lbl 3 `"3"', add
label define nmothers_lbl 4 `"4"', add
label define nmothers_lbl 5 `"5"', add
label define nmothers_lbl 6 `"6"', add
label values nmothers nmothers_lbl

label define nfathers_lbl 0 `"0 fathers or NIU"'
label define nfathers_lbl 1 `"1"', add
label define nfathers_lbl 2 `"2"', add
label define nfathers_lbl 3 `"3"', add
label define nfathers_lbl 4 `"4"', add
label define nfathers_lbl 5 `"5"', add
label define nfathers_lbl 6 `"6"', add
label values nfathers nfathers_lbl

label define age_lbl 00 `"Under 1 year"'
label define age_lbl 01 `"1"', add
label define age_lbl 02 `"2"', add
label define age_lbl 03 `"3"', add
label define age_lbl 04 `"4"', add
label define age_lbl 05 `"5"', add
label define age_lbl 06 `"6"', add
label define age_lbl 07 `"7"', add
label define age_lbl 08 `"8"', add
label define age_lbl 09 `"9"', add
label define age_lbl 10 `"10"', add
label define age_lbl 11 `"11"', add
label define age_lbl 12 `"12"', add
label define age_lbl 13 `"13"', add
label define age_lbl 14 `"14"', add
label define age_lbl 15 `"15"', add
label define age_lbl 16 `"16"', add
label define age_lbl 17 `"17"', add
label define age_lbl 18 `"18"', add
label define age_lbl 19 `"19"', add
label define age_lbl 20 `"20"', add
label define age_lbl 21 `"21"', add
label define age_lbl 22 `"22"', add
label define age_lbl 23 `"23"', add
label define age_lbl 24 `"24"', add
label define age_lbl 25 `"25"', add
label define age_lbl 26 `"26"', add
label define age_lbl 27 `"27"', add
label define age_lbl 28 `"28"', add
label define age_lbl 29 `"29"', add
label define age_lbl 30 `"30"', add
label define age_lbl 31 `"31"', add
label define age_lbl 32 `"32"', add
label define age_lbl 33 `"33"', add
label define age_lbl 34 `"34"', add
label define age_lbl 35 `"35"', add
label define age_lbl 36 `"36"', add
label define age_lbl 37 `"37"', add
label define age_lbl 38 `"38"', add
label define age_lbl 39 `"39"', add
label define age_lbl 40 `"40"', add
label define age_lbl 41 `"41"', add
label define age_lbl 42 `"42"', add
label define age_lbl 43 `"43"', add
label define age_lbl 44 `"44"', add
label define age_lbl 45 `"45"', add
label define age_lbl 46 `"46"', add
label define age_lbl 47 `"47"', add
label define age_lbl 48 `"48"', add
label define age_lbl 49 `"49"', add
label define age_lbl 50 `"50"', add
label define age_lbl 51 `"51"', add
label define age_lbl 52 `"52"', add
label define age_lbl 53 `"53"', add
label define age_lbl 54 `"54"', add
label define age_lbl 55 `"55"', add
label define age_lbl 56 `"56"', add
label define age_lbl 57 `"57"', add
label define age_lbl 58 `"58"', add
label define age_lbl 59 `"59"', add
label define age_lbl 60 `"60"', add
label define age_lbl 61 `"61"', add
label define age_lbl 62 `"62"', add
label define age_lbl 63 `"63"', add
label define age_lbl 64 `"64"', add
label define age_lbl 65 `"65"', add
label define age_lbl 66 `"66"', add
label define age_lbl 67 `"67"', add
label define age_lbl 68 `"68"', add
label define age_lbl 69 `"69"', add
label define age_lbl 70 `"70"', add
label define age_lbl 71 `"71"', add
label define age_lbl 72 `"72"', add
label define age_lbl 73 `"73"', add
label define age_lbl 74 `"74"', add
label define age_lbl 75 `"75"', add
label define age_lbl 76 `"76"', add
label define age_lbl 77 `"77"', add
label define age_lbl 78 `"78"', add
label define age_lbl 79 `"79"', add
label define age_lbl 80 `"80"', add
label define age_lbl 81 `"81"', add
label define age_lbl 82 `"82"', add
label define age_lbl 83 `"83"', add
label define age_lbl 84 `"84"', add
label define age_lbl 85 `"85"', add
label define age_lbl 86 `"86"', add
label define age_lbl 87 `"87"', add
label define age_lbl 88 `"88"', add
label define age_lbl 89 `"89"', add
label define age_lbl 90 `"90 (90+, 1988-2002)"', add
label define age_lbl 91 `"91"', add
label define age_lbl 92 `"92"', add
label define age_lbl 93 `"93"', add
label define age_lbl 94 `"94"', add
label define age_lbl 95 `"95"', add
label define age_lbl 96 `"96"', add
label define age_lbl 97 `"97"', add
label define age_lbl 98 `"98"', add
label define age_lbl 99 `"99+"', add
label values age age_lbl

label define sex_lbl 1 `"Male"'
label define sex_lbl 2 `"Female"', add
label define sex_lbl 9 `"NIU"', add
label values sex sex_lbl

label define race_lbl 100 `"White"'
label define race_lbl 200 `"Black/Negro"', add
label define race_lbl 300 `"American Indian/Aleut/Eskimo"', add
label define race_lbl 650 `"Asian or Pacific Islander"', add
label define race_lbl 651 `"Asian only"', add
label define race_lbl 652 `"Hawaiian/Pacific Islander only"', add
label define race_lbl 700 `"Other (single) race, n.e.c."', add
label define race_lbl 801 `"White-Black"', add
label define race_lbl 802 `"White-American Indian"', add
label define race_lbl 803 `"White-Asian"', add
label define race_lbl 804 `"White-Hawaiian/Pacific Islander"', add
label define race_lbl 805 `"Black-American Indian"', add
label define race_lbl 806 `"Black-Asian"', add
label define race_lbl 807 `"Black-Hawaiian/Pacific Islander"', add
label define race_lbl 808 `"American Indian-Asian"', add
label define race_lbl 809 `"Asian-Hawaiian/Pacific Islander"', add
label define race_lbl 810 `"White-Black-American Indian"', add
label define race_lbl 811 `"White-Black-Asian"', add
label define race_lbl 812 `"White-American Indian-Asian"', add
label define race_lbl 813 `"White-Asian-Hawaiian/Pacific Islander"', add
label define race_lbl 814 `"White-Black-American Indian-Asian"', add
label define race_lbl 815 `"American Indian-Hawaiian/Pacific Islander"', add
label define race_lbl 816 `"White-Black--Hawaiian/Pacific Islander"', add
label define race_lbl 817 `"White-American Indian-Hawaiian/Pacific Islander"', add
label define race_lbl 818 `"Black-American Indian-Asian"', add
label define race_lbl 819 `"White-American Indian-Asian-Hawaiian/Pacific Islander"', add
label define race_lbl 820 `"Two or three races, unspecified"', add
label define race_lbl 830 `"Four or five races, unspecified"', add
label define race_lbl 999 `"Blank"', add
label values race race_lbl

label define marst_lbl 1 `"Married, spouse present"'
label define marst_lbl 2 `"Married, spouse absent"', add
label define marst_lbl 3 `"Separated"', add
label define marst_lbl 4 `"Divorced"', add
label define marst_lbl 5 `"Widowed"', add
label define marst_lbl 6 `"Never married/single"', add
label define marst_lbl 7 `"Widowed or Divorced"', add
label define marst_lbl 9 `"NIU"', add
label values marst marst_lbl

label define famsize_lbl 00 `"Missing"'
label define famsize_lbl 01 `"1 family member present"', add
label define famsize_lbl 02 `"2 family members present"', add
label define famsize_lbl 03 `"3 family members present"', add
label define famsize_lbl 04 `"4 family members present"', add
label define famsize_lbl 05 `"5 family members present"', add
label define famsize_lbl 06 `"6 family members present"', add
label define famsize_lbl 07 `"7 family members present"', add
label define famsize_lbl 08 `"8 family members present"', add
label define famsize_lbl 09 `"9 family members present"', add
label define famsize_lbl 10 `"10 family members present"', add
label define famsize_lbl 11 `"11 family members present"', add
label define famsize_lbl 12 `"12 family members present"', add
label define famsize_lbl 13 `"13 family members present"', add
label define famsize_lbl 14 `"14 family members present"', add
label define famsize_lbl 15 `"15 family members present"', add
label define famsize_lbl 16 `"16 family members present"', add
label define famsize_lbl 17 `"17 family members present"', add
label define famsize_lbl 18 `"18 family members present"', add
label define famsize_lbl 19 `"19 family members present"', add
label define famsize_lbl 20 `"20 family members present"', add
label define famsize_lbl 21 `"21 family members present"', add
label define famsize_lbl 22 `"22 family members present"', add
label define famsize_lbl 23 `"23 family members present"', add
label define famsize_lbl 24 `"24 family members present"', add
label define famsize_lbl 25 `"25 family members present"', add
label define famsize_lbl 26 `"26 family members present"', add
label define famsize_lbl 27 `"27 family members present"', add
label define famsize_lbl 28 `"28 family members present"', add
label define famsize_lbl 29 `"29 family members present"', add
label values famsize famsize_lbl

label define nchild_lbl 0 `"0 children present"'
label define nchild_lbl 1 `"1 child present"', add
label define nchild_lbl 2 `"2"', add
label define nchild_lbl 3 `"3"', add
label define nchild_lbl 4 `"4"', add
label define nchild_lbl 5 `"5"', add
label define nchild_lbl 6 `"6"', add
label define nchild_lbl 7 `"7"', add
label define nchild_lbl 8 `"8"', add
label define nchild_lbl 9 `"9+"', add
label values nchild nchild_lbl

label define nchlt5_lbl 0 `"No children under age 5"'
label define nchlt5_lbl 1 `"1 child under age 5"', add
label define nchlt5_lbl 2 `"2"', add
label define nchlt5_lbl 3 `"3"', add
label define nchlt5_lbl 4 `"4"', add
label define nchlt5_lbl 5 `"5"', add
label define nchlt5_lbl 6 `"6"', add
label define nchlt5_lbl 7 `"7"', add
label define nchlt5_lbl 8 `"8"', add
label define nchlt5_lbl 9 `"9+"', add
label values nchlt5 nchlt5_lbl

label define famunit_lbl 01 `"1st family in household or group quarters"'
label define famunit_lbl 02 `"2nd family in household or group quarters"', add
label define famunit_lbl 03 `"3rd"', add
label define famunit_lbl 04 `"4th"', add
label define famunit_lbl 05 `"5th"', add
label define famunit_lbl 06 `"6th"', add
label define famunit_lbl 07 `"7th"', add
label define famunit_lbl 08 `"8th"', add
label define famunit_lbl 09 `"9th"', add
label define famunit_lbl 10 `"10"', add
label define famunit_lbl 11 `"11"', add
label define famunit_lbl 12 `"12"', add
label define famunit_lbl 13 `"13"', add
label define famunit_lbl 14 `"14"', add
label define famunit_lbl 15 `"15"', add
label define famunit_lbl 16 `"16"', add
label define famunit_lbl 17 `"17"', add
label define famunit_lbl 18 `"18"', add
label define famunit_lbl 19 `"19"', add
label define famunit_lbl 20 `"20"', add
label define famunit_lbl 21 `"21"', add
label define famunit_lbl 22 `"22"', add
label define famunit_lbl 23 `"23"', add
label define famunit_lbl 24 `"24"', add
label define famunit_lbl 25 `"25"', add
label define famunit_lbl 26 `"26"', add
label define famunit_lbl 27 `"27"', add
label define famunit_lbl 28 `"28"', add
label define famunit_lbl 29 `"29"', add
label values famunit famunit_lbl

label define bpl_lbl 09900 `"United States, n.s."'
label define bpl_lbl 10000 `"American Samoa"', add
label define bpl_lbl 10500 `"Guam"', add
label define bpl_lbl 10750 `"Northern Mariana Islands"', add
label define bpl_lbl 11000 `"Puerto Rico"', add
label define bpl_lbl 11500 `"U.S. Virgin Islands"', add
label define bpl_lbl 12090 `"U.S. outlying areas, n.s."', add
label define bpl_lbl 15000 `"Canada"', add
label define bpl_lbl 16010 `"Bermuda"', add
label define bpl_lbl 19900 `"North America, n.s."', add
label define bpl_lbl 20000 `"Mexico"', add
label define bpl_lbl 21010 `"Belize/British Honduras"', add
label define bpl_lbl 21020 `"Costa Rica"', add
label define bpl_lbl 21030 `"El Salvador"', add
label define bpl_lbl 21040 `"Guatemala"', add
label define bpl_lbl 21050 `"Honduras"', add
label define bpl_lbl 21060 `"Nicaragua"', add
label define bpl_lbl 21070 `"Panama"', add
label define bpl_lbl 21090 `"Central America, n.s."', add
label define bpl_lbl 25000 `"Cuba"', add
label define bpl_lbl 26010 `"Dominican Republic"', add
label define bpl_lbl 26020 `"Haiti"', add
label define bpl_lbl 26030 `"Jamaica"', add
label define bpl_lbl 26043 `"Bahamas"', add
label define bpl_lbl 26044 `"Barbados"', add
label define bpl_lbl 26054 `"Dominica"', add
label define bpl_lbl 26055 `"Grenada"', add
label define bpl_lbl 26060 `"Trinidad and Tobago"', add
label define bpl_lbl 26065 `"Antigua and Barbuda"', add
label define bpl_lbl 26070 `"St. Kitts--Nevis"', add
label define bpl_lbl 26075 `"St. Lucia"', add
label define bpl_lbl 26080 `"St. Vincent and the Grenadi"', add
label define bpl_lbl 26091 `"Caribbean, n.s."', add
label define bpl_lbl 30005 `"Argentina"', add
label define bpl_lbl 30010 `"Bolivia"', add
label define bpl_lbl 30015 `"Brazil"', add
label define bpl_lbl 30020 `"Chile"', add
label define bpl_lbl 30025 `"Colombia"', add
label define bpl_lbl 30030 `"Ecuador"', add
label define bpl_lbl 30040 `"Guyana/British Guiana"', add
label define bpl_lbl 30050 `"Peru"', add
label define bpl_lbl 30060 `"Uruguay"', add
label define bpl_lbl 30065 `"Venezuela"', add
label define bpl_lbl 30070 `"Paraguay"', add
label define bpl_lbl 30090 `"South America, n.s."', add
label define bpl_lbl 31000 `"Americas, n.s."', add
label define bpl_lbl 40000 `"Denmark"', add
label define bpl_lbl 40100 `"Finland"', add
label define bpl_lbl 40200 `"Iceland"', add
label define bpl_lbl 40400 `"Norway"', add
label define bpl_lbl 40500 `"Sweden"', add
label define bpl_lbl 41000 `"England"', add
label define bpl_lbl 41100 `"Scotland"', add
label define bpl_lbl 41200 `"Wales"', add
label define bpl_lbl 41300 `"United Kingdom, n.s."', add
label define bpl_lbl 41400 `"Ireland"', add
label define bpl_lbl 41410 `"Northern Ireland"', add
label define bpl_lbl 42000 `"Belgium"', add
label define bpl_lbl 42100 `"France"', add
label define bpl_lbl 42500 `"Netherlands"', add
label define bpl_lbl 42600 `"Switzerland"', add
label define bpl_lbl 43300 `"Greece"', add
label define bpl_lbl 43400 `"Italy"', add
label define bpl_lbl 43600 `"Portugal"', add
label define bpl_lbl 43610 `"Azores"', add
label define bpl_lbl 43800 `"Spain"', add
label define bpl_lbl 45000 `"Austria"', add
label define bpl_lbl 45200 `"Czechoslavakia"', add
label define bpl_lbl 45212 `"Slovakia"', add
label define bpl_lbl 45213 `"Czech Republic"', add
label define bpl_lbl 45300 `"Germany"', add
label define bpl_lbl 45400 `"Hungary"', add
label define bpl_lbl 45500 `"Poland"', add
label define bpl_lbl 45600 `"Romania"', add
label define bpl_lbl 45650 `"Bulgaria"', add
label define bpl_lbl 45675 `"Albania"', add
label define bpl_lbl 45700 `"Yugoslavia"', add
label define bpl_lbl 45720 `"Bosnia and Herzegovina"', add
label define bpl_lbl 45730 `"Croatia"', add
label define bpl_lbl 45740 `"Macedonia"', add
label define bpl_lbl 45750 `"Serbia"', add
label define bpl_lbl 45760 `"Kosovo"', add
label define bpl_lbl 45770 `"Montenego"', add
label define bpl_lbl 46100 `"Estonia"', add
label define bpl_lbl 46200 `"Latvia"', add
label define bpl_lbl 46300 `"Lithuania"', add
label define bpl_lbl 46500 `"Other USSR/Russia"', add
label define bpl_lbl 46530 `"Ukraine"', add
label define bpl_lbl 46535 `"Belarus"', add
label define bpl_lbl 46540 `"Moldova"', add
label define bpl_lbl 46590 `"USSR, n.s."', add
label define bpl_lbl 49900 `"Europe, n.s."', add
label define bpl_lbl 50000 `"China"', add
label define bpl_lbl 50010 `"Hong Kong"', add
label define bpl_lbl 50040 `"Taiwan"', add
label define bpl_lbl 50100 `"Japan"', add
label define bpl_lbl 50200 `"Korea"', add
label define bpl_lbl 50220 `"South Korea"', add
label define bpl_lbl 50300 `"Mongolia"', add
label define bpl_lbl 51100 `"Cambodia"', add
label define bpl_lbl 51200 `"Indonesia"', add
label define bpl_lbl 51300 `"Laos"', add
label define bpl_lbl 51400 `"Malaysia"', add
label define bpl_lbl 51500 `"Philippines"', add
label define bpl_lbl 51600 `"Singapore"', add
label define bpl_lbl 51700 `"Thailand"', add
label define bpl_lbl 51800 `"Vietnam"', add
label define bpl_lbl 52000 `"Afghanistan"', add
label define bpl_lbl 52100 `"India"', add
label define bpl_lbl 52110 `"Bangladesh"', add
label define bpl_lbl 52120 `"Bhutan"', add
label define bpl_lbl 52130 `"Burma"', add
label define bpl_lbl 52140 `"Pakistan"', add
label define bpl_lbl 52150 `"Sri Lanka"', add
label define bpl_lbl 52200 `"Nepal"', add
label define bpl_lbl 55100 `"Armenia"', add
label define bpl_lbl 55200 `"Azerbaijan"', add
label define bpl_lbl 55300 `"Georgia"', add
label define bpl_lbl 55400 `"Uzbekistan"', add
label define bpl_lbl 55500 `"Kazakhstan"', add
label define bpl_lbl 53000 `"Iran"', add
label define bpl_lbl 53200 `"Iraq"', add
label define bpl_lbl 53400 `"Israel"', add
label define bpl_lbl 53420 `"Palestine"', add
label define bpl_lbl 53500 `"Jordan"', add
label define bpl_lbl 53700 `"Lebanon"', add
label define bpl_lbl 54000 `"Saudi Arabia"', add
label define bpl_lbl 54100 `"Syria"', add
label define bpl_lbl 54200 `"Turkey"', add
label define bpl_lbl 54300 `"Cyprus"', add
label define bpl_lbl 54350 `"Kuwait"', add
label define bpl_lbl 54400 `"Yemen"', add
label define bpl_lbl 54500 `"United Arab Emirates"', add
label define bpl_lbl 54700 `"Middle East, n.s."', add
label define bpl_lbl 59900 `"Asia, n.e.c./n.s."', add
label define bpl_lbl 60010 `"Northern Africa"', add
label define bpl_lbl 60012 `"Egypt/United Arab Rep."', add
label define bpl_lbl 60014 `"Morocco"', add
label define bpl_lbl 60016 `"Algeria"', add
label define bpl_lbl 60018 `"Sudan"', add
label define bpl_lbl 60019 `"Libya"', add
label define bpl_lbl 60023 `"Ghana"', add
label define bpl_lbl 60031 `"Nigeria"', add
label define bpl_lbl 60032 `"Cameroon"', add
label define bpl_lbl 60033 `"Cape Verde"', add
label define bpl_lbl 60034 `"Liberia"', add
label define bpl_lbl 60035 `"Senegal"', add
label define bpl_lbl 60036 `"Sierra Leone"', add
label define bpl_lbl 60037 `"Guinea"', add
label define bpl_lbl 60038 `"Ivory Coast"', add
label define bpl_lbl 60039 `"Togo"', add
label define bpl_lbl 60040 `"Eritrea"', add
label define bpl_lbl 60044 `"Ethiopia"', add
label define bpl_lbl 60045 `"Kenya"', add
label define bpl_lbl 60050 `"Somalia"', add
label define bpl_lbl 60060 `"Tanzania"', add
label define bpl_lbl 60065 `"Uganda"', add
label define bpl_lbl 60070 `"Zimbabwe"', add
label define bpl_lbl 60094 `"South Africa (Union of)"', add
label define bpl_lbl 60095 `"Zaire"', add
label define bpl_lbl 60096 `"Congo"', add
label define bpl_lbl 60097 `"Zambia"', add
label define bpl_lbl 60099 `"Africa, n.s./n.e.c."', add
label define bpl_lbl 70010 `"Australia"', add
label define bpl_lbl 70020 `"New Zealand"', add
label define bpl_lbl 71000 `"Pacific Islands"', add
label define bpl_lbl 71021 `"Fiji"', add
label define bpl_lbl 71022 `"Tonga"', add
label define bpl_lbl 71023 `"Samoa"', add
label define bpl_lbl 71024 `"Marshall Islands"', add
label define bpl_lbl 72000 `"Micronesia"', add
label define bpl_lbl 96000 `"Other, n.e.c. and unknown"', add
label define bpl_lbl 99999 `"NIU"', add
label values bpl bpl_lbl

label define yrimmig_lbl 0000 `"NIU"'
label define yrimmig_lbl 1949 `"1949 or earlier"', add
label define yrimmig_lbl 1959 `"1950-1959"', add
label define yrimmig_lbl 1964 `"1960-1964"', add
label define yrimmig_lbl 1969 `"1965-1969"', add
label define yrimmig_lbl 1974 `"1970-1974"', add
label define yrimmig_lbl 1979 `"1975-1979"', add
label define yrimmig_lbl 1981 `"1980-1981"', add
label define yrimmig_lbl 1983 `"1982-1983"', add
label define yrimmig_lbl 1985 `"1984-1985"', add
label define yrimmig_lbl 1987 `"1986-1987"', add
label define yrimmig_lbl 1989 `"1988-1989"', add
label define yrimmig_lbl 1991 `"1990-1991"', add
label define yrimmig_lbl 1993 `"1992-1993"', add
label define yrimmig_lbl 1994 `"1992-1994"', add
label define yrimmig_lbl 1995 `"1994-1995"', add
label define yrimmig_lbl 1996 `"1994-1996"', add
label define yrimmig_lbl 1997 `"1996-1997"', add
label define yrimmig_lbl 1998 `"1996-1998 (2000 CPS: 1998)"', add
label define yrimmig_lbl 1999 `"1998-1999 (1999 CPS: 1996-1999)"', add
label define yrimmig_lbl 2000 `"1998-2000"', add
label define yrimmig_lbl 2001 `"2000-2001 (2001 CPS: 1998-2001)"', add
label define yrimmig_lbl 2002 `"2000-2002"', add
label define yrimmig_lbl 2003 `"2002-2003 (2003 CPS: 2000-2003)"', add
label define yrimmig_lbl 2004 `"2002-2004"', add
label define yrimmig_lbl 2005 `"2004-2005 (2005 CPS: 2002-2005)"', add
label define yrimmig_lbl 2006 `"2004-2006"', add
label define yrimmig_lbl 2007 `"2004-2007"', add
label define yrimmig_lbl 2008 `"2006-2008 (2006-2007 CPS: 2004-2008)"', add
label define yrimmig_lbl 2009 `"2006-2009"', add
label define yrimmig_lbl 2010 `"2008-2010 (2012 CPS: 2008-2009)"', add
label define yrimmig_lbl 2011 `"2008-2011"', add
label define yrimmig_lbl 2012 `"2010-2012 (2014 CPS: 2010-2011)"', add
label define yrimmig_lbl 2013 `"2010-2013"', add
label define yrimmig_lbl 2014 `"2012-2014"', add
label define yrimmig_lbl 2015 `"2012-2015"', add
label define yrimmig_lbl 2016 `"2014-2016"', add
label define yrimmig_lbl 2017 `"2014-2017"', add
label define yrimmig_lbl 2018 `"2016-2018"', add
label define yrimmig_lbl 2019 `"2016-2019"', add
label values yrimmig yrimmig_lbl

label define citizen_lbl 1 `"Born in U.S"'
label define citizen_lbl 2 `"Born in U.S. outlying"', add
label define citizen_lbl 3 `"Born abroad of American parents"', add
label define citizen_lbl 4 `"Naturalized citizen"', add
label define citizen_lbl 5 `"Not a citizen"', add
label define citizen_lbl 9 `"NIU"', add
label values citizen citizen_lbl

label define empstat_lbl 00 `"NIU"'
label define empstat_lbl 01 `"Armed Forces"', add
label define empstat_lbl 10 `"At work"', add
label define empstat_lbl 12 `"Has job, not at work last week"', add
label define empstat_lbl 20 `"Unemployed"', add
label define empstat_lbl 21 `"Unemployed, experienced worker"', add
label define empstat_lbl 22 `"Unemployed, new worker"', add
label define empstat_lbl 30 `"Not in labor force"', add
label define empstat_lbl 31 `"NILF, housework"', add
label define empstat_lbl 32 `"NILF, unable to work"', add
label define empstat_lbl 33 `"NILF, school"', add
label define empstat_lbl 34 `"NILF, other"', add
label define empstat_lbl 35 `"NILF, unpaid, lt 15 hours"', add
label define empstat_lbl 36 `"NILF, retired"', add
label values empstat empstat_lbl

label define labforce_lbl 0 `"NIU"'
label define labforce_lbl 1 `"No, not in the labor force"', add
label define labforce_lbl 2 `"Yes, in the labor force"', add
label values labforce labforce_lbl

label define classwkr_lbl 00 `"NIU"'
label define classwkr_lbl 10 `"Self-employed"', add
label define classwkr_lbl 13 `"Self-employed, not incorporated"', add
label define classwkr_lbl 14 `"Self-employed, incorporated"', add
label define classwkr_lbl 20 `"Works for wages or salary"', add
label define classwkr_lbl 21 `"Wage/salary, private"', add
label define classwkr_lbl 22 `"Private, for profit"', add
label define classwkr_lbl 23 `"Private, nonprofit"', add
label define classwkr_lbl 24 `"Wage/salary, government"', add
label define classwkr_lbl 25 `"Federal government employee"', add
label define classwkr_lbl 26 `"Armed forces"', add
label define classwkr_lbl 27 `"State government employee"', add
label define classwkr_lbl 28 `"Local government employee"', add
label define classwkr_lbl 29 `"Unpaid family worker"', add
label define classwkr_lbl 99 `"Missing/Unknown"', add
label values classwkr classwkr_lbl

label define uhrsworkt_lbl 997 `"Hours vary"'
label define uhrsworkt_lbl 999 `"NIU"', add
label values uhrsworkt uhrsworkt_lbl

label define whyunemp_lbl 0 `"NIU"'
label define whyunemp_lbl 1 `"Job loser - on layoff"', add
label define whyunemp_lbl 2 `"Other job loser"', add
label define whyunemp_lbl 3 `"Temporary job ended"', add
label define whyunemp_lbl 4 `"Job leaver"', add
label define whyunemp_lbl 5 `"Re-entrant"', add
label define whyunemp_lbl 6 `"New entrant"', add
label values whyunemp whyunemp_lbl

label define whyabsnt_lbl 00 `"NIU"'
label define whyabsnt_lbl 01 `"On temporary layoff (under 30 days)"', add
label define whyabsnt_lbl 02 `"On indefinite layoff (30+ days)"', add
label define whyabsnt_lbl 03 `"Slack work/business conditions"', add
label define whyabsnt_lbl 04 `"Waiting for a new job to begin"', add
label define whyabsnt_lbl 05 `"Vacation/personal days"', add
label define whyabsnt_lbl 06 `"Own illness/injury/medical problems"', add
label define whyabsnt_lbl 07 `"Child care problems"', add
label define whyabsnt_lbl 08 `"Other family/personal obligation"', add
label define whyabsnt_lbl 09 `"Maternity/paternity leave"', add
label define whyabsnt_lbl 10 `"Labor dispute"', add
label define whyabsnt_lbl 11 `"Weather affected job"', add
label define whyabsnt_lbl 12 `"School/training"', add
label define whyabsnt_lbl 13 `"Civic/military duty"', add
label define whyabsnt_lbl 14 `"Does not work in the business"', add
label define whyabsnt_lbl 15 `"Other"', add
label values whyabsnt whyabsnt_lbl

label define educ_lbl 000 `"NIU or no schooling"'
label define educ_lbl 001 `"NIU or blank"', add
label define educ_lbl 002 `"None or preschool"', add
label define educ_lbl 010 `"Grades 1, 2, 3, or 4"', add
label define educ_lbl 011 `"Grade 1"', add
label define educ_lbl 012 `"Grade 2"', add
label define educ_lbl 013 `"Grade 3"', add
label define educ_lbl 014 `"Grade 4"', add
label define educ_lbl 020 `"Grades 5 or 6"', add
label define educ_lbl 021 `"Grade 5"', add
label define educ_lbl 022 `"Grade 6"', add
label define educ_lbl 030 `"Grades 7 or 8"', add
label define educ_lbl 031 `"Grade 7"', add
label define educ_lbl 032 `"Grade 8"', add
label define educ_lbl 040 `"Grade 9"', add
label define educ_lbl 050 `"Grade 10"', add
label define educ_lbl 060 `"Grade 11"', add
label define educ_lbl 070 `"Grade 12"', add
label define educ_lbl 071 `"12th grade, no diploma"', add
label define educ_lbl 072 `"12th grade, diploma unclear"', add
label define educ_lbl 073 `"High school diploma or equivalent"', add
label define educ_lbl 080 `"1 year of college"', add
label define educ_lbl 081 `"Some college but no degree"', add
label define educ_lbl 090 `"2 years of college"', add
label define educ_lbl 091 `"Associate's degree, occupational/vocational program"', add
label define educ_lbl 092 `"Associate's degree, academic program"', add
label define educ_lbl 100 `"3 years of college"', add
label define educ_lbl 110 `"4 years of college"', add
label define educ_lbl 111 `"Bachelor's degree"', add
label define educ_lbl 120 `"5+ years of college"', add
label define educ_lbl 121 `"5 years of college"', add
label define educ_lbl 122 `"6+ years of college"', add
label define educ_lbl 123 `"Master's degree"', add
label define educ_lbl 124 `"Professional school degree"', add
label define educ_lbl 125 `"Doctorate degree"', add
label define educ_lbl 999 `"Missing/Unknown"', add
label values educ educ_lbl

label define schlcoll_lbl 0 `"NIU"'
label define schlcoll_lbl 1 `"High school full time"', add
label define schlcoll_lbl 2 `"High school part time"', add
label define schlcoll_lbl 3 `"College or university full time"', add
label define schlcoll_lbl 4 `"College or university part time"', add
label define schlcoll_lbl 5 `"Does not attend school, college or university"', add
label values schlcoll schlcoll_lbl

label define diffany_lbl 0 `"NIU"'
label define diffany_lbl 1 `"No difficulty"', add
label define diffany_lbl 2 `"Has difficulty"', add
label values diffany diffany_lbl

label define actnlfly_lbl 00 `"NIU"'
label define actnlfly_lbl 10 `"Ill or disabled"', add
label define actnlfly_lbl 20 `"Taking care of home/family"', add
label define actnlfly_lbl 30 `"Going to school"', add
label define actnlfly_lbl 40 `"Retired"', add
label define actnlfly_lbl 50 `"Other"', add
label define actnlfly_lbl 51 `"Looking for work"', add
label define actnlfly_lbl 52 `"No work available"', add
label define actnlfly_lbl 53 `"Doing unpaid work"', add
label define actnlfly_lbl 54 `"In Armed Forces"', add
label values actnlfly actnlfly_lbl

label define gotvdisa_lbl 0 `"NIU"'
label define gotvdisa_lbl 1 `"No"', add
label define gotvdisa_lbl 2 `"Yes"', add
label values gotvdisa gotvdisa_lbl

label define gotveduc_lbl 0 `"NIU"'
label define gotveduc_lbl 1 `"No"', add
label define gotveduc_lbl 2 `"Yes"', add
label values gotveduc gotveduc_lbl

label define gotvothe_lbl 0 `"NIU"'
label define gotvothe_lbl 1 `"No"', add
label define gotvothe_lbl 2 `"Yes"', add
label values gotvothe gotvothe_lbl

label define gotvpens_lbl 0 `"NIU"'
label define gotvpens_lbl 1 `"No"', add
label define gotvpens_lbl 2 `"Yes"', add
label values gotvpens gotvpens_lbl

label define gotvsurv_lbl 0 `"NIU"'
label define gotvsurv_lbl 1 `"No"', add
label define gotvsurv_lbl 2 `"Yes"', add
label values gotvsurv gotvsurv_lbl

label define srcdisa1_lbl 00 `"NIU"'
label define srcdisa1_lbl 01 `"Workers compensation"', add
label define srcdisa1_lbl 02 `"Company or union disability"', add
label define srcdisa1_lbl 03 `"Federal govt disability"', add
label define srcdisa1_lbl 04 `"US military retirement disability"', add
label define srcdisa1_lbl 05 `"State or local govt employee disability"', add
label define srcdisa1_lbl 06 `"US railroad retirement disability"', add
label define srcdisa1_lbl 07 `"Accident or disability insurance"', add
label define srcdisa1_lbl 08 `"Black lung miners disability"', add
label define srcdisa1_lbl 09 `"State temporary sickness"', add
label define srcdisa1_lbl 10 `"Other or don't know"', add
label values srcdisa1 srcdisa1_lbl

label define srcdisa2_lbl 00 `"NIU"'
label define srcdisa2_lbl 01 `"Workers compensation"', add
label define srcdisa2_lbl 02 `"Company or union disability"', add
label define srcdisa2_lbl 03 `"Federal govt disability"', add
label define srcdisa2_lbl 04 `"US military retirement disability"', add
label define srcdisa2_lbl 05 `"State or local govt employee disability"', add
label define srcdisa2_lbl 06 `"US railroad retirement disability"', add
label define srcdisa2_lbl 07 `"Accident or disability insurance"', add
label define srcdisa2_lbl 08 `"Black lung miners disability"', add
label define srcdisa2_lbl 09 `"State temporary sickness"', add
label define srcdisa2_lbl 10 `"Other or don't know"', add
label values srcdisa2 srcdisa2_lbl

label define srcearn_lbl 0 `"NIU"'
label define srcearn_lbl 1 `"Wage and salary"', add
label define srcearn_lbl 2 `"Self employment"', add
label define srcearn_lbl 3 `"Farm self employment"', add
label define srcearn_lbl 4 `"Without pay"', add
label values srcearn srcearn_lbl

label define srceduc_lbl 0 `"NIU"'
label define srceduc_lbl 1 `"Government assistance"', add
label define srceduc_lbl 2 `"Scholarships, grants etc from school"', add
label define srceduc_lbl 3 `"Other assistance"', add
label define srceduc_lbl 4 `"Govt assistance and scholarships, grants etc from school"', add
label define srceduc_lbl 5 `"Govt assistance and other assistance"', add
label define srceduc_lbl 6 `"Scholarships, grants etc from school and other assistance"', add
label define srceduc_lbl 7 `"Govt assistance, scholarships, grants etc from school, and other assistance"', add
label values srceduc srceduc_lbl

label define srcreti1_lbl 0 `"NIU"'
label define srcreti1_lbl 1 `"Company or Union  pension"', add
label define srcreti1_lbl 2 `"Federal Government retirement Pension"', add
label define srcreti1_lbl 3 `"US Military retirement pension"', add
label define srcreti1_lbl 4 `"State or local Govt retirement pension"', add
label define srcreti1_lbl 5 `"US Railroad retirement pension"', add
label define srcreti1_lbl 6 `"Regular payments from annuities or paid-up insurance policies"', add
label define srcreti1_lbl 7 `"Regular payments from IRA, KEOGH, or 401K accounts"', add
label define srcreti1_lbl 8 `"Other or don't know"', add
label values srcreti1 srcreti1_lbl

label define srcreti2_lbl 0 `"NIU"'
label define srcreti2_lbl 1 `"Company or Union  pension"', add
label define srcreti2_lbl 2 `"Federal Government retirement Pension"', add
label define srcreti2_lbl 3 `"US Military retirement pension"', add
label define srcreti2_lbl 4 `"State or local Govt retirement pension"', add
label define srcreti2_lbl 5 `"US Railroad retirement pension"', add
label define srcreti2_lbl 6 `"Regular payments from annuities or paid-up insurance policies"', add
label define srcreti2_lbl 7 `"Regular payments from IRA, KEOGH, or 401K accounts"', add
label define srcreti2_lbl 8 `"Other or do not know"', add
label values srcreti2 srcreti2_lbl

label define srcsurv1_lbl 00 `"NIU"'
label define srcsurv1_lbl 01 `"Company or union survivor pension"', add
label define srcsurv1_lbl 02 `"Federal government pension"', add
label define srcsurv1_lbl 03 `"US military retirement survivor pension"', add
label define srcsurv1_lbl 04 `"State or local govt survivor pension"', add
label define srcsurv1_lbl 05 `"US railroad retirement survivor pension"', add
label define srcsurv1_lbl 06 `"Workers compensation pension"', add
label define srcsurv1_lbl 07 `"Black lung survivor pension"', add
label define srcsurv1_lbl 08 `"Regular payments from estates or trusts"', add
label define srcsurv1_lbl 09 `"Regular payments from annuities or paid-up life insurance"', add
label define srcsurv1_lbl 10 `"Other or do not know"', add
label values srcsurv1 srcsurv1_lbl

label define srcsurv2_lbl 00 `"NIU"'
label define srcsurv2_lbl 01 `"Company or union survivor pension"', add
label define srcsurv2_lbl 02 `"Federal government pension"', add
label define srcsurv2_lbl 03 `"US military retirement survivor pension"', add
label define srcsurv2_lbl 04 `"State or local govt survivor pension"', add
label define srcsurv2_lbl 05 `"US railroad retirement survivor pension"', add
label define srcsurv2_lbl 06 `"Workers compensation pension"', add
label define srcsurv2_lbl 07 `"Black lung survivor pension"', add
label define srcsurv2_lbl 08 `"Regular payments from estates or trusts"', add
label define srcsurv2_lbl 09 `"Regular payments from annuities or paid-up life insurance"', add
label define srcsurv2_lbl 10 `"Other or do not know"', add
label values srcsurv2 srcsurv2_lbl

label define srcunemp_lbl 0 `"No supplemental or strike benefits"'
label define srcunemp_lbl 1 `"Supplemental unemployment benefits"', add
label define srcunemp_lbl 2 `"Union unemployment or strike benefits"', add
label define srcunemp_lbl 3 `"Both"', add
label define srcunemp_lbl 9 `"NIU"', add
label values srcunemp srcunemp_lbl

label define srcwelfr_lbl 0 `"NIU"'
label define srcwelfr_lbl 1 `"AFDC/TANF"', add
label define srcwelfr_lbl 2 `"Other"', add
label define srcwelfr_lbl 3 `"Both AFDC/TANF and other"', add
label values srcwelfr srcwelfr_lbl

label define srcwkcom_lbl 0 `"NIU"'
label define srcwkcom_lbl 1 `"State Workers Compensation"', add
label define srcwkcom_lbl 2 `"Employer or employers insurance"', add
label define srcwkcom_lbl 3 `"Own insurance"', add
label define srcwkcom_lbl 4 `"Other"', add
label values srcwkcom srcwkcom_lbl

label define ssikid_lbl 0 `"NIU"'
label define ssikid_lbl 1 `"No"', add
label define ssikid_lbl 2 `"Yes"', add
label values ssikid ssikid_lbl

label define sskid_lbl 0 `"NIU"'
label define sskid_lbl 1 `"No"', add
label define sskid_lbl 2 `"Yes"', add
label values sskid sskid_lbl

label define vetqa_lbl 0 `"NIU"'
label define vetqa_lbl 1 `"No"', add
label define vetqa_lbl 2 `"Yes"', add
label values vetqa vetqa_lbl

label define whyss1_lbl 0 `"NIU"'
label define whyss1_lbl 1 `"Retired"', add
label define whyss1_lbl 2 `"Disabled (adult or child)"', add
label define whyss1_lbl 3 `"Widowed"', add
label define whyss1_lbl 4 `"Spouse"', add
label define whyss1_lbl 5 `"Surviving child"', add
label define whyss1_lbl 6 `"Dependent child"', add
label define whyss1_lbl 7 `"On behalf of surviving, dependent, or disabled child(ren)"', add
label define whyss1_lbl 8 `"Other (adult or child)"', add
label values whyss1 whyss1_lbl

label define whyss2_lbl 0 `"NIU"'
label define whyss2_lbl 1 `"Retired"', add
label define whyss2_lbl 2 `"Disabled (adult or child)"', add
label define whyss2_lbl 3 `"Widowed"', add
label define whyss2_lbl 4 `"Spouse"', add
label define whyss2_lbl 5 `"Surviving child"', add
label define whyss2_lbl 6 `"Dependent child"', add
label define whyss2_lbl 7 `"On behalf of surviving, dependent, or disabled child(ren)"', add
label define whyss2_lbl 8 `"Other (adult or child)"', add
label values whyss2 whyss2_lbl

label define whyssi1_lbl 0 `"NIU"'
label define whyssi1_lbl 1 `"Disabled (adult or child)"', add
label define whyssi1_lbl 2 `"Blind (adult or child)"', add
label define whyssi1_lbl 3 `"On behalf of a disabled child"', add
label define whyssi1_lbl 4 `"On behalf of a blind child"', add
label define whyssi1_lbl 5 `"Other (adult or child)"', add
label values whyssi1 whyssi1_lbl

label define whyssi2_lbl 0 `"NIU"'
label define whyssi2_lbl 1 `"Disabled (adult or child)"', add
label define whyssi2_lbl 2 `"Blind (adult or child)"', add
label define whyssi2_lbl 3 `"On behalf of a disabled child"', add
label define whyssi2_lbl 4 `"On behalf of a blind child"', add
label define whyssi2_lbl 5 `"Other (adult or child)"', add
label values whyssi2 whyssi2_lbl

label define filestat_lbl 0 `"No data"'
label define filestat_lbl 1 `"Joint, both less than 65"', add
label define filestat_lbl 2 `"Joint, one less than 65, one 65+"', add
label define filestat_lbl 3 `"Joint, both 65+"', add
label define filestat_lbl 4 `"Head of household"', add
label define filestat_lbl 5 `"Single"', add
label define filestat_lbl 6 `"Nonfiler"', add
label values filestat filestat_lbl

label define offpov_lbl 01 `"Below Poverty Line"'
label define offpov_lbl 02 `"Above Poverty Line"', add
label define offpov_lbl 99 `"NIU"', add
label values offpov offpov_lbl

label define offpovuniv_lbl 00 `"Out of Poverty Universe"'
label define offpovuniv_lbl 01 `"In Poverty Universe"', add
label values offpovuniv offpovuniv_lbl

label define poverty_lbl 00 `"NIU"'
label define poverty_lbl 10 `"Below poverty"', add
label define poverty_lbl 20 `"Above poverty"', add
label define poverty_lbl 21 `"100-124 percent of the low-income level"', add
label define poverty_lbl 22 `"125-149 percent of the low-income level"', add
label define poverty_lbl 23 `"150 percent and above the low-income level"', add
label values poverty poverty_lbl

label define spmnewfam_lbl 0 `"Same as official poverty unit"'
label define spmnewfam_lbl 1 `"Cohabiting couple present"', add
label define spmnewfam_lbl 2 `"Unrelated individual under 15 present"', add
label define spmnewfam_lbl 3 `"Foster child age 15-21 present"', add
label define spmnewfam_lbl 4 `"Newly included parent"', add
label define spmnewfam_lbl 5 `"Multiple changes"', add
label values spmnewfam spmnewfam_lbl

label define spmpov_lbl 0 `"Above poverty (SPM)"'
label define spmpov_lbl 1 `"Below poverty (SPM)"', add
label values spmpov spmpov_lbl

label define spmmort_lbl 1 `"Owners with a mortgage"'
label define spmmort_lbl 2 `"Owners without a mortgage"', add
label define spmmort_lbl 3 `"Renters"', add
label values spmmort spmmort_lbl

label define disabwrk_lbl 0 `"NIU"'
label define disabwrk_lbl 1 `"No disability that affects work"', add
label define disabwrk_lbl 2 `"Disability limits or prevents work"', add
label values disabwrk disabwrk_lbl

label define health_lbl 1 `"Excellent"'
label define health_lbl 2 `"Very good"', add
label define health_lbl 3 `"Good"', add
label define health_lbl 4 `"Fair"', add
label define health_lbl 5 `"Poor"', add
label values health health_lbl

label define quitsick_lbl 0 `"NIU"'
label define quitsick_lbl 1 `"No, did not quit job or retire"', add
label define quitsick_lbl 2 `"Yes, quit job or retired"', add
label values quitsick quitsick_lbl

label define himcaid_lbl 1 `"No"'
label define himcaid_lbl 2 `"Yes"', add
label values himcaid himcaid_lbl

label define himcare_lbl 0 `"NIU"'
label define himcare_lbl 1 `"No"', add
label define himcare_lbl 2 `"Yes"', add
label values himcare himcare_lbl

label define hichamp_lbl 1 `"No"'
label define hichamp_lbl 2 `"Yes"', add
label values hichamp hichamp_lbl

label define caid_lbl 1 `"No"'
label define caid_lbl 2 `"Yes"', add
label values caid caid_lbl

label define care_lbl 1 `"No"'
label define care_lbl 2 `"Yes"', add
label values care care_lbl

label define champus_lbl 1 `"No"'
label define champus_lbl 2 `"Yes"', add
label values champus champus_lbl

label define champva_lbl 1 `"No"'
label define champva_lbl 2 `"Yes"', add
label values champva champva_lbl

label define militva_lbl 0 `"No"'
label define militva_lbl 1 `"Yes, military health care or VA"', add
label define militva_lbl 2 `"Yes, VA health care only"', add
label define militva_lbl 3 `"Yes, military health care only"', add
label define militva_lbl 4 `"Yes, both military health care and VA"', add
label values militva militva_lbl

label define indianh_lbl 1 `"No"'
label define indianh_lbl 2 `"Yes"', add
label values indianh indianh_lbl

label define kidcaid_lbl 0 `"NIU"'
label define kidcaid_lbl 1 `"No"', add
label define kidcaid_lbl 2 `"Yes"', add
label values kidcaid kidcaid_lbl

label define hiurule_lbl 10 `"Point HIU reference person to self"'
label define hiurule_lbl 20 `"Point married person, with spouse present, to spouse"', add
label define hiurule_lbl 21 `"Point married female, with spouse present, to spouse"', add
label define hiurule_lbl 30 `"Point eligible child to parent, if present"', add
label define hiurule_lbl 31 `"Point eligible child to father, if present"', add
label define hiurule_lbl 32 `"Point eligible child to mother, if present and father absent"', add
label define hiurule_lbl 50 `"Point single adults to self"', add
label define hiurule_lbl 60 `"Point related singleton children to first HIU reference person in household"', add
label define hiurule_lbl 70 `"Point unrelated singleton children to self"', add
label values hiurule hiurule_lbl

label define gotwic_lbl 0 `"NIU"'
label define gotwic_lbl 1 `"No"', add
label define gotwic_lbl 2 `"Yes"', add
label values gotwic gotwic_lbl

label define kidcneed_lbl 0 `"NIU"'
label define kidcneed_lbl 1 `"No"', add
label define kidcneed_lbl 2 `"Yes"', add
label values kidcneed kidcneed_lbl


