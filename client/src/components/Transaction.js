import React from 'react';

function Transaction({ description, amount, transaction_date }) {
  return (
    <div className="col-10 col-md-8 col-lg-7">
      <div className="card mb-4 shadow">
        <div className="card-body card-text">
            { description + ": $" + amount }
        </div>
        <div className="card-footer small text-muted text-right">
          { transaction_date }
        </div>
      </div>
    </div>
  );
}

export default Transaction;