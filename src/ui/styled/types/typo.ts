function composeTypoGraphy(size: number, lineHeight: number, letterSpacing: number) {
  return {
    size: `${size}px`,
    letterSpacing: `${letterSpacing}em`,
    lineHeight: 1.2
  };
}

/**
$font-size-base:              1rem !default; // Assumes the browser default, typically `16px`
$h1-font-size:                $font-size-base * 2.5 !default;
$h2-font-size:                $font-size-base * 2 !default;
$h3-font-size:                $font-size-base * 1.75 !default;
$h4-font-size:                $font-size-base * 1.5 !default;
$h5-font-size:                $font-size-base * 1.25 !default;
$h6-font-size:                $font-size-base !default;
 */
const DEFAULT_FONT_SIZE = 16;
const TypoGraphyStyles = {
  h1: composeTypoGraphy(DEFAULT_FONT_SIZE * 2.5, 30, -0.02),
  h2: composeTypoGraphy(DEFAULT_FONT_SIZE * 2.25, 30, -0.03),
  h3: composeTypoGraphy(DEFAULT_FONT_SIZE * 2, 30, -0.03),
  h4: composeTypoGraphy(DEFAULT_FONT_SIZE * 1.8, 23, -0.04),
  h5: composeTypoGraphy(DEFAULT_FONT_SIZE * 1.6, 23, -0.04),
  h6: composeTypoGraphy(DEFAULT_FONT_SIZE * 1.4, 20, -0.02),
  h7: composeTypoGraphy(DEFAULT_FONT_SIZE * 1.2, 20, -0.03),
  h8: composeTypoGraphy(DEFAULT_FONT_SIZE, 14, -0.03)
} as const;

type TypoGraphyType = keyof typeof TypoGraphyStyles;
export {TypoGraphyStyles};
export default TypoGraphyType;
