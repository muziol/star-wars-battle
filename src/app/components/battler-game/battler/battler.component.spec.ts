import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BattlerComponent } from './battler.component';
import { NgxsModule } from '@ngxs/store';
import { BattlerState } from 'src/app/store/battler';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { MatRadioModule } from '@angular/material/radio';
import { FormsModule } from '@angular/forms';
import { PlayerComponent } from '../player/player.component';
import { PlayerCardComponent } from '../player/player-card/player-card.component';
import { MatCardModule } from '@angular/material/card';

describe('BattlerComponent', () => {
  let component: BattlerComponent;
  let fixture: ComponentFixture<BattlerComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        NgxsModule.forRoot([BattlerState]),
        HttpClientTestingModule,
        MatRadioModule,
        FormsModule,
        MatCardModule,
      ],
      declarations: [BattlerComponent, PlayerComponent, PlayerCardComponent],
    });
    fixture = TestBed.createComponent(BattlerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
