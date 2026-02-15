// DogWalkr - Walk Screen
import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, TextInput, Alert } from 'react-native';
import { useRouter } from 'expo-router';
import * as Haptics from 'expo-haptics';
import { useDogWalkrStore, Walk } from '../../src/hooks/useDogWalkr';
import { colors, spacing, borderRadius, fontSize, fontWeight } from '../../src/ui/theme';

export default function WalkScreen() {
  const router = useRouter();
  const { addWalk, dogs } = useDogWalkrStore();
  const [isWalking, setIsWalking] = useState(false);
  const [startTime, setStartTime] = useState<number | null>(null);
  const [elapsed, setElapsed] = useState(0);
  const [poopCount, setPoopCount] = useState(0);
  const [peeCount, setPeeCount] = useState(0);
  const [notes, setNotes] = useState('');
  const [timer, setTimer] = useState<NodeJS.Timeout | null>(null);

  const formatTime = (ms: number) => { const s = Math.floor(ms / 1000); const m = Math.floor(s / 60); return `${m}:${(s % 60).toString().padStart(2, '0')}`; };

  const startWalk = () => {
    setIsWalking(true);
    setStartTime(Date.now());
    Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
    setTimer(setInterval(() => setElapsed(Date.now() - (startTime || Date.now())), 1000));
  };

  const stopWalk = () => {
    if (timer) clearInterval(timer);
    setIsWalking(false);
    Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);

    const walk: Walk = {
      id: Date.now().toString(),
      startTime: startTime || Date.now(),
      endTime: Date.now(),
      duration: elapsed,
      distance: Math.floor(Math.random() * 2000) + 500, // Mock distance
      route: [],
      notes,
      poopCount,
      peeCount,
    };
    addWalk(walk);
    router.push('/');
  };

  const increment = (setter: React.Dispatch<React.SetStateAction<number>>, current: number) => { setter(current + 1); Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light); };

  return (
    <View style={styles.container}>
      <View style={styles.dogInfo}>
        <Text style={styles.dogIcon}>🐕</Text>
        <Text style={styles.dogName}>{dogs[0]?.name || 'My Dog'}</Text>
      </View>

      <View style={styles.timerContainer}>
        <Text style={styles.timer}>{formatTime(elapsed)}</Text>
        <Text style={styles.timerLabel}>{isWalking ? 'Walking...' : 'Ready to walk'}</Text>
      </View>

      {!isWalking ? (
        <TouchableOpacity style={styles.startButton} onPress={startWalk}>
          <Text style={styles.startButtonText}>Start Walk</Text>
        </TouchableOpacity>
      ) : (
        <>
          <View style={styles.counterRow}>
            <TouchableOpacity style={styles.counterButton} onPress={() => increment(setPoopCount, poopCount)}>
              <Text style={styles.counterIcon}>💩</Text>
              <Text style={styles.counterValue}>{poopCount}</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.counterButton} onPress={() => increment(setPeeCount, peeCount)}>
              <Text style={styles.counterIcon}>💦</Text>
              <Text style={styles.counterValue}>{peeCount}</Text>
            </TouchableOpacity>
          </View>

          <TextInput style={styles.notesInput} placeholder="Add notes..." placeholderTextColor={colors.textTertiary} value={notes} onChangeText={setNotes} multiline />

          <TouchableOpacity style={styles.stopButton} onPress={stopWalk}>
            <Text style={styles.stopButtonText}>End Walk</Text>
          </TouchableOpacity>
        </>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.background, padding: spacing.lg },
  dogInfo: { alignItems: 'center', marginTop: spacing.xxl },
  dogIcon: { fontSize: 64 },
  dogName: { fontSize: fontSize.section, fontWeight: fontWeight.semibold, color: colors.text, marginTop: spacing.sm },
  timerContainer: { alignItems: 'center', marginTop: spacing.xxxl },
  timer: { fontSize: 64, fontWeight: fontWeight.bold, color: colors.primary, fontVariant: ['tabular-nums'] },
  timerLabel: { fontSize: fontSize.body, color: colors.textSecondary, marginTop: spacing.sm },
  startButton: { backgroundColor: colors.primary, paddingVertical: spacing.lg, borderRadius: borderRadius.lg, alignItems: 'center', marginTop: spacing.xxxl },
  startButtonText: { fontSize: fontSize.body, fontWeight: fontWeight.bold, color: colors.surface },
  counterRow: { flexDirection: 'row', justifyContent: 'center', gap: spacing.xxl, marginTop: spacing.xl },
  counterButton: { alignItems: 'center', backgroundColor: colors.surface, padding: spacing.lg, borderRadius: borderRadius.lg, borderWidth: 1, borderColor: colors.border },
  counterIcon: { fontSize: 32 },
  counterValue: { fontSize: fontSize.title, fontWeight: fontWeight.bold, color: colors.text, marginTop: spacing.xs },
  notesInput: { backgroundColor: colors.surface, borderRadius: borderRadius.lg, padding: spacing.lg, fontSize: fontSize.body, color: colors.text, borderWidth: 1, borderColor: colors.border, marginTop: spacing.xl, minHeight: 80, textAlignVertical: 'top' },
  stopButton: { backgroundColor: colors.error, paddingVertical: spacing.lg, borderRadius: borderRadius.lg, alignItems: 'center', marginTop: spacing.xl },
  stopButtonText: { fontSize: fontSize.body, fontWeight: fontWeight.bold, color: colors.surface },
});
