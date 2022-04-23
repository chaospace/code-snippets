function composeTypoGraphy(size: number, lineHeight: number, letterSpacing: number) {
  return {
    size: `${size}px`,
    letterSpacing: `${letterSpacing}em`,
    lineHeight: `${lineHeight / size}`
  };
}

const TypoGraphyStyles = {
  p60: composeTypoGraphy(60, 75, -0.05),
  p48: composeTypoGraphy(48, 60, -0.05),
  p40: composeTypoGraphy(40, 50, -0.06),
  p32: composeTypoGraphy(32, 50, -0.03),
  p24: composeTypoGraphy(24, 30, -0.02),
  p20: composeTypoGraphy(20, 30, -0.03),
  p18: composeTypoGraphy(18, 23, -0.04),
  p16: composeTypoGraphy(16, 20, -0.02),
  p14: composeTypoGraphy(14, 20, -0.03),
  p12: composeTypoGraphy(12, 14, -0.03)
} as const;

type TypoGraphyType = keyof typeof TypoGraphyStyles;
export {TypoGraphyStyles};
export default TypoGraphyType;
