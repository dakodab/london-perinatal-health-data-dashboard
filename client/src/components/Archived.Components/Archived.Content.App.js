// archived content from App.js //

  // useState 1 - holds data from the Fingertips API //
  const [data, setData] = useState(null); 

  // useState 2 - holds data from the MySQL database //
  const [dbData, setDbData] = useState([]); 

  // useEffect 1 - data from API //
  useEffect(() => {
  // runs when the page loads //
    const fetchData = async () => {
      try {
        const response = await fetch('http://localhost:5001/api/fingertips');
        const result = await response.json();
        console.log("Fetched data from backend:", result); // just to check
        console.log("Example item:", result[0]);

        //map() transforms each group into its .Data array. flatMap() flattens into one single array //
        const allDataRows = result.flatMap(group => group.Data);
        setData(allDataRows);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
  
    fetchData(); // run it
  }, []);

  // useEffect 2 - data from database //
  useEffect(() => { 
  // runs when the page loads
    fetch('http://localhost:5001/api/railway/data') // fetch --> Express --> Railway
      .then(response => response.json())
      .then(json => {
        console.log("Fetched from DB:", json);
        setDbData(json); // saves data
      })
      .catch(err => {
        console.error("Error fetching DB data:", err);
      });
  }, []);

        {/* 
        <h2>Live Data from MySQL Database</h2>
          <table border="1" cellPadding="5" style={{ borderCollapse: 'collapse' }}>
            <thead>
              <tr>
                <th>Indicator ID</th>
                <th>Area Name</th>
                <th>Time Period</th>
                <th>Value</th>
              </tr>
            </thead>
            <tbody>
               {Array.isArray(dbData) && dbData.length > 0 ? (
                dbData.map((row, index) => (
                <tr key={index}>
                  <td>{row.indicator_id}</td>
                  <td>{row.area_name}</td>
                  <td>{row.time_period}</td>
                  <td>{row.value}</td>
                </tr>
                ))
               ) : (
                // stops crash - displays message //
                <tr>
                  <td colSpan="4">⚠️ No data available — database connection failed</td>
                </tr>
                )
              }
            </tbody>
          </table>
        */}
