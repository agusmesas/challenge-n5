import { useReducer } from 'react';
import { ProductsContext, ProductsDispatchContext, LayoutContext } from './contexts';

// Reducers
import productsReducer from './reducers/products';
import layoutReducer from './reducers/layout';

const initialState = {
  products: [],
  shoppingCart: []
}

const getInitialState = () => {
  const shoppingCart = JSON.parse(localStorage.getItem('cart')) || [];

  return {
    ...initialState,
    shoppingCart
  }
}

export default function Context({ children }) {
  const [productsState, productDispatch] = useReducer(
    productsReducer,
    initialState,
  );
  const [layoutState, layoutDispatch] = useReducer(
    layoutReducer,
    { loading: false },
  );

  function setInitialCart(cart) {
    productDispatch({
      type: 'set-initial-cart',
      cart,
    });
  }

  function addToCart(product) {
    productDispatch({
      type: 'add-to-cart',
      product,
    });
  }

  function buyCart(product) {
    productDispatch({
      type: 'buy-cart',
      product,
    });
  }

  function deleteCartItem(id) {
    productDispatch({
      type: 'delete-cart-item',
      id,
    });
  }

  function setSelectedProduct(product) {
    productDispatch({
      type: 'set-selected-product',
      product,
    });
  }

  function setProducts(products) {
    productDispatch({
      type: 'set-products-list',
      products
    });
  }

  function setLoading(loading) {
    layoutDispatch({
      type: 'set-loading',
      loading
    });
  }

  const productActions = {
    addToCart,
    buyCart,
    deleteCartItem,
    setSelectedProduct,
    setProducts,
    setInitialCart,
  };

  const layoutActions = {
    setLoading
  }

  return (
    <LayoutContext.Provider value={{ state: layoutState, actions: layoutActions }}>
      <ProductsContext.Provider value={productsState}>
        <ProductsDispatchContext.Provider value={productActions}>
          {children}
        </ProductsDispatchContext.Provider>
      </ProductsContext.Provider>
    </LayoutContext.Provider>
  );
}
