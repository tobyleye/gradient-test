import { useState } from "react";
import { View, Alert } from "react-native";
import client from "../../client";
import { useAuth } from "../../context/Auth";
import styles from "./styles";
import Button from "../../components/Button";
import { EmailInput, TextInput } from "../../components/TextInput";

export default function SignupForm() {
  let [email, setEmail] = useState("johndoe@gmail.com");
  let [password, setPassword] = useState("johndoe");
  let [loading, setLoading] = useState(false);

  let { dispatch } = useAuth();

  async function handleSubmit() {
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
      console.log("signup error err", err);
      setLoading(false);
      Alert.alert("error signing up");
    }
  }

  return (
    <View style={styles.formContainer}>
      <EmailInput label="Email" value={email} onChangeText={setEmail} />

      <TextInput
        label="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry={true}
      />

      <Button text="Signup" loading={loading} onPress={handleSubmit} />
    </View>
  );
}
