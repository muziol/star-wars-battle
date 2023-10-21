import { ChangeDetectionStrategy, Component, Input, numberAttribute } from '@angular/core';
import { PlayerModel } from 'src/app/store/battler/battler.state';

@Component({
  selector: 'app-player',
  templateUrl: './player.component.html',
  styleUrls: ['./player.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PlayerComponent {
  @Input() public player!: PlayerModel;
  @Input() public loading!: boolean;
}
