import { useEffect, useState } from "react";
import { Text, View, TouchableOpacity } from "react-native";
import LoginForm from "./Login";
import SignupForm from "./Signup";
import styles from "./styles";

export default function ({ navigation }) {
  let [visibleForm, setVisibleForm] = useState("Login");

  useEffect(() => {
    navigation.setOptions({
      title: visibleForm,
    });
  }, [visibleForm]);

  function renderForm() {
    switch (visibleForm) {
      case "Login":
        return <LoginForm />;
      case "Signup":
        return <SignupForm />;
      default:
        return null;
    }
  }

  function getNavBtnStyle(title) {
    if (title === visibleForm) {
      return [
        styles.navBtn,
        {
          borderBottomColor: "black",
          borderBottomWidth: 2,
        },
      ];
    }
    return styles.navBtn;
  }

  return (
    <View style={styles.container}>
      <View style={styles.card}>
        {/* nav */}
        <View style={styles.nav}>
          <TouchableOpacity
            style={getNavBtnStyle("Login")}
            onPress={() => setVisibleForm("Login")}
          >
            <Text style={styles.navBtnText}>Login</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={getNavBtnStyle("Signup")}
            onPress={() => setVisibleForm("Signup")}
          >
            <Text style={styles.navBtnText}>Signup</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.cardBody}>{renderForm()}</View>
      </View>
    </View>
  );
}
