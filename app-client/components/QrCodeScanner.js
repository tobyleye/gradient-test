import { Camera } from "expo-camera";
import { StyleSheet } from "react-native";
import { useState,useEffect } from "react";

export default function QrCodeScanner({onBarCodeScanned}) {
  const [hasPermission, setHasPermission] = useState(null);
  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestCameraPermissionsAsync();
      setHasPermission(status === "granted");
    })();
  }, []);

  return hasPermission ? (
    <Camera
      style={styles.camera}
      type={Camera.Constants.Type.back}
      onBarCodeScanned={onBarCodeScanned}
    ></Camera>
  ) : null;
}

const styles = StyleSheet.create({
  camera: {
    height: 400,
    borderWidth: 2,
    borderColor: "black",
  },
});
