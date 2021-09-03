export function* mapReturn<TYield, TReturn, TNext, UReturn>(
    generator: Generator<TYield, TReturn, TNext>,
    mapFn: (value: TReturn) => UReturn
): Generator<TYield, UReturn, TNext> {
    return mapFn(yield* generator);
}

export class GeneratorBuilder<TYield = unknown, TReturn = any, TNext = unknown> {
    readonly #value: Generator<TYield, TReturn, TNext>;

    static from<TYield = unknown, TReturn = any, TNext = unknown>(
        value: Generator<TYield, TReturn, TNext>
    ): GeneratorBuilder<TYield, TReturn, TNext> {
        return new GeneratorBuilder(value);
    }

    private constructor(value: Generator<TYield, TReturn, TNext>) {
        this.#value = value;
    }

    mapReturn<UReturn>(mapFn: (value: TReturn) => UReturn): GeneratorBuilder<TYield, UReturn, TNext> {
        return new GeneratorBuilder(mapReturn(this.#value, mapFn));
    }
}
