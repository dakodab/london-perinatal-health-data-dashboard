import React, { useState, useEffect } from 'react';
// import axios from 'axios'; // not currently being used? //
// import LondonMap from './components/london.map.experimental';
import Layout from './components/Layout';
import MostRecentCitywide from './views/MostRecentCitywide';
import TrendsCitywide from './views/TrendsCitywide';
import TrendsByBorough from './views/TrendsByBorough.js';
import MostRecentBorough from './views/MostRecentBorough';

// this is already in the data, but static is better to prevent crashing from too much memory use //
const indicatorList = [
  { id: '90731', name: 'Low Birth Weight (alt method)', unit: ' per 1,000', rows: 768 },
  { id: '20401', name: 'Under 18s conception rate', unit: ' per 1,000', rows: 768 }, // note - this data is hidden in some places - consider ethical implications
  { id: '92530', name: 'Stillbirth rate', unit: ' per 1,000', rows: 672 },
  { id: '20101', name: 'Low birth weight of term babies', unit: '%', rows: 546 },
  { id: '90740', name: 'Ectopic pregnancy admissions rate', unit: ' per 100,000', rows: 512 }, // note - this data is hidden in some places - consider ethical implications
  { id: '91743', name: 'Premature births (less than 37 weeks gestation)', unit: ' per 1,000', rows: 454 },
  { id: '91458', name: 'Under 18s births rate', unit: ' per 1,000', rows: 448 }, // note - this data is hidden in some places - consider ethical implications 
  { id: '93085', name: 'Smoking status at time of delivery', unit: '%', rows: 448 },
  { id: '92266', name: 'General fertility rate', unit: ' per 1,000', rows: 417 },
  { id: '92532', name: 'Very low birth weight of all babies', unit: '%', rows: 416 },
  { id: '92531', name: 'Low birth weight of all babies', unit: '%', rows: 416 },
  { id: '92552', name: 'Multiple births', unit: ' per 1,000', rows: 416 },
  { id: '90811', name: 'Teenage mothers', unit: '%', rows: 322 },
  { id: '92973', name: 'Percentage of deliveries to women from ethnic minority groups', unit: '%', rows: 320 },
  { id: '92244', name: 'Caesarean section %', unit: '%', rows: 320 },
  { id: '92240', name: 'Admissions of babies under 14 days', unit: ' per 1,000', rows: 320 },
  { id: '94121', name: 'Early Access to Maternity Care', unit: '%', rows: 160 },
  { id: '93932', name: "Baby's first feed breastmilk", unit: '%', rows: 140 },  // note - this data is hidden in some places - reason unclear
];

// this is already in the data, but static is better to prevent crashing from too much memory use //
const boroughList = [
  { code: 'E09000001', name: 'City of London' },
  { code: 'E09000002', name: 'Barking and Dagenham' },
  { code: 'E09000003', name: 'Barnet' },
  { code: 'E09000004', name: 'Bexley' },
  { code: 'E09000005', name: 'Brent' },
  { code: 'E09000006', name: 'Bromley' },
  { code: 'E09000007', name: 'Camden' },
  { code: 'E09000008', name: 'Croydon' },
  { code: 'E09000009', name: 'Ealing' },
  { code: 'E09000010', name: 'Enfield' },
  { code: 'E09000011', name: 'Greenwich' },
  { code: 'E09000012', name: 'Hackney' },
  { code: 'E09000013', name: 'Hammersmith and Fulham' },
  { code: 'E09000014', name: 'Haringey' },
  { code: 'E09000015', name: 'Harrow' },
  { code: 'E09000016', name: 'Havering' },
  { code: 'E09000017', name: 'Hillingdon' },
  { code: 'E09000018', name: 'Hounslow' },
  { code: 'E09000019', name: 'Islington' },
  { code: 'E09000020', name: 'Kensington and Chelsea' },
  { code: 'E09000021', name: 'Kingston upon Thames' },
  { code: 'E09000022', name: 'Lambeth' },
  { code: 'E09000023', name: 'Lewisham' },
  { code: 'E09000024', name: 'Merton' },
  { code: 'E09000025', name: 'Newham' },
  { code: 'E09000026', name: 'Redbridge' },
  { code: 'E09000027', name: 'Richmond upon Thames' },
  { code: 'E09000028', name: 'Southwark' },
  { code: 'E09000029', name: 'Sutton' },
  { code: 'E09000030', name: 'Tower Hamlets' },
  { code: 'E09000031', name: 'Waltham Forest' },
  { code: 'E09000032', name: 'Wandsworth' },
  { code: 'E09000033', name: 'Westminster' },
];

