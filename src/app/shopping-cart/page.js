'use client'
import { useContext } from 'react';
import { useRouter } from 'next/navigation';
import { useSnackbar } from 'notistack';
import { ProductsContext, ProductsDispatchContext } from '../../context/contexts';
import Quantity from '../components/QuantityInput';
import Button from '../components/Button';
import Icon from '../components/Icon';
import { calculateTotalPrice } from '../utils'

import styles from './page.module.scss';

export default function ShoppingCart() {
  const router = useRouter();
  const { enqueueSnackbar } = useSnackbar();
  const { shoppingCart } = useContext(ProductsContext);
  const { addToCart, buyCart, deleteCartItem } = useContext(ProductsDispatchContext);

  const handleAddToCart = ({ id, quantity }) => {
    const product = shoppingCart.find((product) => id === product.id);

    const newProduct = {
      ...product,
      quantity: quantity
    };

    addToCart(newProduct);
  };

  const handleBuyCart = () => {
    buyCart();
    enqueueSnackbar('Se realizo la compra correctamente');
    router.replace('/');
  }

  return (
    <div className={styles.container}>
      <div className={styles.cart}>
        <h1>Carrito</h1>
        <div className={styles.cart__products}>
            {
              shoppingCart.map(({ id, price, quantity, amount, name })=> (
                <div className={styles.cart__products__item} key={id}>
                  <p>{name} - $ {price} ({quantity})</p>
                  <div className={styles.cart__products__item__actions}>
                    <Quantity
                      onChange={(quantity) => handleAddToCart({ id, quantity })}
                      value={quantity}
                      limit={amount}
                    />
                    <Button
                      className={styles.cart__products__item__actions__delete}
                      type="secondary"
                      onClick={() => deleteCartItem(id)}
                    >
                      <Icon name="delete" color="#FFFFFF" />
                    </Button>
                  </div>
                </div>
              ))
            }
        </div>
        <div>
          <p>Total: $ {calculateTotalPrice(shoppingCart)}</p>
          <Button label="Comprar" onClick={handleBuyCart} />
        </div>
      </div>

    </div>
  )
}