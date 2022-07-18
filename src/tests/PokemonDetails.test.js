import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import React from 'react';
import App from '../App';

import renderWithRouter from '../renderWithRouter';

describe('testando o pokemonDetails.js', () => {
  test(`Teste se as informações detalhadas do
   pokémon selecionado são mostradas na tela`, () => {
    renderWithRouter(<App />);
    const moreDetails = screen.getByRole('link', { name: /more details/i });
    userEvent.click(moreDetails);
    expect(
      screen.getByRole('heading', { name: /pikachu details/i }),
    ).toBeInTheDocument();
    expect(moreDetails).not.toBeInTheDocument();
    expect(
      screen.getByRole('heading', { name: /summary/i }),
    ).toBeInTheDocument();
    expect(
      screen.getByText(
        /this intelligent pokémon roasts hard berries with electricity to make them /i,
      ),
    ).toBeInTheDocument();
  });
  test(`Teste se existe na página uma seção com os
   mapas contendo as localizações do pokémon`, () => {
    renderWithRouter(<App />);
    const moreDetails = screen.getByRole('link', { name: /more details/i });
    userEvent.click(moreDetails);
    expect(
      screen.getByRole('heading', { name: /game locations of pikachu/i }),
    ).toBeInTheDocument();
    expect(screen.getByText(/kanto viridian forest/i)).toBeInTheDocument();
    expect(screen.getByText(/kanto power plant/i)).toBeInTheDocument();
    expect(
      screen.getAllByRole('img', { name: /Pikachu location/i })[0].src,
    ).toBe('https://cdn2.bulbagarden.net/upload/0/08/Kanto_Route_2_Map.png');
    expect(
      screen.getAllByRole('img', { name: /Pikachu location/i })[1].src,
    ).toBe(
      'https://cdn2.bulbagarden.net/upload/b/bd/Kanto_Celadon_City_Map.png',
    );
    expect(
      screen.getAllByRole('img', { name: /Pikachu location/i })[0].alt,
    ).toBe('Pikachu location');
    expect(
      screen.getAllByRole('img', { name: /Pikachu location/i })[1].alt,
    ).toBe('Pikachu location');
  });

  test(`Teste se o card do pokémon indicado na Pokédex contém um
  link de navegação para exibir detalhes
  deste pokémon. O link deve possuir a URL /pokemons/<id>, onde <id> é
  o id do pokémon exibido`, () => {
    renderWithRouter(<App />);
    const moreDetails = screen.getByRole('link', { name: /more details/i });
    userEvent.click(moreDetails);
    const checkbox = screen.getByText(/pokémon favoritado\?/i);
    expect(checkbox).toBeInTheDocument();
    userEvent.click(checkbox);
    userEvent.click(checkbox);
    userEvent.click(checkbox);
    userEvent.click(screen.getByRole('link', {
      name: /favorite pokémons/i,
    }));
    expect(screen.getByText(/pikachu/i)).toBeInTheDocument();
  });
});
