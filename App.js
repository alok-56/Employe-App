import React, {useEffect, useState} from 'react';
import {View, Text} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Splash from './Src/Pages/Splash';
import Login from './Src/Pages/Login';
import Signup from './Src/Pages/Signup';
import MyTabs from './Src/Navigation';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Stack = createNativeStackNavigator();

const StackNavigation = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Home"
        options={{
          headerShown: false,
        }}
        component={Splash}
      />
      <Stack.Screen
        name="Login"
        options={{
          headerShown: false,
        }}
        component={Login}
      />
      <Stack.Screen
        name="Signup"
        options={{
          headerShown: false,
        }}
        component={Signup}
      />
      <Stack.Screen
        name="HomePage"
        options={{
          headerShown: false,
        }}
        component={MyTabs}
      />
    </Stack.Navigator>
  );
};

function App() {
  const [isLogin, setIslogin] = useState(false);
  useEffect(() => {
    UserStore();
  }, []);

  const UserStore = async () => {
    let id = await AsyncStorage.getItem('id');
    console.log(id)
    if (id !== null) {
      setIslogin(true);
    } 
  };
  return (
    <>
      <NavigationContainer>
        {isLogin ? <MyTabs></MyTabs> : <StackNavigation></StackNavigation>}
      </NavigationContainer>
    </>
  );
}

export default App;
