import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { AuthProvider } from "../hooks/authContext";

export default function RootLayout() {
  return (
    <AuthProvider>
      <SafeAreaView style={styles.container} edges={["top"]}>
        <StatusBar style="dark" />

        <Stack screenOptions={{ headerShown: false }}>
          {/* Main app (tabs) */}
          <Stack.Screen name="(tabs)" />

          {/* Secondary pages */}
          <Stack.Screen name="login" />
          <Stack.Screen name="register" />
        </Stack>
      </SafeAreaView>
    </AuthProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
});
