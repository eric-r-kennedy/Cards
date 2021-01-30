import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { GameComponent } from './game/game.component';
import { DeckComponent } from './deck/deck.component';
import { HandComponent } from './hand/hand.component';
import { TableComponent } from './table/table.component';
import { OpponentsComponent } from './opponents/opponents.component';
import { CardDirective } from './card.directive';
import { StartComponent } from './start/start.component';

@NgModule({
  declarations: [
    AppComponent,
    StartComponent,
    GameComponent,
    DeckComponent,
    HandComponent,
    TableComponent,
    OpponentsComponent,
    CardDirective
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
