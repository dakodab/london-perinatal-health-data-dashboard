import React from 'react'; // Import React to write a React component
// import './Layout.css'; // Optional: to style this layout more later with custom CSS

// Layout ("functional component")
// "children" = react "prop"
function Layout({ children }) {
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
          
          {/* First main section - "Most Recent Data" */}
          <li className="nav-item">
            <a className="nav-link active" href="#recent">
              Most Recent Data
            </a>

            {/* Sub-links indented using Bootstrap margin start (ms-3) */}
            <ul className="nav flex-column ms-3">
              <li className="nav-item">
                <a className="nav-link" href="#city">Citywide</a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="#borough">By Borough</a>
              </li>
            </ul>
          </li>

          {/* Second main section - "Data Over Time" */}
          <li className="nav-item mt-3">
            <a className="nav-link" href="#trends">
              Data Over Time
            </a>

            {/* Sub-links for Citywide vs. Borough */}
            <ul className="nav flex-column ms-3">
              <li className="nav-item">
                <a className="nav-link" href="#city-trends">Citywide</a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="#borough-trends">By Borough</a>
              </li>
            </ul>
          </li>
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