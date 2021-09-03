import { mapReturn } from './generator';

class MaybeJustData<T = any> {
    readonly value: T;

    constructor(value: T) {
        this.value = value;
    }
}

class MaybeNoneData {}

type MaybeData<T = any> = MaybeJustData<T> | MaybeNoneData;

type MaybeGenerator<T> = Generator<MaybeData, T, any>;

export type Maybe<T> = () => MaybeGenerator<T>;

export class MaybeFactory {
    static just<T>(value: T): Maybe<T> {
        return () => MaybeFactory.#justGenerator(value);
    }

    static *none<T>(): MaybeGenerator<T> {
        return yield new MaybeNoneData();
    }

    static *#justGenerator<T>(value: T): Generator<MaybeData<T>, T, T> {
        return yield new MaybeJustData(value);
    }
}

export class MaybeBuilder<T> {
    readonly #value: Maybe<T>;

    static from<T>(value: Maybe<T>): MaybeBuilder<T> {
        return new MaybeBuilder(value);
    }

    private constructor(value: Maybe<T>) {
        this.#value = value;
    }

    getValue(): T | null {
        const generator = this.#generator();
        return this.#handle(generator, generator.next());
    }

    map<U>(mapFn: (value: T) => U): MaybeBuilder<U> {
        return new MaybeBuilder(() => mapReturn(this.#generator(), mapFn));
    }

    #handle(generator: MaybeGenerator<T>, result: IteratorResult<MaybeData, any>): any {
        if (result.done) {
            return result.value;
        }
        if (result.value instanceof MaybeNoneData) {
            return null;
        }

        return this.#handle(generator, generator.next(result.value.value));
    }

    #generator(): MaybeGenerator<T> {
        return this.#value();
    }
}
