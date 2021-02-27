import React, { Component } from 'react';
import {withRouter} from 'react-router-dom';


class SearchBar extends Component {
    constructor(props){
        super(props);
        
        this.state = {
            term: " "
        }
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    componentDidMount(){
        this.input.focus();
    }

    handleChange(event){
        this.setState({ [event.target.name]: event.target.value});
    }


    handleSubmit(event){
            this.props.history.push(`/results/${this.state.term}`);
    }

    render(){

        document.title="Top Stories";
        const isDisabled = this.state.term === 0;
        return (
            <div className="row">
                    <div className="col-sm-2"></div>
                    <div className="col-md-8">
                        <input name="term" className="form-control" type="text" placeholder="Search" 
                           ref={(i) => { this.input = i; }} onChange={this.handleChange} />
                    </div>
                    <div className="col-sm-2">
                        <button disabled={isDisabled}onClick={this.handleSubmit} className="btn btn-primary">Search</button>&nbsp;&nbsp;
                    </div>
            </div>
        );
    }

}
export default withRouter(SearchBar)