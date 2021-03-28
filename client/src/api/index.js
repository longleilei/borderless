import axios from 'axios'; 
//const axios = require('axios'); 

const API = axios.create({ baseURL: 'http://localhost:5000'}); 

const token = JSON.parse(localStorage.getItem('profile'));
console.log(token); 

API.interceptors.request.use((req) => {
    console.log(`GET TOKEN ${localStorage.getItem('profile')}`); 

    if(localStorage.getItem('profile')){
        req.headers.Authorization = `Bearer ${JSON.parse(localStorage.getItem('profile')).token}`;
    }
    
    return req; 
}); 

// axios.interceptors.request.use( req => {

//     try{
//         if(localStorage.getItem('profile')){
//             req.headers.Authorization = `Bearer ${JSON.parse(localStorage.getItem('profile')).token}`; 
//         }
//         return req;

//     } catch(error){
//         console.log(error); 
//         return error; 
//     }

// } ); 

export const signIn = (formData) => API.post('/user/signin', formData);
export const signUp = (formData) => API.post('/user/signup', formData); 