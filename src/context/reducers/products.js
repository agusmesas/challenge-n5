import { newProductsList, updateShoppingCart, deleteCartItem } from '../../app/utils';

function productsReducer(state, action) {
  switch (action.type) {
    case 'set-products-list': {
      return {
        ...state,
        products: action.products,
      }
    }

    case 'add-to-cart': {
      return {
        ...state,
        shoppingCart: updateShoppingCart(state.shoppingCart, action.product),
      };
    }

    case 'buy-cart': {
      return {
        ...state,
        products: newProductsList(state.products, state.shoppingCart),
        shoppingCart: [],
      }
    }

    case 'delete-cart-item': {
      return {
        ...state,
        shoppingCart: deleteCartItem(state.shoppingCart, action.id),
      }
    }
    
    case 'set-selected-product': {
      return {
        ...state,
        selectedProduct: action.product,
      }
    }

    default: {
      throw Error('Unknown action: ' + action.type);
    }
  }
}

export default productsReducer;