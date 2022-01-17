import { FontAwesome } from "@expo/vector-icons";
import { ComponentProps } from "react";
import { Image, Pressable, StyleSheet } from "react-native";
import Animated, {
  useAnimatedProps,
  useAnimatedReaction,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
  withTiming,
} from "react-native-reanimated";
import Svg, { PathProps, SvgProps } from "react-native-svg";

import { Text, View } from "./Themed";
import { LikeIcon } from "./icon";

const AnimatedIcon = Animated.createAnimatedComponent(FontAwesome);

interface Props {
  name: string;
  uri: string;
}

export default function CatListBlock({ name, uri }: Props) {
  const liked = useSharedValue(false);
  const scale = useSharedValue(1);
  const animatedProps = useAnimatedProps<PathProps>(() => {
    const name = liked.value ? "heart" : "heart-o";
    return {
      stroke: "#212227",
      fill: "none",
    };
  });
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
  return (
    <View style={styles.container}>
      <View style={styles.breedContainer}>
        <Image style={styles.image} source={{ uri }} />
        <Text>{name}</Text>
      </View>
      <Pressable onPress={() => (liked.value = !liked.value)}>
        {/* <AnimatedIcon
          style={animatedStyle}
          size={18}
          name="heart"
          animatedProps={animatedProps}
        /> */}
        <LikeIcon animatedProps={animatedProps} />
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
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 25,
    paddingRight: 5,
    flex: 1,
  },
  image: {
    borderRadius: 10,
    height: 40,
    marginRight: 15,
    width: 40,
  },
});
