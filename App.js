import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs"
import { Ionicons } from '@expo/vector-icons';

import LoginScreen from './src/screens/loginScreen/loginScreen';
import SignUpScreen from './src/screens/signupScreen/signupScreen';
import HomeScreen from './src/screens/HomeScreen';
import Meu from './src/screens/meu/meu'
import HistoryScreen from './src/screens/history';



const Tab = createBottomTabNavigator();

const Stack = createNativeStackNavigator();


const HomeTabs = () => {
  return (
    <Tab.Navigator
    screenOptions={({ route }) => ({
      tabBarIcon: ({ color, size }) => {
        let iconName;

        if (route.name === 'Home') {
          iconName = 'home';
        } else if (route.name === 'Login') {
          iconName = 'log-in';
        }
        else if (route.name === 'Meu') {
          iconName = 'person';
        }
        else if (route.name === 'History') {
          iconName = 'bar-chart';
        }
        

        return <Ionicons name={iconName} size={size} color={color} />;
      },
      tabBarActiveTintColor: 'blue',
      tabBarInactiveTintColor: 'black ',
    })}
  >
    <Tab.Screen name="Home" component={HomeScreen}  options={{ headerShown: false }} />
    <Tab.Screen name="History" component={HistoryScreen}  options={{ headerShown: false }}/>
    <Tab.Screen name='Meu' component={Meu}  options={{ headerShown: false }}/>
  </Tab.Navigator>
  );
};
export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="Login" component={LoginScreen}  options={{ headerShown: false }}/>
        <Stack.Screen name="SignUp" component={SignUpScreen} options={{ headerShown: false }} />
        <Stack.Screen name="Home" component={HomeTabs}  options={{ headerShown: false }}/>
        <Stack.Screen name='Meu' component={Meu} options={{ headerShown: false }}/>
        <Stack.Screen name="History" component={HistoryScreen}  options={{ headerShown: false }}/>
      </Stack.Navigator>

    </NavigationContainer>
  );
}


//const styles = StyleSheet.create({
  //container: {
    //flex: 1,
    //backgroundColor: '#fff',
    //alignItems: 'center',
    //justifyContent: 'center',
  //},
//});
