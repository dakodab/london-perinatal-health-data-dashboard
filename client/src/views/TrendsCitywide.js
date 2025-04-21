import React, { useState, useEffect, useRef } from 'react';
import * as d3 from 'd3';

function TrendsCitywide() {

  const [trendData, setTrendData] = useState([]);
  const [indicatorList, setIndicatorList] = useState([]);
  const [selectedIndicatorId, setSelectedIndicatorId] = useState('');
  const chartRef = useRef();

  useEffect(() => {
    fetch('https://fingertips-production-ca6d.up.railway.app/api/railway/indicators')
      .then((res) => res.json())
      .then((data) => setIndicatorList(data))
      .catch((err) => console.error('Error fetching indicators:', err));
  }, []);
  
  useEffect(() => {
    const svg = d3.select(chartRef.current);
    svg.selectAll('*').remove(); // Clear previous renders
  
    const width = 600;
    const height = 300;
    const margin = { top: 20, right: 30, bottom: 30, left: 40 };
  
    // mock data //
    const data = trendData.map(d => ({
      year: parseInt(d.time_period),
      value: Number(d.value)
    }));
  
    const x = d3.scaleLinear()
      .domain(d3.extent(data, d => d.year))
      .range([margin.left, width - margin.right]);
  
    const y = d3.scaleLinear()
      .domain([0, d3.max(data, d => d.value)]).nice()
      .range([height - margin.bottom, margin.top]);
  
    const line = d3.line()
      .x(d => x(d.year))
      .y(d => y(d.value));
  
    svg.attr('viewBox', [0, 0, width, height]);
  
    svg.append('g')
      .attr('transform', `translate(0,${height - margin.bottom})`)
      .call(d3.axisBottom(x).ticks(data.length).tickFormat(d3.format('d')));
  
    svg.append('g')
      .attr('transform', `translate(${margin.left},0)`)
      .call(d3.axisLeft(y));
  
    svg.append('path')                // draw the line
      .datum(data)
      .attr('fill', 'none')
      .attr('stroke', '#2b4eff')      // line color
      .attr('stroke-width', 2)
      .attr('d', line);

    svg.selectAll("circle")           // data points as dots on line
      .data(data)
      .enter()
      .append("circle")
      .attr("cx", d => x(d.year))     // x-position based on year
      .attr("cy", d => y(d.value))    // y-position based on value
      .attr("r", 4)                   // radius of the dot
      .attr("fill", "#2b4eff");       // dot color (same as line)
    }, [trendData]);
    
  useEffect(() => {
    if (!selectedIndicatorId) return;
  
    fetch(`https://fingertips-production-ca6d.up.railway.app/api/railway/trends/city/${selectedIndicatorId}`)
      .then((res) => res.json())
      .then((data) => {
        setTrendData(data); // Assuming you have this state
      })
      .catch((error) => {
        console.error('Error fetching citywide trend data:', error);
      });
  }, [selectedIndicatorId]);

  return (
    <div className="text-start">
      <h2>Citywide Data Over Time</h2>
      <p>This section will show citywide-level statistics over time.</p>
      {/* First full-width card */}
      <div className="card mb-4">
        <div className="card-body">
          {/* Select Indicator */}
          <label htmlFor="indicator-select" className="me-2">Select an indicator:</label>
          {indicatorList.length > 0 && (
            <select className="form-select d-inline-block w-auto"
              id="indicator-select"
              value={selectedIndicatorId}
              onChange={(e) => setSelectedIndicatorId(e.target.value)}
              style={{ fontSize: '0.9rem', height: '2.2rem', padding: '2px 10px', minWidth: '220px' }}
            >
              {indicatorList.map((indicator) => (
                <option key={indicator.id} value={indicator.id}>
                  {indicator.name}
                </option>
              ))}
            </select>
          )}
        </div>
      </div>

      {/* Line Chart */}
      <div className="card mb-4">
        <div className="card-body">
        {trendData.length === 0 ? (
          <p>No data available.</p>
        ) : (
          <>
            {trendData.length > 0 && (
            <>
              <svg ref={chartRef} style={{ width: '100%', height: '300px' }}></svg>
              <p className="mt-3 mb-0" style={{ fontSize: '0.9rem', color: '#333' }}>
                {indicatorList.find(i => i.id === selectedIndicatorId)?.name} in London
              </p>
            </>
            )}
          </>
        )}
        </div>
      </div>
    </div>
    
  );
}

export default TrendsCitywide;
