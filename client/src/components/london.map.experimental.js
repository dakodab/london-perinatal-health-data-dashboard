import React, { useRef, useEffect } from 'react';
import * as d3 from 'd3';

const LondonMap = ({ indicatorData, unit }) => {
  const londonMapRef = useRef(); // svgref - London map

  useEffect(() => {
    if (!indicatorData) return;

    let tooltip = d3.select('#tooltip');
    if (tooltip.empty()) {
      tooltip = d3.select('body')
        .append('div')
        .attr('id', 'tooltip')
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
    }

    // Load and process GeoJSON for UK map //
    d3.json('/data/uk-regions.geojson').then((geoData) => {
      
      // lookup table from d.area_name to d.value //
      const valueMap = new Map(
          indicatorData.flatMap(d => {
          // city of london fix agaaaaaiiin //
          if (d.area_name === 'Hackney') {
            return [
              ['Hackney', d.value],
              ['City of London', d.value],
              ['Hackney (combined with City of London)', d.value],
              ['City of London (combined with Hackney)', d.value]
            ];
          }
          return [[d.area_name, d.value]];
        })
      );
      // Color scale for choropleth shading, based on .value field from MySQL //

      console.log('Color domain:', d3.extent(indicatorData, d => d.value));

      const colorScale = d3.scaleSequential()
        .domain([0, d3.max(indicatorData, d => d.value)]) // from 0 to max
        .interpolator(d3.interpolateBlues); // or interpolateYlGnBu, etc.

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
        .attr('fill', d => {
          //normal//
          const name = d.properties.LAD24NM; 
          //fix blank City of London problem //
            const isHackney = name === 'Hackney';
            const isCity = name === 'City of London';
          const displayName = (isHackney) ? 'Hackney (combined with City of London)' : (isCity) ? 'City of London (combined with Hackney)' : name;
          const val = valueMap.get(displayName);
          return val != null ? colorScale(val) : '#ccc'; // fallback gray for missing data
        })
        .attr('stroke', '#333')
        .attr('stroke-width', 0.3)
        .on('mouseover', function (event, d) {
          const name = d.properties.LAD24NM || 'Unknown';
          const isHackney = name === 'Hackney';
          const isCity = name === 'City of London';
          const displayName = (isHackney) ? 'Hackney (combined with City of London)' : (isCity) ? 'City of London (combined with Hackney)' : name;
          const value = valueMap.get(displayName);
          const formattedValue = typeof value === 'number' ? `${value.toFixed(1)} ${unit}` : 'No data';

          tooltip
            .style('visibility', 'visible')
            .html(`<strong>${displayName}</strong><br/>${formattedValue}`);
        })
        .on('mousemove', function (event) {
          tooltip
            .style('top', (event.pageY - 10) + 'px')
            .style('left', (event.pageX + 10) + 'px');
        })
        .on('mouseout', function () {
          tooltip.style('visibility', 'hidden');
        }); 

    }); // end of d3.json block (draws maps) //

  }, [indicatorData, unit]); // end of if data then use effect //

  return (
    <div>
      {/* London map */}
      <svg
        ref={londonMapRef}
        viewBox="0 0 500 500"
        preserveAspectRatio="xMidYMid meet"
        style={{
          width: '100%',
          height: 'auto',
          background: '#f9f9f9',
          border: '1px solid #ccc',
          display: 'block',
          marginTop: '10px',
        }}
      ></svg> {/* London map end */}

      {/* London map legend */}
      <div style={{ marginTop: '20px' }}>
        <svg width="300" height="60">
          <defs>
            <linearGradient id="legendGradient">
              <stop offset="0%" stopColor="#deebf7" />
              <stop offset="100%" stopColor="#08519c" />
            </linearGradient>
          </defs>
          <rect x="10" y="10" width="280" height="20" fill="url(#legendGradient)" />
          <text x="10" y="45" fontSize="12" fill="#333">Low</text>
          <text x="260" y="45" fontSize="12" fill="#333">High</text>
        </svg>
      </div> {/* London map legend div end */}

    </div> 

  ); // end of return //

}; // end of const LondonMap if any data //

export default LondonMap;