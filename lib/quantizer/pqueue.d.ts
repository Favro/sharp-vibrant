export interface PQueueComparator<T> {
    (a: T, b: T): number;
}
export default class PQueue<T> {
    #private;
    contents: T[];
    private sort;
    constructor(comparator: PQueueComparator<T>);
    push(item: T): void;
    peek(index?: number): T;
    pop(): T;
    get size(): number;
    map<U>(mapper: (item: T, index: number) => any): U[];
}
