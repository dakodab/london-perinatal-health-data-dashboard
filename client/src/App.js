// React App //

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import LondonMap from './london.map';

function App() {

  // useState 1 - this holds the data from the API //
  const [data, setData] = useState(null); 

  // useState 2 - a new state to hold the data from the database //
  const [dbData, setDbData] = useState([]); 

  // useState 3 - holds the Early Access to Maternity Care rows //
  const [earlyData, setEarlyData] = useState(null);

  // tracks sort direction
  const [earlySorted, setEarlySorted] = useState(null);
  const [sortAsc, setSortAsc] = useState(true); // true = ascending

  // function to sort data
  const sortByValue = () => {
    if (!earlyData || !earlyData.rows) return;
  
    const sortedRows = [...earlyData.rows].sort((a, b) =>
      sortAsc ? a.value - b.value : b.value - a.value
    );
  
    setEarlySorted({
      title: earlyData.title,
      rows: sortedRows
    });
  
    setSortAsc(!sortAsc); // flip the order for next time
  };

  //useEffect 1 - data from API //
  useEffect(() => {
  // runs when the page loads //
    const fetchData = async () => {
      try {
        const response = await fetch('http://localhost:5001/api/fingertips');
        const result = await response.json();
        console.log("Fetched data from backend:", result); // just to check
        console.log("Example item:", result[0]);

        //map() transforms each group into its .Data array. flatMap() flattens into one single array //
        const allDataRows = result.flatMap(group => group.Data);
        setData(allDataRows);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
  
    fetchData(); // run it
  }, []);

  // useEffect 2 - data from database //
  useEffect(() => { 
  // runs when the page loads
    fetch('http://localhost:5001/api/data') // fetch --> Express --> Railway
      .then(response => response.json())
      .then(json => {
        console.log("Fetched from DB:", json);
        setDbData(json); // saves data
      })
      .catch(err => {
        console.error("Error fetching DB data:", err);
      });
  }, []);

 // useEffect 3 - Early Access to Maternity Care //
  useEffect(() => {
    // fetch FILTERED “Early Access” rows from Express API
    fetch('http://localhost:5001/api/early-access')
      .then(res => res.json())
      .then(json => {
        console.log('Fetched early‑access data:', json);
        setEarlyData(json);
      })
      .catch(err => {
        console.error('Error fetching early‑access data:', err);
      });
  }, []);

  // loading screen //
  if (!data || !earlyData) {
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

        {/* JSX Table 1 - Live Data from MySQL Database */}
        <h2>Live Data from MySQL Database</h2>
          <table border="1" cellPadding="5" style={{ borderCollapse: 'collapse' }}>
            <thead>
              {/* column headers (Table 1) */}
              <tr>
                <th>Indicator ID</th>
                <th>Area Name</th>
                <th>Time Period</th>
                <th>Value</th>
              </tr>
            </thead>
            <tbody>
               {/* Loops through every row of mySQL data (Table 1) */}
               {Array.isArray(dbData) && dbData.length > 0 ? (
                dbData.map((row, index) => (
                <tr key={index}>
                  {/* <td> = 1 piece of data */}
                  <td>{row.indicator_id}</td>
                  <td>{row.area_name}</td>
                  <td>{row.time_period}</td>
                  <td>{row.value}</td>
                </tr>
                ))
               ) : (
                // stops crash - displays message //
                <tr>
                  <td colSpan="4">⚠️ No data available — database connection failed</td>
                </tr>
                )
              }
            </tbody>
          </table>

        {/* JSX Table 2: Directly from Fingertips API */}
        <h2>Live Data Directly from Fingertips API</h2>
          <table border="1" cellPadding="8" style={{ marginBottom: '30px', borderCollapse: 'collapse', marginTop: '40px' }}>
          <thead>
            {/* Column headers (Table 2) */}
            <tr>
              <th>Indicator</th>
              <th>Area</th>
              <th>Value</th>
              <th>Year</th>
            </tr>
          </thead>
          <tbody>
            {/* Loops through data from API (Table 2)*/}
            {data.map((item) => (
              <tr key={item.IndicatorID + item.AreaCode}>
                {/* <td> = 1 piece of data */}
                <td>{item.IndicatorName}</td>
                <td>{item.AreaName}</td>
                <td>{item.Value}</td>
                <td>{item.Year}</td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* JSX Table 3 – Early Access to Maternity Care */}
        <h2>{earlyData.title}</h2>
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
          {(earlySorted ? earlySorted.rows : earlyData.rows).map((row) => (
            <tr key={row.area_name}>
              <td>{row.area_name}</td>
              <td>{Math.round(row.value)}%</td>
            </tr>
           ))}
       </tbody>
       </table>



      <LondonMap data={data} />

    </div>
  );
}

export default App;