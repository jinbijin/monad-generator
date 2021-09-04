import { MaybeData, MaybeJustData, MaybeNoneData } from './data';
import { Maybe } from './generator';

export class MaybeFactory {
    static just<T>(value: T): Maybe<T> {
        return () => MaybeFactory.#justGenerator(value);
    }

    static *none<T>(): Generator<MaybeData<T>, never, never> {
        return yield new MaybeNoneData();
    }

    static *#justGenerator<T>(value: T): Generator<MaybeData<T>, T, T> {
        return yield new MaybeJustData(value);
    }
}
