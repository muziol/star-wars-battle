export namespace Player {
    export class AddScore {
        static readonly type = '[Player] Add score';
        constructor(public id: number) {}
    }

    export class AddCard {
        static readonly type = '[Player] Add card';
        constructor(public id: number) {}
    }
}

export namespace Players {
    export class AddCards {
        static readonly type = '[Players] Add cards';
    }
}