import type { Filter } from './typing';
export type Vec3 = [number, number, number];
export interface Palette {
    Vibrant?: Swatch;
    Muted?: Swatch;
    DarkVibrant?: Swatch;
    DarkMuted?: Swatch;
    LightVibrant?: Swatch;
    LightMuted?: Swatch;
    [name: string]: Swatch | undefined;
}
export declare class Swatch {
    #private;
    static applyFilter(colors: Swatch[], f: Filter): Swatch[];
    constructor(rgb: Vec3, population: number);
    get r(): number;
    get g(): number;
    get b(): number;
    get rgb(): Vec3;
    get hsl(): Vec3;
    get hex(): string;
    get population(): number;
    toJSON(): {
        rgb: Vec3;
        population: number;
    };
    private getYiq;
    get titleTextColor(): string;
    get bodyTextColor(): string;
}
