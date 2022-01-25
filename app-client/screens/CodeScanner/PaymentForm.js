import { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Alert,
  TouchableOpacity,
} from "react-native";
import Button from "../../components/Button";
import { formatAmount } from "../../utils";
import client from "../../client";

export default function PaymentForm({
  paymentRequest,
  onCancel,
  onPaymentComplete,
}) {
  const [loading, setLoading] = useState(false);

  const handlePay = async () => {
    try {
      setLoading(true);
      client
        .post("/payments", { paymentRequestId: paymentRequest._id })
        .then(() => {
          setLoading(false);
          Alert.alert("Paid!", "", [
            {
              text: "OK",
              onPress: onPaymentComplete,
            },
          ]);
        })
        .catch((err) => {
          setLoading(false);
          console.log("error paying", err);
        });
    } catch (err) {
      console.log("error", err);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.formContainer}>
        <Text style={[styles.textCenter, styles.amount]}>
          {formatAmount(paymentRequest.amount)}
        </Text>
        <Text style={[styles.textCenter, styles.purpose]}>
          {paymentRequest.purpose}
        </Text>
        <Text style={[styles.textCenter, styles.email]}>
          {paymentRequest.createdBy.email}
        </Text>
        <View style={styles.btnsContainer}>
          <View style={{ flex: 1, marginRight: 8 }}>
            <Button text="pay" loading={loading} onPress={handlePay} />
          </View>
          <View style={{ flex: 1 }}>
            <TouchableOpacity  disabled={loading} onPress={onCancel}>
              <Text style={[styles.cancelBtnText, styles.textCenter]}>Cancel</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    top: 0,
    zIndex: 2,
    justifyContent: "flex-end",
    backgroundColor: "rgba(255,255,255,.5)",
  },
  formContainer: {
    backgroundColor: "white",
    padding: 20,
    borderTopRightRadius: 10,
    borderTopLeftRadius: 10,
  },
  backdrop: {
    position: "absolute",
    backgroundColor: "rgba(255,255,255,.5)",
    borderWidth: 4,
    borderColor: "yellow",
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
    zIndex: 4,
  },
  btnsContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems:'center'
  },
  amount: {
    fontSize: 30,
    fontWeight: "800",
    marginBottom: 4,
  },
  textCenter: {
    textAlign: "center",
  },
  amount: {
    fontSize: 30,
    fontWeight: "800",
    marginBottom: 4,
  },
  purpose: {
    color: "#999",
    marginBottom: 5,
  },
  email: {
    color: "#999",
    marginBottom: 20,
  },
  cancelBtnText:{
      fontWeight: "800"
  }
});
