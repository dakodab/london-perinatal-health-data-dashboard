import React from 'react';

const IndicatorTable = ({ data, sortedData, sortAsc, sortByValue, selectedIndicatorId, indicatorList }) => {
  return (
    <>
      <table className="table table-bordered sortable-table mb-4">
        <thead>
          <tr>
            <th>Borough</th>
            <th style={{ cursor: 'pointer', userSelect: 'none' }} onClick={sortByValue}>
              Value {sortAsc ? '↑' : '↓'}
            </th>
          </tr>
        </thead>
        <tbody>
          {(sortedData ? sortedData.rows : data.rows).map((row) => (
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
    </>
  );
};

export default IndicatorTable;