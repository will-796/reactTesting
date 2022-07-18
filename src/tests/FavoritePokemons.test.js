import React from 'react';

import { screen } from '@testing-library/react';

import userEvent from '@testing-library/user-event';
import App from '../App';
import renderWithRouter from '../renderWithRouter';

describe('testando o favorite.js', () => {
  test(`Teste se é exibida na tela a mensagem No favorite pokemon found,
   caso a pessoa não tenha pokémons favoritos`, () => {
    const { history } = renderWithRouter(<App />);
    const link3 = screen.getByRole('link', {
      name: /favorite pokémons/i,
    });
    userEvent.click(link3);
    expect(history.location.pathname).toBe('/favorites');
    expect(
      screen.getByText(/no favorite pokemon found/i),
    ).toBeInTheDocument();
  });

  test('Teste se são exibidos todos os cards de pokémons favoritados', () => {
    const { history } = renderWithRouter(<App />);

    const details = screen.getByRole('link', {
      name: /more details/i,
    });

    const link3 = screen.getByRole('link', {
      name: /favorite pokémons/i,
    });

    userEvent.click(details);
    expect(history.location.pathname).toBe('/pokemons/25');
    const checkboxPikachu = screen.getByText(/pokémon favoritado\?/i);
    userEvent.click(checkboxPikachu);
    userEvent.click(link3);
    expect(history.location.pathname).toBe('/favorites');
    expect(
      screen.getByText(/pikachu/i),
    ).toBeInTheDocument();
  });
});
