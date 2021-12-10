import React, {Component} from 'react';
import axios from 'axios';
import {Link} from 'react-router-dom';

const Crypto = props => {
    return(
        <tr>
            <td>{props.crypto.tokenName}</td>
            <td>{props.crypto.priceUsd}</td>
            <td className="text-center">
                <Link to={'/edit/'+props.crypto._id} className="btn btn-sm btn-primary">Edit</Link>
                <a href="#" onClick={()=> {props.deleteToken(props.crypto._id)}} className="btn btn-sm btn-danger">Delete</a>
            </td>
        </tr>
    )
}

export default class TokenList extends Component {

    constructor(props){
        super(props)

        this.deleteToken = this.deleteToken.bind(this);
        this.state = {crypto:[]}
        
    }

    componentDidMount(){
       
        axios.get('http://localhost:5000/crypto/')
        .then(res => {
            this.setState({crypto: res.data})
        })
        .catch(error =>{
            console.log(error)
        })
    
    }
    deleteToken(id){
        axios.delete('http://localhost:5000/crypto/'+id)
        .then(res => console.log(res.data))
        this.setState({
            crypto: this.state.crypto.filter(el => el._id !== id)
        })
    }
    note()
    {
        return this.state.crypto.map(currentToken => {
            return<Crypto crypto={currentToken} deleteToken={this.deleteToken} key={currentToken._id}
            />
        })
    }


    render(){
        return(
            <div className="container">
                <h1>Token List</h1>
                <table className="table table-bordered table-hover">
                    <thead className="thead-dark">
                       <tr>
                           <th>Token Name</th>
                           <th>Price in Usd</th>
                           <th className="text-center">Actions</th>
                       </tr>
                    </thead>
                    <tbody>
                        {this.note()}
                    </tbody>
                </table>    
            </div>
        )
    }
}