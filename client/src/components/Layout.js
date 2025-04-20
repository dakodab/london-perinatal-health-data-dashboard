import React from 'react'; // Import React to write a React component
// import './Layout.css'; // Optional: to style this layout more later with custom CSS

// Layout ("functional component")
// "children" = react "prop"
function Layout({ children, setActiveSection }) {
  return (
    <div className="d-flex">
      {/* Sidebar section - sticks to the left side */}
      <div
        className="bg-light border-end vh-100 p-3"
        style={{ width: '250px' }}
      >
        {/* Sidebar Title */}
        <h4 className="mb-4">London Perinatal Health Data Dashboard</h4>

        {/* Sidebar Navigation List */}
        <ul className="nav flex-column">
          
            {/* Most Recent Data - non-clickable section title */}
            <li className="nav-item mt-4">
              <div className="text-uppercase fw-bold small text-muted">
                Most Recent Data
              </div>

              {/* Sub-links indented using Bootstrap margin start (ms-3) */}
              <ul className="nav flex-column ms-3">
                <li className="nav-item">
                <a className="nav-link" href="#city" onClick={() => setActiveSection('recent-city')}>
                    Citywide
                </a>
                </li>
                <li className="nav-item">
                <a className="nav-link" href="#borough" onClick={() => setActiveSection('recent-borough')}>
                    By Borough
                </a>
                </li>
              </ul>
            </li>

            {/* Data Over Time - non-clickable section title */}
            <li className="nav-item mt-4">
              <div className="text-uppercase fw-bold small text-muted">
                Data Over Time
              </div>

              {/* Sub-links for Citywide vs. Borough */}
              <ul className="nav flex-column ms-3">
                <li className="nav-item">
                <a className="nav-link" href="#city-trends" onClick={() => setActiveSection('trend-city')}>
                    Citywide
                </a>
                </li>
                <li className="nav-item">
                <a className="nav-link" href="#borough-trends" onClick={() => setActiveSection('trend-borough')}>
                    By Borough
                </a>
                </li>
              </ul>
            </li>git push
        </ul>
      </div>

      {/* Main content area where all the dashboard content appears */}
      {/* "flex-grow-1" makes this take up the rest of the space beside the sidebar */}
      <div className="flex-grow-1 p-4 bg-light">
        {children} {/* This will render whatever content is passed into <Layout> from App.js */}
      </div>
    </div>
  );
}

export default Layout; // Export the Layout component to import and use it in App.js