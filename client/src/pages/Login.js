import React from 'react';
import { Redirect } from 'react-router-dom';

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
  const usernameRef = React.useRef();
  const passwordRef = React.useRef();
  const handleSubmit = e => {
      e.preventDefault();
      const data = {
          username: usernameRef.current.value,
          password: passwordRef.current.value
      };
      onSubmit(data);
  };
  return (
    <form style={formStyle} onSubmit={handleSubmit} >
      <Field ref={usernameRef} label="Username:" type="text" />
      <Field ref={passwordRef} label="Password:" type="password" />
      <div>
        <button style={submitStyle} type="submit">Login</button>
      </div>
    </form>
  );
};

class Login extends React.Component {
  state = {
    error: false,
    redirect: false
  }

  handleSubmit = data => {
    const requestOptions = {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({username: data.username, password: data.password})
    };
    fetch("/api/login", requestOptions)
      .then(response => response.json())
      .then(data => {
        if (data.message === "invalid username or password") {
          this.setState({
            error: true
          });
        }

        else {
          sessionStorage.setItem("customer_id", data.customer_id);
          sessionStorage.setItem("first_name", data.first_name);
          sessionStorage.setItem("last_name", data.last_name);

          this.setState({
            redirect: true
          });
        }
      });
  };
  
  render() {
    return (
      <div>
        <div style={appStyle}>
          <Form onSubmit={this.handleSubmit} />
        </div>
        <div>
          
          <h1 style={{color: 'red'}}>{this.state.error ? "invalid username or password" : ""}</h1>
          {this.state.redirect ? <Redirect to="/accounts"/> : ""}
          </div>
      </div>
    );
  }
};

export default Login;
