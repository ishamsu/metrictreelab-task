import React, { Component } from "react";
// import Button from 'react-bootstrap/Button';
import   Table  from "react-bootstrap/Table";
import userservice from "../services/user-service";
import dwuser from "../services/dw-user";


export default class home extends Component {
  constructor(props) {
    super(props);
    this.handleImageChange = this.handleImageChange.bind(this);
    this.onchangetitle = this.onchangetitle.bind(this);
    this.addcontent = this.addcontent.bind(this);
    this.getalldata = this.getalldata.bind(this);




    this.state = {
        data:[],
        alldata:[],
        currentUser: [] ,
        currentindex:"",
        currentitem:"",
        base64:"",
        title:"",
        search:"",
        currentuserbyid:[],
        message:"",
        loading: false

    };
  }
  componentDidMount() {

    const user = dwuser.getcurrentUser();
    
    if (user) {
      this.setState({
        currentUser: user
      });
    }
    this.getcontent(user.uid);    
    this.getalldata();
    this.getuserbymasterid(user.uid);


    
  }
  setactivetype(item, i) {
    this.setState({
      currentitem: item,
      currentindex: i,
      title:item.title,
    body:item.body
      
    });    
    console.log(item)

  }
  onchangetitle(e) {
    const title = e.target.value;

    this.setState({
        title:title
        
    });
  }
  handleImageChange(e) {
    e.preventDefault();
    let file = this.refs.file.files[0];
    let reader = new FileReader();
    var url = reader.readAsDataURL(file);
    reader.onloadend = () => {
      this.setState({
        file: file,
        base64: reader.result,
      });
      console.log(this.state.base64);
    };
  }
  getalldata() {
    userservice.getalldata()
      .then(response => {
        this.setState({
          alldata: response.data,
          loading: false

        });
        console.log("getalldata",this.state.alldata);


      })
      .catch(e => {
        console.log(e);
      });

  }
  getuserbymasterid(id) {
    userservice.getuserbymasterid(id)
      .then(response => {
        this.setState({
          currentuserbyid: response.data,
        

        });
        console.log("new",this.state.currentuserbyid);


      })
      .catch(e => {
        console.log(e);
      });

  }
 
  
  getcontent(id) {
    userservice.getdatabymasterid(id)
      .then(response => {
        this.setState({
          data: response.data,
        

        });
        console.log("hello",response.data);

        this.setState(prevState => ({
            currentcontent: {
              ...prevState.currentcontent,
              status: response.data
            }
          }));
      })
      .catch(e => {
        console.log(e);
      });

  }
  printDocument = () => {
     var link = document.createElement("a");
      link.download = "my-image-name.pdf";
      link.href = this.state.body;
      
      link.click(); 
     
    
    

  };





