import { useEffect, useState } from 'react';
import axios from 'axios';

function MostRecentCitywide() {
  const [data, setData] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:5001/api/railway/latest-indicators/citywide')
      .then(res => setData(res.data))
      .catch(err => console.error('Error:', err));
  }, []);

  return (
    <div>
      <h2>Latest Indicator Values (Citywide)</h2>
      <ul>
        {data.map(row => (
          <li key={row.indicator_id}>
            ID {row.indicator_id}: {row.value} ({row.time_period})
          </li>
        ))}
      </ul>
    </div>
  );
}

export default MostRecentCitywide;