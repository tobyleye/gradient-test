import { useState } from "react";
import { StyleSheet, View, Text, Alert } from "react-native";
import Button from "../components/Button";
import { TextInput } from "../components/TextInput";
import client from "../client";

export default function QRCodeGenerator({ navigation }) {
  const [amount, setAmount] = useState("");
  const [purpose, setPurpose] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleCreateQrCode() {
    if (!amount) {
      Alert.alert("Amount field is required");
      return;
    }

    setLoading(true);

    client
      .post("/payment-requests", {
        amount,
        purpose,
      })
      .then((resp) => {
        const { _id: id, amount, purpose } = resp.data.data;
        navigation.replace("qrcode", { id, amount, purpose });
      })
      .catch(() => {
        setLoading(false);
        console.log("err", err);
      });
  }

  return (
    <View style={styles.container}>
      <View style={styles.formContainer}>
        <TextInput
          label="Amount"
          align="center"
          keyboardType="numeric"
          value={amount}
          placeholder="Amount"
          onChangeText={setAmount}
          size={18}
        />
        <TextInput
          align="center"
          label="Purpose"
          value={purpose}
          onChangeText={setPurpose}
          placeholder="purpose"
          size={18}
        />
        <View style={styles.btnContainer}>
          <Button
            loading={loading}
            text="Create QR Code"
            onPress={handleCreateQrCode}
            large
          />
        </View>
      </View>

      <View style={styles.codeContainer}>
        <Text style={styles.instruction}>
          Please enter the amount to generate a code
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    paddingTop: 20,
  },
  formContainer: {
    justifyContent: "center",
    backgroundColor: "white",
    position: "relative",
    zIndex: 1,
    paddingTop: 20,
    width: 200,
    alignSelf: "center",
  },
  codeContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#f3f3f3",
    position: "relative",
  },
  instruction: {
    color: "#ccc",
  },
  btnContainer: {
    position: "relative",
    top: 25,
    zIndex: 4,
  },
});
