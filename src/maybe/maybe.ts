import { MonadicValue } from '../monad';
import { mapReturn } from '../generator/functions';
import { MaybeData, MaybeNoneData, MaybeJustData } from './data';

type MaybeGenerator<T> = Generator<MaybeData, T, any>;

export class Maybe<T> extends MonadicValue<T> {
    static from<T>(generator: () => MaybeGenerator<T>): Maybe<T> {
        return new Maybe<T>(generator);
    }

    static just<T>(value: T): Maybe<T> {
        return new Maybe<T>(() => Maybe.#justGenerator(value));
    }

    static none: Maybe<any> = new Maybe<any>(function* () {
        return yield new MaybeNoneData();
    });

    constructor(generator: () => MaybeGenerator<T>) {
        super();
        this.generator = generator;
    }

    get(): T | null {
        const generator = this.generator();
        return this.#step(generator, generator.next());
    }

    map<U>(mapFn: (value: T) => U): Maybe<U> {
        return new Maybe(() => mapReturn(this.generator(), mapFn));
    }

    /** @internal */
    readonly generator: () => MaybeGenerator<T>;

    #step(generator: MaybeGenerator<T>, result: IteratorResult<MaybeData, any>): any {
        if (result.done) {
            return result.value;
        }
        if (result.value instanceof MaybeNoneData) {
            return null;
        }

        return this.#step(generator, generator.next(result.value.value));
    }

    static *#justGenerator<T>(value: T): Generator<MaybeData<T>, T, T> {
        return yield new MaybeJustData(value);
    }
}
