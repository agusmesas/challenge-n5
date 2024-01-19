import '@testing-library/jest-dom';
import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { ProductsContext, ProductsDispatchContext } from '../../../../src/context/contexts';
import Context from '../../../../src/context';
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

  // const view = render(
  //   <ProductsContext.Provider value={{
  //     shoppingCart: [
  //       {
  //         "name": "Huevos",
  //         "price": 75000,
  //         "amount": 12,
  //         "id": 3,
  //         "quantity": 1,
  //       }]
  //     }}>
  //     <ProductsDispatchContext.Provider value={actions}>
  //       <Page />
  //     </ProductsDispatchContext.Provider>
  //   </ProductsContext.Provider>
  // );

  const view = render(
    <Context initialState={{
          products: [{
            "name": "Huevos",
            "price": 75000,
            "amount": 12,
            "id": 3,
            "quantity": 1,
          }],
          shoppingCart: [
            {
              "name": "Huevos",
              "price": 75000,
              "amount": 12,
              "id": 3,
              "quantity": 1,
            },
          ]
          }}>
      <Page />
    </Context>);

  return { view, actions };
}

describe('Shopping cart - Page' , () => {
  it('should render cart correctly', async () => {
    const { view } = renderComponent();

    expect(view.asFragment()).toMatchSnapshot();
  });

  it('should buy products when click button', async () => {
    renderComponent();

    expect(screen.getByText('Total: $ 75000')).toBeInTheDocument();

    fireEvent.click(screen.getByRole('button', { name: 'Comprar' }));

    expect(screen.getByText('Total: $ 0')).toBeInTheDocument();
  });

  it('should delete product of cart', async () => {
    renderComponent();

    fireEvent.click(screen.getAllByRole('button')[2]);

    expect(screen.getByText('Total: $ 0')).toBeInTheDocument();
  });

  it('should add more quantity to cart', async () => {
    renderComponent();

    fireEvent.click(screen.getAllByRole('button')[1]);

    expect(screen.getByRole('textbox').value).toBe('2');
    expect(screen.getByText('Total: $ 150000')).toBeInTheDocument();
  });
})