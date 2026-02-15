// DogWalkr - Home Screen
import React, { useEffect } from 'react';
import { View, FlatList, StyleSheet, Text, RefreshControl } from 'react-native';
import { useRouter } from 'expo-router';
import { useDogWalkrStore } from '../../src/hooks/useDogWalkr';
import { WalkCard } from '../../src/components/WalkCard';
import { colors, spacing, fontSize, fontWeight } from '../../src/ui/theme';

export default function HomeScreen() {
  const router = useRouter();
  const { walks, loadData, dogs } = useDogWalkrStore();

  useEffect(() => { loadData(); }, []);

  const totalWalks = walks.length;
  const totalDistance = walks.reduce((sum, w) => sum + w.distance, 0);
  const totalTime = walks.reduce((sum, w) => sum + w.duration, 0);

  return (
    <View style={styles.container}>
      {walks.length === 0 ? (
        <View style={styles.empty}>
          <Text style={styles.emptyIcon}>🐕</Text>
          <Text style={styles.emptyTitle}>No Walks Yet</Text>
          <Text style={styles.emptySubtitle}>Tap the Walk tab to start tracking your first walk!</Text>
        </View>
      ) : (
        <FlatList
          data={walks}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => <WalkCard walk={item} onPress={() => router.push(`/walk/${item.id}`)} />}
          ListHeaderComponent={
            <View style={styles.statsContainer}>
              <View style={styles.statItem}><Text style={styles.statValue}>{totalWalks}</Text><Text style={styles.statLabel}>Total Walks</Text></View>
              <View style={styles.statDivider} />
              <View style={styles.statItem}><Text style={styles.statValue}>{Math.round(totalDistance / 1000)}km</Text><Text style={styles.statLabel}>Distance</Text></View>
              <View style={styles.statDivider} />
              <View style={styles.statItem}><Text style={styles.statValue}>{Math.round(totalTime / 60000)}m</Text><Text style={styles.statLabel}>Time</Text></View>
            </View>
          }
          contentContainerStyle={styles.list}
          refreshControl={<RefreshControl refreshing={false} onRefresh={loadData} tintColor={colors.primary} />}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.background },
  empty: { flex: 1, justifyContent: 'center', alignItems: 'center', padding: spacing.xxl },
  emptyIcon: { fontSize: 64, marginBottom: spacing.lg },
  emptyTitle: { fontSize: fontSize.title, fontWeight: fontWeight.bold, color: colors.text, marginBottom: spacing.sm },
  emptySubtitle: { fontSize: fontSize.body, color: colors.textSecondary, textAlign: 'center' },
  statsContainer: { flexDirection: 'row', backgroundColor: colors.surface, margin: spacing.lg, padding: spacing.lg, borderRadius: 14, borderWidth: 1, borderColor: colors.border },
  statItem: { flex: 1, alignItems: 'center' },
  statDivider: { width: 1, backgroundColor: colors.border },
  statValue: { fontSize: fontSize.title, fontWeight: fontWeight.bold, color: colors.primary },
  statLabel: { fontSize: fontSize.caption, color: colors.textSecondary, marginTop: spacing.xs },
  list: { paddingBottom: spacing.xxxl },
});
