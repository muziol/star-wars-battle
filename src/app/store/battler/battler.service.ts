import { Injectable } from '@angular/core';
import { Store } from '@ngxs/store';
import { ChangeDataType, Players } from './battler.actions';
import { DataType } from 'src/app/services/backend.interface';

@Injectable({
  providedIn: 'root',
})
export class BattlerService {
  constructor(private readonly store: Store) {}

  public addCardsToPlayers(): void {
    this.store.dispatch(new Players.AddCards());
  }

  public clearPlayersScore(): void {
    this.store.dispatch(new Players.ClearScores());
  }

  public changeDataType(newType: DataType): void {
    this.store.dispatch(new ChangeDataType(newType));
  }
}
