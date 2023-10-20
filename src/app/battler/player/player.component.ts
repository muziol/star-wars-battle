import { ChangeDetectionStrategy, Component, Input, numberAttribute } from '@angular/core';

@Component({
  selector: 'app-player',
  templateUrl: './player.component.html',
  styleUrls: ['./player.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PlayerComponent {
  @Input({ transform: numberAttribute }) public number: number = 0;
}
