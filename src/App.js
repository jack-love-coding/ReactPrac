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
    const userInfo = this.state.userName;
    console.log(userInfo);
    $.ajax({url:'localhost:3001',
       type:'POST',
       data:JSON.stringify(userInfo),
       dataType:'json',
       success(response){
         console.log(response);
       },
       error(jqXHR,status,errorThrown){
         console.log(jqXHR);
       }});
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
        <div className="App-header">
        /*
          <div className="Navigation-container">
            <img src={logo} className="App-logo" alt="logo" />
            <span id="companyName">Customer Wristband</span>
            <nav>
            <ul className="Navigation-wrapper">
              <li className="navigation-item">
              <a style={{cursor:'pointer'}}>Cars&Vehicles</a>
              </li>
              <li className="navigation-item">
              <a href="javascript:void(0)">House & Garden</a>
              </li>
              <li className="navigation-item">
              <a href="#">Jobs</a>
              </li>
              <li className="navigation-item">
              <a href="#">Find out more!</a>
              </li>
            </ul>
            </nav>
          </div>
          */
        </div>
        <div className="content">
        /*
          <div className="leftbar">
            This1
            <div className="checkout-summary">
              <h2>Order Summary</h2>
              <div className="checkout-list"></div>
              <div className="checkout-total"></div>
            </div>
          </div>*/
          <div className="main-content">
            This2
            <div className="Order">

                <div className="selectWristband">
                  <h2>Choose a wristband</h2>
                  <div className="form-wristband">
                    <div className="row">
                    {/*an atomic unit of wristband*/}



                      <div className="wristband-wrapper col-sm-3">
                        <div className="Wristband">
                          <label htmlFor="wb1">
                            <img src="img/icon-debossed.png" />
                            <span>Debossed</span>
                            <span>
                              <small>Sillicone Wristbands</small>
                            </span>
                              {/*}<input type="radio" name="wb" id="wb1" value="Debossed Sillicone" />*/}
                          </label>
                        </div>
                      </div>



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
