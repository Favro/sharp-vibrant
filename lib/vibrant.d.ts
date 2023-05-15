import type { ImageSource, Options, ComputedOptions, Callback, PaletteResult } from './typing';
import { Swatch } from './color';
import Builder from './builder';
import * as Util from './util';
import * as Filters from './filter';
declare class Vibrant {
    #private;
    static Builder: typeof Builder;
    static Quantizer: import("./typing").Quantizer;
    static Generator: import("./typing").Generator<import("./generator/default").DefaultGeneratorOptions>;
    static Filter: typeof Filters;
    static Util: typeof Util;
    static Swatch: typeof Swatch;
    static DefaultOpts: Partial<Options>;
    static from(src: ImageSource): Builder;
    opts: ComputedOptions;
    constructor(src: ImageSource, opts?: Partial<Options>);
    private process;
    getPalette(cb?: Callback<PaletteResult>): Promise<PaletteResult>;
}
export default Vibrant;
