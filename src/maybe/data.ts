export class MaybeJustData<T = any> {
    readonly value: T;

    constructor(value: T) {
        this.value = value;
    }
}

export class MaybeNoneData {}

export type MaybeData<T = any> = MaybeJustData<T> | MaybeNoneData;
