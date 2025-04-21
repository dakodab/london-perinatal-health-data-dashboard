import React from 'react';

function TrendsByBorough() {
  return (
    <div className="text-start">
      <h2>Data Over Time By Borough</h2>
      <p>This section will show borough-level statistics over time.</p>

      {/* Selectors */}
      <div className="card mb-4">
        <div className="card-body">

          {/* Select Indicator */}
          <label htmlFor="indicator-select" className="me-2">Select an indicator:</label>
            <select className="form-select d-inline-block"
              id="indicator-select"
              style={{ fontSize: '0.9rem', height: '2.2rem', padding: '2px 10px', minWidth: '220px' }}
            >
              <option value="">Indicator 1</option>
              <option value="">Indicator 2</option>
              {/* Replace with dynamic options as needed */}
            </select>

            <br /><br />

            {/* Select Borough */}
            <label htmlFor="borough-select" className="me-2">Select a borough:</label>
            <select className="form-select d-inline-block"
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
          <p>Card 2 – placeholder</p>
        </div>
      </div>
    </div>
    
  );
}

export default TrendsByBorough;