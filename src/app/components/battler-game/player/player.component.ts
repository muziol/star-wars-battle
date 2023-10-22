import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { PlayerModel } from 'src/app/store/battler/battler.state';
import { getStatusTitle } from './player.utils';

export type BattleStatusType = 'win' | 'loose' | 'tie' | 'none';

@Component({
  selector: 'app-player',
  templateUrl: './player.component.html',
  styleUrls: ['./player.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PlayerComponent {
  @Input() public player: PlayerModel | null = null;
  @Input() public loading!: boolean;
  @Input() public status: BattleStatusType = 'none';

  public getStatusTitle(status: BattleStatusType) {
    return getStatusTitle(status);
  }
}
