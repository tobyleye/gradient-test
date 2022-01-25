import { useState } from "react";
import {  View, Alert } from "react-native";
import client from "../../client";
import { useAuth } from "../../context/Auth";
import Button from "../../components/Button";
import styles from "./styles";
import { TextInput, EmailInput } from "../../components/TextInput";

export default function LoginForm() {
  let [email, setEmail] = useState("johndoe@gmail.com");
  let [password, setPassword] = useState("johndoe");
  let [loading, setLoading] = useState(false);

  let { dispatch } = useAuth();

  async function handleSubmit() {
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
      Alert.alert("invalid login details");
    }
  }

  return (
    <View style={styles.formContainer}>
      <EmailInput label="Email" value={email} onChangeText={setEmail} />
      <TextInput
        label="Password"
        value={password}
        secureTextEntry={true}
        onChangeText={setPassword}
      />
      <Button text="Login" loading={loading} onPress={handleSubmit} />
    </View>
  );
}
