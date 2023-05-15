import { Generator } from '../typing';
interface DefaultGeneratorOptions {
    targetDarkLuma: number;
    maxDarkLuma: number;
    minLightLuma: number;
    targetLightLuma: number;
    minNormalLuma: number;
    targetNormalLuma: number;
    maxNormalLuma: number;
    targetMutesSaturation: number;
    maxMutesSaturation: number;
    targetVibrantSaturation: number;
    minVibrantSaturation: number;
    weightSaturation: number;
    weightLuma: number;
    weightPopulation: number;
}
declare const DefaultGenerator: Generator<DefaultGeneratorOptions>;
export default DefaultGenerator;
export { DefaultGeneratorOptions };
