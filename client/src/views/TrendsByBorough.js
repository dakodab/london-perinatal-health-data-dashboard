import React from 'react';

function TrendsByBorough() {
  return (
    <div className="text-start">
      <h2>Data Over Time By Borough</h2>
      <p>This section will show borough-level statistics over time.</p>
      {/* First full-width card */}
      <div className="card mb-4">
        <div className="card-body">
          <p>Card 1 – placeholder</p>
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