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
import { colors } from "../../theme";
import { dateToHuman, formatAmount } from "../../utils";

export default function PaymentsReceived() {
  const [loading, setLoading] = useState(false);

  const [payments, setPayments] = useState([]);
  const [totalAmountReceived, setTotalAmountReceived] = useState(0);

  let fetchPayments = async () => {
    try {
      setLoading(true);
      const resp = await client.get("/payments");
      const { paymentList, totalAmountReceived } = resp.data.data;
      setLoading(false);
      setPayments(paymentList);
      setTotalAmountReceived(totalAmountReceived);
    } catch (err) {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPayments();
  }, []);

  const renderItem = ({ item: { amount, createdAt, createdBy } }) => {
    return (
      <View style={styles.paymentItem}>
        <View>
          <Text style={styles.paymentItemAmount}>{formatAmount(amount)}</Text>
          <Text style={styles.paymentItemPaidBy}>
            Paid by {createdBy.email}
          </Text>
        </View>
        <Text style={styles.paymentItemDate}>{dateToHuman(createdAt)}</Text>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Payments Received</Text>
        <View>
          {loading ? (
            <ActivityIndicator
              animating={loading}
              size="small"
              color={colors.green.light}
            />
          ) : (
            <TouchableOpacity onPress={fetchPayments}>
              <Text style={styles.refreshBtnText}>Refresh</Text>
            </TouchableOpacity>
          )}
        </View>
      </View>

      <Text style={styles.total}>
        Total: {formatAmount(totalAmountReceived)}
      </Text>

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
    paddingVertical: 16,
    flex: 1,
    borderTopRightRadius: 14,
    borderTopLeftRadius: 14,
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

  paymentItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 12,
    paddingBottom: 8,
    borderBottomWidth: 1,
    borderBottomColor: colors.green.light,
  },
  paymentItemAmount: {
    fontSize: 18,
  },
  paymentItemDate: {
    color: "#888",
    fontSize: 12,
  },
  paymentItemPaidBy: {
    fontSize: 12,
    color: "#888",
  },
});
