# DogWalkr

Track your dog walks with GPS routes, poop log, and photo journal.

## Features

- 🚶 Track walks with duration & distance
- 💩 Poop & pee logging
- 📊 Statistics & history
- 🐕 Multi-dog support

## Getting Started

```bash
cd builds/dogwalkr
npm install
npx expo start
```

## Tech Stack

- Expo SDK 54
- React Native 0.79
- Zustand
- RevenueCat

## API Configuration

### Environment Variables

Create a `.env` file in the project root:

```bash
# Dog Walking API (for route tracking)
DOGWALK_API_KEY=your_dogwalk_api_key
DOGWALK_API_URL=https://api.dogwalkr.com/v1

# GPS/Location Services
MAPS_API_KEY=your_maps_api_key
```

### RevenueCat Configuration

1. Create an account at [RevenueCat.com](https://revenuecat.com)
2. Create products in App Store Connect / Google Play Console:
   - Monthly: $2.99/month - `dogwalkr_monthly`
   - Annual: $14.99/year - `dogwalkr_annual`
3. Configure products in RevenueCat dashboard
4. Add your API key to the purchases service

## License

MIT

## API Configuration

### Required API Keys
Create a `.env` file in the project root:
```bash
EXPO_PUBLIC_REVENUECAT_API_KEY=your_revenuecat_api_key
EXPO_PUBLIC_MAPS_API_KEY=your_maps_api_key
```

### Getting API Keys
1. RevenueCat: https://www.revenuecat.com
2. Maps API: Google Maps or Apple Maps

### Type Checking
npx tsc --noEmit

### Building for Production
eas build --platform ios
eas build --platform android
