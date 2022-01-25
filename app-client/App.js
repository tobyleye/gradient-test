import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Home from "./screens/Home";
import QrCodeScanner from "./screens/CodeScanner";
import CodeGenerator from "./screens/CodeGenerator";
import qrcode from "./screens/qrcode";
import Account from "./screens/Account";
import { AuthContextProvider, useAuth } from "./context/Auth";

const Stack = createNativeStackNavigator();

function Index() {
  const { state } = useAuth();

  return (
    <NavigationContainer>
      <Stack.Navigator>
        {state.isAuthenticated ? (
          <>
            <Stack.Screen name="Home" component={Home} />
            <Stack.Screen name="CodeScanner" component={QrCodeScanner} />
            <Stack.Screen name="CodeGenerator" component={CodeGenerator} />
            <Stack.Screen name="qrcode" component={qrcode} />
          </>
        ) : (
          <>
            <Stack.Screen name="account" component={Account} />
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default function App() {
  return (
    <AuthContextProvider>
      <Index />
    </AuthContextProvider>
  );
}
