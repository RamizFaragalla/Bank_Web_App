import React from 'react';

function MoneyTransfer({ transfer_date, description, amount, sender_account_num, sender_account_type, sender_first_name, sender_last_name, recipient_account_num, recipient_account_type, recipient_first_name, recipient_last_name }) {
  return (
    <div className="col-10 col-md-8 col-lg-7">
      <div className="card mb-4 shadow">
        <div className="card-body card-text">
            <div>
                { "Sender: " + sender_first_name + " " + sender_last_name + " [" + sender_account_type + " - " + sender_account_num.toString().substring(sender_account_num.toString().length - 4, sender_account_num.toString().length) + "]" }
            </div>
            <div>
                { "Recipient: " + recipient_first_name + " " + recipient_last_name + " [" + recipient_account_type + " - " + recipient_account_num.toString().substring(recipient_account_num.toString().length - 4, recipient_account_num.toString().length) + "]" }
            </div>
            <div>
                { "Amount: $" + amount }
            </div>
            <div>
                { "Description: " + description }
            </div>
        </div>
        <div className="card-footer small text-muted text-right">
          { transfer_date }
        </div>
      </div>
    </div>
  );
}

export default MoneyTransfer;