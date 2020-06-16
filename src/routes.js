import React from 'react';
import {RectButton} from 'react-native-gesture-handler';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';

import Icon from 'react-native-vector-icons/MaterialIcons';

import Main from './pages/Main';
import User from './pages/User';
import Repository from './pages/Repository';

const Stack = createStackNavigator();

function Routes() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerStyle: {
            backgroundColor: '#7159c1',
          },
          headerBackTitleVisible: false,
          headerTintColor: '#FFFFFF',
        }}>
        <Stack.Screen
          options={{
            title: 'Usuarios',
            headerTitleAlign: 'center',
          }}
          name="Main"
          component={Main}
        />
        <Stack.Screen
          options={({route, navigation}) => ({
            title: route.params.user.name,
            headerTitleAlign: 'center',
            headerLeft: () => (
              <RectButton onPress={() => navigation.goBack()}>
                <Icon name="keyboard-arrow-left" size={40} color="#FFF" />
              </RectButton>
            ),
            headerLeftContainerStyle: {
              paddingLeft: 5,
            },
          })}
          name="User"
          component={User}
        />

        <Stack.Screen name="Repository" component={Repository} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default Routes;
