import FontAwesome5 from "@expo/vector-icons/FontAwesome5";
import Foundation from "@expo/vector-icons/Foundation";
import { Tabs } from "expo-router";

export default function TabsLayout() {
  return (
    <Tabs screenOptions={{ headerShown: false, tabBarActiveTintColor: "#FF7A59" }}>
      <Tabs.Screen name="index"  options={{ title: "", tabBarIcon: ({color,size}) => <Foundation name="home" size={size} color={color} /> }} />
      <Tabs.Screen name="reportPet" options={{ title: "", tabBarIcon: ({color,size}) => <FontAwesome5 name="paw" size={size} color={color} /> }} />
      <Tabs.Screen name="adopt" options={{ title: "", tabBarIcon: ({color,size}) => <FontAwesome5 name="dog" size={size} color={color} /> }} />
      <Tabs.Screen name="profile" options={{ title: "", tabBarIcon: ({color,size}) => <FontAwesome5 name="user" size={size} color={color} /> }} />
    </Tabs>
  );
}
