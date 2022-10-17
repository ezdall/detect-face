import React from 'react';
import axios from 'axios';

export default class Register extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      email: '',
      password: ''
    };
    this.onInputChange = this.onInputChange.bind(this);
    this.onSubmitRegister = this.onSubmitRegister.bind(this);
  }

  onInputChange(ev) {
    const { value, name } = ev.target;

    this.setState({ [name]: value });
  }

  onSubmitRegister(ev) {
    ev.preventDefault();

    const { name, email, password } = this.state;
    const { onRouteChange } = this.props;

    if (!name || !email || !password) {
      return;
    }

    axios
      .post(`${process.env.REACT_APP_API_URL}/register`, {
        name,
        email,
        password
      })
      .then(resp => {
        // const { user } = resp.data;
        console.log(resp);

        // loadUser(user);
        onRouteChange('signin');
      })
      .catch(error => {
        console.log(error);
        this.setState({ name: '', email: '', password: '' });
      });
  }

  render() {
    const { name, email, password } = this.state;

    return (
      <article className="br3 ba b--black-10 mv4 w-100 w-50-m mw6 center shadow-5">
        <main className="pa4 black-80">
          <form className="measure">
            <fieldset id="sign_up" className="ba b--transparent ph0 mh0">
              <legend className="f1 fw6 ph0 mh0">Register</legend>
              <div className="mt3">
                <label className="db fw6 lh-copy f6" htmlFor="name">
                  Name
                </label>
                <input
                  className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100"
                  type="text"
                  name="name"
                  id="name"
                  onChange={this.onInputChange}
                  value={name}
                />
              </div>
              <div className="mt3">
                <label className="db fw6 lh-copy f6" htmlFor="email-address">
                  Email
                </label>
                <input
                  className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100"
                  type="email"
                  name="email"
                  id="email-address"
                  onChange={this.onInputChange}
                  value={email}
                  required
                />
              </div>
              <div className="mv3">
                <label className="db fw6 lh-copy f6" htmlFor="password">
                  Password
                </label>
                <input
                  className="b pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100"
                  type="password"
                  name="password"
                  id="password"
                  onChange={this.onInputChange}
                  value={password}
                  required
                />
              </div>
            </fieldset>
            <div>
              <input
                className="b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6 dib"
                type="submit"
                onClick={this.onSubmitRegister}
                value="Register"
              />
            </div>
          </form>
        </main>
      </article>
    );
  }
}
