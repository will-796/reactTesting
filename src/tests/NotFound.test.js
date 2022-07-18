import React from 'react';

import { screen } from '@testing-library/react';

import { NotFound } from '../pages';
import renderWithRouter from '../services/renderWithRouter';

describe('testando o notFound.js', () => {
  test(`Teste se a página contém um heading h2
   com o texto Page requested not found`, () => {
    renderWithRouter(<NotFound />);
    const divNotFound = screen.getByRole('heading', {
      name: /page requested not found/i,
    });
    expect(divNotFound).toBeInTheDocument();
  });

  test('Teste se a página mostra a imagem https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif', () => {
    renderWithRouter(<NotFound />);
    const imgNotFound = screen.getByRole('img', {
      name: /pikachu crying because the page requested was not found/i,
    });
    expect(imgNotFound.src).toBe('https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif');
  });
});
