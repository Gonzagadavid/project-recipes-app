import { fireEvent, screen } from '@testing-library/dom';
import { render } from '@testing-library/react';
import React from 'react';
import Select from '../../../components/Forms/Select';

describe('verifica a renderizacao e o funcionamento do componente Select', () => {
  const stateTest = { key: '' };
  const testOptions = ['option 1', 'option 2', 'option 3'];
  it('verifica se ao passar props o componente rederiza corretamente', () => {
    render(
      <Select
        labelText="selecione o teste"
        id="id-test"
        onChange={ ({ target: { value } }) => { stateTest.key = value; } }
        options={ testOptions }
      />,
    );
    const select = screen.getByLabelText('selecione o teste');
    const options = screen.getAllByRole('option');

    expect(select).toBeInTheDocument();
    expect(select).toHaveProperty('id', 'id-test');
    expect(screen.getByTestId('id-test')).toBeInTheDocument();
    expect(options).toHaveLength(testOptions.length);

    fireEvent.click(options[0]);
    fireEvent.change(select, { target: { value: testOptions[0] } });

    expect(select).toHaveValue(testOptions[0]);
    expect(stateTest.key).toBe(testOptions[0]);
  });
});
