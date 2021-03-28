import React, { useState } from 'react'; 
import { useDispatch } from 'react-redux'; 
import { useHistory } from 'react-router-dom'; 

import * as styles from './Auth.module.scss';
import { signin, signup } from '../../actions/auth'; 

const initialFormData = { username: '', password: '', email: '', confirmPassword: ''}; 

const Auth = () => {

    const history = useHistory(); 
    const dispatch = useDispatch(); 

    const [ isSignup, setIsSignup ] = useState(false); 
    const [ formData, setFormData ] = useState(initialFormData); 

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value }); 
    }

    const handleSubmit = (e) => {
        e.preventDefault(); 

        if(isSignup){
            console.log(formData); 
            dispatch(signup(formData, history)); 
            console.log('dispatched'); 
        } else {
            console.log(formData); 
            dispatch(signin(formData, history)); 
            console.log('dispatched'); 
        }
    }

    const switchMode = () => {
        setIsSignup(isSignup => !isSignup); 
        //handleShowPassword(false); 
    }

    return (
        <>
            <div className={styles.CircleContainer}>
                <div className={styles.ContentContainer}>
                    <form onSubmit={handleSubmit}>
                        { isSignup && (
                            <>
                                <label>
                                    Email: 
                                    <input type="text" name="email" onChange={handleChange}/>
                                </label>
                            </>
                        ) }
                        <label>
                            Username: 
                            <input type="text" name="username" onChange={handleChange} />
                        </label>

                        <label>
                            Password: 
                            <input type="text" name="password" onChange={handleChange} />
                        </label>

                        { isSignup && (
                            <>
                                <label>
                                    Confirm Password: 
                                    <input type="text" name="confirmPassword" onChange={handleChange} />
                                </label>
                            </>
                        ) }

                        <button className={styles.submitButton}>{isSignup ? 'Signup' : 'Signin'}</button> 

                    </form>
                    <button onClick={switchMode}>
                            { isSignup ? "Already have an account? Sign in" : "Don't have an account? Sign up"}
                        </button>
                </div>
            </div>
        </>
    )
}

export default Auth; 
