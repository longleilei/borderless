import React, { useState } from 'react'; 
import { useDispatch } from 'react-redux'; 
import { useHistory } from 'react-router-dom'; 
import { GoogleLogin } from 'react-google-login'; 
import { RiEyeFill, RiEyeCloseLine } from 'react-icons/ri'; 


import * as styles from './Auth.module.scss';
import { signin, signup } from '../../actions/auth';
import Button from "../../components/button/Button";

const initialFormData = { username: '', password: '', email: '', confirmPassword: ''}; 

const Auth = () => {

    const history = useHistory(); 
    const dispatch = useDispatch(); 

    const [ isSignup, setIsSignup ] = useState(false); 
    const [ formData, setFormData ] = useState(initialFormData); 
    const [showPassword, setShowPassword ] = useState(false);  

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value }); 
    }

    const handleShowPassword = () => setShowPassword(showPassword => !showPassword); 

    const handleSubmit = (e) => {
        e.preventDefault(); 

        if(isSignup){
            dispatch(signup(formData, history)); 
        } else {
            dispatch(signin(formData, history)); 
        }
    }

    const switchMode = () => {
        setIsSignup(isSignup => !isSignup); 
        handleShowPassword(false); 
    }

    const googleSuccess = async(res) => {
        const result = `${res.profileObj.givenName} ${res.profileObj.familyName}`; 
        const token = res.tokenId; 
        try{ 
            dispatch({ type: 'GOOGLE AUTH', data: { result, token }}); 
            history.push('/wallet'); 

        }catch(error){
            console.log(error); 
        }
        
    }
    const googleFailure = () => {
        console.log("Google Sign in was unsuccessful")
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
                            <div className={styles.passwordDiv}>
                                <input type="text" name="password" onChange={handleChange} type={showPassword ?  "text": "password"} handleShowPassword={handleShowPassword}/>  
                                <div className={styles.icons}>{showPassword ? <RiEyeFill onClick={handleShowPassword} size={30} color='0ebf9a'/> : <RiEyeCloseLine onClick={handleShowPassword} size={30} color='0ebf9a'/>}</div>
                            </div>
                                    
                        </label>
                            
                        
                        

                        { isSignup && (
                            <>
                                <label>
                                    Confirm Password: 
                                    <input type="text" name="confirmPassword" onChange={handleChange} type={showPassword ?  "text": "password"} />
                                </label>
                            </>
                        ) }
                        <Button type={'primary'} style={{marginTop: '10px'}} onClick={handleSubmit}>
                            {isSignup ? 'Signup' : 'Signin'} 
                            
                        </Button>
                        <GoogleLogin clientId="85220351029-1ef4tp4a4ft7fj861nqtggsrb7c10ovo.apps.googleusercontent.com" render={renderProps => 
                            (<Button type={'primary'} style={{marginTop: '10px'}} onClick={renderProps.onClick} disabled={renderProps.disabled}>Google Singin</Button>)}
                            onSuccess={googleSuccess}
                            onFailure={googleFailure}
                            //cookiePolicy={single_host_origin}
                        /> 

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
