export function* mapReturn<TYield, TReturn, TNext, UReturn>(
    generator: Generator<TYield, TReturn, TNext>,
    mapFn: (value: TReturn) => UReturn
): Generator<TYield, UReturn, TNext> {
    return mapFn(yield* generator);
}
