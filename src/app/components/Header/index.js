import Cart from '../Cart';

import styles from './style.module.scss';

export default function Header() {
  return (
    <header className={styles.header}>
      <p className={styles.header__title}>Challenge N5 - Agustin Mesas</p>
      <Cart />
    </header>
  );
}