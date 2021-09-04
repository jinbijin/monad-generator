import { MaybeData } from './data';

export type MaybeGenerator<T> = Generator<MaybeData, T, any>;

export type Maybe<T> = () => MaybeGenerator<T>;
