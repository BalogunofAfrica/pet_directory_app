import { useIsFocused } from "@react-navigation/native";
import { useEffect, useState } from "react";
import { ScrollView, StyleSheet } from "react-native";
// @ts-expect-error
import { FALLBACK_URL } from "react-native-dotenv";

import * as cache from "../cache";
import { LikedCatBlock, View } from "../components";
import { Cachekeys, Spacing } from "../constants";
import type { CatObject } from "../types";

export default function CatsIlike() {
  const [liked, setLiked] = useState<CatObject[]>([]);
  const isFocused = useIsFocused();

  useEffect(() => {
    (async () => {
      const data = await cache.getData(Cachekeys.likedCats);
      if (data !== null && data !== liked) {
        setLiked(data);
      } else if (data === null) {
        setLiked([]);
      }
    })();
  }, [isFocused]);

  const handlePress = async (item: CatObject) => {
    await cache.removeData(Cachekeys.likedCats, item);
    setLiked(liked.filter((i) => i.name !== item.name));
  };

  return (
    <View style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.wrapper}>
          {liked.map((item, index) => {
            let fallbackUrl = `${FALLBACK_URL}?text=Purr+404+!`;
            return (
              <LikedCatBlock
                key={`${item.name}`}
                uri={item.image?.url ?? fallbackUrl}
                name={item.name}
                index={index}
                onPress={() => handlePress(item)}
              />
            );
          })}
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: Spacing.xl,
  },
  wrapper: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },
});
