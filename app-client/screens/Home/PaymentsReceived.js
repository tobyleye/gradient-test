import { useEffect, useState } from "react";
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  ActivityIndicator,
  FlatList,
} from "react-native";
import client from "../../client";

export default function PaymentsReceived({}) {
  const [loading, setLoading] = useState(false);

  const [payments, setPayments] = useState([]);
  const [totalAmountReceived, setTotalAmountReceived] = useState(null);

  let fetchPayments = async () => {
    try {
      setLoading(true);
      const resp = await client.get("/payments");
      const {paymentList, totalAmountReceived} = resp.data.data;
      setLoading(false);
      setPayments(paymentList);
      setTotalAmountReceived(totalAmountReceived)
    } catch (err) {
      // error
      console.log("errror:", err);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPayments();
  }, []);

  const renderItem = ({ item: { amount } }) => {
    return (
      <View>
        <Text>{amount}</Text>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Payments Received</Text>
        <View>
          {loading ? (
            <ActivityIndicator animating={loading} size="small" color="green" />
          ) : (
            <TouchableOpacity onPress={fetchPayments}>
              <Text>Refresh</Text>
            </TouchableOpacity>
          )}
        </View>
      </View>

      <Text style={styles.total}>Total: {totalAmountReceived}</Text>

      <FlatList
        data={payments}
        keyExtractor={(item) => item._id}
        renderItem={renderItem}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    paddingHorizontal: 16,
    paddingVertical: 10,
    flex: 1,
    borderTopRightRadius: 10,
    borderTopLeftRadius: 10,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 8,
  },
  title: {
    fontSize: 16,
    fontWeight: "800",
  },
  total: {
    color: "#999",
    fontSize: 14,
    marginBottom: 14,
  },

  refreshBtnText: {
    fontSize: 12,
  },
});
