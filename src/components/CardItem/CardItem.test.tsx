import '@testing-library/jest-dom';
import { screen } from '@testing-library/react';
import { useRouter } from 'next/router';
import React from 'react';
import { card, trapCard } from 'src/mocks/mockedData';
import { ICard } from 'src/types/types';
import { renderWithProviders } from 'src/utils/test-utils';

import { CardItem } from '.';

jest.mock('next/router', () => jest.requireActual('next-router-mock'));

describe('Card Item', () => {
  test('Monster card and its data displays correctly', () => {
    renderWithProviders(<CardItem card={card as ICard} />);

    const { name, atk, def } = card;

    const cardName = screen.getByText(name);
    expect(cardName).toBeInTheDocument();

    const cardAtk = screen.getByText(atk as number);
    expect(cardAtk).toBeInTheDocument();

    const cardDef = screen.getByText(def as number);
    expect(cardDef).toBeInTheDocument();
  });

  test('Trap card and its data displays correctly', () => {
    renderWithProviders(<CardItem card={trapCard as ICard} />);

    const cardType = screen.getByText(/Trap/);
    expect(cardType).toBeInTheDocument();

    const cardName = screen.getByText(trapCard.name);
    expect(cardName).toBeInTheDocument();
  });

  test('Monster card and its data displays correctly', () => {
    renderWithProviders(<CardItem card={card as ICard} />);

    const { name, atk, def } = card;

    const cardName = screen.getByText(name);
    expect(cardName).toBeInTheDocument();

    const cardAtk = screen.getByText(atk as number);
    expect(cardAtk).toBeInTheDocument();

    const cardDef = screen.getByText(def as number);
    expect(cardDef).toBeInTheDocument();
  });
});
