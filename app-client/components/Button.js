import {
  TouchableOpacity,
  Text,
  StyleSheet,
  ActivityIndicator,
} from "react-native";

export default function Button({
  text,
  loading = false,
  onPress = () => {},
  style = {},
  large = false,
  disabled=false
}) {
  return (
    <TouchableOpacity
      style={[styles.btn, large && styles.btnLarge, style]}
      onPress={onPress}
      disabled={loading || disabled}
    >
      {loading ? (
        <ActivityIndicator animating={loading} color="white" size="small" />
      ) : (
        <Text style={[styles.btnText, large && styles.btnTextLarge]}>
          {text}
        </Text>
      )}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  btn: {
    backgroundColor: "green",
    color: "white",
    borderRadius: 4,
    height: 40,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  btnText: {
    color: "white",
  },
  btnLarge: {
    height: 50,
  },
  btnTextLarge: {
    fontSize: 16,
  },
});
