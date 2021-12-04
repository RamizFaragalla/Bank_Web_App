import React from 'react';
import Account from '../components/Account';
import Loading from '../components/Loading';


class Accounts extends React.Component {
  state = {
    accounts: [],
    loading: true,
  }

  componentDidMount() {
    fetch("/api/accounts/" + sessionStorage.getItem("customer_id"))
      .then(res => res.json())
      .then(accounts => {
        this.setState({
          loading: false,
          accounts: accounts.map((p,ii) => <Account {...p} key={ii} />),
        });
      })
      .catch(err => console.log("API ERROR: ", err));
  }

  render() {
    if(this.state.loading) {
      return <Loading />;
    }

    return (
      <div className="container-fluid text-center">
        <div> {"Welcome " + sessionStorage.getItem("first_name") + "!"} </div>
        <br/>
        <div className="row justify-content-center">
          { this.state.accounts }
        </div>
      </div>
    );
  }
}

export default Accounts;