import type { Filter, Image, ImageData, ImageSource, ComputedOptions } from '../typing';
declare abstract class ImageBase implements Image {
    abstract load(image: ImageSource, opts: ComputedOptions): Promise<ImageBase>;
    abstract readonly pixelCount: number;
    abstract readonly imageData: ImageData;
    abstract readonly width: number;
    abstract readonly height: number;
    abstract cleanup(): void;
    applyFilter(filter: Filter): Promise<ImageData>;
}
export default ImageBase;
