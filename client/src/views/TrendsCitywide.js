import { useEffect, useState, useRef } from 'react';
import axios from 'axios';
import * as d3 from 'd3';

function TrendsCitywide() {
  const [data, setData] = useState([]);
  const chartRef = useRef();

  const indicatorId = "90362";
  const indicatorName = "Breastfeeding at 6–8 weeks";

  useEffect(() => {
    axios
      .get(`https://fingertips-production-ca6d.up.railway.app/api/railway/history/citywide/${indicatorId}`)
      .then(res => setData(res.data))
      .catch(err => console.error('Error fetching trends:', err));
  }, []);

  useEffect(() => {
    if (data.length === 0) return;

    // D3 logic
    const margin = { top: 20, right: 20, bottom: 30, left: 40 };
    const width = 600 - margin.left - margin.right;
    const height = 300 - margin.top - margin.bottom;

    // Clear previous chart if re-rendering
    d3.select(chartRef.current).selectAll("*").remove();

    const svg = d3
      .select(chartRef.current)
      .append("svg")
      .attr("width", width + margin.left + margin.right)
      .attr("height", height + margin.top + margin.bottom)
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
      .call(d3.axisBottom(x).tickSizeOuter(0))
      .selectAll("text")
      .attr("transform", "rotate(-45)")
      .style("text-anchor", "end");

    // Y axis
    svg.append("g").call(d3.axisLeft(y));

    // Line path
    svg
      .append("path")
      .datum(uniqueData)
      .attr("fill", "none")
      .attr("stroke", "steelblue")
      .attr("stroke-width", 2)
      .attr("d", line);
  }, [data]);

  return (
    <div>
      <h2>Citywide Trends</h2>
      <h3>{indicatorName}</h3>
      <div ref={chartRef}></div>
    </div>
  );
}

export default TrendsCitywide;