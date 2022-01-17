import { FontAwesome } from "@expo/vector-icons";
import { Image, Pressable, StyleSheet } from "react-native";
import Animated, {
  BounceOut,
  LightSpeedInLeft,
  SequencedTransition,
} from "react-native-reanimated";
import { Text, View } from "./Themed";

interface Props {
  onPress(): void;
  index: number;
  name: string;
  uri: string;
}

export default function LikedCatBlock({ onPress, index, name, uri }: Props) {
  return (
    <Animated.View
      layout={SequencedTransition.delay(1000)}
      entering={LightSpeedInLeft.delay(index * 200).springify()}
      exiting={BounceOut}
      style={styles.container}
    >
      <Image style={styles.image} source={{ uri }} />
      <View style={styles.nameContainer}>
        <Text>{name}</Text>
        <Pressable onPress={onPress}>
          <FontAwesome size={18} color={"red"} name="heart" />
        </Pressable>
      </View>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: 25,
    width: 150,
  },
  image: {
    borderRadius: 10,
    height: 150,
    marginRight: 15,
    width: 150,
  },
  nameContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 5,
  },
});
