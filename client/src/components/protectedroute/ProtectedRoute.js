import React from 'react'; 
import { Route } from 'react-router-dom'; 
import { Redirect } from "react-router-dom";


const ProtectedRoute = ({ children, ...props }) => {


    const isAuthenticated = () => {

        const userToken = JSON.parse(localStorage.getItem("profile"));
        return userToken ? true : false; 
    }

    

    return (
        
        <Route {...props} render={( {location} ) =>
        isAuthenticated() ? children : <Redirect to='/'/> }/>
   
    )
}

export default ProtectedRoute; 
