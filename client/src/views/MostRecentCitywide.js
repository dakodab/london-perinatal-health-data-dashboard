import { useEffect, useState } from 'react';
import axios from 'axios';

function MostRecentCitywide({ indicatorList }) {
  const [data, setData] = useState([]);

  useEffect(() => {
    axios
      .get('https://fingertips-production-ca6d.up.railway.app/api/railway/latest-indicators/citywide')
      .then(res => setData(res.data))
      .catch(err => console.error('Error:', err));
  }, []);

  const getIndicatorMeta = (id) => {
    return indicatorList.find(indicator => indicator.id === String(id));
  };

  return (
    <div>
      <h2>Latest Indicator Values (Citywide)</h2>
      <ul>
        {data.map(row => {
          const meta = getIndicatorMeta(row.indicator_id);
          return (
            <li key={row.indicator_id}>
              {meta ? meta.name : `ID ${row.indicator_id}`}: {row.value} {meta?.unit || ''} ({row.time_period})
            </li>
          );
        })}
      </ul>
    </div>
  );
}

export default MostRecentCitywide;