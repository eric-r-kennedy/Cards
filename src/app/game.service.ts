import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpParams } from '@angular/common/http';
import { Observable, of, throwError } from 'rxjs';
import { map, pluck, mergeMap, tap, catchError } from 'rxjs/operators';

import { Game, Card, Player } from './game';

@Injectable({
  providedIn: 'root'
})
export class GameService {

  private api = 'https://deckofcardsapi.com/api/deck';

  public game: Game = {
    deck: {
      id: null,
      remaining: null,
      jokers: false
    },
    player: {
      name: null,
      hand: [],
      table: {
        cards: [],
        shared: false
      }
    },
    opponents: []
  };

  constructor(
    private http: HttpClient
  ) { }

  create(numberOfDecks: number, includeJokers: boolean): Observable<string> {
    const url = `${this.api}/new/shuffle/`;
    const params = new HttpParams()
      .set('deck_count', numberOfDecks.toString())
      .set('jokers_enabled', includeJokers ? 'true' : 'false');
    return this.http.get<any>(url, {params: params}).pipe(
      map(response => response.deck_id),
      catchError(error => this.handleError(error))
    );
  }

  shuffle(): Observable<void> {
    const url = `${this.api}/${this.game.deck.id}/shuffle/`;
    const params = new HttpParams().set('jokers_enabled', String(this.game.deck.jokers));
    return this.http.get<void>(url, {params: params}).pipe(
      catchError(error => this.handleError(error))
    );
  }

  draw(numberOfCards: number, facedown: boolean): Observable<Card[]> {
    const url = `${this.api}/${this.game.deck.id}/draw/`;
    const params = new HttpParams().set('count', numberOfCards.toString());
    return this.http.get<any>(url, {params: params}).pipe(
      tap(response => {
        if (response.error) {
          throw new Error(response.error);
        };
      }),
      pluck('cards'),
      map((cards: any[]) =>
        cards.map((card: any) => ({
          rank: card.value,
          suit: card.suit,
          code: card.code,
          facedown: facedown
        }))
      ),
      catchError(error => this.handleError(error))
    );
  }

  shareCards(cards: Card[]): Observable<void> {
    const url = `${this.api}/${this.game.deck.id}/pile/${this.game.player.name}/add/`;
    const params = new HttpParams().set('cards', cards.map(card => card.code).join(','));
    return this.http.get<any>(url, {params: params}).pipe(
      catchError(error => this.handleError(error))
    );
  }

  unshareCards(cards: Card[]): Observable<void> {
    const url = `${this.api}/${this.game.deck.id}/pile/${this.game.player.name}/draw/`;
    const params = new HttpParams().set('cards', cards.map(card => card.code).join(','));
    return this.http.get<any>(url, {params: params}).pipe(
      catchError(error => this.handleError(error))
    );
  }

  unshareAllCards(): Observable<void> {
    const url = `${this.api}/${this.game.deck.id}/pile/${this.game.deck.id}/list/`;
    return this.http.get<any>(url).pipe(
      pluck('piles'),
      mergeMap((piles: any) => {
        const remaining: number = piles[this.game.player.name].remaining;
        if (!remaining) {
          return of();
        }
        const drawUrl = `${this.api}/${this.game.deck.id}/pile/${this.game.player.name}/draw/`;
        const drawParams = new HttpParams().set('count', remaining.toString());
        return this.http.get<any>(drawUrl, {params: drawParams});
      }),
      catchError(error => this.handleError(error))
    );
  }

  getOpponent(name: string): Observable<Player> {
    const url = `${this.api}/${this.game.deck.id}/pile/${name}/list/`;
    return this.http.get<any>(url).pipe(
      pluck('piles', name, 'cards'),
      map((cards: any[]) => ({
        name: name,
        hand: [],
        table: {
          cards: cards ? cards.map((card: any) => ({
            rank: card.value,
            suit: card.suit,
            code: card.code,
            facedown: false
          })) : [],
          shared: true
        }
      })),
      catchError(error => this.handleError(error))
    );
  }

  private handleError(error: any) {
    let message: string;
    if (error instanceof HttpErrorResponse) {
      message = error.error;
    } else if (error instanceof Error) {
      message = error.message;
    } else {
      message = error;
    }
    alert(message);
    return throwError(message);
  }
}
