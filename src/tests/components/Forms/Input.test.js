import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';
import Input from '../../../components/Forms/Input';

describe('teste a renderização e o funcionamento do componente input', () => {
  it(' verifica se ao passar props é renderizado corretamente', () => {
    let string = '';
    const testFunc = ({ target: { value } }) => { string = value; };
    render(
      <Input
        labelText="Input de test"
        type="text"
        onChange={ testFunc }
        value="texto"
        id="id-de-test"
      />,
    );
    const input = screen.getByLabelText('Input de test');
    expect(input).toBeInTheDocument();
    expect(input).toHaveAttribute('type', 'text');
    fireEvent.change(input, { target: { value: 'texto de teste' } });
    expect(string).toBe('texto de teste');
    expect(input).toHaveValue('texto');
    expect(screen.getByTestId('id-de-test')).toBeInTheDocument();
  });
});
