import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BattlerComponent } from './battler/battler.component';
import { PlayerComponent } from './player/player.component';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatCardModule } from '@angular/material/card';
import { MatRadioModule } from '@angular/material/radio';
import { FormsModule } from '@angular/forms';
import { PlayerCardComponent } from './player/player-card/player-card.component';
import { PeoplePropsComponent } from './player/player-card/people-props/people-props.component';
import { StarshipsPropsComponent } from './player/player-card/starships-props/starships-props.component';
import { MatButtonModule } from '@angular/material/button';

@NgModule({
  declarations: [
    BattlerComponent,
    PlayerComponent,
    PlayerCardComponent,
    PeoplePropsComponent,
    StarshipsPropsComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    MatCardModule,
    MatRadioModule,
    MatProgressSpinnerModule,
    MatButtonModule,
  ],
  exports: [BattlerComponent],
})
export class BattlerGameModule {}
