import { Injectable } from '@angular/core';
import {
  Action,
  Selector,
  State,
  StateContext,
  StateToken,
  Store,
} from '@ngxs/store';
import { BackendService } from '../../services/backend.service';
import {
  ChangeDataType,
  Player,
  Players,
  SetLastWinnerId,
} from './battler.actions';
import { catchError, mergeMap, of, switchMap, tap } from 'rxjs';
import {
  addScoreToPlayer,
  getWinnerPlayer,
  mapCardsToPlayers,
} from './battler.utils';
import { BattlerStateModel, PlayerModel } from './battler.interface';

const BATTLER_STATE_TOKEN = new StateToken<BattlerStateModel>('battler');

const DefaultBattlerState: BattlerStateModel = {
  dataType: 'people',
  players: [
    {
      id: 1,
      score: 0,
      card: null,
    },
    {
      id: 2,
      score: 0,
      card: null,
    },
  ],
  lastWinnerId: null,
  inProgress: false,
  peopleData: {
    total: null,
    pages: null,
    records: [],
  },
  starshipsData: {
    total: null,
    pages: null,
    records: [],
  },
};

@State<BattlerStateModel>({
  name: BATTLER_STATE_TOKEN,
  defaults: DefaultBattlerState,
})
@Injectable()
export class BattlerState {
  constructor(
    private readonly backendService: BackendService,
    private readonly store: Store,
  ) {}

  @Selector()
  static players(state: BattlerStateModel) {
    return state.players;
  }

  @Selector()
  static dateType(state: BattlerStateModel) {
    return state.dataType;
  }

  @Selector()
  static lastWinnerId(state: BattlerStateModel) {
    return state.lastWinnerId;
  }

  @Selector()
  static inProgress(state: BattlerStateModel) {
    return state.inProgress;
  }

  @Action(ChangeDataType)
  changeDataType(ctx: StateContext<BattlerStateModel>, action: ChangeDataType) {
    const { dataType } = action;
    ctx.patchState({ dataType });
  }

  @Action(Player.AddScore)
  addScore(ctx: StateContext<BattlerStateModel>, action: Player.AddScore) {
    ctx.patchState({
      players: addScoreToPlayer(ctx.getState().players, action.id),
    });
  }

  @Action(Players.AddCards)
  addCards(ctx: StateContext<BattlerStateModel>) {
    ctx.patchState({ inProgress: true });
    const { dataType, players, peopleData, starshipsData } = ctx.getState();
    const cachedData = dataType === 'people' ? peopleData : starshipsData;
    const cachedDataKey = dataType === 'people' ? 'peopleData' : 'starshipData';

    return this.backendService
      .getListTypeWithCache(dataType, players.length, cachedData)
      .pipe(
        tap(({ total_pages, total_records, records }) => {
          // TODO: cache also fetched card properties
          ctx.patchState({
            [cachedDataKey]: {
              total: total_records,
              pages: total_pages,
              records,
            },
          });
        }),
        switchMap(({ records, randomIndexes }) => {
          return this.backendService.getRandomCards(
            dataType,
            records,
            randomIndexes,
          );
        }),
        tap((cards) => {
          ctx.patchState({
            players: mapCardsToPlayers(ctx.getState().players, cards),
          });
        }),
        mergeMap(() => ctx.dispatch(new Players.CalcGameSummary())),
        catchError((err) => {
          console.log(err);
          // TODO: catch error
          return of();
        }),
      );
  }

  @Action(Players.CalcGameSummary)
  calcGameSummary(ctx: StateContext<BattlerStateModel>) {
    let winner: PlayerModel | null = getWinnerPlayer(ctx.getState().players);

    if (winner) {
      ctx.dispatch([
        new Player.AddScore(winner.id),
        new SetLastWinnerId(winner.id),
      ]);
    } else {
      ctx.dispatch(new SetLastWinnerId(null));
    }
  }

  @Action(Players.ClearScores)
  clearScores(ctx: StateContext<BattlerStateModel>) {
    ctx.patchState({
      players: ctx
        .getState()
        .players.map((p) => ({ ...p, card: null, score: 0 })),
      lastWinnerId: null,
    });
  }

  @Action(SetLastWinnerId)
  setLastWinnerId(
    ctx: StateContext<BattlerStateModel>,
    action: SetLastWinnerId,
  ) {
    ctx.patchState({ lastWinnerId: action.id, inProgress: false });
  }
}
