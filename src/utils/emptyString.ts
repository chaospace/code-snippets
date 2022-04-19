const emptyString = (str: string) => {
  return !str || str.toString().trim().length == 0;
};

export default emptyString;
