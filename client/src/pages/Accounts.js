import React from 'react';
import {Link} from 'react-router-dom'

function Accounts() {
    return (
        <div className="container mt-3">
            <div className ="row">
                <div className="col border">
                    <p>Checkings</p>
                    <Link to="/accounts-checkingstransaction"><button type="button">Check Checkings Transactions</button></Link>
                </div>
                <div className="col border">
                    <p>Savings</p>
                    <Link to="/accounts-savingstransaction"><button type="button button-primary">Check Savings Transactions</button></Link>
                </div>
            </div>
        </div>
  );
}

export default Accounts;