import React, {Component} from 'react';
// import {Link} from 'react-router-dom';
import axios from 'axios';

export default class EditToken extends Component {

    constructor(props){
      super(props);

      this.state = {
          tokenName: '',
          priceUsd: '',
        
      }

      this.onSubmit = this.onSubmit.bind(this);
      this.onValueChange = this.onValueChange.bind(this);

    }

    componentDidMount() {
        axios.get('http://localhost:5000/crypto/'+this.props.match.params.id)
        .then(res => {
            this.setState({
                tokenName: res.data.tokenName,
                priceUsd: res.data.priceUsd,
            })
        })
        .catch(error => {
            console.log(error);
        })
    }

    onValueChange(e){
        this.setState({
            [e.target.dataset.name] : e.target.value
        })
    }

    onSubmit(e){
        e.preventDefault();

        const crypto = {
            tokenName: this.state.tokenName,
            priceUsd: this.state.priceUsd,
        }

       

        axios.post('http://localhost:5000/crypto/update/'+this.props.match.params.id,crypto)
            .then(res => window.location = "/")
            .catch(err => console.log('Error :'+ err));
    }

    render(){
        return(
            <div className="container">
                <h1>Update Token</h1>
 
                <form onSubmit={this.onSubmit}>
                    <div className="form-group">
                        <label>Token Name</label>
                        <input type="text" className="form-control" data-name="tokenName"  required onChange={this.onValueChange} value={this.state.tokenName} />
                    </div>

                    <div className="form-group">
                        <label>Price in Usd</label>
                        <input type="number" step="0.1" className="form-control" data-name="priceUsd"  required onChange={this.onValueChange} value={this.state.priceUsd} />
                    </div>

                   
                    <button type="submit" className="btn btn-primary">Submit</button>
                </form>
               



            </div>
        )
    }


}