import { Injectable } from '@angular/core';
import { Action, Selector, State, StateContext, StateToken } from '@ngxs/store';
import { Data } from './data.actions';

interface APIRecord {
  uid: string;
  name: string;
  url: string;
}

interface DataStateModel {
  people: {
    data: APIRecord[];
    totalRecords: number | null;
  };
  starships: {
    data: APIRecord[];
    totalRecords: number | null;
  };
}

const Data_STATE_TOKEN = new StateToken<DataStateModel>('data');

const DefaultDataState: DataStateModel = {
  people: {
    data: [],
    totalRecords: null,
  },
  starships: {
    data: [],
    totalRecords: null,
  },
};

@State<DataStateModel>({
  name: Data_STATE_TOKEN,
  defaults: DefaultDataState,
})
@Injectable()
export class DataState {
  constructor() {}

  @Selector()
  static getPeopleTotalRecords(state: DataStateModel) {
    return state.people.totalRecords;
  }

  @Selector()
  static getStarshipsTotalRecords(state: DataStateModel) {
    return state.starships.totalRecords;
  }

  @Action(Data.People.UpdateTotalRecords)
  updateDataPeopleTotalRecords(
    ctx: StateContext<DataStateModel>,
    action: Data.People.UpdateTotalRecords,
  ) {
    ctx.patchState({
      people: {
        data: ctx.getState().people.data,
        totalRecords: action.totalRecords,
      },
    });
  }

  @Action(Data.Starships.UpdateTotalRecords)
  updateDataStarshipTotalRecords(
    ctx: StateContext<DataStateModel>,
    action: Data.Starships.UpdateTotalRecords,
  ) {
    ctx.patchState({
      starships: {
        data: ctx.getState().starships.data,
        totalRecords: action.totalRecords,
      },
    });
  }
}
