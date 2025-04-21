import React from 'react';

function TrendsByBorough() {
  return (
    <div className="text-start">
      <h2>Data Over Time By Borough</h2>
      <p>This section will show borough-level statistics over time.</p>
      {/* First full-width card */}
      <div className="card mb-4">
        <div className="card-body">
          <label htmlFor="indicator-select">Select an indicator:</label>
            <select
              id="indicator-select"
              className="form-select"
              style={{ fontSize: '0.9rem', height: '2rem', padding: '2px 6px' }}
            >
              <option value="">Indicator 1</option>
              <option value="">Indicator 2</option>
              {/* Replace with dynamic options as needed */}
            </select>
        </div>
      </div>

      {/* Second full-width card */}
      <div className="card mb-4">
        <div className="card-body">
          <p>Card 2 – placeholder</p>
        </div>
      </div>
    </div>
    
  );
}

export default TrendsByBorough;