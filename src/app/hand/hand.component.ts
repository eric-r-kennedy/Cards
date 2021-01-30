import { Component, OnInit } from '@angular/core';

import { Player, Card, CardRank, CardSuit } from '../game';
import { GameService } from '../game.service';

@Component({
  selector: 'app-hand',
  templateUrl: './hand.component.html',
  styleUrls: ['./hand.component.scss']
})
export class HandComponent implements OnInit {

  player: Player;

  constructor(
    private gameService: GameService
  ) { }

  ngOnInit(): void {
    this.player = this.gameService.game.player;
  }

  sortByRank(): void {
    this.player.hand
      .sort((a, b) => this.getSuitSortOrder(a) - this.getSuitSortOrder(b))
      .sort((a, b) => this.getRankSortOrder(a) - this.getRankSortOrder(b));
  }

  sortBySuit(): void {
    this.player.hand
      .sort((a, b) => this.getRankSortOrder(a) - this.getRankSortOrder(b))
      .sort((a, b) => this.getSuitSortOrder(a) - this.getSuitSortOrder(b));
  }

  putDown(card: Card): void {
    this.player.hand.splice(this.player.hand.findIndex(it => it === card), 1);
    card.facedown = false;
    this.player.table.cards.push(card);
    if (this.player.table.shared) {
      this.gameService.shareCards([card]).subscribe();
    }
  }

  private getRankSortOrder(card: Card): number {
    if (card.facedown) {
      return 0;
    } else {
      switch (card.rank) {
        case CardRank.Ace:
          return 14;
        case CardRank.King:
          return 13;
        case CardRank.Queen:
          return 12;
        case CardRank.Jack:
          return 11;
        default:
          return parseInt(card.rank);
      }
    }
  }

  private getSuitSortOrder(card: Card): number {
    if (card.facedown) {
      return 0;
    } else {
      switch (card.suit) {
        case CardSuit.Diamonds:
          return 1;
        case CardSuit.Clubs:
          return 2;
        case CardSuit.Hearts:
          return 3;
        case CardSuit.Spades:
          return 4;
      }
    }
  }
}
