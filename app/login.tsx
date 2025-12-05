import { LinearGradient } from "expo-linear-gradient";
import { Link, router } from "expo-router";
import React, { useState } from "react";
import {
  Alert,
  Image,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";

import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase";

export default function Login() {
  const [email, setEmail] = useState("");
  const [pwd, setPwd] = useState("");

  const onLogin = async () => {
    // Basic form validation
    if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email))
      return Alert.alert("Invalid email");
    if (pwd.length < 6) return Alert.alert("Password must be 6+ chars");

    try {
      //Firebase login
      await signInWithEmailAndPassword(auth, email, pwd);

      // If login is sucessfull, redirect the user to the main page.
      router.replace("../(tabs)");
    } catch (err: any) {
      Alert.alert("Login failed", err.message);
    }
  };

  return (
    <LinearGradient
      colors={["#A7F3D0", "#FFB6A3"]}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
      style={s.gradient}
    >
      <View style={s.wrap}>
        <Image
          source={require("../assets/images/logo_noName.png")}
          style={s.logo}
        />

        <Text style={s.h1}>Sign in</Text>

        <TextInput
          style={s.input}
          value={email}
          onChangeText={setEmail}
          placeholder="you@email.com"
          autoCapitalize="none"
          placeholderTextColor="#999"
        />

        <TextInput
          style={s.input}
          value={pwd}
          onChangeText={setPwd}
          placeholder="password"
          secureTextEntry
          placeholderTextColor="#999"
        />

        <Pressable onPress={onLogin} style={s.btn}>
          <Text style={s.btnTxt}>Sign in</Text>
        </Pressable>

        <Link href="/register" style={s.link}>
          Create an account
        </Link>
      </View>
    </LinearGradient>
  );
}

const s = StyleSheet.create({
  gradient: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  wrap: {
    width: "90%",
    backgroundColor: "rgba(255,255,255,0.85)",
    borderRadius: 20,
    padding: 24,
    alignItems: "center",
    shadowColor: "#000",
    shadowOpacity: 0.15,
    shadowOffset: { width: 0, height: 8 },
    shadowRadius: 12,
    elevation: 5,
  },
  logo: {
    width: 150,
    height: 150,
    marginBottom: 10,
    borderRadius: 20,
  },
  h1: { fontSize: 24, fontWeight: "800", marginBottom: 6, color: "#111827" },
  input: {
    width: "100%",
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 10,
    padding: 12,
    marginVertical: 4,
    backgroundColor: "#fff",
  },
  btn: {
    backgroundColor: "#FF7A59",
    padding: 14,
    borderRadius: 10,
    alignItems: "center",
    width: "100%",
    marginTop: 6,
  },
  btnTxt: { color: "#fff", fontWeight: "800", fontSize: 16 },
  link: { textAlign: "center", marginTop: 12, color: "#111827", fontWeight: "600" },
});
