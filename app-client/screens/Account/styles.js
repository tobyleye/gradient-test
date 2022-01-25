import { StyleSheet } from "react-native";

export default StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 50,
  },
  card: {
    paddingVertical: 20,
    backgroundColor: "white",
    borderRadius: 4,
  },
  nav: {
    flexDirection: "row",
    marginBottom: 10,
  },
  navBtn: {
    flex: 1,
    justifyContent: "center",
    marginBottom: 20,
    borderBottomColor: "#ccc",
    borderBottomWidth: 1,
    paddingVertical: 10,
    paddingHorizontal: 5,
  },
  navBtnText: {
    textAlign: "center",
    fontSize: 16,
    fontWeight: "800",
  },
  cardBody: {
    paddingHorizontal: 30,
  },

});
