import { useEffect, useState } from "react";
import { FlatList, StyleSheet } from "react-native";
// @ts-expect-error
import { FALLBACK_URL } from "react-native-dotenv";

import { fetchCats } from "../api";
import { CatListBlock, View } from "../components";
import { Spacing } from "../constants";
import type { CatObject } from "../types";
import { pick } from "../util";

export default function AllCats() {
  const [cats, setCats] = useState<CatObject[]>([]);
  const getCats = async () => {
    try {
      const res = await fetchCats();
      const data = res?.map((cat) =>
        pick(cat, ["image", "name"])
      ) as CatObject[];
      setCats(data);
    } catch (e) {
      console.error(e);
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
        renderItem={({ item }) => {
          let fallbackUrl = `${FALLBACK_URL}?text=Purr+404+!`;
          return (
            <CatListBlock
              name={item.name}
              item={item}
              uri={item.image?.url ?? fallbackUrl}
            />
          );
        }}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: Spacing.xl,
  },
});
