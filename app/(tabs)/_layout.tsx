import { Tabs } from "expo-router";
import { Ionicons } from "@expo/vector-icons";

export default function Layout() {
  return (
    <Tabs
      screenOptions={{
        tabBarStyle: { backgroundColor: "#1b2a41" },
        tabBarActiveTintColor: "#fff",
        tabBarInactiveTintColor: "#ccc",
        headerStyle: { backgroundColor: "#1b2a41" },
        headerTitleStyle: { color: "#fff" },
        headerTintColor: "#fff",
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          tabBarLabel: "Home",
          headerTitle: "Deck of Cards",
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="home-outline" color={color} size={size} />
          ),
        }}
      />
      <Tabs.Screen
        name="game"
        options={{
          tabBarLabel: "Game",
          headerTitle: "Over or Under",
          tabBarIcon: ({ color, size }) => (
            <Ionicons
              name="game-controller-outline"
              color={color}
              size={size}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="settings"
        options={{
          tabBarLabel: "Settings",
          headerTitle: "App Settings",
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="settings-outline" color={color} size={size} />
          ),
        }}
      />
    </Tabs>
  );
}
