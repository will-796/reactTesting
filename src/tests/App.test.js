import React from 'react';

import { screen } from '@testing-library/react';

import userEvent from '@testing-library/user-event';
import App from '../App';
import renderWithRouter from '../renderWithRouter';

describe('testando o app.js', () => {
  test(`Teste se o topo da aplicação contém
   um conjunto fixo de links de navegação:`, () => {
    renderWithRouter(<App />);
    const link1 = screen.getByText(/Home/i);
    const link2 = screen.getByText(/About/i);
    const link3 = screen.getByText(/Favorite Pokémons/i);
    expect(link1).toBeInTheDocument();
    expect(link2).toBeInTheDocument();
    expect(link3).toBeInTheDocument();
  });

  test(`Teste se a aplicação é redirecionada para a página inicial,
   na URL / ao clicar no link Home da barra de navegação`, () => {
    const { history } = renderWithRouter(<App />);
    const link1 = screen.getByText(/Home/i);

    userEvent.click(link1);

    expect(history.location.pathname).toBe('/');
  });

  test(`Teste se a aplicação é redirecionada para a página de About,
   na URL /about, ao clicar no link About da barra de navegação`, () => {
    const { history } = renderWithRouter(<App />);
    const link2 = screen.getByRole('link', {
      name: /about/i,
    });

    userEvent.click(link2);

    expect(history.location.pathname).toBe('/about');
  });
});
test(`Teste se a aplicação é redirecionada para a página Not Found
 ao entrar em uma URL desconhecida.`, () => {
  const { history } = renderWithRouter(<App />);

  history.push('/notFound');

  expect(
    screen.getByRole('heading', {
      name: /page requested not found/i,
    }),
  ).toBeInTheDocument();
});
