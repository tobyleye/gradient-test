import { Camera } from "expo-camera";
import { ActivityIndicator, Alert, StyleSheet, View } from "react-native";
import { useState, useEffect } from "react";
import PaymentForm  from "./PaymentForm";
import client from "../../client";
import { colors } from "../../theme";

export default function QrCodeScanner({ navigation }) {
  const [hasPermission, setHasPermission] = useState(null);
  const [resolvedCode, setResolvedCode] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestCameraPermissionsAsync();
      setHasPermission(status === "granted");
    })();
  }, []);

  async function handleBarCodeScanned(data) {
    // send data to server to verify code
    setLoading(true);
    let paymentRequestId = data.data;
    try {
      let resp = await client.get(`/payment-requests/${paymentRequestId}`);
      setLoading(false);
      let data = resp.data.data;

      if (data.status === "paid") {
        Alert.alert("Request has been paid.");
        return;
      }
      
      setResolvedCode(data);
    } catch (err) {
      setLoading(false);
      Alert.alert("Invalid qr code");
    }
  }

  const handleCancel = () => {
    setResolvedCode(null);
  };

  const handlePaymentComplete = () => {
    navigation.navigate("Home");
  };

  if (hasPermission)
    return (
      <View style={styles.container}>
        <Camera
          style={styles.camera}
          type={Camera.Constants.Type.back}
          onBarCodeScanned={handleBarCodeScanned}
        ></Camera>
        {loading && (
          <View style={styles.loadingContainer}>
            <ActivityIndicator animating={loading} color={colors.green.light} size="large" />
          </View>
        )}
        {resolvedCode && (
          <PaymentForm
            paymentRequest={resolvedCode}
            onCancel={handleCancel}
            onPaymentComplete={handlePaymentComplete}
          />
        )}
      </View>
    );
  return null;
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  camera: {
    flex: 1,
    borderWidth: 2,
    borderColor: "black",
  },
  loadingContainer: {
    position: "absolute",
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "rgba(255,255,255,.5)",
  },
});
