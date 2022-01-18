import { FontAwesome } from "@expo/vector-icons";
import { ComponentProps } from "react";
import { Image, Pressable, StyleSheet, ToastAndroid } from "react-native";
import Animated, {
  useAnimatedProps,
  useAnimatedReaction,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
  withTiming,
} from "react-native-reanimated";

import * as cache from "../cache";
import { Cachekeys, Colors, Spacing } from "../constants";
import { useColorScheme } from "../hooks";
import { CatObject } from "../types";
import { Text, View } from "./Themed";

const AnimatedIcon = Animated.createAnimatedComponent(FontAwesome);

interface Props {
  item: CatObject;
  name: string;
  uri: string;
}

const IMAGE_SIZE = 40;
const TOAST_MESSAGE = "You already have this cat in your favourites";

export default function CatListBlock({ item, name, uri }: Props) {
  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme];

  const liked = useSharedValue(false);
  const scale = useSharedValue(1);
  const animatedProps = useAnimatedProps<ComponentProps<typeof FontAwesome>>(
    () => ({
      color: liked.value ? colors.heart : colors.liked,
    })
  );
  useAnimatedReaction(
    () => liked.value,
    () => {
      if (liked.value) {
        scale.value = withSpring(
          1.5,
          undefined,
          () => (scale.value = withTiming(1))
        );
      }
    }
  );
  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
  }));

  const handlePress = async (item: CatObject) => {
    if (!liked.value) {
      const res = await cache.storeData(Cachekeys.likedCats, item);
      if (res === "duplicate data") {
        ToastAndroid.show(TOAST_MESSAGE, 5000);
      }
    } else {
      await cache.removeData(Cachekeys.likedCats, item);
    }
    liked.value = !liked.value;
  };

  return (
    <View style={styles.container}>
      <View style={styles.breedContainer}>
        <Image style={styles.image} source={{ uri }} />
        <Text style={styles.text}>{name}</Text>
      </View>
      <Pressable onPress={() => handlePress(item)}>
        <AnimatedIcon
          style={animatedStyle}
          size={18}
          name={"heart-o"}
          animatedProps={animatedProps}
        />
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  breedContainer: {
    alignItems: "center",
    flexDirection: "row",
  },
  container: {
    alignItems: "center",
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: Spacing.xl,
    paddingRight: Spacing.xs,
  },
  image: {
    borderRadius: 10,
    height: IMAGE_SIZE,
    marginRight: Spacing.m,
    width: IMAGE_SIZE,
  },
  text: {
    fontFamily: "sf-pro-regular",
    fontSize: 16,
  },
});
