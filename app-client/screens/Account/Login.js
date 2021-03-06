import { useState } from "react";
import { View, Alert } from "react-native";
import client from "../../client";
import { useAuth } from "../../context/Auth";
import Button from "../../components/Button";
import styles from "./styles";
import {
  EmailInput,
  PasswordInput,
} from "../../components/TextInput";

export default function LoginForm() {
  let [email, setEmail] = useState(__DEV__ ? "johndoe@gmail.com" : "");
  let [password, setPassword] = useState(__DEV__ ? "johndoe" : "");
  let [loading, setLoading] = useState(false);

  let { dispatch } = useAuth();

  async function handleSubmit() {
    if (!email || !password) {
      Alert.alert("Oops!", "email & password are required!");
      return;
    }
    try {
      setLoading(true);
      const { data } = await client.post("/login", {
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
      Alert.alert(
        "Oops!",
        "There was a problem loggin in, check your email and password"
      );
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
      <PasswordInput
        label="Password"
        value={password}
        onChangeText={setPassword}
        placeholder="Password"
      />
      <Button text="Login" loading={loading} onPress={handleSubmit} />
    </View>
  );
}
