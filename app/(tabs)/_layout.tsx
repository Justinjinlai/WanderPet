import FontAwesome5 from "@expo/vector-icons/FontAwesome5";
import Foundation from "@expo/vector-icons/Foundation";
import { Tabs } from "expo-router";
import ProtectedRoute from "../../hooks/ProtectedRoute";

export default function TabsLayout() {
  return (
    <ProtectedRoute>
      <Tabs screenOptions={{ headerShown: false, tabBarActiveTintColor: "#FF7A59", tabBarShowLabel: false}}>
        <Tabs.Screen name="index" options={{ tabBarIcon: ({color,size}) => <Foundation name="home" size={size} color={color} /> }} />
        <Tabs.Screen name="report" options={{ tabBarIcon: ({color,size}) => <FontAwesome5 name="paw" size={size} color={color} /> }} />
        <Tabs.Screen name="adopt" options={{ tabBarIcon: ({color,size}) => <FontAwesome5 name="dog" size={size} color={color} /> }} />
        <Tabs.Screen name="profile" options={{ tabBarIcon: ({color,size}) => <FontAwesome5 name="user" size={size} color={color} /> }} />
      </Tabs>
    </ProtectedRoute>
  );
}
