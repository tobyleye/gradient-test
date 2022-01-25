import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { useState } from "react";
import HomeButton from "./HomeButton";
import RecentTransactions from "../../components/RecentTransactions";
import { useAuth } from "../../context/Auth";

export default function Home({navigation}) {
  const [openQrCodeScanner, setOpenQrCodeScanner] = useState(false);

  const {dispatch,state} =useAuth()

  function handleBarCodeScanned(data) {
    console.log("bar code scanned with data", data);
    setOpenQrCodeScanner(false);
  }

  function handleLogout(){
    console.log('logout activated!')
    dispatch({ type: 'logout'})
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={styles.greetings}>
          <Text style={[styles.textWhite]}>Hello, </Text>
          <Text style={[styles.textWhite, styles.boldText]}>{state.user.email}</Text>
        </View>
        <TouchableOpacity onPress={handleLogout}>
          <Text style={[styles.textWhite]}>Logout</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.btnGroup}>
        <HomeButton
          primaryText="Accept Quick Payment"
          secondaryText="Generate Qr Code"
          onPress={() => navigation.navigate('CodeGenerator')}
        />
        <HomeButton
          primaryText="Make Payment"
          secondaryText="Scan Qr Code"
          onPress={() => navigation.navigate('CodeScanner')}
        /> 
      </View>
      

      <RecentTransactions />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "green",
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
  btnGroup: {
    marginBottom: 50,
  },
  scanBtn: {
    backgroundColor: "white",
    borderColor: "black",
    borderWidth: 2,
    position: "absolute",
    bottom: 20,
    right: 20,
    width: 80,
    height: 80,
    borderRadius: 100,
    alignItems: "center",
    justifyContent: "center",
  },
  camera: {
    height: 500,
  },
});
