import { useEffect, useState } from 'react';
import axios from 'axios';

function TrendsCitywide() {
  const [data, setData] = useState([]);

  // Just pick one indicator (hardcoded for now)
  const indicatorId = "90362";
  const indicatorName = "Breastfeeding at 6–8 weeks";
  const indicatorUnit = "%";

  useEffect(() => {
    axios
      .get(`https://fingertips-production-ca6d.up.railway.app/api/railway/history/citywide/${indicatorId}`)
      .then(res => setData(res.data))
      .catch(err => console.error('Error fetching trends:', err));
  }, []);

  return (
    <div>
      <h2>Citywide Trends</h2>
      <h3>{indicatorName}</h3>
      <ul>
        {data.map((entry, idx) => (
          <li key={idx}>
            {entry.time_period}: {entry.value} {indicatorUnit}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default TrendsCitywide;