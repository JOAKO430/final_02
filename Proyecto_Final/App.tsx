
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import AddAnimeScreen from './AddAnimeScreen';
import InicioScreen from './InicioScreen';
import PresentacionScreen from './PresentacionScreen';
import LoginScreen from './LoginScreen';

const Stack = createStackNavigator();

const App: React.FC = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Presentacion" component={PresentacionScreen} options={{ headerShown: false }} />
        <Stack.Screen name="Login" component={LoginScreen} options={{ title: 'Iniciar Sesión' }} />
        <Stack.Screen name="AddAnime" component={AddAnimeScreen} options={{ title: 'Agregar Anime' }} />
        <Stack.Screen name="Inicio" component={InicioScreen} options={{ title: 'Inicio' }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
