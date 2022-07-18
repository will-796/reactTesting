import React from 'react';

import { screen } from '@testing-library/react';

import userEvent from '@testing-library/user-event';
import App from '../App';
import renderWithRouter from '../renderWithRouter';

describe('testando o about.js', () => {
  test('Teste se a página contém as informações sobre a Pokédex', () => {
    const { history } = renderWithRouter(<App />);
    const link2 = screen.getByRole('link', {
      name: /about/i,
    });
    userEvent.click(link2);
    expect(history.location.pathname).toBe('/about');
    expect(
      screen.getByText(
        /this application simulates a pokédex, a digital encyclopedia containing all/i,
      ),
    ).toBeInTheDocument();
  });

  test('Teste se a página contém um heading h2 com o texto About Pokédex', () => {
    const { history } = renderWithRouter(<App />);
    const link2 = screen.getByRole('link', {
      name: /about/i,
    });
    userEvent.click(link2);
    expect(history.location.pathname).toBe('/about');
    expect(
      screen.getByRole('heading', {
        name: /about pokédex/i,
      }),
    ).toBeInTheDocument();
  });

  test('Teste se a página contém dois parágrafos com texto sobre a Pokédex', () => {
    const { history } = renderWithRouter(<App />);
    const link2 = screen.getByRole('link', {
      name: /about/i,
    });
    userEvent.click(link2);
    expect(history.location.pathname).toBe('/about');
    expect(
      screen.getByText(
        /this application simulates a pokédex, a digital encyclopedia containing all/i,
      ),
    ).toBeInTheDocument();

    expect(
      screen.getByText(
        /one can filter pokémons by type, and see more details for each one of them/i,
      ),
    ).toBeInTheDocument();
  });
  test('Teste se a página contém a seguinte imagem de uma Pokédex', () => {
    const { history } = renderWithRouter(<App />);
    const link2 = screen.getByRole('link', {
      name: /about/i,
    });
    userEvent.click(link2);
    expect(history.location.pathname).toBe('/about');

    expect(
      screen.getByRole('img', {
        name: /pokédex/i,
      }).src,
    ).toBe(
      'https://cdn2.bulbagarden.net/upload/thumb/8/86/Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png',
    );
  });
});
