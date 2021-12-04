import React from 'react';
import Transaction from '../components/Transaction';
import Loading from '../components/Loading';
import { Redirect } from 'react-router-dom';

class Transactions extends React.Component {
  state = {
    loading: true,
    transactions: [],
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

    fetch("/api/transactions", requestOptions)
      .then(res => res.json())
      .then(transactions => {
        if (transactions.message === "account doesn't have any transactions") {
          this.setState({
            transactions: transactions.message,
            loading: false,
          });
        }

        else {
          this.setState({
            transactions: transactions.map((p,ii) => <Transaction {...p} key={ii} />),
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
    return this.state.transactions;
  }
}

export default Transactions;