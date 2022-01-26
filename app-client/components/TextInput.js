import { useState } from "react";
import {
  View,
  Text,
  TextInput as BaseInput,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import { colors } from "../theme";

export function TextInput({
  label,
  value,
  onChangeText,
  align = "left",
  size = 16,
  inputRight = null,
  style = {},
  ...props
}) {

  let alignStyle = {
    textAlign: align,
  };

  return (
    <View style={styles.container}>
      <Text style={[styles.label, alignStyle]}>{label}</Text>
      <View style={styles.textInputContainer}>
        <BaseInput
          {...props}
          value={value}
          onChangeText={onChangeText}
          style={[styles.textInput, alignStyle, { fontSize: size }, style]}
        />
        {inputRight && <View style={styles.textInputRight}>{inputRight}</View>}
      </View>
    </View>
  );
}

export function EmailInput(props) {
  return (
    <TextInput
    {...props}
      autoCapitalize="none"
      keyboardType="email-address"
      autoComplete="email"
      textContentType="emailAddress"
    />
  );
}

export function PasswordInput(props) {
  const [show, setShow] = useState(false);

  const toggleVisibility = () => {
    setShow((show) => !show);
  };

  return (
    <TextInput
      {...props}
      secureTextEntry={show ? false : true}
      inputRight={
        <TouchableOpacity
          style={{ width: 44, alignItems: "center" }}
          onPress={toggleVisibility}
        >
          <Text>{show ? "🙈" : "🐵"}</Text>
        </TouchableOpacity>
      }
      style={{
        paddingRight: 44, // to accomodate our visibility toggle
      }}
    />
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: 20,
  },
  label: {
    color: "#999",
    fontWeight: "800",
    marginBottom: 5,
  },
  textInputContainer: {
    position: "relative",
  },
  textInput: {
    borderBottomWidth: 1,
    borderBottomColor: colors.green.light,
    fontSize: 15,
    paddingVertical: 5,
  },
  textInputRight: {
    position: "absolute",
    right: 0,
    top: 0,
    bottom: 0,
    alignItems: "center",
    justifyContent: "center",
  },
});
