import Feather from '@expo/vector-icons/Feather';
import FontAwesome5 from '@expo/vector-icons/FontAwesome5';
import Foundation from '@expo/vector-icons/Foundation';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import { Tabs } from "expo-router";

export default function TabsLayout() {
  return (
    <Tabs screenOptions={{headerShown: false, tabBarActiveTintColor: "#FF7F50"}}>
      <Tabs.Screen name="index" options={{title: "", tabBarIcon: ({ color }) => <Foundation name="home" size={24} color={ color } />}} />
      <Tabs.Screen name="map" options={{title: "", tabBarIcon: ({ color }) => <Feather name="map" size={24} color={ color } />}} />
      <Tabs.Screen name="create" options={{title: "", tabBarIcon: ({ color }) => <FontAwesome5 name="paw" size={24} color="#EF7A8B" />}} />
      <Tabs.Screen name="inbox" options={{title: "", tabBarIcon: ({ color }) => <MaterialCommunityIcons name="inbox" size={24} color={ color } />}} />
      <Tabs.Screen name="login" options={{title: "", tabBarIcon: ({ color }) => <FontAwesome5 name="user" size={24} color={ color } />}} />
    </Tabs>
  );
}
