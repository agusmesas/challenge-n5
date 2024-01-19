const calculateTotalPrice = array => array.reduce(((accumulator, { price, quantity = 1 }) => accumulator + (price * quantity)), 0);

const newProductsList = (productsList, cartList) => {
  const cloneProductsList = JSON.parse(JSON.stringify(productsList));

  cartList.forEach(restarItem => {
    const newProduct = cloneProductsList.find(objeto => objeto.id === restarItem.id);

    if (newProduct) {
      newProduct.amount -= restarItem.quantity;
    }
  });

  localStorage.removeItem('cart');

  return cloneProductsList;
}

const updateShoppingCart = (shoppingCart, newProduct) => {
  let cloneShoppingCart = JSON.parse(JSON.stringify(shoppingCart));

  if(cloneShoppingCart.find(({ id }) => id === newProduct.id)) {
    cloneShoppingCart = cloneShoppingCart.map((product) => product.id === newProduct.id ? newProduct : product);
  } else {
    cloneShoppingCart.push(newProduct);
  }

  localStorage.setItem('cart', JSON.stringify(cloneShoppingCart));

  return cloneShoppingCart;
};

const deleteCartItem = (shoppingCart, id) => {
  const newShoppingCart = shoppingCart.filter((cartItem) => cartItem.id !== id);

  localStorage.setItem('cart', JSON.stringify(newShoppingCart));

  return newShoppingCart;
} 

export {
  calculateTotalPrice,
  newProductsList,
  updateShoppingCart,
  deleteCartItem,
}