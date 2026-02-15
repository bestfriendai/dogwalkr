// DogWalkr - Settings Screen
import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView, Alert, Linking } from 'react-native';
import { useRouter } from 'expo-router';
import * as Haptics from 'expo-haptics';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useDogWalkrStore } from '../../src/hooks/useDogWalkr';
import { colors, spacing, borderRadius, fontSize, fontWeight } from '../../src/ui/theme';

export default function SettingsScreen() {
  const router = useRouter();
  const { isPremium, setIsPremium, walks, dogs } = useDogWalkrStore();

  const handlePremium = () => { Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light); isPremium ? setIsPremium(false) : router.push('/paywall'); };
  const handleClear = () => Alert.alert('Clear Data', 'Delete all walks?', [{ text: 'Cancel', style: 'cancel' }, { text: 'Delete', style: 'destructive', onPress: async () => { await AsyncStorage.clear(); Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success); } }]);
  const handleRate = () => Linking.openURL('https://apps.apple.com');

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Subscription</Text>
        <View style={styles.card}>
          <View style={styles.row}>
            <Text style={styles.rowTitle}>{isPremium ? '✨ Premium Active' : '⭐ Upgrade'}</Text>
            <TouchableOpacity style={styles.button} onPress={handlePremium}><Text style={styles.buttonText}>{isPremium ? 'Manage' : 'Upgrade'}</Text></TouchableOpacity>
          </View>
        </View>
      </View>
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Your Dog</Text>
        <View style={styles.card}>
          <View style={styles.row}><Text style={styles.rowTitle}>{dogs[0]?.name || 'Add Dog'}</Text><Text style={styles.rowValue}>{dogs[0]?.breed || ''}</Text></View>
        </View>
      </View>
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Data</Text>
        <View style={styles.card}>
          <View style={styles.row}><Text style={styles.rowTitle}>Total Walks</Text><Text style={styles.rowValue}>{walks.length}</Text></View>
          <View style={styles.divider} />
          <TouchableOpacity style={styles.row} onPress={handleClear}><Text style={[styles.rowTitle, styles.destructiveText]}>Clear All Data</Text></TouchableOpacity>
        </View>
      </View>
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>About</Text>
        <View style={styles.card}>
          <TouchableOpacity style={styles.row} onPress={handleRate}><Text style={styles.rowTitle}>Rate DogWalkr</Text><Text style={styles.rowArrow}>›</Text></TouchableOpacity>
        </View>
      </View>
      <View style={styles.footer}><Text style={styles.version}>DogWalkr v1.0.0</Text></View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.background },
  content: { paddingBottom: spacing.xxxl },
  section: { marginTop: spacing.xl },
  sectionTitle: { fontSize: fontSize.caption, fontWeight: fontWeight.medium, color: colors.textTertiary, textTransform: 'uppercase', marginHorizontal: spacing.lg, marginBottom: spacing.sm },
  card: { backgroundColor: colors.surface, marginHorizontal: spacing.lg, borderRadius: borderRadius.lg, borderWidth: 1, borderColor: colors.border, overflow: 'hidden' },
  row: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingVertical: spacing.md, paddingHorizontal: spacing.lg },
  rowTitle: { fontSize: fontSize.body, color: colors.text },
  rowValue: { fontSize: fontSize.body, color: colors.textSecondary },
  rowArrow: { fontSize: 22, color: colors.textTertiary },
  divider: { height: 1, backgroundColor: colors.divider, marginLeft: spacing.lg },
  button: { backgroundColor: colors.primary, paddingHorizontal: spacing.lg, paddingVertical: spacing.sm, borderRadius: borderRadius.md },
  buttonText: { fontSize: fontSize.body, fontWeight: fontWeight.semibold, color: colors.surface },
  destructiveText: { color: colors.error },
  footer: { alignItems: 'center', marginTop: spacing.xxxl },
  version: { fontSize: fontSize.caption, color: colors.textTertiary },
});
