import {createStackNavigator} from '@react-navigation/stack';
import {ROUTES} from './routes';
import {LoginScreen} from '../screens/Login';
import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {AppNavigatorTheme} from '../styles';
import {CreateAccountScreen} from '../screens/CreateAccount';
import {HomeScreen} from '../screens/Home';
import {DateScreen} from '../screens/Date';
import {TimeScreen} from '../screens/Time';

const Stack = createStackNavigator();

export const AppNavigator = () => {
  return (
    <NavigationContainer theme={AppNavigatorTheme}>
      <Stack.Navigator>
        <Stack.Screen
          name={ROUTES.LOGIN}
          component={LoginScreen}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name={ROUTES.CREATE_ACCOUNT}
          component={CreateAccountScreen}
          options={{title: 'Create Account'}}
        />
        <Stack.Screen
          name={ROUTES.HOME}
          component={HomeScreen}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name={ROUTES.DATE}
          component={DateScreen}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name={ROUTES.TIME}
          component={TimeScreen}
          options={{headerShown: false}}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};
