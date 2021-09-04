import { mapReturn } from '../generator/functions';
import { MaybeData, MaybeNoneData } from './data';
import { Maybe, MaybeGenerator } from './generator';

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
