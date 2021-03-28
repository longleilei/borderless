import React,  { useState } from 'react'; 
import StripeCheckout from 'react-stripe-checkout'; 

import * as styles from './Wallet.module.scss';

const Wallet = () => {

    const money = 350; 

    const initial = { name: "Topup", amount: 10 }; 

    const [ topUp, setTopUp ] = useState(initial); 
    const [ showInput, setShowInput ] = useState(false); 

    const handleInputAmount = () => {
        setShowInput( showInput => !showInput ); 
    }

    const handleInputChange = (e) => {
        
        setTopUp({...topUp, amount: e.target.value}); 
        console.log(topUp.amount); 
        
    }

    const commitTopup = token => {
        
        const body = {
            token, 
            topUp
        }; 

        const headers = {
            "Content-Type": "application/json"
        }

        //outsource it to the api 
        return fetch('http://localhost:5000/topup', {
            method: "POST", 
            headers, 
            body: JSON.stringify(body)
        })
        .then(res => {
            console.log("RESPONSE", res); 
            const { status } = res; 
            console.log("STATUS", status); 
        })
        .catch(error => console.log(error)); 
    }


    return (
        <>
            <div className={styles.walletContainer}>
                <div className={styles.walletMain}>
                    <div className={styles.userGreeting}>Welcome back, Nina</div>

                    <div className={styles.mainInfo}>
                        <div>Your Wallet</div>
                        <div>HK${money}</div>

                        <button onClick={handleInputAmount}>Topup</button>

                        {
                            showInput &&
                            (<label>
                                <input name="amount" placeholder="input amount"onChange={handleInputChange}></input>
                            </label>) 
                        }

                        <StripeCheckout 
                            stripeKey="pk_test_51IItKuK4WEietHlO7wVGqPOPYvMki3sDcmrrrHMVeVQ3xhD8tRCEuRBSzJOTAmgjgEKNWNDv1yBaxge0OmeGR02200Q5W1OTn7"
                            amount={topUp.amount * 100 }
                            token={commitTopup}
                            name="Topup"
                            panelLabel='TOPUP'
                        >
                        
                            <button>Confirm</button>

                        </StripeCheckout>
                    </div>

                    

                </div>
            </div>
            
        </>
    )
}

export default Wallet; 
