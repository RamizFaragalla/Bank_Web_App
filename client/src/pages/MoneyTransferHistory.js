import React from 'react';
import MoneyTransfer from '../components/MoneyTransfer';
import Loading from '../components/Loading';
import { Redirect } from 'react-router-dom';

class MoneyTransferHistory extends React.Component {
  state = {
    loading: true,
    moneyTransferHistory: [],
    notFound: false,
  }

  componentDidMount() {
    const account_num = this.props.location.state;

    const requestOptions = {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify(
        {
          account_num: account_num
        }
      )
    };

    fetch("/api/money_transfer_history", requestOptions)
      .then(res => res.json())
      .then(moneyTransferHistory => {
				if (moneyTransferHistory.message === "no money transfer history") {
					this.setState({
						moneyTransferHistory: moneyTransferHistory.message,
						loading: false
					});
				}

				else {
					this.setState({
						moneyTransferHistory: moneyTransferHistory.map((p,ii) => <MoneyTransfer {...p} key={ii} />),
						loading: false,
					});
				}
      })
      .catch(err => {
        this.setState({
          notFound: true,
        });
      });
  }


  render() {
    if(this.state.notFound) return <Redirect to="/" />;
    if(this.state.loading) return <Loading />;
    return this.state.moneyTransferHistory;
  }
}

export default MoneyTransferHistory;