import { useContext, useEffect } from 'react';
import Link from 'next/link'
import { ProductsContext, ProductsDispatchContext } from '../../../context/contexts';
import Icon from '../Icon';

import styles from './style.module.scss';

export default function Cart() {
  const { shoppingCart } = useContext(ProductsContext);
  const { setInitialCart } = useContext(ProductsDispatchContext);

  useEffect(() => {
    const shoppingCart = JSON.parse(localStorage.getItem('cart')) || [];
    
    setInitialCart(shoppingCart);
  }, []);
  
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