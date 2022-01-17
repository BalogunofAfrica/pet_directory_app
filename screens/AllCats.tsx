import { useEffect, useState } from "react";
import { FlatList, StyleSheet } from "react-native";

import { fetchCats } from "../api";
import { CatListBlock, View } from "../components";
import type { CatObject } from "../types";
import { pick } from "../util";
import AsyncStorage from "@react-native-async-storage/async-storage";

const storeData = async (key: string, value: object) => {
  let jsonValue: string;
  try {
    const stored = await AsyncStorage.getItem(key);
    if (stored) {
      jsonValue = JSON.stringify([value, ...JSON.parse(stored)]);
      await AsyncStorage.setItem(key, jsonValue);
      return;
    } else {
      jsonValue = JSON.stringify([value]);
      await AsyncStorage.setItem(key, jsonValue);
    }
  } catch (e) {
    // saving error
    console.log(e);
  }
};

const getData = async (key: string) => {
  try {
    const value = await AsyncStorage.getItem(key);
    if (value !== null) {
      // value previously stored
    }
  } catch (e) {
    // error reading value
  }
};

const keyValue = "liked";

export default function AllCats() {
  const [cats, setCats] = useState<CatObject[]>([]);
  const getCats = async () => {
    try {
      const res = await fetchCats();
      const data = res?.map((cat) =>
        pick(cat, ["image", "name"])
      ) as CatObject[];
      setCats(data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getCats();
  }, []);

  return (
    <View style={styles.container}>
      <FlatList
        data={cats}
        keyExtractor={(i) => `${i.name}`}
        renderItem={({ item }) => (
          <CatListBlock
            name={item.name}
            onPress={async () => {
              storeData(keyValue, item);
            }}
            uri={item.image?.url ?? "https://via.placeholder.com/1200"}
          />
        )}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 25,
  },
  separator: {
    height: 1,
    marginVertical: 30,
    width: "80%",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
  },
});
