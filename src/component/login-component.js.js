import React, { Component } from "react";
import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import CheckButton from "react-validation/build/button";
import admin from '../image/admin.png';
import { withRouter } from "react-router-dom";

import dwuser from "../services/dw-user";

const required = value => {
  if (!value) {
    return (
      <div className="alert alert-danger" role="alert">
        This field is required!
      </div>
    );
  }
};
  const passwordwarn = value => {
    if (value.length < 6 || value.length > 40) {
      return (
        <div className="alert alert-danger" role="alert">
          The password must be between 6 and 40 characters.
        </div>
      );
    }
  };

 class Login extends Component {
  constructor(props) {
    super(props);
    this.handleLogin = this.handleLogin.bind(this);
    this.onChangeusername = this.onChangeusername.bind(this);
    this.onChangePassword = this.onChangePassword.bind(this);

    this.state = {
      username: "",
      password: "",
      loading: false,
      message: ""
    };
  }

  onChangeusername(e) {
    this.setState({
      username: e.target.value
    });
  }

  onChangePassword(e) {
    this.setState({
      password: e.target.value
    });
  }

  handleLogin(e) {
    e.preventDefault();

    this.setState({
      message: "",
      loading: true
    });

    this.form.validateAll();

    if (this.checkBtn.context._errors.length === 0) {
        dwuser.loginuser(this.state.username, this.state.password).then(
        () => {

          this.props.history.push("/user/home");
          window.location.reload();
        },
        error => {
          const resMessage =
            (error.response &&
              error.response &&
              error.response.message) ||
            error.message ||
            error.toString();

          this.setState({
            loading: false,
            message: resMessage
          });
        }
      );
    } else {
      this.setState({
        loading: false
      });
    }
  }

  render() {
    return (
      <div className="col-md-12">
        <div className="card card-container">
          <img
            src={admin}
            alt="admin-img"
            className="profile-img-card"
          />

          <Form
            onSubmit={this.handleLogin}
            ref={c => {
              this.form = c;
            }}
          >
            <div className="form-group">
              <label htmlFor="username" className="boldlight">username <strong className="red">*</strong></label>
              <Input
                type="text"
                className="form-control"
                name="username"
                value={this.state.username}
                onChange={this.onChangeusername}
                validations={[required]}
              />
            </div>

            <div className="form-group">
              <label htmlFor="password" className="boldlight" >Password <strong className="red">*</strong></label>
              <Input
                type="password"
                className="form-control"
                name="password"
                value={this.state.password}
                onChange={this.onChangePassword}
                validations={[required,passwordwarn]}
              />
            </div>

            <div className="form-group">
              <button
                className="btn btn-grad btn-block"
                disabled={this.state.loading}
              >
                {this.state.loading && (
                  <span className="spinner-border spinner-border-sm"></span>
                )}
                <span><strong> ✓</strong> Login</span>
              </button>
            </div>

            {this.state.message && (
              <div className="form-group">
                <div className="alert alert-danger" role="alert">
                  {this.state.message}
                </div>
              </div>
            )}
            <CheckButton
              style={{ display: "none" }}
              ref={c => {
                this.checkBtn = c;
              }}
              
            />
          </Form>
          <footer className="footer">
            <p className="boldlightcenter"> - shamsudheenkc/metrictreelab-interview task2020</p>
            <small  className="form-text text-muted text-center">Dont have an account <a href='./signup'><i className="text-primary" style={{textDecoration:"underline"}}>Signup</i></a> </small>

          </footer>
        </div>
        
      </div>
    );
  }
}
export default withRouter(Login)
