import * as api from '../api/index.js';

export const signin = ( formData, history) => async(dispatch) => {

    try {
        const { data } = await api.signIn(formData); 

        console.log("DATA FROM ACTCREATOR ", data.token); 
        localStorage.setItem('profile', JSON.stringify(data.token)); 

        console.log(localStorage.getItem('profile')); 


        dispatch({ type: 'AUTH', payload: data }); 

        console.log("auth dispatched"); 

        history.push("/wallet"); 

    } catch(error){
        
        console.log(error); 
    }
    
}

export const signup = (formData, history ) => async(dispatch) => {

    try{
        const { data } = await api.signUp(formData); 

        localStorage.setItem('profile', JSON.stringify(data.token)); 

        dispatch({ type: 'AUTH', data }); 

        console.log("auth dispatched"); 

        history.push("/wallet"); 

    } catch(error){

        console.log(error); 
    }

}