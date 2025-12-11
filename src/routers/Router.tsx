import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from '../screens/HomeScreen';
import DetailsScreen from '../screens/DetailsScreen';
import { RootStackParamList, Routes } from './routeTypes';
import { colors } from '../theme';


const Stack = createNativeStackNavigator<RootStackParamList>();

const Router = () => {
    return (
        <NavigationContainer>
            <Stack.Navigator
                initialRouteName={Routes.Home}
                screenOptions={{
                    headerStyle: {
                        backgroundColor: colors.background.header,
                    },
                    headerTintColor: '#fff',
                    headerTitleStyle: {
                        fontWeight: 'bold',
                    },
                }}>
                <Stack.Screen
                    name={Routes.Home}
                    component={HomeScreen}
                    options={{ headerShown: false }}
                />
                <Stack.Screen
                    name={Routes.Details}
                    component={DetailsScreen}
                    options={{ title: 'Details' }}
                />
            </Stack.Navigator>
        </NavigationContainer>
    );
};

export default Router;
