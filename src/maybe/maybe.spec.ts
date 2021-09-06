import { from } from '../monad';
import { MaybeJustData, MaybeNoneData } from './data';
import { Maybe } from './maybe';

describe('Maybe', () => {
    describe('just', () => {
        it('should yield MaybeJustData', () => {
            const generator = Maybe.just(1).generator();
            const yielded = generator.next();

            expect(yielded.done).toBeFalsy();
            expect(yielded.value).toBeInstanceOf(MaybeJustData);
            const data = yielded.value as MaybeJustData;
            expect(data.value).toEqual(1);
        });

        it('should return next value on second iteration', () => {
            const generator = Maybe.just(1).generator();
            generator.next();
            const yielded = generator.next(5);

            expect(yielded).toEqual({ done: true, value: 5 });
        });
    });

    describe('none', () => {
        it('should yield MaybeNoneData', () => {
            const generator = Maybe.none.generator();
            const yielded = generator.next();

            expect(yielded.done).toBeFalsy();
            expect(yielded.value).toBeInstanceOf(MaybeNoneData);
        });
    });

    describe('get', () => {
        describe('just', () => {
            it('should return value for just', () => {
                const actual = Maybe.just(1).get();

                expect(actual).toEqual(1);
            });
        });

        describe('none', () => {
            it('should return null for none', () => {
                const actual = Maybe.none.get();

                expect(actual).toEqual(null);
            });
        });

        describe('from', () => {
            it('should execute generator', () => {
                const actual = Maybe.from(function* () {
                    const justOne = Maybe.just(1);
                    return (yield* from(justOne)) + (yield* from(justOne));
                }).get();

                expect(actual).toEqual(2);
            });

            it('should short-circuit on null', () => {
                const stub = jest.fn();

                const actual = Maybe.from(function* () {
                    const value = yield* from(Maybe.none);
                    stub();
                    return value;
                }).get();

                expect(actual).toEqual(null);
                expect(stub).not.toHaveBeenCalled();
            });
        });
    });

    describe('map', () => {
        const mapFn = (x: number) => 2 * x;
        it('should return value for just', () => {
            const actual = Maybe.just(1).map(mapFn).get();

            expect(actual).toEqual(2);
        });

        it('should return null for none', () => {
            const actual = Maybe.none.map(mapFn).get();

            expect(actual).toEqual(null);
        });
    });
});
