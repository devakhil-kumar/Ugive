# UGive Project Structure

## Overview
This document describes the organized folder structure and navigation setup for the UGive app.

## Folder Structure

```
UGive/
├── App.jsx                          # Main app entry point with navigation
├── src/
│   ├── assets/                      # All image assets
│   │   ├── backIcon.png
│   │   ├── home.png
│   │   ├── person.png
│   │   ├── profile.png
│   │   ├── purple_profile.png
│   │   ├── search.png
│   │   ├── share.png
│   │   ├── sendMesg.png
│   │   ├── group.png
│   │   ├── chat.png
│   │   ├── flower.png
│   │   ├── flowerone.png
│   │   ├── star.png
│   │   ├── cup.png
│   │   ├── pizza.png
│   │   ├── pizzaone.png
│   │   ├── coffeCupOne.png
│   │   ├── ugive_logo.png
│   │   ├── stacks_icon.png
│   │   ├── arrow_down.png
│   │   └── calender.png
│   │
│   ├── screens/
│   │   ├── auth/                    # Authentication screens
│   │   │   ├── Login.js
│   │   │   └── SignUpScreen.js
│   │   │
│   │   ├── main/                    # Main app screens
│   │   │   ├── Home/
│   │   │   │   └── Home.js          # Home screen with rewards
│   │   │   │
│   │   │   ├── Profile/
│   │   │   │   ├── Profile.js       # Profile overview
│   │   │   │   ├── EditProfile.js   # Edit profile form
│   │   │   │   └── ProfileDetails.js # View profile details
│   │   │   │
│   │   │   ├── Friends/
│   │   │   │   ├── FriendsList.js   # List of friends
│   │   │   │   ├── FriendsSearch.js # Search for friends
│   │   │   │   └── FriendsRequest.js # Friend requests
│   │   │   │
│   │   │   ├── GiftCard/
│   │   │   │   └── GiftCard.js      # Send gift card form
│   │   │   │
│   │   │   └── Cards/
│   │   │       ├── SendingCard.js   # Card sending confirmation
│   │   │       ├── ReadCard.js      # Read received cards
│   │   │       └── RewardStatus.js  # Reward progress status
│   │   │
│   │   └── common/                  # Shared components
│   │       ├── GradientScreen.js    # Gradient background wrapper
│   │       └── CustomModal.js       # Reusable modal component
│   │
│   ├── navigation/                  # Navigation configuration
│   │   ├── index.js                 # Navigation exports
│   │   ├── RootNavigator.js         # Root navigator (Auth/Main switch)
│   │   ├── AuthNavigator.js         # Authentication stack
│   │   ├── MainNavigator.js         # Bottom tab navigator
│   │   ├── HomeNavigator.js         # Home stack
│   │   ├── ProfileNavigator.js      # Profile stack
│   │   ├── FriendsNavigator.js      # Friends stack
│   │   └── GiftCardNavigator.js     # Gift card & rewards stack
│   │
│   └── utils/
│       └── responsive.js            # Responsive utilities
```

## Navigation Structure

### Root Level
- **RootNavigator**: Switches between Auth and Main navigation based on authentication state

### Authentication Flow
- **AuthNavigator** (Stack)
  - Login
  - SignUp

### Main App Flow
- **MainNavigator** (Bottom Tabs)
  - **HomeTab** → HomeNavigator
    - Home (Rewards screen)

  - **GiftTab** → GiftCardNavigator
    - GiftCard (Send card form)
    - SendingCard (Confirmation)
    - ReadCard (View received cards)
    - RewardStatus (Progress tracker)

  - **FriendsTab** → FriendsNavigator
    - FriendsList (View friends)
    - FriendsSearch (Search users)
    - FriendsRequest (Manage requests)

  - **ProfileTab** → ProfileNavigator
    - Profile (Profile overview)
    - EditProfile (Edit profile form)
    - ProfileDetails (View details)

## Navigation Usage

### Navigate between screens:
```javascript
// Navigate to a screen
navigation.navigate('ScreenName');

// Navigate with params
navigation.navigate('ScreenName', { param1: 'value' });

// Go back
navigation.goBack();

// Navigate to tab
navigation.navigate('HomeTab');
```

### Access navigation in screens:
```javascript
import { useNavigation } from '@react-navigation/native';

const MyScreen = () => {
  const navigation = useNavigation();

  const handlePress = () => {
    navigation.navigate('TargetScreen');
  };

  return (
    // Your component
  );
};
```

## Screen Features

### Common Components
- **GradientScreen**: Wrapper providing gradient backgrounds with SafeAreaView
- **CustomModal**: Reusable modal for alerts and confirmations

### Image Assets
All images are now centralized in `src/assets/` and imported using:
```javascript
require('../../../assets/imageName.png')
```

## Dependencies Required

```json
{
  "@react-navigation/native": "^7.0.13",
  "@react-navigation/native-stack": "^7.1.10",
  "@react-navigation/bottom-tabs": "^7.2.1",
  "react-native-screens": "^4.6.0",
  "react-native-safe-area-context": "^5.6.1",
  "react-native-linear-gradient": "^2.9.0",
  "react-native-vector-icons": "^10.3.0",
  "react-native-gifted-charts": "^1.4.56",
  "react-native-keyboard-aware-scroll-view": "^0.9.5"
}
```

## Setup Instructions

1. Install dependencies:
```bash
npm install
```

2. For iOS, install pods:
```bash
cd ios && pod install && cd ..
```

3. Run the app:
```bash
# iOS
npm run ios

# Android
npm run android
```

## Authentication Flow

The app starts with `isAuthenticated` set to `false` in `RootNavigator.js`.
To switch to the main app:
- Update the authentication state in RootNavigator
- In production, this should check AsyncStorage or your auth state management

## Notes

- All navigation files use functional components with hooks
- Navigation is configured with headerShown: false for custom headers
- Bottom tabs use custom icons from assets
- Each major feature has its own stack navigator for nested navigation
