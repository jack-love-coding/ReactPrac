import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import $ from 'jquery';

class UserInfo extends Component {
  constructor(props) {
      super(props);
      this.state = {
          userName: '',
          companyName: '',
          email: '',
          mobile: ''
      };

      this.handleInputChange = this.handleInputChange.bind(this);
      this.handleClick = this.handleClick.bind(this)
  }

  handleInputChange(event){
    const target = event.target;
    const value = target.value;
    const name = target.name;
    this.setState({
      [name]: value
    });
  }

  handleClick(){
    console.log('clicked');
    const userName = this.state.userName;
    const companyName = this.state.companyName;
    const email = this.state.email;
    const mobile = this.state.mobile;
    const userInfo = {user:userName,company:companyName,email:email,mobile:mobile};
    var res = '';
    console.log(userInfo);
    $.ajax({url:'http://localhost:3001',
       type:'POST',
       data:userInfo,
       dataType:'json',
       success(response){
         res = response;
         console.log(response);
       },
       error(jqXHR,status,errorThrown){
         console.log(jqXHR);
         console.log(status);
       }});
    console.log(res);
    this.props.onClick();
  }


  render(){
    return (
      <div>
      <form>
        <div id="user-details">
          <h2><span className="label label-order">Your Details</span></h2>
          <div className="form-group">
            <label>Full Name *</label>
            <input name="userName" type="text" className="form-control" placeholder="Please enter your first name and last name" value={this.state.userName} onChange={this.handleInputChange} />
          </div>
          <div className="form-group">
            <label>Company Name</label>
            <input name="companyName" type="text" className="form-control" placeholder="Please enter your Company Name (Optional)" onChange={this.handleInputChange} />
          </div>
          <div className="form-group">
            <label>Mobile *</label>
            <input name="mobile" type="text" className="form-control" placeholder="0412 345 678" onChange={this.handleInputChange} />
          </div>
          <div className="form-group">
            <label>Email *</label>
              <input name="email" type="text" className="form-control" placeholder="example@company.com.au" onChange={this.handleInputChange} />
          </div>
        </div>
      </form>
      <button onClick={this.handleClick}>Summit</button>
      </div>
    );
  }
}

class DbPanel extends Component{

  handleDelete(id){
    var index = {
      id : id
    };



    $.ajax({url:'http://localhost:3001/deleteRecord',
       type:'POST',
       data:index,
       dataType:'json',
       success(response){
         console.log(response);
       },
       error(jqXHR,status,errorThrown){
         console.log(jqXHR,status);
       }});
       this.props.onClick();
  }

  render(){
    var countId = 0;
    return (
      <div>
      <style>{`
        table{
          width:100%
        }
        table, th, td{
          border:1px solid black;
        }`
        }
      </style>
        <h2>
          MongoDB records monitoring
        </h2>
      <div className="DB-Panel" >
        <table>
          <tbody>
           {
            this.props.record.map((item)=>{

              var handleChange = (event)=>{
                var value = $.event.target.value;
                var name = $.event.target.name;
                item[name] = value;
              };

              return(
              <tr key={countId++}>
                <td><input name="name" type="text" className="form-control" value={item.name} onChange={handleChange} /></td>
                <td><input name="company" type="text" className="form-control" value={item.company} onChange={handleChange} /></td>
                <td><input name="mobile" type="text" className="form-control" value={item.mobile} onChange={handleChange} /></td>
                <td><input name="email" type="text" className="form-control" value={item.email} onChange={handleChange()} /></td>
                <td><button onClick={()=>{this.handleDelete(item._id)}}>Delete</button></td>
              </tr>
            )
          })
          }
          </tbody>
        </table>
      </div>
    </div>
    )
  }

}

class App extends Component {

  constructor(props){
    super(props);
    this.state = {
      db : []
    };
    this.handleRequestDB = this.handleRequestDB.bind(this);
  };

  componentDidUpdate(prevProps,prevState){
    console.log('test!!!');
    console.log(this.state.db);
  }

  handleRequestDB(){
    var that = this;
    $.ajax({url:'http://localhost:3001/getRecord',
       type:'GET',
       dataType:'json',
       success(response){
         const res = response;
         that.setState({
           db : res
         });
         console.log(that.state.db);
       },
       error(jqXHR,status,errorThrown){
         console.log(jqXHR);
         console.log(status);
       }});
  }

  render() {
    console.log('test');
    return (
      <div className="App">

        <div className="content">

          <div className="main-content">
            <div className="Order">

                <div className="selectWristband">
                  <h2>Enter your details</h2>
                  <div className="form-wristband" style={{'marginBottom':'100 px'}} >
                    <div className="row">
                    {/*an atomic unit of wristband*/}

                    </div>
                    {/*user info form*/}
                    <UserInfo onClick={this.handleRequestDB} />


                  </div>

                  {/*show db records here*/}
                  <DbPanel record={this.state.db} onClick={this.handleRequestDB} />
                </div>

            </div>
          </div>
        </div>
      </div>
    );
  }
}
export default App;
