import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';
import Button from '../../../components/Forms/Button';

describe('Verifica a rederização e o funcionamento do componente Button', () => {
  const mockFunc = jest.fn();

  afterEach(() => mockFunc.mockClear());
  it('verifica se ao passar props para o componente ele renderiza corretamente', () => {
    render(<Button disabled={ false } text="Test" onClick={ mockFunc } id="id-test" />);
    const button = screen.getByTestId('id-test');
    expect(button).toBeInTheDocument();
    expect(button).toHaveTextContent('Test');
    fireEvent.click(button);
    expect(mockFunc).toHaveBeenCalled();
  });

  it('ao passar disabled true como props para o componente ele desabilita', () => {
    render(<Button disabled text="Test" onClick={ mockFunc } id="id-test" />);
    const button = screen.getByTestId('id-test');
    expect(button).toBeInTheDocument();
    expect(button).toHaveTextContent('Test');
    fireEvent.click(button);
    expect(mockFunc).not.toHaveBeenCalledTimes(1);
  });
});
