import { Directive, ElementRef, Input, OnChanges } from '@angular/core';

import { Card, CardRank } from './game';

@Directive({
  selector: '[appCard]'
})
export class CardDirective implements OnChanges {

  constructor(
    private el: ElementRef
  ) { }

  @Input('appCard') card: Card;

  ngOnChanges() {
    this.el.nativeElement.style.backgroundImage = `url(${this.getImageUrl()})`;
  }

  private getImageUrl(): string {
    if (!this.card || this.card.facedown) {
      return 'assets/deck/back.png';
    } else if (this.card.rank === CardRank.Joker) {
      return 'assets/deck/joker.svg';
    } else {
      return 'assets/deck/' + this.card.suit.toLowerCase() + '.' + this.card.rank.toLowerCase() + '.svg';
    }
  }
}
