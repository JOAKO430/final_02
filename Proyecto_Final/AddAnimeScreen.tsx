import React, { useState } from 'react';
import { View, Text, TextInput, Button, Alert, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import firestore, { firebase } from '@react-native-firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyCN46WjGKVKhW152CeCozDvWSgFS6LTytw",
  authDomain: "proyecto-1-41730.firebaseapp.com",
  projectId: "proyecto-1-41730",
  storageBucket: "proyecto-1-41730.appspot.com",
  messagingSenderId: "121645145029",
  appId: "1:121645145029:web:04108fd367442e3fd5f483",
};

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}
const db = firebase.firestore();

const AddAnimeScreen: React.FC = () => {
  const [nombre, setNombre] = useState('');
  const [episodios, setEpisodios] = useState('');
  const [fechaEmision, setFechaEmision] = useState('');
  const [descripcion, setDescripcion] = useState('');
  const [imagenUrl, setImagenUrl] = useState('');
  const navigation = useNavigation();

  const agregarAnime = async () => {
    try {
      if (!nombre || !fechaEmision) {
        Alert.alert('Error', 'Por favor, complete todos los campos');
        return;
      }

      await db.collection('Anime').add({
        Nombre: nombre,
        Episodios: parseInt(episodios) || 0,
        FechaEmision: fechaEmision,
        Descripcion: descripcion,
        ImagenURL: imagenUrl
      });

      setNombre('');
      setEpisodios('');
      setFechaEmision('');
      setDescripcion('');
      setImagenUrl('');
      Alert.alert('Éxito', 'Anime agregado correctamente');
    } catch (error) {
      console.error('Error al agregar anime:', error);
      Alert.alert('Error', 'Ocurrió un error al agregar el anime');
    }
  };

  const navigateToInicio = () => {
    navigation.navigate('Inicio');
  };

  return (
    <View style={styles.container}>
      <Text>Nombre:</Text>
      <TextInput
        style={styles.input}
        value={nombre}
        onChangeText={setNombre}
        placeholder="Nombre del anime"
      />
      <Text>Cantidad de episodios:</Text>
      <TextInput
        style={styles.input}
        value={episodios}
        onChangeText={setEpisodios}
        placeholder="Cantidad de episodios"
        keyboardType="numeric"
      />
      <Text>Fecha de emisión:</Text>
      <TextInput
        style={styles.input}
        value={fechaEmision}
        onChangeText={setFechaEmision}
        placeholder="Fecha de emisión"
      />
      <Text>Descripción:</Text>
      <TextInput
        style={styles.input}
        value={descripcion}
        onChangeText={setDescripcion}
        placeholder="Descripción del anime"
        multiline
      />
      <Text>URL de la imagen de portada:</Text>
      <TextInput
        style={styles.input}
        value={imagenUrl}
        onChangeText={setImagenUrl}
        placeholder="URL de la imagen"
      />
      <Button title="Agregar Anime" onPress={agregarAnime} />
      <Button title="Ir a Inicio" onPress={navigateToInicio} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 10,
    paddingHorizontal: 10,
  },
});

export default AddAnimeScreen;
