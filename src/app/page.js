'use client'
import { useEffect, useContext } from 'react';
import { ProductsContext, ProductsDispatchContext, LayoutContext } from '../context/contexts';
import ProductCard from './components/ProductCard';
import { fetchProductsList } from './utils/services';

import styles from './page.module.scss';

export default function Home () {
  const { products } = useContext(ProductsContext);
  const { setProducts } = useContext(ProductsDispatchContext);
  const { actions: { setLoading } } = useContext(LayoutContext);

  const getProductsList = () => {
    setLoading(true);
    fetchProductsList()
    .then((productsList) => {
      setProducts(productsList);
    })
    .finally(() => setLoading(false));
  }

  useEffect(() => {
    if(!products.length){
      getProductsList();
    }
  }, []);


  return (
    <section className={styles.container}>
      <div className={styles.products}>
        {
          products?.map((product) => (
            <ProductCard
              key={product.id}
              {...product}
            />
          ))
        }
      </div>
    </section>
  )
}


