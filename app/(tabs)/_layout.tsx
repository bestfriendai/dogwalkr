// DogWalkr - Tabs Layout
import { Tabs } from 'expo-router';
import { Text, View } from 'react-native';
import { colors, fontSize } from '../../src/ui/theme';

export default function TabsLayout() {
  return (
    <Tabs screenOptions={{ tabBarActiveTintColor: colors.tabActive, tabBarInactiveTintColor: colors.tabInactive, tabBarStyle: { backgroundColor: colors.surface, borderTopColor: colors.border, height: 85, paddingTop: 8 }, headerStyle: { backgroundColor: colors.background, }, headerTitleStyle: { fontSize: fontSize.largeTitle, fontWeight: '700', color: colors.text }, headerShadowVisible: false }}>
      <Tabs.Screen name="index" options={{ title: 'Walks', headerTitle: 'DogWalkr', tabBarIcon: ({ color }) => <Text style={{ fontSize: 22 }}>🚶</Text> }} />
      <Tabs.Screen name="walk" options={{ title: 'Walk', headerTitle: 'Start Walk', tabBarIcon: ({ color }) => <Text style={{ fontSize: 22 }}>🐕</Text> }} />
      <Tabs.Screen name="stats" options={{ title: 'Stats', headerTitle: 'Statistics', tabBarIcon: ({ color }) => <Text style={{ fontSize: 22 }}>📊</Text> }} />
      <Tabs.Screen name="settings" options={{ title: 'Settings', headerTitle: 'Settings', tabBarIcon: ({ color }) => <Text style={{ fontSize: 22 }}>⚙️</Text> }} />
    </Tabs>
  );
}
