import React, { useState } from 'react';
import LondonMap from '../components/london.map.experimental';
import ExpandedIndicatorData from '../utils/expanded.indicator.data';

const MostRecentBorough = ({
  indicatorList,
  selectedIndicatorId,
  setSelectedIndicatorId,
  indicatorData,
  sortedIndicatorData,
  sortAsc,
  sortByValue,
}) => {

const [sortColumn, setSortColumn] = useState('area_name'); // default sort by Borough
const [sortOrder, setSortOrder] = useState('asc'); // ascending by default

const handleSort = (column) => {
  if (sortColumn === column) {
    // If the user clicks the same column, just flip the sort order
    setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
  } else {
    // If a different column is clicked, set that column and default to ascending
    setSortColumn(column);
    setSortOrder('asc');
  }
};

const selectedIndicatorName =
  indicatorList.find((item) => item.id === selectedIndicatorId)?.name || 'Selected Indicator';

const timePeriod = indicatorData?.title?.split(', ')[1] || '';

  return (
    <div className="container mt-4">
      <h2 className="mb-3">
        {`${selectedIndicatorName}, ${timePeriod}`}
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
                    <th onClick={() => handleSort('area_name')} style={{ cursor: 'pointer' }}>
                      Borough {sortColumn === 'area_name'
                        ? (sortOrder === 'asc' ? '↑' : '↓')
                        : '⇅'}
                    </th>
                    <th onClick={() => handleSort('value')} style={{ cursor: 'pointer' }}>
                      Value {sortColumn === 'value'
                        ? (sortOrder === 'asc' ? '↑' : '↓')
                        : '⇅'}
                    </th>
                    </tr>
                  </thead>
                  <tbody>
                  {[...new Map(indicatorData?.rows
                    ?.filter(row => row.value != null)
                    .map(row => [row.area_name, row])).values()]
                    .sort((a, b) => {
                      if (sortColumn === 'area_name') {
                        return sortOrder === 'asc'
                          ? a.area_name.localeCompare(b.area_name)
                          : b.area_name.localeCompare(a.area_name);
                      } else if (sortColumn === 'value') {
                        return sortOrder === 'asc'
                          ? a.value - b.value
                          : b.value - a.value;
                      }
                      return 0; // fallback if somehow no column matched
                    })
                    .map((row) => (
                      <tr key={row.area_name}>
                        <td>{row.area_name}</td>
                        <td>{`${row.value.toFixed(1)} ${indicatorList.find(i => i.id === selectedIndicatorId)?.unit || ''}`}</td>
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

          <div className="card mb-4">
            <div className="card-body p-2" style={{ fontSize: '0.85rem' }}>
              {(() => {
                const selected = ExpandedIndicatorData.find(ind => ind.id === selectedIndicatorId);
                if (!selected) return null;

                return (
                  <>
                    <h5>{selected.name}</h5>
                    {selected.definition && (
                      <p><strong>Definition:</strong> {selected.definition}</p>
                    )}
                    {selected.rationale && (
                      <p><strong>Rationale:</strong> {selected.rationale}</p>
                    )}
                    {selected.disclosure_control && (
                      <p><strong>Disclosure Control:</strong> {selected.disclosure_control}</p>
                    )}
                    {selected.caveats && (
                      <p><strong>Caveats:</strong> {selected.caveats}</p>
                    )}
                    {selected.notes && (
                      <p><strong>Notes:</strong> {selected.notes}</p>
                    )}
                  </>
                );
              })()}
            </div>
          </div>



        </div>
      </div>

    </div>
  );
};

export default MostRecentBorough;