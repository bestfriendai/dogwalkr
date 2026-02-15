// DogWalkr - Theme
// Fresh, friendly green theme for pet owners

export const colors = {
  primary: '#30D158',      // Fresh green
  primaryLight: '#5EEA8C',
  primaryDark: '#248A3D',
  background: '#F5F5F7',
  surface: '#FFFFFF',
  surfaceSecondary: '#F0F0F5',
  text: '#1C1C1E',
  textSecondary: '#6B7280',
  textTertiary: '#9CA3AF',
  accent: '#30D158',
  success: '#30D158',
  error: '#FF453A',
  warning: '#FFD60A',
  border: '#E5E7EB',
  divider: '#F3F4F6',
  tabActive: '#30D158',
  tabInactive: '#9CA3AF',
};

export const spacing = { xs: 4, sm: 8, md: 12, lg: 16, xl: 20, xxl: 24, xxxl: 32 };
export const borderRadius = { sm: 6, md: 10, lg: 14, xl: 20, full: 9999 };
export const fontSize = { caption: 13, body: 17, section: 20, title: 28, largeTitle: 34 };
export const fontWeight = { regular: '400' as const, medium: '500' as const, semibold: '600' as const, bold: '700' as const };
