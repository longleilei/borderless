import React from 'react'; 

import * as styles from './Advertpage.module.scss';
import worldismine from './worldismine.png'; 


const Advertpage = () => {
    return (
        <>
            
            <div className={styles.mainContainer}>
                <div className={styles.leftContainer}>
                    <div class="services-container">

                        <div class="service-element">
                            <div class="checkbox"></div>
                            <div class="caption">Sell Currency Quickly</div>
                        </div>

                        <div class="service-element">
                            <div class="checkbox"></div>
                            <div class="caption">Pay Abroad</div>
                        </div>

                        <div class="service-element">
                            <div class="checkbox"></div>
                            <div class="caption">View Currencies</div>
                        </div>

                    </div>
                </div>
                <div className={styles.rightContainer}>
                    <div className={styles.imageContainer}>
                        <img src={worldismine} alt="illustration"></img>
                    </div>
                </div>            
            </div>
        </>
    )
}

export default Advertpage; 

