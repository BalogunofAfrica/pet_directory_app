import AsyncStorage from "@react-native-async-storage/async-storage";
import { ToastAndroid } from "react-native";

const TOAST_MESSAGE = "You already have this cat in your favourites";
const getData = async (key: string) => {
  try {
    const value = await AsyncStorage.getItem(key);
    return value ? JSON.parse(value) : null;
  } catch (e) {
    // error reading value
    console.error(e);
  }
};

const removeData = async (key: string, value: object) => {
  let jsonValue: string;
  try {
    const stored = await AsyncStorage.getItem(key);
    if (stored) {
      let data = JSON.parse(stored);
      // @ts-expect-error
      data = data.filter((item: { name: string }) => item.name !== value.name);
      jsonValue = JSON.stringify(data);
      await AsyncStorage.setItem(key, jsonValue);
    }
  } catch (e) {
    // error saving value
    console.error(e);
  }
};

const storeData = async (key: string, value: object) => {
  let jsonValue: string;
  try {
    const stored = await AsyncStorage.getItem(key);
    if (stored) {
      const parsed = JSON.parse(stored);
      const isExisting = parsed.some(
        // @ts-expect-error
        (item: { name: string }) => item.name === value.name
      );
      if (!isExisting) {
        jsonValue = JSON.stringify([value, ...parsed]);
        await AsyncStorage.setItem(key, jsonValue);
        return;
      } else {
        ToastAndroid.show(TOAST_MESSAGE, 3000);
      }
    } else {
      jsonValue = JSON.stringify([value]);
      await AsyncStorage.setItem(key, jsonValue);
    }
  } catch (e) {
    // error saving value
    console.error(e);
  }
};

export { getData, removeData, storeData };
