import { useReducer } from 'react';
import { ProductsContext, ProductsDispatchContext, LayoutContext } from './contexts';

// Reducers
import productsReducer from './reducers/products';
import layoutReducer from './reducers/layout';

import { productsTypes, layoutTypes } from './types';

const defaultState = {
  products: [],
  shoppingCart: []
}

export default function Context({ initialState, children }) {
  const [productsState, productDispatch] = useReducer(
    productsReducer,
    initialState || defaultState,
  );
  const [layoutState, layoutDispatch] = useReducer(
    layoutReducer,
    { loading: false },
  );

  function setInitialCart(cart) {
    productDispatch({
      type: productsTypes.SET_INITIAL_CART,
      cart,
    });
  }

  function addToCart(product) {
    productDispatch({
      type: productsTypes.ADD_TO_CART,
      product,
    });
  }

  function buyCart(product) {
    productDispatch({
      type: productsTypes.BUY_CART,
      product,
    });
  }

  function deleteCartItem(id) {
    productDispatch({
      type: productsTypes.DELETE_CART_ITEM,
      id,
    });
  }

  function setSelectedProduct(product) {
    productDispatch({
      type: productsTypes.SET_SELECTED_PRODUCT,
      product,
    });
  }

  function setProducts(products) {
    productDispatch({
      type: productsTypes.SET_PRODUCTS_LIST,
      products
    });
  }

  function setLoading(loading) {
    layoutDispatch({
      type: layoutTypes.SET_LOADING,
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
