import React, { useState,useContext,Component } from 'react';
import AuthService from '../Services/AuthService';
import Message from '../Components/Message';
import { AuthContext } from '../Context/AuthContext';

const Login = props => {
    const [user,setUser] = useState({username: "", password: ""});
    const [message,setMessage] = useState(null);
    const authContext = useContext(AuthContext);

    // On Change Function for User Authentication
    const onChange = e => {
        e.preventDefault();
        setUser({...user,[e.target.name]:e.target.value})
        console.log(user);
    }

    const onSubmit = e => {
        e.preventDefault();
        AuthService.login(user).then(data => {
            const { isAuthenticated,user,message } = data;
            if (isAuthenticated) {
                authContext.setUser(user);
                authContext.setIsAuthenticated(isAuthenticated);
                props.history.push('/todos');
            } else {
                setMessage(message);
            }
        })
    }

    return (
        <div>
            <form onSubmit={onSubmit}>
                <h3>
                    Please Sign In
                </h3>
                <label htmlFor="username" className="sr-only">Username: </label>
                <input 
                    type="text" 
                    name="username" 
                    onChange={onChange} 
                    placeholder="Username"
                    className="form-control" />
                
                <input 
                    type="password" 
                    name="password" 
                    onChange={onChange} 
                    placeholder="Password"
                    className="form-control" />
                
                <button type="submit" className="btn btn-lg btn-primary btn-block">
                    Login
                </button>
            </form>
            {message ? <Message message={message}/> : null }
        </div>
    )
}

export default Login;