import Feather from '@expo/vector-icons/Feather';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import FontAwesome5 from '@expo/vector-icons/FontAwesome5';
import Foundation from '@expo/vector-icons/Foundation';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import { Tabs } from "expo-router";

export default function TabsLayout() {
  return (
    <Tabs screenOptions={{headerShown: false, tabBarActiveTintColor: "#FF7F50"}}>
      <Tabs.Screen name="index" options={{title: "Home", tabBarIcon: ({ color }) => <Foundation name="home" size={24} color={ color } />}} />
      <Tabs.Screen name="map" options={{title: "Maps", tabBarIcon: ({ color }) => <Feather name="map" size={24} color={ color } />}} />
      <Tabs.Screen name="camera" options={{title: "Camera", tabBarIcon: ({ color }) => <FontAwesome name="plus-square-o" size={24} color="#EF7A8B" />}} />
      <Tabs.Screen name="inbox" options={{title: "Inbox", tabBarIcon: ({ color }) => <MaterialCommunityIcons name="inbox" size={24} color={ color } />}} />
      <Tabs.Screen name="login" options={{title: "Login", tabBarIcon: ({ color }) => <FontAwesome5 name="user" size={24} color={ color } />}} />
    </Tabs>
  );
}
