import React from 'react';

import { screen } from '@testing-library/react';

import userEvent from '@testing-library/user-event';
import App from '../App';
import pokemons from '../data';
import renderWithRouter from '../services/renderWithRouter';

const pokemonName = 'pokemon-name';
describe('testando o pokedex.js', () => {
  test('Teste se a página contém um heading h2 com o texto Encountered pokémons', () => {
    renderWithRouter(<App />);
    const h2Pokedex = screen.getByRole('heading', {
      name: /encountered pokémons/i,
    });
    expect(h2Pokedex).toBeInTheDocument();
  });

  test(`Teste se é exibido o próximo pokémon da lista
   quando o botão Próximo pokémon é clicado`, () => {
    renderWithRouter(<App />);
    const nextPoke = screen.getByRole('button', {
      name: /próximo pokémon/i,
    });
    expect(nextPoke).toBeInTheDocument();

    pokemons.forEach((pokemon) => {
      expect(screen.getByText(`${pokemon.name}`)).toBeInTheDocument();
      userEvent.click(nextPoke);
    });
    expect(screen.getByText(/pikachu/i)).toBeInTheDocument();
  });

  test('Teste se é mostrado apenas um pokémon por vez;', () => {
    renderWithRouter(<App />);
    const pokemonRender = screen.getAllByTestId(pokemonName);
    expect(pokemonRender).toHaveLength(1);
  });

  test('Teste se a Pokédex tem os botões de filtro', () => {
    renderWithRouter(<App />);
    const numberButtons = 7;
    const filterButoons = screen.getAllByTestId('pokemon-type-button');
    expect(filterButoons).toHaveLength(numberButtons);
    expect(screen.getByRole('button', { name: /all/i })).toBeInTheDocument();

    expect(screen.getAllByRole('button', { name: /electric/i })).toHaveLength(
      1,
    );
    expect(screen.getAllByRole('button', { name: /fire/i })).toHaveLength(1);
    expect(screen.getAllByRole('button', { name: /bug/i })).toHaveLength(1);
    expect(screen.getAllByRole('button', { name: /poison/i })).toHaveLength(1);
    expect(screen.getAllByRole('button', { name: /psychic/i })).toHaveLength(1);
    expect(screen.getAllByRole('button', { name: /normal/i })).toHaveLength(1);
    expect(screen.getAllByRole('button', { name: /dragon/i })).toHaveLength(1);

    userEvent.click(screen.getByRole('button', { name: /poison/i }));
    expect(screen.getByText(/ekans/i)).toBeInTheDocument();
  });

  test('Teste se a Pokédex contém um botão para resetar o filtro', () => {
    renderWithRouter(<App />);
    const nextPoke = screen.getByRole('button', { name: /próximo pokémon/i });
    const buttonAll = screen.getByRole('button', { name: /all/i });
    expect(buttonAll).toBeInTheDocument();
    userEvent.click(buttonAll);
    expect(screen.getByTestId(pokemonName)).toHaveTextContent(/Pikachu/);
    userEvent.click(nextPoke);
    expect(screen.getByTestId(pokemonName)).toHaveTextContent(/Charmander/);
  });
});
