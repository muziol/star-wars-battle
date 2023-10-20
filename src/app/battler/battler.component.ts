import { ChangeDetectionStrategy, Component } from '@angular/core';
import { BackendService } from '../services/backend.service';

import { Observable } from 'rxjs';

type DataType = 'people' | 'starships';

@Component({
  selector: 'app-battler',
  templateUrl: './battler.component.html',
  styleUrls: ['./battler.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class BattlerComponent {
  public readonly dataTypes: DataType[] = ['people', 'starships'];
  public dataType: DataType = 'people';

  constructor(private backendService: BackendService) { }
}
