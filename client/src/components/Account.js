import React from 'react';
import { Link } from 'react-router-dom';

function Account({ account_num, account_type, balance }) {
  return (
    <div className="col-10 col-md-8 col-lg-7">
      <div className="card mb-4 shadow">
        <div className="card-body card-text">
          <div>{account_type}</div>
          <div>
            <Link to={{
              pathname: "/transactions",
              state: account_num
            }}>View Transactions</Link>
          </div>
          <div>
            <Link to={{
              pathname: "/money_transfer_history",
              state: account_num
            }}>Money Transfer History</Link>
          </div>
          <div>
            <Link to={{
              pathname: "/money_transfer",
              state: account_num
            }}>Transfer Money</Link>
          </div>
        </div>
        <div className="card-footer small text-muted text-right">
          { "$" + balance }
        </div>
      </div>
    </div>
  );
}

export default Account;