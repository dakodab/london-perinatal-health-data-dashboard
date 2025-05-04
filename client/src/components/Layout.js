import React from 'react'; // Import React to write a React component
// import './Layout.css'; // Optional: to style layout more later (not used)

// Layout (layout is a "functional component")
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

              {/* ms-3 (bootstrap) indents the sub-sections of Most Recent Data (Citywide & Borough) */}
              <ul className="nav flex-column ms-3">

                {/* Recent Citywide */}
                <li className="nav-item">
                <a
                  className={`nav-link ${activeSection === 'recent-citywide' ? 'text-primary fw-bold' : 'text-dark'}`}
                  href="#city"
                  onClick={() => setActiveSection('recent-citywide')}
                >
                    Citywide
                </a>
                </li> {/* End of Recent Citywide */}

                {/* Recent By Borough */}
                <li className="nav-item">
                <a
                  className={`nav-link ${activeSection === 'recent-borough' ? 'text-primary fw-bold' : 'text-dark'}`}
                  href="#borough"
                  onClick={() => setActiveSection('recent-borough')}
                >
                    By Borough
                </a>
                </li> {/* End of Recent By Borough */}

              </ul>
            </li> {/* End of Most Recent Data */}


            {/* Data Over Time - non-clickable section title */}
            <li className="nav-item mt-4">
              <div className="text-uppercase fw-bold small text-muted">
                Data Over Time
              </div>

              {/* ms-3 (bootstrap) indents the sub-sections of Data Over Time (Citywide & Borough) */}
              <ul className="nav flex-column ms-3">

                {/* Citywide Data Over Time */}
                <li className="nav-item">
                <a
                  className={`nav-link ${activeSection === 'trends-city' ? 'text-primary fw-bold' : 'text-dark'}`}
                  href="#city-trends"
                  onClick={() => setActiveSection('trends-city')}
                >
                    Citywide
                </a>
                </li> {/* End of Citywide Data Over Time */}

                {/* Data by Borough Over Time */}
                <li className="nav-item">
                <a
                  className={`nav-link ${activeSection === 'trends-borough' ? 'text-primary fw-bold' : 'text-dark'}`}
                  href="#borough-trends"
                  onClick={() => setActiveSection('trends-borough')}
                >
                    By Borough
                </a>
                </li> {/* End of Data By Borough Over Time */}
                
              </ul>
            </li> {/* End of Data Over Time*/}
        </ul>
      </div>
      
      {/* MAIN CONTENT AREA where all the dashboard content appears */}
      {/* "flex-grow-1" makes this take up the rest of the space beside the sidebar; overflowY allows main content to scroll without the sidebar moving */}
      <div className="flex-grow-1 p-4 bg-light" style={{ overflowY: 'auto' }}>
        {children} {/* This will render whatever content is passed into <Layout> from App.js */}
          
        {/* Source note*/}
        <div>
          <p>
            <br></br>
            Source:{' '}
            <a href="https://www.gov.uk/government/organisations/office-for-health-improvement-and-disparities">
              Office for Health Improvement and Disparities
            </a>{' '}
            -{' '}
            <a href="https://fingertips.phe.org.uk/">Public Health Profiles</a>, via{' '}
            <a href="https://fingertips.phe.org.uk/api">Fingertips API</a>
          </p>
        </div> {/* End of Source note */}

      </div> {/* End of MAIN CONTENT AREA */}

    </div> // End of return div //
    
  ); // End of return //

} // End of function

export default Layout; // Export the Layout component to import and use it in App.js