import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Observable } from 'rxjs';
import { Select, Store } from '@ngxs/store';
import {
  BattlerState,
  DataType,
  PlayerModel,
} from '../../../store/battler/battler.state';
import {
  ChangeDataType,
  Players,
} from '../../../store/battler/battler.actions';
import { BattleStatusType } from '../player/player.component';
import { getPlayerStatus } from '../player/player.utils';

@Component({
  selector: 'app-battler',
  templateUrl: './battler.component.html',
  styleUrls: ['./battler.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BattlerComponent {
  public readonly dataTypes: DataType[] = ['people', 'starships'];

  @Select(BattlerState.dateType) dataType$!: Observable<DataType>;
  @Select(BattlerState.players) players$!: Observable<PlayerModel[]>;
  @Select(BattlerState.lastWinnerId) lastWinnerId$!: Observable<number>;
  @Select(BattlerState.inProgress) inProgress$!: Observable<boolean>;

  constructor(private readonly store: Store) {}

  public async startGame(): Promise<void> {
    this.store.dispatch(new Players.AddCards());
  }

  public clearScores(): void {
    this.store.dispatch(new Players.ClearScores());
  }

  public changeDataType(newType: DataType): void {
    this.store.dispatch(new ChangeDataType(newType));
  }

  public getPlayerStatus(
    player: PlayerModel,
    wonPlayerId: number | null,
    gameInProgress: boolean,
  ): BattleStatusType {
    return getPlayerStatus(player, wonPlayerId, gameInProgress);
  }
}
