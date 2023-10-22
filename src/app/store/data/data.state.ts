import { Injectable } from '@angular/core';
import { State, StateToken } from '@ngxs/store';

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
}
