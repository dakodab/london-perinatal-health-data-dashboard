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
    // 1. Pregnancies
    [
      'General fertility rate',
      'Percentage of deliveries to women from ethnic minority groups',
      'Under 18s conception rate',
      'Under 18s births rate',
      'Teenage mothers'
    ],
    // 2. Maternal Health
    [
      'Early Access to Maternity Care',
      'Ectopic pregnancy admissions rate',
      'Smoking status at time of delivery'
    ],
    // 3. Birth Outcomes
    [
      'Caesarean section %',
      'Multiple births',
      'Low birth weight of all babies',
      'Low birth weight of term babies',
      'Very low birth weight of all babies',
      'Premature births (less than 37 weeks gestation)',
      'Stillbirth rate'
    ],
    // 4. Infant Health and Care
    [
      "Baby's first feed breastmilk",
      'Admissions of babies under 14 days'
    ]
  ];

  // Helper to render indicator row
  const renderIndicator = (row, isLargeTitle = false) => {
    const meta = getIndicatorMeta(row.indicator_id);
    return (
      <div key={row.indicator_id} className="mb-2">
        {meta?.name === 'Early Access to Maternity Care' ? (
          <div><span className="value-positive">{Math.round(row.value)}%</span>{` of pregnant people had access to maternity care (`}<em>{row.time_period}</em>{`)`}</div>
        ) : meta?.name === 'General fertility rate' ? (
          <div><span className="value-neutral">{Math.round(row.value)}</span>{` in 1,000 females aged 15 to 44 years gave birth (`}<em>{row.time_period}</em>{`)`}</div>
        ) : meta?.name === 'Under 18s conception rate' ? (
          <div><span className="value-neutral">{Math.round(row.value)}</span>{` in 1,000 females aged 15–17 became pregnant (`}<em>{row.time_period}</em>{`)`}</div>
        ) : meta?.name === 'Stillbirth rate' ? (
          <div><span className="value-risk">{Math.round(row.value)}</span>{` in 1,000 births were stillbirths (`}<em>{row.time_period}</em>{`)`}</div>
        ) : meta?.name === 'Low birth weight of term babies' ? (
          <div><span className="value-risk">{Math.round(row.value)}%</span>{` of term babies were born weighing less than 2.5kg (`}<em>{row.time_period}</em>{`)`}</div>
        ) : meta?.name === 'Ectopic pregnancy admissions rate' ? (
          <div><span className="value-risk">{Math.round(row.value)}</span>{` in 100,000 women aged 15–44 years were admitted to hospital with an ectopic pregnancy (`}<em>{row.time_period}</em>{`)`}</div>
        ) : meta?.name === 'Premature births (less than 37 weeks gestation)' ? (
          <div><span className="value-risk">{Math.round(row.value)}</span>{` in 1,000 births were premature (`}<em>{row.time_period}</em>{`)`}</div>
        ) : meta?.name === 'Under 18s births rate' ? (
          <div><span className="value-neutral">{Math.round(row.value)}</span>{` in 1,000 females aged 15–17 gave birth to a living baby (`}<em>{row.time_period}</em>{`)`}</div>
        ) : meta?.name === 'Smoking status at time of delivery' ? (
          <div><span className="value-risk">{Math.round(row.value)}%</span>{` of mothers were smokers at the time of delivery (`}<em>{row.time_period}</em>{`)`}</div>
        ) : meta?.name === 'Very low birth weight of all babies' ? (
          <div><span className="value-risk">{Math.round(row.value)}%</span>{` of babies were born weighing less than 1.5kg (`}<em>{row.time_period}</em>{`)`}</div>
        ) : meta?.name === 'Low birth weight of all babies' ? (
          <div><span className="value-risk">{Math.round(row.value)}%</span>{` of babies were born weighing less than 2.5kg (`}<em>{row.time_period}</em>{`)`}</div>
        ) : meta?.name === 'Multiple births' ? (
          <div><span className="value-neutral">{Math.round(row.value)}</span>{` in 1,000 maternities resulted in multiple births (`}<em>{row.time_period}</em>{`)`}</div>
        ) : meta?.name === 'Teenage mothers' ? (
          <div><span className="value-neutral">{Number(row.value).toFixed(1)}%</span>{` of deliveries were to mothers under 18 years old (`}<em>{row.time_period}</em>{`)`}</div>
        ) : meta?.name === 'Percentage of deliveries to women from ethnic minority groups' ? (
          <div><span className="value-neutral">{Math.round(row.value)}%</span>{` of deliveries were to women from ethnic minority groups (`}<em>{row.time_period}</em>{`)`}</div>
        ) : meta?.name === 'Caesarean section %' ? (
          <div><span className="value-neutral">{Math.round(row.value)}%</span>{` of babies were delivered by c-section (`}<em>{row.time_period}</em>{`)`}</div>
        ) : meta?.name === 'Admissions of babies under 14 days' ? (
          <div><span className="value-risk">{Math.round(row.value)}</span>{` in 1,000 babies were admitted to emergency care before reaching two weeks old (`}<em>{row.time_period}</em>{`)`}</div>
        ) : meta?.name === "Baby's first feed breastmilk" ? (
          <div><span className="value-neutral">{Math.round(row.value)}%</span>{` of babies’ first feed was breastmilk (`}<em>{row.time_period}</em>{`)`}</div>
        ) : (
          <div>
            <strong style={isLargeTitle ? { fontSize: '1.1rem' } : {}}>
              {meta ? meta.name : `ID ${row.indicator_id}`}
            </strong>: <span>{Math.round(row.value)}</span> {meta?.unit || ''} (<em>{row.time_period}</em>)
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
                  { i === 0 && <h5 className="card-title">Pregnancies</h5> }
                  { i === 1 && <h5 className="card-title">Maternal Health</h5> }
                  { i === 2 && <h5 className="card-title">Birth Outcomes</h5> }
                  { i === 3 && <h5 className="card-title">Infant Health and Care</h5> }
                  {names.map(name => {
                    const row = indicators.find(r => {
                      const meta = getIndicatorMeta(r.indicator_id);
                      return meta && meta.name === name;
                    });
                    return row ? renderIndicator(row, i < 3) : null;
                  })}
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