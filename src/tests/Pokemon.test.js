import React from 'react';

import { screen } from '@testing-library/react';

import userEvent from '@testing-library/user-event';
import { Pokemon } from '../components';
import pokemons from '../data';
import renderWithRouter from '../renderWithRouter';

describe('testando o pokemon.js', () => {
  test('Teste se é renderizado um card com as informações de determinado pokémon', () => {
    renderWithRouter(<Pokemon pokemon={ pokemons[1] } isFavorite />);
    expect(screen.getByTestId('pokemon-name')).toBeInTheDocument();
    expect(screen.getByTestId('pokemon-name')).toHaveTextContent(/charmander/i);
    expect(screen.getByTestId('pokemon-type')).toBeInTheDocument();
    expect(screen.getByTestId('pokemon-type')).toHaveTextContent(/fire/i);
    expect(screen.getByTestId('pokemon-weight')).toBeInTheDocument();
    expect(screen.getByTestId('pokemon-weight')).toHaveTextContent(
      /average weight: 8\.5 kg/i,
    );
    expect(screen.getByAltText(/charmander sprite/i)).toBeInTheDocument();
    expect(screen.getByAltText(/charmander sprite/i).src).toBe(
      'https://cdn2.bulbagarden.net/upload/0/0a/Spr_5b_004.png',
    );
  });
  test(`Teste se o card do pokémon indicado na Pokédex contém um 
  link de navegação para exibir detalhes 
  deste pokémon. O link deve possuir a URL /pokemons/<id>, onde <id> é 
  o id do pokémon exibido`, () => {
    renderWithRouter(<Pokemon pokemon={ pokemons[1] } isFavorite />);
    expect(
      screen.getByRole('link', { name: /more details/i }),
    ).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /more details/i }).href).toMatch(
      'pokemons/4',
    );
  });

  test(`Teste se ao clicar no link de navegação do pokémon,
   é feito o redirecionamento da aplicação para a página de detalhes de pokémon`, () => {
    const { history } = renderWithRouter(
      <Pokemon pokemon={ pokemons[1] } isFavorite />,
    );

    const moreDetails = screen.getByRole('link', { name: /more details/i });
    userEvent.click(moreDetails);
    expect(history.location.pathname).toBe('/pokemons/4');
  });

  test('Teste se existe um ícone de estrela nos pokémons favoritados', () => {
    renderWithRouter(<Pokemon pokemon={ pokemons[1] } isFavorite />);
    expect(
      screen.getByAltText(/charmander is marked as favorite/i),
    ).toBeInTheDocument();
    expect(
      screen.getByAltText(/charmander is marked as favorite/i).src,
    ).toMatch('/star-icon.svg');
  });
});
