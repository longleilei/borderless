import React from 'react'; 

import * as styles from './Advertpage.module.scss';
import worldismine from './worldismine.png'; 


const Advertpage = () => {
    return (
        <>
            
            <div className={styles.mainContainer}>
                <div className={styles.leftContainer}>
                    <div className={styles.servicesContainer}>

                        <div className={styles.serviceElement}>
                            <div className={styles.checkbox}></div>
                            <div className={styles.caption}>Sell Currency Quickly</div>
                        </div>

                        <div className={styles.serviceElement}>
                            <div className={styles.checkbox}></div>
                            <div className={styles.caption}>Pay Abroad</div>
                        </div>

                        <div className={styles.serviceElement}>
                            <div className={styles.checkbox}></div>
                            <div className={styles.caption}>View Currencies</div>
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

