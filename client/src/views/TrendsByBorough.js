import React, { useEffect, useRef } from 'react';
import * as d3 from 'd3';

function TrendsByBorough({ indicatorList, selectedIndicatorId, setSelectedIndicatorId }) {
  const chartRef = useRef();
  
  useEffect(() => {
    const svg = d3.select(chartRef.current);
    svg.selectAll('*').remove(); // Clear previous renders
  
    const width = 600;
    const height = 300;
    const margin = { top: 20, right: 30, bottom: 30, left: 40 };
  
    // mock data //
    const data = [
      { year: 2018, value: 45 },
      { year: 2019, value: 60 },
      { year: 2020, value: 52 },
      { year: 2021, value: 70 },
      { year: 2022, value: 65 }
    ];
  
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
  
    svg.append('path')
      .datum(data)
      .attr('fill', 'none')
      .attr('stroke', '#2b4eff')
      .attr('stroke-width', 2)
      .attr('d', line);
  }, []);
  return (
    <div className="text-start">
      <h2>Data Over Time By Borough</h2>

      {/* Selectors */}
      <div className="card mb-4">
        <div className="card-body">

          {/* Select Indicator */}
          <label htmlFor="indicator-select" className="me-2">Select an indicator:</label>
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

            <br /><br />

            {/* Select Borough */}
            <label htmlFor="borough-select" className="me-2">Select a borough:</label>
            <select className="form-select d-inline-block w-auto"
              id="borough-select"
              style={{ fontSize: '0.9rem', height: '2.2rem', padding: '2px 10px', minWidth: '220px' }}
            >
              <option value="">Borough 1</option>
              <option value="">Borough 2</option>
              {/* Replace with dynamic options as needed */}
            </select>
        </div>
      </div>

      {/* Line Chart */}
      <div className="card mb-4">
        <div className="card-body">
          <svg ref={chartRef} style={{ width: '100%', height: '300px' }}></svg>
        </div>
      </div>
    </div>
    
  );
}

export default TrendsByBorough;