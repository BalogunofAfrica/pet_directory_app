import { useEffect, useState } from "react";
import { FlatList, StyleSheet } from "react-native";

import { fetchCats } from "../api";
import { CatListBlock, View } from "../components";
import type { CatObject } from "../types";
import { pick } from "../util";

export default function AllCats() {
  const [cats, setCats] = useState<CatObject[]>([]);

  useEffect(() => {
    fetchCats().then((res) => {
      const data = res?.map((cat) =>
        pick(cat, ["image", "name"])
      ) as CatObject[];
      setCats(data);
    });
  }, []);
  return (
    <View style={styles.container}>
      <FlatList
        data={cats}
        keyExtractor={(i) => `${i.name}`}
        renderItem={({ item }) => (
          <CatListBlock
            name={item.name}
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
