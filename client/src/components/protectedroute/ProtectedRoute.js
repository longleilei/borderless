import React from 'react'; 
import { Route } from 'react-router-dom'; 
import { Redirect } from "react-router-dom";


const ProtectedRoute = ({ children, ...props }) => {


    const isAuthenticated = () => {

        const userToken = JSON.parse(localStorage.getItem("profile"));
        if(userToken){
            return true; 
        }

        alert('Please login or register'); 
        return false;  
    }

    

    return (
        
        <Route {...props} render={( {location} ) =>
        isAuthenticated() ? children : <Redirect to='/'/> }/>
   
    )
}

export default ProtectedRoute; 
