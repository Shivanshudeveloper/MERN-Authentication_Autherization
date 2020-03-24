import React, { useState,useRef,useEffect,Component } from 'react';
import AuthService from '../Services/AuthService';
import Message from '../Components/Message';

const Register = props => {
    const [user,setUser] = useState({username: "", password: "", role: ""});
    const [message,setMessage] = useState(null);
    let timerID = useRef(null);

    useEffect(() => {
       return () => {
           clearTimeout(timerID);
       } 
    },[])
    // On Change Function for User Authentication
    const onChange = e => {
        setUser({...user,[e.target.name]:e.target.value})
    }

    const resetForm = () => {
        setUser({username: "", password: "", role: ""});
    }

    const onSubmit = e => {
        e.preventDefault();
        AuthService.register(user).then(data => {
            const { message } = data;
            setMessage(message);
            resetForm();
            if (!message.msgError) {
                timerID = setTimeout(() => {
                    props.history.push('/login');
                }, 2000);
            }
        })
    }

    return (
        <div>
            <form onSubmit={onSubmit}>
                <h3>
                    Please Register
                </h3>
                <label htmlFor="username" className="sr-only">Username: </label>
                <input 
                    type="text" 
                    name="username" 
                    onChange={onChange} 
                    value={user.username}
                    placeholder="Username"
                    className="form-control" />
                
                <input 
                    type="password" 
                    name="password" 
                    value={user.password}
                    onChange={onChange} 
                    placeholder="Password"
                    className="form-control" />

                
                <input 
                    type="text" 
                    name="role" 
                    value={user.role}
                    onChange={onChange} 
                    placeholder="Enter role (admin/user)"
                    className="form-control" />

                
                
                <button type="submit" className="btn btn-lg btn-primary btn-block">
                    Register
                </button>
            </form>
            {message ? <Message message={message}/> : null }
        </div>
    )
}

export default Register;