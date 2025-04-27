import { useEffect, useState, useRef } from 'react';
// import { useContext } from 'react'; //
import axios from 'axios';
import * as d3 from 'd3';

function TrendsCitywide({ indicatorList }) {
  const [data, setData] = useState([]);
  const chartRef = useRef();

  const [selectedIndicatorId, setSelectedIndicatorId] = useState("94121");
  
  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_API_URL}/api/railway/history/citywide/${selectedIndicatorId}`)
      .then(res => {
        const sorted = [...res.data].sort((a, b) => a.time_period.localeCompare(b.time_period));
        setData(sorted);
      })
      .catch(err => console.error('Error fetching trends:', err));
  }, [selectedIndicatorId]);

  useEffect(() => {
    if (data.length === 0) return;

    // D3 logic
    const margin = { top: 20, right: 20, bottom: 60, left: 40 };
    const container = chartRef.current.parentElement;
    const height = container.offsetHeight > 0
      ? container.offsetHeight - margin.top - margin.bottom
      : window.innerHeight * 0.6;
    const width = container.offsetWidth - margin.left - margin.right;

    // Clear previous chart if re-rendering
    d3.select(chartRef.current).selectAll("*").remove();

    const svg = d3
      .select(chartRef.current)
      .append("svg")
      .attr("viewBox", `0 0 ${width + margin.left + margin.right} ${height + margin.top + margin.bottom}`)
      .attr("preserveAspectRatio", "xMidYMid meet")
      .style("width", "100%")
      .style("height", "auto")
      .append("g")
      .attr("transform", `translate(${margin.left},${margin.top})`);

    // Deduplicate and sort by time_period
    const uniqueData = Array.from(
      d3.group(data, d => d.time_period),
      ([time, entries]) => ({ time_period: time, value: d3.mean(entries, e => e.value) })
    ).sort((a, b) => a.time_period.localeCompare(b.time_period));

    const x = d3
      .scalePoint()
      .domain(uniqueData.map(d => d.time_period))
      .range([0, width]);

    const y = d3
      .scaleLinear()
      .domain([d3.min(uniqueData, d => d.value) - 1, d3.max(uniqueData, d => d.value) + 1])
      .range([height, 0]);

    const line = d3
      .line()
      .x(d => x(d.time_period))
      .y(d => y(d.value));

    // X axis
    svg
      .append("g")
      .attr("transform", `translate(0,${height})`)
      .call(d3.axisBottom(x).tickFormat(d => d))
      .selectAll("text")
      .attr("transform", "rotate(-45)")
      .attr("dy", "0.7em")
      .style("text-anchor", "end")
      .style("font-size", "14px");

    // Y axis
    svg.append("g").call(d3.axisLeft(y));
    svg.selectAll("g.tick text")
      .style("font-size", "14px");

    // Line path
    svg
      .append("path")
      .datum(uniqueData)
      .attr("fill", "none")
      .attr("stroke", "#2b4eff")
      .attr("stroke-width", 2)
      .attr("d", line);

    // Create tooltip div once
    const tooltip = d3.select(chartRef.current)
      .append("div")
      .attr("class", "tooltip")
      .style("position", "absolute")
      .style("background", "#fff")
      .style("border", "1px solid #ccc")
      .style("padding", "4px 8px")
      .style("font-size", "13px")
      .style("pointer-events", "none")
      .style("z-index", "10")
      .style("border-radius", "4px")
      .style("opacity", 0);

    svg.selectAll("circle")
      .data(uniqueData)
      .enter()
      .append("circle")
      .attr("cx", d => x(d.time_period))
      .attr("cy", d => y(d.value))
      .attr("r", 6)
      .attr("fill", "#2b4eff")
      .on("mouseover", function (event, d) {
        tooltip
          .style("left", `${event.offsetX + 10}px`)
          .style("top", `${event.offsetY - 30}px`)
          .style("opacity", 1)
          .html(`${d.value.toFixed(1)} ${indicatorList.find(i => i.id === selectedIndicatorId)?.unit || ''}`);
      })
      .on("mouseout", function () {
        tooltip.style("opacity", 0);
      });
  }, [data, indicatorList, selectedIndicatorId]);

  if (!indicatorList || !Array.isArray(indicatorList)) {
    return <p>Loading indicator list...</p>;
  }

  return (
    <div>
      <h2>
        {indicatorList.find(i => i.id === selectedIndicatorId)?.name || "Selected Indicator"} in London
        {data.length > 0 ? `, since ${data[0].time_period}` : ''} 
      </h2>
      <div className="card mb-4">
        <div className="card-body p-2" style={{ fontSize: '0.85rem', overflowX: 'auto' }}>
          <label htmlFor="indicator-select" className="me-2">Select an indicator: </label>
          <select
            className="form-select d-inline-block w-auto"
            id="indicator-select"
            value={selectedIndicatorId}
            onChange={(e) => setSelectedIndicatorId(e.target.value)}
            style={{ fontSize: '0.9rem', height: '2.2rem', padding: '2px 10px', minWidth: '220px' }}
          >
            {indicatorList.map(indicator => (
              <option key={indicator.id} value={indicator.id}>
                {indicator.name}
              </option>
            ))}
          </select>
        </div>
      </div>
      <div className="card mb-4">
        <div className="card-body">
          <div style={{ width: '100%' }}>
            <div
              ref={chartRef}
              style={{
                width: '100%',
                height: '65vh',
                minHeight: '400px',
                overflow: 'hidden',
                position: 'relative'
              }}
            ></div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default TrendsCitywide;