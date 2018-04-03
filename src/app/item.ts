export class Item {
    id: string;
    name: string;
}

export enum Method {
    Create,
    Delete,
}

export class Action {
    method: Method;
    value: Item;
}