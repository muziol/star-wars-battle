import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Observable } from 'rxjs';
import { Store } from '@ngxs/store';
import { DataType, PlayerModel } from '../store/battler.state';
import { Players } from '../store/battler.actions';

@Component({
  selector: 'app-battler',
  templateUrl: './battler.component.html',
  styleUrls: ['./battler.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class BattlerComponent {
  public readonly dataTypes: DataType[] = ['people', 'starships'];
  public dataType$!: Observable<DataType>;

  public players$!: Observable<PlayerModel[]>;

  private gameInProgress: boolean = false;

  constructor(private readonly store: Store) {
    this.dataType$ = this.store.select(state => state.battler.dataType);
    this.players$ = this.store.select(state => state.battler.players);
  }

  public async startGame(): Promise<void> {
    this.gameInProgress = true;

    this.store.dispatch(new Players.AddCards());

    this.gameInProgress = false;
  }

}
