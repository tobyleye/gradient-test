import { useRef } from "react";
import { TouchableOpacity, View, Text, StyleSheet, Share } from "react-native";
import QRCode from "react-native-qrcode-svg";
import { formatAmount } from "../utils";
// import Share from "react-native-share"
// import * as Sharing from 'expo-sharing';

export default function ({ route }) {
  let { id, amount, purpose } = route.params;
  const qrCodeRef = useRef(null);

  function handleShare() {
    console.log("code ref:", qrCodeRef);
    qrCodeRef.current.toDataURL((dataURL) => {
      console.log("qrcode url", dataURL);
      let content = {
        title: "React Native",
        url: `data:image/png;base64,${dataURL}`,
        message: `data:image/png;base64,${dataURL}`,
      };
      Share.open(content).catch((err) => {
        console.log("error sharing:", err);
      });
    });
  }

  //   function expoShare(){
  //     qrCodeRef.current.toDataURL((dataURL) => {
  //        Sharing.shareAsync(`data:image/png;base64,${dataURL}`, {
  //            mimeType:'image/png'
  //        })
  //         .catch(err => {
  //             console.log('errorsharing', err)
  //         })
  //       });
  //   }

  return (
    <View style={styles.container}>
      <View style={styles.detailsContainer}>
        <Text style={styles.amount}>{formatAmount(amount)}</Text>
        <Text style={styles.purpose}>{purpose}</Text>
      </View>
      <View style={styles.codeContainer}>
        <View style={styles.wrapper}>
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
        <TouchableOpacity style={styles.shareBtn} onPress={handleShare}>
          <Text style={styles.shareBtnText}>Share</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  detailsContainer: {
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f3f3f3",
    paddingHorizontal: 20,
    paddingVertical: 50,
  },
  codeContainer: {
    backgroundColor: "white",
    paddingVertical: 20,
    flex: 1,
    paddingHorizontal: 20,
  },
  amount: {
    fontSize: 50,
    fontWeight: "300",
    marginBottom: 10,
  },
  purpose: {
    fontSize: 14,
  },
  wrapper: {
    alignItems: "center",
  },
  shareBtn: {
    marginTop: 40,
  },
  shareBtnText: {
    textAlign: "center",
    textTransform: "uppercase",
    fontWeight: "800",
  },
});
