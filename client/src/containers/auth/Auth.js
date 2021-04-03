import React, { useState } from 'react'; 
import { useDispatch } from 'react-redux'; 
import { useHistory } from 'react-router-dom'; 

import * as styles from './Auth.module.scss';
import { signin, signup } from '../../actions/auth';
import Button from "../../components/button/Button";

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
            console.log('signup dispatched');
        } else {
            console.log(formData); 
            dispatch(signin(formData, history)); 
            console.log('signin dispatched');
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
                    <form >
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
                        <Button type={'primary'} style={{marginTop: '10px'}} onClick={handleSubmit}>
                            {isSignup ? 'Signup' : 'Signin'}
                        </Button>
                        {/*<button className={styles.submitButton}>{isSignup ? 'Signup' : 'Signin'}</button> */}

                    </form>
                    <button onClick={switchMode} style={{outline: 'none'}}>
                            { isSignup ?
                                <span>Already have an account? <span style={{color: '#0ebf9a'}}>Sign in</span></span>
                                : <span>Don't have an account? <span style={{color: '#0ebf9a'}}>Sign up</span></span>
                            }
                        </button>
                </div>
            </div>
        </>
    )
}

export default Auth; 
