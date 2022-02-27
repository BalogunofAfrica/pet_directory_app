import AsyncStorage from "@react-native-async-storage/async-storage";

import { CatObject } from "./types";

const getData = async (key: string) => {
  try {
    const value = await AsyncStorage.getItem(key);
    return value ? JSON.parse(value) : null;
  } catch (e) {
    // error reading value
    return (e as Error).message;
  }
};

const removeData = async (key: string, value: CatObject) => {
  let jsonValue: string;
  try {
    const stored = await AsyncStorage.getItem(key);
    if (stored) {
      let data = JSON.parse(stored);
      data = data.filter((item: CatObject) => item.name !== value.name);
      jsonValue = JSON.stringify(data);
      await AsyncStorage.setItem(key, jsonValue);
    }
  } catch (e) {
    // error saving value
    return (e as Error).message;
  }
};

const storeData = async (key: string, value: CatObject) => {
  let jsonValue: string;
  let warn = "duplicate data";
  try {
    const stored = await AsyncStorage.getItem(key);
    if (stored) {
      const parsed = JSON.parse(stored);
      const isExisting = parsed.some(
        (item: CatObject) => item.name === value.name
      );
      if (!isExisting) {
        jsonValue = JSON.stringify([value, ...parsed]);
        await AsyncStorage.setItem(key, jsonValue);
        return;
      } else {
        return warn;
      }
    } else {
      jsonValue = JSON.stringify([value]);
      await AsyncStorage.setItem(key, jsonValue);
    }
  } catch (e) {
    // error saving value
    return (e as Error).message;
  }
};

export { getData, removeData, storeData };
