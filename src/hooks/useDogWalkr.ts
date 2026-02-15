// DogWalkr - Store
import { create } from 'zustand';
import AsyncStorage from '@react-native-async-storage/async-storage';

export interface Walk {
  id: string;
  startTime: number;
  endTime: number | null;
  duration: number;
  distance: number;
  route: { lat: number; lng: number }[];
  notes: string;
  poopCount: number;
  peeCount: number;
}

export interface Dog {
  id: string;
  name: string;
  breed: string;
  birthDate: string;
  weight: number;
}

interface DogWalkrState {
  walks: Walk[];
  dogs: Dog[];
  isPremium: boolean;
  addWalk: (walk: Walk) => void;
  updateWalk: (id: string, updates: Partial<Walk>) => void;
  deleteWalk: (id: string) => void;
  addDog: (dog: Dog) => void;
  setIsPremium: (isPremium: boolean) => void;
  loadData: () => Promise<void>;
  saveData: () => Promise<void>;
}

const STORAGE_KEY = 'dogwalkr_data';

export const useDogWalkrStore = create<DogWalkrState>((set, get) => ({
  walks: [],
  dogs: [{ id: '1', name: 'My Dog', breed: 'Mixed', birthDate: '2020-01-01', weight: 20 }],
  isPremium: false,

  addWalk: (walk) => {
    set((state) => ({ walks: [walk, ...state.walks] }));
    get().saveData();
  },
  updateWalk: (id, updates) => {
    set((state) => ({ walks: state.walks.map(w => w.id === id ? { ...w, ...updates } : w) }));
    get().saveData();
  },
  deleteWalk: (id) => {
    set((state) => ({ walks: state.walks.filter(w => w.id !== id) }));
    get().saveData();
  },
  addDog: (dog) => {
    set((state) => ({ dogs: [...state.dogs, dog] }));
    get().saveData();
  },
  setIsPremium: (isPremium) => {
    set({ isPremium });
    get().saveData();
  },
  loadData: async () => {
    try {
      const data = await AsyncStorage.getItem(STORAGE_KEY);
      if (data) {
        const parsed = JSON.parse(data);
        set({ walks: parsed.walks || [], dogs: parsed.dogs || [], isPremium: parsed.isPremium || false });
      }
    } catch (e) { console.error('Load error:', e); }
  },
  saveData: async () => {
    try {
      const { walks, dogs, isPremium } = get();
      await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify({ walks, dogs, isPremium }));
    } catch (e) { console.error('Save error:', e); }
  },
}));
