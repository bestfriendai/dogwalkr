// DogWalkr - Paywall Screen
import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Alert } from 'react-native';
import { useRouter } from 'expo-router';
import * as Haptics from 'expo-haptics';
import { useDogWalkrStore } from '../../src/hooks/useDogWalkr';
import { OFFERINGS, purchaseSubscription, restorePurchases } from '../../src/services/purchases';
import { colors, spacing, borderRadius, fontSize, fontWeight } from '../../src/ui/theme';

export default function PaywallScreen() {
  const router = useRouter();
  const { isPremium, setIsPremium } = useDogWalkrStore();
  const [selectedPlan, setSelectedPlan] = useState<'monthly' | 'annual'>('annual');
  const [loading, setLoading] = useState(false);

  const handlePurchase = async () => {
    setLoading(true);
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    await purchaseSubscription();
    setIsPremium(true);
    Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
    Alert.alert('Welcome!', 'Premium activated!', [{ text: 'OK', onPress: () => router.back() }]);
    setLoading(false);
  };

  const handleRestore = async () => {
    setLoading(true);
    await restorePurchases();
    setLoading(false);
  };

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <View style={styles.header}>
        <TouchableOpacity style={styles.closeButton} onPress={() => router.back()}><Text style={styles.closeText}>✕</Text></TouchableOpacity>
        <Text style={styles.badge}>✨ PREMIUM</Text>
        <Text style={styles.title}>Go Premium</Text>
        <Text style={styles.subtitle}>Unlock unlimited walks, photos & stats</Text>
      </View>
      <View style={styles.features}>
        <View style={styles.feature}><Text style={styles.featureIcon}>📸</Text><Text style={styles.featureTitle}>Unlimited Photos</Text><Text style={styles.featureText}>Capture every moment</Text></View>
        <View style={styles.feature}><Text style={styles.featureIcon}>📈</Text><Text style={styles.featureTitle}>Advanced Stats</Text><Text style={styles.featureText}>Detailed analytics</Text></View>
        <View style={styles.feature}><Text style={styles.featureIcon}>🏆</Text><Text style={styles.featureTitle}>Goals & Streaks</Text><Text style={styles.featureText}>Stay motivated</Text></View>
      </View>
      <View style={styles.plans}>
        {OFFERINGS.map((o) => (
          <TouchableOpacity key={o.id} style={[styles.planCard, selectedPlan === o.id && styles.planCardSelected, o.isBestValue && styles.planCardBest]} onPress={() => setSelectedPlan(o.id as any)}>
            {o.isBestValue && <View style={styles.bestBadge}><Text style={styles.bestText}>BEST</Text></View>}
            <Text style={styles.planName}>{o.id === 'monthly' ? 'Monthly' : 'Annual'}</Text>
            <Text style={styles.planPrice}>{o.price}</Text>
            <Text style={styles.planPerMonth}>{o.pricePerMonth}/mo</Text>
          </TouchableOpacity>
        ))}
      </View>
      <TouchableOpacity style={styles.purchaseButton} onPress={handlePurchase} disabled={loading}><Text style={styles.purchaseText}>{loading ? 'Processing...' : `Subscribe for ${selectedPlan === 'monthly' ? OFFERINGS[0].price : OFFERINGS[1].price}`}</Text></TouchableOpacity>
      <TouchableOpacity style={styles.restoreButton} onPress={handleRestore}><Text style={styles.restoreText}>Restore Purchases</Text></TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.background },
  content: { padding: spacing.lg, paddingBottom: spacing.xxxl },
  header: { alignItems: 'center', marginBottom: spacing.xl },
  closeButton: { position: 'absolute', top: 0, right: 0, width: 32, height: 32, borderRadius: 16, backgroundColor: colors.surfaceSecondary, justifyContent: 'center', alignItems: 'center' },
  closeText: { fontSize: 16, color: colors.textSecondary },
  badge: { fontSize: fontSize.caption, fontWeight: fontWeight.bold, color: colors.primary, marginBottom: spacing.md },
  title: { fontSize: fontSize.largeTitle, fontWeight: fontWeight.bold, color: colors.text, textAlign: 'center' },
  subtitle: { fontSize: fontSize.body, color: colors.textSecondary, textAlign: 'center', marginTop: spacing.sm },
  features: { marginBottom: spacing.xl },
  feature: { alignItems: 'center', marginBottom: spacing.md },
  featureIcon: { fontSize: 28, marginBottom: spacing.xs },
  featureTitle: { fontSize: fontSize.body, fontWeight: fontWeight.semibold, color: colors.text },
  featureText: { fontSize: fontSize.caption, color: colors.textSecondary },
  plans: { gap: spacing.md, marginBottom: spacing.xl },
  planCard: { backgroundColor: colors.surface, borderRadius: borderRadius.lg, borderWidth: 2, borderColor: colors.border, padding: spacing.lg, position: 'relative' },
  planCardSelected: { borderColor: colors.primary, backgroundColor: colors.surfaceSecondary },
  planCardBest: { borderColor: colors.primary },
  bestBadge: { position: 'absolute', top: -10, right: spacing.md, backgroundColor: colors.primary, paddingHorizontal: spacing.sm, paddingVertical: 2, borderRadius: borderRadius.sm },
  bestText: { fontSize: 10, fontWeight: fontWeight.bold, color: colors.surface },
  planName: { fontSize: fontSize.body, fontWeight: fontWeight.semibold, color: colors.text },
  planPrice: { fontSize: fontSize.title, fontWeight: fontWeight.bold, color: colors.text, marginTop: spacing.xs },
  planPerMonth: { fontSize: fontSize.caption, color: colors.textTertiary },
  purchaseButton: { backgroundColor: colors.primary, paddingVertical: spacing.lg, borderRadius: borderRadius.lg, alignItems: 'center' },
  purchaseText: { fontSize: fontSize.body, fontWeight: fontWeight.bold, color: colors.surface },
  restoreButton: { alignItems: 'center', marginTop: spacing.md },
  restoreText: { fontSize: fontSize.body, color: colors.primary, fontWeight: fontWeight.medium },
});
