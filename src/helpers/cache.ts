import { isEqual } from "lodash";
import {
  GooglePlacesPrediction,
  MAX_SEARCH_HISTORY_RESULT,
  Nullable,
  googlePlacesStorageKey,
} from "../constants";

type CacheData<T> = {
  data: T;
};

const readCacheData = <T = unknown>(key: string): Nullable<CacheData<T>> => {
  try {
    const value = localStorage.getItem(key) ?? "null";
    const cache = JSON.parse(value) as Nullable<CacheData<T>>;

    return cache;
  } catch {
    return undefined;
  }
};

const writeCacheData = <T = unknown>(
  key: string,
  payload: CacheData<T>
): boolean => {
  try {
    localStorage.setItem(key, JSON.stringify(payload));
    return true;
  } catch {
    return false;
  }
};

const clearCacheData = (key: string): void => {
  localStorage.removeItem(key);
};

const writeAutocompleteSearchEntryToCache = (data: GooglePlacesPrediction) => {
  const cache = readCacheData<GooglePlacesPrediction[]>(googlePlacesStorageKey);
  const cachedData = cache?.data ?? [];

  // Prevents addition of duplicate data to cache
  if (cachedData.some((data_) => isEqual(data_, data))) {
    return;
  }

  if (cachedData.length === MAX_SEARCH_HISTORY_RESULT) {
    cachedData.shift();
  }

  cachedData.push(data);
  writeCacheData<GooglePlacesPrediction[]>(googlePlacesStorageKey, {
    data: cachedData,
  });

  return cachedData;
};

export type { CacheData };
export {
  clearCacheData,
  readCacheData,
  writeCacheData,
  writeAutocompleteSearchEntryToCache,
};
