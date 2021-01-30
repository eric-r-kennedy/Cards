import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { Game } from '../game';
import { GameService } from '../game.service';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.scss']
})
export class GameComponent implements OnInit {

  game: Game;

  constructor(
    private route: ActivatedRoute,
    private gameService: GameService
  ) { }

  ngOnInit(): void {
    this.game = this.gameService.game;
    this.game.deck.id = this.route.snapshot.paramMap.get('deckId');
    this.game.deck.jokers = this.route.snapshot.paramMap.get('jokers') === 'true';
  }

  shuffle(): void {
    if (confirm('This will start the game over. Are you sure?')) {
      this.gameService.shuffle()
        .subscribe(() => {
          this.game.player.hand = [];
          this.game.player.table.cards = [];
        });
    }
  }

  discard(): void {
    if (confirm('This will discard all of your cards. Are you sure?')) {
      this.game.player.hand = [];
      this.game.player.table.cards = [];
      if (this.game.player.table.shared) {
        this.gameService.unshareAllCards().subscribe();
      }
    }
  }
}
