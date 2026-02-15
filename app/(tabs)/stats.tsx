// DogWalkr - Stats Screen
import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { useDogWalkrStore } from '../../src/hooks/useDogWalkr';
import { colors, spacing, borderRadius, fontSize, fontWeight } from '../../src/ui/theme';

export default function StatsScreen() {
  const { walks, dogs } = useDogWalkrStore();
  const totalWalks = walks.length;
  const totalDistance = walks.reduce((sum, w) => sum + w.distance, 0);
  const totalTime = walks.reduce((sum, w) => sum + w.duration, 0);
  const avgDuration = totalWalks ? totalTime / totalWalks : 0;
  const avgDistance = totalWalks ? totalDistance / totalWalks : 0;

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <View style={styles.card}>
        <Text style={styles.cardTitle}>Total Stats</Text>
        <View style={styles.row}><Text style={styles.label}>Total Walks</Text><Text style={styles.value}>{totalWalks}</Text></View>
        <View style={styles.row}><Text style={styles.label}>Total Distance</Text><Text style={styles.value}>{(totalDistance/1000).toFixed(1)} km</Text></View>
        <View style={styles.row}><Text style={styles.label}>Total Time</Text><Text style={styles.value}>{Math.round(totalTime/60000)} min</Text></View>
      </View>
      <View style={styles.card}>
        <Text style={styles.cardTitle}>Averages</Text>
        <View style={styles.row}><Text style={styles.label}>Avg Duration</Text><Text style={styles.value}>{Math.round(avgDuration/60000)} min</Text></View>
        <View style={styles.row}><Text style={styles.label}>Avg Distance</Text><Text style={styles.value}>{Math.round(avgDistance)} m</Text></View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.background },
  content: { padding: spacing.lg },
  card: { backgroundColor: colors.surface, borderRadius: borderRadius.lg, padding: spacing.lg, marginBottom: spacing.lg, borderWidth: 1, borderColor: colors.border },
  cardTitle: { fontSize: fontSize.section, fontWeight: fontWeight.bold, color: colors.text, marginBottom: spacing.md },
  row: { flexDirection: 'row', justifyContent: 'space-between', paddingVertical: spacing.sm },
  label: { fontSize: fontSize.body, color: colors.textSecondary },
  value: { fontSize: fontSize.body, fontWeight: fontWeight.semibold, color: colors.text },
});
