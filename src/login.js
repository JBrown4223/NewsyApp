import React, { Component } from 'react';
import { Link, withRouter } from "react-router-dom";


class UserLogin extends Component{
    constructor(props){
        super(props);

        this.state = {
            userName: '',
            password: '',
            submitted: false,
            loading: false,
            error: ''
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);

    }

    
    handleChange(e) {
        this.setState({ [e.target.name]: e.target.value });
    }

    componentDidMount() {
        this.input.focus();
    }

    handleSubmit(e) {
        e.preventDefault();

        const user = {
           "username": this.state.userName,
           "password": this.state.password
        }

        fetch(`https://glacial-plains-58754.herokuapp.com/api/users/auth`, {
            method: 'POST',
            headers: {"Content-Type": 'application/json'},
            body: JSON.stringify(user)
        })
        .then(response =>{
            if (response.status === 200) 
            {
                    this.props.history.push(`/home/${this.state.userName}`); 
            } else {
                throw Error(`HTTP ${response.status}, ${response.statusText}`);
            }
        })
        .catch(error => {
            console.log(error)
        });
    }

    render() {
        return (
            <div>
              <div className="row">
                <div className="form-horizontal">
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
                    <div className="col-md-offset-2 col-md-6">
                         <button onClick={this.handleSubmit} className="btn btn-primary">Login</button>&nbsp;&nbsp;
                         <Link className='btn btn-default' to='/home'>Cancel</Link>
                    </div>
                 </div>
                </div>
               </div>
        );
    }
}

export default withRouter(UserLogin);