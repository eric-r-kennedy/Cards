import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { GameService } from '../game.service';

@Component({
  selector: 'app-start',
  templateUrl: './start.component.html',
  styleUrls: ['./start.component.scss']
})
export class StartComponent {

  numberOfDecks = 1;
  includeJokers = false;

  constructor(
    private router: Router,
    private gameService: GameService
  ) { }

  create(): void {
    this.gameService.create(this.numberOfDecks, this.includeJokers)
      .subscribe(
        deckId => this.router.navigate(['/game', deckId], { queryParams: { jokers: this.includeJokers } })
      );
  }
}
