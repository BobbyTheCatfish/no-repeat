function err(propName: string, propType: string) {
    throw new TypeError(`Parameter ${propName} must be ${propType}.`);
  }
  
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
class NoRepeat<T> {
    /** The array of items that can be chosen from */
    items: T[];
    /** The array of items that have been chosen */
    chosen: T[];
    /** Custom number of times `getRandom` can be called until all items are are reset to an unchosen state */
    resetAt?: number;

    /**
     * @param items An array of items to choose from.
     * @param resetAt If provided, the number of times `getRandom` can be called until the array of available items is reset.
     * @param used If provided, items to not pick from until after the first reset
     * @returns 
     */
    constructor(items: T[], resetAt?: number, used?: T[]) {
        if (!Array.isArray(items)) err("input", "an Array");
        else if (used !== undefined && !Array.isArray(used)) err("used", "an Array");
        else if (resetAt !== undefined && typeof resetAt !== "number") err("resetAt", "a Number");
        this.items = items;
        this.chosen = used ?? [];
        this.resetAt = resetAt;
        return this;
    }

    /**
     * Returns a random item that hasn't been picked since the last reset.
     * Once the last item is picked, all items are reset, with the exception of the one returned.
     */
    getRandom() {
        const index = Math.floor(Math.random() * this.items.length);
        const element = this.items.splice(index, 1)?.[0];
        if (this.items.length === 0 || (this.resetAt !== undefined && this.chosen.length >= this.resetAt)) {
            // only one element. kinda silly lol
            if (this.items.length === 0 && this.chosen.length === 0) {
                this.chosen.push(element);
            }
            this.reset();
        } else if (!(this.items.length === 1 && this.chosen.length === 0)) {
            this.chosen.push(element);
        }
        return element;
    }
    /**
     * Puts all items back in the item pool so they can be selected again
     */
    reset() {
        this.items = this.items.concat(this.chosen);
        this.chosen = [];
        return this;
    }
}
export = NoRepeat