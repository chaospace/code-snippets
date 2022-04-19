function composeTypoGraphy(
  size: number,
  lineHeight: number,
  letterSpacing: number
) {
  return {
    size: `${size}px`,
    letterSpacing: `${letterSpacing}em`,
    lineHeight: `${lineHeight / size}`
  };
}

const TypoGraphyStyles = {
  h1: composeTypoGraphy(60, 75, -0.05),
  h2: composeTypoGraphy(48, 60, -0.05),
  h3: composeTypoGraphy(40, 50, -0.06),
  h4: composeTypoGraphy(32, 50, -0.03),
  h5: composeTypoGraphy(24, 30, -0.02),
  h6: composeTypoGraphy(18, 23, -0.04),

  p1: composeTypoGraphy(20, 30, -0.03),
  p2: composeTypoGraphy(18, 20, -0.03),
  p3: composeTypoGraphy(16, 20, -0.02),
  p4: composeTypoGraphy(14, 20, -0.03),
  p5: composeTypoGraphy(12, 14, -0.03)
} as const;

type TypoGraphyStyleType = keyof typeof TypoGraphyStyles;
export { TypoGraphyStyles };
export default TypoGraphyStyleType;
