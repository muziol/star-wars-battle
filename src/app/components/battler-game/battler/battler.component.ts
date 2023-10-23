import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Observable } from 'rxjs';
import { Select } from '@ngxs/store';
import { BattleStatusType } from '../player/player.component';
import { getPlayerStatus } from '../player/player.utils';
import { BattlerService } from 'src/app/store/battler/battler.service';
import { DataType, BattlerState, PlayerModel } from 'src/app/store/battler';

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

  constructor(private readonly battlerService: BattlerService) {}

  public startGame(): void {
    this.battlerService.addCardsToPlayers();
  }

  public clearScores(): void {
    this.battlerService.clearPlayersScore();
  }

  public changeDataType(newType: DataType): void {
    this.battlerService.changeDataType(newType);
  }

  public getPlayerStatus(
    player: PlayerModel,
    wonPlayerId: number | null,
    gameInProgress: boolean,
  ): BattleStatusType {
    return getPlayerStatus(player, wonPlayerId, gameInProgress);
  }
}
