import React, { useEffect, useRef, useState } from 'react';
import * as d3 from 'd3';

function TrendsByBorough({
  indicatorList,
  selectedIndicatorId,
  setSelectedIndicatorId,
  boroughList,
  selectedBoroughCode,
  setSelectedBoroughCode
}) {

  const chartRef = useRef();
  const [trendData, setTrendData] = useState([]);
  
  useEffect(() => {
    const svg = d3.select(chartRef.current);
    svg.selectAll('*').remove(); // Clear previous renders
  
    const width = 600;
    const height = 300;
    const margin = { top: 20, right: 30, bottom: 60, left: 50 };
  
    // data //
    const data = trendData.map(d => ({
      time_period: d.time_period,
      year: parseInt(d.time_period),
      value: Number(d.value)
    }));
  
    const x = d3.scaleBand()
      .domain(data.map(d => d.time_period))
      .range([margin.left, width - margin.right])
      .padding(0.1);
  
    const y = d3.scaleLinear()
      .domain([0, d3.max(data, d => d.value)]).nice()
      .range([height - margin.bottom, margin.top]);
  
    const line = d3.line()
      .x(d => x(d.time_period) + x.bandwidth() / 2)
      .y(d => y(d.value));
  
    svg.attr('viewBox', [0, 0, width, height]);
  
    // X-axis
    svg.append('g')
      .attr('transform', `translate(0,${height - margin.bottom})`)
      .call(d3.axisBottom(x))
      .selectAll("text")
      .attr("transform", "rotate(-45)")
      .attr("dy", "0.7em")
      .style("text-anchor", "end")
      .style("font-size", "14px");
  
    svg.append('g')
      .attr('transform', `translate(${margin.left},0)`)
      .call(d3.axisLeft(y).tickSizeOuter(0))
      .selectAll("text")
      .style("font-size", "14px");
  
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
      .attr("cx", d => x(d.time_period) + x.bandwidth() / 2)     // x-position based on year
      .attr("cy", d => y(d.value))    // y-position based on value
      .attr("r", 4)                   // radius of the dot
      .attr("fill", "#2b4eff");       // dot color (same as line)

    // Tooltip
    const tooltip = d3.select("body")
      .append("div")
      .attr("class", "d3-tooltip")
      .style("position", "absolute")
      .style("visibility", "hidden")
      .style("background", "white")
      .style("border", "1px solid #ccc")
      .style("border-radius", "4px")
      .style("padding", "6px 8px")
      .style("font-size", "12px")
      .style("box-shadow", "0px 0px 4px rgba(0, 0, 0, 0.2)")
      .style("pointer-events", "none");

    svg.selectAll("circle")
      .on("mouseover", function (event, d) {
        const unit = (indicatorList.find(i => i.id === selectedIndicatorId)?.unit || '');
        tooltip.style("visibility", "visible")
          .text(`${d.value.toFixed(1)}${unit ? ` ${unit}` : ''}`);
      })
      .on("mousemove", function (event, d) {
        tooltip
          .style("top", `${event.pageY - 40}px`)
          .style("left", `${event.pageX + 12}px`);
      })
      .on("mouseout", function () {
        tooltip.style("visibility", "hidden");
      });
    }, [indicatorList, selectedIndicatorId, trendData]);

  useEffect(() => {
    if (!selectedIndicatorId || !selectedBoroughCode) return;
  
    fetch(`${process.env.REACT_APP_API_URL}/api/railway/trends/${selectedIndicatorId}/${selectedBoroughCode}`)
      .then(res => res.json())
      .then(data => {
        const sortedData = [...data].sort((a, b) => a.time_period.localeCompare(b.time_period));
        setTrendData(sortedData);
      })
      .catch(err => {
        console.error("Error fetching trend data:", err);
      });
  }, [selectedIndicatorId, selectedBoroughCode]);

  console.log('Trend data is ready:', trendData);

  return (
    <div className="text-start">
      <h2>
        {indicatorList.find(i => i.id === selectedIndicatorId)?.name || 'Selected Indicator'} in {boroughList.find(b => b.code === selectedBoroughCode)?.name || 'Selected Borough'}
        {trendData.length > 0 ? `, since ${trendData[0].time_period}` : ''}
      </h2>

      {/* Selectors */}
      <div className="card mb-4">
        <div className="card-body p-2" style={{ fontSize: '0.85rem', overflowX: 'auto' }}>
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
            <select 
              className="form-select d-inline-block w-auto"
              id="borough-select"
              value={selectedBoroughCode} 
              onChange={(e) => setSelectedBoroughCode(e.target.value)}
              style={{ fontSize: '0.9rem', height: '2.2rem', padding: '2px 10px', minWidth: '220px' }}
            >
              {boroughList.map((borough) => (
                <option key={borough.code} value={borough.code}>
                  {borough.name}
                </option>
              ))}
            </select>
        </div>
      </div>

      {/* Line Chart */}
      <div className="card mb-4">
        <div className="card-body">
        {trendData.length === 0 ? (
          <p>No data available for this combination.</p>
        ) : (
          <>
            {trendData.length > 0 && (
            <>
              <svg
                ref={chartRef}
                style={{ width: '100%', height: '60vh', maxHeight: '600px', display: 'block', margin: '0 auto' }}
                preserveAspectRatio="xMidYMid meet"
              ></svg>
            </>
            )}

            
            
          </>
        )}
        </div>
      </div>
    </div>
    
  );
}

export default TrendsByBorough;