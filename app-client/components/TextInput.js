import { View, Text, TextInput as BaseInput, StyleSheet } from "react-native";

export function TextInput({
  label,
  value,
  onChangeText,
  align = "left",
  size = 16,
  ...props
}) {
  let alignStyle = {
    textAlign: align,
  };

  return (
    <View style={styles.container}>
      <Text style={[styles.label, alignStyle]}>{label}</Text>
      <BaseInput
        value={value}
        onChangeText={onChangeText}
        style={[styles.textInput, alignStyle, { fontSize: size }]}
        {...props}
      />
    </View>
  );
}

export function EmailInput(props) {
  return (
    <TextInput
      autoCapitalize="none"
      keyboardType="email-address"
      autoComplete="email"
      textContentType="emailAddress"
      {...props}
    />
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: 20,
  },
  inner: {},
  label: {
    color: "#999",
    fontWeight: "800",
    marginBottom: 5,
  },
  textInput: {
    borderBottomWidth: 1,
    borderBottomColor: "green",
    fontSize: 15,
    paddingVertical: 5,
  },
});
