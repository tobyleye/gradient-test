import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { colors } from "../../theme";

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
    borderLeftWidth: 10,
    borderLeftColor: colors.yellow,
    borderTopRightRadius: 12,
    marginBottom: 20,
    marginHorizontal: 16,
  },
  primaryText: {
    marginBottom: 2,
    fontSize: 13,
    color: '#6c757d'
  },
  secondaryText: {
    color: colors.green.light,
    fontSize: 18,
    fontWeight: "600",
  },
});
