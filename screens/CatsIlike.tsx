import { useEffect, useState } from "react";
import { ScrollView, StyleSheet } from "react-native";

import { fetchCats } from "../api";
import { LikedCatBlock, View } from "../components";
import type { CatObject } from "../types";
import { pick } from "../util";

export default function CatsIlike() {
  const [liked, setLiked] = useState<CatObject[]>([]);

  useEffect(() => {
    fetchCats().then((res) => {
      let data = res?.map((cat) => pick(cat, ["image", "name"])) as CatObject[];
      setLiked(data.splice(0, 10));
    });
  }, []);

  const handlePress = (name: string) => {
    setLiked(liked.filter((i) => i.name !== name));
  };

  return (
    <View style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.wrapper}>
          {liked.map((item, index) => {
            return (
              <LikedCatBlock
                key={`${item.name}`}
                uri={item.image?.url ?? "https://via.placeholder.com/150"}
                name={item.name}
                index={index}
                onPress={() => handlePress(item.name)}
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
    paddingHorizontal: 25,
  },
  wrapper: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },
});
