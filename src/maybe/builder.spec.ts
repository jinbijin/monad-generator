import { MaybeBuilder } from './builder';
import { MaybeFactory } from './factory';

describe('MaybeBuilder', () => {
    describe('getValue', () => {
        it('should return value for just', () => {
            const actual = MaybeBuilder.from(MaybeFactory.just(1)).getValue();

            expect(actual).toEqual(1);
        });

        it('should return null for none', () => {
            const actual = MaybeBuilder.from(MaybeFactory.none).getValue();

            expect(actual).toEqual(null);
        });
    });

    describe('map', () => {
        const mapFn = (x: number) => 2 * x;
        it('should return value for just', () => {
            const actual = MaybeBuilder.from(MaybeFactory.just(1)).map(mapFn).getValue();

            expect(actual).toEqual(2);
        });

        it('should return null for none', () => {
            const actual = MaybeBuilder.from(MaybeFactory.none).map(mapFn).getValue();

            expect(actual).toEqual(null);
        });
    });
});
