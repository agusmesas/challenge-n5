import { productsTypes } from '../types';
import { newProductsList, updateShoppingCart, deleteCartItem } from '../../app/utils';

function productsReducer(state, action) {
  switch (action.type) {
    case productsTypes.SET_PRODUCTS_LIST: {
      return {
        ...state,
        products: action.products,
      }
    }

    case productsTypes.ADD_TO_CART: {
      return {
        ...state,
        shoppingCart: updateShoppingCart(state.shoppingCart, action.product),
      };
    }

    case productsTypes.BUY_CART: {
      return {
        ...state,
        products: newProductsList(state.products, state.shoppingCart),
        shoppingCart: [],
      }
    }

    case productsTypes.DELETE_CART_ITEM: {
      return {
        ...state,
        shoppingCart: deleteCartItem(state.shoppingCart, action.id),
      }
    }

    case productsTypes.SET_SELECTED_PRODUCT: {
      return {
        ...state,
        selectedProduct: action.product,
      }
    }

    case productsTypes.SET_INITIAL_CART: {
      return {
        ...state,
        shoppingCart: action.cart,
      }
    }

    default: {
      throw Error('Unknown action: ' + action.type);
    }
  }
}

export default productsReducer;