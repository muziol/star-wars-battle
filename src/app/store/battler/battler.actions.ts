import { DataType } from 'src/app/services/backend.interface';

export class ChangeDataType {
  static readonly type = '[Data] Change data type';
  constructor(public dataType: DataType) {}
}

export namespace Player {
  export class AddScore {
    static readonly type = '[Player] Add score';
    constructor(public id: number) {}
  }
}

export namespace Players {
  export class AddCards {
    static readonly type = '[Players] Add cards';
  }

  export class CalcGameSummary {
    static readonly type = '[Players] Calc game summary';
  }

  export class ClearScores {
    static readonly type = '[Players] Clear scores';
  }
}

export class SetLastWinnerId {
  static readonly type = '[Battle] Set last winner id';
  constructor(public id: number | null) {}
}
