export namespace Data {
  export namespace People {
    export class UpdateTotalRecords {
      static readonly type = '[Data-People] Update total records';
      constructor(public totalRecords: number) {}
    }
  }

  export namespace Starships {
    export class UpdateTotalRecords {
      static readonly type = '[Data-Starships] Update total records';
      constructor(public totalRecords: number) {}
    }
  }
}
