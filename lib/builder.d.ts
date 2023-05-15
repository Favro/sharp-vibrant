import type { Callback, ImageClass, ImageSource, Options, Filter, Quantizer, Generator, PaletteResult } from './typing';
import Vibrant from './vibrant';
export default class Builder {
    #private;
    constructor(src: ImageSource, opts?: Partial<Options>);
    maxColorCount(n: number): Builder;
    maxDimension(d: number): Builder;
    addFilter(f: Filter): Builder;
    removeFilter(f: Filter): Builder;
    clearFilters(): Builder;
    quality(q: number): Builder;
    useImageClass(imageClass: ImageClass): Builder;
    useGenerator(generator: Generator<any>): Builder;
    useQuantizer(quantizer: Quantizer): Builder;
    build(): Vibrant;
    getPalette(cb?: Callback<PaletteResult>): Promise<PaletteResult>;
}
