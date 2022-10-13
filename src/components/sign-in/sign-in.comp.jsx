import React from 'react';
import axios from 'axios';

export default class Signin extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: ''
    };
    this.onInputChange = this.onInputChange.bind(this);
    this.onSubmitSignIn = this.onSubmitSignIn.bind(this);
  }

  onInputChange(ev) {
    const { value, name } = ev.target;

    console.log(name, value);

    this.setState({ [name]: value });
  }

  onSubmitSignIn(ev) {
    ev.preventDefault();

    const { email, password } = this.state;
    const { onRouteChange, loadUser } = this.props;

    axios
      .post('http://localhost:3000/signin', {
        email,
        password
      })

      .then(resp => {
        const { user } = resp.data;

        loadUser(user);
        onRouteChange('home');
      })
      .catch(error => {
        console.log(error);
        this.setState({ email: '', password: '' });
      });
  }

  render() {
    const { onRouteChange } = this.props;
    const { email, password } = this.state;

    return (
      <article className="br3 ba b--black-10 mv4 w-100 w-50-m mw6  center shadow-5">
        <main className="pa4 black-80">
          <form className="measure">
            <fieldset id="sign_up" className="ba b--transparent ph0 mh0">
              <legend className="f1 fw6 ph0 mh0">Sign In</legend>
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
                />
              </div>
            </fieldset>
            <div>
              <input
                className="b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6 dib"
                type="submit"
                onClick={this.onSubmitSignIn}
                value="Sign in"
              />
            </div>
            <div className="lh-copy mt3">
              {/* eslint-disable-next-line */}
              <p
                onClick={() => onRouteChange('register')}
                className="f6 link dim black db pointer"
              >
                Register
              </p>
            </div>
          </form>
        </main>
      </article>
    );
  }
}
