import '@testing-library/jest-dom';
import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';
import Button from './';

const renderComponent = (propOverride) => {
  const props = {
    label: 'button text',
    onClick: jest.fn(),
    disabled: false,
    theme: 'primary',
    ...propOverride,
  }

  const view = render(<Button {...props} />);

  return { view, props };
}

describe('Button' , () => {
  it('should render correctly', async () => {
    const { view } = renderComponent();

    expect(view.asFragment()).toMatchSnapshot();
  });

  it('should call onClick', async () => {
    const { props } = renderComponent();

    const button = screen.getByRole('button');
    fireEvent.click(button);

    expect(props.onClick).toHaveBeenCalled();
  });
})