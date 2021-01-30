import { Component, OnInit } from '@angular/core';

import { Player, Card } from '../game';
import { GameService } from '../game.service';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss']
})
export class TableComponent implements OnInit {

  player: Player;

  constructor(
    private gameService: GameService
  ) { }

  ngOnInit(): void {
    this.player = this.gameService.game.player;
  }

  pickUp(card: Card): void {
    this.player.table.cards.splice(this.player.table.cards.findIndex(it => it === card), 1);
    this.player.hand.push(card);
    if (this.player.table.shared) {
      this.gameService.unshareCards([card]).subscribe();
    }
  }
}
