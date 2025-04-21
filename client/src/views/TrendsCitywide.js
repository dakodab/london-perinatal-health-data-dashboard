import React from 'react';

function TrendsCitywide() {
  return (
    <div className="text-start">
      <h2>Citywide Data Over Time</h2>
      <p>This section will show citywide-level statistics over time.</p>
      {/* First full-width card */}
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

export default TrendsCitywide;