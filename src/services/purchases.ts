// DogWalkr - RevenueCat
export interface Offering {
  id: string;
  description: string;
  price: string;
  pricePerMonth: string;
  productId: string;
  isBestValue?: boolean;
}

export const OFFERINGS: Offering[] = [
  { id: 'monthly', description: 'Unlimited walks & photos', price: '$4.99/month', pricePerMonth: '$4.99', productId: 'dogwalkr_monthly' },
  { id: 'annual', description: 'Unlimited walks & photos', price: '$39.99/year', pricePerMonth: '$3.33', productId: 'dogwalkr_annual', isBestValue: true },
];
export const purchaseSubscription = async () => { const As = require('@react-native-async-storage/async-storage').default; await As.setItem('dogwalkr_premium', 'true'); return true; };
export const restorePurchases = async () => true;
