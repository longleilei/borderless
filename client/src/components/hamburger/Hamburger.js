import React from 'react';

import * as styles from './Hamburger.module.scss';

function Hamburger ({ hamburgerClick, isOpen, className, children }) {
  return (
    <div onClick={() => hamburgerClick()} className={styles.Ham}>
      <div
        className={[
          styles.xline,
          styles.xline1,
          isOpen ? styles.open : styles.closed
        ].join(' ')}
      />
      <div
        className={[
          styles.xline,
          styles.xline2,
          isOpen ? styles.open : styles.closed
        ].join(' ')}
      />
      <div
        className={[
          styles.xline,
          styles.xline3,
          isOpen ? styles.open : styles.closed
        ].join(' ')}
      />
        {children}
    </div>
  );
}

export default Hamburger;
