import { MaybeJustData, MaybeNoneData } from './data';
import { MaybeFactory } from './factory';

describe('MaybeFactory', () => {
    describe('just', () => {
        it('should yield MaybeJustData', () => {
            const generator = MaybeFactory.just(1)();
            const yielded = generator.next();

            expect(yielded.done).toBeFalsy();
            expect(yielded.value).toBeInstanceOf(MaybeJustData);
            const data = yielded.value as MaybeJustData;
            expect(data.value).toEqual(1);
        });

        it('should return next value on second iteration', () => {
            const generator = MaybeFactory.just(1)();
            generator.next();
            const yielded = generator.next(5);

            expect(yielded).toEqual({ done: true, value: 5 });
        });
    });

    describe('none', () => {
        it('should yield MaybeNoneData', () => {
            const generator = MaybeFactory.none();
            const yielded = generator.next();

            expect(yielded.done).toBeFalsy();
            expect(yielded.value).toBeInstanceOf(MaybeNoneData);
        });
    });
});
