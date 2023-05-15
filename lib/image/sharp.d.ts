import type { ImageData, ImageSource, ComputedOptions } from '../typing';
import ImageBase from './base';
export default class SharpImage extends ImageBase {
    #private;
    load(image: ImageSource, opts: ComputedOptions): Promise<ImageBase>;
    get pixelCount(): number;
    get imageData(): ImageData;
    get width(): number;
    get height(): number;
    cleanup(): void;
}
