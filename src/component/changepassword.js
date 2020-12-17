import React, { Component } from "react";
import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import CheckButton from "react-validation/build/button";
import profile from '../image/profile.png';

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
  

 

  export default class ChangePassword extends Component {
    constructor(props) {
      super(props);
      this.handleLogin = this.handleLogin.bind(this);
      this.onchangeusername = this.onchangeusername.bind(this);
      this.onchangepassword = this.onchangepassword.bind(this);
  
      this.state = {
        currentuser: {
          username: "",
          password: ""
            },
            currentUser: undefined,
            successful: false,

            loading: false,
        message: ""
      };
      
    }
    componentDidMount() {
        const user = dwuser.getcurrentUser();
    
        if (user) {
          this.setState({
            currentUser: user
          });
        }
      }

  logOut() {
    dwuser.logout();
  }

    onchangeusername(e) {
        const username = e.target.value;
    
        this.setState(function(prevState) {
          return {
            currentuser: {
              ...prevState.currentuser,
              username: username
            }
          };
        });
      }
    
      onchangepassword(e) {
        const password = e.target.value;
        
        this.setState(prevState => ({
            currentuser: {
            ...prevState.currentuser,
            password: password
          }
        }));
      }

  handleLogin(e) {
    e.preventDefault();

    this.setState({
      message: "",
      successful: false,
      loading: true
    });

    this.form.validateAll();

    if (this.checkBtn.context._errors.length === 0) {
        dwuser.updateuser(      
this.state.currentUser.uid,
            this.state.currentuser.username,
            this.state.currentuser.password
        )
        .then((response) => {
            console.log(response);
            this.setState({
                message: response.data.message,
                successful: true
              });

        //   this.props.history.push("/updatedsucessfully");
          // window.location.reload();
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
            successful: false,
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
    const { currentuser } = this.state;
    const { currentUser} = this.state;
    // const {successful} =this.state;


    return (
        
      <div className="col-md-12">
         <div className="card card-container">

        <div className="edit-form ">
          <img
            src={profile}
            alt="profile-img"
            className="profile-img-card"
          />

          <Form
            onSubmit={this.handleLogin}
            ref={c => {
              this.form = c;
            }}
          >
        {!this.state.successful && (
        <div>
            <div className="form-group">
              <label htmlFor="username" className="boldlight">New username <strong className="red">*</strong></label>
              <Input
                type="text"
                className="form-control"
                name="username"
                value={currentuser.username}
                  onChange={this.onchangeusername}
                validations={[required]}
              />
            </div>

            <div className="form-group">
              <label htmlFor="password" className="boldlight" >New Password <strong className="red">*</strong></label>
              <Input
                type="password"
                className="form-control"
                name="password"
                value={currentuser.password}
                  onChange={this.onchangepassword}
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
                <span><strong> ✓</strong> Update</span>
              </button>
            </div>
        </div>            
        )}

            {this.state.message && (
              <div className="form-group">
                <div className={
                    this.state.successful
                      ? "alert text-center alert-success"
                      : "alert alert-danger"
                  }
                  role="alert">
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
            {this.state.successful && (

             <div className="alert  text-center" role="alert">
                               <a href="/user/login" className="nav-link text-black-50"><button className="btn btn-grad button-big"><span><strong></strong>⨠ Go back</span>
 </button></a>
 </div>
         )}

          </Form>
        </div>
    </div>
      </div>
    );
  }
}
