import React from 'react'; // Import React to write a React component
// import './Layout.css'; // Optional: to style this layout more later with custom CSS

// Layout ("functional component")
// "children" = react "prop"
function Layout({ children, setActiveSection, activeSection }) {
  return (
    <div className="d-flex" style={{ height: '100vh', overflow: 'hidden' }}>
      {/* Sidebar section - sticks to the left side */}
      <div
        className="bg-light border-end p-3"
        style={{ width: '250px', position: 'sticky', top: 0, height: '100vh', overflowY: 'auto' }}
      >
        {/* Sidebar Title */}
        <h4 className="mb-4">London Perinatal Health</h4>

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
                <a
                  className={`nav-link ${activeSection === 'recent-citywide' ? 'text-primary fw-bold' : 'text-dark'}`}
                  href="#city"
                  onClick={() => setActiveSection('recent-citywide')}
                >
                    Citywide
                </a>
                </li>
                <li className="nav-item">
                <a
                  className={`nav-link ${activeSection === 'recent-borough' ? 'text-primary fw-bold' : 'text-dark'}`}
                  href="#borough"
                  onClick={() => setActiveSection('recent-borough')}
                >
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
                <a
                  className={`nav-link ${activeSection === 'trends-city' ? 'text-primary fw-bold' : 'text-dark'}`}
                  href="#city-trends"
                  onClick={() => setActiveSection('trends-city')}
                >
                    Citywide
                </a>
                </li>
                <li className="nav-item">
                <a
                  className={`nav-link ${activeSection === 'trends-borough' ? 'text-primary fw-bold' : 'text-dark'}`}
                  href="#borough-trends"
                  onClick={() => setActiveSection('trends-borough')}
                >
                    By Borough
                </a>
                </li>
              </ul>
            </li>
        </ul>
      </div>

      {/* Main content area where all the dashboard content appears */}
      {/* "flex-grow-1" makes this take up the rest of the space beside the sidebar - overflow allows main content to scroll*/}
      <div className="flex-grow-1 p-4 bg-light" style={{ overflowY: 'auto' }}>
        {children} {/* This will render whatever content is passed into <Layout> from App.js */}
      </div>
      
      <div>
        <p>
          Source:{' '}
          <a href="https://www.gov.uk/government/organisations/office-for-health-improvement-and-disparities">
            Office for Health Improvement and Disparities
          </a>{' '}
          -{' '}
          <a href="https://fingertips.phe.org.uk/">Public Health Profiles</a>, via{' '}
          <a href="https://fingertips.phe.org.uk/api">Fingertips API</a>
        </p>
      </div>


    </div>
  );
}

export default Layout; // Export the Layout component to import and use it in App.js