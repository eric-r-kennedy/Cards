import { Component, OnInit } from '@angular/core';

import { Player } from '../game';
import { GameService } from '../game.service';

@Component({
  selector: 'app-deck',
  templateUrl: './deck.component.html',
  styleUrls: ['./deck.component.scss']
})
export class DeckComponent implements OnInit {

  player: Player;
  numberToDraw = 5;

  constructor(
    private gameService: GameService
  ) { }

  ngOnInit(): void {
    this.player = this.gameService.game.player;
  }

  draw(): void {
    if (this.player.hand.length === 0) {
      const numberOfCards = parseInt(prompt('How many cards?', this.numberToDraw.toString()));
      if (isFinite(numberOfCards)) {
        this.drawToHand(numberOfCards);
        this.numberToDraw = numberOfCards;
      }
    } else {
      this.drawToHand();
    }
  }

  drawToHand(numberOfCards = 1): void {
    this.gameService.draw(numberOfCards, false)
      .subscribe(cards => this.player.hand = this.player.hand.concat(cards));
  }

  drawFacedown(numberOfCards = 1): void {
    this.gameService.draw(numberOfCards, true)
      .subscribe(cards => this.player.hand = this.player.hand.concat(cards));
  }

  drawToTable(numberOfCards = 1): void {
    this.gameService.draw(numberOfCards, false)
      .subscribe(cards => {
        this.player.table.cards = this.player.table.cards.concat(cards);
        if (this.player.table.shared) {
          this.gameService.shareCards(cards).subscribe();
        }
      });
  }
}
