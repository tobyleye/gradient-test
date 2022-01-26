import { useState } from "react";
import { View, Alert } from "react-native";
import client from "../../client";
import { useAuth } from "../../context/Auth";
import styles from "./styles";
import Button from "../../components/Button";
import { EmailInput, TextInput } from "../../components/TextInput";

export default function SignupForm() {
  let [email, setEmail] = useState("");
  let [password, setPassword] = useState("");
  let [loading, setLoading] = useState(false);

  let { dispatch } = useAuth();

  async function handleSubmit() {
    if (!email || !password) {
      Alert.alert("Oops!", "email & password are required!");
      return;
    }
    try {
      setLoading(true);
      const { data } = await client.post("/signup", {
        email,
        password,
      });
      setLoading(false);
      dispatch({
        type: "authenticate",
        payload: {
          user: data.user,
          token: data.token,
        },
      });
    } catch (err) {
      setLoading(false);
      Alert.alert("Oops!", "There was a problem creating your account");
    }
  }

  return (
    <View style={styles.formContainer}>
      <EmailInput
        label="Email"
        value={email}
        onChangeText={setEmail}
        placeholder="Email"
      />

      <TextInput
        label="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry={true}
        placeholder="Password"
      />

      <Button text="Signup" loading={loading} onPress={handleSubmit} />
    </View>
  );
}
