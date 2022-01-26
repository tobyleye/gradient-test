import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import HomeButton from "./HomeButton";
import PaymentsReceived from "./PaymentsReceived";
import { useAuth } from "../../context/Auth";
import { colors } from "../../theme";

export default function Home({ navigation }) {
  const { dispatch, state } = useAuth();

  function handleLogout() {
    dispatch({ type: "logout" });
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={styles.greetings}>
          <Text style={[styles.textWhite]}>Hello, </Text>
          <Text style={[styles.textWhite, styles.boldText]}>
            {state.user.email}
          </Text>
        </View>
        <TouchableOpacity onPress={handleLogout}>
          <Text style={[styles.textWhite]}>Logout</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.btnsContainer}>
        <HomeButton
          primaryText="Accept Quick Payment"
          secondaryText="Generate Qr Code"
          onPress={() => navigation.navigate("CodeGenerator")}
        />
        <HomeButton
          primaryText="Make Payment"
          secondaryText="Scan Qr Code"
          onPress={() => navigation.navigate("CodeScanner")}
        />
      </View>

      <PaymentsReceived />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.green.deep,
    paddingTop: 20,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 40,
    marginHorizontal: 16,
    color: "#fff",
  },
  textWhite: {
    color: "#fff",
  },
  greetings: {
    display: "flex",
    flexDirection: "row",
  },
  boldText: {
    fontWeight: "800",
  },
  btnsContainer: {
    marginBottom: 50,
  },
});
