import { Injectable } from '@angular/core';
import { Action, Selector, State, StateContext, StateToken } from '@ngxs/store';
import { BackendService } from '../../services/backend.service';
import { ChangeDataType, Player, Players, SetLastWinnerId } from './battler.actions';
import { mergeMap, tap } from 'rxjs';
import { addScoreToPlayer, getWinnerPlayer, mapCardsToPlayers } from './battler.utils';

interface CardCommon {
    uid: string;
    type: DataType;
    description: string;
}

interface StarshipProps {
    crew: number;
    passengers: number;
    pilots: string[];
    name: string;
    url: string;
}
interface PersonProps {
    height: number;
    mass: number;
    name: string;
    hair_color: string;
    homeworld: string;
    url: string;
}

export interface CardStarship extends CardCommon {
    type: 'starships';
    properties: StarshipProps;
}
export interface CardPerson extends CardCommon {
    type: 'people';
    properties: PersonProps;
}

export interface PlayerModel {
    id: number;
    score: number;
    card: CardStarship | CardPerson | null;
}

export type DataType = 'people' | 'starships';

interface BattlerStateModel {
    dataType: DataType;
    players: PlayerModel[];
    lastWinnerId: number | null;
    inProgress: boolean;
}

const BATTLER_STATE_TOKEN = new StateToken<BattlerStateModel>('battler');

const DefaultBattlerState: BattlerStateModel = {
    dataType: 'people',
    players: [{
        id: 1,
        score: 0,
        card: null,
    }, {
        id: 2,
        score: 0,
        card: null,
    }],
    lastWinnerId: null,
    inProgress: false,
}

@State<BattlerStateModel>({
    name: BATTLER_STATE_TOKEN,
    defaults: DefaultBattlerState
})
@Injectable()
export class BattlerState {
    constructor(private readonly backendService: BackendService) { }

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
            players: addScoreToPlayer(ctx.getState().players, action.id)
        })
    }

    @Action(Players.AddCards)
    addCards(ctx: StateContext<BattlerStateModel>) {
        ctx.patchState(({inProgress: true}));
        const { dataType, players } = ctx.getState();

        return this.backendService.getRandomCards(dataType, players.length).pipe(
            tap(cards => {
                ctx.patchState({
                    players:  mapCardsToPlayers(ctx.getState().players, cards)
                });
            }),
            mergeMap(() => ctx.dispatch(new Players.CalcGameSummary()))
        );
    }

    @Action(Players.CalcGameSummary)
    calcGameSummary(ctx: StateContext<BattlerStateModel>) {
        let winner: PlayerModel | null = getWinnerPlayer(ctx.getState().players);

        if (winner) {
            ctx.dispatch([new Player.AddScore(winner.id), new SetLastWinnerId(winner.id)]);
        } else {
            ctx.dispatch(new SetLastWinnerId(null));
        }
    }

    @Action(Players.ClearScores)
    clearScores(ctx: StateContext<BattlerStateModel>) {
        ctx.patchState({ players: ctx.getState().players.map(p => ({ ...p, score: 0 })), lastWinnerId: null });
    }

    @Action(SetLastWinnerId)
    setLastWinnerId(ctx: StateContext<BattlerStateModel>, action: SetLastWinnerId) {
        ctx.patchState({ lastWinnerId: action.id, inProgress: false });
    }
}