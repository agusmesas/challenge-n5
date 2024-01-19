'use client'
import { useEffect, useContext } from 'react';
import Link from 'next/link';
import { ProductsContext, ProductsDispatchContext, LayoutContext } from '../context/contexts';
import { fetchProductsList } from './utils/services';
import ProductCard from './components/ProductCard';
import Button from './components/Button';

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
      <Link className={styles['add-button']} href="/add-product">
        <Button label="Agregar producto" />
      </Link>
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


