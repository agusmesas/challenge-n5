import '@testing-library/jest-dom';
import React from 'react';
import { waitFor, render, screen, act } from '@testing-library/react';
import Page from '../page';
import Context from '../../../../context';

jest.mock('next/navigation', () => ({
  useRouter() {
    return {
      prefetch: () => null
    };
  }
}));

global.fetch = jest.fn(() => Promise.resolve({
  json: () => Promise.resolve(
    {
      "name": "Leche",
      "price": 75000,
      "amount": 0,
      "id": 1
    },
  )
}));

const renderComponent = () => {
  const props = {
    params: { id: 1 }
  }

  const view = render(
    <Context>
      <Page {...props} />
    </Context>
  );

  return { view, props };
}

describe('Product detail - Page' , () => {
  it('should render correctly the product', async () => {
    renderComponent();

    await waitFor(() => {
      expect(screen.getByText('Leche')).toBeInTheDocument();
      expect(screen.getByText('$ 75000')).toBeInTheDocument();
    })
  });

  it('should buttons disabled when not have more stock', async () => {
    renderComponent();
  
    await waitFor(() => {
      expect(screen.getByRole('button', { name: 'Comprar' })).toBeDisabled();
      expect(screen.getByRole('button', { name: 'Agregar al carrito' })).toBeDisabled();
    })
  });
})