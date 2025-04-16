import React, { useRef, useEffect } from 'react';
import * as d3 from 'd3';

const LondonMap = ({ data }) => {
  const svgRef = useRef(); // svgref - bar chart
  const mapRef = useRef(); // svgref - UK map
  const londonMapRef = useRef(); // svgref - London map

  // "tooltip" for all maps //
  const tooltip = d3.select('body')
    .append('div')
    .style('position', 'absolute')
    .style('background', 'white')
    .style('padding', '6px 10px')
    .style('border', '1px solid #999')
    .style('border-radius', '4px')
    .style('pointer-events', 'none')
    .style('font-size', '13px')
    .style('color', '#333')
    .style('box-shadow', '0px 2px 4px rgba(0,0,0,0.2)')
    .style('visibility', 'hidden');

useEffect(() => {
    if (!data) return;
    
    // === BAR CHART SETUP ===
    const stats = data.map((d) => ({
      name: d.IndicatorName,
      value: d.Value
    }));
    const svg = d3.select(svgRef.current);
    svg.selectAll('*').remove(); // clear previous content
    const width = 600;
    const height = 300;
    const margin = { top: 20, right: 30, bottom: 40, left: 60 };
    svg.attr('width', width).attr('height', height);
    const x = d3
      .scaleBand()
      .domain(stats.map((d) => d.name))
      .range([margin.left, width - margin.right])
      .padding(0.3);
    const y = d3
      .scaleLinear()
      .domain([0, d3.max(stats, (d) => d.value)])
      .nice()
      .range([height - margin.bottom, margin.top]);
    svg
      .append('g')
      .selectAll('rect')
      .data(stats)
      .join('rect')
      .attr('x', (d) => x(d.name))
      .attr('y', (d) => y(d.value))
      .attr('height', (d) => y(0) - y(d.value))
      .attr('width', x.bandwidth())
      .attr('fill', '#69b3a2');
    svg
      .append('g')
      .attr('transform', `translate(0,${height - margin.bottom})`)
      .call(d3.axisBottom(x));
    svg
      .append('g')
      .attr('transform', `translate(${margin.left},0)`)
      .call(d3.axisLeft(y)); // end of bar chart setup

    // === UK MAP ONLY === //
    const mapSvg = d3.select(mapRef.current);
    mapSvg.selectAll('*').remove(); // clear old UK map if re-rendered
    // Define projection and path for UK map //
    const projection = d3.geoMercator();
    const path = d3.geoPath().projection(projection);

    // Load and process GeoJSON for UK map //
    d3.json('/data/uk-regions.geojson').then((geoData) => {
      

      // === USED BY BOTH MAPS === //
      // lookup table from AreaCode to Value //
      const valueMap = new Map(data.map(d => [d.AreaCode, d.Value]));
      // Color scale for choropleth shading, based on data.Value //
      const colorScale = d3.scaleSequential()
        .domain(d3.extent(data, d => d.Value)) // [min, max]
        .interpolator(d3.interpolateBlues); // or interpolateYlGnBu, etc.
      // === end of used by both maps === //


      // === UK MAP ONLY === //
      // Draw all UK LAD features on the UK map SVG //
      const g = mapSvg.append('g');
      g.selectAll('path')
        .data(geoData.features)
        .join('path')
        .attr('d', path)
        // Fill UK LAD regions based on their indicator value (for choropleth effect)
        .attr('fill', d => {
          const areaCode = d.properties.LAD24CD; // LAD24CD = LAD 2024 CODE //
          const value = valueMap.get(areaCode);
          return value != null ? colorScale(value) : '#ccc'; // gray if no data
        })
        // Tooltip interactions for each UK LAD region (mouseover feature)
        // show tooltip on hover 
        .on('mouseover', function (event, d) {
          const name = d.properties.LAD24NM || 'Unknown area'; // LAD24NM = LAD 2024 NAME
          const areaCode = d.properties.LAD24CD; // LAD24CD = LAD 2024 CODE //
          const value = valueMap.get(areaCode);
          tooltip
            .style('visibility', 'visible')
            .html(`<strong>${name}</strong><br/>${value != null ? value : 'No data'}`);
        })
        // move tooltip when mouse is moved
        .on('mousemove', function (event) {
          tooltip
            .style('top', (event.pageY - 10) + 'px')
            .style('left', (event.pageX + 10) + 'px');
        })
        // hide tooltip when no hover
        .on('mouseout', function () {
          tooltip.style('visibility', 'hidden');
        })
        // STYLING FOR UK MAP: Outline each LAD region
        .attr('stroke', '#333')
        .attr('stroke-width', 0.3);
      // === end of UK map only === //


      // === LONDON MAP ONLY === //
      // Filter features to include only London boroughs (LAD24CD starts with 'E09') //
      const londonFeatures = geoData.features.filter(f =>
        f.properties && f.properties.LAD24CD && f.properties.LAD24CD.startsWith('E09') // LAD24CD = LAD 2024 CODE // london borough codes start with E09 //
      );
      // DRAW LONDON MAP === LAD features for London only //
      const londonSvg = d3.select(londonMapRef.current); // uses D3 to select SVG DOM element that represents London map
      londonSvg.selectAll('*').remove(); // Clear previous if re-rendering
      const londonWidth = 500;
      const londonHeight = 500;
      const londonProjection = d3.geoMercator();
      const londonPath = d3.geoPath().projection(londonProjection);
      // Fit London projection to the SVG size //
      londonProjection.fitExtent(
        [[20, 20], [londonWidth - 20, londonHeight - 20]],
        { type: "FeatureCollection", features: londonFeatures }
      );
      londonSvg
        .append('g')
        .selectAll('path')
        .data(londonFeatures)
        .join('path')
        .attr('d', londonPath)
        .attr('fill', 'red')
        .attr('stroke', '#333')
        .attr('stroke-width', 0.3)
        .on('mouseover', function (event, d) {
          const name = d.properties.LAD24NM || 'Unknown'; // LAD24NM = LAD 2024 NAME //
          const value = valueMap.get(d.properties.LAD24CD); // LAD24CD = LAD 2024 CODE //
          tooltip
            .style('visibility', 'visible')
            .html(`<strong>${name}</strong><br/>${value != null ? value : 'No data'}`);
        })
        .on('mousemove', function (event) {
          tooltip
            .style('top', (event.pageY - 10) + 'px')
            .style('left', (event.pageX + 10) + 'px');
        })
        .on('mouseout', function () {
          tooltip.style('visibility', 'hidden');
        });   // END OF LONDON MAP ONLY // 

    }); // end of d3.json block (draws maps) //

  }, [data, tooltip]); // end of if data then use effect // 

  return (
    <div>
      {/* Table of fetched data */}
      <h2>Raw Data Table</h2>
      <table style={{ borderCollapse: 'collapse', width: '100%', marginBottom: '30px' }}>
        <thead>
          <tr>
            <th style={{ border: '1px solid #ccc', padding: '8px' }}>Area Name</th>
            <th style={{ border: '1px solid #ccc', padding: '8px' }}>Indicator Name</th>
            <th style={{ border: '1px solid #ccc', padding: '8px' }}>Value</th>
            <th style={{ border: '1px solid #ccc', padding: '8px' }}>Year</th>
          </tr>
        </thead>
        <tbody>
          {data.map((item, index) => (
            <tr key={index}>
              <td style={{ border: '1px solid #ccc', padding: '8px' }}>{item.AreaName}</td>
              <td style={{ border: '1px solid #ccc', padding: '8px' }}>{item.IndicatorName}</td>
              <td style={{ border: '1px solid #ccc', padding: '8px' }}>{item.Value}</td>
              <td style={{ border: '1px solid #ccc', padding: '8px' }}>{item.Year}</td>
            </tr>
          ))}
        </tbody>
      </table>

      {/*bar chart*/}
      <h2>Bar Chart</h2>
      <svg ref={svgRef}>
      </svg> 
      
      {/* UK map */}
      <h2> UK Map</h2>
      <svg
        ref={mapRef}
        width="100%"
        height="600"
        style={{
          background: '#f0f0f0',
          border: '1px solid #ccc',
          display: 'block',
          marginTop: '30px',
        }}
      ></svg>

      {/* UK map legend */}
      <div style={{ marginTop: '20px' }}>
        <h3>Legend: Indicator Value</h3>
        <svg width="300" height="60">
          <defs>
            <linearGradient id="legendGradient">
              <stop offset="0%" stopColor="#deebf7" />
              <stop offset="100%" stopColor="#08519c" />
            </linearGradient>
          </defs>
          <rect x="10" y="10" width="280" height="20" fill="url(#legendGradient)" />
          <text x="10" y="45" fontSize="12" fill="#333">Low</text>
          <text x="250" y="45" fontSize="12" fill="#333">High</text>
        </svg>
      </div> {/* UK map legend div end */}

      {/* London map */}
      <h2 style={{ marginTop: '40px' }}>Map of London Boroughs</h2>
      <svg
        ref={londonMapRef}
        width="500"
        height="500"
        style={{
          background: '#f9f9f9',
          border: '1px solid #ccc',
          display: 'block',
          marginTop: '10px',
        }}
      ></svg> {/* London map end */}

    </div> 

  ); // end of return //

}; // end of const LondonMap if any data //

export default LondonMap;