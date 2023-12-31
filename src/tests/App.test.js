import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import App from '../App';
import userEvent from '@testing-library/user-event';

describe('test da tela home', () => {
  it('na tele a um input onde pode ser buscar pelo nome do planeta', () => {
    render(<App />);
    const getInput = screen.getByTestId('name-filter');
    expect(getInput).toBeInTheDocument();
  });

  it('na tela tem que ter uma select com as opções de coluna', async () => {
    render(<App/>)
    await fetch('https://swapi.dev/api/planets');
    await waitFor(() => {
      const getSelectColumn = screen.getByTestId('column-filter');
      expect(getSelectColumn).toHaveLength(5)
    })
  })

  it('na tela tem que ter uma select com as opções de comparador', () => {
    render(<App/>)
    const getSelectComparison = screen.getByTestId('comparison-filter');
    expect(getSelectComparison).toHaveLength(3)
  })

  it('o header da tabela deve ter 13 colunas', async () => {
    render(<App/>)
    await fetch('https://swapi.dev/api/planets');
    await waitFor(() => {
      const getColumnHeader = screen.getAllByRole('columnheader');
      expect(getColumnHeader).toHaveLength(13);
    })
  })

  it('o linhas da tabela deve ter 11', async () => {
    render(<App/>)
    await fetch('https://swapi.dev/api/planets');
    await waitFor(() => {
      const getRow = screen.getAllByRole('row');
      expect(getRow).toHaveLength(11);
    })
  })

  it('ao clicar em filtrar deve se filtrado com o valores default', async () => {
    render(<App/>)
    await fetch('https://swapi.dev/api/planets');
    await waitFor(() => {
      const getButtonFilter = screen.getByTestId('button-filter');
      userEvent.click(getButtonFilter);
      const getRow = screen.getAllByRole('row');
      expect(getRow).toHaveLength(9);
    })
  })
})
