import React, { Component } from 'react';
import { Link, withRouter } from "react-router-dom";
import Select from "react-select";






class SignUp extends Component{
    constructor(){
        super();

        this.state = {
            userName: '',
            password: '',
            email: '',
            categories: [],
            searchHistory: [''],
        
            multiValue: [],
            filterOptions: [
              { value: "politics", label: "Politics" },
              { value: "sports", label: "Sports" },
              { value: "technology", label: "Technology" },
              { value: "business", label: "Business"},
              { value: "entertainment", label: "Entertainment"},
              { value: "music", label: "Music"},
              { value: "covid-19", label:"Covid-19"}
            ]
        };
       
        this.handleChange = this.handleChange.bind(this);
        this.handleMultiChange = this.handleMultiChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

   

    //Link to Api
    url =' https://glacial-plains-58754.herokuapp.com/api/users/add';

    handleChange(event){
        this.setState({ [event.target.name]: event.target.value });
    }

    handleMultiChange(option){
        this.setState(state => {
            return {
              multiValue: option
            }
        });
    }

    componentDidMount() {
        this.input.focus();
    }

    handleSubmit(event){
        const newUser = {
            "userName": this.state.userName,
            "password": this.state.password,
            "email": this.state.email,
            "categories": this.state.multiValue,
            "searchHistory": this.state.searchHistory
        }

        fetch(this.url, {
            method: 'POST',
            headers: { "Content-Type": 'application/json' },
            body: JSON.stringify(newUser)
        })
        .then(response =>{
            if (response.ok) {
                return response.json();
            } else if (response.status >= 400 && response.status < 500) {
                throw Error(`HTTP ${response.status}, ${response.statusText}`);
            } else {
                throw Error(`HTTP ${response.status}, ${response.statusText}`);
            }
        })
        .then(responseData => {
            console.log(responseData);
            this.props.history.push(`/login`);
          })
          .catch(error => {
            console.log(error)
        });

    }

    render(){
        document.title = "Sign Up";

        //Button State
        const isDisabled = this.state.email === 0 || this.state.userName === 0 || this.state.password === 0;

        return (
         <div>
               <h4>Create Your Account</h4>
              <div className="form-horizontal">
                  <p>Enter your details below and select your categories</p>
                  <hr />
                  <div className="form-group">
                     <label htmlFor="userName" className='control-label col-md-2'>Username</label>
                     <div className="col-md-6">
                        <input name="userName" className="form-control" ref={(i) => { this.input = i; }} onChange={this.handleChange} />
                     </div>
                   </div>
                   <div className="form-group">
                     <label htmlFor="password" className='control-label col-md-2'>Password</label>
                     <div className="col-md-6">
                        <input name="password" className="form-control" ref={(i) => { this.input = i; }} onChange={this.handleChange} />
                     </div>
                   </div>
                   <div className="form-group">
                     <label htmlFor="email" className='control-label col-md-2'>Email</label>
                     <div className="col-md-6">
                        <input name="email" className="form-control" ref={(i) => { this.input = i; }} onChange={this.handleChange} />
                     </div>
                   </div>
                   <div className="form-group" >
                      <label className='control-label col-md-2'>Categories</label>
                        <Select 
                                name="filters"
                                placeholder="Categories"
                                width = '100px'
                                value={this.state.multiValue}
                                options={this.state.filterOptions}
                                onChange={this.handleMultiChange}
                                isMulti
                          />       
                   </div>
                   <div className="form-group">
                      <div className="col-md-offset-2 col-md-6">
                         <button disabled={isDisabled}onClick={this.handleSubmit} className="btn btn-primary">Save</button>&nbsp;&nbsp;
                         <Link className='btn btn-default' to='/home'>Cancel</Link>
                      </div>
                   </div>
               </div>
          </div>
        );

        
    }
}
export default withRouter(SignUp);
