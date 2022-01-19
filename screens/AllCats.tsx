import { useEffect, useState } from "react";
import { ActivityIndicator, FlatList, StyleSheet } from "react-native";
// @ts-expect-error
import { FALLBACK_URL } from "react-native-dotenv";

import { fetchCats } from "../api";
import { CatListBlock, View } from "../components";
import { Colors, Spacing } from "../constants";
import { useColorScheme } from "../hooks";
import type { CatObject } from "../types";
import { pick } from "../util";

export default function AllCats() {
  const [cats, setCats] = useState<CatObject[]>([]);
  const [loading, setLoading] = useState(false);

  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme];

  const getCats = async () => {
    try {
      setLoading(true);
      const res = await fetchCats();
      const data = res?.map((cat) =>
        pick(cat, ["image", "name"])
      ) as CatObject[];
      setCats(data);
      setLoading(false);
    } catch (e) {
      setLoading(false);
      console.error(e);
    }
  };

  useEffect(() => {
    getCats();
  }, []);

  return (
    <View style={styles.container}>
      {loading && <ActivityIndicator color={colors.tint} size="small" />}
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
