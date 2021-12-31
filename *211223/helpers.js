export const placeNum = (tokenList) =>
  [...tokenList.classList].at(1).slice(-2).replace("-", "");
