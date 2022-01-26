import { useRef } from "react";
import { TouchableOpacity, View, Text, StyleSheet } from "react-native";
import QRCode from "react-native-qrcode-svg";
import { formatAmount } from "../utils";
import { captureRef } from "react-native-view-shot";
import * as Sharing from "expo-sharing";

export default function ({ route }) {
  let { id, amount, purpose } = route.params;
  const qrCodeRef = useRef(null);
  const codeContainerRef = useRef(null);
  
  const qrCodeImage = useRef(null)

  let captureQrCode = async () => {
    if (qrCodeImage.current === null) {
      qrCodeImage.current =  await captureRef(codeContainerRef.current, {
        result: "tmpfile",
        format: "png",
        quality: 1,
      });
    }
    return qrCodeImage.current; 
  }

  async function handleShare() {
    try {
      let image = await captureQrCode()
      await Sharing.shareAsync(image);
    } catch (err) {
      console.log("error sharing:", err);
    }
  }

  return (
    <View style={styles.container}>
      <View style={styles.detailsContainer}>
        <Text style={styles.amount}>{formatAmount(amount)}</Text>
        <Text style={styles.purpose}>{purpose}</Text>
      </View>
      <View ref={codeContainerRef} style={styles.codeContainer}>
        <View>
          <QRCode
            getRef={(ref) => {
              qrCodeRef.current = ref;
            }}
            value={id}
            size={250}
            color="black"
            backgroundColor="white"
          />
        </View>
      </View>
      <TouchableOpacity style={styles.shareBtn} onPress={handleShare}>
        <Text style={styles.shareBtnText}>Share</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor:'white'
  },
  detailsContainer: {
    backgroundColor: "#f3f3f3",
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingVertical: 50,
  },
  codeContainer: {
    backgroundColor: "white",
    paddingVertical: 40,
    alignItems: "center",
  },
  amount: {
    fontSize: 50,
    fontWeight: "300",
    marginBottom: 10,
  },
  purpose: {
    fontSize: 14,
  },
  shareBtn: {
    marginTop: 10,
    alignSelf:'center',
    paddingHorizontal:8
  },
  shareBtnText: {
    textAlign: "center",
    textTransform: "uppercase",
    fontWeight: "600"
  },
});
