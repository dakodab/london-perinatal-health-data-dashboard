import React from 'react';
import LondonMap from '../components/london.map.experimental';

const MostRecentBorough = ({
  indicatorList,
  selectedIndicatorId,
  setSelectedIndicatorId,
  indicatorData,
  sortedIndicatorData,
  sortAsc,
  sortByValue,
}) => {
  return (
    <div className="container mt-4">
      <h2 className="mb-3">
        {`${indicatorList.find((item) => item.id === selectedIndicatorId)?.name || 'Selected Indicator'}, ${indicatorData.title.split(', ')[1]} `}
      </h2>
      <div className="card mb-4">
        <div className="card-body p-2" style={{ fontSize: '0.85rem', overflowX: 'auto' }}>
          <div>
            <label htmlFor="indicator-select" className="me-2">Select an indicator: </label>
            <select className="form-select d-inline-block w-auto"
              id="indicator-select"
              value={selectedIndicatorId}
              onChange={(e) => setSelectedIndicatorId(e.target.value)}
            >
              {indicatorList.map((indicator) => (
                <option key={indicator.id} value={indicator.id}>
                  {indicator.name}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      <div className="row">
        <div className="col-12 col-md-5">
          <div className="card mb-4">
            <div className="card-body p-2" style={{ fontSize: '0.85rem', overflowX: 'auto' }}>
              <div className="table-responsive">
                <table className="table table-bordered table-sm align-middle">
                  <thead>
                    <tr>
                      <th>Borough</th>
                      <th style={{ cursor: 'pointer', whiteSpace: 'nowrap' }} onClick={sortByValue}>
                        Value &nbsp;{sortAsc ? '↑' : '↓'}
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {(sortedIndicatorData ? sortedIndicatorData.rows : indicatorData.rows).map((row) => (
                      <tr key={row.area_name}>
                        <td>
                          {row.area_name === 'Hackney'
                            ? 'Hackney (including City of London)'
                            : row.area_name}
                        </td>
                        <td>
                          {typeof row.value === 'number'
                            ? `${row.value.toFixed(1)}${indicatorList.find(i => i.id === selectedIndicatorId)?.unit || ''}`
                            : 'no data'}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>

        <div className="col-12 col-md-7">
          <div className="card mb-4">
            <div className="card-body p-2" style={{ fontSize: '0.85rem', overflowX: 'auto' }}>
              <LondonMap
                indicatorData={indicatorData.rows}
                unit={indicatorList.find(i => i.id === selectedIndicatorId)?.unit || ''}
              />
            </div>
          </div>
        </div>
      </div>
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
  );
};

export default MostRecentBorough;