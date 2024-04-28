// CORREO PARA ACCEDER Y PODER AGREGAR UN ANIME: prueba@gmail.com
// CONTRASEÑA : 123456
import React, { useState } from 'react';
import { View, Text, TextInput, Button, Alert } from 'react-native';
import auth from '@react-native-firebase/auth'; 

const LoginScreen: React.FC<{ navigation: any }> = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const iniciarSesion = async () => {
    try {
      const userCredential = await auth().signInWithEmailAndPassword(email, password);
      navigation.navigate('AddAnime');
    } catch (error) {
      console.error('Error al iniciar sesión:', error);
      Alert.alert('Error', 'Credenciales inválidas. Por favor, inténtalo de nuevo.');
    }
  };

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Correo Electrónico:</Text>
      <TextInput
        value={email}
        onChangeText={setEmail}
        placeholder="Correo electrónico"
        keyboardType="email-address"
        style={{ width: 200, borderWidth: 1, borderColor: 'black', marginBottom: 10, padding: 5 }}
      />
      <Text>Contraseña:</Text>
      <TextInput
        value={password}
        onChangeText={setPassword}
        placeholder="Contraseña"
        secureTextEntry={true}
        style={{ width: 200, borderWidth: 1, borderColor: 'black', marginBottom: 10, padding: 5 }}
      />
      <Button title="Iniciar Sesión" onPress={iniciarSesion} />
    </View>
  );
};

export default LoginScreen;
