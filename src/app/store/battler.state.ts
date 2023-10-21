import { Injectable } from '@angular/core';
import { Action, State, StateContext, StateToken } from '@ngxs/store';
import { BackendService } from '../services/backend.service';
import { Player, Players } from './battler.actions';
import { tap } from 'rxjs';

export interface PlayerModel {
    id: number;
    score: number;
    card: any;
}

export type DataType = 'people' | 'starships';

interface BattlerStateModel {
    dataType: DataType;
    players: PlayerModel[];
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
}

@State<BattlerStateModel>({
    name: BATTLER_STATE_TOKEN,
    defaults: DefaultBattlerState
})
@Injectable()
export class BattlerState {
    constructor(private readonly backendService: BackendService) { }

    @Action(Player.AddScore)
    addScore(ctx: StateContext<BattlerStateModel>, action: Player.AddScore) {
        const state = ctx.getState();
        ctx.setState({
            ...state,
            players: state.players.map((p) => {
                if (p.id !== action.id) {
                    return p;
                }
                return ({ ...p, score: p.score + 1 });
            })
        })
    }

    @Action(Player.AddCard)
    addCard(ctx: StateContext<BattlerStateModel>, action: Player.AddCard) {
        const dataType = ctx.getState().dataType;
        return this.backendService.getRandomElementOfType(dataType).pipe(
            tap(card => {
                const state = ctx.getState();
                ctx.setState({
                    ...state,
                    players: state.players.map((p) => {
                        if (p.id !== action.id) {
                            return p;
                        }
                        return ({ ...p, card });
                    })
                });
            })
        );
    }

    @Action(Players.AddCards)
    addCards(ctx: StateContext<BattlerStateModel>) {
        const state = ctx.getState();
        const actions: any[] = [];

        state.players.forEach((p) => {
            actions.push(new Player.AddCard(p.id));
        });

        ctx.dispatch(actions);
    }
}