import { Camera } from "expo-camera";
import {
  ActivityIndicator,
  Alert,
  Button,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { useState, useEffect } from "react";
import client from "../client";

export default function QrCodeScanner() {
  const [hasPermission, setHasPermission] = useState(null);
  const [resolvedCode, setResolvedCode] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestCameraPermissionsAsync();
      setHasPermission(status === "granted");
    })();
  }, []);

  function handleBarCodeScanned(data) {
    // send data to server to verify code
    setLoading(true);
    client
      .get(`/payment-requests/${data.data}`)
      .then((resp) => {
        setLoading(false);
        let data = resp.data.data;
        console.log("data -->", data);
        if (data.status === "paid") {
          Alert.alert("request has been paid.");
          return;
        }
        setResolvedCode(data);
      })
      .catch((err) => {
        setLoading(false);
        console.log("error-->", err);
        Alert.alert("Invalid qr code");
      });
  }

  const handlePay = async () => {
    client
      .post("/payments", {paymentRequestId: resolvedCode._id})
      .then(() => {
        setResolvedCode(null)
        Alert.alert("Paid!");
        navigation.navigate("home");
      })
      .catch((err) => {
        console.log('error paying', err)
      });
  };
  const handleCancel = () => {
    setResolvedCode(null);
  };

  if (hasPermission)
    return (
      <View style={styles.container}>
        <Camera
          style={styles.camera}
          key={resolvedCode}
          type={Camera.Constants.Type.back}
          onBarCodeScanned={handleBarCodeScanned}
        ></Camera>
        {loading && (
          <View style={styles.loadingContainer}>
            <ActivityIndicator animating={loading} color="green" size="large" />
          </View>
        )}
        {resolvedCode && (
          <View style={styles.resolvedCodeContainer}>
            <Text style={[styles.textCenter, styles.amount]}>
              {resolvedCode.amount}
            </Text>
            <Text style={[styles.textCenter, styles.desc]}>
              {resolvedCode.reason}
            </Text>
            <View style={styles.btnGroup}>
              <Button title="pay" onPress={handlePay} />
              <Button title="cancel" onPress={handleCancel} />
            </View>
          </View>
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
  resolvedCodeContainer: {
    backgroundColor: "white",
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    height: 240,
    borderTopRightRadius: 10,
    borderTopLeftRadius: 10,
    padding: 20,
  },
  btnGroup: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  amount: {
    fontSize: 30,
    fontWeight: "800",
    marginBottom: 4,
  },
  textCenter: {
    textAlign: "center",
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
