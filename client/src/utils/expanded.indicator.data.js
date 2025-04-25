const ExpandedIndicatorData = [
  {
    id: '90731',
    name: 'Low Birth Weight (alt method)',
    unit: ' per 1,000',
    rows: 768,
    definition: 'The percentage of conceptions to those aged under 18 years that led to an abortion',
    rationale: 'This indicator shows the breakdown of the outcomes of conceptions to women aged under 18, by abortion or by birth. It can provide additional information to show local variation in the outcomes that have been experienced and help to inform local commissioning.',
    disclosure_control: 'For Isles of Scilly and City of London, no indicator data are presented, to prevent disclosure of small numbers. Disclosure rules have evolved over time. Earlier percentages based on abortion events fewer than 10 were suppressed. Secondary suppression applied as needed.',
    caveats: 'The date of conception is estimated using gestation; postcode of the mother’s address is used to determine area. Under 15s excluded from denominator.',
    notes: 'Corrected abortion rate data for Cheshire West and Chester (1998) and Cornwall and Isles of Scilly (2003) used in indicator calculations.'
  },
  {
    id: '20401',
    name: 'Under 18s conception rate',
    unit: ' per 1,000',
    rows: 768,
    definition: 'Conceptions in women aged under 18 per 1,000 females aged 15-17',
    rationale: 'Teenage pregnancy is associated with poorer outcomes for young parents and children, and has been used as a child poverty strategy indicator. This metric supports targeting early intervention services.',
    disclosure_control: 'For Isles of Scilly and City of London, no data presented to protect confidentiality. Data for Cornwall and Hackney are combined with Isles of Scilly and City of London respectively.',
    caveats: 'Estimated using gestational age and postcode. Excludes under 15s from denominator. Rebased with Census 2021.',
    notes: 'ONS rebased population estimates with 2021 Census data, affecting rates for 2011–2021. Updates reflect new methodology.'
  },
  {
    id: '92530',
    name: 'Stillbirth rate',
    unit: ' per 1,000',
    rows: 672,
    definition: 'Rate of stillbirths (fetal deaths occurring after 24 weeks of gestation) for all maternal ages occurring in the respective calendar years per 1,000 births.',
    rationale: 'Stillbirth rates in the UK have changed little over 20 years and remain high compared to other high-income countries. This indicator supports monitoring toward halving stillbirths by 2030.',
    disclosure_control: 'City of London and Isles of Scilly aggregated with Hackney and Cornwall. Small numbers suppressed.',
    caveats: 'Births assigned using postcode and national directory. Small numbers should be interpreted with caution.',
    notes: 'ONS recalculated data in March 2025 for consistency across indicators. Suppresses rates with <3 deaths.'
  },
  {
    id: '20101',
    name: 'Low birth weight of term babies',
    unit: '%',
    rows: 546,
    definition: 'Live births with a recorded birth weight under 2500g and a gestational age of at least 37 complete weeks as a percentage of all live births with recorded birth weight and a gestational age of at least 37 complete weeks.',
    rationale: 'Associated with child mortality and long-term health issues, low birth weight is a public health priority reflecting inequalities and maternity service quality.',
    disclosure_control: '2006: <5 suppressed; 2007-2016: <3 suppressed. Combined areas used when <3. Secondary suppression applied as needed.',
    caveats: 'Data completeness varies by region. ICB estimates use proportional splits when not coterminous with LAs.',
    notes: 'Data for 2005 removed for poor quality. 2005 methodology was preliminary and less robust.'
  },
  {
    id: '90740',
    name: 'Ectopic pregnancy admissions rate',
    unit: ' per 100,000',
    rows: 512,
    definition: 'Crude rate of ectopic pregnancy admissions to hospital in women aged 15-44 years per 100,000 population (women aged 15-44 years)',
    rationale: 'Ectopic pregnancy and PID pose serious risks to women’s health. Indicator helps track reproductive health and early treatment outcomes.',
    disclosure_control: 'Since 2020: counts 1-7 suppressed, rounded to nearest 5. Previously, counts 1-5 suppressed.',
    caveats: 'Admission might be avoided with early detection. Local reporting variations may exist.',
    notes: 'ONS rebased population estimates (2011–2020). LSOA-based deprivation data for 2021/22 not yet available.'
  },
  {
    id: '91743',
    name: 'Premature births (less than 37 weeks gestation)',
    unit: ' per 1,000',
    rows: 454,
    definition: 'Crude rate of premature live births (gestational age between 24–36 weeks) and all stillbirths per 1,000 live births and stillbirths',
    rationale: 'Premature birth is a leading cause of death under age 5. Helps monitor health inequalities and smoking-related pregnancy risks.',
    disclosure_control: '',
    caveats: '',
    notes: 'Stillbirth definition: no sign of life after 24 weeks (Still-Birth (Definition) Act 1992).'
  },
  {
    id: '91458',
    name: 'Under 18s births rate',
    unit: ' per 1,000',
    rows: 448,
    definition: 'Live births in women aged under 18 per 1,000 females aged 15-17',
    rationale: 'Teenage births are associated with poorer health and social outcomes for both mothers and children. This indicator helps monitor and reduce health inequalities and child poverty.',
    disclosure_control: 'City of London and Isles of Scilly values combined with Hackney and Cornwall. Small number rules apply; ONS policy has changed over time.',
    caveats: 'Based on year of birth (not conception). Uses revised ONS population estimates. Some LSOA-level data unavailable.',
    notes: 'Counts for earlier years rounded; deprivation analysis excludes newer LSOA data for 2021/22.'
  },
  {
    id: '93085',
    name: 'Smoking status at time of delivery',
    unit: '%',
    rows: 448,
    definition: 'The number of mothers known to be smokers at the time of delivery as a percentage of all maternities with known smoking status.',
    rationale: 'Smoking during pregnancy increases risks of miscarriage, low birth weight, and SUDI. This indicator supports tobacco control strategies, including NHS goals for <6% prevalence.',
    disclosure_control: '',
    caveats: 'Based on known status only (post-2017 method change). Data may be masked by merged sub-ICB data. Method changes may affect comparability.',
    notes: 'Various data quality issues reported. Areas with high unknown smoking status are flagged. Pre-2017 method included unknowns in denominator.'
  },
  {
    id: '92266',
    name: 'General fertility rate',
    unit: ' per 1,000',
    rows: 417,
    definition: 'Birth rate per 1,000 females aged 15 to 44 years',
    rationale: 'Reflects population growth trends and supports forecasting of future service needs.',
    disclosure_control: 'From 2010, counts <3 suppressed. Isles of Scilly and City of London are combined with Cornwall and Hackney.',
    caveats: '',
    notes: 'Based on residence derived from postcode. Used in national and local demographic planning.'
  },
  {
    id: '92532',
    name: 'Very low birth weight of all babies',
    unit: '%',
    rows: 416,
    definition: 'All births (live and still births) with a recorded birth weight under 1500g as a percentage of all live births with stated birth weight.',
    rationale: 'Very low birth weight increases morbidity and mortality. Indicator monitors health inequalities and informs neonatal service needs.',
    disclosure_control: 'From 2010: small numbers (<3) suppressed. City of London, Isles of Scilly, and Rutland grouped with larger neighbors.',
    caveats: 'Not all records include valid weight. Data quality may vary regionally.',
    notes: 'ICB assigned by postcode.'
  },
  {
    id: '92531',
    name: 'Low birth weight of all babies',
    unit: '%',
    rows: 416,
    definition: 'All births (live and still births) with a recorded birth weight under 2500g as a percentage of all live births with stated birth weight.',
    rationale: 'Low birth weight is tied to infant mortality and long-term health issues. Tracks inequality and supports early years policy.',
    disclosure_control: 'Same as above — suppressed for small numbers; aggregation used.',
    caveats: 'Incomplete recording possible; regional variation likely.',
    notes: 'ICB geography derived from postcode.'
  },
  {
    id: '92552',
    name: 'Multiple births',
    unit: ' per 1,000',
    rows: 416,
    definition: 'Number of maternities where the outcome is a multiple birth expressed as a rate per 1,000 total maternities.',
    rationale: 'Multiple births carry increased risks (e.g., preterm, stillbirth, low birth weight). Important for neonatal planning and service design.',
    disclosure_control: 'From 2010: suppression rules for small numbers apply. Area grouping used for small LAs.',
    caveats: '',
    notes: 'ICB based on postcode. No age filter applied, though generally aligned with 15–44 maternity data.'
  },
  {
    id: '90811',
    name: 'Teenage mothers',
    unit: '%',
    rows: 322,
    definition: 'Percentage of delivery episodes, where the mother is aged under 18 years.',
    rationale: 'Teenage mothers face higher risks of poor mental and physical health. Their children also face increased risks of low birth weight and poverty. The indicator supports work on child health and inequalities.',
    disclosure_control: '',
    caveats: 'Local authority based on postcode of residence. Private hospital and home births excluded. Small number suppression and data quality issues for some areas.',
    notes: 'Various HES data quality issues flagged by NHS England (e.g., missing diagnosis codes, non-submission). Some local authorities affected.'
  },
  {
    id: '92973',
    name: 'Percentage of deliveries to women from ethnic minority groups',
    unit: '%',
    rows: 320,
    definition: 'Percentage of deliveries to women from ethnic minority groups',
    rationale: 'Supports analysis of equity in maternity services. Breastfeeding rates are higher in some minority ethnic groups. Useful for service planning and public health targeting.',
    disclosure_control: 'Counts 1–7 suppressed and all counts rounded to nearest 5. Same rules applied to denominators.',
    caveats: 'Delivery location must be NHS; private/home births excluded. Data quality issues for some trusts flagged and values suppressed in affected areas.',
    notes: 'HES data quality flagged for some years and trusts (e.g. Nottingham, East Sussex, Frimley). Some geographies omitted or cautioned.'
  },
  {
    id: '92244',
    name: 'Caesarean section %',
    unit: '%',
    rows: 320,
    definition: 'Percentage of deliveries by caesarean section',
    rationale: 'Caesarean sections often indicate complications and higher maternal risk. Used to monitor trends and ensure appropriate service delivery.',
    disclosure_control: 'Rounded to nearest 5, suppressed if between 1–7. Denominator subject to same rules. HES disclosure policy applies.',
    caveats: 'Same HES quality issues as above; affected years and trusts flagged. Local authority-level values may mask variation.',
    notes: 'City of London and Hackney grouped. Data for Cornwall and Isles of Scilly not published for 2020/21 due to data quality issues.'
  },
  {
    id: '92240',
    name: 'Admissions of babies under 14 days',
    unit: ' per 1,000',
    rows: 320,
    definition: 'Number of emergency admissions from babies aged 0–13 days (inclusive) expressed as a crude rate per 1,000 deliveries',
    rationale: 'Re-admissions may suggest early discharge, poor assessment, or breastfeeding issues. Helps evaluate postnatal care quality.',
    disclosure_control: 'Same suppression rules and rounding apply. HES-derived denominator affected too.',
    caveats: 'Data quality issues identified for several NHS trusts. New SDEC reporting may reduce apparent admissions in some areas.',
    notes: 'HES reporting changes for same-day care may impact future values. Some areas may show artificial decreases.'
  },
  {
    id: '94121',
    name: 'Early Access to Maternity Care',
    unit: '%',
    rows: 160,
    definition: 'Percentage of pregnant women who have their booking appointment with a midwife within 10 completed weeks of their pregnancy (indicator in development).',
    rationale: 'Early access enables key interventions (e.g., scans, screening, referrals). Indicator promotes best practice per NICE CG62.',
    disclosure_control: 'Booking counts rounded to nearest 5 to protect privacy.',
    caveats: 'Based on MSDS v2.0. Data quality varies by provider; earlier years should be used with caution.',
    notes: 'About 4% of women either book late or lack valid gestational age. Indicator classed as in development for now.'
  },
  {
    id: '93932',
    name: "Baby's first feed breastmilk",
    unit: '%',
    rows: 140,
    definition: 'Percentage of babies whose first feed is breastmilk',
    rationale: 'Early breastmilk feeding promotes health, immune development, and bonding. Supports reduction in child illness and maternal cancer risk.',
    disclosure_control: 'Counts rounded to nearest 5. Counts 1–7 suppressed. Denominator excludes unknowns or invalid entries.',
    caveats: 'Data based on MSDS v2.0. Quality varies by provider; completeness improving year to year. Indicator classed as in development.',
    notes: 'Excludes babies with unknown status to improve accuracy. Some Trusts underreport. Breastmilk status critical for early care evaluation.'
  }
];

  export default ExpandedIndicatorData;