import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BattlerComponent } from './battler/battler.component';
import { PlayerComponent } from './player/player.component';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatCardModule } from '@angular/material/card';
import { MatRadioModule } from '@angular/material/radio';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [BattlerComponent, PlayerComponent],
  imports: [
    CommonModule,
    FormsModule,
    MatCardModule,
    MatRadioModule,
    MatProgressSpinnerModule,
  ],
  exports: [BattlerComponent],
})
export class BattlerGameModule {}
