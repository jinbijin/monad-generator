import { MaybeBuilder, MaybeFactory } from './maybe';

describe('Maybe monad', () => {
    describe('just', () => {
        it('should return same value', () => {
            const actual = MaybeBuilder.from(MaybeFactory.just(1)).getValue();

            expect(actual).toBe(1);
        });
    });

    describe('none', () => {
        it('should return value null', () => {
            const actual = MaybeBuilder.from(MaybeFactory.none).getValue();

            expect(actual).toBe(null);
        });
    });

    describe('map', () => {
        it('should map value', () => {
            const mapFn = (value: number) => 2 * value;

            const actual = MaybeBuilder.from(MaybeFactory.just(1)).map(mapFn).getValue();

            expect(actual).toBe(2);
        });

        it('should return null if none', () => {
            const mapFn = (value: number) => 2 * value;

            const actual = MaybeBuilder.from<number>(MaybeFactory.none).map(mapFn).getValue();

            expect(actual).toBe(null);
        });
    });
});
