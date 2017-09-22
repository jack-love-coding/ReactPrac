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
  }


  render(){
    console.log(this.state.email);;
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
      <button onClick={this.handleClick.bind(this)}>Summit</button>
      </div>
    );
  }
}



class App extends Component {



  render() {
    console.log('test');
    return (
      <div className="App">

        <div className="content">

          <div className="main-content">
            <div className="Order">

                <div className="selectWristband">
                  <h2>Enter your details</h2>
                  <div className="form-wristband">
                    <div className="row">
                    {/*an atomic unit of wristband*/}







                    </div>
                    {/*user info form*/}
                    <UserInfo />


                  </div>
                </div>

            </div>
          </div>
        </div>
      </div>
    );
  }
}
export default App;
