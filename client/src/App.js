import React, { useState, useEffect } from 'react';
// import axios from 'axios'; // not currently being used? //
import LondonMap from './components/london.map.experimental';
import IndicatorTable from './components/IndicatorTable';


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

function App() {
  // useState - holds the Early Access to Maternity Care rows //
  const [indicatorData, setIndicatorData] = useState(null);

  // useState - tracks sort direction // 
  const [sortedIndicatorData, setSortedIndicatorData] = useState(null);
  const [sortAsc, setSortAsc] = useState(true); // true = ascending

  // use state - tracks current indicator //
  const [selectedIndicatorId, setSelectedIndicatorId] = useState('94121');

  // use state - whats active
  const [activeSidebarItem, setActiveSidebarItem] = useState('ByBoroughRecent'); // default to one

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
        console.log(`Fetched data for indicator ${selectedIndicatorId}:`, json);
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
    <div className="container-scroller" style={{ paddingBottom: '100px' }}>
      {/* Top Navbar */}
      <nav className="navbar default-layout col-lg-12 col-12 p-0 fixed-top d-flex flex-row">
        <div className="navbar-brand-wrapper d-flex align-items-center justify-content-center">
          <a className="navbar-brand brand-logo" href="/">London Perinatal</a>
        </div>
      </nav>

      {/* Sidebar + Main Content */}
      <div className="container-fluid page-body-wrapper">
        {/* Sidebar */}
          <nav className="sidebar sidebar-offcanvas" id="sidebar">
            <ul className="nav">
              <li className="nav-item nav-category">Most Recent Data</li>
              <li className="nav-item">
                <a
                  className={`nav-link ${activeSidebarItem === 'CitywideRecent' ? 'active' : ''}`}
                  href="#"
                  onClick={(e) => { e.preventDefault(); setActiveSidebarItem('CitywideRecent'); }}
                >
                  <span className="menu-title">Citywide</span>
                </a>
              </li>
              <li className="nav-item">
                <a
                  className={`nav-link ${activeSidebarItem === 'ByBoroughRecent' ? 'active' : ''}`}
                  href="#"
                  onClick={(e) => { e.preventDefault(); setActiveSidebarItem('ByBoroughRecent'); }}
                >
                  <span className="menu-title">By Borough</span>
                </a>
              </li>
              <li className="nav-item nav-category">Data Over Time</li>
              <li className="nav-item">
                <a
                  className={`nav-link ${activeSidebarItem === 'CitywideTime' ? 'active' : ''}`}
                  href="#"
                  onClick={(e) => { e.preventDefault(); setActiveSidebarItem('CitywideTime'); }}
                >
                  <span className="menu-title">Citywide</span>
                </a>
              </li>
              <li className="nav-item">
                <a
                  className={`nav-link ${activeSidebarItem === 'ByBoroughTime' ? 'active' : ''}`}
                  href="#"
                  onClick={(e) => { e.preventDefault(); setActiveSidebarItem('ByBoroughTime'); }}
                >
                  <span className="menu-title">By Borough</span>
                </a>
              </li>
            </ul>
        </nav>

      {/* Main Panel */}
        <div className="main-panel">
          <div className="content-wrapper p-4">

            {/* Conditional content based on sidebar selection */}
            {activeSidebarItem === 'ByBoroughRecent' && (
              <>
                {/* Row: Indicator Selector */}
                <div className="row mb-4">
                  <div className="col-md-6">
                    <label htmlFor="indicator-select" className="form-label">Select an indicator:</label>
                    <select
                      id="indicator-select"
                      className="form-select text-dark"
                      value={selectedIndicatorId}
                      onChange={(e) => setSelectedIndicatorId(e.target.value)}
                    >
                      {indicatorList.map((indicator) => (
                        <option key={indicator.id} value={indicator.id}>
                          {indicator.name}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                {/* Row: Table + Map side by side */}
                <div className="row">
                  <div className="col-md-6">
                    <div className="w-100 p-3 bg-white rounded shadow-sm">
                      <h2 className="mb-3">Table</h2>
                      <IndicatorTable
                        data={indicatorData}
                        sortedData={sortedIndicatorData}
                        sortAsc={sortAsc}
                        sortByValue={sortByValue}
                        selectedIndicatorId={selectedIndicatorId}
                        indicatorList={indicatorList}
                      />
                    </div>
                  </div>
                  <div className="col-md-6 d-flex justify-content-center">
                    <div className="w-100 p-3 bg-white rounded shadow-sm">
                      <h2 className="mb-3">Map</h2>
                      <div style={{ maxWidth: '100%', display: 'flex', justifyContent: 'center' }}>
                        <LondonMap
                          indicatorData={indicatorData.rows}
                          unit={indicatorList.find(i => i.id === selectedIndicatorId)?.unit || ''}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </>
            )}

            {activeSidebarItem === 'CitywideRecent' && (
              <div className="row">
                <div className="col">
                  <div className="w-100 p-3 bg-white rounded shadow-sm">
                    <h2 className="mb-3">Citywide – Most Recent</h2>
                    <p className="text-muted">This section will show the most recent citywide data soon.</p>
                  </div>
                </div>
              </div>
            )}

            {activeSidebarItem === 'CitywideTime' && (
              <div className="row">
                <div className="col">
                  <div className="w-100 p-3 bg-white rounded shadow-sm">
                    <h2 className="mb-3">Citywide – Over Time</h2>
                    <p className="text-muted">This section will show citywide data over time soon.</p>
                  </div>
                </div>
              </div>
            )}

            {activeSidebarItem === 'ByBoroughTime' && (
              <div className="row">
                <div className="col">
                  <div className="w-100 p-3 bg-white rounded shadow-sm">
                    <h2 className="mb-3">By Borough – Over Time</h2>
                    <p className="text-muted">This section will show borough-level data over time soon.</p>
                  </div>
                </div>
              </div>
            )}
          </div> {/* end content-wrapper */}

          {/* Row 4: Footer */}
          {/* partial:../../partials/_footer.html */}
          <footer class="footer">
            <div class="d-sm-flex justify-content-center justify-content-sm-between">
              <span class="text-muted text-center text-sm-left d-block d-sm-inline-block"><b>Source: </b> 
                <a href="https://www.gov.uk/government/organisations/office-for-health-improvement-and-disparities" target="_blank">Office for Health Improvement and Disparities</a> 
                {" "}–{" "}
                <a href="https://fingertips.phe.org.uk/" target="_blank">Public Health Profiles</a>
                , via{" "}
                <a href="https://fingertips.phe.org.uk/api" target="_blank">Fingertips API </a>
                  </span>
              <span class="float-none float-sm-end d-block mt-1 mt-sm-0 text-center"></span>
            </div>
          </footer>
        </div> {/* end main-panel */}
      </div> {/* end page-body-wrapper */}
    </div>
  );
}

export default App;