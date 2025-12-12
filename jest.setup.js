// Jest setup - Mock native modules

// Mock react-native-safe-area-context
jest.mock('react-native-safe-area-context', () => {
    const React = require('react');
    const { View } = require('react-native');
    
    const insets = { top: 0, right: 0, bottom: 0, left: 0 };
    
    // Create context first
    const context = React.createContext(null);
    context.displayName = 'SafeAreaContext';
    
    return {
        __esModule: true,
        SafeAreaContext: context,
        SafeAreaProvider: ({ children }) =>
            React.createElement(
                context.Provider,
                { value: insets },
                React.createElement(View, {}, children)
            ),
        SafeAreaView: ({ children }) => React.createElement(View, {}, children),
        useSafeAreaInsets: () => insets,
        useSafeAreaFrame: () => ({ x: 0, y: 0, width: 390, height: 844 }),
    };
});
