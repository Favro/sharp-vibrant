import type { Vec3 } from '../color';
import type { Pixels } from '../typing';
export interface Dimension {
    r1: number;
    r2: number;
    g1: number;
    g2: number;
    b1: number;
    b2: number;
    [d: string]: number;
}
export default class VBox {
    #private;
    static build(pixels: Pixels): VBox;
    dimension: Dimension;
    hist: Uint32Array;
    constructor(r1: number, r2: number, g1: number, g2: number, b1: number, b2: number, hist: Uint32Array);
    invalidate(): void;
    get volume(): number;
    get count(): number;
    clone(): VBox;
    get avg(): Vec3;
    contains(rgb: Vec3): boolean;
    split(): VBox[];
    private doCut;
}
