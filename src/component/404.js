import React, { Component } from "react";
import { withRouter } from "react-router-dom"; //cant use hooks in class coponent thats why this
import oop from '../image/404.svg';
import dwuser from "../services/dw-user";
 class NoMatch extends Component {
  constructor(props) {
      super(props);
  
      this.state = {
        
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
            currentUser: user,
            successful: true,
  
          });
        }
      }
    render() {
      const { currentUser } = this.state;
      const { location ,history} = this.props // exporting withrouter can access this
      return (
        <div className="col-md-12" style={{marginTop:"-100px"}}>
              
        <img
          src={oop}
          alt="404"
          className="profile-img-card1"
        />
      <div className="form-group">
            <div className=" text-center" role="alert">
              <strong style={{fontSize:"30px"}}>Ooops!</strong>
              <br></br>
              <strong style={{fontSize:"25px"}}>Look like you're lost 🧞‍♂️</strong>
              <br></br>the page  
              <strong className="text-secondary"> {location.pathname} 👀 </strong> you are looking for not available! <br></br>  <br></br>
              <div>
              {currentUser ? (
                <a href onClick={()=> this.props.history.push('/user/home')}><button className="btn btn-grad button-big"><span><strong></strong>⨠ Go back to Home</span></button> </a>
              ):(
                <a href onClick={()=> history.push('/user/login')}><button className="btn btn-grad button-big"><span><strong></strong>⨠ Login here </span></button> </a>
              )}
                </div>
            </div>
      </div>
    </div>
  
      );
    }
  }

  export default withRouter(NoMatch)


  
