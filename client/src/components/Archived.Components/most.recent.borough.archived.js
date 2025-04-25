          {/* <div className="card mb-4">
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
                    {(sortedIndicatorData?.rows || indicatorData?.rows || []).map((row) => (
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
          </div> */}