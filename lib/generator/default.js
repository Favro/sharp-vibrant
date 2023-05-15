"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/* eslint-disable no-param-reassign */
const color_1 = require("../color");
const util_1 = require("../util");
const DefaultOpts = {
    targetDarkLuma: 0.26,
    maxDarkLuma: 0.45,
    minLightLuma: 0.55,
    targetLightLuma: 0.74,
    minNormalLuma: 0.3,
    targetNormalLuma: 0.5,
    maxNormalLuma: 0.7,
    targetMutesSaturation: 0.3,
    maxMutesSaturation: 0.4,
    targetVibrantSaturation: 1.0,
    minVibrantSaturation: 0.35,
    weightSaturation: 3,
    weightLuma: 6.5,
    weightPopulation: 0.5,
};
function findMaxPopulation(swatches) {
    let p = 0;
    swatches.forEach((s) => { p = Math.max(p, s.population); });
    return p;
}
function isAlreadySelected(palette, s) {
    return palette.Vibrant === s
        || palette.DarkVibrant === s
        || palette.LightVibrant === s
        || palette.Muted === s
        || palette.DarkMuted === s
        || palette.LightMuted === s;
}
function createComparisonValue(saturation, targetSaturation, luma, targetLuma, population, maxPopulation, opts) {
    function weightedMean(...values) {
        let sum = 0;
        let weightSum = 0;
        for (let i = 0; i < values.length; i += 2) {
            const value = values[i];
            const weight = values[i + 1];
            sum += value * weight;
            weightSum += weight;
        }
        return sum / weightSum;
    }
    function invertDiff(value, targetValue) {
        return 1 - Math.abs(value - targetValue);
    }
    return weightedMean(invertDiff(saturation, targetSaturation), opts.weightSaturation, invertDiff(luma, targetLuma), opts.weightLuma, population / maxPopulation, opts.weightPopulation);
}
function findColorVariation(palette, swatches, maxPopulation, targetLuma, minLuma, maxLuma, targetSaturation, minSaturation, maxSaturation, opts) {
    let max = null;
    let maxValue = 0;
    swatches.forEach((swatch) => {
        const [, s, l] = swatch.hsl;
        if (s >= minSaturation && s <= maxSaturation
            && l >= minLuma && l <= maxLuma
            && !isAlreadySelected(palette, swatch)) {
            const value = createComparisonValue(s, targetSaturation, l, targetLuma, swatch.population, maxPopulation, opts);
            if (max === null || value > maxValue) {
                max = swatch;
                maxValue = value;
            }
        }
    });
    return max;
}
function generateVariationColors(swatches, maxPopulation, opts) {
    const palette = {};
    // mVibrantSwatch = findColor(TARGET_NORMAL_LUMA, MIN_NORMAL_LUMA, MAX_NORMAL_LUMA,
    //     TARGET_VIBRANT_SATURATION, MIN_VIBRANT_SATURATION, 1f);
    palette.Vibrant = findColorVariation(palette, swatches, maxPopulation, opts.targetNormalLuma, opts.minNormalLuma, opts.maxNormalLuma, opts.targetVibrantSaturation, opts.minVibrantSaturation, 1, opts);
    // mLightVibrantSwatch = findColor(TARGET_LIGHT_LUMA, MIN_LIGHT_LUMA, 1f,
    //     TARGET_VIBRANT_SATURATION, MIN_VIBRANT_SATURATION, 1f);
    palette.LightVibrant = findColorVariation(palette, swatches, maxPopulation, opts.targetLightLuma, opts.minLightLuma, 1, opts.targetVibrantSaturation, opts.minVibrantSaturation, 1, opts);
    // mDarkVibrantSwatch = findColor(TARGET_DARK_LUMA, 0f, MAX_DARK_LUMA,
    //     TARGET_VIBRANT_SATURATION, MIN_VIBRANT_SATURATION, 1f);
    palette.DarkVibrant = findColorVariation(palette, swatches, maxPopulation, opts.targetDarkLuma, 0, opts.maxDarkLuma, opts.targetVibrantSaturation, opts.minVibrantSaturation, 1, opts);
    // mMutedSwatch = findColor(TARGET_NORMAL_LUMA, MIN_NORMAL_LUMA, MAX_NORMAL_LUMA,
    //     TARGET_MUTED_SATURATION, 0f, MAX_MUTED_SATURATION);
    palette.Muted = findColorVariation(palette, swatches, maxPopulation, opts.targetNormalLuma, opts.minNormalLuma, opts.maxNormalLuma, opts.targetMutesSaturation, 0, opts.maxMutesSaturation, opts);
    // mLightMutedColor = findColor(TARGET_LIGHT_LUMA, MIN_LIGHT_LUMA, 1f,
    //     TARGET_MUTED_SATURATION, 0f, MAX_MUTED_SATURATION);
    palette.LightMuted = findColorVariation(palette, swatches, maxPopulation, opts.targetLightLuma, opts.minLightLuma, 1, opts.targetMutesSaturation, 0, opts.maxMutesSaturation, opts);
    // mDarkMutedSwatch = findColor(TARGET_DARK_LUMA, 0f, MAX_DARK_LUMA,
    //     TARGET_MUTED_SATURATION, 0f, MAX_MUTED_SATURATION);
    palette.DarkMuted = findColorVariation(palette, swatches, maxPopulation, opts.targetDarkLuma, 0, opts.maxDarkLuma, opts.targetMutesSaturation, 0, opts.maxMutesSaturation, opts);
    return palette;
}
function withLuminance(hsl, l) {
    const [h, s] = hsl;
    return [h, s, l];
}
function generateEmptySwatches(palette, maxPopulation, opts) {
    if (palette.Vibrant === null && palette.DarkVibrant === null && palette.LightVibrant === null) {
        if (palette.DarkVibrant === null && palette.DarkMuted !== null) {
            const [h, s, l] = withLuminance(palette.DarkMuted.hsl, opts.targetDarkLuma);
            palette.DarkVibrant = new color_1.Swatch((0, util_1.hslToRgb)(h, s, l), 0);
        }
        if (palette.LightVibrant === null && palette.LightMuted !== null) {
            const [h, s, l] = withLuminance(palette.LightMuted.hsl, opts.targetDarkLuma);
            palette.DarkVibrant = new color_1.Swatch((0, util_1.hslToRgb)(h, s, l), 0);
        }
    }
    if (palette.Vibrant === null && palette.DarkVibrant !== null) {
        const [h, s, l] = withLuminance(palette.DarkVibrant.hsl, opts.targetNormalLuma);
        palette.Vibrant = new color_1.Swatch((0, util_1.hslToRgb)(h, s, l), 0);
    }
    else if (palette.Vibrant === null && palette.LightVibrant !== null) {
        const [h, s, l] = withLuminance(palette.LightVibrant.hsl, opts.targetNormalLuma);
        palette.Vibrant = new color_1.Swatch((0, util_1.hslToRgb)(h, s, l), 0);
    }
    if (palette.DarkVibrant === null && palette.Vibrant !== null) {
        const [h, s, l] = withLuminance(palette.Vibrant.hsl, opts.targetDarkLuma);
        palette.DarkVibrant = new color_1.Swatch((0, util_1.hslToRgb)(h, s, l), 0);
    }
    if (palette.LightVibrant === null && palette.Vibrant !== null) {
        const [h, s, l] = withLuminance(palette.Vibrant.hsl, opts.targetLightLuma);
        palette.LightVibrant = new color_1.Swatch((0, util_1.hslToRgb)(h, s, l), 0);
    }
    if (palette.Muted === null && palette.Vibrant !== null) {
        const [h, s, l] = withLuminance(palette.Vibrant.hsl, opts.targetMutesSaturation);
        palette.Muted = new color_1.Swatch((0, util_1.hslToRgb)(h, s, l), 0);
    }
    if (palette.DarkMuted === null && palette.DarkVibrant !== null) {
        const [h, s, l] = withLuminance(palette.DarkVibrant.hsl, opts.targetMutesSaturation);
        palette.DarkMuted = new color_1.Swatch((0, util_1.hslToRgb)(h, s, l), 0);
    }
    if (palette.LightMuted === null && palette.LightVibrant !== null) {
        const [h, s, l] = withLuminance(palette.LightVibrant.hsl, opts.targetMutesSaturation);
        palette.LightMuted = new color_1.Swatch((0, util_1.hslToRgb)(h, s, l), 0);
    }
}
const DefaultGenerator = (swatches, opts) => {
    const optsWithDefaults = Object.assign(Object.assign({}, DefaultOpts), opts);
    const maxPopulation = findMaxPopulation(swatches);
    const palette = generateVariationColors(swatches, maxPopulation, optsWithDefaults);
    generateEmptySwatches(palette, maxPopulation, optsWithDefaults);
    return palette;
};
exports.default = DefaultGenerator;
//# sourceMappingURL=default.js.map