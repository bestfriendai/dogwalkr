// DogWalkr - Walk Card Component
import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { colors, spacing, borderRadius, fontSize, fontWeight } from '../ui/theme';
import { Walk } from '../hooks/useDogWalkr';

interface WalkCardProps { walk: Walk; onPress: () => void; }

export const WalkCard: React.FC<WalkCardProps> = ({ walk, onPress }) => {
  const formatDate = (ts: number) => new Date(ts).toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' });
  const formatDuration = (ms: number) => `${Math.floor(ms / 60000)} min`;
  const formatDistance = (m: number) => m >= 1000 ? `${(m / 1000).toFixed(1)} km` : `${m} m`;

  return (
    <TouchableOpacity style={styles.container} onPress={onPress} activeOpacity={0.7}>
      <View style={styles.header}>
        <Text style={styles.date}>{formatDate(walk.startTime)}</Text>
        <View style={styles.durationBadge}><Text style={styles.duration}>{formatDuration(walk.duration)}</Text></View>
      </View>
      <View style={styles.stats}>
        <View style={styles.stat}><Text style={styles.statIcon}>📍</Text><Text style={styles.statText}>{formatDistance(walk.distance)}</Text></View>
        <View style={styles.stat}><Text style={styles.statIcon}>💦</Text><Text style={styles.statText}>{walk.peeCount}</Text></View>
        <View style={styles.stat}><Text style={styles.statIcon}>💩</Text><Text style={styles.statText}>{walk.poopCount}</Text></View>
      </View>
      {walk.notes && <Text style={styles.notes} numberOfLines={1}>{walk.notes}</Text>}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: { backgroundColor: colors.surface, borderRadius: borderRadius.lg, padding: spacing.lg, marginHorizontal: spacing.lg, marginVertical: spacing.sm, borderWidth: 1, borderColor: colors.border },
  header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: spacing.md },
  date: { fontSize: fontSize.body, fontWeight: fontWeight.semibold, color: colors.text },
  durationBadge: { backgroundColor: colors.primary + '20', paddingHorizontal: spacing.sm, paddingVertical: 2, borderRadius: borderRadius.sm },
  duration: { fontSize: fontSize.caption, fontWeight: fontWeight.medium, color: colors.primary },
  stats: { flexDirection: 'row', gap: spacing.xl },
  stat: { flexDirection: 'row', alignItems: 'center', gap: spacing.xs },
  statIcon: { fontSize: 16 },
  statText: { fontSize: fontSize.body, color: colors.textSecondary },
  notes: { fontSize: fontSize.caption, color: colors.textTertiary, marginTop: spacing.sm, fontStyle: 'italic' },
});
