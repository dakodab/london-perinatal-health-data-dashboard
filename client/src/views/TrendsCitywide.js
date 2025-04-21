import { useEffect, useState } from 'react';
import axios from 'axios';

function TrendsCitywide({ indicatorId, indicatorList }) {
  const [data, setData] = useState([]);

  useEffect(() => {
    axios
      .get(`https://fingertips-production-ca6d.up.railway.app/api/railway/history/citywide/${indicatorId}`)
      .then(res => setData(res.data))
      .catch(err => console.error('Error fetching trends:', err));
  }, [indicatorId]);

  const indicatorMeta = indicatorList.find(ind => ind.id === String(indicatorId));

  return (
    <div>
      <h2>Citywide Trends</h2>
      <h3>{indicatorMeta ? indicatorMeta.name : `Indicator ${indicatorId}`}</h3>
      <ul>
        {data.map((entry, idx) => (
          <li key={idx}>
            {entry.time_period}: {entry.value} {indicatorMeta?.unit || ''}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default TrendsCitywide;