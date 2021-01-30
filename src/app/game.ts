export interface Game {
  deck: Deck,
  player: Player,
  opponents: Player[]
}

export interface Deck {
  id: string,
  jokers: boolean,
  remaining: number
}

export interface Player {
  name: string,
  hand: Card[],
  table: Table
}

export interface Table {
  cards: Card[],
  shared: boolean
}

export interface Card {
  rank: CardRank,
  suit: CardSuit,
  code: string,
  facedown: boolean
}

export enum CardRank {
  Deuce = '2',
  Three = '3',
  Four = '4',
  Fine = '5',
  Six = '6',
  Seven = '7',
  Eight = '8',
  Nine = '9',
  Ten = '10',
  Jack = 'JACK',
  Queen = 'QUEEN',
  King = 'KING',
  Ace = 'ACE',
  Joker = 'JOKER'
}

export enum CardSuit {
  Diamonds = 'DIAMONDS',
  Clubs = 'CLUBS',
  Hearts = 'HEARTS',
  Spades = 'SPADES'
}
