import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

export default function HomeButton({
  primaryText,
  secondaryText,
  onPress = () => {},
}) {
  return (
    <TouchableOpacity style={[styles.btn]} onPress={onPress}>
      <View style={styles.btnTextContainer}>
        <Text style={styles.primaryText}>{primaryText}</Text>
        <Text style={styles.secondaryText}>{secondaryText}</Text>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  btn: {
    backgroundColor: "white",
    paddingHorizontal: 10,
    paddingVertical: 20,
    borderLeftWidth: 6,
    borderLeftColor: "yellow",
    borderTopRightRadius: 10,
    marginBottom: 20,
    marginHorizontal: 16,
  },
  primaryText: {
    marginBottom: 4,
    fontSize: 14,
  },
  secondaryText: {
    color: "green",
    fontSize: 18,
    fontWeight: "600",
  },
});
