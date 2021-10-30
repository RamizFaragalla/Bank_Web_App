import React from 'react';
import { Link } from 'react-router-dom';

function Account({ account_num, account_type, balance }) {
  return (
    <div className="col-10 col-md-8 col-lg-7">
      <div className="card mb-4 shadow">
        <div className="card-body card-text">
          <Link to={"/transactions/"+account_num}>{ account_type }</Link>
        </div>
        <div className="card-footer small text-muted text-right">
          { "$" + balance }
        </div>
      </div>
    </div>
  );
}

export default Account;