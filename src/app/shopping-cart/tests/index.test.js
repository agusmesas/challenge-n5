import '@testing-library/jest-dom';
import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { ProductsContext, ProductsDispatchContext } from '../../../../src/context/contexts';
import Page from '../page';

jest.mock('next/navigation', () => ({
  useRouter() {
    return {
      replace: jest.fn(),
    };
  }
}));


const renderComponent = () => {
  const actions = {
    addToCart: jest.fn(),
    buyCart: jest.fn(),
    deleteCartItem: jest.fn(), 
  }

  const view = render(
    <ProductsContext.Provider value={{ 
      shoppingCart: [
        {
          "name": "Huevos",
          "price": 75000,
          "amount": 12,
          "id": 3,
          "quantity": 12,
        }]
      }}>
      <ProductsDispatchContext.Provider value={actions}>
        <Page />
      </ProductsDispatchContext.Provider>
    </ProductsContext.Provider>
  );

  return { view, actions };
}

describe('Shopping cart - Page' , () => {
  it('should render cart correctly', async () => {
    const { view } = renderComponent();

    expect(view.asFragment()).toMatchSnapshot();
  });

  it('should call buyCart action when click button', async () => {
    const { actions } = renderComponent();

    fireEvent.click(screen.getByRole('button', { name: 'Comprar' }));
    expect(actions.buyCart).toHaveBeenCalled();
  });
})