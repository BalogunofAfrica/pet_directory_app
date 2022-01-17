import { FontAwesome } from "@expo/vector-icons";
import { Image, Pressable, StyleSheet } from "react-native";
import Animated, {
  BounceOut,
  LightSpeedInLeft,
  SequencedTransition,
} from "react-native-reanimated";

import { Colors, Spacing } from "../constants";
import { useColorScheme } from "../hooks";
import { Text, View } from "./Themed";

interface Props {
  index: number;
  name: string;
  onPress(): void;
  uri: string;
}

const IMAGE_SIZE = 150;

export default function LikedCatBlock({ index, name, onPress, uri }: Props) {
  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme];
  return (
    <Animated.View
      layout={SequencedTransition.delay(1000)}
      entering={LightSpeedInLeft.delay(index * 200).springify()}
      exiting={BounceOut}
      style={styles.container}
    >
      <Image style={styles.image} source={{ uri }} />
      <View style={styles.nameContainer}>
        <Text style={styles.text}>{name}</Text>
        <Pressable style={styles.pressable} onPress={onPress}>
          <FontAwesome size={18} color={colors.heart} name="heart" />
        </Pressable>
      </View>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: Spacing.xl,
    width: IMAGE_SIZE,
  },
  image: {
    borderRadius: 10,
    height: IMAGE_SIZE,
    marginRight: Spacing.m,
    width: IMAGE_SIZE,
  },
  nameContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: Spacing.xs,
  },
  pressable: {
    alignItems: "flex-end",
    flex: 0.3,
    justifyContent: "center",
  },
  text: {
    flex: 0.7,
    fontFamily: "sf-pro-regular",
    fontSize: 16,
  },
});
