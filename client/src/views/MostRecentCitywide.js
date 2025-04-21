import React from 'react';

function MostRecentCitywide() {
  return (
    <div className="text-start">
      <h2>London Perinatal Health Snapshot</h2>
      <p>This section will show citywide-level statistics for the latest time period.</p>
      
      <div className="container">
        <div className="row">
          <div className="col-md-4 mb-4">
            <div className="card h-100">
              <div className="card-body">
                <h5 className="card-title">Early Access to Maternity Care</h5>
                <p className="card-text">Early Access to Maternity Care: </p>
              </div>
            </div>
          </div>

          <div className="col-md-4 mb-4">
            <div className="card h-100">
              <div className="card-body">
                <h5 className="card-title">General fertility rate</h5>
                <p className="card-text">General fertility rate:</p>
              </div>
            </div>
          </div>

          <div className="col-md-4 mb-4">
            <div className="card h-100">
              <div className="card-body">
                <h5 className="card-title">Percentage of deliveries to women from ethnic minority groups</h5>
                <p className="card-text">Percentage of deliveries to women from ethnic minority groups:</p>
              </div>
            </div>
          </div>

          <div className="col-md-4 mb-4">
            <div className="card h-100">
              <div className="card-body">
                <h5 className="card-title">Birth Weight</h5>
                <p className="card-text">
                  Low Birth Weight (alt method):
                  <br/>
                  Low birth weight of term babies:
                  <br/>
                  Low birth weight of all babies:
                  <br/>
                  Very low birth weight of all babies:
                </p>
              </div>
            </div>
          </div>

          <div className="col-md-4 mb-4">
            <div className="card h-100">
              <div className="card-body">
                <h5 className="card-title">Teenage Pregnancy and Birth</h5>
                <p className="card-text">
                Under 18s conception rate:
                <br/>
                Under 18s births rate:
                <br/>
                Teenage mothers:
                </p>
              </div>
            </div>
          </div>

          <div className="col-md-4 mb-4">
            <div className="card h-100">
              <div className="card-body">
                <h5 className="card-title">Birth Circumstances</h5>
                <p className="card-text">
                Premature births (less than 37 weeks gestation):
                <br/>
                Caesarean section %:
                <br/>
                Multiple births:
                <br/>
                Smoking status at time of delivery:
                <br/>
                Baby's first feed breastmilk:
                </p>
              </div>
            </div>
          </div>

          <div className="col-md-4 mb-4">
            <div className="card h-100">
              <div className="card-body">
                <h5 className="card-title">Mortality and Morbidity</h5>
                <p className="card-text">
                  Ectopic pregnancy admissions rate:
                  <br/>
                  Admissions of babies under 14 days:
                  <br/>
                  Stillbirth rate:
                </p>
              </div>
            </div>
          </div>

          <div className="col-md-4 mb-4">
            <div className="card h-100">
              <div className="card-body">
                <h5 className="card-title">Card 8</h5>
                <p className="card-text">Custom content for card 8.</p>
              </div>
            </div>
          </div>

          <div className="col-md-4 mb-4">
            <div className="card h-100">
              <div className="card-body">
                <h5 className="card-title">Card 9</h5>
                <p className="card-text">Custom content for card 9.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default MostRecentCitywide;