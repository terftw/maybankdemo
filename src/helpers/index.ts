import { isEmpty } from "lodash";

const isArrayNonEmptyAndDefined = <T>(arr: T[]): false | T[] => {
  return !isEmpty(arr) && arr;
};

export { isArrayNonEmptyAndDefined };
