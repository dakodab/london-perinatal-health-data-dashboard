import { useEffect, useState } from 'react';
import axios from 'axios';
import ExpandedIndicatorData from '../utils/expanded.indicator.data'

function MostRecentCitywide({ indicatorList }) {
  const [data, setData] = useState([]);

  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_API_URL}/api/railway/latest-indicators/citywide`)
      .then(res => {
        const filtered = res.data.filter(row => indicatorList.some(ind => String(ind.id) === String(row.indicator_id)));
        setData(filtered);
      })
      .catch(err => console.error('Error:', err));
  }, []);

  const getIndicatorMeta = (id) => {
    return indicatorList.find(indicator => indicator.id === String(id));
  };

  // Helper: filter data by indicator name
  const findByNames = (names) =>
    data.filter(row => {
      const meta = getIndicatorMeta(row.indicator_id);
      return meta && names.includes(meta.name);
    });

  // Cards grouping logic
  const cardGroups = [
    // 1. Early Access to Maternity Care
    ['Early Access to Maternity Care'],
    // 2. General fertility rate
    ['General fertility rate'],
    // 3. Percentage of deliveries to women from ethnic minority groups
    ['Percentage of deliveries to women from ethnic minority groups'],
    // 4. Low birth weight group
    [
      // 'Low Birth Weight (alt method)',
      'Low birth weight of term babies',
      'Low birth weight of all babies',
      'Very low birth weight of all babies'
    ],
    // 5. Under 18/teenage group
    [
      'Under 18s conception rate',
      'Under 18s births rate',
      'Teenage mothers'
    ],
    // 6. Premature/smoking/feeding group
    [
      'Premature births',
      'Caesarean section',
      'Multiple births',
      'Smoking status at time of delivery',
      "Baby's first feed breastmilk"
    ],
    // 7. Ectopic/stillbirth/admissions group
    [
      'Ectopic pregnancy admissions rate',
      'Admissions of babies under 14 days',
      'Stillbirth rate'
    ]
  ];

  // Helper to render indicator row
  const renderIndicator = (row, isLargeTitle = false) => {
    const meta = getIndicatorMeta(row.indicator_id);
    return (
      <div key={row.indicator_id} className="mb-2">
        {meta?.name === 'Early Access to Maternity Care' ? (
          <div>{`${Math.round(row.value)}% of pregnant people had access to maternity care in their first 10 weeks of pregnancy (`}<em>{row.time_period}</em>{`)`}</div>
        ) : meta?.name === 'General fertility rate' ? (
          <div>{`${Math.round(row.value)} in 1,000 females aged 15 to 44 years gave birth (`}<em>{row.time_period}</em>{`)`}</div>
        ) : meta?.name === 'Under 18s conception rate' ? (
          <div>{`${Math.round(row.value)} in 1,000 females aged 15–17 became pregnant (`}<em>{row.time_period}</em>{`)`}</div>
        ) : meta?.name === 'Stillbirth rate' ? (
          <div>{`${Math.round(row.value)} in 1,000 births were stillbirths (`}<em>{row.time_period}</em>{`)`}</div>
        ) : meta?.name === 'Low birth weight of term babies' ? (
          <div>{`${Math.round(row.value)}% of term babies were born weighing less than 2.5kg (`}<em>{row.time_period}</em>{`)`}</div>
        ) : meta?.name === 'Ectopic pregnancy admissions rate' ? (
          <div>{`${Math.round(row.value)} in 100,000 women aged 15–44 years were admitted to hospital with an ectopic pregnancy (`}<em>{row.time_period}</em>{`)`}</div>
        ) : meta?.name === 'Premature births (less than 37 weeks gestation)' ? (
          <div>{`${Math.round(row.value)} in 1,000 births were premature (`}<em>{row.time_period}</em>{`)`}</div>
        ) : meta?.name === 'Under 18s births rate' ? (
          <div>{`${Math.round(row.value)} in 1,000 females aged 15–17 gave birth to a living baby (`}<em>{row.time_period}</em>{`)`}</div>
        ) : meta?.name === 'Smoking status at time of delivery' ? (
          <div>{`${Math.round(row.value)}% of mothers were smokers at the time of delivery (`}<em>{row.time_period}</em>{`)`}</div>
        ) : meta?.name === 'Very low birth weight of all babies' ? (
          <div>{`${Math.round(row.value)}% of babies were born weighing less than 1.5kg (`}<em>{row.time_period}</em>{`)`}</div>
        ) : meta?.name === 'Low birth weight of all babies' ? (
          <div>{`${Math.round(row.value)}% of babies were born weighing less than 2.5kg (`}<em>{row.time_period}</em>{`)`}</div>
        ) : meta?.name === 'Multiple births' ? (
          <div>{`${Math.round(row.value)} in 1,000 maternities resulted in multiple births (`}<em>{row.time_period}</em>{`)`}</div>
        ) : meta?.name === 'Teenage mothers' ? (
          <div>{`${Number(row.value).toFixed(1)}% of deliveries were to mothers under 18 years old (`}<em>{row.time_period}</em>{`)`}</div>
        ) : meta?.name === 'Percentage of deliveries to women from ethnic minority groups' ? (
          <div>{`${Math.round(row.value)}% of deliveries were to women from ethnic minority groups (`}<em>{row.time_period}</em>{`)`}</div>
        ) : meta?.name === 'Caesarean section %' ? (
          <div>{`${Math.round(row.value)}% of babies were delivered by c-section (`}<em>{row.time_period}</em>{`)`}</div>
        ) : meta?.name === 'Admissions of babies under 14 days' ? (
          <div>{`${Math.round(row.value)} in 1,000 babies were admitted to emergency care before reaching two weeks old (`}<em>{row.time_period}</em>{`)`}</div>
        ) : meta?.name === "Baby's first feed breastmilk" ? (
          <div>{`${Math.round(row.value)}% of babies’ first feed was breastmilk (`}<em>{row.time_period}</em>{`)`}</div>
        ) : (
          <div>
            <strong style={isLargeTitle ? { fontSize: '1.1rem' } : {}}>
              {meta ? meta.name : `ID ${row.indicator_id}`}
            </strong>: {Math.round(row.value)} {meta?.unit || ''} (<em>{row.time_period}</em>)
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="container">
      <h2>London Perinatal Health Snapshot</h2>
      <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-3">
        {cardGroups.map((names, i) => {
          const indicators = findByNames(names);
          if (indicators.length === 0) return null;
          return (
            <div className="col" key={i}>
              <div className="card">
                <div className="card-body">
                  {i === 3 && <h5 className="card-title">Birth Weight</h5>}
                  {i === 4 && <h5 className="card-title">Teenage Pregnancy and Birth</h5>}
                  {i === 5 && <h5 className="card-title">Birth Circumstances</h5>}
                  {i === 6 && <h5 className="card-title">Mortality and Morbidity</h5>}
                  {indicators.map(row => renderIndicator(row, i < 3))}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default MostRecentCitywide;