  addcontent() {
    var data = {
       title:this.state.title,
       body:this.state.base64,
       author: "hello"
      };
    userservice.createdatabymasterid(
        this.state.currentUser.uid,data)
      .then(response => {
        console.log("fuck",response.data);
        this.setState({
          message: response.data.message,
          submitted: true
        });
        this.getcontent(this.state.currentUser.uid);

      })
      .catch(e => {
        console.log(e);
        this.setState({
            message: 'failed try again'
          });
      });

  }
  updatetable = () => {
    this.getalldata();
    this.setState({
      loading: true,
    });
  };
  // serch data by title
  searchdata = () => {
    const filter="title";
    const searchdata = this.state.data;
    const keyword = this.state.search;
    var filtered = searchdata.filter(function(obj) {
      return obj[filter].toLowerCase() === keyword.toLowerCase();
    });
    this.setState({
      loading: true,
      data:filtered
    });
    console.log('serach', filtered)
  };
  searchdataadmin = () => {
    const filter="title";
    const searchdata = this.state.alldata;
    const keyword = this.state.search;
    var filtered = searchdata.filter(function(obj) {
      return obj[filter].toLowerCase() === keyword.toLowerCase();
    });
    this.setState({
      loading: false,
      alldata:filtered
    });
    console.log('alldata', filtered)
  };
  render() {
    const { currentUser } = this.state;
    const { data, currentindex, currentitem ,title,alldata,currentuserbyid} = this.state;
    console.log("currentitem",currentUser.uid);



    return (
      <div>
                {!currentUser.isadmin ? (

        <div className="card">
          <input
                type="text"
                value={this.state.search}
                style={{ color: "rgba(87, 84, 84, 0.548)" }}
                onChange={(e) => this.setState({ search: e.target.value })}
              />
           <button
              type="button"
              className="btn btn-white btn-outline-success"style={{fontSize:"15px", marginTop:"10px"}}
              onClick={this.searchdata}
            >
              search
            </button>
            <small  className="form-text text-danger text-center"><i>* Search data by filename (Refresh nd try) </i></small>

<div className="card-header">
  Welcome user
</div>
<div className="card-body">
  <h5 className="card-title"> 
Add data</h5>
<form>
<span>Name of the file : </span>
              <input
                type="text"
                value={this.state.title}
                style={{ color: "rgba(87, 84, 84, 0.548)" }}
                onChange={(e) => this.setState({ title: e.target.value })}
              />
              </form>
              <form>
                <span> Upload Pdf  : </span>
                <br></br>
                <input
                  ref="file"
                  type="file"
                  style={{ color: "red" }}
                  name="user[image]"
                  multiple="true"
                  onChange={this.handleImageChange}
                />
              </form>
              <button
              type="button"
              className="btn btn-primary"style={{fontSize:"15px"}}
              onClick={this.addcontent}
            >
              Add
            </button>
          
            <p className="alert-danger">{this.state.message}</p>

              </div>
</div>
              ):(
                <div className="card">
                   <input
                type="text"
                value={this.state.search}
                style={{ color: "rgba(87, 84, 84, 0.548)" }}
                onChange={(e) => this.setState({ search: e.target.value })}
              />
           <button
              type="button"
              className="btn btn-white btn-outline-success"style={{fontSize:"15px", marginTop:"10px"}}
              onClick={this.searchdataadmin}
            >
              search
            </button>
            <small  className="form-text text-danger text-center"><i>* Search data by filename (Refresh nd try) </i></small>
                <div className="card-header">
                  Welcome admin
                </div>
                <div className="card-body">
                <button
                              type="button" class="btn btn-primary "
                              onClick={this.updatetable
                              }
                              style={{ marginRight: "20px", fontSize:"15px" }}
                            >
                               {this.state.loading && (
                  <span className="spinner-border spinner-border-sm"></span>
                )}
                <span>
                  {" "}
                  {this.state.loading ? (
                    <span> Update table</span>
                  ) : (
                    <span>Update table</span>
                  )}
                </span>{" "}
                                              </button>

                            
                  
                </div>
                </div>              
                )}

{!currentUser.isadmin ? (
<Table bordered hover responsive>
                <thead>
                  <tr>
                    <th>#</th>
                    <th>Title</th>
                    <th style={{  fontSize:"10px" }}>Downoad (.pdf)</th>

                  </tr>
                </thead>
                <tbody>
                  {data.map((item, i) => (
                    <React.Fragment key={i}>
                      <tr
                        className={
                          "" + (i+1 === currentindex ? 'primary' : "")
                        }
                        onClick={() => this.setactivetype(item, i)}
                      >
                        <td>{(i=i+1 )}</td>

                        <td>{item.title}</td>
                        <td>
                          {" "}
                          {i === currentindex ? (
                            <button
                              type="button" class="btn btn-primary"
                              onClick={this.printDocument}
                              style={{ marginRight: "20px", fontSize:"15px" }}
                            >
                              Download
                            </button>
                          ) : (
                            ""
                          )}
                        </td>
                      </tr>
                    </React.Fragment>
                  ))}
                </tbody>
              </Table>
):(
<Table bordered hover responsive>
                <thead>
                  <tr>
                    <th>#</th>
                    <th>Title</th>
                    <th>Uploaded by</th>
                    <th style={{  fontSize:"10px" }}>Downoad (.pdf)</th>

                  </tr>
                </thead>
                <tbody>
                  {alldata.map((item, i) => (
                    <React.Fragment key={i}>
                      <tr
                        className={
                          "" + (i+1 === currentindex ? 'primary' : "")
                        }
                        onClick={() => this.setactivetype(item, i)}
                      >
                        <td>{(i=i+1 )}</td>

                        <td>{item.title}</td>
                        <td className="text-danger"><i>{item.author}</i></td>

                        
                        {/* {alldata &&
              alldata.map((item, i) => (
                <td  key={i}
                >
                  {item.username}
                  </td>
              ))} */}

                        <td>
                          {" "}
                          {i === currentindex ? (
                            <button
                              type="button" class="btn btn-primary"
                              onClick={this.printDocument}
                              style={{ marginRight: "20px", fontSize:"15px" }}
                            >
                              Download
                            </button>
                          ) : (
                            ""
                          )}
                        </td>
                      </tr>
                    </React.Fragment>
                  ))}

                </tbody>
              </Table>)}
      </div>
    );
  }
}
