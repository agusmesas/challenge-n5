'use client'
import { useState, useEffect, useContext } from 'react';
import { useRouter } from 'next/navigation'
import { useSnackbar } from 'notistack';
import { ProductsContext, ProductsDispatchContext, LayoutContext } from '../../../context/contexts';
import Quantity from '../../components/QuantityInput';
import Button from '../../components/Button';
import { fetchProductDetail } from '../../utils/services';

import styles from './page.module.scss';

export default function ProductDetail({ params: { id } }) {
  const router = useRouter();
  const { enqueueSnackbar } = useSnackbar();
  const [quantity, setQuantity] = useState(1);
  const { products, selectedProduct } = useContext(ProductsContext);
  const { setSelectedProduct, addToCart } = useContext(ProductsDispatchContext);
  const { actions: { setLoading }} = useContext(LayoutContext);

  const getProductDetail = () => {
    setLoading(true);
    fetchProductDetail(id)
    .then((response) => setSelectedProduct(response))
    .finally(() => setLoading(false));
  }

  useEffect(() => {
    if (products.length) {
      const productDetail = products.find(product => product.id === Number(id));
  
      setSelectedProduct(productDetail);
    } else {
      getProductDetail();
    }
  }, []);

  const handleAddToCart = () => {
    addToCart({ ...selectedProduct, quantity });
    enqueueSnackbar('Se agrego el producto al carrito');
  }

  const handleBuyProduct = () => {
    handleAddToCart();

    router.replace('/shopping-cart');
  }

  if(selectedProduct){
    return (
      <div className={styles.container}>
        <div className={styles.product}>
          <div className={styles.product__img}/>
          <div className={styles.product__detail}>
            <div className={styles.product__detail__header}>
              <h1>{selectedProduct.name}</h1>
              <h2>$ {selectedProduct.price}</h2>
            </div>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit.
              Curabitur dui quam, pulvinar eu massa non, faucibus sagittis purus.
            </p>
            <Quantity
              withAmount
              limit={selectedProduct.amount}
              value={quantity}
              onChange={(value) => setQuantity(value)}
            />
            <div>
              <Button
                type="secondary"
                onClick={handleAddToCart}
                label="Agregar al carrito"
                disabled={!selectedProduct.amount}
              />
              <Button
                type="primary"
                onClick={handleBuyProduct}
                label="Comprar"
                disabled={!selectedProduct.amount}
              />
            </div>
          </div>
        </div>
      </div>
    );
  }
}