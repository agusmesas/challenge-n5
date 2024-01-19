import styles from './style.module.scss';
import { useContext } from 'react';
import { useRouter } from 'next/navigation';
import { useSnackbar } from 'notistack';
import Link from 'next/link';
import { ProductsContext, ProductsDispatchContext } from '../../../context/contexts';
import Button from '../Button';

const ProductCard = (product) => {
  const { name, price, amount, id } = product;
  const router = useRouter();
  const { enqueueSnackbar } = useSnackbar();
  const { addToCart } = useContext(ProductsDispatchContext);
  const { shoppingCart } = useContext(ProductsContext);
  const { quantity = 0 } = shoppingCart?.find((cartItem) => cartItem.id === id) || {};

  const handleAddToCart = () => {
    const newProduct = {
      ...product,
      quantity: quantity + 1
    };

    addToCart(newProduct);
    enqueueSnackbar('Se agrego el producto al carrito');
  };

  const handleBuyProduct = () => {
    if(amount > quantity){
      handleAddToCart();
    }

    router.push('/shopping-cart');
  }

  return (
    <Link className={styles.card} href={`/product/${id}`}>
      <div className={styles.card__img} />
      <div className={styles.card__title}>
        <h3>{name}</h3>
        <p>$ {price}</p>
      </div>
      <div className={styles.card__buttons}>
        <Button
          theme="secondary"
          onClick={handleAddToCart}
          disabled={!(amount > quantity)}
          label="Agregar al carrito"
        /> 
        <Button
          label="Comprar"
          disabled={!amount}
          onClick={handleBuyProduct}
        />
      </div>
    </Link>
  );
}

export default ProductCard;
