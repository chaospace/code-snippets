const Formatter = {
  CAPACITY_UNIT: "MW",
  GENERATION_UNIT: "MWh",
  NULL_REPLACE_VALUE: "-"
};

const PATTERN = {
  NUMBER: /^\s*[+-]?(\d+|\.\d+|\d+\.\d+|\d+\.)(e[+-]?\d+)?\s*$/,
  URL: /(((http(s?)):\/\/)?)([0-9a-zA-Z\-]+\.)+[a-zA-Z]{2,6}(:[0-9]+)?(\/\S*)?/i,
  MOBILE: /^01([0|1|6|7|8|9])([0-9]{3,4})([0-9]{4})$/,
  PASSWORD: /^[a-z0-9]{4,}$/i,
  EMAIL:
    /^[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*\.[a-zA-Z]{2,3}$/
} as const;

export { Formatter, PATTERN };
