import React from 'react';
import Loading from '../components/Loading';

const appStyle = {
	height: '250px',
  display: 'flex'
};

const formStyle = {
  margin: 'auto',
  padding: '10px',
  border: '1px solid #c9c9c9',
  borderRadius: '5px',
  background: '#f5f5f5',
  width: '220px',
  display: 'block'
};

const labelStyle = {
  margin: '10px 0 5px 0',
  fontFamily: 'Arial, Helvetica, sans-serif',
  fontSize: '15px',
};

const inputStyle = {
  margin: '5px 0 10px 0',
  padding: '5px', 
  border: '1px solid #bfbfbf',
  borderRadius: '3px',
  boxSizing: 'border-box',
  width: '100%'
};

const submitStyle = {
  margin: '10px 0 0 0',
  padding: '7px 10px',
  border: '1px solid #efffff',
  borderRadius: '3px',
  background: '#3085d6',
  width: '100%', 
  fontSize: '15px',
  color: 'white',
  display: 'block'
};

const Field = React.forwardRef(({label, type}, ref) => {
    return (
    <div>
        <label style={labelStyle} >{label}</label>
        <input ref={ref} type={type} style={inputStyle} />
    </div>
    );
});

const Form = ({onSubmit}) => {
  const recipient_account_num_ref = React.useRef();
  const amount_ref = React.useRef();
  const description_ref = React.useRef();

  const handleSubmit = e => {
      e.preventDefault();
      const data = {
        recipient_account_num: recipient_account_num_ref.current.value,
        amount: amount_ref.current.value,
        description: description_ref.current.value
      };
      onSubmit(data);
  };
  return (
    <form style={formStyle} onSubmit={handleSubmit} >
      <Field ref={recipient_account_num_ref} label="recipient_account_num:" type="text" />
      <Field ref={amount_ref} label="amount:" type="text" />
      <Field ref={description_ref} label="description:" type="text" />
      <div>
        <button style={submitStyle} type="submit">Transfer Money</button>
      </div>
    </form>
  );
};

class MoneyTransfer extends React.Component {
  state = {
    output: null,
    loading: false,
  }

  handleSubmit = data => {
    const { sender_account_num } = this.props.match.params;

    this.setState({
      loading: true
    });
    const requestOptions = {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(
            {
                sender_account_num: sender_account_num,
                recipient_account_num: data.recipient_account_num,
                amount: data.amount,
                description: data.description
            }
        )
    };

    fetch("/api/money_transfer", requestOptions)
      .then(res => res.json())
      .then(data => {
        if (data.message !== "money transfer is successful") {
          this.setState({
            output: data.message,
            loading: false
          });
        }

        else {
          this.setState({
            output: data.message,
            loading: false
          });
        }
      })
      .catch(err => {
        console.log("API ERROR: ", err);
        this.setState({
          output: "API ERROR",
          loading: false
        });
      });
  };

  render() {
    if(this.state.loading) {
      return <Loading />;
    }

    return (
        <div>
          <div>
            Money Transfer
          </div>

          <br/>

          <div style={appStyle}>
          <Form onSubmit={this.handleSubmit} />
          </div>

          <br/><br/><br/><br/>

          <div>
            {this.state.output}
          </div>

      </div>
    );
  }
}

export default MoneyTransfer;