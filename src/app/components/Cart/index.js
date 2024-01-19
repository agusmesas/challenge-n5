import { useContext } from 'react';
import Link from 'next/link'
import { ProductsContext } from '../../../context/contexts';
import Icon from '../Icon';

import styles from './style.module.scss';

export default function Cart() {
  const { shoppingCart } = useContext(ProductsContext);
  
  return (
    <Link href="/shopping-cart">
      <div className={styles.cart}>
        <div className={styles.cart__container}>
          <Icon className={styles.cart__container__icon} name="cart" />
        </div>
        <span className={styles.cart_number}>{shoppingCart.length}</span>
      </div>
    </Link>
  )
}