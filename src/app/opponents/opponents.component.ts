import { Component, OnInit } from '@angular/core';
import { timer } from 'rxjs';
import { switchMap, takeWhile } from 'rxjs/operators';

import { Player } from '../game';
import { GameService } from '../game.service';

@Component({
  selector: 'app-opponents',
  templateUrl: './opponents.component.html',
  styleUrls: ['./opponents.component.scss']
})
export class OpponentsComponent implements OnInit {

  player: Player;
  opponents: Player[];

  constructor(
    private gameService: GameService
  ) { }

  ngOnInit(): void {
    this.player = this.gameService.game.player;
    this.opponents = this.gameService.game.opponents;
  }

  add(): void {
    const name = prompt('Player name:');
    if (name && this.getIndex(name) === -1) {
      this.opponents.push({
        name: name,
        hand: [],
        table: {
          cards: [],
          shared: true
        }
      });
      timer(0, 5000)
        .pipe(
          takeWhile(() => this.getIndex(name) !== -1),
          switchMap(() => this.gameService.getOpponent(name))
        )
        .subscribe(opponent => this.opponents[this.getIndex(name)] = opponent);
    }
  }

  remove(opponent: Player): void {
    if (confirm('This will remove the player. Are you sure?')) {
      this.opponents.splice(this.opponents.findIndex(it => it === opponent), 1);
    }
  }

  toggleSharing(event: any): void {
    if (event.target.checked) {
      const playerName = prompt('Player name:', this.player.name || '');
      if (playerName) {
        this.player.name = playerName;
        this.share();
      } else {
        event.target.checked = false;
      }
    } else {
      this.unshare();
    }
  }

  share(): void {
    this.gameService.shareCards(this.player.table.cards).subscribe();
    this.player.table.shared = true;
  }

  unshare(): void {
    this.gameService.unshareAllCards().subscribe();
    this.player.table.shared = false;
  }

  private getIndex(name: string) {
    return this.opponents.findIndex(it => it.name === name);
  }
}
