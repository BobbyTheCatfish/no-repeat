/**
 * #### A utility class for randomly selecting items from an array without repetition
 * It ensures that each item is picked once before resetting, while preventing the most recent item from being selected consecutively.
 * Ideal for scenarios that require randomized selection without repetition.
 *
 * Example: an excuse generator with different matches
 * ```
 * const intros = new NoRepeat(data.intros)
 * const names = new NoRepeat(data.names)
 * const excuses = new NoRepeat(data.excuses)
 *
 * function makeExcuse() {
 *  return `<${intros.getRandom()}> <${names.getRandom()}> <${excuses.getRandom()}>!`
 * }
 * // example output 1: "<It's been great talking to you, but> <Bobby> <is trying to tag me>!"
 * // example output 2: "<Look. I'll be completely honest with you.> <A snail> <has been perfecting its taco recipe and I gotta try it>!"
 */
declare class NoRepeat<T> {
    /** The array of items that can be chosen from */
    items: T[];
    /** The array of items that have been chosen */
    chosen: T[];
    /** Custom number of times `getRandom` can be called until all items are are reset to an unchosen state */
    resetAt?: number;
    /** How many times the items have been cycled through */
    resetCount: number;
    /**
     * If `reset()` is called, this is set to true. It is set to false when all elements are chosen and the items automatically resets.
     * Default: `true`
     */
    lastResetWasAutomatic: boolean;
    /**
     * @param items An array of items to choose from.
     * @param resetAt If provided, the number of times `getRandom` can be called until the array of available items is reset.
     * @param used If provided, items to not pick from until after the first reset
     * @returns
     */
    constructor(items: T[], resetAt?: number, used?: T[]);
    /**
     * Returns a random item that hasn't been picked since the last reset.
     * Once the last item is picked, all items are reset, with the exception of the one returned.
     */
    getRandom(): T;
    /**
     * Puts all items back in the item pool so they can be selected again
     */
    reset(): void;
    private privReset;
}
export = NoRepeat;
