import React from "react";

function Help() {
    return (
        <div>
            <h1>How can we help?</h1>
            <img src="https://sportingclass.com/wp-content/uploads/2014/11/Portrait-of-four-smiling-young-business-people-using-laptop-together-at-office-desk.jpg" width={450} height={300}></img>
            
            
            <div className="mt-3">
                <h4><strong>Frequently Asked Questions</strong></h4>
                <p>Where do I find my bank account number and routing number? </p>
                <p>These numbers are located at the bottom of every check. You can also view them in Online Banking and in Mobile Banking.</p>
                <p>How do I access my available balance?</p>
                <p> It's easy to monitor your available balance through Online Banking, Mobile Banking, or by calling 1-800-XBANK. You can also sign up for email and text alerts in Online Banking to help manage your account activity.</p>
                <p>What information is needed for a money transfer?</p>
                <p>To send a wire within the U.S., you will be asked to provide your name, complete street address, SunTrust account number and crediting information. The crediting information includes the bank name, complete street address, routing number and the recipient’s name, complete street address and account number.</p>
            </div>
        </div>

    );
}

export default Help;