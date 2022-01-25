import { useState } from "react";
import {
  ScrollView,
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";

export default function RecentTransactions({}) {
  const [loading, setLoading] = useState(false);

  function refresh() {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 3000);
  }

  return (
    <View style={styles.container}>
      <ScrollView>
        <View style={styles.header}>
          <Text style={styles.title}>Recent Transactions</Text>
          <View>
            {loading ? (
              <ActivityIndicator
                animating={loading}
                size="small"
                color="green"
              />
            ) : (
              <TouchableOpacity onPress={refresh}>
                <Text>Refresh</Text>
              </TouchableOpacity>
            )}
          </View>
        </View>
        <Text style={styles.subtitle}>Last 0 transactions</Text>
      </ScrollView>
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
  },
  title: {
    fontSize: 16,
    fontWeight: "800",
    marginBottom: 5,
  },
  subtitle: {
    color: "#999",
    fontSize: 14,
  },

  refreshBtnText: {
    fontSize: 12,
  },
});
