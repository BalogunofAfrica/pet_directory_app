import { StyleSheet } from "react-native";

import { Spacing } from "../constants";
import { Text } from "./Themed";

interface Props {
  length: number;
  text: string;
}

export default function ListEmpty({ length, text }: Props) {
  if (length === 0) return <Text style={styles.empty}>{text}</Text>;

  return null;
}

const styles = StyleSheet.create({
  empty: {
    flex: 1,
    marginTop: Spacing.xl,
    textAlign: "center",
  },
});