function App() {
  // useState - holds the Early Access to Maternity Care rows // is this still needed? //
  const [indicatorData, setIndicatorData] = useState(null);

  // useState - tracks sort direction // 
  const [sortedIndicatorData, setSortedIndicatorData] = useState(null);
  const [sortAsc, setSortAsc] = useState(true); // true = ascending

  // use state - tracks current indicator //
  const [selectedIndicatorId, setSelectedIndicatorId] = useState('94121'); // makes Early Access to Maternity Care default

  // use state track which part of the dashboard should be shown //
  const [activeSection, setActiveSection] = useState('recent-borough');

  // use state track current borough (for data over time by borough) //
  const [selectedBoroughCode, setSelectedBoroughCode] = useState('E09000028'); // Makes Southwark default

  // for test //
  console.log("Currently active section:", activeSection);

  // js function to sort data //
  const sortByValue = () => {
    if (!indicatorData || !indicatorData.rows) return;
  
    const sortedRows = [...indicatorData.rows].sort((a, b) =>
      sortAsc ? a.value - b.value : b.value - a.value
    );
  
    setSortedIndicatorData({
      title: indicatorData.title,
      rows: sortedRows
    });
  
    setSortAsc(!sortAsc); // ascending --> flip order = descending //
  };

 // useEffect - Fetch data for the selected indicator //
  useEffect(() => {
    // fetch filtered rows for the selected indicator from Express API
    fetch(`https://fingertips-production-ca6d.up.railway.app/api/railway/indicator/${selectedIndicatorId}`)
      .then(res => res.json())
      .then(json => {
        // console.log(`Fetched data for indicator ${selectedIndicatorId}:`, json);
        setIndicatorData(json);
        setSortedIndicatorData(null); // reset sorting
      })
      .catch(err => {
        console.error(`Error fetching data for indicator ${selectedIndicatorId}:`, err);
      });
  }, [selectedIndicatorId]);

  // loading screen //
  if (!indicatorData) {
    return (
      <div style={{ padding: '40px', textAlign: 'center' }}>
        <h2 style={{ color: '#444' }}>Loading data…</h2>
      </div>
    );
  }
  
  // content //
  return (
    <Layout
      setActiveSection={setActiveSection}
      activeSection={activeSection}>

    {activeSection === 'recent-citywide' && (
      <MostRecentCitywide indicatorList={indicatorList} />
    )}

    {activeSection === 'recent-borough' && (
      <MostRecentBorough
        indicatorList={indicatorList}
        selectedIndicatorId={selectedIndicatorId}
        setSelectedIndicatorId={setSelectedIndicatorId}
        indicatorData={indicatorData}
        sortedIndicatorData={sortedIndicatorData}
        sortAsc={sortAsc}
        sortByValue={sortByValue}
      />
    )}

    {activeSection === 'trends-city' && (
      <TrendsCitywide
        indicatorList={indicatorList}
        selectedIndicatorId={selectedIndicatorId}
        setSelectedIndicatorId={setSelectedIndicatorId}
      />
    )}

    {activeSection === 'trends-borough' && (
      <TrendsByBorough
        indicatorList={indicatorList}
        selectedIndicatorId={selectedIndicatorId}
        setSelectedIndicatorId={setSelectedIndicatorId}
        boroughList={boroughList}
        selectedBoroughCode={selectedBoroughCode}
        setSelectedBoroughCode={setSelectedBoroughCode}
      />
    )}
  </Layout>
  );
}

export default App;