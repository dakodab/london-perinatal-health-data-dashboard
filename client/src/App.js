// React App //

import React, { useState, useEffect } from 'react';
import axios from 'axios'; // not currently being used? //
import LondonMap from './components/london.map.experimental';

function App() {
  // useState 3 - holds the Early Access to Maternity Care rows //
  const [dbDataEarlyAccess, setdbDataEarlyAccess] = useState(null);

  // tracks sort direction // 
  const [dbDataEarlyAccessSorted, setdbDataEarlyAccessSorted] = useState(null);
  const [sortAsc, setSortAsc] = useState(true); // true = ascending

  // function to sort data //
  const sortByValue = () => {
    if (!dbDataEarlyAccess || !dbDataEarlyAccess.rows) return;
  
    const sortedRows = [...dbDataEarlyAccess.rows].sort((a, b) =>
      sortAsc ? a.value - b.value : b.value - a.value
    );
  
    setdbDataEarlyAccessSorted({
      title: dbDataEarlyAccess.title,
      rows: sortedRows
    });
  
    setSortAsc(!sortAsc); // ascending --> flip order = descending //
  };

 // useEffect 3 - Early Access to Maternity Care //
  useEffect(() => {
    // fetch FILTERED “Early Access” rows from Express API
    fetch('http://localhost:5001/api/railway/early-access')
      .then(res => res.json())
      .then(json => {
        console.log('Fetched early‑access data:', json);
        setdbDataEarlyAccess(json);
      })
      .catch(err => {
        console.error('Error fetching early‑access data:', err);
      });
  }, []);

  // loading screen //
  if (!dbDataEarlyAccess) {
    return (
      <div style={{ padding: '40px', textAlign: 'center' }}>
        <h2 style={{ color: '#444' }}>Loading data…</h2>
      </div>
    );
  }
  
  // content //
  return (
    <div style={{ padding: '20px' }}>

      <h1>London Perinatal Health Data</h1>
      
        {/* JSX Table 3 – Early Access to Maternity Care */}
        <h2>{dbDataEarlyAccess.title}</h2>
        <table border="1" cellPadding="8" style={{ borderCollapse: 'collapse', marginBottom: '30px' }}>
        <thead>
          {/* Column headers (Table 3) */}
          <tr>
            <th>Borough</th>
            <th style={{ cursor: 'pointer' }} onClick={sortByValue}>
              Percentage {sortAsc ? '↑' : '↓'}
            </th>
          </tr>
        </thead>
        <tbody>
          {(dbDataEarlyAccessSorted ? dbDataEarlyAccessSorted.rows : dbDataEarlyAccess.rows).map((row) => (
            <tr key={row.area_name}>
                    <td>
                      {row.area_name === 'Hackney'
                        ? 'Hackney (including City of London)' // if true (Hackney only) //
                        : row.area_name}  {/* if false (all other boroughs) */}
      </td>
              <td>{Math.round(row.value)}%</td>
            </tr>
           ))}
       </tbody>
       </table>

       <LondonMap dbDataEarlyAccess={dbDataEarlyAccess.rows} />

    </div>
  );
}

export default App;