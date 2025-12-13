# TV Demo - React Native Android TV App

A React Native TypeScript application built with React Native CLI (bare workflow) specifically configured for Android TV. This project demonstrates a basic TV app with navigation, components, and comprehensive testing.

![TV Demo](docs/demo.gif)

## 🚀 Features

- **TypeScript** - Full type safety
- **Android TV Support** - Configured for TV devices and emulators
- **Navigation** - React Navigation setup with stack navigator
- **Unit Testing** - Jest and React Native Testing Library

## 📋 Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js** (>= 20.x)
- **npm** or **yarn**
- **JDK** (Java Development Kit 11 or newer)
- **Android Studio** with:
  - Android SDK
  - Android TV Emulator or Physical Android TV Device
  - SDK Platform 34
  - Android SDK Build-Tools
- **React Native CLI**: `npm install -g react-native-cli`

## 🛠️ Setup

### 1. Clone and Install Dependencies

```bash
# Navigate to project directory
cd demo

# Install Node dependencies
npm install
# or
yarn install
```

### 2. Set up Android Environment

Make sure you have the following environment variables set:

```bash
export ANDROID_HOME=$HOME/Library/Android/sdk
export PATH=$PATH:$ANDROID_HOME/emulator
export PATH=$PATH:$ANDROID_HOME/tools
export PATH=$PATH:$ANDROID_HOME/tools/bin
export PATH=$PATH:$ANDROID_HOME/platform-tools
```

Add these to your `~/.zshrc` or `~/.bash_profile` and restart your terminal.

### 3. Create Android TV Emulator

1. Open Android Studio
2. Go to **Tools → Device Manager** (or AVD Manager)
3. Click **Create Device**
4. Select **TV** category
5. Choose a TV device (e.g., "Android TV (1080p)")
6. Select a system image (API 34 recommended)
7. Click **Finish**

### 4. Verify Setup

```bash
# Check Android environment
npx react-native doctor

# List available Android devices/emulators
adb devices
```

### Run on Android TV Emulator

In another terminal window:

```bash
# Start the emulator (if not already running) or open emulator manually
emulator -avd <your_tv_emulator_name>

# Run the app
npm run android
# or
yarn android
```

## 🧪 Running Tests

### Run All Tests

```bash
npm test
# or
yarn test
```

### Run Tests in Watch Mode

```bash
npm run test:watch
# or
yarn run test:watch
```

### Run Tests with Coverage

```bash
npm run test:coverage
# or
yarn run test:coverage
```

Coverage reports will be generated in the `coverage/` directory.

## 📚 Libraries Used

### Core Dependencies

- **react** (19.2.0) - Core React library
- **react-native** (0.83.0) - React Native framework

### Main functionality

- **react-native-video** - To play video
- **@tanstack/react-queryo** - For api calls and data cashing

### Navigation

- **@react-navigation/native** (^7.1.25) - Navigation framework to move between screens
- **@react-navigation/native-stack** (^7.8.6) - Stack navigator for navigation
- **react-native-safe-area-context** (^5.6.2) - Safe area handling for notches and screen edges

### Development Tools

- **typescript** (5.8.3) - Type safety and better IDE support
- **eslint** - Code linting
- **prettier** - Code formatting

## TODO

- Hide Back/show back button in Play screen
- Add react native reanimated for nice screen transition and focus effects
- User real endpoint for data retrieval instead of assets
- Setup Mock service worker for test to mock api call
