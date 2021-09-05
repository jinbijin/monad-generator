export abstract class MonadicValue<T> {
    abstract readonly generator: () => Generator<any, T, any>;
}

export function from<T>(value: MonadicValue<T>): Generator<any, T, any> {
    return value.generator();
}
